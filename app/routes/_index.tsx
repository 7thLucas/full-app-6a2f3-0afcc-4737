import { Link } from "react-router";
import { useConfigurables } from "~/modules/configurables";
import {
  Zap,
  ShieldCheck,
  FileText,
  Award,
  CheckCircle,
  ArrowRight,
  Gem,
  Lock,
  Star,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  ShieldCheck,
  FileText,
  Award,
  CheckCircle,
  Lock,
  Star,
  Gem,
};

export default function LandingPage() {
  const { config, loading } = useConfigurables();

  const appName = loading ? "GEMRITE" : (config?.appName ?? "GEMRITE");
  const tagline = loading ? "Authentic. Certified. Instant." : (config?.tagline ?? "Authentic. Certified. Instant.");
  const heroHeadline = loading ? "Know What You're Holding" : (config?.heroHeadline ?? "Know What You're Holding");
  const heroSubheadline = loading
    ? "GEMRITE delivers certified authenticity verification for precious stones in seconds — at the exact moment of sale."
    : (config?.heroSubheadline ?? "GEMRITE delivers certified authenticity verification for precious stones in seconds — at the exact moment of sale.");
  const heroCTA = loading ? "Verify a Stone" : (config?.heroCTA ?? "Verify a Stone");
  const features = loading
    ? []
    : (config?.features ?? []);
  const showPricing = loading ? true : (config?.showPricing ?? true);
  const pricingPaygPrice = loading ? "$9" : (config?.pricingPaygPrice ?? "$9");
  const pricingProPrice = loading ? "$79/month" : (config?.pricingProPrice ?? "$79/month");
  const pricingPaygLabel = loading ? "Pay-as-you-go" : (config?.pricingPaygLabel ?? "Pay-as-you-go");
  const pricingProLabel = loading ? "Pro Plan" : (config?.pricingProLabel ?? "Pro Plan");
  const footerText = loading
    ? "© 2026 GEMRITE. All rights reserved."
    : (config?.footerText ?? "© 2026 GEMRITE. All rights reserved.");

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur border-b border-[#334155]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gem className="w-5 h-5 text-[#f59e0b]" />
            <span className="font-display text-xl font-bold text-[#f8fafc]">{appName}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a href="#features" className="text-[#94a3b8] hover:text-[#f8fafc] text-sm transition-colors">
              Features
            </a>
            {showPricing && (
              <a href="#pricing" className="text-[#94a3b8] hover:text-[#f8fafc] text-sm transition-colors">
                Pricing
              </a>
            )}
            <Link to="/auth/login" className="text-[#94a3b8] hover:text-[#f8fafc] text-sm transition-colors">
              Sign in
            </Link>
          </div>
          <Link
            to="/auth/register"
            className="bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Background gem pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#f59e0b]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#f59e0b]/3 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#1e293b] border border-[#f59e0b]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full" />
            <span className="text-[#f59e0b] text-xs font-medium tracking-wider uppercase">
              {tagline}
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            <span className="text-[#f8fafc]">{heroHeadline.split(" ").slice(0, -1).join(" ")}</span>{" "}
            <span className="text-[#f59e0b]">{heroHeadline.split(" ").slice(-1)[0]}</span>
          </h1>
          <p className="text-[#94a3b8] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/register"
              className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold px-8 py-4 rounded-lg text-base transition-colors"
            >
              {heroCTA}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-[#f8fafc] border border-[#334155] hover:border-[#f59e0b]/50 px-8 py-4 rounded-lg text-base transition-colors"
            >
              How it works
            </a>
          </div>
          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-6 text-[#94a3b8] text-sm">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#22c55e]" />
              <span>Results in seconds</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[#334155]" />
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#22c55e]" />
              <span>Fraud detection built-in</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[#334155]" />
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#22c55e]" />
              <span>PDF certificates</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-[#1e293b]/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f8fafc] mb-3">
              Verification in Three Steps
            </h2>
            <p className="text-[#94a3b8] text-base max-w-xl mx-auto">
              From submission to certified result in seconds. No waiting. No uncertainty.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Submit the Stone",
                description:
                  "Provide details about the stone — type, weight, color, origin claim — and upload a photo. Takes under two minutes.",
                icon: <Gem className="w-6 h-6 text-[#f59e0b]" />,
              },
              {
                step: "02",
                title: "AI-Powered Analysis",
                description:
                  "Our gemology AI analyzes all submitted evidence against known authenticity patterns, fraud signals, and market data.",
                icon: <Zap className="w-6 h-6 text-[#f59e0b]" />,
              },
              {
                step: "03",
                title: "Certified Result",
                description:
                  "Receive a verified result with a confidence score, fraud flags (if any), and — on Pro Plan — a downloadable PDF certificate.",
                icon: <FileText className="w-6 h-6 text-[#f59e0b]" />,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-[#1e293b] border border-[#334155] rounded-xl p-6 hover:border-[#f59e0b]/40 transition-colors"
              >
                <div className="absolute top-4 right-4 text-[#334155] font-display text-3xl font-bold select-none">
                  {item.step}
                </div>
                <div className="w-10 h-10 bg-[#f59e0b]/10 rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-[#f8fafc] mb-2">{item.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section id="features" className="py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f8fafc] mb-3">
                Built for Precision
              </h2>
              <p className="text-[#94a3b8] text-base max-w-xl mx-auto">
                Every feature is purpose-built for precious stone authentication — nothing generic, nothing bolted on.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, index) => {
                const IconComponent = feature.icon ? ICON_MAP[feature.icon] : null;
                return (
                  <div
                    key={index}
                    className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 hover:border-[#f59e0b]/40 transition-colors"
                  >
                    {IconComponent && (
                      <div className="w-10 h-10 bg-[#f59e0b]/10 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="w-5 h-5 text-[#f59e0b]" />
                      </div>
                    )}
                    <h3 className="font-display text-lg font-semibold text-[#f8fafc] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#94a3b8] text-sm leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Certificate Preview */}
      <section className="py-20 px-4 sm:px-6 bg-[#1e293b]/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0f172a] border border-[#f59e0b]/30 rounded-full px-4 py-1.5 mb-6">
                <span className="text-[#f59e0b] text-xs font-medium uppercase tracking-wider">Pro Plan Exclusive</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f8fafc] mb-4 leading-tight">
                PDF Certificate of Authenticity
              </h2>
              <p className="text-[#94a3b8] text-base leading-relaxed mb-6">
                Every verified stone on the Pro Plan comes with a signed, document-grade PDF certificate. Present it at point of sale, include it with the stone, or store it in your collection records.
              </p>
              <ul className="space-y-3">
                {[
                  "Stone type, weight, and characteristics",
                  "Authenticity verdict and confidence score",
                  "Fraud indicators checked (pass/fail)",
                  "Verification timestamp and GEMRITE seal",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#94a3b8]">
                    <CheckCircle className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/auth/register"
                className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold px-6 py-3 rounded-lg text-sm mt-8 transition-colors"
              >
                Get Pro Plan
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Mock certificate */}
            <div className="bg-[#0f172a] border border-[#f59e0b]/40 rounded-xl p-6 relative overflow-hidden gold-glow">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent opacity-60" />
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full mb-3">
                  <Award className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#f8fafc]">GEMRITE</h3>
                <p className="text-[#94a3b8] text-xs uppercase tracking-widest mt-1">Certificate of Authenticity</p>
              </div>
              <div className="border-t border-[#334155] pt-5 space-y-3">
                {[
                  { label: "Stone Type", value: "Natural Ruby" },
                  { label: "Carat Weight", value: "2.34 ct" },
                  { label: "Color Grade", value: "Pigeon Blood Red" },
                  { label: "Origin", value: "Mogok, Myanmar" },
                  { label: "Verdict", value: "AUTHENTIC", special: true },
                  { label: "Confidence", value: "97%" },
                  { label: "Verified", value: "Jun 15, 2026" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center text-sm">
                    <span className="text-[#94a3b8]">{row.label}</span>
                    <span
                      className={
                        row.special
                          ? "text-[#22c55e] font-bold font-certificate tracking-wider"
                          : "text-[#f8fafc] font-medium font-certificate"
                      }
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-[#334155] flex items-center justify-between">
                <div className="text-[#94a3b8] text-xs">Cert ID: GMR-2026-00142</div>
                <div className="flex items-center gap-1 text-[#f59e0b] text-xs">
                  <Lock className="w-3 h-3" />
                  <span>Verified by GEMRITE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      {showPricing && (
        <section id="pricing" className="py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f8fafc] mb-3">
                Simple, Transparent Pricing
              </h2>
              <p className="text-[#94a3b8] text-base max-w-xl mx-auto">
                Pay only when you need it, or go unlimited on the Pro Plan.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Pay-as-you-go */}
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-7">
                <h3 className="font-display text-xl font-bold text-[#f8fafc] mb-1">
                  {pricingPaygLabel}
                </h3>
                <p className="text-[#94a3b8] text-sm mb-6">No commitment needed.</p>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-[#f8fafc]">
                    {pricingPaygPrice}
                  </span>
                  <span className="text-[#94a3b8] text-sm ml-1">per verification</span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {[
                    "1 stone verification",
                    "AI authenticity analysis",
                    "Fraud detection report",
                    "Confidence score",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#94a3b8]">
                      <CheckCircle className="w-4 h-4 text-[#334155] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2.5 text-sm text-[#334155] line-through">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>PDF certificate of authenticity</span>
                  </li>
                </ul>
                <Link
                  to="/auth/register"
                  className="block text-center border border-[#334155] hover:border-[#f59e0b]/50 text-[#f8fafc] font-semibold py-3 rounded-lg text-sm transition-colors"
                >
                  Get Started
                </Link>
              </div>
              {/* Pro Plan */}
              <div className="relative bg-[#1e293b] border border-[#f59e0b] rounded-xl p-7 gold-glow-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#f59e0b] text-[#0f172a] text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#f8fafc] mb-1">
                  {pricingProLabel}
                </h3>
                <p className="text-[#94a3b8] text-sm mb-6">For professionals and collectors.</p>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-[#f59e0b]">
                    {pricingProPrice.split("/")[0]}
                  </span>
                  <span className="text-[#94a3b8] text-sm ml-1">/month</span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {[
                    "Unlimited verifications",
                    "AI authenticity analysis",
                    "Fraud detection report",
                    "Confidence score",
                    "PDF certificate of authenticity",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#94a3b8]">
                      <CheckCircle className="w-4 h-4 text-[#f59e0b] mt-0.5 shrink-0" />
                      <span className={item === "PDF certificate of authenticity" ? "text-[#f8fafc] font-medium" : ""}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/auth/register"
                  className="block text-center bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold py-3 rounded-lg text-sm transition-colors"
                >
                  Start Pro Plan
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 bg-[#1e293b]/50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-7 h-7 text-[#f59e0b]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f8fafc] mb-4">
            Don't Buy Blind
          </h2>
          <p className="text-[#94a3b8] text-base leading-relaxed mb-8">
            Every unverified stone is a risk. GEMRITE gives buyers and sellers a shared source of truth — certified, instant, and built for the exact moment that matters.
          </p>
          <Link
            to="/auth/register"
            className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold px-8 py-4 rounded-lg text-base transition-colors"
          >
            {heroCTA}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#334155] py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gem className="w-4 h-4 text-[#f59e0b]" />
            <span className="font-display text-lg font-bold text-[#f8fafc]">{appName}</span>
          </div>
          <p className="text-[#94a3b8] text-xs">{footerText}</p>
          <div className="flex items-center gap-4 text-[#94a3b8] text-xs">
            <Link to="/auth/login" className="hover:text-[#f8fafc] transition-colors">
              Sign in
            </Link>
            <Link to="/auth/register" className="hover:text-[#f8fafc] transition-colors">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
