import Hero from "@/components/elburg/home/Hero";
import WalletCategories from "@/components/elburg/home/WalletCategories";
import IconUspBand from "@/components/elburg/home/IconUspBand";
import NewAndFeatured from "@/components/elburg/home/NewAndFeatured";
import CollectionBand from "@/components/elburg/home/CollectionBand";
import OurIcons from "@/components/elburg/home/OurIcons";
import OurStories from "@/components/elburg/home/OurStories";
import { engravingBand, flagshipBand } from "@/data/elburg/home";

/**
 * The ELBURG homepage, band for band against the reference (`sites/elburg.md`,
 * "Page anatomy"). The icon-USP band appears twice with the same anatomy and
 * different content, so it is one component bound to two data objects; the
 * second is the flagship band and runs on the dark ground.
 *
 * Two of the reference's ten bands are not here on purpose: its announcement
 * strip does not render on the live site, and the closing band is the shared
 * footer, which the layout already provides.
 */
export default function ElburgHomePage() {
  return (
    <>
      <Hero />
      <WalletCategories />
      <IconUspBand {...engravingBand} />
      <NewAndFeatured />
      <CollectionBand />
      <OurIcons />
      <IconUspBand {...flagshipBand} className="bg-elburg-slate text-elburg-bone" />
      <OurStories />
    </>
  );
}
