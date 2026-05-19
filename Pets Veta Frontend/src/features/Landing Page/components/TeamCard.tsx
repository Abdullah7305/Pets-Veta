import BaseCard from "../../../shared/components/BaseCard/BaseCard";
import Button from "../../../shared/components/Button/Button";

type TeamCardProps = {
    name: string;
    specialization: string;
    description: string;
    image: string;
};

const TeamCard = ({ name, specialization, description, image }: TeamCardProps) => {
    return (
        <BaseCard>
            <div className="h-[290px] w-full overflow-hidden">
                <img 
                src={image} 
                alt={name} 
                className="h-full w-full object-cover object-[center_10%] rounded-2xl" />
            </div>

            <div className="p-5">
                <h3>{name}</h3>
                <p>{specialization}</p>
                <p>{description}</p>

                <Button className="mt-4 rounded-lg bg-teal-600 px-4 py-2 text-white">
                    View Profile
                </Button>
            </div>
        </BaseCard>
    );
};

export default TeamCard;