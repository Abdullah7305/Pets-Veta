import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  href: string;

  text?: string;
};

export default function BackButton({ href, text = "Back" }: BackButtonProps) {
  return (
    <a
      href={href}
      className="
        inline-flex items-center gap-2

        text-sm font-medium
        text-blue-900

        hover:underline
      "
    >
      <ArrowLeft size={18} />

      {text}
    </a>
  );
}
