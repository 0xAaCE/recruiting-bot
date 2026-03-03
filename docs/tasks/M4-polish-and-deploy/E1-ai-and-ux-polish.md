# E1: AI & UX Polish

**Milestone**: M4 — Polish & Deploy
**Goal**: Enhance the AI experience with explicit stage instructions and polish the landing page.

---

### T1: Enhance system prompt with stage instructions

**Status**: [ ] Not started
**Files**: `packages/models/src/prompts/base.ts` (modify)
**Description**: Expand the system prompt with explicit stage-based instructions:
- **Stage 1 — Job Description**: Greet the recruiter, ask them to provide a job description. Once received, ask 2–3 clarifying questions about must-haves vs. nice-to-haves, experience level, etc.
- **Stage 2 — CV Upload**: After clarifying the role, invite the recruiter to upload candidate CVs as PDFs. Recognize PDF attachments as candidate resumes.
- **Stage 3 — Evaluation**: For each CV, analyze against the job description and clarifying answers. Call `saveCandidateTool` with the structured evaluation. Offer comparative analysis when multiple candidates have been evaluated.
**Acceptance criteria**:
- [ ] System prompt defines three explicit stages
- [ ] AI follows the stage flow in practice: greeting → job desc → clarification → upload invite → evaluation
- [ ] AI calls `saveCandidateTool` for each CV evaluation
- [ ] AI offers comparison when multiple candidates exist

---

### T2: Polish landing page styling

**Status**: [ ] Not started
**Files**: `apps/client/src/pages/LandingPage.tsx` (modify), `apps/client/src/components/landing/*.tsx` (modify as needed)
**Description**: Review and refine the landing page for responsive layout, consistent spacing, and visual hierarchy. Ensure the page looks good on mobile (375px), tablet (768px), and desktop (1280px+). Adjust font sizes, padding, and component gaps for a polished feel.
**Acceptance criteria**:
- [ ] Landing page is visually polished and consistent
- [ ] Responsive at mobile, tablet, and desktop breakpoints
- [ ] Consistent spacing between sections
- [ ] CTA button is prominent with clear visual hierarchy
