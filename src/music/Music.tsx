import React, { useState, useEffect, useRef } from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import WaveSurfer from 'wavesurfer.js';

const Music: React.FC = () => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<any>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const audioFiles = [
    { album: "DigitalSignage", label: "Digital Signage - Milkyway Train", url: "./public/music/DigitalSignage/007-TimeTrain54.mp3" },
    { album: "DigitalSignage", label: "Digital Signage - Don't Wake Me Up",  url: "./public/music/DigitalSignage/008-NobodyWakesMeUp41.mp3" },
    { album: "DigitalSignage", label: "Digital Signage - Sink In Winter", url: "./public/music/DigitalSignage/020-huyunisizumu_4.mp3" },
    { album: "DigitalSignage", label: "Digital Signage - Leave As It Is", url: "./public/music/DigitalSignage/033-leaveAsItIs_4.mp3" },
    { album: "DigitalSignage", label: "Digital Signage - Late Show", url: "./public/music/DigitalSignage/056-nighter_52.mp3" },
    { album: "DigitalSignage", label: "Digital Signage - Snowflake", url: "./public/music/DigitalSignage/060-Fullmoon_6.wav" },
    { album: "DigitalSignage", label: "Digital Signage - Rainy Aquarium", url: "./public/music/DigitalSignage/067-dream.mp3" },
    
    { album: "Kaze", label: "風 - 黄金色", url: "./public/music/Kaze/Sunset2-004.mp3" },
    { album: "Kaze", label: "風 - 点描画 (WIP)", url: "./public/music/Kaze/Scatterred.wav" },
    { album: "Kaze", label: "風 - レインセンサー", url: "./public/music/Kaze/NightRain_601.wav" },

    { album: "Cross Seekers", label: "Cross Seekers - メインテーマ", url: "./public/music/CrossSeekers/057-monox_8.wav" },
    { album: "Cross Seekers", label: "Cross Seekers - 草原 (通常)", url: "./public/music/CrossSeekers/field_4_wet_2loop_valorous-trimmed.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - 草原 (休憩)", url: "./public/music/CrossSeekers/field_4_wet_2loop_profundity-trimed.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - 草原 (戦闘)", url: "./public/music/CrossSeekers/field_4_wet_2loop_trepidation-trimmed.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - レオルのテーマ", url: "./public/music/CrossSeekers/Leol7.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - ダンジョン (通常)", url: "./public/music/CrossSeekers/caveA-ambient.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - ダンジョン (戦闘)", url: "./public/music/CrossSeekers/caveA-assault.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - 森", url: "./public/music/CrossSeekers/Clock.wav" },
    { album: "Cross Seekers", label: "Cross Seekers - エレナのテーマ", url: "./public/music/CrossSeekers/erena2.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - 雪山 (通常)", url: "./public/music/CrossSeekers/Icebarn-valorous02.wav" },
    { album: "Cross Seekers", label: "Cross Seekers - 雪山 (休憩)", url: "./public/music/CrossSeekers/Icebarn-profundity02.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - 雪山 (戦闘)", url: "./public/music/CrossSeekers/Icebarn-trepidation02.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - イーヴのテーマ", url: "./public/music/CrossSeekers/Eeve4.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - ボス戦", url: "./public/music/CrossSeekers/boss5_3_mid.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - 洞窟 (通常)", url: "./public/music/CrossSeekers/ForgottenIllusions-ambient.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - 洞窟 (戦闘)", url: "./public/music/CrossSeekers/ForgottenIllusions-assault.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - 教会", url: "./public/music/CrossSeekers/notation.mp3" },
    { album: "Cross Seekers", label: "Cross Seekers - 遺跡 (通常)", url: "./public/music/CrossSeekers/myth-valorous02.wav" },
    { album: "Cross Seekers", label: "Cross Seekers - 遺跡 (戦闘)", url: "./public/music/CrossSeekers/myth-trepidation02.wav" },
    { album: "Cross Seekers", label: "Cross Seekers - 記憶の道", url: "./public/music/CrossSeekers/Sorcery2.mp3" },

    { album: "Mimikopi", label: "FFTA2 - ルッソ", url: "./public/music/Mimikopi/Luso2-1.wav" },
    { album: "Mimikopi", label: "FFTA2 - 緑の風", url: "./public/music/Mimikopi/緑の風_7.mp3" },
    { album: "Mimikopi", label: "FFTA2 - 丘を越えて", url: "./public/music/Mimikopi/丘を越えて.mp3" },
    { album: "Mimikopi", label: "FFTA - 希望への戦い", url: "./public/music/Mimikopi/BattleOfHope2.mp3" },
    { album: "Mimikopi", label: "FFTA - 異世界イヴァリース", url: "./public/music/Mimikopi/異世界イヴァリース6.mp3" },
    { album: "Mimikopi", label: "FFTA - 種族をこえた仲間たち", url: "./public/music/Mimikopi/CompanionsThatSurpassedTheirTribe.mp3" },
    { album: "Mimikopi", label: "FFTA - 苦しい戦い", url: "./public/music/Mimikopi/苦しい戦い2-04.wav" },
    { album: "Mimikopi", label: "FFTA - 荒野の向こう", url: "./public/music/Mimikopi/荒野の向こう.mp3" },
    { album: "Mimikopi", label: "FFTA - 集まる仲間たち", url: "./public/music/Mimikopi/集まる仲間たち8.wav" },
    { album: "Mimikopi", label: "FFTA - 白い花", url: "./public/music/Mimikopi/白い花22-4.mp3" },
    { album: "Mimikopi", label: "FFT - Remnants (づんづん)", url: "./public/music/Mimikopi/Remnants_3.mp3" },
    { album: "Mimikopi", label: "FFT - Trisection (突撃軍曹)", url: "./public/music/Mimikopi/Trisection02.mp3" },

    { album: "3rd Life", label: "3rd Life - 古紙の香り (1章 動き出す世界 ファタ・モルガナ雨林 非戦闘エリア曲)", url: "./public/music/3rdLife/119-SmellOfTheOldStory2.mp3" },
    { album: "3rd Life", label: "3rd Life - 悠久の緑 (1章 動き出す世界 ファタ・モルガナ雨林 フィールド曲)", url: "./public/music/3rdLife/117-Permanent Green.mp3" },
    { album: "3rd Life", label: "3rd Life - 緑の怪物 (1章 動き出す世界 ファタ・モルガナ雨林 戦闘曲)", url: "./public/music/Ghost/089-Lime Green Convertion.mp3" },
    { album: "3rd Life", label: "3rd Life - 川下り (1章 動き出す世界 ウェール原生林 フィールド曲)", url: "./public/music/3rdLife/127-rainforest.mp3" },
    { album: "3rd Life", label: "3rd Life - 灼熱の道 (2章 静かな躍動 プルルムラウム化石地域 フィールド曲)", url: "./public/music/3rdLife/idea64-4-IncandecsentTrail.mp3" },
    { album: "3rd Life", label: "3rd Life - 重機協奏 (2章 静かな躍動 山岳都市エブル 非戦闘エリア曲)", url: "./public/music/3rdLife/idea48-The Shaft.mp3" },
    { album: "3rd Life", label: "3rd Life - 地底湖 (2章 静かな躍動 プラキド火山 フィールド曲)", url: "./public/music/3rdLife/124-AlongTheLakeside.mp3" },
    { album: "3rd Life", label: "3rd Life - 心の声 (中ボス戦闘曲)", url: "./public/music/Ghost/058-Mind Reading.mp3" },
    { album: "3rd Life", label: "3rd Life - 山の血潮 (2章 静かな躍動 プラキド火山 フィールド曲)", url: "./public/music/3rdLife/126-Ravine.mp3" },
    { album: "3rd Life", label: "3rd Life - 銀沙灘 (3章 失われた色 アラケル銀山地区 非戦闘エリア曲)", url: "./public/music/Ghost/115-Ginshadan.mp3" },
    { album: "3rd Life", label: "3rd Life - 霊峰 (3章 失われた色 カエルラ上層地殻変動地帯 フィールド曲)", url: "./public/music/3rdLife/122-Monotonous.mp3" },
    { album: "3rd Life", label: "3rd Life - 青い眼の狼 (3章 失われた色 カエルラ上層地殻変動地帯 戦闘曲)", url: "./public/music/Ghost/204-Big Room House 2.mp3" },
    { album: "3rd Life", label: "3rd Life - 旧坑道 (3章 失われた色 アルジンタム鉱山遺跡 フィールド曲)", url: "./public/music/3rdLife/418-QuietDynamism.mp3" },
    { album: "3rd Life", label: "3rd Life - 水晶の森 (4章 光望む岬 鳴瑰𥔎 フィールド曲)", url: "./public/music/3rdLife/idea54-Crystal Woods.mp3" },
    { album: "3rd Life", label: "3rd Life - 千本鳥居 (4章 光望む岬 非天城塞 フィールド曲)", url: "./public/music/3rdLife/120-ToriiSequence.mp3" },
    { album: "3rd Life", label: "3rd Life - 魂の通り道 (4章 光望む岬 非天城塞 フィールド曲)", url: "./public/music/Ghost/003-FortOfTheSun.mp3" },
    { album: "3rd Life", label: "3rd Life - 絡繰り人形 (4章 光望む岬 非天城塞 戦闘曲)", url: "./public/music/Ghost/247-Robots(Hiten).mp3" },
    { album: "3rd Life", label: "3rd Life - 曇った鏡 (5章 守人の願い 修道院残影 フィールド曲)", url: "./public/music/3rdLife/121-DazzlingMirror.mp3" },
    { album: "3rd Life", label: "3rd Life - 守人の願い (5章 守人の願い 修道院残影 フィールド曲)", url: "./public/music/3rdLife/206-Spring.mp3" },
    { album: "3rd Life", label: "3rd Life - 見えざる者 (5章 守人の願い 修道院残影 戦闘曲)", url: "./public/music/Ghost/246-Something Soul.mp3" },
    { album: "3rd Life", label: "3rd Life - 日常？ (6章 忘れないで アエテルヌム中枢都市 フィールド曲)", url: "./public/music/3rdLife/125-Henge.mp3" },
    { album: "3rd Life", label: "3rd Life - 月に触れる (6章 忘れないで ポール フィールド曲)", url: "./public/music/Ghost/107-Dont touch the moon 02.mp3" },

  ];

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // 曲が変わったらロードし直し、自動再生
  useEffect(() => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.load(audioFiles[currentTrack].url);
    // 直前が再生中なら自動再生
    if (isPlaying) {
      wavesurferRef.current.once('ready', () => {
        wavesurferRef.current && wavesurferRef.current.play();
      });
    } else {
      setIsPlaying(false);
    }
  }, [currentTrack]);

  // 再生終了時に次の曲またはリピート
  useEffect(() => {
    if (!wavesurferRef.current) return;
    const ws = wavesurferRef.current;
    const onFinish = () => {
      if (isRepeat) {
        ws.play(0);
      } else {
        handleNext();
      }
    };
    ws.on('finish', onFinish);
    return () => {
      ws.un('finish', onFinish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack, isRepeat]);
  // 1曲リピートボタン
  const RepeatButton = ({
    isRepeat,
    onToggle,
  }: {
    isRepeat: boolean;
    onToggle: () => void;
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
    wavesurfer.load(audioFiles[0].url);
    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // 次の曲へ
  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % audioFiles.length);
  };

  // 前の曲へ
  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + audioFiles.length) % audioFiles.length);
  };
  // 前の曲ボタン
  const PrevButton = ({
    onPrev,
  }: {
    onPrev: () => void;
  }) => (
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

  // 次の曲ボタン
  const NextButton = ({
    onNext,
  }: {
    onNext: () => void;
  }) => (
    <button
      className="w-12 cursor-pointer duration-300 bg-yellow-800/80 hover:bg-yellow-600 text-yellow-200 font-bold py-2 px-2 rounded-xl"
      onClick={onNext}
      aria-label="Next"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="7,6 17,12 7,18" />
        <rect x="17" y="6" width="2" height="12" />
      </svg>
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
              <VolumeControl />
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
                  className={`duration-300 en-regular cursor-pointer text-left px-2 py-1 rounded hover:bg-yellow-700/60 ${audioFiles[currentTrack].album === album ? 'bg-yellow-700 text-yellow-200' : 'text-yellow-200'}`}
                  onClick={() => {
                    // アルバムの最初の曲にジャンプ
                    const idx = audioFiles.findIndex(f => f.album === album);
                    if (idx !== -1) setCurrentTrack(idx);
                  }}
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
                .filter(f => f.album === audioFiles[currentTrack].album)
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
