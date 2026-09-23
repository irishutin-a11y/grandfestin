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
    ? <span className={cls + ' hil__ph'}><span>Photo à venir</span></span>
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
// images : [{ src, alt, title, text }]
// Répartition : spirale de Fibonacci (espacement régulier sur la sphère).
// ---------------------------------------------------------------------------
function ImgSphere({ images = [], size = 520, radius, autoSpeed = 0.18, label = 'Galerie en sphère' }) {
  const { useRef, useState, useEffect, useMemo } = React;
  const stageRef = useRef(null);
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

  return (
    <div className="isph" style={{ '--isph-size': size + 'px', '--isph-tile': tile + 'px' }}>
      <div className="isph__stage" ref={stageRef} role="group" aria-label={label + ' — faites glisser pour tourner'}>
        {images.map((im, i) => (
          <button key={i} type="button" className="isph__node"
            ref={(el) => (nodes.current[i] = el)}
            aria-label={'Agrandir : ' + (im.title || im.alt || 'image ' + (i + 1))}
            onClick={() => { if (stageRef.current.dataset.moved !== '1') setOpen(im); }}>
            <img src={URIx(im.src)} alt="" loading="lazy" draggable="false" />
          </button>
        ))}
      </div>
      {open && (
        <div className="isph__modal" role="dialog" aria-modal="true" aria-label={open.title || 'Image'} onClick={() => setOpen(null)}>
          <figure className="isph__fig" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="isph__close" aria-label="Fermer" onClick={() => setOpen(null)}>✕</button>
            <img src={URIx(open.src)} alt={open.alt || ''} />
            {(open.title || open.text) && (
              <figcaption>{open.title && <strong>{open.title}</strong>}{open.text && <span>{open.text}</span>}</figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  );
}

window.HoverImageList = HoverImageList;
window.ImgSphere = ImgSphere;
