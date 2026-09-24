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
    <window.HeroPage tone="deep" kicker="L'association Festin" title="Former, inclure," accent="transformer."
      img={HERO_IMG} imgAlt="Une promotion de Des Étoiles et des Femmes réunie en tenue de cuisine"
      crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Qui sommes-nous' }]} />
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
          <p className="ab-body">L'association est créée en 1987. Son premier projet, La Table de Cana, ouvre à Marseille en 1993 : un traiteur où des salariés en insertion apprennent la cuisine en travaillant. Festin porte aujourd'hui six projets, qui servent trois missions : former, accompagner jusqu'à l'emploi, changer les cuisines. Tous relèvent d'une association loi 1901, à but non lucratif et d'intérêt général, agréée ESUS.</p>
          <window.Preuves lignes={["En 2025, nous avons accompagné <b>441 personnes</b> dans <b>14 territoires</b> ; <b>83 %</b> sont sorties en emploi ou en formation."]}
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

// ---------- 3. HISTOIRE — la frise partagée (même grammaire que l'accueil et les projets) ----------
function Histoire() {
  const jalons = window.FESTIN_DATA.about.jalons;
  return (
    <window.Frise id="histoire" tone="tint" title="L'insertion par la cuisine," accent="depuis 1987."
      lede="De la création de l'association à l'Académie Festin, les dates qui ont construit Festin."
      steps={jalons.map((j) => ({ when: j.year, title: j.title, text: j.desc, img: j.photo }))} />
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

// ---------- 5. VALEURS — cartes claires numérotées ----------
function Valeurs() {
  const valeurs = window.FESTIN_DATA.about.valeurs;
  const couleurs = ['var(--gold-ink)', 'var(--coral)', 'var(--violet)'];
  return (
    <section className="g-sec g-sec--white" aria-labelledby="valeurs-t">
      <div className="container">
        <window.GHead id="valeurs-t" title="Ce qui guide" accent="nos choix." />
        <window.Cartes items={valeurs.map((v, i) => ({ title: v.title, desc: v.desc, color: couleurs[i % 3] }))} />
      </div>
    </section>
  );
}

// ---------- 6. PARTENAIRES — une grille fixe : 7 logos n'ont pas besoin de défiler ----------
const ABOUT_LOGOS = window.FESTIN_DATA.about.partenaires;
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
      <window.MissionsNav title="Six projets," accent="trois missions." tone="white" />
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
