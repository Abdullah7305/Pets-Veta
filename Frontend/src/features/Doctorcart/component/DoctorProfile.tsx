import { useEffect, useState, type ReactNode } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  CircleCheck,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  UserRound,
  Wallet,
  IdCard,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Button from "../../../shared/components/Button/Button";
import {
  getDoctorProfileApi,
  type DoctorProfileData as ApiDoctorProfileData,
} from "../apis/doctorProfile.api";

type DoctorProfileData = {
  fullName: string;
  email: string;
  phone: string;
  profileImageUrl: string;
  specialization: string;
  education: string;
  experience: number;
  fees: number;
  rating: number;
  reviews: number;
  licenseNumber: string;
  languages: string;
  address: string;
  about: string;
  isVerified: boolean;
  isAvailable: boolean;
};

const DEFAULT_DOCTOR_IMAGE =
  "https://ui-avatars.com/api/?name=Doctor&background=078b91&color=fff";

const mapApiDoctorToProfile = (
  apiDoctor: ApiDoctorProfileData
): DoctorProfileData => {
  return {
    fullName: apiDoctor.fullName || "Doctor",
    email: apiDoctor.email || "Not provided",
    phone: apiDoctor.phone || "Not provided",
    profileImageUrl: apiDoctor.profileImageUrl || DEFAULT_DOCTOR_IMAGE,
    specialization: apiDoctor.specialization || "Veterinary Doctor",
    education: apiDoctor.education || "Not provided",
    experience: apiDoctor.experience || 0,
    fees: apiDoctor.fees || 0,
    rating: 0,
    reviews: 0,
    licenseNumber: "Not provided",
    languages: "English, Urdu",
    address: apiDoctor.address || "Not provided",
    about:
      "Passionate about animal care and dedicated to providing the best medical services to pets.",
    isVerified: apiDoctor.isVerified === "APPROVED",
    isAvailable: apiDoctor.isAvailable,
  };
};

