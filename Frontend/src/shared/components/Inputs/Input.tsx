import { forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;

  icon?: React.ReactNode;

  rightText?: string;

  showPassword?: boolean;

  onTogglePassword?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = "text",
      placeholder,
      error,
      icon,
      rightText,
      showPassword,
      onTogglePassword,
      ...props
    },
    ref,
  ) => {
    const isPassword = type === "password";

    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-black text-[#1F1F2E]">
          {label}
        </label>

        <div className="relative">
          {/* LEFT ICON */}
          {icon && (
            <div
              className="
                absolute left-4 top-1/2
                flex h-9 w-9
                -translate-y-1/2
                items-center justify-center
                rounded-lg
                bg-purple-50
                text-[#6D3DD9]
              "
            >
              {icon}
            </div>
          )}

          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={type !== "file" ? placeholder : undefined}
            className={`
              w-full rounded-xl border
              bg-white
              py-3
              outline-none
              transition-all duration-300

              ${icon ? "pl-16" : "pl-4"}

              ${rightText || isPassword ? "pr-16" : "pr-4"}

              ${
                type === "file"
                  ? `
                  file:mr-4
                  file:rounded-lg
                  file:border-0
                  file:bg-blue-100
                  file:px-4
                  file:py-2
                  file:text-sm
                  file:font-medium
                  file:text-blue-900
                `
                  : ""
              }

              ${
                error
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-200 focus:border-[#6D3DD9]"
              }

              focus:ring-4
              focus:ring-purple-100
            `}
            {...props}
          />

          {/* RIGHT TEXT */}
          {rightText && !isPassword && (
            <div
              className="
                absolute right-4 top-1/2
                -translate-y-1/2
                text-sm font-semibold
                text-slate-400
              "
            >
              {rightText}
            </div>
          )}

          {/* PASSWORD ICON */}
          {isPassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="
                absolute right-4 top-1/2
                -translate-y-1/2
                text-gray-500
                hover:text-[#6D3DD9]
              "
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;