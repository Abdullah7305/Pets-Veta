import { forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
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
      showPassword,
      onTogglePassword,
      ...props
    },
    ref,
  ) => {
    const isPassword = type === "password";

    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>

        <div className="relative">
        
          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={type !== "file" ? placeholder : undefined}
            className={`
    w-full rounded-xl border
    px-4 py-2.5
    outline-none transition-all

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
        : "pr-12"
    }

    ${
      error
        ? "border-red-500 focus:border-red-500"
        : "border-gray-300 focus:border-blue-600"
    }
  `}
            {...props}
          />

          {/* PASSWORD ICON */}
          {isPassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="
                absolute right-4 top-1/2
                -translate-y-1/2
                text-gray-500
                hover:text-blue-700
              "
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
