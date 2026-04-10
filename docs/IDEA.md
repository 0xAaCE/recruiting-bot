# Hiro

## The Problem

Hiring is broken — and not just at the screening stage.

Every time a company opens a new position, recruiters are flooded with applications. Reading through dozens — sometimes hundreds — of CVs for a single role is tedious, time-consuming work that delays the entire hiring pipeline. And yet, it's one of the most critical steps: miss a great candidate in the pile, and you've lost them.

The challenges compound quickly:

-   **Volume overwhelm.** Each open position generates a stack of CVs that someone has to read, one by one, often under time pressure.
-   **Inconsistent evaluations.** Different reviewers weigh different things. One recruiter prioritizes years of experience; another focuses on specific skills. There's no shared rubric, so two people reviewing the same CV may reach different conclusions.
-   **Slow first-pass screening.** The initial "yes / maybe / no" sort takes hours or days, pushing back interview scheduling and extending time-to-hire.
-   **No structured comparison.** Recruiters often rely on gut feeling or scattered notes to compare candidates against a job description. There's no systematic way to see how each person stacks up.
-   **Difficulty tracking fit.** When you're juggling multiple candidates, it's easy to lose track of who matches which requirements — especially when job descriptions are detailed and nuanced.
-   **Tool fatigue.** Recruiters cobble together an ATS, a sourcing tool, a scheduling tool, a CRM, and a spreadsheet. None of them talk to each other. The "system" is actually a dozen browser tabs and a lot of copy-pasting.
-   **Constant status requests.** Hiring managers need to know how their open roles are progressing — how many candidates have been screened, who's in the pipeline, what's the bottleneck. But they can't see this themselves, so they interrupt recruiters with "any update on the Senior Engineer search?" messages. The recruiter stops what they're doing, digs through tools to compile an answer, and sends a summary. This repeats for every role, every week, consuming time on both sides and creating friction between teams.

These bottlenecks aren't unique to one type of recruiter. In-house talent teams, staffing agencies, and independent recruiters all face the same fundamental problem at different scales: too many CVs, too little structure, too many disconnected tools, and not enough time.

## The Idea: Hiro — A Chat-First ATS

Hiro is an AI-powered applicant tracking system where the primary interface is a conversation, not a dashboard.

Traditional ATS products are built around tables, kanban boards, and forms. Recruiters click through pipelines, fill out scorecards, and navigate complex menus. AI features are bolted on as secondary enhancements. Hiro flips this model: **chat is the interface, and structured views are secondary**.

The recruiter talks to an intelligent assistant that manages the entire hiring workflow through natural conversation:

1. **Share the job description.** Tell Hiro what you're looking for — paste the job posting or describe the role in your own words.
2. **Upload candidate CVs.** Drop in the PDF resumes you want evaluated.
3. **Get structured evaluations.** For each candidate, Hiro provides a fit score, highlights key strengths, identifies gaps relative to the job requirements, and offers a clear recommendation.
4. **Manage the pipeline.** Move candidates through stages, schedule interviews, compare across roles — all through conversation.

What makes it different from a simple keyword matcher or a traditional ATS is the conversational layer. Hiro asks clarifying questions to better understand what truly matters for the role. "Is remote experience a must-have or a nice-to-have?" "How important is industry-specific background versus transferable skills?" This back-and-forth refines the evaluation so the results actually reflect what the recruiter cares about.

When multiple candidates are uploaded, Hiro also provides comparative analysis — a side-by-side view of how candidates stack up against each other and against the job requirements.

The goal isn't to replace the recruiter's judgment. It's to handle the heavy lifting across the entire hiring process so the recruiter can spend their time where it matters most: talking to the right people. Chat is a more natural fit for what recruiting actually is — conversations about people.

## POC Scope

The proof of concept is a focused demo that showcases the core screening experience. Here's what it includes:

**Landing page**

-   A public page that explains what Hiro does and how it works
-   Clear description of the value proposition
-   Access point to try the demo

**Chat interface (password-protected)**

-   A conversational assistant accessible with a demo password
-   The recruiter interacts naturally through chat — no complex forms or dashboards

**Guided screening flow**

-   Provide a job description (paste or type it in)
-   Upload candidate CVs as PDF files
-   Receive structured evaluations: fit score, strengths, gaps, and recommendations for each candidate

**Demo constraints**

-   One active search at a time — clear the conversation to start a new one
-   All data lives in the browser session only — nothing is saved on any server
-   A clear disclaimer communicates that this is a demo and no candidate data is stored or retained
-   AI-powered analysis runs through a secure backend connection

The POC is designed to answer one question: _does this workflow actually help recruiters make better screening decisions, faster?_

## Product Vision: The Full Chat-First ATS

The POC proves the core interaction model. Beyond it, Hiro becomes a complete applicant tracking system — one where every workflow that traditionally lives behind a dashboard is accessible through conversation.

**Multiple parallel searches**

-   Run separate screening conversations for each open position, all accessible from one place

**Cross-search intelligence**

-   Ask questions that span all your open positions: "Which of my current candidates has the strongest leadership background?" or "Do any candidates overlap across my open roles?"

**Cross-platform persistence**

-   Access your searches from any device — your evaluations and history follow you

