import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../shared/components/Inputs/Input";
import Button from "../../../shared/components/Button/Button";

import { loginSchema, type LoginFormData } from "../../Auth/schemas/login.schema";

const loginFields = [
  { name: "email", label: "Email Address", type: "email", placeholder: "example@gmail.com" },
  { name: "password", label: "Password", type: "password", placeholder: "******" },
] as const;

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSignupOpen(false);
      }
    }
    if (signupOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [signupOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Login</h1>
        <p className="mt-1 text-gray-500">Login to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {loginFields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            error={errors[field.name]?.message as string}
            showPassword={field.type === "password" ? showPassword : false}
            onTogglePassword={field.type === "password" ? () => setShowPassword(!showPassword) : undefined}
            {...register(field.name)}
          />
        ))}

        <div className="flex justify-end">
          <a href="/forgot-password" className="text-sm font-medium text-blue-900 hover:underline">
            Forgot Password?
          </a>
        </div>

        <Button type="submit">Login</Button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <Button variant="outline">
          <div className="flex items-center justify-center gap-3">
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-5 w-5" alt="google" />
            Continue with Google
          </div>
        </Button>

        <div ref={dropdownRef} className="relative text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => setSignupOpen((v) => !v)}
            className="font-semibold text-blue-900 hover:underline focus:outline-none"
          >
            Sign Up
          </button>

          {signupOpen && (
            <div className="absolute left-1/2 bottom-full z-20 mb-2 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
              <a href="/doctor-signup" className="block px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900">
                Sign up as Doctor
              </a>
              <div className="h-px bg-gray-100" />
              <a href="/pet-owner-signup" className="block px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900">
                Sign up as Pet Owner
              </a>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}