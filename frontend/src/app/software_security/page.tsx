import { BadgeCheck } from "lucide-react";
import { PageTitle } from "@/components/custom/pageTitle";
import BrandLogo from "@/components/custom/brandLogo";

export default function software_security() {
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
              / <span className="text-white">Application Security</span>
            </div>
          </div>
        </div>

        <PageTitle
          title="Application Security"
          image="https://www.truesec.com/wp-content/uploads/2023/12/truesec-cybersecurity-experts-cybersecurity-partner-datacenter.jpg"
        />
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Security from Code to Deployment
              </h2>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                Modern applications are complex, interconnected, and under
                constant threat. At PivotSafe, we take a holistic approach to
                software security—evaluating applications across their lifecycle
                to identify vulnerabilities in both code and design before they
                become exploitable risks.
              </p>
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto mt-10">
                Whether you&apos;re developing in-house software, deploying
                third-party solutions, or integrating APIs and services, our
                experts ensure security is built in—not bolted on.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Our Software Security Approach Covers
              </h2>
            </div>
            <div className="flex flex-col gap-0 pb-20">
              <ul className="space-y-3 max-w-[800px] mx-auto text-center">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Secure architecture & threat modelling
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Source code review (manual and tool-assisted)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Authentication, session management, and input validation
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Cryptographic design and implementation
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Dependency and supply chain risk
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    API security and inter-service communications
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Secure DevOps practices and pipeline hardening
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Business logic abuse and misuse scenarios
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Beyond Vulnerability Scanning
              </h2>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                Automated tools alone miss logic flaws, insecure design
                patterns, and misuse of trusted components. PivotSafe
                consultants apply a context-aware approach{" "}
                <span className="font-bold text-[#ff4060]">
                  — combining code-level expertise with adversary thinking —{" "}
                </span>
                to uncover deep and nuanced security issues.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                We Work With
              </h2>
            </div>
            <div className="flex flex-col gap-0 pb-20">
              <ul className="space-y-3 max-w-[800px] mx-auto text-center">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Web and mobile applications
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Cloud-native, microservice-based architectures
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Thick Client Software and IoT applications
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    CI/CD pipelines and software delivery infrastructure
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
