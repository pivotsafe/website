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
              className="relative shrink-0 flex items-center justify-center"
              data-testid="client-logo-item"
            >
              <div className="bg-white/95 hover:bg-white transition-colors duration-300 rounded-md px-5 py-3 h-16 w-[170px] flex items-center justify-center shadow-sm">
                <Image
                  src={src}
                  alt={alt}
                  width={150}
                  height={48}
                  loading="lazy"
                  className="max-h-10 w-auto max-w-[140px] object-contain"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
