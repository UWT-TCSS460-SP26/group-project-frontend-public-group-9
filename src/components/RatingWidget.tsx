'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SignInButton } from '@/components/AuthButtons';
import { partnerUrls, type Rating, type RatingSummary, type MediaType } from '@/lib/partnerApi';

type Props = {
    mediaId: number;
    mediaType: MediaType;
    summary: RatingSummary;
    userRating: Rating | null;
};

export default function RatingWidget({ mediaId, mediaType, summary: initSummary, userRating: initRating }: Props) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [userRating, setUserRating] = useState<Rating | null>(initRating);
    const [score, setScore] = useState<number>(initRating?.score ?? 7);
    const [editing, setEditing] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [summary, setSummary] = useState(initSummary);

    async function refreshSummary() {
        const res = await fetch(partnerUrls.ratingsSummary(mediaId, mediaType), { cache: 'no-store' });
        if (res.ok) {
            const json = await res.json();
            setSummary(json.data);
        }
    }

    async function submit() {
        setBusy(true);
        setError(null);
        try {
            const res = await fetch(partnerUrls.submitRating(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify({ mediaId, mediaType, score }),
            });
            const json = await res.json();
            if (!res.ok) { setError(json.error ?? 'Failed to submit rating'); return; }
            setUserRating(json.data);
            await refreshSummary();
            router.refresh();
        } finally {
            setBusy(false);
        }
    }

    async function update() {
        if (!userRating) return;
        setBusy(true);
        setError(null);
        try {
            const res = await fetch(partnerUrls.ratingById(userRating.id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
                body: JSON.stringify({ score }),
            });
            const json = await res.json();
            if (!res.ok) { setError(json.error ?? 'Failed to update rating'); return; }
            setUserRating(json.data);
            setEditing(false);
            await refreshSummary();
            router.refresh();
        } finally {
            setBusy(false);
        }
    }

    async function remove() {
        if (!userRating) return;
        setBusy(true);
        setError(null);
        try {
            const res = await fetch(partnerUrls.ratingById(userRating.id), {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${session?.accessToken}` },
            });
            if (!res.ok) {
                const json = await res.json();
                setError(json.error ?? 'Failed to delete rating');
                return;
            }
            setUserRating(null);
            setScore(7);
            await refreshSummary();
            router.refresh();
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Community rating:
                </span>
                <span className="text-sm text-zinc-900 dark:text-zinc-100">
                    {summary.average != null
                        ? `${summary.average.toFixed(1)} / 10 (${summary.count} ${summary.count === 1 ? 'rating' : 'ratings'})`
                        : 'No ratings yet'}
                </span>
            </div>

            {status === 'loading' && (
                <p className="text-sm text-zinc-500">Loading…</p>
            )}

            {status === 'unauthenticated' && (
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <SignInButton /> to rate this title
                </div>
            )}

            {status === 'authenticated' && !userRating && (
                <div className="flex items-center gap-3">
                    <label className="text-sm text-zinc-600 dark:text-zinc-400">Your score:</label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        step={0.5}
                        value={score}
                        onChange={(e) => setScore(parseFloat(e.target.value))}
                        className="w-20 rounded border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                    <button
                        onClick={submit}
                        disabled={busy}
                        className="rounded bg-zinc-900 px-3 py-1 text-sm text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
                    >
                        {busy ? 'Submitting…' : 'Submit rating'}
                    </button>
                </div>
            )}

            {status === 'authenticated' && userRating && !editing && (
                <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                        Your rating: <strong>{userRating.score} / 10</strong>
                    </span>
                    <button
                        onClick={() => { setScore(userRating.score); setEditing(true); }}
                        className="text-sm text-zinc-500 underline hover:text-black dark:hover:text-white"
                    >
                        Edit
                    </button>
                    <button
                        onClick={remove}
                        disabled={busy}
                        className="text-sm text-red-500 underline hover:text-red-700 disabled:opacity-50"
                    >
                        {busy ? 'Deleting…' : 'Delete'}
                    </button>
                </div>
            )}

            {status === 'authenticated' && editing && (
                <div className="flex items-center gap-3">
                    <label className="text-sm text-zinc-600 dark:text-zinc-400">New score:</label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        step={0.5}
                        value={score}
                        onChange={(e) => setScore(parseFloat(e.target.value))}
                        className="w-20 rounded border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    />
                    <button
                        onClick={update}
                        disabled={busy}
                        className="rounded bg-zinc-900 px-3 py-1 text-sm text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
                    >
                        {busy ? 'Saving…' : 'Save'}
                    </button>
                    <button
                        onClick={() => setEditing(false)}
                        className="text-sm text-zinc-500 underline hover:text-black dark:hover:text-white"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
