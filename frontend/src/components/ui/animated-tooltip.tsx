"use client";

import React from "react";
import Image from "next/image";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    image: string;
  }[];
}) => {
  return (
    <>
      {items.map((item) => (
        <div
          className="group relative -mr-4"
          key={item.id}
          data-testid="team-avatar"
        >
          <Image
            height={100}
            width={100}
            src={item.image}
            alt="Team member"
            className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-110 group-hover:border-[#bb8922] group-hover:shadow-[0_0_18px_-2px_rgba(187,137,34,0.55)]"
          />
        </div>
      ))}
    </>
  );
};
