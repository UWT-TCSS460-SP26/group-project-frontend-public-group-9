import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'image.tmdb.org' },
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
        ],
    },
    async redirects() {
        return [
            {
                source: '/browse',
                destination: '/browse/movies',
                permanent: true,
            },
            {
                source: '/search',
                destination: '/search/movies',
                permanent: true,
            },
        ]
    }
};

export default nextConfig;
