# Porting Guide: OpenCode -> Claude Code

This project is authored OpenCode-first. Use this guide to adapt it for Claude Code while preserving behavior.

## Keep identical

- Core instruction sections and decision rules in `SKILL.md`
- Cloudscape component mapping and quality gates
- Reference-only policy for `aws-samples/cloudscape-examples`
- Default stack assumptions (React + TypeScript + Vite)

## Adapt for Claude Code packaging

- Adjust frontmatter/metadata fields to Claude skill format requirements
- Keep trigger language explicit so auto-routing is predictable
- Preserve concise output contract (`Approach`, `Code`, `Assumptions`, `Follow-ups`)

## Validation after porting

Run the prompt suite in `examples/cloudscape-prompts.md` and verify:

- outputs remain Cloudscape-first
- state handling includes loading/empty/error
- no invented props/APIs are introduced
- assumptions are explicit and minimal

## Recommended workflow

1. Copy `SKILL.md` as baseline into Claude skill location.
2. Update only wrapper metadata and any Claude-specific headers.
3. Re-run all 5 prompts from the suite.
4. Diff results against OpenCode behavior and tighten wording where needed.

## Note on external references

Links to AWS sample projects are intentionally reference-only:

- `https://github.com/aws-samples/cloudscape-examples`

Do not embed or vendor sample code unless you intentionally change licensing/process policy later.
