"use client";

import { PageTitle } from "@/components/custom/pageTitle";
import React from "react";

const Blogs = () => {
  return (
    <div className="relative container-fluid mx-auto overflow-hidden bg-[#101010] border-l">
      <div className="container mx-auto border-white/[0.1] border-r border-white/[0.1] border-l">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-2 px-4 border-b border-white/[0.1]">
          <div className="logo w-[100%] my-10 flex items-center justify-between">
            <h1 className="text-[24px] text-white">Pivot Safe</h1>
            <div className="text-white">⎑</div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex flex-col items-center gap-2 mb-20 px-4 border-b border-white/[0.1]">
          <div className="logo w-[100%] my-1 flex items-center justify-between">
            <div className="text-[#ffffff50] text-sm mb-2">
              <a href="/" className="hover:text-white">
                Home
              </a>{" "}
              / <span className="text-white">Blogs</span>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <PageTitle
          title="Blogs"
          image="https://www.truesec.com/wp-content/uploads/2023/12/truesec-cybersecurity-experts-cybersecurity-partner-datacenter.jpg"
        />

        {/* Empty / Coming Soon State */}
        <section className="mt-10 mb-20">
          <div
            className="flex flex-col items-center justify-center gap-4 py-20 mx-4 border border-white/[0.08] rounded-lg bg-white/[0.02]"
            data-testid="blogs-page-coming-soon"
          >
            <h3 className="text-white text-2xl font-semibold text-center">
              New blogs coming soon
            </h3>
            <p className="text-white/70 text-base font-light text-center max-w-[640px] mx-auto">
              Our team is preparing fresh insights on offensive security, red
              teaming, adversary simulation, and cutting-edge penetration
              testing. Check back shortly.
            </p>
            <a
              href="/"
              className="text-sky-500 hover:text-sky-400 text-sm font-semibold mt-4"
            >
              ← Back to Home
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blogs;
