import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import Icon from './icon.jpg';

const twFont="text-yellow-100 hover:text-yellow-500 duration-300";

const Header: React.FC = () => {
    const location = useLocation();
    const menu = [
        { to: "/illust", label: "Illust" },
        { to: "/music", label: "Music" },
        { to: "/vrchat", label: "VRChat" },
        { to: "/bio", label: "About" },
    ];
    const selectedIdx = menu.findIndex(m => m.to === location.pathname);
    // メニューの幅・高さを固定（必要に応じて調整）
    const itemWidth = 84; // px
    const itemHeight = 32; // px
    return (
        <header className="w-full flex justify-center items-center en-regular">
            <div className="flex justify-between items-center w-full px-8">
                <span className="justify-center relative flex gap-8" style={{height: itemHeight}}>
                    <span
                        className="absolute left-0 top-8 -translate-y-1/2 rounded-md bg-yellow-800/50 
                        -z-10 transition-all duration-500"
                        style={{
                            width: itemWidth,
                            height: itemHeight,
                            transform: `translateX(${selectedIdx * (itemWidth + 32)}px) translateY(-50%)`,
                        }}
                    />
                    {menu.map(({ to, label }, idx) => (
                        <Link to={to} key={to} className="relative" style={{width: itemWidth, height: itemHeight, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <p className={twFont}>{label}</p>
                        </Link>
                    ))}
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