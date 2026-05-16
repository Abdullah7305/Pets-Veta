import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Inputs/Input";

const FindDoctor = () => {
  return (
    <section className="bg-[#F8FAFC] px-4 pb-16 pt-2">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white px-6 py-8 md:px-10">
        <h2 className="mb-8 text-3xl font-bold text-black md:text-[2.2rem]">
          Find A Doctor
        </h2>

        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-4">
          <Input label="" placeholder="Name" />

          <Input label="" placeholder="Speciality" />

          <div className="mb-2 flex items-center justify-center gap-5">
            <span className="text-xl text-black">Available</span>

            <button
              type="button"
              className="flex h-10 w-20 items-center justify-end rounded-full border-2 border-[#0F766E] px-2"
            >
              <span className="h-7 w-7 rounded-full bg-[#0F766E]"></span>
            </button>
          </div>

          <Button className="!rounded-lg !bg-[#0F766E] !py-3 !text-lg !font-bold !text-white hover:!bg-[#115E59]">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FindDoctor;
