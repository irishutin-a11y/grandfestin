// Interactifs.jsx — composants interactifs partagés, réécrits en JSX natif
// depuis deux composants shadcn/Tailwind/TypeScript fournis (hover-image-list,
// img-sphere). Aucune dépendance ajoutée : GSAP (déjà chargé) remplace
// motion/react, et la sphère est un moteur 3D maison en requestAnimationFrame.

// ---------------------------------------------------------------------------
// HoverImageList — liste dont chaque ligne fait apparaître son image au survol.
// L'image suit le curseur avec une légère inclinaison selon la vitesse.
// Au clavier, le focus d'une ligne l'affiche aussi. Sans pointeur fin (mobile)
// ou avec mouvement réduit : vignette fixe dans la ligne, pas de suivi.
// items : [{ title, meta, year, img, alt }]
// Une image absente affiche un cadre « photo à venir » (onError).
// ---------------------------------------------------------------------------
function HoverImageList({ items = [], label }) {
  const { useRef, useState, useEffect } = React;
  const wrapRef = useRef(null);
  const floatRef = useRef(null);
  const [active, setActive] = useState(-1);
  const [broken, setBroken] = useState({});

  useEffect(() => {
    const wrap = wrapRef.current, fl = floatRef.current, g = window.gsap;
    if (!wrap || !fl || !g) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    g.set(fl, { xPercent: -50, yPercent: -50 });
    const xTo = g.quickTo(fl, 'x', { duration: 0.5, ease: 'power3' });
    const yTo = g.quickTo(fl, 'y', { duration: 0.5, ease: 'power3' });
    const skTo = g.quickTo(fl, 'skewX', { duration: 0.6, ease: 'power3' });
    const rotTo = g.quickTo(fl, 'rotation', { duration: 0.6, ease: 'power3' });
    let lastX = null;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
      const v = lastX === null ? 0 : e.clientX - lastX;
      lastX = e.clientX;
      skTo(Math.max(-10, Math.min(10, v * 0.5)));
      rotTo(Math.max(-4, Math.min(4, v * 0.2)));
    };
    const onLeave = () => { lastX = null; skTo(0); rotTo(0); };
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    return () => { wrap.removeEventListener('pointermove', onMove); wrap.removeEventListener('pointerleave', onLeave); };
  }, []);

  const URIx = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));
  const imgOrPh = (it, i, cls) => (broken[i] || !it.img)
    ? (window.FESTIN_SHOW_PLACEHOLDERS ? <span className={cls + ' hil__ph is-placeholder'}><span>[PHOTO MANQUANTE : {it.alt || it.title}, plan large, paysage]</span></span> : null)
    : <img className={cls} src={URIx(it.img)} alt={it.alt || ''} loading="lazy"
        onError={() => setBroken((b) => ({ ...b, [i]: true }))} />;

  return (
    <div className="hil" ref={wrapRef} onPointerLeave={() => setActive(-1)}>
      <ul className="hil__list" aria-label={label}>
        {items.map((it, i) => (
          <li key={i}
            className={'hil__row' + (active === i ? ' is-active' : '') + (active !== -1 && active !== i ? ' is-dim' : '')}
            tabIndex={0}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(-1)}>
            {it.year && <span className="hil__year">{it.year}</span>}
            <span className="hil__title">{it.title}</span>
            {it.meta && <span className="hil__meta">{it.meta}</span>}
            <span className="hil__thumb" aria-hidden="true">{imgOrPh(it, i, 'hil__thumbimg')}</span>
            <span className="hil__arrow" aria-hidden="true">↗</span>
          </li>
        ))}
      </ul>
      <div className={'hil__float' + (active !== -1 ? ' is-on' : '')} ref={floatRef} aria-hidden="true">
        {items.map((it, i) => (
          <div key={i} className={'hil__frame' + (active === i ? ' is-on' : '')}>
            {imgOrPh(it, i, 'hil__img')}
            <span className="hil__cap">{it.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ImgSphere — images réparties sur une sphère 3D que l'on fait tourner à la
// souris ou au doigt, avec inertie et rotation automatique. Un clic ouvre
// l'image en grand (Échap ou la croix pour fermer).
// images : [{ src, alt, title, text, name }] — sans src : cadre nominatif
// (initiales + nom), pour une personne dont la photo n'est pas encore fournie.
// Répartition : spirale de Fibonacci (espacement régulier sur la sphère).
// ---------------------------------------------------------------------------
function ImgSphere({ images = [], size: maxSize = 520, radius, autoSpeed = 0.18, label = 'Galerie en sphère' }) {
  const { useRef, useState, useEffect, useMemo } = React;
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  // La sphère prend la largeur de sa colonne, plafonnée à `size`.
  const [size, setSize] = useState(maxSize);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !window.ResizeObserver) return;
    const ro = new ResizeObserver(([e]) => {
      const w = Math.floor(e.contentRect.width);
      if (w > 0) setSize(Math.min(maxSize, w));
    });
    ro.observe(el.parentElement || el);
    return () => ro.disconnect();
  }, [maxSize]);
  const nodes = useRef([]);
  const [open, setOpen] = useState(null);
  const R = radius || size * 0.38;

  const pts = useMemo(() => {
    const n = images.length, out = [];
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / Math.max(1, n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = ga * i;
      out.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    return out;
  }, [images.length]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rx = -0.25, ry = 0, vx = 0, vy = reduce ? 0 : autoSpeed * 0.01;
    let drag = null, raf;
    const persp = size * 1.6;

    const frame = () => {
      if (!drag) {
        vx *= 0.94;
        vy = vy * 0.94 + (reduce ? 0 : autoSpeed * 0.01) * 0.06;
      }
      rx = Math.max(-1.2, Math.min(1.2, rx + vx));
      ry += vy;
      const cx = Math.cos(rx), sx = Math.sin(rx), cy = Math.cos(ry), sy = Math.sin(ry);
      for (let i = 0; i < pts.length; i++) {
        const el = nodes.current[i];
        if (!el) continue;
        let [x, y, z] = pts[i];
        const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;           // rotation Y
        const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;           // rotation X
        const depth = (z2 + 1) / 2;                                     // 0 derrière → 1 devant
        const k = persp / (persp - z2 * R);
        const s = (0.55 + depth * 0.55) * k;
        el.style.transform = `translate(-50%,-50%) translate3d(${x1 * R * k}px, ${y2 * R * k}px, 0) scale(${s})`;
        el.style.opacity = (0.25 + depth * 0.75).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = depth < 0.35 ? 'grayscale(.6) brightness(.75)' : 'none';
        el.style.pointerEvents = depth > 0.45 ? 'auto' : 'none';
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const down = (e) => { drag = { x: e.clientX, y: e.clientY, moved: 0 }; stage.setPointerCapture && stage.setPointerCapture(e.pointerId); };
    const move = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
      vy = Math.max(-0.08, Math.min(0.08, dx * 0.004));
      vx = Math.max(-0.08, Math.min(0.08, -dy * 0.004));
    };
    const up = () => { if (drag) stage.dataset.moved = drag.moved > 6 ? '1' : '0'; drag = null; };
    stage.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [pts, R, size, autoSpeed]);

  useEffect(() => {
    if (!open) return;
    const k = (e) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);

  const URIx = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));
  const tile = Math.round(size * 0.2);
  const initials = (n = '') => n.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  return (
    <div className="isph" ref={wrapRef} style={{ '--isph-size': size + 'px', '--isph-tile': tile + 'px' }}>
      <div className="isph__stage" ref={stageRef} role="group" aria-label={label + ' — faites glisser pour tourner'}>
        {images.map((im, i) => (
          <button key={i} type="button" className="isph__node"
            ref={(el) => (nodes.current[i] = el)}
            aria-label={'Agrandir : ' + (im.title || im.alt || 'image ' + (i + 1))}
            onClick={() => { if (stageRef.current.dataset.moved !== '1') setOpen(im); }}>
            {im.src
              ? <img src={URIx(im.src)} alt="" loading="lazy" draggable="false" />
              : <span className="isph__name"><b>{initials(im.name || im.title)}</b><span>{im.name || im.title}</span></span>}
          </button>
        ))}
      </div>
      {open && (
        <div className="isph__modal" role="dialog" aria-modal="true" aria-label={open.title || 'Image'} onClick={() => setOpen(null)}>
          <figure className="isph__fig" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="isph__close" aria-label="Fermer" onClick={() => setOpen(null)}>✕</button>
            {open.src
              ? <img src={URIx(open.src)} alt={open.alt || ''} />
              : <div className="isph__figname" aria-hidden="true">{initials(open.name || open.title)}</div>}
            {(open.title || open.text) && (
              <figcaption>{open.title && <strong>{open.title}</strong>}{open.text && <span>{open.text}</span>}</figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  );
}


// ---------------------------------------------------------------------------
// TempsForts — index + visuel (refait le 24/09/2026 sur retour : le carrousel
// plein écran ne convenait pas). Bureau : liste des temps forts à gauche
// (boutons), grande image et texte à droite ; l'image se dévoile par un volet.
// Mobile : cartes image + texte en défilement horizontal, au doigt.
// Aucun défilement automatique. items : [{ date, lieu, title, accent, text,
// img, alt, credit, href, cta }] ; sans img : cadre [PHOTO MANQUANTE] en chantier.
// ---------------------------------------------------------------------------
function TempsForts({ items: all = [], title = 'Les moments', accent = "de l'année" }) {
  const { useRef, useState, useEffect } = React;
  const items = all.filter((it) => it.img || window.FESTIN_SHOW_PLACEHOLDERS);
  const [cur, setCur] = useState(0);
  const viewRef = useRef(null);
  useEffect(() => {
    const g = window.gsap, el = viewRef.current;
    if (!g || !el || (window.FESTIN_RM && window.FESTIN_RM())) return;
    const tl = g.timeline({ defaults: { ease: 'expo.out' } })
      .fromTo(el.querySelector('.tf2__media'), { clipPath: 'inset(0 0 0 100% round 28px)' }, { clipPath: 'inset(0 0 0 0% round 28px)', duration: 1, ease: 'expo.inOut' }, 0)
      .fromTo(el.querySelector('.tf2__media img, .tf2__media .ph-photo'), { scale: 1.12 }, { scale: 1, duration: 1.4 }, 0)
      .fromTo(el.querySelectorAll('.tf2__txt > *'), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06 }, 0.35);
    return () => tl.kill();
  }, [cur]);
  if (!items.length) return null;
  const it = items[cur];
  const media = (x, sizes) => x.img
    ? <window.Picture src={x.img} alt={x.alt || ''} sizes={sizes} />
    : <window.PhotoMissing subject={x.title + ' ' + (x.accent || '')} cadrage="plan large" orientation="paysage" ratio="16/10" />;
  const text = (x) => (
    <>
      <span className="tf2__meta">{x.date}{x.lieu && <> · {x.lieu}</>}</span>
      <h3 className="tf2__t">{x.title} {x.accent && <em>{x.accent}</em>}</h3>
      {x.text && <p className="tf2__p">{x.text}</p>}
      {x.href && <a className="tf2__link" href={x.href}>{x.cta || 'Découvrir'} <span className="arrow" aria-hidden="true">→</span></a>}
      {x.credit && <span className="tf2__credit">Photo : {x.credit}</span>}
    </>
  );
  return (
    <section className="isec isec--cream tf2" aria-labelledby="tf2-t">
      <div className="wrap">
        <h2 className="isec__h" id="tf2-t">{title} <em>{accent}</em></h2>
        {/* Bureau : index + visuel */}
        <div className="tf2__grid">
          <ol className="tf2__index">
            {items.map((x, i) => (
              <li key={i}>
                <button type="button" className={'tf2__item' + (i === cur ? ' is-on' : '')} aria-pressed={i === cur} onClick={() => setCur(i)}>
                  <span className="tf2__idate">{x.date}</span>
                  <span className="tf2__ititle">{x.title} {x.accent}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="tf2__view" ref={viewRef} aria-live="polite">
            <div className="tf2__media">{media(it, '(max-width: 900px) 100vw, 56vw')}</div>
            <div className="tf2__txt">{text(it)}</div>
          </div>
        </div>
        {/* Mobile : cartes au doigt */}
        <ul className="tf2__cards" aria-label="Temps forts">
          {items.map((x, i) => (
            <li key={i} className="tf2__card">
              <div className="tf2__cmedia">{media(x, '85vw')}</div>
              <div className="tf2__ctxt">{text(x)}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

window.HoverImageList = HoverImageList;
window.ImgSphere = ImgSphere;
window.TempsForts = TempsForts;

// ---------------------------------------------------------------------------
// Frise — suite d'étapes numérotées reliées par le fil du parcours
// (DIRECTION-ACCUEIL.md, règle 4). Composant partagé : accueil, puis pages
// projet et pages d'accompagnement.
// ≥ 900 px et mouvement normal : la frise s'épingle et le défilement vertical
// fait glisser les étapes à l'horizontale (même grammaire que la frise de
// Des Étoiles et des Femmes validée le 24/09/2026) ; chaque pastille s'allume
// quand le fil l'atteint, le rail du suivi sert de barre de progression.
// Sinon : liste verticale, chaque étape s'allume à son entrée dans l'écran.
// steps : [{ when, tab, title, text, stat, statL, img, alt, missing }] — sans img ni
// missing (ou cadres de chantier masqués), la carte est en texte seul.
// rail : { tab, title, text } (ce qui court sous toutes les étapes)
// ---------------------------------------------------------------------------
function Frise({ id = 'frise', title, accent, lede, steps = [], rail, cta, tone = 'tint', statique = false }) {
  const { useRef, useEffect } = React;
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current, g = window.gsap, ST = window.ScrollTrigger;
    if (!root) return;
    const items = [...root.querySelectorAll('.frise__step')];
    if (!g || !ST || (window.FESTIN_RM && window.FESTIN_RM())) { items.forEach((s) => s.classList.add('is-on')); return; }
    const triggers = [];
    const track = root.querySelector('.frise__track');
    const vp = root.querySelector('.frise__viewport');
    const bar = root.querySelector('.frise__bar');
    // statique : suite courte, jamais épinglée (étapes en colonnes au bureau)
    if (!statique && window.innerWidth >= 900 && track && vp) {
      root.classList.add('is-pinned');
      const dist = () => Math.max(0, track.scrollWidth - vp.clientWidth);
      const light = (p) => items.forEach((s, i) => {
        const at = items.length > 1 ? i / (items.length - 1) : 0;
        s.classList.toggle('is-on', p >= at - 0.04);
      });
      light(0);
      triggers.push(ST.create({
        trigger: root, start: 'top top', end: () => '+=' + Math.round(dist() * 1.15),
        pin: root.querySelector('.frise__inner'), scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => {
          track.style.transform = 'translate3d(' + (-self.progress * dist()) + 'px,0,0)';
          if (bar) bar.style.transform = 'scaleX(' + self.progress + ')';
          light(self.progress);
        },
      }));
    } else {
      items.forEach((s) => triggers.push(ST.create({ trigger: s, start: 'top 78%', once: true, onEnter: () => s.classList.add('is-on') })));
    }
    // la hauteur de la page change quand photos et polices arrivent : on recale
    let rt;
    const ro = new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => ST.refresh(), 160); });
    ro.observe(document.body);
    return () => { ro.disconnect(); clearTimeout(rt); triggers.forEach((t) => t.kill()); root.classList.remove('is-pinned'); if (track) track.style.transform = ''; };
  }, []);

  return (
    <section className={'frise frise--' + tone + (statique ? ' frise--static' : '')} id={id} ref={rootRef} aria-labelledby={id + '-t'}>
      <div className="frise__inner">
        <div className="wrap frise__head">
          <h2 className="frise__h" id={id + '-t'}>{title}{accent && <> <em>{accent}</em></>}</h2>
          {lede && <p className="frise__lede">{lede}</p>}
        </div>
        <div className="frise__viewport">
          <ol className="frise__track">
            {steps.map((s, i) => (
              <li className="frise__step" key={i}>
                <div className="frise__mark" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                <article className={'frise__card' + ((s.img || (s.missing && window.FESTIN_SHOW_PLACEHOLDERS)) ? '' : ' frise__card--txt')}>
                  {(s.img || (s.missing && window.FESTIN_SHOW_PLACEHOLDERS)) && (
                    <div className="frise__img">
                      {s.img
                        ? <window.Picture src={s.img} alt={s.alt || ''} sizes="(max-width: 900px) 100vw, 18vw" />
                        : <window.PhotoMissing subject={s.missing} ratio="4/3" />}
                    </div>
                  )}
                  <div className="frise__body">
                    <span className="frise__tab">{[s.when, s.tab].filter(Boolean).join(' · ')}</span>
                    <h3 className="frise__t">{s.title}</h3>
                    <p>{s.text}</p>
                    {s.stat && <p className="frise__stat"><strong>{s.stat}</strong> <span>{s.statL}</span></p>}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
        {(rail || cta) && (
          <div className="wrap frise__foot">
            {rail && (
              <div className="frise__rail">
                <span className="frise__bar" aria-hidden="true" />
                <p><span className="frise__railk">{rail.tab}</span> <b>{rail.title}.</b> {rail.text}</p>
              </div>
            )}
            {cta && <a className="frise__cta lnk" href={cta.href}>{cta.label} <span className="arrow" aria-hidden="true">→</span></a>}
          </div>
        )}
      </div>
    </section>
  );
}
window.Frise = Frise;
