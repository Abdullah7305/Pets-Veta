import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import Input from "../../../shared/components/Inputs/Input";
import Button from "../../../shared/components/Button/Button";

import {
  petOwnerSchema,
  type PetOwnerFormData,
} from "../schemas/pet-owner.schema";

const petOwnerFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter Name",
  },

  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "example@gmail.com",
  },

  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "Pakistan",
  },

  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "+92 234 567 890",
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

export default function PetOwnerForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetOwnerFormData>({
    resolver: zodResolver(petOwnerSchema),
  });

  //   ------------------------------------------------------------------->>
  const onSubmit = (data: PetOwnerFormData) => {
    console.log(data);
  };

  return (
    <div className="rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur-lg">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900">
          Pet Owner Registration
        </h1>

        <p className="mt-2 text-gray-500">
          Create your pet owner account
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* DYNAMIC INPUTS */}
          {petOwnerFields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              error={
                errors[field.name as keyof PetOwnerFormData]?.message as string
              }
              showPassword={field.type === "password" ? showPassword : false}
              onTogglePassword={
                field.type === "password"
                  ? () => setShowPassword(!showPassword)
                  : undefined
              }
              {...register(field.name)}
            />
          ))}
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