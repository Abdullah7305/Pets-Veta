const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const generateOrderNumber = () => {
  return `PV-${Date.now()}`;
};

exports.createMarketplaceOrder = async (buyerId, payload) => {
  const { items, shippingAddress, phoneNumber } = payload;

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error("Order items are required");
  }

  return prisma.$transaction(async (tx) => {
    const productIds = items.map((item) => item.productId);

    const products = await tx.marketplaceProduct.findMany({
      where: {
        id: {
          in: productIds,
        },
        status: "ACTIVE",
      },
      include: {
        seller: true, // 💡 Already includes SellerProfile (which contains userId)
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
            email: true,
            phone: true,
          },
        },
        seller: true,
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

    for (const item of items) {
      const quantity = Number(item.quantity) || 1;

      const product = products.find((p) => p.id === item.productId);

      const newStock = product.stock - quantity;

      await tx.marketplaceProduct.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: newStock,
          status: newStock <= 0 ? "SOLD_OUT" : "ACTIVE",
        },
      });
    }

    return order;
  });
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