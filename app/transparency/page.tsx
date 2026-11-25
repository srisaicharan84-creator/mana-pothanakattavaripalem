"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface TransparencyRecord {
  id: string;
  category: string;
  status: string;
  record_date: string;
  title_en: string;
  title_te: string;
  department_er: string;
  department_te: string;
  reference_id: string;
  summary_en: string;
  summary_te: string;
  document_url: string | null;
  created_at: string;
}

export default function TransparencyPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [records, setRecords] = useState<TransparencyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchRecords() {
      setLoading(true);
      const { data, error } = await supabase
        .from("transparency_records")
        .select("*")
        .order("record_date", { ascending: false });

      if (!error && data) {
        setRecords(data);
      }
      setLoading(false);
    }
    fetchRecords();
  }, []);

  const categories = [
    { key: "All", labelEn: "All Records", labelTe: "అన్ని రికార్డులు" },
    { key: "Income", labelEn: "Income", labelTe: "ఆదాయం" },
    { key: "Expenditure", labelEn: "Expenditure", labelTe: "ఖర్చులు" },
    { key: "Bill & Invoice", labelEn: "Bills & Invoices", labelTe: "బిల్లులు & ఇన్‌వాయిస్‌లు" },
    { key: "Work Order", labelEn: "Work Orders", labelTe: "వర్క్ ఆర్డర్లు" },
  ];

  const filteredRecords = records.filter((rec) => {
    const matchesCat =
      selectedCategory === "All" || rec.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      rec.title_en.toLowerCase().includes(q) ||
      rec.title_te.toLowerCase().includes(q) ||
      rec.reference_id.toLowerCase().includes(q) ||
      rec.department_er.toLowerCase().includes(q) ||
      rec.department_te.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
          backHome: "← Back to Home",
          eyebrow: "Public Accounts & Records",
          heading: "Transparency Portal",
          subtitle:
            "Verified village income, development expenditure, bills, and official work orders published for community review.",
          searchPlaceholder: "Search by title, department, or bill/reference ID...",
          loading: "Loading public records...",
          empty: "No records found matching your filter.",
          refLabel: "Ref ID",
          deptLabel: "Department",
          dateLabel: "Date",
          viewDoc: "View Supporting Document ↗",
          noDoc: "No attachment linked",
          disclaimer:
            "Note: Independent community transparency initiative for Mana Pothanakattavaripalem. Official Gram Panchayat records and community-verified logs are clearly labeled.",
        }
      : {
          siteName: "మన పొతనకట్టవారిపాలెం",
          siteSubName: "Mana Pothanakattavaripalem",
          backHome: "← హోమ్ పేజీకి తిరిగి వెళ్ళండి",
          eyebrow: "ప్రజా ఖాతాలు మరియు రికార్డులు",
          heading: "పారదర్శకత వేదిక",
          subtitle:
            "గ్రామ ఆదాయం, అభివృద్ధి ఖర్చులు, బిల్లులు మరియు ధృవీకరించబడిన వర్క్ ఆర్డర్ల వివరాలు అందరి పరిశీలన కోసం ఇక్కడ అందుబాటులో ఉన్నాయి.",
          searchPlaceholder: "శీర్షిక, విభాగం లేదా బిల్ నంబర్ ద్వారా వెతకండి...",
          loading: "ప్రజా రికార్డులు లోడ్ అవుతున్నాయి...",
          empty: "మీ ఎంపికకు సరిపోయే రికార్డులు లేవు.",
          refLabel: "రిఫరెన్స్ ఐడి",
          deptLabel: "విభాగం",
          dateLabel: "తేదీ",
          viewDoc: "సహాయక పత్రం చూడండి ↗",
          noDoc: "పత్రం జతచేయబడలేదు",
          disclaimer:
            "గమనిక: ఇది మన పొతనకట్టవారిపాలెం గ్రామ స్వతంత్ర పారదర్శకత వేదిక. అధికారిక పత్రాలు మరియు ధృవీకరించబడిన రికార్డులు స్పష్టంగా చూపబడతాయి.",
        };

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e4d2a7] bg-[#fff8e9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#245c3c] text-xl">
              🌿
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight sm:text-base">
                {t.siteName}
              </p>
              <p className="text-xs text-[#718071]">{t.siteSubName}</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "te" : "en")}
              className="rounded-full border border-[#d5b77d] bg-white px-4 py-1.5 text-sm font-bold text-[#24543b] transition hover:bg-[#f5e8c9]"
            >
              {language === "en" ? "తెలుగు" : "English"}
            </button>
            <Link
              href="/"
              className="rounded-full bg-[#245c3c] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#17462c] sm:text-sm"
            >
              {t.backHome}
            </Link>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="bg-[#24543b] px-6 py-14 text-[#fff8e9]">
        <div className="mx-auto max-w-6xl">
          <span className="inline-block rounded-full border border-[#e8d6a6]/40 bg-[#e8d6a6]/10 px-4 py-1.5 text-xs font-semibold text-[#f5e8c9]">
            📊 {t.eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-5xl">{t.heading}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f0eadb] sm:text-base">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
                    active
                      ? "bg-[#24543b] text-[#fff8e9] shadow-sm"
                      : "border border-[#d4ddd2] bg-white text-[#203b2d] hover:bg-[#edf3e8]"
                  }`}
                >
                  {language === "en" ? cat.labelEn : cat.labelTe}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-full border border-[#d4ddd2] bg-white px-4 py-2.5 text-sm text-[#203b2d] placeholder:text-[#879287] focus:border-[#24543b] focus:outline-none"
            />
          </div>
        </div>

        {/* Records Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="rounded-2xl border border-[#e4e9df] bg-white p-10 text-center text-sm text-[#69776a]">
              {t.loading}
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="rounded-2xl border border-[#e4e9df] bg-white p-10 text-center text-sm text-[#69776a]">
              {t.empty}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredRecords.map((rec) => {
                const title =
                  (language === "en" ? rec.title_en : rec.title_te) ||
                  rec.title_en ||
                  rec.title_te;
                const dept =
                  (language === "en" ? rec.department_er : rec.department_te) ||
                  rec.department_er ||
                  rec.department_te;
                const summary =
                  (language === "en" ? rec.summary_en : rec.summary_te) ||
                  rec.summary_en ||
                  rec.summary_te;

                return (
                  <article
                    key={rec.id}
                    className="flex flex-col justify-between rounded-2xl border border-[#e4e9df] bg-white p-6 shadow-sm transition hover:border-[#a6c5a5]"
                  >
                    <div>
                      {/* Top Meta */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="rounded-full bg-[#edf3e8] px-3 py-1 font-bold uppercase text-[#24543b]">
                          {rec.category}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 font-bold ${
                            rec.status === "Verified" || rec.status === "Audited"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {rec.status}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <h2 className="mt-4 text-lg font-bold text-[#203b2d]">
                        {title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[#69776a]">
                        {summary}
                      </p>

                      {/* Metadata Box */}
                      <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[#f7f8f2] p-3 text-xs">
                        <div>
                          <p className="text-[#879287]">{t.refLabel}</p>
                          <p className="mt-0.5 font-bold text-[#203b2d]">
                            {rec.reference_id}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#879287]">{t.deptLabel}</p>
                          <p className="mt-0.5 font-bold text-[#203b2d]">
                            {dept}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#879287]">{t.dateLabel}</p>
                          <p className="mt-0.5 font-bold text-[#203b2d]">
                            {rec.record_date}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Document Link */}
                    <div className="mt-5 border-t border-[#e4e9df] pt-4 text-xs">
                      {rec.document_url ? (
                        <a
                          href={rec.document_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-bold text-[#24543b] hover:underline"
                        >
                          {t.viewDoc}
                        </a>
                      ) : (
                        <span className="text-[#879287]">{t.noDoc}</span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="mt-10 rounded-2xl border border-[#e4d2a7] bg-[#fff8e9] p-4 text-xs leading-6 text-[#716448]">
          {t.disclaimer}
        </p>
      </section>
    </main>
  );
}