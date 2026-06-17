import {
  Mail,
  PawPrint,
  Pencil,
  Phone,
  UserRound,
} from "lucide-react";

import Card from "@/shared/components/Card/Card";

import type { PetOwnerProfile } from "../types/petProfile.types";

type PetOwnerProfileHeaderProps = {
  profile: PetOwnerProfile;
  onEditProfile: () => void;
};

const PetOwnerProfileHeader = ({
  profile,
  onEditProfile,
}: PetOwnerProfileHeaderProps) => {
  const fallbackProfileImage =
    "https://ui-avatars.com/api/?name=Pet+Owner&background=EAF7F5&color=078b91";

  return (
    <Card className="p-5 sm:p-7 lg:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="relative mx-auto shrink-0 md:mx-0">
          <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-[#EAF7F5] shadow-lg sm:h-40 sm:w-40">
            <img
              src={profile.profileImageUrl || fallbackProfileImage}
              alt={profile.fullName}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.src = fallbackProfileImage;
              }}
            />
          </div>

          <button
            type="button"
            onClick={onEditProfile}
            aria-label="Edit profile"
            className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-white text-[#078b91] shadow-md transition hover:bg-[#078b91] hover:text-white"
          >
            <Pencil size={18} />
          </button>
        </div>

        <div className="min-w-0 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <h1 className="text-3xl font-black tracking-[-0.04em] text-[#101b3d] sm:text-4xl">
              {profile.fullName}
            </h1>

            <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF7F5] px-4 py-2 text-xs font-black text-[#078b91]">
              <PawPrint size={15} />
              Pet Parent
            </span>
          </div>

          <p className="mt-2 text-sm font-bold text-slate-500">
            @{profile.username}
          </p>

          <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-600">
            Manage your pets, veterinary appointments, and health information
            from one place.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-600 md:justify-start">
            <ProfileMeta
              icon={<Mail size={18} />}
              value={profile.email}
            />

            <ProfileMeta
              icon={<Phone size={18} />}
              value={profile.phone || "Phone not added"}
            />

            <ProfileMeta
              icon={<UserRound size={18} />}
              value="Pet Owner"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

const ProfileMeta = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#078b91]">{icon}</span>
      <span>{value}</span>
    </div>
  );
};

export default PetOwnerProfileHeader;