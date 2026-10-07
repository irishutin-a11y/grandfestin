// HeadersLab.jsx — route de comparaison #/headers (branche headers-propositions, 07/10/2026).
// Trois propositions de headers × trois familles (accueil, section, formation), contenu réel.
// Aucune page du site n'est modifiée : tout est préfixé hx- et ne vit que sur cette route.
const { useEffect: hxUseEffect, useRef: hxUseRef, useState: hxUseState } = React;

// Données réelles, lues dans FESTIN_DATA quand elles existent
function hxData() {
  const D = window.FESTIN_DATA;
  const vss = D.formations.find((f) => f.id === 'vss');
  return {
    home: {
      img: D.home.hero.img, alt: D.home.hero.imgAlt,
      tagline: "Mettre la restauration au service de l'égalité des chances.",
      ins: D.home.hero.ctaPrimary, pro: D.home.hero.ctaSecondary,
    },
    // pour la proposition 2 : les trois mondes de Festin en triptyque
    tri: [
      { img: D.home.hero.img, alt: D.home.hero.imgAlt, l: 'Les Beaux Mets' },
      { img: 'images/photo-tabliers-violets.jpg', alt: 'Des apprenties du dispositif Des Étoiles et des Femmes en cuisine', l: 'Des Étoiles et des Femmes' },
      { img: 'images/latable de cana/TABLECANA_EVENT_cdutrey_230625-5011.jpg', alt: 'Des bouchées préparées par le traiteur La Table de Cana Marseille', l: 'La Table de Cana Marseille' },
    ],
    ins: {
      img: 'images/photo-tabliers-violets.jpg', alt: 'Des apprenties du dispositif Des Étoiles et des Femmes en cuisine',
      title: 'Un métier en cuisine,', accent: "et quelqu'un à vos côtés.", cta: 'Vérifier mon éligibilité',
      crumb: "L'insertion",
      suite: { t: 'Vous orientez une personne ?', p: "Les critères d'entrée de chaque formation sont ci-dessous, dans « Pour qui » et « Pour entrer ». Pour une prescription, écrivez-nous : nous répondons sous 48 h ouvrées." },
    },
    vss: {
      img: vss.img, alt: 'Une participante prend la parole au micro pendant une rencontre',
      title: 'Prévention des violences', accent: 'sexistes et sexuelles en restauration',
      faits: [
        ['Durée', vss.dureeCourte],
        ['Format', 'Présentiel, dans vos murs ou en inter'],
        ['Public', vss.publicLabel],
        ['Proposée par', 'le programme Restaure'],
      ],
      suite: { t: 'Ce que vous apprendrez', p: vss.objectives[0] + '. ' + vss.objectives[3] + '.' },
    },
    homeSuite: { t: 'Deux publics, un même métier.', p: D.home.publics && D.home.publics.lede },
  };
}

// La barre réelle, en copie inerte, pour juger chaque header avec sa navigation
function HxBarre() {
  const B = window.FESTIN_DATA.barre || [];
  return (
    <div className="hx-barre" aria-hidden="true">
      <span className="hx-barre__logo"><img src="images/logo-festin-teal-sb.png" alt="" /></span>
      <span className="hx-barre__liens">{B.map((b) => <span key={b.href}><i style={{ background: b.c }} />{b.label}</span>)}</span>
      <span className="hx-barre__menu">Menu</span>
      <span className="hx-barre__don">Don</span>
    </div>
  );
}

function HxCrumb({ items }) {
  return (
    <nav className="hx-crumb" aria-label="Fil d'Ariane">
      {items.map((c, i) => <React.Fragment key={i}>{i > 0 && <span aria-hidden="true"> / </span>}{i < items.length - 1 ? <a href="#/">{c}</a> : <span aria-current="page">{c}</span>}</React.Fragment>)}
    </nav>
  );
}

function HxPhoto({ src, alt, className, sizes = '(max-width: 760px) 100vw, 50vw', eager }) {
  return <window.Picture src={src} alt={alt} className={className} sizes={sizes} loading={eager ? 'eager' : 'lazy'} />;
}

