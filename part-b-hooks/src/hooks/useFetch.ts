import { useCallback, useEffect, useState } from "react";

interface UseFetchResult<T> {
  data: T;
  loading: boolean;
  error: string;
  request: (input: RequestInfo | URL, init?: RequestInit) => Promise<T>;
  refetch: () => Promise<void>;
}

export function useFetch<T>(url: string, initialData: T): UseFetchResult<T> {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const request = useCallback(async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<T> => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(input, init);
      if (!response.ok) {
        throw new Error(`MockAPI phản hồi lỗi (${response.status}).`);
      }
      const result = await response.json() as T;
      if (!init?.method || init.method.toUpperCase() === "GET") {
        setData(result);
      }
      return result;
    } catch (requestError) {
      const message = requestError instanceof Error
        ? requestError.message
        : "Không thể kết nối MockAPI.";
      setError(message);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async (): Promise<void> => {
    await request(url);
  }, [request, url]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void refetch().catch(() => undefined);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [refetch]);

  return { data, loading, error, request, refetch };
}
