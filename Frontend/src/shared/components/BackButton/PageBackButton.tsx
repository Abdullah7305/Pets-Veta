import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PageBackButtonProps = {
  fallbackPath?: string;
  label?: string;
  className?: string;
};

const PageBackButton = ({
  fallbackPath = "/",
  label = "Back",
  className = "",
}: PageBackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallbackPath);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:border-[#078b91]/30 hover:bg-[#EAF7F5] hover:text-[#078b91] ${className}`}
    >
      <ArrowLeft size={17} />
      {label}
    </button>
  );
};

export default PageBackButton;
