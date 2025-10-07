import React from 'react';

interface StopButtonProps {
  onStop: () => void;
}

const StopButton: React.FC<StopButtonProps> = ({ onStop }) => {
  return (
    <button
      className="w-24 cursor-pointer duration-300 bg-yellow-800/80 hover:bg-yellow-600 text-yellow-200 font-bold py-2 px-4 rounded-xl"
      onClick={onStop}
      aria-label="Stop"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <rect x="6" y="6" width="12" height="12" />
      </svg>
    </button>
  );
};

export default StopButton;