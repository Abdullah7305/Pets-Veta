import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import Card from "@/shared/components/Card/Card";
import { clearCart, getCartItems } from "../utils/cartStorage";
import { api } from "@/features/api interface/axios.interface";

type ApiError = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCartItems());

  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setError("");

    if (cart.length === 0) {
      setError("Cart empty hai.");
      return;
    }

    if (!phoneNumber.trim() || !shippingAddress.trim()) {
      setError("Phone number aur shipping address required hain.");
      return;
    }

    const orderPayload = {
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      shippingAddress,
      phoneNumber,
    };

    try {
      setPlacingOrder(true);
      await api.post("orders", orderPayload);
      clearCart();
      setCart([]);
      navigate("/marketplace1");
    } catch (err) {
      const apiError = err as ApiError;

      if (apiError.response?.status === 401) {
        navigate("/login", {
          state: { redirectTo: "/checkout" },
        });
        return;
      }

      setError(apiError.response?.data?.message || "Order place nahi ho saka.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7fbfb] px-6 py-8 lg:px-12">
      <h1 className="text-3xl font-bold text-[#07182c]">Checkout</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,560px)_360px]">
      <Card>
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <Input
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="03000000000"
        />

        <div className="mt-4">
          <Input
            label="Shipping Address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Lahore, Pakistan"
          />
        </div>

        <Button
          className="mt-6 w-full"
          onClick={handlePlaceOrder}
          disabled={placingOrder}
        >
          {placingOrder ? "Placing Order..." : "Place Order"}
        </Button>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-[#07182c]">Order Summary</h2>

        <div className="mt-5 space-y-4">
          {cart.length === 0 && (
            <p className="text-sm text-gray-500">Cart empty hai.</p>
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

        <Button
          variant="outline"
          className="mt-5 w-full"
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </Button>
      </Card>
      </div>
    </main>
  );
};

export default CheckoutPage;
