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
              <h2 className="h2">Parlons de votre <em className="accent">projet</em></h2>
              <p className="lede" style={{marginTop:12}}>Notre équipe vous répond sous 48 h ouvrées.</p>
            </div>
            <div className="contact-items">
              <div className="contact-item"><div className="contact-item__icon"><i data-lucide="mail" style={{width:18,height:18}}/></div><div><div className="contact-item__lbl">Email</div><div className="contact-item__v">{c.email}</div></div></div>
              <div className="contact-item"><div className="contact-item__icon"><i data-lucide="map-pin" style={{width:18,height:18}}/></div><div><div className="contact-item__lbl">Adresse</div><div className="contact-item__v">{c.address}</div></div></div>
              <div className="contact-item"><div className="contact-item__icon"><i data-lucide="file-text" style={{width:18,height:18}}/></div><div><div className="contact-item__lbl">NDA / Siret</div><div className="contact-item__v">NDA {c.nda} · Siret {c.siret}</div></div></div>
            </div>
            <div className="contact-note">
              <i data-lucide="newspaper" style={{width:18,height:18,flexShrink:0,marginTop:2}} aria-hidden="true"/>
              <div>
                <b>Presse et financeurs</b> — demandes d'interview, visuels, rapports d'activité,
                mécénat et partenariats : <a href="mailto:partenariat@grandfestin.com">partenariat@grandfestin.com</a>
              </div>
            </div>
            <div className="refs">
              <div className="ref-card"><div className="ref-card__lbl">Responsable handicap et pédagogique</div><div className="ref-card__name">Lucie Gueydon</div><div className="ref-card__role">Accessibilité, aménagements et coordination des formations</div></div>
              <div className="ref-card"><div className="ref-card__lbl">Restaurateurs et partenaires</div><div className="ref-card__name">Armand Hurault</div><div className="ref-card__role">Directeur général, interlocuteur des restaurateurs et des partenaires</div></div>
            </div>
          </div>
          <div className="contact__form">
            <h3 className="h3">Écrivez-nous</h3>
            <p className="body">Nous revenons vers vous rapidement, en fonction de votre demande.</p>
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
                      { value: 'engager', label: "S'engager", icon: 'handshake' },
                      { value: 'former',  label: 'Se former', icon: 'graduation-cap' },
                      { value: 'partner', label: 'Être partenaire', icon: 'users' },
                      { value: 'presse',  label: 'Presse', icon: 'newspaper' },
                      { value: 'financeur', label: 'Financeur', icon: 'hand-coins' },
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
                <div className="field"><label>Formation concernée <span style={{color:'var(--ink-soft)',fontWeight:400}}>(facultatif)</span></label><select defaultValue=""><option value="">Toutes formations / je ne sais pas encore</option><option>Prévention des violences sexistes et sexuelles</option><option>Management juste &amp; inclusif</option><option>Étoiles &amp; Femmes — TFP</option><option>Étoiles &amp; Femmes — CAP</option><option>Tournesol — Réfugiés</option></select></div>
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
              <p>Festin est une association loi 1901, à but non lucratif et d'intérêt général, agréée ESUS. Nous formons aux métiers de la cuisine. Nous accompagnons les restaurants. Nous changeons les pratiques du secteur.</p>
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
            <span>© 2026 Festin — {data.brand.tagline} · <a href={data.brand.site} target="_blank" rel="noopener">grandfestin.com</a></span>
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
window.ProjetExtra = ProjetExtra;
window.Picture = Picture;

window.Contact = Contact;
window.Footer = Footer;
window.FloatingCTA = FloatingCTA;
