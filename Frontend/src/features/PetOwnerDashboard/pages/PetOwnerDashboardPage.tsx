import DashboardBanner from "../components/DashboardBanner";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardStats from "../components/DashboardStats";
import MyPetsPreview from "../components/MyPetsPreview";
import QuickActions from "../components/QuickActions";
import UpcomingAppointments from "../components/UpcomingAppointments";

import { dashboardData } from "../data/dashboard.data";

const PetOwnerDashboardPage = () => {
  return (
    <main className="min-h-screen bg-[#F8FAFA] text-[#20263D]">
      <DashboardSidebar />

      <section className="min-h-screen px-4 py-6 sm:px-6 lg:ml-[260px] lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <DashboardHeader user={dashboardData.user} />

          <DashboardStats counts={dashboardData.counts} />

          <section className="mt-5 grid gap-5 2xl:grid-cols-[minmax(0,1fr)_390px]">
            <MyPetsPreview pets={dashboardData.pets} />

            <UpcomingAppointments
              appointments={dashboardData.upcomingAppointments}
            />
          </section>

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