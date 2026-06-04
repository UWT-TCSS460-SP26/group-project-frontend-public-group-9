import Link from 'next/link';

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
            </header>

            <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                    href="/browse/movies"
                    className="flex flex-col gap-1 rounded border border-zinc-200 bg-white px-5 py-4 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
                >
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">Browse movies</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">See what&apos;s popular</span>
                </Link>
                <Link
                    href="/browse/shows"
                    className="flex flex-col gap-1 rounded border border-zinc-200 bg-white px-5 py-4 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
                >
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">Browse shows</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">See what&apos;s popular</span>
                </Link>
                <Link
                    href="/search/movies"
                    className="flex flex-col gap-1 rounded border border-zinc-200 bg-white px-5 py-4 hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
                >
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">Search</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">Find a specific title</span>
                </Link>
            </div>
        </div>
    );
}
