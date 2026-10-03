/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent your site from being iframed (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Stop browsers sniffing MIME types
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only send referrer on same-origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Force HTTPS for 1 year
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Disable browser features you don't use
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Basic Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-inline needed for Next.js inline scripts
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "media-src 'self'",
              "connect-src 'self' https://api.resend.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/videos/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/(.*\\.png|.*\\.svg|.*\\.jpg|.*\\.webp|.*\\.ico)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
