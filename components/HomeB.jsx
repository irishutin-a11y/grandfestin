// HomeB.jsx — accueil, refonte du 24/09/2026 (DIRECTION-ACCUEIL.md).
// Contenu : window.FESTIN_DATA.home (.hero .confiance .missions .frise .preuve
// .portes .quotes) + .projets + .presse + .about.chefs. Animations GSAP/ScrollTrigger.
// Toutes les instances GSAP sont détruites au démontage (changement de route).
const { useEffect, useRef } = React;
// encode les espaces/accents des chemins d'images, sans re-encoder ceux déjà encodés
const IMG = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function HomeB() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const gsap = window.gsap, ST = window.ScrollTrigger;
    const reduce = window.FESTIN_RM ? window.FESTIN_RM() : false;
    // Le fil des missions va du centre de la première pastille au centre de la dernière
    const list = root.querySelector('.ac-mis__list');
    const placeFil = () => {
      const ns = list ? list.querySelectorAll('.ac-mis__n') : [];
      if (ns.length < 2) return;
      const L = list.getBoundingClientRect(), a = ns[0].getBoundingClientRect(), b = ns[ns.length - 1].getBoundingClientRect();
      const top = a.top - L.top + a.height / 2, bottom = b.top - L.top + b.height / 2;
      list.style.setProperty('--fil-top', top + 'px');
      list.style.setProperty('--fil-h', (bottom - top) + 'px');
    };
    placeFil();
    const roFil = new ResizeObserver(placeFil);
    if (list) roFil.observe(list);

    if (reduce || !gsap || !ST) {
      root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
      root.querySelectorAll('.ac-mis__item').forEach((el) => el.classList.add('is-on'));
      return () => roFil.disconnect();
    }
    const M = window.FESTIN_MOTION;
    const ctx = gsap.context(() => {
      // HERO : le titre monte ligne par ligne, la photo s'ouvre, le reste suit
      gsap.timeline({ defaults: { ease: M.ease, duration: M.dur.title } })
        .from('.ac-hero__t .ln > span', { yPercent: 105, stagger: 0.12 }, 0.15)
        .from('.ac-hero__kicker, .ac-hero__sig, .ac-hero__lede, .ac-hero__cta', { y: M.y, autoAlpha: 0, stagger: M.stagger }, 0.45)
        .from('.ac-hero__media', { clipPath: 'inset(8% 0% 8% 18% round 48px)', duration: 1.4 }, 0.1)
        .from('.ac-hero__media img', { scale: 1.12, duration: 1.8 }, 0.1);
      gsap.to('.ac-hero__media img', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.ac-hero', start: 'top top', end: 'bottom top', scrub: true } });

      // CONFIANCE : les médias arrivent l'un après l'autre
      gsap.from('.ac-conf__media li', { y: 16, autoAlpha: 0, stagger: 0.06, duration: M.dur.reveal,
        scrollTrigger: { trigger: '.ac-conf', start: 'top 88%', once: true } });

      // MISSIONS : le fil se trace de 01 à 03 ; chaque mission s'allume quand il l'atteint
      const fil = root.querySelector('.ac-mis__fil path');
      if (fil) {
        const L = fil.getTotalLength();
        gsap.fromTo(fil, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: '.ac-mis__list', start: 'top 70%', end: 'bottom 70%', scrub: 0.6 } });
      }
      root.querySelectorAll('.ac-mis__item').forEach((it) => {
        ST.create({ trigger: it, start: 'top 70%', onEnter: () => it.classList.add('is-on'), onLeaveBack: () => it.classList.remove('is-on') });
        gsap.from(it.querySelectorAll('.ac-proj'), { y: 40, autoAlpha: 0, stagger: 0.1, duration: M.dur.reveal,
          scrollTrigger: { trigger: it, start: 'top 75%', once: true } });
      });

      // CHIFFRES : comptage de 0 à la valeur, une fois
      root.querySelectorAll('.ac-chiffre__n').forEach((el) => {
        const target = +el.dataset.count, suffix = el.dataset.suffix || '';
        ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => {
          const o = { v: 0 };
          gsap.to(o, { v: target, duration: 1.6, ease: 'expo.out', onUpdate: () => { el.textContent = Math.round(o.v) + suffix; } });
        } });
      });

      // RÉVÉLATIONS génériques
      root.querySelectorAll('.reveal').forEach((el) => ST.create({ trigger: el, start: 'top 86%', once: true, onEnter: () => el.classList.add('is-in') }));
    }, root);
    ST.refresh();
    return () => { roFil.disconnect(); ctx.revert(); };
  }, []);

  const D = window.FESTIN_DATA;
  const H = D.home;
  const byId = (id) => D.projets.find((p) => p.id === id) || {};
  const presseHref = (source) => { const a = (D.presse || []).find((x) => x.source === source); return a ? a.href : null; };
  const lienDon = (href) => (href === 'don' ? D.donation : href);

  return (
    <div className="pageAccueil" ref={rootRef}>

      {/* 1 · HERO — qui, quoi, pour qui ; la seule teinte pleine de la page avec le pied */}
      <header className="ac-hero on-dark" id="hero">
        <window.Trait className="ac-hero__trait" width={150} delay={0.2} />
        <div className="wrap ac-hero__grid">
          <div className="ac-hero__txt">
            <span className="kicker ac-hero__kicker">{H.hero.kicker}</span>
            <h1 className="ac-hero__t">
              <span className="ln"><span>{H.hero.title}</span></span>
              <span className="ln"><span><em>{H.hero.titleAccent}</em></span></span>
            </h1>
            <p className="ac-hero__sig">{H.hero.signature}</p>
            {H.hero.lede && <p className="ac-hero__lede">{H.hero.lede}</p>}
            <div className="ac-hero__cta">
              <a className="btnb btnb--gold" href={H.hero.ctaPrimary.href}>{H.hero.ctaPrimary.label} <span className="arrow" aria-hidden="true">→</span></a>
              <a className="ac-hero__lnk" href={H.hero.ctaSecondary.href}>{H.hero.ctaSecondary.label} <span className="arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <figure className="ac-hero__media">
          <window.Picture src={H.hero.img} alt={H.hero.imgAlt} sizes="(max-width: 900px) 100vw, 44vw" loading="eager" fetchPriority="high" />
        </figure>
      </header>

      {/* 2 · CONFIANCE — statuts, puis les médias qui ont parlé de Festin */}
      <section className="ac-conf" aria-label="L'association en bref">
        {/* statuts en bandeau défilant (retours du 25/09/2026) ; liste fixe en mouvement réduit */}
        <div className="ac-conf__band" data-marquee>
          <ul className="ac-conf__statuts ac-conf__statuts--defile" aria-label="Statuts de l'association">
            {H.confiance.statuts.concat(H.confiance.statuts, H.confiance.statuts, H.confiance.statuts).map((t, i) => (
              <li key={i} aria-hidden={i >= H.confiance.statuts.length ? true : undefined}>{t}</li>
            ))}
          </ul>
          <window.MarqueePause label="des statuts" />
        </div>
        <div className="wrap ac-conf__row">
          <div className="ac-conf__presse">
            <span className="ac-conf__label">{H.confiance.presseLabel}</span>
            <ul className="ac-conf__media">
              {H.confiance.medias.map((m) => {
                const href = presseHref(m.source);
                return <li key={m.nom}>{href ? <a href={href} target="_blank" rel="noopener noreferrer">{m.nom}</a> : m.nom}</li>;
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 3 · TROIS MISSIONS, SIX PROJETS — un seul rangement pour tout le site */}
      <section className="ac-mis" id="missions" aria-labelledby="ac-mis-t">
        <div className="wrap">
          <div className="ac-mis__head reveal">
            <h2 className="ac-h2" id="ac-mis-t">{H.missions.title} <em>{H.missions.titleAccent}</em></h2>
            <p className="ac-lede">{H.missions.lede}</p>
          </div>
          <window.MissionsListe />
        </div>
      </section>

      {/* 4 · LE PARCOURS — une promotion, de septembre à juin */}
      <window.Frise id="parcours" tone="tint" title={H.frise.title} accent={H.frise.titleAccent} lede={H.frise.lede}
        steps={H.frise.steps} rail={H.frise.rail} cta={H.frise.cta} />

      {/* 5 · CE QUE 2025 A DONNÉ — les quatre chiffres clés, en couleur, sur fond sombre */}
      <section className="ac-chiffres on-dark" id="chiffres" aria-labelledby="ac-chiffres-t">
        <div className="wrap">
          <h2 className="ac-h2 reveal" id="ac-chiffres-t">{H.impact.title} <em>{H.impact.titleAccent}</em></h2>
          <ul className="ac-chiffres__grid">
            {D.stats.map((s, i) => {
              const suffix = s.unit === '%' ? '\u00a0%' : (s.unit || '');
              return (
                <li className="ac-chiffre reveal" key={i}>
                  <span className="ac-chiffre__n" data-count={String(s.value).replace(/[^\d]/g, '')} data-suffix={suffix}>{s.value}{suffix}</span>
                  <span className="ac-chiffre__l">{s.label}</span>
                </li>
              );
            })}
          </ul>
          <p className="ac-chiffres__src">{H.impact.source} <a href="#/impact">Voir tous nos rapports d'activité <span aria-hidden="true">→</span></a></p>
        </div>
      </section>

      {/* 6 · PAR OÙ COMMENCER — les parcours se séparent après les chiffres */}
      <section className="ac-portes" id="portes" aria-labelledby="ac-portes-t">
        <div className="wrap">
          <h2 className="ac-h2 reveal" id="ac-portes-t">{H.portes.title} <em>{H.portes.titleAccent}</em></h2>
          <div className="ac-portes__grid">
            {H.portes.cards.map((c) => (
              <a key={c.href} href={c.href} className="ac-porte reveal">
                <span className="ac-porte__img">
                  <window.Picture src={c.img} alt="" sizes="(max-width: 820px) 100vw, 38vw" />
                  <span className="ac-porte__tag">{c.tag}</span>
                </span>
                <span className="ac-porte__t">{c.title}</span>
                <ul className="ac-porte__pts">{c.pts.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <span className="lnk ac-porte__go">{c.cta} <span className="arrow" aria-hidden="true">→</span></span>
              </a>
            ))}
            <div className="ac-agir reveal">
              <span className="ac-porte__tag ac-porte__tag--flat">{H.portes.agir.tag}</span>
              <h3 className="ac-agir__t">{H.portes.agir.title} <em>{H.portes.agir.titleAccent}</em></h3>
              <p>{H.portes.agir.text}</p>
              <ul className="ac-agir__links">
                {H.portes.agir.links.map((l) => (
                  <li key={l.label}>
                    <a className={l.primary ? 'btnb btnb--gold' : 'lnk'} href={lienDon(l.href)}
                      {...((l.external || l.href === 'don') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {l.label} <span className="arrow" aria-hidden="true">{(l.external || l.href === 'don') ? '↗' : '→'}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Trois missions, six projets : la liste partagée par l'accueil et la page « Nos projets »
function MissionsListe() {
  const D = window.FESTIN_DATA;
  const H = D.home;
  const byId = (id) => D.projets.find((p) => p.id === id) || {};
  return (
    <ol className="ac-mis__list">
      <svg className="ac-mis__fil" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M20 0 C 36 120 4 220 20 333 S 36 560 20 666 S 4 880 20 1000" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      {H.missions.items.map((m, i) => (
        <li className="ac-mis__item" key={m.key}>
          <span className="ac-mis__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <div className="ac-mis__txt">
            <h3 className="ac-mis__t">{m.title}{m.titleAccent && <> <em>{m.titleAccent}</em></>}</h3>
            <p>{m.text}</p>
            <p className="ac-mis__fait"><strong>{m.fait.n}</strong> <span>{m.fait.t}</span> <small>{m.fait.p}</small></p>
          </div>
          <ul className={'ac-mis__projets ac-mis__projets--n' + m.projets.length} style={{ '--n': m.projets.length }}>
            {m.projets.map((pr) => {
              const p = byId(pr.id);
              const name = pr.name || p.shortTitle;
              const logo = pr.logo || p.logo;
              return (
                <li key={pr.id}>
                  <a className="ac-proj" href={pr.href || ('#/projets/' + pr.id)}>
                    <span className="ac-proj__img">
                      <window.Picture src={pr.img} alt="" sizes="(max-width: 700px) 100vw, 26vw" />
                      {logo && <span className="ac-proj__logo"><img src={IMG(logo)} alt="" loading="lazy" /></span>}
                    </span>
                    <span className="ac-proj__name">{name}</span>
                    <span className="ac-proj__line">{pr.line}</span>
                    <span className="ac-proj__go" aria-hidden="true">Découvrir <span className="arrow">→</span></span>
                  </a>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ol>
  );
}

// Page « Nos projets » (#/projets) : galerie de cartes filtrable par mission
// (retours du 25/09/2026 : ne pas reprendre la liste à fil de l'accueil)
function ProjetsIndexPage() {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  const H = D.home;
  const byId = (id) => D.projets.find((p) => p.id === id) || {};
  const missions = H.missions.items;
  const cartes = missions.flatMap((m) => m.projets.map((pr) => ({ ...pr, mission: m })));
  const [filtre, setFiltre] = React.useState('all');
  const vus = filtre === 'all' ? cartes : cartes.filter((c) => c.mission.key === filtre);
  const nomMission = (m) => m.title + (m.titleAccent ? ' ' + m.titleAccent : '');
  return (
    <div className="gpage" ref={root} data-screen-label="Nos projets">
      <window.HeroPage tone="teal" kicker="Six projets, trois missions" title="Nos" accent="projets"
        proof={H.missions.ledeProjets}
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Nos projets' }]} />
      <section className="g-sec g-sec--white pj-gal" aria-labelledby="pj-gal-t">
        <div className="wrap">
          <h2 className="sr-only" id="pj-gal-t">Les projets</h2>
          <div className="filters" role="group" aria-label="Filtrer par mission">
            <button type="button" className={'filter' + (filtre === 'all' ? ' active' : '')} aria-pressed={filtre === 'all'} onClick={() => setFiltre('all')}>Tous ({cartes.length})</button>
            {missions.map((m) => (
              <button type="button" key={m.key} className={'filter' + (filtre === m.key ? ' active' : '')} aria-pressed={filtre === m.key} onClick={() => setFiltre(m.key)}>
                {nomMission(m)} ({m.projets.length})
              </button>
            ))}
          </div>
          <ul className="pj-gal__grid">
            {vus.map((c) => {
              const p = byId(c.id);
              const logo = c.logo || p.logo;
              return (
                <li key={c.id}>
                  <a className={'pj-card pj-card--' + c.mission.key} href={c.href || ('#/projets/' + c.id)}>
                    <span className="pj-card__img">
                      <window.Picture src={c.img} alt="" sizes="(max-width: 700px) 100vw, 30vw" />
                      {logo && <span className="pj-card__logo"><img src={IMG(logo)} alt="" loading="lazy" /></span>}
                    </span>
                    <span className="pj-card__body">
                      <span className="pj-card__mis">{nomMission(c.mission)}</span>
                      <span className="pj-card__t">{c.name || p.shortTitle}</span>
                      <span className="pj-card__d">{c.line}</span>
                      <span className="pj-card__go">Découvrir <span className="arrow" aria-hidden="true">→</span></span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      {/* Pourquoi six projets et pas un : la direction, mot pour mot (édito du rapport d'activité 2025) */}
      <section className="g-sec g-sec--cream pj-intro" aria-label="Le mot de la direction">
        <div className="wrap">
          <figure className="pj-intro__fig g-reveal">
            <blockquote className="pj-intro__q">
              <p>Le collectif permet de mutualiser, d'apprendre, d'amplifier. Il permet surtout de durer et de transformer en profondeur.</p>
            </blockquote>
            <figcaption className="pj-intro__sig">
              <strong>Jérôme Schatzman, Armand Hurault, Marine Vever</strong>
              <span>Président, directeur général et directrice adjointe de Festin, édito du rapport d'activité 2025</span>
            </figcaption>
            <a className="lnk pj-intro__lnk" href="#/about">Qui sommes-nous <span className="arrow" aria-hidden="true">→</span></a>
          </figure>
        </div>
      </section>
    </div>
  );
}

window.MissionsListe = MissionsListe;
window.ProjetsIndexPage = ProjetsIndexPage;
window.HomeB = HomeB;
