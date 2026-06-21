import { api, handleAxiosError } from "@/features/api interface/axios.interface";

export const createAppointmentPaymentIntent = async (appointmentId: string) => {
    try {
        const response = await api.post(
            `/payment/appointments/${appointmentId}/create-payment-intent`
        );

        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};