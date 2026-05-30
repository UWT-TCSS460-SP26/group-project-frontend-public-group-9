import Image from 'next/image';

import { auth } from '@/lib/auth';
import { partnerUrls, type ShowSummary, type Rating, type Review, type RatingSummary } from '@/lib/partnerApi';
import RatingWidget from '@/components/RatingWidget';
import ReviewSection from '@/components/ReviewSection';

type DetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ShowDetailsPage({ params }: DetailsPageProps) {
    const { id } = await params;
    const session = await auth();
    const token = session?.accessToken;
    const authHeader: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    const [showRes, ratingRes, reviewsRes] = await Promise.all([
        fetch(partnerUrls.showDetails(id), { cache: 'no-store' }),
        fetch(partnerUrls.ratingsSummary(id, 'tv'), { cache: 'no-store' }),
        fetch(partnerUrls.reviews(id, 'tv'), { cache: 'no-store' }),
    ]);

    if (showRes.status === 404) {
        return (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No show found with id {id}.
            </p>
        );
    }

    if (!showRes.ok) {
        throw new Error(`Backend failed: ${showRes.status} ${showRes.statusText}`);
    }

    const show = (await showRes.json()) as ShowSummary;

    const ratingSummary: RatingSummary = ratingRes.ok
        ? (await ratingRes.json()).data
        : { mediaId: parseInt(id), mediaType: 'tv', average: null, count: 0 };

    const reviews: Review[] = reviewsRes.ok ? (await reviewsRes.json()).data ?? [] : [];

    let userRating: Rating | null = null;
    let userReview: Review | null = null;

    if (token) {
        const [myRatingsRes, myReviewsRes] = await Promise.all([
            fetch(partnerUrls.ratingsMe(), { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }),
            fetch(partnerUrls.reviewsMe(), { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }),
        ]);
        if (myRatingsRes.ok) {
            const data = await myRatingsRes.json();
            userRating = (data.data as Rating[]).find(
                (r) => r.mediaId === parseInt(id) && r.mediaType === 'tv'
            ) ?? null;
        }
        if (myReviewsRes.ok) {
            const data = await myReviewsRes.json();
            userReview = (data.data as Review[]).find(
                (r) => r.mediaId === parseInt(id) && r.mediaType === 'tv'
            ) ?? null;
        }
    }

    return (
        <article className="flex flex-col gap-8 p-4 sm:p-0">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                <div className="relative aspect-[2/3] w-full max-w-[260px] flex-shrink-0 overflow-hidden rounded border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                    {show.posterUrl ? (
                        <Image
                            src={show.posterUrl}
                            alt={`${show.title} poster`}
                            fill
                            sizes="(min-width: 640px) 260px, 100vw"
                            priority
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
                            No poster
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <header className="flex flex-col gap-1">
                        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
                            {show.title}
                        </h1>
                        {show.airDate && (
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Aired {show.airDate}
                            </p>
                        )}
                    </header>

                    {show.synopsis && (
                        <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
                            {show.synopsis}
                        </p>
                    )}

                    <RatingWidget
                        mediaId={parseInt(id)}
                        mediaType="tv"
                        summary={ratingSummary}
                        userRating={userRating}
                    />
                </div>
            </div>

            <ReviewSection
                mediaId={parseInt(id)}
                mediaType="tv"
                reviews={reviews}
                userReview={userReview}
            />
        </article>
    );
}
