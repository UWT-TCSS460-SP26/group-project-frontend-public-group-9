import Link from 'next/link';
import Carousels, { MovieCarousel } from '@/components/Carousels';

export default function Home() {
    return (
        <div className="flex flex-col gap-8 p-4 sm:p-0">
            <header className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
                    TCSS460 Group 9
                </h1>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    Rate and review movies and TV shows.
                </p>
                <div className="relative">
                    <p className="peer/shown">Default display</p>
                    <p className="hidden peer-hover/shown:block absolute z-5 top-0 left-0 bg-neutral-950/75">Hidden display</p>
                </div>
            </header>
            <Carousels />
        </div>
    );
}
