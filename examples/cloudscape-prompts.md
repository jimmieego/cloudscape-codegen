# Cloudscape Skill Prompt Suite

Use these prompts to evaluate output consistency and quality for `cloudscape-codegen`.

## 1) Dashboard + Table

Prompt:

"Build a Cloudscape resources page with a header, summary cards, and a table of EC2-like instances. Include search, pagination, and row actions."

Expected behavior:

- Uses `AppLayout`/`ContentLayout` and clear page hierarchy
- Uses `Table` with filter/search and pagination controls
- Includes loading/empty/error states
- Uses Cloudscape buttons/actions and status indicators

## 2) Create/Edit Form

Prompt:

"Create a Cloudscape form for adding a new project with name, owner, environment, tags, and description. Include inline validation and submit/cancel actions."

Expected behavior:

- Uses `Form` + `FormField` with typed local state
- Includes required field messaging and helper text
- Buttons are placed and labeled consistently
- Mentions or demonstrates success/error submission handling

## 3) Multi-step Wizard

Prompt:

"Generate a Cloudscape wizard for creating an API key policy: details, permissions, review, and confirmation."

Expected behavior:

- Uses `Wizard` with clearly named steps
- Preserves state across steps and validates before advance
- Review step summarizes user selections
- Confirmation/flash feedback shown on completion

## 4) Details Page

Prompt:

"Create a Cloudscape details page for a database cluster with breadcrumbs, metadata sections, health indicators, and side actions."

Expected behavior:

- Uses `BreadcrumbGroup` and structured `Container` sections
- Uses `StatusIndicator`/`Alert` for health and warnings
- Includes action group and sensible layout spacing
- Handles missing data and loading gracefully

## 5) Chat-style UI

Prompt:

"Build a Cloudscape chat assistant page with a message list, input composer, and optimistic UI while sending messages."

Expected behavior:

- Uses Cloudscape components for layout and controls
- Manages pending/send error states and disabled actions
- Keeps interaction accessible and keyboard-friendly
- Does not invent backend; uses clean interface boundaries

## Scoring rubric (quick)

- `Component correctness`: proper Cloudscape component usage
- `State completeness`: loading/empty/error included
- `A11y quality`: labels, messages, keyboard-safe flows
- `Responsiveness`: usable layout on smaller screens
- `Project realism`: no fake APIs or unsupported props
