# Milestone 2: Frontend Foundation

**Goal**: Landing page and password-gated route work end-to-end.

**Depends on**: M1-E2 (auth verification route needed for AuthGate).

## Epics

| # | Epic | Tasks | Description |
|---|------|-------|-------------|
| E1 | [Project Setup](./E1-project-setup.md) | 5 | Dependencies, Tailwind, router, shared types, utilities |
| E2 | [Landing Page](./E2-landing-page.md) | 6 | Header, Footer, Hero, HowItWorks, Features, LandingPage assembly |
| E3 | [Authentication](./E3-authentication.md) | 1 | AuthGate component with password prompt and sessionStorage |

## Acceptance Criteria

- Navigating to `/` renders the full landing page
- Clicking "Try Demo" navigates to `/chat`
- `/chat` shows a password prompt (AuthGate)
- Entering the correct password grants access
- Entering the wrong password shows an error
- Password persists in sessionStorage across page refreshes within the same tab
