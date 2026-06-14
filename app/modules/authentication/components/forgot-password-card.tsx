import { Form, Link, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

interface ActionData {
  success?: boolean;
  message?: string;
  error?: string;
}

export function ForgotPasswordCard() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#f8fafc] mb-1">Forgot password</h2>
      <p className="text-[#94a3b8] text-sm mb-6">
        Enter your email and we'll send you a reset link if an account exists.
      </p>

      <Form method="post">
        <div className="space-y-4">
          {actionData?.success && actionData.message && (
            <div className="rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/30 px-4 py-3 text-sm text-[#22c55e]">
              {actionData.message}
            </div>
          )}
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

          <Button
            type="submit"
            className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
          <p className="text-center text-sm text-[#94a3b8]">
            Remember your password?{" "}
            <Link to="/auth/login" className="text-[#f59e0b] hover:text-[#d97706]">
              Sign in
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}
