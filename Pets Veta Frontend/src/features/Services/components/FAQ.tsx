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
    <section className="bg-[#eeeeee] px-6 py-24">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-extrabold text-[#20263d] mb-6">
          FAQ
        </h2>

        <p className="text-xl text-gray-500 leading-relaxed">
          Problems trying to resolve the conflict between
          <br />
          the two major realms of Classical physics: Newtonian mechanics
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {faqData.map((faq) => (
          <div key={faq.id} className="bg-white rounded-xl p-8 flex gap-5">
            <ChevronRight className="text-sky-500 mt-1" size={30} />

            <div>
              <h3 className="text-xl font-bold text-[#20263d] leading-snug mb-3">
                {faq.title}
              </h3>

              <p className="text-lg text-gray-500 font-semibold leading-relaxed">
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
