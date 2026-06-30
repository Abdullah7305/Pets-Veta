import PetForm from "../components/PetForm";
import PageBackButton from "@/shared/components/BackButton/PageBackButton";

const PetFormPage = () => {
  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-8">
      <div className="mx-auto mb-5 max-w-md">
        <PageBackButton fallbackPath="/pet-owner/profile" />
      </div>
      <PetForm />
    </main>
  );
};

export default PetFormPage;
