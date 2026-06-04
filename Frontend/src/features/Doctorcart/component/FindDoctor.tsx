import { useEffect, useState } from "react";

import { getApprovedDoctors, type Doctor } from "../apis/getDoctors.api";
import DoctorsList from "./DoctorsList";
import FilterSidebar from "./FilterSidebar";
import PageHeader from "./PageHeader";
import Pagination from "./Pagination";

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

      // Defensive checks
      const doctorsData = response?.data?.data;
      const isArray = Array.isArray(doctorsData);

      console.log("Doctors data:", { doctorsData, isArray });

      if (!isArray) {
        console.error("Invalid doctors data format:", doctorsData);
        setDoctors([]);
      } else {
        setDoctors(doctorsData);
      }

      setTotalPages(response?.data?.meta?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [page, search]);

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
            loading={loading}
            onBookAppointment={handleBookAppointment}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPrevious={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
          />
        </section>
      </section>
    </main>
  );
};

export default FindDoctor;
