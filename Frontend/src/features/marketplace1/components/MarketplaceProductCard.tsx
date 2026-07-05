import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaHeart,
  FaMapMarkerAlt,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import { addToCart } from "@/features/cart/utils/cartStorage";
import { useAuth } from "@/features/Auth/hooks/authhook";

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
  const { user } = useAuth();

  const [cartError, setCartError] = useState("");

  const image = getProductImage(product);
  const price = getProductPrice(product);
  const seller = getSellerName(product);

  const isOwnListing = user?.data?.id === product.seller?.user?.id;
  const isUnavailable = product.status !== "ACTIVE" || product.stock <= 0;

  const handleAddToCart = () => {
    setCartError("");

    if (isUnavailable) {
      setCartError("This listing is not available right now.");
      return;
    }

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

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-56 bg-gray-50">
        <button
          type="button"
          onClick={() => navigate(`/marketplace/product/${product.id}`)}
          className="block h-full w-full overflow-hidden text-left"
          aria-label={`View details for ${product.title}`}
        >
          <img
            src={image}
            alt={product.title}
            className="h-full w-full object-contain p-3 transition duration-300 hover:scale-105"
          />
        </button>

        <span className="absolute left-3 top-3 rounded-md bg-[#e8f7f7] px-3 py-1 text-xs font-semibold text-[#178f95]">
          {toDisplayCategory(product.category)}
        </span>

        {isUnavailable && (
          <span className="absolute bottom-3 left-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            Sold Out
          </span>
        )}

        {!isOwnListing && (
          <button
            type="button"
            onClick={onSave}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#07182c] shadow-sm transition hover:text-red-500"
            aria-label={saved ? "Remove from saved listings" : "Save listing"}
          >
            {saved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-base font-bold text-[#07182c]">
          {product.title}
        </h3>

        <p className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <FaStore className="text-[#178f95]" />
          <span className="truncate">{seller}</span>

          {isOwnListing && (
            <span className="rounded-sm bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-400">
              Your Listing
            </span>
          )}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-lg font-bold text-[#178f95]">
            PKR {price.toLocaleString()}
          </p>

          <div className="flex min-w-0 items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-gray-700">
              <FaStar className="text-yellow-400" />
              New
            </span>

            <span className="flex min-w-0 items-center gap-1 text-gray-500">
              <FaMapMarkerAlt className="shrink-0" />
              <span className="truncate">
                {product.location || product.seller?.city || "Pakistan"}
              </span>
            </span>
          </div>
        </div>

        <p
          className={`mt-3 text-sm font-medium ${isUnavailable ? "text-red-600" : "text-gray-500"
            }`}
        >
          {isUnavailable ? "Not Available" : `Stock: ${product.stock}`}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" onClick={onDetails}>
            Details
          </Button>

          {isOwnListing ? (
            <Button
              size="sm"
              onClick={() => navigate(`/seller/edit-product/${product.id}`)}
              className="flex items-center justify-center gap-1 !border-slate-200 !bg-gray-100 !text-slate-700 hover:!bg-slate-200"
            >
              <FaEdit size={12} />
              Edit
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isUnavailable}
              className="flex items-center justify-center gap-2 !bg-[#178f95] !text-white hover:!bg-[#12757a]"
            >
              <FaShoppingCart size={13} />
              Add Cart
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