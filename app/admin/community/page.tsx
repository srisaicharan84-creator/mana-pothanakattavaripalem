"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCurrentUserProfile, supabase, UserProfile } from "@/lib/supabase";

interface CommunityReport {
  id: string;
  report_type: string;
  category: string;
  title: string;
  description: string;
  location: string | null;
  reporter_name: string;
  reporter_contact: string | null;
  status: string;
  admin_response: string | null;
  is_public: boolean;
  created_at: string;
}

export default function AdminCommunityPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [checking, setChecking] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Track edits per report card
  const [edits, setEdits] = useState<
    Record<
      string,
      { status: string; admin_response: string; is_public: boolean }
    >
  >({});

  useEffect(() => {
    async function init() {
      const current = await getCurrentUserProfile();
      setProfile(current);
      if (current?.role === "admin") {
        await fetchReports();
      }
      setChecking(false);
    }
    init();
  }, []);

  async function fetchReports() {
    const { data, error } = await supabase
      .from("community_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReports(data);
      const initialEdits: Record<
        string,
        { status: string; admin_response: string; is_public: boolean }
      > = {};
      data.forEach((rep: CommunityReport) => {
        initialEdits[rep.id] = {
          status: rep.status,
          admin_response: rep.admin_response || "",
          is_public: rep.is_public,
        };
      });
      setEdits(initialEdits);
    }
  }

  async function handleSaveUpdate(id: string) {
    const item = edits[id];
    if (!item) return;

    setSavingId(id);
    setFeedbackMsg("");

    const { error } = await supabase
      .from("community_reports")
      .update({
        status: item.status,
        admin_response: item.admin_response.trim() || null,
        is_public: item.is_public,
      })
      .eq("id", id);

    if (error) {
      setFeedbackMsg(`Error: ${error.message}`);
    } else {
      setFeedbackMsg(
        language === "en"
          ? "Report updated successfully!"
          : "నివేదిక విజయవంతంగా నవీకరించబడింది!"
      );
      await fetchReports();
    }
    setSavingId(null);
  }

  async function handleDelete(id: string) {
    if (
      !confirm(
        language === "en"
          ? "Are you sure you want to permanently delete this submission?"
          : "మీరు ఖచ్చితంగా ఈ నివేదికను తొలగించాలనుకుంటున్నారా?"
      )
    )
      return;

    const { error } = await supabase
      .from("community_reports")
      .delete()
      .eq("id", id);

    if (!error) {
      await fetchReports();
    }
  }

  const filteredReports = reports.filter((r) =>
    filterStatus === "All" ? true : r.status === filterStatus
  );

  const t =
    language === "en"
      ? {
          backDashboard: "← Back to Admin Dashboard",
          eyebrow: "Community Moderation",
          title: "Community Reports & Issues",
          subtitle:
            "Review resident submissions, update resolution status, and publish official responses.",
          statusLabel: "Status",
          responseLabel: "Official Admin Response",
          responsePlaceholder:
            "Write an update or resolution note visible on the public board...",
          publicToggle: "Visible on public board",
          saveBtn: "Save Update",
          savingBtn: "Saving...",
          deleteBtn: "Delete",
          emptyText: "No community reports found for this filter.",
          contactLabel: "Contact (Private):",
        }
      : {
          backDashboard: "← అడ్మిన్ డ్యాష్‌బోర్డ్‌కి తిరిగి వెళ్ళండి",
          eyebrow: "సమాజ నివేదికల నిర్వహణ",
          title: "సమాజ నివేదికలు & సమస్యలు",
          subtitle:
            "గ్రామస్థుల నివేదికలను సమీక్షించండి, పరిష్కార స్థితిని మార్చండి మరియు అధికారిక స్పందనను ప్రచురించండి.",
          statusLabel: "స్థితి (Status)",
          responseLabel: "అధికారిక నిర్వాహకుల స్పందన",
          responsePlaceholder:
            "ప్రజా వేదికపై కనిపించేలా సమాధానం లేదా పరిష్కార వివరాలు రాయండి...",
          publicToggle: "ప్రజా వేదికపై చూపించు",
          saveBtn: "మార్పులను సేవ్ చేయండి",
          savingBtn: "సేవ్ అవుతోంది...",
          deleteBtn: "తొలగించు",
          emptyText: "ఈ విభాగంలో నివేదికలు లేవు.",
          contactLabel: "సంప్రదింపు (ప్రైవేట్):",
        };

  if (checking) {
    return (
      <div className="p-10 text-center text-[#69776a]">Checking access...</div>
    );
  }

  if (!profile || profile.role !== "admin") {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-sm text-[#69776a]">
          Admin privileges required.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-[#245c3c] px-6 py-3 font-semibold text-white"
        >
          Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      <header className="sticky top-0 z-50 border-b border-[#e4d2a7] bg-[#fff8e9]/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/admin"
            className="text-sm font-bold text-[#24543b] hover:underline"
          >
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
            💬 {t.eyebrow}
          </span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t.title}</h1>
          <p className="mt-2 text-sm text-[#f0eadb]">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        {feedbackMsg && (
          <div className="mb-6 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
            {feedbackMsg}
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {["All", "Open", "In Review", "Resolved", "Closed"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  filterStatus === st
                    ? "bg-[#24543b] text-[#fff8e9]"
                    : "border border-[#d4ddd2] bg-white text-[#203b2d] hover:bg-[#edf3e8]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <p className="text-xs font-semibold text-[#69776a]">
            Total: {filteredReports.length}
          </p>
        </div>

        {/* Reports List */}
        <div className="mt-6 space-y-6">
          {filteredReports.length === 0 ? (
            <div className="rounded-2xl border border-[#e4e9df] bg-white p-8 text-center text-sm text-[#69776a]">
              {t.emptyText}
            </div>
          ) : (
            filteredReports.map((rep) => {
              const currentEdit = edits[rep.id] || {
                status: rep.status,
                admin_response: rep.admin_response || "",
                is_public: rep.is_public,
              };

              return (
                <div
                  key={rep.id}
                  className="rounded-3xl border border-[#e4e9df] bg-white p-6 shadow-sm"
                >
                  {/* Top Info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#edf3e8] px-3 py-1 font-bold text-[#24543b]">
                        {rep.report_type}
                      </span>
                      <span className="font-semibold text-[#69776a]">
                        {rep.category}
                      </span>
                      <span className="text-[#879287]">
                        • {new Date(rep.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <span className="text-xs text-[#69776a]">
                      By <strong>{rep.reporter_name}</strong>
                      {rep.reporter_contact && (
                        <span className="ml-2 rounded bg-[#fff8e9] px-2 py-0.5 text-[#716448]">
                          {t.contactLabel} {rep.reporter_contact}
                        </span>
                      )}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-[#203b2d]">
                    {rep.title}
                  </h3>
                  {rep.location && (
                    <p className="mt-1 text-xs font-medium text-[#54865b]">
                      📍 {rep.location}
                    </p>
                  )}
                  <p className="mt-2 text-sm leading-6 text-[#69776a]">
                    {rep.description}
                  </p>

                  {/* Admin Controls Box */}
                  <div className="mt-5 rounded-2xl border border-[#e4e9df] bg-[#f7f8f2] p-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-[#69776a]">
                          {t.statusLabel}
                        </label>
                        <select
                          value={currentEdit.status}
                          onChange={(e) =>
                            setEdits({
                              ...edits,
                              [rep.id]: {
                                ...currentEdit,
                                status: e.target.value,
                              },
                            })
                          }
                          className="mt-1 w-full rounded-xl border border-[#d4ddd2] bg-white p-2.5 text-sm font-medium"
                        >
                          <option value="Open">Open</option>
                          <option value="In Review">In Review</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>

                      <div className="flex items-end pb-2">
                        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-[#203b2d]">
                          <input
                            type="checkbox"
                            checked={currentEdit.is_public}
                            onChange={(e) =>
                              setEdits({
                                ...edits,
                                [rep.id]: {
                                  ...currentEdit,
                                  is_public: e.target.checked,
                                },
                              })
                            }
                            className="h-4 w-4 rounded border-[#d4ddd2] text-[#245c3c]"
                          />
                          {t.publicToggle}
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#69776a]">
                        {t.responseLabel}
                      </label>
                      <textarea
                        rows={2}
                        value={currentEdit.admin_response}
                        onChange={(e) =>
                          setEdits({
                            ...edits,
                            [rep.id]: {
                              ...currentEdit,
                              admin_response: e.target.value,
                            },
                          })
                        }
                        placeholder={t.responsePlaceholder}
                        className="mt-1 w-full rounded-xl border border-[#d4ddd2] bg-white p-3 text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => handleDelete(rep.id)}
                        className="rounded-lg bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                      >
                        {t.deleteBtn}
                      </button>

                      <button
                        type="button"
                        disabled={savingId === rep.id}
                        onClick={() => handleSaveUpdate(rep.id)}
                        className="rounded-xl bg-[#245c3c] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#17462c]"
                      >
                        {savingId === rep.id ? t.savingBtn : t.saveBtn}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}