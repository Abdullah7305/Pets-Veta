
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate } from "react-router-dom";

import Button from "../../../shared/components/Button/Button";

import BackButton from "../../../shared/components/Button/BackButton/BackButton";

import {
  verifyOtpSchema,
  type VerifyOtpFormData,
} from "../schemas/verify-otp.schema";

export default function VerifyOtpForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(240);

  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
  });

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otpValues];

    updatedOtp[index] = value;

    setOtpValues(updatedOtp);

    setValue("otp", updatedOtp.join(""));

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);

      nextInput?.focus();
    }
  };

  const onSubmit = async (data: VerifyOtpFormData) => {
    try {
      setLoading(true);

      console.log(data);

      /*
        VERIFY OTP API
      */

      navigate("/reset-password");
    } catch (error) {
      console.log("==========>>", error);
    } finally {
      setLoading(false);
    }
  };

  const minutes = Math.floor(timer / 60);

  const seconds = timer % 60;

  const handleResendOtp = () => {
    setTimer(240);

    setOtpValues(["", "", "", "", "", ""]);

    /*
      RESEND OTP API
    */
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
        <div
          className="
            flex items-center
            justify-center gap-3
          "
        >
          {otpValues.map((item, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={item}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              className="
                h-14 w-14 rounded-xl
                border border-gray-300
                text-center text-xl
                font-semibold outline-none

                focus:border-blue-900
              "
            />
          ))}
        </div>

        {errors.otp && (
          <p
            className="
              text-center text-sm
              text-red-500
            "
          >
            {errors.otp.message}
          </p>
        )}

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
