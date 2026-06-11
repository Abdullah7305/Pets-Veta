import { FaSortAmountDown } from "react-icons/fa";

import ProductCard from "./ProductCard";
import { products } from "../data/marketplace.data";

const ProductsGrid = () => {
    return (
        <section
            className="px-5 py-16 lg:px-16"
           
        >
            <div className="mx-auto max-w-7xl">
                <div>
                    <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white/90 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-extrabold text-[#07182c]">
                                Featured Products
                            </h2>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                Showing {products.length} pet products
                            </p>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-100">
                            <FaSortAmountDown className="text-[#009f9d]" />

                            <select className="bg-transparent text-sm font-bold text-[#07182c] outline-none">
                                <option>Sort by Popular</option>
                                <option>Lowest Price</option>
                                <option>Highest Rated</option>
                                <option>Newest First</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                category={product.category}
                                price={product.price}
                                oldPrice={product.oldPrice}
                                rating={product.rating}
                                reviews={product.reviews}
                                image={product.image}
                                badge={product.badge}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsGrid;