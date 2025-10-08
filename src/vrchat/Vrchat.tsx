import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Background from './background.png';
import BackgroundImage from '../common/BackgroundImage';
import Gallery from '../common/Gallery';
import getJsonVrchat from "./getJsonVrchat";
import { imgJson } from '../type';

const Vrchat: React.FC = () => {
  const json: imgJson[] = getJsonVrchat();
  const navigate = useNavigate();
  const handleImageClick = (imageName: string) => {
    navigate(`/home/vrchat/${imageName}`);
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

export default Vrchat;