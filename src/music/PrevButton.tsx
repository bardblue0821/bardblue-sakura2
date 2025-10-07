import React from 'react';

interface PrevButtonProps {
  onPrev: () => void;
}

const PrevButton: React.FC<PrevButtonProps> = ({ onPrev }) => {
  return (
    <button
      className="w-12 cursor-pointer duration-300 bg-yellow-800/80 hover:bg-yellow-600 text-yellow-200 font-bold py-2 px-2 rounded-xl"
      onClick={onPrev}
      aria-label="Previous"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="17,6 7,12 17,18" />
        <rect x="5" y="6" width="2" height="12" />
      </svg>
    </button>
  );
};

export default PrevButton;