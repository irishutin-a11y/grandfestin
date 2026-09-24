// Pages.jsx — dedicated page components for multi-page navigation
// Each page is a full-screen view; routing handled in index.html via hash.

// En-tête des pages Formations, fiche formation et Académie : rendu par le hero
// partagé des pages intérieures (Sections.jsx, HeroPage), pour une seule grammaire.
function PageHeader({ eyebrow, title, accent, subtitle, breadcrumb, image, imageAlt = '' }) {
  return (
    <window.HeroPage tone="teal" kicker={eyebrow} title={title} accent={accent} proof={subtitle}
      img={image} imgAlt={imageAlt} crumb={breadcrumb || []} />
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
    <section className="on-dark" style={{background:'var(--teal-deep)',color:'var(--off-white)',padding:'var(--s-9) 0',textAlign:'center'}}>
      <div className="container">
        <span className="eyebrow eyebrow--gold">Une question ?</span>
        <h2 className="h2" style={{color:'var(--off-white)',maxWidth:640,margin:'14px auto 18px'}}>Parlons de votre <em className="accent">projet de formation</em></h2>
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
    <div data-screen-label="Contact">
      <window.HeroPage tone="teal" kicker="Contact" title="Parlons de" accent="votre projet."
        proof="Recruter, vous former, orienter une personne ou soutenir un projet : nous répondons sous 48 h ouvrées."
        img="images/photo-service-restaurant.jpg" imgAlt="Service en salle dans un restaurant partenaire"
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Contact' }]} />
      <Contact />
    </div>
  );
}

// ---------- 404 ----------
function NotFoundPage() {
  return (
    <div data-screen-label="404">
      <window.HeroPage tone="gold" kicker="Erreur 404" title="Cette page" accent="n'existe pas."
        proof="Elle a peut-être changé d'adresse. Reprenez depuis l'accueil, ou allez directement à ce que vous cherchez.">
        <div className="nf__links">
          <a className="btnb btnb--teal" href="#/">Retour à l'accueil</a>
          <a className="nf__lnk" href="#/accompagnement/insertion">Les formations</a>
          <a className="nf__lnk" href="#/accompagnement/professionnels">Recruter avec Festin</a>
          <a className="nf__lnk" href="#/contact">Nous écrire</a>
        </div>
      </window.HeroPage>
    </div>
  );
}

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
              <div key={i} style={{display:'flex', gap:16, alignItems:'flex-start', padding:20, background:'var(--off-white)', borderRadius:12, border:'1px solid var(--line)'}}>
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
      <section className="on-dark" style={{padding:'var(--s-8) 0', background:'var(--teal-dark)', color:'var(--off-white)'}}>
        <div className="container">
          <h2 className="h2" style={{color:'var(--off-white)', marginTop:8, marginBottom:16, maxWidth:'22ch'}}>
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
            <h2 className="h2" style={{marginTop:8}}>À chacun sa <em className="accent">formation</em></h2>
          </div>
          <div className="stack-sm" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
            <a href="#/formations" className="formation-card" style={{textDecoration:'none'}}>
              <div className="formation-card__body" style={{padding:32}}>
                <div style={{width:56, height:56, borderRadius:14, background:'var(--cream)', display:'grid', placeItems:'center', marginBottom:20}}>
                  <i data-lucide="briefcase" style={{width:24, height:24, color:'var(--teal)'}}/>
                </div>
                <h3 style={{fontSize:'var(--fs-h3)', fontWeight:700, margin:'8px 0 12px'}}>Vous êtes professionnel de la restauration</h3>
                <p style={{fontSize:15, color:'var(--ink-mid)', lineHeight:1.6, marginBottom:20}}>Des formations courtes en management juste, en prévention des violences sexistes et sexuelles et en recrutement inclusif.</p>
                <span className="lnk">Voir les formations professionnelles <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
              </div>
            </a>
            <a href="#/accompagnement/insertion" className="formation-card" style={{textDecoration:'none'}}>
              <div className="formation-card__body" style={{padding:32}}>
                <div style={{width:56, height:56, borderRadius:14, background:'var(--cream)', display:'grid', placeItems:'center', marginBottom:20}}>
                  <i data-lucide="star" style={{width:24, height:24, color:'var(--gold-ink)'}}/>
                </div>
                <h3 style={{fontSize:'var(--fs-h3)', fontWeight:700, margin:'8px 0 12px'}}>Vous cherchez un métier</h3>
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
      <section className="on-dark" style={{background:'var(--teal-dark, var(--teal-deep))', color:'var(--off-white)', padding:'var(--s-8) 0', textAlign:'center'}}>
        <div className="container" style={{maxWidth:680}}>
          <h2 className="h2" style={{color:'var(--off-white)', marginTop:10, marginBottom:16}}>En partenariat avec <em className="accent">Estello Formation</em></h2>
          <p style={{fontSize:17, color:'rgba(255,255,255,0.78)', lineHeight:1.7, marginBottom:28}}>
            L'Académie Festin est co-portée avec Estello Formation, organisme spécialisé dans les formations aux métiers de l'hôtellerie-restauration.
          </p>
          {/* [À COMPLÉTER] site d'Estello Formation : estelloformation.com répond 404 (24/09/2026) */}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTUALITÉS PAGE — toutes les retombées presse
