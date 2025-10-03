import React from 'react';
import { FaTwitter } from "react-icons/fa";
import { SiMisskey } from "react-icons/si";
import { SiVrchat } from "react-icons/si";
import { FaCopyright } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const Footer: React.FC = () => {
    return (
        <footer className="w-full flex justify-center items-center z-20">
            <div className="flex justify-between items-center w-full px-8">
                <span className="text-yellow-100 flex items-center gap-4">
                    <a href="https://twitter.com/MonKupo" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-800">
                        <FaTwitter size={24} className="text-yellow-100 hover:text-yellow-800 duration-300"/>
                    </a>
                    <a href="https://misskey.furry-r-moonrabbitbower.com/@MonKupo" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-800">
                        <SiMisskey size={24} className="text-yellow-100 hover:text-yellow-800 duration-300"/>
                    </a>
                    <a href="https://vrchat.com/home/user/usr_75b556cc-f123-44c5-8409-15974da68e89" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-800">
                        <SiVrchat size={54} className="text-yellow-100 hover:text-yellow-800 duration-300"/>
                    </a>
                    <a href="mailto:bardblue0821@gmail.com" className="text-white hover:text-yellow-800">
                        <IoMail size={24} className="text-yellow-100 hover:text-yellow-800 duration-300"/>
                    </a>
                </span>
                <span className="flex text-yellow-100 items-center">
                    <p className="flex items-center gap-1 en-regular"><FaCopyright /> Monkupo</p>
                </span>
            </div>
        </footer>
    );
};

export default Footer;