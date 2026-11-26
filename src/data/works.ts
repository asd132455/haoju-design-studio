import { readdirSync } from 'node:fs';
import { join } from 'node:path';

export type WorkCategory = {
  slug: string;
  title: string;
};

export type WorkItem = {
  category: string;
  title: string;
  image: string;
  alt: string;
  videoUrl?: string;
};

export const categories: WorkCategory[] = [
  {
    slug: 'ecommerce',
    title: '電商視覺',
  },
  {
    slug: 'social',
    title: '社群視覺',
  },
  {
    slug: 'sales-page',
    title: '銷售頁',
  },
  {
    slug: 'graphic-design',
    title: '平面設計',
  },
  {
    slug: 'video',
    title: '影片製作',
  },
];

const worksRoot = join(process.cwd(), 'public', 'images', 'works');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

// Existing filenames keep their original editorial titles and order until they are renamed.
const existingWorkDetails: Record<string, Pick<WorkItem, 'title' | 'alt'>> = {
  'ecommerce/1200x628_140k.jpg': { title: 'ALBION 白神水活動視覺', alt: 'ALBION 白神水電商活動橫幅設計' },
  'ecommerce/190225亞立詩_500x500.jpg': { title: 'ALUXE 海外婚禮博覽會', alt: 'ALUXE 海外婚禮博覽會電商視覺' },
  'ecommerce/190225果物配.jpg': { title: '果物配｜荔枝季主視覺', alt: '果物配荔枝季電商主視覺' },
  'social/IG模板2_01.jpg': { title: 'Bobo Choses｜社群視覺 01', alt: 'Bobo Choses 社群視覺作品一' },
  'social/IG模板2_07.jpg': { title: 'STATE｜社群視覺 02', alt: 'STATE 社群視覺作品二' },
  'social/IG模板2_12.jpg': { title: 'Bobo Choses｜社群視覺 03', alt: 'Bobo Choses 社群視覺作品三' },
  'sales-page/MK_-EDM_0914_03.jpg': { title: '服飾品牌銷售頁 01', alt: '服飾品牌商品銷售頁設計一' },
  'sales-page/MK_-EDM_0914_06.jpg': { title: '服飾品牌銷售頁 02', alt: '服飾品牌商品銷售頁設計二' },
  'sales-page/MK_EDM_0908_03.jpg': { title: '服飾品牌銷售頁 03', alt: '服飾品牌商品銷售頁設計三' },
  'graphic-design/200317益富.jpg': { title: '益富品牌平面設計 01', alt: '益富營養補給主題平面設計作品一' },
  'graphic-design/200317益富02.jpg': { title: '益富品牌平面設計 02', alt: '益富健康主題平面設計作品二' },
  'graphic-design/200317益富03.jpg': { title: '益富品牌平面設計 03', alt: '益富品牌平面設計作品三' },
  'video/好聚資訊頁1.jpg': { title: '好聚品牌影片封面 01', alt: '好聚品牌影片封面作品一' },
  'video/好聚資訊頁2.jpg': { title: '好聚品牌影片封面 02', alt: '好聚品牌影片封面作品二' },
  'video/好聚資訊頁3.jpg': { title: '好聚品牌影片封面 03', alt: '好聚品牌影片封面作品三' },
};

const existingOrder = Object.keys(existingWorkDetails);
const getSequence = (filename: string) => {
  const match = filename.match(/^(\d+)[-_]/);
  return match ? Number(match[1]) : null;
};
const getTitleFromFilename = (filename: string, categoryTitle: string, sequence: number | null) => {
  const stem = filename.replace(/\.[^.]+$/, '');
  const name = stem.replace(/^\d+[-_]+/, '').replace(/[-_]+/g, ' ').trim();
  return name || `${categoryTitle}作品 ${sequence ?? ''}`.trim();
};

export const works: WorkItem[] = categories.flatMap((category) => {
  const folder = join(worksRoot, category.slug);
  let filenames: string[] = [];

  try {
    filenames = readdirSync(folder).filter((filename) => imageExtensions.has(filename.slice(filename.lastIndexOf('.')).toLowerCase()));
  } catch {
    // An empty category folder is valid; it simply has no work cards yet.
  }

  filenames.sort((a, b) => {
    const sequenceA = getSequence(a);
    const sequenceB = getSequence(b);
    if (sequenceA !== null && sequenceB !== null) return sequenceB - sequenceA || a.localeCompare(b, 'zh-Hant');
    if (sequenceA !== null) return -1;
    if (sequenceB !== null) return 1;

    const legacyA = existingOrder.indexOf(`${category.slug}/${a}`);
    const legacyB = existingOrder.indexOf(`${category.slug}/${b}`);
    if (legacyA !== -1 && legacyB !== -1) return legacyA - legacyB;
    if (legacyA !== -1) return -1;
    if (legacyB !== -1) return 1;
    return a.localeCompare(b, 'zh-Hant');
  });

  return filenames.map((filename) => {
    const sequence = getSequence(filename);
    const details = existingWorkDetails[`${category.slug}/${filename}`];
    const title = details?.title ?? getTitleFromFilename(filename, category.title, sequence);
    return {
      category: category.slug,
      title,
      image: `/images/works/${category.slug}/${encodeURIComponent(filename)}`,
      alt: details?.alt ?? `${title}｜${category.title}作品`,
    };
  });
});

export const services = [
  {
    category: 'ecommerce',
    title: '電商視覺',
    descriptor: '整體視覺規劃',
    examples: 'BANNER・商品圖・EDM',
    image: works.filter((work) => work.category === 'ecommerce')[1].image,
    alt: '電商視覺服務作品預覽',
  },
  {
    category: 'social',
    title: '社群視覺',
    descriptor: '品牌社群設計',
    examples: '貼文・廣告圖・LINE 選單',
    image: works.filter((work) => work.category === 'social')[1].image,
    alt: '社群視覺服務作品預覽',
  },
  {
    category: 'sales-page',
    title: '銷售頁',
    descriptor: '商品銷售視覺',
    examples: '商品長頁・活動頁',
    image: works.filter((work) => work.category === 'sales-page')[1].image,
    alt: '銷售頁服務作品預覽',
  },
  {
    category: 'graphic-design',
    title: '平面設計',
    descriptor: '品牌平面視覺',
    examples: 'DM・海報・印刷品',
    image: works.filter((work) => work.category === 'graphic-design')[1].image,
    alt: '平面設計服務作品預覽',
  },
  {
    category: 'video',
    title: '影片製作',
    descriptor: '品牌影音設計',
    examples: '品牌短片・影音剪輯・影像後製',
    image: works.find((work) => work.category === 'video')!.image,
    alt: '影片製作服務作品預覽',
  },
];
