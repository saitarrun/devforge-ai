# SDLC Workflow Plugin

A multi-agent SDLC orchestration system: 20 agents × 6 phases → planning, design, development, testing, deployment, operations.

## Project

- **Type**: Claude Code plugin
- **Version**: 1.0.0
- **Repo**: github.com/saitarrun/sdlc-workflow

## Repository Map

- `agents/` — 20 role-specific agents (product-manager, frontend-engineer, security-architect, etc.)
- `skills/` — 13 knowledge skills (skill-architecture, skill-testing, skill-code-review, etc.)
- `commands/` — 9 orchestrator commands (/sdlc, /sdlc-plan, /sdlc-dev, /sdlc-test, etc.)
- `scripts/` — CLI, install, uninstall, validation helpers
- `README.md` — User documentation and feature overview
- `AGENT_DEVELOPMENT_GUIDE.md` — How to extend agents/skills/commands
- `AGENT_COLLABORATION.md` — Parallel agent execution and shared context

## Commands

- Install: `npm run install-local` or `make install-local`
- Validate: `make validate`
- Uninstall: `make uninstall`

## Agent Conventions

**Frontmatter required**: `name`, `description`, `tools` (comma-separated), `model` (haiku/sonnet/opus)

**Model tiers**: Haiku (templated), Sonnet (development), Opus (architecture/security decisions)

**Tools**: Include only what the agent uses — Read, Write, Edit, Bash, Glob, Grep, WebFetch

Embed book principles (SE@Google QUANTS/INVEST/Testing Pyramid, Architecture: ADR/fitness functions, Pragmatic Programmer DRY/ETC, Clean Code naming/SOLID) in agent bodies.

## Skill Conventions

**Structure**: `skills/skill-name/SKILL.md` (no tools, no model — pure knowledge)

**Frontmatter**: `name`, `description`, `version`

**Content**: Methodology, checklists, reference patterns. Load on-demand, not always-on.

## Extending

**New agent**: See AGENT_DEVELOPMENT_GUIDE.md step 1  
**New skill**: See AGENT_DEVELOPMENT_GUIDE.md step 3  
**New command**: Edit `/commands/sdlc.md` or create phase-specific command  
**New phase**: Add 3–5 agents + skill + command, wire into `/sdlc` orchestrator

## Troubleshooting

- **Plugin not loading**: Validate frontmatter (name/description/tools/model required), run `make validate`, restart session
- **Agent not invoked**: Check command references, verify description matches trigger, review tools field
- **Permission prompts**: Add patterns to `~/.claude/settings.local.json` under `permissions.allow`

## References

Read only when relevant:
- `README.md` — Feature overview, usage examples
- `AGENT_DEVELOPMENT_GUIDE.md` — Anatomy, extending, testing
- `AGENT_COLLABORATION.md` — Parallel execution, shared context
- `INSTALLATION.md` — Setup and distribution

---

**Maintained By**: saitarrun  
**Last Updated**: 2026-06-16
