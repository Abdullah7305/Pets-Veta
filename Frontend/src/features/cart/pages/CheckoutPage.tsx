import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCreditCard,
  FaLock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaShoppingBag,
} from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import Card from "@/shared/components/Card/Card";
import { api } from "@/features/api interface/axios.interface";

import {
  clearCart,
  getCartItems,
  type CartItem,
} from "../utils/cartStorage";

import {
  checkoutSchema,
  type CheckoutFormData,
} from "../schemas/checkout.schema";

import type { CartApiError } from "../types/cart.types";

const DIRECT_BUY_KEY = "pets-veta-direct-buy";

const getDirectBuyItem = (): CartItem | null => {
  try {
    const rawItem = localStorage.getItem(DIRECT_BUY_KEY);

    if (!rawItem) return null;

    const parsedItem = JSON.parse(rawItem) as CartItem;

    if (!parsedItem?.productId || !parsedItem?.title) {
      localStorage.removeItem(DIRECT_BUY_KEY);
      return null;
    }

    return parsedItem;
  } catch {
    localStorage.removeItem(DIRECT_BUY_KEY);
    return null;
  }
};

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [directBuyItem] = useState<CartItem | null>(() => getDirectBuyItem());

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (directBuyItem) {
      return [directBuyItem];
    }

    return getCartItems();
  });

  const [error, setError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      phoneNumber: "",
      shippingAddress: "",
    },
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = async (data: CheckoutFormData) => {
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const orderPayload = {
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      shippingAddress: data.shippingAddress,
      phoneNumber: data.phoneNumber,
    };

    try {
      setPlacingOrder(true);

      const response = await api.post("orders", orderPayload);
      const order = response.data?.data;

      if (!order?.id) {
        setError("Failed to initialize checkout. Please try again.");
        return;
      }

      if (directBuyItem) {
        localStorage.removeItem(DIRECT_BUY_KEY);
      } else {
        clearCart();
      }

      setCart([]);

      navigate(`/order-payment?orderId=${order.id}`);
    } catch (err) {
      const apiError = err as CartApiError;

      if (apiError.response?.status === 401) {
        navigate("/login", {
          state: { redirectTo: "/checkout" },
        });
        return;
      }

      setError(
        apiError.response?.data?.message ||
          "Unable to place the order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff8f4] via-[#f7fbfb] to-[#e9f8f7]">
      <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-xl lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-[#07182c] shadow-sm transition hover:border-[#178f95] hover:text-[#178f95]"
          >
            <FaArrowLeft />
            Back to Cart
          </button>

          <div className="hidden items-center gap-2 rounded-full bg-[#178f95]/10 px-4 py-2 text-sm font-bold text-[#178f95] sm:flex">
            <FaLock />
            Secure Checkout
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-12 lg:py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#178f95]">
            Pets-Veta Marketplace
          </p>

          <h1 className="mt-3 text-3xl font-extrabold text-[#07182c] md:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Complete your shipping details and continue to secure payment.
          </p>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[#178f95] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#178f95] text-sm font-bold text-white">
                1
              </span>

              <div>
                <p className="text-sm font-bold text-[#07182c]">Cart</p>
                <p className="text-xs text-gray-500">Items selected</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#178f95] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#178f95] text-sm font-bold text-white">
                2
              </span>

              <div>
                <p className="text-sm font-bold text-[#07182c]">Checkout</p>
                <p className="text-xs text-gray-500">Shipping details</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500">
                3
              </span>

              <div>
                <p className="text-sm font-bold text-gray-600">Payment</p>
                <p className="text-xs text-gray-500">Secure payment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_410px]">
          <Card className="border border-white/80 bg-white/95 shadow-xl shadow-teal-100/40">
            <div className="mb-7 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#178f95]/10 text-[#178f95]">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#07182c]">
                  Shipping Information
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Add accurate delivery details so the seller can process your
                  marketplace order smoothly.
                </p>
              </div>
            </div>

            {error && (
              <p className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit(handlePlaceOrder)}>
              <div className="grid gap-5">
                <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#07182c]">
                    <FaPhoneAlt className="text-[#178f95]" />
                    Contact Number
                  </div>

                  <Input
                    placeholder="03000000000"
                    error={errors.phoneNumber?.message}
                    {...register("phoneNumber")}
                  />
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#07182c]">
                    <FaMapMarkerAlt className="text-[#178f95]" />
                    Delivery Address
                  </div>

                  <Input
                    placeholder="House no, street, city, Pakistan"
                    error={errors.shippingAddress?.message}
                    {...register("shippingAddress")}
                  />
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-[#178f95]/15 bg-[#178f95]/5 p-4">
                <div className="flex items-start gap-3">
                  <FaShieldAlt className="mt-1 shrink-0 text-[#178f95]" />

                  <p className="text-sm leading-6 text-gray-600">
                    Your order details will be sent securely. Payment will be
                    processed on the next step.
                  </p>
                </div>
              </div>

              <Button
                className="mt-7 w-full !rounded-2xl !py-3.5 text-base font-bold"
                type="submit"
                disabled={placingOrder || cart.length === 0}
              >
                {placingOrder ? "Starting Secure Checkout..." : "Continue to Payment"}
              </Button>
            </form>
          </Card>

          <aside className="xl:sticky xl:top-28 xl:h-fit">
            <Card className="border border-white/80 bg-white/95 shadow-xl shadow-teal-100/40">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#07182c]">
                    Order Summary
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {directBuyItem
                      ? "Direct purchase item"
                      : "Items selected from your cart"}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#178f95]/10 text-[#178f95]">
                  <FaShoppingBag />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {cart.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center">
                    <p className="text-sm font-bold text-gray-700">
                      Your cart is empty.
                    </p>

                    <Button
                      className="mt-4"
                      size="sm"
                      onClick={() => navigate("/marketplace1")}
                    >
                      Explore Marketplace
                    </Button>
                  </div>
                )}

                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/70 p-3"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain p-1.5"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-bold text-[#07182c]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Qty {item.quantity} × PKR {item.price.toLocaleString()}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-extrabold text-[#07182c]">
                      PKR {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 rounded-2xl bg-[#f7fbfb] p-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Total Items</span>

                  <span className="font-bold text-gray-900">{totalItems}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span className="font-bold text-gray-900">
                    PKR {total.toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-extrabold text-[#07182c]">
                      Total
                    </span>

                    <span className="text-lg font-extrabold text-[#178f95]">
                      PKR {total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {!directBuyItem && cart.length > 0 && (
                <Button
                  variant="outline"
                  className="mt-5 w-full"
                  onClick={() => navigate("/cart")}
                >
                  Edit Cart
                </Button>
              )}

              <div className="mt-5 grid gap-3 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-2">
                  <FaLock className="text-[#178f95]" />
                  Secure checkout process
                </div>

                <div className="flex items-center gap-2">
                  <FaCreditCard className="text-[#178f95]" />
                  Payment starts after order confirmation
                </div>

                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#178f95]" />
                  Seller receives your order details
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CheckoutPage;