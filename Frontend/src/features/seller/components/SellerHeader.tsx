import { useEffect, useMemo, useState } from "react";
import { FaBell, FaChevronDown, FaUser } from "react-icons/fa";

import { useAuth } from "@/features/Auth/hooks/authhook";
import Input from "@/shared/components/Input/Input";

import { fetchMySellerProfileApi } from "../api/seller.api";
import type { SellerProfile } from "../types/seller.types";

const isValidImageUrl = (imageUrl?: string | null) => {
  if (!imageUrl) return false;

  const cleanUrl = imageUrl.trim();

  if (!cleanUrl) return false;

  return !cleanUrl.toLowerCase().includes("enter your image");
};

const getInitials = (name: string) => {
  return (
    name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || "S"
  );
};

const SellerHeader = () => {
  const { user } = useAuth();

  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(
    null
  );
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadSellerProfile = async () => {
      try {
        const response = await fetchMySellerProfileApi();

        if (!ignore) {
          setSellerProfile(response.data);
        }
      } catch (error) {
        console.error("Failed to load seller profile:", error);
      }
    };

    void loadSellerProfile();

    return () => {
      ignore = true;
    };
  }, []);

  const sellerUser = sellerProfile?.user;

  const profileName = useMemo(() => {
    return (
      sellerUser?.username ||
      user?.data?.username ||
      sellerUser?.fullName ||
      user?.data?.name ||
      sellerProfile?.businessName ||
      "Seller"
    );
  }, [sellerProfile?.businessName, sellerUser, user?.data]);

  const welcomeName = useMemo(() => {
    return sellerProfile?.businessName || profileName;
  }, [profileName, sellerProfile?.businessName]);

  const profileImageUrl = useMemo(() => {
    const sellerProfileImage = sellerUser?.profileImageUrl;
    const authProfileImage = user?.data?.profileImageUrl;

    if (isValidImageUrl(sellerProfileImage)) {
      return sellerProfileImage;
    }

    if (isValidImageUrl(authProfileImage)) {
      return authProfileImage;
    }

    return "";
  }, [sellerUser?.profileImageUrl, user?.data?.profileImageUrl]);

  const showProfileImage = Boolean(profileImageUrl) && !imageFailed;

  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-7 py-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          Welcome back, {welcomeName}
        </h1>

        <p className="text-sm text-gray-500">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Input placeholder="Search..." className="w-72" />

        <button
          type="button"
          className="relative rounded-full border border-gray-100 p-3 text-gray-600"
          aria-label="Notifications"
        >
          <FaBell />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          {showProfileImage ? (
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#178f95]/20 bg-[#178f95]/10">
              <img
                src={profileImageUrl}
                alt={profileName}
                className="block h-full w-full rounded-full object-cover object-center"
                onError={() => {
                  setImageFailed(true);
                }}
              />
            </div>
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#178f95]/20 bg-[#178f95]/10 text-sm font-bold text-[#178f95]">
              {profileName ? getInitials(profileName) : <FaUser />}
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-gray-900">
              {profileName}
            </p>
            <p className="text-xs text-gray-500">Seller</p>
          </div>

          <FaChevronDown className="text-xs text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;