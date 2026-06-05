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
            <h2 className="text-xl font-semibold">Reviews</h2>

            {status === 'loading' && (
                <p className="text-sm">Loading…</p>
            )}

            {status === 'unauthenticated' && (
                <div className="flex items-center gap-2 text-sm">
                    <SignInButton /> to leave a review
                </div>
            )}

            {isAuthenticated && !userReview && (
                <div className="flex flex-col gap-3 rounded border border-background-less p-4">
                    <h3 className="text-sm font-medium">Write a review</h3>
                    <input
                        type="text"
                        placeholder="Title (optional)"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="rounded border border-background-less px-3 py-2 text-sm"
                    />
                    <textarea
                        placeholder="Your review…"
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        rows={4}
                        className="rounded border border-background-less px-3 py-2 text-sm"
                    />
                    {submitError && <p className="text-sm text-red-500">{submitError}</p>}
                    <button
                        onClick={submitReview}
                        disabled={submitBusy}
                        className="self-start rounded px-4 py-2 text-sm bg-foreground text-background hover:bg-foreground-less disabled:opacity-50"
                    >
                        {submitBusy ? 'Submitting…' : 'Submit review'}
                    </button>
                </div>
            )}

            {reviews.length === 0 && (
                <p className="text-sm">No reviews yet. Be the first!</p>
            )}

            <ul className="flex flex-col gap-4">
                {reviews.map((review) => {
                    const isOwner = isAuthenticated && userReview?.id === review.id;
                    const isEditing = editingId === review.id;

                    return (
                        <li
                            key={review.id}
                            className="flex flex-col gap-2 rounded border border-background-less p-4"
                        >
                            {isEditing ? (
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="Title (optional)"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="rounded border border-background-less px-3 py-2 text-sm"
                                    />
                                    <textarea
                                        value={editBody}
                                        onChange={(e) => setEditBody(e.target.value)}
                                        rows={4}
                                        className="rounded border border-background-less px-3 py-2 text-sm"
                                    />
                                    {editError && <p className="text-sm text-red-500">{editError}</p>}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => saveEdit(review.id)}
                                            disabled={editBusy}
                                            className="rounded px-3 py-1 text-sm bg-foreground text-background hover:bg-foreground-less disabled:opacity-50"
                                        >
                                            {editBusy ? 'Saving…' : 'Save'}
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="rounded px-3 py-1 text-sm bg-foreground text-background hover:bg-foreground-less disabled:opacity-50"
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
                                                <p className="font-medium">{review.title}</p>
                                            )}
                                            <p className="text-xs">
                                                {review.author.displayName} · {formatDate(review.createdAt)}
                                                {review.updatedAt !== review.createdAt && ' (edited)'}
                                            </p>
                                        </div>
                                        {isOwner && (
                                            <div className="flex gap-3 shrink-0">
                                                <button
                                                    onClick={() => startEdit(review)}
                                                    className="text-sm underline text-foreground-less hover:text-foreground"
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
                                    <p className="text-sm leading-6">{review.body}</p>
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
