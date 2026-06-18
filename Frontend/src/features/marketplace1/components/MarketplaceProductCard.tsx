import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import { addToCart } from "@/features/cart/utils/cartStorage";
import {
  getProductImage,
  getProductPrice,
  getSellerName,
  toDisplayCategory,
  type MarketplaceProduct,
} from "../api/marketplace.api";

type Props = {
  product: MarketplaceProduct;
  saved: boolean;
  onSave: () => void;
  onDetails: () => void;
};

const MarketplaceProductCard = ({
  product,
  saved,
  onSave,
  onDetails,
}: Props) => {
  const navigate = useNavigate();
  const [cartError, setCartError] = useState("");

  const handleBuyNow = () => {
    const image = getProductImage(product);
    const price = getProductPrice(product);

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

  const image = getProductImage(product);
  const price = getProductPrice(product);
  const seller = getSellerName(product);

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-48 bg-gray-50">
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-cover"
        />

        <span className="absolute left-3 top-3 rounded-md bg-[#e8f7f7] px-3 py-1 text-xs font-semibold text-[#178f95]">
          {toDisplayCategory(product.category)}
        </span>

        <button
          type="button"
          onClick={onSave}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#07182c] shadow-sm"
        >
          {saved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-[#07182c]">{product.title}</h3>

        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <FaStore className="text-[#178f95]" />
          {seller}
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

          <Button
            size="sm"
            onClick={handleBuyNow}
            className="bg-[#F9C5A8] text-[#c94d00] hover:bg-[#f7b58f]"
          >
            Add to Cart
          </Button>
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
