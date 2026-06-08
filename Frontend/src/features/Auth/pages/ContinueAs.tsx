import { Link } from "react-router-dom";

const ContinueAs = () => {
  return (
    <section className="min-h-screen bg-[#fff8f4] flex items-center justify-center px-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#20263D]">
            Continue as
          </h1>
          <p className="mt-3 text-gray-600">
            Choose your account type to continue signup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/signup/pet-owner"
            className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            <h2 className="text-2xl font-bold text-[#178f95]">
              Pet Owner
            </h2>
            <p className="mt-3 text-gray-600">
              Create an account to manage pets, book appointments, and shop pet products.
            </p>
          </Link>

          <Link
            to="/signup/doctor"
            className="rounded-3xl bg-white p-8 shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            <h2 className="text-2xl font-bold text-[#178f95]">
              Doctor
            </h2>
            <p className="mt-3 text-gray-600">
              Register as a veterinary doctor and manage your appointments.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContinueAs;