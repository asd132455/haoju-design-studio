import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { WorkItem } from './works';

export const gameAdCategories = [
  { slug: 'korean-games', title: '韓系遊戲' },
  { slug: 'japanese-games', title: '日系遊戲' },
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

const videoAdUrls = [
  'https://youtu.be/AGbS1QfKsso',
  'https://youtu.be/YZf8cTt_C8A',
  'https://youtu.be/tss29nfP4RA',
  'https://youtu.be/Q0x2pc3dYVY',
  'https://youtu.be/NDtLdi8kiGQ',
  'https://youtu.be/smw1kYTFDp8',
  'https://youtu.be/AOP_XaywPGY',
  'https://youtu.be/ZdIDDLSjDio',
  'https://youtu.be/CX18KnxPbrg',
  'https://youtu.be/d508TmnYNs0',
  'https://youtu.be/dJqe_47mTCM',
  'https://youtu.be/OXaaJu2qjDo',
  'https://youtu.be/A6Zej0ZbSHY',
  'https://youtu.be/5Hmx5adVqFg',
];

const getYoutubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
};

const readVideoAdWorks = (): WorkItem[] =>
  videoAdUrls.flatMap((url, index) => {
    const id = getYoutubeId(url);
    if (!id) return [];
    const label = `影片廣告 ${String(index + 1).padStart(2, '0')}`;
    return [{
      category: 'video-ads',
      title: label,
      image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      alt: `${label}｜遊戲廣告影片作品`,
      videoUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&vq=hd1080`,
    }];
  });

const readCategoryWorks = (category: (typeof gameAdCategories)[number]): WorkItem[] => {
  if (category.slug === 'video-ads') return readVideoAdWorks();
  const sourceFolder = 'folder' in category ? category.folder : category.slug;
  const folder = join(gameAdsRoot, sourceFolder);
  let filenames: string[] = [];

  try {
    filenames = readdirSync(folder).filter((filename) =>
      imageExtensions.has(filename.slice(filename.lastIndexOf('.')).toLowerCase())
    );
  } catch {
    // An empty category folder is valid; new images will appear after the next build.
  }

  filenames.sort((a, b) => a.localeCompare(b, 'zh-Hant', { numeric: true }));

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
