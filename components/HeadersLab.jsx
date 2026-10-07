// HeadersLab.jsx — route de comparaison #/headers (branche headers-propositions).
// Deuxième tour (07/10/2026) : « une grande photo, grande hauteur, le cartouche en superposition dessus ».
// Trois propositions distinctes × trois familles (accueil, section, formation), contenu réel.
// Aucune page du site n'est modifiée : tout est préfixé hy- et ne vit que sur cette route.
const { useEffect: hyUseEffect, useRef: hyUseRef, useState: hyUseState } = React;

function hyData() {
  const D = window.FESTIN_DATA;
  const vss = D.formations.find((f) => f.id === 'vss');
  return {
    accueil: {
      tone: 'deep', img: D.home.hero.img, alt: D.home.hero.imgAlt, pos: '50% 40%',
      tagline: "Mettre la restauration au service de l'égalité des chances.",
      ins: D.home.hero.ctaPrimary, pro: D.home.hero.ctaSecondary,
    },
    section: {
      tone: 'teal', img: 'images/photo-tabliers-violets.jpg', alt: 'Des apprenties du dispositif Des Étoiles et des Femmes en cuisine', pos: '50% 30%',
      crumb: ['Accueil', "L'insertion"], title: 'Un métier en cuisine,', accent: "et quelqu'un à vos côtés.", cta: 'Vérifier mon éligibilité',
    },
    formation: {
      tone: 'gold', img: vss.img, alt: 'Une participante prend la parole au micro pendant une rencontre', pos: '55% 26%',
      crumb: ['Accueil', 'Pour le secteur', 'Formation'], title: 'Prévention des violences', accent: 'sexistes et sexuelles en restauration',
      faits: [['Durée', vss.dureeCourte], ['Format', 'Dans vos murs ou en inter'], ['Public', vss.publicLabel], ['Proposée par', 'le programme Restaure']],
    },
  };
}

