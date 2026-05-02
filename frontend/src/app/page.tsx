import Gradientdiv from "@/components/custom/Gradientdiv";
import Hero from "@/components/custom/hero";
import { TrustedClientsMovingCards } from "@/components/custom/trustedClientsMovingCards";
import ServiceCardGroup from "@/components/custom/serviceCardGroup";
import AboutUs from "@/components/custom/aboutUs";
import { Training } from "@/components/custom/training";
import Review from "@/components/custom/review";
import RecentBlogs from "@/components/custom/recentBlogs";

export default function Home() {
  return (
    <main className="relative container-fluid mx-auto overflow-hidden">
      <Hero />
      <TrustedClientsMovingCards />
      <ServiceCardGroup />
      <AboutUs />
      <Training />
      <RecentBlogs />
      {/* <Review /> */}
    </main>
  );
}
