import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import type { RecentOrdersProps } from "../types/seller.types";

const statusClass: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const formatStatus = (status?: string | null) => {
  if (!status) return "N/A";

  return status.replace(/_/g, " ");
};

const getOrderTotal = (totalAmount?: string | number | null) => {
  return Number(totalAmount || 0);
};

const RecentOrders = ({ orders, onViewAll }: RecentOrdersProps) => {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Orders
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Latest marketplace order activity.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={onViewAll}>
          View all
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-center">
          <h3 className="text-base font-bold text-gray-900">
            No recent orders
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Your latest marketplace sales and purchases will appear here once
            order activity starts.
          </p>

          <Button variant="outline" size="sm" className="mt-4" onClick={onViewAll}>
            Open Orders
          </Button>
        </div>
      ) : (
        <div className="max-h-[320px] overflow-y-auto pr-2" data-lenis-prevent>
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-white text-xs text-gray-500">
              <tr>
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Listing</th>
                <th className="pb-3">Buyer</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => {
                const product = order.items[0]?.product;
                const amount = getOrderTotal(order.totalAmount);
                const buyerName =
                  order.buyer?.fullName || order.buyer?.email || "Buyer";

                return (
                  <tr key={order.id}>
                    <td className="py-3 pr-3 font-medium text-[#178f95]">
                      {order.orderNumber}
                    </td>

                    <td className="max-w-[170px] py-3 pr-3 text-gray-700">
                      <p className="line-clamp-1 font-medium">
                        {product?.title || "Listing"}
                      </p>

                      {order.items.length > 1 && (
                        <p className="text-xs text-gray-400">
                          +{order.items.length - 1} more
                        </p>
                      )}
                    </td>

                    <td className="max-w-[140px] py-3 pr-3 text-gray-600">
                      <p className="line-clamp-1">{buyerName}</p>
                    </td>

                    <td className="py-3 pr-3 text-gray-700">
                      PKR {amount.toLocaleString()}
                    </td>

                    <td className="py-3 pr-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[order.status] ||
                          "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {formatStatus(order.status)}
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
      )}
    </Card>
  );
};

export default RecentOrders;