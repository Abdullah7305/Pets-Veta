type ButtonProps = {
  children: React.ReactNode;

  type?: "button" | "submit" | "reset";

  variant?: "primary" | "outline";

  loading?: boolean;

  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,

  type = "button",

  variant = "primary",

  loading = false,

  className = "",

  ...props
}: ButtonProps) {
  /* BASE STYLES */
  const baseStyles = `
    w-full rounded-xl py-3
    text-sm font-semibold

    transition-all duration-300

    disabled:opacity-70
    disabled:cursor-not-allowed
  `;

  /* VARIANTS */
  const variants = {
    primary: `
      bg-blue-900 text-white
      hover:bg-blue-800
    `,

    outline: `
      border border-gray-300
      bg-white text-gray-700
      hover:bg-gray-50
    `,
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
