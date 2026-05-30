"use client";

import { useState, useEffect, useRef } from "react";
import { Download, GitBranch, Lock, Zap, Shield } from "lucide-react";
import Tag from "@/components/ui/Tag";
import HeroDashboardMockup from "@/components/sections/HeroDashboardMockup";
import { SCAN_LINES, DOWNLOAD_URL, GITHUB_URL } from "@/lib/data";

const LINE_COLOR: Record<string, string> = {
  cmd:     "#f5a623",
  info:    "#6b7a99",
  error:   "#ff4757",
  warn:    "#ffa502",
  success: "#2ed573",
  divider: "rgba(17,29,48,0.8)",
};

export default function HeroSection() {
  const [scanIdx, setScanIdx] = useState(0);
  const termRef = useRef<HTMLDivElement>(null);

  /* Terminal typewriter */
  useEffect(() => {
    if (scanIdx < SCAN_LINES.length) {
      const prev = SCAN_LINES[scanIdx - 1];
      const delay =
        scanIdx === 0         ? 800
        : prev?.t === "divider" ? 350
        : prev?.t === "cmd"     ? 600
        : 280;
      const id = setTimeout(() => {
        setScanIdx((n) => n + 1);
        if (termRef.current)
          termRef.current.scrollTop = termRef.current.scrollHeight;
      }, delay);
      return () => clearTimeout(id);
    }
  }, [scanIdx]);

  /* Loop terminal */
  useEffect(() => {
    if (scanIdx >= SCAN_LINES.length) {
      const id = setTimeout(() => setScanIdx(0), 4200);
      return () => clearTimeout(id);
    }
  }, [scanIdx]);

  return (
    <section
      className="relative min-h-screen flex items-center pt-[120px] pb-20 px-5 md:px-20"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,29,48,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(17,29,48,0.45) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 80% 80% at 25% 50%, black 20%, transparent 75%)",
        }}
      />

      {/* Golden glow blobs */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "5%", left: "-12%", width: 720, height: 720, background: "radial-gradient(circle, rgba(245,166,35,0.11) 0%, transparent 68%)" }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ top: "50%", right: "-8%", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 68%)" }}
      />

      <div className="flex flex-col lg:flex-row gap-18 items-center max-w-[1280px] w-full mx-auto relative z-10">

        {/* ── Left: copy ── */}
        <div className="flex-1">
          <div className="flex gap-2 mb-7 flex-wrap">
            <Tag>v0.1.0-beta</Tag>
            <Tag>Windows</Tag>
            <Tag variant="success">FREE</Tag>
          </div>

          <h1 className="font-body font-extrabold leading-[1.14] tracking-[-1.2px] mb-6 text-[38px] md:text-[52px]">
            Transform Your
            <br />
            <span className="glow-text">Supply Chain</span>
            <br />
            Security.
          </h1>

          <p className="text-[17px] text-[#8b9dc3] leading-[1.75] mb-9 max-w-[480px]">
            A blazingly fast, locally-executing desktop agent that scans your machine for
            malicious packages and zero-day vulnerabilities in milliseconds.
          </p>

          <div className="flex gap-3 flex-wrap mb-8">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-accent to-[#e09010] text-bg font-bold text-[13px] px-5 py-2.5 rounded-[10px] no-underline shadow-[0_0_36px_rgba(245,166,35,0.35)] hover:shadow-[0_0_56px_rgba(245,166,35,0.55)] hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200 whitespace-nowrap"
            >
              <Download size={17} />
              Download for Windows
              <span className="font-mono text-xs opacity-65">.exe</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent text-text border border-border rounded-[10px] px-[26px] py-[13px] text-[15px] font-medium no-underline hover:border-accent/30 hover:text-accent transition-[border-color,color] duration-200 whitespace-nowrap"
            >
              <GitBranch size={15} /> View on GitHub
            </a>
          </div>

          <div className="flex gap-7 flex-wrap">
            {[
              { Icon: Lock,   t: "Zero cloud data leakage" },
              { Icon: Zap,    t: "100% local execution" },
              { Icon: Shield, t: "Open-source core" },
            ].map(({ Icon, t }) => (
              <div key={t} className="flex items-center gap-1.5 text-text-muted text-[13px]">
                <Icon size={13} color="#f5a623" /> {t}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: responsive mockup ── */}
        <div className="flex-1 flex justify-center px-4">

          {/* Mobile: simple terminal */}
          <div
            className="block md:hidden w-full max-w-[380px] rounded-xl overflow-hidden"
            style={{ background: "#0a1220", border: "1px solid #162030", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
          >
            {/* Mac-style header */}
            <div style={{ background: "#0f1a2e", padding: "12px 16px", borderBottom: "1px solid #162030", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(239,68,68,0.8)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(234,179,8,0.8)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(34,197,94,0.8)" }} />
              <span style={{ marginLeft: 8, fontSize: 10, color: "#94a3b8", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                bash - pkgwatch
              </span>
            </div>
            {/* Output */}
            <div style={{ padding: 20, fontFamily: "monospace", fontSize: 12, lineHeight: 1.6, color: "#c8d4e8" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <span style={{ color: "#f5a623" }}>➜</span>
                <span style={{ color: "#60a5fa" }}>~/project</span>
                <span>pkgwatch scan --profile baseline</span>
              </div>
              <div style={{ color: "#6b7a99" }}>Loading OSV threat feed... [DONE]</div>
              <div style={{ color: "#6b7a99" }}>Scanning 2,986 local packages...</div>
              <div style={{ marginTop: 16, color: "#ff4757", display: "flex", gap: 8, fontWeight: "bold" }}>
                <span>[!]</span><span>CRITICAL THREAT DETECTED</span>
              </div>
              <div style={{ color: "rgba(255,71,87,0.8)", marginLeft: 28, marginTop: 4 }}>Package: STMicroelectronics.stm32</div>
              <div style={{ color: "rgba(255,71,87,0.8)", marginLeft: 28 }}>Confidence: HIGH (OSV Match)</div>
              <div style={{ marginTop: 16, color: "#2ed573", fontWeight: "bold" }}>✓ Scan completed in 0.1s</div>
            </div>
          </div>

          {/* Desktop: full dashboard */}
          <div className="hidden md:block max-w-[640px] shrink-0 animate-float">
            <HeroDashboardMockup />
          </div>

        </div>
      </div>
    </section>
  );
}
