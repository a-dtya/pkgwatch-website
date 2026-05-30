"use client";
import { useState, useEffect, useRef } from "react";
import {
  Shield, Zap, Lock, Download, Check, X,
  Database, Cpu, Eye, GitBranch, Mail,
  ArrowRight, ChevronRight, Terminal,
  Activity, Layers, Search, Package,
  Globe, Code2, AlertTriangle, Server
} from "lucide-react";

/* ─────────────────────────────────────────────
   GLOBAL CSS — inject once on mount
───────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #080d18;
  --bg-card: #0c1525;
  --bg-card-alt: #09101e;
  --border: #111d30;
  --border-hover: rgba(245,166,35,0.3);
  --accent: #f5a623;
  --accent-dim: rgba(245,166,35,0.12);
  --accent-glow: rgba(245,166,35,0.4);
  --text: #e8eaf0;
  --text-muted: #6b7a99;
  --text-dim: #3d5275;
  --success: #2ed573;
  --danger: #ff4757;
  --warn: #ffa502;
  --font-display: 'Syne', sans-serif;
  --font-body: 'Outfit', sans-serif;
  --font-mono: 'DM Mono', monospace;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

/* ── Typography ── */
.glow-text {
  background: linear-gradient(130deg, #f5a623 0%, #ffd06b 50%, #f5a623 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Buttons ── */
.btn-primary {
  background: linear-gradient(135deg, #f5a623, #e09010);
  color: #080d18;
  border: none;
  padding: 13px 26px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 0 36px rgba(245,166,35,0.35);
  font-family: var(--font-body);
  white-space: nowrap;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 56px rgba(245,166,35,0.55);
}
.btn-primary:active { transform: translateY(0); }

.btn-ghost {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
  padding: 13px 26px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: border-color 0.2s, color 0.2s;
  font-family: var(--font-body);
  white-space: nowrap;
}
.btn-ghost:hover {
  border-color: var(--border-hover);
  color: var(--accent);
}

.btn-outline-accent {
  background: transparent;
  color: var(--accent);
  border: 1px solid rgba(245,166,35,0.4);
  padding: 13px 26px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s, box-shadow 0.2s;
  font-family: var(--font-body);
  white-space: nowrap;
  width: 100%;
  justify-content: center;
  margin-top: 28px;
}
.btn-outline-accent:hover {
  background: rgba(245,166,35,0.08);
  box-shadow: 0 0 24px rgba(245,166,35,0.15);
}

/* ── Cards ── */
.card {
  background: linear-gradient(135deg, var(--bg-card), var(--bg-card-alt));
  border: 1px solid var(--border);
  border-radius: 16px;
  transition: border-color 0.3s, transform 0.3s;
}
.card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
}

/* ── Tag pill ── */
.tag {
  background: var(--accent-dim);
  color: var(--accent);
  border: 1px solid rgba(245,166,35,0.25);
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-family: var(--font-mono);
  display: inline-block;
  letter-spacing: 0.5px;
}

/* ── Nav ── */
.nav-scrolled {
  background: rgba(8,13,24,0.92) !important;
  backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid var(--border) !important;
}

/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(245,166,35,0.2); }
  50%       { box-shadow: 0 0 40px rgba(245,166,35,0.5); }
}

.term-line { animation: fadeUp 0.28s ease both; }
.cursor    { animation: blink 1s infinite; display: inline-block; }

.marquee-wrap { overflow: hidden; position: relative; }
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
  gap: 16px;
}
.marquee-fade-left {
  position: absolute; top: 0; left: 0; bottom: 0; width: 160px;
  background: linear-gradient(to right, var(--bg), transparent);
  z-index: 2; pointer-events: none;
}
.marquee-fade-right {
  position: absolute; top: 0; right: 0; bottom: 0; width: 160px;
  background: linear-gradient(to left, var(--bg), transparent);
  z-index: 2; pointer-events: none;
}

/* ── Scroll reveal ── */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Divider ── */
.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--border) 30%, var(--border) 70%, transparent);
}

/* ── Pricing Pro Card ── */
.pricing-pro {
  background: linear-gradient(160deg, #0f1e36 0%, var(--bg-card-alt) 100%);
  border: 1px solid rgba(245,166,35,0.3);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}
.pricing-pro::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(to right, transparent 10%, var(--accent), transparent 90%);
}

/* ── Feature icon ── */
.feat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--accent-dim);
  border: 1px solid rgba(245,166,35,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  flex-shrink: 0;
}

