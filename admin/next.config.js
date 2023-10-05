/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NEXT_PUBLIC_ENV === "dev" ? false : true,
    },
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
