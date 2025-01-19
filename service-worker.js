const CACHE_NAME = "guia-entrevistas-v1";
const urlsToCache = [
  "/Teste-OAuth-/",
  "/Teste-OAuth-/index.html",
  "/Teste-OAuth-/manifest.json",
  "/Teste-OAuth-/style.css",
  "/Teste-OAuth-/script.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});