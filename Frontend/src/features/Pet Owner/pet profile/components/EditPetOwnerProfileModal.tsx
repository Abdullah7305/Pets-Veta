import { type ChangeEvent, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";

import Button from "@/shared/components/Button/Button";

import {
  petOwnerProfileSchema,
  type PetOwnerProfileFormData,
} from "../schemas/petOwnerProfile.schema";
import type {
  EditPetOwnerProfileModalProps,
  PetOwnerProfileFieldProps,
} from "../types/petProfile.types";

const EditPetOwnerProfileModal = ({
  profile,
  isSaving,
  error,
  onCancel,
  onSubmit,
}: EditPetOwnerProfileModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PetOwnerProfileFormData>({
    resolver: zodResolver(petOwnerProfileSchema),
    defaultValues: {
      fullName: profile.fullName,
      username: profile.username,
      phone: profile.phone || "",
    },
  });

  const profileImage = useWatch({ control, name: "profileImage" });

  const fallbackProfileImage =
    "https://ui-avatars.com/api/?name=Pet+Owner&background=EAF7F5&color=078b91";
  const savedProfileImage =
    profile.profileImageUrl &&
    !profile.profileImageUrl.toLowerCase().includes("enter your image")
      ? profile.profileImageUrl
      : fallbackProfileImage;

  const previewUrl = useMemo(() => {
    if (profileImage) {
      return URL.createObjectURL(profileImage);
    }

    return savedProfileImage;
  }, [profileImage, savedProfileImage]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setValue("profileImage", file, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 px-4 py-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#101b3d]">
              Edit Profile
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Update your profile details and photo.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-[#101b3d]"
            aria-label="Close edit profile"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div className="flex justify-center">
            <label className="group relative cursor-pointer">
              <span className="block h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-[#EAF7F5] shadow-lg">
                <img
                  src={previewUrl || fallbackProfileImage}
                  alt={profile.fullName}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = fallbackProfileImage;
                  }}
                />
              </span>

              <span className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-[#078b91] text-white shadow-md transition group-hover:bg-[#056f75]">
                <Camera size={18} />
              </span>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {errors.profileImage && (
            <p className="text-center text-xs font-bold text-red-600">
              {errors.profileImage.message}
            </p>
          )}

          <Field
            label="Full Name"
            inputProps={register("fullName")}
            error={errors.fullName?.message}
          />

          <Field
            label="Username"
            inputProps={register("username")}
            error={errors.username?.message}
          />

          <Field
            label="Phone"
            inputProps={register("phone")}
            error={errors.phone?.message}
          />

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="w-full !bg-[#078b91] !border-[#078b91] !text-white hover:!bg-[#056f75] hover:!text-white sm:w-auto"
              loading={isSaving}
              loadingText="Saving..."
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Field = ({ label, error, inputProps }: PetOwnerProfileFieldProps) => {
  return (
    <label className="block">
      <span className="text-sm font-black text-[#101b3d]">{label}</span>
      <input
        className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-[#101b3d] outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#078b91]/10"
        {...inputProps}
      />
      {error && (
        <span className="mt-1.5 block text-xs font-bold text-red-600">
          {error}
        </span>
      )}
    </label>
  );
};

export default EditPetOwnerProfileModal;
