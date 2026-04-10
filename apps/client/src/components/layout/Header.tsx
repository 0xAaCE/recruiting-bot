import { Bot } from "lucide-react";
import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
                    <Bot className="h-6 w-6 text-indigo-600" />
                    Hiro
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Demo
                    </span>
                </Link>

                <Link
                    to="/chat"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                    Chat with Hiro
                </Link>
            </div>
        </header>
    );
}
