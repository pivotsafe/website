"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export function Training() {
  const router = useRouter();
  return (
    <section className="mt-40 pb-10" id="training">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-2 mb-20">
          <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
            Training
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
          <div
            className="contents"
            onClick={() => router.push("/real-world-skills")}
          >
            <WobbleCard
              containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px] border border-white/[0.1] bg-transparent"
              className=""
            >
              <div className="max-w-xs">
                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                  Real-World Skills. Delivered by Real-World Operators.
                </h2>
                <p className="mt-4 text-left  text-base/6 text-neutral-200">
                  Whether you&apos;re building an internal red team, upskilling
                  a security function, or preparing engineers to handle advanced
                  threats, PivotSafe&apos;s expert-led training programs equip
                  teams with practical, immediately applicable knowledge across
                  the full spectrum of offensive and assessment disciplines.
                  <br />
                  Our courses are developed and delivered by the same
                  consultants who perform high-stakes engagements across
                  critical infrastructure, cloud-native environments, enterprise
                  software, and embedded systems.
                </p>
              </div>
              <div className="mt-10">
                <a
                  className="text-sm font-semibold whitespace-nowrap text-sky-500 hover:text-sky-600 flex items-center gap-2"
                  href="/real-world-skills"
                >
                  Read More{" "}
                  <span aria-hidden="true">
                    {" "}
                    <ArrowRightIcon size={16} />{" "}
                  </span>
                </a>
              </div>
              <Image
                src="https://www.truesec.com/wp-content/uploads/2023/12/truesec-penetration-testing-red-team-incident-response-ttp.jpg"
                width={500}
                height={500}
                alt="linear demo image"
                className="absolute -right-4 lg:-right-[20%]  filter -bottom-10 object-contain rounded"
              />
            </WobbleCard>
          </div>
          <div
            className="contents"
            onClick={() => router.push("/adversary-simulation-red-team-ops")}
          >
            <WobbleCard containerClassName="col-span-1 min-h-[300px] border border-white/[0.1] bg-transparent">
              <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Adversary Simulation & Red Team Ops.
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                PivotSafe&apos;s Adversary Simulation & Red Team Operations
                training equips security professionals with the skills to
                emulate real-world threat actors and execute full-scope,
                intelligence-led red team engagements. Designed by practitioners
                with hands-on experience in advanced offensive operations, this
                course delivers tactical and strategic insight into how modern
                adversaries operate—and how to test defenses against them.
              </p>
              <div className="mt-10">
                <a
                  className="text-sm font-semibold whitespace-nowrap text-sky-500 hover:text-sky-600 flex items-center gap-2"
                  href="/adversary-simulation-red-team-ops"
                >
                  Read More{" "}
                  <span aria-hidden="true">
                    {" "}
                    <ArrowRightIcon size={16} />{" "}
                  </span>
                </a>
              </div>
            </WobbleCard>
          </div>
        </div>
      </div>
    </section>
  );
}
