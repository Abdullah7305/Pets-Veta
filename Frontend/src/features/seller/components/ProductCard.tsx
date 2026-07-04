import { useEffect, useState } from "react";
import { FaBoxOpen, FaEye, FaPen, FaTrashAlt } from "react-icons/fa";

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

const ProductCard = ({
  product,
  stockUpdating,
  onEdit,
  onDelete,
  onView,
  onStockChange,
  onMarkSoldOut,
}: ProductCardProps) => {
  const image = getProductImage(product);
  const price = getProductPrice(product);

  const [stockValue, setStockValue] = useState(String(product.stock ?? 0));

  useEffect(() => {
    setStockValue(String(product.stock ?? 0));
  }, [product.stock]);

  const parsedStock = Number(stockValue);
  const isInvalidStock =
    stockValue.trim() === "" || Number.isNaN(parsedStock) || parsedStock < 0;

  const isSoldOut = product.status === "SOLD_OUT" || product.stock <= 0;

  const handleStockUpdate = () => {
    if (isInvalidStock) return;

    onStockChange(product.id, Math.floor(parsedStock));
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-44 bg-gray-50">
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-cover"
        />

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${statusClass[product.status] || "bg-gray-100 text-gray-600"
            }`}
        >
          {product.status.replace("_", " ")}
        </span>
      </div>

      <div className="p-4">
        <div className="min-h-[58px]">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
            {product.title}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {toDisplayCategory(product.category)}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-gray-900">
            PKR {price.toLocaleString()}
          </p>

          <p
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isSoldOut
                ? "bg-red-50 text-red-600"
                : "bg-[#178f95]/10 text-[#178f95]"
              }`}
          >
            Stock: {product.stock}
          </p>
        </div>

        <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
          <label
            htmlFor={`stock-${product.id}`}
            className="mb-2 block text-xs font-semibold text-gray-600"
          >
            Manage Stock
          </label>

          <div className="flex gap-2">
            <input
              id={`stock-${product.id}`}
              type="number"
              min={0}
              value={stockValue}
              onChange={(event) => setStockValue(event.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-[#178f95]"
              placeholder="Stock"
            />

            <Button
              size="sm"
              disabled={isInvalidStock || stockUpdating}
              loading={stockUpdating}
              loadingText="Updating..."
              onClick={handleStockUpdate}
            >
              Update
            </Button>
          </div>

          {isInvalidStock && (
            <p className="mt-2 text-xs font-medium text-red-500">
              Stock must be 0 or greater.
            </p>
          )}

          <button
            type="button"
            disabled={stockUpdating || isSoldOut}
            onClick={() => onMarkSoldOut(product.id)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-red-100 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaBoxOpen />
            Mark Sold Out
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" onClick={onEdit} className="gap-2">
            <FaPen />
            Edit
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="gap-2 border-red-200 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white"
          >
            <FaTrashAlt />
            Delete
          </Button>
        </div>

        <button
          type="button"
          onClick={onView}
          className="mt-3 flex w-full items-center justify-center gap-2 text-center text-xs font-semibold text-[#178f95] transition hover:text-[#12757a]"
        >
          <FaEye />
          View in Marketplace
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;