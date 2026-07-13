import { api } from "@/features/api interface/axios.interface";
import type {
  PetOwnerDashboardResponse,
  PetOwnerAppointmentsResponse, 
} from "../types/petOwnerDashboard.types";

export const getPetOwnerDashboardApi =
  async (): Promise<PetOwnerDashboardResponse> => {
    const response =
      await api.get<PetOwnerDashboardResponse>(
        "/pet-owner/dashboard",
      );

    return response.data;
  };


export const getPetOwnerAppointmentsApi = async (): Promise<PetOwnerAppointmentsResponse> => {
  const response = await api.get<PetOwnerAppointmentsResponse>("petOwner/appointments");
  return response.data;
};


// ... keep existing imports and api functions ...

// 💡 Phase 4: Retrieve buyer-specific order histories
export const getMyMarketplaceOrdersApi = async () => {
  const response = await api.get("/orders/my-orders");
  return response.data;
};

// 💡 Phase 4: Release payout directly to the Seller's linked Stripe Account
export const completeMarketplaceOrderApi = async (orderId: string) => {
  const response = await api.post(`/orders/${orderId}/complete`);
  return response.data;
};

// 💡 Phase 4: Cancel transaction and process a 100% automatic Stripe card refund
export const refundMarketplaceOrderApi = async (orderId: string) => {
  const response = await api.post(`/orders/${orderId}/refund`);
  return response.data;
};