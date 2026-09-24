// Nav.jsx — navigation partagée : pastille compacte centrée + méga-panneau
// plein-largeur (Option A validée, voir artefact « Options Navigation Festin »).
// Refonte du 24/09/2026 (DIRECTION-ACCUEIL.md §4) : trois liens visibles dans
// la pastille (Se former, Recruter, L'association) et un panneau rangé par
// public (Vous cherchez un métier / Vous êtes du secteur / L'association).
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
window.FESTIN_TRAIT = PARCOURS_D;
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
  const rubrique = data.rubriqueDe(hash);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const lastFocus = useRef(null);

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
        <ul className="navpill__links">
          {data.arbo.map((r) => (
            <li key={r.key}><a href={r.href} aria-current={hash === r.href ? 'page' : (rubrique === r.key ? 'location' : undefined)}>{r.label}</a></li>
          ))}
        </ul>
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
        <div className="optA-grid optA-grid--publics">
          {data.arbo.map((g) => (
            <div className={'optA-col' + (rubrique === g.key ? ' is-here' : '')} key={g.key}>
              <h2 className="optA-h">{g.label}</h2>
              <ul className="optA-links">
                {g.links.map((l) => (
                  <li key={l.href + l.label}>
                    <a href={l.href} onClick={closePanel} aria-current={hash === l.href ? 'page' : undefined}>
                      <span className="optA-links__t">{l.label}</span>
                      {l.d && <span className="optA-links__d">{l.d}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="optA-foot">
            <a className="optA-don" href={data.donation} target="_blank" rel="noopener noreferrer" onClick={closePanel}>
              <i data-lucide="heart" aria-hidden="true" /> Faire un don à Festin
            </a>
            <span className="optA-foot__txt">Association loi 1901, d'intérêt général, agréée ESUS.</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
window.NavIcon = NavIcon;
window.useRoute = useRoute;
