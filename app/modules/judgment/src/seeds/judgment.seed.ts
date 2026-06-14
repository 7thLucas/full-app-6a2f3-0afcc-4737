import { createLogger } from "~/lib/logger";
import { JudgmentConfigModel } from "../models/config.model";
import { normalizeGeneratedConfigPayload, validateConfigPayload } from "../lib/judgment.utils";

const logger = createLogger("JudgmentSeed");

type SeedConfig = Record<string, any>;

const SEED_CONFIGS: SeedConfig[] = [
  {
    pluginId: "precious_stone_authentication",
    name: "Precious Stone Authentication",
    rules: `You are an expert gemologist and fraud detection specialist. Analyze the submitted information about a precious stone to determine its authenticity.

Review all provided details: stone type, carat weight, color description, clarity notes, origin claim, seller information, and any uploaded photos or certificates.

Your task:
1. Assess whether the stone description is consistent with genuine precious stones of that type.
2. Flag any red flags: inconsistent color-weight ratios, improbable origin claims, missing provenance, suspicious pricing, or mismatched grading.
3. Detect signs of synthetic stones, treated stones, or outright counterfeits.
4. Assign a confidence score and verdict based on the totality of evidence.
5. If the stone appears authentic, provide a pass verdict with supporting reasoning.
6. If fraud or counterfeiting is suspected, provide a fail verdict with specific red flags noted.

Be precise, authoritative, and concise. Your analysis will be shown to the buyer at the point of sale.`,
    inputSchema: {
      type: "object",
      properties: {
        stoneType: {
          type: "string",
          title: "Stone Type",
          description:
            "Type of precious stone (e.g. Diamond, Ruby, Emerald, Sapphire, Pearl, etc.)",
        },
        caratWeight: {
          type: "string",
          title: "Carat Weight",
          description: "Weight of the stone in carats (e.g. 1.5ct)",
        },
        colorDescription: {
          type: "string",
          title: "Color Description",
          description: "Color and saturation of the stone (e.g. D-color, Vivid Blue, Pigeon Blood Red)",
        },
        clarityGrade: {
          type: "string",
          title: "Clarity Grade",
          description:
            "Clarity grade if known (e.g. VVS1, VS2, Flawless, Eye-clean)",
        },
        originClaim: {
          type: "string",
          title: "Claimed Origin",
          description:
            "Where is the stone claimed to originate from? (e.g. Kashmir, Mogok Myanmar, Colombia)",
        },
        sellerInfo: {
          type: "string",
          title: "Seller Information",
          description:
            "Name, location, or context about the seller",
        },
        askingPrice: {
          type: "string",
          title: "Asking Price",
          description: "The price being asked for the stone (e.g. $5,000 USD)",
        },
        additionalNotes: {
          type: "string",
          title: "Additional Notes",
          description:
            "Any other observations, treatments disclosed, or context",
        },
        stonePhoto: {
          type: "string",
          title: "Stone Photo",
          description: "Upload a clear photo of the stone (JPG or PNG)",
          "x-ui": { widget: "file" },
        },
        existingCertificate: {
          type: "string",
          title: "Existing Certificate (optional)",
          description:
            "Upload any existing grading certificate (PDF or image). Helps verify origin claims.",
          "x-ui": { widget: "file" },
        },
      },
      required: ["stoneType", "caratWeight", "colorDescription", "sellerInfo"],
    },
    outputSchema: {
      type: "object",
      properties: {
        id: { type: "string" },
        evidenceSubmissionId: { type: "string" },
        criterionId: { type: "string" },
        verdict: {
          type: "string",
          enum: ["pass", "partial", "fail", "risk", "ready", "not_ready"],
        },
        score: { type: "number", minimum: 0, maximum: 100 },
        confidence: { type: "number", minimum: 0, maximum: 1 },
        severity: {
          type: "string",
          enum: ["low", "medium", "high", "critical"],
        },
        reason: { type: "string" },
        fixSuggestion: { type: "string" },
        requiresHumanReview: { type: "boolean" },
        provider: { type: "string" },
        model: { type: "string" },
        resultData: {
          type: "object",
          properties: {
            authenticityStatus: {
              type: "string",
              enum: ["Authentic", "Suspicious", "Counterfeit"],
            },
            redFlags: { type: "array", items: { type: "string" } },
            authenticityIndicators: {
              type: "array",
              items: { type: "string" },
            },
            recommendedAction: { type: "string" },
          },
        },
      },
      required: [
        "id",
        "evidenceSubmissionId",
        "criterionId",
        "verdict",
        "score",
        "confidence",
        "severity",
        "reason",
        "fixSuggestion",
        "requiresHumanReview",
      ],
    },
    criteria: [
      {
        id: "criterion_stone_consistency",
        category: "Authenticity",
        name: "Stone Description Consistency",
        passCriteria:
          "The carat weight, color, clarity, and type are physically consistent with genuine precious stones of that variety.",
        severity: "critical",
        weight: 35,
        autoFailIfMissing: true,
      },
      {
        id: "criterion_origin_plausibility",
        category: "Provenance",
        name: "Origin Claim Plausibility",
        passCriteria:
          "The claimed origin is geologically plausible for the stone type. Known fraud origins or impossible combinations are flagged.",
        severity: "high",
        weight: 25,
        autoFailIfMissing: false,
      },
      {
        id: "criterion_pricing_reasonableness",
        category: "Market Integrity",
        name: "Pricing Reasonableness",
        passCriteria:
          "The asking price is within a reasonable range for a stone of the described quality and size. Extreme under-pricing may indicate fraud.",
        severity: "medium",
        weight: 20,
        autoFailIfMissing: false,
      },
      {
        id: "criterion_fraud_signals",
        category: "Fraud Detection",
        name: "Fraud Signal Check",
        passCriteria:
          "No common fraud patterns detected: no synthetic stone misrepresentation, no known treatment concealment, no mismatched grading.",
        severity: "critical",
        weight: 20,
        autoFailIfMissing: false,
      },
    ],
    variables: {
      labels: {
        unitLabel: "Verification",
        workerLabel: "Submitter",
        managerLabel: "Expert Reviewer",
      },
      actions: {
        defaultTaskDueHours: 24,
      },
      dashboard: {
        title: "Stone Verification Dashboard",
        company: "GEMRITE",
      },
    },
  },
];

export async function seedJudgmentConfigs() {
  let seededCount = 0;

  for (const config of SEED_CONFIGS) {
    const normalized = normalizeGeneratedConfigPayload(config);
    validateConfigPayload(normalized);

    await JudgmentConfigModel.findOneAndUpdate(
      { pluginId: normalized.pluginId },
      { $set: normalized },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    seededCount += 1;
    logger.info("Seeded judgment config", { pluginId: normalized.pluginId });
  }

  logger.info("Judgment config seeding completed", { seededCount });
}

export default seedJudgmentConfigs;
