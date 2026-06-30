import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaStar,
  FaStore,
  FaEdit, // 💡 Added
} from "react-icons/fa";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import { addToCart } from "@/features/cart/utils/cartStorage";
import { useAuth } from "@/features/Auth/hooks/authhook"; // 💡 Added
import {
  getProductImage,
  getProductPrice,
  getSellerName,
  toDisplayCategory,
} from "../api/marketplace.api";
import type { MarketplaceProductCardProps } from "../types/marketplace.types";

const MarketplaceProductCard = ({
  product,
  saved,
  onSave,
  onDetails,
}: MarketplaceProductCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // 💡 Added: Resolve authenticated user session
  const [cartError, setCartError] = useState("");

  const image = getProductImage(product);
  const price = getProductPrice(product);
  const seller = getSellerName(product);

  const isPet = product.category === "PETS";

  // 💡 Added: Check if the logged-in user owns this listed product
  const isOwnListing = user?.data?.id === product.seller?.user?.id;

  const handleAddToCart = () => {
    const result = addToCart({
      productId: product.id,
      title: product.title,
      price,
      image,
      quantity: 1,
      sellerId: product.sellerId,
    });

    if (!result.success) {
      setCartError(result.message);
      return;
    }

    navigate("/cart");
  };

  const handleDirectBuy = () => {
    localStorage.removeItem("pets-veta-direct-buy");

    const directBuyItem = {
      productId: product.id,
      title: product.title,
      price,
      image,
      quantity: 1,
      sellerId: product.sellerId,
    };

    localStorage.setItem("pets-veta-direct-buy", JSON.stringify(directBuyItem));
    navigate("/checkout");
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-44 bg-gray-50">
        <button
          type="button"
          onClick={() => navigate(`/marketplace/product/${product.id}`)}
          className="block h-full w-full overflow-hidden text-left"
          aria-label={`View details for ${product.title}`}
        >
          <img
            src={image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </button>

        <span className="absolute left-3 top-3 rounded-md bg-[#e8f7f7] px-3 py-1 text-xs font-semibold text-[#178f95]">
          {toDisplayCategory(product.category)}
        </span>

        {/* Hide save button if it's the seller's own listing */}
        {!isOwnListing && (
          <button
            type="button"
            onClick={onSave}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#07182c] shadow-sm"
          >
            {saved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-[#07182c]">{product.title}</h3>

        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <FaStore className="text-[#178f95]" />
          {seller} {isOwnListing && <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-sm ml-1">Your Listing</span>}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-[#178f95]">
            PKR {price.toLocaleString()}
          </p>

          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-gray-700">
              <FaStar className="text-yellow-400" />
              New
            </span>

            <span className="flex items-center gap-1 text-gray-500">
              <FaMapMarkerAlt />
              {product.location || "Pakistan"}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" onClick={onDetails}>
            Details
          </Button>

          {/* 💡 Updated: If it's their own listing, show a manage shortcut. Otherwise, show transactional buttons */}
          {isOwnListing ? (
            <Button
              size="sm"
              onClick={() => navigate(`/seller/edit-product/${product.id}`)}
              className="bg-gray-100 border border-slate-200 text-slate-700 hover:bg-slate-200 flex items-center justify-center gap-1"
            >
              <FaEdit size={12} />
              Edit
            </Button>
          ) : isPet ? (
            <Button
              size="sm"
              onClick={handleDirectBuy}
              className="bg-[#178f95] text-white hover:bg-[#12757a]"
            >
              Buy Now
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-[#F9C5A8] text-[#c94d00] hover:bg-[#f7b58f]"
            >
              Add to Cart
            </Button>
          )}
        </div>

        {cartError && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            {cartError}
          </p>
        )}
      </div>
    </Card>
  );
};

export default MarketplaceProductCard;