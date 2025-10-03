import { useState, useEffect, useRef } from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
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
              <VolumeControl />
            </div>
          </div>
          <div className="text-yellow-100 min-h-[40%] justify-center w-full mb-8 px-4 flex">
            <div className="mr-4 flex flex-col">
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
            <div className="mr-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="-mb-58 w-[15rem] h-[15rem] bg-blue-500 my-2.5 border-4 border-yellow-100 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                />
              ))}
            </div>
            <div className="mr-4 flex flex-col">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="-mb-58 w-[15rem] h-[15rem] bg-blue-500 my-2.5 border-4 border-yellow-100 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                />
              ))}
            </div>
            <div className="mr-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="-mb-58 w-[15rem] h-[15rem] bg-blue-500 my-2.5 border-4 border-yellow-100 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                />
              ))}
            </div>
          </div>
        </div>
    </>
  );
};

export default Music;
