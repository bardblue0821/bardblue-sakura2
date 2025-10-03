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
      <Gallery items={items} />
    </>
  );
};

export default Video;