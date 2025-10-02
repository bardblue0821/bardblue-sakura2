import { ImageItem } from './types';

// 各カテゴリごとにglobをリテラルで用意
const vrchatImages = import.meta.glob('../vrchat/photo/*.{png,jpg,jpeg,gif,webp}', { eager: true, import: 'default' });
const musicImages  = import.meta.glob('../music/photo/*.{png,jpg,jpeg,gif,webp}', { eager: true, import: 'default' });
const illustImages = import.meta.glob('../illust/photo/*.{png,jpg,jpeg,gif,webp}', { eager: true, import: 'default' });

/**
 * カテゴリを指定して画像リストを取得
 * @param type 'vrchat' | 'music' | 'illust'
 */
export function getGalleryItems(type: 'vrchat' | 'music' | 'illust' = 'vrchat'): ImageItem[] {
  const images = type === 'vrchat' ? vrchatImages
    : type === 'music' ? musicImages
    : illustImages;
  return Object.entries(images).map(([path, url]) => {
    const filename = path.split('/').pop() || '';
    return { url: url as string, filename };
  });
}
