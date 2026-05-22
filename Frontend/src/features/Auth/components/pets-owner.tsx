import { getGoogleAuthUrlApi } from "../api/petOwner.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Reusing your shared UI component primitives
import Input from "../../../shared/components/Inputs/Input";
import Button from "../../../shared/components/Button/Button";

import { petOwnerSchema, type PetOwnerFormData } from "../schemas/petowner.schema";
import { createPetOwnerAccount } from "../api/petOwner.api";

const petOwnerFields = [
    {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter Your Full Name",
    },
    {
        name: "username",
        label: "Username",
        type: "text",
        placeholder: "Enter Username",
    },
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
    {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "******",
    },
] as const;
interface registrationResponse {
    success: boolean,
    message: string
}

export default function PetOwnerForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<string>('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PetOwnerFormData>({
        resolver: zodResolver(petOwnerSchema),
    });

    const onSubmit = async (data: PetOwnerFormData) => {
        try {

            const response = await createPetOwnerAccount<registrationResponse>(data);
            console.log("Response is ", response);
            reset();
            navigate("/verify-otp")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(
                    "Submission processing error:",
                    error.response?.data?.message

                );
                setIsError(error.response?.data?.message)
            } else {
                console.log("Unknown error:", error);
            }
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
        <div className="rounded-3xl bg-white/80 p-6 shadow-2xl backdrop-blur-lg">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#078b91]  ">
                    Pet Owner Registration
                </h1>
                <p className="mt-2 text-gray-500">
                    Create your account to start caring for your pets
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* DYNAMIC FIELD GENERATION */}
                    {petOwnerFields.map((field) => (
                        <Input
                            key={field.name}
                            label={field.label}
                            type={field.type}
                            placeholder={field.placeholder}
                            error={
                                errors[field.name as keyof PetOwnerFormData]?.message as string
                            }
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            {...register(field.name)}
                        />
                    ))}
                </div>

                <div>
                    {isError && <p>
                        <b className="text-red-500">
                            {isError}
                        </b>
                    </p>
                    }

                </div>

                {/* SUBMISSION ACTION BUTTONS */}
                <div className="space-y-3 pt-2">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Registering..." : "Create Account"}
                    </Button>

                    {/* SECTION DIVIDER */}
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-300" />
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="h-px flex-1 bg-gray-300" />
                    </div>

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

                    {/* REDIRECTION ANCHOR */}
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-semibold text-[#078b91]   hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
}
