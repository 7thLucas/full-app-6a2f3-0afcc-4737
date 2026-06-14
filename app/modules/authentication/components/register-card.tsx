import { Form, Link, useActionData, useNavigation } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

interface ActionData {
  error?: string;
}

export function RegisterCard() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#f8fafc] mb-1">Create account</h2>
      <p className="text-[#94a3b8] text-sm mb-6">Fill in the details below to get started.</p>

      <Form method="post">
        <div className="space-y-4">
          {actionData?.error && (
            <div className="rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/30 px-4 py-3 text-sm text-[#ef4444]">
              {actionData.error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="username" className="text-[#f8fafc] text-sm">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="johndoe"
              required
              autoComplete="username"
              className="bg-[#0f172a] border-[#334155] text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#f59e0b]"
            />
          </div>

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
            <Label htmlFor="password" className="text-[#f8fafc] text-sm">Password</Label>
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

          <Button
            type="submit"
            className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f172a] font-bold mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
