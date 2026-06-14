import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "~/modules/authentication";
import { useConfigurables } from "~/modules/configurables";
import {
  Gem,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowLeft,
  ArrowRight,
  Award,
  Lock,
  Loader2,
  LogOut,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
} from "lucide-react";

interface SubmissionResult {
  _id: string;
  createdAt: string;
  status: "PENDING" | "DONE" | "ERROR";
  inputData: {
    stoneType?: string;
    caratWeight?: string;
    colorDescription?: string;
    clarityGrade?: string;
    originClaim?: string;
    sellerInfo?: string;
    askingPrice?: string;
    additionalNotes?: string;
  };
  result?: {
    verdict?: string;
    score?: number;
    confidence?: number;
    severity?: string;
    reason?: string;
    fixSuggestion?: string;
    requiresHumanReview?: boolean;
    resultData?: {
      authenticityStatus?: string;
      redFlags?: string[];
      authenticityIndicators?: string[];
      recommendedAction?: string;
    };
  };
  error?: string | null;
}

function VerdictDisplay({ verdict, score }: { verdict?: string; score?: number }) {
  if (!verdict) return null;

  const config: Record<
    string,
    {
      icon: React.ReactNode;
      label: string;
      sublabel: string;
      bg: string;
      border: string;
      text: string;
    }
  > = {
    pass: {
      icon: <ShieldCheck className="w-10 h-10 text-[#22c55e]" />,
      label: "AUTHENTIC",
      sublabel: "Verification Passed",
      bg: "bg-[#22c55e]/5",
      border: "border-[#22c55e]/30",
      text: "text-[#22c55e]",
    },
    fail: {
      icon: <ShieldX className="w-10 h-10 text-[#ef4444]" />,
      label: "COUNTERFEIT",
      sublabel: "Verification Failed",
      bg: "bg-[#ef4444]/5",
      border: "border-[#ef4444]/30",
      text: "text-[#ef4444]",
    },
    risk: {
      icon: <ShieldAlert className="w-10 h-10 text-[#f59e0b]" />,
      label: "RISK FLAGGED",
      sublabel: "Review Recommended",
      bg: "bg-[#f59e0b]/5",
      border: "border-[#f59e0b]/30",
      text: "text-[#f59e0b]",
    },
    partial: {
      icon: <ShieldAlert className="w-10 h-10 text-[#f59e0b]" />,
      label: "PARTIAL PASS",
      sublabel: "Some Checks Failed",
      bg: "bg-[#f59e0b]/5",
      border: "border-[#f59e0b]/30",
      text: "text-[#f59e0b]",
    },
  };

  const c = config[verdict] ?? {
    icon: <Clock className="w-10 h-10 text-[#94a3b8]" />,
    label: verdict.toUpperCase(),
    sublabel: "Pending",
    bg: "bg-[#334155]/20",
    border: "border-[#334155]",
    text: "text-[#94a3b8]",
  };

  return (
    <div className={`${c.bg} border ${c.border} rounded-xl p-6 text-center`}>
      <div className="flex justify-center mb-3">{c.icon}</div>
      <div className={`font-display text-3xl font-bold font-certificate tracking-widest ${c.text} mb-1`}>
        {c.label}
      </div>
      <div className="text-[#94a3b8] text-sm">{c.sublabel}</div>
      {score !== undefined && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="text-[#94a3b8] text-xs">Authenticity Score</div>
          <div className={`font-display text-xl font-bold ${c.text}`}>{score}%</div>
        </div>
      )}
    </div>
  );
}

