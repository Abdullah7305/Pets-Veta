import { useMemo, useState } from "react";
import {
  FaPaw,
  FaShoppingBag,
  FaSlidersH,
  FaThLarge,
  FaUndo,
} from "react-icons/fa";
import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import MarketplaceProductCard from "../components/MarketplaceProductCard";
import MarketplaceDetailPanel from "../components/MarketplaceDetailPanel";
import MarketplacePagination from "../components/MarketplacePagination";
import { marketplaceItems } from "../data/marketplace.data";

const ITEMS_PER_PAGE = 6;

const MarketplacePage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [page, setPage] = useState(1);
  const [savedIds, setSavedIds] = useState<number[]>([6]);

  const [selectedProduct, setSelectedProduct] = useState<
    (typeof marketplaceItems)[number] | null
  >(marketplaceItems[0]);

  const categories = ["All", "Pets", "Food", "Accessories"];

  const filteredItems = useMemo(() => {
    return marketplaceItems.filter((item) => {
      const searchMatch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const categoryMatch = category === "All" || item.category === category;
      const locationMatch = location === "All" || item.location === location;

      return searchMatch && categoryMatch && locationMatch;
    });
  }, [search, category, location]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const paginatedItems = filteredItems.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const toggleSave = (id: number) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((savedId) => savedId !== id)
        : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setLocation("All");
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-[#f7fbfb] px-6 py-8 lg:px-12">
      <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#07182c]">
            Pet Marketplace
          </h1>

          <p className="mt-2 text-gray-500">
            Buy pets, food, and accessories from verified sellers.
          </p>
        </div>

        <Button className="gap-2">
          <FaShoppingBag />
          Sell Your Product
        </Button>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr_0.9fr_auto]">
          <Input
            placeholder="Search pets, food, accessories..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#178f95]"
          >
            <option>All</option>
            <option>Pets</option>
            <option>Food</option>
            <option>Accessories</option>
          </select>

          <select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#178f95]"
          >
            <option>All</option>
            <option>Lahore</option>
            <option>Karachi</option>
            <option>Islamabad</option>
            <option>Multan</option>
          </select>

          <Button variant="outline" className="gap-2" onClick={clearFilters}>
            <FaUndo />
            Clear Filters
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => {
                setCategory(item);
                setPage(1);
              }}
              className={`flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition ${
                category === item
                  ? "border-[#178f95] bg-[#178f95] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#178f95] hover:text-[#178f95]"
              }`}
            >
              <FaPaw />
              {item}
            </button>
          ))}
        </div>
      </section>

      <section
        className={`mt-6 grid gap-6 ${
          selectedProduct ? "xl:grid-cols-[1fr_330px]" : "grid-cols-1"
        }`}
      >
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#07182c]">
                Latest Pet Listings
              </h2>

              <p className="text-sm text-gray-500">
                Showing {paginatedItems.length} available listings
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
            {paginatedItems.map((product) => (
              <MarketplaceProductCard
                key={product.id}
                product={product}
                saved={savedIds.includes(product.id)}
                onSave={() => toggleSave(product.id)}
                onDetails={() => setSelectedProduct(product)}
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