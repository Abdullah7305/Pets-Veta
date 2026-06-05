import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightText?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
};

const Input = ({
  label,
  error,
  icon,
  rightText,
  showPassword,
  onTogglePassword,
  className = "",
  type = "text",
  ...props
}: InputProps) => {
  const inputType =
    type === "password" && showPassword !== undefined
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          type={inputType}
          className={`w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#178f95] focus:ring-2 focus:ring-[#178f95]/20 ${
            icon ? "pl-10" : ""
          } ${rightText || onTogglePassword ? "pr-16" : ""} ${className}`}
          {...props}
        />

        {rightText && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            {rightText}
          </span>
        )}

        {onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#178f95]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;