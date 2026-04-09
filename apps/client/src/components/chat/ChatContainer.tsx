import type { CandidateEvaluation, FilePurpose, FileRecord, JobDescription } from "@/types/chat";
import type { Attachment, UIMessage } from "ai";
import type React from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { API_BASE_URL } from "@/lib/constants";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

import { ChatInput } from "./ChatInput";
import { FileUploadArea } from "./FileUploadArea";
import { MessageList } from "./MessageList";

export const INJECTED_CV_MESSAGE = "Please evaluate the attached CV.";
export const INJECTED_JD_MESSAGE =
    "Please review the attached job description PDF and use it as the job requirements for evaluating candidates.";

function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
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

interface ChatContainerProps {
    evaluations: CandidateEvaluation[];
    setEvaluations: React.Dispatch<React.SetStateAction<CandidateEvaluation[]>>;
    jobDescription: JobDescription | null;
    setJobDescription: React.Dispatch<React.SetStateAction<JobDescription | null>>;
}

export function ChatContainer({
    jobDescription,
    setEvaluations,
    setJobDescription,
}: ChatContainerProps) {
    const [savedMessages, setSavedMessages] = useLocalStorage<UIMessage[]>("messages", []);
    const [fileRecords, setFileRecords] = useLocalStorage<FileRecord[]>("file_records", []);

    const [stagedFiles, setStagedFiles] = useState<File[]>([]);
    const [filePurpose, setFilePurpose] = useState<FilePurpose>("resume");

    const hasJobDescription =
        jobDescription !== null || fileRecords.some((r) => r.purpose === "job_description");

    const { messages, input, handleInputChange, handleSubmit, append, status, error } = useChat({
        api: `${API_BASE_URL}/api/chat`,
        headers: {
            "x-demo-password": sessionStorage.getItem("recruitai_demo_password") ?? "",
        },
        initialMessages: savedMessages,
        maxSteps: 6,
        experimental_throttle: 50,
        onFinish: (message) => {
            for (const part of message.parts ?? []) {
                if (part.type !== "tool-invocation" || part.toolInvocation.state !== "result") {
                    continue;
                }

                if (part.toolInvocation.toolName === "saveCandidate") {
                    const evaluation = extractEvaluation(part.toolInvocation.result);
                    if (evaluation) {
                        setEvaluations((prev) => {
                            if (prev.some((e) => e.candidateId === evaluation.candidateId)) {
                                return prev;
                            }
                            return [...prev, evaluation];
                        });
                    }
                }

                if (part.toolInvocation.toolName === "saveJobDescription") {
                    const jd = extractJobDescription(part.toolInvocation.result);
                    if (jd) {
                        setJobDescription(jd);
                    }
                }
            }
        },
    });

    // Persist messages to localStorage on change
    useEffect(() => {
        if (messages.length > 0) {
            setSavedMessages(messages);
        }
    }, [messages, setSavedMessages]);

    async function handleSubmitWithFiles(e?: { preventDefault?: () => void }) {
        if (stagedFiles.length > 0) {
            const attachments: Attachment[] = await Promise.all(
                stagedFiles.map(async (file) => ({
                    name: file.name,
                    contentType: file.type,
                    url: await fileToDataUrl(file),
                })),
            );

            const newRecords: FileRecord[] = stagedFiles.map((f) => ({
                name: f.name,
                size: f.size,
                timestamp: Date.now(),
                type: f.type,
                purpose: filePurpose,
            }));
            setFileRecords((prev) => [...prev, ...newRecords]);
            setStagedFiles([]);
            setFilePurpose("resume");

            if (input.trim().length === 0) {
                const defaultMessage =
                    filePurpose === "job_description" ? INJECTED_JD_MESSAGE : INJECTED_CV_MESSAGE;
                append({
                    role: "user",
                    content: defaultMessage,
                    experimental_attachments: attachments,
                });
            } else {
                handleSubmit(e, { experimental_attachments: attachments });
            }
        } else {
            handleSubmit(e);
        }
    }

    return (
        <div className="flex h-full flex-col">
            <MessageList messages={messages} status={status} />

            {error && (
                <div className="mx-4 mb-2 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
                    {error.message || "Something went wrong. Please try again."}
                </div>
            )}

            <div className="border-t border-slate-200 bg-white p-4">
                <div className="mx-auto max-w-3xl">
                    <FileUploadArea
                        files={stagedFiles}
                        fileRecords={fileRecords}
                        purpose={filePurpose}
                        onPurposeChange={setFilePurpose}
                        hasJobDescription={hasJobDescription}
                        onFilesSelected={(files) => setStagedFiles((prev) => [...prev, ...files])}
                        onRemoveFile={(index) =>
                            setStagedFiles((prev) => prev.filter((_, i) => i !== index))
                        }
                        disabled={status !== "ready"}
                    />
                    <ChatInput
                        input={input}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmitWithFiles}
                        isLoading={status !== "ready"}
                        hasFiles={stagedFiles.length > 0}
                        filePurpose={stagedFiles.length > 0 ? filePurpose : undefined}
                    />
                </div>
            </div>
        </div>
    );
}
