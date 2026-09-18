/* RiseONE — service worker
   Guarda o app para abrir sem internet e recebe as notificacoes.
   Troque CACHE_VER ao publicar uma versao nova. */
const CACHE_VER = "riseone-v2.2.3";
const CORE = ["./", "./index.html", "./manifest.json", "./icone-192.png", "./icone-512.png", "./icone-maskable.png", "./fundo.jpg", "./fundo-celular.jpg", "./fundo-claro.jpg", "./fundo-claro-celular.jpg"];

self.addEventListener("install", ev => {
  ev.waitUntil(caches.open(CACHE_VER).then(c => c.addAll(CORE).catch(() => null)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", ev => {
  ev.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_VER).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("message", ev => {
  const d = ev.data || {};
  if (d.type === "skipWaiting") self.skipWaiting();
  /* aviso agendado pela propria pagina */
  if (d.type === "notify" && self.registration.showNotification) {
    self.registration.showNotification(d.title || "RiseONE", {
      body: d.body || "", icon: "./icone-192.png", badge: "./icone-192.png",
      tag: d.tag || "riseone", renotify: true, data: { url: d.url || "./" },
      vibrate: [200, 100, 200]
    });
  }
});
self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;           /* CDNs seguem direto para a rede */
  if (req.mode === "navigate") {
    ev.respondWith(fetch(req).then(r => {
      const cp = r.clone(); caches.open(CACHE_VER).then(c => c.put(req, cp));
      return r;
    }).catch(() => caches.match("./index.html").then(r => r || caches.match("./"))));
    return;
  }
  ev.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => {
      if (r && r.status === 200) { const cp = r.clone(); caches.open(CACHE_VER).then(c => c.put(req, cp)); }
      return r;
    }).catch(() => hit);
    return hit || net;
  }));
});
/* Push de servidor — estrutura pronta, entra em uso quando houver servidor com chave VAPID */
self.addEventListener("push", ev => {
  let d = { title: "RiseONE", body: "" };
  try { if (ev.data) d = Object.assign(d, ev.data.json()); } catch (e) { if (ev.data) d.body = ev.data.text(); }
  ev.waitUntil(self.registration.showNotification(d.title, {
    body: d.body, icon: "./icone-192.png", badge: "./icone-192.png",
    tag: d.tag || "riseone-push", data: { url: d.url || "./" }, vibrate: [200, 100, 200]
  }));
});
self.addEventListener("notificationclick", ev => {
  ev.notification.close();
  const target = (ev.notification.data && ev.notification.data.url) || "./";
  ev.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(ws => {
    for (const w of ws) { if ("focus" in w) { w.navigate && w.navigate(target); return w.focus(); } }
    if (clients.openWindow) return clients.openWindow(target);
  }));
});
