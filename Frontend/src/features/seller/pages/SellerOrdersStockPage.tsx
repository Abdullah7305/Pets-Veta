import { FaFilter } from "react-icons/fa";
import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import OrdersTable from "../components/OrdersTable";
import StockOverview from "../components/StockOverview";
import StockTable from "../components/StockTable";
import { orderTabs } from "../data/sellerOrdersStock.data";

const SellerOrdersStockPage = () => {
  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-6">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
              <p className="text-sm text-gray-500">
                Manage and track all customer orders.
              </p>
            </div>

            <div className="flex gap-3">
              <Input placeholder="Search orders..." className="w-72" />

              <Button className="gap-2">
                <FaFilter />
                Filter
              </Button>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-3">
            {orderTabs.map((tab, index) => (
              <Button key={tab} variant={index === 0 ? "primary" : "outline"} size="sm">
                {tab}
              </Button>
            ))}
          </div>

          <OrdersTable />

          <div className="mt-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Stock Management
            </h2>

           <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
  <StockOverview />
  <StockTable />
</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerOrdersStockPage;