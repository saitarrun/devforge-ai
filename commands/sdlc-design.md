---
description: Phase 2 — Design & Prototyping. Spawns ux-researcher, ui-ux-designer, accessibility-engineer, technical-writer.
argument-hint: "[--parallel]"
tools: Agent
model: sonnet
---

# /sdlc-design — Phase 2: Design & Prototyping

Create user research, wireframes, accessibility specs, and API documentation.

## Agents Invoked (4 total)

**Sequential order:**
1. ux-researcher (needs business-analyst requirements)
2. ui-ux-designer (needs ux-researcher journeys)
3. accessibility-engineer (parallel with next, needs ui-ux-designer)
4. technical-writer (parallel with above, needs architecture)

---

## Agent Invocation

### Read Phase 1 Artifacts First
- `01-requirements.md` — user personas + stories
- `01-architecture.md` — tech stack, API design
- `grill-summary.md` — user scale, constraints

---

**Agent 1: ux-researcher** (FIRST)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "UX Researcher (Phase 2) — User journeys, personas, research",
  prompt: "[01-requirements.md + grill-summary.md]
  
  Skills: skill-ux-design, skill-prototype
  
  Using user personas + requirements:
  1. Create 02-user-journeys.md with:
     - Persona details (goals, pain points, context)
     - User journey maps (happy path + error paths)
     - Competitive analysis (what competitors do)
     - User research insights
     - Key moments of truth
  2. Each persona should have:
     - Who they are, what they want
     - Current workflow (before solution)
     - Desired workflow (with your solution)
  3. Save to: ./projects/<feature-name>/docs/02-user-journeys.md"
})
```

**Wait for ux-researcher to complete.**

---

**Agent 2: ui-ux-designer** (SECOND — needs user journeys)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "UI/UX Designer (Phase 2) — Wireframes, design system, component specs",
  prompt: "[02-user-journeys.md + 01-architecture.md]
  
  Skills: skill-ux-design, skill-prototype, skill-accessibility
  
  Using journey maps + architecture:
  1. Create 02-wireframes.md with:
     - Wireframes (ASCII art or descriptions) for each screen
     - Component specifications (Button, Form, Modal, etc.)
     - Design system (colors, typography, spacing)
     - Interaction flows (button clicks, form submission)
     - States (normal, hover, error, loading, disabled)
  2. Component specs should include:
     - Props/inputs
     - Visual states
     - Accessibility attributes
  3. Save to: ./projects/<feature-name>/docs/02-wireframes.md"
})
```

**Wait for ui-ux-designer to complete.**

---

**NOW SPAWN IN PARALLEL (both depend on ui-ux-designer):**

**Agent 3: accessibility-engineer** (PARALLEL)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Accessibility Engineer (Phase 2) — WCAG AA compliance audit",
  prompt: "[02-wireframes.md + 01-requirements.md]
  
  Skills: skill-accessibility, skill-ux-design, skill-playwright
  
  Using wireframe designs:
  1. Create accessibility-audit.md with:
     - WCAG 2.1 AA compliance checklist
     - Component accessibility requirements:
       - Keyboard navigation (all interactive elements)
       - Screen reader support (labels, ARIA)
       - Color contrast (text readability)
       - Focus indicators (visible when tabbing)
     - Automated testing approach
     - Manual testing scenarios
  2. For each component:
     - Required ARIA attributes
     - Keyboard shortcuts
     - Screen reader announcements
  3. Save to: ./projects/<feature-name>/docs/accessibility-audit.md"
})
```

**Agent 4: technical-writer** (PARALLEL with accessibility-engineer)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Technical Writer (Phase 2) — API documentation outline",
  prompt: "[01-architecture.md + 02-wireframes.md + 01-requirements.md]
  
  Skills: skill-documentation, skill-developer-relations, skill-api-design, skill-knowledge-management
  
  Using architecture + design:
  1. Create api-documentation.md outline with:
     - API overview (what it does, who uses it)
     - Authentication (how to auth)
     - Endpoints (for each API):
       - Method + path
       - Request format (example JSON)
       - Response format (example JSON)
       - Error codes
       - Code examples (curl, JavaScript)
     - Data models (schemas for request/response)
     - Rate limits + quotas
     - SDKs (if any)
     - Webhook events
  2. Structure ready for Phase 3 developers to fill in actual endpoints
  3. Save to: ./projects/<feature-name>/docs/api-documentation.md"
})
```

**Wait for both accessibility-engineer and technical-writer to complete.**

---

## Display Completion

```
✅ Phase 2 Complete! (4 agents invoked)

📁 Design artifacts created:
  ./projects/<feature-name>/docs/
    ├── 02-user-journeys.md         (ux-researcher)
    ├── 02-wireframes.md            (ui-ux-designer)
    ├── accessibility-audit.md      (accessibility-engineer)
    └── api-documentation.md        (technical-writer)

✅ Agents completed:
  1. ux-researcher          → user journeys + personas
  2. ui-ux-designer         → wireframes + design system
  3. accessibility-engineer → WCAG AA compliance specs
  4. technical-writer       → API documentation outline

Design is complete. Ready for Phase 3 development.

Next: Run /sdlc-dev for Phase 3 (Development & Coding)
```

---

## CRITICAL RULES

✅ UX researcher MUST map all user journeys from personas
✅ UI designer MUST create component specs for Phase 3 engineers
✅ Accessibility engineer MUST verify WCAG AA compliance
✅ Technical writer MUST create API spec outline (filled in Phase 3)
