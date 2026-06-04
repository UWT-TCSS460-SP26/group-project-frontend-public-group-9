import Link from 'next/link';
import { partnerUrls, type MoviePage, type ShowPage } from '@/lib/partnerApi';
import MovieCarousel from '@/components/MovieCarousel';

export default async function Home() {
    // const movieResponse = await fetch(partnerUrls.popularMovies(), {
    //     cache: 'no-store',
    // });

    // if (!movieResponse.ok) {
    //     throw new Error(`Backend failed: ${movieResponse.status} ${movieResponse.statusText}`);
    // }

    // const movieData = (await movieResponse.json()) as MoviePage;
        
    // const showResponse = await fetch(partnerUrls.popularMovies(), {
    //     cache: 'no-store',
    // });

    // if (!showResponse.ok) {
    //     throw new Error(`Backend failed: ${showResponse.status} ${showResponse.statusText}`);
    // }

    // const showData = (await showResponse.json()) as ShowPage;
    
    
    return (
        <div className="flex flex-col gap-8 p-4 sm:p-0">
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
                    TCSS460 Group 9
                </h1>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    Rate and review movies and TV shows.
                </p>
            </header>

            <MovieCarousel />
        </div>
    );
}
