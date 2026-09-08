// ProjetDef.jsx — page projet dédiée « Des Étoiles et des Femmes »
// Contenu : window.FESTIN_DATA.projets (id des-etoiles-et-des-femmes) + .formations + .presse + .donation
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

  useEffect(() => {
    const root = rootRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (window.lucide) window.lucide.createIcons();
    if (reduce || !window.gsap || !window.ScrollTrigger) {
      root.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
      return;
    }
    const ST = window.ScrollTrigger;
    window.gsap.registerPlugin(ST);
    const triggers = [];
    root.querySelectorAll('.reveal').forEach(el => {
      triggers.push(ST.create({ trigger: el, start: 'top 86%', once: true, onEnter: () => el.classList.add('is-in') }));
    });
    ST.refresh();
    return () => triggers.forEach(t => t.kill());
  }, []);

  if (!p) return null;
  const presse = (D.presse || []).filter(a => (p.presseFilter || []).some(f => a.dispositif && a.dispositif.indexOf(f) === 0));
  const presseTop = presse.filter(a => /TV/i.test(a.type || ''));
  const presseRest = presse.filter(a => !/TV/i.test(a.type || ''));
  const cur = p.parcours[step];

  return (
    <div className="pageProjetDef" ref={rootRef} data-screen-label={"Projet — " + p.shortTitle}>

      {/* 1 — HERO */}
      <header className="pdef-hero">
        <div className="pdef-hero__media"><img src={PIMG(p.heroImages[0])} alt="Atelier de cuisine, promotion Des Étoiles et des Femmes" /></div>
        <div className="pdef-hero__scrim"></div>
        <div className="wrap pdef-hero__inner">
          <nav className="pdef-crumb" aria-label="Fil d'ariane">
            <a href="#/">Accueil</a><span>/</span>
            <a href="#/projets/des-etoiles-et-des-femmes">Nos projets</a><span>/</span>
            <span aria-current="page">Des Étoiles et des Femmes</span>
          </nav>
          <span className="eyb pdef-hero__eb">Programme national · depuis 2015</span>
          <h1 className="pdef-hero__t">{p.title} <em>{p.accent}</em></h1>
          <p className="pdef-hero__sub">{p.projetPhrase}</p>
          <p className="pdef-hero__god"><i data-lucide="star" aria-hidden="true" /> {p.godmother.role} — {p.godmother.name}</p>
          <div className="pdef-hero__cta">
            <a className="btnb btnb--gold" href={p.candidater.applyHref} target="_blank" rel="noopener noreferrer">Candidater <span className="arrow">→</span></a>
            <a className="btnb btnb--ghost" href={p.siteUrl} target="_blank" rel="noopener noreferrer">{p.siteName}</a>
          </div>
        </div>
      </header>

      {/* 2 — CHIFFRES */}
      <section className="pdef-stats">
        <div className="wrap">
          <div className="pdef-stats__grid">
            {p.stats.map((s, i) => (
              <div key={i} className={"pdef-stat reveal" + (i === 2 || i === 3 ? " pdef-stat--big" : "")}>
                <div className="pdef-stat__n">{s.value}{s.unit && <sup>{s.unit}</sup>}</div>
                <div className="pdef-stat__l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — LE PARCOURS EN 4 ÉTAPES (onglets) */}
      <section className="pdef-parcours">
        <div className="wrap">
          <span className="eyb reveal">Le parcours</span>
          <h2 className="pdef-h2 reveal">De la première découpe<br/>au premier contrat</h2>
          <div className="pdef-tabs" role="tablist" aria-label="Les étapes du parcours">
            {p.parcours.map((s, i) => (
              <button key={i} type="button" role="tab" id={"pdtab-" + i} aria-selected={step === i}
                      aria-controls={"pdpanel-" + i} tabIndex={step === i ? 0 : -1}
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
                      }}>
                <b>{String(i + 1).padStart(2, '0')}</b> {s.tab}
              </button>
            ))}
          </div>
          <div className="pdef-panel" id={"pdpanel-" + step} role="tabpanel" aria-labelledby={"pdtab-" + step} key={step}>
            <div className="pdef-panel__img"><img src={PIMG(cur.img)} alt="" /></div>
            <div className="pdef-panel__body">
              <span className="pdef-panel__k">Étape {String(step + 1).padStart(2, '0')}</span>
              <h3>{cur.title}</h3>
              <p>{cur.text}</p>
              <div className="pdef-panel__stat"><strong>{cur.stat}</strong> {cur.statL}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — CANDIDATER (cible n°1) */}
      <section className="pdef-apply" id="candidater">
        <div className="wrap pdef-apply__grid">
          <div className="reveal">
            <span className="eyb">Vous voulez vous former</span>
            <h2 className="pdef-h2">Candidater à<br/>une promotion</h2>
          </div>
          <div className="pdef-apply__list reveal">
            <div className="pdef-apply__row"><h4>Suis-je concernée&nbsp;?</h4><p>{p.candidater.eligibility}</p></div>
            <div className="pdef-apply__row"><h4>Où&nbsp;?</h4><p>13 antennes en France. {p.candidater.antennes}</p></div>
            <div className="pdef-apply__row"><h4>Prochaines sessions</h4><p>{p.candidater.sessions}</p></div>
            <div className="pdef-apply__row"><h4>Combien ça coûte&nbsp;?</h4><p>{p.candidater.cost}</p></div>
            <a className="btnb btnb--gold pdef-apply__btn" href={p.candidater.applyHref} target="_blank" rel="noopener noreferrer">
              {p.candidater.applyLabel} <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5 — PORTRAITS */}
      <section className="pdef-portraits">
        <div className="wrap">
          <span className="eyb reveal">Elles l'ont fait</span>
          <h2 className="pdef-h2 reveal">Des parcours, des visages</h2>
          <div className="pdef-portraits__grid">
            {p.temoignages.map((t, i) => (
              t.placeholder ? (
                <figure key={i} className="pdef-portrait pdef-portrait--ph reveal">
                  <div className="pdef-portrait__img">[XX — portrait]</div>
                  <figcaption><p>[Témoignage à recueillir]</p><cite>{t.role}</cite></figcaption>
                </figure>
              ) : (
                <figure key={i} className="pdef-portrait pdef-portrait--lg reveal">
                  <div className="pdef-portrait__img">[XX — portrait de {t.prenom}]</div>
                  <figcaption><p>« {t.citation} »</p><cite>{t.prenom} — {t.role}</cite></figcaption>
                </figure>
              )
            ))}
            <figure className="pdef-portrait pdef-portrait--ph reveal">
              <div className="pdef-portrait__img">[XX — portrait de {p.godmother.name}]</div>
              <figcaption><p>[Citation de la marraine à recueillir]</p><cite>{p.godmother.name} — {p.godmother.role}</cite></figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 6 — ACCUEILLIR UNE STAGIAIRE (restaurateurs) */}
      <section className="pdef-accueil">
        <div className="wrap pdef-accueil__grid">
          <div className="pdef-accueil__img reveal"><img src={PIMG(p.accueil.img)} alt="Brigade en cuisine professionnelle" /></div>
          <div className="pdef-accueil__body reveal">
            <span className="eyb">Vous dirigez un restaurant</span>
            <h2 className="pdef-h2">{p.accueil.title}</h2>
            <p>{p.accueil.text}</p>
            <div className="pdef-panel__stat"><strong>{p.accueil.stat}</strong> {p.accueil.statL}</div>
            <a className="btnb btnb--gold" href={p.accueil.ctaHref}>{p.accueil.ctaLabel} <span className="arrow">→</span></a>
          </div>
        </div>
      </section>

      {/* 7 — LE GRAND FESTIN */}
      <section className="pdef-gf">
        <div className="wrap">
          <span className="eyb reveal">{p.grandFestin.eyebrow}</span>
          <h2 className="pdef-h2 reveal">{p.grandFestin.title}</h2>
          <p className="pdef-gf__lede reveal">{p.grandFestin.text}</p>
          <div className="pdef-gf__stats reveal">
            {p.grandFestin.stats.map((s, i) => (
              <div key={i} className="pdef-gf__stat"><span>{s.value}{s.unit || ''}</span> {s.label}</div>
            ))}
          </div>
          <div className="pdef-gf__media reveal">
            {p.mediaType === 'youtube' && p.mediaId && (
              <iframe title="Vidéo Des Étoiles et des Femmes" src={"https://www.youtube.com/embed/" + p.mediaId}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            )}
          </div>
        </div>
      </section>

      {/* 8 — SOUTENIR */}
      <section className="pdef-support">
        <div className="wrap pdef-support__inner reveal">
          <div>
            <span className="eyb">Partenaires &amp; financeurs</span>
            <h2 className="pdef-h2">{p.soutenir.title}</h2>
            <p>{p.soutenir.text}</p>
          </div>
          <div className="pdef-support__cta">
            <a className="btnb btnb--gold" href={D.donation} target="_blank" rel="noopener noreferrer"><i data-lucide="heart" aria-hidden="true" /> {p.soutenir.donLabel}</a>
            <a className="btnb btnb--ghost" href={p.soutenir.contactHref}>{p.soutenir.contactLabel}</a>
          </div>
        </div>
      </section>

      {/* 9 — PRESSE */}
      {presse.length > 0 && (
        <section className="pdef-presse">
          <div className="wrap">
            <span className="eyb reveal">Dans la presse</span>
            {presseTop.length > 0 && (
              <div className="pdef-presse__top">
                {presseTop.map((a, i) => (
                  <a key={i} className="pdef-presse__hi reveal" href={a.href} target="_blank" rel="noopener noreferrer">
                    <span className="pdef-presse__src">{a.source}</span>
                    <span className="pdef-presse__title">{a.title}</span>
                    <span className="pdef-presse__meta">{a.type} · {pdefMonth(a.date)}</span>
                  </a>
                ))}
              </div>
            )}
            <ul className="pdef-presse__list reveal">
              {presseRest.map((a, i) => (
                <li key={i}>
                  <a href={a.href} target="_blank" rel="noopener noreferrer">
                    <span className="pdef-presse__d">{pdefMonth(a.date)}</span>
                    <span className="pdef-presse__s">{a.source}</span>
                    <span className="pdef-presse__t">{a.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

    </div>
  );
}

window.ProjetDefPage = ProjetDefPage;
