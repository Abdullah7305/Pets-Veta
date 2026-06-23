import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const HISTORY_INDEX_KEY = "petsVetaHistoryIndex";
const HISTORY_MAX_KEY = "petsVetaHistoryMax";

const readHistoryNumber = (key: string) => {
  const value = Number(sessionStorage.getItem(key));
  return Number.isFinite(value) ? value : 0;
};

const saveHistoryPosition = (index: number, max: number) => {
  sessionStorage.setItem(HISTORY_INDEX_KEY, String(index));
  sessionStorage.setItem(HISTORY_MAX_KEY, String(max));
};

const FloatingBackButton = () => {
  const pendingDirection = useRef<1 | -1 | null>(null);
  const [canGoForward, setCanGoForward] = useState(
    () => readHistoryNumber(HISTORY_INDEX_KEY) < readHistoryNumber(HISTORY_MAX_KEY)
  );

  useEffect(() => {
    let currentIndex = readHistoryNumber(HISTORY_INDEX_KEY);
    let maxIndex = readHistoryNumber(HISTORY_MAX_KEY);

    saveHistoryPosition(currentIndex, maxIndex);

    const syncForwardState = () => {
      currentIndex = readHistoryNumber(HISTORY_INDEX_KEY);
      maxIndex = readHistoryNumber(HISTORY_MAX_KEY);
      setCanGoForward(currentIndex < maxIndex);
    };

    const originalPushState = history.pushState;

    history.pushState = function (...args) {
      currentIndex += 1;
      maxIndex = currentIndex;
      saveHistoryPosition(currentIndex, maxIndex);

      const result = originalPushState.apply(this, args);
      syncForwardState();
      return result;
    };

    const handlePopState = () => {
      if (pendingDirection.current) {
        currentIndex = Math.max(0, currentIndex + pendingDirection.current);
      } else {
        currentIndex = Math.max(0, currentIndex - 1);
      }

      pendingDirection.current = null;
      saveHistoryPosition(currentIndex, maxIndex);
      syncForwardState();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      history.pushState = originalPushState;
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      pendingDirection.current = -1;
      window.history.back();
      return;
    }

    window.location.href = "/";
  };

  const handleForward = () => {
    pendingDirection.current = 1;
    window.history.forward();
  };

  return (
    <div className="fixed left-5 top-16 z-[80] flex items-center gap-3">
      <CrystalButton label="Go back" onClick={handleBack}>
        <ArrowLeft size={24} strokeWidth={2.8} />
      </CrystalButton>

      {canGoForward && (
        <CrystalButton label="Go forward" onClick={handleForward}>
          <ArrowRight size={24} strokeWidth={2.8} />
        </CrystalButton>
      )}
    </div>
  );
};

type CrystalButtonProps = {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
};

const CrystalButton = ({ children, label, onClick }: CrystalButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-white/35 text-[#078b91] shadow-[0_16px_38px_rgba(7,139,145,0.24),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-12px_24px_rgba(7,139,145,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white hover:bg-[#078b91]/90 hover:text-white focus:outline-none focus:ring-4 focus:ring-[#078b91]/20 active:translate-y-0"
  >
    <span className="pointer-events-none absolute left-2 top-1 h-5 w-7 rounded-full bg-white/70 blur-[2px]" />
    <span className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-white/65 via-white/10 to-[#9ff2ef]/35" />
    <span className="relative z-10">{children}</span>
  </button>
);

export default FloatingBackButton;
