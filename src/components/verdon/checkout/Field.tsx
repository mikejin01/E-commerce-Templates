"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

// 16px on touch widths: iOS Safari zooms the page when a focused input's font
// is smaller, which is far more disruptive than the size difference
const CONTROL =
  "w-full border bg-white px-3.5 py-3 text-[16px] transition-colors placeholder:text-neutral-400 focus:outline-none lg:text-[13px]";

function borderClass(error?: string) {
  return error ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-verdon-green";
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-heading text-[11px] uppercase tracking-[0.12em] text-neutral-500"
    >
      {children}
      {optional && <span className="ml-1.5 normal-case tracking-normal text-neutral-400">(optional)</span>}
    </label>
  );
}

function ErrorText({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-1.5 text-[11px] text-red-600">
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
  wrapperClassName?: string;
};

export function SelectField({
  id,
  label,
  error,
  options,
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
          className="pointer-events-none absolute right-3.5 top-1/2 size-3 -translate-y-1/2 text-neutral-500"
        >
          <path d="m1.5 2 4.5 4 4.5-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {error && <ErrorText id={`${id}-error`} message={error} />}
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
        className="size-4 shrink-0 accent-verdon-green"
      />
      <label htmlFor={id} className="text-[12px] leading-snug text-neutral-600">
        {label}
      </label>
    </div>
  );
}
