"use client";

import { InfiniteMovingClientCards } from "../ui/infinite-moving-client-cards";
import Image from "next/image";
export function TrustedClientsMovingCards() {
  return (
    <section className="container mx-auto h-auto">
      <div className="flex flex-col items-center gap-2 h-full">
        <div className="flex flex-col items-center">
          <Image
            src="/laurels.svg"
            alt="client"
            loading="lazy"
            width={40}
            height={40}
            className="object-contain opacity-90 [filter:brightness(0)_saturate(100%)_invert(79%)_sepia(88%)_saturate(4000%)_hue-rotate(330deg)_brightness(80%)_contrast(102%)] drop-shadow-[0_0_3px_rgba(255,165,0,0.3)] w-[40px] h-[40px] "
          />

          <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
            Trusted by
          </h2>
        </div>
        <div className="h-[20rem] rounded-md flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
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

const clients = [
  "/clients/paddle-logo-vector-2022.svg",
  "/clients/notion-logo.svg",
  "/clients/marblism-logo.webp",
  "/clients/lede-logo.png",
  "/clients/zerotosaas-logo.png",
  "/clients/aidbase-logo.svg",
  "/clients/paddle-logo-vector-2022.svg",
  "/clients/notion-logo.svg",
  "/clients/marblism-logo.webp",
  "/clients/lede-logo.png",
  "/clients/zerotosaas-logo.png",
  "/clients/aidbase-logo.svg",
  "/clients/paddle-logo-vector-2022.svg",
];
