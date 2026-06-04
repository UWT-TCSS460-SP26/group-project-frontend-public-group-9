import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { auth } from '@/lib/auth';
import { partnerUrls, type ShowPage } from '@/lib/partnerApi';

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q?.trim() ?? '';

    let data: ShowPage | null = null;
    let errorMessage: string | null = null;

    if (query) {
        const response = await fetch(partnerUrls.searchShows(query), {
            cache: 'no-store',
        });

        if (!response.ok) {
            errorMessage = `Search failed (${response.status} ${response.statusText}).`;
        } else {
            data = (await response.json()) as ShowPage;
        }
    }

    return (
        <>
            <div className="flex flex-row items-center justify-between w-full p-2 text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
                <h1>
                    <FontAwesomeIcon icon={faFilm} />
                    <span> Search shows</span>
                </h1>
                <Link href="/search/movies" className="ml-auto px-3 hover:text-black hover:bg-zinc-200 dark:hover:text-white dark:hover:bg-zinc-800">
                    <span>Movies </span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </div>

            <form action="/search/shows" method="GET" className="flex gap-2 w-full">
                <input
                    type="text"
                    name="q"
                    defaultValue={query}
                    placeholder="e.g. breaking bad"
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
                            {data.results.map((show) => (
                                <li key={show.id}>
                                    <Link
                                        href={`/shows/${show.id}`}
                                        className="group flex flex-col gap-2"
                                    >
                                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                                            {show.posterUrl ? (
                                                <Image
                                                    src={show.posterUrl}
                                                    alt={`${show.title} poster`}
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
                                                {show.title}
                                            </span>
                                            {show.airDate && (
                                                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                    {show.airDate.slice(0, 4)}
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
        </>
    );
}
