/* ═══════════════════════════════
   KUNLETECH PORTFOLIO — main.js
═══════════════════════════════ */

/* ── Custom Cursor ── */
const dot  = document.getElementById("cdot");
const ring = document.getElementById("cring");
let mx = 0, my = 0, rx = 0, ry = 0;

if (window.matchMedia("(hover: hover)").matches) {
  document.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top  = my + "px";
  });
  (function animRing() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll("a, button, [data-tilt]").forEach(el => {
    el.addEventListener("mouseenter", () => {
      dot.style.width = "12px"; dot.style.height = "12px";
      ring.style.width = "48px"; ring.style.height = "48px";
      ring.style.borderColor = "rgba(232,160,32,.8)";
    });
    el.addEventListener("mouseleave", () => {
      dot.style.width = ""; dot.style.height = "";
      ring.style.width = ""; ring.style.height = "";
      ring.style.borderColor = "";
    });
  });
}

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

/* ── Experience tabs ── */
document.querySelectorAll(".exp-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".exp-tab").forEach(t => t.classList.remove("on"));
    document.querySelectorAll(".exp-panel").forEach(p => p.classList.remove("on"));
    tab.classList.add("on");
    document.getElementById("tab-" + tab.dataset.tab).classList.add("on");
  });
});

/* ── Hero Canvas: Code Rain ── */
(function initCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, drops;
  const chars = "01アイウエオカキクケコNEXT.JSSUPABASEREACTNODE".split("");
  const COL_W = 18;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    drops = Array(Math.floor(W / COL_W)).fill(1);
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.fillStyle = "rgba(5,5,10,0.05)";
    ctx.fillRect(0, 0, W, H);
    ctx.font = "13px 'Fira Code', monospace";
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const x  = i * COL_W;
      // gold for top character
      ctx.fillStyle = `rgba(232,160,32,${Math.random() > .95 ? 1 : 0.18})`;
      ctx.fillText(ch, x, y * 18);
      if (y * 18 > H && Math.random() > .975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(draw, 50);
})();
