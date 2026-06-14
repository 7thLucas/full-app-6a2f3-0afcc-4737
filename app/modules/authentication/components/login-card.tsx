import { Form, Link, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

interface ActionData {
  error?: string;
}

export function LoginCard() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#f8fafc] mb-1">Sign in</h2>
      <p className="text-[#94a3b8] text-sm mb-6">Enter your email and password to access your account.</p>

      <Form method="post">
        <div className="space-y-4">
          {actionData?.error && (
            <div className="rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 px-4 py-3 text-sm text-[#ef4444]">
              {actionData.error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[#f8fafc] text-sm">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="bg-[#0f172a] border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#f59e0b]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[#f8fafc] text-sm">Password</Label>
              <Link
                to="/auth/forgot-password"
                className="text-xs text-[#f59e0b] hover:text-[#d97706] transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="bg-[#0f172a] border-[#334155] text-[#f8fafc] focus:border-[#f59e0b]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
