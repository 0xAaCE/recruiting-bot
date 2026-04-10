import type { LucideIcon } from "lucide-react";
import { BellOff, GitMerge, MessageSquareText } from "lucide-react";

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: MessageSquareText,
        title: "Just Chat",
        description:
            "No dashboards, no forms. Describe a role, upload CVs, compare candidates, and make decisions — all through natural conversation with Hiro.",
    },
    {
        icon: GitMerge,
        title: "End-to-End Pipeline",
        description:
            "From first screen to offer letter, every stage lives in one place. Evaluations, feedback, and decisions flow together automatically.",
    },
    {
        icon: BellOff,
        title: "No More 'Any Updates?'",
        description:
            "Hiring managers ask Hiro directly — candidates screened, pipeline progress, top contenders. No more pinging recruiters for status updates.",
    },
];

export function Features() {
    return (
        <section className="px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-center text-3xl font-bold text-slate-900">Why Hiro?</h2>

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
