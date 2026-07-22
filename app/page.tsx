import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import PromoSection from "@/components/home/PromoSection";
import StatsSection from "@/components/home/StatsSection";
import Testimonials from "@/components/home/Testimonials";
import HowToOrder from "@/components/home/HowToOrder";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <PromoSection />
      <StatsSection />
      <Testimonials />
      <HowToOrder />
      <CTASection />
    </>
  );
}
