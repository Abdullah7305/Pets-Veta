import { categories } from "../data/marketplace.data";

const MarketplaceCategories = () => {
    return (
        <section className="bg-[#f5fbff] px-5 py-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                            Shop by <span className="text-[#009f9d]">Category</span>
                        </h2>

                        <p className="mt-2 text-slate-600">
                            Find pet products by your pet’s daily needs.
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className="shrink-0 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#07182c] shadow-sm transition hover:bg-[#009f9d] hover:text-white"
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketplaceCategories;