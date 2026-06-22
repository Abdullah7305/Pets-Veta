import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PetForm from "../../pet details/components/PetForm";
import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";
import { useAuth } from "@/features/Auth/hooks/authhook";

import EditPetOwnerProfileModal from "../components/EditPetOwnerProfileModal";
import MyPetsSection from "../components/MyPetsSection";
import PetOwnerProfileHeader from "../components/PetOwnerProfileHeader";

import {
  getPetOwnerProfileApi,
  updatePetOwnerProfileApi,
} from "../api/petOwnerProfile.api";
import {
  deletePetApi,
  getMyPetsApi,
} from "../api/pets.api";

import type {
  Pet,
  PetOwnerProfile,
} from "../types/petProfile.types";
import type { PetOwnerProfileFormData } from "../schemas/petOwnerProfile.schema";

const PetOwnerProfilePage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [profile, setProfile] = useState<PetOwnerProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [error, setError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [openPetForm, setOpenPetForm] = useState<boolean>(false);
  const [openProfileForm, setOpenProfileForm] = useState(false);

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
    void Promise.resolve().then(fetchProfileData);
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

  const handleProfileUpdate = async (data: PetOwnerProfileFormData) => {
    if (!profile) return;

    try {
      setIsSavingProfile(true);
      setProfileError("");

      const response = await updatePetOwnerProfileApi({
        fullName: data.fullName,
        username: data.username,
        phone: data.phone,
        profileImage: data.profileImage,
      });

      setProfile(response.data);
      setUser((currentUser) =>
        currentUser
          ? {
              ...currentUser,
              data: {
                ...currentUser.data,
                name: response.data.fullName,
                username: response.data.username,
                profileImageUrl: response.data.profileImageUrl,
              },
            }
          : currentUser,
      );
      setOpenProfileForm(false);
    } catch (updateError) {
      console.error("Pet owner profile update error:", updateError);
      const message =
        axios.isAxiosError(updateError) &&
        typeof updateError.response?.data?.message === "string"
          ? updateError.response.data.message
          : "Unable to update your profile. Please try again.";

      setProfileError(message);
    } finally {
      setIsSavingProfile(false);
    }
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
              onEditProfile={() => setOpenProfileForm(true)}
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

      {openProfileForm && profile && (
        <EditPetOwnerProfileModal
          profile={profile}
          isSaving={isSavingProfile}
          error={profileError}
          onCancel={() => {
            setOpenProfileForm(false);
            setProfileError("");
          }}
          onSubmit={handleProfileUpdate}
        />
      )}

      {selectedPet && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4"
          role="dialog"
          aria-modal="true"
        >
          <Card className="w-full max-w-md p-6 text-center">
            <h2 className="text-2xl font-black text-[#101b3d]">
              Delete {selectedPet.name}?
            </h2>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
              This pet will be removed from your profile.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => setSelectedPet(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>

              <Button
                type="button"
                className="w-full !border-red-500 !bg-red-500 !text-white hover:!bg-red-600 hover:!text-white sm:w-auto"
                loading={isDeleting}
                loadingText="Deleting..."
                onClick={() => void handleDeletePet()}
              >
                Delete Pet
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default PetOwnerProfilePage;
