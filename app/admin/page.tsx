"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  getCurrentUserProfile,
  supabase,
  UserProfile,
} from "../../lib/supabase";

export default function AdminPage() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [checking, setChecking] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadUser() {
      const current = await getCurrentUserProfile();
      setProfile(current);
      setChecking(false);
    }
    loadUser();
  }, []);

  const t =
    language === "en"
      ? {
          checking: "Checking your access...",
          notSignedTitle: "Please sign in first",
          notSignedText:
            "The Admin Dashboard is only for authorized village administrators.",
          signInBtn: "Go to Sign In →",
          notAdminTitle: "Access not allowed",
          notAdminText:
            "Your account is a Resident account. Only Village Administrators can open this dashboard.",
          backHome: "← Back to Home",
          eyebrow: "Administrator Area",
          title: "Admin Dashboard",
          welcome: "Welcome,",
          intro:
            "From here, authorized administrators will manage the verified village records and display systems.",
          activeLabel: "Active Manager",
          comingNext: "Coming next",
          signOutBtn: "Sign Out",
          sections: [
            {
              icon: "🖼️",
              name: "Billboard Management",
              text: "Upload, order and manage main and supporting image billboards.",
              href: "/admin/billboards",
              active: true,
            },
            {
              icon: "📢",
              name: "Announcements",
              text: "Add and edit village announcements and events.",
              href: "/admin/announcements",
              active: true,
            },
            {
              icon: "💌",
              name: "Village Invitations",
              text: "Review, approve, or remove photo, video, and text event invitations.",
              href: "/admin/invitations",
              active: true,
            },
            {
              icon: "🏗️",
              name: "Development Works",
              text: "Manage roads, drainage, water and other projects.",
              href: "/admin/development",
              active: true,
            },
            {
              icon: "📒",
              name: "Transparency Records",
              text: "Manage income, expenditure and verification status.",
              href: "/admin/transparency",
              active: true,
            },
            {
              icon: "💬",
              name: "Community Reports",
              text: "Review and moderate issues (including anonymous submissions).",
              href: "/admin/community",
              active: true,
            },
          ],
          footerTagline: "Our Village. Our Information. Our Community.",
          footerCopyright: "© 2026 Mana Pothanakattavaripalem",
        }
      : {
          checking: "మీ అనుమతిని తనిఖీ చేస్తున్నాము...",
          notSignedTitle: "దయచేసి ముందు లాగిన్ అవ్వండి",
          notSignedText:
            "అడ్మిన్ డ్యాష్‌బోర్డ్ అధికారం పొందిన గ్రామ అడ్మినిస్ట్రేటర్లకు మాత్రమే.",
          signInBtn: "లాగిన్ పేజీకి వెళ్ళండి →",
          notAdminTitle: "ప్రవేశానికి అనుమతి లేదు",
          notAdminText:
            "మీ ఖాతా గ్రామస్థుడి ఖాతా. ఈ డ్యాష్‌బోర్డ్‌ను గ్రామ అడ్మినిస్ట్రేటర్లు మాత్రమే తెరవగలరు.",
          backHome: "← హోమ్ పేజీకి తిరిగి వెళ్ళండి",
          eyebrow: "నిర్వాహకుల విభాగం",
          title: "అడ్మిన్ డ్యాష్‌బోర్డ్",
          welcome: "స్వాగతం,",
          intro:
            "ఇక్కడినుండి అధికారం పొందిన అడ్మిన్‌లు ధృవీకరించిన గ్రామ రికార్డులను మరియు డిస్‌ప్లే సిస్టమ్‌లను నిర్వహిస్తారు.",
          activeLabel: "యాక్టివ్ మేనేజర్",
          comingNext: "త్వరలో",
          signOutBtn: "లాగ్ అవుట్ (Sign Out)",
          sections: [
            {
              icon: "🖼️",
              name: "బిల్ బోర్డ్ నిర్వహణ",
              text: "ప్రధాన మరియు సపోర్టింగ్ ఇమేజ్ బిల్ బోర్డ్‌లను అప్‌లోడ్ చేసి నిర్వహించండి.",
              href: "/admin/billboards",
              active: true,
            },
            {
              icon: "📢",
              name: "ప్రకటనలు",
              text: "గ్రామ ప్రకటనలు, కార్యక్రమాలను చేర్చండి, సవరించండి.",
              href: "/admin/announcements",
              active: true,
            },
            {
              icon: "💌",
              name: "గ్రామ ఆహ్వానాలు",
              text: "ఫోటో, వీడియో మరియు సందేశ ఆహ్వానాలను పరిశీలించి ఆమోదించండి.",
              href: "/admin/invitations",
              active: true,
            },
            {
              icon: "🏗️",
              name: "అభివృద్ధి పనులు",
              text: "రోడ్లు, డ్రైనేజీ, నీరు ఇతర పనులను నిర్వహించండి.",
              href: "/admin/development",
              active: true,
            },
            {
              icon: "📒",
              name: "పారదర్శకత రికార్డులు",
              text: "ఆదాయం, ఖర్చు, ధృవీకరణ స్థితిని నిర్వహించండి.",
              href: "/admin/transparency",
              active: true,
            },
            {
              icon: "💬",
              name: "సమాజ నివేదికలు",
              text: "గ్రామస్థులు తెలిపిన సమస్యలను (అజ్ఞాత నివేదికలతో సహా) సమీక్షించండి.",
              href: "/admin/community",
              active: true,
            },
          ],
          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  async function handleSignOut() {
    await supabase.auth.signOut();
    setProfile(null);
  }

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      <Navbar language={language} setLanguage={setLanguage} showBackHome />

      {/* 1. Still checking */}
      {checking && (
        <section className="mx-auto max-w-lg px-6 py-20 text-center">
          <p className="text-sm text-[#69776a]">{t.checking}</p>
        </section>
      )}

      {/* 2. Not signed in */}
      {!checking && !profile && (
        <section className="mx-auto max-w-lg px-6 py-20">
          <div className="rounded-3xl border border-[#e4e9df] bg-white p-8 text-center shadow-sm">
            <p className="text-4xl">🔐</p>
            <h1 className="mt-3 text-2xl font-bold">{t.notSignedTitle}</h1>
            <p className="mt-2 text-sm leading-7 text-[#69776a]">
              {t.notSignedText}
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-xl bg-[#245c3c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#17462c]"
            >
              {t.signInBtn}
            </Link>
          </div>
        </section>
      )}

      {/* 3. Signed in but not an admin */}
      {!checking && profile && profile.role !== "admin" && (
        <section className="mx-auto max-w-lg px-6 py-20">
          <div className="rounded-3xl border border-[#e4e9df] bg-white p-8 text-center shadow-sm">
            <p className="text-4xl">🚫</p>
            <h1 className="mt-3 text-2xl font-bold">{t.notAdminTitle}</h1>
            <p className="mt-2 text-sm leading-7 text-[#69776a]">
              {t.notAdminText}
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-[#245c3c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#17462c]"
            >
              {t.backHome}
            </Link>
          </div>
        </section>
      )}

      {/* 4. Admin dashboard */}
      {!checking && profile && profile.role === "admin" && (
        <>
          <section className="bg-[#24543b] px-6 py-14 text-white">
            <div className="mx-auto max-w-5xl">
              <span className="inline-block rounded-full border border-[#e8d6a6]/40 bg-[#e8d6a6]/10 px-4 py-1.5 text-sm text-[#f5e8c9]">
                🛡️ {t.eyebrow}
              </span>
              <h1 className="mt-4 text-3xl font-bold text-[#fff8e9] md:text-4xl">
                {t.title}
              </h1>
              <p className="mt-3 text-base text-[#f5e8c9]">
                {t.welcome} {profile.full_name}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#f0eadb]">
                {t.intro}
              </p>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-6 py-12">
            <div className="grid gap-5 sm:grid-cols-2">
              {t.sections.map((section) => {
                const cardContent = (
                  <div className="h-full rounded-3xl border border-[#e4e9df] bg-white p-6 shadow-sm transition hover:border-[#d5b77d] hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-3xl">{section.icon}</span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          section.active
                            ? "bg-[#245c3c]/10 text-[#245c3c]"
                            : "bg-[#fff8e9] text-[#8a6d2f]"
                        }`}
                      >
                        {section.active ? t.activeLabel : t.comingNext}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg font-bold">{section.name}</h2>
                    <p className="mt-1 text-sm leading-6 text-[#69776a]">
                      {section.text}
                    </p>
                  </div>
                );

                return section.active ? (
                  <Link key={section.name} href={section.href} className="block">
                    {cardContent}
                  </Link>
                ) : (
                  <div key={section.name}>{cardContent}</div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="mt-8 rounded-xl border border-[#e4e9df] bg-white px-6 py-3 text-sm font-semibold text-[#69776a] transition hover:bg-[#eef2ea]"
            >
              {t.signOutBtn}
            </button>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-[#173f2b] px-6 py-8 text-center text-sm text-[#c6d7c4]">
        <p>{t.footerTagline}</p>
        <p className="mt-1 text-xs">{t.footerCopyright}</p>
      </footer>
    </main>
  );
}