import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PetForm from "../../pet details/components/PetForm";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import SellerHeader from "@/features/seller/components/SellerHeader";
import SellerSidebar from "@/features/seller/components/SellerSidebar";

import MyPetsSection from "../components/MyPetsSection";
import PetOwnerProfileHeader from "../components/PetOwnerProfileHeader";

import { getPetOwnerProfileApi } from "../api/petOwnerProfile.api";
import { deletePetApi, getMyPetsApi } from "../api/pets.api";

import type { Pet, PetOwnerProfile } from "../types/petProfile.types";

type PetOwnerProfilePageProps = {
  initialSection?: "profile" | "pets";
};

const PetOwnerProfilePage = ({
  initialSection = "profile",
}: PetOwnerProfilePageProps) => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<PetOwnerProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [openPetForm, setOpenPetForm] = useState(false);

  const fetchProfileData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const [profileResponse, petsResponse] = await Promise.all([
        getPetOwnerProfileApi(),
        getMyPetsApi(),
      ]);

      setProfile(profileResponse.data);
      setPets(petsResponse.data);
    } catch (fetchError) {
      console.error("Pet owner profile fetch error:", fetchError);
      setError("Unable to load your profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProfileData();
  }, [fetchProfileData]);

  useEffect(() => {
    if (openPetForm || selectedPet) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openPetForm, selectedPet]);

  const handleDeletePet = async () => {
    if (!selectedPet) return;

    try {
      setIsDeleting(true);
      setError("");

      await deletePetApi(selectedPet.id);

      setPets((previousPets) =>
        previousPets.filter((pet) => pet.id !== selectedPet.id),
      );

      setSelectedPet(null);
    } catch (deleteError) {
      console.error("Delete pet error:", deleteError);
      setError("Unable to delete pet. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePetAddedSuccess = () => {
    setOpenPetForm(false);
    void fetchProfileData();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[#f7fbfb]">
        <SellerSidebar />

        <main className="flex-1">
          <SellerHeader />

          <section className="p-7">
            <div className="h-80 animate-pulse rounded-3xl bg-slate-200" />

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-3xl bg-slate-200"
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="flex min-h-screen bg-[#f7fbfb]">
        <SellerSidebar />

        <main className="flex-1">
          <SellerHeader />

          <section className="p-7">
            <Card className="mx-auto max-w-xl py-12 text-center">
              <h1 className="text-xl font-black text-[#101b3d]">
                Unable to load profile
              </h1>

              <p className="mt-2 text-sm font-medium text-slate-500">
                {error}
              </p>

              <Button
                type="button"
                className="mx-auto mt-5 w-auto px-6"
                onClick={() => void fetchProfileData()}
              >
                Try Again
              </Button>
            </Card>
          </section>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen bg-[#f7fbfb]">
        <SellerSidebar />

        <main className="flex-1">
          <SellerHeader />

          <section className="p-7">
            <div className="mx-auto max-w-7xl space-y-6">
              {error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600">
                  {error}
                </div>
              )}

              {initialSection === "profile" && profile && (
                <PetOwnerProfileHeader
                  profile={profile}
                  onProfileSaved={setProfile}
                />
              )}

              {initialSection === "pets" && (
                <MyPetsSection
                  pets={pets}
                  onAddPet={() => setOpenPetForm(true)}
                  onEditPet={(petId) =>
                    navigate(`/pet-owner/pets/${petId}/edit`)
                  }
                  onDeletePet={setSelectedPet}
                  onBookAppointment={(petId) => navigate(`/doctors?petId=${petId}`)}
                />
              )}
            </div>
          </section>
        </main>
      </div>

      {openPetForm && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 overscroll-contain text-center"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
        >
          <div className="flex min-h-[100dvh] items-center justify-center p-4 sm:p-6">
            <div className="my-8 w-full max-w-md text-left">
              <PetForm
                onSubmitSuccess={handlePetAddedSuccess}
                onCancel={() => setOpenPetForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {selectedPet && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4"
          role="dialog"
          aria-modal="true"
        >
          <Card className="w-full max-w-md text-center">
            <h2 className="text-xl font-black text-[#101b3d]">
              Delete {selectedPet.name}?
            </h2>

            <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
              This action will permanently delete this pet profile and its saved
              details.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedPet(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>

              <Button
                type="button"
                className="!bg-red-600 hover:!bg-red-700"
                onClick={() => void handleDeletePet()}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default PetOwnerProfilePage;