/**
 * ELBURG's compact mark: a bastion shield, drawn rather than shipped as
 * artwork. `-burg` reads as *fortification*, which is also what the flagship
 * product does for a stack of cards.
 *
 * The reference sits its own mark in the drawer's bottom corner and swaps the
 * header wordmark for it once the page scrolls; this stands in for both, and
 * deliberately shares no geometry with it.
 */
export default function BrandMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M12 2.5 20 6v6.4c0 4.3-3.2 7.6-8 9.1-4.8-1.5-8-4.8-8-9.1V6l8-3.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
