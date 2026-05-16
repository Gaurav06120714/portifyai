"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Upload,
  FolderOpen,
  Palette,
  Settings,
  Zap,
  PenLine,
  CreditCard,
} from "lucide-react";
import { usePlan } from "@/context/PlanContext";

const NAV_TOP = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/build-resume", label: "AI Resume Builder", icon: PenLine },
  { href: "/dashboard/upload", label: "Upload Resume", icon: Upload },
  { href: "/dashboard/portfolios", label: "My Portfolios", icon: FolderOpen },
  { href: "/dashboard/templates", label: "Templates", icon: Palette },
];

const NAV_BOTTOM = [
  { href: "/dashboard/settings/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { plan } = usePlan();

  const navLink = (href: string, label: string, Icon: React.ElementType) => {
    const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
    return (
      <Link
        key={href}
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          active
            ? "bg-[rgba(108,99,255,0.15)] text-[#8b84ff]"
            : "text-[#7777aa] hover:bg-[rgba(108,99,255,0.08)] hover:text-[#e8e8f0]"
        }`}
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        {label}
      </Link>
    );
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[rgba(108,99,255,0.15)] bg-[#0d0d14]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-[rgba(108,99,255,0.15)]">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6c63ff]">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold text-[#e8e8f0]">PortifyAI</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_TOP.map(({ href, label, icon: Icon }) => navLink(href, label, Icon))}

        <div className="my-2 h-px bg-[rgba(108,99,255,0.1)]" />

        {NAV_BOTTOM.map(({ href, label, icon: Icon }) => navLink(href, label, Icon))}

        {/* Pro badge / upgrade nudge */}
        {plan === "free" && (
          <Link
            href="/pricing"
            className="mt-2 flex items-center gap-2 rounded-lg border border-[rgba(108,99,255,0.25)] bg-[rgba(108,99,255,0.06)] px-3 py-2.5 text-xs font-semibold text-[#8b84ff] transition-colors hover:bg-[rgba(108,99,255,0.12)]"
          >
            <Zap className="h-3.5 w-3.5" />
            Upgrade to Pro — $9/mo
          </Link>
        )}
      </nav>

      {/* User */}
      <div className="border-t border-[rgba(108,99,255,0.15)] p-4">
        <div className="flex items-center gap-3">
          <UserButton />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[#e8e8f0]">
              {user?.firstName ?? user?.username ?? "User"}
            </p>
            <p className="truncate text-xs text-[#7777aa]">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
