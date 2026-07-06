import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaSlidersH,
  FaThLarge,
} from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import MarketplaceProductCard from "../components/MarketplaceProductCard";
import MarketplaceDetailPanel from "../components/MarketplaceDetailPanel";
import MarketplacePagination from "../components/MarketplacePagination";
import MarketplaceFilters from "../components/MarketplaceFilters";
import {
  fetchMarketplaceProducts,
  fetchSavedMarketplaceListings,
  removeMarketplaceListing,
  saveMarketplaceListing,
  toBackendCategory,
  type MarketplaceProduct,
} from "../api/marketplace.api";

const ITEMS_PER_PAGE = 12;

const MarketplacePage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [page, setPage] = useState(1);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [products, setProducts] = useState<MarketplaceProduct[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedProduct, setSelectedProduct] =
    useState<MarketplaceProduct | null>(null);

  const queryCategory = useMemo(
    () => (category === "All" ? "" : toBackendCategory(category)),
    [category]
  );

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchMarketplaceProducts({
          page,
          limit: ITEMS_PER_PAGE,
          search,
          category: queryCategory,
          location: location === "All" ? "" : location,
        });

        if (ignore) return;

        setProducts(data.products);
        setTotalPages(data.pagination.totalPages || 1);

        setSelectedProduct((currentProduct) => {
          if (
            currentProduct &&
            data.products.some((product) => product.id === currentProduct.id)
          ) {
            return currentProduct;
          }

          return data.products[0] || null;
        });
      } catch {
        if (!ignore) {
          setError(
            "Unable to load marketplace products. Please check your connection and try again."
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
  }, [page, search, queryCategory, location]);

  useEffect(() => {
    const loadSaved = async () => {
      try {
        const saved = await fetchSavedMarketplaceListings();
        setSavedIds(saved.map((item) => item.productId));
      } catch {
        setSavedIds([]);
      }
    };

    void loadSaved();
  }, []);

  const toggleSave = async (id: string) => {
    const isSaved = savedIds.includes(id);

    try {
      if (isSaved) {
        await removeMarketplaceListing(id);

        setSavedIds((previousSavedIds) =>
          previousSavedIds.filter((savedId) => savedId !== id)
        );

        return;
      }

      await saveMarketplaceListing(id);
      setSavedIds((previousSavedIds) => [...previousSavedIds, id]);
    } catch {
      navigate("/login", {
        state: {
          redirectTo: "/marketplace1",
        },
      });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setLocation("All");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[#f7fbfb] px-6 py-8 lg:px-12">
      <section className="mb-6 mt-20 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#07182c]">
            Pet Marketplace
          </h1>

          <p className="mt-2 text-gray-500">
            Buy and sell pets, food, medicine, and accessories from trusted
            Pets-Veta users.
          </p>
        </div>

        <Button
          className="gap-2"
          onClick={() => navigate("/seller/add-product")}
        >
          <FaShoppingBag />
          Add Listing
        </Button>
      </section>

      <MarketplaceFilters
        search={search}
        category={category}
        location={location}
        onSearch={handleSearchChange}
        onCategory={handleCategoryChange}
        onLocation={handleLocationChange}
        onClear={clearFilters}
      />

      <section
        className={`mt-6 grid gap-6 ${
          selectedProduct ? "xl:grid-cols-[1fr_330px]" : "grid-cols-1"
        }`}
      >
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#07182c]">
                Latest Marketplace Listings
              </h2>

              <p className="text-sm text-gray-500">
                Showing {products.length} available listings
              </p>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <Button variant="outline" size="sm" className="gap-2">
                <FaSlidersH />
                Sort by: Newest First
              </Button>

              <Button variant="outline" size="sm">
                <FaThLarge />
              </Button>
            </div>
          </div>

          <div
            className={`grid gap-5 ${
              selectedProduct
                ? "lg:grid-cols-2 2xl:grid-cols-3"
                : "md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            }`}
          >
            {loading && (
              <p className="col-span-full rounded-lg bg-gray-50 p-5 text-sm text-gray-500">
                Loading marketplace products...
              </p>
            )}

            {error && (
              <p className="col-span-full rounded-lg bg-red-50 p-5 text-sm font-medium text-red-600">
                {error}
              </p>
            )}

            {!loading && !error && products.length === 0 && (
              <p className="col-span-full rounded-lg bg-gray-50 p-5 text-sm text-gray-500">
                No active listings found.
              </p>
            )}

            {products.map((product) => (
              <MarketplaceProductCard
                key={product.id}
                product={product}
                saved={savedIds.includes(product.id)}
                onSave={() => toggleSave(product.id)}
                onDetails={() => navigate(`/marketplace/product/${product.id}`)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <MarketplacePagination
              page={page}
              totalPages={totalPages}
              onPageChange={(nextPage) => {
                setPage(nextPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </div>

        {selectedProduct && (
          <MarketplaceDetailPanel
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </section>
    </main>
  );
};

export default MarketplacePage;