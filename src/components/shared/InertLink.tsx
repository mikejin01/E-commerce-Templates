/**
 * A link-shaped control for destinations this demo does not build.
 *
 * Rendered as a `<button>` rather than `<a href="#">` deliberately: a bare hash
 * href scrolls the page to the top and pushes a history entry, which reads as a
 * broken link. This navigates nowhere and says so on hover.
 */
export default function InertLink({
  children,
  className = "",
  label,
  title = "Not part of this demo",
}: {
  children: React.ReactNode;
  className?: string;
  /** accessible name, when the visible content is an icon */
  label?: string;
  title?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={label}
      className={`cursor-default text-left ${className}`}
    >
      {children}
    </button>
  );
}
