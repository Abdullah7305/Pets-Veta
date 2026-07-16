import { api } from "@/features/api interface/axios.interface";

export type MarketplaceImage = {
  id?: string;
  publicUrl: string;
  publicId?: string | null;
};

export type MarketplaceProduct = {
  id: string;
  sellerId?: string;
  title: string;
  description?: string | null;
  category: "PETS" | "FOOD" | "MEDICINE" | "ACCESSORIES";
  status: "ACTIVE" | "DRAFT" | "SOLD_OUT" | "ARCHIVED";
  price: string | number;
  stock: number;
  location?: string | null;
  images?: MarketplaceImage[];
  seller?: {
    businessName?: string | null;
    city?: string | null;
    user?: {
      id?: string;
      fullName?: string | null;
      name?: string | null;
      username?: string | null;
      email?: string | null;
      phone?: string | null;
      profileImageUrl?: string | null;
    };
  };
  savedBy?: Array<{ userId: string; productId: string }>;
};

export type MarketplaceProductsResponse = {
  products: MarketplaceProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const toBackendCategory = (category: string) => {
  const map: Record<string, string> = {
    Pets: "PETS",
    Food: "FOOD",
    Medicine: "MEDICINE",
    Accessories: "ACCESSORIES",
  };

  return map[category] || category;
};

export const toDisplayCategory = (category: string) => {
  const map: Record<string, string> = {
    PETS: "Pets",
    FOOD: "Food",
    MEDICINE: "Medicine",
    ACCESSORIES: "Accessories",
  };

  return map[category] || category;
};

export const getProductImage = (product: MarketplaceProduct) => {
  return (
    product.images?.[0]?.publicUrl ||
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80"
  );
};

export const getProductPrice = (product: MarketplaceProduct) => {
  return Number(product.price || 0);
};

export const getSellerName = (product: MarketplaceProduct) => {
  return (
    product.seller?.user?.username ||
    product.seller?.user?.fullName ||
    product.seller?.user?.name ||
    product.seller?.businessName ||
    "Pets Veta User"
  );
};

export const getSellerImage = (product: MarketplaceProduct) => {
  return product.seller?.user?.profileImageUrl || "";
};

export const fetchMarketplaceProducts = async (params: {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  location?: string;
}) => {
  const response = await api.get<{
    success: boolean;
    data: MarketplaceProductsResponse;
  }>("marketplace/products", { params });

  return response.data.data;
};

export const fetchMarketplaceProductById = async (productId: string) => {
  const response = await api.get<{ success: boolean; data: MarketplaceProduct }>(
    `marketplace/product/${productId}`
  );

  return response.data.data;
};

export const saveMarketplaceListing = async (productId: string) => {
  const response = await api.post(`marketplace/save/${productId}`);

  return response.data;
};

export const removeMarketplaceListing = async (productId: string) => {
  const response = await api.delete(`marketplace/save/${productId}`);

  return response.data;
};

export const fetchSavedMarketplaceListings = async () => {
  const response = await api.get<{
    success: boolean;
    data: Array<{ productId: string; product: MarketplaceProduct }>;
  }>("marketplace/saved");

  return response.data.data;
};


export const checkProductStockApi = async (productId: string, quantity: number) => {
  const response = await api.get<{
    success: boolean;
    message: string;
    availableStock?: number;
  }>(`marketplace/product/${productId}/check-stock?quantity=${quantity}`);
  
  return response.data;
};