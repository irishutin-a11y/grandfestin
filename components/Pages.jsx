// Pages.jsx — dedicated page components for multi-page navigation
// Each page is a full-screen view; routing handled in index.html via hash.

function PageHeader({ eyebrow, title, accent, subtitle, breadcrumb, image, imageAlt = '', focus }) {
  return (
    <section className={"page-header" + (image ? " page-header--photo" : "")}>
      {image && (
        <div className="page-header__media" aria-hidden={imageAlt ? undefined : true}>
          <window.Picture
            src={image} alt={imageAlt} sizes="100vw"
            loading="eager" fetchPriority="high"
            imgClassName="page-header__img"
            style={focus ? { objectPosition: focus } : undefined}
          />
          <span className="page-header__scrim" />
        </div>
      )}
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
      <HomeB />
    </div>
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
            <h2 className="h2">Choisir sa <em className="accent">formation</em></h2>
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

function FormationCardLink({ f, wide, noPrice }) {
  return (
    <a className={"formation-card" + (wide ? " wide" : "")} href={`#/formations/${f.id}`}>
      <div className="formation-card__img"><img src={f.img} alt={f.title} loading="lazy"/></div>
      <div className="formation-card__body">
        <span className="eyebrow">{f.cat}</span>
        <h3>{f.title}</h3>
        <p className="formation-card__desc">{f.desc}</p>
        <div className="formation-card__chips">
          <span className="chip"><i data-lucide="clock" style={{width:12,height:12}}/> {f.duration}</span>
          <span className="chip"><i data-lucide="map-pin" style={{width:12,height:12}}/> {f.format.split('—')[0].trim()}</span>
          {!noPrice && <span className="chip"><i data-lucide="euro" style={{width:12,height:12}}/> {f.price.split('—')[0].trim()}</span>}
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
    <section className="on-dark" style={{background:'var(--teal-deep)',color:'#fff',padding:'var(--s-9) 0',textAlign:'center'}}>
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
        image="images/photo-patisserie.jpg"
        imageAlt="Atelier de pâtisserie en formation"
        focus="center 30%"
        eyebrow="Catalogue"
        title="Toutes nos"
        accent="formations"
        subtitle="Des parcours diplômants pour les personnes en insertion. Des formations courtes pour les équipes de restaurants. Ouvrez une formation pour voir son programme."
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
      <section style={{padding:'var(--s-8) 0',background:'var(--off-white)'}}>
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
                  <i data-lucide="external-link" style={{width:20,height:20,flexShrink:0,color:'var(--gold-ink)'}}/>
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
                <img src={window.FESTIN_DATA.brand.qualiopi} alt="Logo Qualiopi" className="qualiopi-side__logo" loading="lazy" onError={(e)=>{e.currentTarget.style.display='none';}}/>
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

// ---------- CONTACT PAGE ----------
function ContactPage() {
  return (
    <div data-screen-label="05 Contact">
      <PageHeader
        image="images/photo-service-restaurant.jpg"
        imageAlt="Service en salle dans un restaurant partenaire"
        focus="center 40%"
        eyebrow="Nous écrire"
        title="Parlons de votre"
        accent="projet"
        subtitle="Vous voulez recruter, vous former, orienter une personne ou soutenir un projet : écrivez-nous. Réponse sous 48 h ouvrées."
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
      <section style={{padding:'var(--s-8) 0',textAlign:'center'}}>
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
        <div style={{width:84,height:84,borderRadius:'50%',background:'rgba(255,193,0,0.16)',border:'1.5px solid rgba(255,193,0,0.55)',display:'grid',placeItems:'center',color:'var(--gold)'}}>
          <i data-lucide={icon} style={{width:36,height:36}}/>
        </div>
      </div>
    </div>
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
        <img key={i} src={src} alt="" loading="lazy" style={{
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
    <section className="on-dark" style={{background:'var(--teal-deep)', color:'#fff', padding:'var(--s-9) 0'}}>
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
                  <div style={{fontWeight:700, color:'var(--gold-ink)', fontSize:15}}>{tm.prenom}</div>
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
          <a href={window.FESTIN_DATA.donation} target="_blank" rel="noopener noreferrer" className="btn btn--gold">
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
    <section style={{padding:'var(--s-9) 0', background:'var(--off-white)'}}>
      <div className="container">
        <div style={{maxWidth:760, marginBottom:48}}>
          <span className="eyebrow">Presse & médias</span>
          <h2 className="h2" style={{marginTop:8}}>Les <em className="accent">actualités</em></h2>
        </div>
        <div className="stack-sm" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
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
    <section className="on-dark" style={{position:'relative', width:'100%', height:'80vh', minHeight:520, overflow:'hidden', background:'var(--teal-deep)', color:'#fff'}}>
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
        <span className="eyebrow eyebrow--gold">{p.eyebrow} · un projet de l'association Festin</span>
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
          <div className="stack-sm-2" style={{display:'grid', gridTemplateColumns:'repeat(' + p.stats.length + ', 1fr)', gap:16}}>
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
      <section style={{padding:'var(--s-9) 0', background:'var(--off-white)'}}>
        <div className="stack-sm container" style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:64, alignItems:'flex-start'}}>
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
                      <i data-lucide="check-circle" style={{width:16, height:16, color:'var(--gold-ink)', flexShrink:0, marginTop:2}}/>
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

// Pages Insertion et Acteurs du secteur : voir components/Accompagnement.jsx

// ---------- IMPACT (reconstruite le 24/09/2026) ----------
// L'impact général de Festin, pas seulement 2025 : série annuelle tirée des
// quatre rapports publics, effet dans la durée (étude Koreis), un chiffre par
// projet, 2025 en une section, tous les rapports, les reconnaissances.
// Données : FESTIN_DATA.impact (data.js), sources en commentaire.

// Barres verticales, une série, une couleur. Survol et focus : détail.
// Un tableau (details) donne les mêmes valeurs sans le graphique.
function ImpactBars({ title, unit = '', items, max, caption }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const g = window.gsap, el = ref.current;
    if (!g || !el || (window.FESTIN_RM && window.FESTIN_RM())) return;
    const tw = g.from(el.querySelectorAll('.ibar__fill'), { scaleY: 0, transformOrigin: '50% 100%', duration: 1.1, stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    return () => { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); };
  }, []);
  return (
    <figure className="ichart" ref={ref}>
      <figcaption className="ichart__t">{title}</figcaption>
      <div className="ichart__plot" role="list">
        {items.map((it) => (
          <div className="ibar" role="listitem" key={it.label} tabIndex={0} aria-label={it.label + ' : ' + it.value + unit + (it.detail ? '. ' + it.detail : '')}>
            <span className="ibar__v">{it.value}{unit}</span>
            <span className="ibar__track"><span className="ibar__fill" style={{ height: (it.value / max * 100) + '%' }} /></span>
            <span className="ibar__l">{it.label}</span>
            {it.detail && <span className="ibar__tip" role="tooltip">{it.detail}</span>}
          </div>
        ))}
      </div>
      <details className="ichart__table">
        <summary>Voir les données en tableau</summary>
        <table>
          <thead><tr><th scope="col">Année</th><th scope="col">{title}</th><th scope="col">Détail</th></tr></thead>
          <tbody>{items.map((it) => <tr key={it.label}><th scope="row">{it.label}</th><td>{it.value}{unit}</td><td>{it.detail || '—'}</td></tr>)}</tbody>
        </table>
      </details>
      {caption && <p className="ichart__cap">{caption}</p>}
    </figure>
  );
}

function ImpactPage() {
  const D = window.FESTIN_DATA, I = D.impact;
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const els = rootRef.current.querySelectorAll('.reveal');
    if ((window.FESTIN_RM && window.FESTIN_RM()) || !window.ScrollTrigger) { els.forEach(e => e.classList.add('is-in')); return; }
    const t = [...els].map(el => window.ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('is-in') }));
    return () => t.forEach(x => x.kill());
  }, []);
  const byId = (id) => D.projets.find(p => p.id === id) || {};
  const nb = (n) => n.toLocaleString('fr-FR');
  return (
    <div className="pageImpact" ref={rootRef} data-screen-label="Impact">
      <window.HeroPage tone="deep" kicker={I.hero.kicker} title={I.hero.title} accent={I.hero.titleAccent} proof={I.hero.proof}
        img={I.hero.img} imgAlt={I.hero.imgAlt}
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Notre impact' }]} />

      {/* Série annuelle : deux graphiques, jamais un double axe */}
      <section className="isec isec--white" aria-labelledby="imp-serie">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-serie">Quatre ans, <em>mesurés</em></h2>
          <div className="icharts">
            <ImpactBars title="Personnes accompagnées vers l'emploi" max={500}
              items={I.annees.map(a => ({ label: a.year, value: a.personnes, detail: 'Tous dispositifs Festin, rapport d\'activité ' + a.year }))} />
            <ImpactBars title="Sorties en emploi ou en formation" unit={'\u00a0%'} max={100}
              items={I.annees.map(a => ({ label: a.year, value: a.taux, detail: a.emploi ? nb(a.emploi) + ' personnes sur ' + nb(a.sorties) + ' sorties' : 'Effectifs non publiés dans le rapport 2025' }))} />
          </div>
          <p className="isec__note">{I.serieNote}</p>
        </div>
      </section>

      {/* Dans la durée : famille or */}
      <section className="isec isec--gold" aria-labelledby="imp-duree">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-duree">{I.duree.title} <em>{I.duree.titleAccent}</em></h2>
          <p className="isec__lede reveal">{I.duree.lede}</p>
          <ul className="ifaits">
            {I.duree.faits.map((f) => (
              <li className="ifait reveal" key={f.n}>
                <span className="ifait__n">{f.n}</span>
                <span className="ifait__t">{f.t}</span>
                <span className="ifait__d">{f.d}</span>
              </li>
            ))}
          </ul>
          <p className="isec__note">{I.duree.source}</p>
        </div>
      </section>

      {/* Un chiffre par projet */}
      <section className="isec isec--white" aria-labelledby="imp-projets">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-projets">Projet <em>par projet</em></h2>
          <ul className="iprojets">
            {I.projets.map((p) => {
              const pr = byId(p.id);
              return (
                <li key={p.id} className="reveal">
                  <a className="iprojet" href={'#/projets/' + p.id}>
                    <span className="iprojet__n">{p.n}</span>
                    <span className="iprojet__body">
                      <span className="iprojet__t">{p.t}</span>
                      <span className="iprojet__d">{p.d}</span>
                    </span>
                    <span className="iprojet__name">{pr.shortTitle} <span className="arrow" aria-hidden="true">→</span></span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 2025, une seule section */}
      <section className="isec isec--teal on-dark" aria-labelledby="imp-2025">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-2025">{I.annee2025.title} <em>{I.annee2025.titleAccent}</em></h2>
          <ul className="i2025">
            {D.stats.map((s, i) => (
              <li key={i} className="reveal"><span className="i2025__n">{s.value}{s.unit === '%' ? '\u00a0%' : s.unit}</span><span className="i2025__l">{s.label}</span></li>
            ))}
          </ul>
          <a className="i2025__lnk" href={I.annee2025.lien.href}>{I.annee2025.lien.label} <span className="arrow" aria-hidden="true">→</span></a>
        </div>
      </section>

      {/* Tous les rapports d'activité */}
      <section className="isec isec--cream" aria-labelledby="imp-rapports">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-rapports">Tous nos rapports <em>d'activité</em></h2>
          <ul className="irapports">
            {I.rapports.map((r) => (
              <li key={r.year} className="reveal">
                <a className="irapport" href={r.url} target="_blank" rel="noopener noreferrer">
                  <span className="irapport__y">{r.year}</span>
                  <span className="irapport__r">{r.resume}</span>
                  <span className="irapport__dl">Lire le rapport (PDF)<span className="sr-only">, s'ouvre dans un nouvel onglet</span> <span className="arrow" aria-hidden="true">↗</span></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reconnaissances : frise sobre */}
      <section className="isec isec--white" aria-labelledby="imp-prix">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-prix">Prix, labels <em>et marchés</em></h2>
          <ol className="iprix">
            {I.prix.map((p, i) => (
              <li key={i} className="reveal"><span className="iprix__y">{p.year}</span><span className="iprix__t">{p.title}</span><span className="iprix__o">{p.org}</span></li>
            ))}
          </ol>
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
        image="images/photo-cuisine-formation.jpg"
        imageAlt="Séance de formation en cuisine"
        focus="center 35%"
        eyebrow="Depuis 2026"
        title="L'Académie"
        accent="Festin"
        subtitle="Organisme de formation certifié Qualiopi. L'Académie Festin réunit toutes les formations de l'association : des formations courtes pour les équipes de restaurants, des parcours diplômants pour les personnes en insertion."
        breadcrumb={[{label:'Accueil',href:'#/'},{label:"L'Académie Festin"}]}
      />

      {/* Section 1 — Présentation */}
      <section style={{padding:'var(--s-9) 0', background:'var(--off-white)'}}>
        <div className="stack-sm container" style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:80, alignItems:'flex-start'}}>
          {/* Gauche */}
          <div>
            <span className="eyebrow">Notre positionnement</span>
            <h2 className="h2" style={{marginTop:8, marginBottom:20}}>Former <em className="accent">autrement</em></h2>
            <p className="lede" style={{color:'var(--ink-mid)', lineHeight:1.7}}>
              Festin forme sur le terrain depuis 1987. En 2026, l'association en fait un organisme de formation : l'Académie Festin, certifiée Qualiopi, co-portée avec Estello Formation. Trois choses tiennent ses parcours : l'exigence de la cuisine, le suivi social des personnes formées, la connaissance du secteur.
            </p>
            <div style={{display:'flex', alignItems:'center', gap:14, marginTop:28, padding:'16px 20px', background:'var(--cream)', borderRadius:12, border:'1px solid var(--line)'}}>
              <img src={window.FESTIN_DATA.brand.qualiopi} alt="Logo Qualiopi" loading="lazy"
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
              { icon:'award',     title:'Des diplômes reconnus',       desc:"CAP cuisine (Éducation nationale), titre à finalité professionnelle de commis de cuisine, DCL (diplôme de compétence en langue)." },
              { icon:'users',     title:'Un format pour chaque public', desc:'Des parcours de quatre à onze mois pour apprendre un métier. Des sessions de trois heures à deux jours pour les équipes en poste.' },
              { icon:'handshake', title:'Des stages chez des restaurateurs',  desc:'Les parcours comptent de 155 à 490 heures de stage, chez des partenaires comme Les Grandes Tables, Sofitel ou Les Bords de Mer.' },
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

      {/* LE BESOIN — ce que dit le marché du travail local (source : dossier d'habilitation RNCP) */}
      <section className="on-dark" style={{padding:'var(--s-8) 0', background:'var(--teal-dark)', color:'#fff'}}>
        <div className="container">
          <span className="eyebrow eyebrow--gold">Pourquoi ces formations</span>
          <h2 className="h2" style={{color:'#fff', marginTop:8, marginBottom:16, maxWidth:'22ch'}}>
            Un secteur qui <em className="accent">recrute</em>
          </h2>
          <p className="lede" style={{color:'rgba(255,255,255,0.82)', maxWidth:'62ch', marginBottom:36}}>
            À Marseille et dans les Bouches-du-Rhône, la restauration cherche des personnes formées.
            C'est ce qui rend ces parcours utiles, pour celles et ceux qui les suivent comme pour les
            établissements qui recrutent.
          </p>
          <div className="stack-sm-2" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16}}>
            {[
              { n: '77 240', l: "projets de recrutement dans les Bouches-du-Rhône, tous secteurs" },
              { n: '2 sur 3', l: "recrutements de cuisiniers jugés difficiles par les employeurs" },
              { n: '500+',   l: "offres actives en restauration sur le seul territoire marseillais" },
            ].map((s2, i) => (
              <div key={i} style={{background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.14)', borderRadius:14, padding:24}}>
                <div style={{fontSize:34, fontWeight:700, color:'var(--gold)', lineHeight:1, letterSpacing:'-0.02em'}}>{s2.n}</div>
                <div style={{fontSize:13, color:'rgba(255,255,255,0.78)', marginTop:10, lineHeight:1.45}}>{s2.l}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:12, color:'rgba(255,255,255,0.6)', marginTop:20}}>
            Source : enquête Besoins en main-d'œuvre, France Travail.
          </p>
        </div>
      </section>

      {/* Section 2 — Double entrée public */}
      <section style={{padding:'var(--s-9) 0', background:'var(--cream)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">Pour qui ?</span>
            <h2 className="h2" style={{marginTop:8}}>À chacun sa <em className="accent">formation</em></h2>
          </div>
          <div className="stack-sm" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
            <a href="#/formations" className="formation-card" style={{textDecoration:'none'}}>
              <div className="formation-card__body" style={{padding:32}}>
                <div style={{width:56, height:56, borderRadius:14, background:'var(--cream)', display:'grid', placeItems:'center', marginBottom:20}}>
                  <i data-lucide="briefcase" style={{width:24, height:24, color:'var(--teal)'}}/>
                </div>
                <span className="eyebrow">Professionnels</span>
                <h3 style={{fontSize:22, fontWeight:700, margin:'8px 0 12px'}}>Vous êtes professionnel de la restauration</h3>
                <p style={{fontSize:15, color:'var(--ink-mid)', lineHeight:1.6, marginBottom:20}}>Des formations courtes en management juste, en prévention des violences sexistes et sexuelles et en recrutement inclusif.</p>
                <span className="lnk">Voir les formations professionnelles <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
              </div>
            </a>
            <a href="#/projets/tournesol" className="formation-card" style={{textDecoration:'none'}}>
              <div className="formation-card__body" style={{padding:32}}>
                <div style={{width:56, height:56, borderRadius:14, background:'var(--cream)', display:'grid', placeItems:'center', marginBottom:20}}>
                  <i data-lucide="star" style={{width:24, height:24, color:'var(--gold-ink)'}}/>
                </div>
                <span className="eyebrow">Insertion</span>
                <h3 style={{fontSize:22, fontWeight:700, margin:'8px 0 12px'}}>Vous cherchez un métier</h3>
                <p style={{fontSize:15, color:'var(--ink-mid)', lineHeight:1.6, marginBottom:20}}>Des parcours diplômants, gratuits, pour entrer dans les métiers de la cuisine.</p>
                <span className="lnk">Découvrir les parcours d'insertion <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Section 3 — Formations teaser */}
      <FormationsTeaser />

      {/* Section 4 — Partenaire Estello */}
      <section className="on-dark" style={{background:'var(--teal-dark, var(--teal-deep))', color:'#fff', padding:'var(--s-8) 0', textAlign:'center'}}>
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
        image="images/photo-micro-temoignage.jpg"
        imageAlt="Prise de parole au micro lors d'un temps fort"
        focus="center 30%"
        eyebrow="Presse & médias"
        title="Nos"
        accent="actualités"
        subtitle="Retombées presse, reportages et podcasts autour des projets de l'association Festin."
        breadcrumb={[{label:'Accueil',href:'#/'},{label:'Qui sommes-nous',href:'#/about'},{label:'Actualités'}]}
      />

      <window.TempsForts items={window.FESTIN_DATA.tempsForts || []} />

      <section style={{padding:'var(--s-8) 0 var(--s-9)', background:'var(--off-white)'}}>
        <div className="container">

          {/* Contact presse & financeurs */}
          <div className="contact-note" style={{marginBottom:40, maxWidth:720}}>
            <i data-lucide="newspaper" style={{width:18,height:18,flexShrink:0,marginTop:2}} aria-hidden="true"/>
            <div>
              <b>Vous êtes journaliste&nbsp;?</b> Interviews et visuels&nbsp;:{' '}
              <a href="mailto:contact@grandfestin.com">contact@grandfestin.com</a>, à l'attention d'Iris Hutin.
              Mécénat et partenariats&nbsp;:{' '}<a href="mailto:partenariat@grandfestin.com">partenariat@grandfestin.com</a>.
              Nos rapports d'activité sont en libre accès sur la <a href="#/impact">page Impact</a>.
            </div>
          </div>

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
          <div className="stack-sm" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
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
            <p style={{color:'var(--ink-soft)', textAlign:'center', padding:'var(--s-8) 0'}}>
              Aucun article pour ce filtre.
            </p>
          )}
        </div>
      </section>

      {/* Presse : chiffres clés, contact, logos */}
      <section id="presse" style={{padding:'var(--s-9) 0', background:'var(--cream)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:40}}>
            <span className="eyebrow">Presse</span>
            <h2 className="h2">Chiffres, contact <em className="accent">et logos</em></h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap:20}}>
            <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:16, padding:28}}>
              <span style={{fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--teal)'}}>Chiffres clés</span>
              <ul style={{listStyle:'none', padding:0, margin:'12px 0 0', display:'grid', gap:8, fontSize:15, color:'var(--ink)'}}>
                {[...window.FESTIN_DATA.stats.slice(0,3).map(s => s.value + (s.unit === '%' ? ' %' : s.unit === '' ? '' : ' ' + s.unit.trim()) + ' ' + s.label),
                  'Plus de 1 200 femmes accompagnées par Des Étoiles et des Femmes depuis 2015',
                  '91 % de réussite aux diplômes en 2025 (Des Étoiles et des Femmes)'].map((l, i) => <li key={i}>{l}</li>)}
              </ul>
              <p style={{fontSize:12, color:'var(--ink-soft)', margin:'14px 0 0'}}>Source : rapport d'activité Festin 2025.</p>
            </div>
            <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:16, padding:28}}>
              <span style={{fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--teal)'}}>Contact presse et logos</span>
              <p style={{fontSize:15, color:'var(--ink)', lineHeight:1.7, margin:'10px 0 14px'}}>Toute demande presse, avant publication d'un communiqué ou d'un chiffre : <a href="mailto:contact@grandfestin.com" style={{color:'var(--teal)', fontWeight:700}}>contact@grandfestin.com</a>, à l'attention d'Iris Hutin, chargée de projet Communication.</p>
              <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
                <a className="btn btn--ghost" href="images/logo-festin.png" download>Logo Festin, couleur</a>
                <a className="btn btn--ghost" href="images/logo-festin-jaune.png" download>Logo Festin, jaune</a>
                <a className="btn btn--ghost" href="images/logo-academie-festin.png" download>Logo Académie Festin</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
window.HomePage = HomePage;
window.FormationsListPage = FormationsListPage;
window.FormationDetailPage = FormationDetailPage;
window.ContactPage = ContactPage;
window.NotFoundPage = NotFoundPage;
window.FormationCardLink = FormationCardLink;
window.ProjetPage = ProjetPage;
window.ImpactPage = ImpactPage;
window.AcademiePage = AcademiePage;
window.ActualitesPage = ActualitesPage;
