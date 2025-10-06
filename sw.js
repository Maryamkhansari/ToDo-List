self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("todo-cache").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./my-todo.js",
        "./my-todo.css",
        "./icon.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
