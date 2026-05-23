type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "outline";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = `
    w-full rounded-xl py-3
    text-sm font-semibold
    transition-all duration-300
  `;

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
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
