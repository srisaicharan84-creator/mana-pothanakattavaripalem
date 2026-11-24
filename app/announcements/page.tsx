"use client";

import { useState } from "react";
import Link from "next/link";

type NoticeCategory = "all" | "meetings" | "festivals" | "welfare" | "alerts";

interface NoticeItem {
  id: string;
  category: Exclude<NoticeCategory, "all">;
  date: string;
  title: string;
  venue: string;
  details: string;
  issuedBy: string;
}

export default function AnnouncementsPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [selectedCategory, setSelectedCategory] =
    useState<NoticeCategory>("all");

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
          backHome: "← Back to Home",
          eyebrow: "Village Announcements & Notices",
          pageTitle: "Stay Informed. Stay Connected.",
          pageSubtitle:
            "Verified village notices, Gram Sabha schedules, temple celebrations, welfare camps, and civic updates for Pothanakattavaripalem.",

          boardEyebrow: "Notice Board",
          boardTitle: "Latest Village Notices & Events",
          boardNotice:
            "Only verified village notices and confirmed event schedules are published here so residents receive accurate information.",

          categories: [
            { key: "all" as NoticeCategory, label: "All Notices" },
            {
              key: "meetings" as NoticeCategory,
              label: "🏛️ Gram Sabha & Meetings",
            },
            {
              key: "festivals" as NoticeCategory,
              label: "🪔 Festivals & Events",
            },
            {
              key: "welfare" as NoticeCategory,
              label: "📋 Welfare & Camps",
            },
            { key: "alerts" as NoticeCategory, label: "🔔 Civic Alerts" },
          ],

          categoryLabels: {
            meetings: "Gram Sabha & Meetings",
            festivals: "Festivals & Events",
            welfare: "Welfare & Camps",
            alerts: "Civic Alerts",
          },

          venueLabel: "Location",
          issuedLabel: "Source",

          emptyTitle: "No announcements published yet",
          emptyDesc:
            "Verified village meetings, festival schedules, and important community notices will appear here as soon as they are confirmed.",

          // Empty list until real village announcements are added
          notices: [] as NoticeItem[],

          typesEyebrow: "What Gets Published",
          typesTitle: "Announcement Categories",
          typesSubtitle:
            "Notices on this board are organized into four clear categories for quick reading on mobile phones.",
          typesList: [
            {
              icon: "🏛️",
              title: "Gram Sabha & Meetings",
              desc: "Dates, times, and agendas for village meetings and community discussions.",
            },
            {
              icon: "🪔",
              title: "Festivals & Temple Events",
              desc: "Local jatara dates, temple rituals, cultural programs, and community gatherings.",
            },
            {
              icon: "📋",
              title: "Welfare & Health Camps",
              desc: "Medical camps, pension updates, agricultural advisories, and student notices.",
            },
            {
              icon: "🔔",
              title: "Water & Power Alerts",
              desc: "Scheduled maintenance notices for drinking water supply, electricity, or road work.",
            },
          ],

          footerTagline: "Our Village. Our Information. Our Community.",
          footerNote1: "Independent community information initiative.",
          footerNote2: "Not an official Gram Panchayat website.",
          footerCopyright: "© 2026 Mana Pothanakattavaripalem",
        }
      : {
          siteName: "మన పొతనకట్టవారిపాలెం",
          siteSubName: "Mana Pothanakattavaripalem",
          backHome: "← హోమ్ పేజీకి తిరిగి వెళ్ళండి",
          eyebrow: "గ్రామ ప్రకటనలు & నోటీసులు",
          pageTitle: "సమాచారంతో ఉండండి. కలిసి నడుద్దాం.",
          pageSubtitle:
            "పొతనకట్టవారిపాలెం గ్రామ నోటీసులు, గ్రామ సభల వివరాలు, ఆలయ వేడుకలు, సంక్షేమ శిబిరాలు మరియు ముఖ్య సమాచార ప్రకటనలు.",

          boardEyebrow: "నోటీసు బోర్డు",
          boardTitle: "తాజా గ్రామ ప్రకటనలు & కార్యక్రమాలు",
          boardNotice:
            "గ్రామస్థులకు ఖచ్చితమైన సమాచారం అందేలా ధృవీకరించబడిన గ్రామ నోటీసులు మరియు కార్యక్రమాల వివరాలు మాత్రమే ఇక్కడ ప్రచురించబడతాయి.",

          categories: [
            { key: "all" as NoticeCategory, label: "అన్ని ప్రకటనలు" },
            {
              key: "meetings" as NoticeCategory,
              label: "🏛️ గ్రామ సభ & సమావేశాలు",
            },
            {
              key: "festivals" as NoticeCategory,
              label: "🪔 పండుగలు & వేడుకలు",
            },
            {
              key: "welfare" as NoticeCategory,
              label: "📋 సంక్షేమ & వైద్య శిబిరాలు",
            },
            {
              key: "alerts" as NoticeCategory,
              label: "🔔 ముఖ్య హెచ్చరికలు",
            },
          ],

          categoryLabels: {
            meetings: "గ్రామ సభ & సమావేశాలు",
            festivals: "పండుగలు & వేడుకలు",
            welfare: "సంక్షేమ & వైద్య శిబిరాలు",
            alerts: "ముఖ్య హెచ్చరికలు",
          },

          venueLabel: "వేదిక",
          issuedLabel: "మూలం",

          emptyTitle: "ఇప్పటివరకు ఎటువంటి ప్రకటనలు ప్రచురించబడలేదు",
          emptyDesc:
            "ధృవీకరించబడిన గ్రామ సమావేశాలు, పండుగల తేదీలు మరియు ముఖ్యమైన సమాచార ప్రకటనలు నిర్ధారించబడిన వెంటనే ఇక్కడ కనిపిస్తాయి.",

          notices: [] as NoticeItem[],

          typesEyebrow: "ప్రచురించబడే సమాచారం",
          typesTitle: "ప్రకటనల విభాగాలు",
          typesSubtitle:
            "మొబైల్ ఫోన్‌లలో సులభంగా చదవడానికి నోటీసులు నాలుగు ముఖ్య విభాగాలుగా వర్గీకరించబడ్డాయి.",
          typesList: [
            {
              icon: "🏛️",
              title: "గ్రామ సభ & సమావేశాలు",
              desc: "గ్రామ సభలు మరియు సామాజిక సమావేశాల తేదీలు, సమయం మరియు చర్చా అంశాలు.",
            },
            {
              icon: "🪔",
              title: "పండుగలు & ఆలయ వేడుకలు",
              desc: "స్థానిక జాతరలు, ఆలయ ఉత్సవాలు, సాంస్కృతిక కార్యక్రమాలు మరియు వేడుకల వివరాలు.",
            },
            {
              icon: "📋",
              title: "సంక్షేమ & ఆరోగ్య శిబిరాలు",
              desc: "ఉచిత వైద్య శిబిరాలు, పింఛన్ల సమాచారం, వ్యవసాయ సూచనలు మరియు విద్యార్థుల నోటీసులు.",
            },
            {
              icon: "🔔",
              title: "నీరు & విద్యుత్ సమాచారం",
              desc: "తాగునీటి సరఫరా, విద్యుత్ మరమ్మతులు లేదా రహదారి పనుల ముందస్తు సమాచారం.",
            },
          ],

          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerNote1: "స్వతంత్ర గ్రామ సమాచార వేదిక.",
          footerNote2: "ఇది అధికారిక గ్రామ పంచాయతీ వెబ్‌సైట్ కాదు.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  const filteredNotices =
    selectedCategory === "all"
      ? t.notices
      : t.notices.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-[#e4d2a7] bg-[#fff8e9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#245c3c] text-2xl">
              🌿
            </div>
            <div>
              <p className="text-base font-bold tracking-tight sm:text-lg">
                {t.siteName}
              </p>
              <p className="text-xs text-[#718071]">{t.siteSubName}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "te" : "en")}
              aria-label="Switch language between English and Telugu"
              className="rounded-full border border-[#d5b77d] bg-white/80 px-4 py-2 text-sm font-bold text-[#24543b] transition hover:bg-[#f5e8c9]"
            >
              {language === "en" ? "తెలుగు" : "English"}
            </button>

            <Link
              href="/"
              className="rounded-full bg-[#245c3c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#17462c]"
            >
              {t.backHome}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-[#24543b] px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <span className="inline-block rounded-full border border-[#e8d6a6]/40 bg-[#e8d6a6]/10 px-4 py-1.5 text-sm text-[#f5e8c9]">
            📢 {t.eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#fff8e9] md:text-5xl">
            {t.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#f0eadb]">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Notice Board Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
          {t.boardEyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">{t.boardTitle}</h2>

        <div className="mt-4 rounded-2xl border border-[#e4d2a7] bg-[#fff8e9] px-5 py-3.5 text-sm leading-6 text-[#6b5c3e]">
          ℹ️ {t.boardNotice}
        </div>

        {/* Category Filter Pills */}
        <div className="mt-7 flex flex-wrap gap-2.5">
          {t.categories.map((cat) => {
            const active = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#245c3c] text-white shadow-sm"
                    : "border border-[#d5dfd2] bg-white text-[#203b2d] hover:bg-[#edf3e8]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Empty State or Notices List */}
        {filteredNotices.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-[#e4e9df] bg-white p-10 text-center shadow-sm">
            <p className="text-4xl">📢</p>
            <h3 className="mt-4 text-lg font-bold text-[#203b2d]">
              {t.emptyTitle}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#69776a]">
              {t.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {filteredNotices.map((notice) => (
              <article
                key={notice.id}
                className="rounded-2xl border border-[#e4e9df] bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-[#edf3e8] px-3 py-1 text-xs font-bold text-[#24543b]">
                    {t.categoryLabels[notice.category]}
                  </span>
                  <span className="text-xs font-semibold text-[#748174]">
                    {notice.date}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-[#203b2d]">
                  {notice.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#69776a]">
                  {notice.details}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 border-t border-[#eef2ea] pt-3 text-xs text-[#748174]">
                  <span>
                    <strong>{t.venueLabel}:</strong> {notice.venue}
                  </span>
                  <span>
                    <strong>{t.issuedLabel}:</strong> {notice.issuedBy}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Announcement Categories Overview */}
      <section className="bg-[#edf3e8] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
            {t.typesEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">{t.typesTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5e6e5f]">
            {t.typesSubtitle}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.typesList.map((item) => (
              <div
                key={item.icon + item.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf3e8] text-2xl">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#69776a]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#173f2b] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 md:flex-row">
          <div>
            <p className="text-xl font-bold">{t.siteName}</p>
            <p className="mt-2 text-sm text-[#c6d7c4]">{t.siteSubName}</p>
            <p className="mt-4 text-sm text-[#c6d7c4]">{t.footerTagline}</p>
          </div>
          <div className="text-sm leading-7 text-[#c6d7c4]">
            <p>{t.footerNote1}</p>
            <p>{t.footerNote2}</p>
            <p className="mt-2">{t.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}