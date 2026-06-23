import Card from "@/shared/components/Card/Card";
import type { StockOverviewProps } from "../types/seller.types";

const StockOverview = ({ products }: StockOverviewProps) => {
  const total = products.length;
  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= 3
  ).length;
  const outOfStock = products.filter(
    (product) => product.stock <= 0 || product.status === "SOLD_OUT"
  ).length;
  const inStock = Math.max(total - lowStock - outOfStock, 0);
  const inStockPercent = total ? Math.round((inStock / total) * 100) : 0;
  const lowStockPercent = total ? Math.round((lowStock / total) * 100) : 0;
  const outPercent = total ? Math.round((outOfStock / total) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4">
          <p className="text-xs text-gray-500">Total Products</p>
          <h3 className="mt-2 text-2xl font-bold text-[#178f95]">{total}</h3>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-gray-500">Low Stock Items</p>
          <h3 className="mt-2 text-2xl font-bold text-red-500">{lowStock}</h3>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-gray-500">Out of Stock</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">{outOfStock}</h3>
        </Card>
      </div>

      <Card>
        <h3 className="mb-5 text-sm font-semibold text-gray-900">
          Stock Overview
        </h3>

        <div className="flex items-center gap-6">
          <div
            className="relative h-32 w-32 rounded-full"
            style={{
              background: `conic-gradient(#178f95 0 ${inStockPercent}%, #f5b942 ${inStockPercent}% ${
                inStockPercent + lowStockPercent
              }%, #ef4444 ${inStockPercent + lowStockPercent}% ${
                inStockPercent + lowStockPercent + outPercent
              }%, #8aa3a3 ${inStockPercent + lowStockPercent + outPercent}% 100%)`,
            }}
          >
            <div className="absolute inset-8 rounded-full bg-white" />
          </div>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[#178f95]" />
              In Stock {inStockPercent}%
            </p>

            <p className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[#f5b942]" />
              Low Stock {lowStockPercent}%
            </p>

            <p className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-red-500" />
              Out of Stock {outPercent}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockOverview;
