"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ShimmerButton } from "../magicui/shimmer-button";
import BrandLogo from "./brandLogo";
import SceneErrorBoundary from "./sceneErrorBoundary";

// 3D hero scene from the original repo (three.js + drei + rapier). Client-side
// only, lazy-loaded so the rest of the hero paints immediately. Wrapped in a
// SceneErrorBoundary so any WebGL runtime hiccup falls back to a gold gradient
// rather than crashing the page.
const OtherShapeThree = dynamic(() => import("./otherShapeThree"), {
  ssr: false,
  loading: () => <HeroCanvasPlaceholder />,
});

const HeroCanvasPlaceholder = () => (
  <div
    className="w-full h-full relative overflow-hidden"
    data-testid="hero-canvas-placeholder"
    aria-hidden="true"
  >
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(187,137,34,0.18),transparent_60%)] animate-pulse" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(187,137,34,0.08),transparent_40%)]" />
  </div>
);

const Hero = () => {
  const openContactPopup = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-contact-popup"));
    }
  };

  return (
    <>
      {/* Top-of-page brand row — flush left with consistent viewport padding */}
      <div className="w-full px-6 sm:px-10 lg:px-16 pt-8 pb-2 relative z-20">
        <BrandLogo size="lg" />
      </div>

      <section className="relative container mx-auto">
        <div className="relative h-[calc(85vh)]">
          <div className="w-[calc(100%-30px)] h-[calc(100vh-100px)] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="w-full h-full relative">
              <div
                className="w-[200%] h-full absolute top-[50%] left-[30%]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <SceneErrorBoundary>
                  <OtherShapeThree />
                </SceneErrorBoundary>
              </div>

              {/* Hero copy + CTA paint instantly on top of the canvas. */}
              <div
                className="absolute top-[50%] left-[50%] z-10 w-[700px]"
                style={{ transform: "translate(-20%, -50%)" }}
              >
                <h2 className="text-[#ffffff] text-[90px] font-bold text-left ">
                  Breaching Boundaries to Build Better Security
                </h2>
                <p className="text-[#ffffff]">
                  At PivotSafe, we believe security should protect progress—not
                  obstruct it.
                </p>
                <div className="flex items-center w-full">
                  <ShimmerButton
                    onClick={openContactPopup}
                    data-testid="book-consultation-btn"
                    className="shadow-2xl mt-5"
                  >
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                      Book a Free Consultation
                    </span>
                  </ShimmerButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
