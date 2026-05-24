import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { UserBadge } from '@/components/AuthButtons';
import { auth } from '@/lib/auth';
import { partnerUrls, type MoviePage } from '@/lib/partnerApi';

export default async function BrowsePage() {
    const session = await auth();
    if (!session?.accessToken) {
        redirect('/api/auth/signin?callbackUrl=/browse');
    }

    const response = await fetch(partnerUrls.popularMovies(), {
        headers: { Authorization: `Bearer ${session.accessToken}` },
        cache: 'no-store',
    });

    if (response.status === 401) {
        redirect('/api/auth/signin?callbackUrl=/browse');
    }

    if (!response.ok) {
        throw new Error(`Backend failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as MoviePage;

    return (
        <>
            <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
                Popular movies
            </h1>

            {data.results.length === 0 ? (
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Nothing popular right now.
                </p>
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
        </>
    );
}
