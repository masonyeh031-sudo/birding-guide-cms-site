# 賞鳥助手 CMS 網站

這是一個以 Next.js App Router + Tailwind CSS 建立的賞鳥導覽個人品牌網站，包含前台品牌官網與管理員後台 CMS。

## 主要功能

- 前台頁面：`/`、`/journal`、`/journal/[slug]`、`/activities`、`/activities/[id]`、`/services`、`/portfolio`、`/contact`
- 後台頁面：`/admin/login`、`/admin/dashboard`、`/admin/homepage`、`/admin/posts`、`/admin/activities`、`/admin/services`、`/admin/registrations`、`/admin/portfolio`、`/admin/gallery`、`/admin/subscribers`、`/admin/settings`、`/admin/account`
- 管理員帳號密碼登入、登出、密碼更新
- 首頁所有主要區塊可由後台編輯
- 導覽日記 rich text 編輯、草稿 / 發佈狀態
- 活動、服務項目、報名名單、作品集、Gallery、媒體庫、訂閱名單管理
- 活動詳情頁內建報名表單，報名資料會寫入後台報名資訊
- 圖片網址與本機上傳並存，檔案會存到 `public/uploads`
- 前台內容由 `data/*.json` 控制，屬於輕量自建 CMS 方案

## 資料結構對應

專案使用 JSON collection 模擬 CMS/資料表：

- `data/admins.json`
- `data/posts.json`
- `data/activities.json`
- `data/services.json`
- `data/registrations.json`
- `data/homepage-sections.json`
- `data/gallery-items.json`
- `data/portfolio-items.json`
- `data/subscribers.json`
- `data/site-settings.json`
- `data/media-library.json`
- `data/contact-messages.json`

## 預設管理員帳號

- Username: `admin`
- Password: `birding2026`

首次登入後可到 `/admin/account` 修改帳號與密碼。

## 啟動方式

```bash
npm install
npm run dev
```

如果你是在目前這個 workspace 內直接執行，這個子專案的 `package.json` 已經指向上層的 `next` 安裝，可直接執行：

```bash
cd urban-birding-brand-site
npm run dev
```

## 備註

- 目前內容資料以本機 JSON 檔案保存，適合原型、展示站或小型自營品牌站。
- 若要正式上線並支援多人協作，可再把 `lib/content-store.ts` 替換成 Supabase / Firebase / 自建資料庫 API。
