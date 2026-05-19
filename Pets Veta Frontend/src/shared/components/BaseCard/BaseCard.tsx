interface BaseCardProps {
    children : React.ReactNode;
}

const BaseCard = ({ children }: BaseCardProps) => {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-lg transition duration-300 hover:scale-[1.03]">
            {children}
        </div>
    );
};

export default BaseCard;
