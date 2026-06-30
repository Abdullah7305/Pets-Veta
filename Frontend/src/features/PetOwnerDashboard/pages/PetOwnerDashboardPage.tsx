import { useEffect, useState } from "react";
import DashboardBanner from "../components/DashboardBanner";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardStats from "../components/DashboardStats";
import MyPetsPreview from "../components/MyPetsPreview";
import QuickActions from "../components/QuickActions";

import { dashboardData } from "../data/dashboard.data";
import { getMyPetsApi } from "@/features/Pet Owner/pet profile/api/pets.api";
import { useAuth } from "@/features/Auth/hooks/authhook";
import type { Pet } from "../types/petOwnerDashboard.types";
import type { Pet as ProfilePet } from "@/features/Pet Owner/pet profile/types/petProfile.types";

const PetOwnerDashboardPage = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch real-time registered pets from database
  useEffect(() => {
    let ignore = false;

    const loadPetsData = async () => {
      try {
        setLoading(true);
        const response = await getMyPetsApi();
        if (ignore) return;

        if (response.success && Array.isArray(response.data)) {
          // Map to correct dashboard type compatibility
          const mappedPets: Pet[] = response.data.map((pet: ProfilePet) => ({
            id: pet.id,
            petOwnerId: pet.petOwnerId || "",
            name: pet.name,
            age: pet.age,
            breed: pet.breed,
            category: pet.category,
          }));
          setPets(mappedPets);
        }
      } catch (error) {
        console.error("Failed to load dynamic dashboard pets:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadPetsData();

    return () => {
      ignore = true;
    };
  }, []);

  // 2. Resolve active authenticated user data, fallback gracefully to static model
  const headerUser = user?.data
    ? {
      id: user.data.id,
      fullName: user.data.name || user.data.username || "Pet Parent",
      profileImageUrl:
        user.data.profileImageUrl &&
          !user.data.profileImageUrl.toLowerCase().includes("enter your image")
          ? user.data.profileImageUrl
          : "https://ui-avatars.com/api/?name=Pet+Owner&background=EAF7F5&color=078b91",
    }
    : dashboardData.user;

  // 3. Compute stats metrics dynamically using real pet database counts
  const dynamicCounts = {
    ...dashboardData.counts,
    totalPets: pets.length, // Automatically binds live list count
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] text-[#20263D]">
      <DashboardSidebar />

      <section className="min-h-screen px-4 py-6 sm:px-6 lg:ml-[260px] lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <DashboardHeader user={headerUser} />

          <DashboardStats counts={dynamicCounts} />

          {/* This section now loads live database-backed pets dynamically */}
          <div className="mt-5">
            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-sm font-semibold text-slate-500 shadow-sm">
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#078b91] border-t-transparent mb-2" />
                Updating dynamic profiles...
              </div>
            ) : (
              <MyPetsPreview pets={pets} />
            )}
          </div>

          <div className="mt-5">
            <QuickActions />
          </div>

          <div className="mt-5">
            <DashboardBanner />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PetOwnerDashboardPage;
