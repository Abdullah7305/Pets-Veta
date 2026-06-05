import { Link } from "react-router-dom";
import { FaGift, FaShippingFast } from "react-icons/fa";

import Button from "../../../shared/components/Button";

const MarketplaceBanner = () => {
    return (
        <section className="bg-[#f5fbff] px-5 py-16 lg:px-16">
            <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[36px] bg-gradient-to-br from-[#bdf0ee] via-white to-[#fff3ec] p-8 shadow-[0_18px_50px_rgba(15,23,42,0.10)] lg:grid-cols-[1fr_380px] lg:p-12">
                <div>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#009f9d] shadow-sm">
                        <FaGift />
                        Special Offer
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight text-[#07182c] md:text-4xl">
                        Get premium pet products with fast delivery and trusted quality.
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                        Explore food, accessories, grooming tools and healthcare products
                        designed for your pet’s daily comfort.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-4">
                        <Button>Shop Now</Button>

                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-xl border border-[#009f9d] px-5 py-3 text-sm font-bold text-[#009f9d] transition hover:bg-[#eefafa]"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>

                <div className="rounded-[32px] bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eefafa] text-3xl text-[#009f9d]">
                            <FaShippingFast />
                        </div>

                        <div>
                            <h3 className="text-2xl font-extrabold text-[#07182c]">
                                Free Delivery
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                                On selected pet-care products
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-3xl bg-[#f5fbff] p-5">
                        <p className="text-sm leading-6 text-slate-600">
                            Order pet food, grooming tools and accessories from PetsVeta and
                            get reliable delivery at your doorstep.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketplaceBanner;