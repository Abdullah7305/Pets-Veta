import { api } from "@/features/api interface/axios.interface";
import type { MarketplaceProduct } from "@/features/marketplace1/api/marketplace.api";
import type { SellerProfile } from "../types/seller.types";

export type SellerProductPayload = {
  title: string;
  description?: string;
  category: string;
  status?: string;
  price: number;
  stock: number;
  location?: string;
  images?: Array<{
    publicUrl: string;
    publicId?: string;
  }>;
};

export type MarketplaceOrderItem = {
  id?: string;
  quantity: number;
  price?: string | number;
  product: MarketplaceProduct;
};

export type MarketplaceOrder = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus?: string;
  totalAmount: string | number;
  shippingAddress?: string | null;
  phoneNumber?: string | null;
  createdAt: string;
  buyer?: {
    id?: string;
    fullName?: string | null;
    email?: string | null;
    phone?: string | null;
  };
  seller?: {
    id?: string;
    businessName?: string | null;
    city?: string | null;
    user?: {
      id?: string;
      fullName?: string | null;
      email?: string | null;
      phone?: string | null;
      profileImageUrl?: string | null;
    };
  };
  items: MarketplaceOrderItem[];
};

export type SellerOrder = MarketplaceOrder;

export const fetchSellerProducts = async () => {
  const response = await api.get<{
    success: boolean;
    data: MarketplaceProduct[];
  }>("seller/products");

  return response.data.data;
};

export const fetchMySellerProfileApi = async () => {
  const response = await api.get<{ success: boolean; data: SellerProfile }>(
    "seller/profile"
  );

  return response.data;
};

export const createSellerProduct = async (
  payload: SellerProductPayload | FormData
) => {
  const response = await api.post<{
    success: boolean;
    data: MarketplaceProduct;
  }>("seller/product", payload);

  return response.data.data;
};

export const updateSellerProduct = async (
  productId: string,
  payload: SellerProductPayload | FormData
) => {
  const response = await api.patch<{
    success: boolean;
    data: MarketplaceProduct;
  }>(`seller/product/${productId}`, payload);

  return response.data.data;
};

export const updateSellerProductStock = async (
  productId: string,
  stock: number
) => {
  const response = await api.patch<{
    success: boolean;
    data: MarketplaceProduct;
  }>(`seller/product/${productId}/stock`, { stock });

  return response.data.data;
};

export const deleteSellerProduct = async (productId: string) => {
  const response = await api.delete(`seller/product/${productId}`);

  return response.data;
};

export const fetchSellerOrders = async () => {
  const response = await api.get<{
    success: boolean;
    data: SellerOrder[];
  }>("seller/orders");

  return response.data.data;
};

export const fetchMyMarketplaceOrders = async () => {
  const response = await api.get<{
    success: boolean;
    data: MarketplaceOrder[];
  }>("orders/my-orders");

  return response.data.data;
};

export const createOrUpdateSellerProfileApi = async (payload: FormData) => {
  const response = await api.post<{ success: boolean; data: SellerProfile }>(
    "seller/profile",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
