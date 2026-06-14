import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "~/modules/authentication";
import { useConfigurables } from "~/modules/configurables";
import {
  Gem,
  Upload,
  X,
  ArrowLeft,
  ArrowRight,
  Loader2,
  LogOut,
  ImageIcon,
  FileText,
} from "lucide-react";

const CONFIG_ID = "precious_stone_authentication";

interface UploadResult {
  url: string;
  path: string;
  originalname: string;
}

async function uploadFile(file: File, type: "image" | "document"): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`/api/uploader/${type}`, { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  if (!data.success) throw new Error(data.error ?? "Upload failed");
  return data.data as UploadResult;
}

function FileUploadInput({
  label,
  description,
  accept,
  type,
  onChange,
  value,
}: {
  label: string;
  description: string;
  accept: string;
  type: "image" | "document";
  onChange: (url: string) => void;
  value: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const result = await uploadFile(file, type);
      onChange(result.url);
      setFilename(result.originalname);
    } catch (err: any) {
      setError(err.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function clear() {
    onChange("");
    setFilename(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[#f8fafc] mb-1">{label}</label>
      <p className="text-xs text-[#94a3b8] mb-2">{description}</p>
      {value ? (
        <div className="flex items-center gap-3 bg-[#0f172a] border border-[#22c55e]/40 rounded-lg px-3 py-2.5">
          {type === "image" ? (
            <ImageIcon className="w-4 h-4 text-[#22c55e] shrink-0" />
          ) : (
            <FileText className="w-4 h-4 text-[#22c55e] shrink-0" />
          )}
          <span className="text-[#f8fafc] text-sm truncate flex-1">{filename ?? "Uploaded"}</span>
          <button type="button" onClick={clear} className="text-[#94a3b8] hover:text-[#f8fafc]">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full flex flex-col items-center gap-2 bg-[#0f172a] border border-dashed border-[#334155] hover:border-[#f59e0b]/50 rounded-lg px-4 py-6 transition-colors disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-[#f59e0b] animate-spin" />
          ) : (
            <Upload className="w-6 h-6 text-[#94a3b8]" />
          )}
          <span className="text-sm text-[#94a3b8]">
            {uploading ? "Uploading..." : "Click to upload"}
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
      {error && <p className="text-xs text-[#ef4444] mt-1">{error}</p>}
    </div>
  );
}

export default function VerifyPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { config, loading: configLoading } = useConfigurables();
  const navigate = useNavigate();

  const appName = configLoading ? "GEMRITE" : (config?.appName ?? "GEMRITE");

  // Form state
  const [stoneType, setStoneType] = useState("");
  const [caratWeight, setCaratWeight] = useState("");
  const [colorDescription, setColorDescription] = useState("");
  const [clarityGrade, setClarityGrade] = useState("");
  const [originClaim, setOriginClaim] = useState("");
  const [sellerInfo, setSellerInfo] = useState("");
  const [askingPrice, setAskingPrice] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [stonePhotoUrl, setStonePhotoUrl] = useState("");
  const [certificateUrl, setCertificateUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/auth/login";
    }
  }, [authLoading, isAuthenticated]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#f59e0b] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const inputData: Record<string, string> = {};
      if (stoneType) inputData.stoneType = stoneType;
      if (caratWeight) inputData.caratWeight = caratWeight;
      if (colorDescription) inputData.colorDescription = colorDescription;
      if (clarityGrade) inputData.clarityGrade = clarityGrade;
      if (originClaim) inputData.originClaim = originClaim;
      if (sellerInfo) inputData.sellerInfo = sellerInfo;
      if (askingPrice) inputData.askingPrice = askingPrice;
      if (additionalNotes) inputData.additionalNotes = additionalNotes;
      if (stonePhotoUrl) inputData.stonePhoto = stonePhotoUrl;
      if (certificateUrl) inputData.existingCertificate = certificateUrl;

      const form = new FormData();
      form.append("inputData", JSON.stringify(inputData));

      const res = await fetch(`/api/judgment/configs/${CONFIG_ID}/submit`, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Submission failed");
      }

      const result = await res.json();
      const submissionId = result?.submission?._id ?? result?._id;
      if (submissionId) {
        navigate(`/verify/result/${submissionId}`);
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

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
            className="inline-flex items-center gap-1.5 text-[#94a3b8] hover:text-[#f8fafc] text-sm transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#f8fafc]">
            Verify a Stone
          </h1>
          <p className="text-[#94a3b8] text-sm mt-1">
            Provide details about the stone. Our AI will analyze and return a certified result in seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 space-y-6">
          {/* Stone Type & Carat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#f8fafc] mb-1.5">
                Stone Type <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="text"
                value={stoneType}
                onChange={(e) => setStoneType(e.target.value)}
                placeholder="e.g. Diamond, Ruby, Emerald"
                required
                className="w-full bg-[#0f172a] border border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#f8fafc] mb-1.5">
                Carat Weight <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="text"
                value={caratWeight}
                onChange={(e) => setCaratWeight(e.target.value)}
                placeholder="e.g. 1.5ct"
                required
                className="w-full bg-[#0f172a] border border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>
          </div>

          {/* Color & Clarity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#f8fafc] mb-1.5">
                Color Description <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="text"
                value={colorDescription}
                onChange={(e) => setColorDescription(e.target.value)}
                placeholder="e.g. D-color, Vivid Blue, Pigeon Blood"
                required
                className="w-full bg-[#0f172a] border border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#f8fafc] mb-1.5">
                Clarity Grade
              </label>
              <input
                type="text"
                value={clarityGrade}
                onChange={(e) => setClarityGrade(e.target.value)}
                placeholder="e.g. VVS1, VS2, Flawless"
                className="w-full bg-[#0f172a] border border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>
          </div>

          {/* Origin & Seller */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#f8fafc] mb-1.5">
                Claimed Origin
              </label>
              <input
                type="text"
                value={originClaim}
                onChange={(e) => setOriginClaim(e.target.value)}
                placeholder="e.g. Kashmir, Mogok Myanmar"
                className="w-full bg-[#0f172a] border border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#f8fafc] mb-1.5">
                Seller Information <span className="text-[#ef4444]">*</span>
              </label>
              <input
                type="text"
                value={sellerInfo}
                onChange={(e) => setSellerInfo(e.target.value)}
                placeholder="Name, location, or context"
                required
                className="w-full bg-[#0f172a] border border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
              />
            </div>
          </div>

          {/* Asking price */}
          <div>
            <label className="block text-sm font-medium text-[#f8fafc] mb-1.5">
              Asking Price
            </label>
            <input
              type="text"
              value={askingPrice}
              onChange={(e) => setAskingPrice(e.target.value)}
              placeholder="e.g. $5,000 USD"
              className="w-full bg-[#0f172a] border border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#f59e0b] transition-colors"
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-[#f8fafc] mb-1.5">
              Additional Notes
            </label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Treatments disclosed, prior certifications, purchase context..."
              rows={3}
              className="w-full bg-[#0f172a] border border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#f59e0b] transition-colors resize-none"
            />
          </div>

          {/* File uploads */}
          <div className="pt-2 border-t border-[#334155] space-y-5">
            <FileUploadInput
              label="Stone Photo"
              description="Upload a clear photo of the stone (JPG or PNG). Improves accuracy."
              accept="image/*"
              type="image"
              value={stonePhotoUrl}
              onChange={setStonePhotoUrl}
            />
            <FileUploadInput
              label="Existing Certificate (optional)"
              description="Upload any existing grading certificate (PDF or image) to include in analysis."
              accept=".pdf,image/*"
              type="document"
              value={certificateUrl}
              onChange={setCertificateUrl}
            />
          </div>

          {error && (
            <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-lg px-4 py-3 text-sm text-[#ef4444]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#f59e0b] hover:bg-[#d97706] disabled:opacity-60 text-[#0f172a] font-bold px-6 py-3.5 rounded-lg text-sm transition-colors"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing stone...
              </>
            ) : (
              <>
                Run Authentication
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
