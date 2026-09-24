// Sections.jsx — Ticker, Festin section, Publics, Témoignages, Contact, Footer

// ---------------------------------------------------------------------------
// Picture — sert l'AVIF quand il existe, avec repli JPEG et deux largeurs.
// Les variantes vivent dans images/web/{800,1600}/ et sont listées dans
// data/images-manifest.js (généré). Une image absente du manifeste est rendue
// telle quelle : aucun risque de lien mort.
// ---------------------------------------------------------------------------
const URI = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));

function Picture({ src, alt = '', sizes = '100vw', className, imgClassName, style, loading = 'lazy', fetchPriority, ...rest }) {
  const rel = String(src || '').replace(/^images\//, '');
  const entry = window.FESTIN_IMG && window.FESTIN_IMG[rel];
  const img = (
    <img
      src={URI(src)} alt={alt} className={imgClassName || className} style={style}
      loading={loading} decoding="async" fetchpriority={fetchPriority} {...rest}
    />
  );
  if (!entry) return img;

  const stem = rel.replace(/\.[^.]+$/, '');
  const set = (widths, ext) => widths
    .map(w => URI('images/web/' + w + '/' + stem + '.' + ext) + ' ' + w + 'w')
    .join(', ');

  return (
    <picture className={className}>
      {entry.avif && entry.avif.length > 0 && (
        <source type="image/avif" srcSet={set(entry.avif, 'avif')} sizes={sizes} />
      )}
      <source type="image/jpeg" srcSet={set(entry.w, 'jpg')} sizes={sizes} />
      {img}
    </picture>
  );
}
// Contact — formulaire honnête : le site n'a pas de serveur d'envoi. À la
// validation, il prépare le message dans la messagerie de la personne
// (mailto), adressé à la bonne boîte selon le motif, et le dit clairement.
// Libellés liés, autocomplete, erreurs annoncées (aria-invalid + message).
function Contact() {
  const c = window.FESTIN_DATA.contact;
  const [etat, setEtat] = React.useState('saisie'); // 'saisie' | 'ouvert'
  const [err, setErr] = React.useState({});
  const [dest, setDest] = React.useState(c.email);
  const motifs = [
    { value: 'Recruter ou accueillir un stagiaire', label: 'Recruter, accueillir un stagiaire', icon: 'handshake' },
    { value: 'Se former', label: 'Se former', icon: 'graduation-cap' },
    { value: 'Mécénat ou partenariat', label: 'Mécénat ou partenariat', icon: 'users', to: 'partenariat@grandfestin.com' },
    { value: 'Presse', label: 'Presse', icon: 'newspaper' },
    { value: 'Orienter une personne', label: 'Orienter une personne', icon: 'hand-coins' },
  ];
  const onSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget, v = (n) => (f.elements[n] && f.elements[n].value || '').trim();
    const e2 = {};
    if (!v('prenom')) e2.prenom = 'Indiquez votre prénom.';
    if (!v('nom')) e2.nom = 'Indiquez votre nom.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('email'))) e2.email = 'Indiquez une adresse e-mail valide, par exemple nom@exemple.fr.';
    setErr(e2);
    if (Object.keys(e2).length) { const first = f.elements[Object.keys(e2)[0]]; if (first) first.focus(); return; }
    const m = motifs.find((x) => x.value === v('motif')) || motifs[0];
    const to = m.to || c.email;
    const corps = [
      v('message'),
      '',
      '---',
      'De : ' + v('prenom') + ' ' + v('nom') + ' <' + v('email') + '>',
      v('organisation') && 'Organisation : ' + v('organisation'),
      v('formation') && 'Formation concernée : ' + v('formation'),
    ].filter((x) => x !== false && x !== '').join('\n');
    setDest(to);
    window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent('[' + m.value + '] ' + v('prenom') + ' ' + v('nom')) + '&body=' + encodeURIComponent(corps);
    setEtat('ouvert');
  };
  const fe = (n) => err[n] ? { 'aria-invalid': true, 'aria-describedby': 'err-' + n } : {};
  return (
    <section className="isec isec--white contact2" id="contact" aria-labelledby="contact-t">
      <div className="wrap contact2__grid">
        <div className="contact2__info">
          <h2 className="isec__h" id="contact-t">Nos <em>coordonnées</em></h2>
          <dl className="contact2__dl">
            <div><dt>E-mail</dt><dd><a href={'mailto:' + c.email}>{c.email}</a></dd></div>
            <div><dt>Mécénat et partenariats</dt><dd><a href="mailto:partenariat@grandfestin.com">partenariat@grandfestin.com</a></dd></div>
            <div><dt>Presse</dt><dd><a href={'mailto:' + c.email}>{c.email}</a>, à l'attention d'Iris Hutin</dd></div>
            <div><dt>Adresse</dt><dd>{c.address}</dd></div>
            <div><dt>Accessibilité et handicap</dt><dd>Lucie Gueydon, responsable handicap et pédagogique : aménagements et coordination des formations</dd></div>
            <div><dt>Numéros</dt><dd>NDA {c.nda} · SIRET {c.siret}</dd></div>
          </dl>
        </div>
        <div className="contact2__form">
          <h3 className="contact2__h3">Écrivez-nous</h3>
          {etat === 'ouvert' ? (
            <div className="contact2__ok" role="status">
              <p><b>Votre messagerie s'est ouverte</b> avec votre message prêt à partir vers {dest}. Il ne vous reste qu'à l'envoyer.</p>
              <p>Rien ne s'est ouvert ? Écrivez directement à <a href={'mailto:' + dest}>{dest}</a>.</p>
              <button type="button" className="apmore" onClick={() => setEtat('saisie')}>Revenir au formulaire</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <p className="contact2__note">Les champs marqués d'un astérisque sont obligatoires. À l'envoi, votre messagerie s'ouvre avec le message prêt à partir.</p>
              <div className="field-row">
                <div className="field"><label htmlFor="c-prenom">Prénom <span aria-hidden="true">*</span></label><input id="c-prenom" name="prenom" autoComplete="given-name" required {...fe('prenom')} />{err.prenom && <p className="field__err" id="err-prenom">{err.prenom}</p>}</div>
                <div className="field"><label htmlFor="c-nom">Nom <span aria-hidden="true">*</span></label><input id="c-nom" name="nom" autoComplete="family-name" required {...fe('nom')} />{err.nom && <p className="field__err" id="err-nom">{err.nom}</p>}</div>
              </div>
              <div className="field"><label htmlFor="c-email">E-mail <span aria-hidden="true">*</span></label><input id="c-email" name="email" type="email" autoComplete="email" inputMode="email" required {...fe('email')} />{err.email && <p className="field__err" id="err-email">{err.email}</p>}</div>
              <div className="field"><label htmlFor="c-org">Organisation</label><input id="c-org" name="organisation" autoComplete="organization" /></div>
              <fieldset className="field motif-group">
                <legend>Motif de votre demande</legend>
                {motifs.map((o, i) => (
                  <label key={o.value} className="motif-pill">
                    <input type="radio" name="motif" value={o.value} defaultChecked={i === 0} />
                    <span className="motif-pill__inner"><i data-lucide={o.icon} style={{ width: 18, height: 18 }} aria-hidden="true" /><span>{o.label}</span></span>
                  </label>
                ))}
              </fieldset>
              <div className="field"><label htmlFor="c-formation">Formation concernée (facultatif)</label>
                <select id="c-formation" name="formation" defaultValue="">
                  <option value="">Je ne sais pas encore</option>
                  <option>Prévention des violences sexistes et sexuelles</option>
                  <option>Management juste et inclusif</option>
                  <option>Des Étoiles et des Femmes, titre de commis de cuisine</option>
                  <option>Des Étoiles et des Femmes, CAP cuisine</option>
                  <option>Tournesol</option>
                </select>
              </div>
              <div className="field"><label htmlFor="c-msg">Message</label><textarea id="c-msg" name="message" rows={5} /></div>
              <button type="submit" className="btnb btnb--teal contact2__submit">Préparer mon message <span className="arrow" aria-hidden="true">→</span></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// Footer partagé — grand titre révélé derrière + panneau qui glisse par-dessus (maquette home-b)
function Footer() {
  const data = window.FESTIN_DATA;
  // Le bloc de clôture fait partie du pied de page : une seule surface sombre,
  // traversée par le trait du parcours (retour du 24/09/2026 : les deux blocs
  // empilés ne s'accordaient pas). Absent là où la page a son propre appel final.
  const hash = useRoute();
  const sansFin = ['#/', '#/contact', '#/accompagnement/insertion', '#/accompagnement/professionnels'].includes(hash);
  return (
    <div className="footer-outer">
      <footer className="footer">
        <div className="footer__bg">
          <img src="images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg" alt="" loading="lazy" />
        </div>
        <div className="footer__scrim" aria-hidden="true"></div>
        <window.Trait className="footer__trait" width={120} draw={false} />
        <div className="wrap">
          {!sansFin && <FinDePage />}
          <div className="footer__grid">
            <div className="footer__brand">
              <img className="footer__logo" src={data.brand.logoGold} alt="Festin" loading="lazy" />
              <p className="footer__tagline">{data.brand.tagline}</p>
              <p>Festin est une association loi 1901, à but non lucratif et d'intérêt général, agréée ESUS. Depuis Marseille, elle forme des personnes aux métiers de la cuisine et aide les restaurants à recruter.</p>
              <a className="footer__don" href={data.donation} target="_blank" rel="noopener noreferrer">
                <i data-lucide="heart" style={{ width: 16, height: 16 }} aria-hidden="true" />
                Faire un don
              </a>
            </div>
            <div>
              <h2 className="footer__h">Nous contacter</h2>
              <ul>
                <li><a href="#/contact">Écrire à Festin</a></li>
                <li><a href={`mailto:${data.contact.email}`}>{data.contact.email}</a></li>
                <li><span>{data.contact.address}</span></li>
              </ul>
            </div>
            <div>
              <h2 className="footer__h">S'engager</h2>
              <ul>
                <li><a href="#/accompagnement/insertion">Apprendre un métier</a></li>
                <li><a href="#/accompagnement/professionnels">Acteurs du secteur</a></li>
                <li><a href="mailto:partenariat@grandfestin.com">Mécénat et partenariats</a></li>
              </ul>
              <h2 className="footer__h footer__h--2">L'association</h2>
              <ul>
                <li><a href="#/about">Qui sommes-nous</a></li>
                <li><a href="#/impact">Notre impact</a></li>
                <li><a href="#/actualites">Actualités et presse</a></li>
                <li><a href="/mentions-legales">Mentions légales</a></li>
              </ul>
            </div>
            <div>
              <h2 className="footer__h">Nos projets</h2>
              <ul>
                {data.projets.map(p => (
                  <li key={p.id}><a href={`#/projets/${p.id}`}>{p.shortTitle}</a></li>
                ))}
                <li><a href="#/academie">Académie Festin</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 Festin · <a href={data.brand.site} target="_blank" rel="noopener">grandfestin.com</a></span>
            <div className="footer__social">
              <a href="https://www.instagram.com/association_festin/" target="_blank" rel="noopener" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/associationfestin" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
            <span>{data.contact.legalMention}</span>
            <span>NDA {data.contact.nda} · Académie Festin, organisme de formation certifié Qualiopi</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// FloatingCTA — bouton flottant "Agir maintenant". Plus rendu depuis le
// 24/09/2026 (DIRECTION-ACCUEIL.md §4 : il doublait le don et le menu).
function FloatingCTA() {
  const { useState, useEffect } = React;
  const [open, setOpen] = useState(false);
  const data = window.FESTIN_DATA;
  const lesBeauxMets = data.projets.find(p => p.id === 'les-beaux-mets');
  const actions = [
    { t: "Faire un don", d: "Soutenir Festin — HelloAsso", ic: "heart", c: "var(--coral, #E4572E)", href: data.donation, external: true },
    { t: "Réserver une table", d: "Les Beaux Mets — Baumettes", ic: "calendar-check", c: "var(--teal)", href: lesBeauxMets.ctaUrl, external: true },
    { t: "Se former / candidater", d: "Rejoindre une promotion", ic: "graduation-cap", c: "var(--gold-ink)", href: "#/formations" },
    { t: "Recruter via Festin", d: "Recruter et manager autrement", ic: "briefcase", c: "var(--teal-secondary)", href: "#/accompagnement/professionnels" },
    { t: "Devenir partenaire", d: "Mécénat & soutien", ic: "handshake", c: "var(--violet, #9A5BA8)", href: "#/contact" },
  ];
  // Le bouton s'efface dès que le footer entre à l'écran : il ne recouvre plus
  // le contenu de bas de page (liens, réseaux sociaux, mentions légales).
  const [atFooter, setAtFooter] = useState(false);
  useEffect(() => {
    const footer = document.querySelector('.footer-outer');
    if (!footer || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => { setAtFooter(entry.isIntersecting); if (entry.isIntersecting) setOpen(false); },
      { rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <>
      {open && <div className="fab-scrim" onClick={() => setOpen(false)} />}
      <div className={"fab-wrap" + (atFooter ? " fab-wrap--hidden" : "")}>
        {open && (
          <div className="fab-actions">
            {actions.map((a, i) => (
              <a className="fab-card" key={a.t} href={a.href} target={a.external ? '_blank' : undefined} rel={a.external ? 'noopener' : undefined} style={{ animationDelay: (i * 45) + 'ms' }}>
                <span className="fab-card__ic" style={{ background: a.c + '1F', color: a.c }}><i data-lucide={a.ic} style={{ width: 20, height: 20 }} /></span>
                <span><h4>{a.t}</h4><p>{a.d}</p></span>
              </a>
            ))}
          </div>
        )}
        <button className={"fab" + (open ? " open" : "")} onClick={() => setOpen(o => !o)} aria-expanded={open}>
          <i data-lucide="heart-handshake" style={{ width: 20, height: 20 }} />
          <span className="fab__label">Agir maintenant</span>
          <i data-lucide="chevron-up" className="fab__chev" style={{ width: 18, height: 18 }} />
        </button>
      </div>
    </>
  );
}

// ProjetExtra — section d'enrichissement réutilisée par les fiches projet (styles : .pxs* dans styles.css)
function ProjetExtra({ eyebrow, title, accent, lede, tone = 'cream', children }) {
  return (
    <section className={'pxs pxs--' + tone}>
      <div className="pxs__wrap">
        <span className="pxs__eyebrow">{eyebrow}</span>
        <h2 className="pxs__title">{title}{accent && <> <em>{accent}</em></>}</h2>
        {lede && <p className="pxs__lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
// ---------------------------------------------------------------------------
// TestiCarousel — témoignages en grande citation, une à la fois, avec flèches
// (retour du 24/09/2026 : remplace les bandeaux défilants, accueil compris).
// Pas de défilement automatique. Flèches du clavier quand le bloc a le focus,
// annonce polie du changement. items : [{ name, meta, accroche, quote, photo,
// objPos, bw, logo, chip }]. Citations reprises mot pour mot.
// ---------------------------------------------------------------------------
function TestiCarousel({ items = [], label = 'Témoignages' }) {
  const real = items.filter((t) => t && t.quote);
  const [i, setI] = React.useState(0);
  const qRef = React.useRef(null);
  const n = real.length;
  const go = (d) => setI((v) => (v + d + n) % n);
  React.useEffect(() => {
    const g = window.gsap, el = qRef.current;
    if (!g || !el || (window.FESTIN_RM && window.FESTIN_RM())) return;
    const tw = g.fromTo(el.querySelectorAll('.tq__q, .tq__who, .tq__media'), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06 });
    return () => tw.kill();
  }, [i]);
  if (!n) return null;
  const t = real[i];
  const pad = (k) => String(k + 1).padStart(2, '0');
  const ini = (t.name || '?').trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('');
  return (
    <div className="tq" role="group" aria-roledescription="carrousel" aria-label={label} tabIndex={n > 1 ? 0 : undefined}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } }}>
      <div className="tq__body" ref={qRef}>
        <div className="tq__media" aria-hidden="true">
          {t.photo
            ? <img src={URI(t.photo)} alt="" loading="lazy" style={{ objectPosition: t.objPos || 'center 20%', filter: t.bw ? 'grayscale(1)' : undefined }} />
            : t.logo ? <span className="tq__logo"><img src={URI(t.logo)} alt="" loading="lazy" /></span>
            : <span className="tq__ini">{ini}</span>}
        </div>
        <figure className="tq__fig">
          <blockquote className="tq__q">
            {t.accroche && <p className="tq__acc">« {t.accroche} »</p>}
            <p>« {t.quote} »</p>
          </blockquote>
          <figcaption className="tq__who">
            <b>{t.name}</b>{t.meta && <span>{t.meta}</span>}{t.chip && <span className="tq__chip">{t.chip}</span>}
          </figcaption>
        </figure>
      </div>
      {n > 1 && (
        <div className="tq__nav">
          <span className="tq__count" aria-hidden="true"><b>{pad(i)}</b> / {pad(n - 1)}</span>
          <button type="button" className="tq__arrow" onClick={() => go(-1)} aria-label="Témoignage précédent">←</button>
          <button type="button" className="tq__arrow" onClick={() => go(1)} aria-label="Témoignage suivant">→</button>
          <span className="sr-only" aria-live="polite">Témoignage {i + 1} sur {n} : {t.name}</span>
        </div>
      )}
    </div>
  );
}

window.ProjetExtra = ProjetExtra;
window.TestiCarousel = TestiCarousel;
window.Picture = Picture;

window.Contact = Contact;
window.Footer = Footer;
window.FloatingCTA = FloatingCTA;

// ---------------------------------------------------------------------------
// PhotoMissing — cadre au bon ratio pour une photo que l'association n'a pas
// encore fournie. Visible seulement si FESTIN_SHOW_PLACEHOLDERS (index.html).
// ---------------------------------------------------------------------------
function PhotoMissing({ subject, cadrage = 'plan moyen', orientation = 'paysage', ratio = '4/3', className = '' }) {
  if (!window.FESTIN_SHOW_PLACEHOLDERS) return null;
  return (
    <div className={'ph-photo is-placeholder ' + className} style={{ aspectRatio: ratio }} role="img" aria-label={'Photo manquante : ' + subject}>
      [PHOTO MANQUANTE : {subject}, {cadrage}, {orientation}]
    </div>
  );
}
window.PhotoMissing = PhotoMissing;

// ---------------------------------------------------------------------------
// Trait — le « trait du parcours », signature visuelle (même tracé que la
// transition de page). Décoratif (aria-hidden). draw : se dessine à l'arrivée.
// ---------------------------------------------------------------------------
function Trait({ className = '', width = 150, draw = true, delay = 0.2 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const p = ref.current, g = window.gsap;
    if (!p || !g || !draw || (window.FESTIN_RM && window.FESTIN_RM())) return;
    const len = p.getTotalLength();
    const tw = g.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.2, ease: 'expo.inOut', delay });
    return () => tw.kill();
  }, []);
  return (
    <svg className={'trait ' + className} viewBox="0 0 1316 664" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <path ref={ref} d={window.FESTIN_TRAIT} fill="none" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
window.Trait = Trait;

// ---------------------------------------------------------------------------
// FinDePage — même bloc de clôture sur chaque page (sauf Contact) : une phrase
// d'action et trois portes. Famille or. Rendu par App (index.html).
// ---------------------------------------------------------------------------
function FinDePage() {
  const F = window.FESTIN_DATA.fin;
  if (!F) return null;
  return (
    <div className="fin" role="region" aria-labelledby="fin-t">
      <h2 className="fin__t" id="fin-t">{F.title} <em>{F.accent}</em></h2>
      <ul className="fin__links">
        {F.links.map((l) => (
          <li key={l.href}><a href={l.href}><span className="fin__who">{l.who}</span><span className="fin__what">{l.label} <span className="arrow" aria-hidden="true">→</span></span></a></li>
        ))}
      </ul>
    </div>
  );
}
window.FinDePage = FinDePage;

// ---------------------------------------------------------------------------
// HeroPage — hero des pages intérieures (grammaire beetogreen, DIRECTION.md) :
// couleur pleine d'une famille de la charte, trait du parcours, une étiquette
// (la seule de la page), un titre-phrase, une preuve, une photo facultative.
// tone : 'teal' | 'deep' | 'gold'
// ---------------------------------------------------------------------------
function HeroPage({ tone = 'teal', kicker, title, accent, proof, note, img, imgAlt = '', crumb = [], logo, logoAlt = '', children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const g = window.gsap, el = ref.current;
    if (!g || !el || (window.FESTIN_RM && window.FESTIN_RM())) return;
    const M = window.FESTIN_MOTION;
    const tl = g.timeline({ defaults: { ease: M.ease, duration: M.dur.title } })
      .from(el.querySelector('.hp__t'), { yPercent: 16, autoAlpha: 0 }, 0.1)
      .from(el.querySelectorAll('.hp__logo, .hp__kicker, .hp__proof, .hp__more, .hp__note'), { y: M.y, autoAlpha: 0, stagger: M.stagger }, 0.3);
    const media = el.querySelector('.hp__media');
    if (media) tl.from(media, { clipPath: 'inset(10% 10% 10% 10% round 32px)', scale: 1.06, duration: 1.4 }, 0.15);
    return () => tl.kill();
  }, []);
  return (
    <header className={'hp hp--' + tone + (img ? ' hp--img' : '') + (tone === 'gold' ? '' : ' on-dark')} ref={ref}>
      <window.Trait className="hp__trait" width={160} />
      <div className="wrap hp__grid">
        <div className="hp__txt">
          {crumb.length > 0 && (
            <nav className="hp__crumb" aria-label="Fil d'Ariane">
              {crumb.map((c, i) => (
                <React.Fragment key={i}>{i > 0 && <span aria-hidden="true"> / </span>}{c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</React.Fragment>
              ))}
            </nav>
          )}
          {logo && !img && <span className="hp__logo"><img src={URI(logo)} alt={logoAlt} /></span>}
          {kicker && <span className="kicker hp__kicker">{kicker}</span>}
          <h1 className="hp__t">{title} {accent && <em>{accent}</em>}</h1>
          {proof && <p className="hp__proof">{proof}</p>}
          {children && <div className="hp__more">{children}</div>}
          {note && <p className="hp__note">{note}</p>}
        </div>
        {img && (
          <div className="hp__mediawrap">
            <figure className="hp__media"><window.Picture src={img} alt={imgAlt} sizes="(max-width: 900px) 100vw, 44vw" loading="eager" /></figure>
            {/* logo de projet en surimpression, coin haut droit de l'image (retour du 24/09/2026) */}
            {logo && <span className="hp__logo hp__logo--over"><img src={URI(logo)} alt={logoAlt} /></span>}
          </div>
        )}
      </div>
    </header>
  );
}
window.HeroPage = HeroPage;

// ---------------------------------------------------------------------------
// Faq — questions fréquentes. Uniquement des réponses déjà publiées sur le site.
// Boutons natifs (aria-expanded / aria-controls), ouverture par grid-template-rows.
// items : [{ q, a }] — a peut être du JSX.
// ---------------------------------------------------------------------------
function Faq({ title = 'Vos questions', accent, items = [], tone = 'white', id = 'faq' }) {
  const [open, setOpen] = React.useState(-1);
  return (
    <section className={'isec isec--' + tone + ' faq'} aria-labelledby={id + '-t'}>
      <div className="wrap faq__grid">
        <h2 className="isec__h" id={id + '-t'}>{title} {accent && <em>{accent}</em>}</h2>
        <ul className="faq__list">
          {items.map((it, i) => {
            const on = open === i;
            return (
              <li className={'faq__item' + (on ? ' is-open' : '')} key={i}>
                <h3 className="faq__q">
                  <button type="button" aria-expanded={on} aria-controls={id + '-a' + i} id={id + '-q' + i} onClick={() => setOpen(on ? -1 : i)}>
                    <span>{it.q}</span><span className="faq__ic" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq__a" id={id + '-a' + i} role="region" aria-labelledby={id + '-q' + i}>
                  <div className="faq__in"><p>{it.a}</p></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
window.Faq = Faq;

// ---------------------------------------------------------------------------
// MarqueePause — arrête un bandeau qui défile en continu (WCAG 2.2.2).
// Se place dans l'élément porteur de data-marquee, qui reçoit .is-paused.
// ---------------------------------------------------------------------------
function MarqueePause({ label = 'le défilement' }) {
  const [p, setP] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current && ref.current.closest('[data-marquee]');
    if (host) host.classList.toggle('is-paused', p);
  }, [p]);
  if (window.FESTIN_RM && window.FESTIN_RM()) return null;
  return (
    <button type="button" ref={ref} className="mpause" aria-pressed={p} onClick={() => setP((v) => !v)}>
      <span aria-hidden="true">{p ? '▶' : '❚❚'}</span> {p ? 'Reprendre' : 'Pause'}<span className="sr-only"> {label}</span>
    </button>
  );
}
window.MarqueePause = MarqueePause;
