import { AlertTriangle, Shield, X, Check } from "lucide-react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import Tag from "@/components/ui/Tag";
import { PROBLEMS, SOLUTIONS } from "@/lib/data";

export default function ProblemSolution() {
  return (
    <section
      id="features"
      className="relative px-5 py-16 md:px-20 md:py-[100px]"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[640px] h-[640px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1280px] mx-auto">
        <RevealWrapper className="text-center mb-15">
          <Tag>THE PROBLEM</Tag>
          <h2 className="font-body text-[34px] font-extrabold tracking-[-0.8px] mt-4 max-w-[380px] mx-auto">
            Enterprise tools are
            <br />
            <span className="glow-text">breaking your flow.</span>
          </h2>
          <p className="text-text-muted mt-3.5 text-base max-w-[480px] mx-auto">
            Modern supply chain attacks are fundamentally different. Your tools need to be too.
          </p>
        </RevealWrapper>

        <RevealWrapper className="flex flex-col md:flex-row gap-5 items-center">
          {/* Problems */}
          <div
            className="flex-1 rounded-2xl p-8"
            style={{
              background: "linear-gradient(135deg, rgba(255,71,87,0.05), transparent)",
              border: "1px solid rgba(255,71,87,0.2)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <AlertTriangle size={18} color="#ff4757" />
              <span className="font-body font-bold text-[17px] text-danger">
                Current Reality
              </span>
            </div>
            {PROBLEMS.map((item, i) => (
              <div key={i} className="flex gap-2.5 mb-4 text-sm text-text-muted leading-relaxed">
                <X size={13} color="#ff4757" className="shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className="px-2 shrink-0">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(245,166,35,0.1)",
                border: "1px solid rgba(245,166,35,0.25)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5a623" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Solutions */}
          <div
            className="flex-1 rounded-2xl p-8"
            style={{
              background: "linear-gradient(135deg, rgba(46,213,115,0.05), transparent)",
              border: "1px solid rgba(46,213,115,0.2)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <Shield size={18} color="#2ed573" />
              <span className="font-body font-bold text-[17px] text-success">
                pkgwatch
              </span>
            </div>
            {SOLUTIONS.map((item, i) => (
              <div key={i} className="flex gap-2.5 mb-4 text-sm text-text-muted leading-relaxed">
                <Check size={13} color="#2ed573" className="shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
