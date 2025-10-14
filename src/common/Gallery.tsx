import React, { useRef, useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import GalleryImageModal from './GalleryImageModal';

import { imgJson } from '../type';

type GalleryProps = {
  json: imgJson[];
  onImageClick: (imageName: string) => void;
};

const Gallery: React.FC<GalleryProps> = ({ json, onImageClick }) => {
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // yearごとにグループ化
  const grouped: { [year: string]: imgJson[] } = {};
  json.forEach(img => {
    const year = img.year ? String(img.year) : '';
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(img);
  });

  // 並び順 state
  const [orderDesc, setOrderDesc] = useState(false); // true:新しい順, false:古い順
  const years = Object.keys(grouped).sort((a, b) => orderDesc ? b.localeCompare(a) : a.localeCompare(b));

  return (
    <div className="h-[90vh] overflow-hidden">
      <div className="w-full flex justify-end gap-4">
        <button
          className="text-yellow-700/80 hover:text-yellow-200 cursor-pointer duration-300"
          onClick={() => setOrderDesc(!orderDesc)}
        >
          {orderDesc ? '▼' : '▲'}
        </button>
      </div>
      <div className="h-[80vh] px-2 mt-2 w-full overflow-auto">
        {years.map(year => (
          <div key={year} className="mb-8">
            <div className="text-9xl font-bold en-bold text-yellow-200/90 mb-4">{year}</div>
            <Masonry
              breakpointCols={{ default: 5, 1200: 4, 900: 2, 600: 1 }}
              className="flex gap-2"
              columnClassName=""
            >
              {grouped[year].map((img: imgJson, idx: number) => (
                <div key={img.filename} className="relative">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div> {/* プレースホルダー */}
                  <img
                    src={img.thumb ?? undefined}
                    alt={img.filename}
                    className="w-full mb-2 transition-transform duration-300 hover:scale-105 cursor-pointer hover:grayscale-20 grayscale-50"
                    onClick={() => onImageClick(img.filename)}
                    ref={el => { imgRefs.current[json.indexOf(img)] = el; }}
                    loading="lazy"
                  />
                </div>
              ))}
            </Masonry>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;