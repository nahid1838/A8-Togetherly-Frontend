import CommunityImpact from "@/components/home/CommunityImpact";
import EventCategories from "@/components/home/EventCategories";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import Gallery from "@/components/home/Gallery";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedEvents />
      <Gallery />
      <EventCategories />
      <HowItWorks />
      <CommunityImpact />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
