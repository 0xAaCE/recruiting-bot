# E2: File Upload & Evaluation Display

**Milestone**: M3 — Chat Interface
**Goal**: Build file upload and candidate evaluation display components.

---

### T1: Build FileUploadArea component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/chat/FileUploadArea.tsx` (create)
**Description**: Create a drag-and-drop zone with a fallback file picker button. Validate files on selection: only PDF MIME type, max 10MB per file, max 5 files per session. Convert accepted files to base64 data URLs for sending via `useChat`'s `experimental_attachments`. Show file names and sizes after selection. Display validation errors inline.
**Acceptance criteria**:
- [ ] Drag-and-drop zone accepts files
- [ ] File picker button opens a file dialog filtered to PDFs
- [ ] Non-PDF files are rejected with an error message
- [ ] Files over 10MB are rejected with an error message
- [ ] More than 5 files in a session are rejected
- [ ] Accepted files are converted to base64 and made available to the parent component
- [ ] Selected file names and sizes are displayed

---

### T2: Build CandidateCard component

**Status**: [ ] Not started
**Files**: `apps/client/src/components/chat/CandidateCard.tsx` (create)
**Description**: Create a card component that displays structured candidate evaluation data from `saveCandidateTool` results. Show: candidate name, fit score (as a visual gauge or badge), strengths list, weaknesses list, recommendation (e.g., "Strong Hire", "Consider", "Pass"), and a summary paragraph.
**Acceptance criteria**:
- [ ] Displays candidate name and email
- [ ] Fit score is shown as a visual indicator (gauge, progress bar, or color-coded badge)
- [ ] Strengths and weaknesses are rendered as lists
- [ ] Recommendation is shown as a prominent badge
- [ ] Summary text is displayed
- [ ] Accepts a `CandidateEvaluation` typed prop
