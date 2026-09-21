// Sections.jsx — Ticker, Festin section, Publics, Témoignages, Contact, Footer
function Ticker() {
  const items = window.FESTIN_DATA.ticker;
  return (
    <section className="ticker" style={{padding:'28px 0'}}>
      <div className="container">
        <div className="ticker__inner">
          {items.map((it, i) => (
            <React.Fragment key={i}>
              <span>{it}</span>
              {i < items.length - 1 && <span className="ticker__dot">•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function Academie() {
  const pillars = window.FESTIN_DATA.pillars;
  return (
    <section className="academie" id="academie">
      <div className="container">
        <div className="academie__grid">
          <div className="academie__photo">
            <img src="images/photo-groupe-portrait.jpg" alt="Promotion Des Étoiles et des Femmes" />
            <div className="academie__caption">Promotion 2024 — Des Étoiles et des Femmes. 13 antennes, plus de 1 200 femmes accompagnées en 10 ans.</div>
          </div>
          <div className="academie__text">
            <span className="eyebrow">L'association Festin</span>
            <h2 className="h2">Ce que nous <em className="accent">faisons</em></h2>
            <p className="lede">La Table de Cana, premier projet de l'association, est née à Marseille en 1993. Festin porte aujourd'hui cinq projets, du restaurant des Baumettes au programme national Restaure.</p>
            <p className="body">Présents dans 14 territoires, nous croyons que viser haut n'exclut pas : cela élève. Les Beaux Mets en sont la preuve chaque jour, avec un chef qui forme les commis et un maître d'hôtel qui forme l'équipe de salle.</p>
            <div className="pillars">
              {pillars.map((p, i) => (
                <div className="pillar" key={i}>
                  <div className="pillar__icon"><i data-lucide={p.icon} style={{width:22,height:22}}/></div>
                  <div><h4>{p.title}</h4><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Publics() {
  const pubs = [
    {
      key: "insertion",
      audience: "Vous êtes en parcours d'insertion",
      tag: "Personnes en insertion",
      title: "Apprendre un métier de cuisine",
      desc: "Un diplôme reconnu, des stages en restaurant et un accompagnement social complet, pour des femmes et pour des personnes réfugiées ou primo-arrivantes. Nous construisons le parcours avec vous, jusqu'à l'emploi.",
      cta: "Parcours d'insertion",
      href: "#/accompagnement/insertion",
      img: "images/photo-tabliers-violets.jpg",
    },
    {
      key: "pros",
      audience: "Vous êtes restaurateur",
      tag: "Professionnels de la restauration",
      title: "Recruter et manager autrement",
      desc: "Festin accompagne les établissements dans la transformation de leurs pratiques : recrutement inclusif, fidélisation des équipes, prévention des violences, management juste.",
      cta: "Accompagnement professionnels",
      href: "#/accompagnement/professionnels",
      img: "images/photo-chapeau-cuisine.jpg",
    },
  ];
  return (
    <section className="publics">
      <div className="container">
        <div className="publics__head">
          <span className="eyebrow">Festin, deux publics</span>
          <h2 className="h2">Deux entrées, <em className="accent">un même secteur</em></h2>
          <p className="lede" style={{marginTop:14}}>Vous apprenez un métier de cuisine, ou vous dirigez une équipe : nous accompagnons les personnes vers un diplôme et un emploi, et les restaurants vers des pratiques plus justes.</p>
        </div>
        <div className="publics__split">
          {pubs.map((p) => (
            <a className="public-split" href={p.href} key={p.key}>
              <div className="public-split__img" style={{backgroundImage:`url(${p.img})`,position:'relative'}}>
                <span className={"public-split__tag " + (p.key==='pros' ? 'tag--teal' : 'tag--gold')} style={{position:'absolute',top:16,left:16,zIndex:2,background:'rgba(255,255,255,0.92)',backdropFilter:'blur(6px)',padding:'6px 12px',borderRadius:999,fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase'}}>{p.tag}</span>
              </div>
              <div className="public-split__body">
                <span style={{fontSize:11,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--ink-soft)',marginBottom:6,display:'block'}}>{p.audience}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <span className="public-split__lnk">{p.cta} <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
              </div>
            </a>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:48}}>
          <a href="#/formations" className="btn btn--gold">Découvrir nos formations <i data-lucide="arrow-right" style={{width:16,height:16}}/></a>
        </div>
      </div>
    </section>
  );
}

function Temoignages() {
  const t = window.FESTIN_DATA.testimonials;
  return (
    <section className="temoignages">
      <div className="container">
        <div className="publics__head">
          <span className="eyebrow">Témoignages</span>
          <h2 className="h2">Ce que disent nos <em className="accent">apprenants &amp; partenaires</em></h2>
        </div>
        <div className="temoignages__top">
          <div className="quote">
            <div className="quote__mark">"</div>
            <p>{t[0].quote}</p>
            <div><div className="quote__author">— {t[0].author}</div><div className="quote__role">{t[0].role}</div></div>
          </div>
          <div className="quote">
            <div className="quote__mark">"</div>
            <p>{t[1].quote}</p>
            <div><div className="quote__author">— {t[1].author}</div><div className="quote__role">{t[1].role}</div></div>
          </div>
          <div className="quote-photo" style={{backgroundImage:'url(images/photo-micro-temoignage.jpg)'}}/>
        </div>
        <div className="temoignages__bot">
          <div className="quote quote--dark">
            <div className="quote__mark">"</div>
            <p>{t[2].quote}</p>
            <div><div className="quote__author">— {t[2].author}</div><div className="quote__role">{t[2].role}</div></div>
          </div>
          <div className="quote quote--dark">
            <div className="quote__mark">"</div>
            <p>{t[3].quote}</p>
            <div><div className="quote__author">— {t[3].author}</div><div className="quote__role">{t[3].role}</div></div>
          </div>
        </div>
      </div>
    </section>
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
                  <div className="field"><label>Prénom <span style={{color:'var(--gold)'}}>*</span></label><input required defaultValue=""/></div>
                  <div className="field"><label>Nom <span style={{color:'var(--gold)'}}>*</span></label><input required/></div>
                </div>
                <div className="field"><label>Email <span style={{color:'var(--gold)'}}>*</span></label><input type="email" required placeholder="vous@exemple.fr"/></div>
                <div className="field"><label>Organisation</label><input placeholder="Restaurant, OPCO, collectivité…"/></div>
                <div className="field">
                  <label>Motif de votre demande <span style={{color:'var(--gold)'}}>*</span></label>
                  <div className="motif-group" role="radiogroup" aria-required="true">
                    {[
                      { value: 'engager', label: "S'engager", icon: 'handshake' },
                      { value: 'former',  label: 'Se former', icon: 'graduation-cap' },
                      { value: 'partner', label: 'Être partenaire', icon: 'users' },
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
                <div className="field"><label>Formation concernée <span style={{color:'var(--ink-soft)',fontWeight:400}}>(facultatif)</span></label><select defaultValue=""><option value="">Toutes formations / je ne sais pas encore</option><option>Prévention des VSS</option><option>Management juste &amp; inclusif</option><option>Étoiles &amp; Femmes — TFP</option><option>Étoiles &amp; Femmes — CAP</option><option>Tournesol — Réfugiés</option></select></div>
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
              <p>Festin est une association loi 1901 à but non lucratif et d'intérêt général, agréée ESUS. Nous formons aux métiers de la cuisine, nous accompagnons les restaurants et nous changeons les pratiques du secteur.</p>
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
              {/* URL LinkedIn réelle à fournir — pointe vers le formulaire de contact en attendant */}
              <a href="#/contact" aria-label="LinkedIn">
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
    { t: "Faire un don", d: "Soutenir Festin — HelloAsso", ic: "heart", c: "#E4572E", href: data.donation, external: true },
    { t: "Réserver une table", d: "Les Beaux Mets — Baumettes", ic: "calendar-check", c: "#1D6B78", href: lesBeauxMets.ctaUrl, external: true },
    { t: "Se former / candidater", d: "Rejoindre une promotion", ic: "graduation-cap", c: "#E8A825", href: "#/formations" },
    { t: "Recruter via Festin", d: "Travailler autrement avec les restaurateurs", ic: "briefcase", c: "#1D6B78", href: "#/accompagnement/professionnels" },
    { t: "Devenir partenaire", d: "Mécénat & soutien", ic: "handshake", c: "#9A5BA8", href: "#/contact" },
  ];
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <>
      {open && <div className="fab-scrim" onClick={() => setOpen(false)} />}
      <div className="fab-wrap">
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

window.Ticker = Ticker;
window.Academie = Academie;
window.Publics = Publics;
window.Temoignages = Temoignages;
window.Contact = Contact;
window.Footer = Footer;
window.FloatingCTA = FloatingCTA;
