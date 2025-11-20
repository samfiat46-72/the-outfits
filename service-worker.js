const CACHE_NAME = 'the-outfits-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/privacy.html',
  '/refund.html',
  '/terms.html',
  '/shipping.html',
  '/contact.html',
  '/logo.png', // Add your logo if exists
  '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Installed');

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS);
    })
  );

  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch & Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return (
        cacheRes ||
        fetch(event.request)
          .then(networkRes => {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkRes.clone());
              return networkRes;
            });
          })
          .catch(() => caches.match('/offline.html'))
      );
    })
  );
});
