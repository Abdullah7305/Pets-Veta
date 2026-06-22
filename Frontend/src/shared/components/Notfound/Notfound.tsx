import NotFoundAnimation from "./NotFoundAnimation";

const Notfound = () => {
  return (
    <main className="min-h-screen bg-[#f6fff7] flex items-center justify-center px-4">
      <section className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div className="flex justify-center">
          <NotFoundAnimation />
        </div>

        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-[#138D90]">
            404 - Page Not Found
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-600">
            Oops! This pet wandered off. The page you are looking for does not exist or may have been moved.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="/" className="px-6 py-3 rounded-xl bg-[#138D90] text-white font-medium text-center">
              Back To Home
            </a>

            <a href="/doctors" className="px-6 py-3 rounded-xl border border-[#138D90] text-[#138D90] font-medium text-center">
              Find a Vet
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Notfound;
