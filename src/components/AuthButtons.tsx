'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export function SignInButton({ callbackUrl = '/' }: { callbackUrl?: string }) {
    return (
        <button className="px-3 py-3 hover:text-black hover:bg-zinc-200 dark:hover:text-white dark:hover:bg-zinc-800" onClick={() => signIn('tcss460', { callbackUrl })}>
            Sign in
        </button>
    );
}

export function SignOutButton() {
    return (
        <button className="px-3 py-3 hover:text-black hover:bg-zinc-200 dark:hover:text-white dark:hover:bg-zinc-800" onClick={() => signOut({ callbackUrl: '/' })}>
            Sign out
        </button>
    );
}

export function UserBadge() {
    const { data: session, status } = useSession();
    if (status === 'loading') return <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-400">Loading…</span>;
    if (status === 'unauthenticated') return <span className="ml-auto"><SignInButton /></span>;
    return (
        <div className="ml-auto flex items-center gap-1">
            <Link
                href="/profile"
                className="px-3 py-3 text-lg font-medium text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800"
            >
                Profile
            </Link>
            <SignOutButton />
        </div>
    );
}
