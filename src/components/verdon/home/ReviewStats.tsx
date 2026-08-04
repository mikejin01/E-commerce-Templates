import StarRating from "@/components/verdon/product/StarRating";
import { reviewStats } from "@/data/verdon/home";

export default function ReviewStats() {
  return (
    <section className="overflow-hidden bg-verdon-cream py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="flex flex-col items-stretch justify-center gap-5 md:flex-row md:gap-8">
          {/* angled blocks — outer skews, inner counter-skews to keep text upright */}
          <div className="-skew-x-6 bg-verdon-navy px-10 py-8 text-white md:px-16">
            <div className="flex skew-x-6 flex-col items-center">
              <p className="font-heading text-[42px] font-semibold leading-none md:text-[54px]">
                {reviewStats.rating}
                <span className="text-[22px] opacity-60 md:text-[26px]">/5</span>
              </p>
              <StarRating rating={reviewStats.rating} className="mt-3" />
              <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-white/70">
                {reviewStats.reviewCount.toLocaleString("en-IE")} Reviews
              </p>
            </div>
          </div>

          <div className="-skew-x-6 bg-verdon-green px-10 py-8 text-white md:px-16">
            <div className="flex skew-x-6 flex-col items-center">
              <p className="font-heading text-[42px] font-semibold leading-none md:text-[54px]">
                {reviewStats.recommendPercent}%
              </p>
              <p className="mt-4 max-w-[15rem] text-center text-[11px] uppercase leading-relaxed tracking-[0.16em] text-white/70">
                Would recommend to a friend
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
