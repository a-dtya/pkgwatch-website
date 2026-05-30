import type { ComponentType } from "react";
import {
  Cpu, Eye, Database, Lock,
} from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
export interface ScanLine {
  t: "cmd" | "info" | "error" | "warn" | "success" | "divider";
  s: string;
}

export interface Ecosystem {
  name: string;
  dot: string;
}

export interface FeatureItem {
  Icon: ComponentType<{ size?: number; color?: string }>;
  tag: string;
  title: string;
  body: string;
}

export interface RoadmapItem {
  title: string;
  description: string;
  iconPath: string;
}

export interface FooterColumn {
  label: string;
  links: string[];
}

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
export const DOWNLOAD_URL =
  "https://github.com/user-attachments/files/28362681/pkgwatch_0.1.0_x64-setup.zip";

export const WAITLIST_URL = "https://tally.so/r/b5vjZg";

export const GITHUB_URL = "https://github.com/a-dtya/pkgwatch/";

export const SCAN_LINES: ScanLine[] = [
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

export const ECOSYSTEMS: Ecosystem[] = [
  { name: "NPM",        dot: "#cc3534" },
  { name: "PyPI",       dot: "#3775a9" },
  { name: "Cargo",      dot: "#e67e22" },
  { name: "Go Modules", dot: "#00add8" },
  { name: "Maven",      dot: "#c71a36" },
  { name: "RubyGems",   dot: "#cc342d" },
  { name: "Homebrew",   dot: "#e4a020" },
  { name: "APT",        dot: "#a80030" },
];

export const FEATURES: FeatureItem[] = [
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

export const PROBLEMS: string[] = [
  "Supply chain attacks (typosquatting, compromised releases) bypass standard AV entirely",
  "Enterprise scanners upload your codebase to remote servers—leaking sensitive IP",
  "Cloud-based tools take minutes per scan, breaking developer flow and CI pipelines",
  "Zero-day packages slip through while CVE databases update with a 24–72 hour lag",
  "No heuristic risk scoring—only known-bad signatures with no behavioral context",
];

export const SOLUTIONS: string[] = [
  "Detects typosquatting and novel zero-day packages heuristically before they ever run",
  "Runs entirely on your local filesystem—your code never leaves your machine",
  "Sub-second scans run silently in background; zero interruption to developer workflow",
  "Daily-updated OSV catalog ensures guaranteed CVE and known-malware coverage",
  "Confidence scoring: High / Medium / Low risk for every flagged package",
];

export const FREE_FEATURES: string[] = [
  "Local desktop app (Windows)",
  "Heuristic scanning engine",
  "Daily OSV threat feed (automatic)",
  "8+ supported ecosystems",
  "Confidence scoring: High/Med/Low",
  "Open-source core (Bumblebee)",
];

export const ENTERPRISE_FEATURES: string[] = [
  "Centralized CISO Fleet Dashboard",
  "CI/CD PR blocking (GitHub/GitLab)",
  "Automated remediation auto-PRs",
  "Private registry scanning (Artifactory)",
  "SOC2 & ISO27001 compliance exports",
  "SSO & SAML access control",
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  { label: "Product",   links: ["Download", "Changelog", "Roadmap"] },
  { label: "Resources", links: ["Documentation", "GitHub", "OSV Database"] },
  { label: "Company",   links: ["About", "Contact", "Security Policy"] },
];
