import { FaFilter, FaPlus } from "react-icons/fa";
import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import Card from "@/shared/components/Card/Card";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import ProductCard from "../components/ProductCard";
import { productTabs, sellerProducts } from "../data/sellerProducts.data";

const SellerProductsPage = () => {
  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar activeItem="My Listings" />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-7">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                My Listings
              </h1>
              <p className="text-sm text-gray-500">
                Manage all your product listings and their status.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Input placeholder="Search products..." className="w-full sm:w-72" />

              <select className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-[#178f95]">
                <option>Category</option>
                <option>Pets</option>
                <option>Food</option>
                <option>Accessories</option>
              </select>

              <Button className="gap-2">
                <FaFilter />
                Filter
              </Button>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-3">
            {productTabs.map((tab, index) => (
              <button
                key={tab}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  index === 0
                    ? "bg-[#178f95] text-white"
                    : "bg-white text-gray-600 hover:bg-[#e8f7f7] hover:text-[#178f95]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <Card className="flex min-h-[320px] flex-col items-center justify-center border-dashed border-gray-300 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                <FaPlus className="text-xl" />
              </div>

              <h3 className="text-base font-semibold text-gray-900">
                Add New Product
              </h3>

              <p className="mt-2 max-w-[220px] text-sm text-gray-500">
                Create a new listing for your products
              </p>

              <Button className="mt-5">Add Product</Button>
            </Card>

            {sellerProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerProductsPage;