import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "onClick">;

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = "",
      clickable = false,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (!clickable || !onClick) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? onClick : undefined}
        onKeyDown={handleKeyDown}
        className={`
          rounded-2xl
          border border-slate-200
          bg-white
          p-5
          shadow-sm
          transition-all duration-300
          
          ${
            clickable
              ? "cursor-pointer hover:-translate-y-0.5 hover:border-[#078b91]/30 hover:shadow-md"
              : ""
          }

          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;