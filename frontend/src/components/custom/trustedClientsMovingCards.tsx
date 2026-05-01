"use client";

import { InfiniteMovingClientCards } from "../ui/infinite-moving-client-cards";
import Image from "next/image";

export function TrustedClientsMovingCards() {
  return (
    <section className="container mx-auto h-auto" id="trusted-by">
      <div className="flex flex-col items-center gap-2 h-full">
        <div className="flex flex-col items-center">
          <Image
            src="/laurels.svg"
            alt="laurels"
            loading="lazy"
            width={40}
            height={40}
            className="object-contain opacity-90 [filter:brightness(0)_saturate(100%)_invert(79%)_sepia(88%)_saturate(4000%)_hue-rotate(330deg)_brightness(80%)_contrast(102%)] drop-shadow-[0_0_3px_rgba(255,165,0,0.3)] w-[40px] h-[40px]"
          />

          <h2 className="text-[#ffffff] text-[30px] font-bold text-left">
            Trusted by
          </h2>
        </div>
        <div
          className="h-[20rem] rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden w-full"
          data-testid="trusted-clients-marquee"
        >
          <InfiniteMovingClientCards
            items={clients}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}

interface ClientLogo {
  src: string;
  alt: string;
}

// Real PivotSafe client / partner logos. PNGs/JPEGs use `invert` to render
// cleanly on the site's dark background; SVGs render as-is.
const clients: ClientLogo[] = [
  { src: "/clients/nasa.svg", alt: "NASA" },
  { src: "/clients/comcast.png", alt: "Comcast" },
  { src: "/clients/crowdstrike.png", alt: "CrowdStrike" },
  { src: "/clients/deutsche-telekom.png", alt: "Deutsche Telekom Group" },
  { src: "/clients/ferrero.png", alt: "Ferrero" },
  { src: "/clients/koho.png", alt: "KOHO" },
  { src: "/clients/monash.png", alt: "Monash University" },
  { src: "/clients/outbrain.png", alt: "Outbrain" },
  { src: "/clients/sezzle.jpeg", alt: "Sezzle" },
  { src: "/clients/clickhouse.png", alt: "ClickHouse" },
  { src: "/clients/traffic-junky.png", alt: "TrafficJunky" },
];
