import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaEdit,
  FaEye,
  FaTrashAlt,
} from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import {
  getProductImage,
  getProductPrice,
  toDisplayCategory,
} from "@/features/marketplace1/api/marketplace.api";

import type { ProductCardProps } from "../types/seller.types";

const statusClasses: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  DRAFT: "bg-gray-100 text-gray-600",
  SOLD_OUT: "bg-red-100 text-red-700",
};

const formatStatus = (status: string) => {
  return status.replace(/_/g, " ");
};

const ProductCard = ({
  product,
  stockUpdating,
  onEdit,
  onDelete,
  onView,
  onStockChange,
  onMarkSoldOut,
}: ProductCardProps) => {
  const [stockValue, setStockValue] = useState(String(product.stock));
  const [stockError, setStockError] = useState("");

  const image = getProductImage(product);
  const price = getProductPrice(product);
  const displayCategory = toDisplayCategory(product.category);

  useEffect(() => {
    setStockValue(String(product.stock));
  }, [product.stock]);

  const handleStockUpdate = () => {
    const parsedStock = Number(stockValue);

    if (Number.isNaN(parsedStock) || parsedStock < 0) {
      setStockError("Please enter a valid stock value.");
      return;
    }

    setStockError("");
    onStockChange(product.id, parsedStock);
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative flex h-64 w-full items-center justify-center bg-[#f8fbfb] p-4">
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-contain"
        />

        <span
          className={`absolute right-4 top-4 rounded-full px-4 py-1 text-xs font-bold ${statusClasses[product.status] || "bg-gray-100 text-gray-600"
            }`}
        >
          {formatStatus(product.status)}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-lg font-bold text-[#07182c]">
              {product.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">{displayCategory}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-lg font-extrabold text-[#07182c]">
            PKR {price.toLocaleString()}
          </p>

          <span className="rounded-full bg-[#178f95]/10 px-4 py-1 text-sm font-bold text-[#178f95]">
            Stock: {product.stock}
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="mb-3 text-sm font-semibold text-gray-700">
            Manage Stock
          </p>

          <div className="flex gap-3">
            <input
              type="number"
              min="0"
              value={stockValue}
              onChange={(event) => setStockValue(event.target.value)}
              className="h-12 min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-800 outline-none transition focus:border-[#178f95] focus:ring-4 focus:ring-[#178f95]/10"
            />

            <Button
              onClick={handleStockUpdate}
              disabled={stockUpdating}
              className="h-12 px-5"
            >
              {stockUpdating ? "Updating..." : "Update"}
            </Button>
          </div>

          {stockError && (
            <p className="mt-2 text-xs font-medium text-red-600">
              {stockError}
            </p>
          )}

          <Button
            variant="outline"
            className="mt-4 w-full gap-2 !border-red-100 !text-red-600 hover:!bg-red-50"
            onClick={() => onMarkSoldOut(product.id)}
            disabled={stockUpdating || product.stock === 0}
          >
            <FaBoxOpen />
            Mark Sold Out
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button variant="outline" className="gap-2" onClick={onEdit}>
            <FaEdit />
            Edit
          </Button>

          <Button
            variant="outline"
            className="gap-2 !border-red-200 !text-red-600 hover:!bg-red-50"
            onClick={onDelete}
          >
            <FaTrashAlt />
            Delete
          </Button>
        </div>

        <Button
          variant="outline"
          className="mt-3 w-full gap-2 !border-transparent !text-[#178f95] hover:!bg-[#178f95]/10"
          onClick={onView}
        >
          <FaEye />
          View in Marketplace
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;