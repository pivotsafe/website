import { BadgeCheck } from "lucide-react";
import { PageTitle } from "@/components/custom/pageTitle";

export default function real_world_skills() {
  return (
    <div className="relative container-fluid mx-auto overflow-hidden bg-[#101010] border-l  ">
      <div className="container mx-auto border-white/[0.1] border-r border-white/[0.1] border-l">
        <div className="flex flex-col items-center gap-2 mb-2  px-4 border-b border-white/[0.1]">
          <div className="logo w-[100%] my-10 flex items-center justify-between ">
            <h1 className="text-[24px] text-white">Pivot Safe</h1>
            <div className="text-white">⎑</div>
          </div>
        </div>
        {/* breadcrumb */}
        <div className="flex flex-col items-center gap-2 mb-20  px-4 border-b border-white/[0.1]">
          <div className="logo w-[100%] my-1 flex items-center justify-between  ">
            <div className="text-[#ffffff50] text-sm mb-2">
              <a href="/" className="hover:text-white">
                Home
              </a>{" "}
              / <span className="text-white">Real World Skills</span>
            </div>
          </div>
        </div>

        <PageTitle
          title="Real-World Skills. Delivered by Real-World Operators"
          image="https://www.truesec.com/wp-content/uploads/2023/12/truesec-penetration-testing-red-team-incident-response-hacking-960x540.jpg"
        />
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                Whether you’re building an internal red team, upskilling a
                security function, or preparing engineers to handle advanced
                threats, PivotSafe’s expert-led training programs equip teams
                with practical, immediately applicable knowledge across the full
                spectrum of offensive and assessment disciplines.
              </p>
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto mt-10">
                Our courses are developed and delivered by the same consultants
                who perform high-stakes engagements across critical
                infrastructure, cloud-native environments, enterprise software,
                and embedded systems.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Available Training Modules
              </h2>
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto mt-10">
                Penetration Testing & Offensive Security
              </p>
            </div>
            <div className="flex flex-col gap-0 pb-20">
              <ul className="space-y-3 max-w-[800px] mx-auto text-center">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Network &amp; Infrastructure Penetration Testing
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Mobile Application Penetration Testing
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Web Application &amp; API Penetration Testing
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Active Directory Penetration Testing
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Embedded Devices Security Testing
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Practical Lab-based Scenarios
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
