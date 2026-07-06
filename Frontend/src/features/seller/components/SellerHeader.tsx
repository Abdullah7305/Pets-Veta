import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import { useAuth } from "@/features/Auth/hooks/authhook";
import NotificationBell from "@/shared/components/NotificationBell/NotificationBell";

type AuthUserData = {
  id?: string;
  name?: string;
  fullName?: string;
  username?: string;
  email?: string;
  profileImageUrl?: string;
};

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

  const authData = user?.data as AuthUserData | undefined;

  const profileName = useMemo(() => {
    return (
      authData?.username ||
      authData?.fullName ||
      authData?.name ||
      authData?.email?.split("@")[0] ||
      "User"
    );
  }, [authData?.email, authData?.fullName, authData?.name, authData?.username]);

  const profileImageUrl = useMemo(() => {
    if (isValidImageUrl(authData?.profileImageUrl)) {
      return authData?.profileImageUrl || "";
    }

    return "";
  }, [authData?.profileImageUrl]);

  const showProfileImage = Boolean(profileImageUrl) && !imageFailed;

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 px-7 py-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-6">
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-[-0.03em] text-[#07182c]">
            Welcome back, {profileName}
          </h1>

          <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-500">
            Manage your pets, listings, appointments, orders, and messages from
            one dashboard.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <NotificationBell />

          <button
            type="button"
            onClick={() => navigate("/pet-owner/profile")}
            className="flex h-12 items-center gap-3 rounded-2xl border border-gray-100 bg-[#f8fbfb] px-3 pr-5 shadow-sm transition hover:border-[#178f95]/30 hover:bg-[#eefafa]"
            aria-label="Open profile"
          >
            {showProfileImage ? (
              <span className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-[#178f95]/10">
                <img
                  src={profileImageUrl}
                  alt={profileName}
                  className="h-full w-full object-cover object-center"
                  onError={() => {
                    setImageFailed(true);
                  }}
                />
              </span>
            ) : (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#178f95]/10 text-sm font-black text-[#178f95]">
                {profileName ? getInitials(profileName) : <FaUser />}
              </span>
            )}

            <span className="max-w-[160px] truncate text-sm font-black text-[#07182c]">
              {profileName}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;