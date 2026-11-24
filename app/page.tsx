"use client";

import { useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
          village: "Village",
          development: "Development",
          transparency: "Transparency",
          announcements: "Announcements",
          community: "Community",
          getInvolved: "Get Involved",
          signIn: "Sign In / Admin",
          menuLabel: "Menu",
          closeLabel: "Close",
          welcome: "Welcome to our village",
          heroTitleLine1: "Mana Village.",
          heroTitleLine2: "Mana Heritage.",
          description:
            "Rooted in tradition, growing towards tomorrow. Discover our village, its people, development and community through one digital platform.",
          explore: "Explore Our Village →",
          publicRecords: "Public Records",
          illustrationTitle: "Our Village • Our Pride",
          illustrationSubtitle: "MANA POTHANAKATTAVARIPALEM",
          introEyebrow: "Discover our home",
          introHeading: "Everything about our village, in one place.",
          introDescription:
            "A digital platform to collect, organize and share useful village information. Our goal is to make information easier to find and community participation easier.",
          exploreSection: "Explore section →",
          services: [
            {
              icon: "🏡",
              title: "Village Profile",
              subtitle: "Our village and its history",
              href: "/village",
            },
            {
              icon: "📊",
              title: "Public Accounts",
              subtitle: "Income, expenses and records",
              href: "/transparency",
            },
            {
              icon: "🏗️",
              title: "Development",
              subtitle: "Projects and progress updates",
              href: "/development",
            },
            {
              icon: "📢",
              title: "Announcements",
              subtitle: "News, events and notices",
              href: "/announcements",
            },
            {
              icon: "💬",
              title: "Community",
              subtitle: "Ideas and discussions",
              href: "/community",
            },
            {
              icon: "📝",
              title: "Report an Issue",
              subtitle: "Share a village concern",
              href: "/community",
            },
          ],
          devEyebrow: "Building together",
          devHeading: "Village Development",
          devSubtitle: "Follow village works, project details and progress.",
          devBadge: "Open project tracker →",
          devCardText:
            "Project details and verified progress updates will be published here.",
          devStatus: "Information coming soon",
          developmentItems: [
            { icon: "🛣️", title: "Roads and Infrastructure" },
            { icon: "💧", title: "Water and Drainage" },
            { icon: "♻️", title: "Sanitation and Waste Management" },
          ],
          transEyebrow: "Open information",
          transHeading: "Public information. Clear records.",
          transDescription:
            "An organized place for public financial records, supporting documents, approved plans and village development expenditure. Records will be published only after appropriate review.",
          learnMore: "Learn More →",
          recordsTitle: "Records Centre",
          recordsComingSoon: "Coming soon",
          recordsDisclaimer:
            "Official documents and community-submitted information will be clearly distinguished.",
          recordsItems: [
            { icon: "📄", title: "Bills and Invoices" },
            { icon: "📚", title: "Cash Books and Expenditure" },
            { icon: "📋", title: "Plans and Work Orders" },
            { icon: "📁", title: "Government Documents" },
          ],
          annEyebrow: "Stay connected",
          annHeading: "Latest Announcements",
          annDescription:
            "Village notices, public meetings, celebrations and important community updates will appear here.",
          annEmpty: "No announcements published yet.",
          annCta: "Open Notice Board →",
          commEyebrow: "Together we grow",
          commHeading: "Your Village. Your Voice.",
          commDescription:
            "Share ideas, raise concerns and participate in making our village a better place.",
          commBoxTitle: "Community participation",
          commBoxText:
            "Issue reporting and community discussions will be introduced after moderation and privacy controls are ready.",
          commCta: "Open Community & Issue Form →",
          templeEyebrow: "Reserved for the future",
          templeHeading: "Virtual Temple",
          templeDescription:
            "A dedicated space for future temple updates, daily photographs, calendar and virtual darshan.",
          templeBadge: "Coming in a future phase",
          footerTagline: "Our Village. Our Information. Our Community.",
          footerNote1: "Independent community information initiative.",
          footerNote2: "Not an official Gram Panchayat website.",
          footerCopyright: "© 2026 Mana Pothanakattavaripalem",
        }
      : {
          siteName: "మన పొతనకట్టవారిపాలెం",
          siteSubName: "Mana Pothanakattavaripalem",
          village: "గ్రామం",
          development: "అభివృద్ధి",
          transparency: "పారదర్శకత",
          announcements: "ప్రకటనలు",
          community: "సమాజం",
          getInvolved: "పాల్గొనండి",
          signIn: "లాగిన్ / అడ్మిన్",
          menuLabel: "మెనూ",
          closeLabel: "మూసివేయండి",
          welcome: "మన గ్రామానికి స్వాగతం",
          heroTitleLine1: "మన గ్రామం.",
          heroTitleLine2: "మన వారసత్వం.",
          description:
            "సంప్రదాయాలను కాపాడుకుంటూ అభివృద్ధి వైపు ముందుకు సాగుదాం. మన గ్రామం, ప్రజలు, అభివృద్ధి మరియు సమాజ సమాచారాన్ని ఒకే వేదికపై తెలుసుకోండి.",
          explore: "మన గ్రామాన్ని తెలుసుకోండి →",
          publicRecords: "ప్రజా రికార్డులు",
          illustrationTitle: "మన ఊరు • మన గర్వం",
          illustrationSubtitle: "మన పొతనకట్టవారిపాలెం",
          introEyebrow: "మన ఊరిని తెలుసుకోండి",
          introHeading: "మన గ్రామానికి సంబంధించిన సమగ్ర సమాచారం, ఒకే వేదికపై.",
          introDescription:
            "మన గ్రామానికి ఉపయోగపడే సమాచారాన్ని సేకరించి, క్రమబద్ధీకరించి అందరికీ అందుబాటులో ఉంచే డిజిటల్ వేదిక. సమాచారాన్ని సులభంగా తెలుసుకోవడం మరియు గ్రామ అభివృద్ధిలో అందరి భాగస్వామ్యాన్ని పెంచడం మా లక్ష్యం.",
          exploreSection: "వివరాలు చూడండి →",
          services: [
            {
              icon: "🏡",
              title: "గ్రామ పరిచయం",
              subtitle: "మన గ్రామం మరియు దాని చరిత్ర",
              href: "/village",
            },
            {
              icon: "📊",
              title: "ప్రజా ఖాతాలు",
              subtitle: "ఆదాయం, ఖర్చులు మరియు రికార్డులు",
              href: "/transparency",
            },
            {
              icon: "🏗️",
              title: "అభివృద్ధి పనులు",
              subtitle: "ప్రాజెక్టులు మరియు పురోగతి వివరాలు",
              href: "/development",
            },
            {
              icon: "📢",
              title: "ప్రకటనలు",
              subtitle: "వార్తలు, వేడుకలు మరియు నోటీసులు",
              href: "/announcements",
            },
            {
              icon: "💬",
              title: "సమాజ వేదిక",
              subtitle: "సలహాలు మరియు చర్చలు",
              href: "/community",
            },
            {
              icon: "📝",
              title: "సమస్యను తెలియజేయండి",
              subtitle: "గ్రామ సమస్యలను మా దృష్టికి తీసుకురండి",
              href: "/community",
            },
          ],
          devEyebrow: "కలిసి నిర్మిద్దాం",
          devHeading: "గ్రామ అభివృద్ధి",
          devSubtitle:
            "గ్రామంలో జరుగుతున్న పనులు, ప్రాజెక్టు వివరాలు మరియు పురోగతిని తెలుసుకోండి.",
          devBadge: "ప్రాజెక్ట్ ట్రాకర్ చూడండి →",
          devCardText:
            "ప్రాజెక్టు వివరాలు మరియు ధృవీకరించబడిన పురోగతి సమాచారం ఇక్కడ ప్రచురించబడతాయి.",
          devStatus: "సమాచారం త్వరలో అందుబాటులోకి వస్తుంది",
          developmentItems: [
            { icon: "🛣️", title: "రహదారులు మరియు మౌలిక సదుపాయాలు" },
            { icon: "💧", title: "తాగునీరు మరియు డ్రైనేజీ" },
            { icon: "♻️", title: "పారిశుధ్యం మరియు వ్యర్థాల నిర్వహణ" },
          ],
          transEyebrow: "బహిరంగ సమాచారం",
          transHeading: "ప్రజా సమాచారం. స్పష్టమైన రికార్డులు.",
          transDescription:
            "ప్రజా ఆర్థిక రికార్డులు, సహాయక పత్రాలు, ఆమోదించబడిన ప్రణాళికలు మరియు గ్రామ అభివృద్ధి ఖర్చుల వివరాలను ఒకే చోట తెలుసుకునే వేదిక. సరైన పరిశీలన తర్వాతే రికార్డులు ప్రచురించబడతాయి.",
          learnMore: "మరిన్ని వివరాలు →",
          recordsTitle: "రికార్డుల కేంద్రం",
          recordsComingSoon: "త్వరలో",
          recordsDisclaimer:
            "అధికారిక పత్రాలు మరియు గ్రామస్థులు అందించిన సమాచారం స్పష్టంగా వేరు చేసి చూపబడతాయి.",
          recordsItems: [
            { icon: "📄", title: "బిల్లులు మరియు ఇన్‌వాయిస్‌లు" },
            { icon: "📚", title: "నగదు పుస్తకాలు మరియు ఖర్చులు" },
            { icon: "📋", title: "ప్రణాళికలు మరియు వర్క్ ఆర్డర్లు" },
            { icon: "📁", title: "ప్రభుత్వ పత్రాలు" },
          ],
          annEyebrow: "ఎప్పటికప్పుడు తెలుసుకోండి",
          annHeading: "తాజా ప్రకటనలు",
          annDescription:
            "గ్రామ నోటీసులు, గ్రామ సభలు, పండుగ వేడుకలు మరియు ముఖ్యమైన సమాచార ప్రకటనలు ఇక్కడ కనిపిస్తాయి.",
          annEmpty: "ఇప్పటివరకు ఎటువంటి ప్రకటనలు ప్రచురించబడలేదు.",
          annCta: "నోటీసు బోర్డు చూడండి →",
          commEyebrow: "కలిసి ఎదుగుదాం",
          commHeading: "మీ గ్రామం. మీ గొంతుక.",
          commDescription:
            "మీ ఆలోచనలను పంచుకోండి, సమస్యలను తెలియజేయండి మరియు మన గ్రామాన్ని మరింత అభివృద్ధి చేయడంలో భాగస్వాములు కండి.",
          commBoxTitle: "సమాజ భాగస్వామ్యం",
          commBoxText:
            "నియంత్రణ (మోడరేషన్) మరియు గోప్యతా భద్రతా చర్యలు సిద్ధమైన తర్వాత సమస్యల నమోదు మరియు సమాజ చర్చలు ప్రారంభించబడతాయి.",
          commCta: "సమస్యల నమోదు & సమాజ వేదిక →",
          templeEyebrow: "భవిష్యత్తు కోసం కేటాయించబడింది",
          templeHeading: "వర్చువల్ దేవాలయం",
          templeDescription:
            "భవిష్యత్తులో దేవాలయ విశేషాలు, రోజువారీ దర్శన చిత్రాలు, పండుగల క్యాలెండర్ మరియు వర్చువల్ దర్శనం కోసం ప్రత్యేకంగా కేటాయించిన వేదిక.",
          templeBadge: "తదుపరి దశలో ప్రారంభమవుతుంది",
          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerNote1: "స్వతంత్ర గ్రామ సమాచార వేదిక.",
          footerNote2: "ఇది అధికారిక గ్రామ పంచాయతీ వెబ్‌సైట్ కాదు.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  const navLinks = [
    { href: "#village", label: t.village },
    { href: "#development", label: t.development },
    { href: "#transparency", label: t.transparency },
    { href: "#announcements", label: t.announcements },
    { href: "#community", label: t.community },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#e4d2a7] bg-[#fff8e9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#245c3c] text-2xl">
              🌿
            </div>
            <div>
              <p className="text-base font-bold tracking-tight sm:text-lg">
                {t.siteName}
              </p>
              <p className="text-xs text-[#718071]">{t.siteSubName}</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-[#398451]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Language Toggle + Sign In + CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "te" : "en")}
              aria-label="Switch language between English and Telugu"
              className="rounded-full border border-[#d5b77d] bg-white/80 px-4 py-2 text-sm font-bold text-[#24543b] transition hover:bg-[#f5e8c9]"
            >
              {language === "en" ? "తెలుగు" : "English"}
            </button>

            <a
              href="/login"
              className="hidden rounded-full border border-[#245c3c] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#245c3c] transition hover:bg-[#edf3e8] sm:inline-block"
            >
              🔐 {t.signIn}
            </a>

            <a
              href="/community"
              className="hidden rounded-full bg-[#245c3c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#17462c] sm:inline-block"
            >
              {t.getInvolved}
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="rounded-full border border-[#d5b77d] px-3.5 py-2 text-sm font-semibold text-[#24543b] transition hover:bg-[#f5e8c9] lg:hidden"
            >
              {mobileMenuOpen ? `✕ ${t.closeLabel}` : `☰ ${t.menuLabel}`}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-[#e4d2a7] bg-[#fff8e9] px-5 py-4 lg:hidden">
            <div className="flex flex-col space-y-3 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 transition hover:bg-[#f5e8c9] hover:text-[#24543b]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-full border border-[#245c3c] px-5 py-2.5 text-center font-semibold text-[#245c3c] transition hover:bg-[#edf3e8] sm:hidden"
              >
                🔐 {t.signIn}
              </a>
              <a
                href="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full bg-[#245c3c] px-5 py-2.5 text-center font-semibold text-white transition hover:bg-[#17462c] sm:hidden"
              >
                {t.getInvolved}
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#24543b]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-block rounded-full border border-[#e8d6a6]/40 bg-[#e8d6a6]/10 px-4 py-2 text-sm text-[#f5e8c9]">
              🌾 {t.welcome}
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight text-[#fff8e9] md:text-6xl">
              {t.heroTitleLine1}
              <br />
              {t.heroTitleLine2}
            </h1>

            <p className="mt-5 text-2xl font-semibold text-[#edce83]">
              {t.siteName}
            </p>

            <p className="mt-5 max-w-lg text-base leading-8 text-[#f0eadb]">
              {t.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#village"
                className="rounded-full bg-[#edce83] px-7 py-3.5 font-semibold text-[#24452f] transition hover:bg-[#f7e4b4]"
              >
                {t.explore}
              </a>
              <a
                href="#transparency"
                className="rounded-full border border-[#f5e8c9]/50 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                {t.publicRecords}
              </a>
            </div>
          </div>

          {/* Traditional village illustration */}
          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-[2rem] border-4 border-[#e8d6a6] bg-[#f8edcf] shadow-2xl">
              <svg
                viewBox="0 0 600 440"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Illustration of a traditional Andhra village with houses, coconut trees and green fields"
                className="w-full"
              >
                {/* Sky */}
                <rect width="600" height="440" fill="#f5dfad" />

                {/* Sun */}
                <circle cx="480" cy="85" r="43" fill="#d99b43" />
                <circle
                  cx="480"
                  cy="85"
                  r="54"
                  fill="none"
                  stroke="#d99b43"
                  strokeWidth="3"
                  opacity=".4"
                />

                {/* Distant hills */}
                <path
                  d="M0 245 Q100 155 210 235 Q330 145 450 235 Q530 180 600 225 L600 440 L0 440Z"
                  fill="#9bad69"
                />

                {/* Fields */}
                <path
                  d="M0 300 Q150 255 300 300 Q450 255 600 300 L600 440 L0 440Z"
                  fill="#63864c"
                />
                <path
                  d="M0 350 Q160 310 300 350 Q460 310 600 350"
                  fill="none"
                  stroke="#c4bc72"
                  strokeWidth="5"
                />
                <path
                  d="M0 390 Q160 350 300 390 Q460 350 600 390"
                  fill="none"
                  stroke="#c4bc72"
                  strokeWidth="5"
                />

                {/* Village house 1 */}
                <rect
                  x="90"
                  y="225"
                  width="145"
                  height="115"
                  rx="4"
                  fill="#d77b4c"
                />
                <path d="M72 230 L162 150 L253 230Z" fill="#93452e" />
                <path
                  d="M86 225 L162 160 L240 225"
                  fill="none"
                  stroke="#edb47a"
                  strokeWidth="7"
                />
                <rect x="145" y="273" width="39" height="67" fill="#75452f" />
                <rect x="104" y="250" width="26" height="28" fill="#f4d79d" />
                <rect x="196" y="250" width="25" height="28" fill="#f4d79d" />

                {/* Village house 2 */}
                <rect
                  x="340"
                  y="245"
                  width="120"
                  height="95"
                  rx="3"
                  fill="#e4a05e"
                />
                <path d="M325 250 L400 185 L475 250Z" fill="#9b4b32" />
                <rect x="383" y="285" width="34" height="55" fill="#75452f" />
                <rect x="350" y="265" width="23" height="23" fill="#f8e2b6" />
                <rect x="428" y="265" width="22" height="23" fill="#f8e2b6" />

                {/* Coconut tree left */}
                <path
                  d="M55 300 Q60 210 38 125"
                  fill="none"
                  stroke="#78502f"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M38 125 Q-5 105 5 70 Q25 80 38 125 Q35 65 75 58 Q65 90 38 125 Q95 95 103 122 Q68 145 38 125"
                  fill="#477344"
                />

                {/* Coconut tree right */}
                <path
                  d="M530 305 Q520 220 550 135"
                  fill="none"
                  stroke="#78502f"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M550 135 Q505 105 510 75 Q540 85 550 135 Q565 75 595 70 Q585 110 550 135 Q600 115 600 150 Q570 158 550 135"
                  fill="#477344"
                />

                {/* Small plants */}
                <g fill="#3f7042">
                  <circle cx="265" cy="310" r="13" />
                  <circle cx="285" cy="318" r="17" />
                  <circle cx="300" cy="310" r="12" />
                  <circle cx="490" cy="320" r="14" />
                  <circle cx="510" cy="325" r="17" />
                </g>

                {/* Path */}
                <path
                  d="M250 440 Q270 375 290 340 L340 340 Q325 390 370 440Z"
                  fill="#d5b77d"
                />

                {/* Decorative birds */}
                <path
                  d="M270 110 q12 -12 24 0 q12 -12 24 0"
                  fill="none"
                  stroke="#77563b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M330 85 q9 -9 18 0 q9 -9 18 0"
                  fill="none"
                  stroke="#77563b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Foreground flowers */}
                <g fill="#f4d17c">
                  <circle cx="50" cy="365" r="5" />
                  <circle cx="70" cy="385" r="5" />
                  <circle cx="550" cy="375" r="5" />
                  <circle cx="575" cy="350" r="5" />
                </g>
              </svg>
              <div className="bg-[#fff8e9] px-5 py-4 text-center">
                <p className="font-bold text-[#24543b]">{t.illustrationTitle}</p>
                <p className="mt-1 text-xs tracking-wide text-[#8a6940]">
                  {t.illustrationSubtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section id="village" className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
            {t.introEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            {t.introHeading}
          </h2>
          <p className="mt-5 leading-8 text-[#69776a]">{t.introDescription}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map((service) => (
            <a
              key={service.href + service.icon}
              href={service.href}
              className="group rounded-2xl border border-[#e4e9df] bg-white p-6 transition hover:-translate-y-1 hover:border-[#a6c5a5] hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf3e8] text-2xl">
                {service.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold">{service.title}</h3>
              <p className="mt-2 text-sm text-[#748174]">{service.subtitle}</p>
              <p className="mt-5 text-sm font-semibold text-[#39744a]">
                {t.exploreSection}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Development */}
      <section id="development" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
                {t.devEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold">{t.devHeading}</h2>
              <p className="mt-3 text-[#748174]">{t.devSubtitle}</p>
            </div>
            <a
              href="/development"
              className="rounded-full bg-[#edf3e8] px-4 py-2 text-sm font-semibold text-[#39744a] transition hover:bg-[#dce9d5]"
            >
              {t.devBadge}
            </a>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.developmentItems.map((item) => (
              <div
                key={item.icon}
                className="rounded-2xl border border-[#e4e9df] bg-[#f7f8f2] p-7"
              >
                <p className="text-4xl">{item.icon}</p>
                <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#748174]">
                  {t.devCardText}
                </p>
                <span className="mt-5 inline-block rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#657565]">
                  {t.devStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section id="transparency" className="bg-[#edf3e8] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#54865b]">
              {t.transEyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {t.transHeading}
            </h2>
            <p className="mt-5 leading-8 text-[#657565]">{t.transDescription}</p>
            <a
              href="/transparency"
              className="mt-7 inline-block rounded-full bg-[#245c3c] px-6 py-3 font-semibold text-white transition hover:bg-[#17462c]"
            >
              {t.learnMore}
            </a>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold">{t.recordsTitle}</h3>
            <div className="mt-6 space-y-4">
              {t.recordsItems.map((record) => (
                <div
                  key={record.icon}
                  className="flex items-center gap-4 rounded-xl bg-[#f7f8f2] p-4"
                >
                  <span className="text-2xl">{record.icon}</span>
                  <span className="font-semibold">{record.title}</span>
                  <span className="ml-auto text-xs text-[#8b9989]">
                    {t.recordsComingSoon}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-6 text-[#879287]">
              {t.recordsDisclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Announcements and community */}
      <section id="announcements" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#54865b]">
                {t.annEyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-bold">{t.annHeading}</h2>
              <p className="mt-4 leading-7 text-[#748174]">
                {t.annDescription}
              </p>
              <div className="mt-6 rounded-xl bg-[#f7f8f2] p-5 text-sm text-[#748174]">
                {t.annEmpty}
              </div>
            </div>
            <div className="mt-6">
              <a
                href="/announcements"
                className="inline-block rounded-full bg-[#245c3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#17462c]"
              >
                {t.annCta}
              </a>
            </div>
          </div>

          <div id="community" className="rounded-3xl bg-[#245c3c] p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#c5dfb9]">
              {t.commEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold">{t.commHeading}</h2>
            <p className="mt-4 leading-7 text-[#d6e4d4]">{t.commDescription}</p>
            <div className="mt-7 rounded-xl border border-white/20 bg-white/10 p-5">
              <p className="font-semibold">{t.commBoxTitle}</p>
              <p className="mt-2 text-sm leading-6 text-[#d6e4d4]">
                {t.commBoxText}
              </p>
            </div>
            <a
              href="/community"
              className="mt-6 inline-block rounded-full bg-[#edce83] px-6 py-3 text-sm font-semibold text-[#24452f] transition hover:bg-[#f7e4b4]"
            >
              {t.commCta}
            </a>
          </div>
        </div>
      </section>

      {/* Future temple space */}
      <section className="mx-auto mb-20 max-w-7xl px-6">
        <div className="rounded-3xl border border-[#e5e9d9] bg-[#f0eddf] py-12 text-center">
          <div className="mx-auto max-w-2xl px-5">
            <p className="text-4xl">🛕</p>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-[#8a7951]">
              {t.templeEyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold">{t.templeHeading}</h2>
            <p className="mt-3 leading-7 text-[#77725f]">
              {t.templeDescription}
            </p>
            <span className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-medium text-[#857954]">
              {t.templeBadge}
            </span>
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