// Gabarit.jsx — briques communes du déploiement (24/09/2026, AUDIT-DEPLOIEMENT.md).
// Même grammaire que l'accueil validé : sections sur familles tonales claires,
// titres-phrases, preuves en phrases, portes après la preuve, frise partagée
// (Interactifs.jsx). Styles : styles/gabarit.css (+ .ac-porte* d'accueil.css).
(function () {
const { useEffect } = React;
const URI = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

// Défilement vers une section de la page (le routeur est par hash : pas d'ancre native)
function festinScrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: window.FESTIN_RM && window.FESTIN_RM() ? 'auto' : 'smooth', block: 'start' });
  const f = el.querySelector('a[href], button');
  if (f) setTimeout(() => f.focus({ preventScroll: true }), 900);
}

// Révélations (.g-reveal) + recalage des déclencheurs quand la hauteur change
function useGReveal(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.querySelectorAll('.g-reveal');
    const ST = window.ScrollTrigger;
    if ((window.FESTIN_RM && window.FESTIN_RM()) || !ST) { els.forEach((e) => e.classList.add('is-in')); return; }
    const tr = [...els].map((el) => ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('is-in') }));
    let t;
    const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => ST.refresh(), 160); });
    ro.observe(root);
    return () => { ro.disconnect(); clearTimeout(t); tr.forEach((x) => x.kill()); };
  }, []);
}

// Mission d'un projet (source unique : FESTIN_DATA.home.missions)
function missionDe(id) {
  const items = (window.FESTIN_DATA.home.missions || {}).items || [];
  return items.find((m) => m.projets.some((p) => p.id === id)) || null;
}

// Lien : interne, externe (nouvel onglet signalé) ou défilement dans la page
function GLink({ l, className = '', children }) {
  if (!l) return null;
  if (l.to) return <a className={className} href={'#' + l.to} onClick={(e) => { e.preventDefault(); festinScrollTo(l.to); }}>{children}</a>;
  const ext = l.external || /^https?:/.test(l.href || '');
  return (
    <a className={className} href={l.href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}{ext && <span className="sr-only"> (nouvel onglet)</span>}
    </a>
  );
}

function GHead({ id, title, accent, lede, split }) {
  return (
    <div className={'g-head g-reveal' + (split ? ' g-head--split' : '')}>
      <h2 className="g-h2" id={id}>{title}{accent && <> <em>{accent}</em></>}</h2>
      {lede && <p className="g-lede">{lede}</p>}
    </div>
  );
}

// Preuves : des phrases, chaque chiffre en gras ; la source en dessous
function Preuves({ lignes = [], source }) {
  return (
    <div className="g-preuves">
      {lignes.map((l, i) => <p className="g-preuves__l g-reveal" key={i} dangerouslySetInnerHTML={{ __html: l }} />)}
      {source && <p className="g-src">{source}</p>}
    </div>
  );
}

