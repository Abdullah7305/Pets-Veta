import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import OrdersTable from "../components/OrdersTable";
import StockOverview from "../components/StockOverview";
import StockTable from "../components/StockTable";
import type { MarketplaceProduct } from "@/features/marketplace1/api/marketplace.api";
import {
  fetchSellerOrders,
  fetchSellerProducts,
  updateSellerProductStock,
  type SellerOrder,
} from "../api/seller.api";

const orderTabs = ["All", "Pending", "Confirmed", "Shipped", "Completed", "Cancelled"];

type ApiError = {
  response?: {
    status?: number;
  };
};

const SellerOrdersStockPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isStockPage = location.pathname.includes("/stock");
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
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
        const apiError = err as ApiError;

        if (apiError.response?.status === 401) {
          navigate("/login", { state: { redirectTo: location.pathname } });
          return;
        }

        if (!ignore) {
          setError("Unable to load seller orders and stock. Please check your connection and try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      ignore = true;
    };
  }, [location.pathname, navigate]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const productName = order.items[0]?.product?.title || "";
      const buyer = order.buyer?.fullName || order.buyer?.email || "";
      const searchMatch = `${order.orderNumber} ${productName} ${buyer}`
        .toLowerCase()
        .includes(search.toLowerCase());
      const statusMatch =
        activeStatus === "All" || order.status === activeStatus.toUpperCase();

      return searchMatch && statusMatch;
    });
  }, [orders, search, activeStatus]);

  const handleStockChange = async (productId: string, stock: number) => {
    try {
      const updatedProduct = await updateSellerProductStock(productId, stock);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? updatedProduct : product
        )
      );
    } catch {
      setError("Unable to update stock. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-6">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {isStockPage ? "Stock" : "Orders"}
              </h1>
              <p className="text-sm text-gray-500">
                {isStockPage
                  ? "Update stock levels for all marketplace products."
                  : "Manage and track all customer orders."}
              </p>
            </div>

            <div className="flex gap-3">
              <Input
                placeholder="Search orders..."
                className="w-72"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Button className="gap-2">
                <FaFilter />
                Filter
              </Button>
            </div>
          </div>

          {loading && (
            <p className="mb-5 rounded-lg bg-white p-4 text-sm text-gray-500">
              Loading seller data...
            </p>
          )}

          {error && (
            <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {!isStockPage && (
            <>
              <div className="mb-4 flex flex-wrap gap-3">
                {orderTabs.map((tab) => (
                  <Button
                    key={tab}
                    variant={activeStatus === tab ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setActiveStatus(tab)}
                  >
                    {tab}
                  </Button>
                ))}
              </div>

              <OrdersTable orders={filteredOrders} />
            </>
          )}

          <div className={isStockPage ? "" : "mt-6"}>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Stock Management
            </h2>

            <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
              <StockOverview products={products} />
              <StockTable products={products} onStockChange={handleStockChange} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerOrdersStockPage;
