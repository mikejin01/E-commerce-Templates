import Hero from "@/components/verdon/home/Hero";
import Bestsellers from "@/components/verdon/home/Bestsellers";
import CategoryGrid from "@/components/verdon/home/CategoryGrid";
import PressBand from "@/components/verdon/home/PressBand";
import FeaturesBand from "@/components/verdon/home/FeaturesBand";
import ReviewStats from "@/components/verdon/home/ReviewStats";
import InstagramGrid from "@/components/verdon/home/InstagramGrid";
import Stories from "@/components/verdon/home/Stories";

export default function Home() {
  return (
    <>
      <Hero />
      <Bestsellers />
      <CategoryGrid />
      <PressBand />
      <FeaturesBand />
      <ReviewStats />
      <InstagramGrid />
      <Stories />
    </>
  );
}
