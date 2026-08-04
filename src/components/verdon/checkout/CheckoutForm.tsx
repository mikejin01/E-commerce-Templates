"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddressFields from "@/components/verdon/checkout/AddressFields";
import { Checkbox, Field } from "@/components/verdon/checkout/Field";
import OrderSummary from "@/components/verdon/checkout/OrderSummary";
import { defaultCountry, shippingMethods } from "@/data/verdon/checkout";
import { useCart } from "@/lib/verdon/cart-context";
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
  vatPortion,
  type Address,
  type Card,
} from "@/lib/verdon/checkout";
import { formatPrice } from "@/lib/verdon/format";
import { addWorkingDays, createOrderNumber, saveOrder, type Order } from "@/lib/verdon/order-store";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-[15px] font-medium uppercase tracking-[0.1em]">{children}</h2>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className="size-3.5">
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
  const [shipping, setShipping] = useState<Address>(() => emptyAddress(defaultCountry));
  const [billing, setBilling] = useState<Address>(() => emptyAddress(defaultCountry));
  const [billingSame, setBillingSame] = useState(true);
  const [methodId, setMethodId] = useState(shippingMethods[0].id);
  const [card, setCard] = useState<Card>(emptyCard);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const method = shippingMethods.find((option) => option.id === methodId) ?? shippingMethods[0];
  const total = subtotal + method.price;
  const vat = vatPortion(total);
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
      shippingMethod: { label: method.label, detail: method.detail, price: method.price },
      deliveryWindow: {
        from: addWorkingDays(now, method.daysMin).toISOString(),
        to: addWorkingDays(now, method.daysMax).toISOString(),
      },
      // only the last four digits are ever stored, and only in this tab
      cardLast4: cardDigits(card.number).slice(-4),
      lines: items.map((item) => ({
        slug: item.slug,
        name: item.product.name,
        variantLabel: item.variantLabel,
        addOns: item.addOnItems.map((addOn) => addOn.name),
        image: item.image,
        quantity: item.quantity,
        unitPrice: item.unitTotal,
        lineTotal: item.lineTotal,
      })),
      subtotal,
      shipping: method.price,
      total,
      vat,
    };

    saveOrder(order);
    clearCart();
    router.push("/verdon/checkout/confirmation");
  }

  // the cart only exists in localStorage, so hold the layout until it is read
  if (!hydrated) {
    return <div className="min-h-[60vh]" aria-busy="true" />;
  }

  if (placing) {
    return (
      <div
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center"
        aria-live="polite"
      >
        <span
          aria-hidden
          className="size-8 animate-spin rounded-full border-2 border-neutral-200 border-t-verdon-green"
        />
        <p className="font-heading text-[14px] uppercase tracking-[0.14em]">Placing your order</p>
        <p className="text-[12px] text-neutral-500">One moment — do not refresh this page.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="font-heading text-[26px] font-medium uppercase tracking-[0.04em]">
          Nothing to check out
        </h1>
        <p className="max-w-sm text-[13px] leading-relaxed text-neutral-500">
          Your cart is empty. Add a pair of frames and they will show up here.
        </p>
        <Link
          href="/verdon/collections/all"
          className="mt-2 border border-verdon-green px-9 py-3.5 font-heading text-[12px] font-semibold uppercase tracking-[0.16em] text-verdon-green transition-colors hover:bg-verdon-green hover:text-white"
        >
          Shop All
        </Link>
      </div>
    );
  }

  const summaryLines = items.map((item) => ({
    key: item.key,
    name: item.product.name,
    variantLabel: item.variantLabel,
    addOns: item.addOnItems.map((addOn) => addOn.name),
    image: item.image,
    quantity: item.quantity,
    lineTotal: item.lineTotal,
  }));

  return (
    <div className="mx-auto grid max-w-[1200px] lg:grid-cols-[minmax(0,1fr)_minmax(340px,400px)]">
      {/* summary sits above the form on small screens, right of it on large.
          the tint is on the column, not just the panel, so it fills the row */}
      <aside className="border-b border-neutral-200 bg-verdon-cream lg:col-start-2 lg:row-start-1 lg:border-b-0 lg:border-l">
        <div className="lg:sticky lg:top-14 lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
          <OrderSummary lines={summaryLines} totals={{ subtotal, shipping: method.price, total, vat }} collapsible />
        </div>
      </aside>

      <div className="px-6 py-10 lg:col-start-1 lg:row-start-1 lg:px-12 lg:py-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="font-heading text-[26px] font-medium uppercase tracking-[0.04em] md:text-[30px]">
            Checkout
          </h1>
          <Link
            href="/verdon/cart"
            className="text-[12px] uppercase tracking-[0.1em] text-neutral-500 underline underline-offset-4 hover:text-verdon-green"
          >
            Return to cart
          </Link>
        </div>

        {/* items-start keeps the icon on the first line when the copy wraps */}
        <p className="mt-3 flex items-start gap-2 text-[11px] uppercase leading-relaxed tracking-[0.1em] text-neutral-500">
          <span className="mt-0.5 shrink-0">
            <LockIcon />
          </span>
          Demo checkout — no payment is taken and nothing is sent anywhere
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-9 space-y-10">
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
                label="Email me with news and offers"
              />
            </div>
          </section>

          <section>
            <SectionHeading>Delivery</SectionHeading>
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
            <fieldset>
              <legend className="font-heading text-[15px] font-medium uppercase tracking-[0.1em]">
                Shipping method
              </legend>
              <div className="mt-4 divide-y divide-neutral-300 border border-neutral-300">
                {shippingMethods.map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors ${
                      option.id === methodId ? "bg-verdon-cream" : "hover:bg-neutral-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping-method"
                      value={option.id}
                      checked={option.id === methodId}
                      onChange={() => setMethodId(option.id)}
                      className="size-4 shrink-0 accent-verdon-green"
                    />
                    <span className="flex-1">
                      <span className="block text-[13px]">{option.label}</span>
                      <span className="block text-[11px] text-neutral-500">{option.detail}</span>
                    </span>
                    <span className="shrink-0 text-[13px] tabular-nums">
                      {option.price === 0 ? "Free" : formatPrice(option.price)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </section>

          <section>
            <SectionHeading>Payment</SectionHeading>
            <p className="mt-2 text-[12px] leading-relaxed text-neutral-500">
              Nothing is charged. Card details stay in this browser and are never sent anywhere —
              type any digits you like.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
            <fieldset>
              <legend className="font-heading text-[15px] font-medium uppercase tracking-[0.1em]">
                Billing address
              </legend>
              <div className="mt-4 divide-y divide-neutral-300 border border-neutral-300">
                {[
                  { same: true, label: "Same as delivery address" },
                  { same: false, label: "Use a different billing address" },
                ].map((option) => (
                  <label
                    key={option.label}
                    className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 text-[13px] transition-colors ${
                      option.same === billingSame ? "bg-verdon-cream" : "hover:bg-neutral-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="billing-address"
                      checked={option.same === billingSame}
                      onChange={() => chooseBillingMode(option.same)}
                      className="size-4 shrink-0 accent-verdon-green"
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
              <p role="alert" className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
                {errorCount === 1
                  ? "One field needs your attention before you can place this order."
                  : `${errorCount} fields need your attention before you can place this order.`}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 bg-verdon-green px-6 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-verdon-green-dark"
            >
              <LockIcon />
              Place order · {formatPrice(total)}
            </button>

            <p className="mt-3 text-center text-[11px] leading-relaxed text-neutral-500">
              By placing this demo order you agree to nothing at all. VAT included; free returns
              within 60 days.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
