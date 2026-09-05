// Build-time guard on <title> and <meta name="description"> length.
//
// WHY THIS EXISTS: Layout.astro passes both straight through with no check, and
// the 2026-09-05 GSC review found 24+ rendered titles over 65 characters and
// seven money-page descriptions at 217-237 characters against a ~155 character
// render limit. Google truncated the end off every one of them — on the money
// pages that is where the price sits, and 80 of 112 clicks in that window were
// mobile, where the cut is harsher still.
//
// This warns rather than throws: failing the build on copy length would block
// deploys for a cosmetic issue, and several offenders are pre-existing. Flip
// STRICT to true once the backlog is clear to keep it that way.
//
// KNOWN LIMITATION: this counts characters, not rendered width, so it
// under-reports Chinese. A CJK glyph renders roughly twice as wide as a Latin
// one, meaning a 40-character zh title is already at the Latin 80 mark. The zh
// locale currently reports zero offenders for that reason, not because it is
// clean. Halve the limits before trusting a zh pass.

const STRICT = false;

/** Google renders roughly this much before truncating with an ellipsis. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

const seen = new Set<string>();

/**
 * Warn once per offending page. Called from Layout.astro, so it sees every
 * route in every locale during `astro build`.
 */
export function checkMetaLength(pathname: string, title: string, description: string): void {
  const problems: string[] = [];

  if (title.length > TITLE_MAX) {
    problems.push(`title ${title.length}/${TITLE_MAX} — ${JSON.stringify(title)}`);
  }
  if (description.length > DESCRIPTION_MAX) {
    problems.push(`description ${description.length}/${DESCRIPTION_MAX} — ${JSON.stringify(description.slice(0, 80) + '…')}`);
  }
  if (problems.length === 0) return;

  const key = pathname + problems.join('|');
  if (seen.has(key)) return;
  seen.add(key);

  const message = `[meta-length] ${pathname}\n    ${problems.join('\n    ')}`;
  if (STRICT) throw new Error(message);
  console.warn(message);
}
