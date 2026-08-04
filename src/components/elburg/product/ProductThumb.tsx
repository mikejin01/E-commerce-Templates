import Image from "next/image";

/**
 * A render on its own tint. Every place a product appears — listing card, PDP
 * panel, cart line, sticky buy bar — is this component, because the tint has to
 * agree with the tint already baked into the JPEG or the box shows a seam.
 */
export default function ProductThumb({
  src,
  alt,
  tint,
  sizes,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  tint: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: tint }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-contain" />
    </div>
  );
}
