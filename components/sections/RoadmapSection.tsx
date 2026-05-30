import Tag from "@/components/ui/Tag";

const ROADMAP_ITEMS = [
  {
    title: "macOS Native",
    description: (
      <>
        Full support for Intel and Apple Silicon (M1/M2/M3) chips. Packaged as a signed, native{" "}
        <code className="font-mono text-text-muted">.dmg</code> application.
      </>
    ),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Linux Desktop",
    description: (
      <>
        Support for major distributions including Ubuntu, Debian, and Fedora. Distributed via{" "}
        <code className="font-mono text-text-muted">.deb</code> and{" "}
        <code className="font-mono text-text-muted">.AppImage</code>.
      </>
    ),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    title: "System Tray Daemon",
    description: (
      <>
        Run pkgwatch silently in the background. Actively monitors your{" "}
        <code className="font-mono text-text-muted">node_modules</code> and{" "}
        <code className="font-mono text-text-muted">site-packages</code> and alerts you if a
        malicious dependency is pulled down.
      </>
    ),
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
] as const;

export default function RoadmapSection() {
  return (
    <div className="px-5 py-20 md:px-20 w-full border-t border-border bg-bg">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <Tag>DEVELOPER ROADMAP</Tag>
          <h3 className="font-body text-[32px] font-extrabold text-white mt-4 mb-3">
            Currently In Development
          </h3>
          <p className="text-[#8b9dc3] text-[15px] max-w-[500px] mx-auto leading-relaxed">
            We are actively expanding core platform support. These features will be available in
            the free Developer Edition very soon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROADMAP_ITEMS.map((item) => (
            <div
              key={item.title}
              className="bg-bg-card/50 border border-dashed border-[#1c2a40] rounded-xl p-6 transition-[border-color,background] duration-200 hover:border-accent/40 hover:bg-bg-card/80"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-border p-2 rounded-lg text-[#c8d4e8]">
                  {item.icon}
                </div>
                <span className="font-body text-lg font-bold text-text">{item.title}</span>
              </div>
              <p className="text-text-muted text-[13px] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
