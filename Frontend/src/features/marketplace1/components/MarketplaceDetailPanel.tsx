import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaComments,
  FaEdit,
  FaHeart,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaTimes,
} from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import { addToCart } from "@/features/cart/utils/cartStorage";
import { useAuth } from "@/features/Auth/hooks/authhook";
import { createOrGetDirectConversationApi } from "@/features/messages/api/message.api";
import {
  getProductImage,
  getProductPrice,
  getSellerName,
  saveMarketplaceListing,
  toDisplayCategory,
  type MarketplaceProduct,
} from "../api/marketplace.api";

type MarketplaceDetailPanelProps = {
  product: MarketplaceProduct;
  onClose: () => void;
};

const MarketplaceDetailPanel = ({
  product,
  onClose,
}: MarketplaceDetailPanelProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cartError, setCartError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);

  const image = getProductImage(product);
  const price = getProductPrice(product);
  const seller = getSellerName(product);
  const displayCategory = toDisplayCategory(product.category);

  const isPet = product.category === "PETS";
  const isOwnListing = user?.data?.id === product.seller?.user?.id;
  const isUnavailable = product.status !== "ACTIVE" || product.stock <= 0;

  const handleAddToCart = () => {
    setCartError("");
    setSaveMessage("");
    setMessageError("");

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

  const handleDirectBuy = () => {
    setCartError("");
    setSaveMessage("");
    setMessageError("");

    if (isUnavailable) {
      setCartError("This listing is not available right now.");
      return;
    }

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

  const handleSave = async () => {
    try {
      setCartError("");
      setSaveMessage("");
      setMessageError("");

      await saveMarketplaceListing(product.id);
      setSaveMessage("Listing saved.");
    } catch {
      navigate("/login", {
        state: { redirectTo: "/marketplace1" },
      });
    }
  };

  const handleMessageSeller = async () => {
    const currentUserId = user?.data?.id;
    const sellerUserId = product.seller?.user?.id;

    setCartError("");
    setSaveMessage("");
    setMessageError("");

    if (!currentUserId) {
      navigate("/login", {
        state: { redirectTo: `/marketplace/product/${product.id}` },
      });
      return;
    }

    if (!sellerUserId) {
      setMessageError("Seller account not found for this listing.");
      return;
    }

    if (sellerUserId === currentUserId) {
      setMessageError("You cannot message your own listing.");
      return;
    }

    try {
      setMessageLoading(true);

      const conversation = await createOrGetDirectConversationApi(
        sellerUserId,
        "MARKETPLACE_PRODUCT",
        product.id
      );

      navigate(`/messages?conversationId=${conversation.id}`);
    } catch (error) {
      console.error("Message seller failed:", error);
      setMessageError("Unable to open chat. Please try again.");
    } finally {
      setMessageLoading(false);
    }
  };

  return (
    <aside className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#178f95]">
            Quick Preview
          </p>

          <h2 className="mt-1 line-clamp-2 text-xl font-bold text-[#07182c]">
            {product.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Close preview"
        >
          <FaTimes />
        </button>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/marketplace/product/${product.id}`)}
        className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50"
        aria-label={`Open ${product.title} detail page`}
      >
        <img
          src={image}
          alt={product.title}
          className="h-full w-full object-contain p-3"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#178f95] shadow-sm">
          {displayCategory}
        </span>

        {isUnavailable && (
          <span className="absolute bottom-3 left-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            Sold Out
          </span>
        )}
      </button>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-2xl font-extrabold text-[#07182c]">
            PKR {price.toLocaleString()}
          </p>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${isUnavailable
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-700"
              }`}
          >
            {isUnavailable ? "Not Available" : "In Stock"}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <FaStar className="text-yellow-400" />
          <span className="font-semibold text-gray-700">New</span>
          <span>Marketplace listing</span>
        </div>

        <p className="mt-4 line-clamp-4 text-sm leading-6 text-gray-600">
          {product.description || "No description provided."}
        </p>

        <div className="mt-5 space-y-3 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <FaStore className="text-[#178f95]" />
            <span className="font-semibold text-gray-700">Seller:</span>
            <span className="truncate">{seller}</span>

            {isOwnListing && (
              <span className="rounded-sm bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-400">
                Your Listing
              </span>
            )}
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#178f95]" />
            <span className="font-semibold text-gray-700">Location:</span>
            <span className="truncate">
              {product.location || product.seller?.city || "Pakistan"}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <FaShieldAlt className="text-[#178f95]" />
            <span>Pets-Veta marketplace user</span>
          </p>

          <p className="font-semibold text-gray-500">
            Stock: {product.stock}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/marketplace/product/${product.id}`)}
          >
            Details
          </Button>

          {isOwnListing ? (
            <Button
              size="sm"
              className="gap-2 !border-slate-200 !bg-gray-100 !text-slate-700 hover:!bg-slate-200"
              onClick={() => navigate(`/seller/edit-product/${product.id}`)}
            >
              <FaEdit />
              Edit
            </Button>
          ) : isPet ? (
            <Button
              size="sm"
              onClick={handleDirectBuy}
              disabled={isUnavailable}
            >
              Buy Now
            </Button>
          ) : (
            <Button
              size="sm"
              className="gap-2"
              onClick={handleAddToCart}
              disabled={isUnavailable}
            >
              <FaShoppingCart />
              Cart
            </Button>
          )}
        </div>

        {!isOwnListing && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleSave}
            >
              <FaHeart />
              Save
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleMessageSeller}
              disabled={messageLoading}
            >
              <FaComments />
              {messageLoading ? "Opening..." : "Message"}
            </Button>
          </div>
        )}

        {isOwnListing && (
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={() => navigate("/seller/listings")}
          >
            View All Listings
          </Button>
        )}

        {cartError && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
            {cartError}
          </p>
        )}

        {saveMessage && (
          <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
            {saveMessage}
          </p>
        )}

        {messageError && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
            {messageError}
          </p>
        )}
      </div>
    </aside>
  );
};

export default MarketplaceDetailPanel;