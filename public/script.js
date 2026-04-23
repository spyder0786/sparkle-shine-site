/* SparkleBox — small interactions */
(function () {
  // Mobile nav toggle
  var burger = document.getElementById('hamburger');
  var nav = document.getElementById('navMobile');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Pricing toggle
  var toggleBtns = document.querySelectorAll('.bt-btn');
  var amounts = document.querySelectorAll('.amount');
  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      toggleBtns.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      var billing = btn.dataset.billing;
      amounts.forEach(function (el) {
        var v = el.dataset[billing];
        if (!v) return;
        animateNumber(el, parseInt(el.textContent, 10) || 0, parseInt(v, 10), 500);
      });
    });
  });

  function animateNumber(el, from, to, duration) {
    var start = performance.now();
    function tick(now) {
      var p = Math.min(1, (now - start) / duration);
      var val = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      el.textContent = val;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.section, .hero-card, .step, .service-card, .plan, .review, .faq-item, .cta-inner');
  revealEls.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Newsletter dummy submit
  var nl = document.getElementById('newsletter');
  if (nl) {
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = nl.querySelector('input');
      var btn = nl.querySelector('button');
      btn.textContent = '✓ Joined';
      btn.disabled = true;
      input.value = '';
      setTimeout(function () { btn.textContent = 'Join'; btn.disabled = false; }, 2400);
    });
  }

  // Year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Smooth-anchor offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });
})();