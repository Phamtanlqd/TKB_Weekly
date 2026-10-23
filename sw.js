const CACHE="smart-timetable-v2-cache-2.2";
const CORE=["./","./index.html","./css/style.css","./js/app.js","./js/data-loader.js","./js/dashboard.js","./js/teacher.js","./js/class.js","./js/search.js","./js/export.js","./js/utils.js","./data/sample-timetable.json","./data/sample-timetable.js","./manifest.json","./assets/logo.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const url=new URL(e.request.url);if(url.origin!==location.origin)return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return res}).catch(()=>caches.match("./index.html"))))});
