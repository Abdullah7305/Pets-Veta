import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaComments,
  FaHeart,
  FaPaw,
  FaPlusCircle,
  FaShoppingBag,
  FaShoppingCart,
  FaStore,
} from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import SellerStatCard from "../components/SellerStatCard";
import RecentOrders from "../components/RecentOrders";

import type { MarketplaceProduct } from "@/features/marketplace1/api/marketplace.api";
import { fetchSavedMarketplaceListings } from "@/features/marketplace1/api/marketplace.api";
import { getMyPetsApi } from "@/features/Pet Owner/pet profile/api/pets.api";
import {
  fetchSellerOrders,
  fetchSellerProducts,
  type SellerOrder,
} from "../api/seller.api";

import type { Pet } from "@/features/Pet Owner/pet profile/types/petProfile.types";
import type { SellerApiError } from "../types/seller.types";

const SellerDashboardPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [orders, setOrders] = useState<SellerOrder[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [savedListingsCount, setSavedListingsCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [productData, orderData, petsResponse, savedListings] =
          await Promise.all([
            fetchSellerProducts(),
            fetchSellerOrders(),
            getMyPetsApi(),
            fetchSavedMarketplaceListings(),
          ]);

        if (!ignore) {
          setProducts(productData);
          setOrders(orderData);
          setPets(petsResponse.data);
          setSavedListingsCount(savedListings.length);
        }
      } catch (err) {
        const apiError = err as SellerApiError;

        if (apiError.response?.status === 401) {
          navigate("/login", { state: { redirectTo: "/seller/dashboard" } });
          return;
        }

        if (!ignore) {
          setError(
            apiError.response?.data?.message ||
            "Unable to load your dashboard. Please check your connection and try again."
          );
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
    const activeListings = products.filter(
      (product) => product.status === "ACTIVE"
    ).length;

    const lowStock = products.filter(
      (product) => product.stock > 0 && product.stock <= 3
    ).length;

    const pendingOrders = orders.filter(
      (order) => order.status === "PENDING"
    ).length;

    const revenue = orders.reduce(
      (total, order) => total + Number(order.totalAmount || 0),
      0
    );

    return [
      {
        title: "My Pets",
        value: String(pets.length),
        subtitle: "Pets linked with appointments",
      },
      {
        title: "Active Listings",
        value: String(activeListings),
        subtitle: "Live on marketplace",
      },
      {
        title: "Low Stock",
        value: String(lowStock),
        subtitle: "Manage inside My Listings",
      },
      {
        title: "Saved Listings",
        value: String(savedListingsCount),
        subtitle: "Marketplace wishlist",
      },
      {
        title: "Pending Orders",
        value: String(pendingOrders),
        subtitle: "Orders awaiting action",
      },
      {
        title: "Revenue",
        value: `PKR ${revenue.toLocaleString()}`,
        subtitle: "Total sales revenue",
      },
    ];
  }, [orders, pets.length, products, savedListingsCount]);

  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-7">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#178f95]">
              My Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              Pets-Veta Control Center
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
              Manage your profile, pets, appointments, marketplace listings,
              orders, messages, saved listings, and cart from one dashboard.
            </p>
          </div>

          {loading && (
            <p className="mb-5 rounded-lg bg-white p-4 text-sm text-gray-500">
              Loading dashboard...
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

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <RecentOrders
              orders={orders.slice(0, 6)}
              onViewAll={() => navigate("/seller/orders")}
            />

            <Card>
              <h2 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Common actions for pet care and marketplace activity.
              </p>

              <div className="mt-5 grid gap-3">
                <Button
                  className="justify-start gap-2"
                  onClick={() => navigate("/pet-owner/my-pets")}
                >
                  <FaPaw />
                  Manage My Pets
                </Button>

                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  onClick={() => navigate("/pet-owner/pets/add")}
                >
                  <FaPlusCircle />
                  Add Pet
                </Button>

                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  onClick={() => navigate("/seller/add-product")}
                >
                  <FaPlusCircle />
                  Add Listing
                </Button>

                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  onClick={() => navigate("/marketplace1")}
                >
                  <FaStore />
                  Marketplace
                </Button>

                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  onClick={() => navigate("/pet-owner/appointments")}
                >
                  <FaCalendarAlt />
                  Appointments
                </Button>

                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  onClick={() => navigate("/messages")}
                >
                  <FaComments />
                  Messages
                </Button>

                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  onClick={() => navigate("/seller/saved-listings")}
                >
                  <FaHeart />
                  Saved Listings
                </Button>

                <Button
                  variant="outline"
                  className="justify-start gap-2"
                  onClick={() => navigate("/cart")}
                >
                  <FaShoppingCart />
                  Cart
                </Button>
              </div>
            </Card>
          </div>

          <Card className="mt-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Marketplace Selling Summary
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Stock is now managed inside My Listings. Separate stock page is
                  no longer needed.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => navigate("/seller/listings")}
                >
                  <FaShoppingBag />
                  My Listings
                </Button>

                <Button
                  className="gap-2"
                  onClick={() => navigate("/seller/orders")}
                >
                  <FaShoppingBag />
                  Orders
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default SellerDashboardPage;