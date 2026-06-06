'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { signIn, signOut, useSession } from 'next-auth/react';

export function SignInButton({ callbackUrl = usePathname() }: { callbackUrl?: string }) {
    return (
        <button className="px-3 py-3 hover:bg-background-less hover:cursor-pointer" onClick={() => signIn('tcss460', { callbackUrl })}>
            Sign in
        </button>
    );
}

export function SignOutButton() {
    return (
        <button className="px-3 py-3 hover:bg-background-less hover:cursor-pointer" onClick={() => signOut({ callbackUrl: '/' })}>
            Sign out
        </button>
    );
}

export function UserBadge() {
    const { data: session, status } = useSession();
    if (status === 'loading') return <span className="ml-auto text-sm">Loading…</span>;
    if (status === 'unauthenticated') return <span className="ml-auto"><SignInButton /></span>;
    return (
        <div className="ml-auto flex items-center gap-1">
            <Link
                href="/profile"
                className="px-3 py-3 text-lg font-medium hover:bg-background-less"
            >
                <FontAwesomeIcon icon={faCircleUser} />
                <span className="hidden sm:inline"> Profile</span>
            </Link>
            <SignOutButton />
        </div>
    );
}