// Vidéo au clic : rien ne se charge avant ; lien externe si la plateforme ne s'intègre pas
function GVideo({ v, label }) {
  const [on, setOn] = React.useState(false);
  if (!v) return null;
  const src = v.drive || (v.youtube ? 'https://www.youtube-nocookie.com/embed/' + v.youtube + '?autoplay=1' : null);
  return (
    <figure className="g-video">
      <div className="g-video__frame">
        {on && src ? (
          <iframe title={'Vidéo : ' + label} src={src} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : src ? (
          <button type="button" className="g-video__play" onClick={() => setOn(true)} aria-label={'Lire la vidéo : ' + label}>
            <window.Picture src={v.poster} alt="" sizes="(max-width: 900px) 100vw, 44vw" />
            <span className="g-video__btn" aria-hidden="true"><span>▶</span> Lire la vidéo</span>
          </button>
        ) : (
          <a className="g-video__play" href={v.link} target="_blank" rel="noopener noreferrer">
            <window.Picture src={v.poster} alt="" sizes="(max-width: 900px) 100vw, 44vw" />
            <span className="g-video__btn"><span aria-hidden="true">▶</span> {v.linkLabel || 'Voir la vidéo'}<span className="sr-only"> (nouvel onglet)</span></span>
          </a>
        )}
      </div>
      {v.credit && <figcaption className="g-cap">{v.credit}</figcaption>}
    </figure>
  );
}

// Portes : deux publics à parts égales, puis « agir avec nous »
function Portes({ id = 'portes', title = 'Par où', accent = 'commencer ?', portes = [], agir, tone = 'cream' }) {
  const D = window.FESTIN_DATA;
  return (
    <section className={'g-sec g-sec--' + tone} id={id} aria-labelledby={id + '-t'}>
      <div className="wrap">
        <GHead id={id + '-t'} title={title} accent={accent} />
        <div className={'ac-portes__grid' + (agir ? '' : ' ac-portes__grid--duo')}>
          {portes.map((c) => (
            <GLink key={c.title} l={c} className="ac-porte g-reveal">
              <span className="ac-porte__img">
                <window.Picture src={c.img} alt="" sizes="(max-width: 820px) 100vw, 38vw" />
                <span className="ac-porte__tag">{c.tag}</span>
              </span>
              <span className="ac-porte__t">{c.title}</span>
              <ul className="ac-porte__pts">{c.pts.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              <span className="lnk ac-porte__go">{c.cta} <span className="arrow" aria-hidden="true">{(c.external || /^https?:/.test(c.href || '')) ? '↗' : '→'}</span></span>
            </GLink>
          ))}
          {agir && (
            <div className="ac-agir g-reveal">
              <span className="ac-porte__tag ac-porte__tag--flat">Vous voulez agir avec nous</span>
              <h3 className="ac-agir__t">{agir.title} {agir.accent && <em>{agir.accent}</em>}</h3>
              {agir.text && <p>{agir.text}</p>}
              <ul className="ac-agir__links">
                <li><a className="btnb btnb--gold" href={agir.don || D.donation} target="_blank" rel="noopener noreferrer">Faire un don <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a></li>
                <li><a className="lnk" href="mailto:partenariat@grandfestin.com">Devenir mécène <span className="arrow" aria-hidden="true">→</span></a></li>
                {agir.site && <li><a className="lnk" href={agir.site.href} target="_blank" rel="noopener noreferrer">{agir.site.label} <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a></li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Presse : les trois derniers articles en liste, le reste en une ligne
function Presse({ filtres = [], title = 'Dans', accent = 'la presse', tone = 'white' }) {
  const D = window.FESTIN_DATA;
  const all = (D.presse || []).filter((a) => filtres.some((f) => a.dispositif && a.dispositif.indexOf(f) === 0))
    .slice().sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  if (!all.length) return null;
  const mois = (iso) => { const d = new Date(iso + 'T12:00:00'); return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }); };
  const autres = all.slice(3).map((a) => a.source).filter((v, k, arr) => arr.findIndex((x) => x.toLowerCase() === v.toLowerCase()) === k);
  return (
    <section className={'g-sec g-sec--' + tone + ' g-sec--tight'} aria-labelledby="presse-t">
      <div className="wrap g-presse">
        <GHead id="presse-t" title={title} accent={accent} />
        <ul className="g-news">
          {all.slice(0, 3).map((a) => (
            <li key={a.href} className="g-reveal">
              <a className="g-news__row" href={a.href} target="_blank" rel="noopener noreferrer">
                <span className="g-news__src">{a.source}</span>
                <span className="g-news__t">{a.title}</span>
                <span className="g-news__d">{a.type ? a.type + ' · ' : ''}{mois(a.date)}</span>
                <span className="g-news__go" aria-hidden="true">↗</span>
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            </li>
          ))}
        </ul>
        {autres.length > 0 && <p className="g-src">Également paru dans {autres.join(', ')}. <a href="#/actualites">Toute la presse →</a></p>}
      </div>
    </section>
  );
}

// Galerie : bandeau de photos qui défile lentement, avec pause (WCAG 2.2.2)
function Galerie({ images = [], label = 'Galerie photo' }) {
  if (images.length < 3) return null;
  const loop = images.concat(images);
  return (
    <section className="g-galerie" aria-label={label} data-marquee>
      <window.MarqueePause label="de la galerie photo" />
      <div className="g-galerie__track" style={{ '--g-dur': (images.length * 8) + 's' }}>
        {loop.map((it, i) => {
          const src = typeof it === 'string' ? it : it.src;
          return (
            <figure className="g-galerie__item" key={i} aria-hidden={i >= images.length ? true : undefined}>
              <window.Picture src={src} alt={typeof it === 'string' ? '' : (it.alt || '')} sizes="(max-width: 700px) 70vw, 360px" />
              {typeof it !== 'string' && it.caption && <figcaption>{it.caption}{it.credit ? ' · ' + it.credit : ''}</figcaption>}
            </figure>
          );
        })}
      </div>
    </section>
  );
}

// Les trois missions et leurs projets : le fil de navigation entre projets
function MissionsNav({ currentId, title = 'Les projets', accent = 'de Festin', tone = 'white' }) {
  const D = window.FESTIN_DATA;
  const items = (D.home.missions || {}).items || [];
  const byId = (id) => D.projets.find((p) => p.id === id) || {};
  return (
    <section className={'g-sec g-sec--' + tone + ' g-sec--tight'} aria-labelledby="missions-nav-t">
      <div className="wrap">
        <GHead id="missions-nav-t" title={title} accent={accent} />
        <div className="g-mnav">
          {items.map((m, i) => (
            <div className={'g-mnav__col g-reveal' + (m.projets.some((p) => p.id === currentId) ? ' is-here' : '')} key={m.key}>
              <span className="g-mnav__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="g-mnav__t">{m.title}{m.titleAccent && <> <em>{m.titleAccent}</em></>}</h3>
              <ul>
                {m.projets.map((pr) => {
                  const p = byId(pr.id);
                  const here = pr.id === currentId;
                  const logo = pr.logo || p.logo;
                  return (
                    <li key={pr.id}>
                      <a href={pr.href || '#/projets/' + pr.id} aria-current={here ? 'page' : undefined} className={here ? 'is-here' : ''}>
                        {logo && <span className="g-mnav__logo"><img src={URI(logo)} alt="" loading="lazy" /></span>}
                        <span><b>{pr.name || p.shortTitle}</b>{here ? <small>Vous êtes ici</small> : <small>{pr.line}</small>}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { festinScrollTo, useGReveal, missionDe, GLink, GHead, Preuves, GVideo, Portes, Presse, Galerie, MissionsNav });
})();
