import React, { useState, useCallback, useEffect, useRef } from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';

const Video: React.FC = () => {
  return (
    <>
      <BackgroundImage background={Background} />
      <div 
        className="text-yellow-200 h-full w-full px-8 flex flex-col items-center"
        style={{ animationDelay: '600ms', animationDuration: '600ms', animationFillMode: 'forwards', animationTimingFunction: 'ease-in-out' }}
      >
        <div className=" overflow-auto h-full w-full max-w-[1200px] gap-y-12 flex flex-col items-center">
          <div className=" w-full p-8 rounded">
            <h2 className="text-6xl font-bold en-regular text-center mt-4 mb-8">Memory</h2>
            <iframe className="w-full min-h-[70vh]" src="https://www.youtube.com/embed/RvaPThXT60Y?si=tTy04KJmWuY4fDTl" title="YouTube video player"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div className="w-full p-8 rounded">
            <h2 className="text-6xl font-bold en-regular text-center mt-4 mb-8">Produce</h2>
            <iframe className="w-full min-h-[70vh]" src="https://www.youtube.com/embed/oG6Tvvl14Oc?si=FliisG9Hjiyz5RwI" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div className="w-full p-8 rounded">
            <h2 className="text-6xl font-bold en-regular text-center mt-4 mb-8">Original Songs</h2>
            <iframe className="w-full min-h-[70vh] mb-12" src="https://www.youtube.com/embed/HzF5YPdYmPg?si=vwnent-qBL4KVn7x" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe className="w-full min-h-[70vh]" src="https://www.youtube.com/embed/bYWDVllh_Fk?si=MramALzv4si08OMf" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>

          <div className="w-full p-8 rounded">
            <h2 className="text-6xl font-bold en-regular text-center mt-4 mb-8">Remasters</h2>
            <iframe className="w-full min-h-[70vh] mb-12" src="https://www.youtube.com/embed/DXuIa02iOe8?si=3HdUdGIS4URz1ErR" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe className="w-full min-h-[70vh] mb-12" src="https://www.youtube.com/embed/XK15WGexEFE?si=awbOL_zA6LNz3H7s" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe className="w-full min-h-[70vh]" src="https://www.youtube.com/embed/0cMPRHHizbM?si=Bd73L0BN82obzAU2" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div> 
      </div>
    </>
  );
};

export default Video;