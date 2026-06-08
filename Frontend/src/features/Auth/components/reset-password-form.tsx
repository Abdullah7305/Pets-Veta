import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../shared/components/Input/Input";
import Button from "../../../shared/components/Button/Button";
import { useResetPassword } from "../hooks/useResetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/reset-password.schema";

const passwordFields = [
  {
    name: "password",
    label: "New Password",
    type: "password",
    placeholder: "******",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "******",
  },
] as const;

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPassword, isPending } = useResetPassword({
    onSuccess: () => {
      reset();
      navigate("/");
    },
    onError: (error) => {
      console.log("Error in reset password", error);
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword(data);
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Reset Password</h1>

        <p className="mt-2 text-gray-500">Create your new password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {passwordFields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            error={errors[field.name]?.message}
            {...register(field.name)}
          />
        ))}

        <Button type="submit" loading={isPending}>
          Reset Password
        </Button>
      </form>

      <div className="mt-5 text-center">
        <Button href="/verify-otp" text="Back" />
      </div>
    </div>
  );
}
