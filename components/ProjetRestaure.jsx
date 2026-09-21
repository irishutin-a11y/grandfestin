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
  const [videoOn, setVideoOn] = useState(false);
  const [projStep, setProjStep] = useState(0);

  useEffect(() => {
    document.body.classList.add('prst-has-crumb');
    return () => document.body.classList.remove('prst-has-crumb');
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
    <div className="pageProjetRestaure" ref={rootRef} data-screen-label={"Projet — " + p.shortTitle}>

      {/* FIL D'ARIANE */}
      <nav className="prst-crumb2" aria-label="Fil d’ariane">
        <div className="wrap prst-crumb2__inner">
          <a href="#/">Accueil</a>
          <span className="prst-crumb2__rest">
            <span aria-hidden="true"> / </span>
            <a href="#/projets/restaure">Nos projets</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{p.shortTitle}</span>
          </span>
          <span className="prst-crumb2__ellipsis" aria-hidden="true"> / …</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="prst-heroband">
        <header className="prst-hero">
          <div className="prst-hero__media">
            <img src={PIMG(p.heroImages[0])} alt="Lancement du programme Restaure à Marseille" />
          </div>
          <div className="prst-hero__scrim" aria-hidden="true"></div>
          <div className="wrap prst-hero__inner">
            <span className="prst-hero__eb">{p.eyebrow} · programme porté par l’association Festin</span>
            <h1 className="prst-hero__t">{p.title} <em>{p.accent}</em></h1>
            <p className="prst-hero__sub">{p.projetPhrase}</p>
            <div className="prst-hero__cta">
              <a className="btnb btnb--ghost" href={p.siteUrl} target="_blank" rel="noopener noreferrer">{p.siteName}</a>
            </div>
          </div>
        </header>

        <div className="prst-hero__logo">
          <img src={PIMG(p.logo)} alt={"Logo " + p.shortTitle} />
        </div>
      </div>

      {/* CHIFFRES */}
      <section className="prst-stats" aria-labelledby="prst-stats-t">
        <div className="wrap prst-stats2">
          <div className="prst-stats2__intro reveal">
            <span className="prst-sec" id="prst-stats-t">Les chiffres</span>
            <h2 className="prst-h2">{p.tagline}</h2>
            <p>{p.short}</p>
            <a className="btnb btnb--outline-ink" href={p.siteUrl} target="_blank" rel="noopener noreferrer">
              Visiter le site <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <div className="prst-stats2__grid reveal" ref={statsGridRef}>
            {p.stats.map((s, i) => {
              const { target, suffix } = prstParseStat(s);
              return (
                <div key={i} className={"prst-stat2 prst-stat2--" + ['teal', 'gold', 'olive', 'deep'][i % 4]}>
                  <span className="prst-stat2__n" data-count-target={target} data-count-suffix={suffix}>
                    {'0' + suffix}
                  </span>
                  <span className="prst-stat2__l">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LE PROJET — mission + accordéon 3 axes de transformation, vidéo (reel) à droite */}
      <section className="prst-projet" aria-labelledby="prst-projet-t">
        <div className="wrap prst-projet__split">
          <div className="prst-projet__body">
            <span className="prst-sec" id="prst-projet-t">Le projet</span>
            <h2 className="prst-h2 reveal">Ce que le programme veut transformer</h2>
            <p className="prst-projet__mission reveal">{p.mission}</p>
            <div className="prst-acc reveal">
              {(p.transformation || []).map((it, i) => {
                const isOpen = projStep === i;
                return (
                  <div className={"prst-acc__item" + (isOpen ? " is-open" : "")} key={i}>
                    <h3 className="prst-acc__h">
                      <button
                        type="button" className="prst-acc__btn"
                        id={"prstacc-h-" + i} aria-expanded={isOpen} aria-controls={"prstacc-p-" + i}
                        onClick={() => setProjStep(isOpen ? -1 : i)}
                      >
                        <span className="prst-acc__label">{it.title}</span>
                        <span className="prst-acc__chev" aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      className="prst-acc__panel" id={"prstacc-p-" + i}
                      role="region" aria-labelledby={"prstacc-h-" + i}
                    >
                      <div className="prst-acc__body">
                        {it.subtitle && <span className="prst-acc__sub">{it.subtitle}</span>}
                        <p>{it.text}</p>
                        <ul className="prst-acc__ind">
                          {(it.indicateurs || []).map((ind, k) => <li key={k}>{ind}</li>)}
                        </ul>
                        <span className="prst-acc__indnote">Indicateurs suivis par le programme</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="prst-projet__media reveal">
            <div className="prst-projet__frame">
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
                  className="prst-projet__play"
                  onClick={() => setVideoOn(true)}
                  aria-label={"Voir la vidéo de présentation du " + p.shortTitle}
                >
                  <img src={PIMG(p.heroImages[1])} alt="" aria-hidden="true" />
                  <span className="prst-projet__scrim" aria-hidden="true"></span>
                  <span className="prst-projet__playlabel">Voir le reel <span aria-hidden="true">→</span></span>
                </button>
              )}
            </div>
            <p className="prst-projet__credit">Vidéo — programme Restaure sur Instagram</p>
          </div>
        </div>
      </section>

      {/* GROUPES DE TRAVAIL, GOUVERNANCE, TOAST — source : rapport d'activité 2025 */}
      {p.groupes && (
        <window.ProjetExtra tone="cream" eyebrow="Comment le programme travaille" title="Cinq groupes de travail," accent="quatre structures au pilotage"
          lede={"Le pilotage réunit " + p.gouvernance.join(", ").replace(/, ([^,]*)$/, " et $1") + ". Chaque groupe de travail a une structure pilote."}>
          <div className="pxs__grid">
            {p.groupes.map((g, i) => (
              <div className="pxs__card" key={i}>
                <h3>{g.title}</h3>
                <p>Avec {g.pilote}</p>
              </div>
            ))}
          </div>
          <p className="pxs__lede" style={{marginTop:32, marginBottom:0}}>{p.toast}</p>
        </window.ProjetExtra>
      )}

      {/* TÉMOIGNAGE — citation unique */}
      {t && (
        <section className="prst-testi" aria-labelledby="prst-testi-t">
          <div className="wrap">
            <span className="prst-sec" id="prst-testi-t">Ils s’engagent</span>
            <h2 className="prst-h2 reveal">Une voix du programme</h2>
            <blockquote className="prst-tquote reveal">
              <span className="prst-tquote__mark" aria-hidden="true">“</span>
              <p className="prst-tquote__text">{t.citation}</p>
              <cite className="prst-tquote__name"><b>{t.prenom}</b> — {t.role}</cite>
            </blockquote>
          </div>
        </section>
      )}

      {/* REJOINDRE — texte + 2 CTA à gauche, logos placeholder à droite */}
      <section className="prst-support" aria-labelledby="prst-support-t">
        <div className="wrap prst-support__inner reveal">
          <div className="prst-support__body">
            <span className="prst-sec" id="prst-support-t">Rejoindre</span>
            <h2 className="prst-h2">{p.implicationTitle}</h2>
            <p>{p.implicationText}</p>
            <div className="prst-support__cta">
              <a className="btnb btnb--gold prst-support__cta-main" href={p.implicationCtaHref}>
                {p.implicationCtaLabel}
              </a>
              <a className="btnb btnb--ghost prst-support__cta-sub" href={p.projetCtaHref} target="_blank" rel="noopener noreferrer">
                {p.projetCtaLabel}
              </a>
            </div>
          </div>
          <div className="prst-support__logos" role="group" aria-label="Structures fondatrices">
            <div className="prst-logogrid">
              <span className="prst-logocard prst-logocard--ph"><span>Yes We<br />Camp</span></span>
              <span className="prst-logocard prst-logocard--hub">
                <img src="images/logo-festin.png" alt="Festin" loading="lazy" />
              </span>
              <span className="prst-logocard prst-logocard--ph"><span>Les Petites<br />Cantines</span></span>
            </div>
            <div className="prst-logogrid">
              <span className="prst-logocard prst-logocard--ph"><span>La Communauté<br />Ecotable</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* PRESSE */}
      {presse.length > 0 && (
        <section className="prst-presse" aria-labelledby="prst-presse-t">
          <div className="wrap">
            <span className="prst-sec" id="prst-presse-t">La presse</span>
            <h2 className="prst-h2 reveal">Dans la presse</h2>
            <div className="prst-news">
              {featured3.map((a, i) => (
                <a key={i} className="prst-news__card reveal" href={a.href} target="_blank" rel="noopener noreferrer">
                  <span className="prst-news__top">
                    {a.logo
                      ? <img className="prst-news__logo" src={PIMG(a.logo)} alt={a.source} loading="lazy" />
                      : <span className="prst-news__src">{a.source}</span>}
                    {a.type && <span className="prst-news__tag">{a.type}</span>}
                  </span>
                  <span className="prst-news__title">{a.title}</span>
                  <span className="prst-news__date">{prstMonth(a.date)}</span>
                </a>
              ))}
            </div>
            {presseAlso.length > 0 && (
              <p className="prst-news__also reveal">
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
      <section className="prst-gallery" aria-label="Galerie photo Restaure">
        <div className="prst-gallery__track">
          {[...galleryImages, ...galleryImages].map((src, i) => (
            <div className="prst-gallery__item" key={i} aria-hidden={i >= galleryImages.length}>
              <img src={PIMG(src)} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

window.ProjetRestaurePage = ProjetRestaurePage;
