// src/features/marketplace1/pages/MarketplaceProductDetailPage.tsx

import { useParams } from "react-router-dom";
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
import { marketplaceItems } from "../data/marketplace.data";

const MarketplaceProductDetailPage = () => {
  const { id } = useParams();

  const product = marketplaceItems.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f7fbfb] p-10">
        <h1 className="text-2xl font-semibold text-gray-900">
          Product not found
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7fbfb] px-5 py-8 lg:px-12">
      <p className="mb-5 text-sm text-gray-500">
        Marketplace / {product.category} / {product.title}
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr_430px]">
        <Card className="overflow-hidden p-0">
          <div className="h-[520px] bg-white">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
        </Card>

        <Card>
          <span className="rounded-full bg-[#178f95]/10 px-3 py-1 text-sm font-semibold text-[#178f95]">
            {product.category}
          </span>

          <h1 className="mt-4 text-3xl font-extrabold text-[#07182c]">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            <span className="font-semibold text-gray-700">
              {product.rating}
            </span>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          <p className="mt-6 text-3xl font-extrabold text-[#07182c]">
            PKR {product.price.toLocaleString()}
          </p>

          <p className="mt-5 leading-7 text-gray-600">
            {product.description}
          </p>

          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <FaStore className="text-[#178f95]" />
              Seller: {product.seller}
            </p>

            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#178f95]" />
              Location: {product.location}
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
            <Button className="gap-2">
              <FaShoppingCart />
              Buy Now
            </Button>

            <Button variant="outline" className="gap-2">
              <FaHeart />
              Save Listing
            </Button>
          </div>

          <Button variant="outline" className="mt-3 w-full">
            Message Seller
          </Button>
        </Card>
      </div>
    </main>
  );
};

export default MarketplaceProductDetailPage;