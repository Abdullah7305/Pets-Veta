import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/shared/components/Card/Card";
import Button from "@/shared/components/Button/Button";
import PageBackButton from "@/shared/components/BackButton/PageBackButton";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import MarketplaceProductCard from "@/features/marketplace1/components/MarketplaceProductCard";
import {
  fetchSavedMarketplaceListings,
  removeMarketplaceListing,
  type MarketplaceProduct,
} from "@/features/marketplace1/api/marketplace.api";
import type { SellerApiError } from "../types/seller.types";

const SellerSavedListingsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadSavedListings = async () => {
      try {
        const listings = await fetchSavedMarketplaceListings();

        if (!ignore) {
          setProducts(listings.map((listing) => listing.product).filter(Boolean));
        }
      } catch (err) {
        const apiError = err as SellerApiError;

        if (apiError.response?.status === 401) {
          navigate("/login", {
            state: { redirectTo: "/seller/saved-listings" },
          });
          return;
        }

        if (!ignore) {
          setError("Unable to load saved listings. Please check your connection and try again.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadSavedListings();

    return () => {
      ignore = true;
    };
  }, [navigate]);

  const handleRemoveSaved = async (productId: string) => {
    try {
      await removeMarketplaceListing(productId);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch {
      setError("Unable to remove the saved listing. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-7">
          <div className="mb-5">
            <PageBackButton fallbackPath="/seller/dashboard" />
          </div>

          <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#178f95]">
                Pet Marketplace
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-gray-900">
                Saved Listings
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Marketplace products you have saved.
              </p>
            </div>

            <Button onClick={() => navigate("/marketplace1")}>
              Browse Marketplace
            </Button>
          </div>

          {loading && (
            <Card className="mt-6 text-sm text-gray-500">
              Loading saved listings...
            </Card>
          )}

          {error && (
            <Card className="mt-6 text-sm font-medium text-red-600">
              {error}
            </Card>
          )}

          {!loading && !error && products.length === 0 && (
            <Card className="mt-6 text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                No saved listings
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Save marketplace products to see them here.
              </p>
              <Button className="mt-5" onClick={() => navigate("/marketplace1")}>
                Go to Marketplace
              </Button>
            </Card>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {products.map((product) => (
                <MarketplaceProductCard
                  key={product.id}
                  product={product}
                  saved
                  onSave={() => void handleRemoveSaved(product.id)}
                  onDetails={() => navigate(`/marketplace/product/${product.id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SellerSavedListingsPage;
