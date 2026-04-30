"use client";

import { useMemo, useState } from "react";

import type { RegistrationRecord, RegistrationStatus } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

// 報名列表的搜尋、狀態篩選、刪除確認 UI。
// 資料由伺服器端傳入，表單送出時仍走 /api/admin/registrations/[id]。
const statusOptions: Array<{ label: string; value: RegistrationStatus }> = [
  { label: "新報名", value: "new" },
  { label: "已聯絡", value: "contacted" },
  { label: "已確認", value: "confirmed" },
  { label: "已取消", value: "cancelled" },
];

const statusLabels: Record<RegistrationStatus, string> = {
  new: "新報名",
  contacted: "已聯絡",
  confirmed: "已確認",
  cancelled: "已取消",
};

const statusBadgeClass: Record<RegistrationStatus, string> = {
  new: "bg-amber-100 text-amber-800",
  contacted: "bg-sky-100 text-sky-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-stone-200 text-stone-700",
};

interface Props {
  registrations: RegistrationRecord[];
}

export function RegistrationsBoard({ registrations }: Props) {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | RegistrationStatus>("all");
  const [activityFilter, setActivityFilter] = useState<string>("all");

  const activityTitles = useMemo(() => {
    const set = new Set<string>();
    registrations.forEach((item) => {
      if (item.activityTitle) set.add(item.activityTitle);
    });
    return Array.from(set);
  }, [registrations]);

  const counts = useMemo(() => {
    const base: Record<RegistrationStatus, number> = {
      new: 0,
      contacted: 0,
      confirmed: 0,
      cancelled: 0,
    };
    registrations.forEach((item) => {
      base[item.status] += 1;
    });
    return base;
  }, [registrations]);

  const filtered = useMemo(() => {
    const keywordLower = keyword.trim().toLowerCase();
    return registrations.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (activityFilter !== "all" && item.activityTitle !== activityFilter) return false;
      if (!keywordLower) return true;
      const haystack = [
        item.name,
        item.email,
        item.phone,
        item.lineId,
        item.activityTitle,
        item.paymentStatus,
        item.employmentStatus,
        item.companionNames,
        item.needs,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(keywordLower);
    });
  }, [registrations, keyword, statusFilter, activityFilter]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-lg border border-forest-200 bg-white p-4 md:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs font-semibold text-forest-700 md:col-span-2">
          搜尋（姓名 / Email / 電話 / 活動 / 備註）
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="輸入關鍵字…"
            className="admin-input"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-forest-700">
          狀態
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "all" | RegistrationStatus)}
            className="admin-select"
          >
            <option value="all">全部狀態</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}（{counts[option.value]}）
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-semibold text-forest-700">
          活動
          <select
            value={activityFilter}
            onChange={(event) => setActivityFilter(event.target.value)}
            className="admin-select"
          >
            <option value="all">全部活動</option>
            {activityTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-forest-700">
        <span>顯示 {filtered.length} / {registrations.length} 筆</span>
        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setStatusFilter(statusFilter === option.value ? "all" : option.value)}
            className={`rounded-lg px-3 py-1 font-semibold transition ${
              statusFilter === option.value
                ? "bg-forest-800 text-white"
                : `${statusBadgeClass[option.value]} hover:opacity-80`
            }`}
          >
            {option.label} {counts[option.value]}
          </button>
        ))}
        {(keyword || statusFilter !== "all" || activityFilter !== "all") ? (
          <button
            type="button"
            onClick={() => {
              setKeyword("");
              setStatusFilter("all");
              setActivityFilter("all");
            }}
            className="rounded-lg border border-forest-200 px-3 py-1 font-semibold text-forest-700 hover:bg-forest-50"
          >
            清除條件
          </button>
        ) : null}
      </div>

      {filtered.length ? (
        <div className="space-y-4">
          {filtered.map((registration) => (
            <article
              key={registration.id}
              className="rounded-lg border border-forest-200 bg-white p-5"
            >
              <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr_260px]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-lg px-3 py-1 text-xs font-semibold ${statusBadgeClass[registration.status]}`}
                    >
                      {statusLabels[registration.status]}
                    </span>
                    <p className="text-sm text-forest-700/70">
                      {formatDateTime(registration.createdAt)}
                    </p>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-forest-900">
                    {registration.activityTitle}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-forest-700/82">
                    {registration.ticketType}
                  </p>
                </div>

                <div className="grid gap-2 text-sm leading-7 text-forest-800">
                  <p>
                    <span className="font-semibold">姓名：</span>
                    {registration.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email：</span>
                    <a href={`mailto:${registration.email}`} className="text-forest-700 underline">
                      {registration.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">電話：</span>
                    <a href={`tel:${registration.phone}`} className="text-forest-700 underline">
                      {registration.phone}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">人數：</span>
                    {registration.participants}
                  </p>
                  {registration.lineId ? (
                    <p>
                      <span className="font-semibold">Line ID：</span>
                      {registration.lineId}
                    </p>
                  ) : null}
                  {registration.paymentStatus ? (
                    <p>
                      <span className="font-semibold">繳費狀態：</span>
                      {registration.paymentStatus}
                    </p>
                  ) : null}
                  {registration.employmentStatus ? (
                    <p>
                      <span className="font-semibold">身份：</span>
                      {registration.employmentStatus}
                    </p>
                  ) : null}
                  {registration.companionNames ? (
                    <p>
                      <span className="font-semibold">同行者：</span>
                      {registration.companionNames}
                    </p>
                  ) : null}
                </div>

                <form
                  action={`/api/admin/registrations/${registration.id}`}
                  method="post"
                  onSubmit={(event) => {
                    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
                    if (submitter?.value === "delete") {
                      const ok = window.confirm(
                        `確定要刪除「${registration.name}」的報名紀錄嗎？此動作無法復原。`,
                      );
                      if (!ok) event.preventDefault();
                    }
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="admin-label">處理狀態</label>
                    <select
                      name="status"
                      defaultValue={registration.status}
                      className="admin-select"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="w-full rounded-lg bg-forest-700 px-4 py-3 text-sm font-semibold text-white hover:bg-forest-600">
                    更新狀態
                  </button>
                  <button
                    name="intent"
                    value="delete"
                    className="w-full rounded-lg border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    刪除
                  </button>
                </form>
              </div>

              {(registration.experience || registration.source || registration.needs) ? (
                <div className="mt-5 grid gap-3 rounded-lg bg-forest-50 p-4 text-sm leading-7 text-forest-700 md:grid-cols-3">
                  {registration.experience ? <p>經驗：{registration.experience}</p> : null}
                  {registration.source ? <p>來源：{registration.source}</p> : null}
                  {registration.needs ? <p className="md:col-span-3">備註：{registration.needs}</p> : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-forest-200 bg-white p-8 text-center">
          <p className="text-lg font-semibold text-forest-900">
            {registrations.length === 0 ? "目前還沒有報名資料" : "沒有符合條件的報名"}
          </p>
          <p className="mt-2 text-sm text-forest-700/78">
            {registrations.length === 0
              ? "前台活動詳情頁送出表單後，資料會出現在這裡。"
              : "試著調整搜尋字或篩選條件。"}
          </p>
        </div>
      )}
    </div>
  );
}
