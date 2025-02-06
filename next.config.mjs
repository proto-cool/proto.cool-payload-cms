import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
        FRONTEND_BUILD_URL: process.env.FRONTEND_BUILD_URL,
    },
};

export default withPayload(nextConfig);
