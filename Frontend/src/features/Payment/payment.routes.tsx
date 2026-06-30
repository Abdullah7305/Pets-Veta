import AppointmentPaymentPage from "./page/AppointmentPaymentPage";
import PaymentSuccessPage from "./page/PaymentSuccessPage";
import PaymentCancelPage from "./page/PaymentCancelPage";

// 💡 Added: New Order checkout pages
import OrderPaymentPage from "./page/OrderPaymentPage";
import OrderPaymentSuccessPage from "./page/OrderPaymentSuccessPage";

export const paymentRoutes = [
  {
    path: "/payment",
    element: <AppointmentPaymentPage />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccessPage />,
  },
  {
    path: "/payment-cancel",
    element: <PaymentCancelPage />,
  },
  // Add these entries:
  {
    path: "/order-payment",
    element: <OrderPaymentPage />,
  },
  {
    path: "/order-payment-success",
    element: <OrderPaymentSuccessPage />,
  },
];