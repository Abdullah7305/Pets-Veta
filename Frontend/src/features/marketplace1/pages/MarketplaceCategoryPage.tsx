import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { useDebounce } from "@/shared/hooks/useDebounce"; // Import our hook

import MarketplaceCategoryFilters from "../components/MarketplaceCategoryFilters";
import MarketplacePagination from "../components/MarketplacePagination";
import MarketplaceProductCard from "../components/MarketplaceProductCard";
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

const ITEMS_PER_PAGE = 12;

const categoryMap: Record<MarketplaceCategorySlug, MarketplaceCategoryConfig> = {
    pets: {
        slug: "pets",
        title: "Pets",
        subtitle: "Browse all pets listed by trusted Pets-Veta users.",
        backendCategory: "PETS",
        viewAllLabel: "View All Pets",
    },
    food: {
        slug: "food",
        title: "Food",
        subtitle: "Browse food and nutrition products for your pets.",
        backendCategory: "FOOD",
        viewAllLabel: "View All Food",
    },
    accessories: {
        slug: "accessories",
        title: "Accessories",
        subtitle: "Browse collars, toys, grooming tools, and pet essentials.",
        backendCategory: "ACCESSORIES",
        viewAllLabel: "View All Accessories",
    },
};

const isMarketplaceCategorySlug = (
    value: string | undefined,
): value is MarketplaceCategorySlug => {
    return value === "pets" || value === "food" || value === "accessories";
};

const MarketplaceCategoryPage = () => {
    const { categorySlug } = useParams();
    const navigate = useNavigate();

    const category = isMarketplaceCategorySlug(categorySlug)
        ? categoryMap[categorySlug]
        : null;

    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("All");
    const [page, setPage] = useState(1);
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [products, setProducts] = useState<MarketplaceProduct[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    
    const debouncedSearch = useDebounce(search, 400);

    useEffect(() => {
        setSearch("");
        setLocation("All");
        setPage(1);
    }, [categorySlug]);

    useEffect(() => {
        if (!category) return;

        let ignore = false;

        const loadCategoryProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await fetchMarketplaceProducts({
                    page,
                    limit: ITEMS_PER_PAGE,
                    search: debouncedSearch, // Use the debounced value here
                    category: category.backendCategory,
                    location: location === "All" ? "" : location,
                });

                if (ignore) return;

                setProducts(data.products);
                setTotalPages(data.pagination.totalPages || 1);
            } catch {
                if (!ignore) {
                    setError(
                        `Unable to load ${category.title.toLowerCase()} listings. Please try again.`,
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        void loadCategoryProducts();

        return () => {
            ignore = true;
        };
    }, [category, page, debouncedSearch, location]); 

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
                    redirectTo: category
                        ? `/marketplace1/category/${category.slug}`
                        : "/marketplace1",
                },
            });
        }
    };

    const clearFilters = () => {
        setSearch("");
        setLocation("All");
        setPage(1);
    };

    if (!category) {
        return (
            <main className="min-h-screen bg-[#f7fbfb] px-6 py-8 lg:px-12">
                <section className="mx-auto mt-24 max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm">
                    <FaBoxOpen className="mx-auto text-4xl text-[#178f95]" />

                    <h1 className="mt-4 text-3xl font-black text-[#07182c]">
                        Category not found
                    </h1>

                    <p className="mt-3 text-slate-500">
                        This marketplace category is not available right now.
                    </p>

                    <Link
                        to="/marketplace1"
                        className="mt-6 inline-flex rounded-2xl bg-[#178f95] px-6 py-3 text-sm font-black text-white"
                    >
                        Back to Marketplace
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7fbfb] px-6 py-8 lg:px-12">
            <div className="mt-20">
                <MarketplaceCategoryFilters
                    search={search}
                    location={location}
                    categoryTitle={category.title}
                    onSearch={(value: string) => {
                        setSearch(value);
                        setPage(1);
                    }}
                    onLocation={(value: string) => {
                        setLocation(value);
                        setPage(1);
                    }}
                    onClear={clearFilters}
                />
            </div>

            <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-[#07182c]">
                            All {category.title}
                        </h2>

                        <p className="text-sm text-gray-500">
                            Showing {products.length} available listings
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {loading && (
                        <p className="col-span-full rounded-lg bg-gray-50 p-5 text-sm text-gray-500">
                            Loading {category.title.toLowerCase()} listings...
                        </p>
                    )}

                    {error && (
                        <p className="col-span-full rounded-lg bg-red-50 p-5 text-sm font-medium text-red-600">
                            {error}
                        </p>
                    )}

                    {!loading && !error && products.length === 0 && (
                        <p className="col-span-full rounded-lg bg-gray-50 p-5 text-sm text-gray-500">
                            No {category.title.toLowerCase()} listings found.
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
                        onPageChange={(nextPage: number) => {
                            setPage(nextPage);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    />
                )}
            </section>
        </main>
    );
};

export default MarketplaceCategoryPage;