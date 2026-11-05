const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const wa = text => SITE.whatsapp ? `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}` : "";

// Only trips with days above 0 are live. Islands without a live trip stay hidden.
const TRIPS = LOOPS.flatMap(l => l.trips.map(t => ({ ...t, island: l }))).filter(t => t.days > 0);
const ISLANDS = LOOPS.filter(l => TRIPS.some(t => t.island === l));
const label = t => t.name ? `${t.island.name} ${t.name}` : t.island.name;
const photos = t => Array.from({ length: t.photos }, (_, i) => `img/${t.island.id}/${t.id}-${String(i + 1).padStart(2, "0")}.webp`);
const facts = t => [t.days && `${t.days} days`, t.price, t.months && `Best ${t.months}`].filter(Boolean);
const ask = (name, opt) => wa(`Hi, I’m interested in the ${name} loop, ${opt}.`) || `mailto:${SITE.email}?subject=${encodeURIComponent(`${name}, ${opt}`)}`;

/* route sketch: stops fitted into a 100x100 box, joined by a smooth line (Catmull-Rom) */
const r1 = v => Math.round(v * 10) / 10;
function sketch(route, cls) {
  if (route.length < 2) return "";
  const xs = route.map(s => s[1]), ys = route.map(s => -s[0]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0, h = Math.max(...ys) - y0, k = 80 / Math.max(w, h, 0.01);
  const p = route.map(s => [r1((100 - w * k) / 2 + (s[1] - x0) * k), r1((100 - h * k) / 2 + (-s[0] - y0) * k)]);
  const d = p.map(([x, y], i) => {
    if (!i) return `M${x} ${y}`;
    const [ax, ay] = p[i - 2] || p[0], [bx, by] = p[i - 1], [cx, cy] = p[i + 1] || p[i];
    return `C${r1(bx + (x - ax) / 6)} ${r1(by + (y - ay) / 6)} ${r1(x - (cx - bx) / 6)} ${r1(y - (cy - by) / 6)} ${x} ${y}`;
  }).join("");
  return `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true"><path d="${d}" pathLength="1"/>${p.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8"/>`).join("")}</svg>`;
}

/* hero: trace the trip with the most stops */
const star = TRIPS.reduce((a, t) => t.route.length > a.route.length ? t : a, TRIPS[0]);
if (star) {
  $(".word").insertAdjacentHTML("afterend", `<div class="hero-art">${sketch(star.route, "hero-route")}</div>`);
  $("#traced").innerHTML = `The yellow line is a real loop: <a href="#${star.id}">${esc(label(star))}, ${star.days} days</a>`;
}

/* loops list and filter */
const tile = t => {
  const p = photos(t)[0];
  return `<button class="tile" data-id="${t.id}">${sketch(t.route, "route")}${p ? `<img src="${p}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span class="cap"><b>${esc(t.name || t.island.name)}</b>${esc(facts(t).join(", "))}</span></button>`;
};

function render(f = "all") {
  $("#loops").innerHTML = ISLANDS.filter(l => f === "all" || l.id === f).map(l =>
    `<section class="isl"><h3>${esc(l.name)}</h3><div class="tiles">${TRIPS.filter(t => t.island === l).map(tile).join("")}</div></section>`).join("");
  document.querySelectorAll("#chips .chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.f === f));
}

/* map: one dot per island, tap it to see the loops our guides suggest */
let map, routeLayer;
function showAll() {
  if (!map) return;
  routeLayer.clearLayers();
  map.fitBounds(ISLANDS.map(l => [l.lat, l.lng]), { padding: [30, 30], maxZoom: 6 });
}
function pick(id) {
  const t = TRIPS.find(x => x.id === id);
  document.querySelectorAll("#pick .chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.t === id));
  if (!map || !t || !t.route.length) return;
  routeLayer.clearLayers();
  const pts = t.route.map(([a, b]) => [a, b]);
  L.polyline(pts, { color: "#e5bd34", weight: 4 }).addTo(routeLayer);
  t.route.forEach(([a, b, n], i) => L.circleMarker([a, b], { radius: 6, color: "#e5bd34", weight: 2, fillColor: "#17332a", fillOpacity: 1 })
    .bindTooltip(`${i + 1}. ${n}`).addTo(routeLayer));
  map.fitBounds(pts, { padding: [40, 40], maxZoom: 10 });
}
function choose(id) {
  render(id);
  const l = ISLANDS.find(x => x.id === id), ts = TRIPS.filter(t => t.island === l);
  $("#pick").innerHTML = l ? `<p class="pick-title">Loops suggested by our guides in ${esc(l.name)}</p>${ts.length > 1 ? `<div class="chips">${ts.map(t => `<button class="chip" data-t="${t.id}">${esc(t.name || l.name)}, ${t.days} days</button>`).join("")}</div>` : ""}` : "";
  if (l) pick(ts[0].id); else showAll();
}

$("#chips").innerHTML = [{ id: "all", name: "All islands" }, ...ISLANDS].map(l => `<button class="chip" data-f="${l.id}">${esc(l.name)}</button>`).join("");
$("#chips").addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) choose(c.dataset.f); });
$("#pick").addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) pick(c.dataset.t); });
$("#loops").addEventListener("click", e => { const b = e.target.closest(".tile"); if (b) openTrip(b.dataset.id); });
render();

