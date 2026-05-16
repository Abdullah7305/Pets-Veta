interface CardProps {
    title: string;
    description: string;
    image: string;
}

const Card = ({ title, description, image }: CardProps) => {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-lg transition duration-300 hover:scale-[1.03]">
            <img
                src={image}
                alt={title}
                loading="lazy"
                className="mb-4 h-60 w-full rounded-xl object-cover"
            />

            <h3 className="mb-3 text-center text-xl font-semibold">
                {title}
            </h3>

            <p className="text-center text-sm leading-6 text-gray-600">
                {description}
            </p>
        </div>
    );
};

export default Card;
