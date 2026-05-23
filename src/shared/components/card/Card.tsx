interface CardProps {
    title: string;
    description: string;
    image: string;
}

const Card = ({ title, description, image }: CardProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
            <img
                src={image}
                alt={title}
                className="w-90 h-80 object-cover  mb-4"
            />

            <h3 className="text-2xl font-semibold text-center mb-3">
                {title}
            </h3>

            <p className="text-gray-600 text-center leading-7">
                {description}
            </p>
        </div>
    );
};

export default Card;