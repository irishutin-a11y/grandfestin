// ProjetTableDeCana.jsx — page projet dédiée « La Table de Cana »
// Gabarit repris de ProjetLBM.jsx (lui-même repris de ProjetDef.jsx) : fil
// d'ariane fixe · hero + logo à cheval · chiffres avec compteur · le projet
// (accordéon) · vidéo · témoignages · soutenir · presse · galerie.
// Écarts assumés (données non équivalentes à ce stade) :
// - accordéon "Le projet" sourcé de latabledecana-marseille.com/insertion-professionnelle
// - logos partenaires réels non disponibles → cartes nommées (Compass, Sodexo,
//   Accor, Newrest, Le Grand Pin, École de la 2e Chance), en attente des visuels
// - galerie : seulement 5 photos réelles disponibles sur le disque à ce stade,
//   reprises telles quelles (pas de doublon inventé)
const { useEffect, useRef, useState } = React;
const PIMG = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function ptdcMonth(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

function ptdcParseStat(s) {
  const isPercent = /%/.test(s.value);
  const target = parseInt(String(s.value).replace(/[^\d]/g, ''), 10) || 0;
  const suffix = isPercent ? ' %' : (s.unit || '');
  return { target, suffix };
}
function ptdcFormatNumber(n) {
  return n.toLocaleString('fr-FR');
}

function ProjetTableDeCanaPage() {
  const D = window.FESTIN_DATA;
  const p = D.projets.find(x => x.id === 'la-table-de-cana');
  const rootRef = useRef(null);
  const statsGridRef = useRef(null);
  const [videoOn, setVideoOn] = useState(false);
  const [projStep, setProjStep] = useState(0);

  useEffect(() => {
    document.body.classList.add('ptdc-has-crumb');
    return () => document.body.classList.remove('ptdc-has-crumb');
  }, []);

  useEffect(() => {
    const grid = statsGridRef.current;
    if (!grid) return;
    const nodes = [...grid.querySelectorAll('[data-count-target]')];
    if (!nodes.length) return;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce) {
      nodes.forEach(el => {
        el.textContent = ptdcFormatNumber(Number(el.dataset.countTarget)) + (el.dataset.countSuffix || '');
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
            el.textContent = ptdcFormatNumber(Math.round(target * eased)) + suffix;
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

  const galleryImages = p.heroImages.concat(p.video && p.video.poster ? [p.video.poster] : []);

  return (
    <div className="pageProjetTDC" ref={rootRef} data-screen-label={"Projet — " + p.shortTitle}>

      {/* FIL D'ARIANE — fixe, au-dessus de la nav */}
      <nav className="ptdc-crumb2" aria-label="Fil d’ariane">
        <div className="wrap ptdc-crumb2__inner">
          <a href="#/">Accueil</a>
          <span className="ptdc-crumb2__rest">
            <span aria-hidden="true"> / </span>
            <a href="#/projets/la-table-de-cana">Nos projets</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">La Table de Cana</span>
          </span>
          <span className="ptdc-crumb2__ellipsis" aria-hidden="true"> / …</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="ptdc-heroband">
        <header className="ptdc-hero">
          <div className="ptdc-hero__media">
            <img src={PIMG(p.heroImages[0])} alt="Cuisine de La Table de Cana à Marseille" />
          </div>
          <div className="ptdc-hero__scrim" aria-hidden="true"></div>
          <div className="wrap ptdc-hero__inner">
            <span className="ptdc-hero__eb">{p.eyebrow} · Marseille · un projet de l’association Festin</span>
            <h1 className="ptdc-hero__t">{p.title} <em>{p.accent}</em></h1>
            <p className="ptdc-hero__sub">{p.projetPhrase}</p>
            <div className="ptdc-hero__cta">
              <a className="btnb btnb--ghost" href={p.siteUrl} target="_blank" rel="noopener noreferrer">{p.siteName}</a>
            </div>
          </div>
        </header>

        <div className="ptdc-hero__logo">
          <img src={PIMG(p.logo)} alt={"Logo " + p.shortTitle} />
        </div>
      </div>

      {/* CHIFFRES */}
      <section className="ptdc-stats" aria-labelledby="ptdc-stats-t">
        <div className="wrap ptdc-stats2">
          <div className="ptdc-stats2__intro reveal">
            <span className="ptdc-sec" id="ptdc-stats-t">Les chiffres</span>
            <h2 className="ptdc-h2">{p.tagline}</h2>
            <p>{p.short}</p>
            <a className="btnb btnb--outline-ink" href={p.siteUrl} target="_blank" rel="noopener noreferrer">
              Visiter le site <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="ptdc-stats2__grid reveal" ref={statsGridRef}>
            {p.stats.map((s, i) => {
              const { target, suffix } = ptdcParseStat(s);
              return (
                <div key={i} className={"ptdc-stat2 ptdc-stat2--" + ['teal', 'gold', 'wine', 'deep'][i % 4]}>
                  <span className="ptdc-stat2__n" data-count-target={target} data-count-suffix={suffix}>
                    {'0' + suffix}
                  </span>
                  <span className="ptdc-stat2__l">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LE PROJET — texte + accordéon à gauche, vidéo à droite */}
      <section className="ptdc-projet" aria-labelledby="ptdc-projet-t">
        <div className="wrap ptdc-projet__split">
          <div className="ptdc-projet__body">
            <span className="ptdc-sec" id="ptdc-projet-t">Le projet</span>
            <h2 className="ptdc-h2 reveal">Le premier projet de<br />Festin, depuis 1993</h2>
            <p className="ptdc-projet__lede reveal">{p.description}</p>
            <div className="ptdc-acc reveal">
              {(p.parcours || []).map((s, i) => {
                const isOpen = projStep === i;
                return (
                  <div className={"ptdc-acc__item" + (isOpen ? " is-open" : "")} key={i}>
                    <h3 className="ptdc-acc__h">
                      <button
                        type="button" className="ptdc-acc__btn"
                        id={"ptdcacc-h-" + i} aria-expanded={isOpen} aria-controls={"ptdcacc-p-" + i}
                        onClick={() => setProjStep(isOpen ? -1 : i)}
                      >
                        <span className="ptdc-acc__label">{s.tab}</span>
                        <span className="ptdc-acc__chev" aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      className="ptdc-acc__panel" id={"ptdcacc-p-" + i}
                      role="region" aria-labelledby={"ptdcacc-h-" + i}
                    >
                      <div className="ptdc-acc__body">
                        <span className="ptdc-acc__k">{s.title}</span>
                        <p>{s.text}</p>
                        {s.stat && (
                          <div className="ptdc-acc__stat"><strong>{s.stat}</strong><span>{s.statL}</span></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="ptdc-projet__media reveal">
            <div className="ptdc-projet__frame">
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
                  className="ptdc-projet__play"
                  onClick={() => setVideoOn(true)}
                  aria-label={"Lire la vidéo de présentation du " + p.shortTitle}
                >
                  <img src={PIMG(p.video.poster)} alt="" aria-hidden="true" />
                  <span className="ptdc-projet__scrim" aria-hidden="true"></span>
                  <span className="ptdc-projet__playlabel">Lire la vidéo <span aria-hidden="true">→</span></span>
                </button>
              )}
            </div>
            <a className="ptdc-projet__cta" href={p.projetCtaHref} target="_blank" rel="noopener noreferrer">
              <span className="ptdc-projet__cta-txt">
                <span className="ptdc-projet__cta-name">{p.projetCtaLabel}</span>
                <span className="ptdc-projet__cta-meta">{p.siteName}</span>
              </span>
              <span className="ptdc-projet__cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      {p.temoignages && p.temoignages.filter(t => !t.placeholder).length > 0 && (
        <section className="ptdc-testi" aria-labelledby="ptdc-testi-t">
          <div className="wrap">
            <span className="ptdc-sec" id="ptdc-testi-t">Ils l’ont vécu</span>
            <h2 className="ptdc-h2 reveal">Des parcours, des voix</h2>
            <div className="ptdc-tgrid reveal">
              {p.temoignages.filter(t => !t.placeholder).map((t, i) => (
                <article className={"ptdc-tcard ptdc-tcard--" + (i % 2 === 0 ? 'teal' : 'wine')} key={i}>
                  <div className="ptdc-tcard__head">
                    <span className="ptdc-tcard__photo--ph" aria-hidden="true" />
                    <div>
                      <h3 className="ptdc-tcard__name">{t.prenom}</h3>
                      <span className="ptdc-tcard__role">{t.role}</span>
                    </div>
                  </div>
                  <p className="ptdc-tcard__quote">« {t.citation} »</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SOUTENIR — texte + CTA à gauche, logos à droite */}
      <section className="ptdc-support" aria-labelledby="ptdc-support-t">
        <div className="wrap ptdc-support__inner reveal">
          <div className="ptdc-support__body">
            <span className="ptdc-sec" id="ptdc-support-t">Nos partenaires</span>
            <h2 className="ptdc-h2">{p.implicationTitle}</h2>
            <p>{p.implicationText}</p>
            <div className="ptdc-support__cta">
              <a className="btnb btnb--gold ptdc-support__cta-main" href={p.implicationCtaHref}>
                {p.implicationCtaLabel}
              </a>
              <a className="btnb btnb--ghost ptdc-support__cta-sub" href={p.projetCtaHref} target="_blank" rel="noopener noreferrer">
                {p.projetCtaLabel}
              </a>
            </div>
          </div>
          <div className="ptdc-support__logos" role="group" aria-label="Entreprises partenaires (logos à venir)">
            <div className="ptdc-logogrid">
              {(p.partenaires || []).map((nom, i) => (
                <span className="ptdc-logocard ptdc-logocard--ph" key={i}><span>{nom}</span></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRESSE */}
      {presse.length > 0 && (
        <section className="ptdc-presse" aria-labelledby="ptdc-presse-t">
          <div className="wrap">
            <span className="ptdc-sec" id="ptdc-presse-t">La presse</span>
            <h2 className="ptdc-h2 reveal">Dans la presse</h2>
            <div className="ptdc-news">
              {featured3.map((a, i) => (
                <a key={i} className="ptdc-news__card reveal" href={a.href} target="_blank" rel="noopener noreferrer">
                  <span className="ptdc-news__top">
                    {a.logo
                      ? <img className="ptdc-news__logo" src={PIMG(a.logo)} alt={a.source} loading="lazy" />
                      : <span className="ptdc-news__src">{a.source}</span>}
                    {a.type && <span className="ptdc-news__tag">{a.type}</span>}
                  </span>
                  <span className="ptdc-news__title">{a.title}</span>
                  <span className="ptdc-news__date">{ptdcMonth(a.date)}</span>
                </a>
              ))}
            </div>
            {presseAlso.length > 0 && (
              <p className="ptdc-news__also reveal">
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
      <section className="ptdc-gallery" aria-label="Galerie photo La Table de Cana">
        <div className="ptdc-gallery__track">
          {[...galleryImages, ...galleryImages].map((src, i) => (
            <div className="ptdc-gallery__item" key={i} aria-hidden={i >= galleryImages.length}>
              <img src={PIMG(src)} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

window.ProjetTableDeCanaPage = ProjetTableDeCanaPage;
