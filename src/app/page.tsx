import CommunityImpact from "@/components/home/CommunityImpact";
import EventCategories from "@/components/home/EventCategories";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <EventCategories />
      <HowItWorks />
      <CommunityImpact />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
