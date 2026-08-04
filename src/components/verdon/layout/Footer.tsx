import InertLink from "@/components/shared/InertLink";
import NewsletterForm from "@/components/verdon/layout/NewsletterForm";
import { footerColumns } from "@/data/verdon/navigation";

function MountainDivider() {
  return (
    <div aria-hidden className="bg-white">
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="block h-10 w-full text-verdon-navy md:h-14"
      >
        {/* baseline with a mountain peak rising on the right */}
        <path
          d="M0 44 H1080 L1150 8 L1185 26 L1216 14 L1290 44 H1440"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path d="M0 50 H1440" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
}

const socialIcons: { label: string; path: string }[] = [
  {
    label: "Facebook",
    path: "M13.5 21v-7h2.3l.4-2.8h-2.7V9.4c0-.8.3-1.4 1.5-1.4h1.3V5.5c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v2.5H8.9V14h2.3v7h2.3Z",
  },
  {
    label: "Pinterest",
    path: "M12 4a8 8 0 0 0-3 15.4c0-.6-.1-1.6 0-2.2l1-4.1s-.2-.5-.2-1.2c0-1.2.7-2 1.5-2 .7 0 1 .5 1 1.2 0 .7-.5 1.8-.7 2.8-.2.8.4 1.5 1.3 1.5 1.5 0 2.7-1.6 2.7-4 0-2-1.5-3.5-3.6-3.5a3.7 3.7 0 0 0-3.9 3.7c0 .7.3 1.5.6 1.9l.1.3-.2 1c0 .2-.2.2-.4.1-1.1-.5-1.8-2.1-1.8-3.4 0-2.8 2-5.3 5.9-5.3 3 0 5.4 2.2 5.4 5.1 0 3.1-1.9 5.5-4.6 5.5-.9 0-1.7-.5-2-1l-.6 2.1c-.2.8-.7 1.7-1.1 2.3A8 8 0 1 0 12 4Z",
  },
  {
    label: "Instagram",
    path: "M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4Zm0 7.5a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8ZM17.8 7.2a1 1 0 1 1-2.1 0 1 1 0 0 1 2.1 0ZM12 5.6c1.9 0 2.1 0 2.9.1.7 0 1.1.2 1.4.3.3.1.6.3.8.5.2.2.4.5.5.8.1.3.2.7.3 1.4v5.8c0 .7-.2 1.1-.3 1.4-.1.3-.3.6-.5.8-.2.2-.5.4-.8.5-.3.1-.7.2-1.4.3H9.1c-.7 0-1.1-.2-1.4-.3a2.3 2.3 0 0 1-.8-.5 2.3 2.3 0 0 1-.5-.8c-.1-.3-.2-.7-.3-1.4V9.1c0-.7.2-1.1.3-1.4.1-.3.3-.6.5-.8.2-.2.5-.4.8-.5.3-.1.7-.2 1.4-.3H12Zm0-1.7H9c-.8 0-1.4.2-1.9.4a4 4 0 0 0-1.4.9 4 4 0 0 0-.9 1.4c-.2.5-.3 1-.4 1.9v6c0 .8.2 1.4.4 1.9.2.5.5 1 .9 1.4.4.4.9.7 1.4.9.5.2 1 .3 1.9.4h6c.8 0 1.4-.2 1.9-.4a4 4 0 0 0 1.4-.9c.4-.4.7-.9.9-1.4.2-.5.3-1 .4-1.9V9c0-.8-.2-1.4-.4-1.9a4 4 0 0 0-.9-1.4 4 4 0 0 0-1.4-.9c-.5-.2-1-.3-1.9-.4h-3Z",
  },
  {
    label: "LinkedIn",
    path: "M8.3 18.4H5.9V10h2.4v8.4ZM7.1 8.9a1.4 1.4 0 1 1 0-2.9 1.4 1.4 0 0 1 0 2.9Zm11.3 9.5H16v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1.1-1.6 2.2v4.1h-2.4V10h2.3v1.1h.1c.3-.6 1.1-1.3 2.3-1.3 2.4 0 2.9 1.6 2.9 3.7v4.9Z",
  },
];

const paymentBadges = [
  "iDEAL",
  "VISA",
  "MC",
  "AMEX",
  "Maestro",
  "Bancontact",
  "Apple Pay",
  "G Pay",
  "PayPal",
  "Klarna",
  "SOFORT",
];

export default function Footer() {
  return (
    <footer>
      <MountainDivider />
      <div className="bg-verdon-green text-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 md:grid-cols-3 lg:gap-16 lg:px-16">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em]">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <InertLink className="-my-1 py-1 text-[12px] text-white/85 hover:text-white hover:underline">
                      {link.label}
                    </InertLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em]">
              Newsletter
            </h3>
            <p className="mb-4 max-w-xs text-[12px] leading-relaxed text-white/85">
              Become a member to save 10% on your first order, and be the first
              to know about everything VERDON.
            </p>
            <NewsletterForm />
            <div className="mt-6 flex items-center gap-4">
              {socialIcons.map((icon) => (
                <InertLink
                  key={icon.label}
                  label={icon.label}
                  className="-m-2 p-2 text-white/85 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path d={icon.path} />
                  </svg>
                </InertLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-6 pb-8 lg:px-16">
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {paymentBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-[3px] bg-white px-1.5 py-0.5 text-[8px] font-bold text-verdon-navy"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="mt-5 text-center text-[10px] text-white/60">
            © VERDON {new Date().getFullYear()}. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
