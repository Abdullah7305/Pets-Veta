import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../api/loginuser.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getGoogleAuthUrlApi } from "../api/petOwner.api";
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
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });



  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    try {
      const response = await userLogin(data)
      console.log(response);
      reset();
      navigate('/')
    } catch (error) {
      console.log("Error in login", error);
    }

  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await getGoogleAuthUrlApi();
      if (result.success && result.data?.url) {
        window.location.href = result.data.url

      }

    } catch (error) {
      if (error instanceof Error) {
        console.log("Google Auth Error", error.message)
      }
    }
    finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-[#078b91]">Login</h1>


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
        {/* OAUTH INTEGRATION */}
        <Button onClick={handleGoogleLogin} variant="outline" type="button">
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="h-5 w-5"
              alt="google logo"
            />
            {isGoogleLoading ? "Connecting..." : "Continue with Google"}
          </div>
        </Button>

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
