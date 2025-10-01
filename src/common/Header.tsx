import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <div className="flex">
                <div className="">
                    <button>Button 1</button>
                    <button>Button 2</button>
                    <button>Button 3</button>
                    <button>Button 4</button>
                </div>
                <div className="rounded-full w-7 h-7 bg-gray-500"></div>
            </div>
        </header>
    );
};

export default Header;