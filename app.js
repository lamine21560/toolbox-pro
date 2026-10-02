const SITE = { name: 'OmniTools', email: 'laminengom236@gmail.com' };
const CATS = { social: '📱 Réseaux sociaux', texte: '✍️ Texte', secu: '🔐 Sécurité', calcul: '🧮 Calcul', design: '🎨 Design', fun: '🎲 Divers' };

const $ = (s, r = document) => r.querySelector(s);
const pick = a => a[Math.floor(Math.random() * a.length)];
const sh = a => [...a].sort(() => Math.random() - .5);
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
const esc = s => String(s).replace(/[&<">]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const rnd = n => Math.floor(Math.random() * n);
const AD = n => `<div class="ad" data-slot="${n}"></div>`;

// Logo SVG transparent correspondant exactement à l'icône de ton image
const LOGO_SVG = `<svg class="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="35" stroke="currentColor" stroke-width="12"/>
  <circle cx="50" cy="50" r="12" fill="currentColor"/>
  <circle cx="22" cy="22" r="4" fill="currentColor"/>
  <circle cx="78" cy="20" r="3" fill="currentColor"/>
  <circle cx="20" cy="76" r="3.5" fill="currentColor"/>
</svg>`;

const getFavs = () => { try { return JSON.parse(localStorage.favs || '[]'); } catch { return []; } };
const toggleFav = id => {
  let f = getFavs();
  f = f.includes(id) ? f.filter(x => x !== id) : [...f, id];
  localStorage.favs = JSON.stringify(f);
};

const T = [
  { id: 'bio-instagram', n: 'Générateur de bio Instagram', c: 'social', i: '📸', d: 'Des bios Instagram originales en un clic.', g: 'Une bonne bio tient en 150 caractères : qui vous êtes, ce que vous offrez, un appel à l’action. Ajoutez 1 à 3 emojis maximum.',
    f: [['nom', 'Nom ou pseudo', 'text', 'Léa'], ['job', 'Activité', 'text', 'photographe'], ['ton', 'Ton', 'select', 'fun', ['fun', 'pro', 'inspirant']]],
    run: v => ({ fun: [`${v.job} 100% passionné(e) ✨ | ${v.nom} 😎`, `${v.nom} • ${v.job} 🚀 Ici pour le fun 🎉`, `Mi-${v.job}, mi-rêveur(se) 🌈 | ${v.nom}`], pro: [`${v.nom} | ${v.job} 📍 Contact en DM 📩`, `${v.job} professionnel(le) • Projets & collaborations 💼`, `${v.nom} — ${v.job}. Qualité, passion, résultats ✅`], inspirant: [`${v.nom} ✨ ${v.job} | Crois en tes rêves 🌟`, `Créer chaque jour, inspirer toujours 🌱 ${v.job}`, `${v.job} et fier(e) de l’être 💫 | ${v.nom}`] })[v.ton] },
  { id: 'hashtags', n: 'Générateur de hashtags', c: 'social', i: '#️⃣', d: 'Hashtags pertinents pour vos publications.', g: 'Mélangez hashtags populaires et de niche. 5 à 15 hashtags suffisent. Évitez de répéter toujours les mêmes.',
    f: [['s', 'Sujet (un mot)', 'text', 'voyage']], run: v => { const b = slug(v.s) || 'mot'; return sh([b, b + 'life', 'love' + b, b + 'lover', b + 'daily', b + 'tips', b + 'france', b + 'addict', 'top' + b, b + 'inspiration', b + 'community', 'instagood', 'explore', 'viral', 'fyp']).map(x => '#' + x).join(' '); } },
  { id: 'titres-youtube', n: 'Générateur de titres YouTube', c: 'social', i: '▶️', d: 'Titres accrocheurs pour vos vidéos.', g: 'Un bon titre fait moins de 60 caractères, contient le mot-clé au début et suscite la curiosité sans mentir.',
    f: [['s', 'Sujet de la vidéo', 'text', 'apprendre le piano']], run: v => [`${v.s} : le guide complet pour débutants`, `Comment réussir ${v.s} en 7 jours`, `Les 5 erreurs à éviter en ${v.s}`, `J’ai testé ${v.s} pendant 30 jours`, `${v.s} : ce que personne ne vous dit`, `Tout savoir sur ${v.s} en 10 minutes`, `${v.s} : astuces de pro`, `Pourquoi ${v.s} change tout`] },
  { id: 'compteur-mots', n: 'Compteur de mots', c: 'texte', i: '🔢', d: 'Mots, caractères, phrases et temps de lecture.', g: 'Utile pour respecter les limites : tweet 280 caractères, meta description 155, bio Instagram 150.',
    f: [['t', 'Votre texte', 'area', 'Collez votre texte ici…']], run: v => { const t = v.t.trim(), w = t ? t.split(/\s+/).length : 0; return `Mots : ${w}\nCaractères : ${v.t.length}\nSans espaces : ${v.t.replace(/\s/g, '').length}\nPhrases : ${(t.match(/[.!?]+/g) || []).length}\nLecture : ~${Math.max(1, Math.round(w / 200))} min`; } },
  { id: 'mots-de-passe', n: 'Générateur de mots de passe', c: 'secu', i: '🔑', d: 'Mots de passe forts générés dans votre navigateur.', g: 'Visez 16 caractères ou plus, un mot de passe unique par site, et utilisez un gestionnaire de mots de passe.',
    f: [['l', 'Longueur', 'num', 16], ['sy', 'Symboles', 'select', 'Oui', ['Oui', 'Non']]], run: v => { const cs = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + (v.sy == 'Oui' ? '!@#$%^&*()-_=+?' : ''), n = Math.min(64, Math.max(6, +v.l || 16)); return Array.from({ length: 5 }, () => Array.from(crypto.getRandomValues(new Uint32Array(n)), x => cs[x % cs.length]).join('')); } },
  { id: 'convertisseur-texte', n: 'Convertisseur de texte', c: 'texte', i: '🔠', d: 'Majuscules, minuscules, slug, inversion…', g: 'Pratique pour nettoyer un texte, créer une URL propre (slug) ou corriger un texte écrit en majuscules.',
    f: [['t', 'Texte', 'area', 'Bonjour le monde'], ['m', 'Conversion', 'select', 'MAJUSCULES', ['MAJUSCULES', 'minuscules', 'Titre', 'Inverser', 'Sans accents', 'Slug (URL)']]],
    run: v => ({ 'MAJUSCULES': v.t.toUpperCase(), 'minuscules': v.t.toLowerCase(), 'Titre': v.t.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase()), 'Inverser': [...v.t].reverse().join(''), 'Sans accents': v.t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''), 'Slug (URL)': v.t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') })[v.m] },
  { id: 'usernames', n: 'Générateur de usernames', c: 'social', i: '🧑‍💻', d: 'Pseudos originaux à partir d’un mot.', g: 'Choisissez un pseudo court, facile à épeler et identique sur tous vos réseaux.',
    f: [['s', 'Mot de base', 'text', 'nova']], run: v => { const b = slug(v.s) || 'user'; return sh(['the' + b, b + '_official', b + rnd(99), b + '.fr', 'real' + b, b + '_' + pick(['x', 'pro', 'studio', 'world']), 'its' + b, b + 'hq', b + rnd(999), 'mr' + b]); } },
  { id: 'calculatrice', n: 'Calculatrice', c: 'calcul', i: '🧮', d: 'Calculatrice simple et rapide.', g: 'Tapez vos opérations avec les boutons ou le clavier. Le bouton C efface tout.',
    x: el => { el.innerHTML = '<input id="cd" readonly placeholder="0"><div class="calc">' + 'C ( ) /  7 8 9 *  4 5 6 -  1 2 3 +  0 . % ='.split(/\s+/).map(k => `<button>${k}</button>`).join('') + '</div>'; const d = $('#cd'); el.onclick = e => { if (e.target.tagName != 'BUTTON') return; const k = e.target.textContent; if (k == 'C') d.value = ''; else if (k == '=') { try { if (!/^[0-9+\-*/().% ]+$/.test(d.value)) throw 0; d.value = Function('return ' + d.value.replace(/%/g, '/100'))(); } catch { d.value = 'Erreur'; } } else d.value += k; }; } },
  { id: 'idees-contenu', n: 'Générateur d’idées de contenu', c: 'social', i: '💡', d: 'Idées de posts, vidéos et articles.', g: 'Publiez régulièrement et variez les formats : conseils, coulisses, avant/après, questions à votre audience.',
    f: [['s', 'Votre niche', 'text', 'cuisine']], run: v => [`5 erreurs courantes en ${v.s}`, `Avant/après : ma transformation en ${v.s}`, `Les coulisses de mon quotidien en ${v.s}`, `Quiz : connaissez-vous vraiment la ${v.s} ?`, `Mythes et vérités sur ${v.s}`, `Mon top 3 des outils pour ${v.s}`, `Question à ma communauté : votre pire expérience en ${v.s} ?`, `Tutoriel express : ${v.s} en 60 secondes`, `Débutant vs expert en ${v.s}`, `Ce que j’aurais aimé savoir avant de me lancer en ${v.s}`] },
  { id: 'qr-code', n: 'Générateur de QR Code', c: 'design', i: '▦', d: 'Créez un QR code pour un lien ou un texte.', g: 'Testez toujours votre QR code avant impression et gardez un bon contraste entre le fond et le code.',
    x: el => { el.innerHTML = '<label>Lien ou texte<input id="qt" value="https://"></label><button class="btn" id="qb">Générer</button><div id="qr" style="margin-top:14px"></div>'; const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'; document.head.appendChild(s); $('#qb').onclick = () => { $('#qr').innerHTML = ''; new QRCode($('#qr'), { text: $('#qt').value, width: 200, height: 200 }); }; } },
  { id: 'couleurs', n: 'Générateur de couleurs', c: 'design', i: '🎨', d: 'Palettes de 5 couleurs aléatoires.', g: 'Cliquez sur une couleur pour copier son code HEX. Limitez-vous à 3 couleurs principales dans un design.',
    x: el => { el.innerHTML = '<button class="btn" id="cb">🔄 Nouvelle palette</button><div class="sw" id="sw" style="margin-top:14px"></div>'; const g = () => { $('#sw').innerHTML = Array.from({ length: 5 }, () => { const h = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'); return `<div style="background:${h}" data-c="${h}">${h}</div>`; }).join(''); }; $('#cb').onclick = g; $('#sw').onclick = e => e.target.dataset.c && navigator.clipboard.writeText(e.target.dataset.c); g(); } },
  { id: 'pourcentage', n: 'Calculateur de pourcentage', c: 'calcul', i: '％', d: 'Calculez vite un pourcentage ou une variation.', g: 'Pratique pour les soldes, les marges ou l’évolution d’un chiffre d’affaires.',
    f: [['a', 'Valeur A', 'num', 20], ['b', 'Valeur B', 'num', 150], ['m', 'Calcul', 'select', 'A % de B', ['A % de B', 'A est quel % de B', 'Variation de A à B']]], run: v => { const a = +v.a, b = +v.b; return v.m == 'A % de B' ? `${a}% de ${b} = ${a * b / 100}` : v.m == 'A est quel % de B' ? `${a} représente ${(a / b * 100).toFixed(2)}% de ${b}` : `Variation : ${((b - a) / a * 100).toFixed(2)}%`; } },
  { id: 'lorem-ipsum', n: 'Générateur de Lorem Ipsum', c: 'texte', i: '📄', d: 'Texte de remplissage pour vos maquettes.', g: 'Utilisez du faux texte pour tester une mise en page avant d’avoir le contenu final.',
    f: [['n', 'Paragraphes', 'num', 3]], run: v => { const w = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim minim veniam quis nostrud'.split(' '); return Array.from({ length: Math.min(10, +v.n || 1) }, () => { let s = Array.from({ length: 45 }, () => pick(w)).join(' '); return s[0].toUpperCase() + s.slice(1) + '.'; }).join('\n\n'); } },
  { id: 'tirage-au-sort', n: 'Tirage au sort', c: 'fun', i: '🎲', d: 'Tirez un gagnant parmi une liste.', g: 'Saisissez un nom par ligne. Idéal pour un concours ou pour décider sans discuter.',
    f: [['t', 'Participants (un par ligne)', 'area', 'Alice\nBob\nChloé']], run: v => { const l = v.t.split('\n').map(x => x.trim()).filter(Boolean); return l.length ? '🏆 ' + pick(l) : 'Ajoutez des participants.'; } },
  { id: 'convertisseur-unites', n: 'Convertisseur d’unités', c: 'calcul', i: '📏', d: 'Km/miles, kg/livres, °C/°F…', g: 'Choisissez la conversion et saisissez une valeur : le résultat s’affiche instantanément.',
    f: [['x', 'Valeur', 'num', 10], ['m', 'Conversion', 'select', 'km → miles', ['km → miles', 'miles → km', 'kg → livres', 'livres → kg', '°C → °F', '°F → °C', 'cm → pouces', 'pouces → cm']]],
    run: v => { const x = +v.x, F = { 'km → miles': x * .621371, 'miles → km': x * 1.609344, 'kg → livres': x * 2.204623, 'livres → kg': x * .453592, '°C → °F': x * 9 / 5 + 32, '°F → °C': (x - 32) * 5 / 9, 'cm → pouces': x / 2.54, 'pouces → cm': x * 2.54 }; return `${x} ${v.m.split(' → ')[0]} = ${F[v.m].toFixed(2)} ${v.m.split(' → ')[1]}`; } },
  { id: 'calcul-age', n: 'Calculateur d’âge', c: 'calcul', i: '🎂', d: 'Votre âge exact à partir de la date de naissance.', g: 'Saisissez votre date de naissance pour connaître votre âge en années, mois et jours.',
    f: [['d', 'Date de naissance', 'date', '2000-01-01']], run: v => { const b = new Date(v.d), n = new Date(); if (isNaN(b)) return 'Date invalide'; let y = n.getFullYear() - b.getFullYear(), m = n.getMonth() - b.getMonth(), d = n.getDate() - b.getDate(); if (d < 0) { m--; d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); } if (m < 0) { y--; m += 12; } return `${y} ans, ${m} mois et ${d} jours`; } },
  { id: 'compresseur-image', n: 'Compresseur d’images', c: 'design', i: '🖼️', d: 'Réduisez le poids de vos images PNG et JPG.', g: 'Chargez une image, ajustez la qualité et téléchargez la version optimisée directement.',
    x: el => {
      el.innerHTML = '<label>Choisir une image<input type="file" id="img-in" accept="image/*"></label><br><label>Qualité (10 à 100%): <input type="number" id="img-q" value="70" min="10" max="100"></label><br><button class="btn" id="img-go">⚡ Compresser</button><div id="img-out" style="margin-top:14px"></div>';
      $('#img-go').onclick = () => {
        const file = $('#img-in').files[0];
        if (!file) return alert('Veuillez sélectionner une image.');
        const q = Math.min(100, Math.max(10, +$('#img-q').value || 70)) / 100;
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          const cvs = document.createElement('canvas');
          cvs.width = img.width; cvs.height = img.height;
          const ctx = cvs.getContext('2d');
          ctx.drawImage(img, 0, 0);
          cvs.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            $('#img-out').innerHTML = `<p>Taille d'origine : ${(file.size/1024).toFixed(1)} KB<br><strong>Nouvelle taille : ${(blob.size/1024).toFixed(1)} KB</strong></p><a class="btn" href="${url}" download="image-optimisee.jpg">⬇️ Télécharger</a>`;
          }, 'image/jpeg', q);
        };
      };
    }
  },
  { id: 'sujets-email', n: 'Sujets d’email accrocheurs', c: 'texte', i: '✉️', d: 'Générez des objets d’email pertinents.', g: 'Un bon objet d’email doit donner envie d’ouvrir le message immédiatement.',
    f: [['s', 'Sujet de votre email', 'text', 'offre spéciale']], run: v => [`[Rappel] Ne manquez pas ${v.s}`, `Ce que vous devez savoir sur ${v.s}`, `Une question rapide sur ${v.s} ?`, `Résultats garantis avec ${v.s}`, `3 astuces simples pour ${v.s}`, `Pourquoi ${v.s} va vous faire gagner du temps`] 
  }
];

const byId = id => T.find(t => t.id == id);
const Q = new URLSearchParams(location.search);

function lay() {
  const dk = localStorage.th ? localStorage.th == 'd' : matchMedia('(prefers-color-scheme:dark)').matches;
  document.documentElement.dataset.theme = dk ? 'dark' : 'light';

  document.body.insertAdjacentHTML('afterbegin', `<header><div class="wrap"><a class="logo" href="index.html">${LOGO_SVG} <span>${SITE.name}</span></a><nav><a href="index.html">Accueil</a><a href="index.html#outils">Outils</a><a href="guides.html">Guides</a><a href="a-propos.html">À propos</a><a href="contact.html">Contact</a></nav><button id="th" aria-label="Mode sombre">${dk ? '🌙' : '☀️'}</button></div></header>`);
  document.body.insertAdjacentHTML('beforeend', `<footer>${AD('bas')}<a href="a-propos.html">À propos</a><a href="contact.html">Contact</a><a href="confidentialite.html">Confidentialité</a><a href="conditions.html">Conditions</a><p>© ${new Date().getFullYear()} ${SITE.name}</p></footer>`);

  $('#th').onclick = () => {
    const isDark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    $('#th').textContent = isDark ? '🌙' : '☀️';
    try { localStorage.th = isDark ? 'd' : 'l'; } catch { }
  };
}

const card = t => {
  const isFav = getFavs().includes(t.id);
  return `
  <div class="card-wrap" style="position:relative">
    <a class="card" href="outil.html?t=${t.id}">
      <b>${t.i} ${t.n}</b>
      <span>${t.d}</span>
    </a>
    <button class="fav-btn" data-fav="${t.id}" title="Favori" style="position:absolute; top:12px; right:12px; background:none; border:none; font-size:18px; cursor:pointer; opacity:${isFav ? '1' : '0.4'}">
      ${isFav ? '⭐' : '☆'}
    </button>
  </div>`;
};

function home(a) {
  let cat = '', q = '';

  a.innerHTML = `
    <section class="hero">
      <h1>${T.length} outils gratuits en ligne</h1>
      <p>Rapides, sans inscription, adaptés au téléphone.</p>
      
      <div style="position:relative; max-width:500px; margin: 15px auto 0;">
        <input id="q" type="text" placeholder="Rechercher un outil..." style="width:100%; padding:12px 35px 12px 15px; border-radius:10px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:inherit; font-size:16px; outline:none; box-sizing:border-box;">
        <button id="clear-q" style="display:none; position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; color:inherit; font-size:16px; cursor:pointer; opacity:0.6;">✕</button>
      </div>
    </section>
    
    ${AD('haut')}

    <div id="fav-sec" style="display:none; margin-bottom: 20px;">
      <h3 style="font-size:15px; opacity:0.8; margin-bottom:10px;">⭐ Vos outils favoris</h3>
      <div class="grid" id="fav-gr"></div>
    </div>

    <div class="chips" id="ch"></div>
    <div class="grid" id="gr"></div>
  `;

  const drawFavs = () => {
    const favIds = getFavs();
    const favSec = $('#fav-sec');
    if (favIds.length > 0) {
      favSec.style.display = 'block';
      $('#fav-gr').innerHTML = T.filter(t => favIds.includes(t.id)).map(card).join('');
    } else {
      favSec.style.display = 'none';
    }
  };

  const draw = () => {
    $('#ch').innerHTML = `<button class="chip ${cat ? '' : 'on'}" data-c="">Tous</button>` + Object.entries(CATS).map(([k, v]) => `<button class="chip ${cat == k ? 'on' : ''}" data-c="${k}">${v}</button>`).join('');
    const l = T.filter(t => (!cat || t.c == cat) && (t.n + t.d).toLowerCase().includes(q));
    $('#gr').innerHTML = l.map(card).join('') || '<p style="grid-column: 1/-1; text-align:center; opacity:0.7;">Aucun outil trouvé.</p>';
    drawFavs();
  };

  const qInput = $('#q');
  const clearBtn = $('#clear-q');

  qInput.oninput = e => {
    q = e.target.value.toLowerCase().trim();
    clearBtn.style.display = q ? 'block' : 'none';
    draw();
  };

  clearBtn.onclick = () => {
    qInput.value = '';
    q = '';
    clearBtn.style.display = 'none';
    draw();
  };

  $('#ch').onclick = e => {
    if (e.target.dataset.c != null) {
      cat = e.target.dataset.c;
      draw();
    }
  };

  a.onclick = e => {
    const btn = e.target.closest('[data-fav]');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      toggleFav(btn.dataset.fav);
      draw();
    }
  };

  a.querySelector('.grid').parentElement.id = 'outils';
  draw();
}

function tool(a) {
  const t = byId(Q.get('t'));
  if (!t) {
    a.innerHTML = '<h1>Outil introuvable</h1><a href="index.html">Retour</a>';
    return;
  }

  document.title = t.n + ' – gratuit | ' + SITE.name;
  document.querySelector('meta[name=description]').content = t.d + ' Outil gratuit en ligne.';

  a.innerHTML = `<h1>${t.i} ${t.n}</h1><p>${t.d}</p>${AD('haut')}<div class="box" id="tb"></div>${AD('milieu')}<p><a href="guides.html?g=${t.id}">📚 Lire le guide</a></p><h2>Autres outils</h2><div class="grid">${sh(T.filter(x => x != t)).slice(0, 4).map(card).join('')}</div>`;

  const el = $('#tb');
  if (t.x) return t.x(el);

  el.innerHTML = t.f.map(([k, l, ty, d, o]) => `<label>${l}${ty == 'area' ? `<textarea id="f_${k}" rows="5">${esc(d)}</textarea>` : ty == 'select' ? `<select id="f_${k}">${o.map(x => `<option${x == d ? ' selected' : ''}>${x}</option>`).join('')}</select>` : `<input id="f_${k}" type="${ty == 'num' ? 'number' : ty}" value="${esc(d)}">`}</label>`).join('') + '<button class="btn" id="go">🔄 Générer</button><div class="out" id="out"></div>';

  const go = () => {
    const v = {};
    t.f.forEach(([k]) => v[k] = $('#f_' + k).value);
    const r = t.run(v), o = $('#out');
    o.innerHTML = Array.isArray(r) ? r.map(x => `<div class="line"><span>${esc(x)}</span><button data-t="${esc(x)}">Copier</button></div>`).join('') : `<pre>${esc(r)}</pre><button data-t="${esc(r)}">Copier</button>`;
  };

  el.oninput = go;
  $('#go').onclick = go;
  el.onclick = e => {
    const c = e.target.dataset.t;
    if (c) {
      navigator.clipboard.writeText(c);
      e.target.textContent = '✓ Copié';
    }
  };
  go();
}

function guides(a) {
  const t = byId(Q.get('g'));
  if (!t) {
    document.title = 'Guides et tutoriels | ' + SITE.name;
    a.innerHTML = `<h1>📚 Guides et tutoriels</h1>${AD('haut')}<div class="grid">${T.map(t => `<a class="card" href="guides.html?g=${t.id}"><b>${t.i} Guide :${t.n}</b><span>Comment bien l’utiliser</span></a>`).join('')}</div>`;
    return;
  }

  document.title = 'Guide : ' + t.n + ' | ' + SITE.name;
  document.querySelector('meta[name="description"]').content = 'Comment utiliser le ' + t.n.toLowerCase() + ' : étapes et conseils.';

  a.innerHTML = `<h1>Guide : ${t.n}</h1><p>${t.d}</p>${AD('haut')}<h2>Comment l’utiliser</h2><ol><li>Ouvrez l’outil <a href="outil.html?t=${t.id}">${t.n}</a>.</li><li>Remplissez les champs proposés.</li><li>Copiez le résultat et utilisez-le où vous voulez.</li></ol><h2>Nos conseils</h2><p>${t.g}</p>${AD('milieu')}<a class="btn" href="outil.html?t=${t.id}">Utiliser l’outil</a> <a href="guides.html">← Tous les guides</a>`;
}

document.addEventListener('DOMContentLoaded', () => {
  lay();
  const p = document.body.dataset.p, a = $('#app');
  ({ home, tool, guides })[p]?.(a);
});
