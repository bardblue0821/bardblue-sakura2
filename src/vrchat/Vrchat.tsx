import React from 'react';
import Background from './background.png';
import BackgroundImage from '../common/BackgroundImage';
import Gallery from '../common/Gallery';
import getJsonVrchat from "./getJsonVrchat";
import { imgJson } from '../type';

const Vrchat: React.FC = () => {
  const json: imgJson[] = getJsonVrchat();

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

export default Vrchat;