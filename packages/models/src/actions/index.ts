import { randomUUID } from "node:crypto";
import { createLogger } from "@repo/utils";
import { tool } from "ai";
import { z } from "zod";

const logger = createLogger({ module: "actions" });

export const saveCandidateTool = tool({
    description:
        "Save candidate information and evaluation after analyzing their resume against the job description",
    parameters: z.object({
        name: z.string().describe("Candidate full name"),
        email: z.string().email().describe("Candidate email address"),
        evaluation: z
            .object({
                fitScore: z.number().min(0).max(100).describe("Overall fit score (0-100)"),
                strengths: z.array(z.string()).describe("Key strengths and positive matches"),
                weaknesses: z.array(z.string()).describe("Gaps or concerns identified"),
                recommendation: z
                    .enum(["recommended", "maybe", "not_recommended"])
                    .describe("Hiring recommendation"),
                summary: z.string().describe("Brief summary of the evaluation"),
            })
            .describe("Detailed evaluation of the candidate"),
    }),
    execute: async ({ name, email, evaluation }) => {
        logger.info({ name, email, evaluation }, "Saving candidate");
        return {
            success: true,
            candidateId: randomUUID(),
            name,
            email,
            evaluation,
        };
    },
});

export const saveJobDescriptionTool = tool({
    description:
        "Save a structured summary of the job description after analyzing a job description PDF or text",
    parameters: z.object({
        title: z.string().describe("Job title"),
        company: z.string().describe("Company name"),
        summary: z.string().describe("Brief 1-2 sentence summary of the role"),
        requirements: z.array(z.string()).describe("Must-have requirements"),
        niceToHave: z.array(z.string()).describe("Nice-to-have requirements"),
        techStack: z.array(z.string()).describe("Technologies and tools mentioned"),
    }),
    execute: async ({ title, company, summary, requirements, niceToHave, techStack }) => {
        logger.info({ title, company }, "Saving job description");
        return {
            success: true,
            title,
            company,
            summary,
            requirements,
            niceToHave,
            techStack,
        };
    },
});

export const recruiterTools = {
    saveCandidate: saveCandidateTool,
    saveJobDescription: saveJobDescriptionTool,
};
