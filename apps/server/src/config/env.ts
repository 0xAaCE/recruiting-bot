import dotenv from "dotenv";

dotenv.config({ path: new URL("../../.env.local", import.meta.url).pathname });

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const env = {
    openRouterApiKey: requireEnv("OPENROUTER_API_KEY"),
    demoPassword: requireEnv("DEMO_PASSWORD"),
    port: parseInt(process.env.PORT || "3001", 10),
};
