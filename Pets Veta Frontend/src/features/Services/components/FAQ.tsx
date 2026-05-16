import { ChevronRight } from "lucide-react";

type FAQItem = {
  id: number;
  title: string;
  description: string;
};

const faqData: FAQItem[] = [
  {
    id: 1,
    title: "the quick fox jumps over the lazy dog",
    description: "Things on a very small scale behave like nothing",
  },
  {
    id: 2,
    title: "the quick fox jumps over the lazy dog",
    description: "Things on a very small scale behave like nothing",
  },
  {
    id: 3,
    title: "the quick fox jumps over the lazy dog",
    description: "Things on a very small scale behave like nothing",
  },
  {
    id: 4,
    title: "the quick fox jumps over the lazy dog",
    description: "Things on a very small scale behave like nothing",
  },
  {
    id: 5,
    title: "the quick fox jumps over the lazy dog",
    description: "Things on a very small scale behave like nothing",
  },
  {
    id: 6,
    title: "the quick fox jumps over the lazy dog",
    description: "Things on a very small scale behave like nothing",
  },
  {
    id: 7,
    title: "the quick fox jumps over the lazy dog",
    description: "Things on a very small scale behave like nothing",
  },
  {
    id: 8,
    title: "the quick fox jumps over the lazy dog",
    description: "Things on a very small scale behave like nothing",
  },
  {
    id: 9,
    title: "the quick fox jumps over the lazy dog",
    description: "Things on a very small scale behave like nothing",
  },
];

const FAQ = () => {
  return (
    <section className="bg-[#eeeeee] px-6 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-5 text-3xl font-extrabold text-[#20263d] md:text-[2.4rem]">
          FAQ
        </h2>

        <p className="text-base leading-8 text-gray-500 md:text-lg">
          Problems trying to resolve the conflict between
          <br />
          the two major realms of Classical physics: Newtonian mechanics
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {faqData.map((faq) => (
          <div key={faq.id} className="flex gap-4 rounded-xl bg-white p-6">
            <ChevronRight className="mt-1 text-sky-500" size={24} />

            <div>
              <h3 className="mb-3 text-lg font-bold leading-snug text-[#20263d]">
                {faq.title}
              </h3>

              <p className="text-base font-semibold leading-7 text-gray-500">
                {faq.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
