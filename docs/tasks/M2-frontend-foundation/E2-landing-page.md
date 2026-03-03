# E2: Landing Page

**Milestone**: M2 — Frontend Foundation
**Goal**: Build all landing page sections and assemble them into a complete page.

---

### T1: Build Header component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/layout/Header.tsx` (create)
**Description**: Create a responsive header with the RecruitAI logo/name on the left and a navigation link to `/chat` ("Try Demo") on the right. Use Tailwind for styling.
**Acceptance criteria**:
- [ ] Displays app name/logo
- [ ] "Try Demo" link navigates to `/chat`
- [ ] Responsive — looks correct on mobile and desktop

---

### T2: Build Footer component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/layout/Footer.tsx` (create)
**Description**: Create a footer with a demo disclaimer ("This is a demo application — no data is stored on any server") and copyright text.
**Acceptance criteria**:
- [ ] Shows demo disclaimer text
- [ ] Shows copyright with current year
- [ ] Styled consistently with the rest of the landing page

---

### T3: Build Hero component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/landing/Hero.tsx` (create)
**Description**: Create the hero section with a headline (e.g., "AI-Powered Candidate Screening"), supporting subtext explaining the value proposition, and a prominent CTA button that navigates to `/chat`.
**Acceptance criteria**:
- [ ] Headline and subtext are visible
- [ ] CTA button navigates to `/chat`
- [ ] Visually prominent — clear primary action on the page

---

### T4: Build HowItWorks component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/landing/HowItWorks.tsx` (create)
**Description**: Create a 3-step visual section: (1) Describe the job, (2) Upload CVs, (3) Get evaluations. Use icons from `lucide-react` and number badges to guide the user through the flow.
**Acceptance criteria**:
- [ ] Shows 3 distinct steps with icons and descriptions
- [ ] Steps reflect the actual app flow (job description → upload → evaluation)
- [ ] Clean, scannable layout

---

### T5: Build Features component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/landing/Features.tsx` (create)
**Description**: Create a card grid highlighting key features: AI-powered analysis, structured evaluation output, and instant results. Each card has an icon, title, and brief description.
**Acceptance criteria**:
- [ ] Displays at least 3 feature cards
- [ ] Each card has an icon, title, and description
- [ ] Responsive grid layout (stacks on mobile)

---

### T6: Assemble LandingPage

**Status**: [ ] Not started
**Files**: `apps/client/src/pages/LandingPage.tsx` (create)
**Description**: Compose all landing page sections into a single page component: Header → Hero → HowItWorks → Features → Footer. Ensure consistent spacing between sections.
**Acceptance criteria**:
- [ ] All sections render in the correct order
- [ ] Page is scrollable and sections have consistent vertical spacing
- [ ] Page renders at `/` via React Router
