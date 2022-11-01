/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async redirects() {
        return [
            {
                source: "/",
                destination: "/profile/siriphat_homnan",
                permanent: true,
            },
            {
                source: "/profile",
                destination: "/profile/siriphat_homnan",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
