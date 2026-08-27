// Nav.jsx — fixed top navigation; hash-based multi-page routing
const { useState, useEffect } = React;

function NavIcon({ name, size = 16 }) {
  return <i data-lucide={name} style={{ width: size, height: size }} />;
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

function isActive(hash, target) {
  if (target === '#/') return hash === '#/' || hash === '' || hash === '#';
  return hash === target || hash.startsWith(target + '/');
}

function Nav() {
  const [open, setOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const data = window.FESTIN_DATA;
  const hash = useRoute();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [hash]);

  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const projets = data.projets;

  const close = () => setOpen(null);

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="nav__inner">
        <a href="#/" className="nav__logo">
          <img src={data.brand.logo} alt="Festin — Le goût d'avancer ensemble" />
        </a>
        <div className="nav__menu">

          {/* CE QUE NOUS FAISONS → accueil */}
          <a className={"nav__link" + (isActive(hash, '#/') ? ' active' : '')} href="#/">
            Ce que nous faisons
          </a>

          {/* NOS PROJETS — dropdown */}
          <div className={"nav__item" + (open === 'projets' ? ' open' : '')}
               onMouseEnter={() => setOpen('projets')}
               onMouseLeave={close}>
            <a className={"nav__link" + (hash.startsWith('#/projets') ? ' active' : '')}
               href="#/projets/des-etoiles-et-des-femmes">
              Nos projets <NavIcon name="chevron-down" />
            </a>
            <div className="nav__dropdown">
              <div className="nav__dd-cat">L'écosystème Festin</div>
              {projets.map(p => (
                <a key={p.id} className="nav__dd-item" href={`#/projets/${p.id}`}>
                  <div className="nav__dd-icon"><NavIcon name={p.icon} size={20}/></div>
                  <div className="nav__dd-text"><h4>{p.shortTitle}</h4><p>{p.tagline}</p></div>
                </a>
              ))}
              <a className="nav__dd-item nav__dd-item--disabled"
                 aria-disabled="true"
                 onClick={(e) => e.preventDefault()}
                 href="#/restaurants/sadi-carnot">
                <div className="nav__dd-icon"><NavIcon name="hard-hat" size={20}/></div>
                <div className="nav__dd-text">
                  <h4>Sadi Carnot <span className="nav__dd-pill">Bientôt</span></h4>
                  <p>Nouveau restaurant d'insertion — en cours</p>
                </div>
              </a>
            </div>
          </div>

          {/* FORMATIONS */}
          <a className={"nav__link" + (isActive(hash, '#/formations') ? ' active' : '')}
             href="#/formations">Formations</a>

          {/* QUI SOMMES-NOUS — dropdown */}
          <div className={"nav__item" + (open === 'quisommesnous' ? ' open' : '')}
               onMouseEnter={() => setOpen('quisommesnous')}
               onMouseLeave={close}>
            <a className={"nav__link" + (
                 isActive(hash,'#/about') || isActive(hash,'#/impact') || isActive(hash,'#/actualites')
                 ? ' active' : '')}
               href="#/about">
              Qui sommes-nous <NavIcon name="chevron-down" />
            </a>
            <div className="nav__dropdown">
              <a className={"nav__dd-item" + (isActive(hash,'#/about') ? ' active' : '')}
                 href="#/about">
                <div className="nav__dd-icon"><NavIcon name="users" size={20}/></div>
                <div className="nav__dd-text">
                  <h4>L'association</h4>
                  <p>Notre histoire, nos valeurs, notre équipe</p>
                </div>
              </a>
              <a className={"nav__dd-item" + (isActive(hash,'#/impact') ? ' active' : '')}
                 href="#/impact">
                <div className="nav__dd-icon"><NavIcon name="bar-chart-2" size={20}/></div>
                <div className="nav__dd-text">
                  <h4>Impact</h4>
                  <p>Chiffres clés et rapports d'activité</p>
                </div>
              </a>
              <a className={"nav__dd-item" + (isActive(hash,'#/actualites') ? ' active' : '')}
                 href="#/actualites">
                <div className="nav__dd-icon"><NavIcon name="newspaper" size={20}/></div>
                <div className="nav__dd-text">
                  <h4>Actualités</h4>
                  <p>Retombées presse et médias</p>
                </div>
              </a>
            </div>
          </div>

          <a className="nav__cta" href="#/contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
window.NavIcon = NavIcon;
window.useRoute = useRoute;
