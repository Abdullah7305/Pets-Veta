import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import SellerHeader from "@/features/seller/components/SellerHeader";
import SellerSidebar from "@/features/seller/components/SellerSidebar";

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

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantity = (productId: string | number, quantity: number) => {
    updateCartQuantity(productId, quantity);
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
    if (cart.length === 0) return;

    navigate("/checkout");
  };

  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-7">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#178f95]">
                Marketplace Cart
              </p>

              <h1 className="mt-2 text-3xl font-extrabold text-[#07182c]">
                Shopping Cart
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Review your selected marketplace products before checkout.
              </p>
            </div>

            <Button variant="outline" onClick={() => navigate("/marketplace1")}>
              Continue Shopping
            </Button>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-4">
              {cart.length === 0 && (
                <Card className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#178f95]/10 text-2xl text-[#178f95]">
                    🛒
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-[#07182c]">
                    Cart is empty
                  </h2>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    Add marketplace products to your cart. Your selected items
                    will appear here before checkout.
                  </p>

                  <Button
                    className="mt-5"
                    onClick={() => navigate("/marketplace1")}
                  >
                    Explore Marketplace
                  </Button>
                </Card>
              )}

              {cart.map((item) => (
                <Card
                  key={item.productId}
                  className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="line-clamp-2 font-semibold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        PKR {item.price.toLocaleString()}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Product ID: {item.productId}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantity(item.productId, item.quantity - 1)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-l-xl text-lg font-bold text-gray-600 transition hover:bg-gray-50"
                      >
                        -
                      </button>

                      <span className="min-w-10 text-center text-sm font-bold text-gray-900">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          handleQuantity(item.productId, item.quantity + 1)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-r-xl text-lg font-bold text-gray-600 transition hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>

                    <p className="min-w-[120px] text-sm font-bold text-[#07182c]">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>

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

            <Card className="h-fit">
              <h2 className="text-xl font-bold text-[#07182c]">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Total Items</span>
                  <span className="font-semibold text-gray-900">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    PKR {total.toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-base font-extrabold text-[#178f95]">
                      PKR {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="mt-6 w-full"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
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

              <p className="mt-4 text-xs leading-5 text-gray-400">
                Checkout will create your marketplace order from the selected
                cart items.
              </p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CartPage;