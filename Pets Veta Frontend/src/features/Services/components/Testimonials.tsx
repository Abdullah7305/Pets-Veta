import { Star } from "lucide-react";

import user1 from "../../../assets/shared/images/testimonial1.jpg";
import user2 from "../../../assets/shared/images/testimonial2.jpg";
import user3 from "../../../assets/shared/images/testimonial3.jpg";

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
    <section className="bg-[#eeeeee] px-6 py-28">
      <div className="text-center mb-24">
        <h2 className="text-5xl font-extrabold text-[#078b91] mb-6">
          what our customers say
        </h2>

        <p className="text-2xl text-gray-600 leading-relaxed">
          Problems trying to resolve the conflict between the two major realms of
          <br />
          Classical physics: Newtonian mechanics
        </p>
      </div>

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-white border rounded-md p-12">
            <div className="flex gap-2 text-yellow-400 mb-8">
              <Star fill="currentColor" size={28} />
              <Star fill="currentColor" size={28} />
              <Star fill="currentColor" size={28} />
              <Star fill="currentColor" size={28} />
              <Star size={28} />
            </div>

            <p className="text-xl text-gray-600 font-semibold leading-relaxed mb-8">
              {item.text}
            </p>

            <img
              src={item.image}
              alt="customer"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