**End-to-end hiring pipeline**

-   Track candidates beyond screening: interview scheduling, feedback collection, offer stage, and final decisions — all managed through chat with structured views as secondary displays

**Team collaboration and self-serve status**

-   Multi-user support with roles — hiring managers, recruiters, and admins can share searches, leave notes, and coordinate on hiring decisions through shared conversations
-   Hiring managers get their own chat access to ask about their roles directly: "How's the Senior Engineer search going?", "How many candidates have we screened?", "Who's the top candidate so far?" — the AI answers from real pipeline data without the recruiter being involved
-   Eliminates the status update interrupt cycle: no more Slack pings, no more "any updates?" emails, no more recruiters stopping real work to compile summaries

**Bulk CV import**

-   Upload batches of candidates at once instead of one at a time

**Job board and sourcing integration**

-   Connect with job boards, LinkedIn, and sourcing platforms to pull in candidates automatically

**Custom evaluation criteria**

-   Define company-specific or role-specific scoring templates so every search uses the rubric that matters to your team

**Reporting and analytics**

-   Ask for hiring metrics in natural language: "What's our average time-to-hire for engineering roles?" instead of navigating a reporting dashboard

## Competitive Landscape

The AI recruiting market is large (~$30B in 2026) and growing fast. Competitors fall into distinct categories, and none occupy Hiro's positioning.

### Dashboard-First ATS Platforms (AI Bolted On)

These are full hiring platforms built around traditional CRUD interfaces — tables, kanban boards, forms. AI features are add-ons within that paradigm.

-   **[Kula](https://www.kula.ai/)** — AI-native ATS with resume scoring, natural language candidate search, AI notetaker, and outreach automation. Starts at $399/mo. Targets hiring teams from startups to enterprise.
-   **[Spott](https://spott.io/)** — AI-native ATS + CRM for staffing and recruiting agencies. Semantic candidate-job matching, CV auto-parsing, AI summaries. Raised $3.2M. Targets agencies doing permanent, exec search, temp, and contract hiring.
-   **[SmartRecruiters](https://www.smartrecruiters.com/)** — Enterprise ATS with "Winston Intelligence" AI layer. AI screening, scheduling (97% reduction in scheduling work), conversational chat.
-   **[Workable](https://www.workable.com/)** — ATS with AI Screening Assistant that scores and summarizes candidate-job fit.
-   **[Ashby](https://www.ashbyhq.com/)**, **[Greenhouse](https://www.greenhouse.com/)**, **[Lever](https://www.lever.co/)** — Established ATS platforms with varying levels of AI integration.

**Hiro's advantage:** These are all dashboard-first. AI is a feature, not the interface. Hiro makes conversation the primary interaction model — a fundamentally different UX paradigm.

### Candidate-Facing Conversational AI

These chatbots talk _to_ candidates, not _to_ recruiters. They automate candidate engagement, not recruiter workflows.

-   **[Paradox (Olivia)](https://www.paradox.ai/)** — Conversational AI that screens, schedules, and answers candidate FAQs via SMS/chat. 100+ languages, 24/7. Enterprise pricing ($25K-$100K+/yr). Best for high-volume hourly hiring.
-   **[Humanly](https://www.humanly.io/)** — AI "co-pilot" chatbot for mid-market. Automates screening, scheduling, joins live interviews.
-   **[Moonhub (Stella)](https://www.moonhub.ai/)** — Conversational AI recruiter for startups. Automates candidate screening and scheduling.
-   **[Eximius](https://eximius.ai/)** — AI chat + voice interviews (20-30 min). Qualifies candidates at scale.

**Hiro's advantage:** These talk to candidates. Hiro talks to recruiters. Entirely different user and use case.

### Upload-and-Score Resume Screeners

These accept CVs and a job description, then output scores — but with no conversational refinement.

-   **[ResumeScreening.ai](https://resumescreening.ai)** — Bulk upload resumes + JD, get ranked scores. Free tier (5 resumes). Closest to Hiro's POC flow but no dialogue, no clarifying questions.
-   **[GoPerfect](https://www.goperfect.com/)** — AI resume screening with skill matching and scoring. Dashboard-based.
-   **[HackerEarth](https://www.hackerearth.com/)** — AI resume parsing + technical assessment library (36K+ questions). Tech hiring focused.
-   **[Senseloaf](https://www.senseloaf.ai/)** — Semantic resume reading that understands context beyond keywords.

**Hiro's advantage:** These are silent score generators. Hiro adds conversational refinement — the AI asks what matters before it scores.

### The "Just Use ChatGPT" Alternative

Any recruiter can paste a JD and CV into ChatGPT or Claude and ask for an evaluation. This is arguably the most common "competitor" today.

**Hiro's advantage:** Guided flow, structured evaluations with fit scores, candidate cards, comparative analysis, persistence, and (in the full vision) pipeline management — all purpose-built for the recruiting workflow rather than a generic chat interface.

### Positioning Summary

No competitor builds an ATS around a conversational interface. Every existing ATS is dashboard-first with AI bolted on. Hiro is **chat-first with structured views as secondary displays** — the same paradigm shift that Slack brought to workplace communication or Linear brought to project management.
