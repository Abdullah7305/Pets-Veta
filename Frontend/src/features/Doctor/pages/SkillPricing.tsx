import { useState } from "react";
import Navbar from "../../../shared/components/Navbar/Navbar";
import SkillForm from "../components/DoctorSkill";

const DoctorSkill = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState("Skill Pricing");

    return (
        <div className="min-h-screen bg-[#F4F7F9]">

            <div className=" pt-24 p-5">
       
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-800">
                        Manage Your Skills
                    </h1>
                    <p className="text-slate-500 mt-3 max-w-3xl leading-7">
                        Add, update, and manage your professional skills with their pricing.
                        Keep your service offerings up to date and competitive.
                    </p>
                </div>

           
                <SkillForm />
            </div>
        </div>
    );
};

export default DoctorSkill;
