import { Users, UserPlus, Clock } from "lucide-react";

import DoctorDashboardHeader from "../components/DoctorDashboardHeader";
import {
  DoctorStatCard,
  DoctorPatientsSummary,
  DoctorTodayAppointments,
  DoctorNextPatientDetails,
  DoctorPatientsReview,
  DoctorAppointmentRequest,
  DoctorCalendarWidget,
} from "../components/doctor-dashboard-widgets";

export default function DoctorDashboard() {
  return (
    <>
      <DoctorDashboardHeader title="Dashboard" />

      <main className="space-y-6 p-6">
        {/* STATS ROW */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DoctorStatCard
            icon={Users}
            label="Total Patient"
            value="2000+"
            sub="Till Today"
          />
          <DoctorStatCard
            icon={UserPlus}
            label="Today Patient"
            value="068"
            sub="21 Dec-2021"
          />
          <DoctorStatCard
            icon={Clock}
            label="Today Appointments"
            value="085"
            sub="21 Dec-2021"
          />
        </div>

        {/* MIDDLE ROW */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <DoctorPatientsSummary />
          <DoctorTodayAppointments />
          <DoctorNextPatientDetails />
        </div>

        {/* LOWER ROW */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <DoctorPatientsReview />
          <DoctorAppointmentRequest />
          <DoctorCalendarWidget />
        </div>
      </main>
    </>
  );
}