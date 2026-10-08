// Accompagnement.jsx — page « L'insertion » (#/insertion)
// et « Acteurs du secteur » (#/restauration).
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
        <window.GLink l={cta} className={'btnb ' + ({ gold: 'btnb--teal', teal: 'btnb--light' }[tone] || 'btnb--gold')}>{cta.label} <span className="arrow" aria-hidden="true">→</span></window.GLink>
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
  const go = (d) => { setPause(true); setI((x) => (x + d + images.length) % images.length); };
  return (
    <figure className="g-photo g-galauto g-reveal" aria-roledescription="carrousel" aria-label="Photos de nos formations">
      {images.map((im, k) => (
        <div key={im.src} className={'g-galauto__it' + (k === i ? ' is-on' : '')} aria-hidden={k !== i}>
          <window.Picture src={im.src} alt={im.alt} sizes="(max-width: 900px) 100vw, 44vw" />
        </div>
      ))}
      {/* précédent / suivant (retours V2, §3) : un clic arrête le défilement */}
      <div className="g-galauto__nav">
        <button type="button" className="g-galauto__b" aria-label="Photo précédente" onClick={() => go(-1)}><span aria-hidden="true">←</span></button>
        <span className="g-galauto__n" aria-live={pause || rm ? 'polite' : 'off'}>{i + 1} / {images.length}</span>
        <button type="button" className="g-galauto__b" aria-label="Photo suivante" onClick={() => go(1)}><span aria-hidden="true">→</span></button>
        {!rm && <button type="button" className="g-galauto__p" onClick={() => setPause(!pause)} aria-pressed={pause}>{pause ? '▶ Lecture' : '❚❚ Pause'}</button>}
      </div>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Éligibilité (RETOURS-V3 §4, réponse du 06/10/2026) : tout se passe dans le
// navigateur, rien n'est envoyé. Critères repris du site (fiches et cartes) :
// Des Étoiles et des Femmes : femme, 18 ans ou plus, français B1 ou B2, près
// d'une des 13 antennes ; Tournesol : personne réfugiée ou primo-arrivante,
// 18 ans ou plus, autorisée à travailler en France, français A2 minimum, à
// Marseille. « Nous contacter » n'apparaît que si un parcours est possible.
// ---------------------------------------------------------------------------
function Eligibilite({ open, onClose }) {
  const D = window.FESTIN_DATA;
  const def = D.projets.find((p) => p.id === 'des-etoiles-et-des-femmes') || {};
  const villes = (def.antennes || []).map((a) => a.ville).filter((v, i, t) => t.indexOf(v) === i).sort((a, b) => a.localeCompare(b, 'fr'));
  const [r, setR] = React.useState({});
  const [vu, setVu] = React.useState(false);
  const set = (k) => (e) => { setR((x) => ({ ...x, [k]: e.target.value })); setVu(false); };
  const Q = ({ k, q, opts, aide }) => (
    <fieldset className="elig__q">
      <legend>{q}</legend>
      {aide && <p className="elig__aide">{aide}</p>}
      <div className="elig__opts">
        {opts.map(([v, l]) => (
          <label key={v} className={'elig__opt' + (r[k] === v ? ' is-on' : '')}>
            <input type="radio" name={'elig-' + k} value={v} checked={r[k] === v} onChange={set(k)} /> {l}
          </label>
        ))}
      </div>
    </fieldset>
  );
  const refugie = r.statut === 'oui' || r.statut === 'nsp';
  const complet = r.age && r.femme && r.statut && (!refugie || r.travail) && r.francais && r.ville;
  // 'ok' : éligible ; 'check' : à vérifier avec l'équipe ; null : non
  const verdict = (conds) => (conds.some((c) => c === false) ? null : conds.some((c) => c === 'nsp') ? 'check' : 'ok');
  const fr = r.francais;
  const res = !complet ? [] : [
    { id: 'des-etoiles-et-des-femmes', nom: 'Des Étoiles et des Femmes', href: '#/projets/des-etoiles-et-des-femmes',
      v: verdict([r.age === 'oui', r.femme === 'oui', fr === 'nsp' ? 'nsp' : (fr === 'b1' || fr === 'b2'), r.ville !== 'autre']) },
    { id: 'tournesol', nom: 'Tournesol', href: '#/parcours/tournesol',
      v: verdict([r.age === 'oui', r.statut === 'nsp' ? 'nsp' : r.statut === 'oui', !refugie ? false : (r.travail === 'nsp' ? 'nsp' : r.travail === 'oui'), fr === 'nsp' ? 'nsp' : fr !== 'a1', r.ville === 'Marseille']) },
  ].filter((x) => x.v);
  const boxRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    if (window.__lenis) window.__lenis.stop();
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => { const f = boxRef.current && boxRef.current.querySelector('input,select,button'); if (f) f.focus(); }, 30);
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab' && boxRef.current) {
        const f = boxRef.current.querySelectorAll('input,select,button:not([disabled]),a[href]');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t); document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = ''; if (window.__lenis) window.__lenis.start();
      if (prev && prev.focus) prev.focus();
    };
  }, [open]);
  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="elig-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="elig-modal__box elig" role="dialog" aria-modal="true" aria-labelledby="elig-t" ref={boxRef}>
        {/* en-tête collant : le titre et la croix restent visibles au défilement */}
        <div className="elig-modal__head">
          <h2 className="elig-modal__t" id="elig-t">Suis-je <em>éligible ?</em></h2>
          <button type="button" className="elig-modal__close" onClick={onClose} aria-label="Fermer">×</button>
        </div>
        <p className="elig-modal__intro">Quelques questions pour savoir si une de nos formations vous est ouverte. Vos réponses restent sur votre écran : rien n'est envoyé.</p>
        <form className="elig__form" onSubmit={(e) => { e.preventDefault(); setVu(true); }}>
          <Q k="age" q="Avez-vous 18 ans ou plus ?" opts={[['oui', 'Oui'], ['non', 'Non']]} />
          <Q k="femme" q="Êtes-vous une femme ?" aide="Le dispositif Des Étoiles et des Femmes s'adresse aux femmes." opts={[['oui', 'Oui'], ['non', 'Non']]} />
          <Q k="statut" q="Avez-vous le statut de réfugié, ou êtes-vous arrivé en France récemment ?" aide="La formation Tournesol s'adresse aux personnes réfugiées ou primo-arrivantes." opts={[['oui', 'Oui'], ['non', 'Non'], ['nsp', 'Je ne sais pas']]} />
          {refugie && <Q k="travail" q="Avez-vous le droit de travailler en France ?" opts={[['oui', 'Oui'], ['non', 'Non'], ['nsp', 'Je ne sais pas']]} />}
          <Q k="francais" q="Quel est votre niveau de français ?" opts={[['a1', 'Je débute'], ['a2', 'Je comprends et je parle avec des phrases simples'], ['b1', 'Je me débrouille dans la plupart des situations'], ['b2', "Je parle avec aisance"], ['nsp', 'Je ne sais pas']]} />
          <div className="elig__q">
            <label className="elig__lbl" htmlFor="elig-ville">Où habitez-vous ?</label>
            <select id="elig-ville" className="elig__select" value={r.ville || ''} onChange={set('ville')}>
              <option value="" disabled>Choisir une ville ou un département</option>
              {villes.map((v) => <option key={v} value={v}>{v}</option>)}
              <option value="autre">Une autre ville</option>
            </select>
          </div>
          <button type="submit" className="btnb btnb--teal" disabled={!complet}>Voir le résultat <span className="arrow" aria-hidden="true">→</span></button>
          {!complet && <p className="elig__aide">Répondez à toutes les questions pour voir le résultat.</p>}
        </form>
        <div className="elig__res" aria-live="polite">
          {vu && complet && (res.length ? (
            <div className="elig__ok">
              <h3>{res.some((x) => x.v === 'ok') ? 'Une formation vous est ouverte.' : 'Une formation peut vous être ouverte.'}</h3>
              <ul>
                {res.map((x) => (
                  <li key={x.id}><a href={x.href}><b>{x.nom}</b></a> {x.v === 'check' ? ': à vérifier avec l\'équipe, selon votre situation.' : ': vous remplissez les conditions.'}</li>
                ))}
              </ul>
              <a className="btnb btnb--gold" href="#/contact/se-former" onClick={onClose}>Nous contacter <span className="arrow" aria-hidden="true">→</span></a>
            </div>
          ) : (
            <div className="elig__non">
              <h3>Nos formations ne correspondent pas à votre situation pour le moment.</h3>
              <p>Votre conseiller France Travail ou votre mission locale peut vous orienter.</p>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

function AccompagnementInsertionPage() {
  const root = useRef(null);
  window.useGReveal(root);
  const D = window.FESTIN_DATA;
  // éligibilité en fenêtre (retour du 06/10/2026) : bouton flottant, bouton du haut, lien du menu (#/insertion/eligibilite)
  const hash = window.useRoute();
  const [elig, setElig] = React.useState(false);
  React.useEffect(() => { if (/\/eligibilite$/.test(hash || '')) setElig(true); }, [hash]);
  const ouvrir = () => setElig(true);
  return (
    <div className="gpage acc" ref={root} data-screen-label="Accompagnement — Insertion">
      <AccHero tone="teal" crumb="L'insertion" kicker="Nos parcours"
        title="Un métier en cuisine," em="et quelqu'un à vos côtés."
        img="images/photo-tabliers-violets.jpg" imgAlt="Des apprenties du dispositif Des Étoiles et des Femmes en cuisine"
        cta={{ label: 'Vérifier mon éligibilité', onClick: ouvrir }} />

      <Eligibilite open={elig} onClose={() => setElig(false)} />
      {!elig && <button type="button" className="elig-fab" onClick={ouvrir}>Vérifier mon éligibilité</button>}

      {/* PRESCRIPTEURS — un bloc court, puis tout le reste s'adresse à la personne
          (RETOURS-AUDIT, question 1 : réponse A) */}
      <section className="g-sec g-sec--cream g-sec--tight ins-presc" id="orienter" aria-labelledby="ins-presc-t">
        <div className="wrap ins-presc__in">
          <div className="ins-presc__txt">
            <h2 className="ins-presc__t" id="ins-presc-t">Vous orientez une personne&nbsp;?</h2>
            <p>Les critères d'entrée de chaque formation sont ci-dessous, dans « Pour qui » et « Pour entrer ».</p>
          </div>
          <a className="btnb btnb--teal ins-presc__cta" href="#/contact/orienter">Orienter une personne <span className="arrow" aria-hidden="true">→</span></a>
        </div>
      </section>

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
                    <window.Picture src={o.img || c.img || (D.projetPages[o.id] || {}).heroImg} alt="" sizes="(max-width: 900px) 100vw, 44vw" />
                    {p.logo && <span className="or-card__logo"><img src={encodeURI(decodeURI(p.logo))} alt="" loading="lazy" /></span>}
                  </div>
                  <div className="or-card__b">
                    <h3 className="or-card__t">{p.shortTitle}</h3>
                    {/* micro-étiquettes (procédé de la page Pros, RETOURS-AUDIT §3.1) */}
                    <window.ArTags tags={o.tags} className="or-card__tags" />
                    <dl>
                      <div><dt>Le parcours</dt><dd>{o.quoi}</dd></div>
                      {/* sans conditions connues (La Table de Cana Marseille, à demander à La Table de Cana) : pas de ligne (08/10/2026) */}
                      {o.conditions && <div><dt>Pour entrer</dt><dd>{o.conditions}</dd></div>}
                    </dl>
                    <div className="or-card__cta">
                      {/* La Table de Cana Marseille : on y postule (emploi en insertion, sans diplôme) */}
                      {o.id === 'la-table-de-cana' && <a className="btnb btnb--gold" href="#/contact/se-former">Postuler <span className="arrow" aria-hidden="true">→</span></a>}
                      {o.id === 'la-table-de-cana' && p.siteUrl && <span className="or-card__ou">ou</span>}
                      {p.siteUrl && <a className="btnb btnb--teal" href={p.siteUrl} target="_blank" rel="noopener noreferrer">Plus d'informations <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (site du projet, nouvel onglet)</span></a>}
                      {/* Tournesol est une formation : sa fiche, pas une page projet (RETOURS-AUDIT, question 4) */}
                      {o.id === 'tournesol'
                        ? <a className="lnk" href="#/parcours/tournesol">La fiche de la formation <span className="arrow" aria-hidden="true">→</span></a>
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
            <h2 className="g-h2 g-reveal" id="ins-bref-t">Quelqu'un à vos côtés, <em>jusqu'à l'emploi.</em></h2>
            <p className="g-lede g-reveal">Chaque parcours vous accompagne jusqu'à l'emploi. Certains préparent un diplôme, avec des stages en restaurant. À La Table de Cana Marseille, vous êtes embauché et vous apprenez en travaillant. Pendant tout le parcours, une personne de l'équipe vous aide pour ce qui peut vous empêcher d'avancer : transport, garde d'enfants, logement, cours de français.</p>
            <window.Preuves lignes={[
              'Nos formations sont <b>gratuites</b>*. À La Table de Cana Marseille et aux Beaux Mets, vous êtes salarié.',
            ]} source="* La formation est prise en charge par France Travail et nos partenaires publics." />
          </div>
          <GalerieAuto images={[
            { src: 'images/images-def/_DEF_ATELIERPATISSERIEF_namarante_04122024_00000-40.jpg', alt: 'Une promotion du dispositif Des Étoiles et des Femmes en tabliers violets, en plein air' },
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
        { q: "La formation est-elle payante ?", a: "Non. Nos formations sont gratuites. À La Table de Cana Marseille, vous êtes embauché : vous êtes salarié pendant votre parcours." },
        { q: "Quand commencent les prochaines sessions ?", a: "Chaque antenne a son propre calendrier. Le site de chaque projet donne les dates des prochaines sessions." },
        { q: "Quel parcours est fait pour moi ?", a: "Des Étoiles et des Femmes accueille des femmes. Tournesol accueille des personnes réfugiées ou primo-arrivantes. La Table de Cana Marseille emploie des salariés en insertion à Marseille. Écrivez-nous : nous vous orientons." },
        { q: "Qui m'aide pendant la formation ?", a: "Une personne de l'équipe vous suit du premier entretien jusqu'à l'emploi : transport, garde d'enfants, logement, cours de français, recherche de poste." },
        { q: "Et après la formation ?", a: "Nous préparons avec vous la recherche de poste et nous vous mettons en relation avec des restaurants qui recrutent." },
      ]} />

      <window.Appel id="ins-appel" title="Vérifier si le parcours" accent="est fait pour vous."
        text="Répondez aux questions : si une formation vous est ouverte, écrivez-nous et nous vous invitons à une réunion d'information."
        cta={{ label: 'Vérifier mon éligibilité', onClick: ouvrir }} />
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
      {/* en-tête « photo nue et cartouche » (HEADERS.md, proposition 3) : cartouche or = professionnels */}
      <window.HeroPage tone="gold" title="Recruter et former," accent="avec Festin."
        img="images/beauxmets-images/LBM_cdutrey_071122-7264.jpg" imgAlt="Un commis des Beaux Mets en cuisine"
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Employeur' }]}>
        <a className="btnb btnb--teal" href="#pros-former" onClick={go('pros-former')}>Former vos équipes <span className="arrow" aria-hidden="true">↓</span></a>
      </window.HeroPage>

      {/* Page harmonisée (07/10/2026, proposition #/lab-pros validée) : une seule grille (titre à gauche, contenu
          à droite), une seule matière de carte (blanc sur crème, crème sur blanc), la couleur réservée au code
          (or = secteur) et aux boutons ; plus de bande or au milieu. S'engager (photo + cartouche or) répond à
          l'en-tête ; le témoignage, sur teal profond, enchaîne sur le pied de page de la même couleur. */}

      {/* 1 · FORMER */}
      <section className="ar-sec ar-sec--cream pl-sec" id="pros-former" aria-labelledby="pros-former-t">
        <div className="wrap ar-split">
          <div className="ar-split__head">
            <h2 className="ar-h2" id="pros-former-t">Former <em>vos équipes.</em></h2>
            <p className="ar-split__p">Deux formations courtes, en présentiel, dans vos murs ou avec d'autres établissements.</p>
            <window.ArTags tags={[['Proposées par', 'le programme Restaure'], ['Format', 'Inter ou intra']]} />
            <a className="btnb btnb--gold pl-cta" href="#/contact/former">Demander une formation <span className="arrow" aria-hidden="true">→</span></a>
          </div>
          <ul className="ar-fcards">
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

      {/* 2 · RECRUTER : trois lignes crème, sans teintes (le corail est celui de Nos tables) */}
      <section className="ar-sec ar-sec--white pl-sec" id="pros-recruter" aria-labelledby="pros-rec-t">
        <div className="wrap ar-split">
          <div className="ar-split__head">
            <h2 className="ar-h2" id="pros-rec-t">Recruter <em>une personne formée.</em></h2>
            <p className="ar-split__p">Trois possibilités.</p>
          </div>
          <window.LignesTypees id="pros-rec" items={[
            { tone: 'neutre', title: 'Accueillir un stagiaire',
              text: "Une personne formée par Des Étoiles et des Femmes ou Tournesol rejoint votre brigade, suivie en binôme par un membre de votre équipe.",
              tags: [['Moment', 'Pendant sa formation'], ['Festin', 'En appui tout le stage']],
              link: { label: 'Proposer un stage', href: '#/contact/recruter' } },
            { tone: 'neutre', title: "Le Book de l'emploi",
              text: 'Des commis diplômés de nos parcours, prêts à prendre leur poste.',
              tags: [['Envoi', 'Sur demande']],
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

      {/* 3 · S'ENGAGER : la photo du Grand Festin et un cartouche or, en écho à l'en-tête */}
      <section className="eng-c" id="pros-engager" aria-labelledby="pros-eng-t">
        <window.Picture className="eng-c__photo" src="images/images-def/grand-festin-2025-brigades.jpg" alt="Les brigades du Grand Festin 2025 sur les marches, près du Vieux-Port" sizes="100vw" />
        <div className="eng-c__cart">
          <h2 className="eng-c__t" id="pros-eng-t">S'engager <em>avec Festin.</em></h2>
          <p>Soutenir un projet comme mécène, ou participer au prochain Grand Festin : en 2025, plus de 600 convives, 14 brigades et plus de 100 bénévoles.</p>
          <div className="eng-c__act">
            <a className="btnb btnb--teal" href="#/contact/partenariat">Devenir partenaire Festin <span className="arrow" aria-hidden="true">→</span></a>
            <a className="lnk" href="#/contact/mecenat">Devenir mécène <span className="arrow" aria-hidden="true">→</span></a>
            <a className="lnk" href="https://www.mouvement-restaure.com" target="_blank" rel="noopener noreferrer">Rejoindre Restaure <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>
          </div>
        </div>
      </section>

      {/* 4 · TÉMOIGNAGE : teal profond, même grille, enchaîné au pied de page */}
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
    </div>
  );
}

window.AccompagnementInsertionPage = AccompagnementInsertionPage;
window.AccompagnementProsPage = AccompagnementProsPage;
})();
