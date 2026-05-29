import { useState, useEffect } from "react";
import { Plus, CheckCircle, Edit2, Trash2, Search } from "lucide-react";

type Skill = {
    id: string;
    name: string;
    price: string;
};


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
    const [skillName, setSkillName] = useState("");
    const [pricing, setPricing] = useState("");
    const [skills, setSkills] = useState<Skill[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingPrice, setEditingPrice] = useState("");


    useEffect(() => {
        if (skillName.trim()) {
            const filtered = VETERINARY_SKILLS.filter((skill) =>
                skill.toLowerCase().includes(skillName.toLowerCase())
            );
            setFilteredSkills(filtered);
        } else {
            setFilteredSkills(VETERINARY_SKILLS);
        }
    }, [skillName]);


    const handleSkillSelect = (selectedSkill: string) => {
        setSkillName(selectedSkill);
        setShowDropdown(false);
    };


    const handleAddSkill = () => {
        if (skillName.trim() && pricing.trim()) {
            const newSkill: Skill = {
                id: Date.now().toString(),
                name: skillName,
                price: pricing,
            };

            console.log("New Skill Added:", {
                skillName: newSkill.name,
                pricing: newSkill.price,
                timestamp: new Date().toLocaleString(),
            });

            setSkills([...skills, newSkill]);
            setSkillName("");
            setPricing("");
            setFilteredSkills(VETERINARY_SKILLS);

            // Show success message
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }
    };

    const handleEditSkill = (id: string, currentPrice: string) => {
        setEditingId(id);
        setEditingPrice(currentPrice);
    };

    const handleSaveEdit = (id: string) => {
        setSkills(
            skills.map((skill) =>
                skill.id === id ? { ...skill, price: editingPrice } : skill
            )
        );
        console.log("Skill Updated:", { id, newPrice: editingPrice });
        setEditingId(null);
        setEditingPrice("");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleRemoveSkill = (id: string) => {
        setSkills(skills.filter((skill) => skill.id !== id));
        console.log("Skill Removed:", id);
    };

    return (
        <div className="space-y-6">

            <div
                className="rounded-2xl shadow-sm p-12 hover:shadow-md transition relative overflow-hidden bg-white"
                style={{
                    minHeight: "450px",
                }}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-full opacity-30 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                        <h2 className="text-2xl font-semibold text-slate-700">
                            Add New Skill
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        {/* Skill Name Input with Dropdown */}
                        <div className="flex flex-col relative">
                            <label className="text-slate-600 font-medium mb-2">
                                Select Skill
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-3 text-slate-400">
                                    <Search size={18} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search or type skill name..."
                                    value={skillName}
                                    onChange={(e) => setSkillName(e.target.value)}
                                    onFocus={() => setShowDropdown(true)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition placeholder-slate-400 text-slate-800 bg-white"
                                />
                                {/* Dropdown Suggestions */}
                                {showDropdown && filteredSkills.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                                        {filteredSkills.map((skill, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSkillSelect(skill)}
                                                className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 text-slate-800 font-medium hover:text-teal-600 transition"
                                            >
                                                {skill}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pricing Input */}
                        <div className="flex flex-col">
                            <label className="text-slate-600 font-medium mb-2">
                                Pricing ($)
                            </label>
                            <input
                                type="number"
                                placeholder="e.g., 150"
                                value={pricing}
                                onChange={(e) => setPricing(e.target.value)}
                                className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-teal-500 focus:outline-none transition placeholder-slate-400 text-slate-800 bg-white"
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleAddSkill}
                        className="w-full md:w-auto bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-3 px-8 rounded-xl hover:from-teal-700 hover:to-teal-800 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                        <Plus size={20} />
                        Add Skill
                    </button>

                    {/* Success Message */}
                    {showSuccess && (
                        <div className="mt-4 flex items-center gap-2 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-lg font-medium">
                            <CheckCircle size={20} />
                            <span>Skill updated successfully!</span>
                        </div>
                    )}
                </div>
            </div>

            {/* SKILLS LIST SECTION */}
            {skills.length > 0 && (
                <div
                    className="rounded-2xl shadow-sm p-12 hover:shadow-md transition relative overflow-hidden bg-white"
                    style={{
                        minHeight: "400px",
                    }}
                >
                    <div className="absolute top-0 left-0 w-40 h-40 bg-teal-100 rounded-full opacity-20 blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-semibold text-slate-700 mb-6 flex items-center gap-2">
                            <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-lg">
                                {skills.length}
                            </span>
                            Active Skills
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border-2 border-slate-200 hover:border-teal-300 hover:shadow-lg transition min-h-64"
                                >
                                    <div className="mb-4">
                                        <h3 className="text-base font-semibold text-slate-700 mb-2">
                                            {skill.name}
                                        </h3>
                                        {editingId === skill.id ? (
                                            <div className="flex gap-2">
                                                <input
                                                    type="number"
                                                    value={editingPrice}
                                                    onChange={(e) => setEditingPrice(e.target.value)}
                                                    className="flex-1 px-2 py-1 border-2 border-slate-300 rounded-lg focus:border-teal-500 focus:outline-none text-slate-800"
                                                />
                                                <button
                                                    onClick={() => handleSaveEdit(skill.id)}
                                                    className="px-3 py-1 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition"
                                                >
                                                    ✓
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-3xl font-bold text-teal-600">
                                                ${skill.price}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditSkill(skill.id, skill.price)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition border border-blue-200"
                                        >
                                            <Edit2 size={16} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleRemoveSkill(skill.id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 font-semibold rounded-lg hover:bg-red-100 transition border border-red-200"
                                        >
                                            <Trash2 size={16} />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SkillForm;
