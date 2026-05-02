"use client";
import React from "react";

const RecentBlogs = () => {
  return (
    <section className="mt-10" id="recent-blogs">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-2 mb-20">
          <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
            Recent Blogs
          </h2>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-4 mb-20 py-16 border border-white/[0.08] rounded-lg bg-white/[0.02]"
          data-testid="blogs-coming-soon"
        >
          <p className="text-white/80 text-lg font-light text-center max-w-[600px] mx-auto">
            New blogs coming soon.
          </p>
          <p className="text-white/50 text-sm font-light text-center max-w-[600px] mx-auto">
            Our team is preparing fresh insights on offensive security, red
            teaming, and adversary simulation. Stay tuned.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
