import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShoppingBag,
  FaStore,
  FaUsers,
  FaPlusCircle,
  FaPencilAlt,
} from "react-icons/fa";

import SellerHeader from "../components/SellerHeader";
import SellerSidebar from "../components/SellerSidebar";
import ProductCard from "../components/ProductCard";
import EditSellerProfileModal from "../components/EditSellerProfileModal";
import Card from "@/shared/components/Card/Card";
import Button from "@/shared/components/Button/Button";

import {
  fetchMySellerProfileApi,
  createOrUpdateSellerProfileApi,
  deleteSellerProduct,
} from "../api/seller.api";
import type { SellerProfile } from "../types/seller.types";
import type { SellerProfileFormData } from "../schemas/sellerProfile.schema";

const SellerProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const loadSellerProfile = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetchMySellerProfileApi();
      if (response.success) {
        setProfile(response.data);
      }
    } catch (err: any) {
      console.error("Seller profile query failed:", err);
      if (err?.response?.status === 401) {
        navigate("/login", { state: { redirectTo: "/seller/profile" } });
        return;
      }
      setError("Unable to load store profile details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSellerProfile();
  }, []);

  const handleProfileUpdate = async (data: SellerProfileFormData) => {
    try {
      setIsSaving(true);
      setProfileError("");

      const formData = new FormData();
      formData.append("businessName", data.businessName);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("city", data.city);
      formData.append("businessAddress", data.businessAddress);
      formData.append("storeDescription", data.storeDescription || "");

      if (data.storeLogo instanceof File) {
        formData.append("storeLogo", data.storeLogo);
      }

      const response = await createOrUpdateSellerProfileApi(formData);
      if (response.success) {
        setProfile(response.data);
        setOpenModal(false);
        // Refresh local dashboard bindings
        await loadSellerProfile();
      }
    } catch (err: any) {
      console.error("Store update failed:", err);
      setProfileError(
        err?.response?.data?.message || "Failed to update your store identity."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleProductDelete = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteSellerProduct(productId);
      // Remove deleted item from local state list
      if (profile) {
        setProfile({
          ...profile,
          products: profile.products?.filter((p) => p.id !== productId) || [],
        });
      }
    } catch (err) {
      console.error("Product deletion failed:", err);
    }
  };

  const fallbackLogo = "https://ui-avatars.com/api/?name=Seller+Store&background=E8F7F7&color=178f95";
  const products = profile?.products || [];

  return (
    <div className="flex min-h-screen bg-[#f7fbfb] text-[#20263D]">
      <SellerSidebar />

      <main className="flex-1">
        <SellerHeader />

        <section className="p-7 max-w-[1600px] mx-auto">
          {loading && !profile && (
            <div className="flex justify-center items-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#178f95] border-t-transparent" />
            </div>
          )}

          {error && (
            <Card className="p-6 text-sm font-semibold text-red-600 bg-red-50 border border-red-100">
              {error}
            </Card>
          )}

          {!loading && profile && (
            <div className="space-y-6">
              {/* Brand Header Identity Card */}
              <Card className="relative overflow-hidden p-6 sm:p-8">
                <div className="absolute right-0 top-0 h-32 w-32 bg-[#178f95]/5 rounded-bl-full" />

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-slate-50 bg-slate-50 shadow-md">
                    <img
                      src={profile.storeLogo || fallbackLogo}
                      alt={profile.businessName || "Store storefront logo"}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                        {profile.businessName || "Your Storefront"}
                      </h1>

                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold ${profile.isVerified
                          ? "bg-green-50 text-green-700 border border-green-100"
                          : "bg-amber-50 text-orange-600 border border-amber-100"
                        }`}>
                        <FaCheckCircle />
                        {profile.isVerified ? "Verified Shop" : "Pending Verification"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-500 font-medium">
                      Store Username: @{profile.user?.username || "seller"}
                    </p>

                    <p className="mt-4 text-sm leading-6 text-gray-600 max-w-3xl">
                      {profile.storeDescription || "No store description configured yet. Setup store profile details to build trust."}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-gray-500">
                      <span className="flex items-center gap-2">
                        <FaStore className="text-[#178f95] text-sm" />
                        {profile.businessAddress || "Address unconfigured"}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#178f95] text-sm" />
                        {profile.city || "Pakistan"}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaPhoneAlt className="text-[#178f95] text-sm" />
                        {profile.phoneNumber || "No contact digits"}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 pt-4 sm:pt-0">
                    <Button
                      variant="outline"
                      className="flex h-11 w-full sm:w-auto items-center justify-center gap-2 border-slate-200 px-5 text-slate-700 hover:border-[#178f95] hover:text-[#178f95]"
                      onClick={() => setOpenModal(true)}
                    >
                      <FaPencilAlt size={14} />
                      Edit Brand Profile
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Performance Metrics Cards */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-3">
                <Card className="p-5 flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-[#E8F7F7] text-[#178f95] flex items-center justify-center text-xl">
                    <FaShoppingBag />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Products</p>
                    <h3 className="mt-1 text-2xl font-black text-gray-900">{products.length}</h3>
                  </div>
                </Card>

                <Card className="p-5 flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-amber-50 text-orange-500 flex items-center justify-center text-xl">
                    <FaStore />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Low Stock Listings</p>
                    <h3 className="mt-1 text-2xl font-black text-orange-600">
                      {products.filter((p) => p.stock > 0 && p.stock <= 3).length}
                    </h3>
                  </div>
                </Card>

                <Card className="p-5 flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-xl">
                    <FaUsers />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Account Type</p>
                    <h3 className="mt-1 text-2xl font-black text-green-700">Verified Seller</h3>
                  </div>
                </Card>
              </div>

              {/* My Products Section Grid */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">My Listings ({products.length})</h2>
                  <p className="text-xs font-semibold text-gray-400 mt-1">Manage, update, or preview your dynamic product catalogs.</p>
                </div>

                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {/* Create New Shortcut Card */}
                  <Card className="flex min-h-[300px] flex-col items-center justify-center border-dashed border-gray-300 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-600 shadow-xs">
                      <FaPlusCircle className="text-2xl text-[#178f95]" />
                    </div>

                    <h3 className="text-base font-bold text-gray-900">Add New Product</h3>
                    <p className="mt-2 max-w-[200px] text-xs font-semibold text-gray-400 leading-5">
                      Create and post a new pet listing to the live marketplace catalog.
                    </p>

                    <Button
                      className="mt-6 !bg-[#178f95] !border-[#178f95] !text-white hover:!bg-[#12757a]"
                      size="sm"
                      onClick={() => navigate("/seller/add-product")}
                    >
                      Create Listing
                    </Button>
                  </Card>

                  {/* Render products */}
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={() => navigate(`/seller/edit-product/${product.id}`)}
                      onDelete={() => void handleProductDelete(product.id)}
                      onView={() => navigate(`/marketplace/product/${product.id}`)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Edit Modal popup */}
      {openModal && profile && (
        <EditSellerProfileModal
          profile={profile}
          isSaving={isSaving}
          error={profileError}
          onCancel={() => {
            setOpenModal(false);
            setProfileError("");
          }}
          onSubmit={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default SellerProfilePage;