import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClapperboard, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { partnerUrls, type ShowPage } from '@/lib/partnerApi';

export default async function BrowsePage() {
    const response = await fetch(partnerUrls.popularShows(), {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Backend failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as ShowPage;

    return (
        <>
            <div className="flex flex-row items-center justify-between w-full p-2 text-2xl font-semibold tracking-tight">
                <h1>
                    <FontAwesomeIcon icon={faClapperboard} />
                    <span> Popular shows</span>
                </h1>
                <Link href="/browse/movies" className="ml-auto px-3 hover:bg-background-less">
                    <span>Movies </span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </div>

            {data.results.length === 0 ? (
                <p className="text-sm">
                    Nothing popular right now.
                </p>
            ) : (
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-3">
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
                                        <div className="flex h-full w-full items-center justify-center text-xs text-foreground-less">
                                            No poster
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium group-hover:underline">
                                        {show.title}
                                    </span>
                                    {show.airDate && (
                                        <span className="text-xs text-foreground-less">
                                            {show.airDate.slice(0, 4)}
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
