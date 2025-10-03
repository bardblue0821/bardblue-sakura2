import React, { useState, useCallback, useEffect, useRef } from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import Gallery from '../common/Gallery';
import { ImageItem } from '../common/types';
import { getGalleryItems } from '../common/getGalleryItems';

const Video: React.FC = () => {
  return (
    <>
      <BackgroundImage background={Background} />
      <div 
        className="text-yellow-200 h-full w-full gap-y-8 px-8 flex flex-col items-center"
        style={{ animationDelay: '600ms', animationDuration: '600ms', animationFillMode: 'forwards', animationTimingFunction: 'ease-in-out' }}
      >
        <div className=" overflow-auto h-full w-full flex flex-col items-center">
          <div className="bg-yellow-900/20 p-8 mb-20 rounded">
            <h2 className="text-6xl font-bold en-regular text-center mt-4 mb-8">Memory</h2>
            <iframe width="800" height="600" src="https://www.youtube.com/embed/RvaPThXT60Y?si=tTy04KJmWuY4fDTl" title="YouTube video player"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div className="bg-yellow-900/20 p-8 mb-20 rounded">
            <h2 className="text-6xl font-bold en-regular text-center mt-4 mb-8">Produce</h2>
            <iframe width="800" height="600" src="https://www.youtube.com/embed/oG6Tvvl14Oc?si=FliisG9Hjiyz5RwI" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div className="bg-yellow-900/20 p-8 mb-20 rounded">
            <h2 className="text-6xl font-bold en-regular text-center mt-4 mb-8">Original Songs</h2>
            <iframe className="mb-8" width="800" height="600" src="https://www.youtube.com/embed/HzF5YPdYmPg?si=vwnent-qBL4KVn7x" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe className="mb-8" width="800" height="600" src="https://www.youtube.com/embed/bYWDVllh_Fk?si=MramALzv4si08OMf" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div className="bg-yellow-900/20 p-8 mb-20 rounded">
            <h2 className="text-6xl font-bold en-regular text-center mt-4 mb-8">Remasters</h2>
            <iframe className="mb-8" width="800" height="600" src="https://www.youtube.com/embed/DXuIa02iOe8?si=3HdUdGIS4URz1ErR" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe className="mb-8" width="800" height="600" src="https://www.youtube.com/embed/XK15WGexEFE?si=awbOL_zA6LNz3H7s" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe className="" width="800" height="600" src="https://www.youtube.com/embed/0cMPRHHizbM?si=Bd73L0BN82obzAU2" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div> 
      </div>
    </>
  );
};

export default Video;