export interface ChatMessage {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    toolInvocations?: ToolInvocation[];
}

export interface ToolInvocation {
    toolCallId: string;
    toolName: string;
    args: Record<string, unknown>;
    result?: unknown;
}

export interface CandidateEvaluation {
    candidateId: string;
    name: string;
    email: string;
    fitScore: number;
    strengths: string[];
    weaknesses: string[];
    recommendation: "recommended" | "maybe" | "not_recommended";
    summary: string;
}

export interface JobDescription {
    title: string;
    company: string;
    summary: string;
    requirements: string[];
    niceToHave: string[];
    techStack: string[];
}

export type FilePurpose = "resume" | "job_description";

export interface FileRecord {
    name: string;
    size: number;
    timestamp: number;
    type: string;
    purpose?: FilePurpose;
}
