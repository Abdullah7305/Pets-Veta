import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isSubmitting?: boolean;
  loading?: boolean;
  loadingText?: string;
  href?: string;
  text?: string;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  disabled,
  isSubmitting = false,
  loading = false,
  loadingText = "Loading...",
  href,
  text,
  ...props
}: ButtonProps) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-lg font-medium transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-sky-800 text-white hover:bg-gray-100 hover:text-sky-800 border border-sky-800",
    secondary: "bg-[#F9C5A8] text-sky-900 hover:bg-[#f5b58f]",
    outline:
      "border border-[#178f95] text-[#178f95] hover:bg-[#178f95] hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const width = fullWidth ? "w-full" : "";
  const isLoading = isSubmitting || loading;
  const content = isLoading ? loadingText : children || text;

  const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${width} ${className}`;

  if (href) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;