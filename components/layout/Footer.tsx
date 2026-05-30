import { GitBranch, Mail } from "lucide-react";
import PkgLogo from "@/components/ui/PkgLogo";
import { FOOTER_COLUMNS, GITHUB_URL } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="px-5 pt-16 pb-10 md:px-20 max-w-[1280px] mx-auto">
      <div className="flex justify-between items-start flex-wrap gap-12 mb-13">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <PkgLogo size={28} />
            <span className="font-body font-extrabold text-base text-text">
              pkg<span className="text-accent">watch</span>
            </span>
          </div>
          <p className="text-text-dim text-[13px] max-w-[230px] leading-relaxed">
            Locally-executing package security for developers who can&apos;t afford to wait.
          </p>
        </div>

        {/* Link columns */}
        <div className="flex gap-14 flex-wrap md:grid md:grid-cols-3">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.label}>
              <div className="text-[11px] font-mono text-text-dim mb-4 uppercase tracking-[1.5px]">
                {col.label}
              </div>
              {col.links.map((link) => (
                <div
                  key={link}
                  className="text-text-muted text-sm mb-2.5 cursor-pointer hover:text-text transition-colors duration-200"
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border pt-6 flex justify-between items-center flex-wrap gap-3.5">
        <span className="text-text-dim text-xs font-mono">
          © 2026 pkgwatch. Built with Rust, Go, and a healthy dose of paranoia.
        </span>
        <div className="flex gap-5 flex-wrap">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-dim flex items-center gap-1.5 text-[13px] no-underline hover:text-text-muted transition-colors duration-200"
          >
            <GitBranch size={14} /> GitHub
          </a>
          <a
            href="mailto:adithyavinod1943@gmail.com"
            className="text-text-dim flex items-center gap-1.5 text-[13px] no-underline hover:text-text-muted transition-colors duration-200"
          >
            <Mail size={14} /> adithyavinod1943@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
