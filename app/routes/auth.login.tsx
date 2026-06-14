import { redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import {
  getUserFromRequest,
  signJwt,
  buildAuthCookie,
} from "~/modules/authentication/authentication.server";
import { AuthService } from "~/modules/authentication/authentication.service";
import { LoginCard } from "~/modules/authentication";

export async function loader({ request }: LoaderFunctionArgs) {
  if (getUserFromRequest(request)) return redirect("/dashboard");
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  try {
    const user = await AuthService.login({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
    const token = signJwt({
      sub: user.id,
      role: user.role,
      username: user.username,
      email: user.email,
      email_verified: true,
    });
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": buildAuthCookie(token, new URL(request.url).hostname),
      },
    });
  } catch (error: any) {
    return { error: error.message ?? "Invalid credentials" };
  }
}

export default function LoginRoute() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-[#f59e0b] mb-2">GEMRITE</h1>
          <p className="text-[#94a3b8] text-sm">Precious Stone Authentication</p>
        </div>
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
          <LoginCard />
          <div className="mt-4 text-center">
            <p className="text-[#94a3b8] text-sm">
              Don't have an account?{" "}
              <a href="/auth/register" className="text-[#f59e0b] hover:text-[#d97706] font-medium">
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
