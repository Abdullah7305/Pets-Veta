import type { ReactNode } from "react";
import {
  Phone,
  FileText,
  MessageSquare,
  Check,
  X,
  type LucideIcon,
} from "lucide-react";

// DoctorStatCard
type DoctorStatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
};

export function DoctorStatCard({
  icon: Icon,
  label,
  value,
  sub,
}: DoctorStatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-blue-900 text-blue-900">
        <Icon size={28} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
    </div>
  );
}

// DoctorPatientsSummary
const doctorPatientsSummaryData = [
  { label: "New Patients", value: 35, color: "#bfdbfe" },
  { label: "Old Patients", value: 35, color: "#fbbf24" },
  { label: "Total Patients", value: 30, color: "#1e3a8a" },
];

export function DoctorPatientsSummary() {
  const radius = 70;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;

  const segments = doctorPatientsSummaryData.reduce<
    Array<{ label: string; value: number; color: string; length: number; offset: number }>
  >((acc, d) => {
    const length = (d.value / 100) * circumference;
    const offset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].length : 0;
    return [...acc, { ...d, length, offset }];
  }, []);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="mb-4 text-sm font-medium text-gray-600">
        Patients Summary December 2021
      </p>
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
          <circle cx="90" cy="90" r={radius} fill="none" stroke="#f3f4f6" strokeWidth={strokeWidth} />
          {segments.map((d, i) => (
            <circle
              key={i}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${d.length} ${circumference}`}
              strokeDashoffset={-d.offset}
              strokeLinecap="butt"
            />
          ))}
        </svg>

        <ul className="space-y-2">
          {doctorPatientsSummaryData.map((d) => (
            <li key={d.label} className="flex items-center gap-2 text-sm">
              <span className="h-3 w-3 rounded" style={{ background: d.color }} />
              <span className="text-gray-600">{d.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// DoctorTodayAppointments
const doctorTodayAppointmentList = [
  { name: "M.J. Mical", diagnosis: "Health Cheakup", time: "On Going", avatar: "https://i.pravatar.cc/80?img=1" },
  { name: "Sanath Deo", diagnosis: "Health Cheakup", time: "12 : 30 PM", avatar: "https://i.pravatar.cc/80?img=2" },
  { name: "Loeara Phanj", diagnosis: "Report", time: "01 : 00 PM", avatar: "https://i.pravatar.cc/80?img=3" },
  { name: "Komola Haris", diagnosis: "Common Cold", time: "01 : 30 PM", avatar: "https://i.pravatar.cc/80?img=4" },
];

export function DoctorTodayAppointments() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="mb-4 text-sm font-medium text-blue-900">Today Appoinment</p>
      <div className="mb-3 grid grid-cols-[auto_1fr_auto] gap-3 text-xs text-gray-500">
        <span>Patient</span>
        <span>Name/Diagonosis</span>
        <span>Time</span>
      </div>
      <ul className="space-y-3">
        {doctorTodayAppointmentList.map((a) => (
          <li key={a.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <img src={a.avatar} alt={a.name} className="h-9 w-9 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-gray-800">{a.name}</p>
              <p className="text-xs text-gray-500">{a.diagnosis}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs whitespace-nowrap ${
                a.time === "On Going" ? "bg-blue-100 text-blue-900" : "text-gray-700"
              }`}
            >
              {a.time}
            </span>
          </li>
        ))}
      </ul>
      <button type="button" className="mt-4 text-xs text-blue-900 hover:underline">See All</button>
    </div>
  );
}

// DoctorNextPatientDetails
function DoctorDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

function DoctorTag({ color, children }: { color: string; children: ReactNode }) {
  return <span className={`rounded-full px-3 py-1 text-xs ${color}`}>{children}</span>;
}

function DoctorActionBtn({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50"
    >
      <Icon size={14} />
      {children}
    </button>
  );
}

