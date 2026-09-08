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

    // clone marquees (toujours, même en reduced-motion)
    const vtrack = root.querySelector('#vtrack');
    if (vtrack && vtrack.dataset.cloned !== '1') { vtrack.innerHTML += vtrack.innerHTML; vtrack.dataset.cloned = '1'; }
    const ttrack = root.querySelector('#ttrack');
    if (ttrack && ttrack.dataset.cloned !== '1') { ttrack.innerHTML += ttrack.innerHTML; ttrack.dataset.cloned = '1'; }

    if (reduce || !gsap || !ST) {
      root.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
      root.querySelectorAll('.hero__title .l span').forEach(s => s.style.transform = 'none');
      root.querySelectorAll('.istat__n').forEach(el => el.textContent = el.dataset.count + (el.dataset.suffix || ''));
      root.querySelectorAll('.appr__card').forEach(c => c.classList.add('on'));
      return;
    }
    gsap.registerPlugin(ST);

    // ---- HERO
    cleanups.push(gsap.from(root.querySelectorAll('.hero__title .l span'), { yPercent: 118, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: 0.1 }));
    cleanups.push(gsap.from(root.querySelectorAll('.hero__sub, .hero__cta'), { y: 26, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.55 }));
    cleanups.push(gsap.to(root.querySelector('#heroMedia'), { yPercent: 10, ease: 'none', scrollTrigger: { trigger: root.querySelector('#hero'), start: 'top top', end: 'bottom top', scrub: true } }));

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
        end: () => '+=' + Math.round(window.innerHeight * 2.4),
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

    // ---- COUNT-UP IMPACT
    root.querySelectorAll('.istat__n').forEach(el => {
      const target = +el.dataset.count, suffix = el.dataset.suffix || '';
      ST.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => {
        const o = { v: 0 };
        gsap.to(o, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: () => { el.textContent = Math.round(o.v) + suffix; } });
      }});
    });

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
  const heroT = H.hero.titleLines;
  const dualT = H.dual.titleLines;

  return (
    <div className="pageHomeB" ref={rootRef}>

      {/* HERO */}
      <header className="hero" id="hero">
        <div className="hero__media" id="heroMedia"><img src={IMG(H.hero.img)} alt="Personnes en cuisine, atelier Festin" /></div>
        <div className="hero__scrim"></div>
        <div className="hero__prism"></div>
        <div className="hero__inner wrap">
          <span className="eyb">{H.hero.eyebrow}</span>
          <h1 className="display hero__title">
            {heroT.map((l, i) => (
              <span className="l" key={i}><span className={i === heroT.length - 1 ? 'accent' : ''}>{l}</span></span>
            ))}
          </h1>
          <p className="lede hero__sub">{H.hero.sub}</p>
          <div className="hero__cta">
            {H.hero.ctas.map((c, i) => (
              <a key={i} className={"btnb " + (c.variant === 'gold' ? 'btnb--gold' : 'btnb--ghost')}
                 href={'#' + c.scroll}
                 onClick={(e) => { e.preventDefault(); const t = document.getElementById(c.scroll); if (t) { window.__lenis ? window.__lenis.scrollTo(t, { offset: -70 }) : t.scrollIntoView({ behavior: 'smooth' }); } }}>
                {c.label}{c.variant === 'gold' && <span className="arrow"> →</span>}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* MARQUEE MÉTIERS */}
      <section className="vmarquee" aria-hidden="true">
        <div className="vmarquee__track" id="vtrack">
          {H.marquee.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </section>

      {/* #approche — DE LA CUISINE À L'EMPLOI */}
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
                    <img src={IMG(s.img)} loading="lazy" alt="" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANDE LOGOS */}
      <section className="logoband">
        <div className="wrap">
          <span className="eyb">{H.logoband.eyebrow}</span>
          <div className="logoband__row">
            {D.projets.map(p => <img key={p.id} src={IMG(p.logo)} loading="lazy" alt={p.shortTitle} />)}
          </div>
        </div>
      </section>

      {/* #dual — SE FORMER / FORMER SES ÉQUIPES */}
      <section className="b-dual" id="dual">
        <div className="wrap">
          <div className="b-dual__head reveal">
            <h2 className="h2b b-dual__h2"><span>{dualT[0]}</span><span className="accent" style={{ whiteSpace: 'nowrap' }}>{dualT[1]}</span></h2>
            <p className="b-dual__lede">{H.dual.lede}</p>
          </div>
          <div className="dualcards">
            {H.dual.cards.map((c, i) => (
              <a key={i} href={c.href} className="dcard reveal">
                <div className="dcard__img"><img src={IMG(c.img)} loading="lazy" alt="" /><span className="dcard__tag">{c.tag}</span></div>
                <div className="dcard__body">
                  <span className="dcard__kicker">{c.kicker}</span>
                  <h3>{c.title}</h3>
                  <ul className="dcard__pts">{c.pts.map((pt, k) => <li key={k}>{pt}</li>)}</ul>
                  <span className="lnk">{c.cta} <span className="arrow">→</span></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* #eco — DÉCOUVREZ NOS CINQ PROJETS */}
      <section className="b-eco" id="eco">
        <div className="wrap">
          <h2 className="h2b reveal">{H.eco.titlePre}<em>{H.eco.titleAccent}</em></h2>
          <p className="b-eco__lede reveal">{H.eco.lede}</p>
          <div className="ecogrid">
            {H.eco.cards.map((c, i) => {
              const p = byId(c.id);
              return (
                <a key={c.id} href={`#/projets/${c.id}`} className="ecocard reveal">
                  <div className="ecocard__img"><img src={IMG(c.img)} loading="lazy" alt={p.shortTitle} /></div>
                  <div className="ecocard__body">
                    <img className="ecocard__logo" src={IMG(p.logo)} alt="" />
                    <span className="ecocard__eb">{p.eyebrow}</span>
                    <h3>{p.shortTitle}</h3>
                    <p>{c.blurb}</p>
                    <span className="ecocard__stat">{c.stat}</span>
                  </div>
                </a>
              );
            })}
            <a href={H.eco.explore.href} className="ecocard reveal" style={{ background: 'transparent', border: '1.5px dashed rgba(255,255,255,.4)', alignItems: 'flex-start', justifyContent: 'center', padding: 26 }}>
              <div className="ecocard__body" style={{ justifyContent: 'center' }}>
                <h3 style={{ color: '#fff' }}>{H.eco.explore.title}</h3>
                <p>{H.eco.explore.text}</p>
                <span className="lnk" style={{ color: 'var(--gold-light)' }}>{H.eco.explore.cta} <span className="arrow">→</span></span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* #impact — bloc central + photos dispersées */}
      <section className="b-impact" id="impact">
        <div className="wrap">
          <div className="b-impact__blob" aria-hidden="true"></div>
          <div className="b-impact__center">
            <span className="eyb">{H.impact.eyebrow}</span>
            <div className="impactgrid">
              {D.stats.map((s, i) => {
                const suffix = s.unit === '%' ? ' %' : (s.unit || '');
                return (
                  <div className="istat reveal" key={i}>
                    <div className="istat__n" data-count={String(s.value).replace(/[^\d]/g, '')} data-suffix={suffix}>0</div>
                    <div className="istat__l">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="b-impact__photos">
            {H.impact.photos.map((src, i) => (
              <div key={i} className={"b-impact__ph b-impact__ph--" + ['tl', 'tr', 'bl', 'br'][i] + " reveal"}><img src={IMG(src)} loading="lazy" alt="" /></div>
            ))}
          </div>
        </div>
      </section>

      {/* #quotes — CE QU'ILS EN DISENT */}
      <section className="b-quotes" id="quotes">
        <div className="wrap">
          <span className="eyb">{H.quotes.eyebrow}</span>
          <h2 className="h2b reveal">{H.quotes.title}</h2>
          <p className="b-quotes__lede reveal">{H.quotes.lede}</p>
          <div className="qband reveal"><img src={IMG(H.quotes.band)} loading="lazy" alt="Cérémonie de fin de formation" /></div>
        </div>
        <div className="tmarquee reveal" aria-label="Témoignages">
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
                  {c.logo ? <img src={IMG(c.logo)} alt="" /> : <span>{c.panelText}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* #engage — SE FORMER, RECRUTER, SOUTENIR */}
      <section className="b-engage" id="engage">
        <div className="wrap">
          <h2 className="h2b reveal">{H.engage.title}</h2>
          <div className="engagegrid">
            {H.engage.cards.map((c, i) => (
              <a key={i} href={c.href} className="ecard reveal">
                <span className="ecard__p">{c.p}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="lnk">{c.cta} <span className="arrow">→</span></span>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

window.HomeB = HomeB;
