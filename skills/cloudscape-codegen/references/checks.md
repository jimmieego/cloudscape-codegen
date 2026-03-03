# Manual QA Checklist

Use this checklist to validate outputs produced by `cloudscape-codegen`.

## 1) Cloudscape correctness

- Cloudscape components are preferred over generic HTML wrappers
- Imports match actual Cloudscape packages/components
- No invented component props or made-up APIs

## 2) Layout and UX quality

- Page structure is clear (`AppLayout` / `ContentLayout` where appropriate)
- Spacing and grouping are consistent (`SpaceBetween`, `Container`, headers)
- Actions are visible, discoverable, and logically placed

## 3) State handling

- Loading state present and visible
- Empty state has clear guidance/action
- Error state communicates recovery path
- Success feedback is shown where relevant

## 4) Accessibility

- Inputs have labels and meaningful validation text
- Interactive controls are keyboard accessible
- Status/feedback is not color-only
- Semantic headings and descriptive action labels are used

## 5) Responsiveness

- UI remains usable on narrow/mobile widths
- Table/list patterns degrade gracefully
- No clipped or unusable controls in common breakpoints

## 6) Data realism and boundaries

- Placeholder data is clearly indicated
- No fabricated production endpoints or credentials
- Unknown backend requirements are called out as assumptions

## 7) Output quality bar

- Code is runnable TypeScript/TSX
- Response includes assumptions when requirements are missing
- Output is concise, practical, and integration-ready
