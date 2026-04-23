"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { BirdRecord } from "@/lib/types";

interface BirdGuideRebuildProps {
  birds: BirdRecord[];
}

const habitats = ["全部", "森林", "都市", "濕地", "海洋", "草地"];

const galleryImages = [
  {
    image: "https://static.wixstatic.com/media/017155_3911f89a8e3846449a66de82417002c6~mv2.jpg",
    caption: "在木柵動物園帶領大家去賞鳥。",
  },
  {
    image: "https://static.wixstatic.com/media/017155_64583eb3f6334f7bbfbdef9e0f50090d~mv2.jpg",
    caption: "正在帶領大家觀賞綠簑鴿的鳥巢。",
  },
  {
    image: "https://static.wixstatic.com/media/017155_e9ca2f01033a421e8f3d7be7d4fef874~mv2.jpg",
    caption: "正在帶領大家認識木柵鳥園的鳥類。",
  },
  {
    image: "https://static.wixstatic.com/media/017155_cd1c65a24c7f427daebff27abcf4a527~mv2.jpg",
    caption: "我用圖片的方式，請大家找找看小白鷺、黃頭鷺、中白鷺和大白鷺有無繁殖期的顏色差異。",
  },
  {
    image: "https://static.wixstatic.com/media/017155_8d19a63bc35c492ba5cfb87e86bbc54a~mv2.jpg",
    caption: "在活動的尾端，正在帶領大家寫學習單，複習今天學到的鳥種和知識。",
  },
  {
    image: "https://static.wixstatic.com/media/017155_fe8ebdceba964c1888260866fc482d2c~mv2.jpg",
    caption: "在中正紀念公園觀察黑冠麻鷺行為的影像。",
  },
];

const flowItems = [
  {
    step: "1",
    title: "常見鳥種認識",
    content:
      "運用看板和照片的方式，與大家介紹在都市常見的鳥類，如：喜鵲和五色鳥，讓大家外出散心時，可以透過賞鳥來自己辨識鳥類。",
  },
  {
    step: "2",
    title: "介紹如何辨識相似鳥種",
    content:
      "我也會透過看板的方式，來跟大家介紹在都市常見的相似鳥種，如：家八哥和白尾八哥、大白鷺和中白鷺的差異，讓大家了解每種鳥類的特徵。",
  },
  {
    step: "3",
    title: "公園導覽",
    content:
      "跟大家介紹完都市常見鳥之後，會開始帶大家到園區走走，實際透過賞鳥的方式，複習剛剛介紹的鳥種，與相似鳥類的差異。",
  },
  {
    step: "4",
    title: "學習單複盤",
    content:
      "透過猜謎和繪畫的方式，幫大家複習剛剛帶大家認識的鳥種和特徵，加深大家對鳥類的印象。",
  },
];

