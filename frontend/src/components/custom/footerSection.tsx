import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className="w-full bg-[#101010] border-t border-white/10 py-10 mt-0">
      <div className="custom-container flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-white text-2xl font-bold mb-2">Pivot Safe</h2>
          <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
            Pivot to Proactive Layer of Security. Protect your organization from
            human cyber-risk with Pivot Safe 360°.
          </p>
        </div>
        {/* Navigation */}
        <div className="flex flex-row gap-4 w-[50%]">
          <nav className="flex flex-col  gap-2 md:gap-4 w-[40%]">
            <h4 className="text-white text-sm font-bold mb-2">Services</h4>
            <Link
              href="/adversary_simulation"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Adversary Simulation
            </Link>
            <Link
              href="/penetration_testing"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Penetration Testing
            </Link>
            <Link
              href="/cloud_security"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Cloud Security
            </Link>
            <Link
              href="/software_security"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Application Security
            </Link>
            <Link
              href="/ics_scada_security"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              ICS/SCADA Security
            </Link>
            <Link
              href="/embedded_iot_security"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Embedded & IOT Security
            </Link>
            <Link
              href="/ai_red_teaming"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              AI Red Teaming
            </Link>
          </nav>
          <nav className="flex flex-col  gap-2 md:gap-4">
            <h4 className="text-white text-sm font-bold mb-2">Company</h4>
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition text-sm"
              data-testid="footer-home-link"
            >
              Home
            </Link>
            <Link
              href="#about-us"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              About
            </Link>
            <Link
              href="#training"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Training
            </Link>
            <Link
              href="#services"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Contact
            </Link>
          </nav>
        </div>
        {/* Socials */}
      </div>
      <div className="mt-8 border-t border-b border-white/10 pt-6 pb-6 text-center text-xs text-gray-500 flex flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-blue-400 text-gray-300 transition"
          >
            <IconBrandLinkedin size={18} />
          </a>
          <a
            href="#"
            aria-label="GitHub"
            className="hover:text-gray-100 text-gray-300 transition"
          >
            <IconBrandGithub size={18} />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-sky-400 text-gray-300 transition"
          >
            <IconBrandTwitter size={18} />
          </a>
          <a
            href="mailto:info@pivotsafe.com"
            aria-label="Email"
            className="hover:text-green-400 text-gray-300 transition"
          >
            <IconMail size={18} />
          </a>
        </div>
      </div>
      <div className="mt-8  pt-6 text-center text-xs text-gray-500">
        <p className="text-center text-5xl md:text-9xl lg:text-[18rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-white inset-x-0">
          Pivot Safe
        </p>
        <p className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Pivot Safe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
