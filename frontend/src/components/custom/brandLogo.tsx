"use client";

import Link from "next/link";
import React from "react";

interface BrandLogoProps {
  /** Visual size — controls icon + text scale together. */
  size?: "sm" | "md" | "lg";
  /** Wrap in a <Link href="/"> when true (default). Disable for pages where the
   *  brand should not navigate (rare). */
  asLink?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: { icon: "h-7 w-7 text-base", text: "text-base", gap: "gap-2" },
  md: { icon: "h-9 w-9 text-lg", text: "text-xl", gap: "gap-2.5" },
  lg: { icon: "h-11 w-11 text-2xl", text: "text-2xl", gap: "gap-3" },
} as const;

/**
 * PivotSafe brand lockup: glyph + wordmark, left-aligned.
 * Replaces the previous split layout where the `⎑` glyph drifted to the
 * far-right edge under `justify-between`.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = "md",
  asLink = true,
  className = "",
}) => {
  const s = SIZE_MAP[size];

  const inner = (
    <span
      className={`group inline-flex items-center ${s.gap} ${className}`}
      data-testid="brand-logo"
    >
      <span
        aria-hidden="true"
        className={`${s.icon} relative inline-flex items-center justify-center rounded-md border border-[#bb8922]/40 bg-gradient-to-br from-[#bb8922]/20 to-[#bb8922]/5 text-[#bb8922] font-bold leading-none transition-all duration-300 group-hover:border-[#bb8922]/80 group-hover:from-[#bb8922]/30 group-hover:to-[#bb8922]/10 group-hover:shadow-[0_0_18px_-4px_rgba(187,137,34,0.6)]`}
      >
        <span className="-translate-y-[1px]">⎑</span>
      </span>
      <span
        className={`${s.text} font-semibold tracking-tight text-white whitespace-nowrap`}
      >
        Pivot
        <span className="text-[#bb8922]">Safe</span>
      </span>
    </span>
  );

  if (!asLink) return inner;

  return (
    <Link
      href="/"
      aria-label="PivotSafe — back to home"
      data-testid="brand-logo-link"
      className="inline-flex"
    >
      {inner}
    </Link>
  );
};

export default BrandLogo;
