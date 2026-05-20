import { Star } from "lucide-react";

import user1 from "../../../assets/shared/images/testimonial1.webp";
import user2 from "../../../assets/shared/images/testimonial2.webp";
import user3 from "../../../assets/shared/images/testimonial3.webp";

type Testimonial = {
  id: number;
  image: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    image: user1,
    text: "Slate helps you see how many more days you need to work to reach your financial goal.",
  },
  {
    id: 2,
    image: user2,
    text: "Slate helps you see how many more days you need to work to reach your financial goal.",
  },
  {
    id: 3,
    image: user3,
    text: "Slate helps you see how many more days you need to work to reach your financial goal.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#eeeeee] px-6 py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-5 text-3xl font-extrabold text-[#078b91] md:text-[2.4rem]">
          what our customers say
        </h2>

        <p className="text-base leading-8 text-gray-600 md:text-lg">
          Problems trying to resolve the conflict between the two major realms of
          <br />
          Classical physics: Newtonian mechanics
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <div key={item.id} className="rounded-md border bg-white p-7">
            <div className="mb-6 flex gap-2 text-yellow-400">
              <Star fill="currentColor" size={22} />
              <Star fill="currentColor" size={22} />
              <Star fill="currentColor" size={22} />
              <Star fill="currentColor" size={22} />
              <Star size={22} />
            </div>

            <p className="mb-6 text-base font-semibold leading-8 text-gray-600">
              {item.text}
            </p>

            <img
              src={item.image}
              alt="customer"
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
