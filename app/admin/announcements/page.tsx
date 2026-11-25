
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCurrentUserProfile,
  supabase,
  UserProfile,
} from "../../../lib/supabase";

type Announcement = {
  id: string;
  category: string;
  title_en: string;
  title_te: string;
  summary_en: string;
  summary_te: string;
  description_en: string | null;
  description_te: string | null;
  event_date: string;
  status: "draft" | "published";
  published_at: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string | null;
};

type FormData = {
  category: string;
  title_en: string;
  title_te: string;
  summary_en: string;
  summary_te: string;
  description_en: string;
  description_te: string;
  event_date: string;
  image_url: string;
};

const emptyForm: FormData = {
  category: "General",
  title_en: "",
  title_te: "",
  summary_en: "",
  summary_te: "",
  description_en: "",
  description_te: "",
  event_date: "",
  image_url: "",
};

export default function AdminAnnouncementsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isTelugu = language === "te";

  useEffect(() => {
    async function initialize() {
      try {
        const currentProfile = await getCurrentUserProfile();

        if (!currentProfile || currentProfile.role !== "admin") {
          setError("Access denied. Admin login required.");
          setLoading(false);
          return;
        }

        setProfile(currentProfile);
        await loadAnnouncements();
      } catch {
        setError("Unable to load admin information.");
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, []);

  async function loadAnnouncements() {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }

    setAnnouncements((data || []) as Announcement[]);
  }

  function updateField(
    field: keyof FormData,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function saveAnnouncement(
    status: "draft" | "published"
  ) {
    setMessage("");
    setError("");

    if (
      !form.category.trim() ||
      !form.title_en.trim() ||
      !form.title_te.trim() ||
      !form.summary_en.trim() ||
      !form.summary_te.trim() ||
      !form.event_date
    ) {
      setError(
        "Please complete category, both titles, both summaries and event date."
      );
      return;
    }

    setSaving(true);

    try {
      const existing = announcements.find(
        (item) => item.id === editingId
      );

      const publishedAt =
        status === "published"
          ? existing?.published_at || new Date().toISOString()
          : null;

      const payload = {
        category: form.category.trim(),
        title_en: form.title_en.trim(),
        title_te: form.title_te.trim(),
        summary_en: form.summary_en.trim(),
        summary_te: form.summary_te.trim(),
        description_en: form.description_en.trim() || null,
        description_te: form.description_te.trim() || null,
        event_date: form.event_date,
        image_url: form.image_url.trim() || null,
        status,
        published_at: publishedAt,
        updated_at: new Date().toISOString(),
      };

      const result = editingId
        ? await supabase
            .from("announcements")
            .update(payload)
            .eq("id", editingId)
        : await supabase
            .from("announcements")
            .insert(payload);

      if (result.error) {
        throw result.error;
      }

      setMessage(
        status === "published"
          ? "Announcement published successfully."
          : "Announcement saved as draft."
      );

      resetForm();
      await loadAnnouncements();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save announcement."
      );
    } finally {
      setSaving(false);
    }
  }

  function editAnnouncement(item: Announcement) {
    setEditingId(item.id);

    setForm({
      category: item.category || "General",
      title_en: item.title_en || "",
      title_te: item.title_te || "",
      summary_en: item.summary_en || "",
      summary_te: item.summary_te || "",
      description_en: item.description_en || "",
      description_te: item.description_te || "",
      event_date: item.event_date || "",
      image_url: item.image_url || "",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function deleteAnnouncement(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    if (editingId === id) resetForm();

    setMessage("Announcement deleted successfully.");
    await loadAnnouncements();
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f8f2]">
        <p className="text-[#245c3c] font-semibold">
          Loading announcements...
        </p>
      </main>
    );
  }

  if (!profile || profile.role !== "admin") {
    return (
      <main className="min-h-screen bg-[#f7f8f2] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow">
          <h1 className="text-2xl font-bold text-red-700">
            Access Denied
          </h1>
          <p className="mt-3 text-gray-600">
            {error || "Admin login required."}
          </p>
          <Link
            href="/login"
            className="inline-block mt-5 bg-[#245c3c] text-white px-5 py-3 rounded-lg"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      <header className="bg-[#17472f] text-white px-5 py-5">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div>
            <Link href="/admin" className="text-sm text-green-200">
              ← {isTelugu ? "అడ్మిన్ డాష్‌బోర్డ్" : "Admin Dashboard"}
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold mt-2">
              {isTelugu
                ? "ప్రకటనల నిర్వహణ"
                : "Announcements Manager"}
            </h1>

            <p className="text-green-100 text-sm mt-1">
              {isTelugu
                ? "గ్రామ ప్రకటనలను నిర్వహించండి"
                : "Create and manage village announcements"}
            </p>
          </div>

          <button
            onClick={() =>
              setLanguage(isTelugu ? "en" : "te")
            }
            className="border border-white/50 rounded-lg px-4 py-2"
          >
            {isTelugu ? "English" : "తెలుగు"}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-5 md:p-8">
        {message && (
          <div className="mb-5 p-4 rounded-lg bg-green-100 text-green-800">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 p-4 rounded-lg bg-red-100 text-red-800">
            {error}
          </div>
        )}

        <section className="bg-white rounded-2xl shadow-sm border border-[#e3e9df] p-5 md:p-7">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
            <h2 className="text-xl font-bold">
              {editingId
                ? isTelugu
                  ? "ప్రకటనను సవరించండి"
                  : "Edit Announcement"
                : isTelugu
                  ? "కొత్త ప్రకటన సృష్టించండి"
                  : "Create New Announcement"}
            </h2>

            {editingId && (
              <button
                onClick={resetForm}
                className="text-sm text-red-700 underline"
              >
                Cancel Editing
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-2">
                Category / వర్గం *
              </label>
              <select
                className="field"
                value={form.category}
                onChange={(e) =>
                  updateField("category", e.target.value)
                }
              >
                <option value="General">General / సాధారణం</option>
                <option value="Meeting">Meeting / సమావేశం</option>
                <option value="Water">Water / నీరు</option>
                <option value="Electricity">Electricity / విద్యుత్</option>
                <option value="Health">Health / ఆరోగ్యం</option>
                <option value="Education">Education / విద్య</option>
                <option value="Development">Development / అభివృద్ధి</option>
                <option value="Emergency">Emergency / అత్యవసరం</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Event Date / తేదీ *
              </label>
              <input
                type="date"
                className="field"
                value={form.event_date}
                onChange={(e) =>
                  updateField("event_date", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                English Title *
              </label>
              <input
                className="field"
                placeholder="Enter announcement title"
                value={form.title_en}
                onChange={(e) =>
                  updateField("title_en", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Telugu Title *
              </label>
              <input
                className="field"
                placeholder="ప్రకటన శీర్షిక"
                value={form.title_te}
                onChange={(e) =>
                  updateField("title_te", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                English Summary *
              </label>
              <textarea
                className="field min-h-24"
                placeholder="Short announcement summary"
                value={form.summary_en}
                onChange={(e) =>
                  updateField("summary_en", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Telugu Summary *
              </label>
              <textarea
                className="field min-h-24"
                placeholder="ప్రకటన సంక్షిప్త వివరణ"
                value={form.summary_te}
                onChange={(e) =>
                  updateField("summary_te", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                English Full Description
              </label>
              <textarea
                className="field min-h-32"
                placeholder="Full announcement details"
                value={form.description_en}
                onChange={(e) =>
                  updateField("description_en", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Telugu Full Description
              </label>
              <textarea
                className="field min-h-32"
                placeholder="పూర్తి ప్రకటన వివరాలు"
                value={form.description_te}
                onChange={(e) =>
                  updateField("description_te", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Image URL (Optional)
              </label>
              <input
                className="field"
                placeholder="https://example.com/image.jpg"
                value={form.image_url}
                onChange={(e) =>
                  updateField("image_url", e.target.value)
                }
              />
              <p className="text-xs text-gray-500 mt-2">
                Add a publicly accessible image URL. Image uploading
                will be added separately.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-7">
            <button
              disabled={saving}
              onClick={() => saveAnnouncement("draft")}
              className="bg-gray-700 hover:bg-gray-800 disabled:opacity-50 text-white px-5 py-3 rounded-lg font-semibold"
            >
              {saving ? "Saving..." : "Save as Draft"}
            </button>

            <button
              disabled={saving}
              onClick={() => saveAnnouncement("published")}
              className="bg-[#245c3c] hover:bg-[#17472f] disabled:opacity-50 text-white px-5 py-3 rounded-lg font-semibold"
            >
              {saving ? "Saving..." : "Publish Announcement"}
            </button>

            <button
              onClick={resetForm}
              className="border border-gray-300 px-5 py-3 rounded-lg"
            >
              Clear Form
            </button>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
            <h2 className="text-2xl font-bold">
              {isTelugu ? "ప్రకటనల జాబితా" : "All Announcements"}
            </h2>

            <span className="text-sm bg-[#e7efe5] px-4 py-2 rounded-full">
              {announcements.length} Total
            </span>
          </div>

          {announcements.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-dashed border-gray-300">
              <p className="text-gray-500">
                No announcements yet. Create your first announcement above.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {announcements.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-xl border border-[#e3e9df] p-5 shadow-sm"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 items-center mb-3">
                        <span className="text-xs bg-[#e7efe5] text-[#245c3c] px-3 py-1 rounded-full">
                          {item.category}
                        </span>

                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            item.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold">
                        {isTelugu ? item.title_te : item.title_en}
                      </h3>

                      <p className="text-gray-600 text-sm mt-2">
                        {isTelugu
                          ? item.summary_te
                          : item.summary_en}
                      </p>

                      <p className="text-xs text-gray-400 mt-3">
                        Event Date: {item.event_date}
                      </p>
                    </div>

                    <div className="flex gap-2 items-start">
                      <button
                        onClick={() => editAnnouncement(item)}
                        className="bg-[#e7efe5] text-[#245c3c] px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteAnnouncement(item.id)}
                        className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
