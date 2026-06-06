import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { partnerUrls, type ShowPage } from '@/lib/partnerApi';

type SearchPageProps = {
    searchParams: Promise<{ q?: string }>;
};


export const metadata: Metadata = {
  title: 'Search Shows',
}

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
            <div className="flex flex-row items-center justify-between w-full text-2xl my-2 font-semibold tracking-tight">
                <h1>
                    <FontAwesomeIcon icon={faFilm} />
                    <span> Search shows</span>
                </h1>
                <Link href="/search/movies" className="ml-auto px-3 hover:bg-background-less rounded">
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
                    className="flex-1 rounded border border-background-less px-3 py-2 text-sm placeholder:text-foreground-less focus:outline-none focus:ring-2 focus:ring-foreground-less"
                />
                <button
                    type="submit"
                    className="rounded bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground-less"
                >
                    Search
                </button>
            </form>

            {errorMessage && (
                <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
            )}

            {data && (
                <section className="flex flex-col gap-4">
                    <p className="text-sm">
                        {data.pagination.totalResults} result
                        {data.pagination.totalResults === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
                    </p>
                    {data.results.length === 0 ? (
                        <p className="text-sm">No matches.</p>
                    ) : (
                        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {data.results.map((show) => (
                                <li key={show.id}>
                                    <Link
                                        href={`/shows/${show.id}`}
                                        className="group flex flex-col gap-2"
                                    >
                                        <div className="relative aspect-[2/3] w-full overflow-hidden rounded border border-background-less">
                                            {show.posterUrl ? (
                                                <Image
                                                    src={show.posterUrl}
                                                    alt={`${show.title} poster`}
                                                    fill
                                                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                                                    className="object-cover transition-opacity group-hover:opacity-90"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs">
                                                    No poster
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium group-hover:underline">
                                                {show.title}
                                            </span>
                                            {show.airDate && (
                                                <span className="text-xs">
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
