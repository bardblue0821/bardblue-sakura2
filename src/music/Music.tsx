import React, { useState, useEffect, useRef } from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import WaveSurfer from 'wavesurfer.js';
import getJsonMusic from "./getJsonMusic";
import PlayPauseButton from './PlayPauseButton';
import StopButton from './StopButton';
import PrevButton from './PrevButton';
import NextButton from './NextButton';
import RepeatButton from './RepeatButton';
import VolumeSlider from './VolumeSlider';

const Music: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const audioFiles = getJsonMusic();

  const [selectedAlbum, setSelectedAlbum] = useState(audioFiles[0].album);
  const [currentTrack, setCurrentTrack] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // 曲ロード・自動再生
  const loadTrack = () => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.load(audioFiles[currentTrack].url);
    if (isPlaying) {
      wavesurferRef.current.once('ready', () => {
        wavesurferRef.current?.play();
      });
    } else {
      setIsPlaying(false);
    }
  };

  // 再生終了時の処理
  const setupFinishHandler = () => {
    if (!wavesurferRef.current) return;
    const ws = wavesurferRef.current;
    const onFinish = () => {
      isRepeat ? ws.play(0) : handleNext();
    };
    ws.on('finish', onFinish);
    return () => ws.un('finish', onFinish);
  };

  // WaveSurfer初期化
  const initWaveSurfer = () => {
    if (!waveformRef.current) return;
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#ffe066',
      progressColor: '#ffd700',
      height: 120,
      barWidth: 2,
      cursorColor: '#de3700ff',
    });
    wavesurfer.load(audioFiles[0].url);
    wavesurferRef.current = wavesurfer;
    return () => wavesurfer.destroy();
  };

  useEffect(loadTrack, [currentTrack]);
  useEffect(setupFinishHandler, [currentTrack, isRepeat]);
  useEffect(initWaveSurfer, []);
  
  // 次の曲へ
  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % audioFiles.length);
  };

  // 前の曲へ
  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + audioFiles.length) % audioFiles.length);
  };

  const [volume, setVolume] = useState(0.7); // 初期音量を50%に設定


  return (
    <>
      <BackgroundImage background={Background} />
      <div 
        className="flex flex-col h-full w-full px-8  items-center"
        style={{ animationDelay: '600ms', animationDuration: '600ms', animationFillMode: 'forwards', animationTimingFunction: 'ease-in-out' }}
      >
        <div className="text-yellow-100 min-h-[40%]  w-full text-3xl en-bold flex flex-col items-center justify-center">
          <div
            ref={waveformRef}
            className="w-full max-h-full max-w-[800px] mb-8"
          />
            <div className="flex items-center gap-4 mt-2 mb-4">
              <PrevButton onPrev={handlePrev} />
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
              <NextButton onNext={handleNext} />
              <RepeatButton isRepeat={isRepeat} onToggle={() => setIsRepeat(r => !r)} />
              <VolumeSlider volume={volume} setVolume={setVolume} wavesurferRef={wavesurferRef} />
            </div>
            <div className="mt-4 mb-4 text-xl text-yellow-200">
              {audioFiles[currentTrack].label}
            </div>
          </div>

          <div className="rounded-lg flex min-h-[60%] max-h-[60%] max-w-[800px] w-full">
            {/* アルバムリスト */}
            <div className="bg-yellow-900 p-4 min-w-[180px] flex flex-col gap-2 overflow-auto">
              <div className="text-yellow-200 en-bold text-lg font-bold mb-2">Album List</div>
              {Array.from(new Set(audioFiles.map(f => f.album))).map(album => (
                <button
                  key={album}
                  className={`duration-300 en-regular cursor-pointer text-left px-2 py-1 rounded hover:bg-yellow-700/60 ${selectedAlbum === album ? 'bg-yellow-700 text-yellow-200' : 'text-yellow-200'}`}
                  onClick={() => setSelectedAlbum(album)}
                >
                  {album}
                </button>
              ))}
            </div>
            {/* トラックリスト */}
            <div className="bg-yellow-900 flex-1 p-4 overflow-auto">
              <div className="text-yellow-200 en-bold text-lg font-bold mb-2">Track List</div>
              {audioFiles
                .map((f, idx) => ({ ...f, idx }))
                .filter(f => f.album === selectedAlbum)
                .map(f => (
                  <button
                    key={f.label}
                    className={`duration-300 block w-full cursor-pointer text-left px-2 py-1 rounded hover:bg-yellow-700/60 ${currentTrack === f.idx ? 'bg-yellow-700 text-yellow-200' : 'text-yellow-200'}`}
                    onClick={() => setCurrentTrack(f.idx)}
                  >
                    {f.label}
                  </button>
                ))}
            </div>
          </div>
          {/* record box
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
          </div> */}
        </div>
    </>
  );
};

export default Music;
