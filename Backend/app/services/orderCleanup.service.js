const prisma = require("../config/prisma");
const { MarketplaceOrderStatus, PaymentStatus } = require("@prisma/client");

const cleanupExpiredMarketplaceOrders = async () => {
  const now = new Date();
  
  // Calculate threshold: 10 minutes in the past
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

  console.log(`[OrderCleanup] Executing check for pending orders abandoned before ${tenMinutesAgo.toISOString()}`);

  // Fetch all pending uncompleted orders older than 10 minutes
  const expiredOrders = await prisma.marketplaceOrder.findMany({
    where: {
      status: "PENDING",
      createdAt: {
        lt: tenMinutesAgo,
      },
    },
    include: {
      items: true,
    },
  });

  if (!expiredOrders.length) {
    console.log("[OrderCleanup] No expired pending orders found.");
    return { checked: 0, expired: 0 };
  }

  let expiredCount = 0;

  for (const order of expiredOrders) {
    try {
      // Process each cleanup inside an isolated database transaction to ensure safety
      await prisma.$transaction(async (tx) => {
        // 1. Restore product stock level counts for each item in the order
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
                // Automatically reactivate standard active listing triggers
                status: restoredStock > 0 ? "ACTIVE" : "SOLD_OUT",
              },
            });
          }
        }

        // 2. Safely void the order by transitioning states to CANCELLED
        await tx.marketplaceOrder.update({
          where: { id: order.id },
          data: {
            status: "CANCELLED",
            paymentStatus: "CANCELLED",
          },
        });
      });

      expiredCount += 1;
      console.log(`[OrderCleanup] Succeeded in expiring Order #${order.orderNumber}. Stock returned to inventory.`);
    } catch (error) {
      console.error(`[OrderCleanup] Transaction rollback error for Order ID ${order.id}:`, error.message);
    }
  }

  return { checked: expiredOrders.length, expired: expiredCount };
};

module.exports = {
  cleanupExpiredMarketplaceOrders,
};