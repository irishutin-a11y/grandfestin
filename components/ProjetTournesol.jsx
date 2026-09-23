// ProjetTournesol.jsx — page projet dédiée « Tournesol »
// Gabarit repris de ProjetTableDeCana.jsx / ProjetLBM.jsx : fil d'ariane fixe ·
// hero + logo à cheval · chiffres avec compteur · le projet (accordéon) ·
// soutenir · presse · galerie. Écarts assumés (données non équivalentes) :
// - accordéon "Le projet" sourcé de refugee-food.org/formation-tournesol-a-marseille
// - pas de vidéo (mediaType: carousel) → diaporama photo à la place du bloc vidéo,
//   pas de bouton "lire la vidéo"
// - témoignages : les deux entrées existantes sont des placeholders explicites
//   (aucune citation réelle disponible à ce stade) → section masquée, voir
//   RAPPORT-AUDIT.md / demande faite à l'utilisateur
// - galerie : seulement 4 photos réelles disponibles → grille statique, pas de
//   bandeau défilant en boucle (pas assez de volume pour boucler proprement)
// - logos partenaires réels non disponibles → cartes nommées (texte), pas de logo image
const { useEffect, useRef, useState } = React;
const PIMG = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function ptsMonth(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

function ptsParseStat(s) {
  const isPercent = /%/.test(s.value);
  const target = parseInt(String(s.value).replace(/[^\d]/g, ''), 10) || 0;
  const suffix = isPercent ? ' %' : (s.unit || '');
  return { target, suffix };
}
function ptsFormatNumber(n) {
  return n.toLocaleString('fr-FR');
}

function ProjetTournesolPage() {
  const D = window.FESTIN_DATA;
  const p = D.projets.find(x => x.id === 'tournesol');
  const rootRef = useRef(null);
  const statsGridRef = useRef(null);
  const [projStep, setProjStep] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    document.body.classList.add('proj-has-crumb');
    return () => document.body.classList.remove('proj-has-crumb');
  }, []);

  useEffect(() => {
    const slides = (p && p.carouselImages) || [];
    if (slides.length < 2) return;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce) return;
    const t = setInterval(() => setSlideIdx(i => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [p]);

  useEffect(() => {
    const grid = statsGridRef.current;
    if (!grid) return;
    const nodes = [...grid.querySelectorAll('[data-count-target]')];
    if (!nodes.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce) {
      nodes.forEach(el => {
        el.textContent = ptsFormatNumber(Number(el.dataset.countTarget)) + (el.dataset.countSuffix || '');
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
            el.textContent = ptsFormatNumber(Math.round(target * eased)) + suffix;
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

  const realTemoignages = (p.temoignages || []).filter(t => !t.placeholder && t.citation);
  const galleryImages = p.heroImages || [];
  const slides = p.carouselImages && p.carouselImages.length ? p.carouselImages : galleryImages;

  return (
    <div className="pageProjet pageProjet--tournesol" ref={rootRef} data-screen-label={"Projet — " + p.shortTitle}>

      {/* FIL D'ARIANE — fixe, au-dessus de la nav */}
      <nav className="proj-crumb2" aria-label="Fil d’ariane">
        <div className="wrap proj-crumb2__inner">
          <a href="#/">Accueil</a>
          <span className="proj-crumb2__rest">
            <span aria-hidden="true"> / </span>
            <a href="#/projets/tournesol">Nos projets</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Tournesol</span>
          </span>
          <span className="proj-crumb2__ellipsis" aria-hidden="true"> / …</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="proj-heroband">
        <header className="proj-hero">
          <div className="proj-hero__media">
            <img src={PIMG(p.heroImages[0])} alt="Promotion Tournesol en formation" />
          </div>
          <div className="proj-hero__scrim" aria-hidden="true"></div>
          <div className="wrap proj-hero__inner">
            <span className="proj-hero__eb">{p.eyebrow} · Marseille · un projet de l’association Festin</span>
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
              En savoir plus <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="proj-stats2__grid reveal" ref={statsGridRef}>
            {p.stats.map((s, i) => {
              const { target, suffix } = ptsParseStat(s);
              const isNumeric = target > 0;
              return (
                <div key={i} className={"proj-stat2 proj-stat2--" + ['teal', 'gold', 'ocre', 'deep'][i % 4]}>
                  {isNumeric ? (
                    <span className="proj-stat2__n" data-count-target={target} data-count-suffix={suffix}>
                      {'0' + suffix}
                    </span>
                  ) : (
                    <span className="proj-stat2__n">{s.value}</span>
                  )}
                  <span className="proj-stat2__l">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BILAN DE LA PROMOTION — source : bilan de fin de promotion Tournesol */}
      {p.bilan && (
        <window.ProjetExtra tone="white" eyebrow={p.bilan.eyebrow} title={p.bilan.title} lede={p.prochaineSession}>
          <div className="pxs__grid">
            {p.bilan.items.map((it, i) => (
              <div className="pxs__card" key={i}>
                <div className="pxs__stat">{it.value}</div>
                <p>{it.label}</p>
              </div>
            ))}
          </div>
          <p className="pxs__note">{p.bilan.source}</p>
        </window.ProjetExtra>
      )}

      {/* LE PROJET — texte + accordéon à gauche, diaporama à droite */}
      <section className="proj-projet" aria-labelledby="proj-projet-t">
        <div className="wrap proj-projet__split">
          <div className="proj-projet__body">
            <span className="proj-sec" id="proj-projet-t">Le projet</span>
            <h2 className="proj-h2 reveal">Du français<br />jusqu’au diplôme</h2>
            <p className="proj-projet__lede reveal">{p.description}</p>
            <div className="proj-acc reveal">
              {(p.parcours || []).map((s, i) => {
                const isOpen = projStep === i;
                return (
                  <div className={"proj-acc__item" + (isOpen ? " is-open" : "")} key={i}>
                    <h3 className="proj-acc__h">
                      <button
                        type="button" className="proj-acc__btn"
                        id={"ptsacc-h-" + i} aria-expanded={isOpen} aria-controls={"ptsacc-p-" + i}
                        onClick={() => setProjStep(isOpen ? -1 : i)}
                      >
                        <span className="proj-acc__label">{s.tab}</span>
                        <span className="proj-acc__chev" aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      className="proj-acc__panel" id={"ptsacc-p-" + i}
                      role="region" aria-labelledby={"ptsacc-h-" + i}
                    >
                      <div className="proj-acc__body">
                        <span className="proj-acc__k">{s.title}</span>
                        <p>{s.text}</p>
                        {s.stat && (
                          <div className="proj-acc__stat"><strong>{s.stat}</strong><span>{s.statL}</span></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="proj-projet__media reveal">
            <div className="proj-projet__frame">
              {slides.map((src, i) => (
                <img
                  key={i} src={PIMG(src)} alt=""
                  className="proj-projet__slide"
                  style={{ opacity: i === slideIdx ? 1 : 0 }}
                />
              ))}
              {slides.length > 1 && (
                <div className="proj-projet__dots">
                  {slides.map((_, i) => (
                    <button key={i} type="button"
                      className={"proj-projet__dot" + (i === slideIdx ? " is-on" : "")}
                      aria-label={"Aller à l'image " + (i + 1)}
                      onClick={() => setSlideIdx(i)} />
                  ))}
                </div>
              )}
            </div>
            <a className="proj-projet__cta" href={p.projetCtaHref} target="_blank" rel="noopener noreferrer">
              <span className="proj-projet__cta-txt">
                <span className="proj-projet__cta-name">{p.projetCtaLabel}</span>
                <span className="proj-projet__cta-meta">{p.siteName}</span>
              </span>
              <span className="proj-projet__cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES — masqué tant qu'aucune citation réelle n'est disponible */}
      {realTemoignages.length > 0 && (
        <section className="proj-testi" aria-labelledby="proj-testi-t">
          <div className="wrap">
            <span className="proj-sec" id="proj-testi-t">Ils l’ont vécu</span>
            <h2 className="proj-h2 reveal">Paroles d’anciens stagiaires</h2>
            <div className="reveal">
              <window.TestiCarousel items={realTemoignages.map(t => ({ name: t.prenom, meta: t.role, quote: t.citation }))} />
            </div>
          </div>
        </section>
      )}

      {/* EN IMAGES — Refugee Food Festival 2026 (crédits : voir data.js) */}
      {p.galerie && (
        <window.ProjetExtra tone="cream" eyebrow="En images" title={p.galerie.title} lede={p.galerie.lede}>
          <div className="pxs__grid">
            {p.galerie.photos.map((ph, i) => (
              <figure key={i} style={{margin:0}}>
                <img src={ph.src} alt={ph.alt} loading="lazy" style={{width:'100%', aspectRatio:'4/5', objectFit:'cover', borderRadius:16, display:'block'}} />
                <figcaption style={{fontSize:13, color:'var(--ink-mid)', marginTop:8}}>{ph.caption}{ph.credit ? ' · Photo : ' + ph.credit : ''}</figcaption>
              </figure>
            ))}
          </div>
        </window.ProjetExtra>
      )}

      {/* PARTENAIRES */}
      <section className="proj-support" aria-labelledby="proj-support-t">
        <div className="wrap proj-support__inner reveal">
          <div className="proj-support__body">
            <span className="proj-sec" id="proj-support-t">Vous êtes prescripteur</span>
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
          <div className="proj-support__logos" role="group" aria-label="Partenaires (logos à venir)">
            <div className="proj-logogrid">
              {(p.partenaires || []).map((nom, i) => {
                const logo = (D.about.logosPartenaires || {})[nom];
                return logo
                  ? <span className="proj-logocard" key={i}><img src={PIMG(logo)} alt={nom} loading="lazy" /></span>
                  : <span className="proj-logocard proj-logocard--ph" key={i}><span>{nom}</span></span>;
              })}
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
                  <span className="proj-news__date">{ptsMonth(a.date)}</span>
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

      {/* GALERIE — grille statique (peu de photos disponibles à ce stade) */}
      {galleryImages.length > 0 && (
        <section className="proj-gallery" aria-label="Galerie photo Tournesol">
          <div className="wrap proj-gallery__grid">
            {galleryImages.map((src, i) => (
              <div className="proj-gallery__item" key={i}>
                <window.Picture src={src} alt="" sizes="(max-width: 700px) 60vw, 320px" />
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

window.ProjetTournesolPage = ProjetTournesolPage;
