import { Link } from 'react-router-dom';
import React from 'react';
import Icon from './icon.jpg';

const twFont="text-yellow-100 hover:text-yellow-700 duration-300";

const Header: React.FC = () => {
    return (
        <header className="w-full flex justify-center items-center en-regular">
            <div className="flex justify-between items-center w-full px-8">
                <span className="flex gap-8">
                    <Link to="/illust" className="">
                        <p className={twFont}>Illust</p>
                    </Link>
                    <Link to="/music" className="">
                        <p className={twFont}>Music</p>
                    </Link>
                    <Link to="/vrchat" className="">
                        <p className={twFont}>VRChat</p>
                    </Link>
                    <Link to="/bio" className="">
                        <p className={twFont}>Biography</p>
                    </Link>
                </span>
                <span className="flex items-center">
                    <Link to="/bio" className="mx-2">
                        <img src={Icon} alt="Profile Icon" className="rounded-full w-7 h-7" />
                    </Link>
                </span>
            </div>
        </header>
    );
};

export default Header;