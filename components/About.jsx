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
  const root = useRef(null);
  useEffect(() => {
    if (RM() || !window.gsap) return;
    const { gsap } = window;
    const ctx = gsap.context(() => {
      gsap.from('.ab-hero__bg img', { scale: 1.14, duration: 1.8, ease: 'expo.out' });
      gsap.from('.ab-hero__inner > *', { y: 36, opacity: 0, duration: 1, ease: 'expo.out', stagger: .1, delay: .15 });
      gsap.to('.ab-hero__bg', { yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="ab-hero on-dark" ref={root}>
      <div className="ab-hero__bg" aria-hidden="true">
        <window.Picture src={HERO_IMG} alt="" sizes="100vw" loading="eager" />
      </div>
      <div className="container ab-hero__inner">
        <nav className="breadcrumb" aria-label="Fil d'Ariane"><a href="#/">Accueil</a><span className="breadcrumb__sep">/</span><span>Qui sommes-nous</span></nav>
        <span className="ab-eyebrow ab-eyebrow--gold">L'association Festin</span>
        <h1 className="ab-title ab-title--hero">Former, inclure, <em>transformer.</em></h1>
      </div>
    </section>
  );
}

// ---------- 1. CE QU'ON EST — split asymétrique, photo débordante, vignette dans le titre ----------
function CeQuOnEst() {
  return (
    <section className="ab-sec ab-sec--cream">
      <div className="container ab-split">
        <div className="ab-split__txt ab-reveal">
          <Title em="un métier" after={null}>
            Des cuisines où l'on <span className="ab-thumb"><img src={src('images/photo-cuisine-action.jpg')} alt="" loading="lazy" /></span> apprend
          </Title>
          <p className="ab-body">L'association est créée en 1987. Son premier projet, La Table de Cana, ouvre à Marseille en 1993 : un traiteur où des salariés en insertion apprennent la cuisine en travaillant. Festin porte aujourd'hui cinq projets, du restaurant des Baumettes au programme national Restaure. Tous relèvent d'une association loi 1901, à but non lucratif et d'intérêt général, agréée ESUS.</p>
        </div>
        <figure className="ab-split__photo ab-reveal">
          <window.Picture src='images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg' alt="Grandes tablées du premier Grand Festin, à Arles, en 2024" sizes="(max-width: 899px) 100vw, 60vw" />
        </figure>
      </div>
    </section>
  );
}

// ---------- 2. CHIFFRES — une couleur par chiffre, filets verticaux, compteur ----------
function Chiffres() {
  const root = useRef(null);
  const stats = window.FESTIN_DATA.stats.slice(0, 4);
  const colors = ['var(--teal)', 'var(--coral)', 'var(--violet)', 'var(--gold-ink)'];
  useEffect(() => {
    if (RM() || !window.gsap) return;
    const { gsap } = window;
    const ctx = gsap.context(() => {
      root.current.querySelectorAll('[data-count]').forEach(el => {
        const end = parseFloat(el.dataset.count), o = { v: 0 };
        el.textContent = '0';
        gsap.to(o, { v: end, duration: 1.6, ease: 'expo.out', onUpdate: () => { el.textContent = Math.round(o.v); },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="ab-sec ab-sec--white" ref={root}>
      <div className="container">
        <ul className="ab-stats">
          {stats.map((s, i) => (
            <li key={i} className="ab-stat">
              <div className="ab-stat__v" style={{ color: colors[i] }}>
                <span data-count={s.value}>{s.value}</span><span className="ab-stat__u">{s.unit}</span>
              </div>
              <div className="ab-stat__l">{s.label}</div>
            </li>
          ))}
        </ul>
        <p className="ab-src">Source : rapport d'activité Festin 2025. Taux de sortie : tous dispositifs confondus ; taux de réussite : Des Étoiles et des Femmes. <a href="#/impact">Tous nos chiffres depuis 2022</a></p>
      </div>
    </section>
  );
}

// ---------- 3. HISTOIRE — scroll horizontal épinglé (desktop), frise verticale (mobile) ----------
function Histoire() {
  const root = useRef(null), track = useRef(null), word = useRef(null);
  const jalons = window.FESTIN_DATA.about.jalons;
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
      gsap.to(word.current, { x: () => -dist() * .35, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: () => '+=' + dist(), scrub: true, invalidateOnRefresh: true } });
      return () => el.classList.remove('is-pinned');
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="ab-hist ab-sec--dark" ref={root}>
      <div className="ab-hist__word" ref={word} aria-hidden="true">HISTOIRE</div>
      <div className="container ab-hist__head">
        <Title em="1987.">L'insertion par la cuisine depuis</Title>
      </div>
      <div className="ab-hist__viewport">
        <ol className="ab-hist__track" ref={track}>
          {jalons.map((j, i) => (
            <li key={i} className={'ab-jalon' + (j.dark ? ' is-dark-text' : '')} style={{ background: j.color }}>
              <span className="ab-jalon__year">{j.year}</span>
              <div className="ab-jalon__body">
                <h3>{j.title}</h3>
                <p>{j.desc}</p>
              </div>
              {j.photo && <span className="ab-jalon__img"><window.Picture src={j.photo} alt="" sizes="(max-width: 899px) 60vw, 30vw" /></span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------- 4. ÉQUIPE — carrousel draggable groupé par pôle ----------
function Equipe() {
  const poles = window.FESTIN_DATA.about.poles;
  const track = useRef(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [active, setActive] = useState(null);

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
        </div>
        <div className="ab-arrows">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Équipe : précédent">←</button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Équipe : suivant">→</button>
        </div>
      </div>
      <div className="ab-team__track" ref={track} tabIndex={0} role="region" aria-label="Équipe Festin, défilement horizontal (flèches gauche et droite)"
           onKeyDown={onKey} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onClickCapture={onClickCapture}>
        {poles.map(p => (
          <React.Fragment key={p.key}>
            <div className="ab-pole" style={{ '--pc': p.color }}><span>{p.label}</span></div>
            {p.members.map(m => {
              const id = p.key + m.name;
              return (
                <button type="button" key={id} className={'ab-member' + (active === id ? ' is-open' : '')} style={{ '--pc': p.color }}
                        onClick={() => setActive(a => a === id ? null : id)} aria-pressed={active === id}>
                  <span className="ab-member__frame">
                    {m.photo ? <img src={src(m.photo)} alt={m.name} loading="lazy" draggable="false" />
                    : m.avatar ? <span className="ab-member__ph ab-member__ph--avatar"><img src={src(m.avatar)} alt={m.name} loading="lazy" draggable="false" /></span>
                             : window.FESTIN_SHOW_PLACEHOLDERS
                               ? <span className="ab-member__ph is-placeholder">[PHOTO MANQUANTE : portrait de {m.name}, buste, vertical]</span>
                               : <span className="ab-member__ph ab-member__ph--ini" aria-hidden="true">{m.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>}
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
        <h3 className="ab-gov__title">Le bureau de l'association</h3>
        <ul className="ab-gov__list">
          {window.FESTIN_DATA.about.gouvernance.map(g => (
            <li key={g.name} className="ab-gov__item">
              <span className="ab-gov__avatar">{g.avatar ? <img src={src(g.avatar)} alt={g.name} loading="lazy" /> : <span aria-hidden="true">{g.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>}</span>
              <span><strong>{g.name}</strong><span>{g.role}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- 5. VALEURS — pile de 3 cartes qui se déploie au scroll ----------
function Valeurs() {
  const root = useRef(null);
  const valeurs = window.FESTIN_DATA.about.valeurs;
  const rest = [-2.5, 1.5, -1.5];
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap } = window;
    const mm = gsap.matchMedia();
    mm.add('(min-width:900px) and (prefers-reduced-motion:no-preference)', () => {
      const cards = gsap.utils.toArray('.ab-val', root.current);
      cards.forEach((c, i) => {
        gsap.fromTo(c,
          { x: () => -(c.offsetLeft - cards[0].offsetLeft) + i * 18, y: i * 14, rotation: [-6, 4, -3][i] * 1.4, scale: .96 },
          { x: 0, y: 0, rotation: rest[i], scale: 1, ease: 'none', immediateRender: true,
            scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'top 20%', scrub: .5, invalidateOnRefresh: true } });
      });
    });
    mm.add('(max-width:899px), (prefers-reduced-motion:reduce)', () => {
      gsap.utils.toArray('.ab-val', root.current).forEach((c, i) => gsap.set(c, { rotation: rest[i] }));
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="ab-sec ab-sec--white" ref={root}>
      <div className="container">
        <div className="ab-head">
          <Title em="choix">Ce qui guide nos</Title>
        </div>
        <div className="ab-vals">
          {valeurs.map((v, i) => (
            <article key={i} className={'ab-val' + (v.dark ? ' is-dark-text' : '')} style={{ background: v.color, zIndex: 3 - i }}>
              <span className="ab-val__n">0{i + 1}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 6. PARTENAIRES — même hauteur optique, monochrome, couleur + pause au survol ----------
const ABOUT_LOGOS = window.FESTIN_DATA.about.partenaires;
function Partenaires() {
  const row = (hidden) => ABOUT_LOGOS.map((l, i) => (
    <li key={(hidden ? 'b' : 'a') + i} className="ab-logo" aria-hidden={hidden || undefined}>
      <img src={src(l.src)} alt={hidden ? '' : l.alt} loading="lazy" />
    </li>
  ));
  return (
    <section className="ab-sec ab-sec--cream ab-logos">
      <div className="container"><span className="ab-eyebrow ab-eyebrow--center">Ils nous font confiance</span></div>
      <div className="ab-logos__mask" data-marquee>
        <window.MarqueePause label="des logos partenaires" />
        <ul className="ab-logos__track">{row(false)}{row(true)}</ul>
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
        <p>La construction collective n'est pas un coût, c'est un levier. Un levier puissant contre
        la concurrence stérile, contre la dispersion des énergies, contre l'isolement des initiatives.
        Le collectif permet de mutualiser, d'apprendre, d'amplifier. Il permet surtout de durer
        et de transformer en profondeur.</p>
        <p>C'est pour cela que «&nbsp;Le Goût d'avancer ensemble&nbsp;», pour Festin, n'est pas
        qu'un slogan. C'est une méthode, une exigence, une responsabilité.</p>
        <footer className="ab-mot__sig">
          <strong>Jérôme Schatzman, Armand Hurault, Marine Vever</strong>
          <span>Président, directeur général et directrice adjointe de Festin — édito du rapport d'activité 2025</span>
        </footer>
      </blockquote>
    </div>
  </section>
  );
}

// ---------- 7. S'ENGAGER — photo plein cadre, 3 entrées par profil ----------
function Engager() {
  const cards = [
    { profile: "Vous êtes restaurateur", title: "Recruter et former vos équipes", cta: "Voir ce que nous proposons", href: "#/accompagnement/professionnels" },
    { profile: "Vous êtes partenaire ou mécène", title: "Financer une promotion ou un projet", cta: "Nous écrire", href: "#/contact" },
    { profile: "Vous cherchez un métier", title: "Rejoindre une promotion", cta: "Voir les formations gratuites", href: "#/accompagnement/insertion" },
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
    <div className="about" ref={root} data-screen-label="04 Qui sommes-nous">
      <AboutHero />
      <CeQuOnEst />
      <Chiffres />
      <Histoire />
      <Equipe />
      <Valeurs />
      <Partenaires />
      <MotDirecteur />
    </div>
  );
}
window.AboutPage = AboutPage;
})();
