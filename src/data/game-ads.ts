import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { WorkItem } from './works';

export const gameAdCategories = [
  { slug: 'korean-games', title: '韓系遊戲', folder: 'japanese-korean', filenamePrefix: '韓系' },
  { slug: 'japanese-games', title: '日系遊戲', folder: 'japanese-korean', filenamePrefix: '日系' },
  { slug: 'western-games', title: '歐美遊戲' },
  { slug: 'chinese-games', title: '中式遊戲' },
  { slug: 'illustration-ads', title: '插畫廣告' },
  { slug: 'poster-design', title: '海報設計', folder: 'illustration-posters' },
  { slug: 'novel-ads', title: '小說廣告' },
  { slug: 'video-ads', title: '影片廣告' },
  { slug: 'other', title: '其他' },
] as const;

const gameAdsRoot = join(process.cwd(), 'public', 'images', 'game-ads');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

const readCategoryWorks = (category: (typeof gameAdCategories)[number]): WorkItem[] => {
  const sourceFolder = 'folder' in category ? category.folder : category.slug;
  const folder = join(gameAdsRoot, sourceFolder);
  let filenames: string[] = [];

  try {
    filenames = readdirSync(folder).filter((filename) =>
      imageExtensions.has(filename.slice(filename.lastIndexOf('.')).toLowerCase())
      && (!('filenamePrefix' in category) || filename.startsWith(category.filenamePrefix))
    );
  } catch {
    // An empty category folder is valid; new images will appear after the next build.
  }

  filenames.sort((a, b) => {
    const getSeries = (filename: string) => {
      const stem = filename.replace(/\.[^.]+$/, '');
      const match = stem.match(/^(.*?)(\d+)$/);
      return match ? { name: match[1], number: Number(match[2]) } : { name: stem, number: null };
    };
    const seriesA = getSeries(a);
    const seriesB = getSeries(b);
    const nameOrder = seriesA.name.localeCompare(seriesB.name, 'zh-Hant', { numeric: true });
    if (nameOrder !== 0) return nameOrder;
    if (seriesA.number !== null && seriesB.number !== null) return seriesB.number - seriesA.number;
    return seriesA.number === null ? 1 : -1;
  });

  return filenames.map((filename) => {
    const title = filename.replace(/\.[^.]+$/, '').replace(/^\d+[-_]+/, '').replace(/[-_]+/g, ' ').trim() || category.title;
    return {
      category: category.slug,
      title,
      image: `/images/game-ads/${sourceFolder}/${encodeURIComponent(filename)}`,
      alt: `${title}｜${category.title}作品`,
    };
  });
};

export const gameAdWorks: WorkItem[] = gameAdCategories.flatMap(readCategoryWorks);
