import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PetForm from "../components/PetForm";
import { createPetApi } from "../api/pets.api";

import type { PetFormData } from "../schemas/pet.schema";

const AddPetPage = () => {
  const navigate = useNavigate();

  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (data: PetFormData) => {
    try {
      setIsSaving(true);
      setApiError("");

      await createPetApi(data);

      navigate("/pet-owner/profile");
    } catch (error) {
      console.error("Create pet error:", error);

      setApiError(
        "Unable to add pet. The same pet may already exist.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-8 sm:px-6">
      {apiError && (
        <div className="mx-auto mb-5 max-w-3xl rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600">
          {apiError}
        </div>
      )}

      <PetForm
        title="Add New Pet"
        description="Enter your pet details to create a new pet profile."
        isSaving={isSaving}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/pet-owner/profile")}
      />
    </main>
  );
};

export default AddPetPage;