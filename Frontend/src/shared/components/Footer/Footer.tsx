import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

import Logo from "../../../shared/components/Logo/Logo";
import Button from "../../../shared/components/Button";

const Footer = () => {
    return (
        <footer className="bg-[#f5fbff] px-6 pt-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 border-b border-slate-200 pb-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr_1.5fr]">
                    <div className="border-slate-200 lg:border-r lg:pr-10">
                        <Logo />

                        <p className="mt-6 max-w-[240px] text-sm leading-7 text-slate-600">
                            We are here to make pet care simple, accessible and trusted for
                            every pet parent.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white">
                                <FaFacebookF />
                            </a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4405f] text-white">
                                <FaInstagram />
                            </a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1da1f2] text-white">
                                <FaTwitter />
                            </a>
                            <a className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff0000] text-white">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-6 text-lg font-extrabold text-[#07182c]">
                            Quick Links
                        </h3>
                        <ul className="space-y-4 text-sm font-semibold text-slate-700">
                            <li>Home</li>
                            <li>Marketplace</li>
                            <li>Services</li>
                            <li>Doctors</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-lg font-extrabold text-[#07182c]">
                            Company
                        </h3>
                        <ul className="space-y-4 text-sm font-semibold text-slate-700">
                            <li>About Us</li>
                            <li>Contact Us</li>
                            <li>FAQs</li>
                            <li>Blog</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-lg font-extrabold text-[#07182c]">
                            Support
                        </h3>
                        <ul className="space-y-4 text-sm font-semibold text-slate-700">
                            <li>Help Center</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Refund Policy</li>
                        </ul>
                    </div>

                    <div className="border-slate-200 lg:border-r lg:pr-10">
                        <h3 className="mb-6 text-lg font-extrabold text-[#07182c]">
                            Contact Us
                        </h3>

                        <ul className="space-y-5 text-sm font-semibold text-slate-700">
                            <li className="flex items-center gap-4">
                                <FaPhoneAlt className="text-[#009f9d]" />
                                +92 300 1234567
                            </li>
                            <li className="flex items-center gap-4">
                                <FaEnvelope className="text-[#009f9d]" />
                                support@petsveta.com
                            </li>
                            <li className="flex items-center gap-4">
                                <FaMapMarkerAlt className="text-[#009f9d]" />
                                Islamabad, Pakistan
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-lg font-extrabold text-[#07182c]">
                            Newsletter
                        </h3>

                        <p className="mb-5 text-sm leading-7 text-slate-600">
                            Subscribe to get the latest updates and pet care tips.
                        </p>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="mb-4 w-full rounded-2xl border-none bg-white px-5 py-4 text-sm shadow-lg outline-none placeholder:text-slate-400"
                        />

                        <Button
                            variant="primary"
                            size="md"
                            className="!rounded-2xl !bg-[#009f9d] !border-[#009f9d] !text-white hover:!bg-[#008f8d] hover:!text-white"
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>

                <p className="py-6 text-center text-sm font-semibold text-slate-500">
                    © 2025 PetsVeta. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;