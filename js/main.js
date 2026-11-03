(function(){
  'use strict';
  // ---------- dati di esempio (da collegare al catalogo reale) ----------
  // Elenco dal menu del sito originale (32 voci). Le sigle sono provvisorie, da allineare alla nomenclatura interna. f = in evidenza nella selezione rapida.
  var BRANDS = [
    { c:'ABT', n:'Alpha Bio Tec', l:'Multineo' }, { c:'AK', n:'Ankylos', l:'C/X' }, { c:'AX', n:'Anthogyr', l:'Axiom BL' },
    { c:'EV', n:'Astra Tech', l:'Evolution' }, { c:'TX', n:'Astra Tech', l:'TX / Geass Mix, Extra' },
    { c:'BK', n:'Biotech Dental', l:'Kontact' }, { c:'3C', n:'Biomet 3i', l:'Certain' }, { c:'3E', n:'Biomet 3i', l:'EX Esterno / Geass Omny Classic' },
    { c:'BT', n:'BTI', l:'Interno' }, { c:'DT', n:'Dental Tech', l:'' }, { c:'DI', n:'DIO', l:'UFII' }, { c:'XV', n:'Frialit', l:'Xive' },
    { c:'GH', n:'Ghimas', l:'' }, { c:'ID', n:'IDI', l:'Evolution' }, { c:'AR', n:'Megagen', l:'AnyRidge / JD Icon Plus', f:1 },
    { c:'AO', n:'Megagen', l:'AnyOne' }, { c:'C1', n:'MIS', l:'C1 / V3 SP' }, { c:'IS', n:'Neobiotech', l:'IS System' },
    { c:'CM', n:'Neodent', l:'Cone Morse' }, { c:'GM', n:'Neodent', l:'Grand Morse' },
    { c:'NA', n:'Nobel Biocare', l:'Active / JD Icon', f:1 }, { c:'NB', n:'Nobel Biocare', l:'Brånemark' }, { c:'NR', n:'Nobel Biocare', l:'Replace', f:1 },
    { c:'NE', n:'Neoss', l:'' }, { c:'PH', n:'Phibo', l:'TSH' }, { c:'PE', n:'Pitt-Easy', l:'' }, { c:'SM', n:'Sweden & Martina', l:'', f:1 },
    { c:'BLX', n:'Straumann', l:'BLX', f:1 }, { c:'BL', n:'Straumann', l:'Bone Level', f:1 }, { c:'TL', n:'Straumann', l:'Tissue Level / Geass Rock', f:1 },
    { c:'WS', n:'Winsix', l:'' }, { c:'SV', n:'Zimmer', l:'Screw-Vent / JD Evolution e Plus / MIS', f:1 }
  ];
  var FEATURED = ['BL','BLX','TL','NA','NR','SV','AR','SM'].map(function(c){ return BRANDS.filter(function(b){ return b.c === c; })[0]; });
  function bname(b){ return b.n + (b.l ? ' ' + b.l : ''); }
  var TYPES = [
    { k:'dritti', n:'Monconi dritti', s:'Protesi avvitata', i:'type-moncone-dritto.jpg' },
    { k:'angolati', n:'Monconi angolati', s:'Correzione d’asse', i:'type-moncone-angolato.jpg' },
    { k:'analoghi', n:'Analoghi 3D', s:'Laboratorio', i:'type-analogo.jpg' },
    { k:'tibase', n:'Ti-Base', s:'Soluzioni digitali', i:'type-tibase.jpg' },
    { k:'mua', n:'Componentistica MUA', s:'Protesi su più impianti', i:'type-mua.jpg' },
    { k:'scanbody', n:'Scan body', s:'Flusso digitale', i:'type-scanbody.jpg' },
    { k:'viti', n:'Viti cliniche', s:'Fissaggio', i:'type-vite.jpg' },
    { k:'premilled', n:'Premilled', s:'Su misura CAD/CAM', i:'type-premilled.jpg' }
  ];
  // Prodotti, misure, codici e prezzi (Iva esclusa) di ESEMPIO: da collegare al catalogo reale.
  var PRODUCTS = [
    { id:'p1', n:'Ti-Base compatibile Straumann® Bone Level', sku:'TC-TB-BL', tag:'BL', k:'tibase', i:'type-tibase.jpg', price:29, opts:[ { n:'Connessione', v:['NC','RC'] }, { n:'Altezza gengivale', v:['1,0 mm','2,0 mm','3,0 mm'] } ] },
    { id:'p2', n:'Moncone angolato 17° compatibile Nobel Active', sku:'TC-MA-NA', tag:'NA', k:'angolati', i:'type-moncone-angolato.jpg', price:24, old:30, opts:[ { n:'Piattaforma', v:['NP','RP','WP'] }, { n:'Altezza gengivale', v:['1,5 mm','3,0 mm'] } ] },
    { id:'p3', n:'Scan body compatibile Zimmer Screw-Vent', sku:'TC-SB-SV', tag:'SV', k:'scanbody', i:'type-scanbody.jpg', price:16, opts:[ { n:'Piattaforma', v:['Ø 3,5','Ø 4,5','Ø 5,7'] } ] },
    { id:'p4', n:'Analogo 3D compatibile Sweden & Martina', sku:'TC-AN-SM', tag:'SM', k:'analoghi', i:'type-analogo.jpg', price:9, opts:[ { n:'Piattaforma', v:['Standard','Large'] } ] },
    { id:'p5', n:'MUA dritto compatibile Astra Tech® EV', sku:'TC-MUA-EV', tag:'EV', k:'mua', i:'type-mua.jpg', price:34, opts:[ { n:'Piattaforma', v:['3.6','4.2','4.8'] }, { n:'Altezza gengivale', v:['1,5 mm','2,5 mm'] } ] },
    { id:'p6', n:'Vite clinica compatibile Megagen® AnyRidge', sku:'TC-VC-AR', tag:'AR', k:'viti', i:'type-vite.jpg', price:6, opts:[ { n:'Lunghezza', v:['8 mm','10 mm'] } ] },
    { id:'p7', n:'Premilled compatibile Straumann® Bone Level', sku:'TC-PM-BL', tag:'BL', k:'premilled', i:'type-premilled.jpg', price:38, opts:[ { n:'Connessione', v:['NC','RC'] } ] },
    { id:'p8', n:'Moncone dritto compatibile Nobel Active', sku:'TC-MD-NA', tag:'NA', k:'dritti', i:'type-moncone-dritto.jpg', price:22, old:27, opts:[ { n:'Piattaforma', v:['NP','RP','WP'] }, { n:'Altezza gengivale', v:['1,0 mm','2,0 mm','3,0 mm'] } ] }
  ];
  // Impianti a marchio Titanium. Silver BLT e Silver PLUS RN: prezzi 61 / 50 presi dal sito attuale; gli altri sono di esempio.
  var OFFERS = [
    { id:'i1', n:'Impianto Silver BLT tipo Straumann® Bone Level Conical', line:'Silver BLT', sku:'IMP-SBLT', tag:'BLT', tile:'c', price:50, old:61, opts:[ { n:'Diametro', v:['Ø 3,3','Ø 4,1','Ø 4,8'] } ] },
    { id:'i2', n:'Impianto Silver PLUS RN tipo Straumann®', line:'Silver PLUS RN', sku:'IMP-SPRN', tag:'RN', tile:'o', price:50, old:61, opts:[ { n:'Diametro', v:['Ø 3,3','Ø 4,1','Ø 4,8'] } ] },
    { id:'i3', n:'Impianto Giada One tipo Sweden & Martina® Premium One', line:'Giada One', sku:'IMP-GIA', tag:'GIADA', tile:'g', price:52, opts:[ { n:'Diametro', v:['Ø 3,3','Ø 3,8','Ø 4,25'] } ] },
    { id:'i4', n:'Impianto Ruby GM tipo Neodent® Grand Morse', line:'Ruby GM', sku:'IMP-RGM', tag:'GM', tile:'c', price:48, old:58, opts:[ { n:'Diametro', v:['Ø 3,5','Ø 3,75','Ø 4,0','Ø 4,3'] } ] }
  ];
  var ALL = PRODUCTS.concat(OFFERS);
  function eur(n){ return '€ ' + n.toFixed(2).replace('.', ','); }
  function code(v){ return String(v).replace(/Ø\s?/g, '').replace(/\s?mm/g, '').replace(/[^0-9A-Za-z]+/g, ''); }
  var HOME = document.body.getAttribute('data-home') || '';
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return [].slice.call((r || document).querySelectorAll(s)); };
  function esc(t){ return String(t).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
  function sup(n){ return esc(n) + '<sup>®</sup>'; }

  // ---------- griglie ----------
  var chev = '<svg class="serie-arrow" width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 2l6 6-6 6"/><path d="M11 2l6 6-6 6"/></svg>';
  if ($('#serie-grid')){
  $('#serie-grid').innerHTML = FEATURED.map(function(b){
    return '<a href="#" class="serie rv" data-brand="' + b.c + '"><span class="serie-ghost">' + b.c + '</span>' +
      '<span class="serie-logo">' + sup(b.n) + '</span>' +
      '<span class="serie-meta"><span><b>Compatibile</b><span>' + sup(b.n) + (b.l ? ' ' + esc(b.l) : '') + '</span></span>' + chev + '</span></a>';
  }).join('');

  // indice completo: filtro testuale + iniziale, elenco compatto che si apre su richiesta
  var biList = $('#bi-list'), biInput = $('#bi-input'), biMore = $('#bi-more'), biEmpty = $('#bi-empty'), biLetters = $('#bi-letters'), biBox = $('#brand-index');
  var letter = '', expanded = false;
  function normBi(t){ return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  biList.innerHTML = BRANDS.map(function(b){
    return '<a href="#" class="bl" data-brand="' + b.c + '" data-q="' + esc(normBi(bname(b) + ' ' + b.c)) + '" data-i="' + esc(normBi(b.n).charAt(0).toUpperCase()) + '"><span class="bl-code">' + b.c + '</span><span class="bl-name"><b>' + sup(b.n) + '</b>' + (b.l ? '<small>' + esc(b.l) + '</small>' : '') + '</span>' + '<i class="ph-bold ph-arrow-right" aria-hidden="true"></i></a>';
  }).join('');
  $('#bi-total').textContent = '(' + BRANDS.length + ')';
  var initials = []; BRANDS.forEach(function(b){ var i = normBi(b.n).charAt(0).toUpperCase(); if (initials.indexOf(i) < 0) initials.push(i); }); initials.sort();
  biLetters.innerHTML = '<button type="button" class="on" data-l="">Tutte</button>' + initials.map(function(i){ return '<button type="button" data-l="' + i + '">' + i + '</button>'; }).join('');
  function applyBi(){
    var COLLAPSED = window.matchMedia('(max-width:640px)').matches ? 6 : 12;
    var q = normBi(biInput.value.trim()), filtering = !!(q || letter), n = 0, shown = 0;
    $$('.bl', biList).forEach(function(a){
      var ok = (!q || a.getAttribute('data-q').indexOf(q) > -1) && (!letter || a.getAttribute('data-i') === letter);
      if (ok) n++;
      var vis = ok && (filtering || expanded || n <= COLLAPSED);
      a.hidden = !vis; if (vis) shown++;
    });
    biEmpty.hidden = n > 0;
    var canToggle = !filtering && BRANDS.length > COLLAPSED;
    biMore.hidden = !canToggle;
    biBox.classList.toggle('is-collapsed', canToggle && !expanded);
    biMore.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    $('#bi-more-txt').textContent = expanded ? 'Mostra meno' : 'Mostra tutte le ' + BRANDS.length + ' marche';
  }
  function setExpanded(v){ expanded = v; applyBi(); }
  biInput.addEventListener('input', applyBi);
  biMore.addEventListener('click', function(){ setExpanded(!expanded); });
  biLetters.addEventListener('click', function(e){
    var bt = e.target.closest('button'); if (!bt) return;
    letter = bt.getAttribute('data-l'); $$('button', biLetters).forEach(function(x){ x.classList.toggle('on', x === bt); }); applyBi();
  });
  applyBi();
  }

  function tcard(t){
    return '<a href="#" class="type rv" data-type="' + t.k + '"><span class="type-img"><img src="images/' + t.i + '" alt="" width="86" height="86" loading="lazy" /></span>' +
      '<span class="type-txt"><b>' + esc(t.n) + '</b><small>' + esc(t.s) + '</small></span></a>';
  }
    if ($('#type-grid')) $('#type-grid').innerHTML = TYPES.map(tcard).join('');

  function cardHtml(p){
    var media = p.tile ? '<div class="prod-img prod-tile tile-' + p.tile + '"><i>Ø</i><b>' + esc(p.line) + '</b><span>impianto compatibile</span></div>'
      : '<div class="prod-img"><img src="images/' + p.i + '" alt="" width="300" height="300" loading="lazy" /></div>';
    var opts = p.opts.map(function(o){
      return '<div class="opt-row"><span class="opt-l">' + esc(o.n) + '</span><div class="opt-v" role="group" aria-label="' + esc(o.n) + '">' +
        o.v.map(function(v){ return '<button type="button" class="opt" data-v="' + esc(v) + '" aria-pressed="false">' + esc(v) + '</button>'; }).join('') + '</div></div>';
    }).join('');
    return '<article class="prod rv" id="' + p.id + '" data-sku="' + p.sku + '"><span class="prod-tag">' + esc(p.tag) + '</span>' + (p.old ? '<span class="prod-sale">In offerta</span>' : '<span class="prod-stock">Disponibile</span>') + media +
      '<h3>' + esc(p.n) + '</h3><p class="prod-sku">Cod. <span class="sku-v">' + p.sku + '</span></p><div class="opts">' + opts + '</div>' +
      '<p class="prod-price"><b>' + eur(p.price) + '</b>' + (p.old ? '<s>' + eur(p.old) + '</s>' : '') + '<small>Iva esclusa</small></p>' +
      '<div class="prod-buy"><span class="qty"><button type="button" data-qty="-1" aria-label="Meno">−</button><b>1</b><button type="button" data-qty="1" aria-label="Più">+</button></span>' +
      '<button class="btn btn-orange" type="button" data-add="' + p.id + '" disabled>Scegli la misura</button></div></article>';
  }
  if ($('#prod-grid')) $('#prod-grid').innerHTML = PRODUCTS.map(cardHtml).join('');
  if ($('#offer-grid')) $('#offer-grid').innerHTML = OFFERS.map(cardHtml).join('');
  document.addEventListener('click', function(e){
    var o = e.target.closest('.opt');
    if (o){
      var card = o.closest('.prod'), row = o.closest('.opt-v');
      $$('.opt', row).forEach(function(x){ var on = x === o && !x.classList.contains('on'); x.classList.toggle('on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      syncCard(card); return;
    }
    var qb = e.target.closest('[data-qty]');
    if (qb){ var q = $('.qty b', qb.parentNode); q.textContent = Math.max(1, Math.min(99, parseInt(q.textContent, 10) + parseInt(qb.getAttribute('data-qty'), 10))); }
  });
  function picked(card){ return $$('.opt-row', card).map(function(r){ var on = $('.opt.on', r); return on ? on.getAttribute('data-v') : null; }); }
  function syncCard(card){
    var p = ALL.filter(function(x){ return x.id === card.id; })[0], v = picked(card), ok = v.every(function(x){ return x; });
    $('.sku-v', card).textContent = p.sku + v.map(function(x){ return '-' + (x ? code(x) : '…'); }).join('');
    var b = $('[data-add]', card); b.disabled = !ok; b.innerHTML = ok ? '<i class="ph-bold ph-shopping-cart-simple" aria-hidden="true"></i>Aggiungi' : 'Scegli la misura';
  }

  // menu catalogo
  $('#mega-brands').innerHTML = FEATURED.map(function(b){ return '<a class="m-item" href="#marche" data-go="brand:' + b.c + '">' + sup(b.n) + (b.l ? ' ' + esc(b.l) : '') + '<small>' + b.c + '</small></a>'; }).join('');
  $('#mega-types').innerHTML = TYPES.map(function(t){ return '<a class="m-item" href="#tipologie" data-go="type:' + t.k + '">' + esc(t.n) + '</a>'; }).join('');

  // finder a tre passi: marca, connessione, componente. Connessioni indicative per le marche principali; le altre da catalogo.
  var CONN = { BL:['NC (Ø 3,3)','RC (Ø 4,1 / 4,8)'], BLX:['RB','WB'], TL:['NN (Ø 3,5)','RN (Ø 4,8)','WN (Ø 6,5)'], NA:['NP','RP','WP'], NR:['NP','RP','WP'], SV:['Ø 3,5','Ø 4,5','Ø 5,7'] };
  var CONN_DEF = ['Piattaforma stretta','Piattaforma standard','Piattaforma larga'];
  var fb = $('#finder-brand') || document.createElement('select'), fc = $('#finder-conn') || document.createElement('select'), ft = $('#finder-type') || document.createElement('select');
  BRANDS.forEach(function(b){ fb.insertAdjacentHTML('beforeend', '<option value="' + b.c + '">' + esc(bname(b)) + '</option>'); });
  function fill(sel, ph, items, valFn, txtFn){ sel.innerHTML = '<option value="">' + ph + '</option>' + items.map(function(x, i){ return '<option value="' + esc(valFn(x, i)) + '">' + esc(txtFn(x, i)) + '</option>'; }).join(''); }
  function stepState(){
    var sum = $('#finder-sum'), go = $('#finder-go'); if (!sum) return;
    $('#fs-conn').classList.toggle('is-off', !fb.value); fc.disabled = !fb.value;
    $('#fs-type').classList.toggle('is-off', !fc.value); ft.disabled = !fc.value;
    var done = fb.value && fc.value && ft.value; go.disabled = !done;
    if (done){
      var br = BRANDS.filter(function(b){ return b.c === fb.value; })[0], ty = TYPES.filter(function(t){ return t.k === ft.value; })[0], h = 0, key = fb.value + fc.value + ft.value;
      for (var i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 997;
      finderCount = 6 + h % 38;
      sum.innerHTML = '<b>' + esc(bname(br)) + ' · ' + esc(fc.value) + ' · ' + esc(ty.n) + '</b>: ' + finderCount + ' componenti disponibili';
    } else sum.textContent = !fb.value ? 'Scegli la tua marca per iniziare.' : !fc.value ? 'Ora scegli la connessione.' : 'Infine scegli il componente.';
  }
  var finderCount = 0;
  fb.addEventListener('change', function(){
    var l = CONN[fb.value] || CONN_DEF;
    fill(fc, fb.value ? 'Scegli la connessione' : 'Prima la marca', fb.value ? l : [], function(x){ return x; }, function(x){ return x; });
    fill(ft, 'Prima la connessione', [], null, null); stepState();
  });
  fc.addEventListener('change', function(){ fill(ft, fc.value ? 'Scegli il componente' : 'Prima la connessione', fc.value ? TYPES : [], function(t){ return t.k; }, function(t){ return t.n; }); stepState(); });
  ft.addEventListener('change', stepState);
  TYPES.forEach(function(t){});

  // ---------- navigazione verso un elemento con evidenza ----------
  function goTo(spec){
    var parts = spec.split(':'), kind = parts[0], key = parts[1], el = null, fallback = '#marche';
    if (kind === 'brand'){ el = $('.serie[data-brand="' + key + '"]') || $('.bl[data-brand="' + key + '"]'); fallback = '#marche'; if (el && el.classList.contains('bl') && el.hidden){ letter = ''; biInput.value = ''; $$('button', biLetters).forEach(function(x){ x.classList.toggle('on', !x.getAttribute('data-l')); }); setExpanded(true); } }
    else if (kind === 'type'){ el = $('[data-type="' + key + '"]'); fallback = '#tipologie'; }
    else if (kind === 'prod'){ el = document.getElementById(key); fallback = '#prodotti'; }
    var target = el || $(fallback);
    if (!target){ window.location.href = HOME + fallback; return; }
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (el){ el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash'); }
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest('[data-go]'); if (a){ e.preventDefault(); goTo(a.getAttribute('data-go')); closeMega(); closeMenu(); return; }
    var b = e.target.closest('.serie, .type, .bl'); if (b){ e.preventDefault(); goTo(b.hasAttribute('data-brand') ? 'brand:' + b.getAttribute('data-brand') : 'type:' + b.getAttribute('data-type')); }
  });
  if ($('#finder')) $('#finder').addEventListener('submit', function(e){
    e.preventDefault(); if (!ft.value) return;
    var n = $('#prod-note'); n.hidden = false;
    n.innerHTML = '<i class="ph-bold ph-info" aria-hidden="true"></i>Anteprima: nel catalogo qui compare l’elenco filtrato (' + finderCount + ' componenti) con tutte le misure. Nel mock-up vedi i componenti più richiesti.';
    $('#prodotti').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ---------- ricerca ----------
  var si = $('#search-input'), sr = $('#search-results');
  function norm(t){ return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function runSearch(){
    var q = norm(si.value.trim()); if (!q){ sr.hidden = true; sr.innerHTML = ''; return; }
    var b = BRANDS.filter(function(x){ return norm(bname(x) + ' ' + x.c).indexOf(q) > -1; }).slice(0, 5);
    var t = TYPES.filter(function(x){ return norm(x.n + ' ' + x.s).indexOf(q) > -1; }).slice(0, 4);
    var p = ALL.filter(function(x){ return norm(x.n + ' ' + x.sku).indexOf(q) > -1; }).slice(0, 4);
    var h = '';
    if (b.length) h += '<div class="sr-group">Marche</div>' + b.map(function(x){ return '<button type="button" class="sr-item" data-go="brand:' + x.c + '">' + sup(x.n) + (x.l ? ' ' + esc(x.l) : '') + '<small>' + x.c + '</small></button>'; }).join('');
    if (t.length) h += '<div class="sr-group">Tipologie</div>' + t.map(function(x){ return '<button type="button" class="sr-item" data-go="type:' + x.k + '">' + esc(x.n) + '</button>'; }).join('');
    if (p.length) h += '<div class="sr-group">Codici e prodotti</div>' + p.map(function(x){ return '<button type="button" class="sr-item" data-go="prod:' + x.id + '">' + esc(x.n) + '<small>' + x.sku + '</small></button>'; }).join('');
    sr.innerHTML = h || '<div class="sr-empty">Nessun risultato. Prova con la marca (es. Straumann) o con un codice.</div>';
    sr.hidden = false;
  }
  si.addEventListener('input', runSearch);
  si.addEventListener('focus', runSearch);
  $('#search').addEventListener('submit', function(e){ e.preventDefault(); var f = $('.sr-item', sr); if (f) f.click(); });
  document.addEventListener('click', function(e){ if (!e.target.closest('#search')) sr.hidden = true; });
  sr.addEventListener('click', function(){ sr.hidden = true; });

  // ---------- menu catalogo e mobile ----------
  var megaBtn = $('#mega-btn'), mega = $('#mega'), burger = $('#burger'), navRow = $('#nav-row');
  function closeMega(){ mega.hidden = true; megaBtn.setAttribute('aria-expanded', 'false'); }
  function closeMenu(){ navRow.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }
  megaBtn.addEventListener('click', function(e){ e.stopPropagation(); var open = mega.hidden; mega.hidden = !open; megaBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  document.addEventListener('click', function(e){ if (!e.target.closest('.mega-wrap')) closeMega(); });
  burger.addEventListener('click', function(){ var open = !navRow.classList.contains('is-open'); navRow.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  $$('.nav > a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape'){ closeMega(); closeCart(); sr.hidden = true; } });
  var header = $('#top-stack');
  var lastY = 0;
  window.addEventListener('scroll', function(){
    var y = window.scrollY; header.classList.toggle('is-stuck', y > 4);
    if (window.innerWidth > 860 && Math.abs(y - lastY) > 6){
      var hide = y > lastY && y > 260;
      if (hide !== header.classList.contains('bar-hidden')) header.classList.toggle('bar-hidden', hide);
      lastY = y;
    }
    if (y < 120) header.classList.remove('bar-hidden');
  }, { passive: true });

  // ---------- carrello (anteprima) ----------
  var cart = [], cartEl = $('#cart'), scrim = $('#cart-scrim');
  try { cart = JSON.parse(localStorage.getItem('pc-cart2') || '[]'); } catch (e) { cart = []; }
  function save(){ try { localStorage.setItem('pc-cart2', JSON.stringify(cart)); } catch (e) {} }
  function find(id){ return ALL.filter(function(x){ return x.id === id; })[0]; }
  function render(){
    var n = 0, tot = 0;
    var rows = cart.filter(function(c){ return find(c.id); });
    rows.forEach(function(c){ n += c.q; tot += c.q * find(c.id).price; });
    $('#cart-count').textContent = n; $('#cart-head-count').textContent = '(' + n + ')'; $('#cart-total').textContent = eur(tot);
    $('#cart-body').innerHTML = rows.length ? rows.map(function(c){
      var p = find(c.id), thumb = p.tile ? '<span class="ci-ph tile-' + p.tile + '">Ø</span>' : '<img src="images/' + p.i + '" alt="" width="64" height="64" />';
      return '<div class="ci">' + thumb + '<div><b>' + esc(p.n) + '</b><small>' + esc(c.vars.join(' · ')) + '</small><small>Cod. ' + p.sku + c.vars.map(function(v){ return '-' + code(v); }).join('') + '</small>' +
        '<div class="ci-row"><div class="ci-qty"><button type="button" data-q="-1:' + esc(c.key) + '" aria-label="Meno">−</button><span>' + c.q + '</span><button type="button" data-q="1:' + esc(c.key) + '" aria-label="Più">+</button></div><span class="ci-price">' + eur(c.q * p.price) + '</span></div></div>' +
        '<button class="ci-rm" type="button" data-rm="' + esc(c.key) + '" aria-label="Rimuovi"><i class="ph-bold ph-trash" aria-hidden="true"></i></button></div>';
    }).join('') : '<div class="cart-empty"><i class="ph-bold ph-shopping-cart-simple" aria-hidden="true"></i>Il carrello è vuoto.<br>Aggiungi un componente dal catalogo.</div>';
  }
  function openCart(){ cartEl.classList.add('is-open'); cartEl.setAttribute('aria-hidden', 'false'); scrim.hidden = false; }
  function closeCart(){ cartEl.classList.remove('is-open'); cartEl.setAttribute('aria-hidden', 'true'); scrim.hidden = true; }
  $('#cart-btn').addEventListener('click', openCart); $('#cart-close').addEventListener('click', closeCart); scrim.addEventListener('click', closeCart);
  document.addEventListener('click', function(e){
    var add = e.target.closest('[data-add]');
    if (add){
      var card = add.closest('.prod'), id = add.getAttribute('data-add'), vars = picked(card), q = parseInt($('.qty b', card).textContent, 10) || 1, key = id + '|' + vars.join('|');
      var it = cart.filter(function(c){ return c.key === key; })[0]; if (it) it.q += q; else cart.push({ key: key, id: id, vars: vars, q: q });
      save(); render(); var cc = $('#cart-count'); cc.classList.add('pop'); setTimeout(function(){ cc.classList.remove('pop'); }, 260);
      var t = add.innerHTML; add.classList.add('added'); add.innerHTML = '<i class="ph-bold ph-check" aria-hidden="true"></i>Aggiunto'; setTimeout(function(){ add.classList.remove('added'); add.innerHTML = t; }, 1300);
      return;
    }
    var q2 = e.target.closest('[data-q]'); if (q2 && q2.closest('.ci')){ var sp = q2.getAttribute('data-q').split(':'), d = parseInt(sp[0], 10), k = sp.slice(1).join(':'); cart.forEach(function(c){ if (c.key === k) c.q = Math.max(1, c.q + d); }); save(); render(); return; }
    var rm = e.target.closest('[data-rm]'); if (rm){ cart = cart.filter(function(c){ return c.key !== rm.getAttribute('data-rm'); }); save(); render(); }
  });
  render();

  // ---------- newsletter ----------
  if ($('#news-form')) $('#news-form').addEventListener('submit', function(e){
    e.preventDefault(); var i = $('input', this);
    if (!i.value || i.value.indexOf('@') < 1){ i.focus(); return; }
    $('#news-ok').hidden = false; i.value = '';
  });

  // ---------- librerie CAD ----------
  var DLS = [ { n:'Exocad®', s:'Matematiche DentalCAD per linea' }, { n:'3Shape®', s:'File Dental System per linea' }, { n:'DentalWings®', s:'Librerie DWOS per linea' } ];
  var dlOpts = '<option value="">Scegli la linea implantare…</option>' + BRANDS.map(function(b){ return '<option>' + esc(bname(b)) + '</option>'; }).join('') + '<option>Tutta la libreria (.zip completo)</option>';
  if ($('#dl-grid')) $('#dl-grid').innerHTML = DLS.map(function(d){
    return '<div class="dl-card"><span class="dl-ico"><i class="ph-bold ph-download-simple" aria-hidden="true"></i></span><b>' + d.n + '</b><small>' + d.s + '</small>' +
      '<select aria-label="Linea implantare per ' + esc(d.n) + '">' + dlOpts + '</select><button class="btn btn-orange" type="button" disabled>Scarica</button></div>';
  }).join('');
  if ($('#dl-grid')) $$('.dl-card').forEach(function(c){
    var sel = $('select', c), bt = $('.btn', c);
    sel.addEventListener('change', function(){ bt.disabled = !sel.value; });
    bt.addEventListener('click', function(){ var t = bt.textContent; bt.textContent = 'Download in preparazione…'; bt.disabled = true; setTimeout(function(){ bt.textContent = t; bt.disabled = !sel.value; }, 1800); });
  });

  // ---------- domande frequenti ----------
  var FAQ = [
    { q:'I componenti sono originali o compatibili?', a:'Sono componenti compatibili, prodotti da Titanium Component S.r.l. e non componenti originali delle case madri. Rispettano le stesse geometrie di innesto e sono certificati come dispositivi medici secondo il regolamento MDR 2017/745.' },
    { q:'Quali marche di impianti sono coperte?', a:'Oltre 30 piattaforme implantari, tra cui Straumann®, Nobel Biocare®, Zimmer®, Sweden & Martina®, Astra Tech®, Megagen® e Neodent®. Il motore di ricerca in home ti indica subito i componenti disponibili per la tua piattaforma.' },
    { q:'In quanto tempo ricevo l’ordine?', a:'Gli articoli a magazzino partono da Milano con corriere espresso entro 24/48 ore. Per le lavorazioni custom su disegno o campione i tempi medi sono di 3-5 giorni lavorativi.' },
    { q:'Le librerie CAD sono davvero gratuite?', a:'Sì. Le librerie native per Exocad®, 3Shape® e DentalWings® sono scaricabili gratuitamente e senza costi di licenza, aggiornate costantemente per tutti i nostri monconi e Ti-Base compatibili.' },
    { q:'Posso richiedere un componente su misura?', a:'Sì, tramite il nostro reparto di prototipazione a Milano: inviaci un disegno CAD (.step/.stl) o un campione fisico e ti proponiamo uno studio di fattibilità gratuito.' },
    { q:'Come funziona l’Area B2B per laboratori e studi?', a:'Registrandoti all’Area B2B accedi a prezzi riservati con scaglioni quantità, fatturazione elettronica e uno storico ordini dedicato per il tuo laboratorio o studio.' }
  ];
  if ($('#faq-list')) $('#faq-list').innerHTML = FAQ.map(function(f, i){
    return '<div class="faq-item"><button type="button" class="faq-q" aria-expanded="false" aria-controls="fa' + i + '"><span>' + esc(f.q) + '</span><i class="ph-bold ph-plus" aria-hidden="true"></i></button><div class="faq-a" id="fa' + i + '" role="region"><div><p>' + esc(f.a) + '</p></div></div></div>';
  }).join('');
  if ($('#faq-list')) $('#faq-list').addEventListener('click', function(e){
    var q = e.target.closest('.faq-q'); if (!q) return;
    var open = q.getAttribute('aria-expanded') !== 'true';
    q.setAttribute('aria-expanded', open ? 'true' : 'false'); q.parentNode.classList.toggle('is-open', open);
  });

  // ---------- modulo contatti ----------
  if ($('#contact-form')) $('#contact-form').addEventListener('submit', function(e){
    e.preventDefault(); var em = $('input[name="email"]', this);
    if (!em.value || em.value.indexOf('@') < 1){ em.focus(); em.classList.add('bad'); return; }
    em.classList.remove('bad'); $('#contact-ok').hidden = false; this.reset();
  });

  // ---------- hero: le forme si fermano quando non sono visibili ----------
  var heroEl = $('.hero');
  if (heroEl && 'IntersectionObserver' in window){ new IntersectionObserver(function(en){ heroEl.classList.toggle('is-off', !en[0].isIntersecting); }).observe(heroEl); }

  // ---------- comparsa a scorrimento ----------
  var rvEls = $$('.sec-head, .why, .support-main, .news-in > *, .trust-in > div, .grp-title, .brand-index, .own-lines, .about > *, .gold-grid > *, .step, .libs-grid > *, .custom-photo, .cta-band, .custom-tiles li, .faq-item, .contact-grid > *, .teaser, .assist-in > *, .stat, .vcard, .split > *, .page-head > *').concat($$('.rv'));
  rvEls.forEach(function(el, i){ el.classList.add('rv'); el.style.transitionDelay = (Math.min(i % 8, 7) * 50) + 'ms'; });
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(en){ en.forEach(function(x){ if (x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    rvEls.forEach(function(el){ io.observe(el); });
  } else { rvEls.forEach(function(el){ el.classList.add('in'); }); }
})();