/* ── Grid background ── */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(17,29,48,0.45) 1px, transparent 1px),
    linear-gradient(90deg, rgba(17,29,48,0.45) 1px, transparent 1px);
  background-size: 52px 52px;
  pointer-events: none;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .hero-layout  { flex-direction: column !important; }
  .prob-layout  { flex-direction: column !important; }
  .feat-grid    { grid-template-columns: 1fr !important; }
  .price-layout { flex-direction: column !important; }
  .hero-h1      { font-size: 38px !important; }
  .section-pad  { padding: 64px 28px !important; }
  .hero-pad     { padding: 120px 28px 64px !important; }
  .feat-grid    { grid-template-columns: 1fr 1fr !important; }
  footer-cols   { flex-direction: column !important; }
}
@media (max-width: 600px) {
  .feat-grid    { grid-template-columns: 1fr !important; }
}
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SCAN_LINES = [
  { t: "cmd",     s: "$ pkgwatch scan --ecosystem all --mode deep" },
  { t: "info",    s: "Initializing Bumblebee engine v2.3.1..." },
  { t: "info",    s: "Loading threat catalog  [OSV · 2024-05-28]" },
  { t: "info",    s: "Scanning 847 installed packages across 4 ecosystems" },
  { t: "divider", s: "──────────────────────────────────────────" },
  { t: "error",   s: "✗ THREAT      lodash@4.17.0 (npm)" },
  { t: "error",   s: "  └─ CVE-2021-23337 · prototype pollution · CRITICAL" },
  { t: "warn",    s: "⚠ SUSPICIOUS  color-convert@2.0.1 (npm)" },
  { t: "warn",    s: "  └─ Heuristic: 0.87 · pkg age: 3d · likely typosquat" },
  { t: "warn",    s: "⚠ SUSPICIOUS  req-utils@0.0.2 (npm)" },
  { t: "warn",    s: "  └─ Heuristic: 0.91 · dormant maintainer · flag: exfil" },
  { t: "divider", s: "──────────────────────────────────────────" },
  { t: "success", s: "✓ 844 packages verified clean" },
  { t: "success", s: "✓ Completed in 0.34 s  ·  0 network requests made" },
];

const ECOSYSTEMS = [
  { name: "NPM",       dot: "#cc3534" },
  { name: "PyPI",      dot: "#3775a9" },
  { name: "Cargo",     dot: "#e67e22" },
  { name: "Go Modules",dot: "#00add8" },
  { name: "Maven",     dot: "#c71a36" },
  { name: "RubyGems",  dot: "#cc342d" },
  { name: "Homebrew",  dot: "#e4a020" },
  { name: "APT",       dot: "#a80030" },
];

const FEATURES = [
  {
    Icon: Cpu,
    tag: "RUST + GO",
    title: "Dual-Engine Architecture",
    body: "Powered by the open-source Bumblebee Go binary wrapped in a hyper-optimized Rust/Tauri desktop shell. Native performance, sub-500ms cold starts, zero overhead.",
  },
  {
    Icon: Eye,
    tag: "AI HEURISTICS",
    title: "Heuristic Zero-Day Analysis",
    body: "Analyzes package metadata, publication age, maintainer history, and behavioral signals. Assigns High/Medium/Low confidence scores so you know which suspicious packages to act on first.",
  },
  {
    Icon: Database,
    tag: "OSV + CVE",
    title: "Deterministic Threat Intel",
    body: "Fetches a daily-updated catalog.json compiled from Google OSV. Every known CVE and malware signature matched locally—guaranteed coverage with no latency from cloud round-trips.",
  },
  {
    Icon: Lock,
    tag: "100% LOCAL",
    title: "Privacy-First by Design",
    body: "Scans run entirely on your filesystem. No code, no dependency manifests, no telemetry ever leaves your machine. Your IP, your supply chain data, stays yours.",
  },
];

const PROBLEMS = [
  "Supply chain attacks (typosquatting, compromised releases) bypass standard AV entirely",
  "Enterprise scanners upload your codebase to remote servers—leaking sensitive IP",
  "Cloud-based tools take minutes per scan, breaking developer flow and CI pipelines",
  "Zero-day packages slip through while CVE databases update with a 24–72 hour lag",
  "No heuristic risk scoring—only known-bad signatures with no behavioral context",
];

const SOLUTIONS = [
  "Detects typosquatting and novel zero-day packages heuristically before they ever run",
  "Runs entirely on your local filesystem—your code never leaves your machine",
  "Sub-second scans run silently in background; zero interruption to developer workflow",
  "Daily-updated OSV catalog ensures guaranteed CVE and known-malware coverage",
  "Confidence scoring: High / Medium / Low risk for every flagged package",
];

const FREE_FEATURES = [
  "Local desktop app (Windows)",
  "Heuristic scanning engine",
  "Daily OSV threat feed (automatic)",
  "8+ supported ecosystems",
  "Confidence scoring: High/Med/Low",
  "Open-source core (Bumblebee)",
];

const PRO_FEATURES = [
  "Everything in Developer, plus:",
  "macOS & Linux support",
  "Background system-tray daemon",
  "Auto-remediation of dangerous packages",
  "Advanced historical analytics dashboard",
  "CI/CD pipeline integration",
  "Team management & shared policies",
  "Priority support & SLA",
];

const DOWNLOAD_URL = "https://github.com/user-attachments/files/28362681/pkgwatch_0.1.0_x64-setup.zip"

