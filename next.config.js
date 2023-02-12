const crypto = require("crypto");
const { nanoid } = require("nanoid");

const generateCsp = () => {
  const hash = crypto.createHash('sha256');
  hash.update(nanoid());
  const production = process.env.NODE_ENV === 'production';

  return `default-src 'self' https://js.stripe.com/v3/; img-src 'self' https://*.stripe.com; style-src https://fonts.googleapis.com 'self' 'unsafe-inline'; script-src https://js.stripe.com/v3 'sha256-${hash.digest(
    'base64' 
  )}' 'self' ${production ? '' : "'unsafe-eval'"
    }; font-src https://fonts.gstatic.com 'self' data:"`;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,
  poweredByHeader: false,
  swcMinify: true,
  images: {
      domains: [
        '*.stripe.com', 
        "qmvirlrqiiehntmvzgdb.supabase.co"
      ],
    },

  // Adding policies:
  async headers() {
    return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'https://checkout.stripe.com https://js.stripe.com',
            },
            {
              key: 'Content-Security-Policy',
              value:  generateCsp()
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: "X-XXS-Protection",
              value: "1; mode=block"
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
            {
                key: "Strict-Transport-Security",
                value: "max-age=31536000; includeSubDomains; preload"
            },
          ],
        },
      ];
  },
}

module.exports = nextConfig;