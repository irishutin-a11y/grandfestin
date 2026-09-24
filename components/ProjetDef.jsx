// ProjetDef.jsx — page projet dédiée « Des Étoiles et des Femmes »
// Contenu : window.FESTIN_DATA.projets (id des-etoiles-et-des-femmes) + .presse + .donation
// Gabarit de page projet (24/09/2026), cas de référence. Ordre des blocs :
// 1 hero (fil d'ariane intégré, 2 portes d'entrée, logo à cheval) · 2 en bref (chiffres) ·
// 3 le parcours (frise horizontale épinglée ≥900px, liste verticale sinon) · 4 témoignages ·
// 5 vidéo · 6 le réseau (antennes) · 7 deux portes : candidater / accueillir ·
// 8 soutenir · 9 porté par Festin · 10 presse.
// Deux composants horizontaux interactifs : la frise et le carrousel de témoignages.
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

function ProjetDefPage() {
  const D = window.FESTIN_DATA;
  const p = D.projets.find(x => x.id === 'des-etoiles-et-des-femmes');
  const rootRef = useRef(null);
  const statsGridRef = useRef(null);
  const [videoOn, setVideoOn] = useState(false);

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

  // Révélations au scroll + frise du parcours épinglée (même grammaire que le
  // carrousel de l'écosystème sur l'accueil : pin, scrub 1, barre de progression).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.lucide) window.lucide.createIcons();
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const steps = [...root.querySelectorAll('.proj-step')];
    if (reduce || !window.gsap || !window.ScrollTrigger) {
      root.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
      steps.forEach(s => s.classList.add('is-on'));
      return;
    }
    const ST = window.ScrollTrigger;
    window.gsap.registerPlugin(ST);
    const triggers = [];
    root.querySelectorAll('.reveal').forEach(el => {
      triggers.push(ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('is-in') }));
    });

    const frise = root.querySelector('.proj-frise');
    const track = root.querySelector('.proj-frise__track');
    const vp = root.querySelector('.proj-frise__viewport');
    const bar = root.querySelector('.proj-frise__bar');
    if (frise && track && vp && window.innerWidth >= 900) {
      frise.classList.add('is-pinned');
      const dist = () => Math.max(0, track.scrollWidth - vp.clientWidth);
      const light = (progress) => steps.forEach((s, i) => {
        // une étape s'allume quand son point de la ligne est atteint
        const at = steps.length > 1 ? i / (steps.length - 1) : 0;
        s.classList.toggle('is-on', progress >= at - 0.02);
      });
      light(0);
      triggers.push(ST.create({
        trigger: frise, start: 'top top',
        end: () => '+=' + Math.round(dist() * 1.1),
        pin: '.proj-frise__inner', scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => {
          track.style.transform = 'translateX(' + (-self.progress * dist()) + 'px)';
          if (bar) bar.style.transform = 'scaleX(' + self.progress + ')';
          light(self.progress);
        }
      }));
    } else {
      // liste verticale : chaque étape s'allume à son entrée dans l'écran
      steps.forEach(s => triggers.push(ST.create({ trigger: s, start: 'top 75%', once: true, onEnter: () => s.classList.add('is-on') })));
    }
    // la hauteur de la page bouge quand photos et polices arrivent : on recale les déclencheurs
    let rt;
    const ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => ST.refresh(), 150); });
    ro.observe(root);
    ST.refresh();
    return () => { ro.disconnect(); clearTimeout(rt); triggers.forEach(t => t.kill()); if (frise) frise.classList.remove('is-pinned'); };
  }, []);

  if (!p) return null;

  // Presse — filtrée sur le dispositif : les 3 derniers articles + le reste en mentions
  const presse = (D.presse || [])
    .filter(a => (p.presseFilter || []).some(f => a.dispositif && a.dispositif.indexOf(f) === 0))
    .slice()
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  const featured3 = presse.slice(0, 3);
  const presseAlso = presse.slice(3);

  // Parcours — les étapes successives de la personne accompagnée. L'accompagnement
  // n'est pas une étape : il court sous toute la frise (le « rail »).
  const byTab = (t) => (p.parcours || []).find(x => x.tab === t) || {};
  const cand = p.candidater || {};
  const steps = [
    { tab: 'Candidater', title: 'Une réunion d’information, puis la candidature',
      text: cand.eligibility + ' La réunion d’information collective est obligatoire pour candidater.',
      stat: 'Gratuit', statL: 'formation financée par les pouvoirs publics et des mécènes',
      missing: 'réunion d’information collective, plan moyen, sujet centré (recadré 3:4 et 4:3)' },
    { ...byTab('Se former'), links: [
      { href: '#/formations/cap', name: 'CAP Cuisine', meta: '11 mois' },
      { href: '#/formations/tfp', name: 'Titre de commis', meta: '4 mois' },
    ] },
    byTab('Pratiquer'),
    byTab('Travailler'),
  ].filter(s => s.tab);
  const rail = byTab('Être accompagnée');

  // Le routeur est par hash : les ancres internes passent par un défilement en JS
  const goTo = (id) => (e) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const f = el.querySelector('a.btnb');
    if (f) setTimeout(() => f.focus({ preventScroll: true }), 900);
  };

  const antSlug = (v) => v.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div className="pageProjet pageProjet--des-etoiles-et-des-femmes" ref={rootRef} data-screen-label={"Projet — " + p.shortTitle}>

      {/* 1 · HERO — fil d'ariane intégré, titre, phrase, deux portes d'entrée à parts égales */}
      <div className="proj-heroband">
        <header className="proj-hero">
          <div className="proj-hero__media">
            <img src={PIMG(p.heroImages[0])} alt="" />
          </div>
          <div className="proj-hero__scrim" aria-hidden="true"></div>
          <div className="wrap proj-hero__inner">
            <nav className="proj-crumb" aria-label="Fil d’ariane">
              <a href="#/">Festin</a><span aria-hidden="true">/</span>
              <span>L’écosystème</span><span aria-hidden="true">/</span>
              <span aria-current="page">Des Étoiles et des Femmes</span>
            </nav>
            <span className="proj-hero__eb">Programme national · depuis 2015 · porté par l’association Festin</span>
            <h1 className="proj-hero__t">{p.title} <em>{p.accent}</em></h1>
            <p className="proj-hero__sub">{p.projetPhrase}</p>
            <div className="proj-hero__cta proj-hero__cta--duo">
              <a className="btnb btnb--gold" href={cand.applyHref} onClick={goTo('proj-portes')}>Candidater <span className="arrow" aria-hidden="true">→</span></a>
              <a className="btnb btnb--light" href={p.accueil.ctaHref} onClick={goTo('proj-portes-pro')}>Accueillir une stagiaire <span className="arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </header>
        <div className="proj-hero__logo">
          <img src={PIMG(p.logo)} alt={"Logo " + p.shortTitle} />
        </div>
      </div>

      {/* 2 · EN BREF — présentation + 4 chiffres datés, compteur au scroll */}
      <section className="proj-stats" aria-labelledby="proj-stats-t">
        <div className="wrap proj-stats2">
          <div className="proj-stats2__intro reveal">
            <span className="proj-sec" id="proj-stats-t">En bref</span>
            <h2 className="proj-h2">Former des femmes <em>aux métiers de la cuisine</em></h2>
            <p>{p.short.replace(/\s*Le programme existe depuis 2015 et compte 13 antennes\. En 2025, 91\s?%\s?des candidates ont obtenu leur diplôme\.\s*$/, '')}</p>
            <a className="btnb btnb--outline-ink" href={p.siteUrl} target="_blank" rel="noopener noreferrer">
              {p.siteName} <span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="proj-stats2__grid reveal" ref={statsGridRef}>
            {p.stats.map((s, i) => {
              const { target, suffix } = pdefParseStat(s);
              return (
                <div key={i} className={"proj-stat2 proj-stat2--" + ['teal', 'gold', 'violet', 'deep'][i % 4]}>
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

      {/* 3 · LE PARCOURS — frise horizontale épinglée (≥900px), liste verticale sinon.
          L'accompagnement social court sous toutes les étapes. */}
      <section className="proj-frise on-dark" aria-labelledby="proj-frise-t">
        <div className="proj-frise__inner">
          <div className="wrap proj-frise__head">
            <span className="proj-sec" id="proj-frise-t">Le parcours</span>
            <h2 className="proj-h2">De la candidature <em>à l’emploi</em></h2>
            <p className="proj-frise__lede">Quatre étapes, dans chacune des 13 antennes. Un centre de formation, des restaurants et des partenaires locaux suivent la promotion.</p>
          </div>
          <div className="proj-frise__viewport">
            <ol className="proj-frise__track">
              {steps.map((s, i) => (
                <li className="proj-step" key={i}>
                  <div className="proj-step__mark" aria-hidden="true"><span>{String(i + 1).padStart(2, '0')}</span></div>
                  <article className="proj-step__card">
                    <div className="proj-step__img">
                      {s.img
                        ? <window.Picture src={s.img} alt="" sizes="(max-width: 900px) 100vw, 20vw" />
                        : <span className="proj-ph">[PHOTO MANQUANTE : {s.missing}]</span>}
                    </div>
                    <div className="proj-step__body">
                      <span className="proj-step__tab">Étape {i + 1} · {s.tab}</span>
                      <h3 className="proj-step__t">{s.title}</h3>
                      <p>{s.text}</p>
                      {s.stat && <div className="proj-step__stat"><strong>{s.stat}</strong><span>{s.statL}</span></div>}
                      {s.links && (
                        <div className="proj-step__links">
                          {s.links.map((l) => (
                            <a key={l.href} href={l.href} className="proj-step__link">
                              <span><b>{l.name}</b> {l.meta}</span><span aria-hidden="true">→</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
          {rail.title && (
            <div className="wrap proj-rail">
              <span className="proj-rail__k">Tout au long du parcours · {rail.tab}</span>
              <p><b>{rail.title}.</b> {rail.text}</p>
              <span className="proj-frise__bar" aria-hidden="true" />
            </div>
          )}
        </div>
      </section>

      {/* 4 · TÉMOIGNAGES — carrousel défilant standard, cadres « à venir » si moins de 6 */}
      <section className="proj-testi" aria-labelledby="proj-testi-t">
        <div className="wrap">
          <span className="proj-sec" id="proj-testi-t">Elles l’ont fait</span>
          <h2 className="proj-h2 reveal">Elles racontent <em>leur parcours</em></h2>
        </div>
        <div className="reveal">
          <window.TestiCarousel label="Témoignages d'anciennes stagiaires" items={(p.temoignages || []).filter(t => !t.placeholder).map(t => ({
            name: t.prenom, meta: t.ville + ' · ' + t.promo, accroche: t.accroche, quote: t.extrait,
            photo: t.photo, objPos: t.objPos, bw: t.bw,
          }))} />
        </div>
      </section>

      {/* 5 · VIDÉO — bloc à part, 16:9, lecture au clic (rien ne se charge avant) */}
      <section className="proj-video on-dark" aria-labelledby="proj-video-t">
        <div className="wrap">
          <span className="proj-sec" id="proj-video-t">{p.video.eyebrow}</span>
          <h2 className="proj-h2 reveal">Le programme <em>en vidéo</em></h2>
          <div className="proj-video__frame reveal">
            {videoOn ? (
              <iframe
                title={"Vidéo de présentation — " + p.shortTitle}
                src="https://drive.google.com/file/d/1X3er9EQUpu61_yXR3KceY1sV4RgfygEK5hNzUFaaHEY/preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button type="button" className="proj-projet__play" onClick={() => setVideoOn(true)}
                aria-label={"Lire la vidéo de présentation du programme " + p.shortTitle}>
                <window.Picture src={p.video.poster} alt="" aria-hidden="true" sizes="(max-width: 1100px) 100vw, 1100px" />
                <span className="proj-projet__scrim" aria-hidden="true"></span>
                <span className="proj-projet__playlabel">Lire la vidéo <span aria-hidden="true">→</span></span>
              </button>
            )}
          </div>
          <p className="proj-video__credit">Vidéo réalisée par l’agence Les Fabricants</p>
        </div>
      </section>

      {/* 6 · LE RÉSEAU — les 13 antennes (liste à survol, photo d'antenne à venir) */}
      {p.antennes && p.antennes.length > 0 && (
        <section className="proj-reseau" aria-labelledby="proj-reseau-t">
          <div className="wrap">
            <span className="proj-sec" id="proj-reseau-t">Le réseau</span>
            <h2 className="proj-h2 reveal">Où se former, <em>en France</em></h2>
            <p className="proj-reseau__lede reveal">
              Le programme est né à Marseille en 2015. Il est aujourd'hui porté dans chaque ville par
              une structure locale, avec ses centres de formation et ses restaurateurs partenaires.
            </p>
            <div className="reveal">
              <window.HoverImageList label="Les antennes du réseau" items={p.antennes.map((a) => ({
                title: a.ville, meta: a.porteur, year: a.annee,
                img: 'images/antennes/' + antSlug(a.ville) + '.jpg',
                alt: 'Antenne de ' + a.ville,
              }))} />
            </div>
          </div>
        </section>
      )}

      {/* 7 · DEUX PORTES — candidater / accueillir une stagiaire, à parts égales */}
      <section className="proj-portes" id="proj-portes" aria-label="Rejoindre le programme">
        <div className="proj-porte proj-porte--gold reveal">
          <span className="proj-sec">Vous êtes candidate</span>
          <h2 className="proj-h2">Rejoindre <em>une promotion</em></h2>
          <p>{cand.pitch}</p>
          <ul className="proj-porte__list">
            <li>{cand.sessions}</li>
            <li>{cand.antennes}</li>
          </ul>
          <a className="btnb btnb--ink" href={cand.applyHref} target="_blank" rel="noopener noreferrer">
            {cand.applyLabel} <span className="arrow" aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="proj-porte proj-porte--teal on-dark reveal" id="proj-portes-pro">
          <span className="proj-sec">Vous êtes un acteur du secteur</span>
          <h2 className="proj-h2">Accueillir <em>une stagiaire</em></h2>
          <p>{p.accueil.text}</p>
          <div className="proj-porte__stat"><strong>{p.accueil.stat}</strong><span>{p.accueil.statL}</span></div>
          <a className="btnb btnb--gold" href={p.accueil.ctaHref}>
            {p.accueil.ctaLabel} <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* 8 · SOUTENIR — don, mécénat ; sphère des chefs du réseau */}
      <section className="proj-support" aria-labelledby="proj-support-t">
        <div className="wrap proj-support__inner reveal">
          <div className="proj-support__body">
            <span className="proj-sec" id="proj-support-t">Soutenir</span>
            <h2 className="proj-h2">{p.soutenir.title}</h2>
            <p>{p.soutenir.text}</p>
            <div className="proj-support__cta">
              <a className="btnb btnb--gold proj-support__cta-main" href={D.donation} target="_blank" rel="noopener noreferrer">
                {p.soutenir.donLabel}
              </a>
              <a className="btnb btnb--ghost proj-support__cta-sub" href={p.soutenir.contactHref}>{p.soutenir.contactLabel}</a>
            </div>
          </div>
          <div className="proj-support__sphere">
            {/* Réseau de chefs (source : deck financeurs). Sans photo fournie, un chef
                apparaît en cadre nominatif : aucune photo du programme sous son nom. */}
            <window.ImgSphere size={520} label="Les chefs du réseau" images={[
              { name: 'Julia Sedefdjian', place: 'Marraine nationale · Baieta, Paris' },
              ...D.about.chefs,
            ].map((c) => ({ src: c.photo, name: c.name, title: c.name, text: c.place }))
              .concat([
                'images/images-def/chaudbouillon-045.jpg',
                'images/images-def/HOTELERIE-097.jpg',
                'images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00022.jpg',
                'images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg',
                'images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-40.jpg',
                'images/photo-tabliers-violets.jpg', 'images/photo-cuisine-action.jpg',
                'images/photo-applaudissements.jpg',
              ].map((src) => ({ src, alt: '', title: 'Des Étoiles et des Femmes', text: 'En cuisine avec le réseau.' })))} />
          </div>
        </div>
      </section>

      {/* 9 · PORTÉ PAR FESTIN — rattachement, identique sur toutes les pages projet */}
      <section className="proj-festin on-dark" aria-labelledby="proj-festin-t">
        <div className="wrap proj-festin__inner reveal">
          <img className="proj-festin__logo" src="images/logo-festin-blanc.png" alt="Festin" />
          <div>
            <span className="proj-sec" id="proj-festin-t">L’écosystème Festin</span>
            <p className="proj-festin__txt">
              Des Étoiles et des Femmes est un programme de l’association Festin, créée à Marseille en 1987 :
              une association loi 1901 à but non lucratif et d’intérêt général, agréée ESUS.
            </p>
            <nav className="proj-festin__links" aria-label="Les autres projets de Festin">
              {D.projets.filter(x => x.id !== p.id).map(x => (
                <a key={x.id} href={'#/projets/' + x.id}>{x.shortTitle}</a>
              ))}
              <a className="is-main" href="#/about">L’association <span aria-hidden="true">→</span></a>
            </nav>
          </div>
        </div>
      </section>

      {/* 10 · PRESSE — 3 derniers articles + le reste en mentions */}
      {presse.length > 0 && (
        <section className="proj-presse" aria-labelledby="proj-presse-t">
          <div className="wrap">
            <span className="proj-sec" id="proj-presse-t">La presse</span>
            <h2 className="proj-h2 reveal">Ils en <em>parlent</em></h2>
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
                  <span className="proj-news__date">{pdefMonth(a.date)}</span>
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

    </div>
  );
}

window.ProjetDefPage = ProjetDefPage;
