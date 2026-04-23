# 鳥類導航：引導您進入鳥類的奇妙世界

這是以 Next.js App Router + Tailwind CSS 重建的「鳥類導航：引導您進入鳥類的奇妙世界」網站。前台內容使用原站可取得的文字與 Wix 圖片 URL，鳥類資料整理在 JSON 中，後台可登入後新增、編輯、刪除鳥類資料與既有 CMS 內容。

## 原站結構分析

- 首頁：導覽列、主視覺、最新消息、關於我、願景 / 目標 / 目前參與人數、都市鳥類導覽活動流程、導覽活動開箱、導覽活動系列、訂閱、聯絡資訊。
- 導覽列：主頁、導覽日記、都會公園導覽活動、看更多觀鳥人作品。
- 都會公園導覽內容頁：常見鳥種認識、介紹如何辨識相似鳥種、公園導覽、學習單複盤。
- 賞鳥報名頁：關渡自然公園都市鳥類導覽活動、日期與集合地點、注意事項、鳥種、費用、時間、學習內容、帶領人員、訂閱表單。
- 鳥類資料呈現方式：首頁以卡片式 grid 顯示，支援搜尋、棲地篩選、分類篩選，點擊後展開詳細資訊。
- 每張卡片欄位：中文鳥名、英文鳥名、圖片、簡短介紹、棲地、分類、觀察地點、詳細說明、原站文字來源、tags。

## 路由

- 前台：`/`、`/journal`、`/journal/[slug]`、`/activities`、`/activities/[id]`、`/services`、`/portfolio`、`/contact`
- 後台：`/admin/login`、`/admin/dashboard`、`/admin/birds`、`/admin/homepage`、`/admin/posts`、`/admin/activities`、`/admin/services`、`/admin/registrations`、`/admin/portfolio`、`/admin/gallery`、`/admin/subscribers`、`/admin/settings`、`/admin/account`
- API：`/api/admin/birds`、`/api/admin/birds/[id]`、既有活動、貼文、作品、報名與訂閱 API

## 鳥類 JSON

鳥類資料位於 `data/birds.json`，欄位如下：

```json
{
  "id": "bird-malayan-night-heron",
  "name": "黑冠麻鷺",
  "englishName": "Malayan Night Heron",
  "image": "https://static.wixstatic.com/media/017155_196f50f62746449ea2ac7774943f77a5~mv2.jpg",
  "galleryImages": [],
  "description": "簡短介紹",
  "detailedDescription": "詳細資訊",
  "habitat": ["都市", "草地"],
  "category": "行為觀察",
  "observationPoint": "中正紀念公園、都市公園草地",
  "sourceText": "原站文字來源",
  "tags": ["黑冠麻鷺探險家"],
  "createdAt": "2026-04-23T00:00:00.000Z",
  "updatedAt": "2026-04-23T00:00:00.000Z"
}
```

## 後台帳號

- Username: `admin`
- Password: `birding2026`

登入後可到 `/admin/birds` 管理鳥類資料，也可到 `/admin/account` 修改帳號密碼。

## 本機啟動

```bash
npm install
npm run dev
```

## Cloudflare Pages 部署

1. 將專案推到 GitHub。
2. 在 Cloudflare Pages 建立新專案，連接這個 GitHub repository。
3. Framework preset 選 `Next.js`。
4. Build command 填 `npm run build`。
5. Build output directory 依 Cloudflare Next.js adapter 指示設定，使用 Pages 的 Next.js preset 時通常不需手動更改。
6. Environment variables 加上：
   - `ADMIN_SESSION_SECRET`：任意長隨機字串
7. 部署完成後，之後每次 push 到 GitHub main branch 都會自動更新。

## Vercel 部署

目前專案也可直接部署在 Vercel。GitHub main branch 更新後，Vercel 會自動重新部署。
