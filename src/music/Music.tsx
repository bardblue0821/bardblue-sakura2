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
import { useNavigate } from 'react-router-dom';

const Music: React.FC = () => {
  const audioFiles = getJsonMusic();

  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [currentAlbum, setcurrentAlbum] = useState(audioFiles[0].album);
  const [currentTrack, setCurrentTrack] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const navigate = useNavigate();

  // 曲ロード・自動再生
  const loadTrack = () => {
    const wavesurfer = wavesurferRef.current;
    if (!wavesurfer) return;

    wavesurfer.load(audioFiles[currentTrack].url);

    if (isPlaying) {
      wavesurfer.once('ready', () => wavesurfer.play());
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
  useEffect(() => {
    // 曲が切り替わるたびにURLに曲名を反映
    const safeLabel = audioFiles[currentTrack].label.replace(/\s+/g, '');
    navigate(`/home/music/${safeLabel}`);
  }, [currentTrack]);
  
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
            className="w-full max-h-full mt-8 max-w-[800px] mb-8"
          />
            <div className="flex h-full items-center gap-4 mt-2 mb-4">
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
            <div className="mt-4 mb-12 text-xl text-yellow-200">
              {audioFiles[currentTrack].label}
            </div>
          </div>

          <div className="rounded-lg flex min-h-[60%] max-h-[60%] max-w-[800px] w-full">
            {/* アルバムリスト */}
            <div className="bg-yellow-900/60 p-4 min-w-[180px] flex-col gap-2 ">
              <div className="text-yellow-200 en-bold text-lg font-bold mb-2">Album</div>
              <div className="flex flex-col gap-2 h-[90%] overflow-auto">
                {Array.from(new Set(audioFiles.map(f => f.album))).map(album => (
                <button
                  key={album}
                  className={`duration-300 en-regular cursor-pointer text-left px-2 py-1 rounded hover:bg-yellow-700/60 ${currentAlbum === album ? 'bg-yellow-700 text-yellow-200' : 'text-yellow-200'}`}
                  onClick={() => setcurrentAlbum(album)}
                >
                  {album}
                </button>
              ))}
              </div>
            </div>
            {/* トラックリスト */}
            <div className="bg-yellow-900/60 h-full flex-1 p-4">
              <div className="text-yellow-200 en-bold text-lg font-bold mb-2">Track</div>
              <div className="h-[90%] flex-col overflow-auto">
                {audioFiles
                  .map((f, idx) => ({ ...f, idx }))
                  .filter(f => f.album === currentAlbum)
                  .map(f => (
                    <button
                      key={f.label}
                      className={`duration-300 block w-full cursor-pointer en-regular 
                        text-left px-2 py-1 rounded hover:bg-yellow-700/60 
                        ${currentTrack === f.idx ? 'bg-yellow-700 text-yellow-200' : 'text-yellow-200'}`}
                      onClick={() => setCurrentTrack(f.idx)}
                    >
                      {f.label}
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Music;
