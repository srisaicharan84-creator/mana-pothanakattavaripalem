"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface DevelopmentWork {
  id: string;
  category: string;
  status: string;
  title_en: string;
  title_te: string;
  location_en: string;
  location_te: string;
  summary_en: string;
  summary_te: string;
  budget_text: string | null;
  progress_percent: number;
  created_at: string;
}

export default function DevelopmentTrackerPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [works, setWorks] = useState<DevelopmentWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchWorks() {
      const { data, error } = await supabase
        .from("development_works")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setWorks(data);
      }
      setLoading(false);
    }
    fetchWorks();
  }, []);

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
          backHome: "← Back to Home",
          eyebrow: "Building Together",
          heading: "Village Development Works",
          subtitle:
            "Track ongoing infrastructure, water, sanitation, and community development projects across our village.",
          filterAll: "All Projects",
          filterInProgress: "In Progress",
          filterCompleted: "Completed",
          filterApproved: "Approved",
          filterProposed: "Proposed",
          filterDelayed: "Delayed",
          loadingText: "Loading village projects...",
          emptyText: "No development projects found under this filter.",
          progressLabel: "Completion Progress",
          budgetLabel: "Estimated Budget",
          locationLabel: "Location",
          statusLabels: {
            proposed: "Proposed",
            approved: "Approved",
            in_progress: "In Progress",
            completed: "Completed",
            delayed: "Delayed",
          } as Record<string, string>,
        }
      : {
          siteName: "మన పొతనకట్టవారిపాలెం",
          siteSubName: "Mana Pothanakattavaripalem",
          backHome: "← హోమ్ పేజీకి వెళ్ళండి",
          eyebrow: "కలిసి నిర్మిద్దాం",
          heading: "గ్రామ అభివృద్ధి పనులు",
          subtitle:
            "మన గ్రామంలో జరుగుతున్న రహదారులు, తాగునీరు, పారిశుధ్యం మరియు మౌలిక సదుపాయాల ప్రాజెక్టుల పురోగతిని తెలుసుకోండి.",
          filterAll: "అన్ని పనులు",
          filterInProgress: "జరుగుతున్నవి",
          filterCompleted: "పూర్తయినవి",
          filterApproved: "ఆమోదించబడినవి",
          filterProposed: "ప్రతిపాదించబడినవి",
          filterDelayed: "ఆలస్యమైనవి",
          loadingText: "అభివృద్ధి పనుల వివరాలు లోడ్ అవుతున్నాయి...",
          emptyText: "ఈ విభాగంలో ప్రస్తుతం ఎటువంటి ప్రాజెక్టులు లేవు.",
          progressLabel: "పని పురోగతి",
          budgetLabel: "అంచనా బడ్జెట్",
          locationLabel: "ప్రాంతం",
          statusLabels: {
            proposed: "ప్రతిపాదించబడింది",
            approved: "ఆమోదించబడింది",
            in_progress: "జరుగుతోంది",
            completed: "పూర్తయింది",
            delayed: "ఆలస్యమైంది",
          } as Record<string, string>,
        };

  const filteredWorks =
    statusFilter === "all"
      ? works
      : works.filter((w) => w.status === statusFilter);

  function getStatusBadgeStyle(status: string) {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "in_progress":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "approved":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "delayed":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-stone-100 text-stone-700 border-stone-200";
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-[#e4d2a7] bg-[#fff8e9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#245c3c] text-xl">
              🌿
            </div>
            <div>
              <p className="text-sm font-bold sm:text-base">{t.siteName}</p>
              <p className="text-xs text-[#718071]">{t.siteSubName}</p>
            </div>
          </a>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "te" : "en")}
              className="rounded-full border border-[#d5b77d] bg-white/80 px-4 py-1.5 text-sm font-bold text-[#24543b] transition hover:bg-[#f5e8c9]"
            >
              {language === "en" ? "తెలుగు" : "English"}
            </button>
            <a
              href="/"
              className="rounded-full bg-[#245c3c] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#17462c] sm:text-sm"
            >
              {t.backHome}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-[#24543b] px-6 py-14 text-[#fff8e9]">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#edce83]">
            🏗️ {t.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{t.heading}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f0eadb] sm:text-base">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Filters & Project Cards */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Status Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: t.filterAll },
            { id: "in_progress", label: t.filterInProgress },
            { id: "completed", label: t.filterCompleted },
            { id: "approved", label: t.filterApproved },
            { id: "proposed", label: t.filterProposed },
            { id: "delayed", label: t.filterDelayed },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                statusFilter === tab.id
                  ? "bg-[#245c3c] text-white shadow-sm"
                  : "border border-[#d4ddd2] bg-white text-[#203b2d] hover:bg-[#edf3e8]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="mt-10 rounded-3xl border border-[#e4e9df] bg-white p-12 text-center text-sm text-[#748174]">
            {t.loadingText}
          </div>
        ) : filteredWorks.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-[#e4e9df] bg-white p-12 text-center text-sm text-[#748174]">
            {t.emptyText}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((work) => {
              const title =
                (language === "en" ? work.title_en : work.title_te) ||
                work.title_en ||
                work.title_te;
              const location =
                (language === "en" ? work.location_en : work.location_te) ||
                work.location_en ||
                work.location_te;
              const summary =
                (language === "en" ? work.summary_en : work.summary_te) ||
                work.summary_en ||
                work.summary_te;
              const statusText =
                t.statusLabels[work.status] || work.status.replace("_", " ");

              return (
                <article
                  key={work.id}
                  className="flex flex-col justify-between rounded-3xl border border-[#e4e9df] bg-white p-6 shadow-sm transition hover:border-[#a6c5a5] hover:shadow-md"
                >
                  <div>
                    {/* Category & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-[#edf3e8] px-3 py-1 text-xs font-bold text-[#39744a]">
                        {work.category}
                      </span>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusBadgeStyle(
                          work.status
                        )}`}
                      >
                        {statusText}
                      </span>
                    </div>

                    {/* Title & Location */}
                    <h2 className="mt-4 text-lg font-bold leading-snug text-[#203b2d]">
                      {title}
                    </h2>
                    <p className="mt-1.5 text-xs font-medium text-[#54865b]">
                      📍 {t.locationLabel}: {location}
                    </p>

                    {/* Summary */}
                    <p className="mt-3 text-sm leading-6 text-[#69776a]">
                      {summary}
                    </p>
                  </div>

                  {/* Progress & Budget Footer */}
                  <div className="mt-6 border-t border-[#eef2ea] pt-4">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#69776a]">{t.progressLabel}</span>
                      <span className="text-[#24543b]">
                        {work.progress_percent}%
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#edf3e8]">
                      <div
                        className="h-full rounded-full bg-[#245c3c] transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, work.progress_percent)
                          )}%`,
                        }}
                      />
                    </div>

                    {work.budget_text && (
                      <p className="mt-3 text-xs text-[#748174]">
                        💰 <span className="font-semibold">{t.budgetLabel}:</span>{" "}
                        {work.budget_text}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}