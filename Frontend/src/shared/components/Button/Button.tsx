type ButtonProps = {
  children: React.ReactNode;

  type?: "button" | "submit" | "reset";

  variant?: "primary" | "outline";

  loading?: boolean;

  isSubmitting?: boolean;

  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,

  type = "button",

  variant = "primary",

  loading = false,

  className = "",

  isSubmitting = false,

  ...props
}: ButtonProps) {
  /* BASE STYLES */
  const baseStyles = `
    w-full rounded-xl py-3
    text-sm font-semibold

    transition-all duration-300 ease-in-out

    cursor-pointer

    disabled:opacity-70
    disabled:cursor-not-allowed
  `;

  /* VARIANTS */
  const variants = {
    primary: `
      bg-blue-900 text-white
      hover:bg-blue-800 hover:shadow-xl hover:-translate-y-0.5
      active:scale-95 active:shadow-md
    `,

    outline: `
      border border-gray-300
      bg-white text-gray-700
      hover:bg-gray-50 hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5
      active:scale-95 active:shadow-sm
    `,
  };

  return (
    <button
      type={type}
      disabled={loading || isSubmitting}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading || isSubmitting ? "Loading..." : children}
    </button>
  );
}
