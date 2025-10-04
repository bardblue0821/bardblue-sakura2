import React from 'react';
import Background from './background.png';
import BackgroundImage from '../common/BackgroundImage';
import Gallery from '../common/Gallery';
import getJsonVrchat from "./getJsonVrchat";
import { imgJson } from '../type';

const Vrchat: React.FC = () => {
  const json: imgJson[] = getJsonVrchat();

  return (
    <>
      <BackgroundImage background={Background} />
      <Gallery json={json} />
    </>
  );
};

export default Vrchat;