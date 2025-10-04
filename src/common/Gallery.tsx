import React, { useRef, useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import GalleryImageModal from './GalleryImageModal';

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

const Gallery: React.FC<{ json: imgJson[] }> = ({ json }) => {

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const handleImgClick = (idx: number) => {
    setSelectedIndex(idx);
  };

  const handleClose = () => {
    if (selectedIndex !== null && imgRefs.current[selectedIndex]) {
      imgRefs.current[selectedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setSelectedIndex(null);
  };

  return (
    <div className="px-8 py-4 h-full w-full overflow-auto">
      <Masonry
        breakpointCols={{ default: 5, 1200: 3, 900: 2, 600: 1 }}
        className="flex gap-8"
        columnClassName=""
      >
        {json && json.map((img: imgJson, idx: number) => (
          <img
            key={img.filename}
            src={img.thumb}
            alt={img.filename}
            className="w-full mb-8 transition-transform rounded duration-200 hover:scale-105 cursor-pointer"
            onClick={() => handleImgClick(idx)}
            ref={el => { imgRefs.current[idx] = el; }}
            loading="lazy"
          />
        ))}
      </Masonry>

      {selectedIndex !== null && (
        <GalleryImageModal
          json={json}
          currentIndex={selectedIndex}
          setCurrentIndex={setSelectedIndex}
          onClose={handleClose}
        />
      )}

    </div>
  );
};

export default Gallery;