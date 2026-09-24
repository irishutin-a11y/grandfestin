// ProjetPage.jsx — gabarit unique des cinq pages projet (24/09/2026).
// Remplace ProjetDef, ProjetLBM, ProjetTableDeCana, ProjetRestaure, ProjetTournesol.
// Une page projet est une porte d'entrée vers le site du projet : elle se lit
// seule, sans connaître Festin. Ordre fixe (AUDIT-DEPLOIEMENT.md §4) :
// hero · en bref (texte court, 3 preuves, vidéo ou photo) · parcours (frise) ·
// un bloc propre au projet au plus · témoignages · portes · presse · galerie ·
// les projets de Festin par mission.
// Contenus : FESTIN_DATA.projets (faits) + FESTIN_DATA.projetPages (mise en page).
(function () {
const { useRef } = React;

// Couleur propre au projet : en touches discrètes seulement (arbitrage A)
const COULEUR = {
  'des-etoiles-et-des-femmes': '#E4572E', 'les-beaux-mets': '#A3543D', 'la-table-de-cana': '#7A2E3A',
  'restaure': '#5B6E1E', 'tournesol': '#C1791A',
};
// Teinte du hero selon la mission : Former → or, Accompagner → teal, Changer → teal profond
const TON = { former: 'gold', accompagner: 'teal', changer: 'deep' };

function slug(v) { return v.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

function BlocReseau({ p }) {
  const D = window.FESTIN_DATA;
  return (
    <section className="g-sec g-sec--cream" aria-labelledby="reseau-t">
      <div className="wrap">
        <window.GHead id="reseau-t" split title="Où se former," accent="en France."
          lede="Le programme est né à Marseille en 2015. Dans chaque ville, une structure locale le porte, avec son centre de formation et ses restaurants partenaires." />
        {/* Liste à survol dès que les photos d'antenne existent ; sans photo, une grille compacte */}
        {(D.antennesPhotos || []).length > 0 ? (
          <div className="g-reveal">
            <window.HoverImageList label="Les antennes du réseau" items={p.antennes.map((a) => ({
              title: a.ville, meta: a.porteur, year: a.annee,
              img: (D.antennesPhotos || []).includes(slug(a.ville)) ? 'images/antennes/' + slug(a.ville) + '.jpg' : null,
              alt: 'Antenne de ' + a.ville,
            }))} />
          </div>
        ) : (
          <ol className="g-antennes" aria-label="Les antennes du réseau, par année d'ouverture">
            {p.antennes.map((a) => (
              <li key={a.ville} className="g-reveal"><span className="g-antennes__y">{a.annee}</span><b>{a.ville}</b><span>{a.porteur}</span></li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

// Des Étoiles et des Femmes : soutenir une promotion, avec la sphère des chefs du réseau
function BlocChefs({ p, cfg }) {
  const D = window.FESTIN_DATA;
  const chefs = [{ name: 'Julia Sedefdjian', place: 'Marraine nationale · Baieta, Paris' }, ...D.about.chefs];
  const photos = ['images/images-def/chaudbouillon-045.jpg', 'images/images-def/HOTELERIE-097.jpg',
    'images/images-def/FESTIN-DEF-RPARTENAIRS_namarante_02072024_00022.jpg', 'images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg',
    'images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-40.jpg', 'images/photo-tabliers-violets.jpg',
    'images/photo-cuisine-action.jpg', 'images/photo-applaudissements.jpg'];
  return (
    <section className="g-sec g-sec--gold" aria-labelledby="chefs-t">
      <div className="wrap g-chefs">
        <div className="g-chefs__txt g-reveal">
          <h2 className="g-h2" id="chefs-t">{cfg.soutien.title} <em>{cfg.soutien.accent}</em></h2>
          <p className="g-lede">{cfg.soutien.text}</p>
          <p className="g-chefs__note">{chefs.length} chefs forment avec le réseau, dont la marraine nationale, Julia Sedefdjian. Faites tourner la sphère pour les voir.</p>
          <div className="g-actions">
            <a className="btnb btnb--gold" href={D.donation} target="_blank" rel="noopener noreferrer">Faire un don <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>
            <a className="lnk" href="mailto:partenariat@grandfestin.com">Devenir mécène <span className="arrow" aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="g-chefs__sphere">
          <window.ImgSphere size={500} label="Les chefs du réseau" images={chefs.map((c) => ({ src: c.photo, name: c.name, title: c.name, text: c.place }))
            .concat(photos.map((src) => ({ src, alt: '', title: p.shortTitle, text: 'En cuisine avec le réseau.' })))} />
        </div>
      </div>
    </section>
  );
}

function BlocGenese({ cfg }) {
  const g = cfg.genese;
  return (
    <section className="g-sec g-sec--cream" aria-labelledby="genese-t">
      <div className="wrap">
        <window.GHead id="genese-t" split title={g.title} accent={g.accent} lede={g.text} />
      </div>
    </section>
  );
}

function BlocVerbatims() {
  const V = window.FESTIN_DATA.verbatimsViolences || [];
  if (!V.length) return null;
  return (
    <section className="g-sec g-sec--cream" aria-labelledby="verbatims-t">
      <div className="wrap">
        <window.GHead id="verbatims-t" split title="Ce que le programme" accent="veut faire reculer."
          lede="Des professionnels de la restauration ont confié ces paroles, rendues anonymes. Certains mots sont durs." />
        <div className="g-verb">
          {V.map((v, i) => <blockquote className="g-verb__q g-reveal" key={i}><p>« {v} »</p></blockquote>)}
        </div>
        <p className="g-src">Vous vivez ou vous voyez ces situations ? La formation « Prévention des violences sexistes et sexuelles » et le violentomètre du programme sont des points de départ. <a href="#/formations/vss">Voir la formation →</a></p>
      </div>
    </section>
  );
}

function ProjetPage({ id }) {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  const p = D.projets.find((x) => x.id === id);
  const cfg = (D.projetPages || {})[id];
  if (!p || !cfg) return <window.NotFoundPage />;
  const m = window.missionDe(id);
  const missionLabel = m ? m.title + (m.titleAccent ? ' ' + m.titleAccent : '') : '';
  const tone = (m && TON[m.key]) || 'teal';
  const byTab = (t) => (p.parcours || []).find((x) => x.tab === t) || {};
  const steps = cfg.frise ? cfg.frise.steps.map((s) => (s.from ? { ...byTab(s.from), ...s } : s)) : [];
  const rail = cfg.frise && cfg.frise.rail ? { ...byTab(cfg.frise.rail.from), tab: cfg.frise.rail.tab } : null;
  const temoins = (p.temoignages || []).filter((t) => !t.placeholder && (t.citation || t.extrait)).map((t) => ({
    name: t.prenom, meta: t.role || [t.ville, t.promo].filter(Boolean).join(' · '), accroche: t.accroche,
    quote: t.extrait || t.citation, photo: t.photo, objPos: t.objPos, bw: t.bw,
  }));
  const galerie = (cfg.galerie || []).concat(cfg.galerieRff && p.galerie ? p.galerie.photos : []);
  const blocs = cfg.blocs || [];

  return (
    <div className={'gpage gprojet gprojet--' + id} ref={root} style={{ '--pc': COULEUR[id] || 'var(--teal)' }} data-screen-label={'Projet — ' + p.shortTitle}>

      <window.HeroPage tone={tone} kicker={cfg.kicker} title={p.title} accent={p.accent} proof={p.projetPhrase}
        img={cfg.heroImg} imgAlt={cfg.heroAlt} logo={p.logo} logoAlt={'Logo ' + p.shortTitle} note={cfg.heroCredit}
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Nos projets', href: '#/projets' }, { label: p.shortTitle }]}>
        <div className="g-herocta">
          <window.GLink l={cfg.heroCta} className={'btnb ' + (tone === 'gold' ? 'btnb--teal' : 'btnb--gold')}>{cfg.heroCta.label} <span className="arrow" aria-hidden="true">{cfg.heroCta.external ? '↗' : '→'}</span></window.GLink>
          {cfg.heroLien && <window.GLink l={cfg.heroLien} className="g-herolnk">{cfg.heroLien.label} <span className="arrow" aria-hidden="true">{cfg.heroLien.external ? '↗' : '→'}</span></window.GLink>}
        </div>
      </window.HeroPage>

      {/* EN BREF — ce que fait le projet, trois preuves, la vidéo */}
      <section className="g-sec g-sec--white" aria-labelledby="bref-t">
        <div className="wrap g-bref">
          <div className="g-bref__txt">
            <span className="g-tag g-reveal"><span className="g-tag__dot" aria-hidden="true" />Un projet de l'association Festin · {missionLabel}</span>
            <h2 className="g-h2 g-reveal" id="bref-t">{cfg.bref.title} <em>{cfg.bref.accent}</em></h2>
            <p className="g-lede g-reveal">{cfg.bref.text}</p>
            <window.Preuves lignes={cfg.preuves} source={cfg.source} />
            <a className="lnk g-bref__site g-reveal" href={p.siteUrl} target="_blank" rel="noopener noreferrer">Le site du projet : {p.siteName} <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>
            <window.PresseLigne filtres={p.presseFilter || []} />
          </div>
          <div className="g-bref__media g-reveal">
            {cfg.video ? <window.GVideo v={cfg.video} label={p.shortTitle} />
              : cfg.photo ? (
                <figure className="g-photo"><window.Picture src={cfg.photo.src} alt={cfg.photo.alt} sizes="(max-width: 900px) 100vw, 44vw" />{cfg.photo.credit && <figcaption className="g-cap">{cfg.photo.credit}</figcaption>}</figure>
              ) : null}
          </div>
        </div>
      </section>

      {/* PARCOURS — frise partagée avec l'accueil */}
      {steps.length > 0 && (
        <window.Frise id="parcours" tone="tint" title={cfg.frise.title} accent={cfg.frise.accent} lede={cfg.frise.lede}
          steps={steps} rail={rail} />
      )}

      {blocs.includes('reseau') && p.antennes && <BlocReseau p={p} />}
      {blocs.includes('genese') && cfg.genese && <BlocGenese cfg={cfg} />}
      {blocs.includes('verbatims') && <BlocVerbatims />}

      {/* TÉMOIGNAGES — une grande citation à la fois */}
      {temoins.length > 0 && (
        <section className="g-sec g-sec--white" aria-labelledby="temoins-t">
          <div className="wrap">
            <window.GHead id="temoins-t" title={cfg.temoignages.title} accent={cfg.temoignages.accent} />
            <window.TestiCarousel label={'Témoignages, ' + p.shortTitle} items={temoins} />
          </div>
        </section>
      )}

      {blocs.includes('chefs') && <BlocChefs p={p} cfg={cfg} />}

      <window.Portes portes={cfg.portes} tone="cream"
        agir={blocs.includes('chefs') ? null : { title: 'Soutenir', accent: p.shortTitle, text: cfg.soutien && cfg.soutien.text, don: cfg.soutien && cfg.soutien.don, site: { href: p.siteUrl, label: 'Le site du projet' } }} />

      <window.Galerie images={galerie} label={'Galerie photo, ' + p.shortTitle} />

      <window.MissionsNav currentId={id} title="Les autres projets" accent="de Festin" compact />
    </div>
  );
}

window.ProjetPage = ProjetPage;
})();
