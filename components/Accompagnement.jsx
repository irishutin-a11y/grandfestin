// Accompagnement.jsx — pages « Insertion » (#/accompagnement/insertion) et
// « Acteurs du secteur » (#/accompagnement/professionnels).
// Refonte du 23/09/2026 sur le modèle de la page Association (About.jsx) :
// mêmes classes ab-* (styles/about.css), hero plein cadre, split à photo
// débordante, chiffres en couleur, frise épinglée, cartes en éventail, bloc
// « s'engager » sur photo. Compléments : styles/about.css, section « acc- ».
// Les textes sont ceux des anciennes pages (Pages.jsx) : le chantier
// copywriting les reprend ici.
(function () {
const { useRef, useEffect } = React;

const RM = () => window.matchMedia('(prefers-reduced-motion:reduce)').matches;

function Title({ children, em, level = 2, className = '' }) {
  const Tag = 'h' + level;
  return <Tag className={'ab-title ' + className}>{children}{em && <> <em>{em}</em></>}</Tag>;
}

// Apparitions + recalcul des déclencheurs une fois la page montée
function useReveal(root) {
  useEffect(() => {
    const els = root.current.querySelectorAll('.ab-reveal');
    if (RM() || !window.ScrollTrigger) { els.forEach(e => e.classList.add('is-in')); return; }
    const triggers = [...els].map(el => window.ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('is-in') }));
    const refresh = () => window.ScrollTrigger.refresh();
    const t = setTimeout(refresh, 150);
    window.addEventListener('load', refresh);
    return () => { clearTimeout(t); window.removeEventListener('load', refresh); triggers.forEach(tr => tr.kill()); };
  }, []);
}

