import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import Gallery from '../common/Gallery';
import getJsonIllust from "./getJsonIllust";
import { imgJson } from '../type';

const Illust: React.FC = () => {
    const json: imgJson[] = getJsonIllust();
    const navigate = useNavigate();
    const handleImageClick = (imageName: string) => {
        navigate(`/home/illust/${imageName}`);
    };
    return (
        <>
            <BackgroundImage background={Background} />
            <div 
                className="text-yellow-200 h-full w-full gap-y-8 px-8 flex flex-col items-center"
                style={{ animationDelay: '600ms', animationDuration: '600ms', animationFillMode: 'forwards', animationTimingFunction: 'ease-in-out' }}
            >
                <Gallery json={json} onImageClick={handleImageClick} />
            </div>
            <Outlet />
        </>
    );
};

export default Illust;