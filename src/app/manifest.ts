export default function manifest() {
  return {
    name: 'EXZLR',
    short_name: 'EXZLR',
    description: 'Automation & custom software for growing businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0a09',
    theme_color: '#0b0a09',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
