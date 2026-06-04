import { Link } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { PiPawPrintFill } from "react-icons/pi";

import Button from "../../../shared/components/Button";
import Logo from "../../../shared/components/Logo/Logo";

const ContinueAs = () => {
    return (
        <div className="min-h-screen bg-white px-5 py-6">
            <Logo />

            <div className="mx-auto mt-24 max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-gray-900">Continue as</h2>
                <p className="mt-3 text-sm text-gray-500">
                    Choose an option to continue
                </p>

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    <div className="rounded-xl bg-white p-8 shadow-lg">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                            <PiPawPrintFill className="text-4xl text-teal-700" />
                        </div>

                        <p className="mt-6 text-sm text-gray-600">I am a</p>
                        <h3 className="mt-1 text-xl font-bold text-gray-900">Pet Owner</h3>
                        <p className="mx-auto mt-4 max-w-[220px] text-sm text-gray-500">
                            Looking to buy, sell and care for pets
                        </p>

                        <Link to="/pet-owner-signup">
                            <Button className="mt-8 w-full">Continue as Pet Owner</Button>
                        </Link>
                    </div>

                    <div className="rounded-xl bg-white p-8 shadow-lg">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                            <FaUserDoctor className="text-4xl text-teal-700" />
                        </div>

                        <p className="mt-6 text-sm text-gray-600">I am a</p>
                        <h3 className="mt-1 text-xl font-bold text-gray-900">Doctor</h3>
                        <p className="mx-auto mt-4 max-w-[220px] text-sm text-gray-500">
                            I want to provide medical care for pets
                        </p>

                        <Link to="/doctor-signup">
                            <Button className="mt-8 w-full">Continue as Doctor</Button>
                        </Link>
                    </div>
                </div>

                <p className="mt-20 text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-teal-700">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ContinueAs;