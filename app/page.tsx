"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

interface Billboard {
  id: string;
  title_en: string;
  title_te: string;
  image_path: string;
  placement: "main" | "supporting";
  link_url?: string | null;
  sort_order: number;
}

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

interface Announcement {
  id: string;
  category: string;
  title_en: string;
  title_te: string;
  summary_en: string;
  summary_te: string;
  event_date: string | null;
  published_at: string | null;
}

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
  progress_percent: number;
}

interface TransparencyRecord {
  id: string;
  category: string;
  status: string;
  record_date: string;
  title_en: string;
  title_te: string;
  reference_id: string;
}

export default function Home() {
  const [language, setLanguage] = useState<"en" | "te">("en");

  // Billboard state
  const [mainBillboards, setMainBillboards] = useState<Billboard[]>([]);
  const [supportingBillboards, setSupportingBillboards] = useState<Billboard[]>([]);
  const [currentMainIndex, setCurrentMainIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Village Invitations state
  const [publishedInvitations, setPublishedInvitations] = useState<VillageInvitation[]>([]);

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Development works state & fetch logic
  const [developmentWorks, setDevelopmentWorks] = useState<DevelopmentWork[]>([]);

  // Transparency records state & fetch logic
  const [transparencyRecords, setTransparencyRecords] = useState<TransparencyRecord[]>([]);

  useEffect(() => {
    async function fetchDevelopmentWorks() {
      const { data, error } = await supabase
        .from("development_works")
        .select(
          "id, category, status, title_en, title_te, location_en, location_te, summary_en, summary_te, progress_percent"
        )
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error && data) {
        setDevelopmentWorks(data);
      }
    }
    fetchDevelopmentWorks();
  }, []);

  useEffect(() => {
    async function fetchTransparencyRecords() {
      const { data, error } = await supabase
        .from("transparency_records")
        .select("id, category, status, record_date, title_en, title_te, reference_id")
        .order("record_date", { ascending: false })
        .limit(4);

      if (!error && data) {
        setTransparencyRecords(data);
      }
    }
    fetchTransparencyRecords();
  }, []);

  // Fetch active billboards from Supabase
  useEffect(() => {
    async function fetchBillboards() {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("billboards")
        .select("*")
        .eq("is_active", true)
        .or(`starts_at.is.null,starts_at.lte.${now}`)
        .or(`expires_at.is.null,expires_at.gte.${now}`)
        .order("sort_order", { ascending: true });

      if (!error && data) {
        const main = data.filter((b) => b.placement === "main");
        const supporting = data.filter((b) => b.placement === "supporting");
        setMainBillboards(main);
        setSupportingBillboards(supporting);
      }
    }
    fetchBillboards();
  }, []);

  // Fetch latest published village invitations from Supabase
  useEffect(() => {
    async function fetchInvitations() {
      const { data, error } = await supabase
        .from("village_invitations")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error && data) {
        setPublishedInvitations(data);
      }
    }
    fetchInvitations();
  }, []);

  // Fetch latest published announcements from Supabase
  useEffect(() => {
    async function fetchAnnouncements() {
      const { data, error } = await supabase
        .from("announcements")
        .select(
          "id, category, title_en, title_te, summary_en, summary_te, event_date, published_at"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);

      if (!error && data) {
        setAnnouncements(data);
      }
    }
    fetchAnnouncements();
  }, []);

  // Main billboard automatic rotation
  useEffect(() => {
    if (mainBillboards.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentMainIndex((prev) => (prev + 1) % mainBillboards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mainBillboards.length, isPaused]);

  const t =
    language === "en"
      ? {
          siteName: "Mana Pothanakattavaripalem",
          siteSubName: "మన పొతనకట్టవారిపాలెం",
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
              icon: "💌",
              title: "Village Invitations",
              subtitle: "Weddings, festivals & family events",
              href: "/invitations",
            },
            {
              icon: "💬",
              title: "Community",
              subtitle: "Ideas and discussions",
              href: "/community",
            },
          ],
          invitationsHeading: "Upcoming Village Invitations & Celebrations",
          invitationsSub: "Join our neighbors in their family weddings, housewarmings, and festive milestones.",
          allInvitationsBtn: "View All Invitations →",
          noInvitations: "No active public invitations published right now.",
          postInvitationCta: "Post Your Family Invitation →",
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
          supportEyebrow: "Need Help or Facing an Issue?",
          supportHeading: "Portal Support & Creator Contact",
          supportDescription:
            "Facing any technical issue, login trouble, or want to share feedback about the portal? Reach out directly.",
          creatorLabel: "Created & Maintained by",
          creatorName: "Charan Sri Sai Yenumula",
          whatsappBtn: "WhatsApp: +91 79818 59752",
          emailBtn: "srisaicharan84@gmail.com",
          footerTagline: "Our Village. Our Information. Our Community.",
          footerNote1: "Independent community information initiative.",
          footerNote2: "Not an official Gram Panchayat website.",
          footerCopyright: "© 2026 Mana Pothanakattavaripalem",
        }
      : {
          siteName: "మన పొతనకట్టవారిపాలెం",
          siteSubName: "Mana Pothanakattavaripalem",
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
              icon: "💌",
              title: "గ్రామ ఆహ్వానాలు",
              subtitle: "వివాహాలు, పండుగలు & శుభకార్యాలు",
              href: "/invitations",
            },
            {
              icon: "💬",
              title: "సమాజ వేదిక",
              subtitle: "సలహాలు మరియు చర్చలు",
              href: "/community",
            },
          ],
          invitationsHeading: "రాబోయే గ్రామ శుభకార్యాలు & ఆహ్వానాలు",
          invitationsSub: "మన ఇళ్లలో జరిగే వివాహాలు, గృహప్రవేశాలు మరియు వేడుకలలో అందరూ పాలుపంచుకోండి.",
          allInvitationsBtn: "అన్ని ఆహ్వానాలు చూడండి →",
          noInvitations: "ప్రస్తుతం ప్రజా ఆహ్వానాలు ఏవీ అందుబాటులో లేవు.",
          postInvitationCta: "మీ కుటుంబ ఆహ్వానాన్ని పంపండి →",
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
          supportEyebrow: "సహాయం కావాలా లేదా ఏదైనా సమస్య ఎదుర్కొంటున్నారా?",
          supportHeading: "పోర్టల్ సహాయం & రూపకర్త సంప్రదింపు వివరాలు",
          supportDescription:
            "వెబ్‌సైట్ ఉపయోగించడంలో ఏదైనా సాంకేతిక సమస్య ఎదురైనా లేదా సలహాలు ఇవ్వాలన్నా నేరుగా సంప్రదించండి.",
          creatorLabel: "రూపకల్పన & నిర్వహణ",
          creatorName: "చరణ్ శ్రీ సాయి యెనుముల (Charan Sri Sai Yenumula)",
          whatsappBtn: "వాట్సాప్: +91 79818 59752",
          emailBtn: "srisaicharan84@gmail.com",
          footerTagline: "మన గ్రామం. మన సమాచారం. మన సమాజం.",
          footerNote1: "స్వతంత్ర గ్రామ సమాచార వేదిక.",
          footerNote2: "ఇది అధికారిక గ్రామ పంచాయతీ వెబ్‌సైట్ కాదు.",
          footerCopyright: "© 2026 మన పొతనకట్టవారిపాలెం",
        };

  return (
    <main className="min-h-screen bg-[#f7f8f2] text-[#203b2d]">
      {/* Shared Navbar */}
      <Navbar language={language} setLanguage={setLanguage} />

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

      {/* --- HYBRID BILLBOARD DISPLAY SECTION --- */}
      {(mainBillboards.length > 0 || supportingBillboards.length > 0) && (
        <section className="mx-auto max-w-7xl px-6 py-12">
          {/* Main Billboard Slideshow */}
          {mainBillboards.length > 0 && (
            <div
              className="relative overflow-hidden rounded-3xl border border-[#e4d2a7] bg-[#24543b] shadow-xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative aspect-[16/7] w-full overflow-hidden bg-[#173f2b]">
                {mainBillboards.map((board, index) => {
                  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/billboard-images/${board.image_path}`;
                  const title = (language === "en" ? board.title_en : board.title_te) || board.title_en || board.title_te;

                  const content = (
                    <div className="relative h-full w-full">
                      <img
                        src={imageUrl}
                        alt={title || "Village Billboard"}
                        className="h-full w-full object-cover transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {title && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                          <span className="inline-block rounded-full bg-[#edce83] px-3 py-1 text-xs font-bold text-[#24452f]">
                            {language === "en" ? "Village Billboard" : "గ్రామ బిల్ బోర్డ్"}
                          </span>
                          <h2 className="mt-2 text-xl font-bold text-white sm:text-3xl">
                            {title}
                          </h2>
                        </div>
                      )}
                    </div>
                  );

                  return (
                    <div
                      key={board.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentMainIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      {board.link_url ? (
                        <a href={board.link_url} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Controls */}
              {mainBillboards.length > 1 && (
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur rounded-full px-3 py-1.5 text-white">
                  <button
                    onClick={() => setCurrentMainIndex((prev) => (prev === 0 ? mainBillboards.length - 1 : prev - 1))}
                    className="p-1 hover:text-[#edce83] transition"
                    aria-label="Previous slide"
                  >
                    ‹
                  </button>
                  <span className="text-xs font-medium">
                    {currentMainIndex + 1} / {mainBillboards.length}
                  </span>
                  <button
                    onClick={() => setCurrentMainIndex((prev) => (prev + 1) % mainBillboards.length)}
                    className="p-1 hover:text-[#edce83] transition"
                    aria-label="Next slide"
                  >
                    ›
                  </button>
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded hover:bg-white/30 transition"
                  >
                    {isPaused ? (language === "en" ? "Play" : "ప్లే") : (language === "en" ? "Pause" : "పాజ్")}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Supporting Billboards Cards */}
          {supportingBillboards.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {supportingBillboards.map((board) => {
                const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/billboard-images/${board.image_path}`;
                const title = (language === "en" ? board.title_en : board.title_te) || board.title_en || board.title_te;

                const cardContent = (
                  <div className="overflow-hidden rounded-2xl border border-[#e4e9df] bg-white shadow-sm transition hover:border-[#d5b77d] hover:shadow-md">
                    <div className="aspect-[5/3] w-full overflow-hidden bg-[#f0eadb]">
                      <img
                        src={imageUrl}
                        alt={title || "Supporting Billboard"}
                        className="h-full w-full object-cover transition hover:scale-105 duration-500"
                      />
                    </div>
                    {title && (
                      <div className="p-4">
                        <h3 className="font-bold text-[#203b2d]">{title}</h3>
                      </div>
                    )}
                  </div>
                );

                return board.link_url ? (
                  <a key={board.id} href={board.link_url} target="_blank" rel="noopener noreferrer" className="block">
                    {cardContent}
                  </a>
                ) : (
                  <div key={board.id}>{cardContent}</div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* --- VILLAGE INVITATIONS SECTION (PLACED DIRECTLY BELOW BILLBOARDS) --- */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-3xl border border-[#e4d2a7] bg-[#fff8e9] p-8 shadow-xs">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <span className="inline-block rounded-full bg-[#edce83] px-3.5 py-1 text-xs font-bold text-[#24452f]">
                💌 {language === "en" ? "Village Celebrations" : "గ్రామ శుభకార్యాలు"}
              </span>
              <h2 className="mt-3 text-2xl font-bold text-[#203b2d] md:text-3xl">
                {t.invitationsHeading}
              </h2>
              <p className="mt-1 text-sm text-[#69776a]">
                {t.invitationsSub}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/invitations"
                className="rounded-full bg-[#edce83] px-5 py-2.5 text-xs font-bold text-[#243b2d] hover:bg-[#e5be64]"
              >
                {t.postInvitationCta}
              </a>
              <a
                href="/invitations"
                className="rounded-full bg-[#24543b] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#173f2b]"
              >
                {t.allInvitationsBtn}
              </a>
            </div>
          </div>

          {/* Published Invitations Grid */}
          <div className="mt-8">
            {publishedInvitations.length === 0 ? (
              <div className="rounded-2xl border border-[#e4e9df] bg-white p-8 text-center text-sm text-[#69776a]">
                {t.noInvitations}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {publishedInvitations.map((inv) => {
                  const title = (language === "en" ? inv.title_en : (inv.title_te || inv.title_en)) || inv.title_en;
                  const message = (language === "en" ? inv.message_en : (inv.message_te || inv.message_en)) || inv.message_en;
                  const mediaUrl = inv.media_path
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/invitations/${inv.media_path}`
                    : null;

                  return (
                    <div
                      key={inv.id}
                      className="flex flex-col justify-between rounded-2xl border border-[#e4e9df] bg-white p-6 shadow-xs transition hover:border-[#d5b77d] hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="rounded-full bg-[#245c3c]/10 px-3 py-1 font-bold text-[#245c3c]">
                            {inv.event_type}
                          </span>
                          {inv.event_date && (
                            <span className="text-[#69776a]">📅 {inv.event_date}</span>
                          )}
                        </div>

                        <h3 className="mt-3 text-lg font-bold text-[#203b2d]">
                          {title}
                        </h3>
                        <p className="mt-1 text-xs font-semibold text-[#54865b]">
                          Host: {inv.host_name} {inv.venue ? `• 📍 ${inv.venue}` : ""}
                        </p>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#69776a]">
                          {message}
                        </p>

                        {mediaUrl && inv.media_type === "photo" && (
                          <div className="mt-4 overflow-hidden rounded-xl border border-[#e4e9df] bg-[#fff8e9]">
                            <img
                              src={mediaUrl}
                              alt={title}
                              className="h-40 w-full object-cover"
                            />
                          </div>
                        )}

                        {mediaUrl && inv.media_type === "video" && (
                          <div className="mt-4 overflow-hidden rounded-xl bg-black">
                            <video src={mediaUrl} controls className="h-40 w-full" />
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-3 border-t border-[#f0eadb]">
                        <a
                          href="/invitations"
                          className="text-xs font-bold text-[#245c3c] hover:underline"
                        >
                          {language === "en" ? "View Full Invitation →" : "పూర్తి ఆహ్వానం చూడండి →"}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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

          {developmentWorks.length === 0 ? (
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
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {developmentWorks.map((work) => {
                const title =
                  (language === "en" ? work.title_en : work.title_te) ||
                  work.title_en ||
                  work.title_te;
                const location =
                  (language === "en" ? work.location_en : work.location_te) ||
                  work.location_en ||
                  work.location_te;
                const summary =
                  (language === "en" ? work.summary_en : work.summary_te) ||
                  work.summary_en ||
                  work.summary_te;

                return (
                  <a
                    key={work.id}
                    href="/development"
                    className="flex flex-col justify-between rounded-2xl border border-[#e4e9df] bg-[#f7f8f2] p-6 transition hover:border-[#a6c5a5] hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-bold uppercase text-[#54865b]">
                          {work.category}
                        </span>
                        <span className="rounded-full bg-white px-2.5 py-1 font-bold text-[#24543b]">
                          {work.progress_percent}%
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-[#203b2d]">
                        {title}
                      </h3>
                      <p className="mt-1 text-xs text-[#748174]">📍 {location}</p>
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#69776a]">
                        {summary}
                      </p>
                    </div>
                    <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white">
                      <div
                        className="h-full rounded-full bg-[#245c3c]"
                        style={{
                          width: `${Math.min(100, Math.max(0, work.progress_percent))}%`,
                        }}
                      />
                    </div>
                  </a>
                );
              })}
            </div>
          )}
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
              {transparencyRecords.length === 0
                ? t.recordsItems.map((record) => (
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
                  ))
                : transparencyRecords.map((rec) => {
                    const title =
                      (language === "en" ? rec.title_en : rec.title_te) ||
                      rec.title_en ||
                      rec.title_te;
                    return (
                      <a
                        key={rec.id}
                        href="/transparency"
                        className="flex items-center justify-between gap-3 rounded-xl bg-[#f7f8f2] p-4 transition hover:bg-[#edf3e8]"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-[#203b2d]">
                            {title}
                          </p>
                          <p className="mt-0.5 text-xs text-[#748174]">
                            {rec.category} • {rec.reference_id}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                          {rec.status}
                        </span>
                      </a>
                    );
                  })}
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
              
              {announcements.length === 0 ? (
                <div className="mt-6 rounded-xl bg-[#f7f8f2] p-5 text-sm text-[#748174]">
                  {t.annEmpty}
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  {announcements.map((item) => {
                    const title =
                      (language === "en" ? item.title_en : item.title_te) ||
                      item.title_en ||
                      item.title_te;
                    const summary =
                      (language === "en" ? item.summary_en : item.summary_te) ||
                      item.summary_en ||
                      item.summary_te;

                    return (
                      <a
                        key={item.id}
                        href="/announcements"
                        className="block rounded-xl border border-[#e4e9df] bg-[#f7f8f2] p-4 transition hover:border-[#a6c5a5] hover:bg-[#edf3e8]"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs text-[#54865b]">
                          <span className="font-bold uppercase tracking-wider">
                            {item.category}
                          </span>
                          {item.event_date && (
                            <span className="text-[#748174]">
                              📅 {item.event_date}
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 font-bold text-[#203b2d]">
                          {title}
                        </h3>
                        {summary && (
                          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#69776a]">
                            {summary}
                          </p>
                        )}
                      </a>
                    );
                  })}
                </div>
              )}
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
      <section className="mx-auto mb-16 max-w-7xl px-6">
        <div className="rounded-3xl border border-[#e5e9d9] bg-[#f0eddf] py-12 text-center">
          <div className="mx-auto max-w-2xl px-5">
            <p className="text-4xl">🛕</p>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] to-[#8a7951]">
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

      {/* Creator & Support Contact Box */}
      <section className="mx-auto mb-16 max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-6 rounded-3xl border-2 border-[#e4d2a7] bg-[#fff8e9] p-7 shadow-xs md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-[#edce83] px-3.5 py-1 text-xs font-bold text-[#24452f]">
              🛠️ {t.supportEyebrow}
            </span>
            <h2 className="mt-3 text-xl font-bold text-[#203b2d] md:text-2xl">
              {t.supportHeading}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5d4f32]">
              {t.supportDescription}
            </p>
            <p className="mt-3 text-sm font-semibold text-[#24543b]">
              {t.creatorLabel}:{" "}
              <span className="font-bold text-[#173f2b]">{t.creatorName}</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <a
              href="https://wa.me/917981859752?text=Hello%20Charan%2C%20I%20need%20help%20with%20the%20Mana%20Pothanakattavaripalem%20portal."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#24543b] px-5 py-3 text-xs font-bold text-[#fff8e9] transition hover:bg-[#173f2b]"
            >
              <span>💬</span>
              <span>{t.whatsappBtn}</span>
            </a>

            <a
              href="mailto:srisaicharan84@gmail.com?subject=Mana%20Pothanakattavaripalem%20Portal%20Support"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#24543b]/30 bg-white px-5 py-3 text-xs font-bold text-[#203b2d] transition hover:border-[#24543b] hover:bg-[#edf3e8]"
            >
              <span>✉️</span>
              <span>{t.emailBtn}</span>
            </a>
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