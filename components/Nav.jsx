// Nav.jsx — navigation partagée : pastille compacte centrée + MEGA MENU plein écran
// (portée depuis maquettes/home-b.html). Un seul composant, importé sur toutes les pages.
const { useState, useEffect, useRef, useCallback } = React;

function NavIcon({ name, size = 16 }) {
  return <i data-lucide={name} style={{ width: size, height: size }} aria-hidden="true" />;
}

function useRoute() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash;
}

function Nav() {
  const data = window.FESTIN_DATA;
  const mega = data.meganav;
  const hash = useRoute();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(mega.views[0].key);
  const megaRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // fermer le mega à chaque changement de route
  useEffect(() => { setOpen(false); }, [hash]);

  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const openMega = useCallback(() => {
    lastFocus.current = document.activeElement;
    setOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    setOpen(false);
    if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
  }, []);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      if (window.__lenis) window.__lenis.stop();
      const t = setTimeout(() => { if (closeRef.current) closeRef.current.focus(); }, 30);
      const onKey = (e) => {
        if (e.key === 'Escape') { closeMega(); return; }
        if (e.key === 'Tab' && megaRef.current) {
          const f = megaRef.current.querySelectorAll('a[href],button:not([disabled]),[tabindex="0"]');
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
  }, [open, closeMega]);

  const cur = mega.views.find(v => v.key === view) || mega.views[0];

  return (
    <React.Fragment>
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
          <button type="button" className="navpill__menu" aria-haspopup="dialog"
                  aria-expanded={open} aria-controls="mega" onClick={openMega}>
            Menu
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </nav>

      <div className={"mega" + (open ? " open" : "")} id="mega" ref={megaRef}
           role="dialog" aria-modal="true" aria-label={mega.title} aria-hidden={!open}>
        <div className="mega__bar">
          <span className="navpill__brand"><img src={data.brand.logo} alt="Festin" style={{ height: 26 }} /></span>
          <button type="button" className="mega__close" ref={closeRef} onClick={closeMega} aria-label="Fermer le menu">
            <span>Fermer</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
        </div>
        <div className="mega__inner">
          <h2 className="mega__title">{mega.title}</h2>
          <div className="mega__tabs" role="tablist" aria-label="Filtrer">
            {mega.views.map(v => (
              <button key={v.key} type="button" role="tab" aria-selected={view === v.key}
                      className={view === v.key ? 'on' : ''} onClick={() => setView(v.key)}>
                <NavIcon name={v.icon} /> {v.label}
              </button>
            ))}
          </div>
          <div className="mega__grid" key={view}>
            {cur.cards.map((c, i) => (
              <a key={c.t} className="mcard" href={c.href || '#/'} style={{ animationDelay: (i * 60) + 'ms' }}
                 onClick={closeMega}>
                <span className="mcard__ic" style={{ background: c.c + '1F', color: c.c }}>
                  <NavIcon name={c.ic} size={24} />
                </span>
                <h3>{c.t}{c.pill && <span className="mcard__pill">{c.pill}</span>}</h3>
                <p className="mcard__d">{c.d}</p>
                <div className="mcard__tags">{c.tags.map(x => <span key={x}>{x}</span>)}</div>
                <span className="mcard__more">Explorer <NavIcon name="arrow-right" size={15} /></span>
              </a>
            ))}
          </div>
          <a className="mega__don" href={data.donation} target="_blank" rel="noopener noreferrer" onClick={closeMega}>
            <i data-lucide="heart" aria-hidden="true" />
            Faire un don à Festin
            <NavIcon name="arrow-up-right" size={16} />
          </a>
          {mega.links && (
            <nav className="mega__links" aria-label="Liens">
              {mega.links.map(l => (
                <a key={l.href} href={l.href} onClick={closeMega}>{l.label}</a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

window.Nav = Nav;
window.NavIcon = NavIcon;
window.useRoute = useRoute;
