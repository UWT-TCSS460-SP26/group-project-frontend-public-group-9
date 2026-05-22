import { NextResponse } from 'next/server';
import { auth } from './lib/auth';

/**
 * Section-level auth gate for the `(dashboard)` route group.
 *
 * Auth.js v5 ships an `auth()` wrapper that, used as middleware, populates
 * `request.auth` from the session cookie. We then either let the request
 * through or bounce to `/api/auth/signin` with a `callbackUrl` so the user
 * lands back where they were trying to go after signing in.
 *
 * The matcher enumerates URL paths (route groups like `(dashboard)` aren't
 * part of the URL, so we can't match by group name). Add new dashboard
 * pages here when they're created.
 */
export default auth((request) => {
    if (!request.auth) {
        const signInUrl = new URL('/api/auth/signin', request.url);
        signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
        return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
});

export const config = {
    matcher: [],
};