import { Shield, Package, Globe, Activity, AlertTriangle } from "lucide-react";
import PkgLogo from "@/components/ui/PkgLogo";

const STAT_CARDS = [
  { label: "ACTIVE THREATS", val: "0",     sub: "from threat feed", glow: "rgba(255,71,87,0.1)",    border: "rgba(255,71,87,0.2)"   },
  { label: "PACKAGES",        val: "2,986", sub: "discovered",       glow: "rgba(245,166,35,0.1)",   border: "rgba(245,166,35,0.2)"  },
  { label: "ECOSYSTEMS",      val: "5",     sub: "registries",       glow: "rgba(74,158,255,0.08)",  border: "rgba(74,158,255,0.2)"  },
  { label: "SUSPICIOUS HIGH", val: "2,230", sub: "",                 glow: "rgba(46,213,115,0.08)",  border: "rgba(46,213,115,0.2)"  },
  { label: "SUSPICIOUS MED",  val: "756",   sub: "",                 glow: "rgba(255,165,2,0.08)",   border: "rgba(255,165,2,0.2)"   },
] as const;

const ECO_FILTERS = [
  { name: "browser-extension", count: "50",   dot: "#8b9dc3" },
  { name: "editor-extension",  count: "38",   dot: "#8b9dc3" },
  { name: "go",                count: "204",  dot: "#00add8" },
  { name: "npm",               count: "2552", dot: "#cc3534" },
  { name: "pypi",              count: "162",  dot: "#3775a9" },
] as const;

const PKG_ROWS = [
  { eco: "editor-extension", pkg: "STMicroelectronics.stm32-vscode-extension", ver: "v3.9.0" },
  { eco: "editor-extension", pkg: "ms-vscode.cpp-devtools",                    ver: "v0.5.13" },
  { eco: "editor-extension", pkg: "ms-vscode.remote-explorer",                 ver: "v0.5.0" },
  { eco: "editor-extension", pkg: "STMicroelectronics.stm32cube-ide-core",     ver: "v1.3.0" },
] as const;

const PAGINATION = ["1", "…", "4", "5", "6", "…", "249"] as const;

