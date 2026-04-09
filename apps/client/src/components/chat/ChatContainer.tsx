import type { CandidateEvaluation, FileRecord } from "@/types/chat";
import type { Attachment, UIMessage } from "ai";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

import { ChatInput } from "./ChatInput";
import { FileUploadArea } from "./FileUploadArea";
import { MessageList } from "./MessageList";

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

export function ChatContainer() {
    const [savedMessages, setSavedMessages] = useLocalStorage<UIMessage[]>("messages", []);
    const [, setEvaluations] = useLocalStorage<CandidateEvaluation[]>("evaluations", []);
    const [fileRecords, setFileRecords] = useLocalStorage<FileRecord[]>("file_records", []);

    const [stagedFiles, setStagedFiles] = useState<File[]>([]);

    const { messages, input, handleInputChange, handleSubmit, status, error } = useChat({
        api: "/api/chat",
        headers: {
            "x-demo-password": sessionStorage.getItem("recruitai_demo_password") ?? "",
        },
        initialMessages: savedMessages,
        maxSteps: 2,
        experimental_throttle: 50,
        onFinish: (message) => {
            for (const part of message.parts ?? []) {
                if (
                    part.type === "tool-invocation" &&
                    part.toolInvocation.toolName === "saveCandidate" &&
                    part.toolInvocation.state === "result"
                ) {
                    const evaluation = extractEvaluation(part.toolInvocation.result);
                    if (evaluation) {
                        setEvaluations((prev) => [...prev, evaluation]);
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
            }));
            setFileRecords((prev) => [...prev, ...newRecords]);
            setStagedFiles([]);

            handleSubmit(e, { experimental_attachments: attachments });
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
                    />
                </div>
            </div>
        </div>
    );
}
