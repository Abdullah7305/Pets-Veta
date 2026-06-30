import { useState } from "react";
import { useApprovedDoctors } from "../hooks/useGetDoctors";
import DoctorsList from "./DoctorsList";
import FilterSidebar from "./FilterSidebar";
import PageHeader from "./PageHeader";
import Pagination from "./Pagination";

const LIMIT = 5;

const FindDoctor = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useApprovedDoctors({ page, limit: LIMIT, search });

  const doctors = data?.data?.data ?? [];
  const totalPages = data?.data?.meta?.totalPages ?? 1;
  console.log("Doctors ========>>>", doctors)
  const handleBookAppointment = (doctorId: string, checkupTime?: string) => {
    console.log("Book appointment doctor id:", doctorId, "checkup time:", checkupTime);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-8">
      <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[270px_1fr]">
        <FilterSidebar
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onReset={() => {
            setSearch("");
            setPage(1);
          }}
        />

        <section>
          <PageHeader />

          <DoctorsList
            doctors={doctors}
            loading={isLoading}
            onBookAppointment={handleBookAppointment}
          />

          {
            doctors.length>0 &&
            <Pagination
              page={page}
              totalPages={totalPages}
              onPrevious={() => setPage((prev) => prev - 1)}
              onNext={() => setPage((prev) => prev + 1)}
            />
          }
        </section>
      </section>
    </main>
  );
};

export default FindDoctor;
