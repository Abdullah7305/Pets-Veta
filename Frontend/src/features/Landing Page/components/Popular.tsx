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
        <section className="bg-[#f5fbff] px-6 py-8 lg:px-16">
            <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-[22px] font-extrabold text-[#07182c]">
                    Popular in <span className="text-[#009f9d]">Marketplace</span>
                </h2>

                <Link
                    to="/marketplace1"
                    className="flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#009f9d] transition hover:text-[#007f7d]"
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
                            className="rounded-[20px] bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
                        >
                            <div className="mb-4 h-[130px] animate-pulse rounded-[16px] bg-slate-100" />
                            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                            <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-slate-100" />
                        </div>
                    ))}
                </div>
            )}

            {!loading && error && (
                <div className="rounded-[20px] border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
                    {error}
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <div className="flex items-center gap-3 rounded-[20px] border border-slate-100 bg-white px-5 py-5 text-sm font-semibold text-slate-500 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
                    <FaBoxOpen className="text-[#009f9d]" />
                    No active marketplace products available yet.
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {products.map((product) => {
                        const image = getProductImage(product);
                        const price = getProductPrice(product);

                        return (
                            <Link
                                key={product.id}
                                to={`/marketplace/product/${product.id}`}
                                className="group rounded-[20px] bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
                            >
                                <div className="mb-4 flex h-[130px] items-center justify-center rounded-[16px] bg-gradient-to-br from-[#fff3ef] via-[#f8fbfb] to-[#edfafa]">
                                    <img
                                        src={image}
                                        alt={product.title}
                                        className="h-[110px] w-full object-contain transition duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <div className="mb-2 flex items-center justify-between gap-2">
                                    <span className="rounded-full bg-[#009f9d]/10 px-2.5 py-1 text-[11px] font-black text-[#009f9d]">
                                        {toDisplayCategory(product.category)}
                                    </span>

                                    <span className="text-[11px] font-bold text-slate-400">
                                        Stock {product.stock}
                                    </span>
                                </div>

                                <h3 className="line-clamp-2 min-h-[38px] text-[16px] font-extrabold leading-[19px] text-[#07182c]">
                                    {product.title}
                                </h3>

                                <p className="mt-2 text-[14px] font-extrabold text-[#009f9d]">
                                    PKR {price.toLocaleString()}
                                </p>

                                <div className="mt-2 flex items-center gap-[2px]">
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
        </section>
    );
};

export default PopularMarketplace;