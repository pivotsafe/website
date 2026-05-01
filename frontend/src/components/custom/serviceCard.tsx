import React from "react";
import { EvervaultCard, Icon } from "../ui/evervault-card";
// import router from "next/router";

export function ServiceCard({
  title,
  icon,
  description,
  className,
  link,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  className?: string;
  link?: string;
}) {
  return (
    <a href={link}>
      <div
        className={`border border-white/[0.1]  flex flex-col items-start max-w-sm mx-auto  relative h-[26rem] cursor-pointer ${className}`}
      >
        {/* <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" /> */}

        <EvervaultCard text={title} icon={icon} />

        <p className="text-white  mt-4 text-sm font-light px-4 ">
          {description}
        </p>
      </div>
    </a>
  );
}
