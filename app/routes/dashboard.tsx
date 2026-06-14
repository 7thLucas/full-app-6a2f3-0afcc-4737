import { Link } from "react-router";
import { useAuth } from "~/modules/authentication";
import { useConfigurables } from "~/modules/configurables";
import {
  Gem,
  Plus,
  History,
  ShieldCheck,
  LogOut,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface SubmissionSummary {
  _id: string;
  createdAt: string;
  inputData: {
    stoneType?: string;
    caratWeight?: string;
    colorDescription?: string;
  };
  result?: {
    verdict?: string;
    score?: number;
    confidence?: number;
    reason?: string;
  };
  status: string;
}

function VerdictBadge({ verdict }: { verdict?: string }) {
  if (!verdict) return null;
  const map: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    pass: {
      color: "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      label: "Authentic",
    },
    fail: {
      color: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/30",
      icon: <XCircle className="w-3.5 h-3.5" />,
      label: "Counterfeit",
    },
    risk: {
      color: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30",
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      label: "Risk Flagged",
    },
    partial: {
      color: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30",
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
      label: "Partial",
    },
  };
  const style = map[verdict] ?? {
    color: "text-[#94a3b8] bg-[#334155]/30 border-[#334155]",
    icon: <Clock className="w-3.5 h-3.5" />,
    label: verdict,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${style.color}`}
    >
      {style.icon}
      {style.label}
    </span>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { config, loading: configLoading } = useConfigurables();
  const [submissions, setSubmissions] = useState<SubmissionSummary[]>([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(true);

  const appName = configLoading ? "GEMRITE" : (config?.appName ?? "GEMRITE");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/auth/login";
    }
  }, [authLoading, isAuthenticated]);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const res = await fetch("/api/judgment/configs/precious_stone_authentication/dashboard");
        if (!res.ok) return;
        const data = await res.json();
        const raw = data?.submissions ?? [];
        setSubmissions(raw.slice(0, 10));
      } catch {
        // silently ignore
      } finally {
        setLoadingSubmissions(false);
      }
    }
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-[#94a3b8] text-sm">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

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
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#f8fafc]">
              Stone Verifications
            </h1>
            <p className="text-[#94a3b8] text-sm mt-1">
              Submit a stone for instant certified authentication.
            </p>
          </div>
          <Link
            to="/verify"
            className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold px-5 py-3 rounded-lg text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            Verify a Stone
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Verifications",
              value: submissions.length,
              icon: <History className="w-5 h-5 text-[#f59e0b]" />,
            },
            {
              label: "Authenticated",
              value: submissions.filter((s) => s.result?.verdict === "pass").length,
              icon: <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />,
            },
            {
              label: "Flagged",
              value: submissions.filter(
                (s) => s.result?.verdict === "fail" || s.result?.verdict === "risk"
              ).length,
              icon: <ShieldCheck className="w-5 h-5 text-[#ef4444]" />,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#1e293b] border border-[#334155] rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#94a3b8] text-sm">{stat.label}</span>
                {stat.icon}
              </div>
              <div className="font-display text-3xl font-bold text-[#f8fafc]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Submissions list */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#334155] flex items-center justify-between">
            <h2 className="font-semibold text-[#f8fafc] text-sm">Recent Verifications</h2>
          </div>
          {loadingSubmissions ? (
            <div className="px-5 py-10 text-center text-[#94a3b8] text-sm">
              Loading verifications...
            </div>
          ) : submissions.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <div className="w-12 h-12 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gem className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <p className="text-[#94a3b8] text-sm mb-4">No verifications yet.</p>
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold px-5 py-2.5 rounded-lg text-sm transition-colors"
              >
                Verify your first stone
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#334155]">
              {submissions.map((sub) => (
                <Link
                  key={sub._id}
                  to={`/verify/result/${sub._id}`}
                  className="flex items-center justify-between px-5 py-4 hover:bg-[#0f172a]/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-lg flex items-center justify-center shrink-0">
                      <Gem className="w-4 h-4 text-[#f59e0b]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[#f8fafc] truncate">
                        {sub.inputData?.stoneType ?? "Unknown Stone"}{" "}
                        {sub.inputData?.caratWeight && `— ${sub.inputData.caratWeight}`}
                      </div>
                      <div className="text-xs text-[#94a3b8] truncate">
                        {sub.inputData?.colorDescription &&
                          `${sub.inputData.colorDescription} · `}
                        {new Date(sub.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <VerdictBadge verdict={sub.result?.verdict} />
                    {sub.result?.score !== undefined && (
                      <span className="text-xs text-[#94a3b8] hidden sm:inline">
                        {sub.result.score}%
                      </span>
                    )}
                    <ArrowRight className="w-4 h-4 text-[#334155]" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
