import { BadgeCheck } from "lucide-react";
import { PageTitle } from "@/components/custom/pageTitle";
import BrandLogo from "@/components/custom/brandLogo";

export default function penetration_testing() {
  return (

    <>

      <div className="w-full px-6 sm:px-10 lg:px-16 pt-8 pb-2 relative z-20">

        <BrandLogo size="lg" />

      </div>
    <div className="relative container-fluid mx-auto overflow-hidden bg-[#101010] border-l  ">
      <div className="container mx-auto border-white/[0.1] border-r border-white/[0.1] border-l">
        {/* breadcrumb */}
        <div className="flex flex-col items-center gap-2 mb-20  px-4 border-b border-white/[0.1]">
          <div className="logo w-[100%] my-1 flex items-center justify-between  ">
            <div className="text-[#ffffff50] text-sm mb-2">
              <a href="/" className="hover:text-white">
                Home
              </a>{" "}
              / <span className="text-white">Penetration Testing</span>
            </div>
          </div>
        </div>

        <PageTitle
          title="Penetration Testing"
          image="https://www.truesec.com/wp-content/uploads/2023/12/truesec-cybersecurity-experts-cybersecurity-partner-datacenter.jpg"
        />
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Infrastructure Security
              </h2>
              <p className="text-white text-[#ffffff80] text-center max-w-[800px] mx-auto ">
                More Than Just Vulnerabilities—We Assess in Context
              </p>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                At PivotSafe, we believe that assessing large, complex
                infrastructures requires more than just tools—it demands deep
                expertise, architectural insight, and real-world experience.
              </p>
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto mt-10">
                Automated assessments may identify isolated issues on a single
                host, but they often miss the broader picture. In contrast, our
                infrastructure assessments are delivered by seasoned consultants
                who understand how systems interconnect, how trust is delegated,
                and where critical assets truly reside.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                What Sets Us Apart
              </h2>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                Our assessments are{" "}
                <span className="font-bold text-[#ff4060]">
                  architecture-aware-placing
                </span>{" "}
                vulnerabilities in the context of key business workflows,
                operational assets, and the implicit trust relationships between
                systems. This enables us to focus on{" "}
                <span className="font-bold text-[#ff4060]">
                  what really matters,
                </span>{" "}
                helping you prioritize remediation efforts based on actual
                business risk—not just CVSS scores.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Assessment Focus Areas
              </h2>
            </div>
            <div className="flex flex-col gap-0 pb-20">
              <ul className="space-y-3 max-w-[800px] mx-auto text-center">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Secure build reviews for servers and workstations
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Network and segmentation architecture review
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Database and middleware security assessment
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Authentication, trust relationships, and privilege
                    boundaries
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Identification of systemic weaknesses and lateral movement
                    paths
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  </>
  );
}
