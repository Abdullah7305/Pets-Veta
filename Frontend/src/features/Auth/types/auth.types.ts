import type {
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from "react";
import type { ApiResponse } from "../api/loginuser.api";

export type AuthContextType = {
  isAuthenticatedUser: boolean;
  setIsAuthenticateUser: Dispatch<SetStateAction<boolean>>;
  user: ApiResponse | undefined;
  setUser: Dispatch<SetStateAction<ApiResponse | undefined>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type AuthContextProviderProps = {
  children: ReactNode;
};

export type DashboardCardProps = {
  accent: "purple" | "green";
  icon: ReactNode;
  image: string;
  title: string;
  description: string;
  items: string[];
  buttonLabel: string;
  onClick: () => void;
};

export type PetOwnerFormFieldProps = {
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  icon: ReactNode;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

export type PetOwnerPasswordFieldProps = {
  label: string;
  placeholder: string;
  showPassword: boolean;
  onTogglePassword: () => void;
  error?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

export type ApiErrorResponse = {
  message: string;
};
