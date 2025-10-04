import React from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import Gallery from '../common/Gallery';
import getJsonIllust from "./getJsonIllust";
import { imgJson } from '../type';

const Illust: React.FC = () => {
    const json: imgJson[] = getJsonIllust();

    return (
        <>
            <BackgroundImage background={Background} />
            <Gallery json={json} />
        </>
    );
};

export default Illust;