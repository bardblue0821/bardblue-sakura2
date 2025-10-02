import React, { useRef, useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { ImageItem } from './types';
import ImageModal from './ImageModal';


interface GalleryProps {
  items: ImageItem[];
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [asc, setAsc] = useState(true);
  const [modalIdx, setModalIdx] = useState<number>(-1);
  const lastClosedIdx = useRef<number | null>(null);
  const imgRefs = useRef<HTMLImageElement[]>([]);
  const sortedItems = asc ? items : [...items].reverse();

  // モーダルを開く
  function openModal(idx: number) {
    setModalIdx(idx);
  }
  // モーダルを閉じる
  function closeModal() {
    lastClosedIdx.current = modalIdx;
    setModalIdx(-1);
  }

  // モーダルを閉じた直後に該当画像までスクロール
  useEffect(() => {
    if (modalIdx !== -1) return;
    if (lastClosedIdx.current === null) return;
    const ref = imgRefs.current[lastClosedIdx.current];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    lastClosedIdx.current = null;
  }, [modalIdx]);

  return (
    <>
      <div className="px-8 py-4 h-full">
        {/* 昇順/降順スイッチ */}
        <div className="mb-[10px] flex justify-end">
          <button
            className="h-[25px] px-2 py-1 cursor-pointer text-xs bg-yellow-800/80 text-yellow-100 rounded-4xl shadow hover:bg-yellow-700 transition"
            onClick={() => setAsc(a => !a)}
          >
            {asc ? '▼' : '▲'}
          </button>
        </div>
        <div className="overflow-auto h-[calc(100%-35px)] flex-1">
          <Masonry
            breakpointCols={{ default: 5, 1200: 3, 900: 2, 600: 1 }}
            className="flex"
            columnClassName=""
          >
            {sortedItems.map((item, idx) => (
              <div key={item.url} className="rounded p-2 flex justify-center">
                <img
                  ref={el => {
                    imgRefs.current[idx] = el!;
                  }}
                  src={item.url}
                  alt={item.filename}
                  className="w-full h-auto rounded shadow cursor-pointer transition-transform hover:scale-105"
                  loading="lazy"
                  onClick={() => openModal(idx)}
                />
              </div>
            ))}
          </Masonry>
        </div>
      </div>
      {modalIdx !== -1 && (
        <ImageModal
          items={sortedItems}
          index={modalIdx}
          setIndex={setModalIdx}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Gallery;
