import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Inputs/Input";

const Newsletter = () => {
  return (
    <section className="bg-[#eeeeee] px-6 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Subscribe to our newsletter
        </h2>

        <form className="max-w-[850px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
          <Input label="" type="email" placeholder="Enter your email" />

          <Button className="!w-auto !bg-[#078b91] hover:!bg-[#06777c] !text-white !text-xl !font-bold !px-10 !py-3 !rounded-full">
            Suscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
