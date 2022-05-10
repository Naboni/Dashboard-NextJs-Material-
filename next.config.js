/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
    EMAIL_PUBLIC_KEY: process.env.EMAIL_PUBLIC_KEY,
    PRODUCTION_API_URL: process.env.PRODUCTION_API_URL,
    DEVELOPMENT_API_URL: process.env.DEVELOPMENT_API_URL,
  },
};
