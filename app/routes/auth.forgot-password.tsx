import { redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { AuthService } from "~/modules/authentication/authentication.service";
import { ForgotPasswordCard } from "~/modules/authentication";

export async function loader({ request }: LoaderFunctionArgs) {
  if (getUserFromRequest(request)) return redirect("/dashboard");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    await AuthService.forgotPassword(String(formData.get("email") ?? ""));
  } catch {}
  return {
    success: true,
    message: "If that email exists, a reset link has been sent. Check your inbox.",
  };
}

export default function ForgotPasswordRoute() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-[#f59e0b] mb-2">GEMRITE</h1>
          <p className="text-[#94a3b8] text-sm">Precious Stone Authentication</p>
        </div>
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
          <ForgotPasswordCard />
        </div>
      </div>
    </div>
  );
}
