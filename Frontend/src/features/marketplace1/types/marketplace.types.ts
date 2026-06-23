import type { MarketplaceProduct } from "../api/marketplace.api";

export type MarketplaceProductCardProps = {
  product: MarketplaceProduct;
  saved: boolean;
  onSave: () => void;
  onDetails: () => void;
};

export type MarketplaceDetailPanelProps = {
  product: MarketplaceProduct;
  onClose: () => void;
};

export type MarketplaceFiltersProps = {
  search: string;
  category: string;
  location: string;
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
  onLocation: (value: string) => void;
  onClear: () => void;
};

export type MarketplacePaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
