import { FaMapMarkerAlt, FaShoppingBag } from "react-icons/fa";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import type { ProductPreviewCardProps } from "../types/seller.types";

const ProductPreviewCard = ({
  image,
  title,
  category,
  price,
  stock,
  location,
  description,
  status,
}: ProductPreviewCardProps) => {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Marketplace Preview
        </h2>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          {status}
        </span>
      </div>

      <div className="flex h-56 items-center justify-center rounded-xl bg-gray-50">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full max-h-56 rounded-xl object-contain"
          />
        ) : (
          <p className="text-sm text-gray-400">Product image preview</p>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{category}</p>

        <p className="mt-3 text-lg font-bold text-gray-900">PKR {price}</p>

        <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>

        <div className="mt-5 space-y-3 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <FaShoppingBag className="text-gray-400" />
            Stock: {stock}
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-400" />
            {location}
          </p>
        </div>

        <Button className="mt-6 w-full">View in Marketplace</Button>
      </div>
    </Card>
  );
};

export default ProductPreviewCard;
