import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PetForm from "../../pet details/components/PetForm";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import DeletePetModal from "../components/DeletePetModal";
import MyPetsSection from "../components/MyPetsSection";
import PetOwnerProfileHeader from "../components/PetOwnerProfileHeader";

import { getPetOwnerProfileApi } from "../api/petOwnerProfile.api";
import {
  deletePetApi,
  getMyPetsApi,
} from "../api/pets.api";

import type {
  Pet,
  PetOwnerProfile,
} from "../types/petProfile.types";

const PetOwnerProfilePage = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<PetOwnerProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [openPetForm, setOpenPetForm] = useState<boolean>(false);

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
    fetchProfileData();
  }, [fetchProfileData]);

  // Lock body scroll when the modal form is active
  useEffect(() => {
    if (openPetForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openPetForm]);

  const handleDeletePet = async () => {
    if (!selectedPet) return;

    try {
      setIsDeleting(true);

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
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 sm:px-6 lg:px-10">
        <section className="mx-auto max-w-7xl space-y-6">
          <div className="h-64 animate-pulse rounded-3xl bg-slate-200" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-3xl bg-slate-200"
              />
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (error && !profile) {
    return (
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 sm:px-6 lg:px-10">
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
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#F8FAFA] px-4 py-6 text-[#20263D] sm:px-6 lg:px-10">
        <section className="mx-auto max-w-7xl">
          {error && (
            <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {profile && (
            <PetOwnerProfileHeader
              profile={profile}
              onEditProfile={() =>
                navigate("/pet-owner/profile/edit")
              }
            />
          )}

          <MyPetsSection
            pets={pets}
            onAddPet={() => setOpenPetForm(true)}
            onEditPet={(petId) =>
              navigate(`/pet-owner/pets/${petId}/edit`)
            }
            onDeletePet={setSelectedPet}
            onBookAppointment={(petId) =>
              navigate(`/doctors?petId=${petId}`)
            }
          />
        </section>
      </main>

      {/* Lightweight, High-Performance Scroll-Trapped Overlay */}
      {openPetForm && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 overscroll-contain text-center"
          role="dialog" 
          aria-modal="true"
        >
          {/* Outer flex container wraps the custom scroll scope */}
          <div className="flex min-h-[100dvh] items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md my-8 text-left">
              <PetForm
                onSubmitSuccess={handlePetAddedSuccess}
                onCancel={() => setOpenPetForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PetOwnerProfilePage;