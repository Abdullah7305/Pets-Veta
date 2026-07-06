import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaFilter,
  FaShoppingBag,
  FaStore,
  FaUser,
} from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import Card from "@/shared/components/Card/Card";
import PageBackButton from "@/shared/components/BackButton/PageBackButton";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";

import { getProductImage } from "@/features/marketplace1/api/marketplace.api";
import {
  fetchMyMarketplaceOrders,
  fetchSellerOrders,
  type MarketplaceOrder,
} from "../api/seller.api";
import type { SellerApiError } from "../types/seller.types";

type OrderView = "PURCHASES" | "SALES";

const orderTabs = [
  "All",
  "Pending",
  "Confirmed",
  "Shipped",
  "Completed",
  "Cancelled",
];

const statusClass: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-green-100 text-green-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const paymentStatusClass: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  SUCCEEDED: "bg-emerald-100 text-emerald-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  FAILED: "bg-red-100 text-red-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-700",
};

const formatStatus = (status?: string | null) => {
  if (!status) return "N/A";

  return status.replace(/_/g, " ");
};

const getOrderTotal = (order: MarketplaceOrder) => {
  return Number(order.totalAmount || 0);
};

const getOrderQuantity = (order: MarketplaceOrder) => {
  return order.items.reduce((total, item) => total + Number(item.quantity || 0), 0);
};

const getProductTitle = (order: MarketplaceOrder) => {
  const firstProduct = order.items[0]?.product;

  if (!firstProduct) return "Product";

  if (order.items.length > 1) {
    return `${firstProduct.title} +${order.items.length - 1} more`;
  }

  return firstProduct.title;
};

const getBuyerName = (order: MarketplaceOrder) => {
  return order.buyer?.fullName || order.buyer?.email || "Buyer";
};

const getSellerName = (order: MarketplaceOrder) => {
  return (
    order.seller?.user?.fullName ||
    order.seller?.businessName ||
    order.seller?.user?.email ||
    "Seller"
  );
};

const SellerOrdersStockPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [purchaseOrders, setPurchaseOrders] = useState<MarketplaceOrder[]>([]);
  const [salesOrders, setSalesOrders] = useState<MarketplaceOrder[]>([]);
  const [orderView, setOrderView] = useState<OrderView>("PURCHASES");
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const [myPurchases, mySales] = await Promise.all([
          fetchMyMarketplaceOrders(),
          fetchSellerOrders(),
        ]);

        if (!ignore) {
          setPurchaseOrders(myPurchases);
          setSalesOrders(mySales);
        }
      } catch (err) {
        const apiError = err as SellerApiError;

        if (apiError.response?.status === 401) {
          navigate("/login", { state: { redirectTo: location.pathname } });
          return;
        }

        if (!ignore) {
          setError(
            apiError.response?.data?.message ||
            "Unable to load your orders. Please check your connection and try again."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadOrders();

    return () => {
      ignore = true;
    };
  }, [location.pathname, navigate]);

  const activeOrders = orderView === "PURCHASES" ? purchaseOrders : salesOrders;

  const filteredOrders = useMemo(() => {
    return activeOrders.filter((order) => {
      const productName = getProductTitle(order);
      const buyer = getBuyerName(order);
      const seller = getSellerName(order);

      const searchText = `${order.orderNumber} ${productName} ${buyer} ${seller}`
        .toLowerCase()
        .trim();

      const searchMatch = searchText.includes(search.toLowerCase().trim());

      const statusMatch =
        activeStatus === "All" || order.status === activeStatus.toUpperCase();

      return searchMatch && statusMatch;
    });
  }, [activeOrders, activeStatus, search]);

  const currentEmptyMessage =
    orderView === "PURCHASES"
      ? "You have not purchased any marketplace listing yet."
      : "No buyer has placed an order on your listings yet.";

  const renderOrdersTable = () => {
    if (filteredOrders.length === 0) {
      return (
        <Card className="flex min-h-[320px] flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#178f95]/10 text-2xl text-[#178f95]">
            <FaBoxOpen />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            No orders found
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
            {currentEmptyMessage}
          </p>

          {orderView === "PURCHASES" ? (
            <Button className="mt-5" onClick={() => navigate("/marketplace1")}>
              Explore Marketplace
            </Button>
          ) : (
            <Button className="mt-5" onClick={() => navigate("/seller/listings")}>
              View My Listings
            </Button>
          )}
        </Card>
      );
    }

    return (
      <Card className="overflow-hidden p-0">
        <div className="max-h-[560px] overflow-y-auto" data-lenis-prevent>
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-10 bg-white text-xs text-gray-500">
              <tr className="border-b border-gray-100">
                <th className="px-5 py-4">Order ID</th>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">
                  {orderView === "PURCHASES" ? "Seller" : "Buyer"}
                </th>
                <th className="px-5 py-4">Quantity</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Order Status</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => {
                const firstProduct = order.items[0]?.product;
                const quantity = getOrderQuantity(order);
                const amount = getOrderTotal(order);
                const personName =
                  orderView === "PURCHASES"
                    ? getSellerName(order)
                    : getBuyerName(order);

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-semibold text-[#178f95]">
                      {order.orderNumber}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex min-w-[220px] items-center gap-3">
                        {firstProduct && (
                          <img
                            src={getProductImage(firstProduct)}
                            alt={firstProduct.title}
                            className="h-10 w-10 shrink-0 rounded-lg object-cover"
                          />
                        )}

                        <div>
                          <p className="line-clamp-1 font-semibold text-gray-800">
                            {getProductTitle(order)}
                          </p>

                          <p className="text-xs text-gray-400">
                            {order.items.length} item
                            {order.items.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        {orderView === "PURCHASES" ? (
                          <FaStore className="text-[#178f95]" />
                        ) : (
                          <FaUser className="text-[#178f95]" />
                        )}
                        <span>{personName}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-gray-600">{quantity}</td>

                    <td className="px-5 py-4 font-semibold text-gray-800">
                      PKR {amount.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[order.status] ||
                          "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentStatusClass[order.paymentStatus || "PENDING"] ||
                          "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {formatStatus(order.paymentStatus || "PENDING")}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-500">
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

  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-6">

          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#178f95]">
                Order Center
              </p>

              <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                Orders
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                Manage both sides of marketplace activity. My Purchases are
                listings you bought, and My Sales are orders placed on your own
                listings.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder="Search orders..."
                className="w-full sm:w-72"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <Button className="gap-2">
                <FaFilter />
                Filter
              </Button>
            </div>
          </div>

          {loading && (
            <p className="mb-5 rounded-lg bg-white p-4 text-sm text-gray-500">
              Loading orders...
            </p>
          )}

          {error && (
            <p className="mb-5 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="mb-5 grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setOrderView("PURCHASES");
                setActiveStatus("All");
                setSearch("");
              }}
              className={`rounded-2xl border p-5 text-left transition ${orderView === "PURCHASES"
                  ? "border-[#178f95] bg-[#e8f7f7] shadow-sm"
                  : "border-gray-100 bg-white hover:border-[#178f95]/40"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#178f95]">
                  <FaShoppingBag />
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    My Purchases
                  </h2>
                  <p className="text-sm text-gray-500">
                    {purchaseOrders.length} orders you placed
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setOrderView("SALES");
                setActiveStatus("All");
                setSearch("");
              }}
              className={`rounded-2xl border p-5 text-left transition ${orderView === "SALES"
                  ? "border-[#178f95] bg-[#e8f7f7] shadow-sm"
                  : "border-gray-100 bg-white hover:border-[#178f95]/40"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#178f95]">
                  <FaStore />
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    My Sales
                  </h2>
                  <p className="text-sm text-gray-500">
                    {salesOrders.length} orders from buyers
                  </p>
                </div>
              </div>
            </button>
          </div>

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

          {!loading && !error && renderOrdersTable()}
        </section>
      </main>
    </div>
  );
};

export default SellerOrdersStockPage;