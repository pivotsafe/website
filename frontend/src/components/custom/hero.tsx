import React from "react";
import ShapeThree from "./shapeThree";
import { ShimmerButton } from "../magicui/shimmer-button";
import OtherShapeThree from "./otherShapeThree";
import Gradientdiv from "./Gradientdiv";
import { TrustedClientsMovingCards } from "./trustedClientsMovingCards";

const Hero = () => {
  return (
    <section className="relative container mx-auto">
      <div className=" relative h-[calc(90vh)]">
        <div className="logo w-[100%] my-10 flex items-center justify-between">
          <h1 className="text-[24px] text-white">Pivot Safe</h1>
          <div className="text-white">⎑</div>
        </div>
        {/* canvas area  */}
        {/* <Gradientdiv className={""} /> */}
        <div className="w-[calc(100%-30px)] h-[calc(100vh-100px)] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="w-full h-full relative">
            <div
              className="w-[200%] h-full absolute top-[50%] left-[30%]"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <OtherShapeThree />
            </div>
            <div
              className="absolute top-[50%] left-[50%] z-10 w-[700px]"
              style={{ transform: "translate(-20%, -50%)" }}
            >
              <h2 className="text-[#ffffff] text-[90px] font-bold text-left ">
                Breaching Boundaries to Build Better Security
              </h2>
              <p className="text-[#ffffff]">
                At PivotSafe, we believe security should protect progress—not
                obstruct it.
              </p>
              <div className="flex items-center w-full">
                <a
                  href="mailto:hello@pivotsafe.com?subject=Book%20a%20Free%20Consultation"
                  data-testid="book-consultation-btn"
                >
                  <ShimmerButton className="shadow-2xl mt-5">
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                      Book a Free Consultation
                    </span>
                  </ShimmerButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
