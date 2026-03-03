# cloudscape-codegen

`cloudscape-codegen` is an OpenCode skill that generates Cloudscape-first React + TypeScript UI code with practical defaults for state handling, accessibility, and page structure.

This repository contains:

- skill definition in `SKILL.md`
- validation artifacts in `checks.md` and `examples/cloudscape-prompts.md`
- a local preview app in `src/` used to sanity-check generated patterns
- portability notes in `PORTING.md`

## Current status

- Skill version: `0.2.0`
- Validation status: `npm run lint` and `npm run build` pass
- Publish posture: ready after final metadata/release workflow checks in `RELEASE_CHECKLIST.md`

## Install locally (OpenCode)

Copy this skill into your local OpenCode skills directory:

```bash
mkdir -p ~/.config/opencode/skills/cloudscape-codegen
cp SKILL.md ~/.config/opencode/skills/cloudscape-codegen/SKILL.md
```

Then reload your OpenCode session and ask for Cloudscape page generation tasks.

## Import in Kiro

Kiro supports Agent Skills and can import this skill from GitHub.

Use this folder path in your repository as the import target:

- `skills/cloudscape-codegen`

In Kiro:

1. Open Agent Steering and Skills.
2. Click `+` and choose Import a skill.
3. Select GitHub and paste the folder URL (or direct `SKILL.md` URL).

After import, the skill is available for auto-activation and as `/cloudscape-codegen`.

## Validate skill quality

Run the prompt suite in `examples/cloudscape-prompts.md` and score with `checks.md`.

Recommended quick checks:

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Repository structure

- `SKILL.md`: main skill instructions and behavior contract
- `checks.md`: manual QA checklist
- `examples/cloudscape-prompts.md`: regression prompt suite
- `PORTING.md`: OpenCode -> Claude Code adaptation notes
- `src/pages/*.tsx`: preview implementations used during skill tuning

## Release workflow

1. Update `SKILL.md` version and changelog entry.
2. Run validation prompts and project checks.
3. Confirm release gates in `RELEASE_CHECKLIST.md`.
4. Tag and publish according to your distribution channel.
