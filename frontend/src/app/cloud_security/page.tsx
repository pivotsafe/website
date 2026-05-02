import { BadgeCheck } from "lucide-react";
import { PageTitle } from "@/components/custom/pageTitle";
import BrandLogo from "@/components/custom/brandLogo";

export default function cloud_security() {
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
              / <span className="text-white">Cloud Security</span>
            </div>
          </div>
        </div>

        <PageTitle
          title="Cloud Security"
          image="https://www.truesec.com/wp-content/uploads/2023/12/truesec-cybersecurity-experts-cybersecurity-partner-datacenter.jpg"
        />
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Secure Your Cloud—from Configuration to Control
              </h2>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                In today’s digital landscape, cloud platforms do more than host
                services—they define how your systems are configured, managed,
                and secured. That’s why modern cloud security is less about the
                services you deploy, and more about how you leverage the cloud
                provider’s control plane to enforce governance, visibility, and
                protection.
              </p>
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto mt-10">
                At PivotSafe, we help organizations assess the real-world
                security posture of their cloud environments—ensuring that
                misconfigurations, excessive privileges, or insufficient
                monitoring don’t become hidden liabilities.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                What We Assess
              </h2>
              <p className="text-white text-[#ffffff80] text-center max-w-[800px] mx-auto ">
                Our cloud security reviews focus on both architectural and
                operational aspects of cloud deployments, including:
              </p>
            </div>
            <div className="flex flex-col gap-0 pb-20">
              <ul className="space-y-3 max-w-[800px] mx-auto text-center">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Environment segregation and multi-tenancy controls
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    User identities, roles, and RBAC policies
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Access permissions, object ACLs, and privilege boundaries
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Password policies and authentication enforcement
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Secure server builds and cloud-native system management
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Monitoring, auditing, and centralized logging pipelines
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Use of cloud-native security services (e.g., firewalls,
                    WAFs, intrusion detection, and threat protection)
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
                Cloud Hygiene Matters
              </h2>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                Misconfigurations in cloud environments are among the{" "}
                <span className="font-bold text-[#ff4060]">
                  most common root causes of data breaches.
                </span>{" "}
                We help your team ensure proper use of the provider’s native
                tools—whether it’s AWS IAM, Azure Policy, or GCP’s Cloud
                Armor—so your workloads remain secure, compliant, and
                well-governed.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </>
  );
}
