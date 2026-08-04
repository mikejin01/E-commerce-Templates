import InertLink from "@/components/shared/InertLink";
import FooterUsps from "@/components/elburg/layout/FooterUsps";
import FooterColumns from "@/components/elburg/layout/FooterColumns";
import NewsletterForm from "@/components/elburg/layout/NewsletterForm";
import { legalLinks } from "@/data/elburg/navigation";

const socialIcons: { label: string; path: string }[] = [
  {
    label: "Instagram",
    path: "M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Zm0 5.6a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Zm4.3-5.75a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z",
  },
  {
    label: "Facebook",
    path: "M13.1 17.5v-5h1.7l.3-2.1h-2v-1.3c0-.6.2-1 1.1-1h1V6.2c-.2 0-.8-.1-1.5-.1-1.4 0-2.4.9-2.4 2.5v1.8H9.6v2.1h1.7v5h1.8Z",
  },
  {
    label: "LinkedIn",
    path: "M9.4 17.2H7.6v-6h1.8v6ZM8.5 10.4a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Zm7.9 6.8h-1.8v-3c0-.8-.3-1.4-1-1.4s-1.1.5-1.1 1.4v3h-1.8v-6h1.7v.8c.3-.5.9-1 1.8-1 1.5 0 2.2 1 2.2 2.7v3.5Z",
  },
  {
    label: "YouTube",
    path: "M17.6 9.7a1.5 1.5 0 0 0-1-1.1c-.9-.25-4.6-.25-4.6-.25s-3.7 0-4.6.25a1.5 1.5 0 0 0-1 1.1c-.25.95-.25 2.3-.25 2.3s0 1.35.25 2.3a1.5 1.5 0 0 0 1 1.1c.9.25 4.6.25 4.6.25s3.7 0 4.6-.25a1.5 1.5 0 0 0 1-1.1c.25-.95.25-2.3.25-2.3s0-1.35-.25-2.3Zm-6.7 3.75v-2.9l3 1.45-3 1.45Z",
  },
];

/** Stands in for the reference's certification seal. The naming map drops the
 *  certifying body rather than inventing one — the claim is restated
 *  first-party, so the mark is a plain seal with no organisation in it. */
function AuditSeal() {
  return (
    <div className="flex items-center gap-2.5 text-elburg-bone/70">
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden className="size-8">
        <circle cx="16" cy="16" r="12" />
        <circle cx="16" cy="16" r="9" strokeDasharray="2 3" />
        <path d="m11.8 16.2 2.9 2.9 5.5-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-heading text-[10px] font-medium uppercase leading-tight tracking-[0.08em]">
        Independently
        <br />
        audited
      </span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-elburg-bark text-elburg-bone">
      <div className="mx-auto max-w-[1440px] px-6 pt-14 lg:px-12">
        <FooterUsps />

        <hr className="my-12 border-elburg-bone/20 md:my-14" />

        <div className="grid gap-10 md:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)] md:gap-14">
          <FooterColumns />

          <div className="text-center">
            <h3 className="mb-4 font-heading text-[15px] font-semibold uppercase leading-none tracking-[0.03em]">
              Join the community
            </h3>
            <p className="mx-auto mb-8 max-w-xs text-[14px] leading-snug text-elburg-bone/80">
              Sign up for the newsletter and be the first to hear about product releases, stories,
              and more.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 md:mt-14">
          <ul className="flex items-center gap-4">
            {socialIcons.map((icon) => (
              <li key={icon.label}>
                <InertLink
                  label={icon.label}
                  className="block text-elburg-bone/80 hover:text-elburg-bone"
                >
                  <svg viewBox="0 0 24 24" aria-hidden className="size-7">
                    <rect
                      x="3.5"
                      y="3.5"
                      width="17"
                      height="17"
                      rx="4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    />
                    <path d={icon.path} fill="currentColor" />
                  </svg>
                </InertLink>
              </li>
            ))}
          </ul>
        </div>

        <hr className="mt-10 border-elburg-bone/20" />

        <div className="flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between">
          <AuditSeal />
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[13px] text-elburg-bone/75">
            {legalLinks.map((label, i) => (
              <span key={label} className="flex items-center gap-2">
                <InertLink className="-my-1 py-1 hover:text-elburg-bone hover:underline">
                  {label}
                </InertLink>
                <span aria-hidden className="text-elburg-bone/40">
                  {i < legalLinks.length - 1 ? "/" : "|"}
                </span>
              </span>
            ))}
            <span>© ELBURG BV {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
