import { FaEllipsisV } from "react-icons/fa";
import Card from "@/shared/components/Card/Card";
import Button from "@/shared/components/Button/Button";
import { sellerOrders } from "../data/sellerOrdersStock.data";

const statusClass: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrdersTable = () => {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="max-h-[310px] overflow-y-auto">
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
            {sellerOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-medium text-[#178f95]">
                  {order.id}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="h-9 w-9 rounded-md object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {order.product}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-600">{order.buyer}</td>
                <td className="px-5 py-4 text-gray-600">{order.quantity}</td>
                <td className="px-5 py-4 text-gray-700">{order.amount}</td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusClass[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-gray-500">{order.date}</td>

                <td className="px-5 py-4">
                  <Button variant="outline" size="sm">
                    <FaEllipsisV />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default OrdersTable;