// Selector.jsx — segmented explorer (thématique / lieu / projet), real data + real routes
function Selector() {
  const { useState } = React;
  const projets = window.FESTIN_DATA.projets;
  const byId = (id) => projets.find(p => p.id === id);

  const ANGLES = {
    theme: {
      label: "Par thématique",
      icon: "sparkles",
      cards: [
        { t: "Régaler", ic: "utensils", c: "#1D6B78", d: "Nos restaurants et notre traiteur : la gastronomie inclusive qui se déguste.", tags: ["Les Beaux Mets", "La Table de Cana"], href: "#/projets/les-beaux-mets" },
        { t: "Former", ic: "graduation-cap", c: "#E8A825", d: "Des parcours diplômants et des formations continues pour les professionnels.", tags: ["Étoiles & Femmes", "Tournesol", "Formations pros"], href: "#/formations" },
        { t: "Employer", ic: "briefcase", c: "#2E8B57", d: "L'insertion par la cuisine et l'accompagnement vers un emploi durable.", tags: ["Parcours insertion", "Club des Talents"], href: "#/accompagnement/insertion" },
        { t: "Transformer", ic: "megaphone", c: "#9A5BA8", d: "Le mouvement Restaure : faire évoluer les pratiques de tout un secteur.", tags: ["Manifeste", "700 signataires"], href: "#/projets/restaure" },
      ],
    },
    lieu: {
      label: "Par lieu",
      icon: "map-pin",
      cards: [
        { t: "Les Beaux Mets", ic: "utensils", c: "#1D6B78", d: "Le restaurant des Baumettes à Marseille, ouvert au public.", tags: ["Marseille", "Restaurant"], href: "#/projets/les-beaux-mets" },
        { t: "La Table de Cana", ic: "chef-hat", c: "#E8A825", d: "Traiteur événementiel et restauration collective — Mourepiane.", tags: ["Mourepiane", "Traiteur"], href: "#/projets/la-table-de-cana" },
        { t: "Le Bouillon Bleu", ic: "hard-hat", c: "#9A5BA8", d: "Restaurant populaire en cours de développement.", tags: ["Sadi Carnot"], pill: "Bientôt", href: "#/contact" },
        { t: "L'Académie Festin", ic: "graduation-cap", c: "#2E8B57", d: "Le centre de formation certifié Qualiopi de l'association.", tags: ["Marseille", "Qualiopi"], href: "#/formations" },
      ],
    },
    projet: {
      label: "Par projet",
      icon: "layout-grid",
      cards: projets.map(p => ({ t: p.shortTitle, ic: p.icon, c: "#1D6B78", d: p.tagline, tags: [p.eyebrow], href: `#/projets/${p.id}` })),
    },
  };

  const [tab, setTab] = useState('theme');
  const angle = ANGLES[tab];

  return (
    <section className="selector">
      <div className="container">
        <div className="selector__head">
          <span className="eyebrow">L'écosystème Festin</span>
          <h2 className="h2">Explorez Festin <em className="accent">par l'angle qui vous parle</em></h2>
        </div>
        <div className="seg" role="tablist">
          {Object.entries(ANGLES).map(([key, a]) => (
            <button key={key} className={tab === key ? 'on' : ''} onClick={() => setTab(key)} role="tab" aria-selected={tab === key}>
              <i data-lucide={a.icon} style={{ width: 16, height: 16 }} />{a.label}
            </button>
          ))}
        </div>
        <div className="sel-grid" key={tab}>
          {angle.cards.map((c, i) => (
            <a className="sel-card" href={c.href} key={c.t} style={{ animationDelay: (i * 60) + 'ms' }}>
              <div className="sel-card__ic" style={{ background: c.c + '1F', color: c.c }}><i data-lucide={c.ic} style={{ width: 24, height: 24 }} /></div>
              <h3>{c.t}{c.pill && <span className="pill">{c.pill}</span>}</h3>
              <p>{c.d}</p>
              <div className="sel-card__tags">{c.tags.map(x => <span key={x}>{x}</span>)}</div>
              <span className="sel-card__more">Explorer <i data-lucide="arrow-right" style={{ width: 15, height: 15 }} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Selector = Selector;
