import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import MarketplaceCategoryNav from "../components/MarketplaceCategoryNav";
import MarketplaceCategorySection from "../components/MarketplaceCategorySection";
import {
  fetchMarketplaceProducts,
  fetchSavedMarketplaceListings,
  removeMarketplaceListing,
  saveMarketplaceListing,
  type MarketplaceProduct,
} from "../api/marketplace.api";
import type {
  MarketplaceCategoryConfig,
  MarketplaceCategorySlug,
} from "../types/marketplace.types";

const SECTION_LIMIT = 4;

const marketplaceCategories: MarketplaceCategoryConfig[] = [
  {
    slug: "pets",
    title: "Pets",
    subtitle: "Find pets listed by trusted Pets-Veta users.",
    backendCategory: "PETS",
    viewAllLabel: "View All Pets",
  },
  {
    slug: "food",
    title: "Food",
    subtitle: "Shop food and nutrition products for your pets.",
    backendCategory: "FOOD",
    viewAllLabel: "View All Food",
  },
  {
    slug: "accessories",
    title: "Accessories",
    subtitle: "Explore collars, toys, grooming tools, and pet essentials.",
    backendCategory: "ACCESSORIES",
    viewAllLabel: "View All Accessories",
  },
];

type CategoryProducts = Record<MarketplaceCategorySlug, MarketplaceProduct[]>;

const initialCategoryProducts: CategoryProducts = {
  pets: [],
  food: [],
  accessories: [],
};

const MarketplacePage = () => {
  const navigate = useNavigate();

  const [categoryProducts, setCategoryProducts] =
    useState<CategoryProducts>(initialCategoryProducts);

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadMarketplaceSections = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await Promise.all(
          marketplaceCategories.map(async (category) => {
            const data = await fetchMarketplaceProducts({
              page: 1,
              limit: SECTION_LIMIT,
              category: category.backendCategory,
            });

            return [category.slug, data.products] as const;
          }),
        );

        if (ignore) return;

        const nextProducts: CategoryProducts = {
          pets: [],
          food: [],
          accessories: [],
        };

        results.forEach(([slug, products]) => {
          nextProducts[slug] = products;
        });

        setCategoryProducts(nextProducts);
      } catch {
        if (!ignore) {
          setError(
            "Unable to load marketplace sections. Please check your connection and try again.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadMarketplaceSections();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const loadSavedListings = async () => {
      try {
        const saved = await fetchSavedMarketplaceListings();
        setSavedIds(saved.map((item) => item.productId));
      } catch {
        setSavedIds([]);
      }
    };

    void loadSavedListings();
  }, []);

  const toggleSave = async (id: string) => {
    const isSaved = savedIds.includes(id);

    try {
      if (isSaved) {
        await removeMarketplaceListing(id);

        setSavedIds((previousSavedIds) =>
          previousSavedIds.filter((savedId) => savedId !== id),
        );

        return;
      }

      await saveMarketplaceListing(id);

      setSavedIds((previousSavedIds) =>
        previousSavedIds.includes(id)
          ? previousSavedIds
          : [...previousSavedIds, id],
      );
    } catch {
      navigate("/login", {
        state: {
          redirectTo: "/marketplace1",
        },
      });
    }
  };

  const openProductDetails = (productId: string) => {
    navigate(`/marketplace/product/${productId}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#e7fbfa] via-[#f6ffff] to-[#fff6f1] px-6 py-8 lg:px-12">
      <div className="pointer-events-none absolute -left-28 top-20 h-96 w-96 rounded-full bg-white/75 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-[520px] h-96 w-96 rounded-full bg-[#f9c5a8]/35 blur-3xl" />
      <div className="pointer-events-none absolute left-[40%] top-[260px] h-72 w-72 rounded-full bg-[#178f95]/10 blur-3xl" />

      <div className="relative z-10">
        <section className="relative mb-8 mt-20 overflow-hidden rounded-[34px] bg-gradient-to-r from-[#12aaa5] via-[#178f95] to-[#079895] p-6 shadow-[0_24px_70px_rgba(23,143,149,0.22)] lg:p-10">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-[-80px] h-80 w-80 rounded-full bg-[#f9c5a8]/25 blur-3xl" />
          <div className="pointer-events-none absolute right-12 top-10 hidden h-24 w-24 rounded-full border-[10px] border-white/15 lg:block" />

          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-[34px] font-black leading-tight tracking-[-0.05em] text-white md:text-[52px]">
                Shop and explore trusted{" "}
                <span className="text-[#fff1ea]">pet listings</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/82">
                Browse pets, food, and accessories from trusted Pets-Veta users.
                Select a category to open full listings with search, location
                filters, and pagination.
              </p>

              <MarketplaceCategoryNav categories={marketplaceCategories} />
            </div>

            <Button
              className="w-fit gap-2 self-start !border-white !bg-white !text-[#178f95] hover:!bg-[#07182c] hover:!text-white lg:self-center"
              onClick={() => navigate("/seller/add-product")}
            >
              <FaShoppingBag />
              Add Listing
            </Button>
          </div>
        </section>

        <section className="rounded-[34px] border border-white/70 bg-white/65 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] backdrop-blur lg:p-8">
          <div className="space-y-10">
            {marketplaceCategories.map((category, index) => (
              <div key={category.slug}>
                <MarketplaceCategorySection
                  category={category}
                  products={categoryProducts[category.slug]}
                  loading={loading}
                  error={error}
                  savedIds={savedIds}
                  onSave={toggleSave}
                  onDetails={openProductDetails}
                />

                {index !== marketplaceCategories.length - 1 && (
                  <div className="mt-10 h-px w-full bg-[#178f95]/10" />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default MarketplacePage;