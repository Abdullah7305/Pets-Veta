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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-10 w-full max-w-md">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
          <span className="text-2xl">✉️</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Forgot your password?
        </h1>
        <p className="text-sm text-gray-500 mb-6">
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

        <div className="flex flex-col gap-3 mt-6">
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