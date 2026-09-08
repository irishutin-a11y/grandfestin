// ProjetDef.jsx — page projet dédiée « Des Étoiles et des Femmes »
// Contenu : window.FESTIN_DATA.projets (id des-etoiles-et-des-femmes) + .presse + .donation
// Retraitement graphique : compositions inégales, 4 registres typo, numérotation
// de section, bande vidéo. Aucun contenu ni chiffre modifié.
const { useEffect, useRef, useState } = React;
const PIMG = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function pdefMonth(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return isNaN(d) ? iso : d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

function ProjetDefPage() {
  const D = window.FESTIN_DATA;
  const p = D.projets.find(x => x.id === 'des-etoiles-et-des-femmes');
  const rootRef = useRef(null);
  const [step, setStep] = useState(0);
  const [videoOn, setVideoOn] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.lucide) window.lucide.createIcons();
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce || !window.gsap || !window.ScrollTrigger) {
      root.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
      return;
    }
    const ST = window.ScrollTrigger;
    window.gsap.registerPlugin(ST);
    const triggers = [];
    root.querySelectorAll('.reveal').forEach(el => {
      triggers.push(ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => el.classList.add('is-in') }));
    });
    ST.refresh();
    return () => triggers.forEach(t => t.kill());
  }, []);

  if (!p) return null;

  // Presse — filtrée sur le dispositif, 1 mise en avant + liste
  const presse = (D.presse || []).filter(a => (p.presseFilter || []).some(f => a.dispositif && a.dispositif.indexOf(f) === 0));
  const presseTV = presse.filter(a => /TV/i.test(a.type || ''));
  const featured = presseTV[0] || presse[0] || null;
  const presseRest = presse.filter(a => a !== featured);

  // Chiffres — le chiffre « 10 ans » est le bloc dominant
  const S = p.stats;
  const domStat = S[3];
  const restStats = [S[0], S[1], S[2]];

  // Portraits — citation réelle dominante + secondaires + puces « à venir »
  const reals = (p.temoignages || []).filter(t => !t.placeholder);
  const domT = reals[0];
  const secT = reals.slice(1);
  const todo = [
    ...(p.temoignages || []).filter(t => t.placeholder).map(t => t.prenom),
    p.godmother && p.godmother.name,
  ].filter(Boolean);

  const cur = p.parcours[step];
  const pad2 = (n) => String(n).padStart(2, '0');

  return (
    <div className="pageProjetDef" ref={rootRef} data-screen-label={"Projet — " + p.shortTitle}>

      {/* 01 — HERO */}
      <header className="pdef-hero">
        <div className="pdef-hero__media">
          <img src={PIMG(p.heroImages[0])} alt="Atelier de cuisine, promotion Des Étoiles et des Femmes" />
        </div>
        <div className="pdef-hero__scrim" aria-hidden="true"></div>
        <div className="wrap pdef-hero__inner">
          <nav className="pdef-crumb" aria-label="Fil d’ariane">
            <a href="#/">Accueil</a><span aria-hidden="true">/</span>
            <a href="#/projets/des-etoiles-et-des-femmes">Nos projets</a><span aria-hidden="true">/</span>
            <span aria-current="page">Des Étoiles et des Femmes</span>
          </nav>
          <span className="pdef-hero__eb">Programme national · depuis 2015</span>
          <h1 className="pdef-hero__t">{p.title} <em>{p.accent}</em></h1>
          <p className="pdef-hero__sub">{p.projetPhrase}</p>
          <div className="pdef-hero__cta">
            <a className="btnb btnb--gold" href={p.candidater.applyHref} target="_blank" rel="noopener noreferrer">
              Candidater <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a className="btnb btnb--ghost" href={p.siteUrl} target="_blank" rel="noopener noreferrer">{p.siteName}</a>
          </div>
          <p className="pdef-hero__credit">Avec <b>{p.godmother.name}</b>, {p.godmother.role.toLowerCase()}</p>
        </div>
      </header>

      {/* 02 — CHIFFRES */}
      <section className="pdef-stats" aria-labelledby="pdef-stats-t">
        <div className="wrap">
          <span className="pdef-sec" id="pdef-stats-t">(Les chiffres — 02)</span>
          <div className="pdef-stats__dom reveal">
            <div className="pdef-stat__n">{domStat.value}{domStat.unit && <sup>{domStat.unit}</sup>}</div>
            <div className="pdef-stat__l">{domStat.label}</div>
          </div>
          <div className="pdef-stats__row">
            {restStats.map((s, i) => (
              <div key={i} className={"pdef-stat reveal pdef-stat--" + ['a', 'b', 'c'][i]}>
                <div className="pdef-stat__n">{s.value}{s.unit && <sup>{s.unit}</sup>}</div>
                <div className="pdef-stat__l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — VIDÉO */}
      <section className="pdef-video" aria-labelledby="pdef-video-t">
        <div className="wrap">
          <span className="pdef-sec" id="pdef-video-t">({p.video.eyebrow} — 03)</span>
          <h2 className="pdef-h2 reveal">{p.video.title}</h2>
          <div className="pdef-video__frame reveal">
            {videoOn ? (
              <iframe
                title={"Vidéo de présentation — " + p.shortTitle}
                src={"https://www.youtube.com/embed/" + p.mediaId + "?autoplay=1"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="pdef-video__play"
                onClick={() => setVideoOn(true)}
                aria-label={"Lire la vidéo de présentation du programme " + p.shortTitle}
              >
                <img src={PIMG(p.video.poster)} alt="" aria-hidden="true" />
                <span className="pdef-video__scrim" aria-hidden="true"></span>
                <span className="pdef-video__cta">Lire la vidéo <span aria-hidden="true">→</span></span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 04 — LE PARCOURS */}
      <section className="pdef-parcours" aria-labelledby="pdef-parcours-t">
        <div className="wrap">
          <span className="pdef-sec" id="pdef-parcours-t">(Le parcours — 04)</span>
          <h2 className="pdef-h2 reveal">De la première découpe<br />au premier contrat</h2>
          <div className="pdef-tabs" role="tablist" aria-label="Les étapes du parcours">
            {p.parcours.map((s, i) => (
              <button
                key={i} type="button" role="tab" id={"pdtab-" + i}
                aria-selected={step === i} aria-controls={"pdpanel-" + i}
                tabIndex={step === i ? 0 : -1}
                className={"pdef-tab" + (step === i ? " on" : "")}
                onClick={() => setStep(i)}
                onKeyDown={(e) => {
                  let n = null;
                  if (e.key === 'ArrowRight') n = (step + 1) % p.parcours.length;
                  if (e.key === 'ArrowLeft') n = (step + p.parcours.length - 1) % p.parcours.length;
                  if (e.key === 'Home') n = 0;
                  if (e.key === 'End') n = p.parcours.length - 1;
                  if (n === null) return;
                  e.preventDefault();
                  setStep(n);
                  const sib = e.currentTarget.parentNode.children[n];
                  if (sib) sib.focus();
                }}
              >
                <b>{pad2(i + 1)}</b> {s.tab}
              </button>
            ))}
          </div>
        </div>
        <div className="pdef-panel" id={"pdpanel-" + step} role="tabpanel" aria-labelledby={"pdtab-" + step} key={step}>
          <div className="pdef-panel__img"><img src={PIMG(cur.img)} alt="" /></div>
          <div className="pdef-panel__body">
            <span className="pdef-panel__num" aria-hidden="true">{pad2(step + 1)}</span>
            <span className="pdef-panel__k">Étape {pad2(step + 1)} · {cur.tab}</span>
            <h3>{cur.title}</h3>
            <p>{cur.text}</p>
            <div className="pdef-panel__stat"><strong>{cur.stat}</strong><span>{cur.statL}</span></div>
          </div>
        </div>
      </section>

      {/* 05 — CANDIDATER */}
      <section className="pdef-apply" id="candidater" aria-labelledby="pdef-apply-t">
        <div className="pdef-apply__grid">
          <div className="pdef-apply__body">
            <span className="pdef-sec pdef-sec--onGold" id="pdef-apply-t">(Candidater — 05)</span>
            <h2 className="pdef-h2 reveal">Candidater à<br />une promotion</h2>
            <div className="pdef-apply__cta reveal">
              <a className="btnb btnb--coral" href={p.candidater.applyHref} target="_blank" rel="noopener noreferrer">
                {p.candidater.applyLabel} <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>
            <div className="pdef-apply__list reveal">
              <div className="pdef-apply__row"><h4>Suis-je concernée&nbsp;?</h4><p>{p.candidater.eligibility}</p></div>
              <div className="pdef-apply__row"><h4>Où&nbsp;?</h4><p>13 antennes en France. {p.candidater.antennes}</p></div>
              <div className="pdef-apply__row"><h4>Prochaines sessions</h4><p>{p.candidater.sessions}</p></div>
              <div className="pdef-apply__row"><h4>Combien ça coûte&nbsp;?</h4><p>{p.candidater.cost}</p></div>
            </div>
          </div>
          <div className="pdef-apply__rail">
            <img src={PIMG(p.candidater.img)} alt="Dressage d’une assiette en cuisine, promotion Des Étoiles et des Femmes" />
          </div>
        </div>
      </section>

      {/* 06 — PORTRAITS */}
      <section className="pdef-portraits" aria-labelledby="pdef-portraits-t">
        <div className="wrap">
          <span className="pdef-sec" id="pdef-portraits-t">(Elles l’ont fait — 06)</span>
          <h2 className="pdef-h2 reveal">Des parcours,<br />des visages</h2>
          <div className="pdef-portraits__grid">
            {domT && (
              <figure className="pdef-quote--dom reveal">
                <p>« {domT.citation} »</p>
                <cite>{domT.prenom} — {domT.role}</cite>
              </figure>
            )}
            <div className="pdef-portraits__side">
              {secT.map((t, i) => (
                <figure key={i} className="pdef-quote--sec reveal">
                  <p>« {t.citation} »</p>
                  <cite>{t.prenom} — {t.role}</cite>
                </figure>
              ))}
            </div>
          </div>
          {todo.length > 0 && (
            <div className="pdef-portraits__todo reveal">
              {todo.map((n, i) => <span key={i} className="pdef-chip">Portrait à venir — {n}</span>)}
            </div>
          )}
        </div>
      </section>

      {/* 07 — ACCUEILLIR */}
      <section className="pdef-accueil" aria-labelledby="pdef-accueil-t">
        <div className="pdef-accueil__grid">
          <div className="pdef-accueil__img">
            <img src={PIMG(p.accueil.img)} alt="Brigade en cuisine professionnelle, restaurant partenaire" />
          </div>
          <div className="pdef-accueil__body">
            <span className="pdef-sec" id="pdef-accueil-t">(Accueillir — 07)</span>
            <h2 className="pdef-h2 reveal">{p.accueil.title}</h2>
            <p className="reveal">{p.accueil.text}</p>
            <div className="pdef-cartouche reveal"><strong>{p.accueil.stat}</strong><span>{p.accueil.statL}</span></div>
            <a className="btnb btnb--gold reveal" href={p.accueil.ctaHref}>
              {p.accueil.ctaLabel} <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 08 — SOUTENIR */}
      <section className="pdef-support" aria-labelledby="pdef-support-t">
        <div className="wrap pdef-support__inner reveal">
          <div>
            <span className="pdef-sec" id="pdef-support-t">(Soutenir — 08)</span>
            <h2 className="pdef-h2">{p.soutenir.title}</h2>
            <p>{p.soutenir.text}</p>
          </div>
          <div className="pdef-support__cta">
            <a className="btnb btnb--gold" href={D.donation} target="_blank" rel="noopener noreferrer">{p.soutenir.donLabel}</a>
            <a className="btnb btnb--ghost" href={p.soutenir.contactHref}>{p.soutenir.contactLabel}</a>
          </div>
        </div>
      </section>

      {/* 09 — PRESSE */}
      {presse.length > 0 && (
        <section className="pdef-presse" aria-labelledby="pdef-presse-t">
          <div className="wrap">
            <span className="pdef-sec" id="pdef-presse-t">(Presse — 09)</span>
            {featured && (
              <a className="pdef-presse__hi reveal" href={featured.href} target="_blank" rel="noopener noreferrer">
                <span className="src">{featured.source}</span>
                <span className="ttl">{featured.title}</span>
                <span className="meta">{featured.type} · {pdefMonth(featured.date)}</span>
              </a>
            )}
            {presseRest.length > 0 && (
              <ul className="pdef-presse__list reveal">
                {presseRest.map((a, i) => (
                  <li key={i}>
                    <a href={a.href} target="_blank" rel="noopener noreferrer">
                      <span className="d">{pdefMonth(a.date)}</span>
                      <span className="s">{a.source}</span>
                      <span className="t">{a.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

    </div>
  );
}

window.ProjetDefPage = ProjetDefPage;
