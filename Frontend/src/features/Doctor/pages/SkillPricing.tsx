import SkillForm from "../components/DoctorSkill";

const DoctorSkill = () => {
  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      <div className="p-5 pt-24">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Manage Your Skills
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-500">
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