function HxFaits({ faits, className = '' }) {
  return (
    <dl className={'hx-faits ' + className}>
      {faits.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
    </dl>
  );
}

// Suite de page : le premier contenu réel, pour juger la transition
function HxSuite({ s, tone = 'white' }) {
  if (!s) return null;
  return (
    <div className={'hx-suite hx-suite--' + tone}>
      <div className="hx-wrap">
        <p className="hx-suite__t">{s.t}</p>
        {s.p && <p className="hx-suite__p">{s.p}</p>}
      </div>
    </div>
  );
}

// Cadre de comparaison : titre, hauteur cible, hauteur mesurée en direct
function HxCadre({ n, famille, cible, children }) {
  const ref = hxUseRef(null);
  const [h, setH] = hxUseState(null);
  hxUseEffect(() => {
    const el = ref.current && ref.current.querySelector('.hx');
    if (!el || !window.ResizeObserver) return;
    const ro = new ResizeObserver(() => setH(Math.round(el.getBoundingClientRect().height)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <section className="hx-cadre" aria-label={'Proposition ' + n + ', ' + famille}>
      <div className="hx-cadre__lbl">
        <b>{n} · {famille}</b>
        <span>Hauteur relevée : {cible}</span>
        <span>À cette largeur : {h ? h + ' px' : '…'}</span>
      </div>
      <div className="hx-cadre__vue" ref={ref}>{children}</div>
    </section>
  );
}

/* ========================================================================
   PROPOSITION 1 · L'APLAT ET LA FENÊTRE
   Le texte vit sur un aplat de la couleur du public ; la photo est une
   fenêtre à part, qui déborde sur la suite de la page. Jamais de texte sur photo.
   ======================================================================== */
function P1Accueil({ d }) {
  return (
    <header className="hx hx1 hx1--accueil hx1--deep on-dark">
      <HxBarre />
      <div className="hx-wrap hx1__grid">
        <div className="hx1__txt">
          <h2 className="hx1__t hx1__t--xl">Le goût d'avancer <em>ensemble.</em></h2>
          <p className="hx1__tag">{d.home.tagline}</p>
          <div className="hx1__portes">
            <a className="hx-porte hx-porte--ins" href="#/insertion"><small>{d.home.ins.k}</small><span className="hx-l">{d.home.ins.label}{'\u00a0'}<span aria-hidden="true">→</span></span></a>
            <a className="hx-porte hx-porte--pro" href="#/restauration"><small>{d.home.pro.k}</small><span className="hx-l">{d.home.pro.label}{'\u00a0'}<span aria-hidden="true">→</span></span></a>
          </div>
        </div>
        <figure className="hx1__fen hx1__fen--haute"><HxPhoto src={d.home.img} alt={d.home.alt} eager /></figure>
      </div>
    </header>
  );
}
function P1Section({ d }) {
  return (
    <header className="hx hx1 hx1--section hx1--teal on-dark">
      <HxBarre />
      <div className="hx-wrap hx1__grid">
        <div className="hx1__txt">
          <HxCrumb items={['Accueil', d.ins.crumb]} />
          <h2 className="hx1__t">{d.ins.title} <em>{d.ins.accent}</em></h2>
          <a className="btnb btnb--light" href="#/insertion">{d.ins.cta} <span className="arrow" aria-hidden="true">→</span></a>
        </div>
        <figure className="hx1__fen"><HxPhoto src={d.ins.img} alt={d.ins.alt} /></figure>
      </div>
    </header>
  );
}
function P1Formation({ d }) {
  return (
    <header className="hx hx1 hx1--formation hx1--gold">
      <HxBarre />
      <div className="hx-wrap hx1__grid hx1__grid--form">
        <div className="hx1__txt">
          <HxCrumb items={['Accueil', 'Pour le secteur', 'Formation']} />
          <h2 className="hx1__t hx1__t--sm">{d.vss.title} <em>{d.vss.accent}</em></h2>
          <HxFaits faits={d.vss.faits} className="hx1__faits" />
          <a className="btnb btnb--teal" href="#/contact/former">Plus d'informations <span className="arrow" aria-hidden="true">→</span></a>
        </div>
        <figure className="hx1__fen hx1__fen--carre"><HxPhoto src={d.vss.img} alt={d.vss.alt} /></figure>
      </div>
    </header>
  );
}

/* ========================================================================
   PROPOSITION 2 · LE TITRE D'ABORD, LA BANDE DESSOUS
   Un header typographique sur fond clair teinté par le public ; dessous, une
   bande qui ferme le header : photos (accueil, section) ou faits (formation).
   ======================================================================== */
function P2Accueil({ d }) {
  return (
    <header className="hx hx2 hx2--accueil hx2--neutre">
      <HxBarre />
      <div className="hx-wrap hx2__head">
        <h2 className="hx2__t hx2__t--xl">Le goût d'avancer <em>ensemble.</em></h2>
        <div className="hx2__side">
          <p className="hx2__tag">{d.home.tagline}</p>
          <div className="hx2__portes">
            <a className="hx-lien hx-lien--ins" href="#/insertion"><small>{d.home.ins.k}</small><span className="hx-l"><i className="hx-pt" aria-hidden="true" />{d.home.ins.label}{'\u00a0'}<span aria-hidden="true">→</span></span></a>
            <a className="hx-lien hx-lien--pro" href="#/restauration"><small>{d.home.pro.k}</small><span className="hx-l"><i className="hx-pt" aria-hidden="true" />{d.home.pro.label}{'\u00a0'}<span aria-hidden="true">→</span></span></a>
          </div>
        </div>
      </div>
      <ul className="hx2__tri">
        {d.tri.map((t, i) => (
          <li key={t.l} className={'hx2__tri-it hx2__tri-it--' + i}>
            <HxPhoto src={t.img} alt={t.alt} eager={i === 0} sizes="(max-width: 760px) 100vw, 33vw" />
            <span>{t.l}</span>
          </li>
        ))}
      </ul>
    </header>
  );
}
function P2Section({ d }) {
  return (
    <header className="hx hx2 hx2--section hx2--teal">
      <HxBarre />
      <div className="hx-wrap hx2__head">
        <div>
          <HxCrumb items={['Accueil', d.ins.crumb]} />
          <h2 className="hx2__t">{d.ins.title} <em>{d.ins.accent}</em></h2>
        </div>
        <div className="hx2__side hx2__side--bas">
          <a className="btnb btnb--teal" href="#/insertion">{d.ins.cta} <span className="arrow" aria-hidden="true">→</span></a>
        </div>
      </div>
      <figure className="hx2__bande"><HxPhoto src={d.ins.img} alt={d.ins.alt} sizes="100vw" /></figure>
    </header>
  );
}
function P2Formation({ d }) {
  return (
    <header className="hx hx2 hx2--formation hx2--gold">
      <HxBarre />
      <div className="hx-wrap hx2__head">
        <div>
          <HxCrumb items={['Accueil', 'Pour le secteur', 'Formation']} />
          <h2 className="hx2__t hx2__t--sm">{d.vss.title} <em>{d.vss.accent}</em></h2>
        </div>
        <div className="hx2__side hx2__side--bas">
          <a className="btnb btnb--teal" href="#/contact/former">Plus d'informations <span className="arrow" aria-hidden="true">→</span></a>
        </div>
      </div>
      <div className="hx2__bande hx2__bande--faits on-dark">
        <div className="hx-wrap"><HxFaits faits={d.vss.faits} className="hx2__faits" /></div>
      </div>
    </header>
  );
}

/* ========================================================================
   PROPOSITION 3 · LA PHOTO NUE ET LE CARTOUCHE
   La photo s'affiche sans voile, en pleine largeur et à hauteur fixe ; le titre
   est posé dans un cartouche de couleur qui chevauche le bas de la photo.
   ======================================================================== */
function P3Accueil({ d }) {
  return (
    <header className="hx hx3 hx3--accueil">
      <HxBarre />
      <figure className="hx3__photo"><HxPhoto src={d.home.img} alt={d.home.alt} sizes="100vw" eager /></figure>
      <div className="hx-wrap hx3__pose">
        <div className="hx3__cart hx3__cart--deep on-dark">
          <h2 className="hx3__t hx3__t--xl">Le goût d'avancer <em>ensemble.</em></h2>
          <p className="hx3__tag">{d.home.tagline}</p>
        </div>
        <div className="hx3__portes">
          <a className="hx-porte hx-porte--ins" href="#/insertion"><small>{d.home.ins.k}</small><span className="hx-l">{d.home.ins.label}{'\u00a0'}<span aria-hidden="true">→</span></span></a>
          <a className="hx-porte hx-porte--pro" href="#/restauration"><small>{d.home.pro.k}</small><span className="hx-l">{d.home.pro.label}{'\u00a0'}<span aria-hidden="true">→</span></span></a>
        </div>
      </div>
    </header>
  );
}
function P3Section({ d }) {
  return (
    <header className="hx hx3 hx3--section">
      <HxBarre />
      <figure className="hx3__photo"><HxPhoto src={d.ins.img} alt={d.ins.alt} sizes="100vw" /></figure>
      <div className="hx-wrap hx3__pose">
        <div className="hx3__cart hx3__cart--teal on-dark">
          <HxCrumb items={['Accueil', d.ins.crumb]} />
          <h2 className="hx3__t">{d.ins.title} <em>{d.ins.accent}</em></h2>
          <a className="btnb btnb--light" href="#/insertion">{d.ins.cta} <span className="arrow" aria-hidden="true">→</span></a>
        </div>
      </div>
    </header>
  );
}
function P3Formation({ d }) {
  return (
    <header className="hx hx3 hx3--formation">
      <HxBarre />
      <figure className="hx3__photo hx3__photo--vss"><HxPhoto src={d.vss.img} alt={d.vss.alt} sizes="100vw" /></figure>
      <div className="hx-wrap hx3__pose">
        <div className="hx3__cart hx3__cart--gold hx3__cart--form">
          <div>
            <HxCrumb items={['Accueil', 'Pour le secteur', 'Formation']} />
            <h2 className="hx3__t hx3__t--sm">{d.vss.title} <em>{d.vss.accent}</em></h2>
            <a className="btnb btnb--teal" href="#/contact/former">Plus d'informations <span className="arrow" aria-hidden="true">→</span></a>
          </div>
          <HxFaits faits={d.vss.faits} className="hx3__faits" />
        </div>
      </div>
    </header>
  );
}

const HX_PROPS = [
  { n: 1, nom: "L'aplat et la fenêtre", principe: "Le texte sur un aplat de la couleur du public, la photo dans une fenêtre à part qui déborde sur la suite.",
    cibles: ['1440 : 715 px · 360 : 717 px', '1440 : 621 px · 360 : 613 px', '1440 : 626 px · 360 : 723 px'], C: [P1Accueil, P1Section, P1Formation], suite: ['white', 'white', 'white'] },
  { n: 2, nom: "Le titre d'abord, la bande dessous", principe: "Un titre typographique sur fond clair teinté par le public ; une bande de photos ou de faits ferme le header.",
    cibles: ['1440 : 731 px · 360 : 870 px', '1440 : 718 px · 360 : 586 px', '1440 : 595 px · 360 : 669 px'], C: [P2Accueil, P2Section, P2Formation], suite: ['white', 'white', 'white'] },
  { n: 3, nom: 'La photo nue et le cartouche', principe: "La photo sans voile, à hauteur fixe ; le titre dans un cartouche de couleur qui chevauche le bas de la photo.",
    cibles: ['1440 : 760 px · 360 : 643 px', '1440 : 587 px · 360 : 523 px', '1440 : 662 px · 360 : 694 px'], C: [P3Accueil, P3Section, P3Formation], suite: ['white', 'white', 'white'] },
];

function HeadersLab() {
  const d = hxData();
  hxUseEffect(() => {
    document.documentElement.classList.add('hx-lab');
    // Mouvement : la photo (ou le cartouche) se pose une fois, à l'entrée du header dans l'écran.
    // Il révèle la relation texte / image propre à chaque proposition ; rien en mouvement réduit.
    const g = window.gsap; let mm = null;
    if (g && g.matchMedia) {
      mm = g.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        g.utils.toArray('.hx').forEach((h) => {
          const parts = h.querySelectorAll('.hx1__fen, .hx2__tri-it, .hx2__bande, .hx3__cart, .hx3__portes');
          if (!parts.length) return;
          g.from(parts, { y: 28, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: window.ScrollTrigger ? { trigger: h, start: 'top 80%', once: true } : undefined });
        });
      });
    }
    return () => { document.documentElement.classList.remove('hx-lab'); if (mm) mm.revert(); };
  }, []);
  const familles = ['Accueil', 'Section : L’insertion', 'Formation : Prévention des violences (pro)'];
  const suites = [d.homeSuite, d.ins.suite, d.vss.suite];
  return (
    <div className="hx-lab-page" data-screen-label="Comparaison des headers">
      <div className="hx-intro">
        <div className="hx-wrap">
          <h1>Trois propositions de headers</h1>
          <p>Chaque proposition est déclinée en trois familles : accueil, section, formation. Contenu et photos réels. Rien n'est appliqué au site tant qu'aucune n'est choisie.</p>
          <ol>{HX_PROPS.map((p) => <li key={p.n}><a href={'#hx-p' + p.n} onClick={(e) => { e.preventDefault(); const el = document.getElementById('hx-p' + p.n); if (el) el.scrollIntoView(); }}>{p.n}. {p.nom}</a> : {p.principe}</li>)}</ol>
        </div>
      </div>
      {HX_PROPS.map((p) => (
        <div className="hx-prop" id={'hx-p' + p.n} key={p.n}>
          <div className="hx-prop__t"><div className="hx-wrap"><h2>Proposition {p.n} · {p.nom}</h2><p>{p.principe}</p></div></div>
          {p.C.map((C, i) => (
            <HxCadre key={i} n={p.n} famille={familles[i]} cible={p.cibles[i]}>
              <C d={d} />
              <HxSuite s={suites[i]} tone={p.suite[i]} />
            </HxCadre>
          ))}
        </div>
      ))}
    </div>
  );
}
window.HeadersLab = HeadersLab;
