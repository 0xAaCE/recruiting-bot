import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
    return (
        <section className="px-4 py-24 text-center sm:px-6 sm:py-32">
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Meet Hiro, <span className="text-indigo-600">Your AI Recruiting Partner</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
                Hiro is a chat-first ATS that screens candidates, manages your pipeline, and keeps
                your whole team in the loop — without the dashboards. Just tell Hiro what you need.
            </p>

            <Link
                to="/chat"
                className="mt-10 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700"
            >
                Chat with Hiro
                <ArrowRight className="h-4 w-4" />
            </Link>
        </section>
    );
}
