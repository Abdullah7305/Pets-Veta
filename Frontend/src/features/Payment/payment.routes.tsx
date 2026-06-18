import PaymentSuccessPage from "./page/PaymentSuccessPage";
import PaymentCancelPage from "./page/PaymentCancelPage";

export const paymentRoutes = [
  {
    path: "/payment-success",
    element: <PaymentSuccessPage />,
  },
  {
    path: "/payment-cancel",
    element: <PaymentCancelPage />,
  },
];