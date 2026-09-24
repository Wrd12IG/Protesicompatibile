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

  // generic trigger -> aria-controls panel toggle, exclusive within a group
  // (opening one trigger closes every other trigger in the same group — same
  // "only one open at a time" behaviour as the FAQ accordion above).
  function wireAccordionGroup(triggers, getGroupKey, onClose){
    var groups = {};
    triggers.forEach(function(btn){
      var key = getGroupKey(btn);
      (groups[key] = groups[key] || []).push(btn);
    });
    Object.keys(groups).forEach(function(key){
      var group = groups[key];
      group.forEach(function(btn){
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (!panel) return;
        btn.addEventListener('click', function(){
          var wasOpen = panel.classList.contains('is-open');
          group.forEach(function(other){
            var p = document.getElementById(other.getAttribute('aria-controls'));
            if (p && p.classList.contains('is-open')){
              p.classList.remove('is-open');
              other.setAttribute('aria-expanded', 'false');
              if (onClose) onClose(other, p);
            }
          });
          if (!wasOpen){
            panel.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
            setTimeout(function(){ btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 250);
          }
        });
      });
    });
  }

  // categorie: all 6 exclusive with each other
  wireAccordionGroup(
    Array.prototype.slice.call(document.querySelectorAll('.category-card')),
    function(){ return 'categorie'; },
    function(closedBtn, closedPanel){
      // collapsing a category also resets any brand it had left open inside it
      closedPanel.querySelectorAll('.line-card[aria-expanded="true"]').forEach(function(lineBtn){
        var lp = document.getElementById(lineBtn.getAttribute('aria-controls'));
        if (lp) lp.classList.remove('is-open');
        lineBtn.setAttribute('aria-expanded', 'false');
      });
    }
  );

  // marche (line-card): exclusive within their own category panel only
  wireAccordionGroup(
    Array.prototype.slice.call(document.querySelectorAll('.line-card')),
    function(btn){
      var catPanel = btn.closest('.cat-panel');
      return catPanel ? catPanel.id : 'marche';
    }
  );
})();
