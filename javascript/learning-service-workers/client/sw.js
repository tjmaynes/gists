const cacheName = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/playlists'
];

const ignoredCacheNames = [];

const installHandler = (event) => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log('SW -- Opened cache!');
      return cache.addAll(urlsToCache);
    })
  );
};

const fetchRequestHandler = (event, fetchRequest) => {
  return fetch(fetchRequest)
    .then(response => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        console.log('SW -- Cache Hit!');
        return response;
      }

      const responseToCache = response.clone();
      caches.open(cacheName)
        .then(cache => {
          console.log('SW -- Adding response to cache!');
          cache.put(event.request, responseToCache);
        });

      return response;
    });
};

const fetchHandler = (event) => {
  event.respondWith(
    caches
    .match(event.request)
    .then(response => {
      if (response) {
        console.log('SW -- Cache Hit!');
        return response;
      }

      const fetchRequest = event.request.clone();
      return fetchRequestHandler(event, fetchRequest);
    })
  );
};

const deleteCacheByKeys = (cache, keys) => {
  return Promise.resolve(
    keys.map(cacheName => { 
      if (ignoredCacheNames.indexOf(cacheName) === -1) {
        return cache.delete(cacheName);
      }
    })
  );
};

const activateHandler = (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => deleteCacheByKeys(caches, cacheNames))
  );
};

self.addEventListener('install', installHandler);
self.addEventListener('fetch', fetchHandler);
self.addEventListener('activate', activateHandler);
