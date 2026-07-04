import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaChevronDown, FaUser } from "react-icons/fa";

import { useAuth } from "@/features/Auth/hooks/authhook";
import Input from "@/shared/components/Input/Input";

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
      .join("") || "U"
  );
};

const SellerHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [imageFailed, setImageFailed] = useState(false);

  const profileName = useMemo(() => {
    return user?.data?.username || user?.data?.name || "User";
  }, [user?.data?.name, user?.data?.username]);

  const profileImageUrl = useMemo(() => {
    const authProfileImage = user?.data?.profileImageUrl;

    if (isValidImageUrl(authProfileImage)) {
      return authProfileImage;
    }

    return "";
  }, [user?.data?.profileImageUrl]);

  const showProfileImage = Boolean(profileImageUrl) && !imageFailed;

  const handleProfileClick = () => {
    navigate("/pet-owner/profile");
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-7 py-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          Welcome back, {profileName}
        </h1>

        <p className="text-sm text-gray-500">
          Manage your pets, listings, appointments, orders, and messages from one
          dashboard.
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

        <button
          type="button"
          onClick={handleProfileClick}
          className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-gray-50"
          aria-label="Open profile"
        >
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

          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">
              {profileName}
            </p>
            <p className="text-xs text-gray-500">My Account</p>
          </div>

          <FaChevronDown className="text-xs text-gray-500" />
        </button>
      </div>
    </header>
  );
};

export default SellerHeader;