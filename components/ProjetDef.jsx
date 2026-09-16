// ProjetDef.jsx — page projet dédiée « Des Étoiles et des Femmes »
// Contenu : window.FESTIN_DATA.projets (id des-etoiles-et-des-femmes) + .presse + .donation
// Structure : fil d'ariane fixe au-dessus de la nav · hero épuré (+ logo à cheval, centré) ·
// chiffres 50/50 (compteur au scroll) · vidéo · le projet (accordéon 3 items) ·
// témoignages en marquee infini · soutenir (3 voies) · presse · galerie plein-largeur.
const { useEffect, useRef, useState } = React;
const PIMG = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function pdefMonth(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

// Chiffres (section chiffres) — extrait la cible numérique + le suffixe d'un stat existant
// (ex. "91 %" -> {target:91, suffix:" %"} ; "1 100" + unit "+" -> {target:1100, suffix:"+"})
function pdefParseStat(s) {
  const isPercent = /%/.test(s.value);
  const target = parseInt(String(s.value).replace(/[^\d]/g, ''), 10) || 0;
  const suffix = isPercent ? ' %' : (s.unit || '');
  return { target, suffix };
}
function pdefFormatNumber(n) {
  return n.toLocaleString('fr-FR');
}

// Carte témoignage — utilisée dans le bandeau défilant (marquee). Format compact fixe.
function PdefTestiCard({ t }) {
  const isPh = !!t.placeholder;
  const badge = isPh ? t.role : (t.ville + ' · ' + t.promo);
  const text = isPh ? t.citation : t.extrait;
  return (
    <article className={'pdef-tcard pdef-tcard--' + (t.variant || 'cream') + (t.bw ? ' is-bw' : '')}>
      <div className="pdef-tcard__head">
        {t.photo
          ? (
            <img
              className="pdef-tcard__photo"
              src={PIMG(t.photo)}
              alt={'Portrait de ' + t.prenom}
              style={{ objectPosition: t.objPos || 'center 18%' }}
              loading="lazy"
            />
          )
          : <span className="pdef-tcard__photo pdef-tcard__photo--ph" aria-hidden="true" />}
        <span className="pdef-tcard__badge">{badge}</span>
      </div>
      <h3 className="pdef-tcard__name">{t.prenom}</h3>
      {t.accroche && <p className="pdef-tcard__accroche">« {t.accroche} »</p>}
      <p className="pdef-tcard__quote">{isPh ? text : '« ' + text + ' »'}</p>
    </article>
  );
}

function ProjetDefPage() {
  const D = window.FESTIN_DATA;
  const p = D.projets.find(x => x.id === 'des-etoiles-et-des-femmes');
  const rootRef = useRef(null);
  const statsGridRef = useRef(null);
  const [videoOn, setVideoOn] = useState(false);
  const [projStep, setProjStep] = useState(0);

  // Le fil d'ariane passe au-dessus de la nav : la nav se décale vers le bas le temps
  // que cette page est montée (classe posée sur <body>, retirée au démontage — Nav.jsx
  // et sa CSS ne sont pas modifiés, seul projet-def.css réagit à cette classe).
  useEffect(() => {
    document.body.classList.add('pdef-has-crumb');
    return () => document.body.classList.remove('pdef-has-crumb');
  }, []);

  // Chiffres — compteur au scroll, une seule fois.
  // IntersectionObserver déclenche, requestAnimationFrame anime (1s, ease-out-cubic).
  useEffect(() => {
    const grid = statsGridRef.current;
    if (!grid) return;
    const nodes = [...grid.querySelectorAll('[data-count-target]')];
    if (!nodes.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce) {
      nodes.forEach(el => {
        el.textContent = pdefFormatNumber(Number(el.dataset.countTarget)) + (el.dataset.countSuffix || '');
      });
      return;
    }
    let done = false;
    let raf;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || done) return;
        done = true;
        const duration = 1000;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          nodes.forEach((el) => {
            const target = Number(el.dataset.countTarget);
            const suffix = el.dataset.countSuffix || '';
            el.textContent = pdefFormatNumber(Math.round(target * eased)) + suffix;
          });
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      });
    }, { threshold: 0.4 });
    io.observe(grid);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.lucide) window.lucide.createIcons();
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce || !window.gsap || !window.ScrollTrigger) {
      root.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
      return;
    }
    const ST = window.ScrollTrigger;
    window.gsap.registerPlugin(ST);
    const triggers = [];
    root.querySelectorAll('.reveal').forEach(el => {
      triggers.push(ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('is-in') }));
    });
    ST.refresh();
    return () => triggers.forEach(t => t.kill());
  }, []);

  if (!p) return null;

  // Presse — filtrée sur le dispositif : les 3 derniers articles + le reste en mentions
  const presse = (D.presse || [])
    .filter(a => (p.presseFilter || []).some(f => a.dispositif && a.dispositif.indexOf(f) === 0))
    .slice()
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  const featured3 = presse.slice(0, 3);
  const presseAlso = presse.slice(3);

  // « Le projet » — accordéon 3 items, réutilise 3 des 4 étapes de p.parcours (data.js
  // non modifié) sous des intitulés dédiés à cette section.
  const projetItems = [
    { label: 'La formation', d: p.parcours.find(x => x.tab === 'Se former') },
    { label: "L'accompagnement", d: p.parcours.find(x => x.tab === 'Être accompagnée') },
    { label: 'Les stages', d: p.parcours.find(x => x.tab === 'Pratiquer') },
  ].filter(x => x.d);

  // Galerie (fin de page) — bandeau photo authentique, non réutilisées ailleurs sur la page
  const galleryImages = [
    'images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-24.jpg',
    'images/images-def/chaudbouillon-045.jpg',
    'images/images-def/chaudbouillon-046.jpg',
    'images/images-def/HOTELERIE-097.jpg',
    'images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00022.jpg',
    'images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00032.jpg',
    'images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-40.jpg',
  ];

  return (
    <div className="pageProjetDef" ref={rootRef} data-screen-label={"Projet — " + p.shortTitle}>

      {/* FIL D'ARIANE — fixe, au-dessus de la nav (la nav se décale via body.pdef-has-crumb) */}
      <nav className="pdef-crumb2" aria-label="Fil d’ariane">
        <div className="wrap pdef-crumb2__inner">
          <a href="#/">Accueil</a>
          <span className="pdef-crumb2__rest">
            <span aria-hidden="true"> / </span>
            <a href="#/projets/des-etoiles-et-des-femmes">Nos projets</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Des Étoiles et des Femmes</span>
          </span>
          <span className="pdef-crumb2__ellipsis" aria-hidden="true"> / …</span>
        </div>
      </nav>

      {/* HERO — photo, titre, sous-titre. Sans CTA candidater, sans encart marraine. */}
      <div className="pdef-heroband">
        <header className="pdef-hero">
          <div className="pdef-hero__media">
            <img src={PIMG(p.heroImages[0])} alt="Atelier de cuisine, promotion Des Étoiles et des Femmes" />
          </div>
          <div className="pdef-hero__scrim" aria-hidden="true"></div>
          <div className="wrap pdef-hero__inner">
            <span className="pdef-hero__eb">Programme national · depuis 2015 · un projet de l’association Festin</span>
            <h1 className="pdef-hero__t">{p.title} <em>{p.accent}</em></h1>
            <p className="pdef-hero__sub">{p.projetPhrase}</p>
            <div className="pdef-hero__cta">
              <a className="btnb btnb--ghost" href={p.siteUrl} target="_blank" rel="noopener noreferrer">{p.siteName}</a>
            </div>
          </div>
        </header>

        {/* Logo DEF « à cheval », centré, mordant sur la limite hero / chiffres —
            .pdef-heroband n'enveloppe que le hero : bottom:0 tombe pile sur cette limite */}
        <div className="pdef-hero__logo">
          <img src={PIMG(p.logo)} alt={"Logo " + p.shortTitle} />
        </div>
      </div>

      {/* CHIFFRES — 50/50 : présentation + 4 blocs colorés, compteur au scroll */}
      <section className="pdef-stats" aria-labelledby="pdef-stats-t">
        <div className="wrap pdef-stats2">
          <div className="pdef-stats2__intro reveal">
            <span className="pdef-sec" id="pdef-stats-t">Les chiffres</span>
            <h2 className="pdef-h2">{p.tagline}</h2>
            <p>{p.short.replace(/\s*13 antennes en France, 91\s?%\s?de réussite aux diplômes\.\s*$/, '')}</p>
            <a className="btnb btnb--outline-ink" href={p.siteUrl} target="_blank" rel="noopener noreferrer">
              Visiter le site <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="pdef-stats2__grid reveal" ref={statsGridRef}>
            {p.stats.map((s, i) => {
              const { target, suffix } = pdefParseStat(s);
              return (
                <div key={i} className={"pdef-stat2 pdef-stat2--" + ['teal', 'gold', 'violet', 'deep'][i % 4]}>
                  <span className="pdef-stat2__n" data-count-target={target} data-count-suffix={suffix}>
                    {'0' + suffix}
                  </span>
                  <span className="pdef-stat2__l">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LE PROJET — colonne 50/50 : texte + accordéon à gauche, vidéo à droite */}
      <section className="pdef-projet" aria-labelledby="pdef-projet-t">
        <div className="wrap pdef-projet__split">
          <div className="pdef-projet__body">
            <span className="pdef-sec" id="pdef-projet-t">Le projet</span>
            <h2 className="pdef-h2 reveal">Un programme national,<br />une exigence partagée</h2>
            <p className="pdef-projet__lede reveal">
              Un réseau national de 13 antennes essaime le programme dans toute la France&nbsp;: chaque antenne s’appuie sur des centres de formation, des restaurateurs et des partenaires locaux.
            </p>
            <div className="pdef-acc reveal">
              {projetItems.map((it, i) => {
                const isOpen = projStep === i;
                const s = it.d;
                return (
                  <div className={"pdef-acc__item" + (isOpen ? " is-open" : "")} key={i}>
                    <h3 className="pdef-acc__h">
                      <button
                        type="button" className="pdef-acc__btn"
                        id={"pdacc-h-" + i} aria-expanded={isOpen} aria-controls={"pdacc-p-" + i}
                        onClick={() => setProjStep(isOpen ? -1 : i)}
                      >
                        <span className="pdef-acc__label">{it.label}</span>
                        <span className="pdef-acc__chev" aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      className="pdef-acc__panel" id={"pdacc-p-" + i}
                      role="region" aria-labelledby={"pdacc-h-" + i}
                    >
                      <div className="pdef-acc__body">
                        <span className="pdef-acc__k">{s.title}</span>
                        <p>{s.text}</p>
                        <div className="pdef-acc__stat"><strong>{s.stat}</strong><span>{s.statL}</span></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pdef-projet__media reveal">
            <div className="pdef-projet__frame">
              {videoOn ? (
                <iframe
                  title={"Vidéo de présentation — " + p.shortTitle}
                  src="https://drive.google.com/file/d/1X3er9EQUpu61_yXR3KceY1sV4RgfygEK5hNzUFaaHEY/preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="pdef-projet__play"
                  onClick={() => setVideoOn(true)}
                  aria-label={"Lire la vidéo de présentation du programme " + p.shortTitle}
                >
                  <img src={PIMG(p.video.poster)} alt="" aria-hidden="true" />
                  <span className="pdef-projet__scrim" aria-hidden="true"></span>
                  <span className="pdef-projet__playlabel">Lire la vidéo <span aria-hidden="true">→</span></span>
                </button>
              )}
            </div>
            <p className="pdef-projet__credit">Vidéo réalisée par l’agence Les Fabricants</p>
            <div className="pdef-projet__formations">
              <a className="pdef-projet__fcard" href="#/formations/cap">
                <span className="pdef-projet__fname">CAP Cuisine</span>
                <span className="pdef-projet__fmeta">11 mois</span>
                <span className="pdef-projet__farrow" aria-hidden="true">→</span>
              </a>
              <a className="pdef-projet__fcard" href="#/formations/tfp">
                <span className="pdef-projet__fname">Titre Professionnel</span>
                <span className="pdef-projet__fmeta">4 mois</span>
                <span className="pdef-projet__farrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES — bandeau défilant en boucle infinie (marquee CSS), pause au survol */}
      <section className="pdef-testi" aria-labelledby="pdef-testi-t">
        <div className="wrap">
          <span className="pdef-sec" id="pdef-testi-t">Elles l’ont fait</span>
          <h2 className="pdef-h2 reveal">Des parcours, des visages</h2>
        </div>
        <div className="pdef-tmarquee reveal">
          <div className="pdef-tmarquee__track">
            {[...p.temoignages, ...p.temoignages].map((t, i) => (
              <div className="pdef-tmarquee__item" key={i} aria-hidden={i >= p.temoignages.length}>
                <PdefTestiCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOUTENIR — texte + 3 CTA à gauche, logos partenaires à droite */}
      <section className="pdef-support" aria-labelledby="pdef-support-t">
        <div className="wrap pdef-support__inner reveal">
          <div className="pdef-support__body">
            <span className="pdef-sec" id="pdef-support-t">Soutenir</span>
            <h2 className="pdef-h2">{p.soutenir.title}</h2>
            <p>{p.soutenir.text}</p>
            <div className="pdef-support__cta">
              <a className="btnb btnb--gold pdef-support__cta-main" href={D.donation} target="_blank" rel="noopener noreferrer">
                {p.soutenir.donLabel}
              </a>
              <div className="pdef-support__cta-row">
                <a className="btnb btnb--ghost pdef-support__cta-sub" href={p.accueil.ctaHref}>{p.accueil.ctaLabel}</a>
                <a className="btnb btnb--ghost pdef-support__cta-sub" href={p.soutenir.contactHref}>{p.soutenir.contactLabel}</a>
              </div>
            </div>
          </div>
          <div className="pdef-support__logos" role="group" aria-label="Partenaires">
            <div className="pdef-logogrid">
              <span className="pdef-logocard">
                <img src="images/partners/sofitel.jpg" alt="Sofitel Hotels &amp; Resorts" loading="lazy" />
              </span>
              <span className="pdef-logocard">
                <img src="images/partners/les-bords-de-mer.png" alt="Les Bords de Mer" loading="lazy" />
              </span>
            </div>
            <div className="pdef-logogrid">
              <span className="pdef-logocard">
                <img src="images/partners/la-source.svg" alt="La Source" loading="lazy" />
              </span>
              <span className="pdef-logocard pdef-logocard--hub">
                <img src={PIMG(p.logo)} alt={p.shortTitle} loading="lazy" />
              </span>
              <span className="pdef-logocard">
                <img src="images/partners/les-grandes-tables.jpeg" alt="Les Grandes Tables" loading="lazy" />
              </span>
            </div>
            <div className="pdef-logogrid">
              <span className="pdef-logocard">
                <img src="images/partners/the-small-group.webp" alt="The Small Group" loading="lazy" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRESSE — 3 derniers articles + le reste en mentions */}
      {presse.length > 0 && (
        <section className="pdef-presse" aria-labelledby="pdef-presse-t">
          <div className="wrap">
            <span className="pdef-sec" id="pdef-presse-t">La presse</span>
            <h2 className="pdef-h2 reveal">Dans la presse</h2>
            <div className="pdef-news">
              {featured3.map((a, i) => (
                <a key={i} className="pdef-news__card reveal" href={a.href} target="_blank" rel="noopener noreferrer">
                  <span className="pdef-news__top">
                    {a.logo
                      ? <img className="pdef-news__logo" src={PIMG(a.logo)} alt={a.source} loading="lazy" />
                      : <span className="pdef-news__src">{a.source}</span>}
                    {a.type && <span className="pdef-news__tag">{a.type}</span>}
                  </span>
                  <span className="pdef-news__title">{a.title}</span>
                  <span className="pdef-news__date">{pdefMonth(a.date)}</span>
                </a>
              ))}
            </div>
            {presseAlso.length > 0 && (
              <p className="pdef-news__also reveal">
                <b>Également paru dans</b>&nbsp;— {presseAlso
                  .map(a => a.source)
                  .filter((v, k, arr) => arr.findIndex(x => x.toLowerCase() === v.toLowerCase()) === k)
                  .join(' · ')}.
              </p>
            )}
          </div>
        </section>
      )}

      {/* GALERIE — bandeau plein-largeur, défilement auto lent, boucle infinie, fondu aux bords */}
      <section className="pdef-gallery" aria-label="Galerie photo Des Étoiles et des Femmes">
        <div className="pdef-gallery__track">
          {[...galleryImages, ...galleryImages].map((src, i) => (
            <div className="pdef-gallery__item" key={i} aria-hidden={i >= galleryImages.length}>
              <img src={PIMG(src)} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

window.ProjetDefPage = ProjetDefPage;
