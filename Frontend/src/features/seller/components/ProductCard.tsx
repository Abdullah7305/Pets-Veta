import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

type ProductCardProps = {
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  image: string;
};

const statusClass: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "Sold Out": "bg-red-100 text-red-700",
  "Low Stock": "bg-yellow-100 text-yellow-700",
  Draft: "bg-gray-100 text-gray-600",
};

const ProductCard = ({
  name,
  category,
  price,
  stock,
  status,
  image,
}: ProductCardProps) => {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="relative h-44 bg-gray-50">
        <img src={image} alt={name} className="h-full w-full object-cover" />

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
            statusClass[status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-xs text-gray-500">{category}</p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">{price}</p>
          <p className="text-xs text-gray-500">Stock: {stock}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm">
            Edit
          </Button>

          <Button variant="outline" size="sm">
            Delete
          </Button>
        </div>

        <button className="mt-3 w-full text-center text-xs font-medium text-[#178f95]">
          View in Marketplace
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;