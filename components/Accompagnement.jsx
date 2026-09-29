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
      text: 'La promotion démarre et le suivi individuel commence.',
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
        cta={{ label: 'Vérifier mon éligibilité', href: '#/contact' }} lien={{ label: 'Quel parcours, pour qui ?', to: 'parcours-choix' }} />

      {/* LES PARCOURS — une seule section pour tous les publics (retours du 30/09/2026) :
          pour qui, ce que c'est, comment entrer, et le site du projet. Pas de dates : chaque
          antenne a son calendrier, donné sur le site du projet. */}
      <section className="g-sec g-sec--white" id="parcours-choix" aria-labelledby="ins-par-t">
        <div className="wrap">
          <window.GHead id="ins-par-t" split title="Quel parcours," accent="pour qui ?"
            lede="Quatre projets de Festin forment et emploient des personnes qui cherchent un métier. Que vous cherchiez pour vous-même ou que vous accompagniez quelqu'un, voici à qui s'adresse chaque parcours et comment y entrer." />
          <ul className="or-cards">
            {D.orienter.map((o) => {
              const p = D.projets.find((x) => x.id === o.id) || {};
              const c = (D.home.missions.items.flatMap((m) => m.projets).find((x) => x.id === o.id)) || {};
              return (
                <li className="or-card g-reveal" key={o.id}>
                  <div className="or-card__img">
                    <window.Picture src={c.img} alt="" sizes="(max-width: 900px) 100vw, 44vw" />
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
                      <a className="lnk" href={'#/projets/' + o.id}>La page du projet <span className="arrow" aria-hidden="true">→</span></a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
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

      <window.Frise id="calendrier" tone="tint" title="Une promotion," accent="mois par mois."
        lede="Le déroulé d'une année pour Des Étoiles et des Femmes et Tournesol. Les dates exactes changent d'une session à l'autre."
        steps={calendrier}
        rail={{ tab: "Toute l'année", title: 'Un suivi individuel', text: 'Transport, garde d’enfants, logement, papiers, cours de français : une personne de l’équipe vous suit jusqu’à l’emploi.' }} />

      <window.Faq id="faq-ins" title="Vos" accent="questions" items={[
        { q: "La formation est-elle payante ?", a: "Non. Tous nos parcours sont gratuits. Selon votre situation, vous pouvez percevoir une indemnité ou une rémunération pendant la formation." },
        { q: "Quand commencent les prochaines sessions ?", a: "Chaque antenne a son propre calendrier. Le site de chaque projet donne les dates des prochaines sessions." },
        { q: "Quel parcours est fait pour moi ?", a: "Des Étoiles et des Femmes accueille des femmes. Tournesol accueille des personnes réfugiées ou primo-arrivantes. Les Beaux Mets recrute des personnes détenues aux Baumettes. La Table de Cana emploie des salariés en insertion à Marseille. Écrivez-nous : nous vous orientons." },
        { q: "Qui m'aide pendant la formation ?", a: "Une personne de l'équipe vous suit du premier entretien jusqu'à l'emploi : transport, garde d'enfants, logement, cours de français, recherche de poste." },
        { q: "Et après la formation ?", a: "En mai et juin, nous préparons avec vous la recherche de poste et nous vous mettons en relation avec des restaurants qui recrutent." },
      ]} />

      <window.Appel id="ins-appel" title="Vérifier si le parcours" accent="est fait pour vous."
        text="Écrivez-nous : nous vérifions ensemble votre éligibilité, puis nous vous invitons à une réunion d'information."
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
            lede="Des formations courtes, en présentiel, dans vos murs ou avec d'autres établissements, construites à partir de situations réelles de cuisine et de salle. Elles sont portées par le programme Restaure et font partie du catalogue de l'Académie Festin, certifiée Qualiopi ; une prise en charge par votre OPCO est possible." />
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
          { tab: 'Rencontrer', title: 'Des candidats présentés', text: "Nous présentons des candidats qui correspondent à vos besoins. Des journées d'immersion en cuisine valident le profil." },
          { tab: 'Former', title: 'Deux stages chez vous', text: 'Deux semaines, puis trois semaines, dans votre établissement.' },
          { tab: 'Recruter', title: 'Une prise de poste', text: "Si l'expérience est concluante : un CDD de quatre mois minimum.", stat: '4 mois', statL: 'de CDD au minimum' },
        ]} />

      <window.Faq id="faq-pros" tone="white" title="Vos" accent="questions" items={[
        { q: "Qu'est-ce que la POEI ?", a: "La préparation opérationnelle à l'emploi individuelle est financée par France Travail. Elle vous permet de recruter une personne formée à votre cuisine : immersion, deux stages chez vous, puis un CDD de quatre mois minimum. Festin s'occupe des démarches avec vous." },
        { q: "Qui porte les formations pour les professionnels ?", a: "Le programme Restaure. Elles font partie du catalogue de l'Académie Festin, certifiée Qualiopi. Les formations ont lieu en inter (avec d'autres établissements) ou en intra (dans vos murs). Une prise en charge par votre OPCO est possible ; chaque fiche donne le tarif." },
        { q: "Comment accueillir un stagiaire ?", a: "Écrivez-nous. Nous vous présentons une personne formée par Des Étoiles et des Femmes ou Tournesol ; un membre de votre équipe la suit en binôme, et Festin reste en appui pendant tout le stage." },
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
