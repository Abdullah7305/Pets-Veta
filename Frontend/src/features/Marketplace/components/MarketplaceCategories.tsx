import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaSearch, FaCheck } from "react-icons/fa";
import backgroundImag from '@/assets/shared/images/MarketPlace Background.jpg';

const comprehensiveAnimalsList = [
    { id: "dog", name: "Dog", icon: "🐶", group: "Common Pets" },
    { id: "cat", name: "Cat", icon: "🐱", group: "Common Pets" },
    { id: "parrot", name: "Parrot", icon: "🦜", group: "Exotic & Birds" },
    { id: "deer", name: "Deer", icon: "🦌", group: "Exotic & Birds" },
    { id: "cow", name: "Cow", icon: "🐮", group: "Livestock" },
    { id: "goat", name: "Goat", icon: "🐐", group: "Livestock" },
    { id: "horse", name: "Horse", icon: "🐴", group: "Livestock" },
    { id: "rabbit", name: "Rabbit", icon: "🐰", group: "Common Pets" },
    { id: "monkey", name: "Monkey", icon: "🐒", group: "Exotic & Birds" },
];

const MarketplaceCategories = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAnimal, setSelectedAnimal] = useState(comprehensiveAnimalsList[0]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredAnimals = comprehensiveAnimalsList.filter((animal) =>
        animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        animal.group.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section
            className="relative overflow-hidden px-5 py-20 lg:px-16"
            style={{
                /* Increased the opacity of the black overlay (0.6) 
                   to make the background significantly darker.
                */
                backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImag})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#07182c' // Fallback solid color
            }}
        >
            {/* Added a subtle dark overlay to ensure white text would be readable if needed, 
                or keeping it clear as you requested */}
            <div className="mx-auto max-w-3xl text-center relative z-10">
                <div className="mb-8">
                    <h2 className="text-4xl font-extrabold text-[#07182c] md:text-5xl tracking-tight">
                        Choose your <span className="text-[#009f9d]">Companion</span>
                    </h2>
                    <p className="mt-4 text-[#07182c]/80 text-base max-w-lg mx-auto leading-relaxed font-medium">
                        Explore our curated registry to find the perfect products for your unique animal friend.
                    </p>
                </div>

                <div className="relative inline-block w-full max-w-md text-left" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex w-full items-center justify-between rounded-3xl border border-[#009f9d]/20 bg-white/90 backdrop-blur-md px-6 py-5 text-base font-bold text-[#07182c] shadow-[0_8px_30px_rgba(0,159,157,0.1)] transition-all hover:bg-white hover:border-[#009f9d]/40"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-3xl">{selectedAnimal.icon}</span>
                            <div className="text-left">
                                <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#009f9d]">Current Selection</span>
                                <span className="text-lg">{selectedAnimal.name}</span>
                            </div>
                        </div>
                        <FaChevronDown className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#009f9d]" : ""}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute left-0 mt-3 z-50 w-full rounded-3xl bg-white p-4 shadow-[0_20px_50px_rgba(7,24,44,0.15)] border border-slate-100 max-h-[380px] flex flex-col">
                            <div className="relative mb-3 shrink-0">
                                <FaSearch className="absolute left-4 top-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search your animal..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-2xl bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-semibold text-[#07182c] outline-none border-2 border-transparent focus:border-[#009f9d] focus:bg-white transition-all"
                                    autoFocus
                                />
                            </div>

                            <div className="overflow-y-auto pr-1 flex-1 scrollbar-thin">
                                {filteredAnimals.map((animal) => {
                                    const isSelected = selectedAnimal.id === animal.id;
                                    return (
                                        <button
                                            key={animal.id}
                                            onClick={() => { setSelectedAnimal(animal); setIsOpen(false); }}
                                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-4 text-sm font-bold transition-all mb-1
                                                ${isSelected ? "bg-[#009f9d]/5 text-[#009f9d]" : "text-[#07182c] hover:bg-slate-50"}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-2xl">{animal.icon}</span>
                                                <span className="text-base">{animal.name}</span>
                                            </div>
                                            {isSelected && <FaCheck />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MarketplaceCategories;