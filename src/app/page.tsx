import CommunityImpact from "@/components/home/CommunityImpact";
import EventCategories from "@/components/home/EventCategories";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <EventCategories />
      <HowItWorks />
      <CommunityImpact />
    </div>
  );
}
