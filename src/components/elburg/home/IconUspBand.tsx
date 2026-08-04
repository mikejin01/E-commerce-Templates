import Image from "next/image";
import DisplayHeading from "@/components/elburg/home/DisplayHeading";
import UspIcon from "@/components/elburg/home/UspIcon";
import type { IconUsp } from "@/data/elburg/home";

/**
 * The reference's icon-USP band (its CMS name is recorded in the page anatomy
 * in `sites/elburg.md`). It runs twice on the homepage — once for the engraving
 * service and once for the flagship card holder — with the same anatomy each
 * time: a tall image on the left, an italic display headline on the right, then
 * three icon USPs separated by hairlines.
 *
 * The image column is narrower than the text column on the reference and the
 * two are not vertically aligned: the USP stack sits at the image's optical
 * centre, which is what `md:items-center` reproduces.
 */
export default function IconUspBand({
  heading,
  image,
  alt,
  usps,
  className = "",
}: {
  heading: { text: string; italic?: boolean }[];
  image: string;
  alt: string;
  usps: IconUsp[];
  className?: string;
}) {
  return (
    <section className={`px-6 py-16 md:py-20 lg:px-12 ${className}`}>
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16">
        <div className="relative aspect-[5/7] min-w-0">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 768px) 44vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="min-w-0">
          <DisplayHeading
            lines={heading}
            upper
            className="mb-10 text-[42px] tracking-[0.01em] sm:text-[52px] lg:text-[58px]"
          />

          <ul>
            {usps.map((usp, i) => (
              <li
                key={usp.title}
                className={`flex items-start gap-5 py-6 ${
                  i > 0 ? "border-t border-current/15" : ""
                }`}
              >
                <UspIcon name={usp.icon} className="mt-0.5 size-9 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-heading text-[20px] font-bold uppercase leading-[1.05] tracking-[0.01em]">
                    {usp.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-snug opacity-80">{usp.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
