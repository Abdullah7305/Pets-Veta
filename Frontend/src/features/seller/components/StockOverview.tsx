import Card from "@/shared/components/Card/Card";

const StockOverview = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4">
          <p className="text-xs text-gray-500">Total Products</p>
          <h3 className="mt-2 text-2xl font-bold text-[#178f95]">48</h3>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-gray-500">Low Stock Items</p>
          <h3 className="mt-2 text-2xl font-bold text-red-500">5</h3>
        </Card>

        <Card className="p-4">
          <p className="text-xs text-gray-500">Out of Stock</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">0</h3>
        </Card>
      </div>

      <Card>
        <h3 className="mb-5 text-sm font-semibold text-gray-900">
          Stock Overview
        </h3>

        <div className="flex items-center gap-6">
          <div className="relative h-32 w-32 rounded-full bg-[conic-gradient(#178f95_0_73%,#f5b942_73%_83%,#ef4444_83%_83%,#8aa3a3_83%_100%)]">
            <div className="absolute inset-8 rounded-full bg-white" />
          </div>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[#178f95]" />
              In Stock 73%
            </p>

            <p className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[#f5b942]" />
              Low Stock 10%
            </p>

            <p className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-red-500" />
              Out of Stock 0%
            </p>

            <p className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[#8aa3a3]" />
              Sold Out 17%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StockOverview;