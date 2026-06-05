import {
    FaHeart,
    FaShoppingCart,
    FaStar,
} from "react-icons/fa";

type ProductCardProps = {
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
};

const ProductCard = ({
    name,
    category,
    price,
    oldPrice,
    rating,
    reviews,
    image,
    badge,
}: ProductCardProps) => {
    return (
        <div className="group overflow-hidden rounded-3xl bg-white shadow-[0_10px_35px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            <div className="relative h-[230px] overflow-hidden bg-[#f5fbff]">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-[#009f9d] px-3 py-1 text-xs font-extrabold text-white">
                        {badge}
                    </span>
                )}

                <button
                    type="button"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#07182c] shadow-sm transition hover:text-[#009f9d]"
                >
                    <FaHeart />
                </button>
            </div>

            <div className="p-5">
                <p className="text-xs font-extrabold uppercase tracking-wide text-[#009f9d]">
                    {category}
                </p>

                <h3 className="mt-2 min-h-[52px] text-lg font-extrabold leading-6 text-[#07182c]">
                    {name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <FaStar className="text-[#ffb020]" />
                    <span>{rating}</span>
                    <span>({reviews} reviews)</span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                    <h4 className="text-2xl font-extrabold text-[#07182c]">
                        ${price}
                    </h4>

                    {oldPrice && (
                        <span className="text-sm font-bold text-slate-400 line-through">
                            ${oldPrice}
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#009f9d] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#007f7d]"
                >
                    <FaShoppingCart />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;