import {api} from "@/features/api interface/axios.interface";

export const createCheckoutSessionApi = async (appointmentId: string) => {
  const response = await api.post("/payment/create-checkout-session", {
    appointmentId,
  });

  return response.data;
};

export const getPaymentStatusApi = async (sessionId: string) => {
  const response = await api.get(`/payment/status/${sessionId}`);

  return response.data;
};