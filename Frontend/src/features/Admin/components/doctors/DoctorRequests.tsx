import {
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  ClipboardCheck,
  Hourglass,
  Search,
  Stethoscope,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import AdminSidebar, { type DoctorRequestTab } from "./AdminSidebar";
import DoctorRequestCard, { type DoctorRequest } from "./DoctorRequestCard";

const doctors: DoctorRequest[] = [
  {
    id: "DOC-101",
    name: "Dr. Ayesha Khan",
    email: "ayesha.khan@gmail.com",
    phone: "+92 300 1234567",
    specialization: "Veterinary Surgeon",
    experience: "5 Years",
    qualification: "DVM",
    certificateUrl: "/certificate.pdf",
    certificateName: "ayesha_certificate.pdf",
    certificateSize: "1.2 MB",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
    status: "pending",
  },
  {
    id: "DOC-102",
    name: "Dr. Ali Raza",
    email: "ali.raza@gmail.com",
    phone: "+92 311 7654321",
    specialization: "Pet Dermatologist",
    experience: "3 Years",
    qualification: "DVM, Pet Skin Care",
    certificateUrl: "/certificate.pdf",
    certificateName: "ali_certificate.pdf",
    certificateSize: "1.1 MB",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
    status: "pending",
  },
  {
    id: "DOC-103",
    name: "Dr. Sara Ahmed",
    email: "sara.ahmed@gmail.com",
    phone: "+92 322 1122334",
    specialization: "Animal Nutritionist",
    experience: "4 Years",
    qualification: "DVM, Nutrition",
    certificateUrl: "/certificate.pdf",
    certificateName: "sara_certificate.pdf",
    certificateSize: "1.4 MB",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80",
    status: "approved",
  },
];

const DoctorRequests = () => {
  const [activeTab, setActiveTab] = useState<DoctorRequestTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabDoctors =
    activeTab === "all"
      ? doctors
      : doctors.filter((doctor) => doctor.status === activeTab);

  const filteredDoctors = tabDoctors.filter((doctor) => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return [
      doctor.id,
      doctor.name,
      doctor.email,
      doctor.phone,
      doctor.specialization,
      doctor.qualification,
      doctor.experience,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const pageTitle =
    activeTab === "pending"
      ? "Doctor Signup Requests"
      : activeTab === "approved"
        ? "Approved Doctors"
        : "Doctors Dashboard";

  const pageDescription =
    activeTab === "pending"
      ? "Review and manage doctor registration requests. Verify their details and certificates before approving."
      : activeTab === "approved"
        ? "View doctors who have already been verified and approved for the platform."
        : "All doctor registration requests appear here, including pending and approved doctors.";

  const handleApprove = (doctorId: string) => {
    console.log("Approve doctor id:", doctorId);
  };

  const handleReject = (doctorId: string) => {
    console.log("Reject doctor id:", doctorId);
  };

  return (
    <main className="min-h-screen bg-[#f8fbfb] text-[#12213a]">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <section className="lg:pl-[272px]">
        <header className="flex h-[76px] items-center justify-end gap-8 px-6 lg:px-10">
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-[#0f172a] transition hover:bg-white"
          >
            <Bell size={27} strokeWidth={2.4} />
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#ef4444] text-[11px] font-black text-white">
              4
            </span>
          </button>

          <button type="button" className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt="Admin"
              className="h-11 w-11 rounded-full bg-[#dff5f3]"
            />
            <ChevronDown size={18} className="text-[#587087]" />
          </button>
        </header>

        <div className="px-5 pb-10 lg:px-8">
          <section className="relative overflow-hidden rounded-lg border border-[#eef2f2] bg-gradient-to-r from-[#fff7f1] via-white to-[#effaf8] px-8 pb-8 pt-9 shadow-sm">
            <div className="relative z-10 max-w-[720px]">
              <h1 className="text-3xl font-black tracking-normal text-[#0f1b2f] md:text-4xl">
                {pageTitle}
              </h1>
              <p className="mt-4 text-base leading-7 text-[#405169]">
                {pageDescription}
              </p>
            </div>

            <div className="pointer-events-none absolute right-20 top-5 hidden h-44 w-72 text-[#078b91] opacity-80 xl:block">
              <ClipboardCheck className="absolute left-16 top-0 h-36 w-36 rounded-lg text-[#6bb5b0]" strokeWidth={1.8} />
              <Stethoscope className="absolute right-5 top-10 h-28 w-28 text-[#078b91]" strokeWidth={2.4} />
            </div>

            <div className="relative z-10 mt-14 grid gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)] md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Pending Requests"
                value="12"
                tone="orange"
                icon={Hourglass}
              />
              <StatCard
                title="Approved"
                value="45"
                tone="green"
                icon={CheckCircle2}
              />
              <StatCard title="Rejected" value="8" tone="red" icon={XCircle} />
              <StatCard
                title="Total Doctors"
                value="65"
                tone="blue"
                icon={CircleUserRound}
              />
            </div>
          </section>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-black text-[#0f1b2f]">
                  Doctor List
                </h2>
                <p className="mt-1 text-sm text-[#587087]">
                  Search by name, email, phone, specialization, or doctor ID.
                </p>
              </div>

              <label className="relative block w-full lg:max-w-md">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#718198]">
                  <Search size={20} />
                </span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search doctors..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-[#f8fbfb] pl-12 pr-4 font-semibold text-[#12213a] outline-none transition placeholder:text-[#8a99aa] focus:border-[#078b91] focus:bg-white focus:ring-4 focus:ring-[#078b91]/10"
                />
              </label>
            </div>
          </div>

          <div className="mt-6 grid gap-5 2xl:grid-cols-2">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorRequestCard
                  key={doctor.id}
                  doctor={doctor}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center 2xl:col-span-2">
                <p className="text-lg font-black text-[#0f1b2f]">
                  No doctors found
                </p>
                <p className="mt-2 text-sm text-[#587087]">
                  Try searching with another name, ID, email, or specialization.
                </p>
              </div>
            )}
          </div>

          <div className="mt-7 flex flex-col gap-4 text-sm text-[#405169] md:flex-row md:items-center md:justify-between">
            <p>
              Showing {filteredDoctors.length} of {tabDoctors.length} doctor requests
            </p>
            <div className="flex items-center gap-4">
              <PaginationButton ariaLabel="Previous page">
                <ChevronLeft size={18} />
              </PaginationButton>
              <button
                type="button"
                className="h-10 w-10 rounded-lg bg-[#80cbc4] font-black text-white"
              >
                1
              </button>
              <button
                type="button"
                className="h-10 w-10 rounded-lg border border-slate-200 bg-white font-black text-[#12213a]"
              >
                2
              </button>
              <PaginationButton ariaLabel="Next page">
                <ChevronRight size={18} />
              </PaginationButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const toneClasses = {
  orange: "bg-[#fff0da] text-[#f59e0b]",
  green: "bg-[#d9f8e5] text-[#16a34a]",
  red: "bg-[#ffe1e6] text-[#ef4444]",
  blue: "bg-[#dceeff] text-[#2f8be6]",
};

const StatCard = ({
  title,
  value,
  tone,
  icon: Icon,
}: {
  title: string;
  value: string;
  tone: keyof typeof toneClasses;
  icon: typeof Hourglass;
}) => {
  return (
    <div className="border-b border-slate-200 bg-white p-6 last:border-b-0 md:odd:border-r xl:border-b-0 xl:border-r xl:last:border-r-0">
      <div className="flex items-center gap-5">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${toneClasses[tone]}`}
        >
          <Icon size={34} strokeWidth={2.8} />
        </div>
        <div>
          <p className="font-semibold text-[#12213a]">{title}</p>
          <h2 className="mt-1 text-3xl font-black leading-none text-[#0f1b2f]">
            {value}
          </h2>
          <p className="mt-2 text-sm text-[#405169]">Doctors</p>
        </div>
      </div>
    </div>
  );
};

const PaginationButton = ({
  children,
  ariaLabel,
}: {
  children: React.ReactNode;
  ariaLabel: string;
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#8a99aa] shadow-sm transition hover:text-[#078b91]"
    >
      {children}
    </button>
  );
};

export default DoctorRequests;
