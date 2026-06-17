import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import type { SellerOrder } from "../api/seller.api";

type Props = {
  orders: SellerOrder[];
  onViewAll: () => void;
};

const statusClass: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const RecentOrders = ({ orders, onViewAll }: Props) => {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>

        <Button variant="outline" size="sm" onClick={onViewAll}>
          View all
        </Button>
      </div>

      <div className="max-h-[320px] overflow-y-auto pr-2">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-white text-xs text-gray-500">
            <tr>
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Product</th>
              <th className="pb-3">Buyer</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => {
              const product = order.items[0]?.product;
              const amount = Number(order.totalAmount || 0);

              return (
                <tr key={order.id}>
                  <td className="py-3 font-medium text-[#178f95]">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 text-gray-700">{product?.title || "Product"}</td>
                  <td className="py-3 text-gray-600">
                    {order.buyer?.fullName || order.buyer?.email || "Buyer"}
                  </td>
                  <td className="py-3 text-gray-700">
                    PKR {amount.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusClass[order.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
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

export default RecentOrders;
