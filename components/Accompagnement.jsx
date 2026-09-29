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
  const D = window.FESTIN_DATA;
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
      <AccHero tone="gold" crumb="Insertion" kicker="Vous cherchez un métier"
        title="Apprendre un métier de cuisine," em="gratuitement."
        lede="Vous préparez un diplôme reconnu, vous faites vos stages en restaurant, et une personne de l'équipe vous suit jusqu'à l'emploi."
        img="images/photo-tabliers-violets.jpg" imgAlt="Des apprenties de Des Étoiles et des Femmes en cuisine"
        cta={{ label: 'Vérifier mon éligibilité', href: '#/contact' }} lien={{ label: 'Vous accompagnez une personne ?', to: 'orienter' }} />

      {/* POUR LES PRESCRIPTEURS — publics, conditions, dates, contact de chaque parcours */}
      <section className="g-sec g-sec--white" id="orienter" aria-labelledby="ins-or-t">
        <div className="wrap">
          <window.GHead id="ins-or-t" split title={"Vous accompagnez une personne\u00a0?"} accent="Orientez-la."
            lede="Conseillères et conseillers France Travail, missions locales, travailleurs sociaux, structures d'accueil : voici, parcours par parcours, à qui il s'adresse, les conditions d'entrée, les prochaines dates et la personne à contacter." />
          <div className="or-table" role="table" aria-label="Les parcours, leurs conditions et leur contact">
            <div className="or-row or-row--head" role="row">
              <span role="columnheader">Parcours</span><span role="columnheader">Pour qui</span><span role="columnheader">Conditions et durée</span><span role="columnheader">Prochaine session</span><span role="columnheader">Contact</span>
            </div>
            {D.orienter.map((o, i) => {
              const p = D.projets.find((x) => x.id === o.id) || {};
              const manque = (t) => (window.FESTIN_SHOW_PLACEHOLDERS ? <span className="is-placeholder or-miss">[À COMPLÉTER : {t}]</span> : null);
              return (
                <div className="or-row g-reveal" role="row" key={i}>
                  <span role="cell" className="or-parc"><b>{o.parcours}</b><a className="lnk" href={'#/projets/' + o.id}>La page du projet <span className="arrow" aria-hidden="true">→</span></a></span>
                  <span role="cell"><i className="or-k">Pour qui</i>{o.pour}</span>
                  <span role="cell"><i className="or-k">Conditions et durée</i>{o.conditions || manque("conditions d'entrée")}<br />{o.duree}</span>
                  <span role="cell"><i className="or-k">Prochaine session</i>{o.dates || manque('dates')}</span>
                  <span role="cell"><i className="or-k">Contact</i>{o.contact ? <a href={'mailto:' + o.contact}>{o.contact}</a> : (manque('adresse du projet') || <a href={'mailto:' + D.contact.email + '?subject=' + encodeURIComponent('Orientation : ' + p.shortTitle)}>{D.contact.email}</a>)}
                    {p.siteUrl && <a className="or-site" href={p.siteUrl} target="_blank" rel="noopener noreferrer">{p.siteName} ↗<span className="sr-only"> (nouvel onglet)</span></a>}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="g-sec g-sec--cream" aria-labelledby="ins-bref-t">
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

      <section className="g-sec g-sec--white" id="parcours-choix" aria-labelledby="ins-choix-t">
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
      <AccHero tone="teal" crumb="Professionnels" kicker="Vous dirigez une cuisine ou une équipe"
        title="Former et recruter," em="avec Festin."
        lede="Avec le programme Restaure, nous formons vos équipes à prévenir les violences en cuisine et à manager autrement. Nous vous présentons aussi des personnes formées dans nos parcours, prêtes à rejoindre votre brigade."
        img="images/beauxmets-images/LBM_cdutrey_071122-7264.jpg" imgAlt="La cuisine des Beaux Mets pendant le service"
        cta={{ label: 'Demander une formation', href: '#/contact' }} lien={{ label: "Recevoir le Book de l'emploi", to: 'pros-appel' }} />

      {/* 1 · FORMER — les formations du programme Restaure, en tête */}
      <section className="g-sec g-sec--white" aria-labelledby="pros-form-t">
        <div className="wrap">
          <window.GHead id="pros-form-t" split title="Former vos équipes," accent="avec le programme Restaure."
            lede="Des formations courtes, en présentiel, dans vos murs ou avec d'autres établissements, construites à partir de situations réelles de cuisine et de salle. Le programme Restaure est certifié Qualiopi ; une prise en charge par votre OPCO est possible." />
          <div className="formations__grid">
            {FCL && formationsPros.map((f) => <FCL key={f.id} f={f} noPrice />)}
          </div>
          <p className="g-src"><a href={D.catalogPdf} target="_blank" rel="noopener noreferrer">Télécharger le catalogue complet (PDF)<span className="sr-only"> (nouvel onglet)</span></a></p>
        </div>
      </section>

      {/* 2 · RECRUTER — des personnes formées dans nos parcours */}
      <section className="g-sec g-sec--cream" aria-labelledby="pros-rec-t">
        <div className="wrap">
          <window.GHead id="pros-rec-t" split title="Recruter une personne" accent="formée."
            lede="Des personnes formées dans nos parcours cherchent un poste en cuisine. Trois façons de les rencontrer." />
          <window.Cartes items={[
            { color: 'var(--teal)', title: 'Accueillir un stagiaire',
              desc: "Une personne en formation rejoint votre brigade. Un membre de votre équipe la suit en binôme, et Festin reste en appui pendant tout le stage. Si la rencontre fonctionne, vous recrutez." },
            { color: 'var(--gold-ink)', title: "Le Book de l'emploi",
              desc: "Les personnes diplômées de nos parcours qui cherchent un poste. Nous vous l'envoyons sur demande, sous 48 h ouvrées.",
              link: { label: "Recevoir le Book de l'emploi", to: 'pros-appel' } },
            { color: 'var(--coral-ink)', title: 'La préparation à l\'emploi (POEI)',
              desc: "Financée par France Travail : une personne se forme à votre cuisine, puis vous la recrutez. Festin s'occupe des démarches avec vous.",
              link: { label: 'Les étapes', to: 'poei' } },
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

      {/* 3 · S'ENGAGER — le programme Restaure */}
      <section className="g-sec g-sec--cream" aria-labelledby="pros-restaure-t">
        <div className="wrap g-bref">
          <div className="g-bref__txt">
            <h2 className="g-h2 g-reveal" id="pros-restaure-t">S'engager avec <em>le programme Restaure.</em></h2>
            <p className="g-lede g-reveal">Restaure réunit 35 structures et 700 signataires de son manifeste contre les violences en cuisine. Au-delà des formations, vous pouvez signer le manifeste, rejoindre un groupe de travail ou venir aux tables rondes. Aux Toast, organisés avec La Communauté Ecotable, des restaurateurs racontent ce qu'ils ont changé chez eux.</p>
            <a className="lnk g-bref__site g-reveal" href="#/projets/restaure">Découvrir le programme Restaure <span className="arrow" aria-hidden="true">→</span></a>
          </div>
          <figure className="g-photo g-reveal">
            <window.Picture src="images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg" alt="Soirée de lancement du programme Restaure" sizes="(max-width: 900px) 100vw, 44vw" />
            <figcaption className="g-cap">Photo : Caroline Dutrey</figcaption>
          </figure>
        </div>
      </section>

      <window.Faq id="faq-pros" tone="white" title="Vos" accent="questions" items={[
        { q: "Qu'est-ce que la POEI ?", a: "La préparation opérationnelle à l'emploi individuelle est financée par France Travail. Elle vous permet de recruter une personne formée à votre cuisine : immersion, deux stages chez vous, puis un CDD de quatre mois minimum. Festin s'occupe des démarches avec vous." },
        { q: "Qui porte les formations pour les professionnels ?", a: "Le programme Restaure, certifié Qualiopi. Les formations ont lieu en inter (avec d'autres établissements) ou en intra (dans vos murs). Une prise en charge par votre OPCO est possible ; chaque fiche donne le tarif." },
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
