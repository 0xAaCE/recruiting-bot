import type { LucideIcon } from "lucide-react";
import { BarChart3, ClipboardList, FileUp } from "lucide-react";

interface Step {
    icon: LucideIcon;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        icon: ClipboardList,
        title: "Describe the Job",
        description:
            "Paste or type the job description. The AI will ask clarifying questions to understand your priorities.",
    },
    {
        icon: FileUp,
        title: "Upload CVs",
        description:
            "Drop candidate resumes as PDFs. GPT-4o reads them natively — no manual data entry.",
    },
    {
        icon: BarChart3,
        title: "Get Evaluations",
        description:
            "Receive structured scorecards with fit scores, strengths, weaknesses, and recommendations.",
    },
];

export function HowItWorks() {
    return (
        <section className="bg-slate-50 px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-center text-3xl font-bold text-slate-900">How It Works</h2>

                <div className="mt-14 grid gap-8 sm:grid-cols-3">
                    {steps.map((step, i) => (
                        <div key={step.title} className="text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                <step.icon className="h-6 w-6" />
                            </div>
                            <span className="mt-4 inline-block rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-semibold text-white">
                                Step {i + 1}
                            </span>
                            <h3 className="mt-3 text-lg font-semibold text-slate-900">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
