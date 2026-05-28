import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api/loginuser.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getGoogleAuthUrlApi } from "../api/petOwner.api";
import { type ApiResponse } from "../api/loginuser.api";

import {
  loginSchema,
  type LoginFormData,
} from "../../Auth/schemas/login.schema";
import { useAuth } from "../hooks/authhook";

const PawIcon = () => (
  <svg
    viewBox="0 0 64 64"
    className="h-9 w-9 fill-[#178f95]"
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

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [forbiddenError, setForbiddenError] = useState<string>("");
  const [apiMesg, setApiMesg] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);

    const response: ApiResponse = await userLogin(data);
    if (response.success) {
      setApiMesg(response.message);
      console.log("response is", response);
      reset();
      if (user?.data.role === "Admin") {
        navigate("/admin-dashboard");
        return;
      }
      if (user?.data.role === "Doctor") {
        navigate("/doctor-dashboard");
        return;
      } else {
        navigate("/");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setForbiddenError("");
      const result = await getGoogleAuthUrlApi();
      if (result.success && result.data?.url) {
        window.location.href = result.data.url;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Google Auth Error", error.message);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full">

      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#dff3f2] shadow-[0_14px_32px_rgba(23,143,149,0.2)]">
        <PawIcon />
      </div>


      <div className="mb-8 text-center">
        <h1 className="text-[29px] font-extrabold leading-tight tracking-[-0.04em] text-[#101b3d] md:text-[32px]">
          Welcome Back
        </h1>

        <p className="mt-2 text-[14px] font-medium text-[#6d7891]">
          Login to your PetsVeta account
        </p>
      </div>

      {forbiddenError && (
        <p className="mb-4 text-center text-[14px] font-bold text-red-600">
          {forbiddenError}
        </p>
      )}

      {apiMesg && (
        <p className="mb-4 text-center text-[14px] font-bold text-green-600">
          {apiMesg}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-2 block text-[14px] font-bold text-[#17233f]">
            Email Address
          </label>

          <div className="flex h-[52px] items-center rounded-2xl border border-[#d8dde8] bg-white/70 px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 focus-within:border-[#178f95] focus-within:shadow-[0_0_0_4px_rgba(23,143,149,0.12)]">
            <svg
              className="mr-4 h-5 w-5 text-[#7b8497]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>

            <input
              type="email"
              placeholder="example@gmail.com"
              className="h-full w-full bg-transparent text-[15px] font-medium text-[#17233f] outline-none placeholder:text-[#8993a6]"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-[13px] font-medium text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-[14px] font-bold text-[#17233f]">
            Password
          </label>

          <div className="flex h-[52px] items-center rounded-2xl border border-[#d8dde8] bg-white/70 px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 focus-within:border-[#178f95] focus-within:shadow-[0_0_0_4px_rgba(23,143,149,0.12)]">
            <svg
              className="mr-4 h-5 w-5 text-[#7b8497]"
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
              placeholder="Enter your password"
              className="h-full w-full bg-transparent text-[15px] font-medium text-[#17233f] outline-none placeholder:text-[#8993a6]"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-3 text-[#7b8497] transition hover:text-[#178f95]"
            >
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
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-[13px] font-medium text-red-600">
              {errors.password.message}
            </p>
          )}

          <div className="mt-3 text-right">
            <a
              href="/forgot-password"
              className="text-[14px] font-extrabold text-[#178f95] transition hover:text-[#0f7075]"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="mt-2 flex h-[56px] w-full items-center justify-center gap-3 rounded-2xl bg-[#15265d] text-[16px] font-extrabold text-white shadow-[0_18px_35px_rgba(21,38,93,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#101f4d] active:translate-y-0"
        >
          Login
          <span className="text-xl leading-none">→</span>
        </button>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="mt-2 flex h-[56px] w-full items-center justify-center gap-3 rounded-2xl border-2 border-[#d8dde8] bg-white text-[16px] font-extrabold text-[#17233f] shadow-[0_4px_12px_rgba(23,143,149,0.1)] transition-all duration-300 hover:border-[#178f95] hover:bg-[#f8fbfb] active:translate-y-0 disabled:opacity-50"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="h-5 w-5"
            alt="google logo"
          />
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Signup */}
        <p className="pt-2 text-center text-[14px] font-medium text-[#7b8497]">
          Don&apos;t have an account?{" "}
          <a
            href="/doctor-signup"
            className="font-extrabold text-[#178f95] transition hover:text-[#0f7075]"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
