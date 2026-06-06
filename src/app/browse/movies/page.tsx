import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { partnerUrls, type MoviePage } from '@/lib/partnerApi';

export const metadata: Metadata = {
  title: 'Browse Movies',
}

export default async function BrowsePage() {
    const response = await fetch(partnerUrls.popularMovies(), {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Backend failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as MoviePage;

    return (
        <>
            <div className="flex flex-row items-center justify-between w-full text-2xl font-semibold tracking-tight my-2">
                <h1>
                    <FontAwesomeIcon icon={faFilm} />
                    <span> Popular movies</span>
                </h1>
                <Link href="/browse/shows" className="ml-auto px-3 hover:bg-background-less rounded">
                    <span>Shows </span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </div>

            {data.results.length === 0 ? (
                <p className="text-sm">
                    Nothing popular right now.
                </p>
            ) : (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-3">
                    {data.results.map((movie) => (
                        <li key={movie.id}>
                            <Link
                                href={`/movies/${movie.id}`}
                                className="group flex flex-col gap-2"
                            >
                                <div className="relative aspect-[2/3] w-full overflow-hidden rounded border border-background-less">
                                    {movie.posterUrl ? (
                                        <Image
                                            src={movie.posterUrl}
                                            alt={`${movie.title} poster`}
                                            fetchPriority="high"
                                            loading="eager"
                                            fill
                                            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                                            className="object-cover transition-opacity group-hover:opacity-90"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-xs text-foreground-less">
                                            No poster
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium group-hover:underline">
                                        {movie.title}
                                    </span>
                                    {movie.releaseDate && (
                                        <span className="text-xs-less text-foreground-less">
                                            {movie.releaseDate.slice(0, 4)}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
