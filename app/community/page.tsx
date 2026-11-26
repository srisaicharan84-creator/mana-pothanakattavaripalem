"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  getCurrentUserProfile,
  supabase,
  UserProfile,
} from "@/lib/supabase";

interface CommunityReport {
  id: string;
  user_id: string | null;
  reporter_name: string;
  reporter_contact: string | null;
  category: string;
  title: string;
  description: string;
  location: string | null;
  status: string;
  is_anonymous: boolean;
  admin_note: string | null;
  created_at: string;
}

export default function CommunityPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Form fields
  const [reporterName, setReporterName] = useState("");
  const [reporterContact, setReporterContact] = useState("");
  const [category, setCategory] = useState("infrastructure");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Submission & feed state
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");

  // Load current user and auto-fill credentials
  useEffect(() => {
    async function initUser() {
      const current = await getCurrentUserProfile();
      setProfile(current);
      if (current) {
        setReporterName(current.full_name || "");
        setReporterContact(current.email || "");
      }
    }
    initUser();
  }, []);

  // Fetch approved/public community reports
  async function fetchReports() {
    setLoadingReports(true);
    const { data, error } = await supabase
      .from("community_reports")
      .select("*")
      .in("status", ["approved", "in_progress", "resolved"])
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReports(data);
    }
    setLoadingReports(false);
  }

  useEffect(() => {
    fetchReports();
  }, []);

  const t =
    language === "en"
      ? {
          eyebrow: "Your Village • Your Voice",
          pageTitle: "Community Forum & Issue Reporting",
          pageSubtitle:
            "Report a village civic concern, propose a development idea, or track resolved community issues in Pothanakattavaripalem.",

          formHeading: "Submit a Village Report or Idea",
          loggedInBanner: "Signed in as",
          autoFillNote: "Your profile details have been pre-filled below.",

          anonLabel: "Submit Anonymously",
          anonDesc:
            "Hide my name on the public community board. Your account remains securely verified for moderation.",
          anonActiveBadge: "🕵️ Publicly displayed as: Anonymous Resident",

          nameLabel: "Your Name",
          namePlaceholder: "Enter your full name",
          contactLabel: "Email or Phone (Optional)",
          contactPlaceholder: "For status updates (kept private)",
          categoryLabel: "Category",
          categories: {
            infrastructure: "Roads & Streetlights",
            water: "Drinking Water & Drainage",
            sanitation: "Sanitation & Cleanliness",
            suggestion: "Village Development Idea",
            other: "Other Civic Matter",
          },
          locationLabel: "Street / Landmark in Village",
          locationPlaceholder: "e.g., Near Main Temple, East Street",
          titleLabel: "Short Summary / Title",
          titlePlaceholder: "e.g., Streetlight not working near water tank",
          descLabel: "Detailed Description",
          descPlaceholder:
            "Describe the issue or suggestion clearly so village coordinators can review it...",
          submitBtn: "Submit to Village Board",
          submittingBtn: "Submitting...",

          successTitle: "Thank you! Your submission has been received.",
          successBody:
            "It has been sent to village moderators for review before appearing on the public board.",
          submitAnother: "Submit Another Report",

          boardHeading: "Public Community Board",
          filterAll: "All Topics",
          emptyBoard: "No verified community submissions published yet.",
          anonymousAuthor: "Anonymous Resident",
          adminResponseLabel: "Coordinator Note:",
          statusLabels: {
            approved: "Verified",
            in_progress: "In Progress",
            resolved: "Resolved",
          } as Record<string, string>,

          footerTagline: "Our Village. Our Information. Our Community.",
          footerCopyright: "© 2026 Mana Pothanakattavaripalem",
        }
      : {
          eyebrow: "మీ గ్రామం • మీ గొంతుక",
          pageTitle: "సమాజ వేదిక & సమస్యల నమోదు",
          pageSubtitle:
            "పొతనకట్టవారిపాలెంలో గ్రామ సమస్యలను తెలియజేయండి, అభివృద్ధి సూచనలు ఇవ్వండి మరియు పరిష్కారమైన అంశాలను చూడండి.",

          formHeading: "గ్రామ సమస్య లేదా సూచనను నమోదు చేయండి",
          loggedInBanner: "లాగిన్ అయిన ఖాతా:",
          autoFillNote: "మీ ప్రొఫైల్ వివరాలు క్రింద స్వయంచాలకంగా నమోదు చేయబడ్డాయి.",

          anonLabel: "అజ్ఞాతంగా (Anonymous) సమర్పించండి",
          anonDesc:
            "పబ్లిక్ బోర్డులో నా పేరును దాచండి. నియంత్రణ (మోడరేషన్) కోసం మీ ఖాతా సురక్షితంగా నమోదై ఉంటుంది.",
          anonActiveBadge: "🕵️ పబ్లిక్ బోర్డులో కనిపించే పేరు: అజ్ఞాత గ్రామస్థుడు",

          nameLabel: "మీ పేరు",
          namePlaceholder: "మీ పూర్తి పేరు నమోదు చేయండి",
          contactLabel: "ఇమెయిల్ లేదా ఫోన్ (ఐచ్ఛికం)",
          contactPlaceholder: "సమాచారం కోసం (గోప్యంగా ఉంచబడుతుంది)",
          categoryLabel: "విభాగం",
          categories: {
            infrastructure: "రహదారులు & వీధి దీపాలు",
            water: "తాగునీరు & డ్రైనేజీ",
            sanitation: "పారిశుధ్యం & పరిశుభ్రత",
            suggestion: "గ్రామ అభివృద్ధి ఆలోచన",
            other: "ఇతర గ్రామ విషయాలు",
          },
          locationLabel: "గ్రామంలోని వీధి / గుర్తు",
          locationPlaceholder: "ఉదా: ప్రధాన దేవాలయం వద్ద, తూర్పు వీధి",
          titleLabel: "సంక్షిప్త శీర్షిక",
          titlePlaceholder: "ఉదా: వాటర్ ట్యాంక్ వద్ద వీధి దీపం వెలగడం లేదు",
          descLabel: "పూర్తి వివరాలు",
          descPlaceholder:
            "సమస్య లేదా సూచనను స్పష్టంగా వివరించండి...",
          submitBtn: "గ్రామ వేదికకు సమర్పించండి",
          submittingBtn: "సమర్పిస్తోంది...",

          successTitle: "ధన్యవాదాలు! మీ నివేదిక స్వీకరించబడింది.",
          successBody:
            "పబ్లిక్ బోర్డులో ప్రచురించడానికి ముందు గ్రామ నిర్వాహకుల పరిశీలనకు పంపబడింది.",
          submitAnother: "మరొక నివేదికను సమర్పించండి",

          boardHeading: "ప్రజా సమాజ వేదిక",
          filterAll: "అన్ని అంశాలు",
          emptyBoard: "ఇప్పటివరకు ధృవీకరించబడిన సమాజ నివేదికలు ప్రచురించబడలేదు.",
          anonymousAuthor: "అజ్ఞాత గ్రామస్థుడు",
          adminResponseLabel: "నిర్వాహకుల గమనిక:",
          statusLabels: {
            approved: "ధృవీకరించబడింది",
            in_progress: "పురోగతిలో ఉంది",
            resolved: "పరిష్కరించబడింది",
          } as Record<string, string>,

          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const finalName = isAnonymous
        ? "Anonymous Resident"
        : reporterName.trim() || profile?.full_name || "Resident";

      const { error } = await supabase.from("community_reports").insert([
        {
          user_id: profile?.id || null,
          reporter_name: finalName,
          reporter_contact: reporterContact.trim() || profile?.email || null,
          category,
          title: title.trim(),
          description: description.trim(),
          location: location.trim() || null,
          is_anonymous: isAnonymous,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setSubmitSuccess(true);
      setTitle("");
      setDescription("");
      setLocation("");
      setIsAnonymous(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to submit report.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  }

  const filteredReports =
    filterCategory === "all"
      ? reports
      : reports.filter((r) => r.category === filterCategory);

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      <Navbar language={language} setLanguage={setLanguage} showBackHome />

      {/* Hero Banner */}
      <section className="bg-[#24543b] px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-[#e8d6a6]/40 bg-[#e8d6a6]/10 px-4 py-1.5 text-sm text-[#f5e8c9]">
            💬 {t.eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-[#fff8e9] md:text-5xl">
            {t.pageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#f0eadb] md:text-base">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-12">
        {/* Left: Submission Form */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-[#e4e9df] bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-[#203b2d]">
              {t.formHeading}
            </h2>

            {profile && (
              <div className="mt-4 rounded-2xl border border-[#d5e3d1] bg-[#edf3e8] px-4 py-3 text-xs text-[#24543b]">
                <p className="font-bold">
                  ✅ {t.loggedInBanner} {profile.full_name}
                </p>
                <p className="mt-0.5 text-[#4c5b4e]">{t.autoFillNote}</p>
              </div>
            )}

            {submitSuccess ? (
              <div className="mt-6 rounded-2xl border border-[#b7d1b2] bg-[#edf3e8] p-6 text-center">
                <p className="text-3xl">🌿</p>
                <h3 className="mt-3 text-lg font-bold text-[#24543b]">
                  {t.successTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#4c5b4e]">
                  {t.successBody}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-5 rounded-full bg-[#245c3c] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#17462c]"
                >
                  {t.submitAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {submitError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                    ⚠️ {submitError}
                  </div>
                )}

                {/* Anonymous Reporting Toggle Card */}
                <div className="rounded-2xl border border-[#e4d2a7] bg-[#fff8e9] p-4">
                  <label className="flex cursor-pointer items-start justify-between gap-3">
                    <div>
                      <span className="text-sm font-bold text-[#203b2d]">
                        {t.anonLabel}
                      </span>
                      <p className="mt-1 text-xs leading-5 text-[#6b5c3e]">
                        {t.anonDesc}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-[#24543b]"
                    />
                  </label>
                  {isAnonymous && (
                    <p className="mt-2.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-[#24543b]">
                      {t.anonActiveBadge}
                    </p>
                  )}
                </div>

                {/* Name Field (Hidden/Locked when Anonymous is ON) */}
                {!isAnonymous && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      required={!isAnonymous}
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.contactLabel}
                  </label>
                  <input
                    type="text"
                    value={reporterContact}
                    onChange={(e) => setReporterContact(e.target.value)}
                    placeholder={t.contactPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.categoryLabel}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  >
                    {Object.entries(t.categories).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.locationLabel}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t.locationPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.titleLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t.titlePlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.descLabel}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.descPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-[#245c3c] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#17462c] disabled:opacity-60"
                >
                  {submitting ? t.submittingBtn : t.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Public Community Feed */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#203b2d]">
              {t.boardHeading}
            </h2>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilterCategory("all")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  filterCategory === "all"
                    ? "bg-[#24543b] text-white"
                    : "bg-white text-[#4c5b4e] hover:bg-[#edf3e8]"
                }`}
              >
                {t.filterAll}
              </button>
              {Object.entries(t.categories).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilterCategory(key)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    filterCategory === key
                      ? "bg-[#24543b] text-white"
                      : "bg-white text-[#4c5b4e] hover:bg-[#edf3e8]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loadingReports ? (
            <div className="mt-8 rounded-3xl border border-[#e4e9df] bg-white p-10 text-center text-sm text-[#69776a]">
              Loading...
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-[#e4e9df] bg-white p-10 text-center text-sm text-[#69776a]">
              {t.emptyBoard}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredReports.map((item) => {
                const displayAuthor = item.is_anonymous
                  ? t.anonymousAuthor
                  : item.reporter_name;

                return (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-[#e4e9df] bg-white p-6 shadow-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-[#edf3e8] px-3 py-1 text-xs font-bold text-[#24543b]">
                        {t.categories[
                          item.category as keyof typeof t.categories
                        ] || item.category}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          item.status === "resolved"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.status === "in_progress"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {t.statusLabels[item.status] || item.status}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-[#203b2d]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#4c5b4e]">
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#748174]">
                      <span>
                        {item.is_anonymous ? "🕵️" : "👤"} {displayAuthor}
                      </span>
                      {item.location && <span>📍 {item.location}</span>}
                      <span>
                        📅 {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {item.admin_note && (
                      <div className="mt-4 rounded-2xl border border-[#e4d2a7] bg-[#fff8e9] p-3.5 text-xs text-[#5d4f32]">
                        <span className="font-bold">
                          {t.adminResponseLabel}{" "}
                        </span>
                        {item.admin_note}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#173f2b] px-6 py-8 text-center text-sm text-[#c6d7c4]">
        <p>{t.footerTagline}</p>
        <p className="mt-1 text-xs">{t.footerCopyright}</p>
      </footer>
    </main>
  );
}