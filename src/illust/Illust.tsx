import React from 'react';
import Background from './background.jpg';
import BackgroundImage from '../common/BackgroundImage';
import Gallery from '../common/Gallery';
import { getGalleryItems } from '../common/getGalleryItems';

const Illust: React.FC = () => {
    const items = getGalleryItems('illust');
    return (
        <>
            <BackgroundImage background={Background} />
            <Gallery items={items} />
        </>
    );
};

export default Illust;