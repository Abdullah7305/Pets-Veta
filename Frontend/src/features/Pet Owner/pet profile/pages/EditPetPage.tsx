import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PetForm from "../components/PetForm";

import {
  getPetByIdApi,
  updatePetApi,
} from "../api/pets.api";

import type {
  PetFormData,
  PetFormInput,
} from "../schemas/pet.schema";

const EditPetPage = () => {
  const navigate = useNavigate();
  const { petId } = useParams<{ petId: string }>();

  const [defaultValues, setDefaultValues] =
    useState<PetFormInput | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      if (!petId) {
        setApiError("Pet ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const response = await getPetByIdApi(petId);

        setDefaultValues({
          name: response.data.name,
          age: Number(response.data.age),
          breed: response.data.breed,
          category: response.data.category,
        });
      } catch (error) {
        console.error("Fetch pet error:", error);
        setApiError("Unable to load pet details.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPet();
  }, [petId]);

  const handleSubmit = async (data: PetFormData) => {
    if (!petId) return;

    try {
      setIsSaving(true);
      setApiError("");

      await updatePetApi(petId, data);

      navigate("/pet-owner/profile");
    } catch (error) {
      console.error("Update pet error:", error);
      setApiError("Unable to update pet.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-8">
        <div className="mx-auto h-[500px] max-w-3xl animate-pulse rounded-3xl bg-slate-200" />
      </main>
    );
  }

  if (!defaultValues) {
    return (
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
          {apiError || "Pet not found."}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-8 sm:px-6">
      {apiError && (
        <div className="mx-auto mb-5 max-w-3xl rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600">
          {apiError}
        </div>
      )}

      <PetForm
        title="Edit Pet"
        description="Update your pet information."
        defaultValues={defaultValues}
        isSaving={isSaving}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/pet-owner/profile")}
      />
    </main>
  );
};

export default EditPetPage;