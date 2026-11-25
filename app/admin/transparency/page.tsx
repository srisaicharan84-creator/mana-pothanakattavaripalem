"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCurrentUserProfile, supabase, UserProfile } from "@/lib/supabase";

interface TransparencyRecord {
  id: string;
  category: string;
  status: string;
  record_date: string;
  title_en: string;
  title_te: string;
  department_en: string;
  department_te: string;
  reference_id: string;
  summary_en: string;
  summary_te: string;
  document_url: string | null;
  created_at: string;
}

export default function AdminTransparencyPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [checking, setChecking] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [records, setRecords] = useState<TransparencyRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [category, setCategory] = useState("Income");
  const [status, setStatus] = useState("Verified");
  const [recordDate, setRecordDate] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleTe, setTitleTe] = useState("");
  const [deptEn, setDeptEn] = useState("Village Panchayat");
  const [deptTe, setDeptTe] = useState("గ్రామ పంచాయతీ");
  const [refId, setRefId] = useState("");
  const [summaryEn, setSummaryEn] = useState("");
  const [summaryTe, setSummaryTe] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    setRecordDate(new Date().toISOString().split("T")[0]);

    async function loadUserAndRecords() {
      const current = await getCurrentUserProfile();
      setProfile(current);
      if (current?.role === "admin") {
        fetchRecords();
      }
      setChecking(false);
    }
    loadUserAndRecords();
  }, []);

  async function fetchRecords() {
    const { data, error } = await supabase
      .from("transparency_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRecords(data);
    }
  }

  async function handleCreateRecord(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    if (!titleEn && !titleTe) {
      setErrorMsg("Please provide at least an English or Telugu title.");
      setLoading(false);
      return;
    }

    const finalTitleEn = titleEn || titleTe;
    const finalTitleTe = titleTe || titleEn;
    const finalSummaryEn = summaryEn || summaryTe;
    const finalSummaryTe = summaryTe || summaryEn;
    const finalRefId = refId || `REC-${Math.floor(1000 + Math.random() * 9000)}`;

    const { error } = await supabase.from("transparency_records").insert([
      {
        category,
        status,
        record_date: recordDate,
        title_en: finalTitleEn,
        title_te: finalTitleTe,
        department_en: deptEn,
        department_te: deptTe,
        reference_id: finalRefId,
        summary_en: finalSummaryEn,
        summary_te: finalSummaryTe,
        document_url: docUrl || null,
      },
    ]);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Transparency record added successfully!");
      setTitleEn("");
      setTitleTe("");
      setSummaryEn("");
      setSummaryTe("");
      setRefId("");
      setDocUrl("");
      setRecordDate(new Date().toISOString().split("T")[0]);
      fetchRecords();
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this record?")) return;
    const { error } = await supabase.from("transparency_records").delete().eq("id", id);
    if (!error) {
      fetchRecords();
    }
  }

  const t =
    language === "en"
      ? {
          backDashboard: "← Back to Admin Dashboard",
          eyebrow: "Transparency Manager",
          title: "Public Accounts & Records",
          subtitle: "Publish and manage financial transactions, income/expenditure reports, and government bills.",
          formHeading: "Add New Transparency Record",
          catLabel: "Category",
          statusLabel: "Verification Status",
          dateLabel: "Record Date",
          titleEnLabel: "Title (English)",
          titleTeLabel: "Title (Telugu)",
          deptEnLabel: "Department (English)",
          deptTeLabel: "Department (Telugu)",
          refLabel: "Reference ID / Bill No.",
          sumEnLabel: "Summary (English)",
          sumTeLabel: "Summary (Telugu)",
          docLabel: "Document / Invoice URL (Optional)",
          submitBtn: "Publish Transparency Record",
          listHeading: "Published Records",
          deleteBtn: "Delete",
        }
      : {
          backDashboard: "← అడ్మిన్ డ్యాష్‌బోర్డ్‌కి తిరిగి వెళ్ళండి",
          eyebrow: "పారదర్శకత నిర్వహణ",
          title: "ప్రజా ఖాతాలు మరియు రికార్డులు",
          subtitle: "ఆర్థిక లావాదేవీలు, ఆదాయ/వ్యయ నివేదికలు మరియు బిల్లులను ప్రచురించండి మరియు నిర్వహించండి.",
          formHeading: "కొత్త పారదర్శక రికార్డును జోడించండి",
          catLabel: "వర్గం (Category)",
          statusLabel: "ధృవీకరణ స్థితి",
          dateLabel: "తేదీ",
          titleEnLabel: "శీర్షిక (English)",
          titleTeLabel: "శీర్షిక (తెలుగు)",
          deptEnLabel: "విభాగం (English)",
          deptTeLabel: "విభాగం (తెలుగు)",
          refLabel: "రిఫరెన్స్ ఐడి / బిల్ నెం.",
          sumEnLabel: "సారాంశం (English)",
          sumTeLabel: "సారాంశం (తెలుగు)",
          docLabel: "పత్రం / ఇన్‌వాయిస్ లింక్ (ఐచ్ఛికం)",
          submitBtn: "రికార్డును ప్రచురించండి",
          listHeading: "ప్రచురించబడిన రికార్డులు",
          deleteBtn: "తొలగించు",
        };

  if (checking) {
    return <div className="p-10 text-center text-[#69776a]">Checking access...</div>;
  }

  if (!profile || profile.role !== "admin") {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-sm text-[#69776a]">Admin privileges required.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-[#245c3c] px-6 py-3 text-white font-semibold">
          Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      <header className="sticky top-0 z-50 border-b border-[#e4d2a7] bg-[#fff8e9]/95 backdrop-blur px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/admin" className="text-sm font-bold text-[#24543b] hover:underline">
            {t.backDashboard}
          </Link>
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "te" : "en")}
            className="rounded-full border border-[#d5b77d] bg-white px-4 py-1.5 text-sm font-bold text-[#24543b]"
          >
            {language === "en" ? "తెలుగు" : "English"}
          </button>
        </div>
      </header>

      <section className="bg-[#24543b] px-6 py-12 text-[#fff8e9]">
        <div className="mx-auto max-w-5xl">
          <span className="rounded-full bg-[#e8d6a6]/20 px-3 py-1 text-xs font-semibold text-[#f5e8c9]">
            📒 {t.eyebrow}
          </span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t.title}</h1>
          <p className="mt-2 text-sm text-[#f0eadb]">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl border border-[#e4e9df] bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold">{t.formHeading}</h2>

          {errorMsg && <div className="mt-4 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{errorMsg}</div>}
          {successMsg && <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">{successMsg}</div>}

          <form onSubmit={handleCreateRecord} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-[#69776a]">{t.catLabel}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
                >
                  <option value="Income">Income / గ్రామానికి ఆదాయం</option>
                  <option value="Expenditure">Expenditure / అభివృద్ధి ఖర్చులు</option>
                  <option value="Bill & Invoice">Bill & Invoice / బిల్లులు & ఇన్‌వాయిస్‌లు</option>
                  <option value="Work Order">Work Order / వర్క్ ఆర్డర్</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#69776a]">{t.statusLabel}</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
                >
                  <option value="Verified">Verified / ధృవీకరించబడింది</option>
                  <option value="Pending Review">Pending Review / పరిశీలనలో ఉంది</option>
                  <option value="Audited">Audited / ఆడిట్ చేయబడింది</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#69776a]">{t.dateLabel}</label>
                <input
                  type="date"
                  value={recordDate}
                  onChange={(e) => setRecordDate(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#69776a]">{t.titleEnLabel}</label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Village Water Tank Repair Cost"
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#69776a]">{t.titleTeLabel}</label>
                <input
                  type="text"
                  value={titleTe}
                  onChange={(e) => setTitleTe(e.target.value)}
                  placeholder="ఉదా: నీటి ట్యాంక్ మరమ్మత్తు ఖర్చు"
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-[#69776a]">{t.deptEnLabel}</label>
                <input
                  type="text"
                  value={deptEn}
                  onChange={(e) => setDeptEn(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#69776a]">{t.deptTeLabel}</label>
                <input
                  type="text"
                  value={deptTe}
                  onChange={(e) => setDeptTe(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#69776a]">{t.refLabel}</label>
                <input
                  type="text"
                  value={refId}
                  onChange={(e) => setRefId(e.target.value)}
                  placeholder="e.g. BILL-2026-001"
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-[#69776a]">{t.sumEnLabel}</label>
                <textarea
                  value={summaryEn}
                  onChange={(e) => setSummaryEn(e.target.value)}
                  rows={3}
                  placeholder="Detailed breakdown in English..."
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#69776a]">{t.sumTeLabel}</label>
                <textarea
                  value={summaryTe}
                  onChange={(e) => setSummaryTe(e.target.value)}
                  rows={3}
                  placeholder="వివరమైన సమాచారం తెలుగులో..."
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#69776a]">{t.docLabel}</label>
              <input
                type="url"
                value={docUrl}
                onChange={(e) => setDocUrl(e.target.value)}
                placeholder="https://..."
                className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] p-3 text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#245c3c] py-3.5 text-sm font-bold text-white transition hover:bg-[#17462c]"
            >
              {loading ? "Publishing..." : t.submitBtn}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="mt-12">
          <h3 className="text-xl font-bold">{t.listHeading} ({records.length})</h3>
          <div className="mt-6 space-y-4">
            {records.map((rec) => (
              <div key={rec.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e4e9df] bg-white p-6 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#54865b]">
                    <span className="rounded-full bg-[#edf3e8] px-2.5 py-1">{rec.category}</span>
                    <span>• {rec.reference_id}</span>
                    <span>• {rec.record_date}</span>
                  </div>
                  <h4 className="mt-2 text-base font-bold text-[#203b2d]">{rec.title_en} / {rec.title_te}</h4>
                  <p className="mt-1 text-xs text-[#748174]">{rec.summary_en}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    {rec.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(rec.id)}
                    className="rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                  >
                    {t.deleteBtn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}