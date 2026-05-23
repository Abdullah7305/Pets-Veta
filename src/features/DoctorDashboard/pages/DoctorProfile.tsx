import { useState } from "react";
import { useForm } from "react-hook-form";

import DoctorDashboardHeader from "../components/DoctorDashboardHeader";
import Input from "../../../shared/components/Inputs/Input";
import Button from "../../../shared/components/Button/Button";

type DoctorProfileData = {
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  bio: string;
};

const doctorProfileDefaults: DoctorProfileData = {
  fullName: "Dr. Marttin Deo",
  email: "marttin.deo@example.com",
  phone: "+92 300 1234567",
  specialization: "MBBS, FCPS - MD (Medicine), MCPS",
  bio: "Experienced veterinary doctor specialized in pet care and small animal medicine.",
};

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorProfileData>({
    defaultValues: doctorProfileDefaults,
  });

  const onSubmit = (data: DoctorProfileData) => {
    console.log("Doctor profile saved:", data);
    setIsEditing(false);
  };

  return (
    <>
      <DoctorDashboardHeader title="Profile" />

      <main className="p-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <img
              src="https://i.pravatar.cc/200?img=12"
              alt="profile"
              className="h-20 w-20 rounded-full object-cover ring-4 ring-blue-100"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-blue-900">
                Dr. Marttin Deo
              </h2>
              <p className="text-sm text-gray-500">Doctor Profile</p>
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Full Name"
                error={errors.fullName?.message as string}
                disabled={!isEditing}
                {...register("fullName", { required: "Full name is required" })}
              />
              <Input
                label="Email Address"
                type="email"
                error={errors.email?.message as string}
                disabled={!isEditing}
                {...register("email", { required: "Email is required" })}
              />
              <Input
                label="Phone Number"
                type="tel"
                error={errors.phone?.message as string}
                disabled={!isEditing}
                {...register("phone", { required: "Phone is required" })}
              />
              <Input
                label="Specialization"
                error={errors.specialization?.message as string}
                disabled={!isEditing}
                {...register("specialization", {
                  required: "Specialization is required",
                })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <textarea
                rows={4}
                disabled={!isEditing}
                {...register("bio")}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {isEditing && (
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="w-full sm:w-40">
                  <Button type="submit">Save Changes</Button>
                </div>
                <div className="w-full sm:w-40">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      reset(doctorProfileDefaults);
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </>
  );
}