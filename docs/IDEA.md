# RecruitAI

## The Problem

Hiring is broken at the screening stage.

Every time a company opens a new position, recruiters are flooded with applications. Reading through dozens — sometimes hundreds — of CVs for a single role is tedious, time-consuming work that delays the entire hiring pipeline. And yet, it's one of the most critical steps: miss a great candidate in the pile, and you've lost them.

The challenges compound quickly:

- **Volume overwhelm.** Each open position generates a stack of CVs that someone has to read, one by one, often under time pressure.
- **Inconsistent evaluations.** Different reviewers weigh different things. One recruiter prioritizes years of experience; another focuses on specific skills. There's no shared rubric, so two people reviewing the same CV may reach different conclusions.
- **Slow first-pass screening.** The initial "yes / maybe / no" sort takes hours or days, pushing back interview scheduling and extending time-to-hire.
- **No structured comparison.** Recruiters often rely on gut feeling or scattered notes to compare candidates against a job description. There's no systematic way to see how each person stacks up.
- **Difficulty tracking fit.** When you're juggling multiple candidates, it's easy to lose track of who matches which requirements — especially when job descriptions are detailed and nuanced.

These bottlenecks aren't unique to one type of recruiter. In-house talent teams, staffing agencies, and independent recruiters all face the same fundamental problem at different scales: too many CVs, too little structure, and not enough time.

## The Idea: RecruitAI

RecruitAI is an AI-powered chat assistant that helps recruiters screen candidates faster and more consistently.

Instead of reading every CV from top to bottom, the recruiter has a conversation with an intelligent assistant. The workflow is simple and natural:

1. **Share the job description.** Tell RecruitAI what you're looking for — paste the job posting or describe the role in your own words.
2. **Upload candidate CVs.** Drop in the PDF resumes you want evaluated.
3. **Get structured evaluations.** For each candidate, RecruitAI provides a fit score, highlights key strengths, identifies gaps relative to the job requirements, and offers a clear recommendation.

What makes it different from a simple keyword matcher is the conversational layer. RecruitAI asks clarifying questions to better understand what truly matters for the role. "Is remote experience a must-have or a nice-to-have?" "How important is industry-specific background versus transferable skills?" This back-and-forth refines the evaluation so the results actually reflect what the recruiter cares about.

When multiple candidates are uploaded, RecruitAI also provides comparative analysis — a side-by-side view of how candidates stack up against each other and against the job requirements.

The goal isn't to replace the recruiter's judgment. It's to handle the heavy lifting of the first pass so the recruiter can spend their time where it matters most: talking to the right people.

## POC Scope

The proof of concept is a focused demo that showcases the core screening experience. Here's what it includes:

**Landing page**
- A public page that explains what RecruitAI does and how it works
- Clear description of the value proposition
- Access point to try the demo

**Chat interface (password-protected)**
- A conversational assistant accessible with a demo password
- The recruiter interacts naturally through chat — no complex forms or dashboards

**Guided screening flow**
- Provide a job description (paste or type it in)
- Upload candidate CVs as PDF files
- Receive structured evaluations: fit score, strengths, gaps, and recommendations for each candidate

**Demo constraints**
- One active search at a time — clear the conversation to start a new one
- All data lives in the browser session only — nothing is saved on any server
- A clear disclaimer communicates that this is a demo and no candidate data is stored or retained
- AI-powered analysis runs through a secure backend connection

The POC is designed to answer one question: *does this workflow actually help recruiters make better screening decisions, faster?*

## Tentative Future Features

Looking beyond the POC, here's the vision for where RecruitAI could go:

**Multiple parallel searches**
- Run separate screening conversations for each open position, all accessible from one place

**Cross-platform persistence**
- Access your searches from any device — your evaluations and history follow you

**General chat across searches**
- Ask questions that span all your open positions: "Which of my current candidates has the strongest leadership background?" or "Do any candidates overlap across my open roles?"

**End-to-end hiring pipeline**
- Track candidates beyond screening: interview scheduling, feedback collection, offer stage, and final decisions — all in one place

**Team collaboration**
- Multi-user support with roles — hiring managers, recruiters, and admins can share searches, leave notes, and coordinate on hiring decisions

**Bulk CV import**
- Upload batches of candidates at once instead of one at a time

**ATS and job board integration**
- Connect with existing Applicant Tracking Systems and job boards to pull in candidates and push back evaluations automatically

**Custom evaluation criteria**
- Define company-specific or role-specific scoring templates so every search uses the rubric that matters to your team
