import { useState } from "react";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import { stockProducts } from "../data/sellerOrdersStock.data";

const StockTable = () => {
  const [products, setProducts] = useState(stockProducts);

  const updateStock = (id: number, type: "inc" | "dec") => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              stock:
                type === "inc" ? item.stock + 1 : Math.max(item.stock - 1, 0),
            }
          : item
      )
    );
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="grid grid-cols-[1.6fr_100px_120px_150px] border-b border-gray-100 px-5 py-4 text-xs font-semibold text-gray-500">
        <p>Product</p>
        <p className="text-center">Stock</p>
        <p className="text-center">Status</p>
        <p className="text-center">Update</p>
      </div>

      <div className="divide-y divide-gray-100">
        {products.map((item) => {
          const isLowStock = item.stock <= 3;

          return (
            <div
              key={item.id}
              className="grid grid-cols-[1.6fr_100px_120px_150px] items-center px-5 py-4 hover:bg-gray-50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <img
                  src={item.image}
                  alt={item.product}
                  className="h-12 w-12 shrink-0 rounded-lg object-cover"
                />

                <p className="truncate text-sm font-medium text-gray-900">
                  {item.product}
                </p>
              </div>

              <p className="text-center text-sm font-medium text-gray-700">
                {item.stock}
              </p>

              <div className="flex justify-center">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    isLowStock
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {isLowStock ? "Low Stock" : "In Stock"}
                </span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 px-0"
                  onClick={() => updateStock(item.id, "dec")}
                >
                  -
                </Button>

                <span className="w-8 text-center text-sm font-semibold text-gray-900">
                  {item.stock}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 px-0"
                  onClick={() => updateStock(item.id, "inc")}
                >
                  +
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default StockTable;