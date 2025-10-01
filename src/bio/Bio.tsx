import React from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import Icon from '../common/icon.jpg';


const Bio: React.FC = () => {
    return (
        <>
            <BackgroundImage background={Background} />
            <div className="h-full w-full flex flex-col items-center justify-center">
                <div className="h-full w-full min-h-[31rem] max-w-[31rem] p-12 bg-yellow-950 bg-opacity-30 
                    rounded-lg flex flex-col items-center justify-center">
                    <div className="flex flex-col justify-center items-center h-full w-full border-yellow-100 
                        border-t-2 border-b-2 bg-transparent p-12">
                        <div className="flex w-full justify-center">
                            <img src={Icon} alt="Profile Icon" className="rounded-full w-36 h-36" />
                        </div>
                        <h1 className="text-yellow-100 en-bold mt-4">MonKupo</h1>
                        <div className="mt-4 text-yellow-100 en-regular space-y-4 max-w-3xl">
                            <p className="jp-regular text-center text-xl">作曲 / イラスト / Web サイト制作</p>
                            <p className="-mt-2 jp-regular text-center text-xl">レコードとモーグリが好き</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bio;