import React from 'react';

const BackgroundImage: React.FC<{ background: string }> = ({ background }) => {
    return (
        <div>
            <img src={background} alt="Background" className="absolute inset-0 object-cover w-full h-full -z-100" />
            <div className="absolute inset-0 bg-black opacity-80 -z-99"></div>
        </div>
    );
};

export default BackgroundImage;