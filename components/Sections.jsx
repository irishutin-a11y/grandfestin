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
function Contact() {
  const c = window.FESTIN_DATA.contact;
  const [sent, setSent] = React.useState(false);
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__info">
            <div>
              <span className="eyebrow">Contact</span>
              <h2 className="h2">Nos <em className="accent">coordonnées</em></h2>
              <p className="lede" style={{marginTop:12}}>Une question simple ? Un e-mail suffit. Pour un projet, le formulaire nous aide à vous orienter vers la bonne personne.</p>
            </div>
            <div className="contact-items">
              <div className="contact-item"><div className="contact-item__icon"><i data-lucide="mail" style={{width:18,height:18}}/></div><div><div className="contact-item__lbl">Email</div><div className="contact-item__v">{c.email}</div></div></div>
              <div className="contact-item"><div className="contact-item__icon"><i data-lucide="map-pin" style={{width:18,height:18}}/></div><div><div className="contact-item__lbl">Adresse</div><div className="contact-item__v">{c.address}</div></div></div>
              <div className="contact-item"><div className="contact-item__icon"><i data-lucide="file-text" style={{width:18,height:18}}/></div><div><div className="contact-item__lbl">NDA / Siret</div><div className="contact-item__v">NDA {c.nda} · Siret {c.siret}</div></div></div>
            </div>
            <div className="contact-note">
              <i data-lucide="newspaper" style={{width:18,height:18,flexShrink:0,marginTop:2}} aria-hidden="true"/>
              <div>
                <b>Journalistes</b> : <a href="mailto:contact@grandfestin.com">contact@grandfestin.com</a>, à l'attention d'Iris Hutin.<br/>
                <b>Mécénat et partenariats</b> : <a href="mailto:partenariat@grandfestin.com">partenariat@grandfestin.com</a>
              </div>
            </div>
            <div className="refs">
              <div className="ref-card"><div className="ref-card__lbl">Responsable handicap et pédagogique</div><div className="ref-card__name">Lucie Gueydon</div><div className="ref-card__role">Accessibilité, aménagements et coordination des formations</div></div>
              <div className="ref-card"><div className="ref-card__lbl">Restaurateurs et partenaires</div><div className="ref-card__name">Armand Hurault</div><div className="ref-card__role">Directeur général, interlocuteur des restaurateurs et des partenaires</div></div>
            </div>
          </div>
          <div className="contact__form">
            <h3 className="h3">Écrivez-nous</h3>
            <p className="body">Dites-nous qui vous êtes et ce que vous cherchez : la bonne personne vous répond sous 48 h ouvrées.</p>
            {sent ? (
              <div className="form-success"><b>Merci, votre message a été envoyé.</b><br/>Nous vous répondrons sous 48h à l'adresse indiquée.</div>
            ) : (
              <form onSubmit={(e)=>{e.preventDefault();setSent(true);}}>
                <div className="field-row">
                  <div className="field"><label>Prénom <span style={{color:'var(--teal)'}} aria-hidden="true">*</span></label><input required defaultValue=""/></div>
                  <div className="field"><label>Nom <span style={{color:'var(--teal)'}} aria-hidden="true">*</span></label><input required/></div>
                </div>
                <div className="field"><label>Email <span style={{color:'var(--teal)'}} aria-hidden="true">*</span></label><input type="email" required placeholder="vous@exemple.fr"/></div>
                <div className="field"><label>Organisation</label><input placeholder="Restaurant, OPCO, collectivité…"/></div>
                <div className="field">
                  <label>Motif de votre demande <span style={{color:'var(--teal)'}} aria-hidden="true">*</span></label>
                  <div className="motif-group" role="radiogroup" aria-required="true">
                    {[
                      { value: 'engager', label: 'Recruter, accueillir un stagiaire', icon: 'handshake' },
                      { value: 'former',  label: 'Se former', icon: 'graduation-cap' },
                      { value: 'partner', label: 'Mécénat ou partenariat', icon: 'users' },
                      { value: 'presse',  label: 'Presse', icon: 'newspaper' },
                      { value: 'orienter', label: 'Orienter une personne', icon: 'hand-coins' },
                    ].map((o, i) => (
                      <label key={o.value} className="motif-pill">
                        <input type="radio" name="motif" value={o.value} required defaultChecked={i===0}/>
                        <span className="motif-pill__inner">
                          <i data-lucide={o.icon} style={{width:18,height:18}}/>
                          <span>{o.label}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field"><label>Formation concernée <span style={{color:'var(--ink-soft)',fontWeight:400}}>(facultatif)</span></label><select defaultValue=""><option value="">Toutes formations / je ne sais pas encore</option><option>Prévention des violences sexistes et sexuelles</option><option>Management juste &amp; inclusif</option><option>Des Étoiles et des Femmes, titre de commis de cuisine</option><option>Des Étoiles et des Femmes, CAP cuisine</option><option>Tournesol</option></select></div>
                <div className="field"><label>Message</label><textarea placeholder="Votre besoin, votre contexte…"/></div>
                <button type="submit" className="btn btn--teal" style={{width:'100%',justifyContent:'center'}}>Envoyer le message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer partagé — grand titre révélé derrière + panneau qui glisse par-dessus (maquette home-b)
function Footer() {
  const data = window.FESTIN_DATA;

  return (
    <div className="footer-outer">
      <footer className="footer">
        <div className="footer__bg">
          <img src="images/images-def/DEF_LEGRANDFESTIN_namarante_13102024_000034.jpg" alt="" loading="lazy" />
        </div>
        <div className="footer__scrim" aria-hidden="true"></div>
        <div className="wrap">
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
              <h5>Nous contacter</h5>
              <ul>
                <li><a href="#/contact">Écrire à Festin</a></li>
                <li><a href={`mailto:${data.contact.email}`}>{data.contact.email}</a></li>
                <li><span>{data.contact.address}</span></li>
              </ul>
            </div>
            <div>
              <h5>S'engager</h5>
              <ul>
                <li><a href="#/accompagnement/professionnels">Restaurateurs</a></li>
                <li><a href="#/contact">Partenaires &amp; financeurs</a></li>
                <li><a href="#/accompagnement/insertion">Parcours d'insertion</a></li>
                <li><a href="#/contact">Mécénat</a></li>
              </ul>
            </div>
            <div>
              <h5>Nos projets</h5>
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

// FloatingCTA — bouton flottant "Agir maintenant", sur toutes les pages
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
// TestiCarousel — carrousel défilant des témoignages, standard des pages projet.
// Sans dégradé sur les bords. S'il y a moins de `min` témoignages, la piste est
// complétée par des cadres « à venir » (contenu fourni plus tard).
// items : [{ name, meta, accroche, quote, photo, objPos, bw }]
// ---------------------------------------------------------------------------
function TestiCarousel({ items = [], min = 6, label = 'Témoignages' }) {
  const real = items.filter(Boolean);
  const filled = real.slice();
  while (window.FESTIN_SHOW_PLACEHOLDERS && filled.length < min) filled.push({ empty: true });
  // Moins de trois témoignages réels et pas de cadres « à venir » : pas de
  // défilement (une piste qui boucle sur une ou deux cartes fait maquette).
  const still = filled.length < 3;
  const loop = still ? filled : filled.concat(filled);
  const tones = ['teal', 'cream', 'deep', 'gold'];
  if (!filled.length) return null;
  return (
    <div className={'tcar' + (still ? ' tcar--still' : '')} role="region" aria-label={label} data-marquee>
      {!still && <MarqueePause label="des témoignages" />}
      <div className="tcar__track" style={{ '--tcar-dur': (filled.length * 7) + 's' }}>
        {loop.map((t, i) => (
          <div className="tcar__item" key={i} aria-hidden={i >= filled.length ? true : undefined}>
            {t.empty ? (
              <article className="tcar__card tcar__card--empty is-placeholder">
                <span className="tcar__ph" aria-hidden="true" />
                <p>Témoignage à venir</p>
              </article>
            ) : (
              <article className={'tcar__card tcar__card--' + tones[(i % filled.length) % tones.length] + (t.bw ? ' is-bw' : '')}>
                <div className="tcar__head">
                  {t.photo
                    ? <img className="tcar__photo" src={URI(t.photo)} alt={'Portrait de ' + t.name} loading="lazy" style={{ objectPosition: t.objPos || 'center 18%' }} />
                    : <span className="tcar__photo tcar__photo--ini" aria-hidden="true">{(t.name || '?').trim().charAt(0)}</span>}
                  <div>
                    <h3 className="tcar__name">{t.name}</h3>
                    {t.meta && <span className="tcar__meta">{t.meta}</span>}
                  </div>
                </div>
                {t.accroche && <p className="tcar__accroche">« {t.accroche} »</p>}
                <p className="tcar__quote">« {t.quote} »</p>
              </article>
            )}
          </div>
        ))}
      </div>
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
    <section className="fin" aria-labelledby="fin-t">
      <div className="wrap fin__in">
        <h2 className="fin__t" id="fin-t">{F.title} <em>{F.accent}</em></h2>
        <ul className="fin__links">
          {F.links.map((l) => (
            <li key={l.href}><a href={l.href}><span className="fin__who">{l.who}</span><span className="fin__what">{l.label} <span className="arrow" aria-hidden="true">→</span></span></a></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
window.FinDePage = FinDePage;

// ---------------------------------------------------------------------------
// HeroPage — hero des pages intérieures (grammaire beetogreen, DIRECTION.md) :
// couleur pleine d'une famille de la charte, trait du parcours, une étiquette
// (la seule de la page), un titre-phrase, une preuve, une photo facultative.
// tone : 'teal' | 'deep' | 'gold'
// ---------------------------------------------------------------------------
function HeroPage({ tone = 'teal', kicker, title, accent, proof, note, img, imgAlt = '', crumb = [], children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const g = window.gsap, el = ref.current;
    if (!g || !el || (window.FESTIN_RM && window.FESTIN_RM())) return;
    const M = window.FESTIN_MOTION;
    const tl = g.timeline({ defaults: { ease: M.ease, duration: M.dur.title } })
      .from(el.querySelector('.hp__t'), { yPercent: 16, autoAlpha: 0 }, 0.1)
      .from(el.querySelectorAll('.hp__kicker, .hp__proof, .hp__more, .hp__note'), { y: M.y, autoAlpha: 0, stagger: M.stagger }, 0.3);
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
          {kicker && <span className="kicker hp__kicker">{kicker}</span>}
          <h1 className="hp__t">{title} {accent && <em>{accent}</em>}</h1>
          {proof && <p className="hp__proof">{proof}</p>}
          {children && <div className="hp__more">{children}</div>}
          {note && <p className="hp__note">{note}</p>}
        </div>
        {img && <figure className="hp__media"><window.Picture src={img} alt={imgAlt} sizes="(max-width: 900px) 100vw, 44vw" loading="eager" /></figure>}
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
