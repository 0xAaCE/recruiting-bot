import { API_BASE_URL } from "./constants";

export async function verifyPassword(
    password: string,
): Promise<{ success: true } | { success: false; error: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            return { success: true };
        }

        const data = (await response.json()) as { error?: string };
        return { success: false, error: data.error ?? "Invalid password" };
    } catch {
        return { success: false, error: "Network error. Please try again." };
    }
}
