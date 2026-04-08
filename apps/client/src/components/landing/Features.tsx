import type { LucideIcon } from "lucide-react";
import { BrainCircuit, ListChecks, Zap } from "lucide-react";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: BrainCircuit,
        title: "AI-Powered Analysis",
        description:
            "GPT-4o reads resumes, understands context, and evaluates candidates against your specific requirements.",
    },
    {
        icon: ListChecks,
        title: "Structured Evaluations",
        description:
            "Every candidate gets a scorecard with fit score, strengths, weaknesses, and a clear recommendation.",
    },
    {
        icon: Zap,
        title: "Instant Results",
        description:
            "Upload a CV and get a detailed evaluation in seconds. Screen multiple candidates in a single session.",
    },
];

export function Features() {
    return (
        <section className="px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-center text-3xl font-bold text-slate-900">Features</h2>

                <div className="mt-14 grid gap-8 sm:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                <feature.icon className="h-5 w-5" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
