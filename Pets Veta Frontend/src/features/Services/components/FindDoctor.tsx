import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Inputs/Input";

const FindDoctor = () => {
  return (
    <section className="px-2 pt-2 pb-24 bg-[#eeeeee]">
      <div className="bg-white rounded-3xl max-w-[1850px] mx-auto px-16 py-10">
        <h2 className="text-5xl font-bold text-black mb-12">
          Find A Doctor
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-9 items-end">
          <Input label="" placeholder="Name" />

          <Input label="" placeholder="Speciality" />

          <div className="flex items-center justify-center gap-8 mb-2">
            <span className="text-3xl text-black">Available</span>

            <button
              type="button"
              className="w-24 h-12 border-2 border-[#078b91] rounded-full flex items-center justify-end px-2"
            >
              <span className="w-9 h-9 bg-[#078b91] rounded-full"></span>
            </button>
          </div>

          <Button className="!bg-[#078b91] hover:!bg-[#06777c] !text-white !text-3xl !font-bold !rounded-lg !py-4">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FindDoctor;
