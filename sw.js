/* RiseONE — service worker
   Guarda o app para abrir sem internet e recebe as notificacoes.
   Troque CACHE_VER ao publicar uma versao nova. */
const CACHE_VER = "riseone-v3.7.0";
const CORE = ["./", "./index.html", "./manifest.json", "./icone-192.png", "./icone-512.png", "./icone-maskable.png", "./fundo.jpg", "./fundo-celular.jpg", "./fundo-claro.jpg", "./fundo-claro-celular.jpg", "./anuncios.json", "./servicos.json", "./fotos-exercicios.jpg", "./cid.json", "./versoes.json", "./tuss.json", "./videos.json", "./tv-riseone.html", "./musicas.json"];

self.addEventListener("install", ev => {
  /* um arquivo faltando (ex.: fotos opcionais) nao pode impedir o resto de ser guardado */
  ev.waitUntil(caches.open(CACHE_VER).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
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
/* pedaco que so' existe no app inteiro: e' como o sw sabe que a pagina veio completa */
const MARCA = 'id="screen"';
function guardada(r) {
  return caches.match("./index.html").then(x => x || caches.match("./")).then(x => x || r ||
    new Response("<h1>RiseONE</h1><p>Sem conexao e sem copia guardada.</p>", {headers:{"Content-Type":"text/html; charset=utf-8"}}));
}
self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;           /* CDNs seguem direto para a rede */
  /* o proprio sw.js e a conferencia de versao ("?ping=") nunca saem do cache:
     e assim que o app descobre que ja existe uma versao nova publicada */
  if (url.pathname.endsWith("/sw.js") || url.searchParams.has("ping")) return;
  if (req.mode === "navigate") {
    /* rede primeiro, mas so' aceita uma pagina de verdade: se o servidor devolver erro
       ou algo que nao e' HTML (publicacao no meio do caminho, por exemplo), usa a copia
       guardada em vez de entregar uma tela em branco. */
    /* a conferencia de "pagina inteira" vale so' para a porta de entrada do app.
       tv-riseone.html e as paginas de teste sao outras paginas e seguem o caminho normal. */
    const ehApp = /(^|\/)(index\.html)?$/.test(url.pathname);
    ev.respondWith(fetch(req).then(r => {
      const ct = (r.headers.get("content-type") || "").toLowerCase();
      if (!ehApp) {
        if (r.ok) { const cp = r.clone(); caches.open(CACHE_VER).then(c => { c.put(req, cp); }); return r; }
        return caches.match(req).then(x => x || r);
      }
      if (!r.ok || ct.indexOf("text/html") < 0) return guardada(r);
      /* 200 com text/html ainda pode vir vazio ou pela metade (publicacao no meio do
         caminho, CDN com resposta truncada). So' vale se for o app inteiro: o RiseONE
         e' um arquivo so' e sempre traz a tela principal dentro. */
      return r.clone().text().then(txt => {
        if (txt.length > 20000 && txt.indexOf(MARCA) >= 0) {
          const cp = r.clone();
          caches.open(CACHE_VER).then(c => { c.put(req, cp); });
          return r;
        }
        return guardada(r);
      }).catch(() => r);
    }).catch(() => ehApp ? guardada(null) : caches.match(req).then(x => x || guardada(null))));
    return;
  }
  ev.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => {
      if (r && r.status === 200 && r.type !== "opaque") { const cp = r.clone(); caches.open(CACHE_VER).then(c => { c.put(req, cp); }); }
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
