import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button/Button";
import BackButton from "../../../shared/components/Button/BackButton/BackButton";
import { verifyUserOtp, resendUserOtp } from "../api/verifyotp.api";
import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "../schemas/verify-otp.schema";

export default function VerifyOtpForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(240);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      setLoading(true);
      console.log(data);

      const response = await verifyUserOtp(data);
      console.log(response);

      navigate("/reset-password");
    } catch (error) {
      console.log("==========>>", error);
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const handleResendOtp = async () => {
    setTimer(240);
    setValue("otp", ""); // Reset the form field directly
    try {
      setLoading(true);
  

      const response = await resendUserOtp();
      console.log(response);

      
    } catch (error) {
      console.log("==========>>", error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Verify OTP</h1>

        <p className="mt-2 text-gray-500">Enter the 6-digit code</p>
      </div>

      <p
        className="
          mb-6 text-center text-sm
          font-medium text-red-500
        "
      >
        {timer > 0 ? (
          <>
            OTP expires in: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </>
        ) : (
          "OTP Expired"
        )}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <input
            type="text"
            maxLength={6}
            placeholder="000000"
            {...register("otp", {
              onChange: (e) => {
                // Strip out any non-numeric characters automatically
                e.target.value = e.target.value.replace(/\D/g, "");
              },
            })}
            className="
              h-14 w-full max-w-[250px] rounded-xl
              border border-gray-300
              text-center text-2xl
              font-semibold tracking-[0.75em] outline-none
              focus:border-blue-900
            "
          />

          {errors.otp && (
            <p className="text-center text-sm text-red-500">
              {errors.otp.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            className="
              cursor-pointer text-sm
              font-medium text-blue-900
              hover:underline
            "
          >
            Resend OTP
          </button>
        </div>

        <Button type="submit" loading={loading}>
          Verify OTP
        </Button>

        <BackButton href="/forgot-password" text="Back" />
      </form>
    </div>
  );
}