import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import PageBackButton from "@/shared/components/BackButton/PageBackButton";
import { showToast } from "@/shared/utils/toast"; // 💡 Step 4: Import Toast notifications
import { checkProductStockApi } from "@/features/marketplace1/api/marketplace.api"; // 💡 Step 4: Import API caller
import {
  clearCart,
  getCartItems,
  removeFromCart,
  updateCartQuantity,
  type CartItem,
} from "../utils/cartStorage";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(getCartItems());

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 💡 Step 4: Refactored asynchronous quantity checker
  const handleQuantity = async (productId: string | number, currentQty: number, targetQuantity: number) => {
    if (targetQuantity <= 0) {
      handleRemove(productId);
      return;
    }

    // Only verify stock if we are attempting to increment the quantity
    if (targetQuantity > currentQty) {
      try {
        const response = await checkProductStockApi(String(productId), targetQuantity);
        if (!response.success) {
          showToast.error(response.message || "Requested quantity exceeds available stock limits.");
          return;
        }
      } catch (err: any) {
        // Intercept standard API 400 validation error (Max quantity can only be n)
        const apiErrorMessage = err?.response?.data?.message || "Requested quantity exceeds available stock limits.";
        showToast.error(apiErrorMessage);
        return; // Prevent update
      }
    }

    updateCartQuantity(productId, targetQuantity);
    setCart(getCartItems());
  };

  const handleRemove = (productId: string | number) => {
    removeFromCart(productId);
    setCart(getCartItems());
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <main className="min-h-screen bg-[#f7fbfb] px-6 py-8 lg:px-12">
      <div className="mb-5 mt-20">
        <PageBackButton fallbackPath="/marketplace1" />
      </div>

      <h1 className="text-3xl font-bold text-[#07182c]">Shopping Cart</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.length === 0 && (
            <Card className="text-center">
              <h2 className="text-xl font-bold text-[#07182c]">
                Cart is empty
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Add marketplace products before checkout.
              </p>
              <Button className="mt-5" onClick={() => navigate("/marketplace1")}>
                Continue Shopping
              </Button>
            </Card>
          )}

          {cart.map((item) => (
            <Card
              key={item.productId}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#178f95] uppercase tracking-wide mt-1">
                    {item.category ? item.category.toLowerCase() : "Product"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PKR {item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity, item.quantity - 1)
                  }
                >
                  -
                </Button>

                <span className="font-semibold">{item.quantity}</span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleQuantity(item.productId, item.quantity, item.quantity + 1)
                  }
                >
                  +
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemove(item.productId)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="text-xl font-bold text-[#07182c]">Order Summary</h2>

          <div className="mt-5 flex justify-between">
            <span>Total</span>
            <span className="font-bold">PKR {total.toLocaleString()}</span>
          </div>

          <Button className="mt-6 w-full" disabled={cart.length === 0} onClick={handleCheckout}>
            Checkout
          </Button>

          {cart.length > 0 && (
            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          )}
        </Card>
      </div>
    </main>
  );
};

export default CartPage;