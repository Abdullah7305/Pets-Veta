import {
  ArrowRight,
  FileText,
  PawPrint,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "@/shared/components/Card/Card";

import type {
  DashboardCounts,
} from "../types/petOwnerDashboard.types";

type DashboardStatsProps = {
  counts: DashboardCounts;
};

const DashboardStats = ({
  counts,
}: DashboardStatsProps) => {
  const navigate = useNavigate();

  return (
    <section className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {/* Pets */}
      <Card className="p-6">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#EAF7F5] text-[#078b91]">
            <PawPrint size={35} />
          </div>

          <div>
            <p className="text-sm font-black text-[#101b3d]">
              My Pets
            </p>

            <h2 className="mt-1 text-4xl font-black text-[#101b3d]">
              {counts.totalPets}
            </h2>

            <button
              type="button"
              onClick={() => navigate("/pet-owner/profile")}
              className="mt-3 flex items-center gap-2 text-sm font-bold text-[#078b91]"
            >
              View all pets
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Appointments without icon */}
      <Card className="p-6">
        <div className="grid grid-cols-[1fr_auto] gap-6">
          <div>
            <p className="text-sm font-black text-[#101b3d]">
              Total Appointments
            </p>

            <h2 className="mt-2 text-4xl font-black text-[#101b3d]">
              {counts.totalAppointments}
            </h2>

            <button
              type="button"
              onClick={() =>
                navigate("/pet-owner/appointments")
              }
              className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              View all appointments
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="border-l border-slate-200 pl-6">
            <StatusCount
              label="Upcoming"
              value={counts.upcomingAppointments}
              className="text-blue-600"
            />

            <StatusCount
              label="Completed"
              value={counts.completedAppointments}
              className="mt-3 text-emerald-600"
            />

            <StatusCount
              label="Cancelled"
              value={counts.cancelledAppointments}
              className="mt-3 text-red-500"
            />
          </div>
        </div>
      </Card>

      {/* Reports */}
      <Card className="p-6 md:col-span-2 xl:col-span-1">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
            <FileText size={35} />
          </div>

          <div>
            <p className="text-sm font-black text-[#101b3d]">
              Reports
            </p>

            <h2 className="mt-1 text-4xl font-black text-[#101b3d]">
              {counts.totalReports}
            </h2>

            <button
              type="button"
              onClick={() => navigate("/pet-owner/reports")}
              className="mt-3 flex items-center gap-2 text-sm font-bold text-[#078b91]"
            >
              View all reports
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
};

const StatusCount = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      <p className="text-xs font-bold">{label}</p>
      <p className="mt-0.5 text-sm font-black">{value}</p>
    </div>
  );
};

export default DashboardStats;