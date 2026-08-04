"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

/**
 * The checkout's form controls, in ELBURG's voice: condensed caps labels,
 * hairline ink borders that go solid on focus, and italic serif for anything
 * secondary — the same pair the buy box and the cart already use.
 */

const CONTROL =
  "w-full border bg-white px-3.5 py-3 text-[15px] transition-colors placeholder:italic placeholder:text-elburg-ink/35 focus:outline-none";

function borderClass(error?: string) {
  return error
    ? "border-elburg-accent focus:border-elburg-accent"
    : "border-elburg-ink/25 focus:border-elburg-ink";
}

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: string;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-heading text-[12px] font-medium uppercase tracking-[0.12em] text-elburg-ink/60"
    >
      {children}
      {optional && (
        <span className="ml-1.5 font-sans text-[12px] normal-case italic tracking-normal text-elburg-ink/45">
          optional
        </span>
      )}
    </label>
  );
}

function ErrorText({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-1.5 text-[13px] italic text-elburg-accent">
      {message}
    </p>
  );
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  wrapperClassName?: string;
};

export function Field({ id, label, error, optional, wrapperClassName, ...input }: FieldProps) {
  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${CONTROL} ${borderClass(error)}`}
        {...input}
      />
      {error && <ErrorText id={`${id}-error`} message={error} />}
    </div>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  error?: string;
  options: string[];
  /** shown as a disabled first option while the value is empty */
  placeholder?: string;
  wrapperClassName?: string;
};

export function SelectField({
  id,
  label,
  error,
  options,
  placeholder,
  wrapperClassName,
  ...select
}: SelectFieldProps) {
  return (
    <div className={wrapperClassName}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${CONTROL} ${borderClass(error)} appearance-none pr-10`}
          {...select}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 12 8"
          aria-hidden
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="pointer-events-none absolute right-3.5 top-1/2 size-3 -translate-y-1/2 text-elburg-ink/50"
        >
          <path d="m1.5 2 4.5 4 4.5-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && <ErrorText id={`${id}-error`} message={error} />}
    </div>
  );
}

/**
 * A field-shaped read-only row. The `en-us` storefront ships within one
 * country, so the country is stated rather than chosen — but it still belongs
 * in the address block, where a shopper looks for it.
 */
export function StaticField({
  label,
  value,
  note,
  wrapperClassName,
}: {
  label: string;
  value: string;
  note?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={wrapperClassName}>
      <p className="mb-1.5 font-heading text-[12px] font-medium uppercase tracking-[0.12em] text-elburg-ink/60">
        {label}
      </p>
      <p className="border border-dashed border-elburg-ink/20 bg-elburg-ink/[0.03] px-3.5 py-3 text-[15px]">
        {value}
      </p>
      {note && <p className="mt-1.5 text-[13px] italic text-elburg-ink/55">{note}</p>}
    </div>
  );
}

export function Checkbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 shrink-0 accent-[#2e2e2b]"
      />
      <label htmlFor={id} className="text-[14px] leading-snug text-elburg-ink/75">
        {label}
      </label>
    </div>
  );
}
