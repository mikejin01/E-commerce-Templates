const STAR_PATH =
  "M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z";

function StarRow({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="size-3.5 shrink-0">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

export default function StarRating({
  rating,
  reviewCount,
  className = "",
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
}) {
  const percent = Math.max(0, Math.min(1, rating / 5)) * 100;

  return (
    // `relative` contains the sr-only span: it is position:absolute, and against
    // an unpositioned ancestor it resolves to the viewport and widens the document
    <div className={`relative flex items-center gap-1.5 ${className}`}>
      <div className="relative">
        <StarRow className="flex text-current opacity-25" />
        {/* filled stars clipped to the rating — handles fractional values */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${percent}%` }}
        >
          <StarRow className="flex text-verdon-star" />
        </div>
      </div>
      {reviewCount !== undefined && (
        <span className="text-[11px] tabular-nums opacity-70">
          ({reviewCount.toLocaleString("en-IE")})
        </span>
      )}
      <span className="sr-only">
        Rated {rating} out of 5
        {reviewCount !== undefined ? ` from ${reviewCount} reviews` : ""}
      </span>
    </div>
  );
}
