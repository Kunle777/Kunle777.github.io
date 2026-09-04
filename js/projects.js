/* ═══════════════════════════════
   KUNLETECH PORTFOLIO — projects.js
   All project data + card renderer
═══════════════════════════════ */

const PROJECTS = [
  {
    num: "01",
    title: "Dynasty League",
    desc: "Full-stack community platform for a 49-member eFootball league. Real-time leaderboards, click-to-edit admin panel, Hall of Fame with photo uploads, and a European competition tournament bracket system — all connected to a live database.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Vercel"],
    learn: "✦ What I built: real-time data sync, role-based admin access, image upload pipeline, and a bracket algorithm from scratch.",
    img: "assets/images/dynasty-league.webp",
    live: "https://dynasty-league-h2lr.vercel.app",
    github: "https://github.com/Kunle777",
  },
  {
    num: "02",
    title: "AI Productivity & Savings App",
    desc: "An independent full-stack build combining task management, a locked savings feature, and a RAG-powered AI coaching layer personalized to each user's own data — architected from the database schema up.",
    tags: ["FastAPI", "React Native", "Supabase", "Gemini API (RAG)"],
    learn: "✦ What I'm building: an async FastAPI backend, Celery/Redis task queues, and a RAG pipeline over pgvector to ground AI coaching responses in each user's real data.",
    img: null,
    live: null,
    status: "In Development",
    github: "https://github.com/Kunle777",
  },
  {
    num: "03",
    title: "Novel Breed Agric Ltd",
    desc: "7-page corporate website for a Nigerian agricultural company targeting distributors, investors, and institutional buyers. Includes a filterable product catalogue, management team profiles, corporate governance page, and an enquiry contact form.",
    tags: ["HTML5", "CSS3", "JavaScript", "Netlify"],
    learn: "✦ Key challenge: building a product filter system and structuring the site to convert institutional visitors into enquiries and leads.",
    img: "assets/images/novel-breed.webp",
    live: "https://kunle777.github.io/novel-breed/",
    github: "https://github.com/Kunle777",
  },
  {
    num: "04",
    title: "FitInvoice",
    desc: "A SaaS invoicing and client-management platform built for personal trainers — client profiles, appointment scheduling, AI-assisted invoice generation, and Paystack billing. Backend is built; frontend and payments are in progress.",
    tags: ["FastAPI", "React", "PostgreSQL", "Claude AI", "Paystack"],
    learn: "✦ Building it as a real SaaS, not a demo: JWT auth with per-trainer data isolation, a documented FastAPI backend, and an AI layer that drafts invoices from natural input.",
    img: null,
    live: null,
    status: "In Development",
    github: "https://github.com/Kunle777/Fitinvoice",
  },
];

function renderProjects() {
  const grid = document.getElementById("proj-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map(p => `
    <div class="pc" data-tilt>
      ${p.img ? `<div class="pc-img"><img src="${p.img}" alt="${p.title} screenshot" loading="lazy" onerror="this.parentElement.style.display='none'" /></div>` : ""}
      <div class="pc-inner">
        <div class="pc-num">${p.num}</div>
        <div class="pc-tags">
          ${p.tags.map(t => `<span class="pct">${t}</span>`).join("")}
        </div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="pc-learn">${p.learn}</div>
        <div class="pc-links">
          ${p.live
            ? `<a href="${p.live}" target="_blank" rel="noopener" class="pcl live">Live Site</a>`
            : p.status
              ? `<span class="pcl status">${p.status}</span>`
              : ""}
          <a href="${p.github}" target="_blank" rel="noopener" class="pcl">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  `).join("");

  // Subtle tilt on hover — kept intentionally light, not a gimmick
  document.querySelectorAll("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `perspective(1000px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(-2px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

renderProjects();
