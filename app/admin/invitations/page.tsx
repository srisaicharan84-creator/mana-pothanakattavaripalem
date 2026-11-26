"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  getCurrentUserProfile,
  supabase,
  UserProfile,
} from "@/lib/supabase";

interface VillageInvitation {
  id: string;
  host_name: string;
  event_type: string;
  title_en: string;
  title_te: string | null;
  message_en: string;
  message_te: string | null;
  event_date: string | null;
  venue: string | null;
  media_type: "none" | "photo" | "video";
  media_path: string | null;
  status: string;
  created_at: string;
}

export default function AdminInvitationsPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [checking, setChecking] = useState(true);
  const [invitations, setInvitations] = useState<VillageInvitation[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "published">("all");

  useEffect(() => {
    async function init() {
      const current = await getCurrentUserProfile();
      setProfile(current);
      setChecking(false);
      if (current?.role === "admin") {
        fetchAllInvitations();
      }
    }
    init();
  }, []);

  async function fetchAllInvitations() {
    setLoadingList(true);
    const { data, error } = await supabase
      .from("village_invitations")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInvitations(data);
    }
    setLoadingList(false);
  }

  async function handleStatusChange(id: string, newStatus: "published" | "pending" | "rejected") {
    const { error } = await supabase
      .from("village_invitations")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setInvitations((prev) =>
        prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
      );
    }
  }

  async function handleDelete(inv: VillageInvitation) {
    if (!confirm("Delete this invitation permanently?")) return;

    if (inv.media_path) {
      await supabase.storage.from("invitations").remove([inv.media_path]);
    }

    const { error } = await supabase
      .from("village_invitations")
      .delete()
      .eq("id", inv.id);

    if (!error) {
      setInvitations((prev) => prev.filter((item) => item.id !== inv.id));
    }
  }

  const filtered =
    filterStatus === "all"
      ? invitations
      : invitations.filter((i) => i.status === filterStatus);

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      <Navbar language={language} setLanguage={setLanguage} showBackHome />

      {checking ? (
        <div className="py-20 text-center text-sm text-[#69776a]">
          Checking administrator access...
        </div>
      ) : !profile || profile.role !== "admin" ? (
        <div className="mx-auto max-w-lg px-6 py-20 text-center">
          <div className="rounded-3xl border border-[#e4e9df] bg-white p-8">
            <h1 className="text-xl font-bold">Administrator Access Only</h1>
            <Link
              href="/login"
              className="mt-5 inline-block rounded-xl bg-[#245c3c] px-5 py-2.5 text-sm font-bold text-white"
            >
              Sign In as Admin
            </Link>
          </div>
        </div>
      ) : (
        <>
          <section className="bg-[#24543b] px-6 py-12 text-white">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
              <div>
                <Link
                  href="/admin"
                  className="text-xs font-bold text-[#edce83] hover:underline"
                >
                  ← Back to Admin Dashboard
                </Link>
                <h1 className="mt-2 text-3xl font-bold text-[#fff8e9]">
                  💌 Manage Village Invitations
                </h1>
                <p className="mt-1 text-sm text-[#f0eadb]">
                  Review submitted wedding, housewarming, and festival invitations before publishing.
                </p>
              </div>

              <Link
                href="/invitations"
                className="rounded-full bg-[#edce83] px-5 py-2.5 text-xs font-bold text-[#203b2d] hover:bg-[#e5be64]"
              >
                + Post New Invitation
              </Link>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-6 py-10">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {(["all", "pending", "published"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilterStatus(tab)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold capitalize transition ${
                    filterStatus === tab
                      ? "bg-[#24543b] text-white"
                      : "bg-white text-[#4c5b4e] hover:bg-[#edf3e8]"
                  }`}
                >
                  {tab} (
                  {tab === "all"
                    ? invitations.length
                    : invitations.filter((i) => i.status === tab).length}
                  )
                </button>
              ))}
            </div>

            {loadingList ? (
              <div className="mt-8 rounded-3xl bg-white p-10 text-center text-sm text-[#69776a]">
                Loading invitations...
              </div>
            ) : filtered.length === 0 ? (
              <div className="mt-8 rounded-3xl bg-white p-10 text-center text-sm text-[#69776a]">
                No invitations found in this view.
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                {filtered.map((inv) => {
                  const mediaUrl = inv.media_path
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/invitations/${inv.media_path}`
                    : null;

                  return (
                    <div
                      key={inv.id}
                      className="rounded-3xl border border-[#e4e9df] bg-white p-6 shadow-xs"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase ${
                                inv.status === "published"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : inv.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {inv.status}
                            </span>
                            <span className="rounded-full bg-[#fff8e9] px-3 py-0.5 text-xs font-semibold text-[#7c5c26]">
                              {inv.event_type}
                            </span>
                            {inv.event_date && (
                              <span className="text-xs text-[#69776a]">
                                📅 {inv.event_date}
                              </span>
                            )}
                          </div>

                          <h2 className="pt-1 text-lg font-bold text-[#203b2d]">
                            {inv.title_en}
                            {inv.title_te && ` / ${inv.title_te}`}
                          </h2>
                          <p className="text-xs font-semibold text-[#54865b]">
                            Host: {inv.host_name}{" "}
                            {inv.venue ? `• Venue: ${inv.venue}` : ""}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                          {inv.status !== "published" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(inv.id, "published")
                              }
                              className="rounded-xl bg-[#245c3c] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#17462c]"
                            >
                              ✓ Approve & Publish
                            </button>
                          )}

                          {inv.status === "published" && (
                            <button
                              type="button"
                              onClick={() =>
                                handleStatusChange(inv.id, "pending")
                              }
                              className="rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100"
                            >
                              Unpublish
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(inv)}
                            className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <p className="mt-3 whitespace-pre-line text-sm text-[#4c5b4e]">
                        {inv.message_en}
                      </p>

                      {mediaUrl && inv.media_type === "photo" && (
                        <div className="mt-4 max-w-md overflow-hidden rounded-2xl border border-[#e4e9df]">
                          <img
                            src={mediaUrl}
                            alt={inv.title_en}
                            className="max-h-64 w-full object-contain bg-[#fff8e9]"
                          />
                        </div>
                      )}

                      {mediaUrl && inv.media_type === "video" && (
                        <div className="mt-4 max-w-md overflow-hidden rounded-2xl bg-black">
                          <video
                            src={mediaUrl}
                            controls
                            className="max-h-64 w-full"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}