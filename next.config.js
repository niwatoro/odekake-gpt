/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    locales: ["jp", "en"],
    defaultLocale: "en",
  },
  images: {
    domains: [""],
  },
};

module.exports = nextConfig;
