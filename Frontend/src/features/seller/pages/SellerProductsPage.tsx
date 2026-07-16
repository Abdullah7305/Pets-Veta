import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter, FaPlus } from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import Card from "@/shared/components/Card/Card";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import ProductCard from "../components/ProductCard";
import { productTabs } from "../data/sellerProducts.data";
import {
  deleteSellerProduct,
  fetchSellerProducts,
  updateSellerProductStock,
} from "../api/seller.api";
import type { MarketplaceProduct } from "@/features/marketplace1/api/marketplace.api";
import type { SellerApiError } from "../types/seller.types";

const SellerProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Category");
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [stockUpdatingId, setStockUpdatingId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchSellerProducts();

        if (!ignore) {
          setProducts(data);
        }
      } catch (err) {
        const apiError = err as SellerApiError;

        if (apiError.response?.status === 401) {
          navigate("/login", { state: { redirectTo: "/seller/listings" } });
          return;
        }

        if (!ignore) {
          setError(
            apiError.response?.data?.message ||
            "Unable to load your listings. Please check your connection and try again."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      ignore = true;
    };
  }, [navigate]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const normalizedSearch = search.trim().toLowerCase();

      const searchMatch =
        normalizedSearch === "" ||
        product.title.toLowerCase().includes(normalizedSearch) ||
        product.description?.toLowerCase().includes(normalizedSearch);

      const categoryMatch =
        category === "Category" || product.category === category.toUpperCase();

      const tabCategoryMatch =
        !["Pets", "Food", "Medicine", "Accessories"].includes(activeTab) ||
        product.category === activeTab.toUpperCase();

      const tabStatusMatch =
        !["Active", "Sold Out", "Draft"].includes(activeTab) ||
        product.status === activeTab.toUpperCase().replace(" ", "_");

      return searchMatch && categoryMatch && tabCategoryMatch && tabStatusMatch;
    });
  }, [products, search, category, activeTab]);

  const handleDelete = async (id: string) => {
    try {
      setError("");
      setSuccessMessage("");

      const confirmed = window.confirm(
        "Are you sure you want to delete this listing?"
      );

      if (!confirmed) return;

      await deleteSellerProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      setSuccessMessage("Listing deleted successfully.");
    } catch (err) {
      const apiError = err as SellerApiError;

      setError(
        apiError.response?.data?.message ||
        "Unable to delete the listing. Please try again."
      );
    }
  };

  const handleStockChange = async (productId: string, stock: number) => {
    try {
      setError("");
      setSuccessMessage("");
      setStockUpdatingId(productId);

      const updatedProduct = await updateSellerProductStock(productId, stock);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? updatedProduct : product
        )
      );

      setSuccessMessage("Stock updated successfully.");
    } catch (err) {
      const apiError = err as SellerApiError;

      setError(
        apiError.response?.data?.message ||
        "Unable to update stock. Please try again."
      );
    } finally {
      setStockUpdatingId("");
    }
  };

  const handleMarkSoldOut = async (productId: string) => {
    await handleStockChange(productId, 0);
  };

  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-7">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#178f95]">
                Selling Center
              </p>

              <h1 className="mt-2 text-2xl font-semibold text-gray-900">
                My Listings
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your listed pets, products, stock, and listing status.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder="Search listings..."
                className="w-full sm:w-72"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#178f95]"
              >
                <option>Category</option>
                <option>Pets</option>
                <option>Food</option>
                <option>Medicine</option>
                <option>Accessories</option>
              </select>

              <Button className="gap-2">
                <FaFilter />
                Filter
              </Button>
            </div>
          </div>

          {error && (
            <p className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          {successMessage && (
            <p className="mb-5 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              {successMessage}
            </p>
          )}

          <div className="mb-5 flex flex-wrap gap-3">
            {productTabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeTab === tab || (index === 0 && activeTab === "All")
                    ? "bg-[#178f95] text-white"
                    : "bg-white text-gray-600 hover:bg-[#e8f7f7] hover:text-[#178f95]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <Card className="flex min-h-[390px] flex-col items-center justify-center border-dashed border-gray-300 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                <FaPlus className="text-xl" />
              </div>

              <h3 className="text-base font-semibold text-gray-900">
                Add New Listing
              </h3>

              <p className="mt-2 max-w-[240px] text-sm text-gray-500">
                Create a new marketplace listing for pets, food, medicine, or
                accessories.
              </p>

              <Button
                className="mt-5"
                onClick={() => navigate("/seller/add-product")}
              >
                Add Listing
              </Button>
            </Card>

            {loading && (
              <Card className="flex min-h-[390px] items-center justify-center text-sm text-gray-500">
                Loading your listings...
              </Card>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <Card className="flex min-h-[390px] flex-col items-center justify-center text-center">
                <h3 className="text-base font-semibold text-gray-900">
                  No listings found
                </h3>

                <p className="mt-2 max-w-[260px] text-sm text-gray-500">
                  Try changing your search/filter or create a new listing.
                </p>

                <Button
                  className="mt-5"
                  onClick={() => navigate("/seller/add-product")}
                >
                  Add Listing
                </Button>
              </Card>
            )}

            {!loading &&
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  stockUpdating={stockUpdatingId === product.id}
                  onEdit={() => navigate(`/seller/edit-product/${product.id}`)}
                  onDelete={() => void handleDelete(product.id)}
                  onView={() => navigate(`/marketplace/product/${product.id}`)}
                  onStockChange={handleStockChange}
                  onMarkSoldOut={(productId) => void handleMarkSoldOut(productId)}
                />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerProductsPage;