import React from "react";
import { ServiceCard } from "./serviceCard";
import {
  Bot,
  Cloud,
  Factory,
  Key,
  LaptopMinimalCheck,
  Microchip,
  VenetianMask,
} from "lucide-react";

const ServiceCardGroup = () => {
  return (
    <section>
      <div className="container mx-auto" id="services">
        <div className="flex flex-col items-center gap-2 mb-20">
          <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
            Our Services
          </h2>
        </div>
        <div className="flex flex-row gap-0 flex-wrap justify-center">
          <ServiceCard
            title="Adversary Simulation"
            icon={<VenetianMask size={50} strokeWidth={0.8} color="#bb8922" />}
            description="Our best-in-class red team can deliver a holistic cyber attack simulation to provide a true evaluation of your organisation's cyber resilience."
            link="/adversary_simulation"
          />
          <ServiceCard
            title="Penetration Testing"
            icon={<Key size={50} strokeWidth={0.8} color="#bb8922" />}
            description="PivotSafe's penetration testing team is trusted by companies from world's leading technology firms to industrial leaders to secure their critical systems."
            link="/penetration_testing"
          />
          <ServiceCard
            title="Cloud Security"
            icon={<Cloud size={50} strokeWidth={0.8} color="#bb8922" />}
            description="We provide comprehensive cloud security assessments, including threat modeling, security architecture reviews, and cloud-native security controls evaluation."
            link="/cloud_security"
          />
          <ServiceCard
            title="Application Security"
            icon={
              <LaptopMinimalCheck size={50} strokeWidth={0.8} color="#bb8922" />
            }
            description="Our team delivers in-depth application security assessments, encompassing threat modeling, architecture audits, and assessments of cloud-native security measures."
            link="/software_security"
          />
          <ServiceCard
            title="ICS/Scada Security"
            icon={<Factory size={50} strokeWidth={0.8} color="#bb8922" />}
            description="Our experts provide comprehensive ICS/SCADA security assessments aligned with IEC 62443 and NIST SP 800-82, covering threat modeling, industrial architecture reviews, and assessment of implemented technical and procedural security controls."
            link="/ics_scada_security"
          />
          <ServiceCard
            title="Embedded & IOT Security"
            icon={<Microchip size={50} strokeWidth={0.8} color="#bb8922" />}
            description="We deliver standards-aligned embedded and IoT security assessments, combining threat modeling, secure architecture reviews, and validation of hardware, firmware, and ecosystem security controls."
            link="/embedded_iot_security"
          />
          <ServiceCard
            title="AI Red Teaming"
            icon={<Bot size={50} strokeWidth={0.8} color="#bb8922" />}
            description="Our MITRE ATLAS–aligned AI Red Teaming services help organizations identify and mitigate risks in agentic AI, chatbots, and RAG systems through adversarial testing and threat-informed security assessments."
            link="/ai_red_teaming"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceCardGroup;
