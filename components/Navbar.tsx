"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUserProfile, supabase, UserProfile } from "@/lib/supabase";

interface NavbarProps {
  language: "en" | "te";
  setLanguage: (lang: "en" | "te") => void;
  showBackHome?: boolean;
}

export default function Navbar({
  language,
  setLanguage,
  showBackHome = false,
}: NavbarProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const current = await getCurrentUserProfile();
      setProfile(current);
      setLoadingUser(false);
    }
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async () => {
      const updated = await getCurrentUserProfile();
      setProfile(updated);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    setProfile(null);
    router.refresh();
  }

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
          citizenBadge: "Citizen",
          adminBadge: "Admin",
          adminBtn: "Admin Dashboard",
          signInBtn: "Sign In",
          signOutBtn: "Sign Out",
          backHome: "← Home",
        }
      : {
          siteName: "మన పొతనకట్టవారిపాలెం",
          siteSubName: "Mana Pothanakattavaripalem",
          citizenBadge: "పౌరుడు (Citizen)",
          adminBadge: "నిర్వాహకుడు (Admin)",
          adminBtn: "అడ్మిన్ డ్యాష్‌బోర్డ్",
          signInBtn: "లాగిన్",
          signOutBtn: "లాగ్ అవుట్",
          backHome: "← హోమ్",
        };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4d2a7] bg-[#fff8e9]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3.5">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#245c3c] text-xl">
            🌿
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-[#203b2d] sm:text-base">
              {t.siteName}
            </p>
            <p className="text-[11px] text-[#718071]">{t.siteSubName}</p>
          </div>
        </Link>

        {/* Right Controls: User Badge + Admin Shortcut + Language + Auth */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {!loadingUser && profile && (
            <div className="flex items-center gap-2 rounded-full border border-[#d5b77d] bg-white px-3 py-1.5 text-xs shadow-xs">
              <span className="font-bold text-[#203b2d]">
                {profile.full_name}
              </span>
              {profile.role === "admin" ? (
                <span className="rounded-full bg-[#24543b] px-2 py-0.5 text-[10px] font-bold text-[#fff8e9]">
                  🛡️ {t.adminBadge}
                </span>
              ) : (
                <span className="rounded-full bg-[#edf3e8] px-2 py-0.5 text-[10px] font-bold text-[#245c3c]">
                  🏡 {t.citizenBadge}
                </span>
              )}
            </div>
          )}

          {/* Extra Admin Dashboard option appears when Admin logs in */}
          {!loadingUser && profile?.role === "admin" && (
            <Link
              href="/admin"
              className="rounded-full bg-[#edce83] px-3.5 py-1.5 text-xs font-bold text-[#203b2d] shadow-xs transition hover:bg-[#e4be66]"
            >
              ⚙️ {t.adminBtn}
            </Link>
          )}

          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "te" : "en")}
            className="rounded-full border border-[#d5b77d] bg-white/80 px-3.5 py-1.5 text-xs font-bold text-[#24543b] transition hover:bg-[#f5e8c9]"
          >
            {language === "en" ? "తెలుగు" : "English"}
          </button>

          {showBackHome && (
            <Link
              href="/"
              className="rounded-full border border-[#245c3c]/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#245c3c] transition hover:bg-[#edf3e8]"
            >
              {t.backHome}
            </Link>
          )}

          {/* Sign In / Sign Out */}
          {!loadingUser &&
            (profile ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                {t.signOutBtn}
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-[#245c3c] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#17462c]"
              >
                {t.signInBtn}
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
}