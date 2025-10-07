import React from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import Gallery from '../common/Gallery';
import getJsonIllust from "./getJsonIllust";
import { imgJson } from '../type';

const Illust: React.FC = () => {
    const json: imgJson[] = getJsonIllust();

    return (
        <>
            <BackgroundImage background={Background} />
            <div 
                className="text-yellow-200 h-full w-full gap-y-8 px-8 flex flex-col items-center"
                style={{ animationDelay: '600ms', animationDuration: '600ms', animationFillMode: 'forwards', animationTimingFunction: 'ease-in-out' }}
            >
            <Gallery json={json} />
      </div>
        </>
    );
};

export default Illust;