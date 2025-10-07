import React from 'react';

interface PlayPauseButtonProps {
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ isPlaying, onPlay, onPause }) => {
    return (
        <button
            className="w-24 cursor-pointer duration-300 bg-yellow-800/80 hover:bg-yellow-600 text-yellow-200 font-bold py-2 px-4 rounded-xl"
            onClick={isPlaying ? onPause : onPlay}
            aria-label={isPlaying ? "Pause" : "Play"}
        >
            {isPlaying ? (
                // Pauseアイコン
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                </svg>
            ) : (
                // Playアイコン
                <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                </svg>
            )}
        </button>
    );
};

export default PlayPauseButton;