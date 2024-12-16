import { useRef, useState } from "react";

type UseFetchOutput<T> = {
    request: (s: Record<string, string>) => Promise<T>;
    isLoading: boolean;
    data: T | null
}

export function useFetch<T>(origin: string): UseFetchOutput<T> {
    const abortControllerRef = useRef<AbortController | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T | null>(null);

    const fetchRequest = async (filters?: Record<string, string>): Promise<T> => {
        setIsLoading(true)
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        const { signal } = controller;

        const url = new URL(origin);
        if (filters) {
            Object.entries(filters).map((params) => {
                url.searchParams.append(...params);
            });
        }

        const resp = await fetch(url.toString(), { signal });

        if (!resp.ok) {
            throw new Error("Fetch error");
        }
        const data = await resp.json();

        setData(data);
        setIsLoading(false)

        return data;
    };

    return { request: fetchRequest, isLoading, data };
}