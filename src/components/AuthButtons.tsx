'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export function SignInButton({ callbackUrl = '/' }: { callbackUrl?: string }) {
    return (
        <button className="px-3 py-3 hover:text-black dark:hover:text-white dark:hover:bg-zinc-800" onClick={() => signIn('tcss460', { callbackUrl })}>
        Sign in
        </button>
    );
}

export function SignOutButton() {
    return <button className="px-3 py-3 hover:text-black dark:hover:text-white dark:hover:bg-zinc-800" onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>;
}

export function UserBadge() {
    const { data: session, status } = useSession();
    if (status === 'loading') return <span className="ml-auto text-lg font-medium text-zinc-700 dark:text-zinc-300">Loading...</span>;
    if (status === 'unauthenticated') return <span className="ml-auto text-lg font-medium text-zinc-700 dark:text-zinc-300"><SignInButton /></span>;
    return (
        <span className="ml-auto text-lg font-medium text-zinc-700 dark:text-zinc-300">
            Signed in as {session?.user?.email} <SignOutButton />
        </span>
    );
}