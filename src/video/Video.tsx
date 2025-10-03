/// <reference types="vite/client" />
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Background from './background.png';
import BackgroundImage from '../common/BackgroundImage';
import Gallery from '../common/Gallery';
import { ImageItem } from '../common/types';
import { getGalleryItems } from '../common/getGalleryItems';

// 画像リスト取得
const items: ImageItem[] = getGalleryItems();

const Video: React.FC = () => {

  return (
    <>
      <BackgroundImage background={Background} />
      <div className="text-yellow-200 h-full w-full gap-y-8 px-8 flex flex-col items-center">
        <div className=" overflow-auto h-full w-full gap-y-8 px-8 flex flex-col items-center">
          <div>
            <h2 className="text-6xl font-bold en-regular text-left mt-8">Memory</h2>
          </div>
          <div>
            <iframe width="800" height="600" src="https://www.youtube.com/embed/RvaPThXT60Y?si=tTy04KJmWuY4fDTl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div>
            <h2 className="text-6xl font-bold en-regular text-left mt-8">Produce</h2>
          </div>
          <div>
            <iframe width="800" height="600" src="https://www.youtube.com/embed/oG6Tvvl14Oc?si=FliisG9Hjiyz5RwI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div>
            <h2 className="text-6xl font-bold en-regular text-left mt-8">Original Songs</h2>
          </div>
          <div>
            <iframe width="800" height="600" src="https://www.youtube.com/embed/HzF5YPdYmPg?si=vwnent-qBL4KVn7x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div>
            <iframe width="800" height="600" src="https://www.youtube.com/embed/bYWDVllh_Fk?si=MramALzv4si08OMf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div>
            <h2 className="text-6xl font-bold en-regular text-left mt-8">Remasters</h2>
          </div>
          <div>
            <iframe width="800" height="600" src="https://www.youtube.com/embed/DXuIa02iOe8?si=3HdUdGIS4URz1ErR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div>
            <iframe width="800" height="600" src="https://www.youtube.com/embed/XK15WGexEFE?si=awbOL_zA6LNz3H7s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div>
            <iframe width="800" height="600" src="https://www.youtube.com/embed/0cMPRHHizbM?si=Bd73L0BN82obzAU2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div> 
      </div>
    </>
  );
};

export default Video;