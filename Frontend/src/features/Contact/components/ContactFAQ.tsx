const faqs = [
    {
        question: "How can I book a doctor appointment?",
        answer:
            "You can search doctors, open their profile and click the Book Appointment button.",
    },
    {
        question: "Are all doctors verified?",
        answer:
            "Yes. Every doctor goes through admin approval and verification process.",
    },
    {
        question: "Can I use AI assistance for pet symptoms?",
        answer:
            "Yes. PetsVeta provides AI-powered guidance for pet symptom assistance.",
    },
];

const ContactFAQ = () => {
    return (
        <section className="bg-white px-5 py-16 lg:px-16">
            <div className="mx-auto max-w-5xl">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-extrabold text-[#07182c] md:text-4xl">
                        Frequently Asked Questions
                    </h2>

                    <p className="mt-3 text-slate-600">
                        Quick answers to common questions.
                    </p>
                </div>

                <div className="space-y-5">
                    {faqs.map((item) => (
                        <div
                            key={item.question}
                            className="rounded-3xl bg-[#f5fbff] p-6"
                        >
                            <h3 className="text-lg font-extrabold text-[#07182c]">
                                {item.question}
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactFAQ;