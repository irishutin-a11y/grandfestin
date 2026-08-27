// Pages.jsx — dedicated page components for multi-page navigation
// Each page is a full-screen view; routing handled in index.html via hash.

function PageHeader({ eyebrow, title, accent, subtitle, breadcrumb }) {
  return (
    <section className="page-header">
      <div className="container">
        {breadcrumb && (
          <nav className="breadcrumb">
            {breadcrumb.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="breadcrumb__sep">/</span>}
                {b.href
                  ? <a href={b.href}>{b.label}</a>
                  : <span>{b.label}</span>}
              </React.Fragment>
            ))}
          </nav>
        )}
        <span className="eyebrow eyebrow--gold">{eyebrow}</span>
        <h1 className="h1"><span style={{color:'rgb(255, 255, 255)'}}>{title}</span> {accent && <em className="accent">{accent}</em>}</h1>
        {subtitle && <p className="lede" style={{color:'rgba(255,255,255,0.78)',marginTop:18,maxWidth:680}}>{subtitle}</p>}
      </div>
    </section>
  );
}

// ---------- HOME PAGE ----------
function HomePage() {
  return (
    <div data-screen-label="01 Accueil">
      <Hero />
      <span id="after-hero" />
      <Selector />
      <Academie />
      <Publics />
      <Engagement />
      <Temoignages />
      <Journal />
    </div>
  );
}

// ---------- PROJETS MARQUEE — bandeau infini de logos projets ----------
function ProjetsMarquee() {
  const projets = window.FESTIN_DATA.projets;
  const row = (
    <>
      {projets.map((p, i) => (
        <div key={i} className="projets-marquee__item">
          <i data-lucide={p.icon} style={{width:22,height:22}}/>
          <span>{p.shortTitle}</span>
        </div>
      ))}
    </>
  );
  return (
    <section className="projets-marquee">
      <div className="container projets-marquee__head">
        <span className="eyebrow">Nos projets</span>
      </div>
      <div style={{overflow:'hidden', width:'100%'}}>
        <div className="projets-marquee__track">
          {row}
          {row}
        </div>
      </div>
    </section>
  );
}