// ---------- Hero : une photo plein cadre, dézoom à l'entrée, parallaxe ----------
function AccHero({ img, eyebrow, title, em, lede, crumb }) {
  const root = useRef(null);
  useEffect(() => {
    if (RM() || !window.gsap) return;
    const { gsap } = window;
    const ctx = gsap.context(() => {
      gsap.from('.ab-hero__bg img', { scale: 1.14, duration: 1.8, ease: 'expo.out' });
      gsap.from('.ab-hero__inner > *', { y: 36, opacity: 0, duration: 1, ease: 'expo.out', stagger: .1, delay: .15 });
      gsap.to('.ab-hero__bg', { yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="ab-hero on-dark" ref={root}>
      <div className="ab-hero__bg" aria-hidden="true">
        <window.Picture src={img} alt="" sizes="100vw" loading="eager" />
      </div>
      <div className="container ab-hero__inner">
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
          <a href="#/">Accueil</a><span className="breadcrumb__sep">/</span><span>Accompagnement</span><span className="breadcrumb__sep">/</span><span>{crumb}</span>
        </nav>
        <span className="ab-eyebrow ab-eyebrow--gold">{eyebrow}</span>
        <h1 className="ab-title ab-title--hero">{title} <em>{em}</em></h1>
        {lede && <p className="ab-lede">{lede}</p>}
      </div>
    </section>
  );
}

// ---------- Split : texte + photo débordante ----------
function AccSplit({ tone = 'cream', eyebrow, title, em, children, img, alt = '', flip }) {
  return (
    <section className={'ab-sec ab-sec--' + tone}>
      <div className={'container ab-split' + (flip ? ' acc-split--flip' : '')}>
        <div className="ab-split__txt ab-reveal">
          <span className="ab-eyebrow">{eyebrow}</span>
          <Title em={em}>{title}</Title>
          {children}
        </div>
        <figure className="ab-split__photo ab-reveal">
          <window.Picture src={img} alt={alt} sizes="(max-width: 899px) 100vw, 60vw" />
        </figure>
      </div>
    </section>
  );
}

// ---------- Chiffres : une couleur par chiffre, compteur ----------
function AccChiffres({ items }) {
  const root = useRef(null);
  const colors = ['var(--teal)', 'var(--coral)', 'var(--violet)', 'var(--gold-ink)'];
  useEffect(() => {
    if (RM() || !window.gsap) return;
    const { gsap } = window;
    const ctx = gsap.context(() => {
      root.current.querySelectorAll('[data-count]').forEach(el => {
        const end = parseFloat(el.dataset.count), o = { v: 0 };
        el.textContent = '0';
        gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v); },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="ab-sec ab-sec--white" ref={root}>
      <div className="container">
        <ul className="ab-stats">
          {items.map((s, i) => (
            <li key={i} className="ab-stat">
              <div className="ab-stat__v" style={{ color: colors[i % 4] }}>
                <span data-count={s.value}>{s.value}</span><span className="ab-stat__u">{s.unit}</span>
              </div>
              <div className="ab-stat__l">{s.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Frise épinglée (desktop) / verticale (mobile), comme « Notre histoire » ----------
function AccFrise({ word, eyebrow, title, em, lede, items }) {
  const root = useRef(null), track = useRef(null), wordRef = useRef(null);
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap } = window;
    const mm = gsap.matchMedia();
    mm.add('(min-width:900px) and (prefers-reduced-motion:no-preference)', () => {
      const el = root.current;
      el.classList.add('is-pinned');
      const dist = () => Math.max(0, track.current.scrollWidth - window.innerWidth + 48);
      gsap.to(track.current, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: .6, anticipatePin: 1, invalidateOnRefresh: true } });
      gsap.to(wordRef.current, { x: () => -dist() * .35, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: () => '+=' + dist(), scrub: true, invalidateOnRefresh: true } });
      return () => el.classList.remove('is-pinned');
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="ab-hist ab-sec--dark acc-frise" ref={root}>
      <div className="ab-hist__word" ref={wordRef} aria-hidden="true">{word}</div>
      <div className="container ab-hist__head">
        <span className="ab-eyebrow ab-eyebrow--gold">{eyebrow}</span>
        <Title em={em}>{title}</Title>
        {lede && <p className="acc-frise__lede">{lede}</p>}
      </div>
      <div className="ab-hist__viewport">
        <ol className="ab-hist__track" ref={track}>
          {items.map((j, i) => (
            <li key={i} className={'ab-jalon acc-jalon' + (j.dark ? ' is-dark-text' : '')} style={{ background: j.color }}>
              <span className="ab-jalon__year">{j.year}</span>
              <div className="ab-jalon__body">
                <h3>{j.title}</h3>
                <p>{j.desc}</p>
              </div>
              {j.photo && <span className="ab-jalon__img"><window.Picture src={j.photo} alt="" sizes="(max-width: 899px) 60vw, 30vw" /></span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------- Cartes en éventail qui se rangent au défilement, comme « Nos valeurs » ----------
function AccEventail({ eyebrow, title, em, items }) {
  const root = useRef(null);
  const rest = [-2.5, 1.5, -1.5];
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap } = window;
    const mm = gsap.matchMedia();
    mm.add('(min-width:900px) and (prefers-reduced-motion:no-preference)', () => {
      const cards = gsap.utils.toArray('.ab-val', root.current);
      cards.forEach((c, i) => {
        gsap.fromTo(c,
          { x: () => -(c.offsetLeft - cards[0].offsetLeft) + i * 18, y: i * 14, rotation: [-6, 4, -3][i % 3] * 1.4, scale: .96 },
          { x: 0, y: 0, rotation: rest[i % 3], scale: 1, ease: 'none', immediateRender: true,
            scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'top 20%', scrub: .5, invalidateOnRefresh: true } });
      });
    });
    mm.add('(max-width:899px), (prefers-reduced-motion:reduce)', () => {
      gsap.utils.toArray('.ab-val', root.current).forEach((c, i) => gsap.set(c, { rotation: rest[i % 3] }));
    });
    return () => mm.revert();
  }, []);
  return (
    <section className="ab-sec ab-sec--white" ref={root}>
      <div className="container">
        <div className="ab-head">
          <span className="ab-eyebrow">{eyebrow}</span>
          <Title em={em}>{title}</Title>
        </div>
        <div className="ab-vals">
          {items.map((v, i) => (
            <article key={i} className={'ab-val' + (v.dark ? ' is-dark-text' : '')} style={{ background: v.color, zIndex: 3 - i }}>
              <span className="ab-val__n">0{i + 1}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Cartes photo des parcours (lien vers chaque page projet) ----------
function AccParcours({ eyebrow, title, em, projets }) {
  const cards = (window.FESTIN_DATA.home && window.FESTIN_DATA.home.eco && window.FESTIN_DATA.home.eco.cards) || [];
  const colors = ['var(--teal)', 'var(--coral)', 'var(--violet)', 'var(--teal-dark)'];
  return (
    <section className="ab-sec ab-sec--cream">
      <div className="container">
        <div className="ab-head">
          <span className="ab-eyebrow">{eyebrow}</span>
          <Title em={em}>{title}</Title>
        </div>
        <ul className="acc-parcours">
          {projets.map((p, i) => {
            const c = cards.find(x => x.id === p.id) || {};
            return (
              <li key={p.id} className="ab-reveal" style={{ transitionDelay: (i * 80) + 'ms' }}>
                <a className="acc-parc" href={'#/projets/' + p.id} style={{ '--pc': colors[i % 4] }}>
                  <span className="acc-parc__img">{c.img && <window.Picture src={c.img} alt="" sizes="(max-width: 899px) 100vw, 25vw" />}</span>
                  <span className="acc-parc__body">
                    <span className="acc-parc__eyb">{p.eyebrow}</span>
                    <span className="acc-parc__t">{p.shortTitle}</span>
                    <span className="acc-parc__tag">{p.tagline}</span>
                    <span className="acc-parc__d">{p.short}</span>
                    <span className="acc-parc__cta">Découvrir <span aria-hidden="true">→</span></span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

// ---------- Étapes numérotées reliées par un filet qui se trace au défilement ----------
function AccEtapes({ tone = 'cream', eyebrow, title, em, lede, steps }) {
  const root = useRef(null);
  useEffect(() => {
    if (RM() || !window.gsap || !window.ScrollTrigger) return;
    const { gsap } = window;
    const ctx = gsap.context(() => {
      const v = window.matchMedia('(max-width:760px)').matches; // filet vertical sur mobile
      gsap.fromTo('.acc-steps__line', v ? { scaleY: 0 } : { scaleX: 0 }, { ...(v ? { scaleY: 1 } : { scaleX: 1 }), ease: 'none',
        scrollTrigger: { trigger: '.acc-steps', start: 'top 75%', end: 'bottom 55%', scrub: .5 } });
      gsap.from('.acc-step', { y: 40, opacity: 0, duration: .9, ease: 'expo.out', stagger: .15,
        scrollTrigger: { trigger: '.acc-steps', start: 'top 80%', once: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className={'ab-sec ab-sec--' + tone} ref={root}>
      <div className="container">
        <div className="ab-head">
          <span className="ab-eyebrow">{eyebrow}</span>
          <Title em={em}>{title}</Title>
          {lede && <p className="ab-body">{lede}</p>}
        </div>
        <ol className="acc-steps">
          <span className="acc-steps__line" aria-hidden="true" />
          {steps.map((s) => (
            <li key={s.n} className="acc-step">
              <span className="acc-step__n">{s.n}</span>
              <span className="acc-step__when">{s.when}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------- Appel final sur photo, comme « S'engager » ----------
function AccEngage({ img, eyebrow, title, em, text, cta, href }) {
  return (
    <section className="ab-engage on-dark">
      <window.Picture imgClassName="ab-engage__bg" src={img} alt="" sizes="100vw" />
      <div className="ab-engage__veil" />
      <div className="container ab-engage__in">
        <span className="ab-eyebrow ab-eyebrow--gold">{eyebrow}</span>
        <Title em={em} className="ab-title--xl">{title}</Title>
        <p className="acc-engage__p">{text}</p>
        <a href={href} className="btn btn--gold">{cta} <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}

// =====================================================================
// PAGE INSERTION
// =====================================================================
function AccompagnementInsertionPage() {
  const root = useRef(null);
  useReveal(root);
  const D = window.FESTIN_DATA;
  const projets = D.projets.filter(p => ['des-etoiles-et-des-femmes', 'tournesol', 'les-beaux-mets', 'la-table-de-cana'].includes(p.id));
  const chiffres = D.stats.slice(0, 4).map(s => ({ value: s.value, unit: s.unit === '%' ? ' %' : s.unit, label: s.label }));
  const pal = [
    { color: 'var(--teal)' }, { color: 'var(--coral)' }, { color: 'var(--gold)', dark: true }, { color: 'var(--violet)' },
    { color: 'var(--teal-secondary)' }, { color: 'var(--cream)', dark: true }, { color: 'var(--gold-secondary)', dark: true },
  ];
  const calendrier = [
    { year: 'Septembre', title: "Recrutement et atelier de préparation", desc: "Entretiens, puis un atelier collectif pour préparer la rencontre avec les restaurants." },
    { year: 'Octobre',   title: "Rencontre avec les restaurants", desc: "Immersion courte dans un restaurant pour valider le projet, puis mise en relation avec l'établissement qui vous accueillera." },
    { year: 'Novembre — décembre', title: "Entrée en formation", desc: "Les deux promotions démarrent, et le suivi individuel commence. En 2026 : le 9 novembre pour Des Étoiles et des Femmes, le 30 novembre pour Tournesol." },
    { year: 'Janvier — mars', title: "Formation, stages et suivi", desc: "Alternance entre les cours, les stages en brigade et les rendez-vous de suivi." },
    { year: 'Avril',     title: "Examens et sortie de formation", desc: "Passage du diplôme, puis fin de la formation pour les deux promotions." },
    { year: 'Mai — juin', title: "Accompagnement vers l'emploi", desc: "Recherche de poste, mise en relation avec les restaurants, et préparation des promotions suivantes." },
  ].map((e, i) => ({ ...e, ...pal[i] }));

  return (
    <div className="about acc" ref={root} data-screen-label="Accompagnement — Insertion">
      <AccHero img="images/photo-tabliers-violets.jpg" crumb="Insertion"
        eyebrow="Vous cherchez un métier" title="Apprendre un métier de cuisine," em="gratuitement"
        lede="Vous préparez un diplôme reconnu, vous faites vos stages en restaurant, et une personne de l'équipe vous suit jusqu'à l'emploi." />

      <AccSplit tone="cream" eyebrow="Notre approche" title="Un diplôme, et quelqu'un" em="à vos côtés"
        img="images/photo-apprenante-plats.jpg">
        <p className="ab-body">Chaque parcours prépare un diplôme reconnu et comprend des stages en restaurant. Pendant toute la formation, une personne de l'équipe vous aide pour ce qui peut vous empêcher d'avancer : transport, garde d'enfants, logement, cours de français. Nos parcours accueillent des femmes, des personnes réfugiées ou primo-arrivantes, et des personnes détenues ou sorties de détention.</p>
        <p className="ab-body acc-note">Tous nos parcours sont gratuits. Selon votre situation, vous pouvez percevoir une indemnité ou une rémunération pendant la formation.</p>
      </AccSplit>

      <AccChiffres items={chiffres} />

      <AccParcours eyebrow="Nos parcours d'insertion" title="Le parcours qui vous" em="correspond" projets={projets} />

      <AccFrise word="PROMOTION" eyebrow="Une année, mois par mois" title="Comment se déroule" em="une promotion"
        lede="Voici le déroulé d'une année, du premier entretien jusqu'à l'emploi. Les dates exactes changent d'une session à l'autre."
        items={calendrier} />

      <AccEngage img="images/photo-promo-groupe.jpg" eyebrow="Candidater à une promotion"
        title="Vérifier si le parcours" em="est fait pour vous"
        text="Écrivez-nous : nous vérifions ensemble votre éligibilité, puis nous vous invitons à une réunion d'information. Prochaines sessions : Des Étoiles et des Femmes (titre à finalité professionnelle), du 9 novembre 2026 au 13 avril 2027. Tournesol, du 30 novembre 2026 au 22 avril 2027."
        cta="Vérifier mon éligibilité" href="#/contact" />
    </div>
  );
}

// =====================================================================
// PAGE ACTEURS DU SECTEUR (restaurateurs, traiteurs, établissements…)
// =====================================================================
function AccompagnementProsPage() {
  const root = useRef(null);
  useReveal(root);
  const D = window.FESTIN_DATA;
  const formationsPros = D.formations.filter(f => ['vss', 'management'].includes(f.id));
  const FCL = window.FormationCardLink;
  return (
    <div className="about acc" ref={root} data-screen-label="Accompagnement — Professionnels">
      <AccHero img="images/beauxmets-images/LBM_cdutrey_071122-7264.jpg" crumb="Professionnels"
        eyebrow="Vous êtes restaurateur" title="Recruter des commis formés," em="avec Festin"
        lede="Nous vous présentons des candidats formés dans nos parcours, et leur préparation à l'emploi peut être financée par France Travail. Nous formons aussi vos équipes contre les violences en cuisine et au management." />

      <AccEventail eyebrow="Nos partenariats" title="Ce que nous faisons" em="avec vous"
        items={[
          { color: 'var(--teal)', title: 'Accueillir un stagiaire',
            desc: "Une personne formée par Des Étoiles et des Femmes ou Tournesol rejoint votre brigade. Un membre de votre équipe la suit en binôme, et Festin reste en appui pendant tout le stage. Si la rencontre fonctionne, vous recrutez." },
          { color: 'var(--coral)', title: 'Prévenir les violences',
            desc: "Une formation de trois heures ou d'une journée, pensée pour la cuisine et la salle : le cadre légal, des cas tirés de situations réelles, et un protocole de signalement à mettre en place." },
          { color: 'var(--gold)', dark: true, title: 'Manager juste',
            desc: "Deux jours pour apprendre à garder une équipe : posture de manager, recrutement, droit à l'erreur. Vous repartez avec un plan d'action pour votre établissement." },
        ]} />

      <AccEtapes tone="cream" eyebrow="Recruter avec France Travail" title="Accueillir un candidat," em="étape par étape"
        lede="La préparation opérationnelle à l'emploi individuelle (POEI) est financée par France Travail. Elle permet de recruter une personne formée à votre cuisine. Festin facilite les démarches."
        steps={[
          { n: '1', when: 'Automne 2026', t: 'Des candidats présentés', d: "Nous présentons des candidats qui correspondent à vos besoins. Des journées d'immersion en cuisine valident le profil." },
          { n: '2', when: 'Janvier et mars 2027', t: 'Deux stages chez vous', d: 'Deux semaines en janvier, trois semaines en mars, dans votre établissement.' },
          { n: '3', when: "À partir d'avril 2027", t: 'Une prise de poste', d: "Si l'expérience est concluante : un CDD de quatre mois minimum." },
        ]} />

      <section className="ab-sec ab-sec--white">
        <div className="container">
          <div className="ab-head">
            <span className="ab-eyebrow">Catalogue de formations</span>
            <Title em="vos équipes">Des formations pour</Title>
            <p className="ab-body">Inter ou intra, en présentiel, par l'Académie Festin, organisme de formation certifié Qualiopi. Prise en charge OPCO possible.</p>
          </div>
          <div className="formations__grid">
            {FCL && formationsPros.map((f) => <FCL key={f.id} f={f} noPrice />)}
          </div>
          <div className="acc-center">
            <a href={D.catalogPdf} target="_blank" rel="noopener" className="btn btn--ghost">Télécharger le catalogue complet (PDF)</a>
          </div>
        </div>
      </section>

      <AccSplit tone="cream" eyebrow="Au-delà des formations" title="Rejoindre" em="le programme Restaure"
        img="images/restaure : formation pro/Lancement_Restaure_Photo.CarolineDutrey (1).jpg" alt="Soirée de lancement du programme Restaure">
        <p className="ab-body">Restaure réunit 35 structures et 700 signataires de son manifeste contre les violences en cuisine. Vous pouvez signer le manifeste, rejoindre un groupe de travail ou venir aux tables rondes. Aux Toast, des apéros organisés avec La Communauté Ecotable, des restaurateurs racontent ce qu'ils ont changé chez eux.</p>
        <a href="#/projets/restaure" className="btn btn--teal acc-btn">Découvrir Restaure <span aria-hidden="true">→</span></a>
        <p className="acc-credit">Photo : Caroline Dutrey</p>
      </AccSplit>

      <AccEngage img="images/photo-service-restaurant.jpg" eyebrow="Nous contacter"
        title="Recevoir le" em="Book de l'emploi"
        text="Le chef Davin, de l'Intercontinental Marseille, a accueilli dans son équipe un commis formé aux Beaux Mets : « Sami s'est très vite intégré à l'équipe. » Le Book de l'emploi présente les personnes diplômées de nos parcours qui cherchent un poste. Nous vous l'envoyons sur demande, sous 48 h ouvrées."
        cta="Demander le Book de l'emploi" href="#/contact" />
    </div>
  );
}

window.AccompagnementInsertionPage = AccompagnementInsertionPage;
window.AccompagnementProsPage = AccompagnementProsPage;
})();
