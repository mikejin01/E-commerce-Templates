"use client";

import { Field, SelectField, StaticField } from "@/components/elburg/checkout/Field";
import { shipsToCountry, states } from "@/data/elburg/checkout";
import { formatZip, type Address } from "@/lib/elburg/checkout";

/**
 * Shared by the delivery and billing blocks. `prefix` namespaces both the DOM
 * ids and the error keys, and drives the `autocomplete` section token so the
 * browser does not offer a delivery address for a billing field.
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
    /* minmax(0,…) on the tracks — standing rule 5 */
    <div className="grid gap-4 sm:grid-cols-[repeat(2,minmax(0,1fr))]">
      <StaticField
        label="Country / region"
        value={shipsToCountry}
        note={
          prefix === "shipping" ? "This storefront delivers within the United States." : undefined
        }
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
        placeholder="Street and number"
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
        id={id("city")}
        label="City"
        value={address.city}
        error={error("city")}
        autoComplete={`${section} address-level2`}
        onChange={(event) => onChange("city", event.target.value)}
      />
      <Field
        id={id("zip")}
        label="ZIP code"
        inputMode="numeric"
        placeholder="10012"
        value={address.zip}
        error={error("zip")}
        autoComplete={`${section} postal-code`}
        onChange={(event) => onChange("zip", formatZip(event.target.value))}
      />
      <SelectField
        id={id("state")}
        label="State"
        options={states}
        placeholder="Choose a state"
        value={address.state}
        error={error("state")}
        autoComplete={`${section} address-level1`}
        onChange={(event) => onChange("state", event.target.value)}
        wrapperClassName="sm:col-span-2"
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
