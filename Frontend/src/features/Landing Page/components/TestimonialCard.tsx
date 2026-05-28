import BaseCard from "@/shared/components/BaseCard/BaseCard";

type TestimonialCardProps = {
    name: string;
    review: string;
    image: string;
};

const TestimonialCard = ({ name, review, image }: TestimonialCardProps) => {
    return (
        <BaseCard>
            <div className="p-5">
                <div className="h-[90px] w-full overflow-hidden">
                    <img
                        src={image}
                        alt=""
                        decoding="async"
                        className="h-[80px] w-[80px] rounded-full object-cover object-[center_35%]"
                    />
                </div>

                <p className="mt-3">{review}</p>
                <h4 className="mt-4 font-bold">{name}</h4>
            </div>
        </BaseCard>
    );
};

export default TestimonialCard
