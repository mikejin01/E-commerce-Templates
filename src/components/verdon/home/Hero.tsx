import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[calc(100svh-82px)] min-h-[520px] w-full overflow-hidden md:max-h-[860px]">
      <Image
        src="/images/verdon/hero/hero-mobile.jpg"
        alt="VERDON sunglasses resting on a jacket"
        fill
        priority
        sizes="100vw"
        className="object-cover md:hidden"
      />
      <Image
        src="/images/verdon/hero/hero-desktop.png"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="hidden object-cover md:block"
      />

      {/* legibility scrim over the lower third */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent"
      />

      <div className="relative flex h-full flex-col items-center justify-end px-6 pb-16 text-center text-white md:pb-24">
        <h1 className="max-w-3xl font-heading text-[34px] font-medium uppercase leading-[1.05] tracking-[0.02em] drop-shadow-sm sm:text-[46px] md:text-[60px]">
          Classic Style,
          <br />
          Maximum Performance
        </h1>
        <Link
          href="/verdon/collections/all"
          className="mt-7 inline-block border border-white bg-white px-9 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-verdon-green transition-colors hover:bg-transparent hover:text-white"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}
