import Button from "@/shared/components/Button/Button";
import img from "@/assets/shared/images/dog2.jpeg"

const CTA = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-10 lg:px-16">
            <div className="relative mx-auto flex max-w-7xl items-center justify-between overflow-hidden rounded-[34px] bg-gradient-to-r from-[#12aaa5] to-[#079895] px-8 py-10 shadow-xl md:px-14">
                <img
                    src={img}
                    alt="Dog"
                    className="absolute bottom-0 left-6 hidden h-[260px] object-contain md:block"
                />

                <div className="relative z-10 mx-auto max-w-2xl text-center">
                    <h2 className="text-[30px] font-extrabold leading-tight text-white md:text-[42px]">
                        Your pet’s health is our priority
                        <br />
                        Join PetsVeta today!
                    </h2>

                    <div className="mt-8 flex justify-center gap-5">
                        <Button
                            variant="primary"
                            size="md"
                            className="!rounded-2xl !border-white !bg-white !px-10 !text-[#009f9d] hover:!bg-white hover:!text-[#008f8d]"
                        >
                            Get Started
                        </Button>

                        <Button
                            variant="outline"
                            size="md"
                            className="!rounded-2xl !border-white !bg-transparent !px-10 !text-white hover:!bg-white hover:!text-[#009f9d]"
                        >
                            Explore Features
                        </Button>
                    </div>
                </div>

                <img
                    src={img}
                    alt="Cat"
                    className="absolute bottom-0 right-8 hidden h-[275px] object-contain md:block"
                />
            </div>
        </section>
    );
};

export default CTA;