import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Inputs/Input";

const Newsletter = () => {
  return (
    <section className="bg-[#eeeeee] px-6 py-16">
      <div className="text-center">
        <h2 className="mb-7 text-3xl font-bold text-gray-800 md:text-[2.2rem]">
          Subscribe to our newsletter
        </h2>

        <form className="mx-auto grid max-w-[760px] grid-cols-1 items-end gap-5 md:grid-cols-[1fr_auto]">
          <Input label="" type="email" placeholder="Enter your email" />

          <Button className="!w-auto !rounded-full !bg-[#078b91] !px-8 !py-3 !text-base !font-bold !text-white hover:!bg-[#06777c]">
            Suscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
