export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-8">
            <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500 sm:px-6">
                <p>This is a demo application — no data is stored on any server.</p>
                <p className="mt-2">
                    &copy; {new Date().getFullYear()} Hiro. Built as a proof of concept.
                </p>
            </div>
        </footer>
    );
}
