// Service worker: makes the app installable and usable offline. On install it caches the app shell
// (index.html plus every script and stylesheet it references, including the CDN libraries). After
// that, GET requests are served from cache and refreshed in the background, so content updates
// show up on the next visit. Bump VERSION to drop old caches.
const VERSION = 'v2';
const CACHE = `fabricprep-${VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const html = await (await fetch('./index.html', { cache: 'reload' })).text();
    const urls = new Set(['./', './index.html', './manifest.webmanifest', './icons/icon-192.png']);
    for (const m of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css))"/g)) urls.add(m[1]);
    await Promise.all([...urls].map((u) => cache.add(new Request(u, { cache: 'reload' })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('fabricprep-') && k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith('http')) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
    const network = fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    if (cached) { event.waitUntil(network); return cached; }
    return (await network) || (req.mode === 'navigate' ? cache.match('./index.html') : Response.error());
  })());
});
