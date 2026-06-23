import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import SellerStatCard from "../components/SellerStatCard";
import RecentOrders from "../components/RecentOrders";
import { FaPlusCircle, FaStore, FaShoppingBag } from "react-icons/fa";
import type { MarketplaceProduct } from "@/features/marketplace1/api/marketplace.api";
import {
  fetchSellerOrders,
  fetchSellerProducts,
  type SellerOrder,
} from "../api/seller.api";
import type { SellerApiError } from "../types/seller.types";

const SellerDashboardPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      try {
        const [productData, orderData] = await Promise.all([
          fetchSellerProducts(),
          fetchSellerOrders(),
        ]);

        if (!ignore) {
          setProducts(productData);
          setOrders(orderData);
        }
      } catch (err) {
        const apiError = err as SellerApiError;

        if (apiError.response?.status === 401) {
          navigate("/login", { state: { redirectTo: "/seller/dashboard" } });
          return;
        }

        if (!ignore) {
          setError("Unable to load the seller dashboard. Please check your connection and try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      ignore = true;
    };
  }, [navigate]);

  const stats = useMemo(() => {
    const activeProducts = products.filter((product) => product.status === "ACTIVE").length;
    const lowStock = products.filter(
      (product) => product.stock > 0 && product.stock <= 3
    ).length;
    const pendingOrders = orders.filter((order) => order.status === "PENDING").length;
    const revenue = orders.reduce(
      (total, order) => total + Number(order.totalAmount || 0),
      0
    );

    return [
      { title: "Total Products", value: String(products.length), subtitle: "All listings" },
      { title: "Active Listings", value: String(activeProducts), subtitle: "Live on Marketplace" },
      { title: "Low Stock Items", value: String(lowStock), subtitle: "Requires attention" },
      { title: "Total Orders", value: String(orders.length), subtitle: "All time" },
      { title: "Pending Orders", value: String(pendingOrders), subtitle: "Awaiting action" },
      { title: "Revenue", value: `PKR ${revenue.toLocaleString()}`, subtitle: "All time" },
    ];
  }, [products, orders]);

  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-7">
          {loading && (
            <p className="mb-5 rounded-lg bg-white p-4 text-sm text-gray-500">
              Loading seller dashboard...
            </p>
          )}

          {error && (
            <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {stats.map((stat) => (
              <SellerStatCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="mt-6">
            <RecentOrders
              orders={orders.slice(0, 6)}
              onViewAll={() => navigate("/seller/orders")}
            />
          </div>

          <Card className="mt-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Quick Actions
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <Button className="gap-2" onClick={() => navigate("/seller/add-product")}>
                <FaPlusCircle /> Add Product
              </Button>

              <Button variant="outline" className="gap-2" onClick={() => navigate("/marketplace1")}>
                <FaStore /> View Marketplace
              </Button>

              <Button variant="outline" className="gap-2" onClick={() => navigate("/seller/orders")}>
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
