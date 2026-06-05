import {
    FaSearch,
    FaShoppingCart,
    FaTruck,
} from "react-icons/fa";

import Button from "../../../shared/components/Button";

const MarketplaceHero = () => {
    return (
        <section className="bg-white px-5 pt-10 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[40px] bg-gradient-to-br from-[#f5fbff] via-white to-[#d9f7f6] p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:p-12">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
                            <FaShoppingCart />
                            PetsVeta Marketplace
                        </div>

                        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-[#07182c] md:text-5xl">
                            Everything your pet needs,
                            <br />
                            all in{" "}
                            <span className="text-[#009f9d]">
                                one place
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                            Discover premium pet food, accessories, grooming tools,
                            medicines and trusted products for your furry friends.
                        </p>

                        <div className="mt-7 flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm sm:flex-row">
                            <div className="relative flex-1">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                <input
                                    type="text"
                                    placeholder="Search pet products..."
                                    className="h-14 w-full rounded-2xl border border-slate-200 bg-[#f8fafc] pl-12 pr-4 text-sm outline-none focus:border-[#009f9d] focus:ring-2 focus:ring-[#009f9d]/20"
                                />
                            </div>

                            <Button className="h-14 px-8">
                                Search
                            </Button>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#07182c] shadow-sm">
                                Premium Products
                            </span>

                            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#07182c] shadow-sm">
                                Fast Delivery
                            </span>

                            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#07182c] shadow-sm">
                                Trusted Brands
                            </span>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="overflow-hidden rounded-[40px] bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                            <img
                                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1400&auto=format&fit=crop"
                                alt="Pets Marketplace"
                                className="h-[450px] w-full rounded-[32px] object-cover"
                            />
                        </div>

                        <div className="absolute -bottom-6 left-6 rounded-3xl bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eefafa] text-xl text-[#009f9d]">
                                    <FaTruck />
                                </div>

                                <div>
                                    <h3 className="font-extrabold text-[#07182c]">
                                        Fast Delivery
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        At your doorstep
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-4 top-10 rounded-3xl bg-[#009f9d] p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
                            <h3 className="text-2xl font-extrabold">
                                10K+
                            </h3>

                            <p className="mt-1 text-sm text-white/80">
                                Happy Pet Owners
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketplaceHero;