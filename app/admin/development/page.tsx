"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

const CATEGORIES = [
  { value: "Roads & Infrastructure", label: "🛣️ Roads & Infrastructure" },
  { value: "Water & Drainage", label: "💧 Water & Drainage" },
  { value: "Sanitation & Waste", label: "♻️ Sanitation & Waste" },
  { value: "Streetlights & Power", label: "💡 Streetlights & Power" },
  { value: "Community Buildings", label: "🏛️ Community Buildings" },
  { value: "Other", label: "📌 Other" },
];

const STATUS_OPTIONS = [
  { value: "proposed", label: "Proposed" },
  { value: "approved", label: "Approved" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "delayed", label: "Delayed" },
];

export default function AdminDevelopmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [works, setWorks] = useState<DevelopmentWork[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [category, setCategory] = useState("Roads & Infrastructure");
  const [status, setStatus] = useState("in_progress");
  const [titleEn, setTitleEn] = useState("");
  const [titleTe, setTitleTe] = useState("");
  const [locationEn, setLocationEn] = useState("");
  const [locationTe, setLocationTe] = useState("");
  const [summaryEn, setSummaryEn] = useState("");
  const [summaryTe, setSummaryTe] = useState("");
  const [budgetText, setBudgetText] = useState("");
  const [progressPercent, setProgressPercent] = useState<number>(0);

  useEffect(() => {
    async function checkAdminAndLoad() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { data: isAdmin, error: roleError } = await supabase.rpc("is_admin");
      if (roleError || !isAdmin) {
        router.push("/");
        return;
      }

      await fetchWorks();
      setLoading(false);
    }

    checkAdminAndLoad();
  }, [router]);

  async function fetchWorks() {
    const { data, error } = await supabase
      .from("development_works")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setWorks(data);
    }
  }

  function resetForm() {
    setEditingId(null);
    setCategory("Roads & Infrastructure");
    setStatus("in_progress");
    setTitleEn("");
    setTitleTe("");
    setLocationEn("");
    setLocationTe("");
    setSummaryEn("");
    setSummaryTe("");
    setBudgetText("");
    setProgressPercent(0);
  }

  function handleEdit(work: DevelopmentWork) {
    setEditingId(work.id);
    setCategory(work.category);
    setStatus(work.status);
    setTitleEn(work.title_en);
    setTitleTe(work.title_te);
    setLocationEn(work.location_en);
    setLocationTe(work.location_te);
    setSummaryEn(work.summary_en);
    setSummaryTe(work.summary_te);
    setBudgetText(work.budget_text || "");
    setProgressPercent(work.progress_percent);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!titleEn.trim() || !locationEn.trim() || !summaryEn.trim()) {
      setMessage({
        type: "error",
        text: "Please fill in the English Title, Location, and Summary.",
      });
      return;
    }

    setSaving(true);

    // Fallback to English values if Telugu fields are left blank (since DB columns are NOT NULL)
    const payload = {
      category,
      status,
      title_en: titleEn.trim(),
      title_te: titleTe.trim() || titleEn.trim(),
      location_en: locationEn.trim(),
      location_te: locationTe.trim() || locationEn.trim(),
      summary_en: summaryEn.trim(),
      summary_te: summaryTe.trim() || summaryEn.trim(),
      budget_text: budgetText.trim() || null,
      progress_percent: status === "completed" ? 100 : Number(progressPercent),
    };

    if (editingId) {
      const { error } = await supabase
        .from("development_works")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        setMessage({ type: "error", text: `Update failed: ${error.message}` });
      } else {
        setMessage({ type: "success", text: "Development work updated successfully!" });
        resetForm();
        await fetchWorks();
      }
    } else {
      const { error } = await supabase.from("development_works").insert([payload]);

      if (error) {
        setMessage({ type: "error", text: `Save failed: ${error.message}` });
      } else {
        setMessage({ type: "success", text: "New development work added!" });
        resetForm();
        await fetchWorks();
      }
    }

    setSaving(false);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    const { error } = await supabase.from("development_works").delete().eq("id", id);
    if (error) {
      setMessage({ type: "error", text: `Delete failed: ${error.message}` });
    } else {
      setMessage({ type: "success", text: "Project deleted." });
      if (editingId === id) resetForm();
      await fetchWorks();
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8f2] text-[#24543b]">
        <p className="font-semibold">Loading Development Works Admin...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      {/* Header */}
      <header className="border-b border-[#e4d2a7] bg-[#fff8e9] px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#54865b]">
              Mana Pothanakattavaripalem • Admin
            </p>
            <h1 className="text-2xl font-bold text-[#24543b]">
              🏗️ Village Development Works
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/development"
              target="_blank"
              className="rounded-full border border-[#d5b77d] bg-white px-4 py-2 text-sm font-semibold text-[#24543b] transition hover:bg-[#f5e8c9]"
            >
              View Public Page ↗
            </a>
            <a
              href="/admin"
              className="rounded-full bg-[#245c3c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#17462c]"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {message && (
          <div
            className={`mb-6 rounded-2xl border p-4 text-sm font-medium ${
              message.type === "success"
                ? "border-green-300 bg-green-50 text-green-800"
                : "border-red-300 bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Create / Edit Form */}
        <section className="rounded-3xl border border-[#e4e9df] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#24543b]">
              {editingId ? "✏️ Edit Development Project" : "➕ Add New Development Project"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-semibold text-red-600 hover:underline"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-semibold text-[#203b2d]">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] px-4 py-2.5 text-sm focus:border-[#245c3c] focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#203b2d]">
                  Project Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => {
                    const val = e.target.value;
                    setStatus(val);
                    if (val === "completed") setProgressPercent(100);
                  }}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] px-4 py-2.5 text-sm focus:border-[#245c3c] focus:outline-none"
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#203b2d]">
                  Progress ({progressPercent}%)
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={progressPercent}
                  onChange={(e) => setProgressPercent(Number(e.target.value))}
                  className="mt-3 w-full accent-[#245c3c]"
                />
              </div>
            </div>

            {/* Titles */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-[#203b2d]">
                  Project Title (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., CC Road Construction in Main Street"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] px-4 py-2.5 text-sm focus:border-[#245c3c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#203b2d]">
                  Project Title (Telugu — optional, defaults to English)
                </label>
                <input
                  type="text"
                  placeholder="ఉదా: మెయిన్ రోడ్డులో సిసి రోడ్డు నిర్మాణం"
                  value={titleTe}
                  onChange={(e) => setTitleTe(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] px-4 py-2.5 text-sm focus:border-[#245c3c] focus:outline-none"
                />
              </div>
            </div>

            {/* Locations & Budget */}
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-semibold text-[#203b2d]">
                  Location / Ward (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Near Ramalayam Temple"
                  value={locationEn}
                  onChange={(e) => setLocationEn(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] px-4 py-2.5 text-sm focus:border-[#245c3c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#203b2d]">
                  Location (Telugu — optional)
                </label>
                <input
                  type="text"
                  placeholder="ఉదా: రామాలయం వద్ద"
                  value={locationTe}
                  onChange={(e) => setLocationTe(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] px-4 py-2.5 text-sm focus:border-[#245c3c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#203b2d]">
                  Estimated Budget / Grant (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., ₹4,50,000 (15th Finance)"
                  value={budgetText}
                  onChange={(e) => setBudgetText(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] px-4 py-2.5 text-sm focus:border-[#245c3c] focus:outline-none"
                />
              </div>
            </div>

            {/* Summaries */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-[#203b2d]">
                  Work Details & Progress Summary (English) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe scope of work, current stage, or contractor notes..."
                  value={summaryEn}
                  onChange={(e) => setSummaryEn(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] px-4 py-2.5 text-sm focus:border-[#245c3c] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#203b2d]">
                  Work Details (Telugu — optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="పని వివరాలు మరియు ప్రస్తుత స్థితి..."
                  value={summaryTe}
                  onChange={(e) => setSummaryTe(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#d4ddd2] bg-[#f7f8f2] px-4 py-2.5 text-sm focus:border-[#245c3c] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-full bg-[#245c3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#17462c] disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Project"
                  : "Save Development Work"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-[#d4ddd2] px-5 py-3 text-sm font-semibold text-[#69776a] hover:bg-[#f7f8f2]"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Existing Projects List */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#24543b]">
            📋 Recorded Development Works ({works.length})
          </h2>

          {works.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-[#e4e9df] bg-white p-8 text-center text-sm text-[#748174]">
              No development works recorded yet. Add your first village project above!
            </div>
          ) : (
            <div className="mt-4 grid gap-4">
              {works.map((work) => (
                <div
                  key={work.id}
                  className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e4e9df] bg-white p-6 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-[#edf3e8] px-3 py-1 font-bold text-[#39744a]">
                        {work.category}
                      </span>
                      <span className="rounded-full bg-[#fff8e9] px-3 py-1 font-bold uppercase text-[#8a6940]">
                        {work.status.replace("_", " ")} • {work.progress_percent}%
                      </span>
                      {work.budget_text && (
                        <span className="text-[#69776a]">💰 {work.budget_text}</span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#203b2d]">
                      {work.title_en}
                    </h3>
                    {work.title_te && work.title_te !== work.title_en && (
                      <p className="text-sm font-medium text-[#54865b]">
                        {work.title_te}
                      </p>
                    )}
                    <p className="text-xs text-[#748174]">
                      📍 {work.location_en}
                    </p>
                    <p className="text-sm text-[#69776a]">{work.summary_en}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(work)}
                      className="rounded-full border border-[#245c3c] px-4 py-2 text-xs font-semibold text-[#245c3c] transition hover:bg-[#edf3e8]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(work.id)}
                      className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}