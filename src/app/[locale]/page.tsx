import Hero from "@/components/home/Hero";
import QuoteBar from "@/components/home/QuoteBar";
import Destinations from "@/components/home/Destinations";
import AlgeriaMap from "@/components/home/AlgeriaMap";
import FeaturedTrips from "@/components/home/FeaturedTrips";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import CTA from "@/components/home/CTA";
import DealsTicker from "@/components/home/DealsTicker";
import Testimonials from "@/components/home/Testimonials";


export default async function HomePage() {
  return (
    <div>
      <Hero />
      <Destinations />
      <AlgeriaMap />
      <FeaturedTrips />
      <Services />
      <Stats />
      <Testimonials />
      <CTA />
    </div>
  );
}