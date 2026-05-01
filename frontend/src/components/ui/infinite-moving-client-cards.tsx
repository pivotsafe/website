"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type ClientItem = string | { src: string; alt: string };

export const InfiniteMovingClientCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: ClientItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      if (containerRef.current) {
        containerRef.current.style.setProperty(
          "--animation-direction",
          direction === "left" ? "forwards" : "reverse"
        );
        const duration =
          speed === "fast" ? "30s" : speed === "normal" ? "60s" : "90s";
        containerRef.current.style.setProperty("--animation-duration", duration);
      }

      setStart(true);
    }
  }, [direction, speed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] w-full",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap items-center gap-12 py-8",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => {
          const src = typeof item === "string" ? item : item.src;
          const alt = typeof item === "string" ? "client" : item.alt;
          return (
            <li
              key={`${src}-${idx}`}
              className="relative shrink-0 flex items-center justify-center group"
              data-testid="client-logo-item"
            >
              <div
                className="relative bg-white rounded-lg px-6 py-4 h-20 w-[200px] flex items-center justify-center
                  ring-1 ring-black/5 shadow-md shadow-black/30
                  transition-all duration-500 ease-out
                  group-hover:-translate-y-1.5 group-hover:scale-[1.04]
                  group-hover:ring-2 group-hover:ring-[#bb8922]/70
                  group-hover:shadow-[0_10px_32px_-6px_rgba(187,137,34,0.6)]
                  cursor-pointer overflow-hidden"
              >
                {/* Sheen sweep on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full
                    bg-gradient-to-r from-transparent via-white/70 to-transparent
                    opacity-0 group-hover:opacity-100 group-hover:translate-x-full
                    transition-all duration-700 ease-out"
                />
                <Image
                  src={src}
                  alt={alt}
                  width={300}
                  height={96}
                  quality={100}
                  loading="lazy"
                  className="relative max-h-12 w-auto max-w-[170px] object-contain"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
