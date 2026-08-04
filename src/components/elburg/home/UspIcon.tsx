/**
 * The line icons the reference pairs with its USP rows. Its own set ships as
 * artwork; these are redrawn, on the same 24-unit grid and the same 1.3 stroke
 * as the footer's promise icons, so the two bands read as one family.
 */
const paths: Record<string, React.ReactNode> = {
  combine: (
    <>
      <rect x="3.2" y="3.2" width="9" height="9" rx="1.2" />
      <path d="M6.4 6.4h2.6M7.7 6.4v3.2" strokeLinecap="round" />
      <circle cx="16.4" cy="7.7" r="4.3" />
      <path d="M9.4 20.8h11.4M9.4 16.6h11.4" strokeLinecap="round" />
      <circle cx="5.4" cy="18.7" r="2.2" />
    </>
  ),
  style: (
    <>
      <path d="M4 4.4h9.6M8.8 4.4v9.4" strokeLinecap="round" />
      <path d="M4 17.4h16M4 20.6h11" strokeLinecap="round" />
      <path d="M15.4 5.2 20 9.8M20 5.2l-4.6 4.6" strokeLinecap="round" />
    </>
  ),
  price: (
    <>
      <path
        d="m12 3.4 2.5 5.3 5.6.8-4.1 4.1 1 5.8L12 16.7l-5 2.7 1-5.8L3.9 9.5l5.6-.8L12 3.4Z"
        strokeLinejoin="round"
      />
      <path d="m16.5 15.6 3.6 3.6" strokeLinecap="round" />
      <rect x="17.6" y="16.9" width="4.4" height="2.8" rx="0.8" transform="rotate(45 19.8 18.3)" />
    </>
  ),
  rfid: (
    <>
      <rect x="4.4" y="3.6" width="15.2" height="14" rx="1.6" />
      <path
        d="M8.6 13.4a3.4 3.4 0 0 1 3.4-3.4M8.6 10.2A6.6 6.6 0 0 1 15.2 3.6"
        strokeLinecap="round"
      />
      <circle cx="8.8" cy="13.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M4.4 20.8h15.2" strokeLinecap="round" />
    </>
  ),
  access: (
    <>
      <rect x="4.6" y="8.4" width="14.8" height="11.2" rx="1.4" />
      <path d="M8.4 8.4V6.2a3.6 3.6 0 0 1 7.2 0v2.2" strokeLinecap="round" />
      <path d="M12 12.4v3.4" strokeLinecap="round" />
    </>
  ),
  cashband: (
    <>
      <rect x="3.4" y="6.6" width="17.2" height="10.8" rx="1.4" />
      <path d="M8.6 6.6v10.8M15.4 6.6v10.8" />
      <rect x="9.6" y="9.6" width="4.8" height="4.8" rx="0.8" />
    </>
  ),
};

export default function UspIcon({ name, className = "size-8" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
