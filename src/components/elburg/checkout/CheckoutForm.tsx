"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddressFields from "@/components/elburg/checkout/AddressFields";
import { Checkbox, Field } from "@/components/elburg/checkout/Field";
import OrderSummary from "@/components/elburg/checkout/OrderSummary";
import { salesTax, shippingCost, shippingMethods } from "@/data/elburg/checkout";
import { useCart } from "@/lib/elburg/cart-context";
import {
  cardDigits,
  emptyAddress,
  emptyCard,
  formatAddressLines,
  formatCardNumber,
  formatExpiry,
  validateAddress,
  validateCard,
  validateEmail,
  type Address,
  type Card,
} from "@/lib/elburg/checkout";
import { formatPrice } from "@/lib/elburg/format";
import { addBusinessDays, createOrderNumber, saveOrder, type Order } from "@/lib/elburg/order-store";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[15px] font-semibold uppercase tracking-[0.1em]">{children}</h2>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
      className="size-3.5"
    >
      <rect x="5" y="10.5" width="14" height="9.5" rx="1.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 1 1 7 0v2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, hydrated, clearCart } = useCart();

  const [placing, setPlacing] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [shipping, setShipping] = useState<Address>(emptyAddress);
  const [billing, setBilling] = useState<Address>(emptyAddress);
  const [billingSame, setBillingSame] = useState(true);
  const [methodId, setMethodId] = useState(shippingMethods[0].id);
  const [card, setCard] = useState<Card>(emptyCard);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const method = shippingMethods.find((option) => option.id === methodId) ?? shippingMethods[0];
  const delivery = shippingCost(method, subtotal);
  // US storefront: tax is added on top, and delivery is taxable with the goods
  const tax = salesTax(subtotal + delivery);
  const total = subtotal + delivery + tax;
  const errorCount = Object.keys(errors).length;

  function clearError(key: string) {
    setErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function updateAddress(target: "shipping" | "billing") {
    return (field: keyof Address, value: string) => {
      const setter = target === "shipping" ? setShipping : setBilling;
      setter((current) => ({ ...current, [field]: value }));
      clearError(`${target}.${field}`);
    };
  }

  function updateCard(field: keyof Card, value: string) {
    setCard((current) => ({ ...current, [field]: value }));
    clearError(`card.${field}`);
  }

  function chooseBillingMode(same: boolean) {
    setBillingSame(same);
    if (!same) return;
    // the billing fields are unmounted now, so their errors could never be
    // cleared by editing — drop them rather than block the order invisibly
    setErrors((current) => {
      const entries = Object.entries(current).filter(([key]) => !key.startsWith("billing."));
      if (entries.length === Object.keys(current).length) return current;
      return Object.fromEntries(entries);
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (placing) return;

    const now = new Date();
    const found = {
      ...validateEmail(email),
      ...validateAddress(shipping, "shipping"),
      ...(billingSame ? {} : validateAddress(billing, "billing")),
      ...validateCard(card, now),
    };

    if (Object.keys(found).length > 0) {
      setErrors(found);
      // error keys mirror the field ids: `shipping.city` -> `shipping-city`
      const first = Object.keys(found)[0].replace(".", "-");
      document.getElementById(first)?.focus();
      return;
    }

    setPlacing(true);
    // a beat of latency so the demo reads like a real checkout
    await new Promise((resolve) => setTimeout(resolve, 900));

    const order: Order = {
      number: createOrderNumber(),
      placedAt: now.toISOString(),
      email: email.trim(),
      shippingAddress: formatAddressLines(shipping),
      billingAddress: formatAddressLines(billingSame ? shipping : billing),
      shippingMethod: { label: method.label, detail: method.detail, price: delivery },
      deliveryWindow: {
        from: addBusinessDays(now, method.daysMin).toISOString(),
        to: addBusinessDays(now, method.daysMax).toISOString(),
      },
      // only the last four digits are ever stored, and only in this tab
      cardLast4: cardDigits(card.number).slice(-4),
      lines: items.map((item) => ({
        slug: item.slug,
        name: item.title,
        variantLabel: item.variant.name,
        addOns: item.addOnItems.map((addOn) => addOn.name),
        image: item.image,
        tint: item.tint,
        quantity: item.quantity,
        unitPrice: item.unitTotal,
        lineTotal: item.lineTotal,
      })),
      subtotal,
      shipping: delivery,
      tax,
      total,
    };

    saveOrder(order);
    clearCart();
    router.push("/elburg/checkout/confirmation");
  }

  // the cart only exists in localStorage, so hold the layout until it is read
  if (!hydrated) {
    return <div className="min-h-[60vh]" aria-busy="true" />;
  }

  if (placing) {
    return (
      <div
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center"
        aria-live="polite"
      >
        <span
          aria-hidden
          className="size-8 animate-spin rounded-full border-2 border-elburg-ink/20 border-t-elburg-accent"
        />
        <p className="font-heading text-[15px] uppercase tracking-[0.12em]">Placing your order</p>
        <p className="text-[14px] italic opacity-70">One moment — do not refresh this page.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="font-heading text-[32px] uppercase leading-none tracking-[0.01em]">
          Nothing to check out
        </h1>
        <p className="max-w-md text-[15px] italic leading-relaxed opacity-70">
          Your bag is empty. Add a wallet and it will show up here.
        </p>
        <Link
          href="/elburg/collections/all"
          className="mt-2 bg-elburg-ink px-9 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-elburg-paper transition-colors hover:bg-elburg-accent"
        >
          See all wallets
        </Link>
      </div>
    );
  }

  const summaryLines = items.map((item) => ({
    key: item.key,
    name: item.title,
    variantLabel: item.variant.name,
    addOns: item.addOnItems.map((addOn) => addOn.name),
    image: item.image,
    tint: item.tint,
    quantity: item.quantity,
    lineTotal: item.lineTotal,
  }));

  return (
    /* minmax(0,…) on both tracks — standing rule 5 */
    <div className="mx-auto grid max-w-[1280px] lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)]">
      {/* the summary sits above the form on small screens and beside it on
          large. the tint is on the column, not just the panel, so it fills the
          row however tall the form gets */}
      <aside className="border-b border-elburg-ink/12 bg-elburg-bone/40 lg:col-start-2 lg:row-start-1 lg:border-b-0 lg:border-l">
        <div className="lg:sticky lg:top-[50px] lg:max-h-[calc(100vh-50px)] lg:overflow-y-auto">
          <OrderSummary
            lines={summaryLines}
            totals={{ subtotal, shipping: delivery, tax, total }}
            collapsible
          />
        </div>
      </aside>

      <div className="min-w-0 px-6 py-12 lg:col-start-1 lg:row-start-1 lg:px-12 lg:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="font-heading text-[36px] uppercase leading-none tracking-[0.01em] md:text-[46px]">
            Checkout
          </h1>
          <Link
            href="/elburg/cart"
            className="-my-2 py-2 font-heading text-[12px] uppercase tracking-[0.1em] underline underline-offset-4 opacity-70 hover:text-elburg-accent hover:opacity-100"
          >
            Return to bag
          </Link>
        </div>

        {/* items-start keeps the icon on the first line when the copy wraps */}
        <p className="mt-3 flex items-start gap-2 text-[14px] italic leading-relaxed opacity-70">
          <span className="mt-1 shrink-0">
            <LockIcon />
          </span>
          Demo checkout — no payment is taken and nothing is sent anywhere.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-12">
          <section>
            <SectionHeading>Contact</SectionHeading>
            <div className="mt-4 space-y-3">
              <Field
                id="email"
                label="Email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                error={errors.email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearError("email");
                }}
              />
              <Checkbox
                id="newsletter"
                checked={newsletter}
                onChange={setNewsletter}
                label="Keep me posted about new wallets and the stories behind them"
              />
            </div>
          </section>

          <section>
            <SectionHeading>Delivery address</SectionHeading>
            <div className="mt-4">
              <AddressFields
                prefix="shipping"
                address={shipping}
                errors={errors}
                onChange={updateAddress("shipping")}
                showPhone
              />
            </div>
          </section>

          <section>
            <fieldset className="min-w-0">
              <legend className="font-heading text-[15px] font-semibold uppercase tracking-[0.1em]">
                Delivery method
              </legend>
              <div className="mt-4 divide-y divide-elburg-ink/15 border border-elburg-ink/20">
                {shippingMethods.map((option) => {
                  const price = shippingCost(option, subtotal);
                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors ${
                        option.id === methodId ? "bg-elburg-bone/50" : "hover:bg-elburg-ink/[0.03]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping-method"
                        value={option.id}
                        checked={option.id === methodId}
                        onChange={() => setMethodId(option.id)}
                        className="size-4 shrink-0 accent-[#2e2e2b]"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-heading text-[14px] font-medium uppercase tracking-[0.03em]">
                          {option.label}
                        </span>
                        <span className="block text-[13px] italic leading-snug text-elburg-ink/65">
                          {option.detail}
                        </span>
                      </span>
                      <span className="shrink-0 font-heading text-[14px] tabular-nums">
                        {price === 0 ? "Free" : formatPrice(price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </section>

          <section>
            <SectionHeading>Payment</SectionHeading>
            <p className="mt-2 text-[14px] italic leading-relaxed opacity-70">
              Nothing is charged. Card details stay in this browser and are never sent anywhere —
              type any digits you like.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-[repeat(2,minmax(0,1fr))]">
              <Field
                id="card-number"
                label="Card number"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                value={card.number}
                error={errors["card.number"]}
                onChange={(event) => updateCard("number", formatCardNumber(event.target.value))}
                wrapperClassName="sm:col-span-2"
              />
              <Field
                id="card-expiry"
                label="Expiry (MM / YY)"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="09/30"
                value={card.expiry}
                error={errors["card.expiry"]}
                onChange={(event) => updateCard("expiry", formatExpiry(event.target.value))}
              />
              <Field
                id="card-cvc"
                label="Security code"
                inputMode="numeric"
                autoComplete="cc-csc"
                maxLength={4}
                placeholder="123"
                value={card.cvc}
                error={errors["card.cvc"]}
                onChange={(event) => updateCard("cvc", event.target.value.replace(/\D/g, ""))}
              />
              <Field
                id="card-name"
                label="Name on card"
                autoComplete="cc-name"
                value={card.name}
                error={errors["card.name"]}
                onChange={(event) => updateCard("name", event.target.value)}
                wrapperClassName="sm:col-span-2"
              />
            </div>
          </section>

          <section>
            <fieldset className="min-w-0">
              <legend className="font-heading text-[15px] font-semibold uppercase tracking-[0.1em]">
                Billing address
              </legend>
              <div className="mt-4 divide-y divide-elburg-ink/15 border border-elburg-ink/20">
                {[
                  { same: true, label: "Same as delivery address" },
                  { same: false, label: "Use a different billing address" },
                ].map((option) => (
                  <label
                    key={option.label}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 text-[14px] transition-colors ${
                      option.same === billingSame
                        ? "bg-elburg-bone/50"
                        : "hover:bg-elburg-ink/[0.03]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="billing-address"
                      checked={option.same === billingSame}
                      onChange={() => chooseBillingMode(option.same)}
                      className="size-4 shrink-0 accent-[#2e2e2b]"
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              {!billingSame && (
                <div className="mt-5">
                  <AddressFields
                    prefix="billing"
                    address={billing}
                    errors={errors}
                    onChange={updateAddress("billing")}
                  />
                </div>
              )}
            </fieldset>
          </section>

          <div>
            {errorCount > 0 && (
              <p
                role="alert"
                className="mb-4 border border-elburg-accent/50 bg-elburg-accent/10 px-4 py-3 text-[14px] text-elburg-accent"
              >
                {errorCount === 1
                  ? "One field needs your attention before you can place this order."
                  : `${errorCount} fields need your attention before you can place this order.`}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2.5 bg-elburg-ink px-6 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-elburg-paper transition-colors hover:bg-elburg-accent"
            >
              <LockIcon />
              Place order · {formatPrice(total)}
            </button>

            <p className="mt-3 text-center text-[13px] italic leading-relaxed opacity-60">
              By placing this demo order you agree to nothing at all. Free returns within 60 days.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
