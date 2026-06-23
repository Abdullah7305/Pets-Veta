import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getGoogleAuthUrlApi } from "../api/petOwner.api";
import { type ApiResponse } from "../api/loginuser.api";
import { useAuth } from "../hooks/authhook";

import {
  loginSchema,
  type LoginFormData,
} from "../../Auth/schemas/login.schema";



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

const getPostLoginPath = (role: string) => {
  if (role === "Admin") {
    return "/admin-dashboard";
  }

  if (role === "Doctor") {
    return "/doctor-dashboard";
  }

  if (role === "PetOwner" || role === "Seller") {
    return "/choose-dashboard";
  }

  return "/";
};

export default function LoginComponent() {

  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [forbiddenError, setForbiddenError] = useState("");
  const [apiMesg, setApiMesg] = useState("");

  const { isAuthenticatedUser, user } = useAuth()
  const navigate = useNavigate();

  const { mutate: login, isPending: isloggingIn } = useLogin({
    onSuccess: (response: ApiResponse) => {

      if (response.success) {


        setApiMesg(response.message);
        console.log("Role is ", response.data.role);

        reset();

      }

    },
    onError: (error) => {
      setForbiddenError("Login Failed.Please check you email and password");
      console.log("Login Error", error)
    }
  })

  useEffect(() => {
    console.log("Wokring")
    if (isAuthenticatedUser && user?.data) {
      navigate(getPostLoginPath(user.data.role));
    }
  }, [isAuthenticatedUser, user, navigate]);



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setForbiddenError('');
    setApiMesg('');
    login(data)

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
      setForbiddenError("Google login failed. Please try again.");

      if (error instanceof Error) {
        console.log("Google Auth Error:", error.message);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#dff3f2] shadow-[0_12px_28px_rgba(23,143,149,0.18)]">
        <PawIcon />
      </div>

      <div className="mb-6 text-center">
        <h1 className="text-[26px] font-extrabold leading-tight tracking-[-0.04em] text-[#101b3d] md:text-[30px]">
          Welcome Back
        </h1>

        <p className="mt-2 text-[13px] font-medium text-[#6d7891]">
          Login to your PetsVeta account
        </p>
      </div>

      {forbiddenError && (
        <p className="mb-3 rounded-xl bg-red-50 px-4 py-2 text-center text-[13px] font-bold text-red-600">
          {forbiddenError}
        </p>
      )}

      {apiMesg && (
        <p className="mb-3 rounded-xl bg-green-50 px-4 py-2 text-center text-[13px] font-bold text-green-600">
          {apiMesg}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-2 block text-[13px] font-bold text-[#17233f]">
            Email Address
          </label>

          <div className="flex h-[48px] items-center rounded-2xl border border-[#d8dde8] bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 focus-within:border-[#178f95] focus-within:shadow-[0_0_0_4px_rgba(23,143,149,0.12)]">
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
              className="h-full w-full bg-transparent text-[14px] font-medium text-[#17233f] outline-none placeholder:text-[#8993a6]"
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="mt-1.5 text-[12px] font-semibold text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-[13px] font-bold text-[#17233f]">
            Password
          </label>

          <div className="flex h-[48px] items-center rounded-2xl border border-[#d8dde8] bg-white/70 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 focus-within:border-[#178f95] focus-within:shadow-[0_0_0_4px_rgba(23,143,149,0.12)]">
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
              className="h-full w-full bg-transparent text-[14px] font-medium text-[#17233f] outline-none placeholder:text-[#8993a6]"
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18"
                  />
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

          {errors.password && (
            <p className="mt-1.5 text-[12px] font-semibold text-red-600">
              {errors.password.message}
            </p>
          )}

          <div className="mt-2 text-right">
            <a
              href="/forgot-password"
              className="text-[13px] font-extrabold text-[#178f95] transition hover:text-[#0f7075]"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isloggingIn}
          className="mt-1 flex h-[50px] w-full items-center justify-center gap-3 rounded-2xl bg-[#15265d] text-[15px] font-extrabold text-white shadow-[0_16px_30px_rgba(21,38,93,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#101f4d] active:translate-y-0"
        >
          {isloggingIn ? "Logginin In" : "Log In"}
          <span className="text-lg leading-none">→</span>
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="flex h-[50px] w-full items-center justify-center gap-3 rounded-2xl border border-[#d8dde8] bg-white text-[14px] font-extrabold text-[#17233f] shadow-[0_4px_12px_rgba(23,143,149,0.08)] transition-all duration-300 hover:border-[#178f95] hover:bg-[#f8fbfb] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            className="h-5 w-5"
            alt="Google"
          />
          {isGoogleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="pt-1 text-center text-[13px] font-medium text-[#7b8497]">
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
