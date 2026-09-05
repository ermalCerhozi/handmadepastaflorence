// Build-time guard on <title> and <meta name="description"> length.
//
// WHY THIS EXISTS: Layout.astro passes both straight through with no check, and
// the 2026-09-05 GSC review found 24+ rendered titles over 65 characters and
// seven money-page descriptions at 217-237 characters against a ~155 character
// render limit. Google truncated the end off every one of them — on the money
// pages that is where the price sits, and 80 of 112 clicks in that window were
// mobile, where the cut is harsher still.
//
// STRICT since 2026-09-05: the backlog is clear (103 offending pages at
// introduction, now 0), so this throws rather than warns. A build that fails
// here is telling you a new title or description will be truncated by Google —
// shorten it rather than turning this off.
//
// Length is measured as RENDERED WIDTH, not character count: a CJK glyph is
// about twice as wide as a Latin one, so counting characters silently
// under-reported every Chinese page (the zh homepage was 104 characters but
// 208 columns, well past the cut, while reporting as fine).

const STRICT = true;

/** Google renders roughly this many columns before truncating with an ellipsis. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

/**
 * Approximate rendered width in Latin-character columns. CJK, Hiragana,
 * Katakana and Hangul are full-width; everything the site uses otherwise is
 * effectively half-width.
 */
function renderedWidth(text: string): number {
  let n = 0;
  for (const ch of text) n += ch.codePointAt(0)! > 0x2e80 ? 2 : 1;
  return n;
}

const seen = new Set<string>();

/**
 * Warn once per offending page. Called from Layout.astro, so it sees every
 * route in every locale during `astro build`.
 */
export function checkMetaLength(pathname: string, title: string, description: string): void {
  const problems: string[] = [];

  const titleWidth = renderedWidth(title);
  const descriptionWidth = renderedWidth(description);

  if (titleWidth > TITLE_MAX) {
    problems.push(`title ${titleWidth}/${TITLE_MAX} — ${JSON.stringify(title)}`);
  }
  if (descriptionWidth > DESCRIPTION_MAX) {
    problems.push(`description ${descriptionWidth}/${DESCRIPTION_MAX} — ${JSON.stringify(description.slice(0, 80) + '…')}`);
  }
  if (problems.length === 0) return;

  const key = pathname + problems.join('|');
  if (seen.has(key)) return;
  seen.add(key);

  const message = `[meta-length] ${pathname}\n    ${problems.join('\n    ')}`;
  if (STRICT) throw new Error(message);
  console.warn(message);
}
