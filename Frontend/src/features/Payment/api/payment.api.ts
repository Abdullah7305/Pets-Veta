import {api,handleAxiosError} from "@/features/api interface/axios.interface";
import type {
  CreateCheckoutSessionResponse,
  PaymentStatusResponse,
} from "../payment.types";

export const createCheckoutSessionApi = async (
  appointmentId: string
): Promise<CreateCheckoutSessionResponse> => {
  const response = await api.post("/payment/create-checkout-session", {
    appointmentId,
  });

  return response.data;
};

export const getPaymentStatusApi = async (
  sessionId: string
): Promise<PaymentStatusResponse> => {
  const response = await api.get(`/payment/status/${sessionId}`);

  return response.data;
};