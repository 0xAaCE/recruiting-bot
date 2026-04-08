import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <Hero />
                <HowItWorks />
                <Features />
            </main>
            <Footer />
        </div>
    );
}
