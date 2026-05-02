"use client";

import React from "react";

/**
 * Pure CSS/SVG hero visual — replaces the previous @react-three/fiber scene
 * that was crashing on click due to a 9.6.x reconciler bug (`gl.alpha` read
 * off a stale-null store). This version:
 *  - renders instantly (no 3D bundle, no shaders, no physics)
 *  - has zero click/state handlers so it can never crash on interaction
 *  - is ~400 LOC of declarative SVG + CSS animation — trivial to maintain
 */
const HeroVisual = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      data-testid="hero-visual"
      aria-hidden="true"
    >
      {/* Layered radial glows (slow pulse) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,rgba(187,137,34,0.22),transparent_70%)] animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_25%_55%,rgba(187,137,34,0.12),transparent_65%)]" />

      {/* Grain / noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/></filter><rect width='240' height='240' filter='url(%23n)' opacity='0.85'/></svg>\")",
        }}
      />

      {/* Concentric rotating rings */}
      <svg
        className="absolute left-[22%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] max-w-[70vw] max-h-[90vh]"
        viewBox="-320 -320 640 640"
        fill="none"
      >
        <defs>
          <linearGradient id="ring-gold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#bb8922" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#bb8922" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#bb8922" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ring-gold-2" x1="1" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#d29c2a" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#bb8922" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#bb8922" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer spinning dashed ring */}
        <g className="origin-center [animation:hero-spin-slow_34s_linear_infinite]">
          <circle
            r="300"
            stroke="url(#ring-gold)"
            strokeWidth="1"
            strokeDasharray="2 14"
            strokeLinecap="round"
          />
        </g>

        {/* Mid ring spinning the other way */}
        <g className="origin-center [animation:hero-spin-rev_22s_linear_infinite]">
          <circle
            r="230"
            stroke="url(#ring-gold-2)"
            strokeWidth="1.25"
            strokeDasharray="6 10"
          />
        </g>

        {/* Inner solid ring with subtle shimmer */}
        <circle
          r="170"
          stroke="#bb8922"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="1 5"
        />

        {/* Wireframe hexagon (primary "gem") — breathes subtly */}
        <g className="origin-center [animation:hero-breathe_5s_ease-in-out_infinite]">
          <polygon
            points="0,-130 112,-65 112,65 0,130 -112,65 -112,-65"
            stroke="#bb8922"
            strokeOpacity="0.85"
            strokeWidth="1.4"
            fill="rgba(187,137,34,0.04)"
          />
          {/* Inner triangulation */}
          <line x1="0" y1="-130" x2="0" y2="130" stroke="#bb8922" strokeOpacity="0.35" strokeWidth="0.75" />
          <line x1="-112" y1="-65" x2="112" y2="65" stroke="#bb8922" strokeOpacity="0.35" strokeWidth="0.75" />
          <line x1="112" y1="-65" x2="-112" y2="65" stroke="#bb8922" strokeOpacity="0.35" strokeWidth="0.75" />
          {/* Center node */}
          <circle r="4" fill="#bb8922" />
          <circle r="9" fill="none" stroke="#bb8922" strokeOpacity="0.5" strokeWidth="1" />
        </g>

        {/* Vertex nodes */}
        {[
          [0, -130],
          [112, -65],
          [112, 65],
          [0, 130],
          [-112, 65],
          [-112, -65],
        ].map(([x, y], i) => (
          <g
            key={`node-${i}`}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            className="[animation:hero-blink_3s_ease-in-out_infinite]"
          >
            <circle r="3" fill="#bb8922" />
            <circle r="6" fill="none" stroke="#bb8922" strokeOpacity="0.4" strokeWidth="0.75" />
          </g>
        ))}
      </svg>

      {/* Floating geometric accents (CSS transforms, no JS state) */}
      <div className="absolute left-[10%] top-[22%] w-10 h-10 border border-[#bb8922]/60 rounded-sm rotate-12 [animation:hero-float-a_7s_ease-in-out_infinite]" />
      <div className="absolute left-[48%] top-[12%] w-6 h-6 border border-[#bb8922]/50 rotate-45 [animation:hero-float-b_9s_ease-in-out_infinite]" />
      <div className="absolute left-[6%] top-[72%] w-14 h-14 border border-[#bb8922]/30 rounded-full [animation:hero-float-c_11s_ease-in-out_infinite]" />
      <div className="absolute left-[40%] top-[78%] w-4 h-4 bg-[#bb8922]/40 rotate-45 [animation:hero-float-a_8s_ease-in-out_infinite]" />
      <div className="absolute left-[36%] top-[32%] w-3 h-3 rounded-full bg-[#d29c2a]/80 shadow-[0_0_14px_4px_rgba(210,156,42,0.6)] [animation:hero-blink_2.4s_ease-in-out_infinite]" />

      {/* Subtle scanline shimmer across the whole area */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(187,137,34,0.04)_50%,transparent_100%)] [animation:hero-scan_6s_linear_infinite]" />

      {/* Keyframes — inlined so the component is fully self-contained. */}
      <style jsx>{`
        @keyframes hero-spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hero-spin-rev {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes hero-breathe {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50%      { transform: scale(1.04); opacity: 1; }
        }
        @keyframes hero-blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
        @keyframes hero-float-a {
          0%, 100% { transform: translate(0, 0) rotate(12deg); }
          50%      { transform: translate(14px, -18px) rotate(20deg); }
        }
        @keyframes hero-float-b {
          0%, 100% { transform: translate(0, 0) rotate(45deg); }
          50%      { transform: translate(-18px, 14px) rotate(55deg); }
        }
        @keyframes hero-float-c {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(10px, -22px); }
        }
        @keyframes hero-scan {
          from { transform: translateY(-30%); opacity: 0; }
          50%  { opacity: 0.9; }
          to   { transform: translateY(30%);  opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default HeroVisual;
