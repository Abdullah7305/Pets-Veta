import PetIssueReportForm from "../components/PetIssueReportForm";
import PageBackButton from "@/shared/components/BackButton/PageBackButton";

const PetIssueReportPage = () => {
  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-8">
      <div className="mx-auto mb-5 max-w-md">
        <PageBackButton fallbackPath="/pet-owner/dashboard" />
      </div>
      <PetIssueReportForm />
    </main>
  );
};

export default PetIssueReportPage;
