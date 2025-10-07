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
                <img
                  key={img.filename}
                  src={img.thumb}
                  alt={img.filename}
                  className="w-full mb-2 transition-transform duration-300 hover:scale-105 cursor-pointer hover:grayscale-20 grayscale-50"
                  onClick={() => handleImgClick(json.indexOf(img))}
                  ref={el => { imgRefs.current[json.indexOf(img)] = el; }}
                  loading="lazy"
                />
              ))}
            </Masonry>
          </div>
        ))}

        {selectedIndex !== null && (
          <GalleryImageModal
            json={json}
            currentIndex={selectedIndex}
            setCurrentIndex={setSelectedIndex}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;