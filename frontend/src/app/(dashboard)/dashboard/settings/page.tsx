"use client";

import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, Trash2, User, CreditCard, ArrowRight } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function SettingsPage() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { plan } = usePlan();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#e8e8f0]">Settings</h1>
        <p className="mt-1 text-[#7777aa]">Manage your account and preferences.</p>
      </div>

      {/* Profile section */}
      <Section title="Profile">
        <div className="flex items-center gap-4">
          {user?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.imageUrl}
              alt="Avatar"
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(108,99,255,0.2)]">
              <User className="h-6 w-6 text-[#6c63ff]" />
            </div>
          )}
          <div>
            <p className="font-semibold text-[#e8e8f0]">
              {user?.fullName ?? user?.username ?? "—"}
            </p>
            <p className="text-sm text-[#7777aa]">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-[#7777aa]">
          Profile details are managed through your Clerk account. To update your name
          or avatar, click the user button in the sidebar.
        </p>
      </Section>

      {/* Plan section */}
      <Section title="Plan &amp; Billing">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-[#7777aa]" />
            <div>
              <p className="font-semibold capitalize text-[#e8e8f0]">{plan} Plan</p>
              <p className="text-sm text-[#7777aa]">
                {plan === "pro" ? "$9/month · All features unlocked" : "Free forever · 3 portfolios"}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/settings/billing"
            className="flex items-center gap-1.5 rounded-lg border border-[rgba(108,99,255,0.2)] px-3 py-2 text-sm text-[#7777aa] hover:border-[rgba(108,99,255,0.5)] hover:text-[#e8e8f0] transition-colors"
          >
            {plan === "pro" ? "Manage" : "Upgrade"}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Section>

      {/* Danger zone */}
      <Section title="Danger Zone">
        <div className="space-y-3">
          <DangerAction
            icon={<LogOut className="h-4 w-4" />}
            label="Sign out"
            description="Sign out of your account on this device."
            buttonLabel="Sign out"
            onClick={() => signOut({ redirectUrl: "/" })}
          />
          <DangerAction
            icon={<Trash2 className="h-4 w-4" />}
            label="Delete account"
            description="Permanently delete your account and all data. This cannot be undone."
            buttonLabel="Delete account"
            danger
            onClick={() => alert("Please contact support to delete your account.")}
          />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[rgba(108,99,255,0.15)] bg-[#13131e] p-5 space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7777aa]">{title}</h2>
      {children}
    </div>
  );
}

function DangerAction({
  icon,
  label,
  description,
  buttonLabel,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-[rgba(108,99,255,0.1)] bg-[#0d0d14] p-4">
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 ${danger ? "text-red-400" : "text-[#7777aa]"}`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-[#e8e8f0]">{label}</p>
          <p className="text-xs text-[#7777aa]">{description}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className={`flex-shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
          danger
            ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
            : "border-[rgba(108,99,255,0.2)] text-[#7777aa] hover:text-[#e8e8f0]"
        }`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
