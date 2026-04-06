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

export const recruiterTools = {
    saveCandidate: saveCandidateTool,
};
