const { PrismaClient } = require("@prisma/client");
const notificationService = require("./notification.service");

const prisma = new PrismaClient();

const LOW_STOCK_LIMIT = 5;

const generateOrderNumber = () => {
  return `PV-${Date.now()}`;
};

const getBuyerName = (buyer) => {
  return buyer?.fullName || buyer?.username || buyer?.email || "Buyer";
};

const formatPrice = (amount) => {
  return Number(amount || 0).toLocaleString("en-PK");
};

const getOrderItemsPreview = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return "New marketplace order";
  }

  const productNames = items
    .map((item) => item.product?.title)
    .filter(Boolean)
    .slice(0, 2);

  if (productNames.length === 0) {
    return "New marketplace order";
  }

  if (items.length > 2) {
    return `${productNames.join(", ")} and ${items.length - 2} more item(s)`;
  }

  return productNames.join(", ");
};

const createOrderNotifications = async (order) => {
  if (!order) return;

  const buyerName = getBuyerName(order.buyer);
  const orderPreview = getOrderItemsPreview(order.items);
  const totalAmount = formatPrice(order.totalAmount);

  const notifications = [];

  if (order.seller?.userId) {
    notifications.push({
      userId: order.seller.userId,
      type: "ORDER",
      title: "New order received",
      message: `${buyerName} placed order ${order.orderNumber} for ${orderPreview}. Total: PKR ${totalAmount}.`,
      link: "/seller/orders",
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        buyerId: order.buyerId,
        sellerId: order.sellerId,
        totalAmount: Number(order.totalAmount),
      },
    });
  }

  if (order.buyerId) {
    notifications.push({
      userId: order.buyerId,
      type: "ORDER",
      title: "Order placed successfully",
      message: `Your order ${order.orderNumber} has been placed successfully. Total: PKR ${totalAmount}.`,
      link: "/seller/orders",
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
        sellerId: order.sellerId,
        totalAmount: Number(order.totalAmount),
      },
    });
  }

  if (notifications.length > 0) {
    try {
      await notificationService.createManyNotifications({
        notifications,
      });
    } catch (error) {
      console.log("[Order Notification Error]", error.message);
    }
  }
};

const createStockNotifications = async (stockAlerts) => {
  if (!Array.isArray(stockAlerts) || stockAlerts.length === 0) {
    return;
  }

  const notifications = stockAlerts
    .filter((alert) => alert.sellerUserId)
    .map((alert) => {
      const isSoldOut = alert.newStock <= 0;

      return {
        userId: alert.sellerUserId,
        type: "LOW_STOCK",
        title: isSoldOut ? "Product sold out" : "Low stock alert",
        message: isSoldOut
          ? `${alert.productTitle} is now sold out.`
          : `${alert.productTitle} has only ${alert.newStock} item(s) left in stock.`,
        link: "/seller/listings",
        metadata: {
          productId: alert.productId,
          productTitle: alert.productTitle,
          previousStock: alert.previousStock,
          newStock: alert.newStock,
          orderId: alert.orderId,
        },
      };
    });

  if (notifications.length > 0) {
    try {
      await notificationService.createManyNotifications({
        notifications,
      });
    } catch (error) {
      console.log("[Stock Notification Error]", error.message);
    }
  }
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