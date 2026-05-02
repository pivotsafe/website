import React from "react";
import { AboutUsToolTip } from "./aboutUsToolTip";

const AboutUs = () => {
  return (
    <section className="mt-40">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-2 mb-20">
          <h2 className="text-[#ffffff] text-[30px] font-bold text-left ">
            Why Train With Us?
          </h2>
        </div>
        <div className="flex flex-col gap-0 mb-20">
          <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto ">
            PivotSafe is a leading provider of cybersecurity services and
            solutions. We are a team of experienced professionals who are
            dedicated to protecting our clients from cyber threats. We are a
            team of experienced professionals who are dedicated to protecting
            our clients from cyber threats.
          </p>
          <p className="text-white text-lg font-light text-center max-w-[800px] mx-auto mt-10">
            We are a team of experienced professionals who are dedicated to
            protecting our clients from cyber threats.
          </p>
        </div>
        <AboutUsToolTip />
      </div>
    </section>
  );
};

export default AboutUs;
