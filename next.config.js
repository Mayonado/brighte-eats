const nextConfig = {
  // Auth Config
  serverRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  generateBuildId: async () => {
    return `${process.env.VERSION}`;
  },
  async rewrites() {
    return [
      {
        source: "/user/:path*",
        destination: "http://localhost:3001/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
