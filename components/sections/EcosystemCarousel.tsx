import RevealWrapper from "@/components/ui/RevealWrapper";
import Tag from "@/components/ui/Tag";
import { ECOSYSTEMS } from "@/lib/data";

export default function EcosystemCarousel() {
  return (
    <section id="ecosystems" className="py-20 overflow-hidden">
      <RevealWrapper className="text-center mb-12 px-5 md:px-20">
        <Tag>SUPPORTED ECOSYSTEMS</Tag>
        <h2 className="font-body text-[30px] font-extrabold tracking-[-0.6px] mt-4">
          Covers the ecosystems
          <br />
          <span className="glow-text">that matter.</span>
        </h2>
        <p className="text-text-muted mt-3.5 text-base">
          8+ package managers. One agent. Fully offline.
        </p>
      </RevealWrapper>

      <div className="marquee-wrap">
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />
        <div className="marquee-track">
          {[...ECOSYSTEMS, ...ECOSYSTEMS, ...ECOSYSTEMS].map((eco, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap px-7 py-3.5 rounded-xl border border-border"
              style={{
                background: "linear-gradient(135deg, #0c1525, #09101e)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: eco.dot }}
              />
              <span className="font-mono text-[13.5px] text-[#c8d4e8]">
                {eco.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
