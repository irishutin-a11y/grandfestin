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
// Teinte de chaque parcours (lignes typées) et étapes dépliables, reprises de FESTIN_DATA.projets[].parcours
const TEINTE_PARCOURS = { 'des-etoiles-et-des-femmes': 'coral', tournesol: 'gold', 'la-table-de-cana': 'teal' };
const ETAPES_PARCOURS = {
  'des-etoiles-et-des-femmes': [
    ['Pratiquer', 'Des stages en brigade, dans des restaurants partenaires.'],
    ['Travailler', 'Préparation aux entretiens, mise en relation avec les restaurants, suivi après la formation.'],
  ],
  tournesol: [
    ['Le français', 'Des cours de français appliqués à la cuisine.'],
    ['La technique', 'La formation de commis de cuisine, avec AFC Groupe.'],
    ['Le stage', 'Un stage chez Compass Group, rémunéré par France Travail.'],
  ],
};

function AccompagnementInsertionPage() {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  const calendrier = [
    { when: 'Septembre', tab: 'Candidater', title: 'Entretiens et atelier de préparation',
      text: "Un entretien, puis un atelier qui vous prépare à rencontrer les restaurants.",
      img: 'images/photo-micro-temoignage.jpg' },
    { when: 'Octobre', tab: 'Rencontrer', title: 'Une immersion en restaurant',
      text: "Une immersion courte valide votre projet.",
      img: 'images/images-def/HOTELERIE-035.jpg' },
    { when: 'Novembre et décembre', tab: 'Commencer', title: 'Entrée en formation',
      text: 'La promotion démarre, le suivi individuel commence.',
      img: 'images/photo-patisserie.jpg' },
    { when: 'Janvier à mars', tab: 'Se former', title: 'Cours, stages et suivi',
      text: 'Des cours, des stages en brigade, des rendez-vous de suivi.',
      img: 'images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-24.jpg' },
    { when: 'Avril', tab: 'Le diplôme', title: 'Examens et fin de formation',
      text: 'Le CAP cuisine ou le titre de commis (et le DCL pour Tournesol).',
      stat: '91 %', statL: 'de réussite aux diplômes en 2025, Des Étoiles et des Femmes', img: 'images/photo-applaudissements.jpg' },
    { when: 'Mai et juin', tab: 'Travailler', title: "La recherche de poste",
      text: 'Nous vous présentons aux restaurants qui recrutent.',
      img: 'images/photo-service-restaurant.jpg' },
  ];
  return (
    <div className="gpage acc" ref={root} data-screen-label="Accompagnement — Insertion">
      <AccHero tone="gold" crumb="Insertion" kicker="Vous cherchez un métier"
        title="Apprendre un métier de cuisine," em="gratuitement."
        lede="Vous préparez un diplôme reconnu, vous faites vos stages en restaurant, et une personne de l'équipe vous suit jusqu'à l'emploi."
        img="images/photo-tabliers-violets.jpg" imgAlt="Des apprenties de Des Étoiles et des Femmes en cuisine"
        cta={{ label: 'Vérifier mon éligibilité', href: '#/contact' }} lien={{ label: 'Quel parcours, pour qui ?', to: 'parcours-choix' }} />

      {/* LES PARCOURS — lignes typées (options au choix, sans numéros) ; le parcours
          se déplie sous chaque ligne (étapes numérotées : un ordre imposé). */}
      <section className="g-sec g-sec--cream" id="parcours-choix" aria-labelledby="ins-par-t">
        <div className="wrap ar-split">
          <div className="ar-split__head">
            <h2 className="ar-h2" id="ins-par-t">Quel parcours, <em>pour qui ?</em></h2>
            <p className="ar-split__p">Trois parcours, au choix.</p>
          </div>
          <div>
            <window.LignesTypees id="ins-par" items={D.orienter.map((o) => {
              const p = D.projets.find((x) => x.id === o.id) || {};
              return {
                tone: TEINTE_PARCOURS[o.id] || 'teal', title: p.shortTitle, text: o.quoi,
                tags: [['Pour qui', o.pour], ['Pour entrer', o.conditions || (window.FESTIN_SHOW_PLACEHOLDERS ? "[À COMPLÉTER : conditions d'entrée]" : 'Sur le site du projet')]],
                links: [p.siteUrl && { label: "Plus d'informations", href: p.siteUrl }, { label: 'La page du projet', href: '#/projets/' + o.id }].filter(Boolean),
                etapes: ETAPES_PARCOURS[o.id],
              };
            })} />
            <p className="g-src">Les Beaux Mets, restaurant de la prison des Baumettes, ne reçoit pas de candidatures. <a href="#/projets/les-beaux-mets">Découvrir Les Beaux Mets →</a></p>
          </div>
        </div>
      </section>

      {/* LE CALENDRIER — frise en bloc encarté */}
      <window.Frise id="calendrier" tone="tint" encart title="Une promotion," accent="mois par mois."
        lede="Une année type pour Des Étoiles et des Femmes et Tournesol. Chaque antenne a son calendrier : le site du projet donne les dates."
        steps={calendrier} />

      {/* EN BREF — split : le diplôme, l'accompagnement, deux preuves */}
      <section className="g-sec g-sec--cream" aria-labelledby="ins-bref-t">
        <div className="wrap g-bref">
          <div className="g-bref__txt">
            <h2 className="g-h2 g-reveal" id="ins-bref-t">Un diplôme, et quelqu'un <em>à vos côtés.</em></h2>
            <p className="g-lede g-reveal">Une personne de l'équipe vous suit jusqu'à l'emploi : transport, garde d'enfants, logement, cours de français.</p>
            <window.Preuves lignes={[
              'Tous nos parcours sont <b>gratuits</b>. Selon votre situation, vous pouvez percevoir une indemnité ou une rémunération.',
              'En 2025, <b>83 %</b> des personnes que nous avons accompagnées sont sorties en emploi ou en formation.',
            ]} source="Source : rapport d'activité Festin 2025, tous projets confondus." />
          </div>
          <figure className="g-photo g-reveal"><window.Picture src="images/photo-apprenante-plats.jpg" alt="Une apprentie présente ses assiettes en fin de service" sizes="(max-width: 900px) 100vw, 44vw" /></figure>
        </div>
      </section>

      <window.Appel id="ins-appel" title="Vérifier si le parcours" accent="est fait pour vous."
        text="Écrivez-nous : nous vérifions ensemble votre éligibilité."
        cta={{ label: 'Vérifier mon éligibilité', href: '#/contact' }} />
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
            tags={[['Portées par', 'le programme Restaure'], ['Catalogue', 'Académie Festin, certifiée Qualiopi'], ['Financement', 'OPCO possible']]}>
            <window.Accordeon id="pros-f" items={[
              { q: F('vss').title, a: "Reconnaître les violences en cuisine et en salle, les prévenir, réagir à un signalement.",
                tags: [['Durée', '3 h ou 1 jour'], ['Pour', "Toute l'équipe"]], link: { label: 'La fiche de la formation', href: '#/formations/vss' } },
              { q: F('management').title, a: "Recruter plus largement, garder son équipe, l'encadrer sans violence.",
                tags: [['Durée', '1 jour et 2 demi-journées'], ['Pour', 'Chefs, managers, RH']], link: { label: 'La fiche de la formation', href: '#/formations/management' } },
            ]} />
            <a className="btnb btnb--gold ar-bloc__cta" href="#/contact">Demander une formation <span className="arrow" aria-hidden="true">→</span></a>
          </window.BlocEncarte>
        </div>
      </section>

      {/* 3 · BANDE DÉFILANTE — l'écosystème d'où viennent les personnes */}
      <window.BandeDefilante label="Les projets de Festin" items={['Des Étoiles et des Femmes', 'Tournesol', 'La Table de Cana', 'Les Beaux Mets', 'le programme Restaure', "l'Académie Festin"]} />

      {/* 4 · LIGNES TYPÉES — options au choix, sans numéros ; la POEI se déplie sous sa ligne */}
      <section className="ar-sec ar-sec--cream" id="pros-recruter" aria-labelledby="pros-rec-t">
        <div className="wrap ar-split">
          <div className="ar-split__head">
            <h2 className="ar-h2" id="pros-rec-t">Recruter <em>une personne formée.</em></h2>
            <p className="ar-split__p">Trois possibilités, au choix.</p>
          </div>
          <window.LignesTypees id="pros-rec" items={[
            { tone: 'teal', title: 'Accueillir un stagiaire',
              text: "Une personne formée par Des Étoiles et des Femmes ou Tournesol rejoint votre brigade, suivie en binôme par un membre de votre équipe.",
              tags: [['Moment', 'Pendant sa formation'], ['Festin', 'En appui tout le stage']],
              link: { label: 'Proposer un stage', href: '#/contact' } },
            { tone: 'gold', title: "Le Book de l'emploi",
              text: 'Les personnes diplômées de nos parcours qui cherchent un poste.',
              tags: [['Envoi', 'Sous 48 h ouvrées'], ['Format', 'Sur demande']],
              link: { label: 'Recevoir le Book', href: '#/contact' } },
            { tone: 'coral', title: "La préparation opérationnelle à l'emploi (POEI)",
              text: 'La personne se forme dans votre cuisine avant son embauche. Festin fait les démarches avec vous.',
              tags: [['Financement', 'France Travail'], ['Contrat', 'CDD de 4 mois minimum']],
              etapes: [
                ['Rencontrer', "Nous présentons des candidats. Des journées d'immersion valident le profil."],
                ['Former', 'Deux stages dans votre établissement : deux semaines, puis trois.'],
                ['Recruter', "Si l'expérience est concluante : un CDD de quatre mois minimum."],
              ],
              etapesLien: { label: 'Préparer une embauche', href: '#/contact' } },
          ]} />
        </div>
      </section>

      {/* 5 · CARTE FLOTTANTE — un témoignage sur fond sombre */}
      <window.CarteFlottante label="Témoignage d'un chef"
        media={<window.PhotoMissing subject="le chef Davin et Sami en cuisine" cadrage="plan taille" orientation="vertical" ratio="4/5" />}
        quote="Sami s'est très vite intégré à l'équipe."
        who="Chef Davin, Intercontinental Marseille, a recruté un commis formé aux Beaux Mets."
        cta={{ label: 'Nous écrire', href: '#/contact' }} />

      {/* 6 · TITRE EN CHEVAUCHEMENT — fin de page */}
      <window.TitreChevauche id="pros-eng-t" mot="S'engager" title="S'engager avec Festin"
        text="Soutenir un projet comme mécène, ou participer au prochain Grand Festin."
        link={{ label: 'Nous écrire', href: '#/contact' }} />
    </div>
  );
}

window.AccompagnementInsertionPage = AccompagnementInsertionPage;
window.AccompagnementProsPage = AccompagnementProsPage;
})();
