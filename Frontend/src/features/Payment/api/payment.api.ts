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

export const releaseAppointmentHoldApi = async (appointmentId: string) => {
    try {
        const response = await api.post(`/petOwner/appointments/${appointmentId}/release-hold`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const getAppointmentPaymentStatus = async (appointmentId: string) => {
    try {
        const response = await api.get(
            `/payment/appointments/${appointmentId}/status`
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

// 💡 Added: Creates a Stripe session payload for product orders
export const createOrderPaymentIntentApi = async (orderId: string) => {
    try {
        const response = await api.post(
            `/payment/orders/${orderId}/create-payment-intent`
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};


export const getOrderPaymentStatusApi = async (orderId: string) => {
    try {
        const response = await api.get(
            `/payment/orders/${orderId}/status`
        );
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};