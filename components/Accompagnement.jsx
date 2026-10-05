// Accompagnement.jsx — pages « Apprendre un métier » (#/accompagnement/insertion)
// et « Acteurs du secteur » (#/accompagnement/professionnels).
// Déploiement du 24/09/2026 (AUDIT-DEPLOIEMENT.md) : même grammaire que
// l'accueil et les pages projet (Gabarit.jsx). Une page par public ; les
// projets y sont rangés par mission ; les suites d'étapes passent par la
// frise partagée ; plus d'aplats colorés ni de chiffres clés en doublon.
(function () {
const { useRef } = React;

// Hero commun des pages intérieures, avec deux actions
function AccHero({ tone, kicker, title, em, lede, img, imgAlt, crumb, cta, lien }) {
  return (
    <window.HeroPage tone={tone} kicker={kicker} title={title} accent={em} proof={lede} img={img} imgAlt={imgAlt}
      crumb={[{ label: 'Accueil', href: '#/' }, { label: crumb }]}>
      <div className="g-herocta">
        <window.GLink l={cta} className={'btnb ' + (tone === 'gold' ? 'btnb--teal' : 'btnb--gold')}>{cta.label} <span className="arrow" aria-hidden="true">→</span></window.GLink>
        {lien && <window.GLink l={lien} className="g-herolnk">{lien.label} <span className="arrow" aria-hidden="true">→</span></window.GLink>}
      </div>
    </window.HeroPage>
  );
}

// =====================================================================
// APPRENDRE UN MÉTIER (personnes qui cherchent un métier)
// =====================================================================
// Galerie automatique (retours du 02/10/2026) : fondu toutes les 4 s, bouton pause,
// arrêtée en mouvement réduit (première image seule).
function GalerieAuto({ images }) {
  const [i, setI] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const rm = window.FESTIN_RM && window.FESTIN_RM();
  React.useEffect(() => {
    if (pause || rm) return;
    const t = setInterval(() => setI((x) => (x + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [pause, rm, images.length]);
  return (
    <figure className="g-photo g-galauto g-reveal" aria-roledescription="carrousel" aria-label="Photos de nos formations">
      {images.map((im, k) => (
        <div key={im.src} className={'g-galauto__it' + (k === i ? ' is-on' : '')} aria-hidden={k !== i}>
          <window.Picture src={im.src} alt={im.alt} sizes="(max-width: 900px) 100vw, 44vw" />
        </div>
      ))}
      {!rm && <button type="button" className="g-galauto__p" onClick={() => setPause(!pause)} aria-pressed={pause}>{pause ? '▶ Lecture' : '❚❚ Pause'}</button>}
      <span className="g-galauto__dots" aria-hidden="true">{images.map((im, k) => <i key={im.src} className={k === i ? 'is-on' : ''} />)}</span>
    </figure>
  );
}

function AccompagnementInsertionPage() {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  return (
    <div className="gpage acc" ref={root} data-screen-label="Accompagnement — Insertion">
      <AccHero tone="gold" crumb="Insertion" kicker="Vous cherchez un métier"
        title="Apprendre un métier de cuisine," em="gratuitement."
        lede="Vous préparez un diplôme reconnu, vous faites vos stages en restaurant et une personne de l'équipe vous suit jusqu'à l'emploi."
        img="images/photo-tabliers-violets.jpg" imgAlt="Des apprenties du dispositif Des Étoiles et des Femmes en cuisine"
        cta={{ label: 'Vérifier mon éligibilité', href: '#/contact/se-former' }} lien={{ label: 'Quel parcours, pour qui ?', to: 'parcours-choix' }} />

      {/* LES PARCOURS — une seule section pour tous les publics (retours du 30/09/2026) :
          pour qui, ce que c'est, comment entrer, et le site du projet. Pas de dates : chaque
          antenne a son calendrier, donné sur le site du projet. */}
      <section className="g-sec g-sec--white" id="parcours-choix" aria-labelledby="ins-par-t">
        <div className="wrap">
          <window.GHead id="ins-par-t" split title="Quel parcours," accent="pour qui ?"
            lede="Vous cherchez pour vous-même, ou vous accompagnez quelqu'un : voici à qui s'adresse chaque parcours et comment y entrer." />
          <ul className="or-cards">
            {D.orienter.map((o) => {
              const p = D.projets.find((x) => x.id === o.id) || {};
              const c = (D.home.missions.items.flatMap((m) => m.projets).find((x) => x.id === o.id)) || {};
              return (
                <li className="or-card g-reveal" key={o.id}>
                  <div className="or-card__img">
                    <window.Picture src={c.img || (D.projetPages[o.id] || {}).heroImg} alt="" sizes="(max-width: 900px) 100vw, 44vw" />
                    {p.logo && <span className="or-card__logo"><img src={encodeURI(decodeURI(p.logo))} alt="" loading="lazy" /></span>}
                  </div>
                  <div className="or-card__b">
                    <h3 className="or-card__t">{p.shortTitle}</h3>
                    <dl>
                      <div><dt>Pour qui</dt><dd>{o.pour}</dd></div>
                      <div><dt>Le parcours</dt><dd>{o.quoi}</dd></div>
                      <div><dt>Pour entrer</dt><dd>{o.conditions || (window.FESTIN_SHOW_PLACEHOLDERS ? <span className="is-placeholder or-miss">[À COMPLÉTER : conditions d'entrée]</span> : "Le site du projet donne les conditions d'entrée.")}</dd></div>
                    </dl>
                    <div className="or-card__cta">
                      {p.siteUrl && <a className="btnb btnb--teal" href={p.siteUrl} target="_blank" rel="noopener noreferrer">Plus d'informations <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (site du projet, nouvel onglet)</span></a>}
                      {/* Tournesol est une formation : sa fiche, pas une page projet (RETOURS-AUDIT, question 4) */}
                      {o.id === 'tournesol'
                        ? <a className="lnk" href="#/formations/tournesol">La fiche de la formation <span className="arrow" aria-hidden="true">→</span></a>
                        : <a className="lnk" href={'#/projets/' + o.id}>La page du projet <span className="arrow" aria-hidden="true">→</span></a>}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="g-src">Les Beaux Mets, le restaurant de la prison des Baumettes, ne reçoit pas de candidatures : on y réserve une table et les restaurants peuvent y recruter un ancien commis. <a href="#/projets/les-beaux-mets">Découvrir Les Beaux Mets →</a></p>
        </div>
      </section>

      <section className="g-sec g-sec--cream" aria-labelledby="ins-bref-t">
        <div className="wrap g-bref">
          <div className="g-bref__txt">
            <h2 className="g-h2 g-reveal" id="ins-bref-t">Un diplôme et quelqu'un <em>à vos côtés.</em></h2>
            <p className="g-lede g-reveal">Chaque parcours prépare un diplôme reconnu et comprend des stages en restaurant. Pendant toute la formation, une personne de l'équipe vous aide pour ce qui peut vous empêcher d'avancer : transport, garde d'enfants, logement, cours de français.</p>
            <window.Preuves lignes={[
              'Tous nos parcours sont <b>gratuits</b>*. Selon votre situation, vous pouvez percevoir une indemnité ou une rémunération.',
            ]} source="* La formation est prise en charge par France Travail et nos partenaires publics." />
          </div>
          <GalerieAuto images={[
            { src: 'images/photo-apprenante-plats.jpg', alt: 'Une apprentie présente ses assiettes en fin de service' },
            { src: 'images/photo-cuisine-formation.jpg', alt: 'Séance de formation en cuisine' },
            { src: 'images/photo-applaudissements.jpg', alt: 'Une promotion applaudit en fin de formation' },
            { src: 'images/photo-tabliers-violets.jpg', alt: 'Des apprenties du dispositif Des Étoiles et des Femmes en tablier' },
            { src: 'images/photo-patisserie.jpg', alt: 'Atelier pâtisserie pendant la formation' },
          ]} />
        </div>
      </section>

      {/* frise du calendrier retirée (RETOURS-AUDIT §2.10) : chaque parcours a ses dates, données par son site */}
      <window.Faq id="faq-ins" title="Vos" accent="questions" items={[
        { q: "La formation est-elle payante ?", a: "Non. Tous nos parcours sont gratuits. Selon votre situation, vous pouvez percevoir une indemnité ou une rémunération pendant la formation." },
        { q: "Quand commencent les prochaines sessions ?", a: "Chaque antenne a son propre calendrier. Le site de chaque projet donne les dates des prochaines sessions." },
        { q: "Quel parcours est fait pour moi ?", a: "Des Étoiles et des Femmes accueille des femmes. Tournesol accueille des personnes réfugiées ou primo-arrivantes. La Table de Cana emploie des salariés en insertion à Marseille. Écrivez-nous : nous vous orientons." },
        { q: "Qui m'aide pendant la formation ?", a: "Une personne de l'équipe vous suit du premier entretien jusqu'à l'emploi : transport, garde d'enfants, logement, cours de français, recherche de poste." },
        { q: "Et après la formation ?", a: "Nous préparons avec vous la recherche de poste et nous vous mettons en relation avec des restaurants qui recrutent." },
      ]} />

      <window.Appel id="ins-appel" title="Vérifier si le parcours" accent="est fait pour vous."
        text="Écrivez-nous : nous vérifions ensemble votre éligibilité, puis nous vous invitons à une réunion d'information."
        cta={{ label: 'Vérifier mon éligibilité', href: '#/contact/se-former' }} />
    </div>
  );
}

// =====================================================================
// ACTEURS DU SECTEUR (restaurateurs, traiteurs, établissements…)
// =====================================================================
// =====================================================================
// PROFESSIONNELS (maquette du 30/09/2026, branche maquette-pros)
// Vocabulaire fini d'archétypes (voir ALLER-PLUS-LOIN.md) ; deux sections
// voisines ne partagent jamais le même : plein cadre · bloc encarté à
// accordéon · bande défilante · lignes typées · carte flottante · titre
// en chevauchement.
// Signalétique : les numéros sont réservés aux étapes dans un ordre imposé
// (POEI) ; les options au choix n'en portent jamais.
// =====================================================================
function AccompagnementProsPage() {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  const F = (id) => D.formations.find((f) => f.id === id) || {};
  const go = (id) => (e) => { e.preventDefault(); window.festinScrollTo(id); };
  return (
    <div className="gpage ar-page" ref={root} data-screen-label="Professionnels">

      {/* 1 · PLEIN CADRE — photo pleine largeur, texte en surimpression (fond sombre) */}
      <header className="ar-hero on-dark">
        <window.Picture className="ar-hero__img" src="images/beauxmets-images/LBM_cdutrey_071122-7264.jpg" alt="" loading="eager" fetchPriority="high" />
        <div className="wrap ar-hero__in">
          <nav className="hp__crumb ar-hero__crumb" aria-label="Fil d'Ariane"><a href="#/">Accueil</a> <span aria-hidden="true">/</span> <span aria-current="page">Professionnels</span></nav>
          <p className="ar-eyebrow">Professionnels de la restauration</p>
          <h1 className="ar-hero__t">Former et recruter, <em>avec Festin.</em></h1>
          <p className="ar-hero__p">Des formations pour vos équipes, des personnes formées pour votre brigade.</p>
          <div className="ar-hero__cta">
            <a className="btnb btnb--gold" href="#pros-former" onClick={go('pros-former')}>Former vos équipes <span className="arrow" aria-hidden="true">↓</span></a>
            <a className="btnb btnb--light" href="#pros-recruter" onClick={go('pros-recruter')}>Recruter <span className="arrow" aria-hidden="true">↓</span></a>
          </div>
        </div>
      </header>

      {/* 2 · BLOC ENCARTÉ À ACCORDÉON */}
      <section className="ar-sec ar-sec--white" id="pros-former" aria-labelledby="pros-former-t">
        <div className="wrap">
          <window.BlocEncarte id="pros-former-t" title="Former" accent="vos équipes."
            lede="Deux formations courtes, en présentiel, dans vos murs ou avec d'autres établissements."
            tags={[['Proposées par', 'le programme Restaure'], ['Format', 'Inter ou intra']]}>
            <ul className="ar-fcards">
              {[
                { f: F('vss'), a: 'Reconnaître les violences en cuisine et en salle, les prévenir, réagir à un signalement.', tags: [['Durée', '3 h ou 1 jour'], ['Pour', "Toute l'équipe"]] },
                { f: F('management'), a: "Recruter plus largement, garder son équipe, l'encadrer sans violence.", tags: [['Durée', '1 jour et 2 demi-journées'], ['Pour', 'Chefs, managers, RH']] },
              ].map(({ f, a, tags }) => (
                <li className="ar-fcard" key={f.id}>
                  <a href={'#/formations/' + f.id}>
                    <span className="ar-fcard__img"><window.Picture src={f.img} alt="" sizes="(max-width: 720px) 100vw, 28vw" /></span>
                    <span className="ar-fcard__b">
                      <h3 className="ar-fcard__t">{f.title}</h3>
                      <span className="ar-fcard__p">{a}</span>
                      <window.ArTags tags={tags} />
                      <span className="ar-fcard__lnk">Voir le programme <span className="arrow" aria-hidden="true">→</span></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a className="btnb btnb--gold ar-bloc__cta" href="#/contact/former">Demander une formation <span className="arrow" aria-hidden="true">→</span></a>
          </window.BlocEncarte>
        </div>
      </section>

      {/* 3 · BANDE DÉFILANTE — l'écosystème d'où viennent les personnes */}
      <window.BandeDefilante label="Les projets de Festin" items={[
        { label: 'le programme Restaure', href: '#/projets/restaure' },
        { label: 'Des Étoiles et des Femmes', href: '#/projets/des-etoiles-et-des-femmes' },
        { label: 'Les Beaux Mets', href: '#/projets/les-beaux-mets' },
        { label: 'La Table de Cana Marseille', href: '#/projets/la-table-de-cana' },
        { label: "l'Académie Festin", href: '#/academie' },
      ]} />

      {/* 4 · LIGNES TYPÉES — options au choix, sans numéros ; la POEI se déplie sous sa ligne */}
      <section className="ar-sec ar-sec--cream" id="pros-recruter" aria-labelledby="pros-rec-t">
        <div className="wrap ar-split">
          <div className="ar-split__head">
            <h2 className="ar-h2" id="pros-rec-t">Recruter <em>une personne formée.</em></h2>
            <p className="ar-split__p">Trois possibilités.</p>
          </div>
          <window.LignesTypees id="pros-rec" items={[
            { tone: 'teal', title: 'Accueillir un stagiaire',
              text: "Une personne formée par Des Étoiles et des Femmes ou Tournesol rejoint votre brigade, suivie en binôme par un membre de votre équipe.",
              tags: [['Moment', 'Pendant sa formation'], ['Festin', 'En appui tout le stage']],
              link: { label: 'Proposer un stage', href: '#/contact/recruter' } },
            { tone: 'gold', title: "Le Book de l'emploi",
              text: 'Des commis diplômés de nos parcours, prêts à prendre leur poste.',
              tags: [['Envoi', 'Sous 48 h ouvrées']],
              link: { label: 'Recevoir le Book', href: '#/contact/recruter' } },
            { tone: 'coral', title: "La préparation opérationnelle à l'emploi (POEI)",
              text: 'La personne se forme dans votre cuisine avant son embauche. Festin vous accompagne pour finaliser les démarches administratives.',
              tags: [['Financement', 'France Travail'], ['Contrat', 'CDD de 4 mois minimum']],
              etapes: [
                ['Rencontrer', "Nous présentons des candidats. Des journées d'immersion valident le profil."],
                ['Former', 'Deux stages dans votre établissement : deux semaines, puis trois.'],
                ['Recruter', "Si l'expérience est concluante : un CDD de quatre mois minimum."],
              ],
              etapesLien: { label: 'Préparer une embauche', href: '#/contact/recruter' } },
          ]} />
        </div>
      </section>

      {/* 5 · CARTE FLOTTANTE — un témoignage sur fond sombre */}
      <window.CarteFlottante label="Témoignage d'un chef"
        media={<window.Picture src="images/pros/davin-sami.jpg" alt="Le chef Davin et Sami en cuisine, à l'Intercontinental Marseille" sizes="(max-width: 720px) 100vw, 420px" />}
        quote="Sami s'est très vite intégré à l'équipe."
        who="Chef Davin, Intercontinental Marseille, a recruté un commis formé aux Beaux Mets."
        logo={{ src: "images/partners/intercontinental.png", alt: "InterContinental Marseille" }}
        cta={{ label: 'Découvrir Les Beaux Mets', href: '#/projets/les-beaux-mets' }} />

      {/* 6 · TITRE EN CHEVAUCHEMENT — fin de page */}
      <window.TitreChevauche id="pros-eng-t" mot="S'engager" title="S'engager avec Festin"
        text="Soutenir un projet comme mécène, ou participer au prochain Grand Festin."
        link={{ label: 'Devenir partenaire Festin', href: '#/contact/partenariat' }} />
    </div>
  );
}

window.AccompagnementInsertionPage = AccompagnementInsertionPage;
window.AccompagnementProsPage = AccompagnementProsPage;
})();