export default function HeroDashboardMockup() {
  return (
    <div
      style={{
        background: "#0a1220",
        border: "1px solid #162030",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 48px 96px rgba(0,0,0,0.75), 0 0 0 1px rgba(245,166,35,0.05), inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      {/* App header */}
      <div
        style={{
          padding: "0 14px",
          height: 42,
          borderBottom: "1px solid #111d30",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex items-center gap-1.5 mr-1">
          <PkgLogo size={20} />
          <span className="font-body font-extrabold text-[12.5px]">
            pkg<span className="text-accent">watch</span>
          </span>
        </div>
        {["Packages", "Vulnerabilities", "History", "Settings"].map((tab, i) => (
          <span
            key={tab}
            style={{
              fontSize: 11.5,
              padding: "4px 10px",
              borderRadius: 6,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? "#e8eaf0" : "#6b7a99",
              background: i === 0 ? "rgba(245,166,35,0.12)" : "transparent",
              border: i === 0 ? "1px solid rgba(245,166,35,0.25)" : "1px solid transparent",
            }}
          >
            {tab}
          </span>
        ))}
        <div className="ml-auto flex items-center gap-2.5">
          <span className="font-mono text-[10px] text-success">✓ completed in 19.8s</span>
          <div
            style={{
              background: "linear-gradient(135deg, #f5a623, #e09010)",
              color: "#080d18",
              borderRadius: 7,
              padding: "5px 12px",
              fontSize: 11,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 5,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            <Activity size={11} /> Run Scan
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ padding: "12px 14px 10px", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
        {STAT_CARDS.map(({ label, val, sub, glow, border }) => (
          <div key={label} style={{ background: glow, border: `1px solid ${border}`, borderRadius: 9, padding: "10px 10px 8px" }}>
            <span style={{ fontSize: 8, color: "#6b7a99", fontFamily: "var(--font-mono)", letterSpacing: "0.4px", lineHeight: 1.3, display: "block", marginBottom: 5 }}>{label}</span>
            <div style={{ fontFamily: "var(--font-body)", fontSize: val.length > 3 ? 18 : 22, fontWeight: 800, color: "#e8eaf0", lineHeight: 1 }}>{val}</div>
            {sub && <div style={{ fontSize: 9, color: "#3d5275", marginTop: 3, fontFamily: "var(--font-body)" }}>{sub}</div>}
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ padding: "0 14px 10px", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 9, color: "#3d5275", fontFamily: "var(--font-mono)", letterSpacing: "1px", marginRight: 2 }}>FILTER</span>
        {ECO_FILTERS.map((eco) => (
          <div key={eco.name} style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(17,29,48,0.8)", border: "1px solid #162030", borderRadius: 100, padding: "3px 8px" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: eco.dot }} />
            <span style={{ fontSize: 9.5, color: "#c8d4e8", fontFamily: "var(--font-mono)" }}>{eco.name}</span>
            <span style={{ fontSize: 9.5, color: "#6b7a99", fontFamily: "var(--font-mono)" }}>{eco.count}</span>
          </div>
        ))}
      </div>

      {/* Package table */}
      <div style={{ margin: "0 14px 10px", border: "1px solid #111d30", borderRadius: 10, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "130px 1fr 72px 88px", padding: "7px 12px", background: "rgba(0,0,0,0.25)", borderBottom: "1px solid #111d30" }}>
          {["ECOSYSTEM ↑", "PACKAGE NAME", "VERSION", "CONFIDENCE"].map((h) => (
            <span key={h} style={{ fontSize: 8.5, color: h === "ECOSYSTEM ↑" ? "#f5a623" : "#3d5275", fontFamily: "var(--font-mono)", letterSpacing: "0.6px" }}>{h}</span>
          ))}
        </div>
        {/* Rows */}
        {PKG_ROWS.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "130px 1fr 72px 88px", padding: "9px 12px", borderBottom: i < 3 ? "1px solid rgba(17,29,48,0.7)" : "none", alignItems: "center" }}>
            <div style={{ background: "rgba(17,29,48,0.9)", borderRadius: 5, padding: "3px 7px", fontSize: 8.5, color: "#6b7a99", fontFamily: "var(--font-mono)", display: "inline-flex", alignItems: "center", gap: 4, width: "fit-content" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#3d5275", flexShrink: 0 }} />
              {row.eco}
            </div>
            <span style={{ fontSize: 11, color: "#c8d4e8", fontFamily: "var(--font-mono)", paddingLeft: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.pkg}</span>
            <span style={{ fontSize: 10.5, color: "#6b7a99", fontFamily: "var(--font-mono)" }}>{row.ver}</span>
            <span style={{ background: "rgba(46,213,115,0.1)", border: "1px solid rgba(46,213,115,0.25)", color: "#2ed573", fontSize: 9, fontFamily: "var(--font-mono)", padding: "3px 8px", borderRadius: 100, display: "inline-flex", alignItems: "center", gap: 4, width: "fit-content" }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#2ed573" }} /> HIGH
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ padding: "6px 14px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 9.5, color: "#3d5275", fontFamily: "var(--font-mono)" }}>49–60 of 2,986</span>
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          {PAGINATION.map((p, i) => (
            <div key={i} style={{
              width: 20, height: 20, borderRadius: 5,
              background: p === "5" ? "linear-gradient(135deg,#f5a623,#e09010)" : "transparent",
              border: p === "5" ? "none" : "1px solid #162030",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9.5, color: p === "5" ? "#080d18" : "#6b7a99",
              fontFamily: "var(--font-mono)", fontWeight: p === "5" ? 700 : 400,
            }}>{p}</div>
          ))}
        </div>
        <span style={{ fontSize: 9.5, color: "#3d5275", fontFamily: "var(--font-mono)" }}>page 5 of 249</span>
      </div>
    </div>
  );
}
