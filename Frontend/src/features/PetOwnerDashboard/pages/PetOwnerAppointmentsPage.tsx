import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Clock,
    MapPin,
    FileText,
    User,
    Activity,
    CreditCard,
    Loader2,
    AlertCircle,
    Inbox,
    ArrowLeft,
} from "lucide-react";

import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import Card from "@/shared/components/Card/Card";
import Button from "@/shared/components/Button/Button";

import { getPetOwnerAppointmentsApi } from "../api/petOwnerDashboard.api";
import type { PetOwnerAppointment } from "../types/petOwnerDashboard.types";
import { dashboardData } from "../data/dashboard.data";

type TabType = "ALL" | "UPCOMING" | "COMPLETED" | "CANCELLED";

const PetOwnerAppointmentsPage = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<PetOwnerAppointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>("ALL");

    useEffect(() => {
        let ignore = false;

        const loadAppointments = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getPetOwnerAppointmentsApi();

                if (ignore) return;

                if (response.success) {
                    setAppointments(response.data);
                } else {
                    setError(response.message || "Failed to load appointments.");
                }
            } catch (err: any) {
                if (ignore) return;
                console.error("Fetch appointments error:", err);
                setError("Unable to connect to the server. Please try again.");
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadAppointments();

        return () => {
            ignore = true;
        };
    }, []);

    const filteredAppointments = useMemo(() => {
        return appointments.filter((app) => {
            if (activeTab === "ALL") return true;
            if (activeTab === "UPCOMING") {
                return [
                    "PENDING_DETAILS",
                    "PENDING_REPORT",
                    "PENDING_PAYMENT",
                    "PAYMENT_PROCESSING",
                    "CONFIRMED",
                ].includes(app.status);
            }
            if (activeTab === "COMPLETED") {
                return app.status === "COMPLETED";
            }
            if (activeTab === "CANCELLED") {
                return [
                    "CANCELLED",
                    "EXPIRED",
                    "PAYMENT_FAILED",
                    "REFUNDED",
                    "NO_SHOW",
                ].includes(app.status);
            }
            return true;
        });
    }, [appointments, activeTab]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatTime = (timeString: string) => {
        return new Date(timeString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return "bg-emerald-50 text-emerald-700 border border-emerald-100";
            case "PENDING_PAYMENT":
            case "PENDING_DETAILS":
            case "PENDING_REPORT":
                return "bg-amber-50 text-orange-600 border border-amber-100";
            case "COMPLETED":
                return "bg-blue-50 text-blue-700 border border-blue-100";
            case "CANCELLED":
            case "EXPIRED":
            case "PAYMENT_FAILED":
                return "bg-red-50 text-red-700 border border-red-100";
            default:
                return "bg-slate-50 text-slate-700 border border-slate-100";
        }
    };

    const getStatusLabel = (status: string) => {
        return status.replace(/_/g, " ");
    };

    return (
        <main className="min-h-screen bg-[#F8FAFA] text-[#20263D]">
            <DashboardSidebar />

            <section className="min-h-screen px-4 py-6 sm:px-6 lg:ml-[260px] lg:px-8">
                <div className="mx-auto max-w-[1500px]">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
                            title="Go back"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <DashboardHeader user={dashboardData.user} />
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-black tracking-tight text-[#101b3d]">
                            My Appointments
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Track and review all your veterinary consultation schedule blocks.
                        </p>
                    </div>

                    {/* Filtering Tabs */}
                    <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 mb-6">
                        {(["ALL", "UPCOMING", "COMPLETED", "CANCELLED"] as TabType[]).map(
                            (tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`rounded-xl px-5 py-2.5 text-sm font-black transition ${activeTab === tab
                                        ? "bg-[#078b91] text-white shadow-md shadow-[#078b91]/10"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    {tab.charAt(0) + tab.slice(1).toLowerCase()}
                                </button>
                            )
                        )}
                    </div>

                    {/* Loading Indicator */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200">
                            <Loader2 className="h-10 w-10 animate-spin text-[#078b91]" />
                            <p className="mt-4 text-sm font-semibold text-slate-500">
                                Fetching your consultation entries...
                            </p>
                        </div>
                    )}

                    {/* Error Banner */}
                    {error && !loading && (
                        <div className="rounded-3xl border border-red-100 bg-red-50 p-6 flex items-start gap-4">
                            <AlertCircle className="h-6 w-6 text-red-600 shrink-0" />
                            <div>
                                <h3 className="font-black text-red-800">Connection Error</h3>
                                <p className="mt-1 text-sm text-red-600 font-semibold">{error}</p>
                                <Button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 !bg-red-600 !border-red-600 hover:!bg-red-700 text-white"
                                    size="sm"
                                >
                                    Retry Loading
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Empty View State */}
                    {!loading && !error && filteredAppointments.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF7F5] text-[#078b91] mb-4">
                                <Inbox size={32} />
                            </div>
                            <h2 className="text-xl font-black text-[#101b3d]">
                                No appointments found
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 max-w-sm leading-6">
                                You do not have any appointments under this tab. Find an expert vet to schedule a slot.
                            </p>
                            <Button
                                onClick={() => navigate("/doctors")}
                                className="mt-6 bg-[#078b91] border-[#078b91] text-white hover:bg-[#056f75]"
                            >
                                Find Vet Doctors
                            </Button>
                        </div>
                    )}

                    {/* Grid Render */}
                    {!loading && !error && filteredAppointments.length > 0 && (
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            {filteredAppointments.map((app) => (
                                <Card
                                    key={app.id}
                                    className="overflow-visible border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-[#078b91]/30"
                                >
                                    <div className="flex flex-col gap-5 justify-between h-full">
                                        {/* Top Row: Doctor Info and Status Badge */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex gap-4">
                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7F5] text-[#078b91]">
                                                    <User size={26} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-[#101b3d]">
                                                        Dr. {app.doctor.user.fullName}
                                                    </h3>
                                                    <p className="text-xs font-bold text-[#078b91] mt-0.5">
                                                        {app.doctor.specialization}
                                                    </p>
                                                </div>
                                            </div>

                                            <span
                                                className={`rounded-xl px-3 py-1.5 text-xs font-black uppercase tracking-wider ${getStatusBadgeClass(
                                                    app.status
                                                )}`}
                                            >
                                                {getStatusLabel(app.status)}
                                            </span>
                                        </div>

                                        {/* Mid Section: Clinical Description / Issue */}
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 flex flex-col gap-3">
                                            {/* Pet Tag */}
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400">
                                                    <Activity size={14} />
                                                    Pet Patient
                                                </span>
                                                <span className="text-xs font-extrabold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                                                    {app.pet?.name || "Unassigned"} ({app.pet?.category})
                                                </span>
                                            </div>

                                            {/* Issue details */}
                                            <div>
                                                <span className="flex items-center gap-1.5 text-xs font-black uppercase text-slate-400">
                                                    <FileText size={14} />
                                                    Issue Report
                                                </span>
                                                <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600 line-clamp-2">
                                                    {app.petIssueReport?.issue || "Details not specified yet."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Timing & Cost Details */}
                                        <div className="grid grid-cols-2 gap-3 pt-1 text-xs text-slate-500 font-semibold border-t border-slate-100/80 pt-4">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays size={16} className="text-[#078b91] shrink-0" />
                                                <span>{formatDate(app.checkupTime)}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-[#078b91] shrink-0" />
                                                <span>
                                                    {formatTime(app.doctorSchedule.startTime)} -{" "}
                                                    {formatTime(app.doctorSchedule.endTime)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-[#078b91] shrink-0" />
                                                <span className="truncate">
                                                    {app.doctor.address || "In-clinic / Video Call"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CreditCard size={16} className="text-[#078b91] shrink-0" />
                                                <span className="font-extrabold text-slate-700">
                                                    {app.fees} {app.currency.toUpperCase()}{" "}
                                                    <span
                                                        className={`text-[10px] uppercase ml-1 px-1.5 py-0.5 rounded-md ${app.paymentStatus === "SUCCEEDED"
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-amber-50 text-orange-600"
                                                            }`}
                                                    >
                                                        {app.paymentStatus}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Bottom action button */}
                                        {app.status === "PENDING_PAYMENT" && (
                                            <div className="pt-2">
                                                <Button
                                                    onClick={() =>
                                                        navigate(`/payment?appointmentId=${app.id}`)
                                                    }
                                                    className="w-full bg-[#0B8F5A] border-[#0B8F5A] text-white hover:bg-[#097b4d] font-bold text-xs"
                                                    size="sm"
                                                >
                                                    Complete Payment Hold
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default PetOwnerAppointmentsPage;