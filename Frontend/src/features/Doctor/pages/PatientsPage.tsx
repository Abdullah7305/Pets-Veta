import { Loader2, RefreshCw, Users } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getDoctorAppointments,
  completeAppointmentApi, // 👈 Imported API function
  type DoctorAppointment,
} from "../api/doctorAppointments.api";
import PatientCard from "../components/PatientCard";
import Button from "../../../shared/components/Button/Button";
import CompleteAppointmentModal from "../components/CompleteAppointmentModal"; // 👈 Imported modal
import { showToast } from "@/shared/utils/toast";

const PatientsPage = () => {
  const [appointments, setAppointments] = useState<DoctorAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const loadAppointments = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getDoctorAppointments();
      console.log("Appointemnts are ",data);
      
      setAppointments(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load booked appointments.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleOpenCompleteModal = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setIsModalOpen(true);
  };

  const handleConfirmComplete = async () => {
    if (!selectedAppointmentId) return;

    try {
      setIsCompleting(true);
      const response = await completeAppointmentApi(selectedAppointmentId);

      if (response?.success) {
        showToast.success("Appointment completed successfully!");
        setIsModalOpen(false);
        setSelectedAppointmentId(null);
        await loadAppointments(); 
      } else {
        showToast.error("Failed to complete appointment.");
      }
    } catch (err: any) {
      showToast.error(err?.message || "An error occurred.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] text-[#20263D]">
      <section className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#078b91]">
            Doctor Panel
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#101b3d]">
            Patients
          </h1>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
            View pet owners who booked appointments with you and review their
            pet issue details.
          </p>
        </div>

        <Button
          type="button"
          className="flex h-12 w-auto items-center justify-center gap-2 px-5"
          onClick={loadAppointments}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <RefreshCw size={17} />
          )}
          Refresh
        </Button>
      </section>

      {errorMessage && (
        <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-sm font-black text-[#078b91] shadow-sm">
          <Loader2 size={22} className="mx-auto mb-3 animate-spin" />
          Loading booked appointments...
        </div>
      ) : appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <PatientCard
              key={appointment.id}
              appointment={appointment}
              onMarkAsDone={handleOpenCompleteModal} 
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0FAF7] text-[#078b91]">
            <Users size={26} />
          </div>

          <h2 className="mt-4 text-xl font-black text-[#101b3d]">
            No booked patients yet
          </h2>

          <p className="mt-2 text-sm font-medium text-slate-500">
            New appointment bookings will appear here.
          </p>
        </div>
      )}

      {/* 💡 Confirmation Modal integration */}
      <CompleteAppointmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAppointmentId(null);
        }}
        onConfirm={handleConfirmComplete}
        isLoading={isCompleting}
      />
    </main>
  );
};

export default PatientsPage;