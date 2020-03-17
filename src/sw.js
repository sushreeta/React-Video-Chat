console.log("In sw.js");

workbox.core.skipWaiting();
workbox.core.clientsClaim();

//perform any action at the time of SW installation
self.addEventListener("install", event => {
  console.log("install");
  //indexDB, local storage, delete old cache
  const asyncPromise = new Promise(resolve => {
    console.log("waiting to resolve...");
    setTimeout(resolve, 5000);
  });
  event.waitUntil(asyncPromise);
});

//perform any action at the time of SW activation
self.addEventListener("activate", event => {
  console.log("activate");
});

//Cache bootstrap from network
workbox.routing.registerRoute(
  new RegExp("https:.*min.(css|js)"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "cdn-cache"
  })
);

//cache data from network
workbox.routing.registerRoute(
  new RegExp("/.*.json"), // in prod we generally use RE as "/.*:4567.*\.json"
  new workbox.strategies.NetworkFirst()
);

//Handle error for POST & DELETE when offline
self.addEventListener("fetch", event => {
  if (event.request.method === "POST" || event.request.method === "DELETE") {
    event.respondWith(
      fetch(event.request).catch(err => {
        return new Response(
          JSON.stringify({
            error: "This action disabled while the app is offline"
          }),
          {
            headers: { "Content-Type": "application/json" }
          }
        );
      })
    );
  }
});

self.addEventListener("push", event => {
  event.waitUntil(
    self.registration.showNotification("Todo List", {
      icon: "/icon-120.png",
      body: event.data.text()
    })
  );
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
