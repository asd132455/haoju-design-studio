# 好聚設計｜官方網站

以 Astro 製作的平面設計師／設計工作室作品集官網，預設輸出為靜態網站，適合透過 GitHub 連接 Cloudflare Pages 發布。

## 開始使用

需要 Node.js 22 或更新版本。

```bash
npm install
npm run dev
```

本機預覽網址會顯示在終端機。完成後可用以下指令產生正式網站：

```bash
npm run build
```

建置結果位於 `dist/`。

## Cloudflare Pages 設定

- Production branch：`main`
- Build command：`npm run build`
- Build output directory：`dist`

在 Cloudflare Pages 匯入 GitHub 儲存庫後，後續推送至 GitHub 的更新會觸發重新建置與發布。

## 專案地圖

```text
src/
  components/   共用介面元件
  data/         作品、分類與服務資料
  layouts/      頁面共用版型
  pages/        首頁、作品總覽與各分類頁
  styles/       全站樣式
public/
  images/brand/ 好聚品牌識別
  images/works/ 分類作品圖片與燈箱素材
  fonts/        自有或已授權字型
```

Codex 專案 Skills 放在本機 `.agents/skills/`，不包含在 GitHub 儲存庫中。

專案約定請參考根目錄 `AGENTS.md`。開始設計內容前，請補上實際作品、服務、品牌介紹與聯絡資訊。

## 目前網站內容

- 首頁包含品牌主張、四個服務入口、精選作品、工作室介紹與 LINE 聯絡按鈕。
- 作品區分為電商視覺、社群視覺、銷售頁、平面設計與影片製作；每張作品圖都可點開燈箱檢視。
- 影片分類目前先使用封面圖，影片連結待補。
- 設計師簡介使用可替換的佔位文字。
