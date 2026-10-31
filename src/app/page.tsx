import CommunityImpact from "@/components/home/CommunityImpact";
import EventCategories from "@/components/home/EventCategories";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <EventCategories />
      <HowItWorks />
      <CommunityImpact />
      <Testimonials />
    </div>
  );
}
