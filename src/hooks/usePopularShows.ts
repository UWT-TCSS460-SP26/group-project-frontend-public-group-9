'use client';

import { useEffect, useState } from 'react';

import { ApiError, apiGet } from '@/lib/api';
import { partnerUrls, type ShowPage } from '@/lib/partnerApi';

interface UsePopularShowsResult {
    response: ShowPage | null;
    loading: boolean;
    error: string | null;
    reload: () => void;
}

export function usePopularShows(): UsePopularShowsResult {
    const [response, setResponse] = useState<ShowPage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadTick, setReloadTick] = useState(0);
    
      useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);


        apiGet<ShowPage>(partnerUrls.popularShows(), {
            signal: controller.signal,
        })
        .then((response) => {
            if (controller.signal.aborted) return;
            setResponse(response ?? null);
        })
        .catch((err: unknown) => {
            if (controller.signal.aborted) return;
            setError(err instanceof ApiError ? err.message : String(err));
        })
        .finally(() => {
            if (controller.signal.aborted) return;
            setLoading(false);
        });

        return () => controller.abort();
    }, [reloadTick]);

    return {
        response,
        loading,
        error,
        reload: () => setReloadTick((tick) => tick + 1),
    };
}