import type { FilePurpose } from "@/types/chat";
import { SendHorizontal } from "lucide-react";
import { useRef } from "react";

interface ChatInputProps {
    input: string;
    onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e?: { preventDefault?: () => void }) => void;
    isLoading: boolean;
    hasFiles: boolean;
    filePurpose?: FilePurpose;
}

export function ChatInput({
    input,
    onInputChange,
    onSubmit,
    isLoading,
    hasFiles,
    filePurpose,
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const canSubmit = input.trim().length > 0 || hasFiles;

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (canSubmit && !isLoading) {
                onSubmit();
            }
        }
    }

    function handleInput() {
        const el = textareaRef.current;
        if (el) {
            el.style.height = "auto";
            el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (canSubmit && !isLoading) {
            onSubmit();
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <textarea
                ref={textareaRef}
                value={input}
                onChange={onInputChange}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                placeholder={
                    filePurpose === "job_description"
                        ? "Add notes about this job description (optional)..."
                        : filePurpose === "resume"
                          ? "Add context for these resumes (optional)..."
                          : "Describe the role or ask a question..."
                }
                rows={1}
                disabled={isLoading}
                className="max-h-[150px] min-h-[44px] flex-1 resize-none overflow-y-auto rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={isLoading || !canSubmit}
                className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <SendHorizontal className="h-4 w-4" />
            </button>
        </form>
    );
}
