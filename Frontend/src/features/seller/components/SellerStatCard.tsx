import Card from "@/shared/components/Card/Card";
import type { SellerStatCardProps } from "../types/seller.types";

const SellerStatCard = ({ title, value, subtitle }: SellerStatCardProps) => {
  return (
    <Card>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="mt-2 text-2xl font-bold text-gray-900">{value}</h3>
      <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
    </Card>
  );
};

export default SellerStatCard;
