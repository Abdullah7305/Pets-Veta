export interface AppointmentPaymentState {
  appointmentId: string;
  fees: number;
  doctorName?: string;
  checkupTime?: string;
}

export interface CreateCheckoutSessionResponse {
  success: boolean;
  message: string;
  data: {
    sessionId: string;
    url: string;
  };
}

export interface PaymentStatusResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    fees: number;
    checkupTime: string;
    status: string;
    paymentStatus: string;
    stripeSessionId: string;
    stripePaymentIntentId: string | null;
    doctor?: {
      id: string;
      user?: {
        fullName: string;
        email: string;
      };
    };
  };
}