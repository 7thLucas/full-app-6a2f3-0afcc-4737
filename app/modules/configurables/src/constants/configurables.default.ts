/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  primary: string;
  secondary: string;
  accent: string;
};

export type TFeature = {
  title: string;
  description: string;
  icon?: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  tagline?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroCTA?: string;
  brandColor: TBrandColor;
  pricingPaygPrice?: string;
  pricingProPrice?: string;
  pricingPaygLabel?: string;
  pricingProLabel?: string;
  features?: TFeature[];
  footerText?: string;
  showTestimonials?: boolean;
  showPricing?: boolean;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "GEMRITE",
  logoUrl: "FILL_LOGO_URL_HERE",
  tagline: "Authentic. Certified. Instant.",
  heroHeadline: "Know What You're Holding",
  heroSubheadline:
    "GEMRITE delivers certified authenticity verification for precious stones in seconds — at the exact moment of sale. No waiting days. No guessing.",
  heroCTA: "Verify a Stone",
  brandColor: {
    primary: "#0f172a",
    secondary: "#1e293b",
    accent: "#f59e0b",
  },
  pricingPaygPrice: "$9",
  pricingProPrice: "$79/month",
  pricingPaygLabel: "Pay-as-you-go",
  pricingProLabel: "Pro Plan",
  features: [
    {
      title: "Instant Results",
      description:
        "Receive a certified verification result in seconds — not days. Speed is the trust mechanism.",
      icon: "Zap",
    },
    {
      title: "Fraud Detection",
      description:
        "Built-in counterfeit detection trained on precious stones. Synthetics and treatments flagged automatically.",
      icon: "ShieldCheck",
    },
    {
      title: "PDF Certificate",
      description:
        "Pro Plan users receive a signed PDF certificate of authenticity for every verified stone.",
      icon: "FileText",
    },
    {
      title: "Point-of-Sale Ready",
      description:
        "Designed for verification at the exact moment of sale — whether you're a buyer, seller, or collector.",
      icon: "Award",
    },
  ],
  footerText: "© 2026 GEMRITE. All rights reserved.",
  showTestimonials: false,
  showPricing: true,
};
