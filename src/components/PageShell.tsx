'use client';

import { UserBadge } from '@/components/AuthButtons';
import DarkModeToggle from '@/components/DarkModeToggle';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStar } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';

export default function PageShell({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const signedIn = status === 'authenticated';

    return (
        <section>
            <Link href="#content" className="not-focus:sr-only focus:block absolute top-2 left-2 text-lg bg-background-less p-2 rounded">Skip to main content</Link>
            <ScrollToTop />
            <header className="flex items-center justify-between w-full max-w-5xl mx-auto px-6 py-2 border-b border-background-less text-foreground">
                <Link href="/" className="px-3 py-3 text-lg font-medium hover:text-foreground-less hover:bg-background-less">
                    <FontAwesomeIcon icon={faHouse} />
                    <span className="hidden sm:inline"> Home</span>
                </Link>
                <Link href="/browse" className="px-3 py-3 text-lg font-medium hover:text-foreground-less hover:bg-background-less">
                    <FontAwesomeIcon icon={faStar} />
                    <span className="hidden sm:inline"> Browse</span>
                </Link>
                <Link href="/search" className="px-3 py-3 text-lg font-medium hover:text-foreground-less hover:bg-background-less">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span className="hidden sm:inline"> Search</span>
                </Link>
                <Link href="/about" className="px-3 py-3 text-lg font-medium hover:text-foreground-less hover:bg-background-less">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    <span className="hidden sm:inline"> About</span>
                </Link>
                <UserBadge />
                <DarkModeToggle />
            </header>
            <main id="content" className="flex flex-col items-center justify-center flex-1 max-w-5xl mx-auto my-5 bg-background text-foreground font-sans">
                { children }
            </main>
        </section>
    );
}