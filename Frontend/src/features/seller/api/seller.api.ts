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

export type SellerOrder = {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: string | number;
  createdAt: string;
  buyer?: {
    fullName?: string | null;
    email?: string | null;
  };
  items: Array<{
    quantity: number;
    product: MarketplaceProduct;
  }>;
};

export const fetchSellerProducts = async () => {
  const response = await api.get<{ success: boolean; data: MarketplaceProduct[] }>(
    "seller/products"
  );

  return response.data.data;
};

export const fetchMySellerProfileApi = async () => {
  const response = await api.get<{ success: boolean; data: SellerProfile }>(
    "seller/profile"
  );
  return response.data;
};

export const createSellerProduct = async (payload: SellerProductPayload | FormData) => {
  const response = await api.post<{ success: boolean; data: MarketplaceProduct }>(
    "seller/product",
    payload
  );

  return response.data.data;
};

export const updateSellerProduct = async (
  productId: string,
  payload: SellerProductPayload | FormData
) => {
  const response = await api.patch<{ success: boolean; data: MarketplaceProduct }>(
    `seller/product/${productId}`,
    payload
  );

  return response.data.data;
};

export const updateSellerProductStock = async (
  productId: string,
  stock: number
) => {
  const response = await api.patch<{ success: boolean; data: MarketplaceProduct }>(
    `seller/product/${productId}/stock`,
    { stock }
  );

  return response.data.data;
};

export const deleteSellerProduct = async (productId: string) => {
  const response = await api.delete(`seller/product/${productId}`);
  return response.data;
};

export const fetchSellerOrders = async () => {
  const response = await api.get<{ success: boolean; data: SellerOrder[] }>(
    "seller/orders"
  );

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