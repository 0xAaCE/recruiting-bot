import type { CandidateEvaluation, JobDescription } from "@/types/chat";
import type { UIMessage } from "ai";
import {
    BrainCircuit,
    CheckCircle2,
    ClipboardList,
    Code2,
    Loader2,
    Paperclip,
    Star,
    User,
} from "lucide-react";
import Markdown from "react-markdown";

import { CandidateCard } from "./CandidateCard";
import { INJECTED_CV_MESSAGE, INJECTED_JD_MESSAGE } from "./ChatContainer";

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

function extractJobDescription(result: unknown): JobDescription | null {
    const r = result as {
        success?: boolean;
        title?: string;
        company?: string;
        summary?: string;
        requirements?: string[];
        niceToHave?: string[];
        techStack?: string[];
    };

    if (!r?.success || !r.title) return null;

    return {
        title: r.title,
        company: r.company ?? "",
        summary: r.summary ?? "",
        requirements: r.requirements ?? [],
        niceToHave: r.niceToHave ?? [],
        techStack: r.techStack ?? [],
    };
}

function JobDescriptionCard({ jd }: { jd: JobDescription }) {
    return (
        <div className="w-full max-w-md rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200">
            <div className="mb-3 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-indigo-600" />
                <div>
                    <h3 className="text-sm font-semibold text-slate-900">{jd.title}</h3>
                    {jd.company && <p className="text-xs text-slate-500">{jd.company}</p>}
                </div>
            </div>

            {jd.summary && <p className="mb-3 text-xs text-slate-600">{jd.summary}</p>}

            {jd.requirements.length > 0 && (
                <div className="mb-2">
                    <h4 className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        Requirements
                    </h4>
                    <ul className="space-y-0.5">
                        {jd.requirements.map((req, i) => (
                            <li key={i} className="text-xs text-slate-600">
                                • {req}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {jd.niceToHave.length > 0 && (
                <div className="mb-2">
                    <h4 className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-700">
                        <Star className="h-3 w-3 text-amber-500" />
                        Nice to Have
                    </h4>
                    <ul className="space-y-0.5">
                        {jd.niceToHave.map((item, i) => (
                            <li key={i} className="text-xs text-slate-600">
                                • {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {jd.techStack.length > 0 && (
                <div>
                    <h4 className="mb-1 flex items-center gap-1 text-xs font-medium text-slate-700">
                        <Code2 className="h-3 w-3 text-blue-600" />
                        Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1">
                        {jd.techStack.map((tech, i) => (
                            <span
                                key={i}
                                className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
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
                {isUser &&
                    message.experimental_attachments &&
                    message.experimental_attachments.length > 0 && (
                        <div className={`flex flex-wrap gap-1.5 ${isUser ? "justify-end" : ""}`}>
                            {message.experimental_attachments.map((att, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-500/80 px-2.5 py-1 text-xs text-white/90"
                                >
                                    <Paperclip className="h-3 w-3" />
                                    <span className="max-w-[150px] truncate">{att.name}</span>
                                </span>
                            ))}
                        </div>
                    )}
                {message.parts.map((part, i) => {
                    if (part.type === "text") {
                        const isHiddenPlaceholder =
                            isUser &&
                            (part.text === INJECTED_CV_MESSAGE ||
                                part.text === INJECTED_JD_MESSAGE) &&
                            message.experimental_attachments &&
                            message.experimental_attachments.length > 0;
                        if (part.text.length === 0 || isHiddenPlaceholder) return null;
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

                        if (toolInvocation.toolName === "saveCandidate") {
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

                        if (toolInvocation.toolName === "saveJobDescription") {
                            if (toolInvocation.state === "result") {
                                const jd = extractJobDescription(toolInvocation.result);
                                if (jd) {
                                    return <JobDescriptionCard key={i} jd={jd} />;
                                }
                            }
                            return (
                                <div
                                    key={i}
                                    className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-500 ring-1 ring-slate-200"
                                >
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Processing job description...
                                </div>
                            );
                        }

                        return null;
                    }

                    return null;
                })}
            </div>
        </div>
    );
}
