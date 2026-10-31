const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const wa = text => SITE.whatsapp ? `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}` : "";

const TRIPS = LOOPS.flatMap(l => l.trips.map(t => ({ ...t, island: l })));
const label = t => t.name ? `${t.island.name} ${t.name}` : t.island.name;
const photos = t => Array.from({ length: t.photos }, (_, i) => `img/${t.island.id}/${t.id}-${String(i + 1).padStart(2, "0")}.webp`);
const facts = t => [t.days && `${t.days} days`, t.price, t.months && `Best ${t.months}`].filter(Boolean);

/* loops list and filter */
const tile = t => {
  const p = photos(t)[0];
  return `<button class="tile" data-id="${t.id}">${p ? `<img src="${p}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span class="cap"><b>${esc(t.name || t.island.name)}</b>${esc(facts(t).join(", "))}</span></button>`;
};

function render(f = "all") {
  $("#loops").innerHTML = LOOPS.filter(l => f === "all" || l.id === f).map(l =>
    `<section class="isl"><h3>${esc(l.name)}</h3><div class="tiles">${TRIPS.filter(t => t.island === l).map(tile).join("")}</div></section>`).join("");
  document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.f === f));
}

$("#chips").innerHTML = [{ id: "all", name: "All islands" }, ...LOOPS].map(l => `<button class="chip" data-f="${l.id}">${esc(l.name)}</button>`).join("");
$("#chips").addEventListener("click", e => { const c = e.target.closest(".chip"); if (c) render(c.dataset.f); });
$("#loops").addEventListener("click", e => { const b = e.target.closest(".tile"); if (b) openTrip(b.dataset.id); });
render();

/* map */
if (window.L) {
  const map = L.map("map", { scrollWheelZoom: false });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 10, attribution: "&copy; OpenStreetMap" }).addTo(map);
  map.fitBounds(LOOPS.map(l => [l.lat, l.lng]), { padding: [30, 30] });
  LOOPS.forEach(l => L.circleMarker([l.lat, l.lng], { radius: 9, color: "#2d2d29", weight: 2, fillColor: "#dd5620", fillOpacity: 1 })
    .addTo(map).bindTooltip(l.name)
    .on("click", () => { render(l.id); $("#chips").scrollIntoView({ behavior: "smooth" }); }));
}

/* trip dialog */
const dlg = $("#trip");
function openTrip(id) {
  const t = TRIPS.find(x => x.id === id);
  if (!t) return;
  const name = label(t), ph = photos(t), link = wa(`Hi, I’m interested in the ${name} loop.`);
  $("#trip-body").innerHTML = `
    <div class="dlg-head"><h3>${esc(name)}</h3><button class="btn ghost" data-close>Close</button></div>
    ${ph.length ? `<div class="strip">${ph.map((p, i) => `<img src="${p}" alt="${esc(name)} photo ${i + 1}" loading="lazy" onerror="this.remove()">`).join("")}</div>` : ""}
    ${facts(t).length ? `<div class="facts">${facts(t).map(f => `<span>${esc(f)}</span>`).join("")}</div>` : ""}
    ${t.pitch ? `<p>${esc(t.pitch)}</p>` : ""}
    ${t.youtube ? `<iframe src="https://www.youtube-nocookie.com/embed/${esc(t.youtube)}" title="${esc(name)} video" loading="lazy" allowfullscreen></iframe>` : ""}
    ${t.plan.length ? `<ol class="plan">${t.plan.map((d, i) => `<li><b>Day ${i + 1}</b>${esc(d)}</li>`).join("")}</ol>` : ""}
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
}

/* contact */
const hello = wa("Hi, I’d like to plan a loop.");
if (hello) { const b = $(".wa"); b.href = hello; b.hidden = false; }
$("#contact-links").innerHTML = [["WhatsApp", hello], ["Instagram", SITE.instagram && `https://instagram.com/${SITE.instagram}`], ["TikTok", SITE.tiktok && `https://tiktok.com/@${SITE.tiktok}`], ["Email", `mailto:${SITE.email}`]]
  .filter(([, u]) => u).map(([n, u]) => `<a class="btn ghost" href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`).join("");
