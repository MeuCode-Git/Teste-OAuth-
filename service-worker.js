const CACHE_NAME = "v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./style.css", // Se tiver um arquivo CSS separado
  "./script.js", // Se tiver um arquivo JS separado
  "./icon-192x192.png",
  "./icon-512x512.png"
];

// Instala o Service Worker e faz cache dos arquivos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Responde com recursos do cache quando possível
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza o cache
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

if (window.matchMedia("(display-mode: standalone)").matches) {
    console.log("App aberto no modo PWA");
} else {
    alert("Este aplicativo só pode ser usado quando instalado.");
    window.location.href = "https://meucode-git.github.io/Teste-OAuth-/";
}


