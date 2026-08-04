import type { Dimensions } from "@/data/elburg/products";

/**
 * The dimensioned drawing inside the "Size & weight" accordion.
 *
 * Drawn here rather than downloaded. The reference's own diagram is an SVG with
 * its wordmark set into the wallet outline, and no reference artwork ships
 * (standing rule 2 and the scrub-grep note in `sites/elburg.md`) — so this is a
 * generic front-and-side elevation scaled to whatever millimetres it is given.
 */
export default function SizeDiagram({ dimensions }: { dimensions: Dimensions }) {
  const { width, height, depth, weight } = dimensions;

  // one drawing unit per millimetre, with room for the dimension lines
  const pad = 26;
  const gap = 22;
  const totalW = pad + width + gap + depth + pad;
  const totalH = pad + height + pad;
  const frontX = pad;
  const sideX = pad + width + gap;
  const top = pad;

  return (
    <figure className="min-w-0">
      <div className="flex min-w-0 flex-wrap items-center gap-x-10 gap-y-6">
        <svg
          viewBox={`0 0 ${totalW} ${totalH}`}
          className="h-[210px] w-auto max-w-full"
          role="img"
          aria-label={`${width} by ${height} by ${depth} millimetres`}
        >
          <g stroke="currentColor" fill="none" strokeWidth="0.9" opacity="0.35">
            <path d={`M${frontX} ${top - 8} V${top + height + 8}`} strokeDasharray="2 3" />
            <path d={`M${frontX + width} ${top - 8} V${top + height + 8}`} strokeDasharray="2 3" />
            <path d={`M${sideX} ${top - 8} V${top + height + 8}`} strokeDasharray="2 3" />
            <path d={`M${sideX + depth} ${top - 8} V${top + height + 8}`} strokeDasharray="2 3" />
            <path d={`M${frontX - 10} ${top} H${sideX + depth + 8}`} strokeDasharray="2 3" />
            <path d={`M${frontX - 10} ${top + height} H${sideX + depth + 8}`} strokeDasharray="2 3" />
          </g>

          {/* front elevation: a rounded body with the card holder's step at its foot */}
          <g stroke="currentColor" fill="none" strokeWidth="1.4">
            <rect x={frontX} y={top} width={width} height={height} rx="4" />
            <path d={`M${frontX + 6} ${top + height} v6 h${width - 12} v-6`} />
            <circle cx={frontX + width / 2} cy={top + height * 0.46} r="5" />
          </g>

          {/* side elevation */}
          <g stroke="currentColor" fill="none" strokeWidth="1.4">
            <rect x={sideX} y={top} width={depth} height={height} rx="2.5" />
            <path d={`M${sideX} ${top + height} v6 h${depth} v-6`} />
          </g>
        </svg>

        <div className="flex items-baseline gap-2">
          <span className="font-heading text-[62px] font-bold leading-none tabular-nums">
            {weight}
          </span>
          <span className="font-heading text-[13px] uppercase tracking-[0.1em] opacity-70">
            gram
          </span>
        </div>
      </div>

      <figcaption className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-heading text-[12px] uppercase tracking-[0.08em] opacity-70">
        <span>{height} mm high</span>
        <span>{width} mm wide</span>
        <span>{depth} mm deep</span>
      </figcaption>
    </figure>
  );
}
