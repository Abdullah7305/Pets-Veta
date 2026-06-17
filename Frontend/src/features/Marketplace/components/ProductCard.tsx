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
        <div className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(15,23,42,0.1)]">
            {/* Reduced height from h-[230px] to h-[180px] */}
            <div className="relative h-[180px] overflow-hidden bg-[#f5fbff]">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />


                {/* Slightly smaller action button */}
                <button
                    type="button"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs text-[#07182c] shadow-sm transition hover:text-[#009f9d]"
                >
                    <FaHeart />
                </button>
            </div>

            {/* Reduced padding from p-5 to p-4 */}
            <div className="p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#009f9d]">
                    {category}
                </p>

                {/* Removed min-h, reduced text size to text-base, clamped to 2 lines max */}
                <h3 className="mt-1 line-clamp-2 text-base font-extrabold leading-tight text-[#07182c]">
                    {name}
                </h3>

                {/* Tightened margins */}
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <FaStar className="text-[#ffb020]" />
                    <span>{rating}</span>
                    <span>({reviews})</span>
                </div>

                {/* Reduced font size from text-2xl to text-xl */}
                <div className="mt-3 flex items-center gap-2">
                    <h4 className="text-xl font-extrabold text-[#07182c]">
                        ${price}
                    </h4>

                    {oldPrice && (
                        <span className="text-xs font-bold text-slate-400 line-through">
                            ${oldPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;