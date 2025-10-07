import React from 'react';

interface RepeatButtonProps {
  isRepeat: boolean;
  onToggle: () => void;
}

const RepeatButton: React.FC<RepeatButtonProps> = ({
  isRepeat,
  onToggle,
}) => (
  <button
    className={`w-12 cursor-pointer duration-300 ${isRepeat ? 'bg-yellow-600' : 'bg-yellow-800/80'} hover:bg-yellow-600 text-yellow-200 font-bold py-2 px-2 rounded-xl`}
    onClick={onToggle}
    aria-label="Repeat One"
    title="1曲リピート"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 17H7a5 5 0 0 1 0-10h1V5l3 3-3 3V8H7a3 3 0 0 0 0 6h10v-2l3 3-3 3v-2z" />
      {isRepeat && (
        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">1</text>
      )}
    </svg>
  </button>
);

export default RepeatButton;