// HomeB.jsx — accueil, refonte du 24/09/2026 (DIRECTION-ACCUEIL.md).
// Contenu : window.FESTIN_DATA.home (.hero .confiance .missions .frise .preuve
// .portes .quotes) + .projets + .presse + .about.chefs. Animations GSAP/ScrollTrigger.
// Toutes les instances GSAP sont détruites au démontage (changement de route).
const { useEffect, useRef } = React;
// encode les espaces/accents des chemins d'images, sans re-encoder ceux déjà encodés
const IMG = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function HomeB() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const gsap = window.gsap, ST = window.ScrollTrigger;
    const reduce = window.FESTIN_RM ? window.FESTIN_RM() : false;
    // Preuves : chaque mot devient un <span> pour être révélé au défilement
    const splitWords = (el) => {
      if (el.dataset.split === '1') return;
      const walk = (node) => {
        [...node.childNodes].forEach((c) => {
          if (c.nodeType === 3) {
            const frag = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach((w) => {
              if (!w) return;
              if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
              const sp = document.createElement('span'); sp.className = 'w'; sp.textContent = w; frag.appendChild(sp);
            });
            c.replaceWith(frag);
          } else if (c.nodeType === 1) walk(c);
        });
      };
      walk(el); el.dataset.split = '1';
    };

    // Le fil des missions va du centre de la première pastille au centre de la dernière
    const list = root.querySelector('.ac-mis__list');
    const placeFil = () => {
      const ns = list ? list.querySelectorAll('.ac-mis__n') : [];
      if (ns.length < 2) return;
      const L = list.getBoundingClientRect(), a = ns[0].getBoundingClientRect(), b = ns[ns.length - 1].getBoundingClientRect();
      const top = a.top - L.top + a.height / 2, bottom = b.top - L.top + b.height / 2;
      list.style.setProperty('--fil-top', top + 'px');
      list.style.setProperty('--fil-h', (bottom - top) + 'px');
    };
    placeFil();
    const roFil = new ResizeObserver(placeFil);
    if (list) roFil.observe(list);

    if (reduce || !gsap || !ST) {
      root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
      root.querySelectorAll('.ac-mis__item, .ac-pv__line').forEach((el) => el.classList.add('is-on'));
      return () => roFil.disconnect();
    }
    const M = window.FESTIN_MOTION;
    const ctx = gsap.context(() => {
      // HERO : le titre monte ligne par ligne, la photo s'ouvre, le reste suit
      gsap.timeline({ defaults: { ease: M.ease, duration: M.dur.title } })
        .from('.ac-hero__t .ln > span', { yPercent: 105, stagger: 0.12 }, 0.15)
        .from('.ac-hero__kicker, .ac-hero__sig, .ac-hero__lede, .ac-hero__cta', { y: M.y, autoAlpha: 0, stagger: M.stagger }, 0.45)
        .from('.ac-hero__media', { clipPath: 'inset(8% 0% 8% 18% round 48px)', duration: 1.4 }, 0.1)
        .from('.ac-hero__media img', { scale: 1.12, duration: 1.8 }, 0.1);
      gsap.to('.ac-hero__media img', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.ac-hero', start: 'top top', end: 'bottom top', scrub: true } });

      // CONFIANCE : les médias arrivent l'un après l'autre
      gsap.from('.ac-conf__media li', { y: 16, autoAlpha: 0, stagger: 0.06, duration: M.dur.reveal,
        scrollTrigger: { trigger: '.ac-conf', start: 'top 88%', once: true } });

      // MISSIONS : le fil se trace de 01 à 03 ; chaque mission s'allume quand il l'atteint
      const fil = root.querySelector('.ac-mis__fil path');
      if (fil) {
        const L = fil.getTotalLength();
        gsap.fromTo(fil, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: '.ac-mis__list', start: 'top 70%', end: 'bottom 70%', scrub: 0.6 } });
      }
      root.querySelectorAll('.ac-mis__item').forEach((it) => {
        ST.create({ trigger: it, start: 'top 70%', onEnter: () => it.classList.add('is-on'), onLeaveBack: () => it.classList.remove('is-on') });
        gsap.from(it.querySelectorAll('.ac-proj'), { y: 40, autoAlpha: 0, stagger: 0.1, duration: M.dur.reveal,
          scrollTrigger: { trigger: it, start: 'top 75%', once: true } });
      });

      // PREUVES : les mots passent de l'estompé au net ; les chiffres se surlignent
      root.querySelectorAll('.ac-pv__line').forEach((line) => {
        splitWords(line);
        const words = line.querySelectorAll('.w');
        gsap.timeline({ scrollTrigger: { trigger: line, start: 'top 82%', end: 'top 42%', scrub: 0.5,
          onEnter: () => line.classList.add('is-on') } })
          .fromTo(words, { opacity: 0.16 }, { opacity: 1, stagger: 0.04, ease: 'none' });
      });

      // RÉVÉLATIONS génériques
      root.querySelectorAll('.reveal').forEach((el) => ST.create({ trigger: el, start: 'top 86%', once: true, onEnter: () => el.classList.add('is-in') }));
    }, root);
    ST.refresh();
    return () => { roFil.disconnect(); ctx.revert(); };
  }, []);

  const D = window.FESTIN_DATA;
  const H = D.home;
  const byId = (id) => D.projets.find((p) => p.id === id) || {};
  const presseHref = (source) => { const a = (D.presse || []).find((x) => x.source === source); return a ? a.href : null; };
  const lienDon = (href) => (href === 'don' ? D.donation : href);

  return (
    <div className="pageAccueil" ref={rootRef}>

      {/* 1 · HERO — qui, quoi, pour qui ; la seule teinte pleine de la page avec le pied */}
      <header className="ac-hero on-dark" id="hero">
        <window.Trait className="ac-hero__trait" width={150} delay={0.2} />
        <div className="wrap ac-hero__grid">
          <div className="ac-hero__txt">
            <span className="kicker ac-hero__kicker">{H.hero.kicker}</span>
            <h1 className="ac-hero__t">
              <span className="ln"><span>{H.hero.title}</span></span>
              <span className="ln"><span><em>{H.hero.titleAccent}</em></span></span>
            </h1>
            <p className="ac-hero__sig">{H.hero.signature}</p>
            <p className="ac-hero__lede">{H.hero.lede}</p>
            <div className="ac-hero__cta">
              <a className="btnb btnb--gold" href={H.hero.ctaPrimary.href}>{H.hero.ctaPrimary.label} <span className="arrow" aria-hidden="true">→</span></a>
              <a className="ac-hero__lnk" href={H.hero.ctaSecondary.href}>{H.hero.ctaSecondary.label} <span className="arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
        <figure className="ac-hero__media">
          <window.Picture src={H.hero.img} alt={H.hero.imgAlt} sizes="(max-width: 900px) 100vw, 44vw" loading="eager" fetchPriority="high" />
        </figure>
      </header>

      {/* 2 · CONFIANCE — statuts, puis les médias qui ont parlé de Festin */}
      <section className="ac-conf" aria-label="L'association en bref">
        <div className="wrap ac-conf__row">
          <ul className="ac-conf__statuts">
            {H.confiance.statuts.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <div className="ac-conf__presse">
            <span className="ac-conf__label">{H.confiance.presseLabel}</span>
            <ul className="ac-conf__media">
              {H.confiance.medias.map((m) => {
                const href = presseHref(m.source);
                return <li key={m.nom}>{href ? <a href={href} target="_blank" rel="noopener noreferrer">{m.nom}</a> : m.nom}</li>;
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 3 · TROIS MISSIONS, SIX PROJETS — un seul rangement pour tout le site */}
      <section className="ac-mis" id="missions" aria-labelledby="ac-mis-t">
        <div className="wrap">
          <div className="ac-mis__head reveal">
            <h2 className="ac-h2" id="ac-mis-t">{H.missions.title} <em>{H.missions.titleAccent}</em></h2>
            <p className="ac-lede">{H.missions.lede}</p>
          </div>
          <ol className="ac-mis__list">
            <svg className="ac-mis__fil" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M20 0 C 36 120 4 220 20 333 S 36 560 20 666 S 4 880 20 1000" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>
            {H.missions.items.map((m, i) => (
              <li className="ac-mis__item" key={m.key}>
                <span className="ac-mis__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="ac-mis__txt">
                  <h3 className="ac-mis__t">{m.title}{m.titleAccent && <> <em>{m.titleAccent}</em></>}</h3>
                  <p>{m.text}</p>
                  <p className="ac-mis__fait"><strong>{m.fait.n}</strong> <span>{m.fait.t}</span> <small>{m.fait.p}</small></p>
                </div>
                <ul className={'ac-mis__projets ac-mis__projets--n' + m.projets.length} style={{ '--n': m.projets.length }}>
                  {m.projets.map((pr) => {
                    const p = byId(pr.id);
                    const name = pr.name || p.shortTitle;
                    const logo = pr.logo || p.logo;
                    return (
                      <li key={pr.id}>
                        <a className="ac-proj" href={pr.href || ('#/projets/' + pr.id)}>
                          <span className="ac-proj__img">
                            <window.Picture src={pr.img} alt="" sizes="(max-width: 700px) 100vw, 26vw" />
                            {logo && <span className="ac-proj__logo"><img src={IMG(logo)} alt="" loading="lazy" /></span>}
                          </span>
                          <span className="ac-proj__name">{name}</span>
                          <span className="ac-proj__line">{pr.line}</span>
                          <span className="ac-proj__go" aria-hidden="true">Découvrir <span className="arrow">→</span></span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 · LE PARCOURS — une promotion, de septembre à juin */}
      <window.Frise id="parcours" tone="tint" title={H.frise.title} accent={H.frise.titleAccent} lede={H.frise.lede}
        steps={H.frise.steps} rail={H.frise.rail} cta={H.frise.cta} />

      {/* 5 · PREUVES — des phrases, pas des compteurs ; puis la direction et les chefs */}
      <section className="ac-pv" aria-labelledby="ac-pv-t">
        <div className="wrap">
          <h2 className="ac-h2 reveal" id="ac-pv-t">{H.preuve.title} <em>{H.preuve.titleAccent}</em></h2>
          <div className="ac-pv__lines">
            {H.preuve.lignes.map((l, i) => <p className="ac-pv__line" key={i} dangerouslySetInnerHTML={{ __html: l }} />)}
          </div>
          <p className="ac-pv__src">{H.preuve.sources} <a className="lnk" href={H.preuve.lien.href}>{H.preuve.lien.label} <span className="arrow" aria-hidden="true">→</span></a></p>
          <div className="ac-pv__foot">
            <figure className="ac-pv__quote reveal">
              <blockquote><p>« {H.preuve.citation.text} »</p></blockquote>
              <figcaption><b>{H.preuve.citation.auteur}</b> <span>{H.preuve.citation.role}</span></figcaption>
            </figure>
            <div className="ac-pv__chefs reveal">
              <h3 className="ac-pv__chefsT">{H.preuve.chefsTitre}</h3>
              <ul>
                {[H.preuve.marraine, ...D.about.chefs].map((c) => (
                  <li key={c.name}><b>{c.name}</b> <span>{c.place}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · PAR OÙ COMMENCER — les parcours se séparent après la preuve */}
      <section className="ac-portes" id="portes" aria-labelledby="ac-portes-t">
        <div className="wrap">
          <h2 className="ac-h2 reveal" id="ac-portes-t">{H.portes.title} <em>{H.portes.titleAccent}</em></h2>
          <div className="ac-portes__grid">
            {H.portes.cards.map((c) => (
              <a key={c.href} href={c.href} className="ac-porte reveal">
                <span className="ac-porte__img">
                  <window.Picture src={c.img} alt="" sizes="(max-width: 820px) 100vw, 38vw" />
                  <span className="ac-porte__tag">{c.tag}</span>
                </span>
                <span className="ac-porte__t">{c.title}</span>
                <ul className="ac-porte__pts">{c.pts.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                <span className="lnk ac-porte__go">{c.cta} <span className="arrow" aria-hidden="true">→</span></span>
              </a>
            ))}
            <div className="ac-agir reveal">
              <span className="ac-porte__tag ac-porte__tag--flat">{H.portes.agir.tag}</span>
              <h3 className="ac-agir__t">{H.portes.agir.title} <em>{H.portes.agir.titleAccent}</em></h3>
              <p>{H.portes.agir.text}</p>
              <ul className="ac-agir__links">
                {H.portes.agir.links.map((l) => (
                  <li key={l.label}>
                    <a className={l.primary ? 'btnb btnb--gold' : 'lnk'} href={lienDon(l.href)}
                      {...((l.external || l.href === 'don') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {l.label} <span className="arrow" aria-hidden="true">{(l.external || l.href === 'don') ? '↗' : '→'}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · DANS LEURS MOTS — une grande citation à la fois */}
      <section className="ac-quotes" id="quotes" aria-labelledby="ac-quotes-t">
        <div className="wrap">
          <h2 className="ac-h2 reveal" id="ac-quotes-t">{H.quotes.title}</h2>
          <p className="ac-lede reveal">{H.quotes.lede}</p>
          <window.TestiCarousel label="Témoignages" items={H.quotes.cards.map((c) => ({ name: c.name, meta: c.role, quote: c.q, chip: c.chip, logo: c.logo }))} />
        </div>
      </section>

    </div>
  );
}

window.HomeB = HomeB;
