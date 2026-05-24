import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { UserBadge } from '@/components/AuthButtons';
import { auth } from '@/lib/auth';
import { partnerUrls, type MovieSummary } from '@/lib/partnerApi';

type DetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function MovieDetailsPage({ params }: DetailsPageProps) {
    const { id } = await params;

    const session = await auth();
    if (!session?.accessToken) {
        redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/movies/${id}`)}`);
    }

    const response = await fetch(partnerUrls.movieDetails(id), {
        headers: { Authorization: `Bearer ${session.accessToken}` },
        cache: 'no-store',
    });

    if (response.status === 401) {
        redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/movies/${id}`)}`);
    }

    if (response.status === 404) {
        return (
            <PageShell>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    No movie found with id {id}.
                </p>
            </PageShell>
        );
    }

    if (!response.ok) {
        throw new Error(`Backend failed: ${response.status} ${response.statusText}`);
    }

    const movie = (await response.json()) as MovieSummary;

    return (
        <PageShell>
            <article className="flex flex-col gap-8 sm:flex-row sm:items-start">
                <div className="relative aspect-[2/3] w-full max-w-[260px] flex-shrink-0 overflow-hidden rounded border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                    {movie.posterUrl ? (
                        <Image
                            src={movie.posterUrl}
                            alt={`${movie.title} poster`}
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
                            {movie.title}
                        </h1>
                        {movie.releaseDate && (
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Released {movie.releaseDate}
                            </p>
                        )}
                    </header>

                    {movie.synopsis && (
                        <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
                            {movie.synopsis}
                        </p>
                    )}

                    <aside className="mt-2 rounded border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                        Sign in to rate and review (coming Sprint 7)
                    </aside>
                </div>
            </article>
        </PageShell>
    );
}

function PageShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
            <header className="flex items-center justify-between w-full max-w-5xl mx-auto px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <Link
                    href="/"
                    className="text-sm font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
                >
                    ← Home
                </Link>
                <UserBadge />
            </header>
            <main className="flex flex-col flex-1 w-full max-w-5xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
