import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  const baseStyle =
    "rounded-lg font-medium transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-sky-800 text-white hover:bg-gray-100 hover:text-sky-800 border border-sky-800",
    secondary: "bg-[#F9C5A8] text-sky-100 hover:bg-[#f5b58f]",
    outline:
      "border border-[#178f95] text-[#178f95] hover:bg-[#178f95] hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;