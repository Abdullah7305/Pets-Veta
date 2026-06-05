import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

const Input = ({ label, error, className = "", ...props }: InputProps) => {
    return (
        <div className="w-full">
            {label && (
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                className={`w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#178f95] focus:ring-2 focus:ring-[#178f95]/20 ${className}`}
                {...props}
            />

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Input;