export function DoctorNextPatientDetails() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="mb-4 text-sm font-medium text-blue-900">Next Patient Details</p>
      <div className="mb-4 flex items-center gap-3">
        <img src="https://i.pravatar.cc/120?img=8" alt="patient" className="h-14 w-14 rounded-full object-cover" />
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-800">Sanath Deo</p>
          <p className="text-xs text-gray-500">Health Cheakup</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Patient ID</p>
          <p className="text-sm font-semibold text-gray-800">0220092020005</p>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3 text-xs">
        <DoctorDetail label="D.O.B" value="15 January 1989" />
        <DoctorDetail label="Sex" value="Male" />
        <DoctorDetail label="Weight" value="59 Kg" />
        <DoctorDetail label="Last Appoinment" value="15 Dec - 2021" />
        <DoctorDetail label="Hight" value="172 cm" />
        <DoctorDetail label="Reg. Date" value="10 Dec 2021" />
      </div>
      <p className="mb-2 text-xs font-medium text-gray-600">Patient History</p>
      <div className="mb-4 flex flex-wrap gap-2">
        <DoctorTag color="bg-orange-100 text-orange-700">Asthma</DoctorTag>
        <DoctorTag color="bg-blue-100 text-blue-700">Hypertention</DoctorTag>
        <DoctorTag color="bg-red-100 text-red-700">Fever</DoctorTag>
      </div>
      <div className="flex flex-wrap gap-2">
        <DoctorActionBtn icon={Phone}>(308) 555-0102</DoctorActionBtn>
        <DoctorActionBtn icon={FileText}>Document</DoctorActionBtn>
        <DoctorActionBtn icon={MessageSquare}>Chat</DoctorActionBtn>
      </div>
      <p className="mt-4 text-xs font-medium text-gray-600">Last Prescriptions</p>
    </div>
  );
}

// DoctorPatientsReview
const doctorReviewsData = [
  { label: "Excellent", value: 75, color: "bg-blue-600" },
  { label: "Great", value: 50, color: "bg-green-500" },
  { label: "Good", value: 35, color: "bg-orange-500" },
  { label: "Avarage", value: 20, color: "bg-cyan-500" },
];

export function DoctorPatientsReview() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="mb-4 text-sm font-medium text-blue-900">Patients Review</p>
      <ul className="space-y-3">
        {doctorReviewsData.map((r) => (
          <li key={r.label} className="flex items-center gap-3">
            <span className="w-20 text-xs text-gray-600">{r.label}</span>
            <div className="flex-1 overflow-hidden rounded-full bg-gray-100">
              <div className={`h-2 ${r.color}`} style={{ width: `${r.value}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// DoctorAppointmentRequest
const doctorRequestsData = [
  { name: "Maria Sarafat", reason: "Cold", avatar: "https://i.pravatar.cc/80?img=5" },
  { name: "Jhon Deo", reason: "Over swtting", avatar: "https://i.pravatar.cc/80?img=6" },
];

export function DoctorAppointmentRequest() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="mb-4 text-sm font-medium text-blue-900">Appointment Requast</p>
      <ul className="space-y-3">
        {doctorRequestsData.map((r) => (
          <li key={r.name} className="flex items-center gap-3">
            <img src={r.avatar} alt={r.name} className="h-9 w-9 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{r.name}</p>
              <p className="text-xs text-gray-500">{r.reason}</p>
            </div>
            <div className="flex gap-1">
              <button type="button" aria-label="Accept" className="rounded-md p-1.5 text-green-600 transition hover:bg-green-50">
                <Check size={16} />
              </button>
              <button type="button" aria-label="Decline" className="rounded-md p-1.5 text-red-500 transition hover:bg-red-50">
                <X size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// DoctorCalendarWidget
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const HIGHLIGHTED_DATES = new Set([3, 7, 14, 21]);

export function DoctorCalendarWidget() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const currentDay = today.getDate();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array<null>(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="mb-4 text-sm font-medium text-blue-900">
        {MONTH_NAMES[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
        {DAYS.map((d) => (
          <span key={d} className="py-1 font-medium">{d}</span>
        ))}
        {cells.map((day, idx) => (
          <span
            key={idx}
            className={`rounded-full py-1 text-xs ${
              day === currentDay
                ? "bg-blue-900 font-bold text-white"
                : day !== null && HIGHLIGHTED_DATES.has(day)
                ? "bg-blue-100 font-medium text-blue-800"
                : "text-gray-700"
            }`}
          >
            {day ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}