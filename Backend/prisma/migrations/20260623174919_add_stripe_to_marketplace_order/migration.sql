/*
  Warnings:

  - A unique constraint covering the columns `[stripePaymentIntentId]` on the table `MarketplaceOrder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MarketplaceOrder" ADD COLUMN     "stripeClientSecret" TEXT,
ADD COLUMN     "stripePaymentIntentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MarketplaceOrder_stripePaymentIntentId_key" ON "MarketplaceOrder"("stripePaymentIntentId");
