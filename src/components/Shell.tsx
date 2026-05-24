import { SignInButton, SignOutButton } from '@/components/AuthButtons';

import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';

export default function DashboardShell({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const signedIn = status === 'authenticated';

    return (
        <section>
            <nav>
                Hello world!
            </nav>
            { children }
        </section>
    );
}