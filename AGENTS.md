# 好聚設計官網｜專案工作指引

## 專案目標
- 為「好聚設計」打造繁體中文優先的平面設計師／設計工作室官網，清楚呈現服務、作品與聯絡方式。
- 網站以作品圖片與清楚的編排為主，載入快速、手機易讀，並可直接部署至 Cloudflare Pages。

## 技術與結構
- 使用 Astro 靜態輸出；預設不加入前端框架或不必要的 JavaScript。
- 頁面放在 `src/pages/`，共用版型放在 `src/layouts/`，可重用介面放在 `src/components/`，全站樣式放在 `src/styles/`。
- 作品資料集中放在 `src/data/`；可公開的圖片與字型放在 `public/`。
- 維持繁體中文（台灣）文案與 `zh-Hant-TW` 語系。未取得的客戶名稱、案例成效、聯絡資料不可自行杜撰，使用清楚的待補標記。

## 設計與品質
- 遵循 `.agents/skills/design-studio-site/SKILL.md` 的設計工作流程。
- 先理解頁面目的與內容，再決定視覺；避免套版感、無意義裝飾、假案例與佔位 lorem ipsum。
- 支援窄螢幕，保持文字對比、鍵盤操作、清楚焦點樣式、語意化 HTML 及圖片替代文字。
- 優先使用原生 HTML、CSS 與 Astro；新增依賴前先確認確實需要。
- 圖片應壓縮並提供合適尺寸，避免將大型原始設計檔放進網站輸出。

## 本機與部署
- `npm run dev` 啟動本機預覽；`npm run build` 產生部署檔案至 `dist/`。
- Cloudflare Pages 的建置指令為 `npm run build`，輸出目錄為 `dist`，正式分支預設為 `main`。
- 靜態網站不安裝 Cloudflare adapter。只有確定需要伺服器渲染或 Cloudflare bindings 時才評估改用 Workers/adapter。
- 不在程式碼或 Git 中提交 API 金鑰、密碼或私人環境變數。
