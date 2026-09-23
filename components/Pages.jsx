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

function FormationCardLink({ f, wide }) {
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
// ---------- SADI CARNOT — placeholder ----------
function SadiCarnotPage() {
  return (
    <div data-screen-label="Restaurants — Sadi Carnot">
      <PageHeader
        eyebrow="Prochainement"
        title="Projet"
        accent="Sadi Carnot"
        subtitle="Un futur restaurant d'insertion, en cours de développement."
        breadcrumb={[
          {label:'Accueil',href:'#/'},
          {label:'Restaurants'},
          {label:'Sadi Carnot'}
        ]}
      />
      <section style={{padding:'var(--s-9) 0',background:'var(--off-white)'}}>
        <div className="container">
          <div style={{background:'var(--cream)',borderRadius:18,padding:'72px 48px',textAlign:'center',maxWidth:720,margin:'0 auto'}}>
            <div style={{width:80,height:80,borderRadius:'50%',background:'rgba(255,193,0,0.14)',display:'grid',placeItems:'center',color:'var(--gold-ink)',margin:'0 auto 24px'}}>
              <i data-lucide="hard-hat" style={{width:36,height:36}}/>
            </div>
            <h2 className="h3" style={{marginBottom:14}}>En cours de développement</h2>
            <p className="lede" style={{color:'var(--ink-mid)',marginBottom:28,maxWidth:520,margin:'0 auto 28px'}}>
              Ce projet est en cours de développement. Écrivez-nous pour en savoir plus.
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
        image="images/photo-tabliers-violets.jpg"
        imageAlt="Apprenantes de Des Étoiles et des Femmes en cuisine"
        focus="center 32%"
        eyebrow="Vous cherchez un métier"
        title="Apprendre un métier de cuisine,"
        accent="avec un suivi complet"
        subtitle="Un diplôme reconnu. Des stages en restaurant. Un suivi social complet. Nous construisons votre parcours avec vous, jusqu'à l'emploi."
        breadcrumb={[
          {label:'Accueil', href:'#/'},
          {label:'Accompagnement'},
          {label:'Insertion'},
        ]}
      />

      {/* Chiffres clés */}
      <section style={{background:'var(--cream)', padding:'var(--s-8) 0'}}>
        <div className="container">
          <div className="stack-sm-2" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16}}>
            {[...window.FESTIN_DATA.stats.slice(0,3).map(s => ({value: s.value + (s.unit === '%' ? ' %' : s.unit), label: s.label})),
              {value:'5', label:'projets, tous rattachés à Festin'},
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
      <section style={{padding:'var(--s-9) 0', background:'var(--off-white)'}}>
        <div className="container" style={{maxWidth:880, margin:'0 auto'}}>
          <span className="eyebrow">Notre approche</span>
          <h2 className="h2" style={{marginTop:8, marginBottom:18}}>Un diplôme, et quelqu'un <em className="accent">à vos côtés</em></h2>
          <p className="lede" style={{color:'var(--ink-mid)'}}>
            Nos parcours réunissent trois choses : un diplôme reconnu, de l'expérience en restaurant, un accompagnement social complet. Mobilité, garde d'enfants, logement, soutien linguistique. Des femmes, des personnes réfugiées ou primo-arrivantes, des personnes détenues ou en sortie de détention y trouvent leur place.
          </p>
          <p className="body" style={{marginTop:16}}>
            Tous nos parcours sont gratuits. Une indemnisation est possible selon votre situation.
          </p>
        </div>
      </section>

      {/* Projets d'insertion */}
      <section style={{background:'var(--cream)', padding:'var(--s-9) 0'}}>
        <div className="container">
          <div className="formations__head" style={{marginBottom:48, maxWidth:760}}>
            <span className="eyebrow">Nos parcours d'insertion</span>
            <h2 className="h2">Le parcours qui vous <em className="accent">correspond</em></h2>
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

      {/* LE CALENDRIER — le déroulé réel d'une promotion, de septembre à juin */}
      <section className="stack-sm" style={{padding:'var(--s-9) 0', background:'var(--off-white)'}}>
        <div className="container">
          <span className="eyebrow eyebrow--gold">Une année, mois par mois</span>
          <h2 className="h2" style={{marginTop:8, marginBottom:14}}>Comment se déroule <em className="accent">une promotion</em></h2>
          <p className="lede" style={{color:'var(--ink-mid)', maxWidth:'60ch', marginBottom:36}}>
            Le calendrier est le même chaque année. Il vous donne une idée précise de ce qui vous
            attend, du premier entretien jusqu'à l'accompagnement vers l'emploi.
          </p>
          <ol className="calendrier">
            {[
              { mois: 'Septembre', t: "Recrutement et atelier de préparation", d: "Entretiens, puis un atelier collectif pour préparer la rencontre avec les restaurants." },
              { mois: 'Octobre',   t: "Rencontre avec les restaurants", d: "Immersion courte dans un restaurant pour valider le projet, puis mise en relation avec l'établissement qui vous accueillera." },
              { mois: 'Novembre',  t: "Début de la formation Tournesol", d: "La promotion Tournesol entre en formation." },
              { mois: 'Décembre',  t: "Début de la formation Des Étoiles et des Femmes", d: "Entrée en formation, et démarrage du suivi individuel et collectif." },
              { mois: 'Janvier — mars', t: "Formation, stages et suivi", d: "Alternance entre les cours, les stages en brigade et les rendez-vous de suivi." },
              { mois: 'Avril',     t: "Examens et sortie de formation", d: "Passage du diplôme, puis fin de la formation pour les deux promotions." },
              { mois: 'Mai — juin', t: "Accompagnement vers l'emploi", d: "Recherche de poste, mise en relation avec les restaurants, et préparation des promotions suivantes." },
            ].map((e, i) => (
              <li className="calendrier__item" key={i}>
                <span className="calendrier__mois">{e.mois}</span>
                <span className="calendrier__body">
                  <strong className="calendrier__t">{e.t}</strong>
                  <span className="calendrier__d">{e.d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA contact */}
      <section className="on-dark" style={{background:'var(--teal-deep)', color:'#fff', padding:'var(--s-9) 0', textAlign:'center'}}>
        <div className="container">
          <span className="eyebrow eyebrow--gold">Candidater à une promotion</span>
          <h2 className="h2" style={{color:'#fff', maxWidth:680, margin:'14px auto 18px'}}>Construire votre <em className="accent">projet professionnel</em></h2>
          <p className="lede" style={{color:'rgba(255,255,255,0.78)', maxWidth:560, margin:'0 auto 32px'}}>Écrivez-nous. Nous vérifierons ensemble votre éligibilité. Prochaines sessions : Des Étoiles et des Femmes (titre à finalité professionnelle), du 9 novembre 2026 au 13 avril 2027. Tournesol, du 30 novembre 2026 au 22 avril 2027.</p>
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
        image="images/beauxmets-images/LBM_cdutrey_071122-7264.jpg"
        imageAlt="Cuisine des Beaux Mets en service"
        focus="center 45%"
        eyebrow="Vous êtes restaurateur"
        title="Recruter et manager autrement,"
        accent="avec Festin"
        subtitle="Des stagiaires formées à votre carte. Des formations sur les violences en cuisine et le management juste. Un partenariat construit avec des professionnels du secteur."
        breadcrumb={[
          {label:'Accueil', href:'#/'},
          {label:'Accompagnement'},
          {label:'Professionnels'},
        ]}
      />

      {/* 3 piliers de l'offre RH */}
      <section style={{padding:'var(--s-9) 0', background:'var(--off-white)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">Ce que Festin construit avec les restaurateurs</span>
            <h2 className="h2">Ce que nous construisons <em className="accent">ensemble</em></h2>
          </div>
          <div className="stack-sm" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
            {[
              {
                icon: 'users',
                title: 'Recruter autrement',
                desc: 'Accueillez des stagiaires de Des Étoiles et des Femmes ou de Tournesol. Un binôme, un tutorat, un suivi pendant le stage. Si la rencontre a lieu, vous recrutez. Face à la pénurie de main-d\'œuvre, vous n\'êtes plus seul.',
              },
              {
                icon: 'shield-check',
                title: 'Prévenir les violences',
                desc: 'Une formation sur les violences sexistes et sexuelles, pensée pour la cuisine, la salle et la brigade. Le cadre légal. Des cas tirés de situations réelles. Un protocole de signalement.',
              },
              {
                icon: 'handshake',
                title: 'Manager juste',
                desc: 'Deux jours pour fidéliser une équipe. Posture managériale, recrutement inclusif, droit à l\'erreur. Vous repartez avec un plan d\'action pour votre établissement.',
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

      {/* Recruter avec France Travail (POEI) */}
      <section style={{padding:'var(--s-9) 0', background:'var(--cream)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:40}}>
            <span className="eyebrow">Recruter avec France Travail</span>
            <h2 className="h2">Accueillir un candidat, <em className="accent">étape par étape</em></h2>
            <p className="lede" style={{marginTop:14}}>La préparation opérationnelle à l'emploi individuelle (POEI) est financée par France Travail. Elle permet de recruter une personne formée à votre cuisine. Festin facilite les démarches.</p>
          </div>
          <div className="stack-sm" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
            {[
              {n:'1', when:'Dès septembre 2026', t:'Des candidats présentés', d:'Nous présentons des candidats qui correspondent à vos besoins. Des journées d\'immersion en cuisine valident le profil.'},
              {n:'2', when:'Janvier et mars 2027', t:'Deux stages chez vous', d:'Deux semaines en janvier, trois semaines en mars, dans votre établissement.'},
              {n:'3', when:'À partir d\'avril 2027', t:'Une prise de poste', d:'Si l\'expérience est concluante : un CDD de quatre mois minimum.'},
            ].map((s) => (
              <div key={s.n} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:16, padding:28}}>
                <div style={{fontSize:40, fontWeight:700, color:'var(--gold-ink)', lineHeight:1}}>{s.n}</div>
                <span style={{display:'block', fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--teal)', margin:'14px 0 6px'}}>{s.when}</span>
                <h3 style={{fontSize:20, fontWeight:700, lineHeight:1.25, margin:'0 0 8px'}}>{s.t}</h3>
                <p style={{fontSize:14, color:'var(--ink-mid)', lineHeight:1.6, margin:0}}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue de formations */}
      <section style={{background:'var(--cream)', padding:'var(--s-9) 0'}}>
        <div className="container">
          <div className="formations__head" style={{marginBottom:48, maxWidth:760}}>
            <span className="eyebrow">Catalogue de formations</span>
            <h2 className="h2">Des formations pour <em className="accent">vos équipes</em></h2>
            <p className="lede" style={{marginTop:14}}>Inter ou intra, en présentiel, par l'Académie Festin, organisme de formation certifié Qualiopi. Prise en charge OPCO possible.</p>
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
      <section style={{padding:'var(--s-9) 0', background:'var(--off-white)'}}>
        <div className="stack-sm container" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'center'}}>
          <div>
            <span className="eyebrow eyebrow--gold">Au-delà des formations</span>
            <h2 className="h2" style={{marginTop:8, marginBottom:18}}>Rejoindre <em className="accent">le programme Restaure</em></h2>
            <p className="lede" style={{color:'var(--ink-mid)'}}>
              Restaure réunit 35 structures et 700 signataires du manifeste. Leur but : changer les pratiques du secteur. Vous pouvez signer le manifeste, rejoindre un groupe de travail, venir aux tables rondes. Ou aux Toast : des apéros inspirants, organisés avec La Communauté Ecotable, où les restaurateurs échangent leurs pratiques.
            </p>
            <a href="#/projets/restaure" className="btn btn--teal" style={{marginTop:24}}>Découvrir Restaure <i data-lucide="arrow-right" style={{width:16, height:16}}/></a>
          </div>
          <div style={{background:'linear-gradient(135deg, var(--teal) 0%, var(--teal-deep) 100%)', borderRadius:18, aspectRatio:'4/3', display:'grid', placeItems:'center'}}>
            <i data-lucide="megaphone" style={{width:96, height:96, color:'var(--gold-light)', opacity:0.85}}/>
          </div>
        </div>
      </section>

      {/* CTA contact */}
      <section className="on-dark" style={{background:'var(--teal-deep)', color:'#fff', padding:'var(--s-9) 0', textAlign:'center'}}>
        <div className="container">
          <span className="eyebrow eyebrow--gold">Nous contacter</span>
          <h2 className="h2" style={{color:'#fff', maxWidth:680, margin:'14px auto 18px'}}>Parlons de votre <em className="accent">établissement</em></h2>
          <p className="lede" style={{color:'rgba(255,255,255,0.78)', maxWidth:560, margin:'0 auto 32px'}}>Notre équipe répond sous 48&nbsp;h ouvrées. Le Book de l'emploi présente les personnes diplômées de nos parcours qui cherchent un poste. Nous vous l'envoyons sur demande.</p>
          <a href="#/contact" className="btn btn--gold">Échanger avec notre équipe, ou demander le Book de l'emploi <i data-lucide="arrow-right" style={{width:16, height:16}}/></a>
        </div>
      </section>
    </div>
  );
}

// ---------- IMPACT PAGE ----------
function ImpactPage() {
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches || !window.gsap || !window.ScrollTrigger) return;
    const els = document.querySelectorAll('.impact-count');
    els.forEach(el => {
      const end = parseFloat(el.dataset.count), o = { v: 0 };
      if (isNaN(end)) return;
      el.textContent = '0';
      window.gsap.to(o, { v: end, duration: 1.4, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });
  }, []);
  // Données vérifiées (source : Plaquette Offre restaurateurs Festin 2025).
  // Toutes les autres séries seront alimentées depuis le rapport d'activité.
  // Source : Rapport d'activité Festin 2025

  const rapports = [
    {
      year: '2025',
      url: "https://drive.google.com/file/d/1dymsU5cV00adUDLBz7zLEQYWa_t_-70z/view?usp=sharing",
      title: "Rapport d'activité 2025",
      desc: "441 personnes accompagnées tous dispositifs confondus, 83 % de sorties en emploi ou formation. Les dix ans de Des Étoiles et des Femmes, la formation Tournesol, la consolidation du programme Restaure.",
      size: "PDF",
    },
    {
      year: '2024',
      url: "https://drive.google.com/file/d/1SxibbIWJkudH9Yd21vz9synn5vjeMwep/view?usp=sharing",
      title: "Rapport d'activité 2024",
      desc: "Plus de 300 femmes accompagnées par Des Étoiles et des Femmes, le lancement du Club des Talents à La Table de Cana, et des délégations de service public du ministère du Travail.",
      size: "PDF",
    },
    {
      year: '2023',
      url: "https://drive.google.com/file/d/1J67VBmxYVh8WEmvzWL57WAWSkNeJs-0N/view?usp=sharing",
      title: "Rapport d'activité 2023",
      desc: "Le rapport d'activité de l'année 2023.",
      size: "PDF",
    },
    {
      year: '2022',
      url: "https://drive.google.com/file/d/1S3p13F2abtwOqXLHTto_TPeSeRzxZfya/view?usp=sharing",
      title: "Rapport d'activité 2022",
      desc: "L'année de l'ouverture des Beaux Mets, le 15 novembre 2022.",
      size: "PDF",
    },
  ];

  const prix = [
    { year: '2025', title: "Label LUCIE Progress",  org: "Agence LUCIE — 848 / 1000 pour La Table de Cana Marseille" },
    { year: '2025', title: "Label Empl'itude renouvelé", org: "Obtenu initialement en 2019, renouvelé pour La Table de Cana" },
    { year: '2025', title: "Marraine nationale", org: "Julia Sedefdjian rejoint le réseau Des Étoiles et des Femmes" },
    { year: '2025', title: "Sous-traitant Greta — Région Sud", org: "Marché de la formation professionnelle, Région Sud" },
    { year: '2024', title: "Délégations de service public", org: "Ministère du Travail — repérage et remobilisation, Île-de-France et Hauts-de-France, pour trois ans" },
    { year: '2022', title: "Fondation des Femmes", org: "Distinction pour l'accompagnement des femmes vers l'autonomie" },
    { year: '2020', title: "Plan d'Investissement dans les Compétences", org: "Sélection au PIC, ministère du Travail" },
    { year: '2019', title: "Fondation la France s'engage", org: "Lauréat — Des Étoiles et des Femmes" },
  ];

  const presse = [
    { name: "M6, Un jour un doc : « Un restaurant dans une prison » (novembre 2025)", href: "https://www.m6.fr/un-jour-un-doc-p_22196/un-restaurant-dans-une-prison-c_13151161" },
    { name: "Le Monde : entretien avec Armand Hurault (février 2025)", href: "https://www.lemonde.fr/m-styles/article/2025/02/14/armand-hurault-directeur-de-festin-la-restauration-m-est-apparue-comme-l-un-des-rares-secteurs-d-activite-ou-l-origine-etrangere-peut-etre-une-valeur-ajoutee_6546308_4497319.html" },
    { name: "Les Échos Weekend : « Les détenus s'en sortent par la cuisine » (novembre 2025)", href: "https://www.lesechos.fr/weekend/business-story/les-clients-sont-sympas-ils-font-des-bons-retours-dans-la-prison-des-baumettes-les-detenus-sen-sortent-par-la-cuisine-2196595" },
    { name: "El País, repris par Courrier International (2026)", href: "https://www.courrierinternational.com/long-format/vu-d-espagne-au-restaurant-des-beaux-mets-a-marseille-des-detenus-mitonnent-leur-reinsertion_239702" },
    { name: "Tous les articles de presse", href: "#/actualites" },
  ];

  return (
    <div data-screen-label="Notre impact">
      <PageHeader
        image="images/photo-applaudissements.jpg"
        imageAlt="Cérémonie de fin de formation"
        focus="center 38%"
        eyebrow="Chiffres et rapports"
        title="Ce que 2025"
        accent="a changé"
        subtitle="Ce que nos projets ont produit en 2025, d'après notre rapport d'activité : les résultats, les faits marquants, les comptes."
        breadcrumb={[
          {label:'Accueil', href:'#/'},
          {label:'Notre impact'},
        ]}
      />

      {/* Chiffres clés vérifiés — source : Plaquette Offre restaurateurs Festin */}
      <section style={{background:'var(--cream)', padding:'var(--s-8) 0'}}>
        <div className="container">
          <div className="stack-sm-2" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16}}>
            {[...window.FESTIN_DATA.stats.slice(0,3).map(s => ({value: s.value, unit: s.unit, label: s.label})),
              {value:'119', unit:'', label:'personnes employées aux Beaux Mets depuis 2022'},
            ].map((s, i) => (
              <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:28}}>
                <div style={{fontSize:42, fontWeight:700, color:'var(--teal)', lineHeight:1, letterSpacing:'-0.02em'}}><span className="impact-count" data-count={s.value}>{s.value}</span>{s.unit === '%' ? ' %' : s.unit}</div>
                <div style={{fontSize:13, color:'var(--ink-mid)', marginTop:12, lineHeight:1.4}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faits marquants 2025 — source : Rapport d'activité 2025 */}
      <section style={{padding:'var(--s-9) 0', background:'var(--off-white)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">L'année 2025</span>
            <h2 className="h2">Ce qui a marqué <em className="accent">l'année</em></h2>
          </div>
          <div className="stack-sm" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
            {[
              {k:'Des Étoiles et des Femmes', t:'Le Grand Festin des dix ans', d:'Le 3 octobre : 14 brigades venues de tout le réseau, plus de 600 convives et plus de 100 bénévoles, sur le Vieux-Port de Marseille.'},
              {k:'Des Étoiles et des Femmes', t:'Un partenariat avec le Greta', d:'Festin devient sous-traitant d\'une partie des heures de formation du marché de la Région Sud.'},
              {k:'Des Étoiles et des Femmes', t:'Julia Sedefdjian, marraine nationale', d:'La cheffe rejoint le réseau pour les dix ans du programme.'},
              {k:'Restaure', t:'Des vidéos vues plus de deux millions de fois', d:'Cinq tables rondes à Marseille, Toulouse et Lille, enregistrées en podcast. Des vidéos de prévention des violences en cuisine vues plus de deux millions de fois.'},
              {k:'Les Beaux Mets', t:'Un documentaire de 45 minutes sur M6', d:'« Un jour un doc » lui consacre 45 minutes. La brigade lance aussi ses biscuits à emporter : navettes et croquants.'},
              {k:'La Table de Cana', t:'LUCIE Progress et Empl\'itude', d:'Le label LUCIE Progress, avec 848 sur 1 000. Le label Empl\'itude, renouvelé. Et la naissance du collectif EPICES.'},
              {k:'Tournesol', t:'Une formation portée avec Refugee Food', d:'Festin porte la formation avec Refugee Food et Estello Formation. Cinq mois, gratuits et rémunérés.'},
              {k:'Restaure', t:'Cinq groupes de travail au démarrage', d:'Quatre structures pilotent désormais le programme. La formation « Management juste » est lancée.'},
              {k:'Des Étoiles et des Femmes', t:'Une formation contre les violences sexistes et sexuelles', d:'Créée pour les professionnels de la restauration : cadre légal, cas réels en cuisine et en salle, protocole de signalement.'},
            ].map((f, i) => (
              <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:24}}>
                <span style={{fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--teal)'}}>{f.k}</span>
                <h3 style={{fontSize:18, fontWeight:700, margin:'8px 0 8px', lineHeight:1.3}}>{f.t}</h3>
                <p style={{fontSize:14, color:'var(--ink-mid)', lineHeight:1.6, margin:0}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Synthèse financière — vraie donnée Rapport d'activité 2025 */}
      <section style={{padding:'var(--s-9) 0', background:'var(--off-white)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">Synthèse financière 2025</span>
            <h2 className="h2">Un budget de <em className="accent">1,7 M€</em></h2>
            <p className="lede" style={{marginTop:14}}>Quatre sources financent le budget 2025 : mécénat privé, subventions publiques, aides aux postes, chiffre d'affaires. Cette diversité protège l'autonomie de l'association.</p>
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
              <div className="stack-sm" style={{display:'grid', gridTemplateColumns:'auto 1fr', gap:64, alignItems:'center'}}>
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
                      <span style={{fontSize:18, fontWeight:700, color:'var(--ink)', textAlign:'right'}}>{String(b.value).replace('.', ',')} %</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Rapports d'activité — téléchargement */}
      <section style={{padding:'var(--s-9) 0', background:'var(--cream)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">Documents publics</span>
            <h2 className="h2">Tous nos <em className="accent">rapports d'activité</em></h2>
            <p className="lede" style={{marginTop:14}}>Téléchargez les rapports annuels : chiffres, projets et perspectives.</p>
          </div>
          <div className="stack-sm" style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:20}}>
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
      <section style={{padding:'var(--s-9) 0', background:'var(--off-white)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:48}}>
            <span className="eyebrow">Reconnaissance</span>
            <h2 className="h2">Prix, labels et <em className="accent">marchés obtenus</em></h2>
          </div>
          <div className="stack-sm-2" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20}}>
            {prix.map((p, i) => (
              <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:24}}>
                <div style={{width:44, height:44, borderRadius:10, background:'rgba(255,193,0,0.16)', display:'grid', placeItems:'center', color:'var(--gold-ink)', marginBottom:18}}>
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
      <section style={{padding:'var(--s-8) 0', background:'var(--cream)', borderTop:'1px solid var(--line)'}}>
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

      {/* Presse : présentation, chiffres clés, contact, logos */}
      <section id="presse" style={{padding:'var(--s-9) 0', background:'var(--cream)'}}>
        <div className="container">
          <div style={{maxWidth:760, marginBottom:40}}>
            <span className="eyebrow">Presse</span>
            <h2 className="h2">Présenter Festin <em className="accent">en quelques mots</em></h2>
            <p className="lede" style={{marginTop:14}}>Des textes à reprendre tels quels, des chiffres sourcés et datés, un contact et les logos.</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap:20}}>
            {[
              {k:'En 50 mots', t:"Festin est une association à but non lucratif et d'intérêt général, agréée ESUS, basée à Marseille. Elle forme des personnes en insertion aux métiers de la cuisine et les suit jusqu'à l'emploi. Elle aide les restaurants à recruter et à garder leurs équipes. Avec le programme Restaure, elle agit contre les violences en cuisine."},
              {k:'En 100 mots', t:"Festin est une association loi 1901, à but non lucratif et d'intérêt général, agréée ESUS. Elle est basée à Marseille. Elle réunit cinq projets. Des Étoiles et des Femmes forme des femmes aux métiers de la cuisine, dans 13 antennes. Les Beaux Mets est le premier restaurant en prison ouvert au public en France. La Table de Cana, traiteur et restauration collective en insertion, existe depuis 1993. Le programme Restaure réunit 35 structures contre les violences en cuisine. Tournesol forme des personnes réfugiées ou primo-arrivantes, avec Refugee Food. L'Académie Festin, certifiée Qualiopi, réunit toutes ses formations."},
            ].map((b, i) => (
              <div key={i} style={{background:'#fff', border:'1px solid var(--line)', borderRadius:16, padding:28}}>
                <span style={{fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--teal)'}}>{b.k}</span>
                <p style={{fontSize:15, color:'var(--ink)', lineHeight:1.7, margin:'10px 0 0'}}>{b.t}</p>
              </div>
            ))}
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap:20, marginTop:20}}>
            <div style={{background:'#fff', border:'1px solid var(--line)', borderRadius:16, padding:28}}>
              <span style={{fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--teal)'}}>Chiffres clés</span>
              <ul style={{listStyle:'none', padding:0, margin:'12px 0 0', display:'grid', gap:8, fontSize:15, color:'var(--ink)'}}>
                {[...window.FESTIN_DATA.stats.slice(0,3).map(s => s.value + (s.unit === '%' ? ' %' : s.unit === '' ? '' : ' ' + s.unit.trim()) + ' ' + s.label),
                  'Plus de 1 200 femmes accompagnées par Des Étoiles et des Femmes depuis 2015',
                  '91 % de réussite aux diplômes en 2025 (Des Étoiles et des Femmes)'].map((l, i) => <li key={i}>{l}</li>)}
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
window.SadiCarnotPage = SadiCarnotPage;
window.AccompagnementInsertionPage = AccompagnementInsertionPage;
window.AccompagnementProsPage = AccompagnementProsPage;
window.ImpactPage = ImpactPage;
window.AcademiePage = AcademiePage;
window.ActualitesPage = ActualitesPage;
