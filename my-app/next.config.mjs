/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    domains: ['img.freepik.com'], // allow this domain
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-roboto)", "sans-serif"],
        serif: ["var(--font-merriweather)", "var(--font-lora)", "serif"],
      },
    },
  },
};

export default nextConfig;
