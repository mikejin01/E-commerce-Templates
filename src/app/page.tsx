import { redirect } from "next/navigation";
import { demoSites } from "@/data/sites";

/**
 * The home page opens straight into the first demo storefront — there is no
 * menu page. Visitors move between demos with the floating DemoSwitcher.
 */
export default function ShowcasePage() {
  redirect(`/${demoSites[0].slug}`);
}
