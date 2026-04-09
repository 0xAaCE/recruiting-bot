import type { UIMessage } from "ai";
import { BrainCircuit, MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
    messages: UIMessage[];
    status: "submitted" | "streaming" | "ready" | "error";
}

export function MessageList({ messages, status }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, status]);

    if (messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center p-8">
                <div className="text-center">
                    <MessageSquare className="mx-auto h-10 w-10 text-slate-300" />
                    <h3 className="mt-4 text-base font-medium text-slate-700">
                        Start a new screening
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-slate-500">
                        Describe the role you&apos;re hiring for, then upload candidate resumes to
                        get AI-powered evaluations.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4">
            <div className="mx-auto max-w-3xl space-y-4">
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}

                {status === "submitted" && (
                    <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
                            <BrainCircuit className="h-4 w-4 text-slate-600" />
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 shadow-sm ring-1 ring-slate-200">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>
        </div>
    );
}
