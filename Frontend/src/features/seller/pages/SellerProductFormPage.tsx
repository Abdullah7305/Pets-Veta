import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import Card from "@/shared/components/Card/Card";
import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import ProductImageUpload from "../components/ProductImageUpload";
import ProductPreviewCard from "../components/ProductPreviewCard";
import {
  toBackendCategory,
  toDisplayCategory,
} from "@/features/marketplace1/api/marketplace.api";
import {
  createSellerProduct,
  fetchSellerProducts,
  updateSellerProduct,
} from "../api/seller.api";

type ApiError = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
};

const toBackendStatus = (status: string) => {
  const map: Record<string, string> = {
    Active: "ACTIVE",
    Draft: "DRAFT",
    "Sold Out": "SOLD_OUT",
  };

  return map[status] || status;
};

const toDisplayStatus = (status: string) => {
  const map: Record<string, string> = {
    ACTIVE: "Active",
    DRAFT: "Draft",
    SOLD_OUT: "Sold Out",
  };

  return map[status] || status;
};

const SellerProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Food",
    price: "",
    stock: "1",
    location: "",
    description: "",
    status: "Active",
  });

  const isEditMode = Boolean(id);

  useEffect(() => {
    let ignore = false;

    const loadProductForEdit = async () => {
      if (!id) return;

      try {
        const products = await fetchSellerProducts();
        const product = products.find((item) => item.id === id);

        if (!product) {
          setError("Product not found.");
          return;
        }

        if (!ignore) {
          setForm({
            title: product.title,
            category: toDisplayCategory(product.category),
            price: String(product.price),
            stock: String(product.stock),
            location: product.location || "",
            description: product.description || "",
            status: toDisplayStatus(product.status),
          });
          setPreviews(product.images?.map((image) => image.publicUrl) || []);
        }
      } catch (err) {
        const apiError = err as ApiError;

        if (apiError.response?.status === 401) {
          navigate("/login", { state: { redirectTo: `/seller/edit-product/${id}` } });
          return;
        }

        if (!ignore) {
          setError("Unable to load the product for editing. Please try again.");
        }
      }
    };

    void loadProductForEdit();

    return () => {
      ignore = true;
    };
  }, [id, navigate]);

  const updateField = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (!form.title.trim() || !form.price || Number(form.price) <= 0) {
        setError("Product title and a valid price are required.");
        return;
      }

      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("description", form.description);
      payload.append("category", toBackendCategory(form.category));
      payload.append("status", toBackendStatus(form.status));
      payload.append("price", form.price);
      payload.append("stock", form.stock);
      payload.append("location", form.location);

      imageFiles.forEach((file) => {
        payload.append("images", file);
      });

      if (id) {
        await updateSellerProduct(id, payload);
      } else {
        await createSellerProduct(payload);
      }

      setMessage(isEditMode ? "Product updated successfully." : "Product saved successfully.");
      navigate("/seller/listings");
    } catch (err) {
      const apiError = err as ApiError;

      if (apiError.response?.status === 401) {
        navigate("/login", { state: { redirectTo: "/seller/add-product" } });
        return;
      }

      setError(apiError.response?.data?.message || "Unable to save the product. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7fbfb]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-6">
          <div className="mb-5">
            <h1 className="text-2xl font-semibold text-gray-900">
              {isEditMode ? "Edit Product Listing" : "Add Product Listing"}
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

              {message && (
                <p className="mb-4 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  {message}
                </p>
              )}

              {error && (
                <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

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
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                />

                <Input
                  label="Stock Quantity"
                  type="number"
                  min="0"
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
                  previews={previews}
                  onImageChange={(files) => {
                    setImageFiles(files);
                    setPreviews(files.map((file) => URL.createObjectURL(file)));
                  }}
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

                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => navigate("/seller/listings")}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={saving}>
                  {saving ? "Saving..." : "Save Product"}
                </Button>
              </div>
            </Card>

            <ProductPreviewCard
              image={previews[0] || ""}
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
