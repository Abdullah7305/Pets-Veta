import { getGoogleAuthUrlApi } from "../api/petOwner.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  petOwnerSchema,
  type PetOwnerFormData,
} from "../schemas/petowner.schema";

import { createPetOwnerAccount } from "../api/petOwner.api";

const PawIcon = () => (
  <svg
    viewBox="0 0 64 64"
    className="h-8 w-8 fill-[#178f95]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="22" r="7" />
    <circle cx="32" cy="16" r="7" />
    <circle cx="46" cy="22" r="7" />
    <circle cx="24" cy="34" r="6" />
    <circle cx="40" cy="34" r="6" />
    <path d="M18 47c0-9 6-17 14-17s14 8 14 17c0 6-5 9-14 9s-14-3-14-9z" />
  </svg>
);

interface RegistrationResponse {
  success: boolean;
  message: string;
}

export default function PetOwnerForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PetOwnerFormData>({
    resolver: zodResolver(petOwnerSchema),
  });

  const onSubmit = async (data: PetOwnerFormData) => {
    try {
      setIsError("");

      const response =
        await createPetOwnerAccount<RegistrationResponse>(data);

      console.log("Response is ", response);

      if (response.success) {
        reset();
        navigate("/verify-otp");
      } else {
        setIsError(response.message || "Account creation failed.");
      }
    } catch (error) {
      console.log("Signup Error:", error);
      setIsError("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setIsError("");

      const result = await getGoogleAuthUrlApi();

      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      }
    } catch (error) {
      console.log("Google Auth Error:", error);
      setIsError("Google login failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#dff3f2] shadow-[0_12px_28px_rgba(23,143,149,0.18)]">
        <PawIcon />
      </div>

      {/* Heading */}
      <div className="mb-5 text-center">
        <h1 className="text-[26px] font-extrabold leading-tight tracking-[-0.04em] text-[#101b3d] md:text-[30px]">
          Create Account
        </h1>

        <p className="mt-1.5 text-[13px] font-medium text-[#6d7891]">
          Join PetsVeta and care for your pets
        </p>
      </div>

      {isError && (
        <p className="mb-3 rounded-xl bg-red-50 px-4 py-2 text-center text-[13px] font-bold text-red-600">
          {isError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        {/* Full Name + Username */}
        <div className="grid gap-3.5 md:grid-cols-2">
          <FormField
            label="Full Name"
            placeholder="Enter full name"
            error={errors.fullName?.message}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12a5 5 0 100-10 5 5 0 000 10zM3 22a9 9 0 0118 0H3z"
              />
            }
            inputProps={register("fullName")}
          />

          <FormField
            label="Username"
            placeholder="Choose username"
            error={errors.username?.message}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            }
            inputProps={register("username")}
          />
        </div>

        {/* Email */}
        <FormField
          label="Email Address"
          type="email"
          placeholder="example@gmail.com"
          error={errors.email?.message}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          }
          inputProps={register("email")}
        />

        {/* Password */}
        <PasswordField
          label="Password"
          placeholder="Enter your password"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
          error={errors.password?.message}
          inputProps={register("password")}
        />

        {/* Confirm Password */}
        <PasswordField
          label="Confirm Password"
          placeholder="Confirm your password"
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
          error={errors.confirmPassword?.message}
          inputProps={register("confirmPassword")}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 flex h-[48px] w-full items-center justify-center gap-3 rounded-2xl bg-[#15265d] text-[15px] font-extrabold text-white shadow-[0_16px_30px_rgba(21,38,93,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#101f4d] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
          {!isSubmitting && <span className="text-lg leading-none">→</span>}
        </button>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="flex h-[48px] w-full items-center justify-center gap-3 rounded-2xl border border-[#d8dde8] bg-white text-[14px] font-extrabold text-[#17233f] shadow-[0_4px_12px_rgba(23,143,149,0.08)] transition-all duration-300 hover:border-[#178f95] hover:bg-[#f8fbfb] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="h-5 w-5"
            alt="Google"
          />
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="pt-1 text-center text-[13px] font-medium text-[#7b8497]">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-extrabold text-[#178f95] transition hover:text-[#0f7075]"
          >
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  icon: React.ReactNode;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

const FormField = ({
  label,
  placeholder,
  type = "text",
  error,
  icon,
  inputProps,
}: FormFieldProps) => {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-bold text-[#17233f]">
        {label}
      </label>

      <div className="flex h-[46px] items-center rounded-2xl border border-[#d8dde8] bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 focus-within:border-[#178f95] focus-within:shadow-[0_0_0_4px_rgba(23,143,149,0.12)]">
        <svg
          className="mr-3 h-5 w-5 text-[#7b8497]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          {icon}
        </svg>

        <input
          type={type}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-[14px] font-medium text-[#17233f] outline-none placeholder:text-[#8993a6]"
          {...inputProps}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-[12px] font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  showPassword: boolean;
  onTogglePassword: () => void;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

const PasswordField = ({
  label,
  placeholder,
  showPassword,
  onTogglePassword,
  error,
  inputProps,
}: PasswordFieldProps) => {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-bold text-[#17233f]">
        {label}
      </label>

      <div className="flex h-[46px] items-center rounded-2xl border border-[#d8dde8] bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 focus-within:border-[#178f95] focus-within:shadow-[0_0_0_4px_rgba(23,143,149,0.12)]">
        <svg
          className="mr-3 h-5 w-5 text-[#7b8497]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11c.828 0 1.5.672 1.5 1.5S12.828 14 12 14s-1.5-.672-1.5-1.5S11.172 11 12 11z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 11V8a5 5 0 00-10 0v3M6 11h12v9H6z"
          />
        </svg>

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-[14px] font-medium text-[#17233f] outline-none placeholder:text-[#8993a6]"
          {...inputProps}
        />

        <button
          type="button"
          onClick={onTogglePassword}
          className="ml-3 text-[#7b8497] transition hover:text-[#178f95]"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-3.42"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.88 4.24A9.77 9.77 0 0112 4c6 0 9.75 8 9.75 8a17.9 17.9 0 01-2.19 3.2M6.61 6.61C3.73 8.48 2.25 12 2.25 12s3.75 8 9.75 8a9.9 9.9 0 004.18-.92"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1.5 text-[12px] font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};