const learningItems = [
  "學習如何看鳥類圖鑑（新）",
  "認識賞鳥小屋（新）",
  "常見相似鳥類差異",
  "認識關渡自然公園的鳥類生態",
  "認識鳥的行為與習性",
  "認識台灣冬候鳥",
];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function BirdGuideRebuild({ birds }: BirdGuideRebuildProps) {
  const [query, setQuery] = useState("");
  const [habitat, setHabitat] = useState("全部");
  const [category, setCategory] = useState("全部");
  const [selectedBird, setSelectedBird] = useState<BirdRecord | null>(null);

  const categories = useMemo(
    () => ["全部", ...Array.from(new Set(birds.map((bird) => bird.category)))],
    [birds],
  );

  const filteredBirds = useMemo(() => {
    const search = normalize(query);

    return birds.filter((bird) => {
      const matchesQuery =
        !search ||
        normalize(bird.name).includes(search) ||
        normalize(bird.englishName).includes(search) ||
        normalize(bird.description).includes(search) ||
        bird.tags.some((tag) => normalize(tag).includes(search));
      const matchesHabitat = habitat === "全部" || bird.habitat.includes(habitat);
      const matchesCategory = category === "全部" || bird.category === category;

      return matchesQuery && matchesHabitat && matchesCategory;
    });
  }, [birds, category, habitat, query]);

  return (
    <div className="min-h-screen bg-[#f7fbf8] text-[#1d2f28]">
      <header className="sticky top-0 z-40 border-b border-forest-100 bg-white/92 backdrop-blur-xl">
        <div className="content-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-forest-800 text-lg font-bold text-white">
              鳥
            </span>
            <span>
              <span className="block text-xl font-bold">鳥類導航：引導您進入鳥類的奇妙世界</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-forest-800">
            <a href="#home" className="rounded-lg px-3 py-2 hover:bg-forest-50">主頁</a>
            <Link href="/journal" className="rounded-lg px-3 py-2 hover:bg-forest-50">導覽日記</Link>
            <Link href="/activities" className="rounded-lg px-3 py-2 hover:bg-forest-50">都會公園導覽活動</Link>
            <Link href="/portfolio" className="rounded-lg px-3 py-2 hover:bg-forest-50">看更多觀鳥人作品</Link>
            <a href="#contact" className="rounded-lg px-3 py-2 hover:bg-forest-50">聯絡資訊</a>
            <Link href="/activities/guandu-birding-2025-01-18" className="rounded-lg bg-forest-800 px-4 py-2.5 text-white hover:bg-forest-700">
              我要報名活動
            </Link>
          </nav>
        </div>
      </header>

      <main id="home">
        <section
          className="relative min-h-[76svh] overflow-hidden bg-cover bg-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(7, 28, 20, 0.78), rgba(7, 28, 20, 0.36)), url(https://static.wixstatic.com/media/017155_3c9b61eeb30b4ca993ff5419cb13e6d7~mv2.jpg)",
          }}
        >
          <div className="content-shell flex min-h-[76svh] items-center py-16">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b8f17b]">
                Bird Guide
              </p>
              <h1 className="mt-5 text-5xl font-bold leading-tight md:text-7xl">
                鳥類導航：
                <br />
                引導您進入鳥類的奇妙世界
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-white/86">
                透過都市公園賞鳥、行為觀察和導覽活動，重新看見鳥類的棲地、特徵和家族行為。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#birds" className="rounded-lg bg-[#b8f17b] px-5 py-3 font-semibold text-forest-900">
                  搜尋鳥類資料
                </a>
                <a href="#register" className="rounded-lg border border-white/55 px-5 py-3 font-semibold text-white">
                  查看報名資訊
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-forest-100 bg-white py-7">
          <div className="content-shell grid gap-4 md:grid-cols-[220px_1fr_auto] md:items-center">
            <p className="text-2xl font-bold text-forest-900">最新消息</p>
            <p className="text-forest-700">2025.1.18（六）14:00 在關渡自然公園舉辦都市鳥類導覽活動。</p>
            <Link href="/activities/guandu-birding-2025-01-18" className="rounded-lg bg-forest-800 px-4 py-3 text-center text-sm font-semibold text-white">
              查看更多
            </Link>
          </div>
        </section>

        <section className="section-space bg-[#f7fbf8]">
          <div className="content-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="overflow-hidden rounded-lg shadow-card">
              <img
                src="https://static.wixstatic.com/media/017155_51de381a988142c992eb6fb77255872f~mv2.jpeg"
                alt="觀鳥人"
                className="h-[420px] w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-forest-600">About</p>
              <h2 className="mt-4 text-4xl font-bold text-forest-900">關於我</h2>
              <p className="mt-5 leading-8 text-forest-800">
                大家好我是觀鳥人，對於賞鳥和登山有興趣。之前運用 YouTube 頻道跟大家介紹鳥類的特徵和知識，後來決定舉辦賞鳥導覽活動，帶大家去都市公園賞鳥，介紹鳥類的棲息地、特徵和行為，讓更多人可以賞鳥，也能欣賞整個環境和家族的行為。
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["願景", "改變大家對鳥類的想像"],
                  ["目標", "讓大家對鳥類產生興趣"],
                  ["目前參與人數", "87 人"],
                ].map(([title, content]) => (
                  <div key={title} className="rounded-lg border border-forest-100 bg-white p-5 shadow-soft">
                    <p className="text-2xl">✦</p>
                    <h3 className="mt-4 font-bold text-forest-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-forest-700">{content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="content-shell">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-forest-600">Tour Flow</p>
              <h2 className="mt-4 text-4xl font-bold text-forest-900">都市鳥類導覽活動流程</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {flowItems.map((item) => (
                <article key={item.step} className="rounded-lg border border-forest-100 bg-[#f7fbf8] p-6">
                  <p className="grid h-10 w-10 place-items-center rounded-lg bg-forest-800 font-bold text-white">
                    {item.step}
                  </p>
                  <h3 className="mt-5 text-xl font-bold text-forest-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-forest-700">{item.content}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="birds" className="section-space bg-[#eef6f9]">
          <div className="content-shell">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-forest-600">Bird Data</p>
                <h2 className="mt-4 text-4xl font-bold text-forest-900">鳥類資料</h2>
                <p className="mt-4 leading-8 text-forest-700">
                  依照原站出現的鳥種、活動文字和圖片整理，可搜尋鳥名，也能依棲地與分類篩選。
                </p>
              </div>
              <div className="rounded-lg border border-forest-100 bg-white p-4 shadow-soft">
                <label className="block text-sm font-semibold text-forest-800" htmlFor="bird-search">
                  搜尋鳥名
                </label>
                <input
                  id="bird-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="輸入黑冠麻鷺、五色鳥、egret..."
                  className="mt-2 w-full rounded-lg border border-forest-200 px-4 py-3 outline-none focus:border-forest-600"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {habitats.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setHabitat(item)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
                    habitat === item
                      ? "border-forest-800 bg-forest-800 text-white"
                      : "border-forest-200 bg-white text-forest-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
                    category === item
                      ? "border-[#2d8fb7] bg-[#2d8fb7] text-white"
                      : "border-forest-200 bg-white text-forest-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm font-semibold text-forest-700">
              目前顯示 {filteredBirds.length} 筆，共 {birds.length} 筆鳥類資料。
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredBirds.map((bird) => (
                <article key={bird.id} className="overflow-hidden rounded-lg bg-white shadow-card">
                  <div className="aspect-[4/3] overflow-hidden bg-forest-100">
                    <img src={bird.image} alt={bird.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-lg bg-forest-50 px-3 py-1 text-xs font-bold text-forest-800">
                        {bird.category}
                      </span>
                      {bird.habitat.map((item) => (
                        <span key={item} className="rounded-lg bg-[#eef6f9] px-3 py-1 text-xs font-bold text-[#226b87]">
                          {item}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-forest-900">{bird.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-forest-600">{bird.englishName}</p>
                    <p className="mt-4 min-h-[76px] text-sm leading-7 text-forest-700">{bird.description}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedBird(bird)}
                      className="mt-5 w-full rounded-lg bg-forest-800 px-4 py-3 text-sm font-semibold text-white"
                    >
                      展開詳細資訊
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {!filteredBirds.length ? (
              <div className="mt-8 rounded-lg border border-forest-100 bg-white p-8 text-center text-forest-700">
                沒有符合條件的鳥類，請調整搜尋或篩選。
              </div>
            ) : null}
          </div>
        </section>

        <section id="register" className="section-space bg-white">
          <div className="content-shell grid gap-8 lg:grid-cols-[1fr_0.86fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-forest-600">Registration</p>
              <h2 className="mt-4 text-4xl font-bold text-forest-900">關渡自然公園都市鳥類導覽活動</h2>
              <p className="mt-5 leading-8 text-forest-700">
                1/18 即將帶大家導覽關渡自然公園的鳥類，地點位於捷運關渡站。跟大家介紹台灣的冬候鳥，與公園常見的鳥類。另外還會教大家如何看圖鑑的技巧和認識賞鳥小屋。
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["日期與集合地點", "1/18（六）下午 14:00 於關渡自然公園集合"],
                  ["費用", "成人 200 元/每人，小孩免費（需要一位家長同行）"],
                  ["鳥種", "大白鷺、小白鷺、黃頭鷺、蒼鷺、夜鷺、紅冠水雞、白腹秧雞、翠鳥、紅鳩、高翹鴴、青足鷸、磯鷸、小水鴨、花嘴鴨、尖尾鴨、白冠雞、棕背伯勞。"],
                  ["注意事項", "當天的活動照片會分享給大家，若不想露臉請事先告知。天氣不佳將取消並補辦一次。"],
                ].map(([title, content]) => (
                  <div key={title} className="rounded-lg border border-forest-100 bg-[#f7fbf8] p-5">
                    <h3 className="font-bold text-forest-900">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-forest-700">{content}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="rounded-lg border border-forest-100 bg-[#eef6f9] p-6">
              <h3 className="text-2xl font-bold text-forest-900">學習內容</h3>
              <div className="mt-5 space-y-3">
                {learningItems.map((item) => (
                  <p key={item} className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-forest-800">
                    {item}
                  </p>
                ))}
              </div>
              <Link href="/activities/guandu-birding-2025-01-18" className="mt-6 flex rounded-lg bg-forest-800 px-4 py-3 text-center text-sm font-semibold text-white">
                開啟本站報名表單
              </Link>
            </aside>
          </div>
        </section>

        <section className="section-space bg-[#f7fbf8]">
          <div className="content-shell">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-forest-600">Gallery</p>
                <h2 className="mt-4 text-4xl font-bold text-forest-900">導覽活動開箱</h2>
              </div>
              <p className="max-w-xl leading-8 text-forest-700">
                觀鳥人的導覽活動系列包含都會公園賞鳥活動與黑冠麻鷺探險家，活動照片會分享給大家，也會上傳到社群媒體。
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {galleryImages.map((item) => (
                <figure key={item.image} className="overflow-hidden rounded-lg bg-white shadow-soft">
                  <img src={item.image} alt={item.caption} className="h-72 w-full object-cover" />
                  <figcaption className="p-4 text-sm leading-6 text-forest-700">{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="content-shell grid gap-6 md:grid-cols-2">
            {[
              {
                title: "都會公園賞鳥活動",
                image: "https://static.wixstatic.com/media/017155_7c8b0326097948a4a36415485e86d9ac~mv2.jpg",
                content: "大安森林公園、青年公園和木柵動物園＿鳥園，來跟大家進行導覽。",
              },
              {
                title: "黑冠麻鷺探險家",
                image: "https://static.wixstatic.com/media/017155_b0c7d18bd45b4961987bef38dbd348b8~mv2.jpg",
                content: "紀錄黑冠麻鷺在雨天、草地、夜晚和公園環境中的行為。",
              },
            ].map((item) => (
              <article key={item.title} className="relative min-h-[420px] overflow-hidden rounded-lg bg-cover bg-center text-white shadow-card" style={{ backgroundImage: `linear-gradient(180deg, rgba(7, 28, 20, 0.08), rgba(7, 28, 20, 0.78)), url(${item.image})` }}>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="text-3xl font-bold">{item.title}</h3>
                  <p className="mt-4 leading-8 text-white/88">{item.content}</p>
                  <Link href="/activities" className="mt-5 inline-flex rounded-lg bg-white px-4 py-3 text-sm font-semibold text-forest-900">
                    查看更多
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-forest-900 py-16 text-white">
          <div className="content-shell grid gap-6 md:grid-cols-[1fr_420px] md:items-center">
            <div>
              <h2 className="text-4xl font-bold">訂閱我的導覽活動網站，馬上收到最新的消息～</h2>
              <p className="mt-4 text-white/72">正在籌備中。留下 Email，收到下一次賞鳥活動消息。</p>
            </div>
            <form action="/api/subscribe" method="post" className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                name="email"
                type="email"
                required
                placeholder="Enter your email here"
                className="rounded-lg border border-white/18 bg-white px-4 py-3 text-forest-900 outline-none"
              />
              <button className="rounded-lg bg-[#b8f17b] px-5 py-3 font-semibold text-forest-900">
                Sign Up
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-white">
        <div className="content-shell flex flex-col gap-4 py-8 text-sm text-forest-700 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-bold text-forest-900">鳥類導航：引導您進入鳥類的奇妙世界</p>
            <p className="mt-2">聯絡資訊 masonyeh031@gmail.com</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="mailto:masonyeh031@gmail.com" className="font-semibold text-forest-900">
              Email
            </a>
            <Link href="/admin/login" className="text-xs text-forest-500">
              後台登入
            </Link>
            <p>©2024 鳥類導航 版權所有。</p>
          </div>
        </div>
      </footer>

      {selectedBird ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#071c14]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="mx-auto my-8 max-w-4xl overflow-hidden rounded-lg bg-white shadow-card">
            <div className="grid gap-0 lg:grid-cols-[0.94fr_1.06fr]">
              <div className="bg-forest-50 p-4">
                <img src={selectedBird.image} alt={selectedBird.name} className="h-80 w-full rounded-lg object-cover" />
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {selectedBird.galleryImages.slice(0, 6).map((image) => (
                    <img key={image} src={image} alt={selectedBird.name} className="h-24 w-full rounded-lg object-cover" />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#2d8fb7]">{selectedBird.category}</p>
                    <h2 className="mt-2 text-3xl font-bold text-forest-900">{selectedBird.name}</h2>
                    <p className="mt-1 text-forest-600">{selectedBird.englishName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBird(null)}
                    className="rounded-lg border border-forest-200 px-3 py-2 text-sm font-semibold text-forest-800"
                  >
                    關閉
                  </button>
                </div>
                <p className="mt-6 leading-8 text-forest-800">{selectedBird.detailedDescription}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-forest-100 p-4">
                    <p className="text-sm font-bold text-forest-900">棲地</p>
                    <p className="mt-2 text-sm text-forest-700">{selectedBird.habitat.join(" / ")}</p>
                  </div>
                  <div className="rounded-lg border border-forest-100 p-4">
                    <p className="text-sm font-bold text-forest-900">觀察地點</p>
                    <p className="mt-2 text-sm text-forest-700">{selectedBird.observationPoint}</p>
                  </div>
                </div>
                <div className="mt-5 rounded-lg bg-[#eef6f9] p-4">
                  <p className="text-sm font-bold text-forest-900">原站文字來源</p>
                  <p className="mt-2 text-sm leading-7 text-forest-700">{selectedBird.sourceText}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedBird.tags.map((tag) => (
                    <span key={tag} className="rounded-lg bg-forest-50 px-3 py-1 text-xs font-bold text-forest-700">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
