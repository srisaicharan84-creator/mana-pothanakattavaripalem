"use client";

import { useState } from "react";
import Link from "next/link";

type SubmissionType = "issue" | "idea";

interface SubmissionItem {
  id: string;
  type: SubmissionType;
  category: string;
  area: string;
  title: string;
  details: string;
  author: string;
  submittedAt: string;
}

export default function CommunityPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [submissionType, setSubmissionType] = useState<SubmissionType>("issue");
  const [category, setCategory] = useState("roads");
  const [area, setArea] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [author, setAuthor] = useState("");
  const [submittedList, setSubmittedList] = useState<SubmissionItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
          backHome: "← Back to Home",
          eyebrow: "Community & Issue Reporting",
          pageTitle: "Your Village. Your Voice.",
          pageSubtitle:
            "Report a civic concern, suggest a community improvement, and help keep Pothanakattavaripalem clean, connected, and well-maintained.",

          // Form Section
          formEyebrow: "Submit a Report or Idea",
          formTitle: "Share With the Village Platform",
          formNotice:
            "Moderation & Privacy Note: Submissions are reviewed before public listing to protect personal privacy and verify details. Database storage will be connected in the backend phase.",

          typeIssueBtn: "📝 Report an Issue",
          typeIdeaBtn: "💡 Share a Village Idea",

          categoryLabel: "Category",
          categories: [
            { value: "roads", label: "🛣️ Roads & Streetlights" },
            { value: "water", label: "💧 Drinking Water & Drainage" },
            { value: "sanitation", label: "♻️ Sanitation & Cleanliness" },
            { value: "public", label: "🏫 School, Temple & Public Spaces" },
            { value: "other", label: "📌 Other Village Matter" },
          ],

          areaLabel: "Street / Landmark Area",
          areaPlaceholder: "e.g., Main Road, East Street, Near Temple",

          titleLabel: "Short Summary",
          titlePlaceholder: "e.g., Streetlight not working near water tank",

          detailsLabel: "Detailed Description",
          detailsPlaceholder:
            "Describe the concern or suggestion clearly so it can be reviewed accurately...",

          authorLabel: "Your Name (Optional)",
          authorPlaceholder: "Leave blank to submit anonymously",

          submitBtn: "Submit for Review",
          successMsg:
            "Thank you! Your entry has been recorded in this session preview under Pending Review.",

          // Public Board Section
          boardEyebrow: "Community Ledger",
          boardTitle: "Verified Issues & Community Discussions",
          pendingBadge: "⏳ Pending Review (Session Preview)",
          anonymousLabel: "Village Resident",
          emptyTitle: "No verified issues or discussions published yet",
          emptyDesc:
            "Once moderation controls and database storage are connected, verified village issues, resolution statuses, and community discussions will appear here.",

          // Guidelines
          rulesEyebrow: "Community Guidelines",
          rulesTitle: "How Participation Works",
          rules: [
            {
              icon: "🤝",
              title: "Respectful & Constructive",
              desc: "Focus on village needs, shared facilities, and practical solutions rather than personal disputes.",
            },
            {
              icon: "🔒",
              title: "Privacy Protected",
              desc: "Phone numbers and personal details are never published publicly without explicit permission.",
            },
            {
              icon: "✅",
              title: "Verified Status Tracking",
              desc: "Approved civic issues will carry clear status tags: Reported, Acknowledged, or Resolved.",
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
          eyebrow: "సమాజ వేదిక & సమస్యల నమోదు",
          pageTitle: "మీ గ్రామం. మీ గొంతుక.",
          pageSubtitle:
            "గ్రామ సమస్యలను తెలియజేయండి, అభివృద్ధి సూచనలు ఇవ్వండి మరియు మన పొతనకట్టవారిపాలెం అభివృద్ధిలో భాగస్వాములు కండి.",

          // Form Section
          formEyebrow: "సమస్య లేదా సలహా పంపండి",
          formTitle: "గ్రామ వేదికతో పంచుకోండి",
          formNotice:
            "పరిశీలన & గోప్యతా గమనిక: వ్యక్తిగత గోప్యతను కాపాడటానికి మరియు వివరాలను ధృవీకరించడానికి ప్రతి అంశం పరిశీలన తర్వాతే ప్రచురించబడుతుంది. తదుపరి దశలో డేటాబేస్ అనుసంధానం చేయబడుతుంది.",

          typeIssueBtn: "📝 సమస్యను తెలియజేయండి",
          typeIdeaBtn: "💡 సలహా పంచుకోండి",

          categoryLabel: "విభాగం",
          categories: [
            { value: "roads", label: "🛣️ రహదారులు & వీధి దీపాలు" },
            { value: "water", label: "💧 తాగునీరు & డ్రైనేజీ" },
            { value: "sanitation", label: "♻️ పారిశుధ్యం & పరిశుభ్రత" },
            { value: "public", label: "🏫 పాఠశాల, ఆలయం & ప్రజా ప్రదేశాలు" },
            { value: "other", label: "📌 ఇతర గ్రామ విషయాలు" },
          ],

          areaLabel: "వీధి / సమీప గుర్తు",
          areaPlaceholder: "ఉదా: ప్రధాన రహదారి, తూర్పు వీధి, ఆలయం వద్ద",

          titleLabel: "క్లుప్త విషయం",
          titlePlaceholder: "ఉదా: నీటి ట్యాంక్ వద్ద వీధి దీపం వెలగడం లేదు",

          detailsLabel: "పూర్తి వివరాలు",
          detailsPlaceholder:
            "సమస్య లేదా మీ సూచన వివరాలను స్పష్టంగా రాయండి...",

          authorLabel: "మీ పేరు (ఐచ్ఛికం)",
          authorPlaceholder: "పేరు లేకుండా పంపడానికి ఖాళీగా వదిలేయండి",

          submitBtn: "పరిశీలనకు పంపండి",
          successMsg:
            "ధన్యవాదాలు! మీ వివరాలు ఈ సెషన్ ప్రివ్యూలో 'పరిశీలనలో ఉంది' జాబితాలో చేర్చబడ్డాయి.",

          // Public Board Section
          boardEyebrow: "సమాజ జాబితా",
          boardTitle: "ధృవీకరించబడిన సమస్యలు & గ్రామ చర్చలు",
          pendingBadge: "⏳ పరిశీలనలో ఉంది (సెషన్ ప్రివ్యూ)",
          anonymousLabel: "గ్రామస్థులు",
          emptyTitle: "ఇప్పటివరకు ఎటువంటి సమస్యలు లేదా చర్చలు ప్రచురించబడలేదు",
          emptyDesc:
            "నియంత్రణ మరియు డేటాబేస్ వ్యవస్థ సిద్ధమైన తర్వాత, ధృవీకరించబడిన గ్రామ సమస్యలు, వాటి పరిష్కార స్థితి మరియు సమాజ చర్చలు ఇక్కడ కనిపిస్తాయి.",

          // Guidelines
          rulesEyebrow: "సమాజ నియమాలు",
          rulesTitle: "భాగస్వామ్యం ఎలా పనిచేస్తుంది",
          rules: [
            {
              icon: "🤝",
              title: "గౌరవప్రదమైన & నిర్మాణాత్మక చర్చ",
              desc: "వ్యక్తిగత విమర్శలకు దూరంగా ఉండి గ్రామ అవసరాలు మరియు ఆచరణాత్మక పరిష్కారాలపై దృష్టి పెట్టండి.",
            },
            {
              icon: "🔒",
              title: "గోప్యతా రక్షణ",
              desc: "అనుమతి లేకుండా ఫోన్ నంబర్లు లేదా వ్యక్తిగత వివరాలు బహిరంగంగా ప్రచురించబడవు.",
            },
            {
              icon: "✅",
              title: "స్పష్టమైన స్థితి పర్యవేక్షణ",
              desc: "ఆమోదించబడిన సమస్యలకు నమోదైంది, పరిశీలనలో ఉంది లేదా పరిష్కరించబడింది అనే గుర్తులు ఉంటాయి.",
            },
          ],

          // Footer
          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerNote1: "స్వతంత్ర గ్రామ సమాచార వేదిక.",
          footerNote2: "ఇది అధికారిక గ్రామ పంచాయతీ వెబ్‌సైట్ కాదు.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim() || !details.trim()) return;

    const selectedCat =
      t.categories.find((c) => c.value === category)?.label || category;

    const newItem: SubmissionItem = {
      id: `SUB-${Date.now()}`,
      type: submissionType,
      category: selectedCat,
      area: area.trim() || "Pothanakattavaripalem",
      title: title.trim(),
      details: details.trim(),
      author: author.trim() || t.anonymousLabel,
      submittedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setSubmittedList([newItem, ...submittedList]);
    setArea("");
    setTitle("");
    setDetails("");
    setAuthor("");
    setShowSuccess(true);
  }

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
            💬 {t.eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#fff8e9] md:text-5xl">
            {t.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#f0eadb]">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content: Submission Form + Community Board */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Issue / Idea Form */}
          <div className="rounded-3xl border border-[#e4e9df] bg-white p-7 shadow-sm lg:col-span-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
              {t.formEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold">{t.formTitle}</h2>

            <div className="mt-4 rounded-2xl border border-[#e4d2a7] bg-[#fff8e9] px-4 py-3 text-xs leading-6 text-[#6b5c3e]">
              ℹ️ {t.formNotice}
            </div>

            {/* Type Toggle */}
            <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-2xl bg-[#f7f8f2] p-1.5">
              <button
                type="button"
                onClick={() => setSubmissionType("issue")}
                className={`rounded-xl py-2.5 text-sm font-bold transition ${
                  submissionType === "issue"
                    ? "bg-[#245c3c] text-white shadow-sm"
                    : "text-[#4c5b4e] hover:text-[#203b2d]"
                }`}
              >
                {t.typeIssueBtn}
              </button>
              <button
                type="button"
                onClick={() => setSubmissionType("idea")}
                className={`rounded-xl py-2.5 text-sm font-bold transition ${
                  submissionType === "idea"
                    ? "bg-[#245c3c] text-white shadow-sm"
                    : "text-[#4c5b4e] hover:text-[#203b2d]"
                }`}
              >
                {t.typeIdeaBtn}
              </button>
            </div>

            {showSuccess && (
              <div className="mt-5 rounded-2xl border border-[#b7d1b2] bg-[#edf3e8] px-4 py-3 text-sm font-medium text-[#24543b]">
                ✅ {t.successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#203b2d]">
                  {t.categoryLabel}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm text-[#203b2d] focus:border-[#245c3c] focus:bg-white focus:outline-none"
                >
                  {t.categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#203b2d]">
                  {t.areaLabel}
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder={t.areaPlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm text-[#203b2d] focus:border-[#245c3c] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#203b2d]">
                  {t.titleLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.titlePlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm text-[#203b2d] focus:border-[#245c3c] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#203b2d]">
                  {t.detailsLabel} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={t.detailsPlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm text-[#203b2d] focus:border-[#245c3c] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#203b2d]">
                  {t.authorLabel}
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder={t.authorPlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm text-[#203b2d] focus:border-[#245c3c] focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#245c3c] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#17462c]"
              >
                {t.submitBtn}
              </button>
            </form>
          </div>

          {/* Right Column: Community Ledger */}
          <div className="lg:col-span-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
              {t.boardEyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold">{t.boardTitle}</h2>

            {submittedList.length === 0 ? (
              <div className="mt-6 rounded-3xl border border-[#e4e9df] bg-white p-10 text-center shadow-sm">
                <p className="text-4xl">💬</p>
                <h3 className="mt-4 text-lg font-bold text-[#203b2d]">
                  {t.emptyTitle}
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#69776a]">
                  {t.emptyDesc}
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {submittedList.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-[#e4d2a7] bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full border border-[#e4d2a7] bg-[#fff8e9] px-3 py-1 text-xs font-bold text-[#8a6940]">
                        {t.pendingBadge}
                      </span>
                      <span className="text-xs font-semibold text-[#54865b]">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-[#203b2d]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#69776a]">
                      {item.details}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-between gap-2 border-t border-[#eef2ea] pt-3 text-xs text-[#748174]">
                      <span>📍 {item.area}</span>
                      <span>
                        ✍️ {item.author} • {item.submittedAt}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Community Participation Guidelines */}
      <section className="bg-[#edf3e8] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
            {t.rulesEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">{t.rulesTitle}</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {t.rules.map((rule) => (
              <div
                key={rule.icon + rule.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf3e8] text-2xl">
                  {rule.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold">{rule.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#69776a]">
                  {rule.desc}
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