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
            lede="Vous cherchez pour vous-même, ou vous accompagnez quelqu'un : voici à qui s'adresse chaque parcours, et comment y entrer." />
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
          <p className="g-src">Les Beaux Mets, le restaurant de la prison des Baumettes, ne reçoit pas de candidatures : on y réserve une table, et les restaurants peuvent y recruter un ancien commis. <a href="#/projets/les-beaux-mets">Découvrir Les Beaux Mets →</a></p>
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
        { q: "Quel parcours est fait pour moi ?", a: "Des Étoiles et des Femmes accueille des femmes. Tournesol accueille des personnes réfugiées ou primo-arrivantes. La Table de Cana emploie des salariés en insertion à Marseille. Écrivez-nous : nous vous orientons." },
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
// =====================================================================
// PROFESSIONNELS (maquette du 30/09/2026, branche maquette-pros)
// Vocabulaire fini d'archétypes (voir ALLER-PLUS-LOIN.md) ; deux sections
// voisines ne partagent jamais le même : plein cadre · bloc encarté à
// accordéon · bande défilante · lignes typées · carte flottante · titre
// en chevauchement.
// Signalétique : les numéros sont réservés aux étapes dans un ordre imposé
// (POEI) ; les options au choix n'en portent jamais.
// =====================================================================
function ProsAccordeon({ id, items }) {
  const [open, setOpen] = React.useState(-1);
  return (
    <ul className="pr-acc">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <li key={i} className={'pr-acc__it' + (on ? ' is-open' : '')}>
            <h3 className="pr-acc__q">
              <button type="button" id={id + '-q' + i} aria-expanded={on} aria-controls={id + '-a' + i} onClick={() => setOpen(on ? -1 : i)}>
                <span>{it.q}</span><span className="pr-acc__ic" aria-hidden="true" />
              </button>
            </h3>
            <div className="pr-acc__a" id={id + '-a' + i} role="region" aria-labelledby={id + '-q' + i} hidden={!on}>
              {it.tags && <ul className="pr-tags">{it.tags.map((t) => <li key={t[0]}><span>{t[0]}</span>{t[1]}</li>)}</ul>}
              <p>{it.a}</p>
              {it.link && <a className="pr-lnk" href={it.link.href}>{it.link.label} <span className="arrow" aria-hidden="true">→</span></a>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function AccompagnementProsPage() {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  const F = (id) => D.formations.find((f) => f.id === id) || {};
  const [poei, setPoei] = React.useState(false);
  const bande = ['Des Étoiles et des Femmes', 'Tournesol', 'La Table de Cana', 'Les Beaux Mets', 'le programme Restaure', "l'Académie Festin"];
  const options = [
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
      poei: true },
  ];
  const etapes = [
    ['Rencontrer', "Nous présentons des candidats. Des journées d'immersion valident le profil."],
    ['Former', 'Deux stages dans votre établissement : deux semaines, puis trois.'],
    ['Recruter', "Si l'expérience est concluante : un CDD de quatre mois minimum."],
  ];
  const go = (id) => (e) => { e.preventDefault(); window.festinScrollTo ? window.festinScrollTo(id) : document.getElementById(id).scrollIntoView(); };
  return (
    <div className="gpage pr" ref={root} data-screen-label="Professionnels">

      {/* A · PLEIN CADRE — photo pleine largeur, texte en surimpression (fond sombre) */}
      <header className="pr-hero on-dark">
        <window.Picture className="pr-hero__img" src="images/beauxmets-images/LBM_cdutrey_071122-7264.jpg" alt="" loading="eager" fetchPriority="high" />
        <div className="wrap pr-hero__in">
          <nav className="hp__crumb pr-hero__crumb" aria-label="Fil d'Ariane"><a href="#/">Accueil</a> <span aria-hidden="true">/</span> <span aria-current="page">Professionnels</span></nav>
          <p className="pr-eyebrow">Professionnels de la restauration</p>
          <h1 className="pr-hero__t">Former et recruter, <em>avec Festin.</em></h1>
          <p className="pr-hero__p">Des formations pour vos équipes, des personnes formées pour votre brigade.</p>
          <div className="pr-hero__cta">
            <a className="btnb btnb--gold" href="#pros-former" onClick={go('pros-former')}>Former vos équipes <span className="arrow" aria-hidden="true">↓</span></a>
            <a className="btnb btnb--light" href="#pros-recruter" onClick={go('pros-recruter')}>Recruter <span className="arrow" aria-hidden="true">↓</span></a>
          </div>
        </div>
      </header>

      {/* B · BLOC ENCARTÉ À ACCORDÉON — un bloc teal, marges visibles, le détail replié */}
      <section className="pr-sec pr-sec--white" id="pros-former" aria-labelledby="pros-former-t">
        <div className="wrap">
          <div className="pr-bloc on-dark g-reveal">
            <div className="pr-bloc__head">
              <h2 className="pr-h2" id="pros-former-t">Former <em>vos équipes.</em></h2>
              <p className="pr-bloc__p">Deux formations courtes, en présentiel, dans vos murs ou avec d'autres établissements.</p>
              <ul className="pr-tags pr-tags--row">
                <li><span>Portées par</span>le programme Restaure</li>
                <li><span>Catalogue</span>Académie Festin, certifiée Qualiopi</li>
                <li><span>Financement</span>OPCO possible</li>
              </ul>
            </div>
            <div className="pr-bloc__body">
              <ProsAccordeon id="pros-f" items={[
                { q: F('vss').title, a: "Reconnaître les violences en cuisine et en salle, les prévenir, réagir à un signalement.",
                  tags: [['Durée', '3 h ou 1 jour'], ['Pour', 'Toute l\'équipe']], link: { label: 'La fiche de la formation', href: '#/formations/vss' } },
                { q: F('management').title, a: "Recruter plus largement, garder son équipe, l'encadrer sans violence.",
                  tags: [['Durée', '1 jour et 2 demi-journées'], ['Pour', 'Chefs, managers, RH']], link: { label: 'La fiche de la formation', href: '#/formations/management' } },
              ]} />
              <a className="btnb btnb--gold pr-bloc__cta" href="#/contact">Demander une formation <span className="arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* C · BANDE DÉFILANTE — respiration, aplat or : l'écosystème d'où viennent les personnes */}
      <section className="pr-bande" aria-label="Les projets de Festin" data-marquee>
        <ul className="pr-bande__l">
          {bande.concat(bande, bande).map((t, i) => <li key={i} aria-hidden={i >= bande.length ? true : undefined}>{t}</li>)}
        </ul>
        <window.MarqueePause label="des projets" />
      </section>

      {/* D · LIGNES TYPÉES — options au choix : pas de numéros, une couleur et des micro-étiquettes par ligne */}
      <section className="pr-sec pr-sec--cream" id="pros-recruter" aria-labelledby="pros-rec-t">
        <div className="wrap pr-split">
          <div className="pr-split__head">
            <h2 className="pr-h2" id="pros-rec-t">Recruter <em>une personne formée.</em></h2>
            <p className="pr-split__p">Trois possibilités, au choix.</p>
          </div>
          <ul className="pr-lignes">
            {options.map((o) => (
              <li key={o.title} className={'pr-ligne pr-ligne--' + o.tone + ' g-reveal'}>
                <div className="pr-ligne__main">
                  <h3 className="pr-ligne__t">{o.title}</h3>
                  <p>{o.text}</p>
                </div>
                <ul className="pr-tags">{o.tags.map((t) => <li key={t[0]}><span>{t[0]}</span>{t[1]}</li>)}</ul>
                <div className="pr-ligne__act">
                  {o.link && <a className="pr-lnk" href={o.link.href}>{o.link.label} <span className="arrow" aria-hidden="true">→</span></a>}
                  {o.poei && <button type="button" className="pr-lnk pr-lnk--btn" aria-expanded={poei} aria-controls="pros-poei" onClick={() => setPoei(!poei)}>
                    {poei ? 'Masquer les étapes' : 'Voir les 3 étapes'} <span className="pr-lnk__ic" aria-hidden="true" /></button>}
                </div>
                {o.poei && (
                  <div className="pr-poei" id="pros-poei" hidden={!poei}>
                    <ol className="pr-etapes">
                      {etapes.map(([t, x]) => <li key={t}><strong>{t}</strong><span>{x}</span></li>)}
                    </ol>
                    <a className="pr-lnk" href="#/contact">Préparer une embauche <span className="arrow" aria-hidden="true">→</span></a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* E · CARTE FLOTTANTE — un témoignage posé sur fond sombre */}
      <section className="pr-sec pr-sec--deep on-dark" aria-label="Témoignage d'un chef">
        <div className="wrap">
          <figure className="pr-carte g-reveal">
            <div className="pr-carte__media">
              <window.PhotoMissing subject="le chef Davin et Sami en cuisine" cadrage="plan taille" orientation="vertical" ratio="4/5" />
            </div>
            <div className="pr-carte__txt">
              <blockquote className="pr-carte__q"><p>« Sami s'est très vite intégré à l'équipe. »</p></blockquote>
              <figcaption>Chef Davin, Intercontinental Marseille, a recruté un commis formé aux Beaux Mets.</figcaption>
              <a className="btnb btnb--teal" href="#/contact">Nous écrire <span className="arrow" aria-hidden="true">→</span></a>
            </div>
          </figure>
        </div>
      </section>

      {/* F · TITRE EN CHEVAUCHEMENT — le mot déborde sur le bloc blanc qui clôt la page */}
      <section className="pr-eng" aria-labelledby="pros-eng-t">
        <p className="pr-eng__mot" aria-hidden="true">S'engager</p>
        <div className="wrap pr-eng__in">
          <h2 className="pr-eng__t" id="pros-eng-t">S'engager avec Festin</h2>
          <p>Soutenir un projet comme mécène, ou participer au prochain Grand Festin.</p>
          <a className="pr-lnk" href="#/contact">Nous écrire <span className="arrow" aria-hidden="true">→</span></a>
        </div>
      </section>
    </div>
  );
}

window.AccompagnementInsertionPage = AccompagnementInsertionPage;
window.AccompagnementProsPage = AccompagnementProsPage;
})();
