"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconBook, IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { Captions, Cog } from "lucide-react";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "#about-us",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Services",
      link: "#services",
      icon: <Cog className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Training",
      link: "#training",
      icon: <Captions className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Blogs",
      link: "/blogs",
      icon: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
