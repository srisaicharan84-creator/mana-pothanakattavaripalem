
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCurrentUserProfile,
  supabase,
  UserProfile,
} from "../../../lib/supabase";

type Billboard = {
  id: string;
  title_en: string;
  title_te: string;
  image_path: string;
  placement: "main" | "supporting";
  link_url: string | null;
  sort_order: number;
  is_active: boolean;
  starts_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
};

type FormData = {
  title_en: string;
  title_te: string;
  placement: "main" | "supporting";
  link_url: string;
  sort_order: number;
  is_active: boolean;
  starts_at: string;
  expires_at: string;
};

const emptyForm: FormData = {
  title_en: "",
  title_te: "",
  placement: "supporting",
  link_url: "",
  sort_order: 0,
  is_active: false,
  starts_at: "",
  expires_at: "",
};

const BUCKET = "billboard-images";

export default function AdminBillboardsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const te = language === "te";

  useEffect(() => {
    async function initialize() {
      try {
        const currentProfile = await getCurrentUserProfile();

        if (!currentProfile || currentProfile.role !== "admin") {
          setError("Admin access required.");
          return;
        }

        setProfile(currentProfile);
        await loadBillboards();
      } catch {
        setError("Unable to verify admin access.");
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, []);

  async function loadBillboards() {
    const { data, error } = await supabase
      .from("billboards")
      .select("*")
      .order("placement", { ascending: true })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }

    setBillboards((data || []) as Billboard[]);
  }

  function updateField<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function getImageUrl(path: string) {
    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  function resetForm() {
    setForm(emptyForm);
    setSelectedImage(null);
    setPreview("");
    setEditingId(null);
  }

  function handleImageChange(file: File | null) {
    setError("");
    setSelectedImage(null);
    setPreview("");

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5 MB or smaller.");
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function editBillboard(item: Billboard) {
    setEditingId(item.id);

    setForm({
      title_en: item.title_en,
      title_te: item.title_te,
      placement: item.placement,
      link_url: item.link_url || "",
      sort_order: item.sort_order,
      is_active: item.is_active,
      starts_at: item.starts_at
        ? new Date(item.starts_at).toISOString().slice(0, 16)
        : "",
      expires_at: item.expires_at
        ? new Date(item.expires_at).toISOString().slice(0, 16)
        : "",
    });

    setSelectedImage(null);
    setPreview(getImageUrl(item.image_path));
    setMessage("");
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveBillboard() {
    setMessage("");
    setError("");

    if (!form.title_en.trim() || !form.title_te.trim()) {
      setError("Please enter both English and Telugu titles.");
      return;
    }

    if (!editingId && !selectedImage) {
      setError("Please select a billboard image.");
      return;
    }

    if (
      form.starts_at &&
      form.expires_at &&
      new Date(form.expires_at) <= new Date(form.starts_at)
    ) {
      setError("Expiry date must be later than the start date.");
      return;
    }

    if (form.link_url.trim()) {
      try {
        const url = form.link_url.trim();

        if (url.startsWith("/")) {
          if (url.startsWith("//")) {
            throw new Error("Invalid destination link.");
          }
        } else {
          const parsed = new URL(url);

          if (!["http:", "https:"].includes(parsed.protocol)) {
            throw new Error("Only HTTP and HTTPS links are allowed.");
          }
        }
      } catch {
        setError("Enter a valid website URL or internal path beginning with /.");
        return;
      }
    }

    setSaving(true);

    let uploadedPath: string | null = null;

    try {
      const oldBillboard = billboards.find(
        (item) => item.id === editingId
      );

      let imagePath = oldBillboard?.image_path || "";

      // Upload a new image if selected.
      if (selectedImage) {
        const extension =
          selectedImage.type === "image/png"
            ? "png"
            : selectedImage.type === "image/webp"
              ? "webp"
              : "jpg";

        const fileName = `${crypto.randomUUID()}.${extension}`;
        const path = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, selectedImage, {
            contentType: selectedImage.type,
            upsert: false,
          });

        if (uploadError) throw uploadError;

        uploadedPath = path;
        imagePath = path;
      }

      const payload = {
        title_en: form.title_en.trim(),
        title_te: form.title_te.trim(),
        image_path: imagePath,
        placement: form.placement,
        link_url: form.link_url.trim() || null,
        sort_order: Number(form.sort_order) || 0,
        is_active: form.is_active,
        starts_at: form.starts_at
          ? new Date(form.starts_at).toISOString()
          : null,
        expires_at: form.expires_at
          ? new Date(form.expires_at).toISOString()
          : null,
        updated_at: new Date().toISOString(),
      };

      const result = editingId
        ? await supabase
            .from("billboards")
            .update(payload)
            .eq("id", editingId)
        : await supabase
            .from("billboards")
            .insert(payload);

      if (result.error) throw result.error;

      // Remove the previous image only after the database update succeeds.
      if (
        selectedImage &&
        oldBillboard?.image_path
      ) {
        const { error: removeError } = await supabase.storage
          .from(BUCKET)
          .remove([oldBillboard.image_path]);

        if (removeError) {
          console.error("Old image cleanup failed:", removeError.message);
        }
      }

      setMessage(
        editingId
          ? "Billboard updated successfully."
          : "Billboard created successfully."
      );

      resetForm();
      await loadBillboards();
    } catch (err) {
      // Clean up a newly uploaded image if the database save failed.
      if (uploadedPath) {
        await supabase.storage
          .from(BUCKET)
          .remove([uploadedPath]);
      }

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save billboard."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(item: Billboard) {
    setError("");
    setMessage("");

    const { error } = await supabase
      .from("billboards")
      .update({
        is_active: !item.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage(
      item.is_active
        ? "Billboard deactivated."
        : "Billboard activated."
    );

    await loadBillboards();
  }

  async function deleteBillboard(item: Billboard) {
    const confirmed = window.confirm(
      `Delete "${item.title_en}" permanently?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    const { error } = await supabase
      .from("billboards")
      .delete()
      .eq("id", item.id);

    if (error) {
      setError(error.message);
      return;
    }

    const { error: imageError } = await supabase.storage
      .from(BUCKET)
      .remove([item.image_path]);

    if (imageError) {
      console.error("Image cleanup failed:", imageError.message);
    }

    if (editingId === item.id) resetForm();

    setMessage("Billboard deleted.");
    await loadBillboards();
  }

  const activeCount = billboards.filter(
    (item) => item.is_active
  ).length;

  const mainBillboards = billboards.filter(
    (item) => item.placement === "main"
  );

  const supportingBillboards = billboards.filter(
    (item) => item.placement === "supporting"
  );

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f8f2]">
        <p className="text-[#245c3c] font-semibold">
          Loading billboard manager...
        </p>
      </main>
    );
  }

  if (!profile || profile.role !== "admin") {
    return (
      <main className="min-h-screen bg-[#f7f8f2] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full">
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

  function renderBillboardList(
    items: Billboard[],
    heading: string
  ) {
    return (
      <section className="mt-9">
        <h2 className="text-xl font-bold mb-4">{heading}</h2>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed p-6 text-gray-500">
            No billboards in this section yet.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl border border-[#e3e9df] shadow-sm overflow-hidden"
              >
                <img
                  src={getImageUrl(item.image_path)}
                  alt={item.title_en}
                  className="w-full aspect-video object-cover"
                />

                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-[#e7efe5] text-[#245c3c] px-3 py-1 rounded-full">
                      {item.placement.toUpperCase()}
                    </span>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        item.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.is_active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg">
                    {te ? item.title_te : item.title_en}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.title_en}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Display order: {item.sort_order}
                  </p>

                  {item.link_url && (
                    <p className="text-xs text-blue-700 mt-2 break-all">
                      Link: {item.link_url}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                      onClick={() => editBillboard(item)}
                      className="bg-[#e7efe5] text-[#245c3c] rounded-lg py-2 text-sm font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleActive(item)}
                      className="border rounded-lg py-2 text-sm font-semibold"
                    >
                      {item.is_active ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      onClick={() => deleteBillboard(item)}
                      className="col-span-2 bg-red-50 text-red-700 rounded-lg py-2 text-sm font-semibold"
                    >
                      Delete Billboard
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      <header className="bg-[#17472f] text-white px-5 py-5">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div>
            <Link
              href="/admin"
              className="text-sm text-green-200"
            >
              ← Admin Dashboard
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold mt-2">
              Billboard Management
            </h1>

            <p className="text-green-100 text-sm mt-1">
              Manage homepage image billboards
            </p>
          </div>

          <button
            onClick={() => setLanguage(te ? "en" : "te")}
            className="border border-white/50 rounded-lg px-4 py-2"
          >
            {te ? "English" : "తెలుగు"}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-5 md:p-8">
        <div className="grid sm:grid-cols-3 gap-4 mb-7">
          <div className="bg-white rounded-xl border p-4">
            <p className="text-sm text-gray-500">Total billboards</p>
            <p className="text-3xl font-bold mt-1">
              {billboards.length}
            </p>
          </div>

          <div className="bg-white rounded-xl border p-4">
            <p className="text-sm text-gray-500">Active billboards</p>
            <p className="text-3xl font-bold mt-1 text-green-700">
              {activeCount} / 20
            </p>
          </div>

          <div className="bg-white rounded-xl border p-4">
            <p className="text-sm text-gray-500">Inactive billboards</p>
            <p className="text-3xl font-bold mt-1">
              {billboards.length - activeCount}
            </p>
          </div>
        </div>

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
          <div className="flex flex-wrap justify-between gap-3 mb-6">
            <h2 className="text-xl font-bold">
              {editingId ? "Edit Billboard" : "Add New Billboard"}
            </h2>

            {editingId && (
              <button
                onClick={resetForm}
                className="text-red-700 underline text-sm"
              >
                Cancel Editing
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold mb-2">
                English Title *
              </label>
              <input
                className="field"
                value={form.title_en}
                onChange={(e) =>
                  updateField("title_en", e.target.value)
                }
                placeholder="Enter English title"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Telugu Title *
              </label>
              <input
                className="field"
                value={form.title_te}
                onChange={(e) =>
                  updateField("title_te", e.target.value)
                }
                placeholder="తెలుగు శీర్షిక"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Billboard Placement *
              </label>
              <select
                className="field"
                value={form.placement}
                onChange={(e) =>
                  updateField(
                    "placement",
                    e.target.value as "main" | "supporting"
                  )
                }
              >
                <option value="main">Main Billboard</option>
                <option value="supporting">Supporting Billboard</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Display Order
              </label>
              <input
                type="number"
                min="0"
                className="field"
                value={form.sort_order}
                onChange={(e) =>
                  updateField("sort_order", Number(e.target.value))
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Billboard Image * (JPG, PNG or WebP; maximum 5 MB)
              </label>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="field"
                onChange={(e) =>
                  handleImageChange(e.target.files?.[0] || null)
                }
              />

              {preview && (
                <div className="mt-4">
                  <p className="text-sm font-semibold mb-2">
                    Image Preview
                  </p>
                  <img
                    src={preview}
                    alt="Billboard preview"
                    className="w-full max-w-xl aspect-video object-cover rounded-xl border"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-2">
                Click Destination Link (Optional)
              </label>
              <input
                className="field"
                value={form.link_url}
                onChange={(e) =>
                  updateField("link_url", e.target.value)
                }
                placeholder="https://example.com or /announcements"
              />
              <p className="text-xs text-gray-500 mt-2">
                Visitors can click the billboard to open this destination.
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Start Date and Time (Optional)
              </label>
              <input
                type="datetime-local"
                className="field"
                value={form.starts_at}
                onChange={(e) =>
                  updateField("starts_at", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Expiry Date and Time (Optional)
              </label>
              <input
                type="datetime-local"
                className="field"
                value={form.expires_at}
                onChange={(e) =>
                  updateField("expires_at", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    updateField("is_active", e.target.checked)
                  }
                  className="w-5 h-5 accent-green-700"
                />
                <span className="font-semibold">
                  Activate this billboard
                </span>
              </label>

              <p className="text-xs text-gray-500 mt-2">
                Maximum 20 active billboards across both placements.
                Scheduled billboards become visible only during their
                configured dates.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-7">
            <button
              disabled={saving}
              onClick={saveBillboard}
              className="bg-[#245c3c] hover:bg-[#17472f] disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Billboard"
                  : "Save Billboard"}
            </button>

            <button
              onClick={resetForm}
              className="border border-gray-300 px-6 py-3 rounded-lg"
            >
              Clear Form
            </button>
          </div>
        </section>

        {renderBillboardList(mainBillboards, "Main Billboards")}

        {renderBillboardList(
          supportingBillboards,
          "Supporting Billboards"
        )}
      </div>
    </main>
  );
}
