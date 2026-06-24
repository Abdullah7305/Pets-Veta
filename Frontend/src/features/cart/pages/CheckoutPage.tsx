import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import Card from "@/shared/components/Card/Card";
import { clearCart, getCartItems } from "../utils/cartStorage";
import { api } from "@/features/api interface/axios.interface";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "../schemas/checkout.schema";
import type { CartApiError } from "../types/cart.types";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // 💡 Added: Resolve if this is a single-item direct pet purchase or standard cart
  const [directBuyItem] = useState(() => {
    const raw = localStorage.getItem("pets-veta-direct-buy");
    return raw ? JSON.parse(raw) : null;
  });

  const [cart, setCart] = useState(() => {
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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

      // 1. Save the order in the database (status: PENDING)
      const response = await api.post("orders", orderPayload);
      const order = response.data?.data;

      if (!order?.id) {
        setError("Failed to initialize checkout. Please try again.");
        return;
      }

      // 2. Clear correct local storages
      if (directBuyItem) {
        localStorage.removeItem("pets-veta-direct-buy");
      } else {
        clearCart();
      }
      setCart([]);

      // 3. 💡 Redirect directly to the dedicated order payment page
      navigate(`/order-payment?orderId=${order.id}`);
    } catch (err) {
      const apiError = err as CartApiError;

      if (apiError.response?.status === 401) {
        navigate("/login", {
          state: { redirectTo: "/checkout" },
        });
        return;
      }

      setError(apiError.response?.data?.message || "Unable to place the order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7fbfb] px-6 py-8 lg:px-12">
      <h1 className="text-3xl font-bold text-[#07182c]">Checkout</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,560px)_360px]">
        <Card>
          <form onSubmit={handleSubmit(handlePlaceOrder)}>
            {error && (
              <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            <Input
              label="Phone Number"
              placeholder="03000000000"
              error={errors.phoneNumber?.message}
              {...register("phoneNumber")}
            />

            <div className="mt-4">
              <Input
                label="Shipping Address"
                placeholder="Lahore, Pakistan"
                error={errors.shippingAddress?.message}
                {...register("shippingAddress")}
              />
            </div>

            <Button
              className="mt-6 w-full"
              type="submit"
              disabled={placingOrder}
            >
              {placingOrder ? "Starting Secure Checkout..." : "Continue to Payment"}
            </Button>
          </form>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-[#07182c]">Order Summary</h2>

          <div className="mt-5 space-y-4">
            {cart.length === 0 && (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}

            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="text-sm font-semibold text-gray-900">
                  PKR {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-between text-base font-bold">
            <span>Total</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>

          {!directBuyItem && (
            <Button
              variant="outline"
              className="mt-5 w-full"
              onClick={() => navigate("/cart")}
            >
              Back to Cart
            </Button>
          )}
        </Card>
      </div>
    </main>
  );
};

export default CheckoutPage;