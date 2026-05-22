import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdminAccount, type ApiResponse } from '../apis/adminlogin.api'

const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (data) => {
    try {
      const response: ApiResponse = await loginAdminAccount(data);
      if (response.success) {
        navigate('/admin-dashboard')
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
      return;
    }


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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#20263D]">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="admin@petsveta.com"
                      className="w-full rounded-xl border border-slate-200 bg-[#FFF8F4]/60 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#078b91] focus:bg-white focus:ring-4 focus:ring-[#D4E2E0]/60"
                      required
                    />

                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#20263D]">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="w-full rounded-xl border border-slate-200 bg-[#FFF8F4]/60 py-3 pl-12 pr-12 text-sm outline-none transition focus:border-[#078b91] focus:bg-white focus:ring-4 focus:ring-[#D4E2E0]/60"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#078b91]"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

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

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#20263D] px-6 py-3 text-sm font-black text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-[#111827]"
                >
                  Login as Admin
                </button>
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

export default AdminLogin;