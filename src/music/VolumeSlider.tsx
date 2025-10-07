import React from 'react';

interface VolumeSliderProps {
  volume: number;
  setVolume: (volume: number) => void;
  wavesurferRef: React.RefObject<any>;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ volume, setVolume, wavesurferRef }) => {
    return (
        <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            className="accent-yellow-500 cursor-pointer"
            value={volume}
            onChange={e => {
                const newVolume = Number(e.target.value);
                setVolume(newVolume);
                wavesurferRef.current?.setVolume(newVolume);
            }}
        />
    );
};

export default VolumeSlider;