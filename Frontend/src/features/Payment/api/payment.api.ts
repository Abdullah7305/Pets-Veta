import { api, handleAxiosError } from "@/features/api interface/axios.interface";
import type {
  CreateCheckoutSessionResponse,
  PaymentStatusResponse,
} from "../payment.types";

export const createCheckoutSessionApi = async (
  appointmentId: string
): Promise<CreateCheckoutSessionResponse> => {
  try {
    const response = await api.post("/payment/create-checkout-session", {
      appointmentId,
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error)
    throw error;
  }
};

export const getPaymentStatusApi = async (
  sessionId: string
): Promise<PaymentStatusResponse> => {
  try {
    const response = await api.get(`/payment/status/${sessionId}`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};