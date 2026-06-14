import { Form, Link, useActionData, useLoaderData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

interface LoaderData {
  token: string;
}

interface ActionData {
  error?: string;
}

export function ResetPasswordCard() {
  const { token } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#f8fafc] mb-1">Reset password</h2>
      <p className="text-[#94a3b8] text-sm mb-6">Enter your new password below.</p>

      <Form method="post">
        <input type="hidden" name="token" value={token} />

        <div className="space-y-4">
          {actionData?.error && (
            <div className="rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 px-4 py-3 text-sm text-[#ef4444]">
              {actionData.error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-[#f8fafc] text-sm">New password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              minLength={8}
              placeholder="Min. 8 characters"
              className="bg-[#0f172a] border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#f59e0b]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-[#f8fafc] text-sm">Confirm new password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              minLength={8}
              className="bg-[#0f172a] border-[#334155] text-[#f8fafc] focus:border-[#f59e0b]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset password"}
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
