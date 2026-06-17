import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import SellerStatCard from "../components/SellerStatCard";
import RecentOrders from "../components/RecentOrders";
import { sellerStats } from "../data/sellerDashboard.data";
import { FaPlusCircle, FaStore, FaShoppingBag } from "react-icons/fa";

const SellerDashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-7">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sellerStats.map((stat) => (
              <SellerStatCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="mt-6">
            <RecentOrders />
          </div>

          <Card className="mt-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <Button className="gap-2">
                <FaPlusCircle /> Add Product
              </Button>

              <Button variant="outline" className="gap-2">
                <FaStore /> View Marketplace
              </Button>

              <Button variant="outline" className="gap-2">
                <FaShoppingBag /> Manage Orders
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default SellerDashboardPage;