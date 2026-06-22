import { FaArrowRight, FaStar } from "react-icons/fa";
import img from "@/assets/shared/images/bannerImage.png"

const products = [
    {
        title: "Royal Canin\nDog Food",
        price: "Rs. 2,450",
        rating: "4.8",
        image: img,
    },
    {
        title: "Cat Litter\nPremium",
        price: "Rs. 1,350",
        rating: "4.6",
        image: img,
    },
    {
        title: "Chew Toy\nFor Dogs",
        price: "Rs. 650",
        rating: "4.7",
        image: img,
    },
    {
        title: "Pet Shampoo\nGentle Care",
        price: "Rs. 890",
        rating: "4.5",
        image: img,
    },
    {
        title: "Nutritional\nSupplements",
        price: "Rs. 1,250",
        rating: "4.6",
        image: img,
    },
];

const PopularMarketplace = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-8 lg:px-16">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[22px] font-extrabold text-[#07182c]">
                    Popular in <span className="text-[#009f9d]">Marketplace</span>
                </h2>

                <button className="flex items-center gap-2 text-sm font-extrabold text-[#009f9d]">
                    View All Products
                    <FaArrowRight className="text-xs" />
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {products.map((product) => (
                    <div
                        key={product.title}
                        className="rounded-[20px] bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
                    >
                        <div className="mb-4 flex h-[130px] items-center justify-center rounded-[16px] bg-gradient-to-br from-[#fff3ef] via-[#f8fbfb] to-[#edfafa]">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-[110px] w-full object-contain"
                            />
                        </div>

                        <h3 className="whitespace-pre-line text-[16px] font-extrabold leading-[19px] text-[#07182c]">
                            {product.title}
                        </h3>

                        <p className="mt-2 text-[14px] font-extrabold text-[#009f9d]">
                            {product.price}
                        </p>

                        <div className="mt-2 flex items-center gap-[2px]">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <FaStar key={index} className="text-[13px] text-[#ffb020]" />
                            ))}
                            <span className="ml-2 text-[12px] font-semibold text-slate-500">
                                ({product.rating})
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularMarketplace;
