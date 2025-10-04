import React, { useState, useCallback, useEffect } from 'react';

type imgJson = {
  filename: string,
  original: string,
  thumb   : string,
  year?   : number,
  month?  : number,
  day?    : number,
  hour?   : number,
  minute? : number,
  second? : number,
};

type GalleryImageModalProps = {
  json: imgJson[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onClose: () => void;
};

const GalleryImageModal: React.FC<GalleryImageModalProps> = ({ json, currentIndex, setCurrentIndex, onClose }) => {
  const img = json[currentIndex];
  const next = () => setCurrentIndex(idx => (idx !== null && idx < json.length - 1 ? idx + 1 : idx));
  const prev = () => setCurrentIndex(idx => (idx !== null && idx > 0 ? idx - 1 : idx));
  const ChangeImageButton: React.FC<{ direction: 'next' | 'prev' }> = ({ direction }) => {
    const tw = direction === 'next' ? 'right-4' : 'left-4';
    const mark = direction === 'next' ? '▶' : '◀';
    return (
      <button
        className={`absolute ${tw} top-1/2 -translate-y-1/2
         bg-yellow-800/70 rounded-full p-2 text-2xl text-yellow-200 shadow hover:bg-yellow-700/70
         duration-300 cursor-pointer`}
        onClick={e => { e.stopPropagation(); direction === 'next' ? next() : prev(); }}
      >
        {mark}
      </button>
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [json.length, onClose, setCurrentIndex]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.deltaY > 0) next();
    if (e.deltaY < 0) prev();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center backdrop-blur justify-center z-50"
      onClick={onClose}
      onWheel={handleWheel}
    >
      {/* 左ボタン */}
      {currentIndex > 0 && (
        <ChangeImageButton direction="prev" />
      )}
      <div className="min-w-full max-w-full max-h-screen min-h-screen 
        p-8 flex flex-col items-center justify-center">
        <img
          src={img.original}
          alt={img.filename}
          className="max-w-[90%] max-h-[90vh] object-contain mx-auto"
          onClick={e => e.stopPropagation()}
        />
        {img.year && (
          <h2 className="text-center text-yellow-200 mt-4">
            {img.year}年 {img.month}月 {img.day}日 {img.hour}時 {img.minute}分 {img.second}秒
          </h2>
        )}
      </div>
      {/* 右ボタン */}
      {currentIndex < json.length - 1 && (
        <ChangeImageButton direction="next" />
      )}
    </div>
  );
};

export default GalleryImageModal;