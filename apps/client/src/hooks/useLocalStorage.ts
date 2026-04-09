import { getItem, setItem } from "@/lib/storage";
import { useCallback, useState } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const existing = getItem<T>(key);
        return existing !== null ? existing : initialValue;
    });

    const setValue = useCallback(
        (value: T | ((prev: T) => T)) => {
            setStoredValue((prev) => {
                const next = value instanceof Function ? value(prev) : value;
                setItem(key, next);
                return next;
            });
        },
        [key],
    );

    return [storedValue, setValue];
}
