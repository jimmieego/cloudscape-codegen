# Release Checklist

Use this checklist before publishing `cloudscape-codegen`.

## 1) Metadata and docs

- `SKILL.md` has an updated semantic version
- `README.md` describes install, validation, and release flow
- `CHANGELOG.md` includes release notes for the target version
- `LICENSE` is present and intentionally selected

## 2) Functional quality

- Prompt suite in `examples/cloudscape-prompts.md` has been run
- Outputs satisfy `checks.md` quality criteria
- No invented Cloudscape APIs or unsupported props are produced

## 3) Project hygiene

- `npm run lint` passes
- `npm run build` passes
- No secrets or environment-specific credentials are present
- Release artifacts exclude local-only directories (`node_modules`, `dist`)

## 4) Publish decision

- Version tag prepared (`vX.Y.Z`)
- Distribution target confirmed (repo release, internal registry, or skill bundle)
- Rollback plan documented (previous known-good skill version)
