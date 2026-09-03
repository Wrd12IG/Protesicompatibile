(function(){
  // header height -> css var, for the hero's 100%-of-viewport calc
  var header = document.getElementById('site-header');
  function setHeaderH(){ document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px'); }
  setHeaderH();
  window.addEventListener('resize', setHeaderH);

  // hamburger / mobile menu
  var hamburger = document.getElementById('hamburger-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', function(){
    var open = mobileMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ mobileMenu.classList.remove('is-open'); hamburger.setAttribute('aria-expanded','false'); });
  });

  // reveal on scroll
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el){ el.classList.add('is-visible'); });
  }

  // hero stats tick-lines (above the fold, trigger shortly after load)
  var heroStats = document.getElementById('hero-stats');
  setTimeout(function(){ heroStats.classList.add('is-visible'); }, 400);

  // hero slider
  var slides = document.querySelectorAll('.hero-slide');
  var segs = document.querySelectorAll('#hero-progress .seg');
  var DURATION = 4500;
  var current = 0, timer = null;

  function renderFills(activeIndex, animate){
    segs.forEach(function(seg, i){
      var fill = seg.querySelector('.fill');
      fill.classList.remove('filling');
      fill.style.transition = 'none';
      if (i < activeIndex){ fill.style.width = '100%'; }
      else if (i === activeIndex){ fill.style.width = '0%'; }
      else { fill.style.width = '0%'; }
    });
    if (animate && !reduceMotion){
      requestAnimationFrame(function(){
        var fill = segs[activeIndex].querySelector('.fill');
        fill.style.transition = 'width ' + DURATION + 'ms linear';
        fill.classList.add('filling');
        requestAnimationFrame(function(){ fill.style.width = '100%'; });
      });
    }
  }

  function goTo(i, animate){
    current = (i + slides.length) % slides.length;
    slides.forEach(function(s, idx){ s.classList.toggle('is-active', idx === current); });
    renderFills(current, animate !== false);
  }

  function next(){ goTo(current + 1); }

  function startAutoplay(){
    if (reduceMotion) return;
    clearInterval(timer);
    timer = setInterval(next, DURATION);
  }

  segs.forEach(function(seg){
    seg.addEventListener('click', function(){
      goTo(parseInt(seg.dataset.index, 10));
      startAutoplay();
    });
  });

  goTo(0, true);
  startAutoplay();

  // faq accordion — only one item open at a time
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item){
    var btn = item.querySelector('.faq-question');
    btn.addEventListener('click', function(){
      var wasOpen = item.classList.contains('is-open');
      faqItems.forEach(function(other){
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen){
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
