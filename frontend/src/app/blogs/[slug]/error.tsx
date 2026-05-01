"use client";

import { useEffect } from "react";
import BrandLogo from "@/components/custom/brandLogo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="relative container-fluid mx-auto overflow-hidden bg-[#101010] border-l">
      <div className="container mx-auto border-white/[0.1] border-r border-white/[0.1] border-l">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-2 px-4 border-b border-white/[0.1]">          <div className="logo w-[100%] my-10 flex items-center">
            <BrandLogo size="lg" />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex flex-col items-center gap-2 mb-20 px-4 border-b border-white/[0.1]">
          <div className="logo w-[100%] my-1 flex items-center justify-between">
            <div className="text-[#ffffff50] text-sm mb-2">
              <a href="/" className="hover:text-white">
                Home
              </a>{" "}
              /{" "}
              <a href="/blogs" className="hover:text-white">
                Blogs
              </a>{" "}
              / <span className="text-white">Error</span>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Something went wrong!
          </h1>

          <p className="text-white/60 mb-8">
            We encountered an error while loading this blog post. Please try
            again.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>

            <a
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium rounded-lg transition-colors duration-300 border border-white/[0.1] hover:border-white/[0.2]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blogs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
