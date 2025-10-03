import React, { useState, useCallback, useEffect } from 'react';
import { ImageItem, ImageModalProps } from './types';

const ImageModal: React.FC<ImageModalProps> = ({ items, index, onClose, setIndex }) => {
  const [wheelLocked, setWheelLocked] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setIndex(idx => (idx - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setIndex(idx => (idx + 1) % items.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, setIndex, items.length]);

  function handleWheel(e: React.WheelEvent) {
    if (wheelLocked) return;
    setWheelLocked(true);
    setTimeout(() => setWheelLocked(false), 100);
    if (e.deltaY > 0) {
      setIndex((index + 1) % items.length);
    } else if (e.deltaY < 0) {
      setIndex((index - 1 + items.length) % items.length);
    }
  }

  function goPrev(e: React.MouseEvent) {
    e.stopPropagation();
    setIndex((index - 1 + items.length) % items.length);
  }
  function goNext(e: React.MouseEvent) {
    e.stopPropagation();
    setIndex((index + 1) % items.length);
  }

  const twButton="absolute top-1/2 -translate-y-1/2 bg-yellow-900/80 hover:bg-yellow-700/90 duration-300 cursor-pointer text-yellow-500 rounded-full w-10 h-10 flex items-center justify-center text-2xl select-none";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      onWheel={handleWheel}
    >
      <button
        className={twButton + " left-4 z-60 shadow-lg border border-yellow-700"}
        onClick={goPrev}
        aria-label="前の画像"
        tabIndex={0}
      >
        ◀
      </button>
      <img
        src={items[index].url}
        alt={items[index].filename}
        className={`max-w-[90vw] max-h-[90vh] rounded shadow-lg transition-all duration-300 ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      />
      <button
        className={twButton + " right-4 z-60 shadow-lg border border-yellow-700"}
        onClick={goNext}
        aria-label="次の画像"
        tabIndex={0}
      >
        ▶
      </button>
    </div>
  );
};

export default ImageModal;
