// Maquettes.jsx — pages de proposition, hors navigation (30/09/2026).
// #/maquette/academie : l'Académie Festin recomposée avec les archétypes de la
// page Professionnels (Archetypes.jsx). La page en ligne (#/academie) ne change pas.
(function () {
const { useRef } = React;

function AcademieMaquette() {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  const F = (id) => D.formations.find((f) => f.id === id) || {};
  const go = (id) => (e) => { e.preventDefault(); window.festinScrollTo(id); };
  return (
    <div className="gpage ar-page" ref={root} data-screen-label="Maquette Académie">
      {/* 1 · PLEIN CADRE */}
      <header className="ar-hero on-dark">
        <window.Picture className="ar-hero__img" src="images/photo-cuisine-formation.jpg" alt="" loading="eager" fetchPriority="high" />
        <div className="wrap ar-hero__in">
          <p className="ar-maquette" role="note">Maquette de refonte · <a href="#/academie">voir la page actuelle</a></p>
          <nav className="hp__crumb ar-hero__crumb" aria-label="Fil d'Ariane"><a href="#/">Accueil</a> <span aria-hidden="true">/</span> <span aria-current="page">L'Académie Festin</span></nav>
          <p className="ar-eyebrow">Organisme de formation certifié Qualiopi</p>
          <h1 className="ar-hero__t">L'Académie <em>Festin.</em></h1>
          <p className="ar-hero__p">Toutes les formations de Festin : apprendre un métier, ou former une équipe en poste.</p>
          <div className="ar-hero__cta">
            <a className="btnb btnb--gold" href="#aca-metier" onClick={go('aca-metier')}>Apprendre un métier <span className="arrow" aria-hidden="true">↓</span></a>
            <a className="btnb btnb--light" href="#aca-equipes" onClick={go('aca-equipes')}>Former une équipe <span className="arrow" aria-hidden="true">↓</span></a>
          </div>
        </div>
      </header>

      {/* 2 · LIGNES TYPÉES — les parcours au choix (sans numéros) ; le détail se déplie */}
      <section className="ar-sec ar-sec--cream" id="aca-metier" aria-labelledby="aca-metier-t">
        <div className="wrap ar-split">
          <div className="ar-split__head">
            <h2 className="ar-h2" id="aca-metier-t">Apprendre <em>un métier.</em></h2>
            <p className="ar-split__p">Trois parcours diplômants, gratuits.</p>
          </div>
          <window.LignesTypees id="aca-par" items={[
            { tone: 'coral', title: 'Le CAP cuisine', text: "En 11 mois, avec des stages dans un restaurant partenaire. Un parcours de Des Étoiles et des Femmes.",
              tags: [['Durée', '986 h de cours, 490 h de stage'], ['Pour qui', F('cap').publicLabel], ['Coût', 'Gratuit']],
              link: { label: 'La fiche', href: '#/formations/cap' } },
            { tone: 'gold', title: 'Le titre de commis de cuisine', text: 'En 4 mois, pour des femmes. Un parcours de Des Étoiles et des Femmes.',
              tags: [['Durée', '600 h, dont 155 h de stage'], ['Pour qui', F('tfp').publicLabel], ['Coût', 'Gratuit']],
              link: { label: 'La fiche', href: '#/formations/tfp' } },
            { tone: 'teal', title: 'Tournesol', text: 'En 5 mois, le titre de commis de cuisine et le DCL, un diplôme de français.',
              tags: [['Durée', '600 h, dont 155 h de stage'], ['Pour qui', F('tournesol').publicLabel], ['Coût', 'Gratuit']],
              link: { label: 'La fiche', href: '#/formations/tournesol' } },
          ]} />
        </div>
      </section>

      {/* 3 · BANDE DÉFILANTE — les diplômes préparés */}
      <window.BandeDefilante label="Les diplômes préparés" items={['CAP cuisine', 'Titre de commis de cuisine', 'DCL, diplôme de français', 'Stages en restaurant', 'Certifié Qualiopi']} />

      {/* 4 · BLOC ENCARTÉ À ACCORDÉON — les formations pro */}
      <section className="ar-sec ar-sec--white" id="aca-equipes" aria-labelledby="aca-equipes-t">
        <div className="wrap">
          <window.BlocEncarte id="aca-equipes-t" title="Former" accent="une équipe."
            lede="Des sessions courtes, en présentiel, dans vos murs ou avec d'autres établissements."
            tags={[['Portées par', 'le programme Restaure'], ['Financement', 'OPCO possible']]}>
            <window.Accordeon id="aca-f" items={[
              { q: F('vss').title, a: "Reconnaître les violences en cuisine et en salle, les prévenir, réagir à un signalement.",
                tags: [['Durée', '3 h ou 1 jour'], ['Pour', "Toute l'équipe"]], link: { label: 'La fiche de la formation', href: '#/formations/vss' } },
              { q: F('management').title, a: "Recruter plus largement, garder son équipe, l'encadrer sans violence.",
                tags: [['Durée', '1 jour et 2 demi-journées'], ['Pour', 'Chefs, managers, RH']], link: { label: 'La fiche de la formation', href: '#/formations/management' } },
            ]} />
            <a className="btnb btnb--gold ar-bloc__cta" href="#/contact">Demander une formation <span className="arrow" aria-hidden="true">→</span></a>
          </window.BlocEncarte>
        </div>
      </section>

      {/* 5 · CARTE FLOTTANTE — le besoin du secteur, sur fond sombre */}
      <section className="ar-sec ar-sec--deep on-dark" aria-labelledby="aca-besoin-t">
        <div className="wrap">
          <div className="ar-carte ar-carte--chiffres g-reveal">
            <div className="ar-carte__txt">
              <h2 className="ar-h2" id="aca-besoin-t">Un secteur <em>qui recrute.</em></h2>
              <ul className="ar-chiffres">
                <li><b>77&nbsp;240</b><span>projets de recrutement dans les Bouches-du-Rhône, tous secteurs</span></li>
                <li><b>2&nbsp;sur&nbsp;3</b><span>recrutements de cuisiniers jugés difficiles par les employeurs</span></li>
                <li><b>500+</b><span>offres actives en restauration sur le territoire marseillais</span></li>
              </ul>
              <p className="ar-chiffres__src">Source : enquête Besoins en main-d'œuvre, France Travail. [À COMPLÉTER : année de l'enquête]</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · TITRE EN CHEVAUCHEMENT — qui porte l'Académie */}
      <window.TitreChevauche id="aca-qui-t" mot="Académie" title="Qui porte l'Académie"
        text="L'association Festin, qui forme en cuisine depuis 1987, avec Estello Formation. Certifiée Qualiopi au titre des actions de formation."
        link={{ label: 'Nous écrire', href: '#/contact' }} />
    </div>
  );
}

window.AcademieMaquette = AcademieMaquette;
})();
