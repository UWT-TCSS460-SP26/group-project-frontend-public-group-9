'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export function SignInButton({ callbackUrl = '/dashboard' }: { callbackUrl?: string }) {
    return (
        <button onClick={() => signIn('tcss460', { callbackUrl })}>
        Sign in
        </button>
    );
}

export function SignOutButton() {
    return <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>;
}

export function UserBadge() {
    const { data: session, status } = useSession();
    if (status === 'loading') return <span>...</span>;
    if (status === 'unauthenticated') return <SignInButton />;
    return (
        <span>
        Signed in as {session?.user?.email} <SignOutButton />
        </span>
    );
}