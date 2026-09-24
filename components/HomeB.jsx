// HomeB.jsx — home page portée depuis maquettes/home-b.html
// Contenu : window.FESTIN_DATA.home + .projets + .stats. Animations GSAP/ScrollTrigger.
// Toutes les instances GSAP sont détruites au démontage (changement de route).
const { useEffect, useRef } = React;
// encode les espaces/accents des chemins d'images, sans re-encoder ceux déjà encodés
const IMG = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function HomeB() {
  const rootRef = useRef(null);

  useEffect(() => {
    const D = window.FESTIN_DATA;
    const root = rootRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const gsap = window.gsap, ST = window.ScrollTrigger;
    const cleanups = [];
    const impactPhotos = root.querySelector('#impactPhotos');

    // clone marquees (toujours, même en reduced-motion)
    const vtrack = root.querySelector('#vtrack');
    if (vtrack && vtrack.dataset.cloned !== '1') { vtrack.innerHTML += vtrack.innerHTML; vtrack.dataset.cloned = '1'; }
    const ttrack = root.querySelector('#ttrack');
    if (ttrack && ttrack.dataset.cloned !== '1') { ttrack.innerHTML += ttrack.innerHTML; ttrack.dataset.cloned = '1'; }

    if (reduce || !gsap || !ST) {
      root.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
      root.querySelectorAll('.istat__n').forEach(el => el.textContent = el.dataset.count + (el.dataset.suffix || ''));
      root.querySelectorAll('.appr__card').forEach(c => c.classList.add('on'));
      if (impactPhotos) impactPhotos.classList.add('is-scattered');
      return;
    }
    gsap.registerPlugin(ST);

    // ---- HERO
    const M = window.FESTIN_MOTION;
    cleanups.push(gsap.timeline({ defaults: { ease: M.ease, duration: M.dur.title } })
      .from(root.querySelector('.hero2__t'), { yPercent: 18, autoAlpha: 0 }, 0.15)
      .from(root.querySelectorAll('.hero2__sig, .hero2__proof, .hero2__cta, .hero2__note'), { y: M.y, autoAlpha: 0, stagger: M.stagger }, 0.4)
      .from(root.querySelector('#heroMedia'), { clipPath: 'inset(12% 12% 12% 12% round 32px)', scale: 1.08, duration: 1.4 }, 0.2));
    cleanups.push(gsap.to(root.querySelector('#heroMedia img'), { yPercent: 8, ease: 'none', scrollTrigger: { trigger: root.querySelector('#hero'), start: 'top top', end: 'bottom top', scrub: true } }));
    // trois temps : le filet se trace en reliant les étapes
    const tline = root.querySelector('.temps__line path');
    if (tline) {
      const L = tline.getTotalLength();
      cleanups.push(gsap.fromTo(tline, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: root.querySelector('.temps__list'), start: 'top 80%', end: 'bottom 60%', scrub: 0.6 } }));
    }

    // ---- REVEALS
    root.querySelectorAll('.reveal').forEach(el => {
      ST.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => el.classList.add('is-in') });
    });

    // ---- VELOCITY MARQUEE
    if (vtrack) {
      let mx = 0, base = 0.6, vel = 0, half = vtrack.scrollWidth / 2;
      const onV = (e) => { vel = e.velocity || 0; };
      if (window.__lenis) window.__lenis.on('scroll', onV);
      const tickV = () => {
        if (vtrack.parentElement.classList.contains('is-paused')) return;
        mx -= (base + Math.min(Math.abs(vel), 40) * 0.35);
        if (-mx >= half) mx += half;
        vtrack.style.transform = 'translateX(' + mx + 'px)';
        vel *= 0.9;
      };
      gsap.ticker.add(tickV);
      cleanups.push(() => { gsap.ticker.remove(tickV); if (window.__lenis) window.__lenis.off('scroll', onV); });
    }

    // ---- #approche : parcours horizontal épinglé
    const appr = root.querySelector('#appr');
    const atrack = root.querySelector('#apprTrack');
    if (appr && atrack && window.innerWidth >= 900) {
      const cards = atrack.querySelectorAll('.appr__card');
      const steps = appr.querySelectorAll('.appr__step');
      const bar = root.querySelector('#apprBar');
      const N = cards.length;
      let cur = -1;
      const setStep = (i) => {
        if (i === cur) return; cur = i;
        cards.forEach((c, k) => c.classList.toggle('on', k === i));
        steps.forEach((s, k) => s.classList.toggle('on', k === i));
      };
      setStep(0);
      const stepW = () => cards[1].offsetLeft - cards[0].offsetLeft;
      const stApp = ST.create({
        trigger: appr, start: 'top top',
        end: () => '+=' + Math.round(window.innerHeight * 1.6),   // 2,4 écrans pour 3 cartes : trop long
        pin: '.appr__inner', scrub: 1, anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          atrack.style.transform = 'translateX(' + (-p * (N - 1) * stepW()) + 'px)';
          if (bar) bar.style.width = (p * 100) + '%';
          setStep(Math.round(p * (N - 1)));
        }
      });
      cleanups.push(() => stApp.kill());
    } else if (appr) {
      appr.querySelectorAll('.appr__card').forEach(c => c.classList.add('on'));
    }

    // ---- #ecosysteme : carrousel horizontal épinglé des projets (même principe que l'ancienne approche)
    const eco = root.querySelector('#ecocar');
    const etrack = root.querySelector('#ecocarTrack');
    if (eco && etrack && window.innerWidth >= 900) {
      const ebar = root.querySelector('#ecocarBar');
      const vp = eco.querySelector('.ecocar__viewport');
      const dist = () => Math.max(0, etrack.scrollWidth - vp.clientWidth);
      const stEco = ST.create({
        trigger: eco, start: 'top top',
        end: () => '+=' + Math.round(dist() * 1.1),
        pin: '.ecocar__inner', scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => {
          etrack.style.transform = 'translateX(' + (-self.progress * dist()) + 'px)';
          if (ebar) ebar.style.width = (self.progress * 100) + '%';
        }
      });
      cleanups.push(() => stEco.kill());
    }

    // ---- COUNT-UP IMPACT
    root.querySelectorAll('.istat__n').forEach(el => {
      const target = +el.dataset.count, suffix = el.dataset.suffix || '';
      el.textContent = '0' + suffix;
      ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => {
        const o = { v: 0 };
        gsap.to(o, { v: target, duration: 1.6, ease: 'expo.out', onUpdate: () => { el.textContent = Math.round(o.v) + suffix; } });
      }});
    });

    // ---- IMPACT : photos éparpillées depuis le centre (désactivé <900px, cf. CSS)
    if (impactPhotos && window.innerWidth >= 900) {
      const stImpact = ST.create({
        trigger: impactPhotos, start: 'top 70%', once: true,
        onEnter: () => impactPhotos.classList.add('is-scattered'),
      });
      cleanups.push(() => stImpact.kill());
    } else if (impactPhotos) {
      impactPhotos.classList.add('is-scattered');
    }

    window.addEventListener('load', () => ST.refresh());
    ST.refresh();

    return () => {
      cleanups.forEach(c => { try { (typeof c === 'function') ? c() : c.kill(); } catch (e) {} });
      ST.getAll().forEach(t => { if (root.contains(t.trigger) || t.trigger === root.querySelector('#hero') || t.pin) t.kill(); });
    };
  }, []);

  const D = window.FESTIN_DATA;
  const H = D.home;
  const byId = (id) => D.projets.find(p => p.id === id) || {};
  const dualT = H.dual.titleLines;

  return (
    <div className="pageHomeB" ref={rootRef}>

      {/* HERO — couleur pleine, le trait du parcours, une promesse, une preuve */}
      <header className="hero2 on-dark" id="hero">
        <window.Trait className="hero2__trait" width={170} delay={0.1} />
        <div className="wrap hero2__grid">
          <div className="hero2__txt">
            <h1 className="hero2__t">{H.hero.title} <em>{H.hero.titleAccent}</em></h1>
            <p className="hero2__sig">{H.hero.signature}</p>
            <p className="hero2__proof">{H.hero.proof}<sup aria-hidden="true">*</sup></p>
            <div className="hero2__cta">
              <a className="btnb btnb--gold" href={H.hero.ctaPrimary.href}>{H.hero.ctaPrimary.label} <span className="arrow" aria-hidden="true">→</span></a>
              <a className="hero2__lnk" href={H.hero.ctaSecondary.href}>{H.hero.ctaSecondary.label} <span className="arrow" aria-hidden="true">→</span></a>
            </div>
            <p className="hero2__note"><span aria-hidden="true">* </span>{H.hero.proofNote}</p>
          </div>
          <figure className="hero2__media" id="heroMedia">
            <window.Picture src={H.hero.img} alt={H.hero.imgAlt} sizes="(max-width: 900px) 100vw, 46vw" loading="eager" fetchPriority="high" />
          </figure>
        </div>
      </header>

      {/* LIGNE DE CONFIANCE */}
      <section className="trust" aria-label="L'association en bref">
        <ul className="wrap trust__row">
          {H.trust.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>

      {/* MARQUEE MÉTIERS */}
      <section className="vmarquee" data-marquee>
        <window.MarqueePause label="du bandeau des métiers" />
        <div className="vmarquee__track" id="vtrack" aria-hidden="true">
          {H.marquee.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </section>

      {/* PROMESSE — famille teal */}
      <section className="promesse">
        <div className="wrap promesse__grid">
          <div className="promesse__txt reveal">
            <h2 className="h2b">{H.promesse.title} <em>{H.promesse.titleAccent}</em></h2>
            <p>{H.promesse.text}</p>
          </div>
          <figure className="promesse__media reveal">
            <window.Picture src={H.promesse.img} alt={H.promesse.imgAlt} sizes="(max-width: 900px) 100vw, 44vw" />
          </figure>
        </div>
      </section>

      {/* TROIS TEMPS — un filet relie les trois étapes au défilement */}
      <section className="temps" id="approche">
        <div className="wrap">
          <h2 className="h2b temps__h reveal">{H.approche.titleLines[0]} <em>{H.approche.titleLines[1]}</em></h2>
          <ol className="temps__list">
            <svg className="temps__line" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M0 30 C 120 -10 220 70 340 30 S 560 -10 680 30 S 880 70 1000 30" fill="none" strokeWidth="3" />
            </svg>
            {H.approche.steps.map((st, i) => (
              <li className="temps__item reveal" key={i}>
                <span className="temps__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
                <figure className="temps__img"><window.Picture src={st.img} alt="" sizes="(max-width: 900px) 100vw, 30vw" /></figure>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* #impact — chiffres expliqués + photos dispersées */}
      <section className="b-impact" id="impact">
        <div className="wrap">
          <div className="b-impact__blob" aria-hidden="true"></div>
          <div className="b-impact__center">
            <h2 className="b-impact__h">{H.impact.title} <em>{H.impact.titleAccent}</em></h2>
            <div className="impactgrid">
              {D.stats.map((s, i) => {
                const suffix = s.unit === '%' ? ' %' : (s.unit || '');
                return (
                  <div className="istat reveal" key={i}>
                    <div className="istat__n" data-count={String(s.value).replace(/[^\d]/g, '')} data-suffix={suffix}>{s.value}{suffix}</div>
                    <div className="istat__l">{s.label}</div>
                  </div>
                );
              })}
            </div>
            <p className="b-impact__src">{H.impact.source} <a href="#/impact">Voir tous nos rapports d'activité <span aria-hidden="true">→</span></a></p>
          </div>
          <div className="b-impact__photos" id="impactPhotos">
            {H.impact.photos.map((src, i) => (
              <div key={i} className={"b-impact__ph b-impact__ph--p" + (i + 1)}><window.Picture src={src} alt="" sizes="(max-width: 900px) 50vw, 170px" /></div>
            ))}
          </div>
        </div>
      </section>

      {/* #ecosysteme — CARROUSEL ÉPINGLÉ DES PROJETS */}
      <section className="b-mission b-ecocar" id="ecosysteme">
        <div className="ecocar" id="ecocar">
          <div className="ecocar__inner">
            <div className="wrap ecocar__head">
              <h2 className="h2b">{H.eco.titlePre}<em>{H.eco.titleAccent}</em></h2>
              <p className="ecocar__lede">{H.eco.lede}</p>
            </div>
            <div className="ecocar__viewport">
              <div className="ecocar__track" id="ecocarTrack">
                {H.eco.cards.map((c) => {
                  const p = byId(c.id);
                  return (
                    <a key={c.id} href={`#/projets/${c.id}`} className="ecocar__card">
                      <div className="ecocar__img">
                        <window.Picture src={c.img} alt="" sizes="(max-width: 900px) 80vw, 380px" />
                        {p.logo && <span className="ecocar__logo"><img src={IMG(p.logo)} alt="" loading="lazy" /></span>}
                      </div>
                      <div className="ecocar__body">
                        <span className="ecocar__eb">{p.eyebrow}</span>
                        <h3>{p.shortTitle}</h3>
                        <dl className="ecocar__pub">
                          <div><dt>Pour les personnes</dt><dd>{c.insertion}</dd></div>
                          <div><dt>Pour le secteur</dt><dd>{c.secteur}</dd></div>
                        </dl>
                        <span className="lnk">Découvrir {p.shortTitle} <span className="arrow" aria-hidden="true">→</span></span>
                      </div>
                    </a>
                  );
                })}
                {H.eco.avenir && (
                  <div className="ecocar__card ecocar__card--avenir">
                    <div className="ecocar__img ecocar__img--avenir"><span>{H.eco.avenir.eyebrow}</span></div>
                    <div className="ecocar__body">
                      <h3>{H.eco.avenir.title}</h3>
                      <p className="ecocar__txt">{H.eco.avenir.text}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="wrap"><span className="ecocar__bar" aria-hidden="true"><i id="ecocarBar"></i></span></div>
          </div>
        </div>
      </section>

      {/* #dual — DEUX PORTES, après la preuve (arbitrage 3B) */}
      <section className="b-dual" id="dual">
        <div className="wrap">
          <div className="b-dual__head reveal">
            <h2 className="h2b b-dual__h2"><span>{dualT[0]}</span> <em>{dualT[1]}</em></h2>
          </div>
          <div className="dualcards">
            {H.dual.cards.map((c, i) => (
              <a key={i} href={c.href} className="dcard reveal">
                <div className="dcard__img"><window.Picture src={c.img} alt="" sizes="(max-width: 820px) 100vw, 50vw" /><span className="dcard__tag">{c.tag}</span></div>
                <div className="dcard__body">
                  <h3>{c.title}</h3>
                  <ul className="dcard__pts">{c.pts.map((pt, k) => <li key={k}>{pt}</li>)}</ul>
                  <span className="lnk">{c.cta} <span className="arrow" aria-hidden="true">→</span></span>
                </div>
              </a>
            ))}
          </div>
          <p className="b-dual__soutien reveal">{H.dual.soutien.text} <a href={D.donation} target="_blank" rel="noopener noreferrer">{H.dual.soutien.don}</a> <a href="#/contact">{H.dual.soutien.mecenat}</a></p>
        </div>
      </section>

      {/* #quotes — CE QU'ILS EN DISENT */}
      <section className="b-quotes" id="quotes">
        <div className="wrap">
          <h2 className="h2b reveal">{H.quotes.title}</h2>
          <p className="b-quotes__lede reveal">{H.quotes.lede}</p>
          <div className="qband reveal"><window.Picture src={H.quotes.band} alt="Cérémonie de fin de formation" sizes="100vw" /></div>
        </div>
        <div className="tmarquee reveal" aria-label="Témoignages" data-marquee>
          <window.MarqueePause label="des témoignages" />
          <div className="tmarquee__track" id="ttrack">
            {H.quotes.cards.map((c, i) => (
              <div className="tcell" key={i}>
                <div className="tcard">
                  <div className="tcard__top">
                    <div className="tcard__id">
                      <span className={"tavatar tavatar--" + c.kind}>{c.av}</span>
                      <div><div className="tcard__name">{c.name}</div><div className="tcard__role">{c.role}</div></div>
                    </div>
                    <span className="tcard__src"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M7 7h10v10"/></svg></span>
                  </div>
                  <span className={"tchip tchip--" + c.kind}>{c.chip}</span>
                  <p className="tcard__q">{c.q}</p>
                </div>
                <div className="tpanel"><div className="tpanel__grid"></div>
                  {c.logo ? <img src={IMG(c.logo)} alt="" loading="lazy" decoding="async" /> : <span>{c.panelText}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

window.HomeB = HomeB;

// ---------------------------------------------------------------------------
// Approche « Accompagner, former, transformer » — retirée de l'accueil le
// 23/09/2026 pour l'alléger, gardée ici pour être réutilisée plus tard.
// Pour la remettre : rendre <ApprocheEpinglee H={H} /> dans HomeB. Sa logique
// GSAP (#appr) et sa CSS (.appr__*) sont toujours en place.
// ---------------------------------------------------------------------------
function ApprocheEpinglee({ H }) {
  return (
    <>{/* #approche — DE LA CUISINE À L'EMPLOI */}
      <section className="b-mission" id="approche">
        <div className="wrap">
          <div className="b-mission__head">
            <div className="reveal">
              <span className="eyb" style={{ color: 'var(--teal-dark)' }}>{H.approche.eyebrow}</span>
              <h2 className="h2b">{H.approche.titleLines[0]}<br/>{H.approche.titleLines[1]}</h2>
              <p className="b-mission__intro">{H.approche.intro}</p>
            </div>
          </div>
        </div>
        <div className="appr" id="appr">
          <div className="appr__inner">
            <div className="wrap">
              <div className="appr__stepper" role="list" aria-label="Notre façon de faire">
                {H.approche.steps.map((s, i) => (
                  <span key={i} className={"appr__step" + (i === 0 ? ' on' : '')} role="listitem">
                    <b>{String(i + 1).padStart(2, '0')}</b> {s.tab}
                  </span>
                ))}
                <span className="appr__bar" aria-hidden="true"><i id="apprBar"></i></span>
              </div>
            </div>
            <div className="appr__viewport">
              <div className="appr__track" id="apprTrack">
                {H.approche.steps.map((s, i) => (
                  <article key={i} className={"appr__card appr__card--" + s.variant + (i === 0 ? ' on' : '')}>
                    <div className="appr__ctext">
                      <div className="num">{s.kicker}</div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                    <window.Picture src={s.img} alt="" sizes="(max-width: 900px) 100vw, 50vw" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
