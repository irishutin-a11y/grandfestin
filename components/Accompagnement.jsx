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
function AccompagnementInsertionPage() {
  const root = useRef(null);
  window.useGReveal(root);
  const calendrier = [
    { when: 'Septembre', tab: 'Candidater', title: 'Entretiens et atelier de préparation',
      text: "Vous rencontrez l'équipe en entretien, puis un atelier collectif vous prépare à rencontrer les restaurants.",
      stat: 'Gratuit', statL: 'pour les personnes formées', img: 'images/photo-micro-temoignage.jpg' },
    { when: 'Octobre', tab: 'Rencontrer', title: 'Une immersion en restaurant',
      text: "Une immersion courte valide votre projet. Nous vous présentons ensuite l'établissement qui vous accueillera.",
      img: 'images/images-def/HOTELERIE-035.jpg' },
    { when: 'Novembre et décembre', tab: 'Commencer', title: 'Entrée en formation',
      text: 'Les promotions démarrent et le suivi individuel commence. En 2026 : le 9 novembre pour Des Étoiles et des Femmes, le 30 novembre pour Tournesol.',
      img: 'images/photo-patisserie.jpg' },
    { when: 'Janvier à mars', tab: 'Se former', title: 'Cours, stages et suivi',
      text: 'Les cours alternent avec les stages en brigade et les rendez-vous de suivi.',
      img: 'images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-24.jpg' },
    { when: 'Avril', tab: 'Le diplôme', title: 'Examens et fin de formation',
      text: 'Vous passez le CAP cuisine ou le titre de commis de cuisine (et le DCL pour Tournesol).',
      stat: '91 %', statL: 'de réussite aux diplômes en 2025, Des Étoiles et des Femmes', img: 'images/photo-applaudissements.jpg' },
    { when: 'Mai et juin', tab: 'Travailler', title: "La recherche de poste",
      text: 'Nous cherchons le poste avec vous et nous vous présentons aux restaurants qui recrutent.',
      img: 'images/photo-service-restaurant.jpg' },
  ];
  return (
    <div className="gpage acc" ref={root} data-screen-label="Accompagnement — Insertion">
      <AccHero tone="gold" crumb="Se former" kicker="Vous cherchez un métier"
        title="Apprendre un métier de cuisine," em="gratuitement."
        lede="Vous préparez un diplôme reconnu, vous faites vos stages en restaurant, et une personne de l'équipe vous suit jusqu'à l'emploi."
        img="images/photo-tabliers-violets.jpg" imgAlt="Des apprenties de Des Étoiles et des Femmes en cuisine"
        cta={{ label: 'Vérifier mon éligibilité', href: '#/contact' }} lien={{ label: 'Choisir mon parcours', to: 'parcours-choix' }} />

      <section className="g-sec g-sec--white" aria-labelledby="ins-bref-t">
        <div className="wrap g-bref">
          <div className="g-bref__txt">
            <h2 className="g-h2 g-reveal" id="ins-bref-t">Un diplôme, et quelqu'un <em>à vos côtés.</em></h2>
            <p className="g-lede g-reveal">Chaque parcours prépare un diplôme reconnu et comprend des stages en restaurant. Pendant toute la formation, une personne de l'équipe vous aide pour ce qui peut vous empêcher d'avancer : transport, garde d'enfants, logement, cours de français.</p>
            <window.Preuves lignes={[
              'Tous nos parcours sont <b>gratuits</b>. Selon votre situation, vous pouvez percevoir une indemnité ou une rémunération.',
              'En 2025, <b>83 %</b> des personnes que nous avons accompagnées sont sorties en emploi ou en formation.',
            ]} source="Source : rapport d'activité Festin 2025, tous projets confondus." />
          </div>
          <figure className="g-photo g-reveal"><window.Picture src="images/photo-apprenante-plats.jpg" alt="Une apprentie présente ses assiettes en fin de service" sizes="(max-width: 900px) 100vw, 44vw" /></figure>
        </div>
      </section>

      <section className="g-sec g-sec--cream" id="parcours-choix" aria-labelledby="ins-choix-t">
        <div className="wrap">
          <window.GHead id="ins-choix-t" split title="Le parcours qui vous" accent="correspond."
            lede="Quatre projets de Festin forment et emploient des personnes qui cherchent un métier. Chacun s'adresse à un public précis." />
          <window.ProjetsParMission groupes={[
            { mission: 'Se former', projets: [
              { id: 'des-etoiles-et-des-femmes', pour: 'Pour les femmes majeures', quoi: 'CAP cuisine ou titre de commis de cuisine, avec des stages en restaurant gastronomique, dans 13 villes.' },
              { id: 'tournesol', pour: 'Pour les personnes réfugiées ou primo-arrivantes', quoi: 'Cinq mois pour le titre de commis de cuisine et le DCL, à Marseille. France Travail rémunère les stagiaires.' },
            ] },
            { mission: 'Travailler en brigade', projets: [
              { id: 'les-beaux-mets', pour: 'Pour les personnes détenues aux Baumettes', quoi: 'Un poste en brigade dans le restaurant de la prison, et un suivi jusqu’à six mois après la sortie.' },
              { id: 'la-table-de-cana', pour: 'Pour les salariés en insertion, à Marseille', quoi: 'Un emploi au traiteur, avec une formation en cuisine, puis un poste chez un partenaire.' },
            ] },
          ]} />
        </div>
      </section>

      <window.Frise id="calendrier" tone="tint" title="Une promotion," accent="mois par mois."
        lede="Le déroulé d'une année pour Des Étoiles et des Femmes et Tournesol. Les dates exactes changent d'une session à l'autre."
        steps={calendrier}
        rail={{ tab: "Toute l'année", title: 'Un suivi individuel', text: 'Transport, garde d’enfants, logement, papiers, cours de français : une personne de l’équipe vous suit jusqu’à l’emploi.' }} />

      <window.Faq id="faq-ins" title="Vos" accent="questions" items={[
        { q: "La formation est-elle payante ?", a: "Non. Tous nos parcours sont gratuits. Selon votre situation, vous pouvez percevoir une indemnité ou une rémunération pendant la formation." },
        { q: "Quand commencent les prochaines sessions ?", a: "Des Étoiles et des Femmes (titre à finalité professionnelle de commis de cuisine) : du 9 novembre 2026 au 13 avril 2027. Tournesol : du 30 novembre 2026 au 22 avril 2027." },
        { q: "Quel parcours est fait pour moi ?", a: "Des Étoiles et des Femmes accueille des femmes. Tournesol accueille des personnes réfugiées ou primo-arrivantes. Les Beaux Mets recrute des personnes détenues aux Baumettes. La Table de Cana emploie des salariés en insertion à Marseille. Écrivez-nous : nous vous orientons." },
        { q: "Qui m'aide pendant la formation ?", a: "Une personne de l'équipe vous suit du premier entretien jusqu'à l'emploi : transport, garde d'enfants, logement, cours de français, recherche de poste." },
        { q: "Et après la formation ?", a: "En mai et juin, nous préparons avec vous la recherche de poste et nous vous mettons en relation avec des restaurants qui recrutent." },
      ]} />

      <window.Appel id="ins-appel" title="Vérifier si le parcours" accent="est fait pour vous."
        text="Écrivez-nous : nous vérifions ensemble votre éligibilité, puis nous vous invitons à une réunion d'information. Prochaines sessions : Des Étoiles et des Femmes du 9 novembre 2026 au 13 avril 2027, Tournesol du 30 novembre 2026 au 22 avril 2027."
        cta={{ label: 'Vérifier mon éligibilité', href: '#/contact' }} />
    </div>
  );
}

