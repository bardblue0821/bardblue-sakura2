import React from 'react';
import Background from './background.png';
import BackgroundImage from '../common/BackgroundImage';

const Vrchat: React.FC = () => {
    return (
        <>
            <BackgroundImage background={Background} />
            <div className="h-full w-full p-8">
              <h1 className="text-yellow-100 en-bold">VRChat</h1>
            </div>
        </>
    );
};

export default Vrchat;