function HyBarre() {
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
function HyCrumb({ items }) {
  return (
    <nav className="hy__crumb" aria-label="Fil d'Ariane">
      {items.map((c, i) => <React.Fragment key={i}>{i > 0 && <span aria-hidden="true"> / </span>}{i < items.length - 1 ? <a href="#/">{c}</a> : <span aria-current="page">{c}</span>}</React.Fragment>)}
    </nav>
  );
}
function HyPortes({ d }) {
  return (
    <div className="hy__portes">
      <a className="hx-porte hx-porte--ins" href="#/insertion"><small>{d.ins.k}</small><span className="hx-l">{d.ins.label}{' '}<span aria-hidden="true">→</span></span></a>
      <a className="hx-porte hx-porte--pro" href="#/restauration"><small>{d.pro.k}</small><span className="hx-l">{d.pro.label}{' '}<span aria-hidden="true">→</span></span></a>
    </div>
  );
}
function HyFaits({ faits }) {
  return <dl className="hy__faits">{faits.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>;
}

// Un header : la photo en fond, le cartouche posé dessus. v = a | b | c ; fam = accueil | section | formation
function Hy({ v, fam, d }) {
  const x = d[fam];
  const sombre = x.tone !== 'gold';
  const titre = fam === 'accueil'
    ? <h2 className="hy__t hy__t--xl">Le goût d'avancer <em>ensemble.</em></h2>
    : <h2 className="hy__t">{x.title} <em>{x.accent}</em></h2>;
  const bouton = fam === 'section'
    ? <a className="btnb btnb--light" href="#/insertion">{x.cta} <span className="arrow" aria-hidden="true">→</span></a>
    : fam === 'formation' ? <a className="btnb btnb--teal" href="#/contact/former">Plus d'informations <span className="arrow" aria-hidden="true">→</span></a> : null;
  return (
    <header className={'hy hy--' + v + ' hy--' + fam}>
      <HyBarre />
      <figure className="hy__photo"><window.Picture src={x.img} alt={x.alt} sizes="100vw" loading={fam === 'accueil' ? 'eager' : 'lazy'} style={{ objectPosition: x.pos }} /></figure>
      <div className={'hy__cart hy__cart--' + x.tone + (sombre ? ' on-dark' : '')}>
        <div className="hy__in">
          <div className="hy__txt">
            {x.crumb && <HyCrumb items={x.crumb} />}
            {titre}
            {fam === 'accueil' && <p className="hy__tag">{x.tagline}</p>}
            {bouton && <div className="hy__cta">{bouton}</div>}
          </div>
          {fam === 'formation' && <HyFaits faits={x.faits} />}
          {fam === 'accueil' && <HyPortes d={x} />}
        </div>
      </div>
    </header>
  );
}

function HyCadre({ titre, children }) {
  const ref = hyUseRef(null);
  const [h, setH] = hyUseState(null);
  hyUseEffect(() => {
    const el = ref.current && ref.current.querySelector('.hy');
    if (!el || !window.ResizeObserver) return;
    const ro = new ResizeObserver(() => setH(Math.round(el.getBoundingClientRect().height)));
    ro.observe(el); return () => ro.disconnect();
  }, []);
  return (
    <section className="hx-cadre" aria-label={titre}>
      <div className="hx-cadre__lbl"><b>{titre}</b><span>Hauteur à cette largeur : {h ? h + ' px' : '…'}</span></div>
      <div className="hx-cadre__vue" ref={ref}>{children}</div>
    </section>
  );
}

const HY_PROPS = [
  { v: 'a', nom: 'Le cartouche en coin', principe: "La photo en plein cadre, très haute ; un cartouche compact posé en bas à gauche, comme une étiquette sur l'image." },
  { v: 'b', nom: 'Le panneau', principe: "La photo en plein cadre ; un panneau de couleur, pleine hauteur, couvre le tiers gauche. Le titre et l'action s'y empilent ; la photo respire sur les deux tiers droits." },
  { v: 'c', nom: 'Le bandeau', principe: "La photo en plein cadre ; un bandeau de couleur traverse le bas de l'image de bord à bord, titre à gauche, action ou faits à droite." },
];

function HeadersLab() {
  const d = hyData();
  hyUseEffect(() => {
    document.documentElement.classList.add('hx-lab');
    // Mouvement : le cartouche se pose sur la photo, une fois ; rien en mouvement réduit
    const g = window.gsap; let mm = null;
    if (g && g.matchMedia) {
      mm = g.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        g.utils.toArray('.hy').forEach((h) => {
          g.from(h.querySelector('.hy__cart'), { y: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: window.ScrollTrigger ? { trigger: h, start: 'top 75%', once: true } : undefined });
        });
      });
    }
    return () => { document.documentElement.classList.remove('hx-lab'); if (mm) mm.revert(); };
  }, []);
  const fams = [['accueil', 'Accueil'], ['section', "Section : L'insertion"], ['formation', 'Formation : Prévention des violences (pro)']];
  return (
    <div className="hx-lab-page" data-screen-label="Comparaison des headers">
      <div className="hx-intro">
        <div className="hx-wrap">
          <h1>Headers, deuxième tour : la grande photo et le cartouche dessus</h1>
          <p>Trois propositions, chacune en trois familles. La photo en plein cadre, sans voile ; le texte toujours sur un aplat de couleur, jamais sur l'image. Rien n'est appliqué au site.</p>
          <ol>{HY_PROPS.map((p) => <li key={p.v}><b>{p.v.toUpperCase()}. {p.nom}</b> : {p.principe}</li>)}</ol>
        </div>
      </div>
      {HY_PROPS.map((p) => (
        <div className="hx-prop" id={'hy-' + p.v} key={p.v}>
          <div className="hx-prop__t"><div className="hx-wrap"><h2>{p.v.toUpperCase()} · {p.nom}</h2><p>{p.principe}</p></div></div>
          {fams.map(([fam, lbl]) => (
            <HyCadre key={fam} titre={p.v.toUpperCase() + ' · ' + lbl}><Hy v={p.v} fam={fam} d={d} /></HyCadre>
          ))}
        </div>
      ))}
    </div>
  );
}
window.HeadersLab = HeadersLab;
