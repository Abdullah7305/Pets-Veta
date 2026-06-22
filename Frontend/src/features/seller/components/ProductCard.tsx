import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import {
  getProductImage,
  getProductPrice,
  toDisplayCategory,
} from "@/features/marketplace1/api/marketplace.api";
import type { ProductCardProps } from "../types/seller.types";

const statusClass: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  SOLD_OUT: "bg-red-100 text-red-700",
  DRAFT: "bg-gray-100 text-gray-600",
  ARCHIVED: "bg-gray-100 text-gray-600",
};

const ProductCard = ({ product, onEdit, onDelete, onView }: ProductCardProps) => {
  const image = getProductImage(product);
  const price = getProductPrice(product);

  return (
    <Card className="p-0 overflow-hidden">
      <div className="relative h-44 bg-gray-50">
        <img src={image} alt={product.title} className="h-full w-full object-cover" />

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
            statusClass[product.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {product.status.replace("_", " ")}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900">{product.title}</h3>
        <p className="mt-1 text-xs text-gray-500">
          {toDisplayCategory(product.category)}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">
            PKR {price.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">Stock: {product.stock}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit
          </Button>

          <Button variant="outline" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>

        <button
          type="button"
          onClick={onView}
          className="mt-3 w-full text-center text-xs font-medium text-[#178f95]"
        >
          View in Marketplace
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;