// ─────────────────────────────────────────────────────────────────────────────
function ActualitesPage() {
  const D = window.FESTIN_DATA;
  const allPresse = (D.presse || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const dispositifs = ['Tous', ...Array.from(new Set(allPresse.map(a => a.dispositif).filter(Boolean)))];
  const [filtre, setFiltre] = React.useState('Tous');
  const filtered = filtre === 'Tous' ? allPresse : allPresse.filter(a => a.dispositif === filtre);
  const PAS = 8;
  const [vus, setVus] = React.useState(PAS);
  React.useEffect(() => setVus(PAS), [filtre]);
  const listRef = React.useRef(null);
  // changement de filtre : les articles restants apparaissent en cascade (relier le filtre au résultat)
  React.useEffect(() => {
    const g = window.gsap, el = listRef.current;
    if (!g || !el || (window.FESTIN_RM && window.FESTIN_RM())) return;
    const tw = g.from(el.children, { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.03, clearProps: 'all' });
    return () => tw.kill();
  }, [filtre]);
  const S = D.stats;
  return (
    <div className="pageActu" data-screen-label="Actualités">
      <window.HeroPage tone="gold" kicker="Actualités" title="Les temps forts," accent="et la presse."
        proof="Le Grand Festin, les masterclass, les rencontres de Restaure : les moments de l'année en images. Puis les articles, reportages et podcasts sur nos projets."
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Actualités' }]} />

      <window.TempsForts items={D.tempsForts || []} />

      {/* Presse : liste filtrable */}
      <section className="isec isec--white" aria-labelledby="actu-presse">
        <div className="wrap">
          <h2 className="isec__h" id="actu-presse">Dans <em>la presse</em></h2>
          <div className="apfilters" role="group" aria-label="Filtrer par projet">
            {dispositifs.map(d => (
              <button key={d} type="button" className={'apfilter' + (filtre === d ? ' is-on' : '')} aria-pressed={filtre === d} onClick={() => setFiltre(d)}>{d}</button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">{filtered.length} article{filtered.length > 1 ? 's' : ''}</p>
          <ul className="aplist" ref={listRef}>
            {filtered.slice(0, vus).map((a, i) => (
              <li key={a.href || i}>
                <a className="apitem" href={a.href} target="_blank" rel="noopener noreferrer">
                  <span className="apitem__meta"><span className="apitem__src">{a.source}</span>{a.date && <span>{fmtDatePresse(a.date)}</span>}{a.type && <span>{a.type}</span>}</span>
                  <span className="apitem__t">{a.title}<span className="sr-only"> (s'ouvre dans un nouvel onglet)</span></span>
                  <span className="apitem__proj">{a.dispositif} <span className="arrow" aria-hidden="true">↗</span></span>
                </a>
              </li>
            ))}
          </ul>
          {filtered.length > vus && (
            <button type="button" className="apmore" onClick={() => setVus(vus + PAS)}>
              Afficher {Math.min(PAS, filtered.length - vus)} articles de plus <span className="apmore__n">({filtered.length - vus} restants)</span>
            </button>
          )}
        </div>
      </section>

      {/* Espace presse : famille teal */}
      <section className="isec isec--teal on-dark" aria-labelledby="actu-kit">
        <div className="wrap apkit">
          <div>
            <h2 className="isec__h" id="actu-kit">Espace <em>presse</em></h2>
            <p className="isec__lede">Demandes d'interview, visuels, chiffres : écrivez à <a href="mailto:contact@grandfestin.com">contact@grandfestin.com</a>, à l'attention d'Iris Hutin, chargée de projet Communication. Nos rapports d'activité sont sur la <a href="#/impact">page Impact</a>.</p>
            <div className="apkit__logos">
              <a className="btnb btnb--gold" href="images/logo-festin.png" download>Logo Festin, couleur</a>
              <a className="btnb btnb--ghost" href="images/logo-festin-jaune.png" download>Logo Festin, jaune</a>
              <a className="btnb btnb--ghost" href="images/logo-academie-festin.png" download>Logo Académie Festin</a>
            </div>
          </div>
          <div className="apkit__facts">
            <h3>Chiffres à reprendre</h3>
            <ul>
              <li><b>{S[0].value}</b> personnes accompagnées en 2025</li>
              <li><b>{S[1].value}&nbsp;%</b> de sorties en emploi ou en formation en 2025, tous dispositifs</li>
              <li><b>{S[2].value}</b> territoires d'intervention</li>
              <li><b>1&nbsp;200</b> femmes accompagnées par Des Étoiles et des Femmes depuis 2015</li>
              <li><b>1987</b> : création de l'association</li>
            </ul>
            <p>Source : rapports d'activité Festin. Merci de citer l'année.</p>
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
window.ImpactPage = ImpactPage;
window.AcademiePage = AcademiePage;
window.ActualitesPage = ActualitesPage;
