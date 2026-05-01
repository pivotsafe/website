import { BadgeCheck } from "lucide-react";
import { PageTitle } from "@/components/custom/pageTitle";
import BrandLogo from "@/components/custom/brandLogo";

export default function adversary_simulation() {
  return (
    <div className="relative container-fluid mx-auto overflow-hidden bg-[#101010] border-l  ">
      <div className="container mx-auto border-white/[0.1] border-r border-white/[0.1] border-l">
        <div className="flex flex-col items-center gap-2 mb-2  px-4 border-b border-white/[0.1]">          <div className="logo w-[100%] my-10 flex items-center">
            <BrandLogo size="lg" />
          </div>
        </div>
        {/* breadcrumb */}
        <div className="flex flex-col items-center gap-2 mb-20  px-4 border-b border-white/[0.1]">
          <div className="logo w-[100%] my-1 flex items-center justify-between  ">
            <div className="text-[#ffffff50] text-sm mb-2">
              <a href="/" className="hover:text-white">
                Home
              </a>{" "}
              / <span className="text-white">Adversary Simulation</span>
            </div>
          </div>
        </div>

        <PageTitle
          title="Adversary Simulation"
          image="https://www.truesec.com/wp-content/uploads/2023/12/truesec-penetration-testing-red-team-incident-response-ttp.jpg"
        />
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Red Team Operations
              </h2>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                A red team operation at PivotSafe goes beyond traditional
                security testing. It evaluates your organization as a
                whole—examining not just technology, but also the people and
                processes that support it. By simulating the real-world tactics,
                techniques, and procedures (TTPs) of advanced threat actors, our
                red team operations measure your true resilience under pressure.
              </p>
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto mt-10">
                These simulations allow your detection and response teams to
                validate their playbooks, identify blind spots, and gain
                invaluable experience handling targeted, multi-phase
                intrusions—without the real-world consequences.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Why PivotSafe?
              </h2>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                PivotSafe’s red team is composed of elite consultants with
                extensive experience across both offensive and defensive
                operations. We deliver high-fidelity cyber-attack simulations on
                systems that support critical business and operational
                functions—providing you with insights that go far beyond
                traditional penetration testing.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                What We Offer
              </h2>
            </div>
            <div className="flex flex-col gap-0 pb-20">
              <ul className="space-y-3 max-w-[800px] mx-auto text-center">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Intelligence-led red team operations aligned with Mitre
                    Att&ck framework.
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Kill-chain-aligned, end-to-end red team engagements
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Objective-driven assumed breach assessments
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Physical red teaming and social engineering simulations
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Evaluation of defensive controls (EDR/EPP, DLP, application
                    allow-listing, and more)
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
