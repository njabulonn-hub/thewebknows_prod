# Font Detection Baseline Review

- `FONT_MEASUREMENT_REPEATS` is set to 2, so the first render often uses fallback metrics while the second render resolves the real font; averaging the pair dilutes the delta and can hide legitimate detections in Blink/WebKit.
- `FONT_DIFFERENCE_THRESHOLD` relies on a fixed absolute delta of 0.5 CSS pixels. Wide glyph samples (e.g. CJK strings) routinely show expected differences <0.5 after device-pixel rounding, causing false negatives. Conversely, small fallback jitter >0.5 creates occasional false positives on HiDPI.
- `metricsDiffer` only checks absolute width/height differences; it ignores proportional change. On large text blocks, a 0.51px delta triggers detection even though the relative shift is <0.1%, amplifying noise.
- Baseline metrics for a fallback/script/style combination are cached indefinitely. If a generic fallback silently resolves to a downloadable font after our first probe (common with font-display: swap), the cached baseline reflects the custom font, so later checks think every candidate matches the fallback.
- `buildFontMetadata` trims only trailing weight/style tokens. Names like `Noto Sans CJK KR Bold` keep regional qualifiers intermixed with weight, so canonical flattening is inconsistent and the same physical font may be reported under multiple labels.
- Script coverage uses a single fallback stack per sample. When the fallback stack matches the primary font (e.g. `sans-serif` backing `Arial`), we never attempt a secondary probe, missing fonts whose metrics closely match the default generic.

Next steps: tighten measurement strategy, refresh the baseline cache opportunistically, and harden canonicalisation so variant names collapse reliably before we report them.


