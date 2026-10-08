// About.jsx — page « Qui sommes-nous ». Contenus : window.FESTIN_DATA (.about, .stats).
// Animations : GSAP + ScrollTrigger (déjà synchronisés avec Lenis dans index.html). Styles : styles/about.css.
(function () {
const { useRef, useEffect, useState, useCallback } = React;

const RM = () => window.matchMedia('(prefers-reduced-motion:reduce)').matches;
const src = (p) => encodeURI(p);

// Titre : capitales grasses + mot clé en italique léger (contraste graisse / pente)
function Title({ children, em, after, level = 2, className = '' }) {
  const Tag = 'h' + level;
  return <Tag className={'ab-title ' + className}>{children}{em && <> <em>{em}</em></>}{after}</Tag>;
}

// ---------- 0. HERO — titre monumental sur une photo plein cadre ----------
// Une seule photo en fond (retour PIT 23/09/2026). Entrée : léger dézoom ;
// au défilement, la photo glisse plus lentement que le texte.
const HERO_IMG = 'images/photo-promo-groupe.jpg';

function AboutHero() {
  // Même hero que toutes les pages intérieures (Sections.jsx, HeroPage). Sans sous-titre (retour PIT).
  return (
    <window.HeroPage tone="deep" title="L'insertion par la cuisine" accent="depuis 40 ans."
      img={HERO_IMG} imgAlt="Une promotion du dispositif Des Étoiles et des Femmes réunie en tenue de cuisine"
      logo="images/logo-festin-blanc-sb.png" logoAlt="Festin"
      crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Qui sommes-nous' }]} />
  );
}

// ---------- 1. CE QU'ON EST — split asymétrique, photo débordante, vignette dans le titre ----------
function CeQuOnEst() {
  return (
    <section className="ab-sec ab-sec--cream">
      <div className="container ab-split">
        <div className="ab-split__txt ab-reveal">
          {/* récit (RETOURS-V3 §2 et §5.7 : textes validés par la direction) */}
          <Title em="de l'égalité des chances" after={null}>
            La cuisine au service
          </Title>
          <p className="ab-body">Festin utilise le levier de la cuisine comme outil d'insertion sociale et professionnelle. Festin imagine, teste, déploie et essaime des projets qui mobilisent le meilleur de la gastronomie française au service de l'égalité des chances.</p>
          <p className="ab-body">Notre développement s'est construit dans la durée, à partir d'un ancrage territorial fort, d'une capacité d'innovation reconnue et d'une articulation concrète entre utilité sociale, activité économique et transformation des pratiques.</p>
          <p className="ab-body">Tout commence à Marseille en 1987, sous le nom de Départ ; le nom de Festin arrive en 2022. Le premier projet, La Table de Cana Marseille, ouvre en 1992 : un traiteur où des salariés en insertion apprennent la cuisine en travaillant. Cet écosystème s'appuie aujourd'hui sur plusieurs projets structurants.</p>
          <window.Preuves lignes={["En 2025, nous avons accompagné <b>441 personnes</b> dans <b>14 territoires</b>."]}
            source="Source : rapport d'activité Festin 2025, tous projets confondus." />
          <a className="lnk ab-lnk" href="#/impact">Tous nos chiffres depuis 2022 <span className="arrow" aria-hidden="true">→</span></a>
        </div>
        <figure className="ab-split__photo ab-reveal">
          <window.Picture src='images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg' alt="Grandes tablées du premier Grand Festin, à Arles, en 2024" sizes="(max-width: 899px) 100vw, 60vw" />
        </figure>
      </div>
    </section>
  );
}

// ---------- 2. TROIS MARQUEURS — exigence, audace, convivialité (RETOURS-V3 §2, texte validé) ----------
function Marqueurs() {
  const M = window.FESTIN_DATA.about.marqueurs;
  return (
    <section className="g-sec g-sec--white ab-marq" aria-labelledby="marq-t">
      <div className="wrap">
        <window.GHead id="marq-t" split title="Trois marqueurs" accent="guident notre action."
          lede="Notre action repose sur trois marqueurs forts." />
        <ol className="ab-marq__list">
          {M.map((m, i) => (
            <li key={m.title} className={'ab-marq__it ab-marq__it--' + i + ' g-reveal'}>
              {/* « Innovation » n'est plus une étiquette isolée : elle complète le titre (retour du 07/10/2026) */}
              <h3 className="ab-marq__t">{m.title}{m.accent && <> <em>{m.accent}</em></>}</h3>
              <p>{m.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------- 2 bis. PROJET SOCIAL — le portage associatif, dit une fois (retours du 01/10/2026) ----------
function ProjetSocial() {
  return (
    <section className="g-sec g-sec--gold" aria-labelledby="social-t">
      <div className="wrap">
        <window.GHead id="social-t" split title="Un projet social," accent="à but non lucratif."
          lede="Le restaurant, le traiteur, les formations : toutes nos activités sont des supports d'insertion, menées dans l'intérêt général." />
        <window.Cartes items={[
          { color: 'var(--teal)', title: "Des supports d'insertion", desc: "Chaque activité existe pour former des personnes et les mener jusqu'à l'emploi." },
          { color: 'var(--gold-ink)', title: 'Au service de la mission sociale', desc: "L'association Festin est actionnaire largement majoritaire de chacune d'elles, ce qui garantit que l'activité économique est pleinement au service de la mission sociale." },
          { color: 'var(--coral-ink)', title: "Au service de l'insertion", desc: "Les bénéfices servent à l'insertion des personnes que nous accompagnons." },
        ]} />
      </div>
    </section>
  );
}

// ---------- 3. HISTOIRE — la frise partagée (même grammaire que l'accueil et les projets) ----------
// Frise chronologique en couleur, épinglée au bureau (rétablie d'après les retours du 25/09/2026)
// Partagée avec l'accueil (window.JalonsCouleur) : sur l'accueil, chaque carte mène à un projet.
function JalonsCouleur({ jalons, title, em, lede, word = 'HISTOIRE', label, id }) {
  const root = useRef(null), track = useRef(null), wordRef = useRef(null);
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap } = window;
    const mm = gsap.matchMedia();
    mm.add('(min-width:900px) and (prefers-reduced-motion:no-preference)', () => {
      const el = root.current;
      el.classList.add('is-pinned');
      const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth + 48);
      gsap.to(track.current, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true } });
      gsap.to(wordRef.current, { x: () => -dist() * .35, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: () => '+=' + dist(), scrub: true, invalidateOnRefresh: true } });
      return () => el.classList.remove('is-pinned');
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="ab-hist ab-sec--dark on-dark" id={id} ref={root}>
      {/* mot décoratif rendu en CSS : ce n'est pas du texte (contraste volontairement faible) */}
      <div className="ab-hist__word" ref={wordRef} aria-hidden="true" data-word={word} />
      <div className="container ab-hist__head">
        <Title em={em}>{title}</Title>
        {lede && <p className="ab-hist__lede">{lede}</p>}
      </div>
      <div className="ab-hist__viewport">
        <ol className="ab-hist__track" ref={track} tabIndex={0} aria-label={label}>
          {jalons.map((j, i) => (
            <li key={i} className={'ab-jalon' + (j.dark ? ' is-dark-text' : '') + (j.href ? ' is-link' : '')} style={{ background: j.color }}>
              <div className="ab-jalon__top">
                <span className="ab-jalon__year">{j.year}</span>
                {j.logo && <span className="ab-jalon__logo"><img src={encodeURI(decodeURI(j.logo))} alt="" loading="lazy" /></span>}
              </div>
              <div className="ab-jalon__body">
                <h3>{j.href ? <a className="ab-jalon__lnk" href={j.href}>{j.title}</a> : j.title}</h3>
                <p>{j.desc}</p>
                {j.href && <span className="ab-jalon__go" aria-hidden="true">Découvrir <span className="arrow">→</span></span>}
              </div>
              {j.photo && <span className="ab-jalon__img"><window.Picture src={j.photo} alt="" sizes="(max-width: 899px) 60vw, 30vw" /></span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
window.JalonsCouleur = JalonsCouleur;

function Histoire() {
  // Frise propre à Qui sommes-nous (retours du 02/10/2026) : une ligne par année,
  // les créations de projet en grandes cartes, les reconnaissances en étiquettes or.
  const J = window.FESTIN_DATA.about.jalons;
  const ans = [...new Set(J.map((j) => j.year))];
  return (
    <section className="g-sec g-sec--white ab-fr" aria-labelledby="ab-fr-t">
      <div className="wrap">
        <window.GHead id="ab-fr-t" split title="L'insertion par la cuisine" accent="depuis 1987."
          lede="Les projets que Festin a lancés, et les reconnaissances reçues en chemin." />
        <ul className="ab-fr__leg" aria-hidden="true"><li className="is-p">Création</li><li className="is-r">Reconnaissance</li></ul>
        <ol className="ab-fr__list">
          {ans.map((y) => {
            const items = J.filter((j) => j.year === y);
            return (
              <li className="ab-fr__an g-reveal" key={y}>
                <span className="ab-fr__y">{y}</span>
                <div className="ab-fr__items">
                  {items.filter((j) => j.type === 'projet').map((j) => {
                    const In = (
                      <>
                        {j.photo && <span className="ab-fr__img"><window.Picture src={j.photo} alt="" sizes="160px" /></span>}
                        <span className="ab-fr__b"><span className="ab-fr__k">{j.label || "Création"}</span><b>{j.title}</b><span>{j.desc}</span></span>
                      </>
                    );
                    return j.href
                      ? <a key={j.title} className="ab-fr__p" href={j.href}>{In}<span className="ab-fr__go" aria-hidden="true">→</span></a>
                      : <div key={j.title} className="ab-fr__p">{In}</div>;
                  })}
                  {items.filter((j) => j.type === 'reco').map((j) => (
                    <div key={j.title} className="ab-fr__r"><span className="ab-fr__k">Reconnaissance</span><b>{j.title}</b><span>{j.desc}</span></div>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

// ---------- 4. ÉQUIPE — carrousel draggable groupé par pôle ----------

// ---------- 4. ÉQUIPE — carrousel draggable groupé par pôle ----------
function Equipe() {
  const poles = window.FESTIN_DATA.about.poles;
  const track = useRef(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [active, setActive] = useState(null);
  // filtre par projet (RETOURS-V3 §5.8)
  const [filtre, setFiltre] = useState('all');
  const vus = filtre === 'all' ? poles : poles.filter((p) => p.key === filtre);
  const choisir = (k) => { setFiltre(k); setActive(null); if (track.current) track.current.scrollLeft = 0; };

  const scrollBy = useCallback((dir) => {
    const t = track.current; if (!t) return;
    t.scrollBy({ left: dir * Math.max(260, t.clientWidth * .6), behavior: RM() ? 'auto' : 'smooth' });
  }, []);
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollBy(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollBy(-1); }
  };
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return;   // tactile : scroll natif + snap
    const t = track.current, d = drag.current;
    d.down = true; d.moved = false; d.x = e.clientX; d.left = t.scrollLeft;
    t.classList.add('is-drag');
  };
  const onMove = (e) => {
    const d = drag.current; if (!d.down) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    track.current.scrollLeft = d.left - dx;
  };
  const onUp = () => { drag.current.down = false; track.current && track.current.classList.remove('is-drag'); };
  const onClickCapture = (e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } };

  return (
    <section className="ab-sec ab-sec--cream ab-team">
      <div className="container ab-team__head">
        <div>
          <Title em="Festin">Les visages de</Title>
          <div className="filters ab-team__filters" role="group" aria-label="Filtrer l'équipe par projet">
            <button type="button" className={'filter' + (filtre === 'all' ? ' active' : '')} aria-pressed={filtre === 'all'} onClick={() => choisir('all')}>Tous</button>
            {poles.map((p) => (
              <button type="button" key={p.key} className={'filter' + (filtre === p.key ? ' active' : '')} aria-pressed={filtre === p.key} onClick={() => choisir(p.key)}>{p.label}</button>
            ))}
          </div>
        </div>
        <div className="ab-arrows">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Équipe : précédent">←</button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Équipe : suivant">→</button>
        </div>
      </div>
      <div className="ab-team__track" ref={track} tabIndex={0} role="region" aria-label="Équipe Festin, défilement horizontal (flèches gauche et droite)"
           onKeyDown={onKey} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onClickCapture={onClickCapture}>
        {vus.map(p => (
          <React.Fragment key={p.key}>
            <div className="ab-pole" style={{ '--pc': p.color }}><span>{p.label}</span></div>
            {p.members.map((m, i) => {
              const id = p.key + i;
              return (
                <button type="button" key={id} className={'ab-member' + (active === id ? ' is-open' : '')} style={{ '--pc': p.color }}
                        onClick={() => setActive(a => a === id ? null : id)} aria-pressed={active === id}>
                  <span className="ab-member__frame">
                    {m.photo ? <img src={src(m.photo)} alt={m.name} loading="lazy" draggable="false" />
                    : m.avatar ? <span className="ab-member__ph ab-member__ph--avatar"><img src={src(m.avatar)} alt={m.name} loading="lazy" draggable="false" /></span>
                             : window.FESTIN_SHOW_PLACEHOLDERS
                               ? <span className="ab-member__ph is-placeholder">[PHOTO MANQUANTE : portrait de {m.name}, buste, vertical]</span>
                               : <span className="ab-member__ph ab-member__ph--ini" aria-hidden="true">{m.name.split(' ').filter(w => /^[A-ZÀ-Ý]/.test(w)).map(w => w[0]).slice(0, 2).join('')}</span>}
                    <span className="ab-member__role"><span>{p.label}</span>{m.role}</span>
                  </span>
                  <span className="ab-member__name">{m.name}</span>
                </button>
              );
            })}
          </React.Fragment>
        ))}
        <span className="ab-team__end" aria-hidden="true" />
      </div>
      <div className="container ab-gov">
        <h3 className="ab-gov__title">Gouvernance</h3>
        <ul className="ab-gov__list">
          {window.FESTIN_DATA.about.gouvernance.map(g => (
            <li key={g.name} className="ab-gov__item">
              <span className="ab-gov__avatar">{g.avatar ? <img src={src(g.avatar)} alt={g.name} loading="lazy" /> : <span aria-hidden="true">{g.name.split(' ').filter(w => /^[A-ZÀ-Ý]/.test(w)).map(w => w[0]).slice(0, 2).join('')}</span>}</span>
              <span><strong>{g.name}</strong><span>{g.role}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- 5. VALEURS — cartes claires numérotées ----------

// ---------- 6. PARTENAIRES — une grille fixe : 7 logos n'ont pas besoin de défiler ----------
const ABOUT_LOGOS = window.FESTIN_DATA.about.partenaires;
// Sphère des partenaires : les logos fournis seulement (08/10/2026). Les partenaires sans logo
// (about.partenairesDEF, projets[].partenaires) restent dans les données, hors affichage, jusqu'à réception des fichiers.
const SPHERE_PARTENAIRES = ABOUT_LOGOS.map((l) => ({ src: src(l.src), alt: l.alt }));
// L'édito à gauche, les partenaires à droite (retours du 30/09/2026)
function EditoPartenaires() {
  return (
    <section className="g-sec g-sec--cream ab-edp" aria-label="Le mot de la direction et nos partenaires">
      <div className="container ab-edp__grid">
        <div className="ab-edp__edito">
          <MotDirecteur />
        </div>
        <div className="ab-edp__logos">
          <h2 className="ab-logos__t" id="partenaires-t">Ils travaillent avec nous</h2>
          <window.ImgSphere logos size={480} tileRatio={0.155} radiusRatio={0.42} autoSpeed={0.22} label="Nos partenaires" images={SPHERE_PARTENAIRES} />
        </div>
      </div>
    </section>
  );
}
function Partenaires() {
  return (
    <section className="g-sec g-sec--cream g-sec--tight" aria-labelledby="partenaires-t">
      <div className="container">
        <h2 className="ab-logos__t" id="partenaires-t">Ils travaillent avec nous</h2>
        <ul className="ab-logos__grid">
          {ABOUT_LOGOS.map((l) => <li key={l.src}><img src={src(l.src)} alt={l.alt} loading="lazy" /></li>)}
        </ul>
      </div>
    </section>
  );
}

// ---------- 6 bis. LE MOT DE LA DIRECTION — extraits mot pour mot de l'édito du rapport d'activité 2025 (pp. 2-3), signé par ses trois auteurs ----------
function MotDirecteur() {
  return (
<section className="ab-mot">
    <div className="container ab-mot__in">
      <blockquote className="ab-mot__q">
        <p>L'excellence et la solidarité ne sont pas des mondes séparés. La haute gastronomie
        peut être un puissant levier d'insertion pour des personnes éloignées de l'emploi.
        Mieux&nbsp;: elle en est souvent la condition de réussite. […] En cuisine comme ailleurs,
        viser haut n'exclut pas&nbsp;: cela élève. Cela redonne confiance, structure les parcours,
        ouvre des perspectives professionnelles solides et reconnues.</p>
        {/* 2e et 3e paragraphes retirés (RETOURS-AUDIT §2.10) ; le reste est mot pour mot */}
        <footer className="ab-mot__sig">
          <strong>Jérôme Schatzman, Armand Hurault, Marine Vever</strong>
          <span>Président, directeur général et directrice adjointe de Festin, édito du rapport d'activité 2025</span>
        </footer>
      </blockquote>
    </div>
  </section>
  );
}

// ---------- 7. S'ENGAGER — photo plein cadre, 3 entrées par profil ----------
function Engager() {
  const cards = [
    { profile: "Vous êtes restaurateur", title: "Recruter et former vos équipes", cta: "Voir ce que nous proposons", href: "#/restauration" },
    { profile: "Vous êtes partenaire ou mécène", title: "Financer une promotion ou un projet", cta: "Nous écrire", href: "#/contact" },
    { profile: "Vous cherchez un métier", title: "Rejoindre une promotion", cta: "Voir les formations gratuites", href: "#/insertion" },
  ];
  return (
    <section className="ab-engage">
      <window.Picture imgClassName="ab-engage__bg" src='images/photo-groupe-portrait.jpg' alt="" sizes="100vw" />
      <div className="ab-engage__veil" />
      <div className="container ab-engage__in">
        <Title em="côtés" className="ab-title--xl">S'engager à nos</Title>
        <ul className="ab-engage__cards">
          {cards.map((c, i) => (
            <li key={i}><a href={c.href}>
              <span className="ab-engage__profile">{c.profile}</span>
              <span className="ab-engage__t">{c.title}</span>
              <span className="ab-engage__cta">{c.cta} <span aria-hidden="true">→</span></span>
            </a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- PAGE ----------
function AboutPage() {
  const root = useRef(null);
  window.useGReveal(root);
  useEffect(() => {
    // apparitions : une seule intention, révéler
    const els = root.current.querySelectorAll('.ab-reveal');
    if (RM() || !window.ScrollTrigger) { els.forEach(e => e.classList.add('is-in')); return; }
    const triggers = [...els].map(el => window.ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('is-in') }));
    // les pins/images modifient les hauteurs : recalcul une fois tout monté
    const refresh = () => window.ScrollTrigger.refresh();
    const t = setTimeout(refresh, 150);
    window.addEventListener('load', refresh);
    return () => { clearTimeout(t); window.removeEventListener('load', refresh); triggers.forEach(tr => tr.kill()); };
  }, []);
  return (
    <div className="about gpage" ref={root} data-screen-label="04 Qui sommes-nous">
      <AboutHero />
      <CeQuOnEst />
      <Marqueurs />
      <ProjetSocial />
      {/* frise retirée (PROPOSITIONS-V4, question 4, réponse A) : une seule liste de reconnaissances, sur Impact */}
      <Equipe />
      <EditoPartenaires />
    </div>
  );
}
window.AboutPage = AboutPage;
})();
