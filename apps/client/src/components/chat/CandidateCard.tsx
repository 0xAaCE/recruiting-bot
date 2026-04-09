import type { CandidateEvaluation } from "@/types/chat";
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Mail, User } from "lucide-react";
import { useState } from "react";

interface CandidateCardProps {
    evaluation: CandidateEvaluation;
}

const RECOMMENDATION_STYLES: Record<
    CandidateEvaluation["recommendation"],
    { label: string; className: string }
> = {
    recommended: { label: "Recommended", className: "bg-emerald-100 text-emerald-800" },
    maybe: { label: "Maybe", className: "bg-amber-100 text-amber-800" },
    not_recommended: { label: "Not Recommended", className: "bg-red-100 text-red-800" },
};

function scoreColor(score: number): string {
    if (score <= 40) return "bg-red-500";
    if (score <= 70) return "bg-amber-500";
    return "bg-emerald-500";
}

export function CandidateCard({ evaluation }: CandidateCardProps) {
    const [collapsed, setCollapsed] = useState(true);
    const rec = RECOMMENDATION_STYLES[evaluation.recommendation];
    const Chevron = collapsed ? ChevronDown : ChevronUp;

    return (
        <div className="my-2 rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Clickable header area */}
            <button
                type="button"
                onClick={() => setCollapsed((c) => !c)}
                className="flex w-full cursor-pointer items-start justify-between p-4 text-left"
            >
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 shrink-0 text-slate-400" />
                        <h3 className="truncate text-base font-semibold text-slate-900">
                            {evaluation.name}
                        </h3>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{evaluation.email}</span>
                    </div>
                </div>
                <div className="ml-2 flex shrink-0 items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${rec.className}`}>
                        {rec.label}
                    </span>
                    <Chevron className="h-4 w-4 text-slate-400" />
                </div>
            </button>

            {/* Fit Score — always visible */}
            <div className="px-4 pb-4">
                <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">Fit Score</span>
                    <span className="font-semibold text-slate-900">{evaluation.fitScore}/100</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                        className={`h-full rounded-full transition-all ${scoreColor(evaluation.fitScore)}`}
                        style={{ width: `${evaluation.fitScore}%` }}
                    />
                </div>
            </div>

            {/* Expandable details */}
            {!collapsed && (
                <div className="border-t border-slate-100 px-4 pb-4 pt-4">
                    {/* Strengths & Weaknesses */}
                    <div className="mb-4 grid gap-4 sm:grid-cols-2">
                        <div>
                            <h4 className="mb-2 text-sm font-medium text-slate-700">Strengths</h4>
                            <ul className="space-y-1">
                                {evaluation.strengths.map((s, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-1.5 text-sm text-slate-600"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 text-sm font-medium text-slate-700">Weaknesses</h4>
                            <ul className="space-y-1">
                                {evaluation.weaknesses.map((w, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-1.5 text-sm text-slate-600"
                                    >
                                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                                        {w}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm leading-relaxed text-slate-600">{evaluation.summary}</p>
                </div>
            )}
        </div>
    );
}
