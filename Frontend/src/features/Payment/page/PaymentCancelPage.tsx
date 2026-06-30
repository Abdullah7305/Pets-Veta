import PageBackButton from "@/shared/components/BackButton/PageBackButton";

const PaymentCancelPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-red-50 px-4">
      <section className="rounded-3xl bg-white p-8 text-center shadow-xl">
        <div className="mb-5 text-left">
          <PageBackButton fallbackPath="/checkout" />
        </div>

        <h1 className="text-2xl font-extrabold text-red-600">
          Payment Cancelled
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Your payment was cancelled or not completed.
        </p>
      </section>
    </main>
  );
};

export default PaymentCancelPage;
