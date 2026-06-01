import { useState, useEffect, useRef } from "react";
import { Plus, CheckCircle, Edit2, Trash2, Search } from "lucide-react";
import { submitDoctorSkills } from "../api/addSkills.api";



const VETERINARY_SKILLS = [
    "General Practice",
    "Surgery & Orthopedics",
    "Dentistry",
    "Dermatology",
    "Cardiology",
    "Ophthalmology",
    "Nephrology",
    "Oncology",
    "Internal Medicine",
    "Exotic Animal Care",
    "Avian Medicine",
    "Equine Medicine",
    "Small Animal Behavior",
    "Reproduction & Breeding",
    "Ultrasound Diagnostics",
    "Anesthesia",
    "Vaccination & Prevention",
    "Emergency Medicine",
    "Orthopedic Surgery",
    "Laparoscopic Surgery",
    "Rehabilitation Therapy",
    "Nutrition Consulting",
    "Microchipping & Identification",
];


const SkillForm = () => {

    const [skill, setSkill] = useState<string | null>(null);
    const [price, setPrice] = useState<string | null>(null);
    const [skillList, setSkillList] = useState<String[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const dropDownRef = useRef<HTMLDivElement>(null);

    const filterSkills = VETERINARY_SKILLS.filter((s) => s.toLowerCase().includes(skill?.toLowerCase()))

    const handleDoctorSkill = async () => {
        if (!skill || !price) {
            setError("Please Complete Both Inputs")
            return;

        }
        setError('');
        const doctorSkill = {
            skill: skill,
            price: price
        }
        // api call 
        const response = await submitDoctorSkills(doctorSkill);
        console.log("Response is ", response);
        if (response.success) {
            setSkill('')
            setPrice('')
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <section className="border border-emerald-100 bg-emerald-50/30 p-6 rounded-xl max-w-xl mx-auto shadow-sm">
            <h3 className="text-emerald-900 font-semibold text-lg mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Add Professional Medical Skills & Pricing
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                <div ref={dropDownRef} className="w-full relative">
                    <input
                        value={skill || undefined}
                        type="text" // Native 'dropdown' is not valid HTML, use text
                        onFocus={() => setIsOpen(true)} // Open list when focused/clicked
                        onChange={(e) => {
                            setSkill(e.target.value);
                            setIsOpen(true); // Keep open while typing
                        }}
                        className="w-full border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none p-2.5 pl-3 rounded-lg text-sm transition-all bg-white text-slate-700 placeholder:text-slate-400"
                        placeholder="Search or enter skill (e.g., General Practice)"
                    />

                    {/* ABSOLUTE DROPDOWN RENDER */}
                    {isOpen && filterSkills.length > 0 && (
                        <ul className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg text-sm text-slate-700">
                            {filterSkills.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setSkill(item); // Populate value
                                        setIsOpen(false); // Close dropdown menu
                                    }}
                                    className="p-2.5 hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer transition-colors"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="w-full sm:w-48 relative">
                    <input
                        value={price || ''}
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none p-2.5 rounded-lg text-sm transition-all bg-white text-slate-700 placeholder:text-slate-400"
                        placeholder="Price (PKR)"
                    />
                </div>
            </div>
            {
                error && <div className="text-sm text-red-500">Error: {error}</div>
            }

            <div className="flex justify-end">
                <button
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm shadow-emerald-600/10 active:scale-[0.98]"
                    onClick={handleDoctorSkill}
                >

                    <Plus className="w-4 h-4" />
                    Add Skill
                </button>
            </div>
        </section>
    );
};

export default SkillForm;