/**
 * Press quotes for the demo. Both halves are invented: the outlets do not exist
 * and the quotes were written for this build.
 *
 * This replaces the real outlets and their real published quotes that Session 6
 * pulled in. That change was made for a good reason — attributing invented copy
 * to a real publication was the wrong default — and inventing *both* halves keeps
 * that principle while removing six verbatim sentences that lead straight back to
 * the brand this demo is modelled on.
 *
 * There is no `logo` field on purpose. The outlet renders as a Jost wordmark, so
 * the band ships no publication artwork.
 */

export type PressQuote = {
  outlet: string;
  quote: string;
};

export const pressQuotes: PressQuote[] = [
  {
    outlet: "Gearworks",
    quote: "VERDON put a genuinely technical lens in a frame you would happily wear to dinner",
  },
  {
    outlet: "Basecamp Quarterly",
    quote: "The Roamers came up the mountain with us and went straight back out again that evening",
  },
  {
    outlet: "Ridge & River",
    quote: "Alpine styling that has not been watered down on its way to the high street",
  },
  {
    outlet: "The Long Way",
    quote: "Light enough to forget you have them on, sharp enough to notice at the edges",
  },
  {
    outlet: "Northbound",
    quote: "The clearest lens we tested at anywhere near this price",
  },
  {
    outlet: "Summit Report",
    quote: "Classic shapes and modern optics — a rare pairing, and done properly here",
  },
];
