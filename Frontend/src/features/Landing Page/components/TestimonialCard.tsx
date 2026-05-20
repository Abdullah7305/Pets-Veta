import BaseCard from "@/shared/components/BaseCard/BaseCard";

const TestimonialCard = ({ name, review, image }: any) => {
    return (
        <BaseCard>
            <div className="p-5">
                <div className="h-[90px] w-full overflow-hidden">
                    <img
                        src={image}
                        alt=""
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