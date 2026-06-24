import PetOwnerForm from "../components/pets-owner";
import { useNavigate } from "react-router-dom";

const PawIcon = () => (
  <svg
    viewBox="0 0 64 64"
    className="h-7 w-7 fill-[#178f95]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="18" cy="22" r="7" />
    <circle cx="32" cy="16" r="7" />
    <circle cx="46" cy="22" r="7" />
    <circle cx="24" cy="34" r="6" />
    <circle cx="40" cy="34" r="6" />
    <path d="M18 47c0-9 6-17 14-17s14 8 14 17c0 6-5 9-14 9s-14-3-14-9z" />
  </svg>
);

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <div className="flex h-[118px] flex-1 flex-col items-center justify-center rounded-[22px] border border-white/55 bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_18px_45px_rgba(18,40,60,0.08)] backdrop-blur-2xl">
      <div className="mb-3 text-[#178f95]">{icon}</div>

      <h3 className="text-[28px] font-extrabold leading-none text-[#178f95]">
        {value}
      </h3>

      <p className="mt-2 text-[13px] font-bold text-[#3c4b67]">{label}</p>
    </div>
  );
};

const PetOwnerSignupPage = () => {
  const navigate = useNavigate();

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#f8f2ed] text-[#101b3d]">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(249,197,168,0.92)_0%,rgba(249,197,168,0.62)_28%,transparent_48%),radial-gradient(circle_at_85%_8%,rgba(236,250,249,0.95)_0%,rgba(236,250,249,0.62)_30%,transparent_52%),linear-gradient(180deg,#fff7f2_0%,#eefaf8_44%,#bfe5e1_100%)]" />

      {/* Big glass circles */}
      <div className="absolute -top-[280px] left-[260px] h-[760px] w-[760px] rounded-full border border-white/30 bg-white/10 shadow-[inset_0_0_90px_rgba(255,255,255,0.45)] backdrop-blur-[2px]" />

      <div className="absolute bottom-[-220px] right-[-160px] h-[520px] w-[520px] rounded-full border border-white/25 bg-white/10 shadow-[inset_0_0_80px_rgba(255,255,255,0.35)]" />

      {/* Floating bubbles */}
      <div className="absolute left-[4%] top-[21%] h-8 w-8 rounded-full bg-[#ffb073]/70 shadow-[inset_-8px_-8px_18px_rgba(255,255,255,0.5),0_10px_25px_rgba(249,197,168,0.5)]" />

      <div className="absolute left-[49%] top-[26%] hidden h-6 w-6 rounded-full bg-white/55 shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.8)] lg:block" />

      <div className="absolute bottom-[13%] left-[43%] hidden h-10 w-10 rounded-full bg-[#bdebe8]/75 shadow-[inset_-9px_-9px_15px_rgba(255,255,255,0.9),0_12px_28px_rgba(23,143,149,0.18)] lg:block" />

      {/* Main layout */}
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
        <section className="grid w-[128vw] max-w-[1850px] origin-center scale-[0.72] grid-cols-1 items-center gap-14 px-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Glass Panel */}
          <div className="hidden justify-center lg:flex">
            <div className="relative flex h-[720px] w-full max-w-[800px] flex-col justify-center rounded-[38px] border border-white/55 bg-white/20 px-20 py-14 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_28px_70px_rgba(36,66,90,0.12)] backdrop-blur-[26px]">
              <div className="absolute inset-0 rounded-[38px] bg-gradient-to-br from-white/25 via-white/10 to-transparent" />

              {/* Floating paw top-left */}
              <div className="absolute -left-14 -top-14 z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/55 shadow-[0_14px_40px_rgba(31,50,70,0.08)] backdrop-blur-2xl">
                <PawIcon />
              </div>

              {/* Floating paw top-right */}
              <div className="absolute right-9 top-[-28px] z-10 opacity-60">
                <PawIcon />
              </div>

              <div className="relative z-10">
                <h1 className="max-w-[610px] text-[64px] font-extrabold leading-[1.13] tracking-[-0.055em] text-[#101b3d]">
                  Join{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="bg-gradient-to-r from-[#178f95] to-[#0c7b84] bg-clip-text text-transparent transition hover:opacity-80"
                  >
                    PetsVeta
                  </button>
                </h1>

                <p className="mt-8 max-w-[600px] text-[22px] font-medium leading-[1.6] text-[#2f405f]">
                  Create your account to book vet appointments, explore pet
                  services, and shop trusted pet products.
                </p>

                {/* Trusted Card */}
                <div className="mt-10 flex max-w-[610px] items-center gap-7 rounded-[28px] border border-white/60 bg-white/24 p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_20px_50px_rgba(20,50,70,0.1)] backdrop-blur-3xl">
                  <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-3xl bg-[#fff3e8] shadow-[0_14px_28px_rgba(40,50,70,0.12)]">
                    <img
                      src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?auto=format&fit=crop&w=300&q=80"
                      alt="Dog"
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute bottom-[-2px] right-[-2px] flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-lg">
                      💗
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[20px] font-extrabold text-[#101b3d]">
                      Complete Pet Care
                    </h3>

                    <p className="mt-4 text-[17px] font-medium leading-7 text-[#4f5f78]">
                      Everything for your pet in one place.
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-10 flex max-w-[610px] gap-5">
                  <StatCard
                    value="120+"
                    label="Doctors"
                    icon={
                      <svg
                        className="h-9 w-9"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM3 22a9 9 0 0118 0H3z" />
                      </svg>
                    }
                  />

                  <StatCard
                    value="5k+"
                    label="Members"
                    icon={
                      <svg
                        className="h-9 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 20h5v-2a4 4 0 00-5-4" />
                        <path d="M9 20H4v-2a4 4 0 015-4" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    }
                  />

                  <StatCard
                    value="24/7"
                    label="Support"
                    icon={
                      <svg
                        className="h-9 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 13a8 8 0 0116 0" />
                        <path d="M4 13v4a2 2 0 002 2h1v-6H6a2 2 0 00-2 2zM20 13v4a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2z" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Signup Card */}
          <div className="flex justify-center">
            <div className="flex h-[760px] w-full max-w-[700px] items-center rounded-[36px] border border-white/70 bg-white/72 px-16 py-10 shadow-[0_30px_80px_rgba(30,60,80,0.16)] backdrop-blur-2xl">
              <PetOwnerForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PetOwnerSignupPage;
