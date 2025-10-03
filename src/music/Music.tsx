import React, { useState, useEffect, useRef } from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import WaveSurfer from 'wavesurfer.js';

const Music: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<any>(null);
  const wavesurferRef = useRef<WaveSurfer|null>(null);
  const audioUrl = "./public/music/DigitalSignage/007-TimeTrain5.wav";

  useEffect(() => {
    if (!waveformRef.current) return;
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#ffe066',
      progressColor: '#ffd700',
      height: 120,
      barWidth: 2,
      cursorColor: '#de3700ff',
    });
    wavesurfer.load(audioUrl);
    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const PlayPauseButton = ({
    isPlaying,
    onPlay,
    onPause,
  }: {
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
  }) => (
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

  const VolumeControl = () => (
    <input
      type="range"
      min={0}
      max={1}
      step={0.01}
      defaultValue={1}
      className="w-32 cursor-pointer accent-yellow-500 duration-300"
      onChange={e => wavesurferRef.current?.setVolume(Number(e.target.value))}
      title=""
    />
  );

  const StopButton = ({
    onStop,
  }: {
    onStop: () => void;
  }) => (
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

  const Box = ({ label }: { label: string }) => {
    return (
      <>
        <div className="bg-yellow-900 h-[16rem] w-[16rem] z-10 absolute top-30 pointer-none"></div>
        <div className="bg-yellow-900 h-[16rem] w-[16rem] z-11 absolute top-30 pointer-none">
          <h1 className="text-center mt-4 mx-4 text-2xl text-yellow-900 
            border-2 rounded-lg p-2 en-regular bg-yellow-200">{label}</h1>
        </div>
        <div className="bg-yellow-900 h-[16rem] w-[16rem] -z-10 absolute top-0 pointer-none"></div>
      </>
    )
  }

  return (
    <>
      <BackgroundImage background={Background} />
      <div className="flex flex-col h-full w-full px-8  items-center">
        <div className="text-yellow-100 min-h-[50%]  w-full text-3xl en-bold mt-4 mb-8 flex flex-col items-center justify-center">
          <div
            ref={waveformRef}
            className="w-full max-h-full mb-4"
          />
            <div className="flex items-center gap-4 mt-2">
              <PlayPauseButton
                isPlaying={isPlaying}
                onPlay={() => {
                  wavesurferRef.current?.play()
                  setIsPlaying(true);
                }}
                onPause={() => {
                  wavesurferRef.current?.pause()
                  setIsPlaying(false);
                }}
              />
              <StopButton
                onStop={() => {
                  wavesurferRef.current?.stop();
                  setIsPlaying(false);
                }}
              />
              <VolumeControl />
            </div>
          </div>
          <div className="text-yellow-100 min-h-[40%] justify-center w-full gap-x-8 px-4 flex">
            <div className="flex flex-col relative items-center">
              <Box label="Digital Signage" />
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`relative -mb-58 w-[15rem] h-[15rem] bg-blue-500 my-2.5 
                  border-4 border-yellow-100 rounded-lg flex items-center justify-center
                  text-white text-2xl font-bold transition-transform duration-300 hover:-translate-y-30
                  z-${index}
                  `}
                />
              ))}
            </div>
            <div className="flex flex-col relative items-center">
              <Box label="Digital Signage" />
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`relative -mb-58 w-[15rem] h-[15rem] bg-blue-500 my-2.5 
                  border-4 border-yellow-100 rounded-lg flex items-center justify-center
                  text-white text-2xl font-bold transition-transform duration-300 hover:-translate-y-30
                  z-${index}
                  `}
                />
              ))}
            </div>
            <div className="flex flex-col relative items-center">
              <Box label="Cross Seekers" />
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`relative -mb-58 w-[15rem] h-[15rem] bg-blue-500 my-2.5 
                  border-4 border-yellow-100 rounded-lg flex items-center justify-center
                  text-white text-2xl font-bold transition-transform duration-300 hover:-translate-y-30
                  z-${index}
                  `}
                />
              ))}
            </div>
            <div className="flex flex-col relative items-center">
              <Box label="Cross Seekers" />
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={`relative -mb-58 w-[15rem] h-[15rem] bg-blue-500 my-2.5 
                  border-4 border-yellow-100 rounded-lg flex items-center justify-center
                  text-white text-2xl font-bold transition-transform duration-300 hover:-translate-y-30
                  z-${index}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
    </>
  );
};

export default Music;
