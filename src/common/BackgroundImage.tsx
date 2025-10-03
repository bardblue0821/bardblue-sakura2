import React, { useState } from 'react';

const BackgroundImage: React.FC<{ background: string }> = ({ background }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div>
            <img
                src={background}
                alt="Background"
                className={`absolute inset-0 object-cover w-full h-full -z-100 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
            />
            <div className="absolute inset-0 bg-black opacity-80 -z-99"></div>
        </div>
    );
};

export default BackgroundImage;