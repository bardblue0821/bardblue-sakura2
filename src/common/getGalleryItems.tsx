import { ImageItem } from './types';

// 各カテゴリごとにglobをリテラルで用意
const vrchatImages = import.meta.glob('../vrchat/photo/*.{png,jpg,jpeg,gif,webp}', { eager: true, import: 'default', as: 'url' });
const musicImages  = import.meta.glob('../music/photo/*.{png,jpg,jpeg,gif,webp}', { eager: true, import: 'default', as: 'url' });
const illustImages = import.meta.glob('../illust/photo/*.{png,jpg,jpeg,gif,webp}', { eager: true, import: 'default', as: 'url' });

/**
 * カテゴリを指定して画像リストを取得
 * @param type 'vrchat' | 'music' | 'illust'
 */
export function getGalleryItems(type: 'vrchat' | 'music' | 'illust' = 'vrchat'): ImageItem[] {
  const images = type === 'vrchat' ? vrchatImages
    : type === 'music' ? musicImages
    : illustImages;
  // ファイル名から日付情報を推測（例: 20231003_123456.jpg など）
  const items = Object.entries(images).map(([path, url]) => {
    const filename = path.split('/').pop() || '';
    // ファイル名に日付が含まれていればパース
    const dateMatch = filename.match(/(\d{8,14})/);
    let date: number | null = null;
    if (dateMatch) {
      // 例: 20231003 or 20231003123456
      const d = dateMatch[1];
      if (d.length === 8) {
        // YYYYMMDD
        date = new Date(d.slice(0,4)+'-'+d.slice(4,6)+'-'+d.slice(6,8)).getTime();
      } else if (d.length === 14) {
        // YYYYMMDDhhmmss
        date = new Date(d.slice(0,4)+'-'+d.slice(4,6)+'-'+d.slice(6,8)+'T'+d.slice(8,10)+':'+d.slice(10,12)+':'+d.slice(12,14)).getTime();
      }
    }
    return { url: url as string, filename, date };
  });
  // 日付があるものは昇順、なければファイル名順
  return items.sort((a, b) => {
    if (a.date && b.date) return a.date - b.date;
    if (a.date) return -1;
    if (b.date) return 1;
    return a.filename.localeCompare(b.filename);
  });
}
