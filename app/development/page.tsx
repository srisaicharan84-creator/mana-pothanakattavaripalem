"use client";

import { useState } from "react";
import Link from "next/link";

type StatusFilter = "all" | "ongoing" | "planned" | "completed";

interface ProjectItem {
  id: string;
  status: Exclude<StatusFilter, "all">;
  category: string;
  title: string;
  location: string;
  progress: number;
  fundingSource: string;
  timeline: string;
  description: string;
}

export default function DevelopmentPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
          backHome: "← Back to Home",
          eyebrow: "Village Development Tracker",
          pageTitle: "Tracking Progress. Building Together.",
          pageSubtitle:
            "Follow ongoing infrastructure works, water and drainage improvements, sanitation initiatives, and planned community projects across Pothanakattavaripalem.",

          // Summary Metrics (All 00 until real works are added)
          stats: [
            { label: "Total Works Listed", value: "00", note: "Awaiting verified entries" },
            { label: "In Progress", value: "00", note: "Active works" },
            { label: "Planned / Proposed", value: "00", note: "Upcoming" },
            { label: "Completed", value: "00", note: "Verified finish" },
          ],

          // Filter Section
          trackerEyebrow: "Project Ledger",
          trackerTitle: "Village Works & Progress Updates",
          trackerNotice:
            "Verified village works, sanctioned budgets, and field progress photos will be published here once confirmed.",

          filters: [
            { key: "all" as StatusFilter, label: "All Projects" },
            { key: "ongoing" as StatusFilter, label: "🚧 In Progress" },
            { key: "planned" as StatusFilter, label: "🗓️ Planned" },
            { key: "completed" as StatusFilter, label: "✅ Completed" },
          ],

          statusLabels: {
            ongoing: "🚧 In Progress",
            planned: "🗓️ Planned",
            completed: "✅ Completed",
          },

          progressLabel: "Completion Progress",
          locationLabel: "Area",
          fundingLabel: "Funding",
          timelineLabel: "Timeline",

          emptyTitle: "No development works published yet",
          emptyDesc:
            "Once village works are verified with authentic details, they will appear here under their respective status.",

          // Empty list until real village projects are entered
          projects: [] as ProjectItem[],

          // Focus Areas
          focusEyebrow: "Priority Sectors",
          focusTitle: "Core Development Focus Areas",
          focusSubtitle:
            "Every project tracked on this page is organized into four practical categories for easy monitoring.",
          focusAreas: [
            {
              icon: "🛣️",
              title: "Roads & Connectivity",
              desc: "CC roads, gravel lanes, culvert repairs, and safe village approach paths.",
            },
            {
              icon: "💧",
              title: "Water & Drainage",
              desc: "Overhead tanks, drinking water pipelines, borewells, and stormwater drains.",
            },
            {
              icon: "♻️",
              title: "Sanitation & Lighting",
              desc: "Streetlight maintenance, cleanliness drives, and village waste management.",
            },
            {
              icon: "🏫",
              title: "Schools & Public Spaces",
              desc: "Anganwadi centers, school facilities, temples, and shared community halls.",
            },
          ],

          // Footer
          footerTagline: "Our Village. Our Information. Our Community.",
          footerNote1: "Independent community information initiative.",
          footerNote2: "Not an official Gram Panchayat website.",
          footerCopyright: "© 2026 Mana Pothanakattavaripalem",
        }
      : {
          siteName: "మన పొతనకట్టవారిపాలెం",
          siteSubName: "Mana Pothanakattavaripalem",
          backHome: "← హోమ్ పేజీకి తిరిగి వెళ్ళండి",
          eyebrow: "గ్రామ అభివృద్ధి ట్రాకర్",
          pageTitle: "ప్రగతిని గమనిద్దాం. కలిసి నిర్మిద్దాం.",
          pageSubtitle:
            "పొతనకట్టవారిపాలెంలో జరుగుతున్న మౌలిక సదుపాయాల పనులు, తాగునీరు మరియు డ్రైనేజీ మెరుగుదలలు, పారిశుధ్య కార్యక్రమాలు మరియు రాబోయే ప్రాజెక్టుల వివరాలను తెలుసుకోండి.",

          // Summary Metrics
          stats: [
            { label: "మొత్తం నమోదైన పనులు", value: "00", note: "ధృవీకరించబడిన వివరాలు త్వరలో" },
            { label: "ప్రగతిలో ఉన్నవి", value: "00", note: "కొనసాగుతున్న పనులు" },
            { label: "ప్రతిపాదిత పనులు", value: "00", note: "త్వరలో ప్రారంభం" },
            { label: "పూర్తయినవి", value: "00", note: "ధృవీకరించబడింది" },
          ],

          // Filter Section
          trackerEyebrow: "ప్రాజెక్టుల జాబితా",
          trackerTitle: "గ్రామ అభివృద్ధి పనులు & పురోగతి",
          trackerNotice:
            "ధృవీకరించబడిన గ్రామ అభివృద్ధి పనులు, మంజూరైన నిధులు మరియు క్షేత్రస్థాయి ఫోటోలు నిర్ధారించబడిన తర్వాత ఇక్కడ ప్రచురించబడతాయి.",

          filters: [
            { key: "all" as StatusFilter, label: "అన్ని పనులు" },
            { key: "ongoing" as StatusFilter, label: "🚧 ప్రగతిలో ఉన్నవి" },
            { key: "planned" as StatusFilter, label: "🗓️ ప్రతిపాదిత పనులు" },
            { key: "completed" as StatusFilter, label: "✅ పూర్తయినవి" },
          ],

          statusLabels: {
            ongoing: "🚧 ప్రగతిలో ఉంది",
            planned: "🗓️ ప్రతిపాదించబడింది",
            completed: "✅ పూర్తయింది",
          },

          progressLabel: "పని పురోగతి",
          locationLabel: "ప్రాంతం",
          fundingLabel: "నిధులు",
          timelineLabel: "దశ",

          emptyTitle: "ఇప్పటివరకు ఎటువంటి అభివృద్ధి పనులు ప్రచురించబడలేదు",
          emptyDesc:
            "గ్రామ అభివృద్ధి పనుల వివరాలు ధృవీకరించబడిన తర్వాత అవి వాటి స్థితి ఆధారంగా ఇక్కడ కనిపిస్తాయి.",

          projects: [] as ProjectItem[],

          // Focus Areas
          focusEyebrow: "ప్రాధాన్యతా రంగాలు",
          focusTitle: "ప్రధాన అభివృద్ధి విభాగాలు",
          focusSubtitle:
            "సులభంగా గమనించడానికి ప్రతి పని నాలుగు ముఖ్య విభాగాలుగా వర్గీకరించబడింది.",
          focusAreas: [
            {
              icon: "🛣️",
              title: "రహదారులు & రవాణా",
              desc: "సిసి రోడ్లు, అంతర్గత దారులు, కల్వర్టుల మరమ్మతులు మరియు గ్రామ ప్రధాన రహదారులు.",
            },
            {
              icon: "💧",
              title: "తాగునీరు & డ్రైనేజీ",
              desc: "ఓవర్‌హెడ్ ట్యాంకులు, తాగునీటి పైపులైన్లు, బోరుబావులు మరియు మురుగునీటి కాలువలు.",
            },
            {
              icon: "♻️",
              title: "పారిశుధ్యం & వీధి దీపాలు",
              desc: "వీధి దీపాల నిర్వహణ, పరిశుభ్రత కార్యక్రమాలు మరియు వ్యర్థాల నిర్వహణ.",
            },
            {
              icon: "🏫",
              title: "పాఠశాలలు & ప్రజా భవనాలు",
              desc: "అంగన్‌వాడీ కేంద్రాలు, పాఠశాల వసతులు, ఆలయాలు మరియు సామాజిక భవనాలు.",
            },
          ],

          // Footer
          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerNote1: "స్వతంత్ర గ్రామ సమాచార వేదిక.",
          footerNote2: "ఇది అధికారిక గ్రామ పంచాయతీ వెబ్‌సైట్ కాదు.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  const filteredProjects =
    selectedStatus === "all"
      ? t.projects
      : t.projects.filter((project) => project.status === selectedStatus);

  const statusStyles: Record<Exclude<StatusFilter, "all">, string> = {
    ongoing: "bg-[#fff8e9] text-[#8a6940] border-[#e4d2a7]",
    planned: "bg-[#f3f4f6] text-[#4b5563] border-[#d1d5db]",
    completed: "bg-[#edf3e8] text-[#24543b] border-[#b7d1b2]",
  };

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
            🏗️ {t.eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#fff8e9] md:text-5xl">
            {t.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#f0eadb]">
            {t.pageSubtitle}
          </p>

          {/* Summary Stat Cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#e8d6a6]/25 bg-white/10 p-5 backdrop-blur-sm"
              >
                <p className="text-3xl font-bold text-[#edce83]">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-[#fff8e9]">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-[#d6e4d4]">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Tracker Ledger */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
          {t.trackerEyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">
          {t.trackerTitle}
        </h2>

        <div className="mt-4 rounded-2xl border border-[#e4d2a7] bg-[#fff8e9] px-5 py-3.5 text-sm leading-6 text-[#6b5c3e]">
          ℹ️ {t.trackerNotice}
        </div>

        {/* Status Filter Pills */}
        <div className="mt-7 flex flex-wrap gap-2.5">
          {t.filters.map((filter) => {
            const active = selectedStatus === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setSelectedStatus(filter.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#245c3c] text-white shadow-sm"
                    : "border border-[#d5dfd2] bg-white text-[#203b2d] hover:bg-[#edf3e8]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Empty State or Project Cards */}
        {filteredProjects.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-[#e4e9df] bg-white p-10 text-center shadow-sm">
            <p className="text-4xl">🏗️</p>
            <h3 className="mt-4 text-lg font-bold text-[#203b2d]">
              {t.emptyTitle}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#69776a]">
              {t.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col justify-between rounded-3xl border border-[#e4e9df] bg-white p-6 shadow-sm transition hover:border-[#a6c5a5]"
              >
                <div>
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${
                      statusStyles[project.status]
                    }`}
                  >
                    {t.statusLabels[project.status]}
                  </span>

                  <p className="mt-4 text-xs font-semibold text-[#54865b]">
                    {project.category}
                  </p>
                  <h3 className="mt-1.5 text-xl font-bold text-[#203b2d]">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-7 text-[#69776a]">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#4c5b4e]">{t.progressLabel}</span>
                    <span className="text-[#24543b]">{project.progress}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#edf3e8]">
                    <div
                      className="h-full rounded-full bg-[#245c3c] transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <div className="mt-5 grid gap-2 border-t border-[#eef2ea] pt-4 text-xs text-[#69776a] sm:grid-cols-2">
                    <p>
                      <strong>{t.locationLabel}:</strong> {project.location}
                    </p>
                    <p>
                      <strong>{t.timelineLabel}:</strong> {project.timeline}
                    </p>
                    <p className="sm:col-span-2">
                      <strong>{t.fundingLabel}:</strong> {project.fundingSource}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Core Focus Areas */}
      <section className="bg-[#edf3e8] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
            {t.focusEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">{t.focusTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5e6e5f]">
            {t.focusSubtitle}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.focusAreas.map((area) => (
              <div
                key={area.icon + area.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf3e8] text-2xl">
                  {area.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold">{area.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#69776a]">
                  {area.desc}
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