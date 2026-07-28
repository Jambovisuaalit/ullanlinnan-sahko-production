# Responsive audit 390 px V01

## Confirmed root causes

- `.media-frame` combined an intrinsic aspect ratio with mobile minimum heights without an explicit fluid width. On narrow containers this could transfer a minimum inline size wider than the grid track.
- `.honeypot` was positioned at `left: -10000px`, which can affect scroll-width calculations in some mobile engines.
- The mobile action bar needed explicit viewport, child and SVG constraints even though its source grid already used flexible fractional columns.

## Misinterpreted diagnostics

- A computed grid value of `195px 195px` at a 390 px viewport is the expected computed result of `repeat(2, minmax(0, 1fr))`; it is not a hard-coded source definition.
- Next.js App Router inline `self.__next_f.push` scripts are normal React Server Components hydration payloads, not empty script injection failures.

## Implemented guardrails

- Fluid width and shrinkability for media frames, brand panels and grid wrappers.
- Clip-path-based honeypot hiding inside document coordinates.
- Viewport-constrained mobile action bar with 20–22 px icons and non-wrapping labels.
- New Playwright viewport at 390 × 844 px.
- Bounding-box regression checks for media surfaces, action bar, links, icons and honeypot.
