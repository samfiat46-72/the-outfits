self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("the-outfits-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/contact.html",
        "/privacy.html",
        "/refunds.html",
        "/terms.html",
        "/shipping.html",
        "/thankyou.html",
        "/checkout.html",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
