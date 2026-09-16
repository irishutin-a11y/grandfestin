// ProjetLBM.jsx — page projet dédiée « Les Beaux Mets »
// Gabarit repris de ProjetDef.jsx pour valider une structure de page projet
// réutilisable : fil d'ariane fixe · hero + logo à cheval · chiffres avec
// compteur · le projet (accordéon) · vidéo · témoignages · soutenir · presse ·
// galerie. Écarts assumés (données non équivalentes à ce stade) :
// - accordéon "Le projet" sourcé du dossier de présentation LBM (janv. 2026)
// - CTA unique "Réserver une table" sous la vidéo (pas d'équivalent formations)
// - témoignages en duo statique (2 avis dispo, pas de bandeau défilant)
// - logos partenaires en placeholder (en attente des visuels réels)
const { useEffect, useRef, useState } = React;
const PIMG = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function plbmMonth(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

function plbmParseStat(s) {
  const isPercent = /%/.test(s.value);
  const target = parseInt(String(s.value).replace(/[^\d]/g, ''), 10) || 0;
  const suffix = isPercent ? ' %' : (s.unit || '');
  return { target, suffix };
}
function plbmFormatNumber(n) {
  return n.toLocaleString('fr-FR');
}

function ProjetLBMPage() {
  const D = window.FESTIN_DATA;
  const p = D.projets.find(x => x.id === 'les-beaux-mets');
  const rootRef = useRef(null);
  const statsGridRef = useRef(null);
  const [videoOn, setVideoOn] = useState(false);
  const [projStep, setProjStep] = useState(0);

  useEffect(() => {
    document.body.classList.add('plbm-has-crumb');
    return () => document.body.classList.remove('plbm-has-crumb');
  }, []);

  useEffect(() => {
    const grid = statsGridRef.current;
    if (!grid) return;
    const nodes = [...grid.querySelectorAll('[data-count-target]')];
    if (!nodes.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce) {
      nodes.forEach(el => {
        el.textContent = plbmFormatNumber(Number(el.dataset.countTarget)) + (el.dataset.countSuffix || '');
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
            el.textContent = plbmFormatNumber(Math.round(target * eased)) + suffix;
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

  const presse = (D.presse || [])
    .filter(a => (p.presseFilter || []).some(f => a.dispositif && a.dispositif.indexOf(f) === 0))
    .slice()
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  const featured3 = presse.slice(0, 3);
  const presseAlso = presse.slice(3);

  const galleryImages = [
    'images/beauxmets-images/lbm-gallery-convives.jpg',
    'images/beauxmets-images/lbm-gallery-salle.jpg',
    'images/beauxmets-images/lbm-gallery-service.jpg',
    'images/beauxmets-images/lbm-gallery-masterclass.jpg',
    'images/beauxmets-images/lbm-gallery-plat.jpg',
    'images/beauxmets-images/lbm-gallery-cocktail.jpg',
    'images/beauxmets-images/lbm-gallery-accueil-ap.jpg',
  ];

  return (
    <div className="pageProjetLBM" ref={rootRef} data-screen-label={"Projet — " + p.shortTitle}>

      {/* FIL D'ARIANE — fixe, au-dessus de la nav */}
      <nav className="plbm-crumb2" aria-label="Fil d’ariane">
        <div className="wrap plbm-crumb2__inner">
          <a href="#/">Accueil</a>
          <span className="plbm-crumb2__rest">
            <span aria-hidden="true"> / </span>
            <a href="#/projets/les-beaux-mets">Nos projets</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Les Beaux Mets</span>
          </span>
          <span className="plbm-crumb2__ellipsis" aria-hidden="true"> / …</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="plbm-heroband">
        <header className="plbm-hero">
          <div className="plbm-hero__media">
            <img src={PIMG(p.heroImages[0])} alt="Salle du restaurant Les Beaux Mets" />
          </div>
          <div className="plbm-hero__scrim" aria-hidden="true"></div>
          <div className="wrap plbm-hero__inner">
            <span className="plbm-hero__eb">{p.eyebrow} · Marseille · un projet de l’association Festin</span>
            <h1 className="plbm-hero__t">{p.title} <em>{p.accent}</em></h1>
            <p className="plbm-hero__sub">{p.projetPhrase}</p>
            <div className="plbm-hero__cta">
              <a className="btnb btnb--ghost" href={p.siteUrl} target="_blank" rel="noopener noreferrer">{p.siteName}</a>
            </div>
          </div>
        </header>

        <div className="plbm-hero__logo">
          <img src={PIMG(p.logo)} alt={"Logo " + p.shortTitle} />
        </div>
      </div>

      {/* CHIFFRES */}
      <section className="plbm-stats" aria-labelledby="plbm-stats-t">
        <div className="wrap plbm-stats2">
          <div className="plbm-stats2__intro reveal">
            <span className="plbm-sec" id="plbm-stats-t">Les chiffres</span>
            <h2 className="plbm-h2">{p.tagline}</h2>
            <p>{p.short}</p>
            <a className="btnb btnb--outline-ink" href={p.siteUrl} target="_blank" rel="noopener noreferrer">
              Visiter le site <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="plbm-stats2__grid reveal" ref={statsGridRef}>
            {p.stats.map((s, i) => {
              const { target, suffix } = plbmParseStat(s);
              return (
                <div key={i} className={"plbm-stat2 plbm-stat2--" + ['teal', 'gold', 'terracotta', 'deep'][i % 4]}>
                  <span className="plbm-stat2__n" data-count-target={target} data-count-suffix={suffix}>
                    {'0' + suffix}
                  </span>
                  <span className="plbm-stat2__l">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LE PROJET — texte + accordéon à gauche, vidéo à droite */}
      <section className="plbm-projet" aria-labelledby="plbm-projet-t">
        <div className="wrap plbm-projet__split">
          <div className="plbm-projet__body">
            <span className="plbm-sec" id="plbm-projet-t">Le projet</span>
            <h2 className="plbm-h2 reveal">Un restaurant d’insertion<br />en milieu carcéral</h2>
            <p className="plbm-projet__lede reveal">{p.description}</p>
            <div className="plbm-acc reveal">
              {(p.parcours || []).map((s, i) => {
                const isOpen = projStep === i;
                return (
                  <div className={"plbm-acc__item" + (isOpen ? " is-open" : "")} key={i}>
                    <h3 className="plbm-acc__h">
                      <button
                        type="button" className="plbm-acc__btn"
                        id={"placc-h-" + i} aria-expanded={isOpen} aria-controls={"placc-p-" + i}
                        onClick={() => setProjStep(isOpen ? -1 : i)}
                      >
                        <span className="plbm-acc__label">{s.tab}</span>
                        <span className="plbm-acc__chev" aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      className="plbm-acc__panel" id={"placc-p-" + i}
                      role="region" aria-labelledby={"placc-h-" + i}
                    >
                      <div className="plbm-acc__body">
                        <span className="plbm-acc__k">{s.title}</span>
                        <p>{s.text}</p>
                        <div className="plbm-acc__stat"><strong>{s.stat}</strong><span>{s.statL}</span></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="plbm-projet__media reveal">
            <div className="plbm-projet__frame">
              {videoOn ? (
                <iframe
                  title={"Vidéo de présentation — " + p.shortTitle}
                  src={"https://www.youtube.com/embed/" + p.mediaId + "?autoplay=1"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="plbm-projet__play"
                  onClick={() => setVideoOn(true)}
                  aria-label={"Lire la vidéo de présentation du " + p.shortTitle}
                >
                  <img src={PIMG(p.video.poster)} alt="" aria-hidden="true" />
                  <span className="plbm-projet__scrim" aria-hidden="true"></span>
                  <span className="plbm-projet__playlabel">Lire la vidéo <span aria-hidden="true">→</span></span>
                </button>
              )}
            </div>
            <a className="plbm-projet__cta" href={p.projetCtaHref} target="_blank" rel="noopener noreferrer">
              <span className="plbm-projet__cta-txt">
                <span className="plbm-projet__cta-name">{p.projetCtaLabel}</span>
                <span className="plbm-projet__cta-meta">{p.siteName}</span>
              </span>
              <span className="plbm-projet__cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES — duo statique */}
      <section className="plbm-testi" aria-labelledby="plbm-testi-t">
        <div className="wrap">
          <span className="plbm-sec" id="plbm-testi-t">Ils l’ont vécu</span>
          <h2 className="plbm-h2 reveal">Des parcours, des voix</h2>
          <div className="plbm-tgrid reveal">
            {(p.temoignages || []).map((t, i) => (
              <article className={"plbm-tcard plbm-tcard--" + (i % 2 === 0 ? 'teal' : 'terracotta')} key={i}>
                <div className="plbm-tcard__head">
                  <span className="plbm-tcard__photo--ph" aria-hidden="true" />
                  <div>
                    <h3 className="plbm-tcard__name">{t.prenom}</h3>
                    <span className="plbm-tcard__role">{t.role}</span>
                  </div>
                </div>
                <p className="plbm-tcard__quote">« {t.citation} »</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOUTENIR — texte + CTA à gauche, logos placeholder à droite */}
      <section className="plbm-support" aria-labelledby="plbm-support-t">
        <div className="wrap plbm-support__inner reveal">
          <div className="plbm-support__body">
            <span className="plbm-sec" id="plbm-support-t">Soutenir</span>
            <h2 className="plbm-h2">{p.implicationTitle}</h2>
            <p>{p.implicationText}</p>
            <div className="plbm-support__cta">
              <a className="btnb btnb--gold plbm-support__cta-main" href={p.implicationCtaHref}>
                {p.implicationCtaLabel}
              </a>
              <a className="btnb btnb--ghost plbm-support__cta-sub" href={p.projetCtaHref} target="_blank" rel="noopener noreferrer">
                {p.projetCtaLabel}
              </a>
            </div>
          </div>
          <div className="plbm-support__logos" role="group" aria-label="Partenaires (à venir)">
            <div className="plbm-logogrid">
              <span className="plbm-logocard plbm-logocard--ph"><span>Logo<br />partenaire</span></span>
              <span className="plbm-logocard plbm-logocard--ph"><span>Logo<br />partenaire</span></span>
            </div>
            <div className="plbm-logogrid">
              <span className="plbm-logocard plbm-logocard--ph"><span>Logo<br />partenaire</span></span>
              <span className="plbm-logocard plbm-logocard--hub">
                <img src={PIMG(p.logo)} alt={p.shortTitle} loading="lazy" />
              </span>
              <span className="plbm-logocard plbm-logocard--ph"><span>Logo<br />partenaire</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* PRESSE */}
      {presse.length > 0 && (
        <section className="plbm-presse" aria-labelledby="plbm-presse-t">
          <div className="wrap">
            <span className="plbm-sec" id="plbm-presse-t">La presse</span>
            <h2 className="plbm-h2 reveal">Dans la presse</h2>
            <div className="plbm-news">
              {featured3.map((a, i) => (
                <a key={i} className="plbm-news__card reveal" href={a.href} target="_blank" rel="noopener noreferrer">
                  <span className="plbm-news__top">
                    {a.logo
                      ? <img className="plbm-news__logo" src={PIMG(a.logo)} alt={a.source} loading="lazy" />
                      : <span className="plbm-news__src">{a.source}</span>}
                    {a.type && <span className="plbm-news__tag">{a.type}</span>}
                  </span>
                  <span className="plbm-news__title">{a.title}</span>
                  <span className="plbm-news__date">{plbmMonth(a.date)}</span>
                </a>
              ))}
            </div>
            {presseAlso.length > 0 && (
              <p className="plbm-news__also reveal">
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
      <section className="plbm-gallery" aria-label="Galerie photo Les Beaux Mets">
        <div className="plbm-gallery__track">
          {[...galleryImages, ...galleryImages].map((src, i) => (
            <div className="plbm-gallery__item" key={i} aria-hidden={i >= galleryImages.length}>
              <img src={PIMG(src)} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

window.ProjetLBMPage = ProjetLBMPage;
