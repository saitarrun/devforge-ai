---
description: Phase 3 — Development & Coding. Spawns 9 agents with 4 parallel groups: backend-engineer, frontend+mobile, database, fullstack-engineer.
argument-hint: "[--stack backend,frontend,database,mobile] [--parallel]"
tools: Agent
model: haiku
---

# /sdlc-dev — Phase 3: Development & Coding

Scaffold and implement frontend, backend (microservices), database, and mobile code with full test coverage.

## Agents Invoked (9 total)

**Parallel groups:**
1. backend-engineer (blocks database, fullstack)
2. frontend-engineer + mobile-developer (parallel, need ui-ux-designer)
3. database-engineer (waits for backend scaffold, parallel with frontend)
4. fullstack-engineer (waits for backend + frontend)

---

## Agent Invocation

### Read Phase 1 & 2 Artifacts First
- `01-architecture.md` — tech stack, API contracts, microservices design
- `01-requirements.md` — user stories, acceptance criteria
- `02-wireframes.md` — UI component specs
- `grill-summary.md` — scale requirements

---

**Agent 1: backend-engineer** (FIRST — BLOCKS others)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Backend Engineer (Phase 3) — Microservices scaffold + API implementation",
  prompt: "[01-architecture.md + 01-requirements.md + grill-summary.md]
  
  Skills: skill-code-standards, skill-code-quality, skill-architecture, skill-zoom-out
  
  Using architecture design + requirements:
  1. SCAFFOLD microservices structure:
     - Create ./projects/<feature-name>/backend/services/api-gateway/src/
       - Express/Fastify app
       - Route all frontend requests to domain services
       - Error handling middleware
     - Create ./projects/<feature-name>/backend/services/<domain-service>/src/ (one per domain from architecture)
       - Controllers (request handling)
       - Services (business logic)
       - Models (data structures)
       - Routes (API endpoints)
  
  2. Implement API endpoints per architecture:
     - RESTful routes matching 01-requirements.md user stories
     - Request/response formats from API spec
     - Error handling + validation
     - Unit tests for each endpoint (Jest >80% coverage)
  
  3. Database connection setup (no actual queries yet — database-engineer does migrations):
     - Connection pool configured
     - ORM setup (Prisma, TypeORM)
  
  4. Each service gets:
     - package.json
     - src/ directory structure
     - tests/ directory with unit tests
     - Dockerfile (multi-stage build)
  
  5. Create backend-implementation.md summarizing all services + endpoints
  
  Output: ./projects/<feature-name>/backend/services/"
})
```

**Wait for backend-engineer to complete (BLOCKS next group).**

---

**NOW SPAWN IN PARALLEL (Group 2: Frontend + Mobile):**

**Agent 2: frontend-engineer** (PARALLEL — waits for ui-ux-designer)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Frontend Engineer (Phase 3) — React/Vue component library + pages",
  prompt: "[02-wireframes.md + 01-requirements.md + 01-architecture.md + backend-implementation.md]
  
  Skills: skill-code-standards, skill-code-quality, skill-architecture, skill-zoom-out
  
  Using wireframe specs + architecture:
  1. Create frontend structure:
     - ./projects/<feature-name>/frontend/src/components/
       - Button, Form, Modal, Card, etc. (from design system)
     - ./projects/<feature-name>/frontend/src/pages/
       - Home, Login, Dashboard, etc. (from wireframes)
     - ./projects/<feature-name>/frontend/src/services/
       - API client (calls api-gateway)
     - ./projects/<feature-name>/frontend/src/hooks/
       - useAuth, useFetch, etc.
     - ./projects/<feature-name>/frontend/src/types/
       - TypeScript interfaces matching backend schemas
  
  2. Implement all components from wireframes:
     - Component props matching specs
     - Event handlers (onClick, onChange, etc.)
     - State management (Redux, Zustand, or Context API)
  
  3. Integrate with backend API (api-gateway):
     - API client methods for each endpoint
     - Error handling (show toast/snackbar on errors)
     - Loading states (spinners, skeleton screens)
  
  4. Write unit + integration tests:
     - Component render tests (React Testing Library >80% coverage)
     - API integration tests
     - User interaction tests (clicking, form submission)
  
  5. Accessibility:
     - Keyboard navigation
     - ARIA attributes
     - Screen reader support
  
  Output: ./projects/<feature-name>/frontend/src/"
})
```

