import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import Input from "../../../shared/components/Inputs/Input";
import Button from "../../../shared/components/Button/Button";

import { doctorSchema, type DoctorFormData } from "../schemas/doctor.schema";

const doctorFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter Name",
  },

  {
    name: "userName",
    label: "User Name",
    type: "text",
    placeholder: "Enter UserName",
  },

  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "example@gmail.com",
  },

  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "+92 234 567 890",
  },

  {
    name: "experience",
    label: "Years of Experience",
    type: "number",
    placeholder: "5",
  },

  {
    name: "medicalLicenseNumber",
    label: "Medical License Number",
    type: "text",
    placeholder: "LIC-123456",
  },

  {
    name: "clinicAddress",
    label: "Clinic Address",
    type: "text",
    placeholder: "Clinic Address",
  },
  {
    name: "document",
    label: "Upload Document",
    type: "file",
    placeholder: "",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "******",
  },

  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "******",
  },
] as const;

const specializations = ["General Veterinary", "Pet Surgeon", "Animal Dentist"];

export default function DoctorForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
  });

  //   ------------------------------------------------------------------->>
  const onSubmit = (data: DoctorFormData) => {
    console.log(data);
  };

  return (
<div className="mx-auto w-full max-w-3xl">      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900">
          Doctor Registration
        </h1>

        <p className="mt-2 text-gray-500">
          Create your professional doctor account
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* DYNAMIC INPUTS */}
          {doctorFields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder || ""}
              error={errors[field.name as keyof DoctorFormData]?.message as string}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              {...register(field.name)}
            />
          ))}

          {/* SPECIALIZATION */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Specialization
            </label>

            <select
              className="
                w-full rounded-xl border border-gray-300
                px-4 py-3 outline-none
                focus:border-blue-600
              "
              {...register("specialization")}
            >
              <option value="">Select specialization</option>

              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {errors.specialization && (
              <p className="text-sm text-red-500">
                {errors.specialization.message}
              </p>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="space-y-4 pt-2">
          <Button type="submit">Create Account</Button>

          {/* DIVIDER */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-300" />

            <span className="text-xs text-gray-500">OR</span>

            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* GOOGLE BUTTON */}
          <Button variant="outline">
            <div className="flex items-center justify-center gap-3">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="h-5 w-5"
                alt="google"
              />
              Continue with Google
            </div>
          </Button>

          {/* LOGIN */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="
                font-semibold text-blue-900
                hover:underline
              "
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
