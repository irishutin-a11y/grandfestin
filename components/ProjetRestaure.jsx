// ProjetRestaure.jsx — page projet dédiée « Le programme Restaure »
// Gabarit repris de ProjetDef.jsx / ProjetLBM.jsx pour valider une structure de
// page projet réutilisable : fil d'ariane fixe · hero + logo à cheval · chiffres
// avec compteur · le projet (mission + accordéon 3 axes) · vidéo · témoignage ·
// rejoindre · presse · galerie. Écarts assumés (données non équivalentes à ce
// stade) :
// - accordéon "Le projet" = le repositionnement stratégique 2026 (mission +
//   indicateurs SUIVIS, présentés comme tels, pas comme des résultats acquis)
// - vidéo : reel Instagram (format vertical), pas de poster dédié → réutilise
//   une photo existante
// - témoignage unique (1 seul avis dispo) → carte dominante, pas de duo/marquee
// - logos partenaires (3 des 4 structures fondatrices) en placeholder
const { useEffect, useRef, useState } = React;
const PIMG = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function prstMonth(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

function prstParseStat(s) {
  const isPercent = /%/.test(s.value);
  const target = parseInt(String(s.value).replace(/[^\d]/g, ''), 10) || 0;
  const suffix = isPercent ? ' %' : (s.unit || '');
  return { target, suffix };
}
function prstFormatNumber(n) {
  return n.toLocaleString('fr-FR');
}

function ProjetRestaurePage() {
  const D = window.FESTIN_DATA;
  const p = D.projets.find(x => x.id === 'restaure');
  const rootRef = useRef(null);
  const statsGridRef = useRef(null);
  const groupesRef = useRef(null);
  const [videoOn, setVideoOn] = useState(false);
  const [projStep, setProjStep] = useState(0);

  useEffect(() => {
    document.body.classList.add('proj-has-crumb');
    return () => document.body.classList.remove('proj-has-crumb');
  }, []);

  useEffect(() => {
    const grid = statsGridRef.current;
    if (!grid) return;
    const nodes = [...grid.querySelectorAll('[data-count-target]')];
    if (!nodes.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce) {
      nodes.forEach(el => {
        el.textContent = prstFormatNumber(Number(el.dataset.countTarget)) + (el.dataset.countSuffix || '');
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
            el.textContent = prstFormatNumber(Math.round(target * eased)) + suffix;
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

  // Groupes de travail : un rail se remplit au défilement et allume chaque
  // groupe quand il passe au centre de l'écran (révéler, dans l'ordre).
  useEffect(() => {
    const list = groupesRef.current;
    if (!list) return;
    const rows = [...list.querySelectorAll('.prgw__row')];
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce || !window.gsap || !window.ScrollTrigger) { rows.forEach(r => r.classList.add('is-lit')); list.classList.add('is-static'); return; }
    const g = window.gsap, ST = window.ScrollTrigger;
    g.registerPlugin(ST);
    const tw = g.fromTo(list.querySelector('.prgw__fill'), { scaleY: 0 }, { scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: list, start: 'top 55%', end: 'bottom 55%', scrub: 0.4 } });
    const trs = rows.map((r) => ST.create({ trigger: r, start: 'top 58%', end: 'bottom 58%',
      onToggle: (self) => r.classList.toggle('is-lit', self.isActive || self.progress === 1),
      onLeave: () => r.classList.add('is-lit'), onLeaveBack: () => r.classList.remove('is-lit') }));
    const intro = g.from(list.querySelectorAll('.prgw__n, .prgw__t, .prgw__p'), { x: -40, autoAlpha: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: list, start: 'top 80%', once: true } });
    return () => { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); intro.scrollTrigger && intro.scrollTrigger.kill(); intro.kill(); trs.forEach(t => t.kill()); };
  }, []);

  if (!p) return null;

  const presse = (D.presse || [])
    .filter(a => (p.presseFilter || []).some(f => a.dispositif && a.dispositif.indexOf(f) === 0))
    .slice()
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  const featured3 = presse.slice(0, 3);
  const presseAlso = presse.slice(3);

  const galleryImages = [
    'images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg',
    'images/restaure : formation pro/FESTIN_TOAST_12 FEVRIER_FEED-25.jpg',
    'images/restaure : formation pro/IMG_2950.JPG',
    'images/restaure : formation pro/TASTING_RFF_CLOSING-FEED-34 (1).JPG',
    'images/restaure : formation pro/WhatsApp Image 2025-12-09 at 08.53.58.jpg',
  ];

  const t = (p.temoignages && p.temoignages[0]) || p.quote && { prenom: p.quote.author, role: p.quote.role, citation: p.quote.text };

  return (
    <div className="pageProjet pageProjet--restaure" ref={rootRef} data-screen-label={"Projet — " + p.shortTitle}>

      {/* FIL D'ARIANE */}
      <nav className="proj-crumb2" aria-label="Fil d’ariane">
        <div className="wrap proj-crumb2__inner">
          <a href="#/">Accueil</a>
          <span className="proj-crumb2__rest">
            <span aria-hidden="true"> / </span>
            <a href="#/projets/restaure">Nos projets</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{p.shortTitle}</span>
          </span>
          <span className="proj-crumb2__ellipsis" aria-hidden="true"> / …</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="proj-heroband">
        <header className="proj-hero">
          <div className="proj-hero__media">
            <img src={PIMG(p.heroImages[0])} alt="Lancement du programme Restaure à Marseille" />
          </div>
          <div className="proj-hero__scrim" aria-hidden="true"></div>
          <div className="wrap proj-hero__inner">
            <span className="proj-hero__eb">{p.eyebrow} · programme porté par l’association Festin</span>
            <h1 className="proj-hero__t">{p.title} <em>{p.accent}</em></h1>
            <p className="proj-hero__sub">{p.projetPhrase}</p>
            <div className="proj-hero__cta">
              <a className="btnb btnb--ghost" href={p.siteUrl} target="_blank" rel="noopener noreferrer">{p.siteName}</a>
            </div>
          </div>
        </header>

        <div className="proj-hero__logo">
          <img src={PIMG(p.logo)} alt={"Logo " + p.shortTitle} />
        </div>
      </div>

      {/* CHIFFRES */}
      <section className="proj-stats" aria-labelledby="proj-stats-t">
        <div className="wrap proj-stats2">
          <div className="proj-stats2__intro reveal">
            <span className="proj-sec" id="proj-stats-t">En bref</span>
            <h2 className="proj-h2">{p.tagline}</h2>
            <p>{p.short}</p>
            <a className="btnb btnb--outline-ink" href={p.siteUrl} target="_blank" rel="noopener noreferrer">
              Visiter le site <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="proj-stats2__grid reveal" ref={statsGridRef}>
            {p.stats.map((s, i) => {
              const { target, suffix } = prstParseStat(s);
              return (
                <div key={i} className={"proj-stat2 proj-stat2--" + ['teal', 'gold', 'olive', 'deep'][i % 4]}>
                  <span className="proj-stat2__n" data-count-target={target} data-count-suffix={suffix}>
                    {'0' + suffix}
                  </span>
                  <span className="proj-stat2__l">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LE PROJET — mission + accordéon 3 axes de transformation, vidéo (reel) à droite */}
      <section className="proj-projet" aria-labelledby="proj-projet-t">
        <div className="wrap proj-projet__split">
          <div className="proj-projet__body">
            <span className="proj-sec" id="proj-projet-t">Le projet</span>
            <h2 className="proj-h2 reveal">Ce que le programme veut obtenir</h2>
            <p className="proj-projet__mission reveal">{p.mission}</p>
            <div className="proj-acc reveal">
              {(p.transformation || []).map((it, i) => {
                const isOpen = projStep === i;
                return (
                  <div className={"proj-acc__item" + (isOpen ? " is-open" : "")} key={i}>
                    <h3 className="proj-acc__h">
                      <button
                        type="button" className="proj-acc__btn"
                        id={"prstacc-h-" + i} aria-expanded={isOpen} aria-controls={"prstacc-p-" + i}
                        onClick={() => setProjStep(isOpen ? -1 : i)}
                      >
                        <span className="proj-acc__label">{it.title}</span>
                        <span className="proj-acc__chev" aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      className="proj-acc__panel" id={"prstacc-p-" + i}
                      role="region" aria-labelledby={"prstacc-h-" + i}
                    >
                      <div className="proj-acc__body">
                        {it.subtitle && <span className="proj-acc__sub">{it.subtitle}</span>}
                        <p>{it.text}</p>
                        <ul className="proj-acc__ind">
                          {(it.indicateurs || []).map((ind, k) => <li key={k}>{ind}</li>)}
                        </ul>
                        <span className="proj-acc__indnote">Indicateurs suivis par le programme</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="proj-projet__media reveal">
            <div className="proj-projet__frame">
              {videoOn ? (
                <iframe
                  title={"Vidéo — " + p.shortTitle}
                  src={p.mediaUrl.replace(/\/?$/, '/embed')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="proj-projet__play"
                  onClick={() => setVideoOn(true)}
                  aria-label={"Voir la vidéo de présentation du " + p.shortTitle}
                >
                  <img src={PIMG(p.heroImages[1])} alt="" aria-hidden="true" />
                  <span className="proj-projet__scrim" aria-hidden="true"></span>
                  <span className="proj-projet__playlabel">Voir le reel <span aria-hidden="true">→</span></span>
                </button>
              )}
            </div>
            <p className="proj-projet__credit">Vidéo — programme Restaure sur Instagram</p>
          </div>
        </div>
      </section>

      {/* GROUPES DE TRAVAIL, GOUVERNANCE, TOAST — source : rapport d'activité 2025 */}
      {p.groupes && (
        <window.ProjetExtra tone="dark" eyebrow="Comment le programme travaille" title="Qui fait" accent="quoi"
          lede={"Le pilotage réunit " + p.gouvernance.join(", ").replace(/, ([^,]*)$/, " et $1") + ". Chaque groupe de travail a une structure pilote."}>
          <ol className="prgw" ref={groupesRef}>
            <span className="prgw__rail" aria-hidden="true"><span className="prgw__fill" /></span>
            {p.groupes.map((g, i) => (
              <li className="prgw__row" key={i}>
                <span className="prgw__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="prgw__t">{g.title}</h3>
                <p className="prgw__p"><span>Pilote</span>{g.pilote}</p>
              </li>
            ))}
          </ol>
          <ul className="prgw__gov" aria-label="Structures au pilotage">
            {p.gouvernance.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <p className="prgw__toast">{p.toast}</p>
        </window.ProjetExtra>
      )}

      {/* VERBATIMS — ce que le programme traite, dit par celles et ceux qui l'ont vécu */}
      {(D.verbatimsViolences || []).length > 0 && (
        <section className="proj-verbatims" aria-labelledby="proj-verbatims-t">
          <div className="wrap">
            <span className="proj-sec" id="proj-verbatims-t">Témoignages anonymes</span>
            <h2 className="proj-h2 reveal">Les mots<br />du terrain</h2>
            <p className="proj-verbatims__lede reveal">
              Ces paroles ont été recueillies auprès de professionnels de la restauration.
              Elles sont rendues anonymes, et certains mots ont été adoucis. Elles disent ce que la
              formation « Prévention des violences sexistes et sexuelles » cherche à faire reculer.
            </p>
            <div className="proj-verbatims__grid reveal">
              {D.verbatimsViolences.map((v, i) => (
                <blockquote className="proj-verbatims__q" key={i}>{v}</blockquote>
              ))}
            </div>
            <p className="proj-verbatims__note">
              Si vous vivez ou observez ces situations, la formation et le violentomètre du
              programme Restaure sont des points de départ. <a href="#/formations/vss" style={{color:'var(--gold-light)',fontWeight:700}}>Voir la formation</a>.
            </p>
          </div>
        </section>
      )}

      {/* TÉMOIGNAGE — citation unique */}
      {t && (
        <section className="proj-testi" aria-labelledby="proj-testi-t">
          <div className="wrap">
            <span className="proj-sec" id="proj-testi-t">Témoignage</span>
            <h2 className="proj-h2 reveal">Pourquoi un chef s’y engage</h2>
          </div>
          <div className="reveal">
            <window.TestiCarousel items={[{ name: t.prenom, meta: t.role, quote: t.citation }]} />
          </div>
        </section>
      )}

      {/* REJOINDRE — texte + 2 CTA à gauche, logos placeholder à droite */}
      <section className="proj-support" aria-labelledby="proj-support-t">
        <div className="wrap proj-support__inner reveal">
          <div className="proj-support__body">
            <span className="proj-sec" id="proj-support-t">Rejoindre</span>
            <h2 className="proj-h2">{p.implicationTitle}</h2>
            <p>{p.implicationText}</p>
            <div className="proj-support__cta">
              <a className="btnb btnb--gold proj-support__cta-main" href={p.implicationCtaHref}>
                {p.implicationCtaLabel}
              </a>
              <a className="btnb btnb--ghost proj-support__cta-sub" href={p.projetCtaHref} target="_blank" rel="noopener noreferrer">
                {p.projetCtaLabel}
              </a>
            </div>
          </div>
          <div className="proj-support__logos" role="group" aria-label="Structures fondatrices">
            <div className="proj-logogrid">
              <span className="proj-logocard"><img src="images/partners/yes-we-camp.png" alt="Yes We Camp" loading="lazy" /></span>
              <span className="proj-logocard proj-logocard--hub">
                <img src="images/logo-festin.png" alt="Festin" loading="lazy" />
              </span>
              <span className="proj-logocard proj-logocard--ph"><span>Les Petites<br />Cantines</span></span>
            </div>
            <div className="proj-logogrid">
              <span className="proj-logocard proj-logocard--ph"><span>La Communauté<br />Ecotable</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* PRESSE */}
      {presse.length > 0 && (
        <section className="proj-presse" aria-labelledby="proj-presse-t">
          <div className="wrap">
            <span className="proj-sec" id="proj-presse-t">La presse</span>
            <h2 className="proj-h2 reveal">Dans la presse</h2>
            <div className="proj-news">
              {featured3.map((a, i) => (
                <a key={i} className="proj-news__card reveal" href={a.href} target="_blank" rel="noopener noreferrer">
                  <span className="proj-news__top">
                    {a.logo
                      ? <img className="proj-news__logo" src={PIMG(a.logo)} alt={a.source} loading="lazy" />
                      : <span className="proj-news__src">{a.source}</span>}
                    {a.type && <span className="proj-news__tag">{a.type}</span>}
                  </span>
                  <span className="proj-news__title">{a.title}</span>
                  <span className="proj-news__date">{prstMonth(a.date)}</span>
                </a>
              ))}
            </div>
            {presseAlso.length > 0 && (
              <p className="proj-news__also reveal">
                <b>Également paru dans</b>&nbsp;— {presseAlso
                  .map(a => a.source)
                  .filter((v, k, arr) => arr.findIndex(x => x.toLowerCase() === v.toLowerCase()) === k)
                  .join(' · ')}.
              </p>
            )}
          </div>
        </section>
      )}

      {/* GALERIE */}
      <section className="proj-gallery" aria-label="Galerie photo Restaure">
        <div className="proj-gallery__track">
          {[...galleryImages, ...galleryImages].map((src, i) => (
            <div className="proj-gallery__item" key={i} aria-hidden={i >= galleryImages.length}>
              <window.Picture src={src} alt="" sizes="(max-width: 700px) 60vw, 320px" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

window.ProjetRestaurePage = ProjetRestaurePage;
