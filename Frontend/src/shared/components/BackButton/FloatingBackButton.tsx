import { ArrowLeft } from "lucide-react";

const getParentPath = () => {
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  if (pathParts.length <= 1) {
    return "/";
  }

  return `/${pathParts.slice(0, -1).join("/")}`;
};

const FloatingBackButton = () => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = getParentPath();
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      title="Go back"
      className="fixed left-5 top-24 z-[80] inline-flex items-center gap-2 rounded-full border border-[#d8eeee] bg-white px-4 py-2 text-sm font-semibold text-[#078b91] shadow-sm transition hover:border-[#078b91] hover:bg-[#f2fbfa]"
    >
      <ArrowLeft size={17} />
      Back
    </button>
  );
};

export default FloatingBackButton;
