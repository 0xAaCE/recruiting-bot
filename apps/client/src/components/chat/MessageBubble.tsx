import type { CandidateEvaluation } from "@/types/chat";
import type { UIMessage } from "ai";
import { BrainCircuit, Loader2, User } from "lucide-react";
import Markdown from "react-markdown";

import { CandidateCard } from "./CandidateCard";

interface MessageBubbleProps {
    message: UIMessage;
}

function extractEvaluation(result: unknown): CandidateEvaluation | null {
    const r = result as {
        success?: boolean;
        candidateId?: string;
        name?: string;
        email?: string;
        evaluation?: {
            fitScore: number;
            strengths: string[];
            weaknesses: string[];
            recommendation: CandidateEvaluation["recommendation"];
            summary: string;
        };
    };

    if (!r?.success || !r.evaluation) return null;

    return {
        candidateId: r.candidateId ?? "",
        name: r.name ?? "",
        email: r.email ?? "",
        ...r.evaluation,
    };
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === "user";

    return (
        <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
            <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    isUser ? "bg-indigo-100" : "bg-slate-100"
                }`}
            >
                {isUser ? (
                    <User className="h-4 w-4 text-indigo-600" />
                ) : (
                    <BrainCircuit className="h-4 w-4 text-slate-600" />
                )}
            </div>

            <div className={`max-w-[80%] space-y-2 ${isUser ? "text-right" : ""}`}>
                {message.parts.map((part, i) => {
                    if (part.type === "text") {
                        if (part.text.length === 0) return null;
                        return isUser ? (
                            <div
                                key={i}
                                className="inline-block rounded-2xl rounded-tr-sm bg-indigo-600 px-4 py-2.5 text-left text-sm text-white"
                            >
                                {part.text}
                            </div>
                        ) : (
                            <div
                                key={i}
                                className="prose prose-sm prose-slate inline-block max-w-none rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-left text-sm text-slate-900 shadow-sm ring-1 ring-slate-200"
                            >
                                <Markdown>{part.text}</Markdown>
                            </div>
                        );
                    }

                    if (part.type === "tool-invocation") {
                        const { toolInvocation } = part;
                        if (toolInvocation.toolName !== "saveCandidate") return null;

                        if (toolInvocation.state === "result") {
                            const evaluation = extractEvaluation(toolInvocation.result);
                            if (evaluation) {
                                return <CandidateCard key={i} evaluation={evaluation} />;
                            }
                        }

                        return (
                            <div
                                key={i}
                                className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-500 ring-1 ring-slate-200"
                            >
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Evaluating candidate...
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
}
