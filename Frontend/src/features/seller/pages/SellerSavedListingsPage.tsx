import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams, useNavigation } from "react-router-dom";

import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShoppingBag,
  FaStore,
  FaUsers,
  FaPlusCircle,
  FaPencilAlt,
  FaCreditCard, 
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
  getSellerStripeOnboardingLinkApi,
  getSellerStripeStatusApi,
} from "../api/seller.api";
import type { SellerApiError, SellerProfile } from "../types/seller.types";
import type { SellerProfileFormData } from "../schemas/sellerProfile.schema";

const SellerProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // 💡 Add Search Param hook

  const [profile, setProfile] = useState<any>(null); // Type matches SellerProfile
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false); // 💡 Onboarding loading state

  const loadSellerProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetchMySellerProfileApi();
      if (response.success) {
        setProfile(response.data);

        // 💡 Live Sync: If returning from Stripe onboarding, call sync status API
        const stripeParam = searchParams.get("stripe");
        if (stripeParam === "success" && response.data.stripeConnectedAccountId) {
          setStripeLoading(true);
          const syncResponse = await getSellerStripeStatusApi();
          if (syncResponse?.success) {
            setProfile((prev: any) =>
              prev
                ? {
                  ...prev,
                  stripeOnboardingCompleted: syncResponse.data.stripeOnboardingCompleted,
                }
                : null
            );
          }
          setStripeLoading(false);
          setSearchParams({}); // Clear query parameters safely
        }
      }
    } catch (err) {
      const apiError = err as any;
      console.error("Seller profile query failed:", err);
      if (apiError.response?.status === 401) {
        navigate("/login", { state: { redirectTo: "/seller/profile" } });
        return;
      }
      setError("Unable to load store profile details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate, searchParams, setSearchParams]);

  useEffect(() => {
    loadSellerProfile();
  }, []);

  // 💡 Phase 2 Handlers: Launch onboarding redirection
  const handleStripeOnboarding = async () => {
    try {
      setStripeLoading(true);
      const response = await getSellerStripeOnboardingLinkApi();
      if (response?.success && response.data.onboardingUrl) {
        window.location.href = response.data.onboardingUrl;
      }
    } catch (err) {
      console.error("Stripe redirection failed:", err);
    } finally {
      setStripeLoading(false);
    }
  };

  const handleProfileUpdate = async (data: SellerProfileFormData) => {
    // ... keep existing update profile code ...
  };

  const handleProductDelete = async (productId: string) => {
    // ... keep existing product deletion code ...
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

              {/* 💡 Connect Stripe Onboarding Card Row */}
              <Card className="p-5 border border-slate-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-teal-50 text-[#178f95] flex items-center justify-center text-xl shrink-0">
                      <FaCreditCard />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-800">Direct Payout Wallet Setup</h3>
                      <p className="text-sm font-medium text-slate-500 mt-1 max-w-3xl">
                        Link your store to a Stripe account to receive customer order payouts. Funds are charged in escrow on platform checkout and deposited instantly to your connected bank account when the buyer confirms delivery receipt.
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {profile.stripeOnboardingCompleted ? (
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-black text-emerald-800 border border-emerald-100">
                        <FaCheckCircle />
                        Stripe Connected
                      </span>
                    ) : (
                      <Button
                        type="button"
                        disabled={stripeLoading}
                        onClick={handleStripeOnboarding}
                        className="w-full md:w-auto flex h-11 items-center justify-center font-black !bg-[#178f95] !border-[#178f95]"
                      >
                        {stripeLoading ? "Connecting..." : "Connect Stripe Wallet"}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Performance Metrics Cards */}
              <div className="grid gap-5 grid-cols-1 sm:grid-cols-3">
                {/* ... keep metrics counters ... */}
              </div>

              {/* My Products Section Grid */}
              <div className="space-y-4">
                {/* ... keep listings section grid ... */}
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