/* ─────────────────────────────────────────────
   LOGO SVG — approximates the golden 3D box
───────────────────────────────────────────── */
function PkgLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="9" fill="#0e0b00" />
      {/* top face */}
      <path d="M20 9L31 14.8L20 20.5L9 14.8Z" fill="#fbbf24" />
      {/* right face */}
      <path d="M31 14.8V26.3L20 32V20.5L31 14.8Z" fill="#b45309" />
      {/* left face */}
      <path d="M9 14.8V26.3L20 32V20.5L9 14.8Z" fill="#d97706" />
      {/* P cutout stem */}
      <rect x="11.5" y="18.5" width="2" height="7" rx="0.4" fill="#0e0b00" />
      {/* P cutout bump */}
      <path d="M11.5 18.5H15C15.9 18.5 16.6 19.2 16.6 20.1 16.6 21 15.9 21.7 15 21.7H11.5Z" fill="#0e0b00" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PkgWatchLanding() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [scanIdx,     setScanIdx]     = useState(0);
  const termRef = useRef<HTMLDivElement>(null);

  /* inject global CSS */
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  /* nav scroll shadow */
  useEffect(() => {
    const fn = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* terminal typewriter */
  useEffect(() => {
    if (scanIdx < SCAN_LINES.length) {
      const delay =
        scanIdx === 0 ? 800
        : SCAN_LINES[scanIdx - 1].t === "divider" ? 350
        : SCAN_LINES[scanIdx - 1].t === "cmd"     ? 600
        : 280;
      const id = setTimeout(() => {
        setScanIdx((n) => n + 1);
        if (termRef.current)
          termRef.current.scrollTop = termRef.current.scrollHeight;
      }, delay);
      return () => clearTimeout(id);
    }
  }, [scanIdx]);

  /* loop terminal */
  useEffect(() => {
    if (scanIdx >= SCAN_LINES.length) {
      const id = setTimeout(() => setScanIdx(0), 4200);
      return () => clearTimeout(id);
    }
  }, [scanIdx]);

  /* scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const lineColor: Record<string, string> = { cmd:"#f5a623", info:"#6b7a99", error:"#ff4757", warn:"#ffa502", success:"#2ed573", divider:"rgba(17,29,48,0.8)" };

  /* ── RENDER ── */
  return (
    <div style={{ background: "#080d18", color: "#e8eaf0", fontFamily: "'Outfit', sans-serif", overflowX: "hidden" }}>

      {/* ═══════════════════════ NAV ═══════════════════════ */}
      <nav className={navScrolled ? "nav-scrolled" : ""}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          height: 64, padding: "0 48px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          transition: "background 0.35s, border 0.35s, backdrop-filter 0.35s",
          
          /* ── ADDED: Base Glassmorphism Styles ── */
          background: "rgba(8, 13, 24, 0.65)",     /* Semi-transparent dark base */
          backdropFilter: "blur(12px)",            /* Blurs the hero section behind it */
          WebkitBackdropFilter: "blur(12px)",      /* Safari support for blur */
          // borderBottom: "1px solid rgba(255, 255, 255, 0.05)", /* Faint separator line */

          /* ── ADDED: The Glowing Border ── */
          borderBottom: "1px solid rgba(245, 166, 35, 0.2)",           /* A subtle orange-tinted edge */
          boxShadow: "0 15px 40px -10px rgba(245, 166, 35, 0.15)",    /* Casts the glow strictly downward */
        }}
      >
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <PkgLogo size={34} />
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.4px", color: "#e8eaf0" }}>
            pkg<span style={{ color: "#f5a623" }}>watch</span>
          </span>
        </a>

        {/* Links */}
        {/* Hide the links on smaller screens */}
        <div className="hide-on-mobile" style={{ display: "flex", gap: 32, alignItems: "center"}}>
          {["Features", "Ecosystems", "Pricing"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: "#6b7a99", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8eaf0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a99")}
            >{l}</a>
          ))}
          <a href="https://github.com/a-dtya/pkgwatch/" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7a99", fontSize: 14, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e8eaf0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a99")}
          >
            <GitBranch size={14} /> GitHub
          </a>
        </div>

        <button className="btn-primary hide-on-mobile" onClick={()=> {window.open(DOWNLOAD_URL, "_blank")}} style={{ padding: "10px 20px", fontSize: 13 }}>
          <Download size={14} /> Download .exe
        </button>
      </nav>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="hero-pad" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 80px 80px" }}>

        {/* Grid */}
        <div className="grid-bg"
          style={{ maskImage: "radial-gradient(ellipse 80% 80% at 25% 50%, black 20%, transparent 75%)" }}
        />

        {/* Golden glow blobs */}
        <div style={{ position: "absolute", top: "5%", left: "-12%", width: 720, height: 720, background: "radial-gradient(circle, rgba(245,166,35,0.11) 0%, transparent 68%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", right: "-8%", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 68%)", pointerEvents: "none" }} />

        <div className="hero-layout" style={{ display: "flex", gap: 72, alignItems: "center", maxWidth: 1280, width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Left: copy ── */}
          <div style={{ flex: 1}}>
            <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
              <span className="tag">v0.1.0-beta</span>
              <span className="tag">Windows</span>
              <span className="tag" style={{ background: "rgba(46,213,115,0.1)", borderColor: "rgba(46,213,115,0.3)", color: "#2ed573" }}>FREE</span>
            </div>

            <h1 className="hero-h1" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.14, letterSpacing: "-1.2px", marginBottom: 24 }}>
              Transform Your<br />
              <span className="glow-text">Supply Chain</span><br />
              Security.
            </h1>

            <p style={{ fontSize: 17, color: "#8b9dc3", lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
              A blazingly fast, locally-executing desktop agent that scans your machine for malicious packages and zero-day vulnerabilities in milliseconds.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <button className="btn-primary" onClick={()=> {window.open(DOWNLOAD_URL, "_blank")}} style={{ padding: "10px 20px", fontSize: 13 }}>
                <Download size={17} />
                Download for Windows
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, opacity: 0.65 }}>.exe</span>
              </button>
              <button className="btn-ghost" onClick={()=>{window.open("https://github.com/a-dtya/pkgwatch/", "_blank")}}>
                <GitBranch size={15} /> View on GitHub
              </button>
            </div>

            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              {[
                { Icon: Lock, t: "Zero cloud data leakage" },
                { Icon: Zap,  t: "100% local execution" },
                { Icon: Shield, t: "Open-source core" },
              ].map(({ Icon, t }) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, color: "#6b7a99", fontSize: 13 }}>
                  <Icon size={13} color="#f5a623" /> {t}
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
  
            {/* Pure CSS Media Query to handle the swap */}
            <style>{`
              .mobile-terminal { display: block; }
              .desktop-dashboard { display: none; }

              @media (max-width: 767px) {
                .hide-on-mobile {
                  display: none !important;
                }
              }
              
              /* When the screen hits 768px (tablet/desktop), hide terminal, show dashboard */
              @media (min-width: 768px) {
                .mobile-terminal { display: none; }
                .desktop-dashboard { display: block; }
              }
            `}</style>

            {/* 📱 MOBILE VIEW: Sleek Terminal (Pure Inline Styles) */}
            <div className="mobile-terminal" style={{ 
              width: '100%', maxWidth: '380px', borderRadius: '12px', overflow: 'hidden', 
              background: '#0a1220', border: '1px solid #162030', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
            }}>
              
              {/* Mac-style Terminal Header */}
              <div style={{ 
                background: '#0f1a2e', padding: '12px 16px', borderBottom: '1px solid #162030', 
                display: 'flex', alignItems: 'center', gap: '8px' 
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.8)' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.8)' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.8)' }}></div>
                <span style={{ 
                  marginLeft: '8px', fontSize: '10px', color: '#94a3b8', 
                  fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' 
                }}>
                  bash - pkgwatch
                </span>
              </div>
              
              {/* Terminal Output */}
              <div style={{ 
                padding: '20px', fontFamily: 'monospace', fontSize: '12px', 
                lineHeight: '1.6', color: '#c8d4e8' 
              }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: '#f5a623' }}>➜</span>
                  <span style={{ color: '#60a5fa' }}>~/project</span>
                  <span>pkgwatch scan --profile baseline</span>
                </div>
                
                <div style={{ color: '#6b7a99' }}>Loading OSV threat feed... [DONE]</div>
                <div style={{ color: '#6b7a99' }}>Scanning 2,986 local packages...</div>
                
                <div style={{ marginTop: '16px', color: '#ff4757', display: 'flex', gap: '8px', fontWeight: 'bold' }}>
                  <span>[!]</span>
                  <span>CRITICAL THREAT DETECTED</span>
                </div>
                <div style={{ color: 'rgba(255, 71, 87, 0.8)', marginLeft: '28px', marginTop: '4px' }}>Package: STMicroelectronics.stm32</div>
                <div style={{ color: 'rgba(255, 71, 87, 0.8)', marginLeft: '28px' }}>Confidence: HIGH (OSV Match)</div>
                
                <div style={{ marginTop: '16px', color: '#2ed573', fontWeight: 'bold' }}>
                  ✓ Scan completed in 0.1s
                </div>
              </div>
            </div>

            {/* 💻 DESKTOP VIEW: The Full Dashboard (Hidden on phones, visible on desktop) */}
            <div className="desktop-dashboard" style={{ 
              maxWidth: '640px', flexShrink: 0, animation: 'float 6s ease-in-out infinite' 
            }}>

            <div style={{
              background: "#0a1220",
              border: "1px solid #162030",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 48px 96px rgba(0,0,0,0.75), 0 0 0 1px rgba(245,166,35,0.05), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}>

              {/* ── App header ── */}
              <div style={{ padding: "0 14px", height: 42, borderBottom: "1px solid #111d30", display: "flex", alignItems: "center", gap: 10, background: "rgba(0,0,0,0.3)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 4 }}>
                  <PkgLogo size={20} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 12.5 }}>
                    pkg<span style={{ color: "#f5a623" }}>watch</span>
                  </span>
                </div>
                {["Packages","Vulnerabilities","History","Settings"].map((tab, i) => (
                  <span key={tab} style={{
                    fontSize: 11.5, padding: "4px 10px", borderRadius: 6, cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif", fontWeight: i === 0 ? 600 : 400,
                    color: i === 0 ? "#e8eaf0" : "#6b7a99",
                    background: i === 0 ? "rgba(245,166,35,0.12)" : "transparent",
                    border: i === 0 ? "1px solid rgba(245,166,35,0.25)" : "1px solid transparent",
                  }}>{tab}</span>
                ))}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#2ed573" }}>✓ completed in 19.8s</span>
                  <div style={{ background: "linear-gradient(135deg, #f5a623, #e09010)", color: "#080d18", borderRadius: 7, padding: "5px 12px", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
                    <Activity size={11} /> Run Scan
                  </div>
                </div>
              </div>

              {/* ── Stat cards ── */}
              <div style={{ padding: "12px 14px 10px", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                {[
                  { label: "ACTIVE THREATS", val: "0",     sub: "from threat feed", Icon: Shield,   glow: "rgba(255,71,87,0.1)",    border: "rgba(255,71,87,0.2)"   },
                  { label: "PACKAGES",        val: "2,986", sub: "discovered",       Icon: Package,  glow: "rgba(245,166,35,0.1)",   border: "rgba(245,166,35,0.2)"  },
                  { label: "ECOSYSTEMS",      val: "5",     sub: "registries",       Icon: Globe,    glow: "rgba(74,158,255,0.08)",  border: "rgba(74,158,255,0.2)"  },
                  { label: "SUSPICIOUS HIGH", val: "2,230", sub: "",                 Icon: Activity, glow: "rgba(46,213,115,0.08)",  border: "rgba(46,213,115,0.2)"  },
                  { label: "SUSPICIOUS MED",  val: "756",   sub: "",                 Icon: AlertTriangle, glow: "rgba(255,165,2,0.08)", border: "rgba(255,165,2,0.2)" },
                ].map(({ label, val, sub, Icon, glow, border }) => (
                  <div key={label} style={{ background: glow, border: `1px solid ${border}`, borderRadius: 9, padding: "10px 10px 8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                      <span style={{ fontSize: 8, color: "#6b7a99", fontFamily: "'DM Mono', monospace", letterSpacing: "0.4px", lineHeight: 1.3 }}>{label}</span>
                    </div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: val.length > 3 ? 18 : 22, fontWeight: 800, color: "#e8eaf0", lineHeight: 1 }}>{val}</div>
                    {sub && <div style={{ fontSize: 9, color: "#3d5275", marginTop: 3, fontFamily: "'Outfit', sans-serif" }}>{sub}</div>}
                  </div>
                ))}
              </div>

              {/* ── Filter bar ── */}
              <div style={{ padding: "0 14px 10px", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ fontSize: 9, color: "#3d5275", fontFamily: "'DM Mono', monospace", letterSpacing: "1px", marginRight: 2 }}>FILTER</span>
                {[
                  { name: "browser-extension", count: "50",   dot: "#8b9dc3" },
                  { name: "editor-extension",  count: "38",   dot: "#8b9dc3" },
                  { name: "go",                count: "204",  dot: "#00add8" },
                  { name: "npm",               count: "2552", dot: "#cc3534" },
                  { name: "pypi",              count: "162",  dot: "#3775a9" },
                ].map((eco) => (
                  <div key={eco.name} style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(17,29,48,0.8)", border: "1px solid #162030", borderRadius: 100, padding: "3px 8px" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: eco.dot }} />
                    <span style={{ fontSize: 9.5, color: "#c8d4e8", fontFamily: "'DM Mono', monospace" }}>{eco.name}</span>
                    <span style={{ fontSize: 9.5, color: "#6b7a99", fontFamily: "'DM Mono', monospace" }}>{eco.count}</span>
                  </div>
                ))}
              </div>

              {/* ── Package table ── */}
              <div style={{ margin: "0 14px 10px", border: "1px solid #111d30", borderRadius: 10, overflow: "hidden" }}>
                {/* Header */}
                <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 72px 88px", padding: "7px 12px", background: "rgba(0,0,0,0.25)", borderBottom: "1px solid #111d30" }}>
                  {["ECOSYSTEM ↑","PACKAGE NAME","VERSION","CONFIDENCE"].map((h) => (
                    <span key={h} style={{ fontSize: 8.5, color: h === "ECOSYSTEM ↑" ? "#f5a623" : "#3d5275", fontFamily: "'DM Mono', monospace", letterSpacing: "0.6px" }}>{h}</span>
                  ))}
                </div>
                {/* Rows */}
                {[
                  { eco: "editor-extension", pkg: "STMicroelectronics.stm32-vscode-extension", ver: "v3.9.0" },
                  { eco: "editor-extension", pkg: "ms-vscode.cpp-devtools",                    ver: "v0.5.13" },
                  { eco: "editor-extension", pkg: "ms-vscode.remote-explorer",                 ver: "v0.5.0" },
                  { eco: "editor-extension", pkg: "STMicroelectronics.stm32cube-ide-core",     ver: "v1.3.0" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "130px 1fr 72px 88px", padding: "9px 12px", borderBottom: i < 3 ? "1px solid rgba(17,29,48,0.7)" : "none", alignItems: "center" }}>
                    <div style={{ background: "rgba(17,29,48,0.9)", borderRadius: 5, padding: "3px 7px", fontSize: 8.5, color: "#6b7a99", fontFamily: "'DM Mono', monospace", display: "inline-flex", alignItems: "center", gap: 4, width: "fit-content" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#3d5275", flexShrink: 0 }} />
                      {row.eco}
                    </div>
                    <span style={{ fontSize: 11, color: "#c8d4e8", fontFamily: "'DM Mono', monospace", paddingLeft: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.pkg}</span>
                    <span style={{ fontSize: 10.5, color: "#6b7a99", fontFamily: "'DM Mono', monospace" }}>{row.ver}</span>
                    <span style={{ background: "rgba(46,213,115,0.1)", border: "1px solid rgba(46,213,115,0.25)", color: "#2ed573", fontSize: 9, fontFamily: "'DM Mono', monospace", padding: "3px 8px", borderRadius: 100, display: "inline-flex", alignItems: "center", gap: 4, width: "fit-content" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2ed573" }} /> HIGH
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Pagination ── */}
              <div style={{ padding: "6px 14px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 9.5, color: "#3d5275", fontFamily: "'DM Mono', monospace" }}>49–60 of 2,986</span>
                <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  {["1","…","4","5","6","…","249"].map((p, i) => (
                    <div key={i} style={{
                      width: 20, height: 20, borderRadius: 5,
                      background: p === "5" ? "linear-gradient(135deg,#f5a623,#e09010)" : "transparent",
                      border: p === "5" ? "none" : "1px solid #162030",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9.5, color: p === "5" ? "#080d18" : "#6b7a99",
                      fontFamily: "'DM Mono', monospace", fontWeight: p === "5" ? 700 : 400,
                    }}>{p}</div>
                  ))}
                </div>
                <span style={{ fontSize: 9.5, color: "#3d5275", fontFamily: "'DM Mono', monospace" }}>page 5 of 249</span>
              </div>

            </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════ PROBLEM / SOLUTION ═══════════════════════ */}
      <section id="features" className="section-pad" style={{ padding: "100px 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 640, height: 640, background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="tag">THE PROBLEM</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-0.8px", marginTop: 16, maxWidth: 380, margin: "16px auto 0" }}>
              Enterprise tools are<br /><span className="glow-text">breaking your flow.</span>
            </h2>
            <p style={{ color: "#6b7a99", marginTop: 14, fontSize: 16, maxWidth: 480, margin: "14px auto 0" }}>
              Modern supply chain attacks are fundamentally different. Your tools need to be too.
            </p>
          </div>

          <div className="prob-layout reveal" style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {/* Problem */}
            <div style={{ flex: 1, background: "linear-gradient(135deg, rgba(255,71,87,0.05), transparent)", border: "1px solid rgba(255,71,87,0.2)", borderRadius: 16, padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <AlertTriangle size={18} color="#ff4757" />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 17, color: "#ff4757" }}>Current Reality</span>
              </div>
              {PROBLEMS.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 11, marginBottom: 15, fontSize: 14, color: "#8b9dc3", lineHeight: 1.65 }}>
                  <X size={13} color="#ff4757" style={{ flexShrink: 0, marginTop: 3 }} />
                  {item}
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div style={{ padding: "0 8px", flexShrink: 0 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowRight size={20} color="#f5a623" />
              </div>
            </div>

            {/* Solution */}
            <div style={{ flex: 1, background: "linear-gradient(135deg, rgba(46,213,115,0.05), transparent)", border: "1px solid rgba(46,213,115,0.2)", borderRadius: 16, padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <Shield size={18} color="#2ed573" />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 17, color: "#2ed573" }}>pkgwatch</span>
              </div>
              {SOLUTIONS.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 11, marginBottom: 15, fontSize: 14, color: "#8b9dc3", lineHeight: 1.65 }}>
                  <Check size={13} color="#2ed573" style={{ flexShrink: 0, marginTop: 3 }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section id="features" className="section-pad" style={{ padding: "100px 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 900, background: "radial-gradient(circle, rgba(245,166,35,0.055) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="tag">HOW IT WORKS</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-0.8px", marginTop: 16 }}>
              Four layers of<br /><span className="glow-text">defense.</span>
            </h2>
            <p style={{ color: "#6b7a99", marginTop: 14, fontSize: 16 }}>Built on open standards. Executed locally. Zero compromise.</p>
          </div>

          <div className="feat-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {FEATURES.map(({ Icon, tag, title, body }, i) => (
              <div key={i} className="card" style={{ padding: 32 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                  <div className="feat-icon"><Icon size={21} color="#f5a623" /></div>
                  <span className="tag" style={{ fontSize: 10 }}>{tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px", marginBottom: 12 }}>{title}</h3>
                <p style={{ color: "#6b7a99", fontSize: 14, lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════ ECOSYSTEM CAROUSEL ═══════════════════════ */}
      <section id="ecosystems" style={{ padding: "80px 0", overflow: "hidden" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: 48, padding: "0 80px" }}>
          <span className="tag">SUPPORTED ECOSYSTEMS</span>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.6px", marginTop: 16 }}>
            Covers the ecosystems<br /><span className="glow-text">that matter.</span>
          </h2>
          <p style={{ color: "#6b7a99", marginTop: 14, fontSize: 16 }}>
            8+ package managers. One agent. Fully offline.
          </p>
        </div>

        <div className="marquee-wrap">
          <div className="marquee-fade-left" />
          <div className="marquee-fade-right" />
          <div className="marquee-track">
            {[...ECOSYSTEMS, ...ECOSYSTEMS, ...ECOSYSTEMS].map((eco, i) => (
              <div key={i} style={{
                background: "linear-gradient(135deg, #0c1525, #09101e)",
                border: "1px solid #111d30",
                borderRadius: 12,
                padding: "14px 28px",
                display: "flex", alignItems: "center", gap: 10,
                whiteSpace: "nowrap",
              }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: eco.dot }} />
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13.5, color: "#c8d4e8" }}>{eco.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══════════════════════ PRICING ═══════════════════════ */}
      <section id="pricing" className="section-pad" style={{ padding: "100px 80px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="tag">PRICING</span>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-0.8px", marginTop: 16 }}>
              Start for free.<br /><span className="glow-text">Scale with your team.</span>
            </h2>
            <p style={{ color: "#6b7a99", marginTop: 14, fontSize: 16 }}>No credit card. No account. Just download and scan.</p>
          </div>

          <div className="price-layout reveal" style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* ── Free tier ── */}
            <div className="card" style={{ flex: 1, minWidth: 300, padding: 36 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#6b7a99", textTransform: "uppercase", letterSpacing: "1.5px" }}>Developer Edition</span>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "12px 0 0" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1 }}>$0</span>
                <span style={{ color: "#6b7a99", fontSize: 14 }}>/ forever</span>
              </div>

              <p style={{ color: "#6b7a99", fontSize: 14, lineHeight: 1.65, margin: "20px 0 24px", paddingBottom: 24, borderBottom: "1px solid #111d30" }}>
                Full-featured local desktop agent. No cloud, no account, no catches.
              </p>

              {FREE_FEATURES.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 13, fontSize: 14, color: "#c8d4e8" }}>
                  <Check size={14} color="#f5a623" /> {f}
                </div>
              ))}

              <button className="btn-primary" onClick={() => { window.open(DOWNLOAD_URL, "_blank") }} style={{ width: "100%", justifyContent: "center", marginTop: 32 }}>
                <Download size={16} /> Download Now — Free
              </button>
            </div>

            {/* ── Enterprise Teams Edition (Waitlist) ── */}
            <div className="pricing-enterprise" style={{ flex: 1, minWidth: 300, padding: 36, position: "relative" }}>
              <div style={{ position: "absolute", top: 18, right: 18 }}>
                <span className="tag" style={{ fontSize: 10 }}>COMING SOON</span>
              </div>

              {/* Removed "Pro" - strictly positioned as an Enterprise product */}
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#f5a623", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                Enterprise Teams
              </span>
              
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "12px 0 0" }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1, color: "#ffffff" }}>
                  Custom
                </span>
              </div>

              <p style={{ color: "#6b7a99", fontSize: 14, lineHeight: 1.65, margin: "20px 0 24px", paddingBottom: 24, borderBottom: "1px solid rgba(245,166,35,0.12)" }}>
                For engineering orgs requiring fleet visibility, CI/CD pipeline enforcement, and compliance reporting.
              </p>

              <div style={{ fontSize: 12, color: "#8b9dc3", fontWeight: 600, marginBottom: 16 }}>
                Everything in Free, plus:
              </div>

              {/* Replaced PRO_FEATURES with the specific, un-replicable enterprise features */}
              {[
                "Centralized CISO Fleet Dashboard",
                "CI/CD PR blocking (GitHub/GitLab)",
                "Automated remediation auto-PRs",
                "Private registry scanning (Artifactory)",
                "SOC2 & ISO27001 compliance exports",
                "SSO & SAML access control"
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 13, fontSize: 14, color: "#e8eaf0", fontWeight: 400 }}>
                  <Check size={14} color="#f5a623" />
                  {f}
                </div>
              ))}

              <button className="btn-outline-accent" onClick={() => window.open("https://tally.so/r/b5vjZg", "_blank")} style={{ width: "100%", justifyContent: "center", marginTop: 32 }}>
                <Mail size={16} /> Join the Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Roadmap / Coming Soon Section ── */}
      <div style={{ 
        padding: "80px 20px", 
        width: "100%", 
        display: "flex", 
        justifyContent: "center", 
        background: "#080d18",
        borderTop: "1px solid #111d30"
      }}>
        <div style={{ maxWidth: 1000, width: "100%" }}>
          
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ 
              fontSize: 10, 
              fontFamily: "'DM Mono', monospace", 
              background: "rgba(245,166,35,0.1)", 
              color: "#f5a623", 
              border: "1px solid rgba(245,166,35,0.25)", 
              padding: "4px 10px", 
              borderRadius: 100, 
              fontWeight: 700, 
              letterSpacing: "1px" 
            }}>
              DEVELOPER ROADMAP
            </span>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 800, color: "#ffffff", marginTop: 16, marginBottom: 12 }}>
              Currently In Development
            </h3>
            <p style={{ color: "#8b9dc3", fontSize: 15, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
              We are actively expanding core platform support. These features will be available in the free Developer Edition very soon.
            </p>
          </div>

          {/* Responsive Pure CSS Grid for Roadmap Cards */}
          <style>{`
            .roadmap-grid {
              display: grid;
              gap: 24px;
              grid-template-columns: repeat(3, 1fr);
            }
            .roadmap-card {
              background: rgba(10, 18, 32, 0.5);
              border: 1px dashed #1c2a40;
              border-radius: 12px;
              padding: 24px;
              transition: border-color 0.2s ease, background 0.2s ease;
            }
            .roadmap-card:hover {
              border-color: rgba(245, 166, 35, 0.4);
              background: rgba(10, 18, 32, 0.8);
            }
            @media (max-width: 768px) {
              .roadmap-grid {
                grid-template-columns: repeat(1, 1fr);
              }
            }
          `}</style>

          <div className="roadmap-grid">
            
            {/* ── macOS Support ── */}
            <div className="roadmap-card">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ background: "#111d30", padding: "8px", borderRadius: "8px", color: "#c8d4e8" }}>
                  {/* Replace with your preferred Monitor/Apple icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#e8eaf0" }}>macOS Native</span>
              </div>
              <p style={{ color: "#6b7a99", fontSize: 13, lineHeight: 1.6 }}>
                Full support for Intel and Apple Silicon (M1/M2/M3) chips. Packaged as a signed, native <code style={{fontFamily:"monospace", color:"#8b9dc3"}}>.dmg</code> application.
              </p>
            </div>

            {/* ── Linux Support ── */}
            <div className="roadmap-card">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ background: "#111d30", padding: "8px", borderRadius: "8px", color: "#c8d4e8" }}>
                  {/* Replace with your preferred Terminal/Linux icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#e8eaf0" }}>Linux Desktop</span>
              </div>
              <p style={{ color: "#6b7a99", fontSize: 13, lineHeight: 1.6 }}>
                Support for major distributions including Ubuntu, Debian, and Fedora. Distributed via <code style={{fontFamily:"monospace", color:"#8b9dc3"}}>.deb</code> and <code style={{fontFamily:"monospace", color:"#8b9dc3"}}>.AppImage</code>.
              </p>
            </div>

            {/* ── Background Daemon ── */}
            <div className="roadmap-card">
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ background: "#111d30", padding: "8px", borderRadius: "8px", color: "#c8d4e8" }}>
                  {/* Replace with your preferred System/Settings icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#e8eaf0" }}>System Tray Daemon</span>
              </div>
              <p style={{ color: "#6b7a99", fontSize: 13, lineHeight: 1.6 }}>
                Run pkgwatch silently in the background. It will actively monitor your <code style={{fontFamily:"monospace", color:"#8b9dc3"}}>node_modules</code> and <code style={{fontFamily:"monospace", color:"#8b9dc3"}}>site-packages</code> and alert you if a malicious dependency is pulled down.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="divider" />

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="pkg-footer-wrap">
        {/* Pure CSS for Responsive Footer Layout */}
        <style>{`
          .pkg-footer-wrap {
            padding: 64px 80px 40px;
            max-width: 1280px;
            margin: 0 auto;
          }
          .pkg-footer-top {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 48px;
            margin-bottom: 52px;
          }
          .pkg-footer-cols {
            display: flex;
            gap: 56px;
            flex-wrap: wrap;
          }
          .pkg-footer-bottom {
            border-top: 1px solid #111d30;
            padding-top: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 14px;
          }

          /* Tablet & Mobile Layout */
          @media (max-width: 768px) {
            .pkg-footer-wrap {
              padding: 48px 24px 24px;
            }
            .pkg-footer-top {
              flex-direction: column;
              gap: 40px;
              margin-bottom: 40px;
            }
            .pkg-footer-cols {
              display: grid;
              grid-template-columns: repeat(2, 1fr); /* 2x2 grid for links on mobile */
              gap: 32px 24px;
              width: 100%;
            }
            .pkg-footer-bottom {
              flex-direction: column;
              align-items: flex-start;
              gap: 20px;
            }
          }

          /* Ultra-small Mobile Layout */
          @media (max-width: 480px) {
            .pkg-footer-cols {
              grid-template-columns: 1fr; /* Stack links into a single column */
            }
          }
        `}</style>

        <div className="pkg-footer-top">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <PkgLogo size={28} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 16 }}>
                pkg<span style={{ color: "#f5a623" }}>watch</span>
              </span>
            </div>
            <p style={{ color: "#3d5275", fontSize: 13, maxWidth: 230, lineHeight: 1.65 }}>
              Locally-executing package security for developers who can't afford to wait.
            </p>
          </div>

          {/* Columns */}
          <div className="pkg-footer-cols">
            {[
              { label: "Product",   links: ["Download", "Changelog", "Roadmap"] },
              { label: "Resources", links: ["Documentation", "GitHub", "OSV Database"] },
              { label: "Company",   links: ["About", "Contact", "Security Policy"] },
            ].map((col) => (
              <div key={col.label}>
                <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#3d5275", marginBottom: 16, textTransform: "uppercase", letterSpacing: "1.5px" }}>{col.label}</div>
                {col.links.map((l) => (
                  <div key={l} style={{ color: "#6b7a99", fontSize: 14, marginBottom: 11, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#e8eaf0")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7a99")}
                  >{l}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="pkg-footer-bottom">
          <span style={{ color: "#3d5275", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>
            © 2026 pkgwatch. Built with Rust, Go, and a healthy dose of paranoia.
          </span>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href="https://github.com/a-dtya/pkgwatch/" target="_blank" rel="noopener noreferrer" style={{ color: "#3d5275", display: "flex", alignItems: "center", gap: 6, fontSize: 13, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#6b7a99")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3d5275")}
            ><GitBranch size={14} /> GitHub</a>
            <a href="mailto:adithyavinod1943@gmail.com" style={{ color: "#3d5275", display: "flex", alignItems: "center", gap: 6, fontSize: 13, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#6b7a99")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3d5275")}
            ><Mail size={14} /> adithyavinod1943@gmail.com</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

/*
  ── ANALYTICS (uncomment to enable) ──────────────────────

  For Vercel Analytics — add to app/layout.jsx:
  import { Analytics } from "@vercel/analytics/react";
  <Analytics />

  For PostHog — add to app/layout.jsx:
  import posthog from "posthog-js";
  posthog.init("YOUR_KEY", { api_host: "https://app.posthog.com" });

  Track CTA clicks on Download button:
  onClick={() => posthog.capture("Downloaded EXE", { version: "0.1.0-beta" })}

  ─────────────────────────────────────────────────────── */