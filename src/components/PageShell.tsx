'use client';

import { SignInButton, SignOutButton, UserBadge } from '@/components/AuthButtons';
import Link from 'next/link';

import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';

export default function PageShell({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const signedIn = status === 'authenticated';

    return (
        <section>
            <header className="flex items-center justify-between w-full max-w-5xl mx-auto px-6 py-2 border-b border-zinc-200 dark:border-zinc-800">
                <Link href="/" className="px-3 py-3 text-lg font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800">
                    Home
                </Link>
                <Link href="/browse" className="px-3 py-3 text-lg font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800">
                    Browse
                </Link>
                <Link href="/search" className="px-3 py-3 text-lg font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800">
                    Search
                </Link>
                <UserBadge />
            </header>
            <main className="flex flex-col flex-1 max-w-5xl mx-auto my-5 bg-zinc-50 font-sans dark:bg-black">
                { children }
            </main>
        </section>
    );
}