export default function VerifyResultPage() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { config, loading: configLoading } = useConfigurables();
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(false);

  const appName = configLoading ? "GEMRITE" : (config?.appName ?? "GEMRITE");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/auth/login";
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    if (!submissionId || !isAuthenticated) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    async function fetchResult() {
      try {
        // We'll query the dashboard and find by ID
        const res = await fetch(
          `/api/judgment/configs/precious_stone_authentication/dashboard`
        );
        if (!res.ok) return;
        const data = await res.json();
        const found = (data.submissions ?? []).find(
          (s: any) => s._id === submissionId
        );
        if (found) {
          setSubmission(found);
          if (found.status === "DONE" || found.status === "ERROR") {
            if (interval) clearInterval(interval);
            setPolling(false);
          }
        }
      } catch {
        // silently ignore
      } finally {
        setLoading(false);
      }
    }

    fetchResult();

    // Poll every 3 seconds while pending
    setPolling(true);
    interval = setInterval(fetchResult, 3000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [submissionId, isAuthenticated]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#f59e0b] animate-spin mx-auto mb-3" />
          <p className="text-[#94a3b8] text-sm">Loading verification result...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const isPending = !submission || submission.status === "PENDING";

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Nav */}
      <nav className="border-b border-[#334155] bg-[#0f172a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gem className="w-5 h-5 text-[#f59e0b]" />
            <span className="font-display text-xl font-bold text-[#f8fafc]">{appName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#94a3b8] text-sm hidden sm:block">
              {user?.username ?? user?.email}
            </span>
            <form method="post" action="/auth/logout">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-[#94a3b8] hover:text-[#f8fafc] text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-[#94a3b8] hover:text-[#f8fafc] text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>
        </div>

        {isPending ? (
          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-10 text-center">
            <Loader2 className="w-10 h-10 text-[#f59e0b] animate-spin mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold text-[#f8fafc] mb-2">
              Analyzing Your Stone
            </h2>
            <p className="text-[#94a3b8] text-sm">
              Our gemology AI is evaluating the submission. This usually takes a few seconds.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Verdict card */}
            <VerdictDisplay
              verdict={submission?.result?.verdict}
              score={submission?.result?.score}
            />

            {/* Stone details */}
            {submission?.inputData && (
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
                <h3 className="font-semibold text-[#f8fafc] text-sm mb-4">Stone Details</h3>
                <div className="space-y-2.5">
                  {[
                    { label: "Stone Type", value: submission.inputData.stoneType },
                    { label: "Carat Weight", value: submission.inputData.caratWeight },
                    { label: "Color", value: submission.inputData.colorDescription },
                    { label: "Clarity", value: submission.inputData.clarityGrade },
                    { label: "Claimed Origin", value: submission.inputData.originClaim },
                    { label: "Asking Price", value: submission.inputData.askingPrice },
                    { label: "Seller", value: submission.inputData.sellerInfo },
                  ]
                    .filter((row) => row.value)
                    .map((row) => (
                      <div key={row.label} className="flex justify-between items-start gap-4 text-sm">
                        <span className="text-[#94a3b8] shrink-0">{row.label}</span>
                        <span className="text-[#f8fafc] font-medium text-right">{row.value}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Analysis */}
            {submission?.result?.reason && (
              <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
                <h3 className="font-semibold text-[#f8fafc] text-sm mb-3">Analysis</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{submission.result.reason}</p>
              </div>
            )}

            {/* Red flags */}
            {(submission?.result?.resultData?.redFlags?.length ?? 0) > 0 && (
              <div className="bg-[#ef4444]/5 border border-[#ef4444]/20 rounded-xl p-5">
                <h3 className="font-semibold text-[#ef4444] text-sm mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Fraud Flags Detected
                </h3>
                <ul className="space-y-1.5">
                  {submission!.result!.resultData!.redFlags!.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                      <span className="text-[#ef4444] mt-0.5">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Authenticity indicators */}
            {(submission?.result?.resultData?.authenticityIndicators?.length ?? 0) > 0 && (
              <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-xl p-5">
                <h3 className="font-semibold text-[#22c55e] text-sm mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Authenticity Indicators
                </h3>
                <ul className="space-y-1.5">
                  {submission!.result!.resultData!.authenticityIndicators!.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                      <span className="text-[#22c55e] mt-0.5">•</span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendation */}
            {submission?.result?.fixSuggestion && (
              <div className="bg-[#f59e0b]/5 border border-[#f59e0b]/20 rounded-xl p-5">
                <h3 className="font-semibold text-[#f59e0b] text-sm mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Recommendation
                </h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">
                  {submission.result.fixSuggestion}
                </p>
              </div>
            )}

            {/* Certificate preview (Pro) */}
            <div className="bg-[#0f172a] border border-[#f59e0b]/30 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/40 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-full flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm font-bold text-[#f8fafc] mb-1">
                    PDF Certificate of Authenticity
                  </h3>
                  <p className="text-[#94a3b8] text-xs mb-3">
                    Upgrade to Pro Plan to download a signed PDF certificate for this verification — shareable with buyers, sellers, and collectors.
                  </p>
                  <div className="flex items-center gap-2 text-[#94a3b8] text-xs">
                    <Lock className="w-3 h-3" />
                    <span>Pro Plan feature — $79/month unlimited verifications</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/#pricing"
                  className="inline-flex items-center gap-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  Upgrade to Pro
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-[#94a3b8] px-1">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>Verified by GEMRITE</span>
              </div>
              {submission?.createdAt && (
                <span>
                  {new Date(submission.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <Link
                to="/verify"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold px-4 py-3 rounded-lg text-sm transition-colors"
              >
                Verify Another Stone
              </Link>
              <Link
                to="/dashboard"
                className="flex-1 inline-flex items-center justify-center gap-2 border border-[#334155] hover:border-[#f59e0b]/40 text-[#f8fafc] px-4 py-3 rounded-lg text-sm transition-colors"
              >
                View All
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
