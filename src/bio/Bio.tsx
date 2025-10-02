import React from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import Icon from '../common/icon.jpg';


const Bio: React.FC = () => {
  return (
    <>
      <BackgroundImage background={Background} />
      <div
        className="h-full w-full flex flex-col items-center justify-center opacity-0 animate-fadeIn"
        style={{ animationDelay: '600ms', animationDuration: '600ms', animationFillMode: 'forwards', animationTimingFunction: 'ease-in-out' }}
      >
        <div className="h-full w-full aspect-square max-h-[30rem] max-w-[30rem] bg-yellow-950/80 bg-opacity-30 
          rounded-lg flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center items-center h-[80%] w-[80%] border-yellow-100 
        border-t-2 border-b-2 p-8">
        <div className="flex w-full justify-center">
          <img src={Icon} alt="Profile Icon" className="rounded-full w-36 h-36" />
        </div>
        <h1 className="text-yellow-100 en-bold mt-4">MonKupo</h1>
        <div className="mt-4 text-yellow-100 en-regular max-w-3xl">
          <p className="jp-regular text-center text-xl">作曲 / イラスト / Web サイト制作</p>
          <p className="mt-2 jp-regular text-center text-xl">レコードとモーグリが好き</p>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bio;