import { FaEllipsisV } from "react-icons/fa";
import Card from "@/shared/components/Card/Card";
import Button from "@/shared/components/Button/Button";
import { getProductImage } from "@/features/marketplace1/api/marketplace.api";
import type { OrdersTableProps } from "../types/seller.types";

const statusClass: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const OrdersTable = ({ orders }: OrdersTableProps) => {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="max-h-[310px] overflow-y-auto" data-lenis-prevent>
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-white text-xs text-gray-500">
            <tr className="border-b border-gray-100">
              <th className="px-5 py-4">Order ID</th>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Buyer</th>
              <th className="px-5 py-4">Quantity</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => {
              const firstItem = order.items[0];
              const product = firstItem?.product;
              const quantity = order.items.reduce(
                (total, item) => total + item.quantity,
                0
              );
              const amount = Number(order.totalAmount || 0);

              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-[#178f95]">
                    {order.orderNumber}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {product && (
                        <img
                          src={getProductImage(product)}
                          alt={product.title}
                          className="h-9 w-9 rounded-md object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-800">
                        {product?.title || "Product"}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {order.buyer?.fullName || order.buyer?.email || "Buyer"}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{quantity}</td>
                  <td className="px-5 py-4 text-gray-700">
                    PKR {amount.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusClass[order.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    <Button variant="outline" size="sm">
                      <FaEllipsisV />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default OrdersTable;
