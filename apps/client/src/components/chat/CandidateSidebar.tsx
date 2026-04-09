import type { CandidateEvaluation } from "@/types/chat";
import { Users } from "lucide-react";

import { CandidateCard } from "./CandidateCard";

interface CandidateSidebarProps {
    evaluations: CandidateEvaluation[];
}

export function CandidateSidebar({ evaluations }: CandidateSidebarProps) {
    return (
        <div className="hidden w-80 shrink-0 flex-col border-l border-slate-200 bg-white lg:flex">
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
                <Users className="h-4 w-4 text-slate-500" />
                <h2 className="text-sm font-semibold text-slate-900">Candidates</h2>
                {evaluations.length > 0 && (
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                        {evaluations.length}
                    </span>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-3">
                {evaluations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Users className="h-8 w-8 text-slate-300" />
                        <p className="mt-3 text-sm text-slate-500">
                            Evaluated candidates will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {evaluations.map((evaluation) => (
                            <CandidateCard key={evaluation.candidateId} evaluation={evaluation} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
