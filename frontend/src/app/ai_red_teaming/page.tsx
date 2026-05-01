import { BadgeCheck } from "lucide-react";
import { PageTitle } from "@/components/custom/pageTitle";

export default function ai_red_teaming() {
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
              / <span className="text-white">AI Red Teaming</span>
            </div>
          </div>
        </div>

        <PageTitle
          title="AI Red Teaming"
          image="https://www.truesec.com/wp-content/uploads/2023/12/truesec-cybersecurity-experts-cybersecurity-partner-datacenter.jpg"
        />
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Secure the Future of AI with PivotSafe
              </h2>
            </div>
            <div className="flex flex-col gap-0 mb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                As organizations increasingly deploy AI-driven systems and large
                language models (LLMs) across business functions, the attack
                surface evolves. Traditional security assessments are no longer
                enough. PivotSafe provides specialized penetration testing for
                LLMs and AI applications, helping you identify vulnerabilities
                unique to generative models, APIs, and AI-integrated platforms.
              </p>
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto mt-10">
                Our offensive security team combines deep knowledge of machine
                learning systems with battle-tested red teaming
                expertise—delivering realistic simulations of adversarial
                threats targeting your AI stack.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Key Threats We Simulate
              </h2>
            </div>
            <div className="flex flex-col gap-0 pb-20">
              <ul className="space-y-3 max-w-[800px] mx-auto text-center">
                <li>
                  <p className="text-sm text-white flex items-center gap-2 font-bold text-[#20ffa0]">
                    <BadgeCheck className="w-6 h-6 text-white" /> Prompt
                    Injection & Jailbreak Attacks
                  </p>
                  <p className="text-sm text-white text-left pl-[30px]">
                    Bypass guardrails, escape sandboxed instructions, or execute
                    malicious prompts
                  </p>
                </li>
                <li>
                  <p className="text-sm text-white flex items-center gap-2 font-bold text-[#20ffa0]">
                    <BadgeCheck className="w-6 h-6 text-white" /> Data Leakage &
                    Training Data Exposure
                  </p>
                  <p className="text-sm text-white text-left pl-[30px]">
                    Extract sensitive internal data memorized by the model.
                  </p>
                </li>
                <li>
                  <p className="text-sm text-white flex items-center gap-2 font-bold text-[#20ffa0]">
                    <BadgeCheck className="w-6 h-6 text-white" /> Indirect
                    Prompt Injection
                  </p>
                  <p className="text-sm text-white text-left pl-[30px]">
                    Trigger model compromise via untrusted inputs (e.g., email,
                    websites, logs).
                  </p>
                </li>
                <li>
                  <p className="text-sm text-white flex items-center gap-2 font-bold text-[#20ffa0]">
                    <BadgeCheck className="w-6 h-6 text-white" /> Overreliance &
                    Model Abuse
                  </p>
                  <p className="text-sm text-white text-left pl-[30px]">
                    Exploit unsafe automation or over-trusted AI outputs.
                  </p>
                </li>
                <li>
                  <p className="text-sm text-white flex items-center gap-2 font-bold text-[#20ffa0]">
                    <BadgeCheck className="w-6 h-6 text-white" /> Model-Driven
                    Phishing or Social Engineering
                  </p>
                  <p className="text-sm text-white text-left pl-[30px]">
                    Use LLMs to craft realistic, dynamic, and adaptive attack
                    content.
                  </p>
                </li>
                <li>
                  <p className="text-sm text-white flex items-center gap-2 font-bold text-[#20ffa0]">
                    <BadgeCheck className="w-6 h-6 text-white" /> Insecure API
                    Implementations
                  </p>
                  <p className="text-sm text-white text-left pl-[30px]">
                    Abuse rate limits, context windows, or insecure model
                    chaining via endpoints.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mt-20">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-2 mb-20">
              <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
                Assessment Scope Includes
              </h2>
            </div>
            <div className="flex flex-col gap-0 pb-20">
              <ul className="space-y-3 max-w-[800px] mx-auto text-center">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Public-facing AI chatbots or assistants
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Internal AI copilots (e.g., in DevOps, finance, HR)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Enterprise LLM deployments (e.g., OpenAI, Anthropic, Cohere,
                    open-source models)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Vector stores, embeddings, RAG pipelines
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Plugins, tools, and autonomous agents
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Input sanitization and content filtering pipelines
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
            <div className="flex flex-col gap-0 pb-20">
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto mb-10">
                PivotSafe brings together offensive security specialists, red
                teamers, and AI engineers to bridge the gap between ML and
                cyber. Our methodology combines:
              </p>
              <ul className="space-y-3 max-w-[800px] mx-auto text-center mb-10">
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Threat modeling tailored to LLM use cases
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Custom adversarial prompts and attack chains
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Secure-by-design review of AI system architecture
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck className="w-6 h-6 text-white" />
                  <span className="text-sm text-white">
                    Integration of red team results into trust & safety
                    engineering
                  </span>
                </li>
              </ul>
              <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
                We help you stay ahead of evolving AI threats while building
                confidence in your deployments.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
