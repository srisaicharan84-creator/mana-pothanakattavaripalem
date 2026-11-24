"use client";

import { useState } from "react";
import Link from "next/link";

interface LandmarkItem {
  id: string;
  category: string;
  name: string;
  location: string;
  notes: string;
}

export default function VillageProfilePage() {
  const [language, setLanguage] = useState<"en" | "te">("en");

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
          backHome: "← Back to Home",
          eyebrow: "Village Profile & Heritage",
          pageTitle: "Rooted in Tradition. United in Spirit.",
          pageSubtitle:
            "Pothanakattavaripalem is a rural community located in Pittalavanipalem Mandal of Bapatla District, Andhra Pradesh—built on agriculture, shared traditions, and close-knit neighborhood bonds.",

          // Administrative & Geographic Facts
          factsEyebrow: "Administrative Profile",
          factsTitle: "Location & Governance Details",
          factsNotice:
            "Verified administrative, Panchayati Raj, and postal details for Pothanakattavaripalem are listed below.",
          facts: [
            {
              label: "Village Name",
              value: "Pothanakattavaripalem",
              verified: true,
            },
            {
              label: "Gram Panchayat",
              value: "Pothanakattavaripalem Grama Panchayat",
              verified: true,
            },
            {
              label: "Mandal",
              value: "Pittalavanipalem Mandal",
              verified: true,
            },
            {
              label: "District",
              value: "Bapatla District",
              verified: true,
            },
            {
              label: "State",
              value: "Andhra Pradesh, India",
              verified: true,
            },
            {
              label: "PIN Code",
              value: "522111",
              verified: true,
            },
          ],

          verifiedBadge: "Verified",
          pendingBadge: "Pending Record",

          // Village Life & Identity
          pillarsEyebrow: "Community Life",
          pillarsTitle: "What Defines Our Village",
          pillarsSubtitle:
            "Everyday life in Pothanakattavaripalem reflects coastal Andhra agrarian culture, generational respect, and collective participation.",
          pillars: [
            {
              icon: "🌾",
              title: "Agriculture & Livelihoods",
              desc: "Farming and allied rural livelihoods form the backbone of household life, shaped by seasonal crops and local irrigation.",
            },
            {
              icon: "🪔",
              title: "Culture & Festivals",
              desc: "Sankranti, Ugadi, Vinayaka Chavithi, and local temple celebrations bring families and neighbors together every year.",
            },
            {
              icon: "🎓",
              title: "Education & Youth",
              desc: "Growing focus on school education, higher studies, and youth contributing both locally and from outside the village.",
            },
            {
              icon: "🤝",
              title: "Community Solidarity",
              desc: "Residents stand together during family milestones, village maintenance drives, and shared civic needs.",
            },
          ],

          // Landmarks & Public Institutions
          landmarksEyebrow: "Public Infrastructure",
          landmarksTitle: "Schools, Temples & Community Spaces",
          landmarksNotice:
            "Only verified public institutions and village landmarks will be listed here.",
          emptyTitle: "No village landmarks added yet",
          emptyDesc:
            "Verified details of local temples, schools, Anganwadi centers, water tanks, and community halls will be published here.",
          landmarks: [] as LandmarkItem[],

          // Quick Navigation to Other Modules
          exploreEyebrow: "Continue Exploring",
          exploreTitle: "Explore Other Village Sections",
          quickLinks: [
            {
              icon: "🏗️",
              title: "Development Tracker",
              desc: "Track roads, water, and civic works",
              href: "/development",
            },
            {
              icon: "📊",
              title: "Public Accounts",
              desc: "View verified bills and records",
              href: "/transparency",
            },
            {
              icon: "📢",
              title: "Announcements",
              desc: "Read village notices and events",
              href: "/announcements",
            },
            {
              icon: "💬",
              title: "Community & Issues",
              desc: "Report an issue or share an idea",
              href: "/community",
            },
          ],

          // Footer
          footerTagline: "Our Village. Our Information. Our Community.",
          footerNote1: "Independent community information initiative.",
          footerNote2: "Not an official Gram Panchayat website.",
          footerCopyright: "© 2026 Mana Pothanakattavaripalem",
        }
      : {
          siteName: "మన పొతనకట్టవారిపాలెం",
          siteSubName: "Mana Pothanakattavaripalem",
          backHome: "← హోమ్ పేజీకి తిరిగి వెళ్ళండి",
          eyebrow: "గ్రామ పరిచయం & వారసత్వం",
          pageTitle: "సంప్రదాయంలో బలం. ఐక్యతలో ప్రగతి.",
          pageSubtitle:
            "పొతనకట్టవారిపాలెం ఆంధ్రప్రదేశ్ రాష్ట్రం, బాపట్ల జిల్లా, పిట్టలవానిపాలెం మండలంలో ఉన్న గ్రామం — వ్యవసాయం, సంప్రదాయాలు మరియు ఆత్మీయ అనుబంధాలకు నిలయం.",

          // Administrative & Geographic Facts
          factsEyebrow: "పరిపాలనా వివరాలు",
          factsTitle: "గ్రామ ఉనికి & పరిపాలనా సమాచారం",
          factsNotice:
            "పొతనకట్టవారిపాలెం గ్రామానికి సంబంధించిన ధృవీకరించబడిన పరిపాలనా, పంచాయతీ రాజ్ మరియు తపాలా వివరాలు క్రింద ఇవ్వబడ్డాయి.",
          facts: [
            {
              label: "గ్రామం పేరు",
              value: "పొతనకట్టవారిపాలెం",
              verified: true,
            },
            {
              label: "గ్రామ పంచాయతీ",
              value: "పొతనకట్టవారిపాలెం గ్రామ పంచాయతీ",
              verified: true,
            },
            {
              label: "మండలం",
              value: "పిట్టలవానిపాలెం మండలం",
              verified: true,
            },
            {
              label: "జిల్లా",
              value: "బాపట్ల జిల్లా",
              verified: true,
            },
            {
              label: "రాష్ట్రం",
              value: "ఆంధ్రప్రదేశ్, భారతదేశం",
              verified: true,
            },
            {
              label: "పిన్ కోడ్ (PIN Code)",
              value: "522111",
              verified: true,
            },
          ],

          verifiedBadge: "ధృవీకరించబడింది",
          pendingBadge: "రికార్డు త్వరలో",

          // Village Life & Identity
          pillarsEyebrow: "గ్రామ జీవనం",
          pillarsTitle: "మన గ్రామం యొక్క ప్రత్యేకతలు",
          pillarsSubtitle:
            "పొతనకట్టవారిపాలెంలో రోజువారీ జీవితం కోస్తా ఆంధ్ర వ్యవసాయ సంస్కృతి, పెద్దల పట్ల గౌరవం మరియు సమిష్టి భాగస్వామ్యాన్ని ప్రతిబింబిస్తుంది.",
          pillars: [
            {
              icon: "🌾",
              title: "వ్యవసాయం & జీవనోపాధి",
              desc: "వ్యవసాయం మరియు అనుబంధ గ్రామీణ వృత్తులు మన గ్రామ కుటుంబాల ఆర్థిక జీవనానికి ప్రధాన ఆధారం.",
            },
            {
              icon: "🪔",
              title: "సంస్కృతి & పండుగలు",
              desc: "సంక్రాంతి, ఉగాది, వినాయక చవితి మరియు స్థానిక ఆలయ ఉత్సవాలు ప్రతి ఏటా గ్రామస్థులందరినీ ఒకచోట చేరుస్తాయి.",
            },
            {
              icon: "🎓",
              title: "విద్య & యువత",
              desc: "పాఠశాల విద్య మరియు ఉన్నత చదువులపై పెరుగుతున్న ఆసక్తితో యువత గ్రామ అభివృద్ధికి తోడ్పడుతున్నారు.",
            },
            {
              icon: "🤝",
              title: "సామాజిక ఐక్యత",
              desc: "కుటుంబ వేడుకలు, గ్రామ అవసరాలు మరియు సామాజిక కార్యక్రమాలలో గ్రామస్థులందరూ కలిసికట్టుగా నిలుస్తారు.",
            },
          ],

          // Landmarks & Public Institutions
          landmarksEyebrow: "ప్రజా మౌలిక సదుపాయాలు",
          landmarksTitle: "పాఠశాలలు, ఆలయాలు & సామాజిక ప్రదేశాలు",
          landmarksNotice:
            "ధృవీకరించబడిన ప్రజా సంస్థలు మరియు గ్రామ గుర్తులు మాత్రమే ఇక్కడ చేర్చబడతాయి.",
          emptyTitle: "ఇప్పటివరకు ఎటువంటి గ్రామ ప్రదేశాలు చేర్చబడలేదు",
          emptyDesc:
            "స్థానిక ఆలయాలు, పాఠశాలలు, అంగన్‌వాడీ కేంద్రాలు, నీటి ట్యాంకులు మరియు సామాజిక భవనాల ధృవీకరించబడిన వివరాలు ఇక్కడ ప్రచురించబడతాయి.",
          landmarks: [] as LandmarkItem[],

          // Quick Navigation to Other Modules
          exploreEyebrow: "మరిన్ని విభాగాలు",
          exploreTitle: "గ్రామ వేదికలోని ఇతర విభాగాలను చూడండి",
          quickLinks: [
            {
              icon: "🏗️",
              title: "అభివృద్ధి ట్రాకర్",
              desc: "రహదారులు, నీరు మరియు గ్రామ పనుల పురోగతి",
              href: "/development",
            },
            {
              icon: "📊",
              title: "ప్రజా ఖాతాలు",
              desc: "ధృవీకరించబడిన బిల్లులు మరియు రికార్డులు",
              href: "/transparency",
            },
            {
              icon: "📢",
              title: "ప్రకటనలు",
              desc: "గ్రామ నోటీసులు మరియు కార్యక్రమాల వివరాలు",
              href: "/announcements",
            },
            {
              icon: "💬",
              title: "సమాజం & సమస్యలు",
              desc: "సమస్యను తెలియజేయండి లేదా సలహా ఇవ్వండి",
              href: "/community",
            },
          ],

          // Footer
          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerNote1: "స్వతంత్ర గ్రామ సమాచార వేదిక.",
          footerNote2: "ఇది అధికారిక గ్రామ పంచాయతీ వెబ్‌సైట్ కాదు.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      {/* Top Header */}
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
              aria-label="Switch language between English and Telugu"
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

      {/* Hero Banner */}
      <section className="bg-[#24543b] px-6 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl">
          <span className="inline-block rounded-full border border-[#e8d6a6]/40 bg-[#e8d6a6]/10 px-4 py-1.5 text-sm text-[#f5e8c9]">
            🏡 {t.eyebrow}
          </span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-[#fff8e9] md:text-5xl">
            {t.pageTitle}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#f0eadb]">
            {t.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Administrative & Geographic Details */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
          {t.factsEyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">{t.factsTitle}</h2>

        <div className="mt-4 rounded-2xl border border-[#e4d2a7] bg-[#fff8e9] px-5 py-3.5 text-sm leading-6 text-[#6b5c3e]">
          ℹ️ {t.factsNotice}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-[#e4e9df] bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#748174]">
                  {fact.label}
                </p>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    fact.verified
                      ? "bg-[#edf3e8] text-[#24543b]"
                      : "bg-[#f3f4f6] text-[#6b7280]"
                  }`}
                >
                  {fact.verified ? `✅ ${t.verifiedBadge}` : t.pendingBadge}
                </span>
              </div>
              <p
                className={`mt-3 text-lg font-bold ${
                  fact.verified ? "text-[#203b2d]" : "text-sm font-medium text-[#748174]"
                }`}
              >
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Village Life Pillars */}
      <section className="bg-[#edf3e8] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
            {t.pillarsEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            {t.pillarsTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5e6e5f]">
            {t.pillarsSubtitle}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.pillars.map((pillar) => (
              <div
                key={pillar.icon + pillar.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf3e8] text-2xl">
                  {pillar.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#69776a]">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Landmarks & Public Institutions */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
          {t.landmarksEyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">
          {t.landmarksTitle}
        </h2>

        <div className="mt-4 rounded-2xl border border-[#e4d2a7] bg-[#fff8e9] px-5 py-3.5 text-sm leading-6 text-[#6b5c3e]">
          ℹ️ {t.landmarksNotice}
        </div>

        {t.landmarks.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-[#e4e9df] bg-white p-10 text-center shadow-sm">
            <p className="text-4xl">🏛️</p>
            <h3 className="mt-4 text-lg font-bold text-[#203b2d]">
              {t.emptyTitle}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#69776a]">
              {t.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {t.landmarks.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#e4e9df] bg-white p-6 shadow-sm"
              >
                <span className="rounded-full bg-[#edf3e8] px-3 py-1 text-xs font-bold text-[#24543b]">
                  {item.category}
                </span>
                <h3 className="mt-3 text-lg font-bold">{item.name}</h3>
                <p className="mt-1 text-xs font-semibold text-[#748174]">
                  📍 {item.location}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#69776a]">
                  {item.notes}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Navigation Cards */}
      <section className="border-t border-[#e4e9df] bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
            {t.exploreEyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold">{t.exploreTitle}</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-[#e4e9df] bg-[#f7f8f2] p-5 transition hover:-translate-y-0.5 hover:border-[#a6c5a5] hover:bg-white hover:shadow-md"
              >
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-3 text-base font-bold">{item.title}</h3>
                <p className="mt-1 text-xs leading-6 text-[#69776a]">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#173f2b] px-6 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 md:flex-row">
          <div>
            <p className="text-xl font-bold">{t.siteName}</p>
            <p className="mt-2 text-sm text-[#c6d7c4]">{t.siteSubName}</p>
            <p className="mt-4 text-sm text-[#c6d7c4]">{t.footerTagline}</p>
          </div>
          <div className="text-sm leading-7 text-[#c6d7c4]">
            <p>{t.footerNote1}</p>
            <p>{t.footerNote2}</p>
            <p className="mt-2">{t.footerCopyright}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}