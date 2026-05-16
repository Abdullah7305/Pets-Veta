import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button/Button";

export default function OtpVerifyPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleChange = (i: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;
    const updated = [...otp];
    updated[i] = val;
    setOtp(updated);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    // API call: verify OTP
    navigate("/reset-password", { state: { email, otp: code } });
  };

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setTimer(30);
    setCanResend(false);
    setError("");
    inputRefs.current[0]?.focus();
    // API call: resend OTP
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-7">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
          <span className="text-2xl">📱</span>
        </div>
        <h1 className="mb-1 text-xl font-semibold text-gray-900">
          Enter verification code
        </h1>
        <p className="mb-5 text-sm text-gray-500">
          We sent a 6-digit code to <strong>{email}</strong>
        </p>

        {/* 6 OTP boxes */}
        <div className="mb-2 flex justify-center gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`
                h-12 w-10 text-center text-lg font-semibold
                border rounded-xl outline-none
                transition-all duration-200
                ${error ? "border-red-400 bg-red-50"
                  : digit ? "border-blue-900 bg-white"
                  : "border-gray-200 bg-gray-50"}
                focus:border-blue-900 focus:shadow-[0_0_0_3px_rgba(30,58,95,0.12)] focus:bg-white
              `}
            />
          ))}
        </div>

        {error && (
          <p className="mb-4 text-center text-xs text-red-500">{error}</p>
        )}

        {/* Resend timer */}
        <div className="mb-5 mt-2 text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-sm font-medium text-blue-900 hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-xs text-gray-400">
              Resend OTP in <strong>{timer}s</strong>
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Button type="button" variant="primary" onClick={handleVerify}>
            Verify OTP
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/forgot-password")}
          >
            Change email
          </Button>
        </div>
      </div>
    </div>
  );
}
