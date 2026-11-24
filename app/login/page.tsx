"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCurrentUserProfile,
  supabase,
  UserProfile,
} from "../../lib/supabase";

export default function LoginPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function loadUser() {
      const current = await getCurrentUserProfile();
      setProfile(current);
      setCheckingSession(false);
    }
    loadUser();
  }, []);

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
          backHome: "← Back to Home",
          eyebrow: "Resident & Admin Portal",
          pageTitle: "Village Account Access",
          pageSubtitle:
            "Sign in as a resident to report village issues or share ideas, or sign in with an authorized Administrator account to manage verified village records.",

          signInTab: "Sign In",
          signUpTab: "New Resident Sign Up",

          nameLabel: "Full Name",
          namePlaceholder: "Enter your full name",
          emailLabel: "Email Address",
          emailPlaceholder: "name@example.com",
          passwordLabel: "Password",
          passwordPlaceholder: "Minimum 6 characters",

          signInBtn: "Sign In",
          signUpBtn: "Create Resident Account",
          processingBtn: "Please wait...",

          roleNote:
            "Every new account starts as a Resident (Citizen) account. Only verified village coordinators promoted by the database administrator receive Admin editing privileges.",

          loggedInAs: "Signed In Account",
          adminRoleBadge: "🛡️ Village Administrator",
          citizenRoleBadge: "🏡 Verified Resident",
          adminPanelBtn: "Open Admin Dashboard →",
          communityBtn: "Go to Community & Issues →",
          signOutBtn: "Sign Out",

          signupSuccess:
            "Account created! Check your email inbox for a verification link if required, or sign in directly below.",
          footerTagline: "Our Village. Our Information. Our Community.",
          footerCopyright: "© 2026 Mana Pothanakattavaripalem",
        }
      : {
          siteName: "మన పొతనకట్టవారిపాలెం",
          siteSubName: "Mana Pothanakattavaripalem",
          backHome: "← హోమ్ పేజీకి తిరిగి వెళ్ళండి",
          eyebrow: "గ్రామస్థులు & నిర్వాహకుల లాగిన్",
          pageTitle: "గ్రామ ఖాతా ప్రవేశం",
          pageSubtitle:
            "గ్రామ సమస్యలను తెలియజేయడానికి గ్రామస్థులుగా లాగిన్ అవ్వండి, లేదా ధృవీకరించబడిన గ్రామ రికార్డులను నిర్వహించడానికి అడ్మిన్ ఖాతాతో ప్రవేశించండి.",

          signInTab: "లాగిన్ (Sign In)",
          signUpTab: "కొత్త గ్రామస్థుల నమోదు",

          nameLabel: "పూర్తి పేరు",
          namePlaceholder: "మీ పూర్తి పేరు నమోదు చేయండి",
          emailLabel: "ఇమెయిల్ చిరునామా",
          emailPlaceholder: "name@example.com",
          passwordLabel: "పాస్‌వర్డ్",
          passwordPlaceholder: "కనీసం 6 అక్షరాలు",

          signInBtn: "లాగిన్ అవ్వండి",
          signUpBtn: "గ్రామస్థుడి ఖాతా సృష్టించండి",
          processingBtn: "దయచేసి వేచి ఉండండి...",

          roleNote:
            "ప్రతి కొత్త ఖాతా సాధారణ గ్రామస్థుడి (Citizen) ఖాతాగా ప్రారంభమవుతుంది. అధికారిక సమాచారాన్ని సవరించే హక్కు కేవలం ధృవీకరించబడిన అడ్మిన్‌లకు మాత్రమే ఉంటుంది.",

          loggedInAs: "లాగిన్ అయిన ఖాతా",
          adminRoleBadge: "🛡️ గ్రామ అడ్మినిస్ట్రేటర్",
          citizenRoleBadge: "🏡 నమోదైన గ్రామస్థుడు",
          adminPanelBtn: "అడ్మిన్ డ్యాష్‌బోర్డ్ తెరవండి →",
          communityBtn: "సమాజం & సమస్యల విభాగానికి వెళ్ళండి →",
          signOutBtn: "లాగ్ అవుట్ (Sign Out)",

          signupSuccess:
            "ఖాతా సృష్టించబడింది! మీ ఇమెయిల్‌కు నిర్ధారణ లింక్ వచ్చిందేమో చూడండి లేదా క్రింద లాగిన్ అవ్వండి.",
          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;

        const current = await getCurrentUserProfile();
        setProfile(current);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim() || "Resident",
            },
          },
        });
        if (error) throw error;

        if (data.session) {
          const current = await getCurrentUserProfile();
          setProfile(current);
        } else {
          setSuccessMsg(t.signupSuccess);
          setMode("signin");
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Authentication failed.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setProfile(null);
    setSuccessMsg("");
    setErrorMsg("");
  }

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      {/* Header */}
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

      {/* Banner */}
      <section className="bg-[#24543b] px-6 py-14 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-[#e8d6a6]/40 bg-[#e8d6a6]/10 px-4 py-1.5 text-sm text-[#f5e8c9]">
            🔐 {t.eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-[#fff8e9] md:text-4xl">
            {t.pageTitle}
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#f0eadb] md:text-base">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Main Card */}
      <section className="mx-auto max-w-lg px-6 py-14">
        <div className="rounded-3xl border border-[#e4e9df] bg-white p-7 shadow-sm md:p-9">
          {checkingSession ? (
            <p className="py-8 text-center text-sm text-[#69776a]">
              {t.processingBtn}
            </p>
          ) : profile ? (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#e4e9df] bg-[#f7f8f2] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#748174]">
                  {t.loggedInAs}
                </p>
                <p className="mt-2 text-xl font-bold text-[#203b2d]">
                  {profile.full_name}
                </p>
                <p className="text-sm text-[#69776a]">{profile.email}</p>

                <span
                  className={`mt-3 inline-block rounded-full px-3.5 py-1 text-xs font-bold ${
                    profile.role === "admin"
                      ? "bg-[#245c3c] text-[#edce83]"
                      : "bg-[#edf3e8] text-[#24543b]"
                  }`}
                >
                  {profile.role === "admin"
                    ? t.adminRoleBadge
                    : t.citizenRoleBadge}
                </span>
              </div>

              <div className="space-y-3">
                {profile.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block w-full rounded-xl bg-[#245c3c] px-5 py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#17462c]"
                  >
                    {t.adminPanelBtn}
                  </Link>
                )}

                <Link
                  href="/community"
                  className="block w-full rounded-xl border border-[#245c3c] bg-white px-5 py-3.5 text-center text-sm font-bold text-[#245c3c] transition hover:bg-[#edf3e8]"
                >
                  {t.communityBtn}
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full rounded-xl border border-[#e4e9df] bg-[#f7f8f2] px-5 py-3 text-sm font-semibold text-[#69776a] transition hover:bg-[#eef2ea]"
                >
                  {t.signOutBtn}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Mode Switch Tabs */}
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#f7f8f2] p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className={`rounded-xl py-2.5 text-sm font-bold transition ${
                    mode === "signin"
                      ? "bg-[#245c3c] text-white shadow-sm"
                      : "text-[#4c5b4e] hover:text-[#203b2d]"
                  }`}
                >
                  {t.signInTab}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg("");
                    setSuccessMsg("");
                  }}
                  className={`rounded-xl py-2.5 text-sm font-bold transition ${
                    mode === "signup"
                      ? "bg-[#245c3c] text-white shadow-sm"
                      : "text-[#4c5b4e] hover:text-[#203b2d]"
                  }`}
                >
                  {t.signUpTab}
                </button>
              </div>

              {errorMsg && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                  ⚠️ {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="mt-5 rounded-xl border border-[#b7d1b2] bg-[#edf3e8] px-4 py-3 text-xs font-medium text-[#24543b]">
                  ✅ {successMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {mode === "signup" && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4c5b4e]">
                    {t.passwordLabel}
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="mt-1.5 w-full rounded-xl border border-[#d5dfd2] bg-[#f7f8f2] px-4 py-3 text-sm outline-none focus:border-[#245c3c] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-xl bg-[#245c3c] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#17462c] disabled:opacity-60"
                >
                  {loading
                    ? t.processingBtn
                    : mode === "signin"
                    ? t.signInBtn
                    : t.signUpBtn}
                </button>
              </form>

              <p className="mt-6 rounded-xl border border-[#e4d2a7] bg-[#fff8e9] p-4 text-xs leading-6 text-[#6b5c3e]">
                ℹ️ {t.roleNote}
              </p>
            </>
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