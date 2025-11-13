# Font Detection Update Report

## Summary of Changes
- Increased `FONT_MEASUREMENT_REPEATS` to 3 and introduced combined absolute/relative thresholds (`FONT_DIFFERENCE_ABSOLUTE_THRESHOLD`, `FONT_DIFFERENCE_RELATIVE_THRESHOLD`, `FONT_DIFFERENCE_RELATIVE_OVERRIDE`) for more stable canvas metrics.
- Added a baseline refresh path so fallback measurements are re-sampled when a probe barely differs from the cached metrics, preventing swap-loaded fonts from poisoning the cache.
- Updated `metricsDiffer` to factor relative deltas alongside absolute pixel shifts, eliminating spurious matches caused by sub-pixel jitter on large glyph samples.
- Hardened `buildFontMetadata` canonicalisation by carving out trailing style/weight suffixes (including hyphenated and concatenated forms) and collapsing known variant descriptors when a base family exists.
- Introduced `analysis/font-detection-notes.md` to track false-positive/negative heuristics and the outstanding risks of measurement-based detection.

## Validation Harness
- Added `scripts/validate-font-detection.js`, a Puppeteer-based check that navigates to a running instance of the site, waits for the UI to populate font results, and optionally diffs them against an expected list.
- Usage:
  - Install Puppeteer once: `npm install --save-dev puppeteer`
  - Run against a live build: `node scripts/validate-font-detection.js --url http://localhost:8080/ --expected fixtures/expected-fonts.txt --output reports/font-audit.json --strict`
  - Flags: `--headful` shows the browser window for debugging; omit `--expected` to simply snapshot the detected list.
- The script outputs the detected vs. tested counts, enumerates missing/unexpected fonts when provided, and writes a JSON summary if `--output` is set (suitable for CI artifacts).

## Maintaining the Font Sample
- The candidate universe remains defined in `app.js` across `RAW_FONT_CANDIDATES`, `WINDOWS_SYSTEM_FONT_CANDIDATES`, and `WINDOWS_FOD_FONT_CANDIDATES`.
- When adding or removing families:
  - Keep names ASCII-only and one per line to preserve diff clarity.
  - Prefer base families (e.g., `Segoe UI`) and allow the metadata reducer to collapse per-weight variants like `Segoe UI Bold`.
  - Re-run the validation harness with an updated expected list sourced from a known machine before committing changes.
- Document any observed false positives/negatives in `analysis/font-detection-notes.md` so future adjustments can target proven edge cases.

## Outstanding Risks & Follow-up
- Measurement-based detection can still misclassify families whose glyph metrics align closely with generic fallbacks; consider layering Local Font Access when browsers expose it safely.
- The harness relies on Puppeteer; CI environments without Chrome/Chromium must install the dependency or skip the check.
- Network-dependent diagnostics in `collectData` may prolong harness runs when offline; provide a dedicated lightweight test page if perf becomes an issue.


