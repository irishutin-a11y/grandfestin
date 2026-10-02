// App.jsx — routeur par hash et coquille de page (sorti de index.html le 24/09/2026)
// ─── Hash router ─────────────────────────────────────────────────
function parseRoute(hash) {
  const h = (hash || '').replace(/^#\/?/, '').replace(/\/$/, '');
  if (!h) return { name: 'home' };
  const parts = h.split('/');
  if (parts[0] === 'formations' && parts[1]) return { name: 'formation', id: parts[1] };
  // le catalogue vit dans la page Académie (une page, un nom) : #/formations y mène, au bon endroit
  if (parts[0] === 'formations') return { name: 'academie', ancre: 'catalogue' };
  if (parts[0] === 'projets' && parts[1] === 'lieux') return { name: 'projets', ancre: 'lieux' };
  if (parts[0] === 'projets' && parts[1]) return { name: 'projet', id: parts[1] };
  if (parts[0] === 'projets') return { name: 'projets' };
  // Sadi Carnot : pas de page tant que le projet n'est pas acquis (arbitrage 8B) ; l'ancienne adresse mène à l'accueil
  if (parts[0] === 'restaurants') return { name: 'home' };
  if (parts[0] === 'accompagnement' && parts[1] === 'insertion') return { name: 'accomp-insertion' };
  if (parts[0] === 'accompagnement' && parts[1] === 'professionnels') return { name: 'accomp-pros' };
  if (parts[0] === 'academie') return { name: 'academie' };
  if (parts[0] === 'actualites') return { name: 'actualites' };
  if (parts[0] === 'impact') return { name: 'impact' };
  if (parts[0] === 'about') return { name: 'about' };
  if (parts[0] === 'contact') return { name: 'contact' };
  return { name: '404' };
}

function App() {
  const hash = useRoute();
  const route = parseRoute(hash);
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [hash]);

  // Lenis smooth scroll — site entier
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches || !window.Lenis) return;
    const lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    if (window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
      if (window.gsap) window.gsap.ticker.lagSmoothing(0);
    }
    return () => { cancelAnimationFrame(raf); lenis.destroy(); window.__lenis = null; };
  }, []);

  // Changement de page dans une application à page unique : le navigateur ne
  // recharge rien, donc rien n'est annoncé et le focus reste où il était.
  // On déplace le focus sur le titre de la nouvelle page et on annonce son nom
  // dans une zone live, pour les lecteurs d'écran.
  const [annonce, setAnnonce] = React.useState('');
  React.useEffect(() => {
    const t = setTimeout(() => {
      const h1 = document.querySelector('main h1');
      if (h1) {
        if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1');
        h1.focus({ preventScroll: true });
        setAnnonce(h1.textContent.trim() + ' — page chargée');
      }
    }, 220);
    return () => clearTimeout(t);
  }, [hash]);

  // à chaque changement de route : scroll top + refresh ScrollTrigger après rendu
  React.useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const t = setTimeout(() => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      const cible = route.ancre && document.getElementById(route.ancre);
      if (cible) window.festinScrollTo(route.ancre);
    }, route.ancre ? 400 : 80);
    // titre et description de la page courante (référencement, onglet)
    const D = window.FESTIN_DATA, base = 'Festin';
    const proj = route.name === 'projet' ? D.projets.find(x => x.id === route.id) : null;
    const titles = {
      home: 'Festin : former les personnes, faire avancer les cuisines',
      about: 'Qui sommes-nous | ' + base, projets: 'Nos projets | ' + base, formation: 'Formation | ' + base,
      academie: "L'Académie Festin | " + base, impact: 'Notre impact | ' + base, actualites: 'Actualités et presse | ' + base,
      contact: 'Contact | ' + base, 'accomp-insertion': 'Insertion : apprendre un métier de cuisine | ' + base,
      'accomp-pros': 'Professionnels : former et recruter | ' + base,
    };
    document.title = proj ? proj.shortTitle + ' | ' + base : (titles[route.name] || 'Page introuvable | ' + base);
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', proj ? proj.short : route.name === 'home'
      ? "Festin, association à but non lucratif et d'intérêt général basée à Marseille : formation aux métiers de la cuisine, accompagnement des restaurants et programme Restaure."
      : (document.title.split(' | ')[0] + ' : ' + base + ', association à but non lucratif et d\'intérêt général, forme aux métiers de la cuisine et accompagne les restaurants.'));
    return () => clearTimeout(t);
  }, [hash]);

  let page;
  switch (route.name) {
    case 'home':              page = <HomePage />; break;
    case 'projets':           page = <ProjetsIndexPage />; break;
    case 'formation':         page = <FormationDetailPage id={route.id} />; break;
    case 'projet':            page = <ProjetPage id={route.id} />; break;
    case 'accomp-insertion':  page = <AccompagnementInsertionPage />; break;
    case 'accomp-pros':       page = <AccompagnementProsPage />; break;
    case 'academie':          page = <AcademiePage />; break;
    case 'actualites':         page = <ActualitesPage />; break;
    case 'impact':            page = <ImpactPage />; break;
    case 'about':             page = <AboutPage />; break;
    case 'contact':           page = <ContactPage key={hash} />; break;
    default:                  page = <NotFoundPage />;
  }

  return (
    <div data-screen-label={`Site — ${route.name}`}>
      <Nav />
      <p role="status" aria-live="polite" className="sr-only">{annonce}</p>
      <main id="main" tabIndex={-1}>{page}</main>
      <Footer />
    </div>
  );
}

// Typographie française, appliquée à tout le texte affiché (retours du 30/09/2026) :
// espace insécable avant : ; ? ! % » et après «, pour qu'aucun signe ne tombe seul en début de ligne.
(function () {
  const RX = / ([:;?!%»])/g, RX2 = /« /g;
  // petits mots attachés au mot suivant : jamais seuls en fin de ligne (retours du 02/10/2026)
  const PETITS = /(^|[\s\u00a0(«'’])(à|a|au|aux|de|du|des|d’un|d'un|le|la|les|l’|un|une|en|et|ou|dans|par|pour|sur|avec|sans|son|sa|ses|nos|vos|notre|votre|ce|cet|cette|ces|qui|que|où|y|ne|se|il|elle|on|nous|vous|chez|vers|entre|depuis|plus|très|jusqu’à|jusqu'à|près|N°|n°) (?=\S)/gi;
  // nombres : « 13 antennes », « 600 convives », « 4 mois »
  const NOMBRE = /(\d) (?=[A-Za-zÀ-ÿ€%])/g;
  const fix = (n) => {
    if (n.nodeType === 3) {
      const v = n.nodeValue;
      let w = v.replace(RX, '\u00a0$1').replace(RX2, '«\u00a0').replace(NOMBRE, '$1\u00a0');
      // deux passes : « à la » puis « la cuisine »
      w = w.replace(PETITS, '$1$2\u00a0').replace(PETITS, '$1$2\u00a0');
      if (w !== v) n.nodeValue = w;
      return;
    }
    if (n.nodeType !== 1 || /^(SCRIPT|STYLE|TEXTAREA|INPUT|CODE|SELECT|OPTION)$/.test(n.nodeName)) return;
    for (let c = n.firstChild; c; c = c.nextSibling) fix(c);
  };
  const start = () => {
    const root = document.getElementById('root');
    if (!root) return;
    fix(root);
    new MutationObserver((ms) => ms.forEach((m) => {
      if (m.type === 'characterData') fix(m.target);
      else m.addedNodes.forEach(fix);
    })).observe(root, { childList: true, subtree: true, characterData: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

if (!window.location.hash) window.location.hash = '#/';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
