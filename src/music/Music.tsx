import React, { useEffect, useRef } from 'react';
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
      height: 80,
      barWidth: 2,
      cursorColor: '#fff',
    });
    wavesurfer.load(audioUrl);
    wavesurferRef.current = wavesurfer;

    // wavesurfer側の再生位置変更をAudioPlayerに反映
    // v6以降は'seek'イベントがなくなり、'interaction'で代用
    const handleInteraction = () => {
      const audio = audioPlayerRef.current?.audio?.current;
      if (audio && wavesurfer.getDuration()) {
        audio.currentTime = wavesurfer.getCurrentTime();
      }
    };
    wavesurfer.on('interaction', handleInteraction);

    // wavesurfer側の再生/停止をAudioPlayerに反映
    const handlePlay = () => {
      audioPlayerRef.current?.audio?.current?.play();
    };
    const handlePause = () => {
      audioPlayerRef.current?.audio?.current?.pause();
    };
    wavesurfer.on('play', handlePlay);
    wavesurfer.on('pause', handlePause);

    return () => {
      wavesurfer.un('interaction', handleInteraction);
      wavesurfer.un('play', handlePlay);
      wavesurfer.un('pause', handlePause);
      wavesurfer.destroy();
    };
  }, []);

  // AudioPlayer側の再生位置・再生/停止をwavesurferに反映
  const handleAudioTimeUpdate = (e: any) => {
    const audio = e.target;
    const wavesurfer = wavesurferRef.current;
    if (wavesurfer && Math.abs(wavesurfer.getCurrentTime() - audio.currentTime) > 0.1) {
      wavesurfer.setTime(audio.currentTime);
    }
  };
  const handleAudioPlay = () => {
    wavesurferRef.current?.play();
  };
  const handleAudioPause = () => {
    wavesurferRef.current?.pause();
  };

  return (
    <>
      <BackgroundImage background={Background} />
      <div className="flex flex-col h-full w-full px-8  items-center">
        <div className="text-yellow-100 min-h-[50%]  w-full text-3xl en-bold mt-4 mb-8 flex flex-col items-center justify-center">
          <div
            ref={waveformRef}
            className="w-full max-h-full mb-4"
          />
            {/* カスタム再生コントロール */}
            <div className="flex items-center gap-4 mt-2">
              <button
                className="w-24 bg-yellow-800/80 hover:bg-yellow-600 text-yellow-200 font-bold py-2 px-4 rounded-xl"
                onClick={() => wavesurferRef.current?.play()}
              >
                ▶
              </button>
              <button
                className="w-24 bg-yellow-800/80 hover:bg-yellow-600 text-yellow-200 font-bold py-2 px-4 rounded-xl"
                onClick={() => wavesurferRef.current?.pause()}
              >
                ||
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                defaultValue={1}
                className="w-32 accent-yellow-500"
                onChange={e => wavesurferRef.current?.setVolume(Number(e.target.value))}
                title=""
              />
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
