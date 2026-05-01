import { BadgeCheck } from "lucide-react";
import { PageTitle } from "@/components/custom/pageTitle";
import BrandLogo from "@/components/custom/brandLogo";

export default function embedded_iot_security() {
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
              / <span className="text-white">Embedded/IoT Security</span>
            </div>
          </div>
        </div>

        <PageTitle
          title="Embedded/IoT Security"
          image="https://www.truesec.com/wp-content/uploads/2023/12/truesec-cybersecurity-experts-cybersecurity-partner-datacenter.jpg"
        />
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                From Firmware to Cloud — Securing the Entire IoT Stack
              </h2>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                As embedded systems and IoT devices become deeply integrated
                into our daily lives and critical infrastructure, the attack
                surface grows rapidly. Security flaws in these environments can
                have far-reaching consequences—from data leakage and device
                takeover to full-scale supply chain compromise.
              </p>
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto mt-10">
                PivotSafe delivers in-depth security assessments for embedded
                devices and IoT ecosystems, helping manufacturers, integrators,
                and operators secure both hardware and software across the
                entire lifecycle.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Our Assessment Focus Includes:
              </h2>
            </div>
            <div className="flex flex-col gap-0 pb-20">
              <ul className="space-y-3 max-w-[800px] mx-auto text-center">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Firmware reverse engineering and vulnerability analysis
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Hardware interface and debug port testing (JTAG, UART, SPI,
                    etc.)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Secure boot and firmware integrity validation
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Wireless protocol analysis (BLE, Zigbee, LoRa, Wi-Fi, etc.)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    OTA update mechanisms and rollback protections
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Authentication, credential storage, and secrets handling
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Cloud and mobile app integrations
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Threat modeling of device-to-cloud communications and trust
                    boundaries
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
                Why PivotSafe?
              </h2>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                Our consultants combine expertise in hardware hacking, binary
                exploitation, and system-level security to uncover complex,
                low-level flaws. Whether you&apos;re building consumer IoT,
                industrial sensors, medical devices, or connected vehicles—we
                help ensure your devices are secure by design and resilient in
                the field.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
