const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  publicRuntimeConfig: {
    // Will be available on both server and client
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_READABLE_API_TOKEN:
      process.env.NEXT_PUBLIC_SANITY_READABLE_API_TOKEN,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
    SANITY_API_TOKEN_VIEWER: process.env.SANITY_API_TOKEN_VIEWER,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    SANITY_WRITABLE_API_TOKEN: process.env.SANITY_WRITABLE_API_TOKEN,
    MY_VERCEL_DEPLOY_HOOK: process.env.MY_VERCEL_DEPLOY_HOOK,
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
});
