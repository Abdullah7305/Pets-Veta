import {
    FaCheckCircle,
    FaShieldAlt,
    FaShippingFast,
    FaUndo,
} from "react-icons/fa";

const benefits = [
    {
        icon: <FaCheckCircle />,
        title: "100% Genuine Products",
        subtitle: "Trusted pet brands",
    },

    {
        icon: <FaUndo />,
        title: "Easy Returns",
        subtitle: "7 days return policy",
    },

    {
        icon: <FaShippingFast />,
        title: "Fast Delivery",
        subtitle: "Quick doorstep delivery",
    },

    {
        icon: <FaShieldAlt />,
        title: "Secure Payments",
        subtitle: "Safe & encrypted checkout",
    },
];

const MarketplaceBenefits = () => {
    return (
        <section className="bg-white px-5 py-10 lg:px-16">
            <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
                {benefits.map((item) => (
                    <div
                        key={item.title}
                        className="flex items-center gap-4 rounded-3xl bg-[#f5fbff] p-5"
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-[#009f9d] shadow-sm">
                            {item.icon}
                        </div>

                        <div>
                            <h3 className="font-extrabold text-[#07182c]">
                                {item.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                {item.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MarketplaceBenefits;