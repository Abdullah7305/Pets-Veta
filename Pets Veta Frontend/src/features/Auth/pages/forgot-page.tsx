import { useState } from "react";
import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Inputs/Input";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    // API call: send OTP to email
    navigate("/otp-verify", { state: { email } });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-7">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
          <span className="text-2xl">✉️</span>
        </div>
        <h1 className="mb-1 text-xl font-semibold text-gray-900">
          Forgot your password?
        </h1>
        <p className="mb-5 text-sm text-gray-500">
          Enter your email and we'll send a 6-digit OTP to reset your password.
        </p>

        <Input
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />

        <div className="mt-5 flex flex-col gap-3">
          <Button type="button" variant="primary" onClick={handleSendOtp}>
            Send OTP
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/login")}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
