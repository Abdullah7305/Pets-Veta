import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import { recentOrders } from "../data/sellerDashboard.data";

const statusClass: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

const RecentOrders = () => {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>

        <Button variant="outline" size="sm">
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
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-3 font-medium text-[#178f95]">
                  {order.id}
                </td>
                <td className="py-3 text-gray-700">{order.product}</td>
                <td className="py-3 text-gray-600">{order.buyer}</td>
                <td className="py-3 text-gray-700">{order.amount}</td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusClass[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 text-gray-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentOrders;