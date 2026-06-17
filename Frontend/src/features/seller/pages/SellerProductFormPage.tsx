import { useState } from "react";
import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import Card from "@/shared/components/Card/Card";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import ProductImageUpload from "../components/ProductImageUpload";
import ProductPreviewCard from "../components/ProductPreviewCard";

const SellerProductFormPage = () => {
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    title: "Royal Canin Mini Adult 2kg",
    category: "Food",
    price: "4200",
    stock: "3",
    location: "Lahore, Punjab",
    description:
      "Complete and balanced nutrition for small breed adult dogs. Supports healthy skin, coat and digestion.",
    status: "Active",
    featured: false,
  });

  const updateField = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-semibold text-gray-900">
              Add / Edit Product Listing
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Dashboard / Add / Edit Product
            </p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <Card>
              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Product Information
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Product Title"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#178f95]"
                  >
                    <option>Food</option>
                    <option>Pets</option>
                    <option>Accessories</option>
                  </select>
                </div>

                <Input
                  label="Price (PKR)"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                />

                <Input
                  label="Stock Quantity"
                  value={form.stock}
                  onChange={(e) => updateField("stock", e.target.value)}
                />

                <div className="md:col-span-2">
                  <Input
                    label="Location"
                    value={form.location}
                    onChange={(e) => updateField("location", e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                    className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#178f95]"
                  />
                </div>

                <ProductImageUpload
                  preview={preview}
                  onImageChange={(file) =>
                    setPreview(URL.createObjectURL(file))
                  }
                />

                <div className="grid content-start gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) => updateField("status", e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#178f95]"
                    >
                      <option>Active</option>
                      <option>Draft</option>
                      <option>Sold Out</option>
                    </select>
                  </div>

                  <label className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) =>
                        updateField("featured", e.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-[#178f95]"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Featured Listing
                      </p>
                      <p className="text-xs text-gray-500">
                        Show this product on top in marketplace
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Product</Button>
              </div>
            </Card>

            <ProductPreviewCard
              image={preview}
              title={form.title}
              category={form.category}
              price={form.price}
              stock={form.stock}
              location={form.location}
              description={form.description}
              status={form.status}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerProductFormPage;