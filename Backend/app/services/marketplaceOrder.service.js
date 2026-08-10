const prisma = require("../config/prisma");
const notificationService = require("./notification.service");

const { stripe } = require("../config/stripe");

const LOW_STOCK_LIMIT = 5;

const generateOrderNumber = () => {
  return `PV-${Date.now()}`;
};

exports.completeOrder = async (buyerId, orderId) => {
  return prisma.$transaction(async (tx) => {
    // Locate the paid order belonging to this buyer
    const order = await tx.marketplaceOrder.findFirst({
      where: {
        id: orderId,
        buyerId,
        status: "CONFIRMED", // Order must have been paid for
      },
      include: {
        seller: true,
      },
    });

    if (!order) {
      throw new Error("Order not found or is not currently in a deliverable state.");
    }

    if (order.isPayoutReleased) {
      throw new Error("Payout has already been released for this transaction.");
    }

    // Guard: Ensure the seller has completed their Stripe onboarding credentials
    if (!order.seller.stripeConnectedAccountId || !order.seller.stripeOnboardingCompleted) {
      throw new Error("The merchant has not completed Stripe Connect setup. Cannot release payout.");
    }

    // Process the 15% / 85% Split
    const totalAmount = Number(order.totalAmount);
    const platformCommission = Math.round(totalAmount * 0.15); // Platform keeps 15%
    const sellerPayout = totalAmount - platformCommission;     // Seller receives 85%

    // Execute Stripe Connect Transfer to route money directly to Seller's connected wallet
    const transfer = await stripe.transfers.create({
      amount: Math.round(sellerPayout * 100), // Convert to cents/paisa
      currency: "pkr",
      destination: order.seller.stripeConnectedAccountId,
      transfer_group: `ORDER_${order.id}`,
      description: `Release payout for e-commerce purchase Order #${order.orderNumber}. 15% Platform Commission retained.`,
    });

    // Update order status, payment status, and lock payout variables
    const updatedOrder = await tx.marketplaceOrder.update({
      where: { id: order.id },
      data: {
        status: "COMPLETED",
        isPayoutReleased: true,
        payoutReleasedAt: new Date(),
        paymentStatus: "SUCCEEDED", // Mark payment fully completed
      },
    });

    return updatedOrder;
  });
};

