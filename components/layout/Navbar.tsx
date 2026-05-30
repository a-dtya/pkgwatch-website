"use client";

import { useState, useEffect } from "react";
import { Download, GitBranch } from "lucide-react";
import PkgLogo from "@/components/ui/PkgLogo";
import { DOWNLOAD_URL, GITHUB_URL } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={scrolled ? "nav-scrolled" : ""}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 200,
        height: 64,
        padding: "0 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.35s, border 0.35s, backdrop-filter 0.35s",
        background: "rgba(8, 13, 24, 0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(245, 166, 35, 0.2)",
        boxShadow: "0 15px 40px -10px rgba(245, 166, 35, 0.15)",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        className="flex items-center gap-2.5 no-underline"
      >
        <PkgLogo size={34} />
        <span className="font-body font-extrabold text-[18px] tracking-[-0.4px] text-text">
          pkg<span className="text-accent">watch</span>
        </span>
      </a>

      {/* Nav links — hidden on mobile */}
      <div className="hidden md:flex gap-8 items-center">
        {["Features", "Ecosystems", "Pricing"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="text-text-muted text-sm font-medium no-underline hover:text-text transition-colors duration-200"
          >
            {label}
          </a>
        ))}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted text-sm font-medium no-underline flex items-center gap-1.5 hover:text-text transition-colors duration-200"
        >
          <GitBranch size={14} /> GitHub
        </a>
      </div>

      {/* CTA — hidden on mobile */}
      <a
        href={DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-flex items-center gap-2 bg-gradient-to-br from-accent to-[#e09010] text-bg font-bold text-[13px] px-5 py-2.5 rounded-[10px] no-underline shadow-[0_0_36px_rgba(245,166,35,0.35)] hover:shadow-[0_0_56px_rgba(245,166,35,0.55)] hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200 whitespace-nowrap"
      >
        <Download size={14} /> Download .exe
      </a>
    </nav>
  );
}
