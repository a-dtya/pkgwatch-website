import { Check, Download, Mail } from "lucide-react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import Tag from "@/components/ui/Tag";
import { FREE_FEATURES, ENTERPRISE_FEATURES, DOWNLOAD_URL, WAITLIST_URL } from "@/lib/data";

export default function PricingSection() {
  return (
    <section id="pricing" className="px-5 py-16 md:px-20 md:py-[100px]">
      <div className="max-w-[1000px] mx-auto">
        <RevealWrapper className="text-center mb-15">
          <Tag>PRICING</Tag>
          <h2 className="font-body text-[34px] font-extrabold tracking-[-0.8px] mt-4">
            Start for free.
            <br />
            <span className="glow-text">Scale with your team.</span>
          </h2>
          <p className="text-text-muted mt-3.5 text-base">
            No credit card. No account. Just download and scan.
          </p>
        </RevealWrapper>

        <RevealWrapper className="flex flex-col md:flex-row gap-6 items-start flex-wrap">

          {/* Free tier */}
          <div className="flex-1 min-w-[300px] p-9 bg-gradient-to-br from-bg-card to-bg-card-alt border border-border rounded-2xl transition-[border-color,transform] duration-300 hover:border-accent/30 hover:-translate-y-1">
            <span className="font-mono text-[11px] text-text-muted uppercase tracking-[1.5px]">
              Developer Edition
            </span>
            <div className="flex items-baseline gap-2 mt-3 mb-0">
              <span className="font-body text-[52px] font-extrabold leading-none">$0</span>
              <span className="text-text-muted text-sm">/ forever</span>
            </div>

            <p className="text-text-muted text-sm leading-relaxed mt-5 mb-6 pb-6 border-b border-border">
              Full-featured local desktop agent. No cloud, no account, no catches.
            </p>

            {FREE_FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5 mb-3 text-sm text-[#c8d4e8]">
                <Check size={14} color="#f5a623" />
                {f}
              </div>
            ))}

            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full flex items-center justify-center gap-2 bg-gradient-to-br from-accent to-[#e09010] text-bg font-bold text-[15px] px-[26px] py-[13px] rounded-[10px] no-underline shadow-[0_0_36px_rgba(245,166,35,0.35)] hover:shadow-[0_0_56px_rgba(245,166,35,0.55)] hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200 whitespace-nowrap"
            >
              <Download size={16} /> Download Now — Free
            </a>
          </div>

          {/* Enterprise tier */}
          <div
            className="pricing-pro flex-1 min-w-[300px] p-9 relative"
          >
            <div className="absolute top-4.5 right-4.5">
              <Tag className="text-[10px]">COMING SOON</Tag>
            </div>

            <span className="font-mono text-[11px] text-accent uppercase tracking-[1.5px]">
              Enterprise Teams
            </span>

            <div className="flex items-baseline gap-2.5 mt-3 mb-0">
              <span className="font-body text-[52px] font-extrabold leading-none text-white">
                Custom
              </span>
            </div>

            <p className="text-text-muted text-sm leading-relaxed mt-5 mb-6 pb-6 border-b border-accent/10">
              For engineering orgs requiring fleet visibility, CI/CD pipeline enforcement, and
              compliance reporting.
            </p>

            <div className="text-xs text-[#8b9dc3] font-semibold mb-4">
              Everything in Free, plus:
            </div>

            {ENTERPRISE_FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5 mb-3 text-sm text-text">
                <Check size={14} color="#f5a623" />
                {f}
              </div>
            ))}

            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full flex items-center justify-center gap-2 bg-transparent text-accent border border-accent/40 font-bold text-[15px] px-[26px] py-[13px] rounded-[10px] no-underline hover:bg-accent/8 hover:shadow-[0_0_24px_rgba(245,166,35,0.15)] transition-[background,box-shadow] duration-200 whitespace-nowrap"
            >
              <Mail size={16} /> Join the Waitlist
            </a>
          </div>

        </RevealWrapper>
      </div>
    </section>
  );
}
