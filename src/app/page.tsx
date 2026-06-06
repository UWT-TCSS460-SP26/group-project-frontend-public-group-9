import type { Metadata } from 'next'
import Carousels from '@/components/Carousels';

export const metadata: Metadata = {
  title: 'Group 9 Frontend',
}

export default function Home() {
    return (
        <>
            <h1 className="text-3xl font-semibold tracking-tight">
                TCSS460 Group 9
            </h1>
            <p className="text-base">
                Rate and review movies and TV shows.
            </p>
            <Carousels />
        </>
    );
}
