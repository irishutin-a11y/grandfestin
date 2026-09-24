// Nav.jsx — navigation partagée : pastille compacte centrée + méga-panneau
// plein-largeur (Option A validée, voir artefact « Options Navigation Festin »).
// Le panneau s'ouvre sous la pastille, 3 colonnes : par thématique / par projet /
// accès rapide. Un seul composant, importé sur toutes les pages.
const { useState, useEffect, useRef, useCallback } = React;

function NavIcon({ name, size = 16 }) {
  return <i data-lucide={name} style={{ width: size, height: size }} aria-hidden="true" />;
}

// ---------------------------------------------------------------------------
// Routeur + transition de page (reprise du 24/09/2026, inspirée de beetogreen.com)
// Un seul écouteur de hashchange pour tout le site. Au changement de page, le
// « trait du parcours » (une ligne teal jamais droite) se dessine à travers
// l'écran en s'épaississant jusqu'à le couvrir ; la nouvelle page est rendue
// dessous, puis le trait se retire en s'amincissant. GSAP core seul.
// Seuls les hash « #/… » sont des routes : « #main » (lien d'évitement) n'en est pas une.
// Mouvement réduit, premier chargement : changement direct.
// ---------------------------------------------------------------------------
const PARCOURS_D = 'M-60 540 C 80 200 220 60 330 250 S 420 660 600 470 S 700 70 860 150 S 980 610 1120 470 S 1250 60 1380 120';
const RouteStore = (function () {
  const isRoute = (h) => !h || h === '#' || h.indexOf('#/') === 0;
  let current = isRoute(window.location.hash) ? (window.location.hash || '#/') : '#/';
  const subs = new Set();
  let busy = false, el = null, path = null, len = 0;
  const publish = (h) => { current = h; subs.forEach((f) => f(h)); };
  const build = () => {
    if (el) return;
    el = document.createElement('div');
    el.className = 'ptrans';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<svg viewBox="0 0 1316 664" preserveAspectRatio="xMidYMid slice"><path d="' + PARCOURS_D + '" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.body.appendChild(el);
    path = el.querySelector('path');
    len = path.getTotalLength();
  };
  const go = () => {
    const next = window.location.hash || '#/';
    if (!isRoute(next) || next === current) return;
    const g = window.gsap;
    if (!g || (window.FESTIN_RM && window.FESTIN_RM())) { publish(next); return; }
    if (busy) return; // la page affichée à la fin sera la dernière demandée
    busy = true;
    build();
    // sécurité : si l'animation ne peut pas tourner (onglet en arrière-plan…),
    // la page change quand même et le trait disparaît
    const guard = setTimeout(() => {
      if (!busy) return;
      g.killTweensOf(path); g.set(el, { autoAlpha: 0, pointerEvents: 'none' }); busy = false;
      publish(window.location.hash || '#/');
    }, 2500);
    const M = window.FESTIN_MOTION || { dur: { page: 1.1 } };
    const d = M.dur.page;
    g.set(el, { autoAlpha: 1, pointerEvents: 'auto' });
    g.set(path, { strokeDasharray: len, strokeDashoffset: len, attr: { 'stroke-width': 2 } });
    g.timeline({ defaults: { ease: 'expo.inOut' } })
      .to(path, { strokeDashoffset: 0, duration: d * 0.55 }, 0)
      .to(path, { attr: { 'stroke-width': 1100 }, duration: d * 0.5, ease: 'expo.in' }, d * 0.12)
      .add(() => {
        publish(window.location.hash || '#/');
        // laisser React peindre la nouvelle page sous le trait (ticker GSAP, pas rAF)
        g.delayedCall(0.08, () => {
          g.timeline({ defaults: { ease: 'expo.inOut' }, onComplete: () => {
            clearTimeout(guard); g.set(el, { autoAlpha: 0, pointerEvents: 'none' }); busy = false;
            if ((window.location.hash || '#/') !== current) go();
          } })
            .to(path, { attr: { 'stroke-width': 2 }, duration: d * 0.5, ease: 'expo.out' }, 0)
            .to(path, { strokeDashoffset: -len, duration: d * 0.6 }, 0.05);
        });
      });
  };
  window.addEventListener('hashchange', go);
  return { get: () => current, sub: (f) => { subs.add(f); return () => subs.delete(f); } };
})();
window.FestinRoute = RouteStore;

