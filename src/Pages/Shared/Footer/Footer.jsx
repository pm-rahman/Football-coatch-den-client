import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const Footer = () => {
    const {dark} = useContext(AuthContext);
    return (
        <div className={`px-5 md:px-10 lg:px-20 py-10 ${!dark?'bg-[rgba(1,16,31,.9)] text-white':'bg-[rgba(1,16,31,.1)]'}`}>
            <footer className="footer py-4">
                <div>
                    <Link to='/' className="text-lg md:text-xl font-semibold mb-6">The Football Coach's Den</Link>
                    <p className="flex items-center mb-0"><Icon className="text-xl" icon="mdi:map-marker-outline" /> Mirpur-10, Dhaka Bangladesh</p>
                    <p className="flex items-center"><Icon className="text-xl" icon="ic:outline-phone-in-talk"/>+8801234567891</p>
                    <p>The Football Coach's Den Ltd.<br />Providing reliable training since 2023</p>
                </div>
                <div className="flex flex-col h-full">
                    <span className="footer-title md:mt-8">Social</span>
                    <div className="grid grid-flow-col gap-4">
                        <a href="www.twitter.com/"><Icon className="text-2xl" icon="fa-brands:twitter" /></a>
                        <a href="www.youtube.com"><Icon className="text-2xl" icon="fa-brands:youtube" /></a>
                        <a href="www.facebook.com"><Icon className="text-2xl" icon="fa-brands:facebook-f" /></a>
                    </div>
                    <p className="mt-auto">Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;