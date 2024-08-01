// next.config.js

module.exports = {
    reactStrictMode: true,
    env: {
      GITHUB_TOKEN: process.env.GITHUB_TOKEN
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/index.html',
          permanent: true,
        },
      ];
    },
  };