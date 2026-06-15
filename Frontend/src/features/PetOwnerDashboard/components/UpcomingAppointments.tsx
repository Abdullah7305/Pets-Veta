import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "@/shared/components/Card/Card";

import type {
  DashboardAppointment,
} from "../types/petOwnerDashboard.types";

type UpcomingAppointmentsProps = {
  appointments: DashboardAppointment[];
};

const petImages = [
  "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=200&q=80",
];

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const formatTime = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const UpcomingAppointments = ({
  appointments,
}: UpcomingAppointmentsProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black text-[#101b3d]">
          Upcoming Appointments
        </h2>

        <button
          type="button"
          onClick={() =>
            navigate("/pet-owner/appointments")
          }
          className="flex items-center gap-2 text-sm font-black text-[#078b91]"
        >
          View All
          <ArrowRight size={17} />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {appointments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-10 text-center">
            <p className="text-sm font-bold text-slate-500">
              No upcoming appointments.
            </p>
          </div>
        ) : (
          appointments.slice(0, 2).map((appointment, index) => (
            <button
              key={appointment.id}
              type="button"
              onClick={() =>
                navigate(
                  `/pet-owner/appointments/${appointment.id}`,
                )
              }
              className="flex w-full items-start gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-[#078b91]/30 hover:bg-[#F8FCFB]"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#EAF7F5]">
                <img
                  src={petImages[index % petImages.length]}
                  alt={appointment.petName}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-black text-[#101b3d]">
                      {appointment.petName}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {appointment.doctorName}
                    </p>
                  </div>

                  <span className="rounded-lg bg-[#EAF7F5] px-3 py-1 text-xs font-black text-[#078b91]">
                    {appointment.appointmentType}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={14} />
                    {formatDate(appointment.checkupTime)}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 size={14} />
                    {formatTime(appointment.checkupTime)}
                  </span>

                  <span className="flex items-center gap-2">
                    <MapPin size={14} />
                    {appointment.clinicAddress}
                  </span>
                </div>
              </div>

              <ArrowRight
                size={18}
                className="mt-5 shrink-0 text-[#078b91]"
              />
            </button>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={() =>
          navigate("/pet-owner/appointments")
        }
        className="mt-5 flex items-center gap-2 text-sm font-black text-[#078b91]"
      >
        View All Appointments
        <ArrowRight size={17} />
      </button>
    </Card>
  );
};

export default UpcomingAppointments;