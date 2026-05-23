import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { UserBadge } from '@/components/AuthButtons';
import { auth } from '@/lib/auth';
import { partnerUrls, type MoviePage } from '@/lib/partnerApi';

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q?.trim() ?? '';

    let data: MoviePage | null = null;
    let errorMessage: string | null = null;

    if (query) {
        const session = await auth();
        if (!session?.accessToken) {
            redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/search?q=${query}`)}`);
        }

        const response = await fetch(partnerUrls.searchMovies(query), {
            headers: { Authorization: `Bearer ${session.accessToken}` },
            cache: 'no-store',
        });

        if (response.status === 401) {
            redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(`/search?q=${query}`)}`);
        }

        if (!response.ok) {
            errorMessage = `Search failed (${response.status} ${response.statusText}).`;
        } else {
            data = (await response.json()) as MoviePage;
        }
    }

    return (
        <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
            <header className="flex items-center justify-between w-full max-w-5xl mx-auto px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <Link href="/" className="text-sm font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white">
                    ← Home
                </Link>
                <UserBadge />
            </header>

            <main className="flex flex-col flex-1 w-full max-w-5xl mx-auto px-6 py-8 gap-6">
                <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
                    Search movies
                </h1>

                <form action="/search" method="GET" className="flex gap-2">
                    <input
                        type="text"
                        name="q"
                        defaultValue={query}
                        placeholder="e.g. inception"
                        className="flex-1 rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                    />
                    <button
                        type="submit"
                        className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                    >
                        Search
                    </button>
                </form>

                {errorMessage && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
                )}

                {data && (
                    <section className="flex flex-col gap-4">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {data.pagination.totalResults} result
                            {data.pagination.totalResults === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
                        </p>
                        {data.results.length === 0 ? (
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">No matches.</p>
                        ) : (
                            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {data.results.map((movie) => (
                                    <li key={movie.id}>
                                        <Link
                                            href={`/movies/${movie.id}`}
                                            className="group flex flex-col gap-2"
                                        >
                                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                                                {movie.posterUrl ? (
                                                    <Image
                                                        src={movie.posterUrl}
                                                        alt={`${movie.title} poster`}
                                                        fill
                                                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                                                        className="object-cover transition-opacity group-hover:opacity-90"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
                                                        No poster
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-black group-hover:underline dark:text-zinc-50">
                                                    {movie.title}
                                                </span>
                                                {movie.releaseDate && (
                                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                        {movie.releaseDate.slice(0, 4)}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}