exports.refundOrder = async (buyerId, orderId) => {
  return prisma.$transaction(async (tx) => {
    // Locate the paid order belonging to this buyer
    const order = await tx.marketplaceOrder.findFirst({
      where: {
        id: orderId,
        buyerId,
        status: "CONFIRMED", // Can only refund if paid
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error("Order not found or is ineligible for a refund.");
    }

    if (order.isPayoutReleased) {
      throw new Error("Cannot process a refund once payouts are released to the seller.");
    }

    if (!order.stripePaymentIntentId) {
      throw new Error("No Stripe Transaction reference found to execute refund.");
    }

    // 1. Issue full reverse charge directly via Stripe API back to buyer's card
    const refund = await stripe.refunds.create({
      payment_intent: order.stripePaymentIntentId,
      reason: "customer_requested",
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    });

    // 2. Safely restore listing stock counts in database
    for (const item of order.items) {
      const currentProduct = await tx.marketplaceProduct.findUnique({
        where: { id: item.productId },
      });

      if (currentProduct) {
        const restoredStock = currentProduct.stock + item.quantity;
        await tx.marketplaceProduct.update({
          where: { id: item.productId },
          data: {
            stock: restoredStock,
            // Re-activate status in case product was marked as SOLD_OUT
            status: restoredStock > 0 ? "ACTIVE" : "SOLD_OUT",
          },
        });
      }
    }

    // 3. Mark database order status as CANCELLED and paymentStatus as REFUNDED
    const updatedOrder = await tx.marketplaceOrder.update({
      where: { id: order.id },
      data: {
        status: "CANCELLED",
        paymentStatus: "REFUNDED",
      },
    });

    return updatedOrder;
  });
};

exports.createMarketplaceOrder = async (buyerId, payload) => {
  const { items, shippingAddress, phoneNumber } = payload;

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error("Order items are required");
  }

  const result = await prisma.$transaction(async (tx) => {
    const productIds = items.map((item) => item.productId);

    const products = await tx.marketplaceProduct.findMany({
      where: {
        id: {
          in: productIds,
        },
        status: "ACTIVE",
      },
      include: {
        seller: true,
      },
    });

    if (products.length !== items.length) {
      throw new Error("Some products are not available");
    }

    const isOwnerPurchasing = products.some(
      (product) => product.seller.userId === buyerId
    );

    if (isOwnerPurchasing) {
      throw new Error("You cannot purchase your own listed products or pets.");
    }

    const sellerIds = [...new Set(products.map((product) => product.sellerId))];

    if (sellerIds.length > 1) {
      throw new Error("One order can contain products from one seller only");
    }

    let totalAmount = 0;

    const orderItemsData = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      const quantity = Number(item.quantity) || 1;

      if (product.stock < quantity) {
        throw new Error(`${product.title} has only ${product.stock} stock`);
      }

      totalAmount += Number(product.price) * quantity;

      return {
        productId: product.id,
        quantity,
        price: product.price,
      };
    });

    const order = await tx.marketplaceOrder.create({
      data: {
        orderNumber: generateOrderNumber(),
        buyerId,
        sellerId: sellerIds[0],
        totalAmount,
        shippingAddress,
        phoneNumber,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        buyer: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            phone: true,
          },
        },
        seller: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                username: true,
                email: true,
              },
            },
          },
        },
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    const stockAlerts = [];

    for (const item of items) {
      const quantity = Number(item.quantity) || 1;

      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        continue;
      }

      const previousStock = product.stock;
      const newStock = previousStock - quantity;

      await tx.marketplaceProduct.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: newStock,
          status: newStock <= 0 ? "SOLD_OUT" : "ACTIVE",
        },
      });

      const crossedLowStockLimit =
        previousStock > LOW_STOCK_LIMIT &&
        newStock > 0 &&
        newStock <= LOW_STOCK_LIMIT;

      const becameSoldOut = previousStock > 0 && newStock <= 0;

      if (crossedLowStockLimit || becameSoldOut) {
        stockAlerts.push({
          productId: product.id,
          productTitle: product.title,
          sellerUserId: product.seller.userId,
          previousStock,
          newStock,
          orderId: order.id,
        });
      }
    }

    return {
      order,
      stockAlerts,
    };
  });

  await createOrderNotifications(result.order);
  await createStockNotifications(result.stockAlerts);

  return result.order;
};

exports.getMyMarketplaceOrders = async (buyerId) => {
  return prisma.marketplaceOrder.findMany({
    where: {
      buyerId,
      status: {
        // Exclude unpaid checkouts; only show paid, transit, completed, or formally cancelled orders
        not: "PENDING"
      }
    },
    include: {
      seller: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      },
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};


exports.cancelPendingOrder = async (buyerId, orderId) => {
  return prisma.$transaction(async (tx) => {
    const order = await tx.marketplaceOrder.findFirst({
      where: {
        id: orderId,
        buyerId,
        status: "PENDING", // Only allow cancellation of unpaid pending checkouts
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new Error("Checkout session not found or already processed.");
    }

    // Restore stock inventory for each product
    for (const item of order.items) {
      const product = await tx.marketplaceProduct.findUnique({
        where: { id: item.productId },
      });

      if (product) {
        const restoredStock = product.stock + item.quantity;
        await tx.marketplaceProduct.update({
          where: { id: item.productId },
          data: {
            stock: restoredStock,
            status: restoredStock > 0 ? "ACTIVE" : "SOLD_OUT",
          },
        });
      }
    }

    // Remove the uncompleted transaction components entirely
    await tx.marketplaceOrderItem.deleteMany({
      where: { orderId: order.id },
    });

    await tx.marketplaceOrder.delete({
      where: { id: order.id },
    });

    return { success: true };
  });
};
