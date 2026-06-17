import {
  ArrowRight,
  CalendarPlus,
  FileText,
  HeartPulse,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "@/shared/components/Card/Card";

const quickActions = [
  {
    title: "Book Appointment",
    description: "Find and book a vet appointment",
    icon: <CalendarPlus size={26} />,
    iconClass: "bg-[#EAF7F5] text-[#078b91]",
    path: "/doctors",
  },
  {
    title: "Report Issue",
    description: "Report an issue for your pet",
    icon: <FileText size={26} />,
    iconClass: "bg-orange-50 text-orange-500",
    path: "/pet-owner/select-pet?action=report-issue",
  },
  {
    title: "Health Records",
    description: "View your pet's health history",
    icon: <HeartPulse size={26} />,
    iconClass: "bg-blue-50 text-blue-600",
    path: "/pet-owner/reports",
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-5">
      <h2 className="text-xl font-black text-[#101b3d]">
        Quick Actions
      </h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => (
          <button
            key={action.title}
            type="button"
            onClick={() => navigate(action.path)}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#078b91]/30 hover:shadow-sm"
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${action.iconClass}`}
            >
              {action.icon}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-black text-[#101b3d]">
                {action.title}
              </h3>

              <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                {action.description}
              </p>
            </div>

            <ArrowRight
              size={18}
              className="shrink-0 text-[#078b91]"
            />
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
