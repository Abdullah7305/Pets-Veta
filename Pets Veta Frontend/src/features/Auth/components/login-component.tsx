import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../../shared/components/Inputs/Input";
import Button from "../../../shared/components/Button/Button";

import {
  loginSchema,
  type LoginFormData,
} from "../../Auth/schemas/login.schema";

const loginFields = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "example@gmail.com",
  },

  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "******",
  },
] as const;

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-blue-900">Doctor Login</h1>

        <p className="mt-1 text-gray-500">Login to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {loginFields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            error={errors[field.name]?.message as string}
            showPassword={field.type === "password" ? showPassword : false}
            onTogglePassword={
              field.type === "password"
                ? () => setShowPassword(!showPassword)
                : undefined
            }
            {...register(field.name)}
          />
        ))}

        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="
              text-sm font-medium
              text-blue-900 hover:underline
            "
          >
            Forgot Password?
          </a>
        </div>

        <Button type="submit">Login</Button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/doctor-signup"
            className="
              font-semibold text-blue-900
              hover:underline
            "
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
