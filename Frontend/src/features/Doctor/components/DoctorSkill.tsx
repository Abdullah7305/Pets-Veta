import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown } from "lucide-react";
import DoctorServicesTable from "./ServiceTable";
import { submitDoctorSkills, editDoctorService, deleteDoctorService } from "../api/doctorServices";

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

export type ItemType = {
    id: string,
    skill: string,
    price: string
}

const SkillForm = () => {
    const [skill, setSkill] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<string>('');



    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleDoctorSkill = async () => {
        if (!skill || !price) {
            setError("Please complete both inputs");
            return;
        }
        if (Number(price) < 0 || Number(price) >= 100000) {
            setError("Invalid Price Tag");
            return;
        }
        setError('');

        const doctorSkill = { skill, price };
        const response = await submitDoctorSkills(doctorSkill);
        console.log("Response is ", response);
        if (response.success) {
            setSkill('');
            setPrice('');
        }
    };

    const handleEditClick = async () => {
        if (!skill || !price) {
            setError("Please complete both inputs");
            return;
        }
        if (Number(price) < 0 || Number(price) >= 100000) {
            setError("Invalid Price Tag");
            return;
        }
        setError('');

        const data = {
            serviceId: editingItemId,
            skill: skill,
            price: price
        }

        const response = await editDoctorService(data);
        if (response.success) {
            setSkill('');
            setPrice('');
            setIsEdit(false);
            setEditingItemId('');
        }
    }

    const editService = (item: ItemType) => {
        setIsEdit(true);
        setEditingItemId(item.id);
        setPrice(item.price);
        setSkill(item.skill);
    }

    const deleteService = async (itemId: string) => {
        const response = await deleteDoctorService(itemId);
        console.log("Delete Response is ", response);
    }



    return (
        <div>
            <section className="border border-emerald-100 bg-emerald-50/30 p-6 rounded-xl max-w-xl mx-auto shadow-sm">
                <h3 className="text-emerald-900 font-semibold text-lg mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald-600" />
                    Add Professional Medical Skills & Pricing
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">

                    <div ref={containerRef} className="w-full relative">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full flex justify-between items-center border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none p-2.5 rounded-lg text-sm transition-all bg-white text-slate-700 text-left"
                        >
                            <span className={skill ? "text-slate-700" : "text-slate-400"}>
                                {skill || "Select a medical skill..."}
                            </span>
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>

                        {/* ALWAYS OPENS DOWNWARD: Driven by top-full layout anchor */}
                        {isOpen && (
                            <ul
                                className="absolute z-50 left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg text-sm text-slate-700"
                                data-lenis-prevent
                            >
                                {VETERINARY_SKILLS.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            setSkill(item);
                                            setIsOpen(false);
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
                            value={price}
                            type="number"
                            min={0}
                            max={100000}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none p-2.5 rounded-lg text-sm transition-all bg-white text-slate-700 placeholder:text-slate-400"
                            placeholder="Price (PKR)"
                        />
                    </div>
                </div>

                {error && <div className="text-sm text-red-500 mb-3">Error: {error}</div>}

                <div className="flex justify-end">
                    <button
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm shadow-emerald-600/10 active:scale-[0.98]"
                        onClick={isEdit ? handleEditClick : handleDoctorSkill}
                    >
                        {isEdit || <Plus className="w-4 h-4" />}
                        {isEdit ? "Edit" : " Add Service"}
                    </button>
                </div>
            </section>
            <section className=" mt-6">
                <DoctorServicesTable onEdit={editService} onDelete={deleteService} />
            </section>
        </div>

    );
};

export default SkillForm;