// ---------- S'ENGAGER À NOS CÔTÉS — 3 CTA par profil ----------
function Engagement() {
  const cards = [
    {
      icon: "chef-hat",
      profile: "Vous êtes restaurateur",
      title: "Faire évoluer vos pratiques",
      desc: "Formations courtes pour les équipes : prévention des VSS, management juste, accueil de la diversité. Accueil de stagiaires en parcours d'insertion.",
      cta: "Découvrir les formations",
      href: "#/formations",
    },
    {
      icon: "handshake",
      profile: "Vous êtes partenaire ou financeur",
      title: "Soutenir l'écosystème Festin",
      desc: "Mécénat, partenariat opérationnel, financement de promotions, mise à disposition de compétences. Construisons ensemble un projet qui a du sens.",
      cta: "Nous contacter",
      href: "#/contact",
    },
    {
      icon: "sparkles",
      profile: "Vous êtes en parcours d'insertion",
      title: "Rejoindre une promotion",
      desc: "Femmes éloignées de l'emploi, personnes réfugiées ou primo-arrivantes : nous concevons des parcours diplômants gratuits, avec un accompagnement complet.",
      cta: "Découvrir les parcours",
      href: "#/projets/des-etoiles-et-des-femmes",
    },
  ];
  return (
    <section className="engager">
      <div className="container">
        <div className="engager__head">
          <span className="eyebrow">S'engager à nos côtés</span>
          <h2 className="h2">Trois façons d'<em className="accent">avancer ensemble</em></h2>
        </div>
        <div className="engager__grid">
          {cards.map((c, i) => (
            <a key={i} className="engager-card" href={c.href}>
              <div className="engager-card__icon"><i data-lucide={c.icon} style={{width:26,height:26}}/></div>
              <span className="engager-card__profile">{c.profile}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className="engager-card__cta">{c.cta} <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- JOURNAL — actualités ----------
function Journal() {
  const articles = [
    {
      icon: "newspaper",
      cat: "Actualité",
      date: "12 mars 2026",
      title: "Lancement de la promotion Tournesol 2026",
      excerpt: "La nouvelle promotion Tournesol démarre aux côtés de Refugee Food et Estello Formation, avec 18 apprenants accueillis à Marseille.",
    },
    {
      icon: "award",
      cat: "Reconnaissance",
      date: "28 février 2026",
      title: "La Table de Cana obtient le label LUCIE Progress",
      excerpt: "Avec 848/1000, La Table de Cana Marseille consolide sa démarche RSE et son engagement pour l'insertion par la cuisine.",
    },
    {
      icon: "tv",
      cat: "Média",
      date: "14 janvier 2026",
      title: "Documentaire M6 sur Les Beaux Mets",
      excerpt: "Le premier restaurant en prison ouvert au public en France fait l'objet d'un documentaire de 45 minutes diffusé en prime time.",
    },
  ];
  return (
    <section className="journal">
      <div className="container">
        <div className="journal__head">
          <div>
            <span className="eyebrow">Journal</span>
            <h2 className="h2" style={{marginTop:8}}>Les dernières <em className="accent">actualités</em></h2>
          </div>
          <a href="#/contact" className="btn btn--ghost">Toutes les actualités <i data-lucide="arrow-right" style={{width:16,height:16}}/></a>
        </div>
        <div className="journal__grid">
          {articles.map((a, i) => (
            <a key={i} className="journal-card" href="#/contact">
              <div className="journal-card__img">
                <div className="journal-card__img-icon"><i data-lucide={a.icon} style={{width:56,height:56}}/></div>
              </div>
              <div className="journal-card__body">
                <div className="journal-card__meta">
                  <span className="journal-card__cat">{a.cat}</span>
                  <span>·</span>
                  <span>{a.date}</span>
                </div>
                <h3>{a.title}</h3>
                <p className="journal-card__excerpt">{a.excerpt}</p>
                <span className="journal-card__lnk">Lire l'article <i data-lucide="arrow-right" style={{width:13,height:13}}/></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- RETOMBÉES PRESSE — réassurance médias ----------
function RetombeesPresse() {
  const medias = [
    { name: "France 24",         href: "#" },
    { name: "RFI",               href: "#" },
    { name: "Le Monde",          href: "#" },
    { name: "M6",                href: "#" },
    { name: "France Inter",      href: "#" },
    { name: "La Provence",       href: "#" },
  ];
  return (
    <section className="presse">
      <div className="container">
        <div className="presse__head">
          <span className="eyebrow">Ils parlent de nous</span>
        </div>
        <div className="presse__list">
          {medias.map((m, i) => (
            <a key={i} href={m.href} target="_blank" rel="noopener" className="presse__item">
              <i data-lucide="external-link" style={{width:13,height:13}}/>
              {m.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- PARTENAIRES — bandeau marquee ----------
function PartenairesMarquee() {
  const logos = [
    { src: "images/partners/la-source.svg",          alt: "La Source" },
    { src: "images/partners/the-small-group.webp",   alt: "The Small Group" },
    { src: "images/partners/les-grandes-tables.jpeg",alt: "Les Grandes Tables" },
    { src: "images/partners/les-bords-de-mer.png",   alt: "Les Bords de Mer" },
    { src: "images/partners/sofitel.jpg",            alt: "Sofitel Hotels & Resorts" },
  ];
  const row = (
    <>
      {logos.map((l,i) => (
        <img key={i} src={l.src} alt={l.alt} style={{height:44,width:'auto',opacity:0.7,margin:'0 56px',flexShrink:0}}/>
      ))}
    </>
  );
  return (
    <section style={{background:'var(--cream)',padding:'48px 0',borderTop:'1px solid rgba(13,43,48,0.04)',borderBottom:'1px solid rgba(13,43,48,0.04)'}}>
      <style>{`
        @keyframes festin-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .festin-marquee-track { display: flex; align-items: center; width: max-content; animation: festin-marquee 30s linear infinite; }
      `}</style>
      <div className="container" style={{textAlign:'center',marginBottom:28}}>
        <span className="eyebrow">Ils nous font confiance</span>
      </div>
      <div style={{overflow:'hidden',width:'100%'}}>
        <div className="festin-marquee-track">
          {row}
          {row}
        </div>
      </div>
    </section>
  );
}

// Compact teaser of formations on home page (instead of full grid)
function FormationsTeaser() {
  const items = window.FESTIN_DATA.formations.slice(0, 4);
  return (
    <section className="formations">
      <div className="container">
        <div className="formations__head" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:48,flexWrap:'wrap',gap:24}}>
          <div>
            <span className="eyebrow">Nos formations</span>
            <h2 className="h2">5 parcours, <em className="accent">5 publics</em></h2>
          </div>
          <a href="#/formations" className="btn btn--ghost">Voir toutes les formations <i data-lucide="arrow-right" style={{width:16,height:16}}/></a>
        </div>
        <div className="formations__grid">
          {items.map((f) => <FormationCardLink key={f.id} f={f}/>)}
        </div>
      </div>
    </section>
  );
}

function FormationCardLink({ f, wide }) {
  return (
    <a className={"formation-card" + (wide ? " wide" : "")} href={`#/formations/${f.id}`}>
      <div className="formation-card__img"><img src={f.img} alt={f.title}/></div>
      <div className="formation-card__body">
        <span className="eyebrow">{f.cat}</span>
        <h3>{f.title}</h3>
        <p className="formation-card__desc">{f.desc}</p>
        <div className="formation-card__chips">
          <span className="chip"><i data-lucide="clock" style={{width:12,height:12}}/> {f.duration}</span>
          <span className="chip"><i data-lucide="map-pin" style={{width:12,height:12}}/> {f.format.split('—')[0].trim()}</span>
          <span className="chip"><i data-lucide="euro" style={{width:12,height:12}}/> {f.price.split('—')[0].trim()}</span>
        </div>
        <div className="formation-card__bottom">
          <span className="lnk">Voir le détail <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
          <span className="formation-card__public">{f.publicLabel}</span>
        </div>
      </div>
    </a>
  );
}

function ContactCTA() {
  return (
    <section style={{background:'var(--teal-deep)',color:'#fff',padding:'80px 0',textAlign:'center'}}>
      <div className="container">
        <span className="eyebrow eyebrow--gold">Une question ?</span>
        <h2 className="h2" style={{color:'#fff',maxWidth:640,margin:'14px auto 18px'}}>Parlons de votre <em className="accent">projet de formation</em></h2>
        <p className="lede" style={{color:'rgba(255,255,255,0.78)',maxWidth:560,margin:'0 auto 32px'}}>Notre équipe pédagogique vous répond sous 48h ouvrées.</p>
        <a href="#/contact" className="btn btn--gold">Nous contacter <i data-lucide="arrow-right" style={{width:16,height:16}}/></a>
      </div>
    </section>
  );
}

// ---------- FORMATIONS LIST PAGE ----------
function FormationsListPage() {
  const items = window.FESTIN_DATA.formations;
  const [filter, setFilter] = React.useState('all');
  const filtered = filter === 'all' ? items : items.filter(f => f.cat.toLowerCase() === filter);
  return (
    <div data-screen-label="02 Formations">
      <PageHeader
        eyebrow="Catalogue"
        title="Toutes nos"
        accent="formations"
        subtitle="Cinq parcours, deux publics, une même exigence pédagogique. Cliquez sur une formation pour découvrir le programme complet."
        breadcrumb={[{label:'Accueil',href:'#/'},{label:'Formations'}]}
      />
      <section className="formations">
        <div className="container">
          <div className="filters">
            <button className={"filter" + (filter==='all'?' active':'')} onClick={()=>setFilter('all')}>Toutes ({items.length})</button>
            <button className={"filter" + (filter==='professionnels'?' active':'')} onClick={()=>setFilter('professionnels')}>Professionnels ({items.filter(f=>f.cat==='Professionnels').length})</button>
            <button className={"filter" + (filter==='insertion'?' active':'')} onClick={()=>setFilter('insertion')}>Insertion ({items.filter(f=>f.cat==='Insertion').length})</button>
          </div>
          <div className="formations__grid">
            {filtered.map((f) => <FormationCardLink key={f.id} f={f}/>)}
          </div>
        </div>
      </section>
      <ContactCTA />
    </div>
  );
}

// ---------- FORMATION DETAIL PAGE ----------
function FormationDetailPage({ id }) {
  const f = window.FESTIN_DATA.formations.find(x => x.id === id);
  if (!f) return <NotFoundPage />;
  return (
    <div data-screen-label={`03 Formation — ${f.title}`}>
      <PageHeader
        eyebrow={f.cat}
        title={f.title.split('—')[0].trim()}
        accent={f.title.includes('—') ? '— ' + f.title.split('—')[1].trim() : null}
        subtitle={f.desc}
        breadcrumb={[
          {label:'Accueil',href:'#/'},
          {label:'Formations',href:'#/formations'},
          {label:f.title}
        ]}
      />
      <section style={{padding:'72px 0',background:'var(--off-white)'}}>
        <div className="container">
          <div className="detail-grid">
            <div className="detail-main">
              <div className="detail-hero">
                <img src={f.img} alt={f.title}/>
              </div>
              <div className="detail-section">
                <span className="eyebrow">Objectifs pédagogiques</span>
                <h2 className="h3" style={{marginTop:8,marginBottom:18}}>Ce que vous apprendrez</h2>
                <ul className="objectives">{f.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
              </div>
              <div className="detail-section">
                <span className="eyebrow">Programme</span>
                <h2 className="h3" style={{marginTop:8,marginBottom:18}}>Le déroulé pas à pas</h2>
                <ol className="programme">{f.programme.map((p, i) => <li key={i}>{p}</li>)}</ol>
              </div>
              <div className="detail-section">
                <span className="eyebrow eyebrow--gold">Tarifs &amp; financement</span>
                <h2 className="h3" style={{marginTop:8,marginBottom:18}}>Comment financer cette formation</h2>
                <div className="tariff">{f.tariff}</div>
              </div>
              {f.audienceKey === 'pros' && (
                <a href={window.FESTIN_DATA.catalogPdf} target="_blank" rel="noopener" className="catalog-cta">
                  <div className="catalog-cta__icon"><i data-lucide="book-open" style={{width:28,height:28}}/></div>
                  <div className="catalog-cta__body">
                    <div className="catalog-cta__eyebrow">Documentation complète</div>
                    <div className="catalog-cta__title">Consulter notre catalogue de formations</div>
                    <div className="catalog-cta__desc">Tous les programmes, durées, tarifs et modalités au format PDF.</div>
                  </div>
                  <i data-lucide="external-link" style={{width:20,height:20,flexShrink:0,color:'var(--gold)'}}/>
                </a>
              )}
              <div className="access-note" style={{marginTop:24}}>
                <i data-lucide="accessibility" style={{width:20,height:20}}/>
                <div><b>Accessibilité :</b> nos formations sont accessibles aux personnes en situation de handicap. Contactez notre référente handicap pour étudier les aménagements possibles.</div>
              </div>
            </div>
            <aside className="detail-side">
              <div className="detail-card">
                <h4 className="h4" style={{marginBottom:18}}>L'essentiel</h4>
                <div className="detail-meta">
                  <div className="detail-meta__row">
                    <i data-lucide="clock" style={{width:18,height:18,color:'var(--teal)'}}/>
                    <div><div className="detail-meta__lbl">Durée</div><div className="detail-meta__v">{f.duration}</div></div>
                  </div>
                  <div className="detail-meta__row">
                    <i data-lucide="map-pin" style={{width:18,height:18,color:'var(--teal)'}}/>
                    <div><div className="detail-meta__lbl">Format</div><div className="detail-meta__v">{f.format}</div></div>
                  </div>
                  <div className="detail-meta__row">
                    <i data-lucide="euro" style={{width:18,height:18,color:'var(--teal)'}}/>
                    <div><div className="detail-meta__lbl">Tarif</div><div className="detail-meta__v">{f.price}</div></div>
                  </div>
                  <div className="detail-meta__row">
                    <i data-lucide="users" style={{width:18,height:18,color:'var(--teal)'}}/>
                    <div><div className="detail-meta__lbl">Public</div><div className="detail-meta__v">{f.publicLabel}</div></div>
                  </div>
                </div>
                <a href="#/contact" className="btn btn--gold" style={{width:'100%',justifyContent:'center',marginTop:8}}>Demander un devis <i data-lucide="arrow-right" style={{width:16,height:16}}/></a>
                <a href="#/formations" className="btn btn--ghost" style={{width:'100%',justifyContent:'center',marginTop:10}}>Voir les autres formations</a>
                {f.audienceKey === 'pros' && (
                  <a href={window.FESTIN_DATA.catalogPdf} target="_blank" rel="noopener" className="btn btn--catalog" style={{width:'100%',justifyContent:'center',marginTop:10}}>
                    <i data-lucide="book-open" style={{width:16,height:16}}/> Consulter le catalogue
                  </a>
                )}
              </div>
              <div className="qualiopi-side">
                <img src={window.FESTIN_DATA.brand.qualiopi} alt="Logo Qualiopi" className="qualiopi-side__logo" onError={(e)=>{e.currentTarget.style.display='none';}}/>
                <div>
                  <div className="qualiopi-side__t">Certifié Qualiopi</div>
                  <div className="qualiopi-side__d">Au titre des actions de formation</div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- L'ASSOCIATION FESTIN — bloc présentation ----------
function FestinPresentation() {
  const stats = [
    { value: "453", label: "personnes accompagnées en 2025" },
    { value: "72 %", label: "de sorties en emploi ou formation" },
    { value: "14",  label: "territoires d'intervention" },
  ];
  const images = [
    "images/totem-festin-1.png",
    "images/totem-festin-2.png",
    "images/totem-festin-3.png",
    "images/totem-festin-4.png",
  ];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), 3000);
    return () => clearInterval(t);
  }, []);
  const [narrow, setNarrow] = React.useState(typeof window !== 'undefined' && window.innerWidth < 900);
  React.useEffect(() => {
    const onR = () => setNarrow(window.innerWidth < 900);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);

  return (
    <section style={{background:'var(--off-white)',padding:'96px 0'}}>
      <div className="container" style={{display:'grid',gridTemplateColumns: narrow ? '1fr' : '1.1fr 1fr',gap:64,alignItems:'center'}}>
        {narrow && (
          <div style={{position:'relative',width:'100%',aspectRatio:'1 / 1',borderRadius:'20%',overflow:'hidden'}}>
            {images.map((src,i) => (
              <img key={i} src={src} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity: i===idx ? 1 : 0,transition:'opacity 700ms ease'}}/>
            ))}
          </div>
        )}
        <div>
          <span className="eyebrow eyebrow--gold">L'association Festin</span>
          <h2 className="h2" style={{marginTop:8}}>Le goût d'avancer <em className="accent">ensemble.</em></h2>
          <p className="lede" style={{marginTop:18,color:'var(--ink-mid)'}}>
            Créée en 2015, l'association Festin mobilise la cuisine et le secteur de la restauration comme vecteurs de transformation et d'insertion sociale. Basée à Marseille, elle porte aujourd'hui des dispositifs complémentaires en faveur de l'alimentation durable, de l'inclusion et de l'évolution du secteur de la restauration.
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginTop:36}}>
            {stats.map((s,i) => (
              <div key={i} style={{background:'#fff',border:'1px solid var(--line)',borderRadius:14,padding:22}}>
                <div style={{fontSize:36,fontWeight:700,color:'var(--teal)',lineHeight:1,letterSpacing:'-0.02em'}}>{s.value}</div>
                <div style={{fontSize:12,color:'var(--ink-mid)',marginTop:8,lineHeight:1.4}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {!narrow && (
          <div style={{position:'relative',width:'100%',aspectRatio:'1 / 1',borderRadius:'20%',overflow:'hidden'}}>
            {images.map((src,i) => (
              <img key={i} src={src} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity: i===idx ? 1 : 0,transition:'opacity 700ms ease'}}/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- ÉQUIPE — bannière marquee infinie ----------
function EquipeMarquee() {
  // Équipe Festin 2025 — source : Rapport d'activité 2025, section Gouvernance
  const team = [
    // Direction
    { name: "Armand Hurault",       role: "Directeur",                                            initials: "AH" },
    { name: "Marine Vever",         role: "Directrice adjointe",                                  initials: "MV" },
    // Fonctions transverses
    { name: "Marie Plé",            role: "Assistante de gestion",                                initials: "MP" },
    { name: "Iris Liberty",         role: "Animation de communauté — Restaure",                   initials: "IL" },
    { name: "Iris Hutin",           role: "Communication (alternance)",                           initials: "IH" },
    { name: "Mattieu Donsimoni",    role: "Communication (alternance)",                           initials: "MD" },
    // Pôle Formation
    { name: "Florence Armitano",    role: "Responsable Pôle Formation",                           initials: "FA" },
    { name: "Mélanie Gambert",      role: "Coordinatrice réseau Des Étoiles et des Femmes",       initials: "MG" },
    { name: "Karima Hellou",        role: "Responsable Emploi & Inclusion — Étoiles et Femmes",   initials: "KH" },
    // Partenaire Estello Formation
    { name: "Lucie Gueydon",        role: "Chargée de projet formation (Estello Formation)",      initials: "LG" },
    // Les Beaux Mets
    { name: "Valentin Majan",       role: "Chef de cuisine — Les Beaux Mets",                     initials: "VM" },
    { name: "Camille Lafon",        role: "Second de cuisine — Les Beaux Mets",                   initials: "CL" },
    { name: "Boris Ruel",           role: "Second de cuisine — Les Beaux Mets",                  initials: "BR" },
  ];
  const card = (m, i) => (
    <div key={i} style={{
      display:'flex', flexDirection:'column', alignItems:'center', gap:14,
      flexShrink:0, padding:'8px 28px', minWidth:220,
    }}>
      <div style={{
        width:96, height:96, borderRadius:'50%',
        background:'linear-gradient(135deg, var(--teal) 0%, var(--teal-deep) 100%)',
        color:'var(--gold-light)',
        display:'grid', placeItems:'center',
        fontSize:30, fontWeight:700, letterSpacing:'-0.02em',
        border:'3px solid #fff',
        boxShadow:'0 4px 16px rgba(13,43,48,0.10)',
      }}>{m.initials}</div>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:14, fontWeight:700, color:'var(--ink)'}}>{m.name}</div>
        <div style={{fontSize:12, color:'var(--ink-soft)', marginTop:2, maxWidth:220, lineHeight:1.4}}>{m.role}</div>
      </div>
    </div>
  );
  return (
    <section style={{padding:'80px 0', background:'var(--cream)', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', overflow:'hidden'}}>
      <style>{`
        @keyframes equipe-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .equipe-track { display: flex; align-items: center; width: max-content; animation: equipe-scroll 80s linear infinite; }
      `}</style>
      <div className="container" style={{textAlign:'center', marginBottom:36}}>
        <span className="eyebrow">L'équipe Festin</span>
        <h2 className="h2" style={{marginTop:8}}>Les visages <em className="accent">derrière l'écosystème</em></h2>
      </div>
      <div style={{overflow:'hidden', width:'100%'}}>
        <div className="equipe-track">
          {team.map(card)}
          {team.map((m, i) => card(m, 'b'+i))}
        </div>
      </div>
    </section>
  );
}

// ---------- HISTORIQUE — frise verticale ----------
function HistoriqueSection() {
  const jalons = [
    { year: '1992', title: 'La Table de Cana',                   desc: 'Création du premier traiteur en insertion à Marseille — la pierre fondatrice.' },
    { year: '2015', title: 'Naissance de Des Étoiles et des Femmes', desc: 'Lancement à Marseille du programme d\'insertion des femmes par la haute gastronomie.' },
    { year: '2018', title: 'Premières antennes nationales',       desc: 'Le programme essaime à Lille, Bordeaux, Strasbourg, Lyon, Nantes.' },
    { year: '2022', title: 'Ouverture des Beaux Mets',            desc: 'Le premier restaurant en prison ouvert au public en France — Marseille, Baumettes.' },
    { year: '2024', title: 'Le mouvement Restaure',               desc: '4 structures co-fondatrices, 35 structures engagées, 700 signataires du manifeste.' },
    { year: '2025', title: 'Promotion Tournesol',                 desc: 'Lancement du parcours pour personnes réfugiées et primo-arrivantes, avec Refugee Food.' },
  ];
  return (
    <section style={{padding:'96px 0', background:'var(--off-white)'}}>
      <div className="container">
        <div style={{maxWidth:760, marginBottom:48}}>
          <span className="eyebrow">Historique</span>
          <h2 className="h2">33 ans à transformer <em className="accent">le secteur par la cuisine</em></h2>
        </div>
        <div style={{position:'relative', maxWidth:880, margin:'0 auto'}}>
          <div style={{position:'absolute', left:24, top:8, bottom:8, width:2, background:'var(--teal-tint-2)'}}/>
          <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:36}}>
            {jalons.map((j, i) => (
              <li key={i} style={{display:'flex', gap:32, alignItems:'flex-start', position:'relative'}}>
                <div style={{
                  width:50, height:50, borderRadius:'50%',
                  background:'#fff', border:'2px solid var(--teal)',
                  color:'var(--teal)', fontSize:13, fontWeight:700,
                  display:'grid', placeItems:'center', flexShrink:0,
                  position:'relative', zIndex:2,
                }}>{j.year}</div>
                <div style={{flex:1, paddingTop:4}}>
                  <h3 style={{fontSize:20, fontWeight:700, lineHeight:1.3, margin:'0 0 6px'}}>{j.title}</h3>
                  <p style={{fontSize:15, color:'var(--ink-mid)', lineHeight:1.6, margin:0}}>{j.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ---------- VALEURS ----------
function ValeursSection() {
  const valeurs = [
    { icon:'heart', title:'Dignité',   desc:'Chaque personne accompagnée est un sujet, pas un dossier. Nous concevons des parcours qui respectent les rythmes, les histoires, les choix.' },
    { icon:'mountain', title:'Exigence',  desc:'Viser l\'excellence n\'est pas un luxe. C\'est ce qui rend l\'insertion durable et l\'engagement crédible auprès du secteur.' },
    { icon:'users-round', title:'Collectif', desc:'Aucun projet Festin ne se fait seul. Nous avançons avec des chefs, des restaurants, des financeurs, des pairs.' },
    { icon:'sprout', title:'Transformation', desc:'Notre objectif n\'est pas seulement d\'accompagner des individus — c\'est de faire bouger les pratiques de tout un secteur.' },
  ];
  return (
    <section style={{padding:'96px 0', background:'var(--cream)'}}>
      <div className="container">
        <div style={{maxWidth:760, marginBottom:48}}>
          <span className="eyebrow">Valeurs fondamentales</span>
          <h2 className="h2">Quatre convictions qui <em className="accent">guident nos choix</em></h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
          {valeurs.map((v, i) => (
            <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:16, padding:28}}>
              <div style={{width:48, height:48, borderRadius:12, background:'rgba(232,168,37,0.16)', display:'grid', placeItems:'center', color:'var(--gold)', marginBottom:18}}>
                <i data-lucide={v.icon} style={{width:24, height:24}}/>
              </div>
              <h3 style={{fontSize:18, fontWeight:700, lineHeight:1.3, margin:'0 0 8px'}}>{v.title}</h3>
              <p style={{fontSize:14, color:'var(--ink-mid)', lineHeight:1.55, margin:0}}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- IMPACT CUMULÉ (sur About) — bandeau résumé ----------
function ImpactCumuleBande() {
  return (
    <section style={{padding:'80px 0', background:'var(--teal-deep)', color:'#fff'}}>
      <div className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:24, flexWrap:'wrap', marginBottom:36}}>
          <div>
            <span className="eyebrow eyebrow--gold">Impact cumulé</span>
            <h2 className="h2" style={{color:'#fff', marginTop:8}}>10 ans, <em className="accent">une trajectoire</em></h2>
          </div>
          <a href="#/impact" className="btn btn--gold">Voir notre impact détaillé <i data-lucide="arrow-right" style={{width:16, height:16}}/></a>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12}}>
          {[
            {value:'453',   label:'personnes accompagnées en 2025'},
            {value:'72 %',  label:'de sorties en emploi ou formation'},
            {value:'14',    label:'territoires d\'intervention'},
            {value:'5',     label:'projets complémentaires'},
          ].map((s,i) => (
            <div key={i} style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.10)', borderRadius:14, padding:24}}>
              <div style={{fontSize:36, fontWeight:700, color:'var(--gold)', lineHeight:1, letterSpacing:'-0.02em'}}>{s.value}</div>
              <div style={{fontSize:12, color:'rgba(255,255,255,0.7)', marginTop:8, lineHeight:1.4}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- INSTAGRAM FEED — widget Behold.so (gratuit) ----------
// CONFIGURATION :
//   1. Créez un compte gratuit sur https://behold.so
//   2. Connectez le compte Instagram @association_festin
//   3. Créez un feed et copiez le Feed ID fourni par Behold
//   4. Remplacez la valeur de BEHOLD_FEED_ID ci-dessous par votre Feed ID
const BEHOLD_FEED_ID = 'FEED_ID_BEHOLD';

function InstagramFeed() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const widget = document.createElement('behold-widget');
    widget.setAttribute('feed-id', BEHOLD_FEED_ID);
    ref.current.innerHTML = '';
    ref.current.appendChild(widget);
    if (!document.querySelector('[data-behold-js]')) {
      const s = document.createElement('script');
      s.type = 'module';
      s.src = 'https://w.behold.so/widget.js';
      s.setAttribute('data-behold-js', '1');
      document.head.appendChild(s);
    }
  }, []);
  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16,
                   paddingBottom:14, borderBottom:'1px solid var(--line)'}}>
        <i data-lucide="instagram" style={{width:18, height:18, color:'var(--teal)'}} />
        <span style={{fontWeight:600, fontSize:14, color:'var(--ink)'}}>@association_festin</span>
        <a href="https://www.instagram.com/association_festin/"
           target="_blank" rel="noopener noreferrer"
           style={{marginLeft:'auto', fontSize:12, color:'var(--teal)',
                   display:'flex', alignItems:'center', gap:4, textDecoration:'none'}}>
          Voir le profil <i data-lucide="external-link" style={{width:11, height:11}} />
        </a>
      </div>
      <div ref={ref} />
    </div>
  );
}

// ---------- PROJET ASSOCIATIF — mission narrative pour AboutPage ----------
function ProjetAssociatif() {
  const piliers = [
    {
      n: "01",
      title: "Faire de la cuisine un levier d'émancipation",
      body: "Festin agit sur la conviction qu'un métier-passion, exercé dans des conditions dignes, peut radicalement changer une trajectoire de vie. Depuis dix ans, l'association déploie cette intuition à travers cinq projets complémentaires en faveur de l'insertion, de la formation et de la transformation du secteur.",
    },
    {
      n: "02",
      title: "Ne jamais opposer excellence et inclusion",
      body: "L'excellence gastronomique n'est pas réservée à quelques-uns. Aux Beaux Mets, à La Table de Cana, dans les promotions Des Étoiles et des Femmes, les apprenantes et apprenants côtoient le meilleur du métier : grandes maisons partenaires, chefs étoilés, jurys exigeants. C'est cette ambition qui produit l'impact.",
    },
    {
      n: "03",
      title: "Transformer le secteur, pas seulement les individus",
      body: "Festin est aussi un acteur de plaidoyer. Avec le mouvement Restaure, l'association fédère un collectif national de restaurateurs, formateurs et structures de l'ESS pour faire évoluer les conditions de travail, prévenir les violences en cuisine et construire un modèle durable et respectueux.",
    },
  ];
  return (
    <section style={{padding:'96px 0', background:'var(--off-white)'}}>
      <div className="container">
        <div style={{maxWidth:760, marginBottom:64}}>
          <span className="eyebrow">Notre projet associatif</span>
          <h2 className="h2" style={{marginTop:8}}>Trois convictions, <em className="accent">une trajectoire</em></h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:80, alignItems:'flex-start'}}>
          {/* Gauche : convictions */}
          <div style={{display:'flex', flexDirection:'column', gap:48}}>
            {piliers.map((p, i) => (
              <div key={i} style={{display:'grid', gridTemplateColumns:'90px 1fr', gap:32, alignItems:'flex-start'}}>
                <div style={{fontSize:48, fontWeight:700, color:'var(--gold)', lineHeight:1, letterSpacing:'-0.02em'}}>{p.n}</div>
                <div>
                  <h3 style={{fontSize:24, fontWeight:700, lineHeight:1.3, margin:'0 0 12px', color:'var(--ink)'}}>{p.title}</h3>
                  <p style={{fontSize:17, lineHeight:1.65, color:'var(--ink-mid)', margin:0}}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Droite : feed Instagram */}
          <div style={{position:'sticky', top:100}}>
            <InstagramFeed />
          </div>
        </div>
      </div>
    </section>
  );
}
// ---------- QUI SOMMES-NOUS PAGE — densifiée ----------
function AboutPage() {
  return (
    <div data-screen-label="04 Qui sommes-nous">
      <PageHeader
        eyebrow="L'association Festin"
        title="Former, inclure,"
        accent="transformer."
        subtitle="Née à Marseille en 2015, Festin construit depuis 10 ans un écosystème unique au service d'une restauration plus inclusive."
        breadcrumb={[{label:'Accueil',href:'#/'},{label:'Qui sommes-nous'}]}
      />
      <FestinPresentation />
      <ProjetAssociatif />
      <EquipeMarquee />
      <HistoriqueSection />
      <ValeursSection />
      <ImpactCumuleBande />
      <Temoignages />
    </div>
  );
}

// ---------- CONTACT PAGE ----------
function ContactPage() {
  return (
    <div data-screen-label="05 Contact">
      <PageHeader
        eyebrow="Nous écrire"
        title="Parlons de votre"
        accent="projet"
        subtitle="Notre équipe pédagogique vous répond sous 48h ouvrées."
        breadcrumb={[{label:'Accueil',href:'#/'},{label:'Contact'}]}
      />
      <Contact />
    </div>
  );
}

// ---------- 404 ----------
function NotFoundPage() {
  return (
    <div data-screen-label="404">
      <PageHeader
        eyebrow="Erreur 404"
        title="Page"
        accent="introuvable"
        subtitle="Cette page n'existe pas ou a été déplacée."
        breadcrumb={[{label:'Accueil',href:'#/'}]}
      />
      <section style={{padding:'72px 0',textAlign:'center'}}>
        <a href="#/" className="btn btn--teal">Retour à l'accueil</a>
      </section>
    </div>
  );
}

// ---------- L'ÉCOSYSTÈME FESTIN — 5 cartes projets ----------
function ProjetThumb({ icon }) {
  // Placeholder SVG — teal background with gold icon glyph
  return (
    <div style={{position:'relative',aspectRatio:'16/9',background:'linear-gradient(135deg, var(--teal) 0%, var(--teal-deep) 100%)',overflow:'hidden'}}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.12}}>
        <defs>
          <pattern id={"dots-"+icon} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="0.8" fill="#fff"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill={"url(#dots-"+icon+")"} />
      </svg>
      <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center'}}>
        <div style={{width:84,height:84,borderRadius:'50%',background:'rgba(232,168,37,0.16)',border:'1.5px solid rgba(232,168,37,0.55)',display:'grid',placeItems:'center',color:'var(--gold)'}}>
          <i data-lucide={icon} style={{width:36,height:36}}/>
        </div>
      </div>
    </div>
  );
}

function EcosystemeSection() {
  const projets = window.FESTIN_DATA.projets;
  return (
    <section style={{background:'var(--cream)',padding:'96px 0'}}>
      <div className="container">
        <div className="formations__head" style={{marginBottom:48,maxWidth:760}}>
          <span className="eyebrow">Nos 5 projets</span>
          <h2 className="h2">Un écosystème au service <em className="accent">d'une restauration inclusive</em></h2>
        </div>
        <div className="formations__grid">
          {projets.map((p) => (
            <a key={p.id} className="formation-card" href={`#/projets/${p.id}`}>
              <div className="formation-card__img" style={{aspectRatio:'4/3',background:'#217078'}}>
                <img
                  src={`https://placehold.co/800x600/217078/FFF?text=${encodeURIComponent(p.shortTitle)}`}
                  alt={p.shortTitle}
                  style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}
                />
              </div>
              <div className="formation-card__body">
                <h3>{p.shortTitle}</h3>
                <p className="formation-card__desc" style={{fontWeight:600,color:'var(--ink)'}}>{p.tagline}</p>
                <div className="formation-card__bottom">
                  <span className="lnk">Découvrir <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- PROJET MEDIA EMBED ─────────────────────────────────────────────
function CarouselMedia({ images }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div style={{marginTop:32, position:'relative', borderRadius:14, overflow:'hidden', aspectRatio:'16/9'}}>
      {images.map((src, i) => (
        <img key={i} src={src} alt="" style={{
          position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover',
          opacity: i === idx ? 1 : 0,
          transition:'opacity 800ms ease',
        }}/>
      ))}
      {images.length > 1 && (
        <>
          <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)}
            style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.9)', border:'none', borderRadius:'50%', width:36, height:36, cursor:'pointer', display:'grid', placeItems:'center', zIndex:2}}>
            <i data-lucide="chevron-left" style={{width:18,height:18}}/>
          </button>
          <button onClick={() => setIdx(i => (i + 1) % images.length)}
            style={{position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.9)', border:'none', borderRadius:'50%', width:36, height:36, cursor:'pointer', display:'grid', placeItems:'center', zIndex:2}}>
            <i data-lucide="chevron-right" style={{width:18,height:18}}/>
          </button>
          <div style={{position:'absolute', bottom:12, left:0, right:0, display:'flex', justifyContent:'center', gap:6, zIndex:2}}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                style={{width: i === idx ? 20 : 8, height:8, borderRadius:4, background: i === idx ? 'var(--gold)' : 'rgba(255,255,255,0.6)', border:'none', cursor:'pointer', transition:'width 200ms ease'}}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjetMediaEmbed({ p }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (p.mediaType === 'instagram' && ref.current) {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else if (!document.querySelector('script[src*="instagram.com/embed"]')) {
        const s = document.createElement('script');
        s.src = '//www.instagram.com/embed.js';
        s.async = true;
        document.body.appendChild(s);
      }
    }
  }, [p.mediaType]);

  if (p.mediaType === 'youtube' && p.mediaId) {
    return (
      <iframe
        width="100%"
        style={{aspectRatio:'16/9', borderRadius:14, marginTop:32, display:'block', border:'none'}}
        src={"https://www.youtube.com/embed/" + p.mediaId}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (p.mediaType === 'instagram' && p.mediaUrl) {
    return (
      <div ref={ref} style={{marginTop:32}}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={p.mediaUrl}
          data-instgrm-version="14"
          style={{
            background:'#FFF', border:0, borderRadius:3,
            boxShadow:'0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            maxWidth:400, minWidth:326, padding:0, width:'calc(100% - 2px)',
          }}
        />
      </div>
    );
  }
  if (p.mediaType === 'carousel' && p.carouselImages && p.carouselImages.length > 0) {
    return <CarouselMedia images={p.carouselImages} />;
  }
  return null;
}

function ProjetTemoignages({ temoignages }) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    if (temoignages.length <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % temoignages.length), 10000);
    return () => clearInterval(t);
  }, [temoignages.length]);

  if (!temoignages || temoignages.length === 0) return null;
  const t = temoignages[idx];
  const initiale = t && t.prenom ? t.prenom[0].toUpperCase() : '?';

  return (
    <section style={{background:'var(--teal-deep)', color:'#fff', padding:'80px 0'}}>
      <div className="container" style={{maxWidth:800, margin:'0 auto', textAlign:'center'}}>
        <span className="eyebrow eyebrow--gold">Témoignages</span>
        <div style={{marginTop:40, position:'relative', minHeight:200}}>
          {temoignages.map((tm, i) => (
            <div key={i} style={{
              opacity: i === idx ? 1 : 0,
              transition:'opacity 400ms ease',
              position: i === 0 ? 'relative' : 'absolute',
              inset: i === 0 ? 'auto' : 0,
              pointerEvents: i === idx ? 'auto' : 'none',
            }}>
              {tm.placeholder ? (
                <div style={{border:'2px dashed rgba(255,255,255,0.3)', borderRadius:14, padding:32, color:'rgba(255,255,255,0.5)', fontSize:15}}>
                  [AJOUTER TÉMOIGNAGE]
                </div>
              ) : (
                <>
                  <div style={{width:56, height:56, borderRadius:'50%', background:'var(--gold)', display:'grid', placeItems:'center', color:'var(--teal-deep)', fontSize:22, fontWeight:700, margin:'0 auto 20px'}}>
                    {initiale}
                  </div>
                  <p style={{fontSize:20, fontStyle:'italic', lineHeight:1.6, color:'rgba(255,255,255,0.94)', margin:'0 0 20px'}}>
                    "{tm.citation}"
                  </p>
                  <div style={{fontWeight:700, color:'var(--gold)', fontSize:15}}>{tm.prenom}</div>
                  <div style={{fontSize:13, color:'rgba(255,255,255,0.65)', marginTop:4}}>{tm.role}</div>
                </>
              )}
            </div>
          ))}
        </div>
        {temoignages.length > 1 && (
          <div style={{display:'flex', justifyContent:'center', gap:8, marginTop:28}}>
            {temoignages.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                style={{width: i === idx ? 24 : 8, height:8, borderRadius:4,
                  background: i === idx ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                  border:'none', cursor:'pointer', transition:'width 280ms ease'}}
              />
            ))}
          </div>
        )}
        <div style={{display:'flex', gap:12, justifyContent:'center', marginTop:36, flexWrap:'wrap'}}>
          <a href="https://www.helloasso.com/associations/festin" target="_blank" rel="noopener" className="btn btn--gold">
            Faire un don <i data-lucide="heart" style={{width:16,height:16}}/>
          </a>
          <a href="#/contact" className="btn btn--ghost-w">Nous contacter</a>
        </div>
      </div>
    </section>
  );
}

function fmtDatePresse(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

function ProjetPresse({ p }) {
  const allPresse = (window.FESTIN_DATA.presse || []);
  const filters = p.presseFilter || [];
  const filtered = allPresse
    .filter(a => filters.some(f => (a.tags || []).includes(f) || (a.dispositif || '') === f))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);
  const cards = [...filtered];
  while (cards.length < 3) cards.push({ placeholder: true });
  return (
    <section style={{padding:'80px 0', background:'var(--off-white)'}}>
      <div className="container">
        <div style={{maxWidth:760, marginBottom:48}}>
          <span className="eyebrow">Presse & médias</span>
          <h2 className="h2" style={{marginTop:8}}>Les <em className="accent">actualités</em></h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
          {cards.map((a, i) => (
            a.placeholder ? (
              <div key={i} style={{border:'2px dashed var(--line)', borderRadius:14, padding:28, display:'flex', alignItems:'center', justifyContent:'center', minHeight:160, color:'var(--ink-soft)', fontSize:14}}>
                [AJOUTER ARTICLE]
              </div>
            ) : (
              <a key={i} href={a.href || '#'} target="_blank" rel="noopener" className="formation-card" style={{cursor:'pointer'}}>
                <div className="formation-card__body">
                  <div style={{display:'flex', gap:8, marginBottom:12, flexWrap:'wrap'}}>
                    <span style={{fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--teal)', background:'var(--teal-tint)', borderRadius:4, padding:'2px 8px'}}>
                      {a.dispositif || (a.tags && a.tags[0])}
                    </span>
                    {a.type && <span style={{fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--ink-mid)', background:'var(--cream)', borderRadius:4, padding:'2px 8px'}}>{a.type}</span>}
                  </div>
                  <h3 style={{fontSize:16, fontWeight:700, lineHeight:1.35, margin:'0 0 8px'}}>{a.title}</h3>
                  <div style={{fontSize:13, color:'var(--ink-mid)', margin:'0 0 12px'}}>
                    {a.source}{a.source && a.date && ' · '}{fmtDatePresse(a.date)}
                  </div>
                  <span className="lnk" style={{fontSize:13}}>
                    <i data-lucide="external-link" style={{width:12,height:12}}/> Lire l'article
                  </span>
                </div>
              </a>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- PROJET HERO — carrousel image full-width ----------
function ProjetHero({ p }) {
  const slides = (p.heroImages && p.heroImages.length > 0) ? p.heroImages : [
    "https://placehold.co/1920x900/0F3C44/E8A825?text=" + encodeURIComponent(p.shortTitle + ' — 1'),
    "https://placehold.co/1920x900/1D6B78/FAF8F2?text=" + encodeURIComponent(p.shortTitle + ' — 2'),
    "https://placehold.co/1920x900/0A2D33/E8A825?text=" + encodeURIComponent(p.shortTitle + ' — 3'),
    "https://placehold.co/1920x900/217078/FFFFFF?text=" + encodeURIComponent(p.shortTitle + ' — 4'),
  ];
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);
  return (
    <section style={{position:'relative', width:'100%', height:'80vh', minHeight:520, overflow:'hidden', background:'var(--teal-deep)', color:'#fff'}}>
      {slides.map((src, i) => (
        <div key={i} style={{
          position:'absolute', inset:0,
          background:'url(' + src + ') center/cover no-repeat',
          opacity: i === idx ? 1 : 0,
          transition: 'opacity 1200ms cubic-bezier(0.22,1,0.36,1)',
          zIndex: 1,
        }}/>
      ))}
      <div style={{position:'absolute', inset:0, zIndex:2,
        background:'linear-gradient(180deg, rgba(10,45,51,0.30) 0%, rgba(10,45,51,0.0) 30%, rgba(10,45,51,0.0) 55%, rgba(10,45,51,0.85) 100%)',
        pointerEvents:'none',
      }}/>
      <div className="container" style={{position:'absolute', inset:'auto 0 0 0', zIndex:3, paddingBottom:96}}>
        <nav className="breadcrumb" style={{marginBottom:18}}>
          <a href="#/">Accueil</a>
          <span className="breadcrumb__sep">/</span>
          <a href="#/projets/des-etoiles-et-des-femmes">Nos projets</a>
          <span className="breadcrumb__sep">/</span>
          <span>{p.shortTitle}</span>
        </nav>
        <span className="eyebrow eyebrow--gold">{p.eyebrow}</span>
        <h1 className="h1" style={{maxWidth:880, marginTop:8, textShadow:'0 2px 18px rgba(10,45,51,0.65), 0 1px 2px rgba(10,45,51,0.5)'}}>
          <span style={{color:'rgb(255,255,255)'}}>{p.title}</span>{' '}
          {p.accent && <em className="accent">{p.accent}</em>}
        </h1>
        <p className="lede" style={{color:'rgba(255,255,255,0.92)', marginTop:18, maxWidth:680, textShadow:'0 1px 10px rgba(10,45,51,0.55)'}}>{p.subtitle}</p>
      </div>
      {p.logo && (
        <div style={{
          position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)',
          background:'#fff', borderRadius:16, padding:'12px 24px',
          boxShadow:'0 12px 40px rgba(10,45,51,0.18)', display:'flex', alignItems:'center',
          gap:12, zIndex:10, whiteSpace:'nowrap',
        }}>
          <img src={p.logo} alt={p.shortTitle}
            style={{height:48, width:'auto', objectFit:'contain', display:'block'}}
            onError={(e) => { e.currentTarget.style.display='none'; }}/>
        </div>
      )}
      <div style={{position:'absolute', bottom:24, left:0, right:0, zIndex:4, display:'flex', justifyContent:'center', gap:10}}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={"Aller à l'image " + (i+1)}
            style={{
              width: i === idx ? 28 : 10, height:10, borderRadius:5,
              background: i === idx ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
              border:'none', cursor:'pointer',
              transition:'width 280ms ease, background 280ms ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}
// ---------- PROJET PAGE — one-pager réutilisable ----------
function ProjetPage({ id }) {
  const p = window.FESTIN_DATA.projets.find(x => x.id === id);
  if (!p) return <NotFoundPage />;

  return (
    <div data-screen-label={"Projet — " + p.shortTitle}>

      {/* A. Hero avec logo flottant */}
      <ProjetHero p={p} />

      {/* B. Stats */}
      <section style={{background:'var(--cream)', paddingTop:72, paddingBottom:48, position:'relative'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'repeat(' + p.stats.length + ', 1fr)', gap:16}}>
            {p.stats.map((s, i) => (
              <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:24}}>
                <div style={{fontSize:38, fontWeight:700, color:'var(--teal)', lineHeight:1, letterSpacing:'-0.02em'}}>
                  {s.value}{s.unit && <small style={{fontSize:20}}>{s.unit}</small>}
                </div>
                <div style={{fontSize:13, color:'var(--ink-mid)', marginTop:10, lineHeight:1.4}}>{s.label}</div>
              </div>
            ))}
          </div>
          {p.siteUrl && (
            <div style={{textAlign:'center', marginTop:28}}>
              <a href={p.siteUrl} target="_blank" rel="noopener" className="btn btn--ghost">
                Visiter {p.siteName} <i data-lucide="external-link" style={{width:14,height:14}}/>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* C. Présentation 2 colonnes */}
      <section style={{padding:'80px 0', background:'var(--off-white)'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:64, alignItems:'flex-start'}}>
          {/* Gauche : description + média */}
          <div>
            <span className="eyebrow">À propos du projet</span>
            <h2 className="h2" style={{marginTop:8, marginBottom:18}}>
              {p.presentationTitle || p.tagline}
            </h2>
            <p className="lede" style={{color:'var(--ink-mid)', lineHeight:1.7}}>{p.description}</p>
            <ProjetMediaEmbed p={p} />
          </div>
          {/* Droite : points + implication (sticky) */}
          <aside style={{position:'sticky', top:100}}>
            <div style={{background:'var(--cream)', borderRadius:16, padding:28, border:'1px solid var(--line)'}}>
              <span className="eyebrow" style={{color:'var(--teal)'}}>LE PROJET</span>
              <p style={{fontSize:15, lineHeight:1.65, color:'var(--ink-mid)', margin:'12px 0 20px'}}>
                {p.projetPhrase || p.short}
              </p>
              {p.projetPoints && p.projetPoints.length > 0 && (
                <ul style={{listStyle:'none', padding:0, margin:'0 0 24px', display:'flex', flexDirection:'column', gap:10}}>
                  {p.projetPoints.map((pt, j) => (
                    <li key={j} style={{display:'flex', gap:10, alignItems:'flex-start', fontSize:14, lineHeight:1.5, color:'var(--ink)'}}>
                      <i data-lucide="check-circle" style={{width:16, height:16, color:'var(--gold)', flexShrink:0, marginTop:2}}/>
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
              {p.projetCtaLabel && p.projetCtaHref && (
                <a href={p.projetCtaHref}
                   target={p.projetCtaHref.startsWith('http') ? '_blank' : undefined}
                   rel={p.projetCtaHref.startsWith('http') ? 'noopener' : undefined}
                   className="btn btn--teal" style={{width:'100%', justifyContent:'center'}}>
                  {p.projetCtaLabel} <i data-lucide="arrow-right" style={{width:16,height:16}}/>
                </a>
              )}
              {p.implicationTitle && (
                <>
                  <hr style={{margin:'24px 0', border:'none', borderTop:'1px solid var(--line)'}}/>
                  <h4 style={{fontSize:15, fontWeight:700, marginBottom:8, color:'var(--ink)'}}>{p.implicationTitle}</h4>
                  <p style={{fontSize:13, lineHeight:1.6, color:'var(--ink-mid)', marginBottom:16}}>{p.implicationText}</p>
                  {p.implicationCtaLabel && (
                    <a href={p.implicationCtaHref}
                       target={p.implicationCtaHref && p.implicationCtaHref.startsWith('http') ? '_blank' : undefined}
                       rel={p.implicationCtaHref && p.implicationCtaHref.startsWith('http') ? 'noopener' : undefined}
                       className="btn btn--ghost" style={{width:'100%', justifyContent:'center', fontSize:13}}>
                      {p.implicationCtaLabel}
                    </a>
                  )}
                </>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* D. Témoignages */}
      {p.temoignages && p.temoignages.length > 0 && (
        <ProjetTemoignages temoignages={p.temoignages} />
      )}

      {/* E. Presse */}
      <ProjetPresse p={p} />

    </div>
  );
}
// ---------- SADI CARNOT — placeholder ----------
function SadiCarnotPage() {
  return (
    <div data-screen-label="Restaurants — Sadi Carnot">
      <PageHeader
        eyebrow="Prochainement"
        title="Projet"
        accent="Sadi Carnot"
        subtitle="Un nouveau projet de restaurant d'insertion — en cours de développement."
        breadcrumb={[
          {label:'Accueil',href:'#/'},
          {label:'Restaurants'},
          {label:'Sadi Carnot'}
        ]}
      />
      <section style={{padding:'96px 0',background:'var(--off-white)'}}>
        <div className="container">
          <div style={{background:'var(--cream)',borderRadius:18,padding:'72px 48px',textAlign:'center',maxWidth:720,margin:'0 auto'}}>
            <div style={{width:80,height:80,borderRadius:'50%',background:'rgba(232,168,37,0.14)',display:'grid',placeItems:'center',color:'var(--gold)',margin:'0 auto 24px'}}>
              <i data-lucide="hard-hat" style={{width:36,height:36}}/>
            </div>
            <h2 className="h3" style={{marginBottom:14}}>En cours de développement</h2>
            <p className="lede" style={{color:'var(--ink-mid)',marginBottom:28,maxWidth:520,margin:'0 auto 28px'}}>
              Ce projet est en cours de développement. Revenez bientôt pour en savoir plus, ou contactez-nous pour plus d'informations.
            </p>
            <a href="#/contact" className="btn btn--teal">Nous contacter <i data-lucide="arrow-right" style={{width:16,height:16}}/></a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------- ACCOMPAGNEMENT — INSERTION ----------
function AccompagnementInsertionPage() {
  const projetsInsertion = window.FESTIN_DATA.projets.filter(p =>
    ['des-etoiles-et-des-femmes', 'tournesol', 'les-beaux-mets', 'la-table-de-cana'].includes(p.id)
  );
  return (
    <div data-screen-label="Accompagnement — Insertion">
      <PageHeader
        eyebrow="Vous êtes en parcours d'insertion"
        title="Accompagnement à"
        accent="l'insertion"
        subtitle="Un parcours diplômant, un accompagnement social global, un horizon professionnel. Festin construit votre projet avec vous, jusqu'à l'emploi."
        breadcrumb={[
          {label:'Accueil', href:'#/'},
          {label:'Accompagnement'},
          {label:'Insertion'},
        ]}
      />

      {/* Chiffres clés */}
      <section style={{background:'var(--cream)', padding:'72px 0'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16}}>
            {[
              {value:'453', label:'personnes accompagnées en 2025'},
              {value:'72 %', label:'de sorties en emploi ou formation'},
              {value:'14', label:'territoires d\'intervention'},
              {value:'5', label:'projets complémentaires'},
            ].map((s, i) => (
              <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:24}}>
                <div style={{fontSize:38, fontWeight:700, color:'var(--teal)', lineHeight:1, letterSpacing:'-0.02em'}}>{s.value}</div>
                <div style={{fontSize:13, color:'var(--ink-mid)', marginTop:10, lineHeight:1.4}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Texte d'introduction */}
      <section style={{padding:'80px 0', background:'var(--off-white)'}}>
        <div className="container" style={{maxWidth:880, margin:'0 auto'}}>
          <span className="eyebrow">Notre approche</span>
          <h2 className="h2" style={{marginTop:8, marginBottom:18}}>Ne pas former un métier, accompagner <em className="accent">une personne</em></h2>
          <p className="lede" style={{color:'var(--ink-mid)'}}>
            L'insertion par la cuisine, c'est notre spécialité depuis 2015. Femmes éloignées de l'emploi, personnes réfugiées ou primo-arrivantes, personnes détenues ou récemment libérées : nos parcours combinent diplôme reconnu, expérience terrain en restaurant, et accompagnement social complet (mobilité, garde d'enfants, logement, soutien linguistique).
          </p>
          <p className="body" style={{marginTop:16}}>
            Tous nos parcours sont entièrement gratuits, financés par les pouvoirs publics et nos mécènes. Une indemnisation est possible selon votre situation.
          </p>
        </div>
      </section>

      {/* Projets d'insertion */}
      <section style={{background:'var(--cream)', padding:'96px 0'}}>
        <div className="container">
          <div className="formations__head" style={{marginBottom:48, maxWidth:760}}>
            <span className="eyebrow">Nos parcours d'insertion</span>
            <h2 className="h2">Quatre dispositifs pour <em className="accent">quatre publics</em></h2>
          </div>
          <div className="formations__grid">
            {projetsInsertion.map((p) => (
              <a key={p.id} className="formation-card" href={`#/projets/${p.id}`}>
                <div className="formation-card__img">
                  <ProjetThumb icon={p.icon} />
                </div>
                <div className="formation-card__body">
                  <span className="eyebrow">{p.eyebrow}</span>
                  <h3>{p.shortTitle}</h3>
                  <p className="formation-card__desc" style={{fontWeight:600, color:'var(--ink)'}}>{p.tagline}</p>
                  <p className="formation-card__desc">{p.short}</p>
                  <div className="formation-card__bottom">
                    <span className="lnk">Découvrir <i data-lucide="arrow-right" style={{width:14, height:14}}/></span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA contact */}
      <section style={{background:'var(--teal-deep)', color:'#fff', padding:'80px 0', textAlign:'center'}}>
        <div className="container">
          <span className="eyebrow eyebrow--gold">Candidater à une promotion</span>
          <h2 className="h2" style={{color:'#fff', maxWidth:680, margin:'14px auto 18px'}}>Prêt à construire votre <em className="accent">projet professionnel</em>&nbsp;?</h2>
          <p className="lede" style={{color:'rgba(255,255,255,0.78)', maxWidth:560, margin:'0 auto 32px'}}>Contactez-nous pour étudier votre éligibilité et démarrer un parcours.</p>
          <a href="#/contact" className="btn btn--gold">Nous contacter <i data-lucide="arrow-right" style={{width:16, height:16}}/></a>
        </div>
      </section>
    </div>
  );
}

// ---------- ACCOMPAGNEMENT — PROFESSIONNELS ----------
function AccompagnementProsPage() {
  const formationsProsIds = ['vss', 'management'];
  const formationsPros = window.FESTIN_DATA.formations.filter(f => formationsProsIds.includes(f.id));
  return (
    <div data-screen-label="Accompagnement — Professionnels">
      <PageHeader
        eyebrow="Vous êtes restaurateur"
        title="Solution RH pour"
        accent="les restaurateurs"
        subtitle="Recrutement inclusif, fidélisation des équipes, prévention des violences, management juste. Une réponse opérationnelle aux tensions RH du secteur — conçue par et pour des professionnels."
        breadcrumb={[
          {label:'Accueil', href:'#/'},
          {label:'Accompagnement'},
          {label:'Professionnels'},
        ]}
      />

      {/* 3 piliers de l'offre RH */}
      <section style={{padding:'80px 0', background:'var(--off-white)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">L'offre Festin pour les restaurateurs</span>
            <h2 className="h2">Trois leviers pour <em className="accent">transformer votre établissement</em></h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
            {[
              {
                icon: 'users',
                title: 'Recruter autrement',
                desc: 'Accueil de stagiaires en parcours d\'insertion (Étoiles & Femmes, Tournesol). Pré-qualification, intégration, suivi. Une réponse concrète à la pénurie de main-d\'œuvre.',
              },
              {
                icon: 'shield-check',
                title: 'Prévenir les violences',
                desc: 'Module de prévention des violences sexistes et sexuelles, conçu pour la réalité du secteur (cuisine, salle, brigade, mixité). Cadre légal, cas pratiques, protocole de signalement.',
              },
              {
                icon: 'handshake',
                title: 'Manager juste',
                desc: 'Fidélisation des équipes, posture managériale, recrutement inclusif. Un parcours en deux jours pour construire un cadre de travail respectueux et durable.',
              },
            ].map((b, i) => (
              <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:16, padding:28}}>
                <div style={{width:48, height:48, borderRadius:12, background:'var(--cream)', display:'grid', placeItems:'center', color:'var(--teal)', marginBottom:18}}>
                  <i data-lucide={b.icon} style={{width:24, height:24}}/>
                </div>
                <h3 style={{fontSize:20, fontWeight:700, lineHeight:1.25, margin:'0 0 10px'}}>{b.title}</h3>
                <p style={{fontSize:14, color:'var(--ink-mid)', lineHeight:1.6, margin:0}}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue de formations */}
      <section style={{background:'var(--cream)', padding:'96px 0'}}>
        <div className="container">
          <div className="formations__head" style={{marginBottom:48, maxWidth:760}}>
            <span className="eyebrow">Catalogue de formations</span>
            <h2 className="h2">Deux parcours conçus pour <em className="accent">vos équipes</em></h2>
            <p className="lede" style={{marginTop:14}}>Inter ou intra, présentiel, certifiés Qualiopi. Prise en charge OPCO possible.</p>
          </div>
          <div className="formations__grid">
            {formationsPros.map((f) => <FormationCardLink key={f.id} f={f}/>)}
          </div>
          <div style={{textAlign:'center', marginTop:48}}>
            <a href={window.FESTIN_DATA.catalogPdf} target="_blank" rel="noopener" className="btn btn--ghost">
              <i data-lucide="book-open" style={{width:16, height:16}}/> Télécharger le catalogue complet (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Restaure */}
      <section style={{padding:'80px 0', background:'var(--off-white)'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center'}}>
          <div>
            <span className="eyebrow eyebrow--gold">Au-delà des formations</span>
            <h2 className="h2" style={{marginTop:8, marginBottom:18}}>Rejoindre <em className="accent">le mouvement Restaure</em></h2>
            <p className="lede" style={{color:'var(--ink-mid)'}}>
              Restaure fédère 35 structures et 700 signataires engagés pour transformer durablement le secteur de la restauration. Signer le manifeste, intégrer un groupe de travail, participer aux tables rondes : Festin accompagne votre engagement collectif.
            </p>
            <a href="#/projets/restaure" className="btn btn--teal" style={{marginTop:24}}>Découvrir Restaure <i data-lucide="arrow-right" style={{width:16, height:16}}/></a>
          </div>
          <div style={{background:'linear-gradient(135deg, var(--teal) 0%, var(--teal-deep) 100%)', borderRadius:18, aspectRatio:'4/3', display:'grid', placeItems:'center'}}>
            <i data-lucide="megaphone" style={{width:96, height:96, color:'var(--gold-light)', opacity:0.85}}/>
          </div>
        </div>
      </section>

      {/* CTA contact */}
      <section style={{background:'var(--teal-deep)', color:'#fff', padding:'80px 0', textAlign:'center'}}>
        <div className="container">
          <span className="eyebrow eyebrow--gold">Demander un devis</span>
          <h2 className="h2" style={{color:'#fff', maxWidth:680, margin:'14px auto 18px'}}>Parlons de votre <em className="accent">projet RH</em></h2>
          <p className="lede" style={{color:'rgba(255,255,255,0.78)', maxWidth:560, margin:'0 auto 32px'}}>Notre équipe vous répond sous 48&nbsp;h ouvrées avec une proposition adaptée à votre établissement.</p>
          <a href="#/contact" className="btn btn--gold">Demander un devis <i data-lucide="arrow-right" style={{width:16, height:16}}/></a>
        </div>
      </section>
    </div>
  );
}

// ---------- IMPACT PAGE ----------
function ImpactPage() {
  // Données vérifiées (source : Plaquette Offre restaurateurs Festin 2025).
  // Toutes les autres séries seront alimentées depuis le rapport d'activité.
  // Source : Rapport d'activité Festin 2025

  const rapports = [
    {
      year: '2025',
      url: "https://drive.google.com/file/d/1dymsU5cV00adUDLBz7zLEQYWa_t_-70z/view?usp=sharing",
      title: "Rapport d'activité 2025",
      desc: "453 personnes accompagnées tous dispositifs confondus, 72 % de sorties dynamiques. 10 ans de Des Étoiles et des Femmes, lancement de la promotion Tournesol, consolidation du mouvement Restaure.",
      size: "PDF",
    },
    {
      year: '2024',
      url: "https://drive.google.com/file/d/1SxibbIWJkudH9Yd21vz9synn5vjeMwep/view?usp=sharing",
      title: "Rapport d'activité 2024",
      desc: "Bilan de l'année 2024 — chiffres clés, projets conduits et perspectives pour l'association Festin.",
      size: "PDF",
    },
    {
      year: '2023',
      url: "https://drive.google.com/file/d/1J67VBmxYVh8WEmvzWL57WAWSkNeJs-0N/view?usp=sharing",
      title: "Rapport d'activité 2023",
      desc: "Bilan de l'année 2023 — chiffres clés, projets conduits et perspectives pour l'association Festin.",
      size: "PDF",
    },
    {
      year: '2022',
      url: "https://drive.google.com/file/d/1S3p13F2abtwOqXLHTto_TPeSeRzxZfya/view?usp=sharing",
      title: "Rapport d'activité 2022",
      desc: "Bilan de l'année 2022 — chiffres clés, projets conduits et perspectives pour l'association Festin.",
      size: "PDF",
    },
  ];

  const prix = [
    { year: '2025', title: "Label LUCIE Progress",  org: "Agence LUCIE — 848 / 1000 pour La Table de Cana Marseille" },
    { year: '2025', title: "Label Empli'tude renouvelé", org: "Obtenu initialement en 2019, renouvelé pour La Table de Cana" },
    { year: '2025', title: "Marraine nationale", org: "Julia Sedefdjian rejoint le réseau Des Étoiles et des Femmes" },
    { year: '2025', title: "Sous-traitant Greta — Région Sud", org: "Marché de la formation professionnelle, Région Sud" },
  ];

  const presse = [
    { name: "M6 — Un jour un doc (documentaire 45 min sur Les Beaux Mets)", href: "#" },
    { name: "Couverture médiatique du Grand Festin 2025",                    href: "#" },
    { name: "Vidéos de prévention Restaure (+2 M de vues cumulées)",         href: "#" },
    { name: "Podcast — 5 tables rondes Restaure (Marseille, Toulouse, Lille)", href: "#" },
  ];

  return (
    <div data-screen-label="Notre impact">
      <PageHeader
        eyebrow="Notre impact"
        title="10 ans de Festin,"
        accent="10 ans de transformation"
        subtitle="Une mesure honnête de ce que nous avons construit, avec les chiffres, les rapports, et la reconnaissance qui en témoignent."
        breadcrumb={[
          {label:'Accueil', href:'#/'},
          {label:'Notre impact'},
        ]}
      />

      {/* Chiffres clés vérifiés — source : Plaquette Offre restaurateurs Festin */}
      <section style={{background:'var(--cream)', padding:'72px 0'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16}}>
            {[
              {value:'453',   label:'personnes accompagnées en 2025'},
              {value:'72 %',  label:'de sorties en emploi ou formation'},
              {value:'14',    label:'territoires d\'intervention'},
              {value:'5',     label:'projets complémentaires'},
            ].map((s, i) => (
              <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:28}}>
                <div style={{fontSize:42, fontWeight:700, color:'var(--teal)', lineHeight:1, letterSpacing:'-0.02em'}}>{s.value}</div>
                <div style={{fontSize:13, color:'var(--ink-mid)', marginTop:12, lineHeight:1.4}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Synthèse financière — vraie donnée Rapport d'activité 2025 */}
      <section style={{padding:'96px 0', background:'var(--off-white)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">Synthèse financière 2025</span>
            <h2 className="h2">Un budget de <em className="accent">1,7 M€</em></h2>
            <p className="lede" style={{marginTop:14}}>Le modèle économique de Festin repose sur la complémentarité de plusieurs sources de financement. Cette diversité constitue un levier essentiel de stabilité et d'autonomie pour l'association.</p>
          </div>
          {(() => {
            const budget = [
              { label: "Mécénat privé",        value: 54,   color: "var(--gold)" },
              { label: "Subventions publiques",value: 17.6, color: "var(--teal)" },
              { label: "Aides aux postes",     value: 15.9, color: "var(--teal-tint-2)" },
              { label: "Chiffre d'affaires",   value: 12.5, color: "var(--gold-light)" },
            ];
            let c = 0;
            const stops = budget.map(b => {
              const s = c; c += b.value;
              return `${b.color} ${s}% ${c}%`;
            }).join(', ');
            return (
              <div style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:64, alignItems:'center'}}>
                <div style={{position:'relative', width:240, height:240}}>
                  <div style={{
                    width:'100%', height:'100%', borderRadius:'50%',
                    background:`conic-gradient(${stops})`,
                  }}/>
                  <div style={{position:'absolute', inset:48, background:'#fff', borderRadius:'50%', display:'grid', placeItems:'center', boxShadow:'0 0 0 1px var(--line)'}}>
                    <div style={{textAlign:'center'}}>
                      <div style={{fontSize:32, fontWeight:700, color:'var(--teal)', lineHeight:1, letterSpacing:'-0.02em'}}>1,7</div>
                      <div style={{fontSize:14, fontWeight:700, color:'var(--ink)', marginTop:2}}>M€</div>
                      <div style={{fontSize:10, color:'var(--ink-soft)', letterSpacing:'0.08em', textTransform:'uppercase', marginTop:4}}>budget 2025</div>
                    </div>
                  </div>
                </div>
                <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:14}}>
                  {budget.map(b => (
                    <li key={b.label} style={{display:'grid', gridTemplateColumns:'18px 1fr 72px', gap:14, alignItems:'center'}}>
                      <span style={{width:14, height:14, borderRadius:4, background:b.color, justifySelf:'start'}}/>
                      <span style={{fontSize:15, color:'var(--ink)', fontWeight:600}}>{b.label}</span>
                      <span style={{fontSize:18, fontWeight:700, color:'var(--ink)', textAlign:'right'}}>{b.value} %</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Rapports d'activité — téléchargement */}
      <section style={{padding:'96px 0', background:'var(--cream)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">Documents publics</span>
            <h2 className="h2">Tous nos <em className="accent">rapports d'activité</em></h2>
            <p className="lede" style={{marginTop:14}}>Téléchargez les rapports annuels Festin — chiffres, projets et perspectives.</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:20}}>
            {rapports.map(r => (
              <a key={r.year} href={r.url} target="_blank" rel="noopener noreferrer" className="formation-card" style={{cursor:'pointer'}}>
                <div className="formation-card__body" style={{display:'flex', gap:20, alignItems:'flex-start'}}>
                  <div style={{width:56, height:64, borderRadius:8, background:'var(--cream)', display:'grid', placeItems:'center', color:'var(--teal)', flexShrink:0}}>
                    <i data-lucide="file-text" style={{width:28, height:28}}/>
                  </div>
                  <div style={{flex:1}}>
                    <span className="eyebrow">Rapport {r.year}</span>
                    <h3 style={{fontSize:18, fontWeight:700, margin:'4px 0 8px'}}>{r.title}</h3>
                    <p style={{fontSize:13, color:'var(--ink-mid)', lineHeight:1.5, margin:'0 0 12px'}}>{r.desc}</p>
                    <span className="lnk" style={{fontSize:13}}>
                      <i data-lucide="download" style={{width:14, height:14}}/> Télécharger le PDF · {r.size}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Prix & reconnaissance */}
      <section style={{padding:'96px 0', background:'var(--off-white)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">Reconnaissance</span>
            <h2 className="h2">Les prix &amp; <em className="accent">labels remportés</em></h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
            {prix.map((p, i) => (
              <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:24}}>
                <div style={{width:44, height:44, borderRadius:10, background:'rgba(232,168,37,0.16)', display:'grid', placeItems:'center', color:'var(--gold)', marginBottom:18}}>
                  <i data-lucide="award" style={{width:22, height:22}}/>
                </div>
                <span style={{fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--ink-soft)'}}>{p.year}</span>
                <h3 style={{fontSize:16, fontWeight:700, margin:'6px 0 6px', lineHeight:1.35}}>{p.title}</h3>
                <p style={{fontSize:12, color:'var(--ink-mid)', margin:0}}>{p.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retombées presse */}
      <section style={{padding:'72px 0', background:'var(--cream)', borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <div className="presse__head">
            <span className="eyebrow">Retombées médias</span>
            <h2 className="h2" style={{marginTop:8, maxWidth:760, textAlign:'center', marginLeft:'auto', marginRight:'auto'}}>Ils parlent <em className="accent">de Festin</em></h2>
          </div>
          <div className="presse__list" style={{marginTop:40}}>
            {presse.map((m, i) => (
              <a key={i} href={m.href} target="_blank" rel="noopener" className="presse__item">
                <i data-lucide="external-link" style={{width:13, height:13}}/>
                {m.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


// ---------- ACADEMIE PAGE ─────────────────────────────────────────────────────
function AcademiePage() {
  return (
    <div data-screen-label="Académie Festin">
      <PageHeader
        eyebrow="Depuis 2025"
        title="L'Académie"
        accent="Festin"
        subtitle="Organisme de formation certifié Qualiopi, l'Académie Festin structure l'offre de formation de l'association pour les professionnels de la restauration et les personnes en parcours d'insertion."
        breadcrumb={[{label:'Accueil',href:'#/'},{label:"L'Académie Festin"}]}
      />

      {/* Section 1 — Présentation */}
      <section style={{padding:'80px 0', background:'var(--off-white)'}}>
        <div className="container" style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:80, alignItems:'flex-start'}}>
          {/* Gauche */}
          <div>
            <span className="eyebrow">Notre positionnement</span>
            <h2 className="h2" style={{marginTop:8, marginBottom:20}}>Former autrement, <em className="accent">certifier vraiment.</em></h2>
            <p className="lede" style={{color:'var(--ink-mid)', lineHeight:1.7}}>
              Depuis 2015, Festin forme sur le terrain. En 2025, l'association structure cette expertise en un organisme de formation certifié Qualiopi, co-porté avec Estello Formation. L'Académie Festin conçoit des parcours qui allient exigence pédagogique, impact social et expertise sectorielle.
            </p>
            <div style={{display:'flex', alignItems:'center', gap:14, marginTop:28, padding:'16px 20px', background:'var(--cream)', borderRadius:12, border:'1px solid var(--line)'}}>
              <img src={window.FESTIN_DATA.brand.qualiopi} alt="Logo Qualiopi"
                style={{height:48, width:'auto', objectFit:'contain'}}
                onError={(e) => { e.currentTarget.style.display='none'; }}/>
              <span style={{fontSize:13, color:'var(--ink-mid)', lineHeight:1.4}}>
                Certifié Qualiopi<br/><strong style={{color:'var(--ink)'}}>Au titre des actions de formation</strong>
              </span>
            </div>
          </div>
          {/* Droite — 3 piliers */}
          <div style={{display:'flex', flexDirection:'column', gap:24}}>
            {[
              { icon:'award',     title:'Certification reconnue',       desc:"Diplômes et titres professionnels reconnus par l'État." },
              { icon:'users',     title:'Deux publics, une exigence',    desc:'Professionnels en poste ou personnes en insertion : une même rigueur pédagogique.' },
              { icon:'handshake', title:'Co-construit avec le terrain',  desc:'Chaque formation conçue avec des acteurs du secteur.' },
            ].map((item, i) => (
              <div key={i} style={{display:'flex', gap:16, alignItems:'flex-start', padding:20, background:'#fff', borderRadius:12, border:'1px solid var(--line)'}}>
                <div style={{width:44, height:44, borderRadius:10, background:'var(--cream)', display:'grid', placeItems:'center', flexShrink:0}}>
                  <i data-lucide={item.icon} style={{width:20, height:20, color:'var(--teal)'}}/>
                </div>
                <div>
                  <h4 style={{fontSize:15, fontWeight:700, margin:'0 0 6px', color:'var(--ink)'}}>{item.title}</h4>
                  <p style={{fontSize:13, color:'var(--ink-mid)', lineHeight:1.5, margin:0}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — Double entrée public */}
      <section style={{padding:'80px 0', background:'var(--cream)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">Pour qui ?</span>
            <h2 className="h2" style={{marginTop:8}}>Deux publics, <em className="accent">un même engagement</em></h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
            <a href="#/formations" className="formation-card" style={{textDecoration:'none'}}>
              <div className="formation-card__body" style={{padding:32}}>
                <div style={{width:56, height:56, borderRadius:14, background:'var(--cream)', display:'grid', placeItems:'center', marginBottom:20}}>
                  <i data-lucide="briefcase" style={{width:24, height:24, color:'var(--teal)'}}/>
                </div>
                <span className="eyebrow">Professionnels</span>
                <h3 style={{fontSize:22, fontWeight:700, margin:'8px 0 12px'}}>Vous êtes professionnel de la restauration</h3>
                <p style={{fontSize:15, color:'var(--ink-mid)', lineHeight:1.6, marginBottom:20}}>Formations courtes certifiantes en management, prévention des VSS, recrutement inclusif.</p>
                <span className="lnk">Voir les formations professionnelles <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
              </div>
            </a>
            <a href="#/projets/tournesol" className="formation-card" style={{textDecoration:'none'}}>
              <div className="formation-card__body" style={{padding:32}}>
                <div style={{width:56, height:56, borderRadius:14, background:'var(--cream)', display:'grid', placeItems:'center', marginBottom:20}}>
                  <i data-lucide="star" style={{width:24, height:24, color:'var(--gold)'}}/>
                </div>
                <span className="eyebrow">Insertion</span>
                <h3 style={{fontSize:22, fontWeight:700, margin:'8px 0 12px'}}>Vous êtes en parcours d'insertion</h3>
                <p style={{fontSize:15, color:'var(--ink-mid)', lineHeight:1.6, marginBottom:20}}>Parcours diplômants longs, gratuits et rémunérés pour accéder aux métiers de la restauration.</p>
                <span className="lnk">Découvrir les parcours d'insertion <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Section 3 — Formations teaser */}
      <FormationsTeaser />

      {/* Section 4 — Partenaire Estello */}
      <section style={{background:'var(--teal-dark, var(--teal-deep))', color:'#fff', padding:'72px 0', textAlign:'center'}}>
        <div className="container" style={{maxWidth:680}}>
          <span className="eyebrow eyebrow--gold">En partenariat avec</span>
          <h2 className="h2" style={{color:'#fff', marginTop:10, marginBottom:16}}>Estello Formation</h2>
          <p style={{fontSize:17, color:'rgba(255,255,255,0.78)', lineHeight:1.7, marginBottom:28}}>
            L'Académie Festin est co-portée avec Estello Formation, organisme spécialisé dans les formations aux métiers de l'hôtellerie-restauration.
          </p>
          <a href="https://www.estelloformation.com" target="_blank" rel="noopener" className="btn btn--ghost-w">
            estelloformation.com <i data-lucide="external-link" style={{width:14,height:14}}/>
          </a>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTUALITÉS PAGE — toutes les retombées presse
// ─────────────────────────────────────────────────────────────────────────────
function ActualitesPage() {
  const allPresse = (window.FESTIN_DATA.presse || [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const dispositifs = ['Tous', ...Array.from(new Set(allPresse.map(a => a.dispositif).filter(Boolean)))];
  const [filtre, setFiltre] = React.useState('Tous');

  const filtered = filtre === 'Tous' ? allPresse : allPresse.filter(a => a.dispositif === filtre);

  return (
    <div data-screen-label="Actualités — Presse & médias">
      <PageHeader
        eyebrow="Presse & médias"
        title="Nos"
        accent="actualités"
        subtitle="Retombées presse, reportages et podcasts autour des projets de l'association Festin."
        breadcrumb={[{label:'Accueil',href:'#/'},{label:'Qui sommes-nous',href:'#/about'},{label:'Actualités'}]}
      />

      <section style={{padding:'64px 0 80px', background:'var(--off-white)'}}>
        <div className="container">

          {/* Filtres */}
          <div style={{display:'flex', gap:10, flexWrap:'wrap', marginBottom:48}}>
            {dispositifs.map(d => (
              <button key={d}
                className={"filter" + (filtre === d ? ' active' : '')}
                onClick={() => setFiltre(d)}
                style={{cursor:'pointer'}}>
                {d}
              </button>
            ))}
          </div>

          {/* Grille */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
            {filtered.map((a, i) => (
              <a key={i} href={a.href || '#'} target="_blank" rel="noopener"
                 className="formation-card" style={{cursor:'pointer', textDecoration:'none'}}>
                <div className="formation-card__body">
                  <div style={{display:'flex', gap:8, marginBottom:12, flexWrap:'wrap'}}>
                    {a.dispositif && (
                      <span style={{fontSize:11, fontWeight:700, letterSpacing:'0.12em',
                                    textTransform:'uppercase', color:'var(--teal)',
                                    background:'var(--teal-tint)', borderRadius:4, padding:'2px 8px'}}>
                        {a.dispositif}
                      </span>
                    )}
                    {a.type && (
                      <span style={{fontSize:11, fontWeight:700, letterSpacing:'0.12em',
                                    textTransform:'uppercase', color:'var(--ink-mid)',
                                    background:'var(--cream)', borderRadius:4, padding:'2px 8px'}}>
                        {a.type}
                      </span>
                    )}
                  </div>
                  <h3 style={{fontSize:15, fontWeight:700, lineHeight:1.35, margin:'0 0 8px',
                               color:'var(--ink)', display:'-webkit-box', WebkitLineClamp:3,
                               WebkitBoxOrient:'vertical', overflow:'hidden'}}>
                    {a.title}
                  </h3>
                  <div style={{fontSize:13, color:'var(--ink-mid)', margin:'0 0 12px'}}>
                    {a.source}{a.source && a.date && ' · '}{fmtDatePresse(a.date)}
                  </div>
                  <span className="lnk" style={{fontSize:13}}>
                    <i data-lucide="external-link" style={{width:12, height:12}}/> Lire l'article
                  </span>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{color:'var(--ink-soft)', textAlign:'center', padding:'60px 0'}}>
              Aucun article pour ce filtre.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
window.HomePage = HomePage;
window.FormationsListPage = FormationsListPage;
window.FormationDetailPage = FormationDetailPage;
window.AboutPage = AboutPage;
window.ContactPage = ContactPage;
window.NotFoundPage = NotFoundPage;
window.FormationCardLink = FormationCardLink;
window.ProjetPage = ProjetPage;
window.SadiCarnotPage = SadiCarnotPage;
window.EcosystemeSection = EcosystemeSection;
window.ProjetsMarquee = ProjetsMarquee;
window.Engagement = Engagement;
window.Journal = Journal;
window.RetombeesPresse = RetombeesPresse;
window.AccompagnementInsertionPage = AccompagnementInsertionPage;
window.AccompagnementProsPage = AccompagnementProsPage;
window.ImpactPage = ImpactPage;
window.AcademiePage = AcademiePage;
window.ActualitesPage = ActualitesPage;