// =====================================================================
// ACTEURS DU SECTEUR (restaurateurs, traiteurs, établissements…)
// =====================================================================
function AccompagnementProsPage() {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  const formationsPros = D.formations.filter((f) => ['vss', 'management'].includes(f.id));
  const FCL = window.FormationCardLink;
  return (
    <div className="gpage acc" ref={root} data-screen-label="Accompagnement — Professionnels">
      <AccHero tone="teal" crumb="Recruter" kicker="Vous êtes du secteur"
        title="Recruter des commis formés," em="avec Festin."
        lede="Nous vous présentons des candidats formés dans nos parcours ; leur préparation à l'emploi peut être financée par France Travail. Nous formons aussi vos équipes contre les violences en cuisine et au management."
        img="images/beauxmets-images/LBM_cdutrey_071122-7264.jpg" imgAlt="La cuisine des Beaux Mets pendant le service"
        cta={{ label: "Demander le Book de l'emploi", href: '#/contact' }} lien={{ label: 'Recruter avec France Travail', to: 'poei' }} />

      <section className="g-sec g-sec--white" aria-labelledby="pros-offre-t">
        <div className="wrap">
          <window.GHead id="pros-offre-t" split title="Ce que nous faisons" accent="avec vous."
            lede="Trois façons de travailler avec Festin, du stage à la formation de vos managers." />
          <window.Cartes items={[
            { color: 'var(--teal)', title: 'Accueillir un stagiaire',
              desc: "Une personne formée par Des Étoiles et des Femmes ou Tournesol rejoint votre brigade. Un membre de votre équipe la suit en binôme, et Festin reste en appui pendant tout le stage. Si la rencontre fonctionne, vous recrutez.",
              link: { label: 'Recruter avec France Travail', to: 'poei' } },
            { color: 'var(--coral-ink)', title: 'Prévenir les violences',
              desc: "Une formation de trois heures ou d'une journée, pensée pour la cuisine et la salle : le cadre légal, des cas tirés de situations réelles, et un protocole de signalement à mettre en place.",
              link: { label: 'La formation', href: '#/formations/vss' } },
            { color: 'var(--gold-ink)', title: 'Manager juste',
              desc: "Deux jours pour apprendre à garder une équipe : posture de manager, recrutement, droit à l'erreur. Vous repartez avec un plan d'action pour votre établissement.",
              link: { label: 'La formation', href: '#/formations/management' } },
          ]} />
        </div>
      </section>

      <window.Frise id="poei" tone="tint" statique title="Accueillir un candidat," accent="étape par étape."
        lede="La préparation opérationnelle à l'emploi individuelle (POEI) est financée par France Travail. Elle vous permet de recruter une personne formée à votre cuisine. Festin s'occupe des démarches avec vous."
        steps={[
          { when: 'Automne 2026', tab: 'Rencontrer', title: 'Des candidats présentés', text: "Nous présentons des candidats qui correspondent à vos besoins. Des journées d'immersion en cuisine valident le profil." },
          { when: 'Janvier et mars 2027', tab: 'Former', title: 'Deux stages chez vous', text: 'Deux semaines en janvier, trois semaines en mars, dans votre établissement.' },
          { when: "À partir d'avril 2027", tab: 'Recruter', title: 'Une prise de poste', text: "Si l'expérience est concluante : un CDD de quatre mois minimum.", stat: '4 mois', statL: 'de CDD au minimum' },
        ]} />

      <section className="g-sec g-sec--white" aria-labelledby="pros-form-t">
        <div className="wrap">
          <window.GHead id="pros-form-t" split title="Des formations pour" accent="vos équipes."
            lede="Inter ou intra, en présentiel, par l'Académie Festin, organisme de formation certifié Qualiopi. Une prise en charge par votre OPCO est possible." />
          <div className="formations__grid">
            {FCL && formationsPros.map((f) => <FCL key={f.id} f={f} noPrice />)}
          </div>
          <p className="g-src"><a href={D.catalogPdf} target="_blank" rel="noopener noreferrer">Télécharger le catalogue complet (PDF)<span className="sr-only"> (nouvel onglet)</span></a></p>
        </div>
      </section>

      <section className="g-sec g-sec--cream" aria-labelledby="pros-restaure-t">
        <div className="wrap g-bref">
          <div className="g-bref__txt">
            <span className="g-tag g-reveal" style={{ '--pc': '#5B6E1E' }}><span className="g-tag__dot" aria-hidden="true" />Changer les cuisines</span>
            <h2 className="g-h2 g-reveal" id="pros-restaure-t">Rejoindre <em>le programme Restaure.</em></h2>
            <p className="g-lede g-reveal">Restaure réunit 35 structures et 700 signataires de son manifeste contre les violences en cuisine. Vous pouvez signer le manifeste, rejoindre un groupe de travail ou venir aux tables rondes. Aux Toast, organisés avec La Communauté Ecotable, des restaurateurs racontent ce qu'ils ont changé chez eux.</p>
            <a className="lnk g-bref__site g-reveal" href="#/projets/restaure">Découvrir Restaure <span className="arrow" aria-hidden="true">→</span></a>
          </div>
          <figure className="g-photo g-reveal">
            <window.Picture src="images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg" alt="Soirée de lancement du programme Restaure" sizes="(max-width: 900px) 100vw, 44vw" />
            <figcaption className="g-cap">Photo : Caroline Dutrey</figcaption>
          </figure>
        </div>
      </section>

      <window.Faq id="faq-pros" tone="white" title="Vos" accent="questions" items={[
        { q: "Qu'est-ce que la POEI ?", a: "La préparation opérationnelle à l'emploi individuelle est financée par France Travail. Elle vous permet de recruter une personne formée à votre cuisine : immersion, deux stages chez vous, puis un CDD de quatre mois minimum. Festin s'occupe des démarches avec vous." },
        { q: "Nos formations sont-elles prises en charge ?", a: "L'Académie Festin est certifiée Qualiopi. Une prise en charge par votre OPCO est possible, en inter ou en intra." },
        { q: "Comment accueillir un stagiaire ?", a: "Écrivez-nous. Nous vous présentons une personne formée par Des Étoiles et des Femmes ou Tournesol ; un membre de votre équipe la suit en binôme, et Festin reste en appui pendant tout le stage." },
        { q: "Comment rejoindre le programme Restaure ?", a: "Vous pouvez signer le manifeste, rejoindre un groupe de travail ou venir aux tables rondes et aux Toast. Tout est sur la page du programme Restaure." },
      ]} />

      <window.Appel id="pros-appel" title="Recevoir le" accent="Book de l'emploi."
        quote={{ text: "Sami s'est très vite intégré à l'équipe.", who: "Chef Davin, Intercontinental Marseille, a recruté un commis formé aux Beaux Mets" }}
        text="Le Book de l'emploi présente les personnes diplômées de nos parcours qui cherchent un poste. Nous vous l'envoyons sur demande, sous 48 h ouvrées."
        cta={{ label: "Demander le Book de l'emploi", href: '#/contact' }} />
    </div>
  );
}

window.AccompagnementInsertionPage = AccompagnementInsertionPage;
window.AccompagnementProsPage = AccompagnementProsPage;
})();
