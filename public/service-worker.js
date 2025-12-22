// ============================================
// SERVICE WORKER - WeTalk PWA
// Guarda este archivo en: public/service-worker.js
// ============================================

const CACHE_NAME = 'wetalk-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.png',
  '/icon-192.png',
  '/icon-512.png'
];

// Instalación - cachear archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activación - limpiar cache viejo
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache viejo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch - servir desde cache si está offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - retornar respuesta
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Verificar si recibimos una respuesta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clonar la respuesta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Si falla, mostrar página offline
        return caches.match('/index.html');
      })
  );
});

// Push notifications (para después)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Tienes un nuevo mensaje',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'wetalk-notification'
  };

  event.waitUntil(
    self.registration.showNotification('WeTalk', options)
  );
});