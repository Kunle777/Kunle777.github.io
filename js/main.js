/* Portfolio motion: scroll reveals, active nav link, scroll progress.
   Everything here is progressive enhancement: with JavaScript off, or with
   "reduce motion" enabled, all content is simply visible and static. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { return; }
  root.classList.add('js');

  function ready(fn) {
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', fn); }
    else { fn(); }
  }

  ready(function () {
    var header = document.querySelector('.site-header');

    /* ---- Scroll progress bar + header shadow ---- */
    var bar = document.createElement('div');
    bar.className = 'progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    var ticking = false;
    function onScroll() {
      if (ticking) { return; }
      ticking = true;
      window.requestAnimationFrame(function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        bar.style.transform = 'scaleX(' + p + ')';
        if (header) { header.classList.toggle('scrolled', window.scrollY > 8); }
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    if (!('IntersectionObserver' in window)) { return; }

    /* ---- Reveal on scroll ---- */
    var selectors = [
      '.section-head', '.flagship > *', '.showcase > *', '.phones figure',
      '.shot-main', '.shots figure', '.showcase-figure', '.work-item', '.more',
      '.skills > div', '.role-list > li', '.two-col > div', '.contact-list li',
      '.article .glance', '.article .facts', '.article > .wrap > h2',
      '.article figure', '.article .callout', '.article .table-wrap'
    ];
    var seen = [];
    selectors.forEach(function (sel) {
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
        if (seen.indexOf(el) !== -1) { return; }
        seen.push(el);
        var siblings = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
        el.style.setProperty('--d', Math.min(siblings, 5) * 90 + 'ms');
        el.classList.add('reveal');
      });
    });

    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        el.classList.add('in');
        revealer.unobserve(el);
        /* Drop the stagger delay afterwards so hover effects respond instantly. */
        window.setTimeout(function () { el.style.removeProperty('--d'); }, 1200);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    seen.forEach(function (el) { revealer.observe(el); });

    /* ---- Highlight the nav link for the section in view ---- */
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href*="#"]'));
    var map = {};
    links.forEach(function (a) {
      var hash = a.getAttribute('href').split('#')[1];
      if (hash && document.getElementById(hash)) { map[hash] = a; }
    });
    var ids = Object.keys(map);
    if (ids.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) { return; }
          links.forEach(function (a) { a.classList.remove('active'); });
          map[entry.target.id].classList.add('active');
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      ids.forEach(function (id) { spy.observe(document.getElementById(id)); });
    }
  });
})();