if (window.L && ISLANDS.length) {
  map = L.map("map", { scrollWheelZoom: false });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 14, attribution: "&copy; OpenStreetMap" }).addTo(map);
  routeLayer = L.layerGroup().addTo(map);
  ISLANDS.forEach(l => L.circleMarker([l.lat, l.lng], { radius: 9, color: "#1c211e", weight: 2, fillColor: "#e5bd34", fillOpacity: 1 })
    .addTo(map).bindTooltip(l.name).on("click", () => choose(l.id)));
  showAll();
}

/* trip dialog */
const dlg = $("#trip");
function openTrip(id) {
  const t = TRIPS.find(x => x.id === id);
  if (!t) return;
  const name = label(t), ph = photos(t), link = wa(`Hi, I’m interested in the ${name} loop.`), art = sketch(t.route, "route");
  $("#trip-body").innerHTML = `
    <div class="dlg-head"><h3>${esc(name)}</h3><button class="btn ghost" data-close>Close</button></div>
    ${ph.length ? `<div class="strip">${ph.map((p, i) => `<img src="${p}" alt="${esc(name)} photo ${i + 1}" loading="lazy" onerror="this.remove()">`).join("")}</div>` : art && `<div class="dlg-route">${art}</div>`}
    ${facts(t).length ? `<div class="facts">${facts(t).map(f => `<span>${esc(f)}</span>`).join("")}</div>` : ""}
    ${t.pitch ? `<p>${esc(t.pitch)}</p>` : ""}
    ${t.youtube ? `<iframe src="https://www.youtube-nocookie.com/embed/${esc(t.youtube)}" title="${esc(name)} video" loading="lazy" allowfullscreen></iframe>` : ""}
    ${t.plan.length ? `<ol class="plan">${t.plan.map((d, i) => `<li><b>Day ${i + 1}</b>${esc(d)}</li>`).join("")}</ol>` : ""}
    ${t.when.length ? `<p><b>When to go</b><br>Tap a date to ask about it.</p><ul class="when">${t.when.map(([m, what, why]) => `<li><a href="${esc(ask(name, `${m} (${what})`))}" target="_blank" rel="noopener"><b>${esc(m)}</b><span>${esc(what)}</span><small>${esc(why)}</small></a></li>`).join("")}</ul>` : ""}
    ${t.options.length ? `<p><b>Choose how you travel</b></p><div class="opts">${t.options.map(o => `<a class="btn ghost" href="${esc(ask(name, o))}" target="_blank" rel="noopener">${esc(o)}</a>`).join("")}</div>` : ""}
    <a class="btn" href="${link || `mailto:${SITE.email}?subject=${encodeURIComponent(name)}`}" target="_blank" rel="noopener">${link ? "Ask about this loop on WhatsApp" : "Ask about this loop by email"}</a>`;
  dlg.showModal();
  history.replaceState(null, "", "#" + id);
}
dlg.addEventListener("click", e => { if (e.target === dlg || e.target.closest("[data-close]")) dlg.close(); });
dlg.addEventListener("close", () => { $("#trip-body").innerHTML = ""; history.replaceState(null, "", location.pathname + location.search); });
window.addEventListener("hashchange", () => openTrip(location.hash.slice(1)));
openTrip(location.hash.slice(1));

/* guides */
if (GUIDES.length) {
  $("#guides").innerHTML = GUIDES.map(g => `<article class="guide">${g.photo ? `<img src="${esc(g.photo)}" alt="${esc(g.name)}" loading="lazy">` : `<div class="ph" aria-hidden="true">${esc(g.name[0])}</div>`}<h3>${esc(g.name)}</h3>${g.languages ? `<p class="meta">${esc(g.languages)}</p>` : ""}<p>${esc(g.bio)}</p></article>`).join("");
} else {
  $("#guides-sec").hidden = true;
  $('a[href="#guides-sec"]').hidden = true;
}

/* contact */
const hello = wa("Hi, I’d like to plan a loop.");
if (hello) { const b = $(".wa"); b.href = hello; b.hidden = false; }
$("#contact-links").innerHTML = [["WhatsApp", hello], ["Instagram", SITE.instagram && `https://instagram.com/${SITE.instagram}`], ["TikTok", SITE.tiktok && `https://tiktok.com/@${SITE.tiktok}`], ["Email", `mailto:${SITE.email}`]]
  .filter(([, u]) => u).map(([n, u]) => `<a class="btn${n === "WhatsApp" ? "" : " ghost"}" href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`).join("");
