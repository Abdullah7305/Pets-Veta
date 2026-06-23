import { FaPaw, FaPaperPlane } from "react-icons/fa";

import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import img from "@/assets/shared/images/bannerImage.png"

const AIAssistantBanner = () => {
    return (
        <section className="bg-[#f5fbff] px-6 py-8 lg:px-16">
            <div className="relative mx-auto flex max-w-7xl items-center overflow-hidden rounded-[26px] border border-[#c9f1ee] bg-gradient-to-r from-[#dff8f7] via-[#eefdfc] to-[#f6fffe] px-8 py-8 shadow-[0_10px_35px_rgba(15,23,42,0.08)]">
                <img
                    src={img}
                    alt="AI Assistant"
                    className="absolute bottom-0 left-8 hidden h-[210px] object-contain md:block"
                />

                <div className="relative z-10 ml-0 md:ml-[250px]">
                    <p className="mb-2 flex items-center gap-2 text-sm font-extrabold text-[#009f9d]">
                        AI Assistant <FaPaw />
                    </p>

                    <h2 className="mb-3 text-[24px] font-extrabold text-[#07182c]">
                        Ask anything about your pet
                    </h2>

                    <p className="max-w-md text-sm leading-6 text-slate-600">
                        Get instant answers about symptoms, care, nutrition, vaccination and
                        more.
                    </p>
                </div>

                <div className="relative z-10 ml-auto hidden w-[430px] items-center rounded-full bg-white px-5 py-3 shadow-lg lg:flex">
                    <Input
                        type="text"
                        placeholder="Ask your question..."
                        className="!border-0 !bg-transparent !shadow-none !outline-none !ring-0"
                    />

                    <Button
                        variant="primary"
                        size="md"
                        className="flex !h-14 !w-14 items-center justify-center !rounded-full !border-[#009f9d] !bg-[#009f9d] !p-0 !text-white hover:!bg-[#008f8d] hover:!text-white"
                    >
                        <FaPaperPlane />
                    </Button>
                </div>

                <div className="absolute right-10 top-10 hidden h-16 w-20 items-center justify-center rounded-[22px] bg-[#a7eee7] text-white lg:flex">
                    • • •
                </div>
            </div>
        </section>
    );
};

export default AIAssistantBanner;