**Agent 3: mobile-developer** (PARALLEL with frontend-engineer)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Mobile Developer (Phase 3) — React Native or native iOS/Android",
  prompt: "[02-wireframes.md + 01-requirements.md + 01-architecture.md + backend-implementation.md]
  
  Skills: skill-code-standards, skill-code-quality, skill-architecture, skill-zoom-out
  
  Using wireframes + architecture (mobile-adapted):
  1. Create mobile app structure:
     - ./projects/<feature-name>/mobile/src/screens/
       - Screen components (adapted from wireframes)
     - ./projects/<feature-name>/mobile/src/components/
       - Reusable mobile components
     - ./projects/<feature-name>/mobile/src/services/
       - API client (calls api-gateway)
       - Local storage, offline sync
     - ./projects/<feature-name>/mobile/src/navigation/
       - Stack, tab, drawer navigation
  
  2. Implement all screens from wireframes (mobile UX):
     - Touch-friendly interactions
     - Mobile form inputs
     - Navigation patterns
  
  3. Integrate with backend API:
     - API client with retry logic
     - Handle network errors gracefully
     - Offline support (local storage, sync when online)
  
  4. Write tests:
     - Component tests >80% coverage
     - Integration tests with API mocks
  
  Output: ./projects/<feature-name>/mobile/src/"
})
```

**Wait for both frontend-engineer and mobile-developer to complete.**

---

**NOW SPAWN: Database Engineer (waits for backend scaffold, can run parallel with frontend):**

Actually, since backend-engineer already completed, spawn database-engineer now:

**Agent 4: database-engineer** (WAITS for backend scaffold)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Database Engineer (Phase 3) — Schema design + migrations",
  prompt: "[01-architecture.md + backend-implementation.md + 01-requirements.md]
  
  Skills: skill-code-standards, skill-code-quality, skill-architecture
  
  Using microservices design + backend services:
  1. For each backend service, design database schema:
     - Tables (entities from requirements)
     - Columns (fields with types, constraints)
     - Indexes (on foreign keys, frequently queried fields)
     - Foreign key relationships (internal to service only)
  
  2. Create migrations (versioned SQL):
     - ./projects/<feature-name>/backend/services/<service>/migrations/
       - 001-initial-schema.sql
       - Add constraints, indexes
  
  3. Create seed data for testing:
     - ./projects/<feature-name>/backend/services/<service>/seeds/
       - sample users, orders, etc.
  
  4. Document schema:
     - Entity relationship diagram
     - Column descriptions
     - Query optimization notes
  
  5. Connection string setup (no hardcoded secrets):
     - Environment variables documented
  
  Output: ./projects/<feature-name>/backend/services/<service>/migrations/"
})
```

**Wait for database-engineer to complete.**

---

**NOW SPAWN: Fullstack Engineer (waits for backend + frontend complete):**

**Agent 5: fullstack-engineer** (FINAL — waits for all above)
```
Spawn: Agent({
  subagent_type: "fork",
  description: "Fullstack Engineer (Phase 3) — Integration + end-to-end tests",
  prompt: "[backend-implementation.md + frontend output + database structure + 01-requirements.md]
  
  Skills: skill-code-standards, skill-code-quality, skill-architecture, skill-zoom-out
  
  Using all components (backend, frontend, database):
  1. Verify end-to-end integration:
     - Frontend → API Gateway → Domain Services
     - Each user story flow works end-to-end
  
  2. Write integration tests:
     - Backend + frontend integration tests
     - API contract tests (request/response match schema)
     - Database integration tests
  
  3. Write E2E tests (Playwright/Cypress):
     - Critical user paths (login, create order, checkout, etc.)
     - Error scenarios (invalid input, API errors)
  
  4. Performance testing:
     - Load testing (concurrent requests)
     - Response time profiling
  
  5. Create 03-implementation.log:
     - All services scaffolded + endpoints count
     - Frontend component count + test coverage
     - Database schema summary
     - Test coverage report (>80%)
     - Integration test results
  
  Output: ./projects/<feature-name>/docs/03-implementation.log"
})
```

**Wait for fullstack-engineer to complete.**

---

## Display Completion

```
✅ Phase 3 Complete! (9 agents invoked)

📁 Code created:
  ./projects/<feature-name>/
    ├── frontend/src/
    │   ├── components/       [n components]
    │   ├── pages/            [n pages]
    │   ├── services/         [API client]
    │   ├── hooks/
    │   └── types/
    ├── backend/services/
    │   ├── api-gateway/src/  [routing]
    │   ├── users-service/src/          [example]
    │   │   ├── controllers/
    │   │   ├── services/
    │   │   └── migrations/
    │   ├── orders-service/src/         [example]
    │   │   ├── controllers/
    │   │   ├── services/
    │   │   └── migrations/
    │   └── [other services]/
    ├── mobile/src/
    │   ├── screens/
    │   ├── components/
    │   ├── services/
    │   └── navigation/
    └── docs/
        └── 03-implementation.log

✅ Agents completed:
  1. backend-engineer       → API scaffold + microservices (blocks others)
  2. frontend-engineer      → React components + pages (parallel)
  3. mobile-developer       → Mobile app (parallel with frontend)
  4. database-engineer      → Schema + migrations
  5. fullstack-engineer     → Integration + E2E tests

Code Quality:
  ✅ >80% unit test coverage
  ✅ Integration tests passing
  ✅ E2E tests for critical paths
  ✅ Accessibility verified
  ✅ All user stories implemented

Next: Run /sdlc-test for Phase 4 (Testing & Security)
```

---

## MICROSERVICES ARCHITECTURE ENFORCED

- **api-gateway**: Routes all requests, entry point
- **Domain services**: One per major domain (users, orders, payments, etc.)
- Each service: Own database, own Dockerfile, independent tests
- Communication: REST between services (via api-gateway) or direct (documented in architecture)

## CRITICAL RULES

✅ Backend engineer MUST scaffold all microservices first
✅ Frontend engineer calls ONLY api-gateway (never direct service calls)
✅ Database engineer creates migrations per service (data ownership)
✅ All code MUST have >80% unit test coverage
✅ Fullstack engineer verifies end-to-end integration
