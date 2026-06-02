import { CalendarDays, GraduationCap, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "../../../shared/components/Button/Button";
import SearchBar from "../../../shared/components/SearchBar/SearchBar";
import { getApprovedDoctors, type Doctor } from "../apis/getDoctors.api";

const LIMIT = 5;

const FindDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await getApprovedDoctors(page, LIMIT, search);

      setDoctors(response.data || []);
      setTotalPages(response.meta?.totalPages || 1);
    } catch (error) {
      console.log("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [page, search]);

  const handleBookAppointment = (doctorId: string) => {
    console.log("Book appointment doctor id:", doctorId);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[270px_1fr]">
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Filters</h2>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPage(1);
              }}
              className="text-sm font-bold text-[#078b91]"
            >
              Reset
            </button>
          </div>

          <div className="mt-6 space-y-5">
  <div className="w-full max-w-full overflow-hidden">
    <SearchBar
      placeholder="Search doctor..."
      value={search}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
      }}
    />
  </div>

            <div>
              <label className="mb-2 block text-sm font-bold">
                Specialization
              </label>

              <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60">
                <option>All Specializations</option>
                <option>Veterinary Surgeon</option>
                <option>Pet Dermatology</option>
                <option>Animal Nutritionist</option>
              </select>
            </div>

            <Button type="button">Apply Filters</Button>
          </div>
        </aside>

        <section>
          <div className="mb-6">
            <h1 className="text-3xl font-black md:text-4xl">Find a Doctor</h1>
            <p className="mt-2 text-sm text-slate-500">
              Choose a doctor and book an appointment from available time slots.
            </p>
          </div>

          {loading ? (
            <div className="rounded-3xl bg-white p-10 text-center font-black text-[#078b91]">
              Loading doctors...
            </div>
          ) : doctors.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-xl font-black">No doctors found</h2>
              <p className="mt-2 text-sm text-slate-500">
                Try changing your search.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="grid gap-6 2xl:grid-cols-[1.1fr_0.75fr_1fr_210px]">
                    <div className="flex gap-5">
                      <div>
                        <img
                          src={
                            doctor.profileImage ||
                            "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                          }
                          alt={doctor.name}
                          className="h-28 w-28 rounded-3xl object-cover"
                        />

                        <span
                          className={`mt-3 inline-flex rounded-full px-4 py-1.5 text-xs font-black ${
                            doctor.status === "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {doctor.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-black">
                            {doctor.name}
                          </h2>
                          <ShieldCheck size={20} className="text-[#078b91]" />
                        </div>

                        <p className="mt-1 text-sm font-semibold text-slate-500">
                          {doctor.specialization}
                        </p>

                        <p className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                          <CalendarDays size={17} />
                          {doctor.experience}
                        </p>

                        <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                          <GraduationCap size={17} />
                          {doctor.qualification}
                        </p>
                      </div>
                    </div>

                    <div className="border-slate-200 2xl:border-l 2xl:pl-6">
                      <h3 className="text-sm font-black">Available Days</h3>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {doctor.availableDays.map((day) => (
                          <span
                            key={day}
                            className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-black text-green-700"
                          >
                            {day}
                          </span>
                        ))}
                      </div>

                      <h3 className="mt-5 text-sm font-black">
                        Next Available
                      </h3>

                      <p className="mt-2 text-sm text-slate-600">
                        {doctor.nextAvailable
                          ? `${doctor.nextAvailable.day}, ${doctor.nextAvailable.startTime} - ${doctor.nextAvailable.endTime}`
                          : "No upcoming slot"}
                      </p>
                    </div>

                    <div className="border-slate-200 2xl:border-l 2xl:pl-6">
                      <h3 className="text-sm font-black">Today Slots</h3>

                      {doctor.todaySlots.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {doctor.todaySlots.map((slot) => (
                            <button
                              key={slot.id}
                              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold transition hover:border-[#078b91] hover:bg-[#D4E2E0]/40"
                            >
                              {slot.startTime} - {slot.endTime}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
                          No slots today
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      <Button
                        type="button"
                        onClick={() => handleBookAppointment(doctor.id)}
                      >
                        Book Appointment
                      </Button>

                      <button className="text-sm font-black text-[#078b91] hover:text-[#20263D]">
                        View Profile →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <span className="rounded-xl bg-[#D4E2E0]/60 px-4 py-2 text-sm font-black text-[#078b91]">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default FindDoctor;