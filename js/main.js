/* ═══════════════════════════════
   KUNLETECH PORTFOLIO — main.js
═══════════════════════════════ */

/* ── Navbar scroll ── */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
  highlightNav();
}, { passive: true });

/* ── Nav active link ── */
function highlightNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nlinks a");
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach(a => {
    a.classList.toggle("on", a.getAttribute("href") === "#" + current);
  });
}

/* ── Mobile hamburger ── */
const hbg    = document.getElementById("hbg");
const nlinks = document.getElementById("nlinks");
hbg && hbg.addEventListener("click", () => {
  nlinks.classList.toggle("open");
  const spans = hbg.querySelectorAll("span");
  nlinks.classList.contains("open")
    ? (spans[0].style.transform = "rotate(45deg) translate(5px,5px)",
       spans[1].style.opacity = "0",
       spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)")
    : (spans[0].style.transform = "",
       spans[1].style.opacity = "",
       spans[2].style.transform = "");
});
document.querySelectorAll(".nlinks a").forEach(a =>
  a.addEventListener("click", () => {
    nlinks.classList.remove("open");
    hbg.querySelectorAll("span").forEach(s => s.style.transform = s.style.opacity = "");
  })
);

/* ── Scroll reveal ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      // trigger skill bars
      e.target.querySelectorAll && e.target.querySelectorAll(".sk-track").forEach(t => t.classList.add("loaded"));
    }
  });
}, { threshold: .12 });
document.querySelectorAll(".rv").forEach(el => observer.observe(el));

// Also observe skill tracks separately
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("loaded");
  });
}, { threshold: .5 });
document.querySelectorAll(".sk-track").forEach(t => barObserver.observe(t));

/* ── Experience slider ── */
const expTabs = [...document.querySelectorAll(".exp-tab")];
const expPanels = [...document.querySelectorAll(".exp-panel")];
const expProgress = document.getElementById("exp-progress");
let activeExperience = 0;

function showExperience(index) {
  activeExperience = (index + expTabs.length) % expTabs.length;
  expTabs.forEach((tab, tabIndex) => {
    const selected = tabIndex === activeExperience;
    tab.classList.toggle("on", selected);
    tab.setAttribute("aria-selected", selected);
  });
  expPanels.forEach((panel, panelIndex) => panel.classList.toggle("on", panelIndex === activeExperience));
  if (expProgress) expProgress.textContent = `${String(activeExperience + 1).padStart(2, "0")} / ${String(expTabs.length).padStart(2, "0")}`;
}

expTabs.forEach((tab, index) => tab.addEventListener("click", () => showExperience(index)));
document.getElementById("exp-prev")?.addEventListener("click", () => showExperience(activeExperience - 1));
document.getElementById("exp-next")?.addEventListener("click", () => showExperience(activeExperience + 1));

/* ── Hero Canvas: subtle ambient grid, not a "hacker" effect ──
   Kept minimal and low-opacity so it reads as texture, not a gimmick. */
(function initCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, drops;
  const COL_W = 26;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    drops = Array(Math.floor(W / COL_W)).fill(0).map(() => Math.random() * H);
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.fillStyle = "rgba(5,5,10,0.06)";
    ctx.fillRect(0, 0, W, H);
    drops.forEach((y, i) => {
      const x = i * COL_W;
      ctx.fillStyle = "rgba(232,160,32,0.16)";
      ctx.fillRect(x, y, 2, 2);
      drops[i] += 0.6;
      if (drops[i] > H) drops[i] = 0;
    });
  }
  setInterval(draw, 60);
})();
