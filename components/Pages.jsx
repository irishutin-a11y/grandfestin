// Pages.jsx — dedicated page components for multi-page navigation
// Each page is a full-screen view; routing handled in index.html via hash.

// En-tête des pages Formations, fiche formation et Académie : rendu par le hero
// partagé des pages intérieures (Sections.jsx, HeroPage), pour une seule grammaire.
function PageHeader({ tone = 'teal', eyebrow, title, accent, subtitle, breadcrumb, image, imageAlt = '', center, children }) {
  return (
    <window.HeroPage tone={tone} kicker={eyebrow} title={title} accent={accent} proof={subtitle}
      img={image} imgAlt={imageAlt} crumb={breadcrumb || []} center={center}>{children}</window.HeroPage>
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

// « Festin en quelques mots » : le texte de présentation à reprendre, avec un bouton pour le copier
function PresseResume({ texte }) {
  const [ok, setOk] = React.useState(false);
  const copier = () => {
    const fin = () => { setOk(true); setTimeout(() => setOk(false), 2500); };
    if (navigator.clipboard) navigator.clipboard.writeText(texte).then(fin, fin); else fin();
  };
  return (
    <div className="apkit__resume">
      <h3>Festin en quelques mots</h3>
      <p>{texte}</p>
      <button type="button" className="lnk apkit__copy" onClick={copier}>{ok ? 'Texte copié' : 'Copier le texte'}</button>
      <span className="sr-only" aria-live="polite">{ok ? 'Texte copié' : ''}</span>
    </div>
  );
}

function FormationCardLink({ f, wide, noPrice }) {
  return (
    <a className={"formation-card" + (wide ? " wide" : "")} href={`#/formations/${f.id}`}>
      <div className="formation-card__img">{f.img ? <img src={f.img} alt={f.title} loading="lazy"/> : <span className="img-vide" aria-hidden="true" />}</div>
      <div className="formation-card__body">
        <span className={"ftag ftag--" + (f.cat === "Professionnels" ? "pro" : "ins")}>{f.cat === "Professionnels" ? "Formation pro" : "Formation diplômante"}</span>
        {f.porteur && <span className="formation-card__porteur">{f.porteur}</span>}
        <h3>{f.title}</h3>
        <p className="formation-card__desc">{f.desc}</p>
        {/* micro-étiquettes : durée, public, coût (procédé de la page Pros, RETOURS-AUDIT §3.1) */}
        <window.ArTags className="formation-card__tags" tags={[
          f.ou && ['Où', f.ou],
          ['Durée', f.dureeCourte || f.duration.split(',')[0].trim()],
          ['Pour', f.publicLabel],
          f.cat === 'Professionnels' ? (!noPrice && ['Tarif', f.price.split('·')[0].trim()]) : ['Coût', 'gratuit'],
        ].filter(Boolean)} />
        <div className="formation-card__bottom">
          <span className="lnk">Voir le détail <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
        </div>
      </div>
    </a>
  );
}

// ---------- FORMATION DETAIL PAGE ----------
function FormationDetailPage({ id }) {
  const f = window.FESTIN_DATA.formations.find(x => x.id === id);
  if (!f) return <NotFoundPage />;
  return (
    <div data-screen-label={`03 Formation — ${f.title}`}>
      <PageHeader center tone={f.cat === 'Professionnels' ? 'gold' : 'teal'}
        eyebrow={(f.cat === 'Professionnels' ? 'Formation pro' : 'Formation diplômante') + (f.porteur ? ' · ' + f.porteur : '')}
        title={(f.titreFiche || f.title).split('—')[0].trim()}
        accent={f.title.includes('—') ? '— ' + f.title.split('—')[1].trim() : null}
        subtitle={f.desc}
        breadcrumb={[
          {label:'Accueil',href:'#/'},
          f.cat === 'Professionnels' ? {label:'Le programme Restaure',href:'#/projets/restaure'} : {label:"L'Académie Festin",href:'#/academie'},
          {label:f.titreFiche || f.title}
        ]}
      >
        {f.pastilles && <ul className="hp__pastilles" aria-label="Diplômes préparés">{f.pastilles.map((t) => <li key={t}>{t}</li>)}</ul>}
        {(() => {
          // plus d'informations : le site du projet pour les parcours, le contact pour les formations pro
          const site = { 'des-etoiles-et-des-femmes': 'des-etoiles-et-des-femmes', tournesol: 'tournesol' }[f.id];
          const p = site && window.FESTIN_DATA.projets.find((x) => x.id === site);
          return <div className="g-herocta">{p
            ? <a className="btnb btnb--light" href={p.siteUrl} target="_blank" rel="noopener noreferrer">Plus d'informations <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (site du projet, nouvel onglet)</span></a>
            : <a className="btnb btnb--teal" href="#/contact/former">Plus d'informations <span className="arrow" aria-hidden="true">→</span></a>}</div>;
        })()}
      </PageHeader>
      <section style={{padding:'var(--s-8) 0',background:'var(--off-white)'}}>
        <div className="container">
          <div className="detail-grid">
            <div className="detail-main">
              {f.img && (
                <div className="detail-hero">
                  <img src={f.img} alt={f.title}/>
                </div>
              )}
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
              {/* formation rattachée à un projet (Tournesol) : ses chiffres et ses témoignages, mot pour mot (RETOURS-AUDIT, question 4) */}
              {(() => {
                const pj = f.projet && window.FESTIN_DATA.projets.find((x) => x.id === f.projet);
                if (!pj) return null;
                const B = pj.bilan;
                const recul = B ? B.items.filter((it) => /un an après/.test(it.label)) : [];
                const temoins = (pj.temoignages || []).filter((t) => !t.placeholder && (t.citation || t.extrait)).map((t) => ({
                  name: t.prenom, meta: t.role || [t.ville, t.promo].filter(Boolean).join(' · '), quote: t.extrait || t.citation, photo: t.photo,
                }));
                return (
                  <>
                    {B && (
                      <div className="detail-section">
                        <span className="eyebrow">{B.eyebrow}</span>
                        <h2 className="h3" style={{marginTop:8,marginBottom:18}}>{B.title}</h2>
                        <ul className="fd-bilan">
                          {B.items.filter((it) => !/un an après/.test(it.label)).map((it) => <li key={it.label}><b>{it.value}</b><span>{it.label}</span></li>)}
                        </ul>
                        {recul.map((it) => <p className="fd-bilan__recul" key={it.label}><b>{it.value}</b> {it.label}.</p>)}
                        <p className="fd-bilan__src">{B.source}</p>
                      </div>
                    )}
                    {temoins.length > 0 && (
                      <div className="detail-section">
                        <span className="eyebrow">Témoignages</span>
                        <h2 className="h3" style={{marginTop:8,marginBottom:18}}>Paroles d'anciens stagiaires</h2>
                        <window.TestiCarousel label={'Témoignages, ' + f.title} items={temoins} />
                      </div>
                    )}
                  </>
                );
              })()}
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
                {/* parcours gratuits : « Nous contacter », jamais « devis » (RETOURS-AUDIT §2.8) */}
                <a href={f.cat === 'Professionnels' ? '#/contact/former' : '#/contact/se-former'} className="btn btn--gold" style={{width:'100%',justifyContent:'center',marginTop:8}}>{f.cat === 'Professionnels' ? 'Demander un devis' : 'Nous contacter'} <i data-lucide="arrow-right" style={{width:16,height:16}}/></a>
                <a href="#/formations" className="btn btn--ghost" style={{width:'100%',justifyContent:'center',marginTop:10}}>Voir les autres formations</a>
                {f.audienceKey === 'pros' && (
                  <a href={window.FESTIN_DATA.catalogPdf} target="_blank" rel="noopener" className="btn btn--catalog" style={{width:'100%',justifyContent:'center',marginTop:10}}>
                    <i data-lucide="book-open" style={{width:16,height:16}}/> Consulter le catalogue
                  </a>
                )}
              </div>
              {f.audienceKey !== 'pros' && <div className="qualiopi-side">
                <img src={window.FESTIN_DATA.brand.qualiopi} alt="Logo Qualiopi" className="qualiopi-side__logo" loading="lazy" onError={(e)=>{e.currentTarget.style.display='none';}}/>
                <div>
                  <div className="qualiopi-side__t">Certifié Qualiopi</div>
                  <div className="qualiopi-side__d">Au titre des actions de formation</div>
                </div>
              </div>}
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
      <window.HeroPage tone="deep" kicker="Contact" title="Parlons de" accent="votre projet."
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
      <window.HeroPage tone="deep" kicker="Erreur 404" title="Cette page" accent="n'existe pas."
        proof="Elle a peut-être changé d'adresse. Reprenez depuis l'accueil, ou allez directement à ce que vous cherchez.">
        <div className="nf__links">
          <a className="btnb btnb--gold" href="#/">Retour à l'accueil</a>
          <a className="nf__lnk" href="#/academie">Nos formations</a>
          <a className="nf__lnk" href="#/accompagnement/professionnels">Former et recruter</a>
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

// ---------- IMPACT, version graphique (retours du 01/10/2026) ----------
// Mêmes données (FESTIN_DATA.impact), mise en page variée : grands chiffres sur
// fond sombre avec barres en couleur, anneaux pour l'étude Koreis, cartes par
// projet, rapports en couvertures, prix en frise par année.
const IMP_COULEUR = {
  'des-etoiles-et-des-femmes': '#C2421C', tournesol: '#9A5B0E', 'les-beaux-mets': '#A3543D',
  'la-table-de-cana': '#7A2E3A', restaure: '#4F6019',
};

// Série sur quatre ans : le dernier chiffre en très grand, l'évolution en barres
function ImpSerie({ id, label, items, unit = '', max, tone }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const g = window.gsap, el = ref.current;
    if (!g || !el || (window.FESTIN_RM && window.FESTIN_RM())) return;
    const tw = g.from(el.querySelectorAll('.imp-serie__fill'), { scaleY: 0, transformOrigin: '50% 100%', duration: 1, stagger: 0.12, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    return () => { tw.scrollTrigger && tw.scrollTrigger.kill(); tw.kill(); };
  }, []);
  const last = items[items.length - 1];
  return (
    <figure className={'imp-serie imp-serie--' + tone} ref={ref} aria-labelledby={id}>
      <figcaption id={id} className="imp-serie__l">{label}</figcaption>
      <p className="imp-serie__big"><b>{last.value}{unit}</b><span>en {last.label}</span></p>
      <div className="imp-serie__plot" aria-hidden="true">
        {items.map((it, i) => (
          <span className={'imp-serie__bar' + (i === items.length - 1 ? ' is-last' : '')} key={it.label}>
            <span className="imp-serie__v">{it.value}{unit}</span>
            <span className="imp-serie__track"><span className="imp-serie__fill" style={{ height: (it.value / max * 100) + '%' }} /></span>
            <span className="imp-serie__y">{it.label}</span>
          </span>
        ))}
      </div>
      {/* tableau dépliant retiré (RETOURS-V3, question 3) ; les valeurs restent lisibles par les lecteurs d'écran */}
      <ul className="sr-only">{items.map((it) => <li key={it.label}>{it.label} : {it.value}{unit}</li>)}</ul>
    </figure>
  );
}

// Anneau de pourcentage (SVG), ou pictogramme « 1 sur 4 »
function ImpAnneau({ n, t, d }) {
  const m = /^(\d+)\s*%$/.exec(n);
  const sur = /^(\d+)\s*sur\s*(\d+)$/.exec(n);
  const C = 2 * Math.PI * 52;
  return (
    <li className="imp-anneau reveal">
      {m ? (
        <svg className="imp-anneau__svg" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" className="imp-anneau__bg" />
          <circle cx="60" cy="60" r="52" className="imp-anneau__arc" strokeDasharray={(m[1] / 100 * C) + ' ' + C} transform="rotate(-90 60 60)" />
        </svg>
      ) : sur ? (
        <span className="imp-anneau__picto" aria-hidden="true">
          {Array.from({ length: +sur[2] }).map((_, i) => <i key={i} className={i < +sur[1] ? 'is-on' : ''} />)}
        </span>
      ) : null}
      <span className="imp-anneau__n">{n}</span>
      <span className="imp-anneau__t">{t}</span>
      <span className="imp-anneau__d">{d}</span>
    </li>
  );
}

function ImpactPage() {
  const D = window.FESTIN_DATA, I = D.impact;
  const rootRef = React.useRef(null);
  window.useGReveal(rootRef);
  React.useEffect(() => {
    const els = rootRef.current.querySelectorAll('.reveal');
    if ((window.FESTIN_RM && window.FESTIN_RM()) || !window.ScrollTrigger) { els.forEach(e => e.classList.add('is-in')); return; }
    const t = [...els].map(el => window.ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('is-in') }));
    return () => t.forEach(x => x.kill());
  }, []);
  const byId = (id) => D.projets.find(p => p.id === id) || {};
  const nb = (n) => n.toLocaleString('fr-FR');
  const annees = {};
  I.prix.forEach((p) => { (annees[p.year] = annees[p.year] || []).push(p); });
  const couvertures = ['teal-dark', 'teal', 'gold', 'coral'];
  return (
    <div className="pageImpact imp2" ref={rootRef} data-screen-label="Impact">
      <window.HeroPage tone="deep" kicker={I.hero.kicker} title={I.hero.title} accent={I.hero.titleAccent} proof={I.hero.proof}
        img={I.hero.img} imgAlt={I.hero.imgAlt}
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Notre impact' }]}>
        <div className="g-herocta"><window.GLink l={{ to: 'rapports' }} className="btnb btnb--gold">Nos rapports d'activité <span className="arrow" aria-hidden="true">↓</span></window.GLink></div>
      </window.HeroPage>

      {/* 1 · Les deux chiffres de l'année, en grand, sur fond sombre */}
      <section className="imp-chiffres on-dark" aria-labelledby="imp-serie">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-serie">Quatre ans <em>d'impact mesuré</em></h2>
          <div className="imp-chiffres__grid">
            <ImpSerie id="imp-s1" tone="gold" label="Personnes accompagnées vers l'emploi" max={500}
              items={I.annees.map(a => ({ label: a.year, value: a.personnes }))} />
            <ImpSerie id="imp-s2" tone="coral" label="Sorties en emploi ou en formation" unit={' %'} max={100}
              items={I.annees.map(a => ({ label: a.year, value: a.taux }))} />
          </div>
          <p className="imp-chiffres__note">En 2025 : 14 territoires et 91 % de réussite aux diplômes avec Des Étoiles et des Femmes. {I.serieNote} Source : rapports d'activité Festin 2022 à 2025.</p>
        </div>
      </section>

      {/* 2 · Dans la durée : anneaux */}
      <section className="isec isec--cream" aria-labelledby="imp-duree">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-duree">{I.duree.title} <em>{I.duree.titleAccent}</em></h2>
          <p className="isec__lede reveal">{I.duree.lede}</p>
          <ul className="imp-anneaux">{I.duree.faits.map((f) => <ImpAnneau key={f.n} {...f} />)}</ul>
          <p className="isec__note">{I.duree.source}</p>
        </div>
      </section>

      {/* 3 · Un chiffre par projet : cartes */}
      <section className="isec isec--white" aria-labelledby="imp-projets">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-projets">Projet <em>par projet</em></h2>
          <ul className="imp-projets">
            {I.projets.map((p) => {
              const pr = byId(p.id);
              return (
                <li key={p.id} className="reveal" style={{ '--pc': IMP_COULEUR[p.id] || 'var(--teal)' }}>
                  <a className="imp-projet" href={'#/projets/' + p.id}>
                    <span className="imp-projet__head">
                      {pr.logo && <span className="imp-projet__logo"><img src={encodeURI(decodeURI(pr.logo))} alt="" loading="lazy" /></span>}
                      <span className="imp-projet__name">{pr.shortTitle}</span>
                    </span>
                    <span className="imp-projet__n">{p.n}</span>
                    <span className="imp-projet__t">{p.t}</span>
                    <span className="imp-projet__d">{p.d}</span>
                    <span className="imp-projet__go">Voir le projet <span className="arrow" aria-hidden="true">→</span></span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4 · Les rapports, en couvertures */}
      <section className="isec isec--cream" id="rapports" aria-labelledby="imp-rapports">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-rapports">Tous nos rapports <em>d'activité</em></h2>
          <ul className="imp-rapports">
            {I.rapports.map((r, i) => (
              <li key={r.year} className="reveal">
                <a className={'imp-rapport imp-rapport--' + couvertures[i % couvertures.length]} href={r.url} target="_blank" rel="noopener noreferrer">
                  <span className="imp-rapport__k">Rapport d'activité</span>
                  <span className="imp-rapport__y">{r.year}</span>
                  <span className="imp-rapport__r">{r.resume}</span>
                  <span className="imp-rapport__dl">Lire le rapport (PDF)<span className="sr-only">, s'ouvre dans un nouvel onglet</span> <span className="arrow" aria-hidden="true">↗</span></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · Prix, labels et marchés : frise par année */}
      <section className="isec isec--white" aria-labelledby="imp-prix">
        <div className="wrap">
          <h2 className="isec__h reveal" id="imp-prix">Nos <em>reconnaissances</em></h2>
          {I.prixPhoto && (
            <figure className="imp-prix__ph reveal">
              <window.Picture src={I.prixPhoto.src} alt={I.prixPhoto.alt} sizes="(max-width: 900px) 100vw, 1100px" />
              <figcaption>{I.prixPhoto.cap}</figcaption>
            </figure>
          )}
          <ol className="imp-prix">
            {Object.keys(annees).sort((a, b) => b - a).map((y) => (
              <li className="imp-prix__an reveal" key={y}>
                <span className="imp-prix__y">{y}</span>
                <ul>
                  {annees[y].map((p, i) => <li key={i}><b>{p.title}</b><span>{p.org}</span></li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SEngager />
    </div>
  );
}

// S'ENGAGER AVEC FESTIN — fin de la page Impact, juste après les preuves
// (RETOURS-AUDIT, question 2 : réponse B). Trois façons d'agir, une action chacune ;
// la pastille y mène par « Soutenir Festin » (#/impact/soutenir).
function SEngager() {
  const D = window.FESTIN_DATA;
  const facons = [
    { t: 'Financer', p: "Votre don ou votre mécénat finance des heures de formation et le suivi des personnes, jusqu'à l'emploi.",
      tags: [['Pour', 'particuliers, entreprises, fondations']],
      actions: [{ label: 'Faire un don', href: D.donation, ext: true, primary: true }, { label: 'Devenir mécène', href: '#/contact/mecenat' }] },
    { t: 'Accueillir', p: 'Accueillez une personne en stage ou recrutez un commis formé par nos parcours.',
      tags: [['Pour', 'restaurants et cuisines']],
      actions: [{ label: 'Recruter et former vos équipes', href: '#/accompagnement/professionnels' }] },
    { t: 'Porter une antenne', p: 'Dans chaque ville, une structure locale porte le dispositif Des Étoiles et des Femmes, avec son centre de formation et ses restaurants partenaires.',
      tags: [['Aujourd\'hui', '13 antennes']],
      actions: [{ label: 'Nous écrire', href: '#/contact/partenariat' }] },
  ];
  return (
    <section className="g-sec g-sec--cream" id="s-engager" aria-labelledby="s-engager-t">
      <div className="wrap">
        <window.GHead id="s-engager-t" title="S'engager" accent="avec Festin." />
        <ul className="g-engage">
          {facons.map((f) => (
            <li className="g-engage__it g-reveal" key={f.t}>
              <h3 className="g-engage__t">{f.t}</h3>
              <p>{f.p}</p>
              <window.ArTags tags={f.tags} />
              <div className="g-engage__act">
                {f.actions.map((a) => (
                  <a key={a.label} className={a.primary ? 'btnb btnb--gold' : 'lnk'} href={a.href} {...(a.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {a.label} <span className="arrow" aria-hidden="true">{a.ext ? '↗' : '→'}</span>{a.ext && <span className="sr-only"> (nouvel onglet)</span>}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- ACADEMIE PAGE ─────────────────────────────────────────────────────
function AcademiePage() {
  // Déploiement du 24/09/2026 : même grammaire que l'accueil (Gabarit.jsx).
  // Mission « Former » ; plus de bandes sombres ni de styles écrits en ligne.
  const root = React.useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  return (
    <div className="gpage" ref={root} data-screen-label="Académie Festin" style={{ '--pc': 'var(--gold-ink)' }}>
      <window.HeroPage tone="teal" kicker="Portée par Estello Formation, certifiée Qualiopi"
        title="L'Académie" accent="Festin"
        proof="Toutes nos formations au même endroit : des parcours d'insertion diplômants pour apprendre un métier et des formations pro pour les équipes de la restauration, portées par le programme Restaure."
        img="images/photo-dressage-dessert.jpg" imgAlt="Un dressage à l'assiette, en cuisine"
        crumb={[{ label: 'Accueil', href: '#/' }, { label: "L'Académie Festin" }]}>
        <div className="g-herocta">
          <window.GLink l={{ to: 'catalogue' }} className="btnb btnb--light">Voir le catalogue <span className="arrow" aria-hidden="true">↓</span></window.GLink>
          <a className="g-herolnk" href="#/contact">Nous écrire <span className="arrow" aria-hidden="true">→</span></a>
        </div>
      </window.HeroPage>

      {/* formations pro remises au catalogue, rattachées visiblement à Restaure (RETOURS-AUDIT §2.4) */}
      <AcaCatalogue tone="white" title="Toutes nos" accent="formations." src="L'Académie Festin est portée par Estello Formation, organisme de formation certifié Qualiopi. Les formations pro pour les équipes en poste sont portées par le programme Restaure." />

      <section className="g-sec g-sec--cream" aria-labelledby="aca-bref-t">
        <div className="wrap g-bref">
          <div className="g-bref__txt">
            <span className="g-tag g-reveal"><span className="g-tag__dot" aria-hidden="true" />Un projet de Festin · Former</span>
            <h2 className="g-h2 g-reveal" id="aca-bref-t">Former sur le terrain, <em>avec un diplôme.</em></h2>
            <p className="g-lede g-reveal">Festin forme sur le terrain depuis 1987. En 2026, elle lance l'Académie Festin, portée par Estello Formation, organisme de formation certifié Qualiopi. Ses parcours tiennent à trois choses : l'exigence de la cuisine, le suivi social des personnes formées, la connaissance du secteur.</p>
            <div className="aca-qualiopi g-reveal">
              <img src={D.brand.qualiopi} alt="Logo Qualiopi" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <span>Certifiée Qualiopi<br /><b>au titre des actions de formation</b></span>
            </div>
          </div>
          <window.Cartes items={[
            { color: 'var(--gold-ink)', title: 'Des diplômes reconnus', desc: "Des formations diplômantes en cuisine et, pour Tournesol, un diplôme de français (DCL)." },
            { color: 'var(--teal)', title: 'Quatre à onze mois', desc: "Le temps d'apprendre un métier, avec un suivi individuel jusqu'à l'emploi. Les formations courtes pour les équipes en poste sont portées par le programme Restaure." },
            { color: 'var(--coral-ink)', title: 'Des stages en restaurant', desc: 'De 155 à 490 heures de stage, dans des restaurants partenaires.' },
          ]} />
        </div>
      </section>

      {/* LE BESOIN — bloc sombre à trois chiffres (rétabli d'après les retours du 25/09/2026) */}
      <section className="aca-besoin on-dark" aria-labelledby="aca-besoin-t">
        <div className="wrap">
          <h2 className="g-h2" id="aca-besoin-t">Un secteur qui <em>recrute</em></h2>
          <p className="g-lede">À Marseille et dans les Bouches-du-Rhône, la restauration cherche des personnes formées. C'est ce qui rend ces parcours utiles, pour celles et ceux qui les suivent comme pour les établissements qui recrutent.</p>
          <ul className="aca-besoin__grid">
            {[
              { n: '77 240', l: 'projets de recrutement dans les Bouches-du-Rhône, tous secteurs' },
              { n: '2 sur 3', l: 'recrutements de cuisiniers jugés difficiles par les employeurs' },
              { n: '500+', l: 'offres actives en restauration sur le seul territoire marseillais' },
            ].map((c) => (
              <li className="aca-besoin__c g-reveal" key={c.n}><b>{c.n}</b><span>{c.l}</span></li>
            ))}
          </ul>
          <p className="aca-besoin__src">Source : enquête Besoins en main-d'œuvre, France Travail, [À COMPLÉTER : année de l'enquête et date du relevé des offres].</p>
        </div>
      </section>

      <window.Portes id="aca-portes" title="À chacun" accent="sa formation." tone="white" portes={[
        { tag: 'Vous cherchez un métier', title: 'Un parcours diplômant, gratuit',
          pts: ['Une formation diplômante en cuisine, avec des stages en restaurant.', 'Un suivi individuel jusqu’à l’emploi.'],
          cta: 'Voir les parcours', href: '#/accompagnement/insertion', img: 'images/photo-tabliers-violets.jpg' },
        { tag: 'Vous êtes du secteur', title: 'Une formation pour vos équipes',
          pts: ['Management juste, prévention des violences sexistes et sexuelles.', 'Des formations portées par le programme Restaure.'],
          cta: 'Former et recruter', href: '#/accompagnement/professionnels', img: 'images/photo-cuisine-action.jpg' },
      ]} />

      <window.BandeDefilante label="Les projets de Festin" items={D.bandeProjets.filter((x) => x.href !== '#/academie')} />
    </div>
  );
}

// Catalogue complet de l'Académie (l'ancienne page « Formations » y est fusionnée :
// une page, un nom). #/formations mène ici, au catalogue.
function AcaCatalogue({ id = 'catalogue', title = 'Toutes nos', accent = 'formations.', tone = 'cream', src, lien, seulInsertion = false }) {
  const D = window.FESTIN_DATA;
  // formations pro : marque Restaure, hors Académie (retours du 01/10/2026)
  // les formations diplômantes d'abord (la page parle d'abord aux personnes), puis les formations pro
  const tri = D.formations.filter((f) => f.cat === 'Insertion').concat(D.formations.filter((f) => f.cat !== 'Insertion'));
  const items = seulInsertion ? tri.filter((f) => f.cat === 'Insertion') : tri;
  const [filtre, setFiltre] = React.useState('all');
  const n = (c) => items.filter((f) => f.cat === c).length;
  const vus = filtre === 'all' ? items : items.filter((f) => f.cat === filtre);
  // un filtre vide n'est jamais proposé (RETOURS-AUDIT §2.4)
  const choix = [['all', 'Toutes', items.length], ['Insertion', 'Formations diplômantes', n('Insertion')], ['Professionnels', 'Formations pro, programme Restaure', n('Professionnels')]].filter(([k, , c]) => k === 'all' || c > 0);
  return (
    <section className={'g-sec g-sec--' + tone} id={id} aria-labelledby={id + '-t'}>
      <div className="wrap">
        <window.GHead id={id + '-t'} split title={title} accent={accent}
          lede={[n('Insertion') && n('Insertion') + ' formations diplômantes pour apprendre un métier', n('Professionnels') && n('Professionnels') + ' formations pro pour les équipes de la restauration, portées par le programme Restaure'].filter(Boolean).join(' et ') + '. Chaque fiche donne la durée, le format, le public et le financement.'} />
        {choix.length > 2 && <div className="filters" role="group" aria-label="Filtrer les formations">
          {choix.map(([k, l, c]) => (
            <button key={k} type="button" className={'filter' + (filtre === k ? ' active' : '')} aria-pressed={filtre === k} onClick={() => setFiltre(k)}>{l} ({c})</button>
          ))}
        </div>}
        <div className="formations__grid">
          {vus.map((f) => <FormationCardLink key={f.id} f={f} />)}
        </div>
        <p className="g-src">{src || "L'Académie Festin est portée par Estello Formation, organisme de formation certifié Qualiopi. Les formations pro sont proposées par le programme Restaure."}{lien && <> <a href="#/academie">L'Académie Festin <span aria-hidden="true">→</span></a></>}</p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTUALITÉS PAGE — toutes les retombées presse
// ─────────────────────────────────────────────────────────────────────────────
// Date d'un article de presse : « nov. 2025 »
function fmtDatePresse(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

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
      <window.HeroPage tone="deep" kicker="Presse et actualités" title="Festin" accent="dans la presse."
        img="images/restaure : formation pro/toast-affiche-restaure.jpg" imgAlt="L'affiche de la rencontre Toast du programme Restaure, à côté de la bannière Restaure" imgPos="50% 12%"
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Presse et actualités' }]}>
        <div className="g-herocta"><window.GLink l={{ to: 'espace-presse' }} className="btnb btnb--gold">Espace presse <span className="arrow" aria-hidden="true">↓</span></window.GLink></div>
      </window.HeroPage>

      {/* temps forts retirés (RETOURS-V3, question 5 : trop de mises à jour) ; l'espace presse passe en tête */}

      {/* Espace presse : famille or pâle (plus d'aplat sombre dans le corps de page) */}
      <section className="isec isec--gold apkit-sec" id="espace-presse" aria-labelledby="actu-kit">
        <div className="wrap apkit">
          <div>
            <h2 className="isec__h" id="actu-kit">Espace <em>presse</em></h2>
            {D.presseResume && <PresseResume texte={D.presseResume} />}
            <p className="isec__lede">Demandes d'interview, visuels, chiffres : écrivez à <a href={'mailto:' + (D.emails || {}).presse}>{(D.emails || {}).presse}</a>. Retrouvez nos rapports d'activité sur la <a href="#/impact">page Impact</a>.</p>
            <div className="apkit__logos">
              <a className="btnb btnb--teal" href="images/logo-festin-teal.png" download>Logo Festin, couleur</a>
              <a className="lnk" href="images/logo-festin-jaune.png" download>Logo Festin, jaune</a>
            </div>
            {/* logos des projets (retours V2 §10) ; l'Académie n'a pas de logo validé */}
            <h3 className="apkit__h">Les logos des projets</h3>
            <ul className="apkit__projets">
              {D.projets.filter((p) => p.logo && p.id !== 'tournesol').map((p) => (
                <li key={p.id}><a href={decodeURI(p.logo)} download>
                  <span className="apkit__pl"><img src={p.logo} alt="" loading="lazy" /></span>
                  <span>{p.shortTitle}</span></a></li>
              ))}
            </ul>
            {window.FESTIN_SHOW_PLACEHOLDERS && <p className="is-placeholder apkit__miss">[À COMPLÉTER : versions haute définition des logos (SVG, ou PNG de 2000 px de large sur fond transparent)]</p>}
          </div>
          <div className="apkit__facts">
            <h3>Chiffres à reprendre</h3>
            <ul>
              <li><b>{S[0].value}</b> personnes accompagnées en 2025</li>
              <li><b>{S[1].value}&nbsp;%</b> de sorties en emploi ou en formation en 2025, tous dispositifs</li>
              <li><b>{S[2].value}</b> territoires d'intervention</li>
              <li><b>1&nbsp;200</b> femmes accompagnées par Des Étoiles et des Femmes depuis 2015</li>
              <li><b>1987</b> : création de Festin</li>
            </ul>
            <p>Source : rapports d'activité Festin. Merci de citer l'année.</p>
          </div>
        </div>
      </section>

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
                  <span className="apitem__meta"><span className="apitem__logo">{(() => { const m = a.source.split(' : ')[0]; const sl = m.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); return (D.presseLogos || []).includes(sl) ? <img src={'images/presse/' + sl + '.png'} alt={m} loading="lazy" /> : <b>{m}</b>; })()}</span>{a.source.includes(' : ') && <span className="apitem__src">{a.source.split(' : ')[1]}</span>}{a.date && <span>{fmtDatePresse(a.date)}</span>}{a.type && <span>{a.type}</span>}</span>
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

    </div>
  );
}
window.HomePage = HomePage;
window.FormationDetailPage = FormationDetailPage;
window.AcaCatalogue = AcaCatalogue;
window.ContactPage = ContactPage;
window.NotFoundPage = NotFoundPage;
window.FormationCardLink = FormationCardLink;
window.ImpactPage = ImpactPage;
window.AcademiePage = AcademiePage;
window.ActualitesPage = ActualitesPage;
