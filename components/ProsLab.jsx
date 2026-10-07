// ProsLab.jsx — route de comparaison #/lab-pros (branche headers-propositions, 07/10/2026).
// « Pour le secteur », version harmonisée. Même contenu que la page en ligne ; ce qui change :
// une seule grille (titre à gauche, contenu à droite) d'une section à l'autre, une seule matière de carte
// (blanc sur crème, crème sur blanc), la couleur réservée au code (or = secteur) et aux boutons,
// plus de bande or au milieu, S'engager en photo + cartouche or (option C) qui répond à l'en-tête.
function ProsLab() {
  const root = React.useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  const F = (id) => D.formations.find((f) => f.id === id) || {};
  const go = (id) => (e) => { e.preventDefault(); window.festinScrollTo(id); };
  return (
    <div className="gpage ar-page pl" ref={root} data-screen-label="Professionnels (lab)">

      <window.HeroPage tone="gold" title="Recruter et former," accent="avec Festin."
        img="images/beauxmets-images/LBM_cdutrey_071122-7264.jpg" imgAlt="Un commis des Beaux Mets en cuisine"
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Pour le secteur' }]}>
        <a className="btnb btnb--teal" href="#pl-former" onClick={go('pl-former')}>Former vos équipes <span className="arrow" aria-hidden="true">↓</span></a>
      </window.HeroPage>

      {/* 1 · FORMER : crème, titre à gauche, deux cartes blanches à droite (plus de grand cadre teal) */}
      <section className="ar-sec ar-sec--cream pl-sec" id="pl-former" aria-labelledby="pl-former-t">
        <div className="wrap ar-split">
          <div className="ar-split__head">
            <h2 className="ar-h2" id="pl-former-t">Former <em>vos équipes.</em></h2>
            <p className="ar-split__p">Deux formations courtes, en présentiel, dans vos murs ou avec d'autres établissements.</p>
            <window.ArTags tags={[['Proposées par', 'le programme Restaure'], ['Format', 'Inter ou intra']]} />
            <a className="btnb btnb--gold pl-cta" href="#/contact/former">Demander une formation <span className="arrow" aria-hidden="true">→</span></a>
          </div>
          <ul className="ar-fcards pl-fcards">
            {[
              { f: F('vss'), a: 'Reconnaître les violences en cuisine et en salle, les prévenir, réagir à un signalement.', tags: [['Durée', '3 h ou 1 jour'], ['Pour', "Toute l'équipe"]] },
              { f: F('management'), a: "Recruter plus largement, garder son équipe, l'encadrer sans violence.", tags: [['Durée', '1 jour et 2 demi-journées'], ['Pour', 'Chefs, managers, RH']] },
            ].map(({ f, a, tags }) => (
              <li className="ar-fcard" key={f.id}>
                <a href={'#/formations/' + f.id}>
                  <span className="ar-fcard__img">{f.img ? <window.Picture src={f.img} alt="" sizes="(max-width: 720px) 100vw, 28vw" /> : <span className="img-vide" aria-hidden="true" />}</span>
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
        </div>
      </section>

      {/* 2 · RECRUTER : blanc, même grille ; trois lignes crème, sans teintes (teal, or et corail n'y codaient rien) */}
      <section className="ar-sec ar-sec--white pl-sec" id="pl-recruter" aria-labelledby="pl-rec-t">
        <div className="wrap ar-split">
          <div className="ar-split__head">
            <h2 className="ar-h2" id="pl-rec-t">Recruter <em>une personne formée.</em></h2>
            <p className="ar-split__p">Trois possibilités.</p>
          </div>
          <window.LignesTypees id="pl-rec" items={[
            { tone: 'neutre', title: 'Accueillir un stagiaire',
              text: "Une personne formée par Des Étoiles et des Femmes ou Tournesol rejoint votre brigade, suivie en binôme par un membre de votre équipe.",
              tags: [['Moment', 'Pendant sa formation'], ['Festin', 'En appui tout le stage']],
              link: { label: 'Proposer un stage', href: '#/contact/recruter' } },
            { tone: 'neutre', title: "Le Book de l'emploi",
              text: 'Des commis diplômés de nos parcours, prêts à prendre leur poste.',
              tags: [['Envoi', 'Sous 48 h ouvrées']],
              link: { label: 'Recevoir le Book', href: '#/contact/recruter' } },
            { tone: 'neutre', title: "La préparation opérationnelle à l'emploi (POEI)",
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

      {/* 3 · TÉMOIGNAGE : teal profond, même grille (photo à gauche, parole à droite), sans carte posée dessus */}
      <section className="ar-sec ar-sec--deep on-dark pl-temoin" aria-label="Témoignage d'un chef">
        <figure className="wrap pl-temoin__in">
          <div className="pl-temoin__media">
            <window.Picture src="images/pros/davin-sami.jpg" alt="Le chef Davin et Sami en cuisine, à l'Intercontinental Marseille" sizes="(max-width: 720px) 100vw, 420px" />
            <span className="ar-carte__badge"><img src="images/partners/intercontinental.png" alt="InterContinental Marseille" loading="lazy" /></span>
          </div>
          <div className="pl-temoin__txt">
            <blockquote className="pl-temoin__q"><p>« Sami s'est très vite intégré à l'équipe. »</p></blockquote>
            <figcaption>Chef Davin, Intercontinental Marseille, a recruté un commis formé aux Beaux Mets.</figcaption>
            <a className="btnb btnb--gold" href="#/projets/les-beaux-mets">Découvrir Les Beaux Mets <span className="arrow" aria-hidden="true">→</span></a>
          </div>
        </figure>
      </section>

      {/* 4 · S'ENGAGER (option C de #/lab-engager) : la photo du Grand Festin et un cartouche or, en écho à l'en-tête */}
      <section className="eng-c pl-eng" aria-labelledby="pl-eng-t">
        <window.Picture className="eng-c__photo" src="images/images-def/grand-festin-2025-brigades.jpg" alt="Les brigades du Grand Festin 2025 sur les marches, près du Vieux-Port" sizes="100vw" />
        <div className="eng-c__cart">
          <h2 className="eng-c__t" id="pl-eng-t">S'engager <em>avec Festin.</em></h2>
          <p>Soutenir un projet comme mécène, ou participer au prochain Grand Festin : en 2025, plus de 600 convives, 14 brigades et plus de 100 bénévoles.</p>
          <div className="eng-c__act">
            <a className="btnb btnb--teal" href="#/contact/partenariat">Devenir partenaire Festin <span className="arrow" aria-hidden="true">→</span></a>
            <a className="lnk" href="#/contact/mecenat">Devenir mécène <span className="arrow" aria-hidden="true">→</span></a>
            <a className="lnk" href="https://www.mouvement-restaure.com" target="_blank" rel="noopener noreferrer">Rejoindre Restaure <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>
          </div>
        </div>
      </section>
    </div>
  );
}
window.ProsLab = ProsLab;
