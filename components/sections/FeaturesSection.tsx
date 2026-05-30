import RevealWrapper from "@/components/ui/RevealWrapper";
import Tag from "@/components/ui/Tag";
import { FEATURES } from "@/lib/data";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative px-5 py-16 md:px-20 md:py-[100px]"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,166,35,0.055) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-[1280px] mx-auto">
        <RevealWrapper className="text-center mb-15">
          <Tag>HOW IT WORKS</Tag>
          <h2 className="font-body text-[34px] font-extrabold tracking-[-0.8px] mt-4">
            Four layers of
            <br />
            <span className="glow-text">defense.</span>
          </h2>
          <p className="text-text-muted mt-3.5 text-base">
            Built on open standards. Executed locally. Zero compromise.
          </p>
        </RevealWrapper>

        <RevealWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map(({ Icon, tag, title, body }, i) => (
              <div
                key={i}
                className="p-8 bg-gradient-to-br from-bg-card to-bg-card-alt border border-border rounded-2xl transition-[border-color,transform] duration-300 hover:border-accent/30 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4.5 shrink-0">
                    <Icon size={21} color="#f5a623" />
                  </div>
                  <Tag className="text-[10px]">{tag}</Tag>
                </div>
                <h3 className="font-body text-xl font-bold tracking-[-0.3px] mb-3">{title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
