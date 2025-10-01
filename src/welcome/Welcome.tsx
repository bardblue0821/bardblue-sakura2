import React from 'react';
import BackgroundImage from '../common/BackgroundImage';
import Background from './background.jpg';

interface WelcomeProps {
    fadeOut: boolean;
    handleTransitionEnd: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({fadeOut, handleTransitionEnd}) => {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center 
            transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onTransitionEnd={handleTransitionEnd}>
            <div className="flex flex-col justify-center items-center w-full h-full bg-yellow-800 p-12 ">
                <div className="flex flex-col justify-center items-center h-full w-full border-yellow-100 border-4 bg-transparent p-12">
                    <h1 className="text-4xl text-yellow-100 font-bold en-bold">Welcome</h1>
                </div>
            </div>
            <img src={Background} alt="Background" className="absolute inset-0 object-cover w-full h-full -z-100" />
        </div>
    );
};

export default Welcome;