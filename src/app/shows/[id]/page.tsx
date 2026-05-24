import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { partnerUrls, type ShowSummary } from '@/lib/partnerApi';

type DetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function ShowDetailsPage({ params }: DetailsPageProps) {
    const { id } = await params;

    const session = await auth();
    if (!session?.accessToken) {
        redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/shows/${id}`)}`);
    }

    const response = await fetch(partnerUrls.showDetails(id), {
        headers: { Authorization: `Bearer ${session.accessToken}` },
        cache: 'no-store',
    });

    if (response.status === 401) {
        redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/shows/${id}`)}`);
    }

    if (response.status === 404) {
        return (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No show found with id {id}.
            </p>
        );
    }

    if (!response.ok) {
        throw new Error(`Backend failed: ${response.status} ${response.statusText}`);
    }

    const show = (await response.json()) as ShowSummary;

    return (
        <article className="flex flex-col gap-8 sm:flex-row sm:items-start">
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

                <aside className="mt-2 rounded border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                    Sign in to rate and review (coming Sprint 7)
                </aside>
            </div>
        </article>
    );
}