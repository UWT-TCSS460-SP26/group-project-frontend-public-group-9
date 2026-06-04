import type { NextConfig } from 'next';
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'image.tmdb.org' },
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

export default withFlowbiteReact(nextConfig);