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
// TempsForts — carrousel grand format, une image plein cadre par temps fort.
// Transition : la nouvelle image se dévoile par un volet (clip-path) pendant
// que l'ancienne recule ; le texte monte ensuite. Lecture automatique (7 s),
// en pause au survol, au focus et hors écran ; aucune lecture automatique
// avec mouvement réduit. Flèches du clavier, boutons, puces numérotées.
// items : [{ date, lieu, title, accent, text, img, alt, credit, href, cta }]
// ---------------------------------------------------------------------------
function TempsForts({ items: all = [], label = 'Temps forts' }) {
  // sans photo : diapositive visible seulement pendant le chantier
  const items = all.filter((it) => it.img || window.FESTIN_SHOW_PLACEHOLDERS);
  const { useRef, useState, useEffect, useCallback } = React;
  const rootRef = useRef(null);
  // cur : temps fort affiché ; last : le précédent, gardé visible sous le volet
  const [{ cur, last }, setPos] = useState({ cur: 0, last: 0 });
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const n = items.length;
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const go = useCallback((i) => setPos((p) => {
    const nx = ((i % n) + n) % n;
    return nx === p.cur ? p : { cur: nx, last: p.cur };
  }), [n]);

  useEffect(() => {
    const root = rootRef.current, g = window.gsap;
    if (!root) return;
    const slides = root.querySelectorAll('.tf__slide');
    const from = last;
    if (!g || reduce || from === cur) return;
    const inS = slides[cur], outS = slides[from];
    const dir = (cur > from && !(from === 0 && cur === n - 1)) || (from === n - 1 && cur === 0) ? 1 : -1;
    g.killTweensOf([inS, outS]);
    g.fromTo(inS, { clipPath: dir > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0%)', duration: 1.1, ease: 'expo.inOut' });
    g.fromTo(inS.querySelector('.tf__media'), { scale: 1.18, xPercent: dir * 6 }, { scale: 1.04, xPercent: 0, duration: 1.6, ease: 'expo.out' });
    g.fromTo(outS.querySelector('.tf__media'), { scale: 1.04, xPercent: 0 }, { scale: 1, xPercent: -dir * 12, duration: 1.1, ease: 'expo.inOut' });
    g.fromTo(inS.querySelectorAll('.tf__txt > *'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.07, delay: 0.45 });
  }, [cur]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduce || n < 2) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(root);
    const id = setInterval(() => { if (visible && !paused && !userPaused && !document.hidden) setPos((p) => ({ cur: (p.cur + 1) % n, last: p.cur })); }, 7000);
    return () => { clearInterval(id); io.disconnect(); };
  }, [paused, userPaused, n, cur]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
  };
  const URIx = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));
  const pad = (i) => String(i + 1).padStart(2, '0');
  if (!n) return null;

  return (
    <section className="tf on-dark" ref={rootRef} aria-roledescription="carrousel" aria-label={label}
      onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} onKeyDown={onKey}>
      <div className="tf__stage">
        {items.map((it, i) => (
          <article key={i} className={'tf__slide' + (i === cur ? ' is-on' : i === last ? ' is-last' : '')} aria-roledescription="diapositive"
            aria-label={pad(i) + ' sur ' + pad(n - 1)} aria-hidden={i !== cur}>
            <div className="tf__media">
              {it.img
                ? <window.Picture src={it.img} alt={it.alt || ''} sizes="100vw" loading="eager" />
                : <div className="tf__ph is-placeholder"><span>[PHOTO MANQUANTE : {it.title} {it.accent}, plan large, paysage]</span></div>}
            </div>
            <div className="tf__scrim" aria-hidden="true" />
            <div className="tf__txt">
              <span className="tf__meta">{it.date}{it.lieu && <> · {it.lieu}</>}</span>
              <h2 className="tf__t">{it.title}{it.accent && <> <em>{it.accent}</em></>}</h2>
              {it.text && <p className="tf__p">{it.text}</p>}
              {it.href && <a className="tf__link" href={it.href} tabIndex={i === cur ? 0 : -1}>{it.cta || 'Découvrir'} <span aria-hidden="true">→</span></a>}
            </div>
            {it.credit && <span className="tf__credit">Photo : {it.credit}</span>}
          </article>
        ))}
      </div>
      <div className="tf__bar">
        <span className="tf__eyb">{label}</span>
        <ol className="tf__dots">
          {items.map((it, i) => (
            <li key={i}>
              <button type="button" className={'tf__dot' + (i === cur ? ' is-on' : '')} aria-current={i === cur ? 'true' : undefined}
                aria-label={'Temps fort ' + (i + 1) + ' : ' + it.title + (it.accent ? ' ' + it.accent : '')} onClick={() => go(i)}>
                <span className="tf__dotn">{pad(i)}</span>
                <span className="tf__dotbar"><span style={{ animationPlayState: paused || userPaused || reduce ? 'paused' : 'running' }} key={cur + '-' + i} /></span>
              </button>
            </li>
          ))}
        </ol>
        <div className="tf__nav">
          {!reduce && n > 1 && (
            <button type="button" className="tf__arrow tf__pause" aria-pressed={userPaused} onClick={() => setUserPaused((v) => !v)}
              aria-label={userPaused ? 'Reprendre le défilement automatique' : 'Mettre en pause le défilement automatique'}>
              <span aria-hidden="true">{userPaused ? '▶' : '❚❚'}</span>
            </button>
          )}
          <button type="button" className="tf__arrow" aria-label="Temps fort précédent" onClick={() => go(cur - 1)}>←</button>
          <button type="button" className="tf__arrow" aria-label="Temps fort suivant" onClick={() => go(cur + 1)}>→</button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{pad(cur)} sur {pad(n - 1)} : {items[cur].title} {items[cur].accent}</p>
    </section>
  );
}

window.HoverImageList = HoverImageList;
window.ImgSphere = ImgSphere;
window.TempsForts = TempsForts;
