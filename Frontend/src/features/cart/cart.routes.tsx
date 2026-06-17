import CartPage from "../cart/pages/CartPage";
import CheckoutPage from "../cart/pages/CheckoutPage";

export const cartRoutes = [
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
];