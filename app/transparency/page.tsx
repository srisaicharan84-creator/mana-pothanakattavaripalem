"use client";

import { useState } from "react";
import Link from "next/link";

type CategoryKey = "all" | "bills" | "cashbook" | "plans" | "govt";
type StatusKey = "official" | "community" | "pending";

interface RecordItem {
  id: string;
  category: Exclude<CategoryKey, "all">;
  status: StatusKey;
  date: string;
  title: string;
  department: string;
  reference: string;
  summary: string;
}

export default function TransparencyPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
          backHome: "← Back to Home",
          eyebrow: "Public Accounts & Transparency",
          pageTitle: "Open Records. Clear Accountability.",
          pageSubtitle:
            "A structured public archive for village income, development expenditure, work orders, and supporting documents—published only after verification.",

          legendTitle: "How We Label & Verify Records",
          legendSubtitle:
            "Every document published on this platform carries a clear verification tag so official records and community-submitted items are never confused.",
          statuses: {
            official: {
              badge: "✅ Verified Official",
              desc: "Cross-checked with official Gram Panchayat or government department releases.",
            },
            community: {
              badge: "🤝 Verified Community",
              desc: "Confirmed by village committee members with supporting bills or receipts.",
            },
            pending: {
              badge: "⏳ Pending Review",
              desc: "Submitted by a resident; currently awaiting document verification.",
            },
          },

          ledgerEyebrow: "Records Archive",
          ledgerTitle: "Browse Public Documents",
          ledgerNotice:
            "Only verified village bills, cash books, work orders, and government notices will be published here once confirmed.",
          categories: [
            { key: "all" as CategoryKey, label: "All Records" },
            { key: "bills" as CategoryKey, label: "📄 Bills & Invoices" },
            { key: "cashbook" as CategoryKey, label: "📚 Cash Books" },
            { key: "plans" as CategoryKey, label: "📋 Plans & Work Orders" },
            { key: "govt" as CategoryKey, label: "📁 Govt Documents" },
          ],
          categoryLabels: {
            bills: "Bills & Invoices",
            cashbook: "Cash Books & Expenditure",
            plans: "Plans & Work Orders",
            govt: "Government Documents",
          },
          refLabel: "Ref ID",
          attachmentBtn: "View verified document",

          emptyTitle: "No public records published yet",
          emptyDesc:
            "Once village bills, cash books, or official notices are collected and verified, they will appear here under their respective category.",

          records: [] as RecordItem[],

          processEyebrow: "Publishing Standards",
          processTitle: "3-Step Verification Before Public Listing",
          steps: [
            {
              num: "01",
              title: "Document Collection",
              desc: "Records are gathered from public notices or submitted by residents with clear photos/PDFs.",
            },
            {
              num: "02",
              title: "Source & Privacy Check",
              desc: "Personal phone numbers or sensitive private details are redacted while verifying dates and amounts.",
            },
            {
              num: "03",
              title: "Tagged Publication",
              desc: "Published with an Official or Community verification label so villagers can inspect records confidently.",
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
          eyebrow: "ప్రజా ఖాతాలు & పారదర్శకత",
          pageTitle: "బహిరంగ రికార్డులు. స్పష్టమైన జవాబుదారీతనం.",
          pageSubtitle:
            "గ్రామ ఆదాయం, అభివృద్ధి పనుల ఖర్చులు, వర్క్ ఆర్డర్లు మరియు సహాయక పత్రాల కోసం ప్రత్యేక వేదిక — పరిశీలన తర్వాతే ఇక్కడ ప్రచురించబడతాయి.",

          legendTitle: "రికార్డులను మేము ఎలా ధృవీకరిస్తాము",
          legendSubtitle:
            "అధికారిక పత్రాలు మరియు గ్రామస్థులు అందించిన సమాచారం మధ్య స్పష్టమైన తేడా తెలిసేలా ప్రతి రికార్డుకు ధృవీకరణ గుర్తు ఉంటుంది.",
          statuses: {
            official: {
              badge: "✅ అధికారికంగా ధృవీకరించబడింది",
              desc: "గ్రామ పంచాయతీ లేదా ప్రభుత్వ శాఖ విడుదల చేసిన పత్రాలతో సరిపోల్చబడింది.",
            },
            community: {
              badge: "🤝 గ్రామ కమిటీ ధృవీకరించినది",
              desc: "సరైన బిల్లులు మరియు రసీదుల ఆధారంగా గ్రామ పెద్దలు/కమిటీ ధృవీకరించినది.",
            },
            pending: {
              badge: "⏳ పరిశీలనలో ఉంది",
              desc: "గ్రామస్థులు అందించిన సమాచారం; పత్రాల ధృవీకరణ జరుగుతోంది.",
            },
          },

          ledgerEyebrow: "రికార్డుల భాండాగారం",
          ledgerTitle: "ప్రజా పత్రాలను పరిశీలించండి",
          ledgerNotice:
            "ధృవీకరించబడిన గ్రామ బిల్లులు, నగదు పుస్తకాలు, వర్క్ ఆర్డర్లు మరియు ప్రభుత్వ ఉత్తర్వులు మాత్రమే నిర్ధారించబడిన తర్వాత ఇక్కడ ప్రచురించబడతాయి.",
          categories: [
            { key: "all" as CategoryKey, label: "అన్ని రికార్డులు" },
            { key: "bills" as CategoryKey, label: "📄 బిల్లులు & ఇన్‌వాయిస్‌లు" },
            { key: "cashbook" as CategoryKey, label: "📚 నగదు పుస్తకాలు" },
            { key: "plans" as CategoryKey, label: "📋 ప్రణాళికలు & వర్క్ ఆర్డర్లు" },
            { key: "govt" as CategoryKey, label: "📁 ప్రభుత్వ పత్రాలు" },
          ],
          categoryLabels: {
            bills: "బిల్లులు & ఇన్‌వాయిస్‌లు",
            cashbook: "నగదు పుస్తకాలు & ఖర్చులు",
            plans: "ప్రణాళికలు & వర్క్ ఆర్డర్లు",
            govt: "ప్రభుత్వ పత్రాలు",
          },
          refLabel: "రిఫరెన్స్ ఐడి",
          attachmentBtn: "ధృవీకరించిన పత్రం చూడండి",

          emptyTitle: "ఇప్పటివరకు ఎటువంటి ప్రజా రికార్డులు ప్రచురించబడలేదు",
          emptyDesc:
            "గ్రామ బిల్లులు, నగదు పుస్తకాలు లేదా అధికారిక నోటీసులు సేకరించి ధృవీకరించబడిన తర్వాత అవి వాటి విభాగం క్రింద ఇక్కడ కనిపిస్తాయి.",

          records: [] as RecordItem[],

          processEyebrow: "ప్రచురణ ప్రమాణాలు",
          processTitle: "ప్రచురణకు ముందు 3-దశల పరిశీలన",
          steps: [
            {
              num: "01",
              title: "పత్రాల సేకరణ",
              desc: "ప్రజా నోటీసుల నుండి లేదా గ్రామస్థులు అందించిన స్పష్టమైన ఫోటోలు/PDFల ద్వారా సేకరించబడతాయి.",
            },
            {
              num: "02",
              title: "మూలం & గోప్యతా తనిఖీ",
              desc: "తేదీలు మరియు మొత్తాలను ధృవీకరిస్తూనే వ్యక్తిగత ఫోన్ నంబర్లు లేదా గోప్య సమాచారం తొలగించబడుతుంది.",
            },
            {
              num: "03",
              title: "ధృవీకరణ గుర్తుతో ప్రచురణ",
              desc: "గ్రామస్థులు నమ్మకంగా పరిశీలించేలా అధికారిక లేదా గ్రామ కమిటీ ధృవీకరణ గుర్తుతో ప్రచురించబడుతుంది.",
            },
          ],

          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerNote1: "స్వతంత్ర గ్రామ సమాచార వేదిక.",
          footerNote2: "ఇది అధికారిక గ్రామ పంచాయతీ వెబ్‌సైట్ కాదు.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  const filteredRecords =
    selectedCategory === "all"
      ? t.records
      : t.records.filter((item) => item.category === selectedCategory);

  const statusBadgeStyles: Record<StatusKey, string> = {
    official: "bg-[#edf3e8] text-[#24543b] border-[#b7d1b2]",
    community: "bg-[#fff8e9] text-[#7a5b2e] border-[#e4d2a7]",
    pending: "bg-[#f3f4f6] text-[#4b5563] border-[#d1d5db]",
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
            📊 {t.eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#fff8e9] md:text-5xl">
            {t.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#f0eadb]">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Verification Status Legend */}
      <section className="mx-auto max-w-7xl px-6 pt-16">
        <div className="rounded-3xl border border-[#e4e9df] bg-white p-7 shadow-sm md:p-8">
          <h2 className="text-xl font-bold md:text-2xl">{t.legendTitle}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#69776a]">
            {t.legendSubtitle}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(["official", "community", "pending"] as StatusKey[]).map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-[#e4e9df] bg-[#f7f8f2] p-5"
              >
                <span
                  className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${statusBadgeStyles[key]}`}
                >
                  {t.statuses[key].badge}
                </span>
                <p className="mt-3 text-sm leading-6 text-[#4c5b4e]">
                  {t.statuses[key].desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Records Ledger with Category Filter */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
          {t.ledgerEyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">{t.ledgerTitle}</h2>

        <div className="mt-4 rounded-2xl border border-[#e4d2a7] bg-[#fff8e9] px-5 py-3.5 text-sm leading-6 text-[#6b5c3e]">
          ℹ️ {t.ledgerNotice}
        </div>

        {/* Filter Pills */}
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

        {/* Empty State or Filtered Records List */}
        {filteredRecords.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-[#e4e9df] bg-white p-10 text-center shadow-sm">
            <p className="text-4xl">📊</p>
            <h3 className="mt-4 text-lg font-bold text-[#203b2d]">
              {t.emptyTitle}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#69776a]">
              {t.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {filteredRecords.map((record) => (
              <article
                key={record.id}
                className="rounded-2xl border border-[#e4e9df] bg-white p-6 transition hover:border-[#a6c5a5]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        statusBadgeStyles[record.status]
                      }`}
                    >
                      {t.statuses[record.status].badge}
                    </span>
                    <span className="rounded-full bg-[#f7f8f2] px-3 py-1 text-xs font-medium text-[#54865b]">
                      {t.categoryLabels[record.category]}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-[#748174]">
                    {record.date}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#203b2d]">
                  {record.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#69776a]">
                  {record.summary}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#eef2ea] pt-4 text-xs text-[#748174]">
                  <div className="flex flex-wrap gap-4">
                    <span>
                      <strong>{record.department}</strong>
                    </span>
                    <span>
                      {t.refLabel}: {record.reference}
                    </span>
                  </div>
                  <span className="font-medium text-[#39744a]">
                    📎 {t.attachmentBtn}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 3-Step Verification Process */}
      <section className="bg-[#edf3e8] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
            {t.processEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            {t.processTitle}
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {t.steps.map((step) => (
              <div key={step.num} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="inline-block rounded-lg bg-[#245c3c] px-3 py-1 text-xs font-bold text-[#edce83]">
                  {step.num}
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#69776a]">
                  {step.desc}
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