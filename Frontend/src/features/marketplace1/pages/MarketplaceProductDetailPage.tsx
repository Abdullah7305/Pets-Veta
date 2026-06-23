// src/features/marketplace1/pages/MarketplaceProductDetailPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaStar,
  FaStore,
  FaShoppingCart,
  FaShieldAlt,
} from "react-icons/fa";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import { addToCart } from "@/features/cart/utils/cartStorage";
import {
  fetchMarketplaceProductById,
  getProductImage,
  getProductPrice,
  getSellerName,
  saveMarketplaceListing,
  toDisplayCategory,
  type MarketplaceProduct,
} from "../api/marketplace.api";

const MarketplaceProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<MarketplaceProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [cartError, setCartError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadProduct = async () => {
      if (!id) {
        setError("Product id missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchMarketplaceProductById(id);

        if (!ignore) {
          setProduct(data);
        }
      } catch {
        if (!ignore) {
          setError("Product not found.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleBuyNow = () => {
    if (!product) return;

    const result = addToCart({
      productId: product.id,
      title: product.title,
      price: getProductPrice(product),
      image: getProductImage(product),
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
    if (!product) return;

    try {
      await saveMarketplaceListing(product.id);
      setSaveMessage("Listing saved.");
    } catch {
      navigate("/login", {
        state: { redirectTo: `/marketplace/product/${product.id}` },
      });
    }
  };

  if (loading) {
    return (
      <div className="mt-20 min-h-screen bg-[#f7fbfb] p-10">
        <h1 className="text-2xl font-semibold text-gray-900">
          Loading product...
        </h1>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="mt-20 min-h-screen bg-[#f7fbfb] p-10">
        <h1 className="text-2xl font-semibold text-gray-900">
          {error || "Product not found"}
        </h1>
      </div>
    );
  }

  const image = getProductImage(product);
  const price = getProductPrice(product);
  const seller = getSellerName(product);
  const displayCategory = toDisplayCategory(product.category);

  return (
    <main className="mt-20 min-h-screen bg-[#f7fbfb] px-5 py-8 lg:px-12">
      <p className="mb-5 text-sm text-gray-500">
        Marketplace / {displayCategory} / {product.title}
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr_430px]">
        <Card className="overflow-hidden p-0">
          <div className="h-[520px] bg-white">
            <img
              src={image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
        </Card>

        <Card>
          <span className="rounded-full bg-[#178f95]/10 px-3 py-1 text-sm font-semibold text-[#178f95]">
            {displayCategory}
          </span>

          <h1 className="mt-4 text-3xl font-extrabold text-[#07182c]">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <span className="font-semibold text-gray-700">
              New
            </span>
            <span className="text-gray-500">Active marketplace listing</span>
          </div>

          <p className="mt-6 text-3xl font-extrabold text-[#07182c]">
            PKR {price.toLocaleString()}
          </p>

          <p className="mt-5 leading-7 text-gray-600">
            {product.description || "No description provided."}
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <FaStore className="text-[#178f95]" />
              Seller: {seller}
            </p>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#178f95]" />
              Location: {product.location || product.seller?.city || "Pakistan"}
            </p>

            <p className="flex items-center gap-2">
              <FaShieldAlt className="text-[#178f95]" />
              Verified seller product
            </p>
          </div>

          <p className="mt-5 text-sm font-medium text-green-600">
            In Stock{" "}
            <span className="text-gray-500">{product.stock} available</span>
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <Button className="gap-2" onClick={handleBuyNow}>
              <FaShoppingCart />
              Add to Cart
            </Button>

            <Button variant="outline" className="gap-2" onClick={handleSave}>
              <FaHeart />
              Save Listing
            </Button>
          </div>

          {cartError && (
            <p className="mt-3 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
              {cartError}
            </p>
          )}

          {saveMessage && (
            <p className="mt-3 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              {saveMessage}
            </p>
          )}

          <Button variant="outline" className="mt-3 w-full">
            Message Seller
          </Button>
        </Card>
      </div>
    </main>
  );
};

export default MarketplaceProductDetailPage;