const DoctorProfile = () => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState<DoctorProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await getDoctorProfileApi();

        const mappedDoctor = mapApiDoctorToProfile(response.data);

        setDoctor(mappedDoctor);
      } catch (error) {
        console.log("Doctor profile fetch error:", error);
        setErrorMessage("Failed to load doctor profile");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white px-8 py-6 shadow-sm">
          <p className="text-sm font-black text-[#078b91]">
            Loading doctor profile...
          </p>
        </div>
      </main>
    );
  }

  if (errorMessage || !doctor) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
        <div className="max-w-md rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-black text-[#101b3d]">
            {errorMessage || "Doctor profile not found"}
          </h2>

          <p className="mt-3 text-sm font-medium text-slate-500">
            Please login as doctor and try again.
          </p>

          <div className="mt-6">
            <Button type="button" onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#078b91]">
            Doctor Panel
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#101b3d]">
            Doctor Profile
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Manage your professional information and public doctor details.
          </p>
        </div>

        <section className="grid gap-5 xl:grid-cols-[330px_1fr]">
          <aside className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="relative h-32 bg-gradient-to-br from-[#D4E2E0] via-[#EAF7F5] to-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(23,143,149,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(249,197,168,0.18),transparent_38%)]" />
            </div>

            <div className="-mt-16 flex flex-col items-center px-6 pb-6">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-xl">
                <img
                  src={doctor.profileImageUrl}
                  alt={doctor.fullName}
                  className="h-full w-full object-cover"
                />

                <span
                  className={`absolute bottom-3 right-3 h-5 w-5 rounded-full border-2 border-white ${
                    doctor.isAvailable ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </div>

              <h2 className="mt-5 text-center text-2xl font-black text-[#101b3d]">
                {doctor.fullName} 
              </h2>

              <p className="mt-1 text-sm font-bold text-[#078b91]">
                {doctor.specialization}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {doctor.isVerified && (
                  <span className="inline-flex items-center gap-2 rounded-lg bg-[#EAF7F5] px-4 py-2 text-sm font-black text-[#078b91]">
                    <BadgeCheck size={17} />
                    Verified
                  </span>
                )}

                {doctor.isAvailable && (
                  <span className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-black text-green-700">
                    <CircleCheck size={17} />
                    Available
                  </span>
                )}
              </div>

              <div className="mt-6 h-px w-full bg-slate-200" />

              <div className="mt-6 w-full space-y-5">
                <ContactRow icon={<Mail size={20} />} value={doctor.email} />
                <ContactRow icon={<Phone size={20} />} value={doctor.phone} />
                <ContactRow icon={<MapPin size={20} />} value={doctor.address} />
              </div>

              <div className="mt-7 w-full">
                <Button
                  type="button"
                  className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl px-3 py-0 text-xs font-black"
                  onClick={() => navigate("/doctor-profile/edit")}
                >
                  <Pencil size={15} />
                  Edit Profile
                </Button>
              </div>
            </div>
          </aside>

          <div className="space-y-5">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                icon={<BriefcaseBusiness size={28} />}
                iconClass="bg-[#D4E2E0]/70 text-[#078b91]"
                label="Experience"
                value={`${doctor.experience}+ Years`}
                description="Professional work"
              />

              <MetricCard
                icon={<GraduationCap size={30} />}
                iconClass="bg-purple-100 text-purple-600"
                label="Education"
                value={doctor.education}
                description="Doctor of Veterinary Medicine"
              />

              <MetricCard
                icon={<Wallet size={30} />}
                iconClass="bg-orange-100 text-orange-500"
                label="Consultation Fee"
                value={`Rs. ${doctor.fees.toLocaleString()}`}
                description="Per Consultation"
              />

              <MetricCard
                icon={<Star size={30} />}
                iconClass="bg-blue-100 text-blue-500"
                label="Total Rating"
                value={doctor.rating.toString()}
                description={`(${doctor.reviews} Reviews)`}
              />
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#101b3d]">
                Professional Information
              </h2>

              <div className="mt-6 grid gap-x-8 gap-y-0 lg:grid-cols-2">
                <InfoRow
                  icon={<Stethoscope size={23} />}
                  label="Specialization"
                  value={doctor.specialization}
                />

                <InfoRow
                  icon={<CalendarDays size={23} />}
                  label="Experience"
                  value={`${doctor.experience}+ Years`}
                />

                <InfoRow
                  icon={<IdCard size={23} />}
                  label="License Number"
                  value={doctor.licenseNumber}
                />

                <InfoRow
                  icon={<MapPin size={23} />}
                  label="Clinic Address"
                  value={doctor.address}
                />

                <InfoRow
                  icon={<Languages size={23} />}
                  label="Languages"
                  value={doctor.languages}
                />

                <InfoRow
                  icon={<UserRound size={23} />}
                  label="About Me"
                  value={doctor.about}
                  noBorder
                />
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
};

const ContactRow = ({ icon, value }: { icon: ReactNode; value: string }) => {
  return (
    <div className="flex items-start gap-4 text-sm font-semibold text-slate-600">
      <span className="mt-0.5 text-[#078b91]">{icon}</span>
      <span className="leading-6">{value}</span>
    </div>
  );
};

const MetricCard = ({
  icon,
  iconClass,
  label,
  value,
  description,
}: {
  icon: ReactNode;
  iconClass: string;
  label: string;
  value: string;
  description: string;
}) => {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${iconClass}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>

          <h3 className="mt-1 text-2xl font-black text-[#101b3d]">{value}</h3>

          <p className="mt-1 text-sm font-medium leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  noBorder = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  noBorder?: boolean;
}) => {
  return (
    <div
      className={`flex gap-4 py-4 ${
        noBorder ? "" : "border-b border-dashed border-slate-200"
      }`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF7F5] text-[#078b91]">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">{label}</p>

        <h3 className="mt-1 text-sm font-black leading-6 text-[#101b3d]">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default DoctorProfile;
