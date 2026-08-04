import Link from "next/link";
import InertLink from "@/components/shared/InertLink";

/**
 * The band heading the reference repeats down the homepage: condensed caps on
 * the left, an optional underlined link on the right, both sitting on the
 * page's own baseline with no rule between them.
 */
export default function SectionHeading({
  title,
  link,
  href,
  className = "",
}: {
  title: string;
  link?: string;
  /** set only where the demo builds the destination; otherwise the link is inert */
  href?: string;
  className?: string;
}) {
  const linkClass =
    "shrink-0 font-heading text-[12px] font-medium uppercase leading-none tracking-[0.06em] underline underline-offset-[5px] hover:text-elburg-accent";

  return (
    <div className={`flex items-end justify-between gap-6 ${className}`}>
      <h2 className="font-heading text-[26px] font-bold uppercase leading-none tracking-[0.01em] md:text-[30px]">
        {title}
      </h2>
      {link && href ? (
        <Link href={href} className={linkClass}>
          {link}
        </Link>
      ) : link ? (
        <InertLink className={linkClass}>{link}</InertLink>
      ) : null}
    </div>
  );
}
