'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SignInButton } from '@/components/AuthButtons';
import { partnerUrls, type Review, type MediaType } from '@/lib/partnerApi';

type Props = {
    mediaId: number;
    mediaType: MediaType;
    reviews: Review[];
    userReview: Review | null;
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ReviewSection({ mediaId, mediaType, reviews: initReviews, userReview: initUserReview }: Props) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [reviews, setReviews] = useState<Review[]>(initReviews);
    const [userReview, setUserReview] = useState<Review | null>(initUserReview);

    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const [submitBusy, setSubmitBusy] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const [editBusy, setEditBusy] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    const [deleteBusy, setDeleteBusy] = useState(false);

    const token = session?.accessToken;

    async function submitReview() {
        if (!newBody.trim()) { setSubmitError('Review body is required.'); return; }
        setSubmitBusy(true);
        setSubmitError(null);
        try {
            const res = await fetch(partnerUrls.submitReview(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    mediaId,
                    mediaType,
                    title: newTitle.trim() || undefined,
                    body: newBody.trim(),
                }),
            });
            const json = await res.json();
            if (!res.ok) { setSubmitError(json.error ?? 'Failed to submit review'); return; }
            const created: Review = json.data;
            setUserReview(created);
            setReviews((prev) => [created, ...prev]);
            setNewTitle('');
            setNewBody('');
            router.refresh();
        } finally {
            setSubmitBusy(false);
        }
    }

    function startEdit(review: Review) {
        setEditingId(review.id);
        setEditTitle(review.title ?? '');
        setEditBody(review.body);
        setEditError(null);
    }

    async function saveEdit(id: number) {
        if (!editBody.trim()) { setEditError('Review body is required.'); return; }
        setEditBusy(true);
        setEditError(null);
        try {
            const res = await fetch(partnerUrls.reviewById(id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: editTitle.trim() || undefined,
                    body: editBody.trim(),
                }),
            });
            const json = await res.json();
            if (!res.ok) { setEditError(json.error ?? 'Failed to update review'); return; }
            const updated: Review = json.data;
            setReviews((prev) => prev.map((r) => r.id === id ? updated : r));
            if (userReview?.id === id) setUserReview(updated);
            setEditingId(null);
            router.refresh();
        } finally {
            setEditBusy(false);
        }
    }

    async function deleteReview(id: number) {
        setDeleteBusy(true);
        try {
            const res = await fetch(partnerUrls.reviewById(id), {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) return;
            setReviews((prev) => prev.filter((r) => r.id !== id));
            if (userReview?.id === id) setUserReview(null);
            router.refresh();
        } finally {
            setDeleteBusy(false);
        }
    }

    const isAuthenticated = status === 'authenticated';

    return (
        <section className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-black dark:text-zinc-50">Reviews</h2>

            {status === 'loading' && (
                <p className="text-sm text-zinc-500">Loading…</p>
            )}

            {status === 'unauthenticated' && (
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                    <SignInButton /> to leave a review
                </div>
            )}

            {isAuthenticated && !userReview && (
                <div className="flex flex-col gap-3 rounded border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Write a review</h3>
                    <input
                        type="text"
                        placeholder="Title (optional)"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                    <textarea
                        placeholder="Your review…"
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        rows={4}
                        className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                    {submitError && <p className="text-sm text-red-500">{submitError}</p>}
                    <button
                        onClick={submitReview}
                        disabled={submitBusy}
                        className="self-start rounded bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
                    >
                        {submitBusy ? 'Submitting…' : 'Submit review'}
                    </button>
                </div>
            )}

            {reviews.length === 0 && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">No reviews yet. Be the first!</p>
            )}

            <ul className="flex flex-col gap-4">
                {reviews.map((review) => {
                    const isOwner = isAuthenticated && userReview?.id === review.id;
                    const isEditing = editingId === review.id;

                    return (
                        <li
                            key={review.id}
                            className="flex flex-col gap-2 rounded border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            {isEditing ? (
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Title (optional)"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="rounded border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                                    />
                                    <textarea
                                        value={editBody}
                                        onChange={(e) => setEditBody(e.target.value)}
                                        rows={4}
                                        className="rounded border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                                    />
                                    {editError && <p className="text-sm text-red-500">{editError}</p>}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => saveEdit(review.id)}
                                            disabled={editBusy}
                                            className="rounded bg-zinc-900 px-3 py-1 text-sm text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
                                        >
                                            {editBusy ? 'Saving…' : 'Save'}
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="text-sm text-zinc-500 underline hover:text-black dark:hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex flex-col">
                                            {review.title && (
                                                <p className="font-medium text-zinc-900 dark:text-zinc-50">{review.title}</p>
                                            )}
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                {review.author.displayName} · {formatDate(review.createdAt)}
                                                {review.updatedAt !== review.createdAt && ' (edited)'}
                                            </p>
                                        </div>
                                        {isOwner && (
                                            <div className="flex gap-3 shrink-0">
                                                <button
                                                    onClick={() => startEdit(review)}
                                                    className="text-sm text-zinc-500 underline hover:text-black dark:hover:text-white"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteReview(review.id)}
                                                    disabled={deleteBusy}
                                                    className="text-sm text-red-500 underline hover:text-red-700 disabled:opacity-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">{review.body}</p>
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
