import ServiceCard from "./ServiceCard";
import { servicesData } from "../data/services.data";

const ServicesGrid = () => {
    return (
        <section className="bg-white px-5 py-16 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 max-w-2xl">
                    <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                        Our Pet-Care{" "}
                        <span className="text-[#009f9d]">Services</span>
                    </h2>

                    <p className="mt-3 leading-7 text-slate-600">
                        Choose from professional pet-care services designed for everyday
                        health, safety and wellness.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {servicesData.map((service) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            color={service.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;