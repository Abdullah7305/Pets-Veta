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
import { fetchSellerProducts, deleteSellerProduct } from "../api/seller.api";
import type { MarketplaceProduct } from "@/features/marketplace1/api/marketplace.api";
import type { SellerApiError } from "../types/seller.types";

const SellerProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Category");
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      try {
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
          setError("Unable to load seller products. Please check your connection and try again.");
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
      const searchMatch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const categoryMatch =
        category === "Category" || product.category === category.toUpperCase();
      const tabCategoryMatch =
        !["Pets", "Food", "Accessories"].includes(activeTab) ||
        product.category === activeTab.toUpperCase();
      const tabStatusMatch =
        !["Active", "Sold Out", "Draft"].includes(activeTab) ||
        product.status === activeTab.toUpperCase().replace(" ", "_");

      return searchMatch && categoryMatch && tabCategoryMatch && tabStatusMatch;
    });
  }, [products, search, category, activeTab]);

  const handleDelete = async (id: string) => {
    try {
      await deleteSellerProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch {
      setError("Unable to delete the product. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-7">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                My Listings
              </h1>
              <p className="text-sm text-gray-500">
                Manage all your product listings and their status.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder="Search products..."
                className="w-full sm:w-72"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#178f95]"
              >
                <option>Category</option>
                <option>Pets</option>
                <option>Food</option>
                <option>Accessories</option>
              </select>

              <Button className="gap-2">
                <FaFilter />
                Filter
              </Button>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-3">
            {productTabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab || (index === 0 && activeTab === "All")
                    ? "bg-[#178f95] text-white"
                    : "bg-white text-gray-600 hover:bg-[#e8f7f7] hover:text-[#178f95]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <Card className="flex min-h-[320px] flex-col items-center justify-center border-dashed border-gray-300 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                <FaPlus className="text-xl" />
              </div>

              <h3 className="text-base font-semibold text-gray-900">
                Add New Product
              </h3>

              <p className="mt-2 max-w-[220px] text-sm text-gray-500">
                Create a new listing for your products
              </p>

              <Button className="mt-5" onClick={() => navigate("/seller/add-product")}>
                Add Product
              </Button>
            </Card>

            {loading && (
              <Card className="min-h-[180px] text-sm text-gray-500">
                Loading seller products...
              </Card>
            )}

            {error && (
              <Card className="min-h-[180px] text-sm font-medium text-red-600">
                {error}
              </Card>
            )}

            {!loading && !error && filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => navigate(`/seller/edit-product/${product.id}`)}
                onDelete={() => void handleDelete(product.id)}
                onView={() => navigate(`/marketplace/product/${product.id}`)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerProductsPage;
