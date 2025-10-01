import React from 'react';
import Background from './background.jpg';


const Illust: React.FC = () => {
    return (
        <div>
            <img src={Background} alt="Background" className="absolute inset-0 object-cover w-full h-full -z-100" />
            <div className="absolute inset-0 bg-black opacity-80 -z-99"></div>
        </div>
    );
};

export default Illust;