"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  ExternalLink, Trash2, Globe, Lock, RefreshCw, Upload, Loader2,
} from "lucide-react";
import { getPortfolios, deletePortfolio, publishPortfolio } from "@/lib/api";
import type { Portfolio } from "@/types";

const STATUS_COLORS: Record<Portfolio["status"], string> = {
  queued: "#7777aa",
  generating: "#f59e0b",
  published: "#22c55e",
  failed: "#ef4444",
};

export default function PortfoliosPage() {
  const { getToken } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolios = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const res = await getPortfolios(token);
      setPortfolios(res.items);
    } catch {
      toast.error("Failed to load portfolios.");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this portfolio? This cannot be undone.")) return;
    try {
      const token = await getToken();
      if (!token) return;
      await deletePortfolio(id, token);
      setPortfolios((prev) => prev.filter((p) => p.id !== id));
      toast.success("Portfolio deleted.");
    } catch {
      toast.error("Failed to delete portfolio.");
    }
  };

  const handleTogglePublish = async (portfolio: Portfolio) => {
    try {
      const token = await getToken();
      if (!token) return;
      const updated = await publishPortfolio(portfolio.id, token);
      setPortfolios((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      toast.success(updated.is_public ? "Portfolio published!" : "Portfolio unpublished.");
    } catch {
      toast.error("Failed to update portfolio.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#e8e8f0]">My Portfolios</h1>
          <p className="mt-1 text-[#7777aa]">{portfolios.length} portfolio{portfolios.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setLoading(true); fetchPortfolios(); }}
            className="flex items-center gap-1.5 rounded-lg border border-[rgba(108,99,255,0.2)] px-3 py-2 text-sm text-[#7777aa] hover:text-[#e8e8f0] transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </button>
          <Link
            href="/dashboard/upload"
            className="flex items-center gap-1.5 rounded-lg bg-[#6c63ff] px-3 py-2 text-sm font-semibold text-white hover:bg-[#5a53e0] transition-colors"
          >
            <Upload className="h-3.5 w-3.5" />
            New Portfolio
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#6c63ff]" />
        </div>
      ) : portfolios.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-[rgba(108,99,255,0.2)] bg-[#13131e] p-12 text-center">
          <p className="text-[#7777aa]">No portfolios yet. Upload a resume to get started.</p>
          <Link
            href="/dashboard/upload"
            className="flex items-center gap-2 rounded-lg bg-[#6c63ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5a53e0] transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload Resume
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {portfolios.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-xl border border-[rgba(108,99,255,0.15)] bg-[#13131e] p-4"
            >
              {/* Status dot */}
              <div
                className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ background: STATUS_COLORS[p.status] }}
                title={p.status}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-[#e8e8f0]">
                    {p.slug || p.id.slice(0, 8)}
                  </p>
                  <span className="rounded-full border border-[rgba(108,99,255,0.2)] px-2 py-0.5 text-xs capitalize text-[#7777aa]">
                    {p.template_id}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs capitalize"
                    style={{
                      background: `${STATUS_COLORS[p.status]}22`,
                      color: STATUS_COLORS[p.status],
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-[#7777aa]">
                  {p.views} views · {new Date(p.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                {p.status === "published" && p.html_url && (
                  <a
                    href={p.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-[#7777aa] hover:bg-[rgba(108,99,255,0.08)] hover:text-[#e8e8f0] transition-colors"
                    title="View portfolio"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <button
                  onClick={() => handleTogglePublish(p)}
                  disabled={p.status !== "published"}
                  className="rounded-lg p-2 text-[#7777aa] hover:bg-[rgba(108,99,255,0.08)] hover:text-[#e8e8f0] transition-colors disabled:opacity-40"
                  title={p.is_public ? "Make private" : "Make public"}
                >
                  {p.is_public ? (
                    <Globe className="h-4 w-4" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="rounded-lg p-2 text-[#7777aa] hover:bg-[rgba(255,77,77,0.08)] hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