function useRoute() {
  const [hash, setHash] = useState(RouteStore.get());
  useEffect(() => RouteStore.sub(setHash), []);
  return hash;
}

function Nav() {
  const data = window.FESTIN_DATA;
  const mega = data.meganav;
  const hash = useRoute();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const lastFocus = useRef(null);

  const themeCards = (mega.views.find(v => v.key === 'theme') || mega.views[0]).cards;
  const projectItems = [
    ...data.projets.map(p => ({ t: p.shortTitle, href: `#/projets/${p.id}`, icon: p.icon })),
    { t: "Académie Festin", href: "#/academie", icon: "graduation-cap" },
    { t: "Sadi Carnot", href: "#/restaurants/sadi-carnot", icon: "hard-hat", pill: "Bientôt", disabled: true },
  ];

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // fermer le panneau à chaque changement de route
  useEffect(() => { setOpen(false); }, [hash]);

  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const openPanel = useCallback(() => {
    lastFocus.current = document.activeElement;
    setOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
  }, []);

  const toggle = useCallback(() => { open ? closePanel() : openPanel(); }, [open, openPanel, closePanel]);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      if (window.__lenis) window.__lenis.stop();
      const t = setTimeout(() => {
        const first = panelRef.current && panelRef.current.querySelector('a[href]');
        if (first) first.focus();
      }, 30);
      const onKey = (e) => {
        if (e.key === 'Escape') { closePanel(); return; }
        if (e.key === 'Tab' && panelRef.current) {
          const f = [triggerRef.current, ...panelRef.current.querySelectorAll('a[href],button:not([disabled])')];
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      document.addEventListener('keydown', onKey);
      return () => { clearTimeout(t); document.removeEventListener('keydown', onKey); };
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
    }
  }, [open, closePanel]);

  return (
    <nav className={"mnav" + (solid ? " solid" : "")}>
      <div className="navpill">
        {/* TODO — remplacer par le logo Festin SVG blanc inline dès réception */}
        <a href="#/" className="navpill__brand" aria-label="Festin — accueil">
          <img src={data.brand.logo} alt="Festin" />
        </a>
        <span className="navpill__sep" aria-hidden="true"></span>
        <a className="navpill__don" href={data.donation} target="_blank" rel="noopener noreferrer">
          <i data-lucide="heart" aria-hidden="true" /> Don
        </a>
        <button type="button" className="navpill__menu" ref={triggerRef} aria-haspopup="true"
                aria-expanded={open} aria-controls="megaPanel" onClick={toggle}>
          Menu
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        </button>
      </div>

      <div className={"optA-scrim" + (open ? " open" : "")} onClick={closePanel} aria-hidden="true"></div>
      <div className={"optA-panel" + (open ? " open" : "")} id="megaPanel" ref={panelRef}
           role="dialog" aria-modal="true" aria-label={mega.title} aria-hidden={!open} inert={open ? undefined : ""}>
        <div className="optA-grid">
          <div className="optA-col">
            <h5>Par thématique</h5>
            <div className="optA-theme">
              {themeCards.map(c => (
                <a key={c.t} href={c.href} onClick={closePanel}>
                  <span className="dot" style={{ background: c.c + '22', color: c.c }}>
                    <NavIcon name={c.ic} size={18} />
                  </span>
                  <span><strong>{c.t}</strong><span>{c.d}</span></span>
                </a>
              ))}
            </div>
          </div>
          <div className="optA-col">
            <h5>Par projet</h5>
            <div className="optA-list">
              {projectItems.map(p => (
                <a key={p.t} href={p.href} className={p.disabled ? 'disabled' : ''}
                   onClick={p.disabled ? (e) => e.preventDefault() : closePanel}
                   aria-disabled={p.disabled || undefined}>
                  <NavIcon name={p.icon} size={16} /><span>{p.t}</span>
                  {p.pill && <span className="optA-pill">{p.pill}</span>}
                </a>
              ))}
            </div>
          </div>
          <div className="optA-col">
            <h5>Accès rapide</h5>
            <div className="optA-quick">
              {mega.links.map(l => (
                <a key={l.href} href={l.href} onClick={closePanel}>{l.label} <span aria-hidden="true">→</span></a>
              ))}
            </div>
            <a className="optA-don" href={data.donation} target="_blank" rel="noopener noreferrer" onClick={closePanel}>
              <i data-lucide="heart" aria-hidden="true" /> Faire un don à Festin
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
window.NavIcon = NavIcon;
window.useRoute = useRoute;
