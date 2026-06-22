import type { MarketplaceProduct } from "@/features/marketplace1/api/marketplace.api";
import type { SellerOrder } from "../api/seller.api";

export type SellerApiError = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};

export type ProductPreviewCardProps = {
  image: string;
  title: string;
  category: string;
  price: string;
  stock: string;
  location: string;
  description: string;
  status: string;
};

export type ProductImageUploadProps = {
  previews: string[];
  onImageChange: (files: File[]) => void;
};

export type ProductCardProps = {
  product: MarketplaceProduct;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
};

export type OrdersTableProps = {
  orders: SellerOrder[];
};

export type StockTableProps = {
  products: MarketplaceProduct[];
  onStockChange: (productId: string, stock: number) => void;
};

export type RecentOrdersProps = {
  orders: SellerOrder[];
  onViewAll: () => void;
};

export type StockOverviewProps = {
  products: MarketplaceProduct[];
};

export type SellerStatCardProps = {
  title: string;
  value: string;
  subtitle: string;
};
