const stats = [
  {
    value: "100+",
    label: "Verified Veterinary Doctors",
  },
  {
    value: "500+",
    label: "Pet Products Listed",
  },
  {
    value: "10K+",
    label: "Happy Pet Parents",
  },
  {
    value: "24/7",
    label: "AI Pet Assistance",
  },
];

const AboutStats = () => {
  return (
    <section className="bg-[#f5fbff] px-5 py-14 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-white p-6 text-center shadow-[0_10px_35px_rgba(15,23,42,0.08)]"
            >
              <h3 className="text-4xl font-extrabold text-[#009f9d]">
                {item.value}
              </h3>

              <p className="mt-2 text-sm font-bold text-[#07182c]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;