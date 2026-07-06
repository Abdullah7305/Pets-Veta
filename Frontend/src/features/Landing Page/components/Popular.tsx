import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBoxOpen, FaStar } from "react-icons/fa";

import {
    fetchMarketplaceProducts,
    getProductImage,
    getProductPrice,
    toDisplayCategory,
    type MarketplaceProduct,
} from "@/features/marketplace1/api/marketplace.api";

const PopularMarketplace = () => {
    const [products, setProducts] = useState<MarketplaceProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadMarketplaceProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await fetchMarketplaceProducts({
                    page: 1,
                    limit: 5,
                });

                if (isMounted) {
                    setProducts(data.products || []);
                }
            } catch (apiError) {
                console.error("Failed to load marketplace products:", apiError);

                if (isMounted) {
                    setError("Unable to load marketplace products right now.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void loadMarketplaceProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="bg-[#f5fbff] px-5 py-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-7 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-[26px] font-black leading-tight tracking-[-0.04em] text-[#07182c] md:text-[30px]">
                            Popular in{" "}
                            <span className="text-[#009f9d]">Marketplace</span>
                        </h2>
                    </div>

                    <Link
                        to="/marketplace1"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-black text-[#009f9d] shadow-sm ring-1 ring-[#009f9d]/10 transition hover:-translate-y-0.5 hover:bg-[#009f9d] hover:text-white"
                    >
                        View All Products
                        <FaArrowRight className="text-xs" />
                    </Link>
                </div>

                {loading && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="rounded-[22px] bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.07)]"
                            >
                                <div className="mb-4 h-[150px] animate-pulse rounded-[18px] bg-slate-100" />
                                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                                <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                                <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-[22px] border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className="flex items-center gap-3 rounded-[22px] border border-slate-100 bg-white px-5 py-5 text-sm font-semibold text-slate-500 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
                        <FaBoxOpen className="text-[#009f9d]" />
                        No active marketplace products available yet.
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                        {products.map((product) => {
                            const image = getProductImage(product);
                            const price = getProductPrice(product);

                            return (
                                <Link
                                    key={product.id}
                                    to={`/marketplace/product/${product.id}`}
                                    className="group rounded-[22px] bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
                                >
                                    <div className="mb-4 flex h-[150px] items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br from-[#fff3ef] via-[#f8fbfb] to-[#edfafa]">
                                        <img
                                            src={image}
                                            alt={product.title}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="mb-3 flex items-center justify-between gap-2">
                                        <span className="rounded-full bg-[#009f9d]/10 px-3 py-1 text-[11px] font-black text-[#009f9d]">
                                            {toDisplayCategory(product.category)}
                                        </span>

                                        <span className="text-[11px] font-bold text-slate-400">
                                            Stock {product.stock}
                                        </span>
                                    </div>

                                    <h3 className="line-clamp-2 min-h-[40px] text-[17px] font-black leading-[20px] text-[#07182c]">
                                        {product.title}
                                    </h3>

                                    <p className="mt-3 text-[15px] font-black text-[#009f9d]">
                                        PKR {price.toLocaleString()}
                                    </p>

                                    <div className="mt-3 flex items-center gap-[2px]">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className="text-[13px] text-[#ffb020]"
                                            />
                                        ))}

                                        <span className="ml-2 text-[12px] font-semibold text-slate-500">
                                            Active Listing
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PopularMarketplace;