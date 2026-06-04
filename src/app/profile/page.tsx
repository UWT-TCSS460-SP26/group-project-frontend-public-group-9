import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { partnerUrls, type Rating, type Review } from '@/lib/partnerApi';

type MediaDetails = { title: string; posterUrl: string | null };

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.accessToken) {
        redirect('/api/auth/signin?callbackUrl=/profile');
    }

    const token = session.accessToken;

    const [ratingsRes, reviewsRes] = await Promise.all([
        fetch(partnerUrls.ratingsMe(), { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }),
        fetch(partnerUrls.reviewsMe(), { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }),
    ]);

    const ratings: Rating[] = ratingsRes.ok ? (await ratingsRes.json()).data ?? [] : [];
    const reviews: Review[] = reviewsRes.ok ? (await reviewsRes.json()).data ?? [] : [];

    const uniqueMedia = [...new Map([
        ...ratings.map(r => [`${r.mediaType}:${r.mediaId}`, { mediaType: r.mediaType, mediaId: r.mediaId }] as const),
        ...reviews.map(r => [`${r.mediaType}:${r.mediaId}`, { mediaType: r.mediaType, mediaId: r.mediaId }] as const),
    ]).values()];

    const detailsEntries = await Promise.all(
        uniqueMedia.map(async ({ mediaType, mediaId }) => {
            const url = mediaType === 'movie'
                ? partnerUrls.movieDetails(String(mediaId))
                : partnerUrls.showDetails(String(mediaId));
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) return null;
            const json = await res.json();
            return [`${mediaType}:${mediaId}`, { title: json.title, posterUrl: json.posterUrl ?? null }] as [string, MediaDetails];
        })
    );
    const detailsMap = new Map<string, MediaDetails>(detailsEntries.filter(Boolean) as [string, MediaDetails][]);

    return (
        <div className="flex flex-col gap-10 w-full px-2 sm:p-4">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
                    Your profile
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{session.user?.email}</p>
            </header>

            {/* Ratings section */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                    Your ratings ({ratings.length})
                </h2>
                {ratings.length === 0 ? (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        You haven&apos;t rated anything yet.{' '}
                        <Link href="/browse/movies" className="underline hover:text-black dark:hover:text-white">
                            Browse movies
                        </Link>{' '}
                        or{' '}
                        <Link href="/browse/shows" className="underline hover:text-black dark:hover:text-white">
                            shows
                        </Link>{' '}
                        to get started.
                    </p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {ratings.map((rating) => {
                            const details = detailsMap.get(`${rating.mediaType}:${rating.mediaId}`);
                            const href = rating.mediaType === 'movie'
                                ? `/movies/${rating.mediaId}`
                                : `/shows/${rating.mediaId}`;
                            return (
                                <li
                                    key={rating.id}
                                    className="flex items-center justify-between rounded border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div className="flex flex-col">
                                        <Link href={href} className="font-medium text-zinc-900 hover:underline dark:text-zinc-50">
                                            {details?.title ?? `${rating.mediaType} #${rating.mediaId}`}
                                        </Link>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {rating.mediaType === 'movie' ? 'Movie' : 'TV series'} · Rated {formatDate(rating.createdAt)}
                                        </span>
                                    </div>
                                    <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                        {rating.score}<span className="text-sm font-normal text-zinc-500">/10</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>

            {/* Reviews section */}
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50">
                    Your reviews ({reviews.length})
                </h2>
                {reviews.length === 0 ? (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        You haven&apos;t written any reviews yet.
                    </p>
                ) : (
                    <ul className="flex flex-col gap-4">
                        {reviews.map((review) => {
                            const details = detailsMap.get(`${review.mediaType}:${review.mediaId}`);
                            const href = review.mediaType === 'movie'
                                ? `/movies/${review.mediaId}`
                                : `/shows/${review.mediaId}`;
                            return (
                                <li
                                    key={review.id}
                                    className="flex flex-col gap-2 rounded border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-col">
                                            <Link href={href} className="font-medium text-zinc-900 hover:underline dark:text-zinc-50">
                                                {details?.title ?? `${review.mediaType} #${review.mediaId}`}
                                            </Link>
                                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                {review.mediaType === 'movie' ? 'Movie' : 'TV series'} · {formatDate(review.createdAt)}
                                                {review.updatedAt !== review.createdAt && ' (edited)'}
                                            </span>
                                        </div>
                                    </div>
                                    {review.title && (
                                        <p className="font-medium text-zinc-800 dark:text-zinc-200">{review.title}</p>
                                    )}
                                    <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">{review.body}</p>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
}
