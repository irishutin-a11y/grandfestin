// HomeB.jsx — accueil, refonte du 24/09/2026 (DIRECTION-ACCUEIL.md).
// Contenu : window.FESTIN_DATA.home (.hero .confiance .missions .frise .preuve
// .portes .quotes) + .projets + .presse + .about.chefs. Animations GSAP/ScrollTrigger.
// Toutes les instances GSAP sont détruites au démontage (changement de route).
const { useEffect, useRef } = React;
// encode les espaces/accents des chemins d'images, sans re-encoder ceux déjà encodés
const IMG = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function HomeB() {
  const rootRef = useRef(null);
  window.useGReveal(rootRef); // briques communes (catalogue) : même apparition qu'ailleurs

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
        .from('#hero .hc__cart', { y: 32, autoAlpha: 0 }, 0.05)
        .from('#hero .hc__t .ln > span', { yPercent: 105, stagger: 0.12 }, 0.2)
        .from('#hero .hc__tag, #hero .ac-porte2', { y: M.y, autoAlpha: 0, stagger: M.stagger }, 0.45)
        .from('#hero .hc__photo img', { scale: 1.08, duration: 1.8 }, 0);

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
  const lienDon = (href) => (href === 'don' ? D.donation : href);

  return (
    <div className="pageAccueil" ref={rootRef}>

      {/* 1 · HERO — qui, quoi, pour qui ; la seule teinte pleine de la page avec le pied */}
      {/* en-tête « grande photo, cartouche en coin » (HEADERS.md, 2e tour, A) : la photo en plein cadre,
          la signature et les deux portes (teal = insertion, or = secteur) dans un cartouche teal profond */}
      <header className="hc hc--accueil" id="hero">
        <figure className="hc__photo">
          <window.Picture src={H.hero.img} alt={H.hero.imgAlt} sizes="100vw" loading="eager" fetchPriority="high" />
        </figure>
        <div className="wrap hc__pose">
          <div className="hc__cart hc__cart--deep on-dark">
            <h1 className="hc__t hc__t--xl">
              <span className="ln"><span>Le goût d'avancer</span></span>
              <span className="ln"><span><em>ensemble.</em></span></span>
            </h1>
            <p className="hc__tag">{H.hero.title} {H.hero.titleAccent}</p>
            <div className="hc__portes ac-portes2">
            <a className="ac-porte2 ac-porte2--ins" href={H.hero.ctaPrimary.href}>
              <span className="ac-porte2__k">{H.hero.ctaPrimary.k}</span>
              <span className="ac-porte2__l">{H.hero.ctaPrimary.label}{'\u00a0'}<span className="arrow" aria-hidden="true">→</span></span>
            </a>
            <a className="ac-porte2 ac-porte2--pro" href={H.hero.ctaSecondary.href}>
              <span className="ac-porte2__k">{H.hero.ctaSecondary.k}</span>
              <span className="ac-porte2__l">{H.hero.ctaSecondary.label}{'\u00a0'}<span className="arrow" aria-hidden="true">→</span></span>
            </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2 · CONFIANCE : les statuts (« Ils en ont parlé » retiré, retours V2 §2) */}
      <section className="ac-conf" aria-label="Festin en bref">
        {/* statuts en bandeau défilant (retours du 25/09/2026) ; liste fixe en mouvement réduit */}
        <div className="ac-conf__band" data-marquee>
          <ul className="ac-conf__statuts ac-conf__statuts--defile" aria-label="Statuts de Festin">
            {H.confiance.statuts.concat(H.confiance.statuts, H.confiance.statuts, H.confiance.statuts).map((t, i) => (
              <li key={i} aria-hidden={i >= H.confiance.statuts.length ? true : undefined}>{t}</li>
            ))}
          </ul>
          <window.MarqueePause label="des statuts" />
        </div>
      </section>

      {/* 3 · DEUX PUBLICS — chaque visiteur se reconnaît avant de lire l'histoire */}
      <section className="ac-pub" id="publics" aria-labelledby="ac-pub-t">
        <div className="wrap">
          <div className="ac-pub__head reveal">
            <h2 className="ac-h2" id="ac-pub-t">{H.publics.title} <em>{H.publics.titleAccent}</em></h2>
            <p className="ac-lede">{H.publics.lede}</p>
          </div>
          <div className="ac-pub__grid">
            {H.publics.cols.map((c) => (
              <article className={'ac-side ac-side--' + c.key + ' reveal'} key={c.key}>
                <div className="ac-side__img"><window.Picture src={c.img} alt={c.imgAlt} sizes="(max-width: 900px) 100vw, 46vw" /></div>
                <div className="ac-side__body">
                  <span className="ac-side__tag">{c.tag}</span>
                  <h3 className="ac-side__t">{c.title} <em>{c.titleAccent}</em></h3>
                  <p>{c.text}</p>
                  <dl>{c.lignes.map((l) => <div key={l.dt}><dt>{l.dt}</dt><dd>{l.dd}</dd></div>)}</dl>
                  <p className="ac-side__proof" dangerouslySetInnerHTML={{ __html: c.preuve }} />
                  <a className={'btnb ' + (c.key === 'pro' ? 'btnb--gold' : 'btnb--teal')} href={c.cta.href}>{c.cta.label} <span className="arrow" aria-hidden="true">→</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 bis · LEURS MOTS — la mission incarnée : des personnes accompagnées parlent,
          mot pour mot (RETOURS-AUDIT §2.1, §2.12) */}
      <section className="ac-voix" id="voix" aria-labelledby="ac-voix-t">
        <div className="wrap">
          <h2 className="ac-h2 reveal" id="ac-voix-t">{H.voix.title} <em>{H.voix.titleAccent}</em></h2>
          <ul className="ac-voix__grid">
            {H.voix.items.map((v) => (
              <li key={v.name} className="ac-voix__it reveal">
                <figure>
                  <blockquote><p>« {v.quote} »</p></blockquote>
                  <figcaption>
                    {v.photo && <span className="ac-voix__ph"><img src={IMG(v.photo)} alt="" loading="lazy" /></span>}
                    <span className="ac-voix__who"><b>{v.name}</b><span>{v.meta}</span></span>
                  </figcaption>
                </figure>
                <a className="lnk ac-voix__lnk" href={v.href}>{v.lien} <span className="arrow" aria-hidden="true">→</span></a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 · PRÈS DE QUARANTE ANS — la frise des projets, chaque carte mène à sa page */}
      <window.JalonsCouleur id="histoire" jalons={H.jalons.items.map((j) => { const p = D.projets.find((x) => j.href === '#/projets/' + x.id); return { ...j, logo: j.logo || (p && p.logo) || null }; })} title={H.jalons.title} em={H.jalons.titleAccent}
        lede={H.jalons.lede} word="PROJETS" label="Les projets de Festin, de 1993 à 2026" />

      {/* 5 · Le catalogue complet est sur l'Académie et la page Pros (RETOURS-AUDIT §2.10) :
          l'accueil ne le double plus, ni ses tarifs (§2.1). */}

      {/* 6 · CE QUE 2025 A DONNÉ — les quatre chiffres clés, en couleur, sur fond sombre */}
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

      {/* 8 · CHOISIR SON ENTRÉE — les parcours se séparent après les chiffres */}
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
                {c.pts && <ul className="ac-porte__pts">{c.pts.map((pt) => <li key={pt}>{pt}</li>)}</ul>}
                <span className="lnk ac-porte__go">{c.cta} <span className="arrow" aria-hidden="true">→</span></span>
              </a>
            ))}
            <div className="ac-agir reveal">
              <span className="ac-porte__tag ac-porte__tag--flat">{H.portes.agir.tag}</span>
              <h3 className="ac-agir__t">{H.portes.agir.title} <em>{H.portes.agir.titleAccent}</em></h3>
              <p>{H.portes.agir.text}</p>
              {/* soutenir d'abord (un seul bouton plein), puis déjeuner ou commander, à part (RETOURS-AUDIT §2.13) */}
              <ul className="ac-agir__links">
                {H.portes.agir.links.filter((l) => !l.external).map((l) => (
                  <li key={l.label}>
                    <a className={l.primary ? 'btnb btnb--gold' : 'lnk'} href={lienDon(l.href)}
                      {...((l.external || l.href === 'don') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {l.label} <span className="arrow" aria-hidden="true">{(l.external || l.href === 'don') ? '↗' : '→'}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="ac-agir__sous">Déjeuner ou recevoir avec nos projets :</p>
              <ul className="ac-agir__links ac-agir__links--sous">
                {H.portes.agir.links.filter((l) => l.external).map((l) => (
                  <li key={l.label}><a className="lnk" href={l.href} target="_blank" rel="noopener noreferrer">{l.label} <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// « Le site des Beaux Mets », « Le site de Restaure » (retours du 02/10/2026)
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
// Nos tables (#/tables, navigation option C, 07/10/2026) : les lieux ouverts au public,
// avec le bloc de chaque page projet (BlocTable), puis Sadi Carnot à venir.
function TablesPage() {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  // le restaurant ouvert au public d'abord, puis le traiteur
  const lieux = (D.lieux || []).filter((l) => !l.futur && (D.projetPages[l.projet] || {}).table)
    .sort((a, b) => (a.projet === 'les-beaux-mets' ? -1 : b.projet === 'les-beaux-mets' ? 1 : 0));
  const sc = (D.lieux || []).find((l) => l.futur);
  const nom = (id) => ((D.projets || []).find((p) => p.id === id) || {}).shortTitle || id;
  return (
    <div className="gpage" ref={root} data-screen-label="Nos tables">
      <window.HeroPage tone="deep" title="Nos" accent="tables."
        img="images/photo-service-restaurant.jpg" imgAlt="Service en salle, une commande prise à table"
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Nos tables' }]}>
        <div className="g-herocta"><window.GLink l={{ to: 'table-' + (lieux[0] || {}).key }} className="btnb btnb--gold">Découvrir nos tables <span className="arrow" aria-hidden="true">↓</span></window.GLink></div>
      </window.HeroPage>
      {lieux.map((l, k) => (
        <window.BlocTable key={l.key} variante={k % 2 ? 'clair' : undefined} id={'table-' + l.key} t={D.projetPages[l.projet].table}
          head={{ nom: nom(l.projet), lieu: l.lieu + ', ' + l.ville }} projet={l.projet} />
      ))}
      {sc && (
        <section className="g-sec g-sec--cream pj-dev" id="developpement" aria-labelledby="tab-dev-t">
          <div className="wrap pj-dev__in">
            <div>
              <window.GHead id="tab-dev-t" title="À" accent="venir." />
              <h3 className="pj-dev__t">{sc.lieu} <span>{sc.ville}</span></h3>
              <p className="g-lede">{sc.text}</p>
              <div className="g-actions">
                <a className="btnb btnb--gold" href={D.donation} target="_blank" rel="noopener noreferrer">Faire un don <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>
                <a className="lnk" href="#/contact/mecenat">Devenir mécène <span className="arrow" aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="pj-dev__avenir" aria-hidden="true"><span>À venir</span></div>
          </div>
        </section>
      )}
    </div>
  );
}
window.TablesPage = TablesPage;

// Catalogue « Projets et formations » (#/catalogue, PROPOSITIONS-V4 validées le 06/10/2026) :
// remplace L'écosystème. Une carte par élément (FESTIN_DATA.catalogue), filtres par type et par public.
// Sous « Tous », une formation rattachée à un projet déjà présent (« dans ») est masquée : pas de doublon.
// L'Académie (« La formation, un moyen ») et Sadi Carnot (en développement) suivent la grille.
const CATA_FILTRES = [
  { key: 'tous', label: 'Tous' },
  { key: 'projets', label: 'Nos projets', test: (c) => c.types.includes('projet') },
  { key: 'formations', label: 'Nos formations', test: (c) => c.types.includes('formation') },
  { key: 'tables', label: 'Nos tables', test: (c) => c.types.includes('tables') },
  { key: 'insertion', label: 'Insertion', test: (c) => c.public === 'insertion' && !c.dans },
  { key: 'pro', label: 'Professionnels', test: (c) => c.public === 'pro' },
];
const cataType = (c) => c.avenir ? 'À venir' : c.types.includes('formation') ? (c.public === 'pro' ? 'Formation pro' : "Parcours d'insertion")
  : c.types.includes('tables') ? 'Projet · Nos tables' : 'Projet';
// Code couleur (07/10/2026) : teal = insertion, or = professionnels (code du site), corail = nos tables.
const cataFamille = (c) => c.avenir ? 'avenir' : c.types.includes('tables') ? 'tables' : c.public;
const CATA_LEGENDE = [
  { k: 'insertion', label: "Insertion : parcours et projets" },
  { k: 'pro', label: 'Pour le secteur : formations pro et Restaure' },
  { k: 'tables', label: 'Nos tables : restaurant et traiteur' },
];
function CataloguePage({ filtre: initial }) {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  const cartes = D.catalogue || [];
  const [filtre, setFiltre] = React.useState(CATA_FILTRES.some((f) => f.key === initial) ? initial : 'tous');
  const F = CATA_FILTRES.find((f) => f.key === filtre);
  const vus = F.test ? cartes.filter(F.test) : cartes.filter((c) => !c.dans);
  const choisir = (k) => {
    setFiltre(k);
    // l'adresse suit le filtre, sans relancer la transition de page
    try { window.history.replaceState(null, '', k === 'tous' ? '#/catalogue' : '#/catalogue/' + k); } catch (e) {}
  };
  return (
    <div className="gpage" ref={root} data-screen-label="Projets et formations">
      <window.HeroPage tone="deep" title="Projets et" accent="formations."
        img="images/images-def/grand-festin-2025-brigades.jpg" imgAlt="Les brigades du Grand Festin 2025 sur les marches, près du Vieux-Port"
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Projets et formations' }]}>
        <div className="g-herocta"><window.GLink l={{ to: 'catalogue' }} className="btnb btnb--gold">Voir le catalogue <span className="arrow" aria-hidden="true">↓</span></window.GLink></div>
      </window.HeroPage>
      <section className="g-sec g-sec--white pj-gal" id="catalogue" aria-labelledby="cata-t">
        <div className="wrap">
          <h2 className="sr-only" id="cata-t">Le catalogue</h2>
          <div className="filters" role="group" aria-label="Filtrer le catalogue">
            {CATA_FILTRES.map((f) => {
              const n = f.test ? cartes.filter(f.test).length : cartes.filter((c) => !c.dans).length;
              return <button type="button" key={f.key} className={'filter' + (filtre === f.key ? ' active' : '')} aria-pressed={filtre === f.key} onClick={() => choisir(f.key)}>{f.label} ({n})</button>;
            })}
          </div>
          <ul className="cata-leg" aria-label="Code couleur">
            {CATA_LEGENDE.map((l) => <li key={l.k} className={'cata-leg__it cata-card--' + l.k}><span className="cata-leg__pt" aria-hidden="true" />{l.label}</li>)}
          </ul>
          <p className="sr-only" aria-live="polite">{vus.length} résultats</p>
          <ul className="pj-gal__grid">
            {vus.map((c) => {
              const lien = c.ancre && c.href.indexOf('#/catalogue') === 0 ? { to: c.ancre } : { href: c.href };
              return (
                <li key={c.id}>
                  <div className={'pj-card cata-card cata-card--' + cataFamille(c)}>
                    <span className="pj-card__img">
                      {c.img ? <window.Picture src={c.img} alt="" sizes="(max-width: 700px) 100vw, 30vw" />
                        : <span className="cata-card__vide" aria-hidden="true">{c.avenir ? 'À venir' : 'Festin'}</span>}
                    </span>
                    <span className="pj-card__body">
                      <span className="pj-card__mis">{cataType(c)}</span>
                      <span className="pj-card__t">{c.titre}</span>
                      {c.ou && <span className="cata-card__ou"><i data-lucide="map-pin" aria-hidden="true" /> {c.ou}</span>}
                      <span className="pj-card__d">{c.ligne}</span>
                      {!c.avenir
                        ? <window.GLink l={lien} className="pj-card__go">Découvrir <span className="arrow" aria-hidden="true">→</span><span className="sr-only"> : {c.titre}</span></window.GLink>
                        : <window.GLink l={{ to: 'developpement' }} className="pj-card__go">Soutenir le projet <span className="arrow" aria-hidden="true">↓</span><span className="sr-only"> : {c.titre}</span></window.GLink>}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <window.AcaFormation />
      {/* EN DÉVELOPPEMENT (RETOURS-V3 §5.4) : Sadi Carnot, au futur, avec l'appel au don */}
      {(() => {
        const sc = (D.lieux || []).find((l) => l.key === 'sadi-carnot');
        if (!sc) return null;
        return (
          <section className="g-sec g-sec--white pj-dev" id="developpement" aria-labelledby="pj-dev-t">
            <div className="wrap pj-dev__in">
              <div>
                <window.GHead id="pj-dev-t" title="En" accent="développement." />
                <h3 className="pj-dev__t">{sc.lieu} <span>{sc.ville}</span></h3>
                <p className="g-lede">{sc.text}</p>
                <div className="g-actions">
                  <a className="btnb btnb--gold" href={D.donation} target="_blank" rel="noopener noreferrer">Faire un don <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>
                  <a className="lnk" href="#/contact/mecenat">Devenir mécène <span className="arrow" aria-hidden="true">→</span></a>
                </div>
              </div>
              <div className="pj-dev__avenir" aria-hidden="true"><span>À venir</span></div>
            </div>
          </section>
        );
      })()}
    </div>
  );
}

window.MissionsListe = MissionsListe;
window.CataloguePage = CataloguePage;
window.HomeB = HomeB;
