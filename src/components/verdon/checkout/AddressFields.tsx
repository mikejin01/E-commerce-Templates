"use client";

import { Field, SelectField } from "@/components/verdon/checkout/Field";
import { countries } from "@/data/verdon/checkout";
import type { Address } from "@/lib/verdon/checkout";

/**
 * Shared by the shipping and billing blocks. `prefix` namespaces both the DOM
 * ids and the error keys, and drives the `autocomplete` section token so the
 * browser does not offer a shipping address for a billing field.
 */
export default function AddressFields({
  prefix,
  address,
  errors,
  onChange,
  showPhone = false,
}: {
  prefix: "shipping" | "billing";
  address: Address;
  errors: Record<string, string>;
  onChange: (field: keyof Address, value: string) => void;
  showPhone?: boolean;
}) {
  const section = prefix === "shipping" ? "shipping" : "billing";
  const id = (field: keyof Address) => `${prefix}-${field}`;
  const error = (field: keyof Address) => errors[`${prefix}.${field}`];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SelectField
        id={id("country")}
        label="Country / region"
        options={countries}
        value={address.country}
        error={error("country")}
        autoComplete={`${section} country-name`}
        onChange={(event) => onChange("country", event.target.value)}
        wrapperClassName="sm:col-span-2"
      />

      <Field
        id={id("firstName")}
        label="First name"
        value={address.firstName}
        error={error("firstName")}
        autoComplete={`${section} given-name`}
        onChange={(event) => onChange("firstName", event.target.value)}
      />
      <Field
        id={id("lastName")}
        label="Last name"
        value={address.lastName}
        error={error("lastName")}
        autoComplete={`${section} family-name`}
        onChange={(event) => onChange("lastName", event.target.value)}
      />

      <Field
        id={id("address")}
        label="Address"
        placeholder="Street and house number"
        value={address.address}
        error={error("address")}
        autoComplete={`${section} address-line1`}
        onChange={(event) => onChange("address", event.target.value)}
        wrapperClassName="sm:col-span-2"
      />
      <Field
        id={id("apartment")}
        label="Apartment, suite, etc."
        optional
        value={address.apartment}
        autoComplete={`${section} address-line2`}
        onChange={(event) => onChange("apartment", event.target.value)}
        wrapperClassName="sm:col-span-2"
      />

      <Field
        id={id("postalCode")}
        label="Postal code"
        value={address.postalCode}
        error={error("postalCode")}
        autoComplete={`${section} postal-code`}
        onChange={(event) => onChange("postalCode", event.target.value)}
      />
      <Field
        id={id("city")}
        label="City"
        value={address.city}
        error={error("city")}
        autoComplete={`${section} address-level2`}
        onChange={(event) => onChange("city", event.target.value)}
      />

      {showPhone && (
        <Field
          id={id("phone")}
          label="Phone"
          optional
          type="tel"
          inputMode="tel"
          placeholder="For delivery updates"
          value={address.phone}
          autoComplete={`${section} tel`}
          onChange={(event) => onChange("phone", event.target.value)}
          wrapperClassName="sm:col-span-2"
        />
      )}
    </div>
  );
}
