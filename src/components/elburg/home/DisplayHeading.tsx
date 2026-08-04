/**
 * The reference sets its big band headlines as SVG artwork — typographic
 * drawings that carry its own wordmark's letterforms, so none of it can ship
 * (standing rule 9). They are rebuilt here as live type: Newsreader, one line
 * per word group, with the emphasised line in italic. Mixed-case and uppercase
 * both appear on the reference; `upper` picks between them.
 */
export default function DisplayHeading({
  lines,
  upper = false,
  className = "",
}: {
  lines: { text: string; italic?: boolean }[];
  upper?: boolean;
  className?: string;
}) {
  return (
    /* the lines step in as they go down, as the reference's artwork does, so
       the group reads as one phrase rather than a left-aligned stack */
    <h2 className={`leading-[0.95] ${upper ? "uppercase" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span
          key={line.text}
          className={`block ${line.italic ? "italic" : ""}`}
          style={{ paddingLeft: `${i * 0.55}em` }}
        >
          {line.text}
        </span>
      ))}
    </h2>
  );
}
