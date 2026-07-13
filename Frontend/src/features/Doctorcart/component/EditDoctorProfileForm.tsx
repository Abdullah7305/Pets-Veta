import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Input/Input";

import {
  doctorProfileSchema,
  type DoctorProfileFormData,
  type DoctorProfileFormInput,
} from "../schemas/doctorProfile.schema";

import { updateDoctorProfileApi } from "../apis/doctorProfile.api";
import { useDoctorProfileById } from "../hooks/useDoctorProfile";

const EditDoctorProfileForm = () => {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const { data: profileData, isLoading, error } = useDoctorProfileById();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DoctorProfileFormInput, unknown, DoctorProfileFormData>({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      fullName: "",
      username: "",
      phone: "",
      profileImageUrl: "",
      specialization: "",
      medicalLicenseNumber: "",
      education: "",
      address: "",
      experience: "",
      fees: "",
      isAvailable: true,
    },
  });

  const isAvailable = watch("isAvailable");

  useEffect(() => {
    if (profileData?.success) {
      const d = profileData.data;
      reset({
        fullName: d.fullName || "",
        username: d.username || "",
        phone: d.phone || "",
profileImageUrl: d.profileImageUrl || "",
specialization: d.specialization || "",
medicalLicenseNumber: d.medicalLicenseNumber || "",
education: d.education || "",
        address: d.address || "",
        experience: String(d.experience ?? ""),
        fees: String(d.fees ?? ""),
        isAvailable: d.isAvailable ?? true,
      });
    }

    if (error) {
      console.log("Fetch doctor profile error:", error);
      setApiError("Failed to load doctor profile.");
    }
  }, [profileData, error, reset]);

  const onSubmit = async (data: DoctorProfileFormData) => {
    try {
      setApiError("");
      setApiMessage("");

      const response = await updateDoctorProfileApi(data);

      if (response.success) {
        setApiMessage(response.message || "Profile updated successfully.");

        setTimeout(() => {
          navigate("/doctor-profile");
        }, 700);
      }
    } catch (error) {
      console.log("Update doctor profile error:", error);
      setApiError("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
        <section className="mx-auto max-w-5xl">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold text-slate-500">
              Loading doctor profile...
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#078B91]">
              Doctor Panel
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#101B3D]">
              Edit Doctor Profile
            </h1>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Update your professional details, clinic information, and public
              profile.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-auto px-6"
            onClick={() => navigate("/doctor-profile")}
          >
            Cancel
          </Button>
        </div>

        {apiError && (
          <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-bold text-red-600">
            {apiError}
          </div>
        )}

        {apiMessage && (
          <div className="mb-5 rounded-2xl border border-green-100 bg-green-50 px-5 py-3 text-sm font-bold text-green-700">
            {apiMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-black text-[#101B3D]">
                Basic Information
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                These details are connected with your account profile.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Full Name"
                placeholder="Dr. Ayesha Khan"
                error={errors.fullName?.message}
                {...register("fullName")}
              />

              <Input
                label="Username"
                placeholder="dr_ayesha"
                error={errors.username?.message}
                {...register("username")}
              />

              <Input
                label="Phone"
                placeholder="+92 300 1234567"
                error={errors.phone?.message}
                {...register("phone")}
              />

              <Input
                label="Email Address"
                value={profileData?.data.email || ""}
                disabled
                readOnly
              />

              <Input
                label="Profile Image URL"
                placeholder="https://example.com/profile.jpg"
                error={errors.profileImageUrl?.message}
                {...register("profileImageUrl")}
              />
            </div>
          </section>

          {/* Professional Information */}
          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-black text-[#101B3D]">
                Professional Information
              </h2>
              <p className="mt-1 text-sm font-medium text-slate-500">
                These details will be visible to pet owners.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Specialization"
                placeholder="Veterinary Surgeon"
error={errors.specialization?.message}
{...register("specialization")}
              />

              <Input
                label="Medical License Number"
                placeholder="LIC-123456"
                error={errors.medicalLicenseNumber?.message}
                {...register("medicalLicenseNumber")}
              />

              <Input
                label="Education"
                placeholder="DVM"
                error={errors.education?.message}
                {...register("education")}
              />

              <Input
                label="Experience"
                type="number"
                placeholder="5"
                error={errors.experience?.message}
                {...register("experience")}
              />

              <Input
                label="Consultation Fees"
                type="number"
                placeholder="2500"
                error={errors.fees?.message}
                {...register("fees")}
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-black text-[#20263D]">
                Clinic Address
              </label>

              <textarea
                rows={3}
                placeholder="PetCare Clinic, Gulberg III, Lahore"
                className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm font-medium outline-none transition-all duration-300 placeholder:text-slate-400 ${
                  errors.address
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-200 focus:border-[#078B91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                }`}
                {...register("address")}
              />

              {errors.address && (
                <p className="mt-1.5 text-xs font-semibold text-red-500">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-[#F8FAFA] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-black text-[#101B3D]">
                    Availability Status
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Turn this on if you are available for appointments.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setValue("isAvailable", !isAvailable)}
                  className={`relative h-8 w-14 rounded-full transition ${
                    isAvailable ? "bg-[#078B91]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
                      isAvailable ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-11 w-auto px-7"
              onClick={() => navigate("/doctor-profile")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-auto px-7"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default EditDoctorProfileForm;
