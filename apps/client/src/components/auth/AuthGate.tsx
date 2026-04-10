import { verifyPassword } from "@/lib/api";
import { Bot } from "lucide-react";
import { useState } from "react";

const SESSION_KEY = "hiro_demo_password";

interface AuthGateProps {
    children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => sessionStorage.getItem(SESSION_KEY) !== null,
    );
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function submitPassword() {
        setIsLoading(true);
        setError("");

        const result = await verifyPassword(password);

        if (result.success) {
            sessionStorage.setItem(SESSION_KEY, password);
            setIsAuthenticated(true);
        } else {
            setError(result.error);
        }

        setIsLoading(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        void submitPassword();
    }

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <Bot className="mx-auto h-10 w-10 text-indigo-600" />
                    <h1 className="mt-4 text-2xl font-bold text-slate-900">Hiro</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Enter the demo password to continue
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Demo password"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        autoFocus
                    />

                    {error.length > 0 ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

                    <button
                        type="submit"
                        disabled={isLoading || password.length === 0}
                        className="mt-4 w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Verifying..." : "Continue"}
                    </button>
                </form>
            </div>
        </div>
    );
}
