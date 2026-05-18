import BaseCard from "../../../shared/components/BaseCard/BaseCard";
import Button from "../../../shared/components/Button/Button";

type ServiceCardProps = {
    title: string;
    description: string;
    image: string;
};

const ServiceCard = ({ title, description, image }: ServiceCardProps) => {
    return (
        <BaseCard>
            <div className="h-[220px] w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="p-5">
                <h3>{title}</h3>
                <p>{description}</p>

                <Button>See More</Button>
            </div>
        </BaseCard>
    )
}

export default ServiceCard;