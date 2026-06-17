import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import { addToCart } from "@/features/cart/utils/cartStorage";
import {
  getProductImage,
  getProductPrice,
  getSellerName,
  saveMarketplaceListing,
  toDisplayCategory,
  type MarketplaceProduct,
} from "../api/marketplace.api";

type Props = {
  product: MarketplaceProduct;
  onClose: () => void;
};

const MarketplaceDetailPanel = ({ product, onClose }: Props) => {
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

  const handleSave = async () => {
    try {
      await saveMarketplaceListing(product.id);
    } catch {
      navigate("/login", {
        state: {
          redirectTo: "/marketplace1",
        },
      });
    }
  };

  const image = getProductImage(product);
  const price = getProductPrice(product);
  const seller = getSellerName(product);

  return (
    <Card className="sticky top-6 max-h-[calc(100vh-48px)] overflow-y-auto p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#07182c]">Product Detail</h2>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <FaTimes />
        </button>
      </div>

      <div className="flex gap-4">
        <img
          src={image}
          alt={product.title}
          className="h-32 w-32 shrink-0 rounded-lg object-cover"
        />

        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-md bg-[#e8f7f7] px-3 py-1 text-xs font-semibold text-[#178f95]">
            {toDisplayCategory(product.category)}
          </span>

          <h3 className="mt-4 line-clamp-2 text-base font-bold text-[#07182c]">
            {product.title}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {seller}{" "}
            <span className="rounded border border-green-400 px-1 text-[10px] text-green-600">
              Verified
            </span>
          </p>
        </div>
      </div>

      <p className="mt-5 text-xl font-bold text-[#178f95]">
        PKR {price.toLocaleString()}
      </p>

      <p className="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <FaStar className="text-yellow-400" />
        New listing
      </p>

      <p className="mt-3 text-sm text-green-600">
        In Stock{" "}
        <span className="ml-2 text-gray-500">{product.stock} available</span>
      </p>

      <div className="my-5 border-t border-gray-100" />

      <h3 className="text-sm font-bold text-[#07182c]">About this pet</h3>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        {product.description || "No description provided."}
      </p>

      <Button className="mt-6 w-full gap-2" onClick={handleBuyNow}>
        <FaShoppingCart />
        Add to Cart
      </Button>

      {cartError && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          {cartError}
        </p>
      )}

      <Button variant="outline" className="mt-3 w-full gap-2" onClick={handleSave}>
        <FaHeart />
        Save Listing
      </Button>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-gray-500">
        <div>
          <FaCheckCircle className="mx-auto mb-2 text-[#178f95]" />
          <p>Secure Payment</p>
        </div>

        <div>
          <FaCheckCircle className="mx-auto mb-2 text-[#178f95]" />
          <p>Easy Returns</p>
        </div>

        <div>
          <FaCheckCircle className="mx-auto mb-2 text-[#178f95]" />
          <p>Seller Verified</p>
        </div>
      </div>
    </Card>
  );
};

export default MarketplaceDetailPanel;
