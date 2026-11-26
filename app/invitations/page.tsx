"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  getCurrentUserProfile,
  supabase,
  UserProfile,
} from "@/lib/supabase";

interface VillageInvitation {
  id: string;
  user_id: string | null;
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

export default function InvitationsPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Form State
  const [hostName, setHostName] = useState("");
  const [eventType, setEventType] = useState("wedding");
  const [titleEn, setTitleEn] = useState("");
  const [titleTe, setTitleTe] = useState("");
  const [messageEn, setMessageEn] = useState("");
  const [messageTe, setMessageTe] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  // Submission & Feed State
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [invitations, setInvitations] = useState<VillageInvitation[]>([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    async function initUser() {
      const current = await getCurrentUserProfile();
      setProfile(current);
      if (current?.full_name) {
        setHostName(current.full_name);
      }
    }
    initUser();
  }, []);

  async function fetchInvitations() {
    setLoadingFeed(true);
    const { data, error } = await supabase
      .from("village_invitations")
      .select("*")
      .eq("status", "published")
      .order("event_date", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInvitations(data);
    }
    setLoadingFeed(false);
  }

  useEffect(() => {
    fetchInvitations();
  }, []);

  const t =
    language === "en"
      ? {
          eyebrow: "Celebrations & Gatherings",
          pageTitle: "Village Invitations Board",
          pageSubtitle:
            "Share family weddings, housewarmings, village festivals, and community event invitations with Pothanakattavaripalem through photos, videos, or messages.",

          formHeading: "Post a Village Invitation",
          formNote:
            "Invitations are reviewed by village coordinators before appearing on the public board.",
          hostLabel: "Host / Family Name",
          hostPlaceholder: "e.g., Yenumula Family / Sri Ramalingeswara Swamy Committee",
          eventTypeLabel: "Celebration Type",
          eventTypes: {
            wedding: "Wedding & Reception",
            housewarming: "Housewarming (Gruhapravesam)",
            festival: "Village Festival / Temple Event",
            birthday: "Birthday / Cradle Ceremony",
            community: "Community Gathering",
          },
          titleEnLabel: "Invitation Title (English)",
          titleEnPlaceholder: "e.g., Wedding Invitation of Charan & ...",
          titleTeLabel: "Invitation Title (Telugu - Optional)",
          titleTePlaceholder: "ఉదా: వివాహ ఆహ్వాన పత్రిక",
          dateLabel: "Event Date",
          venueLabel: "Venue / Location",
          venuePlaceholder: "e.g., Main Function Hall, Pothanakattavaripalem",
          messageEnLabel: "Invitation Message (English)",
          messageEnPlaceholder:
            "Write your warm invitation message, muhurtham timing, and dinner details...",
          messageTeLabel: "Invitation Message (Telugu - Optional)",
          messageTePlaceholder: "తెలుగులో ఆహ్వాన సందేశం...",
          mediaLabel: "Attach Invitation Card Photo or Video (Optional)",
          mediaHint: "Supports JPG, PNG, WEBP images or MP4/MOV invitation videos (max 25MB).",
          submitBtn: "Submit Invitation for Review",
          submittingBtn: "Uploading & Submitting...",

          successTitle: "Invitation Submitted!",
          successBody:
            "Your invitation has been sent to the village administrators and will appear on the board once approved.",
          postAnother: "Post Another Invitation",

          boardHeading: "Upcoming & Recent Invitations",
          filterAll: "All Celebrations",
          emptyBoard: "No published village invitations yet. Be the first to share one!",
          hostedBy: "Hosted by",
          footerTagline: "Our Village. Our Information. Our Community.",
          footerCopyright: "© 2026 Mana Pothanakattavaripalem",
        }
      : {
          eyebrow: "వేడుకలు & శుభకార్యాలు",
          pageTitle: "గ్రామ ఆహ్వాన వేదిక",
          pageSubtitle:
            "వివాహాలు, గృహప్రవేశాలు, గ్రామ జాతరలు మరియు శుభకార్యాల ఆహ్వానాలను ఫోటోలు, వీడియోలు లేదా సందేశాల ద్వారా గ్రామస్థులతో పంచుకోండి.",

          formHeading: "కొత్త ఆహ్వానాన్ని నమోదు చేయండి",
          formNote:
            "పబ్లిక్ బోర్డులో ప్రచురించడానికి ముందు గ్రామ నిర్వాహకులు మీ ఆహ్వానాన్ని పరిశీలిస్తారు.",
          hostLabel: "ఆహ్వానించే కుటుంబం / కమిటీ పేరు",
          hostPlaceholder: "ఉదా: యేనుముల కుటుంబం / ఆలయ కమిటీ",
          eventTypeLabel: "వేడుక రకం",
          eventTypes: {
            wedding: "వివాహ మహోత్సవం",
            housewarming: "గృహప్రవేశం",
            festival: "గ్రామ పండుగ / ఆలయ ఉత్సవం",
            birthday: "పుట్టినరోజు / నామకరణం",
            community: "గ్రామ సమాజ వేడుక",
          },
          titleEnLabel: "ఆహ్వాన శీర్షిక (English)",
          titleEnPlaceholder: "e.g., Wedding Invitation",
          titleTeLabel: "ఆహ్వాన శీర్షిక (తెలుగు - ఐచ్ఛికం)",
          titleTePlaceholder: "ఉదా: వివాహ ఆహ్వాన పత్రిక",
          dateLabel: "వేడుక తేదీ",
          venueLabel: "వేదిక / ప్రదేశం",
          venuePlaceholder: "ఉదా: పొతనకట్టవారిపాలెం",
          messageEnLabel: "ఆహ్వాన సందేశం (English)",
          messageEnPlaceholder: "ముహూర్తం, విందు మరియు వేడుక వివరాలను రాయండి...",
          messageTeLabel: "ఆహ్వాన సందేశం (తెలుగు - ఐచ్ఛికం)",
          messageTePlaceholder: "తెలుగులో ఆహ్వాన సందేశం రాయండి...",
          mediaLabel: "ఆహ్వాన పత్రిక ఫోటో లేదా వీడియో (ఐచ్ఛికం)",
          mediaHint: "JPG, PNG ఫోటోలు లేదా MP4 వీడియోలు అప్‌లోడ్ చేయవచ్చు (గరిష్టంగా 25MB).",
          submitBtn: "ఆహ్వానాన్ని సమర్పించండి",
          submittingBtn: "అప్‌లోడ్ అవుతోంది...",

          successTitle: "ఆహ్వానం స్వీకరించబడింది!",
          successBody:
            "మీ ఆహ్వానం గ్రామ నిర్వాహకుల పరిశీలనకు పంపబడింది. ఆమోదించబడిన వెంటనే ఇక్కడ కనిపిస్తుంది.",
          postAnother: "మరొక ఆహ్వానం పంపండి",

          boardHeading: "గ్రామ ఆహ్వాన పత్రికలు",
          filterAll: "అన్ని వేడుకలు",
          emptyBoard: "ఇప్పటివరకు ఎటువంటి ఆహ్వానాలు ప్రచురించబడలేదు.",
          hostedBy: "ఆహ్వానితులు:",
          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      let uploadedPath: string | null = null;
      let detectedMediaType: "none" | "photo" | "video" = "none";

      if (mediaFile) {
        if (mediaFile.size > 25 * 1024 * 1024) {
          throw new Error("File size must be under 25MB.");
        }

        const isVideo = mediaFile.type.startsWith("video/");
        detectedMediaType = isVideo ? "video" : "photo";

        const ext = mediaFile.name.split(".").pop() || "bin";
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("invitations")
          .upload(fileName, mediaFile);

        if (uploadError) throw uploadError;
        uploadedPath = fileName;
      }

      const { error: insertError } = await supabase
        .from("village_invitations")
        .insert([
          {
            user_id: profile?.id || null,
            host_name: hostName.trim() || profile?.full_name || "Village Family",
            event_type: eventType,
            title_en: titleEn.trim(),
            title_te: titleTe.trim() || null,
            message_en: messageEn.trim(),
            message_te: messageTe.trim() || null,
            event_date: eventDate || null,
            venue: venue.trim() || null,
            media_type: detectedMediaType,
            media_path: uploadedPath,
            status: profile?.role === "admin" ? "published" : "pending",
          },
        ]);

      if (insertError) throw insertError;

      setSubmitSuccess(true);
      setTitleEn("");
      setTitleTe("");
      setMessageEn("");
      setMessageTe("");
      setEventDate("");
      setVenue("");
      setMediaFile(null);

      if (profile?.role === "admin") {
        fetchInvitations();
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit invitation.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  const filteredInvitations =
    filterType === "all"
      ? invitations
      : invitations.filter((inv) => inv.event_type === filterType);

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      <Navbar language={language} setLanguage={setLanguage} showBackHome />

      {/* Banner */}
      <section className="bg-[#24543b] px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-[#e8d6a6]/40 bg-[#e8d6a6]/10 px-4 py-1.5 text-sm text-[#f5e8c9]">
            💌 {t.eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-[#fff8e9] md:text-5xl">
            {t.pageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#f0eadb] md:text-base">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-12">
        {/* Left: Create Invitation Form */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-[#e4e9df] bg-white p-7 shadow-sm">
            <h2 className="text-xl font-bold text-[#203b2d]">
              {t.formHeading}
            </h2>
            <p className="mt-1.5 text-xs leading-5 text-[#69776a]">
              {t.formNote}
            </p>

            {submitSuccess ? (
              <div className="mt-6 rounded-2xl border border-[#e4d2a7] bg-[#fff8e9] p-6 text-center">
                <p className="text-3xl">🎉</p>
                <h3 className="mt-3 text-lg font-bold text-[#24543b]">
                  {t.successTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5d4f32]">
                  {t.successBody}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-5 rounded-full bg-[#245c3c] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#17462c]"
                >
                  {t.postAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {submitError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                    ⚠️ {submitError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.hostLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder={t.hostPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                      {t.eventTypeLabel}
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-3.5 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                    >
                      {Object.entries(t.eventTypes).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                      {t.dateLabel}
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-3.5 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.titleEnLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder={t.titleEnPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.titleTeLabel}
                  </label>
                  <input
                    type="text"
                    value={titleTe}
                    onChange={(e) => setTitleTe(e.target.value)}
                    placeholder={t.titleTePlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.venueLabel}
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder={t.venuePlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.messageEnLabel}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={messageEn}
                    onChange={(e) => setMessageEn(e.target.value)}
                    placeholder={t.messageEnPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.messageTeLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={messageTe}
                    onChange={(e) => setMessageTe(e.target.value)}
                    placeholder={t.messageTePlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <div className="rounded-2xl border border-dashed border-[#d5b77d] bg-[#fff8e9] p-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5d4f32]">
                    📎 {t.mediaLabel}
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/mp4,video/webm,video/quicktime"
                    onChange={(e) =>
                      setMediaFile(e.target.files?.[0] || null)
                    }
                    className="mt-2 block w-full text-xs text-[#4c5b4e] file:mr-3 file:rounded-full file:border-0 file:bg-[#24543b] file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-[#17462c]"
                  />
                  <p className="mt-1.5 text-[11px] text-[#7c6a46]">
                    {t.mediaHint}
                  </p>
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

        {/* Right: Published Invitations Gallery */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#203b2d]">
              {t.boardHeading}
            </h2>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilterType("all")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  filterType === "all"
                    ? "bg-[#24543b] text-white"
                    : "bg-white text-[#4c5b4e] hover:bg-[#edf3e8]"
                }`}
              >
                {t.filterAll}
              </button>
              {Object.entries(t.eventTypes).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilterType(key)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    filterType === key
                      ? "bg-[#24543b] text-white"
                      : "bg-white text-[#4c5b4e] hover:bg-[#edf3e8]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loadingFeed ? (
            <div className="mt-8 rounded-3xl border border-[#e4e9df] bg-white p-10 text-center text-sm text-[#69776a]">
              Loading invitations...
            </div>
          ) : filteredInvitations.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-[#e4e9df] bg-white p-10 text-center text-sm text-[#69776a]">
              {t.emptyBoard}
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {filteredInvitations.map((inv) => {
                const title =
                  (language === "en" ? inv.title_en : inv.title_te) ||
                  inv.title_en ||
                  inv.title_te;
                const message =
                  (language === "en" ? inv.message_en : inv.message_te) ||
                  inv.message_en ||
                  inv.message_te;
                const mediaUrl = inv.media_path
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/invitations/${inv.media_path}`
                  : null;

                return (
                  <article
                    key={inv.id}
                    className="overflow-hidden rounded-3xl border-2 border-[#e4d2a7] bg-white shadow-sm"
                  >
                    {/* Media Attachment (Photo or Video) */}
                    {mediaUrl && inv.media_type === "photo" && (
                      <div className="max-h-96 w-full overflow-hidden bg-[#fff8e9]">
                        <img
                          src={mediaUrl}
                          alt={title || "Village Invitation"}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}

                    {mediaUrl && inv.media_type === "video" && (
                      <div className="w-full bg-black">
                        <video
                          src={mediaUrl}
                          controls
                          playsInline
                          className="max-h-96 w-full"
                        />
                      </div>
                    )}

                    {/* Invitation Card Body */}
                    <div className="p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-[#fff8e9] border border-[#e4d2a7] px-3 py-1 text-xs font-bold text-[#7c5c26]">
                          🎊{" "}
                          {t.eventTypes[
                            inv.event_type as keyof typeof t.eventTypes
                          ] || inv.event_type}
                        </span>

                        {inv.event_date && (
                          <span className="rounded-full bg-[#edf3e8] px-3 py-1 text-xs font-bold text-[#24543b]">
                            📅 {inv.event_date}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 text-xl font-bold text-[#203b2d]">
                        {title}
                      </h3>

                      <p className="mt-1 text-xs font-semibold text-[#54865b]">
                        {t.hostedBy} {inv.host_name}
                      </p>

                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#4c5b4e]">
                        {message}
                      </p>

                      {inv.venue && (
                        <div className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#f7f8f2] px-3.5 py-2 text-xs font-semibold text-[#203b2d]">
                          📍 {inv.venue}
                        </div>
                      )}
                    </div>
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