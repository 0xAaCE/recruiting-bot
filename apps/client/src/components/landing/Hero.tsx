import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
    return (
        <section className="px-4 py-24 text-center sm:px-6 sm:py-32">
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Your Hiring Pipeline, <span className="text-indigo-600">One Conversation</span> at a
                Time
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
                RecruitAI is an AI-powered Chat ATS — screen candidates, manage interviews, and make
                hiring decisions, all through conversation. No dashboards to learn, no forms to
                fill. Just tell it what you need.
            </p>

            <Link
                to="/chat"
                className="mt-10 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700"
            >
                Try Screening Demo
                <ArrowRight className="h-4 w-4" />
            </Link>
        </section>
    );
}
