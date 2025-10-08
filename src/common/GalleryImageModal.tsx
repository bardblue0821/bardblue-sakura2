import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { imgJson } from '../type';
import getJsonIllust from '../illust/getJsonIllust';
import getJsonVrchat from '../vrchat/getJsonVrchat';
import ShareButton from './ShareButton';

const GalleryImageModal: React.FC = () => {
  const { imageName } = useParams();
  const navigate = useNavigate();

  const path = window.location.pathname;
  let galleryPath = "";
  if (path.startsWith('/home/vrchat')) { galleryPath = "vrchat"; }
  if (path.startsWith('/home/illust')) { galleryPath = "illust"; }
  
  let json: imgJson[] = [];
  galleryPath === "vrchat" ? json = getJsonVrchat() : 
  galleryPath === "illust" ? json = getJsonIllust() : json = [];

  const currentIndex = json.findIndex(img => img.filename === imageName);
  if (currentIndex === -1) return null;
  const img = json[currentIndex];

  // モーダルの閉じる処理
  const handleClose = () => {
    galleryPath === "vrchat" ? navigate('/home/vrchat') : 
    galleryPath === "illust" ? navigate('/home/illust') : null;
  };

  // 画像切り替え（URLも更新）
  const next = () => {
    if (currentIndex < json.length - 1) {
      navigate(`/home/${galleryPath}/${json[currentIndex + 1].filename}`);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      navigate(`/home/${galleryPath}/${json[currentIndex - 1].filename}`);
    }
  };
  
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

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.deltaY > 0) next();
    if (e.deltaY < 0) prev();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center backdrop-blur justify-center z-50"
      onClick={handleClose}
      onWheel={handleWheel}
    >
      {/* 左ボタン */}
      {currentIndex > 0 && (
        <ChangeImageButton direction="prev" />
      )}
      <div className="min-w-full max-w-full max-h-screen min-h-screen 
        p-8 flex flex-col items-center justify-center">
        <img
          src={`../${img.original}`}
          alt={img.filename}
          className="max-w-[90%] max-h-[90vh] object-contain mx-auto"
          onClick={e => e.stopPropagation()}
        />
        {img.year && (
          <h2 className="text-center text-yellow-200 mt-4">
            {img.year}年 {img.month}月 {img.day}日 {img.hour}時 {img.minute}分 {img.second}秒
          </h2>
        )}
        <ShareButton shareUrl={img.original} />
      </div>
      {/* 右ボタン */}
      {currentIndex < json.length - 1 && (
        <ChangeImageButton direction="next" />
      )}
    </div>
  );
};

export default GalleryImageModal;