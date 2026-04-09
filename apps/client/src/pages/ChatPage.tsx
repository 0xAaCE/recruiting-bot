import type { CandidateEvaluation } from "@/types/chat";
import { CandidateSidebar } from "@/components/chat/CandidateSidebar";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { clearAll } from "@/lib/storage";
import { BrainCircuit, RotateCcw } from "lucide-react";
import { useState } from "react";

export function ChatPage() {
    const [resetKey, setResetKey] = useState(0);
    const [evaluations, setEvaluations] = useLocalStorage<CandidateEvaluation[]>("evaluations", []);

    function handleNewSearch() {
        if (
            window.confirm("Start a new search? This will clear all chat history and evaluations.")
        ) {
            clearAll();
            setEvaluations([]);
            setResetKey((prev) => prev + 1);
        }
    }

    return (
        <div className="flex h-screen flex-col bg-slate-50">
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-indigo-600" />
                    <span className="text-base font-semibold text-slate-900">RecruitAI</span>
                </div>
                <button
                    onClick={handleNewSearch}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    New Search
                </button>
            </header>

            <main className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-hidden">
                    <ChatContainer
                        key={resetKey}
                        evaluations={evaluations}
                        setEvaluations={setEvaluations}
                    />
                </div>
                <CandidateSidebar evaluations={evaluations} />
            </main>
        </div>
    );
}
