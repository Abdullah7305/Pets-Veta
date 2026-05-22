import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  adminLoginSchema,
  type AdminLoginFormValues,
} from "../schema/admin.login.schema";

import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Inputs/Input";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AdminLoginFormValues) => {
    console.log(data);
    navigate("/admin/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#FFF8F4] px-4 py-8 text-[#20263D] sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-2">
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#20263D] via-[#26304d] to-[#078b91] p-10 text-white lg:block">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#F9C5A8]/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#D4E2E0]/25 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <ShieldCheck size={34} />
                </div>

                <h1 className="mt-8 max-w-md text-5xl font-black leading-tight">
                  PetsVeta Admin Panel
                </h1>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
                  Manage doctors, sellers, appointments, products, approvals,
                  and platform activity from one secure dashboard.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <p className="text-sm font-semibold text-white/80">
                  Admin Access
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  Review doctor signup requests
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/70">
                  Approve or reject doctors after checking their details,
                  license, experience, and profile information.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-10 sm:px-10 md:px-14 lg:px-16">
            <div className="mx-auto max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4E2E0]/70 text-[#078b91] lg:mx-0">
                  <ShieldCheck size={34} />
                </div>

                <h2 className="mt-6 text-3xl font-black text-[#20263D] md:text-4xl">
                  Admin Login
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Login to manage PetsVeta platform operations.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="admin@petsveta.com"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword((prev) => !prev)}
                  error={errors.password?.message}
                  {...register("password")}
                />

                <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-2 text-slate-500">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 accent-[#078b91]"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-left font-bold text-[#078b91] hover:text-[#20263D]"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  isSubmitting={isSubmitting}
                  className="bg-[#20263D] font-black shadow-lg shadow-slate-300 hover:bg-[#111827] hover:text-white hover:border-transparent"
                >
                  Login as Admin
                </Button>
              </form>

              <div className="mt-8 rounded-2xl bg-[#D4E2E0]/35 p-4">
                <p className="text-sm font-semibold leading-6 text-slate-600">
                  This page is only for platform administrators. Doctors and
                  sellers should use their own login portals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminLoginPage;
