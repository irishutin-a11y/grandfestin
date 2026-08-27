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
            <div className="academie__caption">Promotion 2024 — Des Étoiles et des Femmes. 13 antennes, plus de 1 100 femmes accompagnées en 10 ans.</div>
          </div>
          <div className="academie__text">
            <span className="eyebrow">L'association Festin</span>
            <h2 className="h2">Former, inclure, <em className="accent">transformer.</em></h2>
            <p className="lede">Née à Marseille en 2015, l'association Festin a construit un écosystème unique : des dispositifs de formation, d'insertion et de plaidoyer qui font de la cuisine un puissant levier d'émancipation.</p>
            <p className="body">Aujourd'hui présente sur 14 territoires, Festin porte 5 projets complémentaires, tous animés par la même conviction : viser l'excellence ne s'oppose pas à l'inclusion. C'est même souvent sa condition.</p>
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
      title: "Accompagnement à l'insertion",
      desc: "Femmes éloignées de l'emploi, personnes réfugiées ou primo-arrivantes : un parcours diplômant, un accompagnement social global et un vrai horizon professionnel. Festin construit le projet avec vous, jusqu'à l'emploi.",
      cta: "Parcours d'insertion",
      href: "#/accompagnement/insertion",
      img: "images/photo-tabliers-violets.jpg",
    },
    {
      key: "pros",
      audience: "Vous êtes restaurateur",
      tag: "Professionnels de la restauration",
      title: "Solution RH pour les restaurateurs",
      desc: "Festin accompagne les établissements dans la transformation de leurs pratiques : recrutement inclusif, fidélisation des équipes, prévention des violences, management juste. Une réponse opérationnelle aux tensions RH du secteur.",
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
          <h2 className="h2">Un acteur dual <em className="accent">au service du secteur</em></h2>
          <p className="lede" style={{marginTop:14}}>D'un côté l'accompagnement vers la qualification et l'emploi pour les personnes éloignées du marché du travail. De l'autre une solution RH complète pour les professionnels de la restauration. Deux portes d'entrée, une même conviction&nbsp;: la cuisine peut transformer.</p>
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
              <h2 className="h2">Une question ? <em className="accent">Parlons-en.</em></h2>
              <p className="lede" style={{marginTop:12}}>Notre équipe pédagogique vous répond sous 48h ouvrées.</p>
            </div>
            <div className="contact-items">
              <div className="contact-item"><div className="contact-item__icon"><i data-lucide="mail" style={{width:18,height:18}}/></div><div><div className="contact-item__lbl">Email</div><div className="contact-item__v">{c.email}</div></div></div>
              <div className="contact-item"><div className="contact-item__icon"><i data-lucide="map-pin" style={{width:18,height:18}}/></div><div><div className="contact-item__lbl">Adresse</div><div className="contact-item__v">{c.address}</div></div></div>
              <div className="contact-item"><div className="contact-item__icon"><i data-lucide="file-text" style={{width:18,height:18}}/></div><div><div className="contact-item__lbl">NDA / Siret</div><div className="contact-item__v">NDA {c.nda} · Siret {c.siret}</div></div></div>
            </div>
            <div className="refs">
              <div className="ref-card"><div className="ref-card__lbl">Responsable handicap et pédagogique</div><div className="ref-card__name">Lucie Gueydon</div><div className="ref-card__role">Accessibilité, aménagements &amp; coordination des formations</div></div>
              <div className="ref-card"><div className="ref-card__lbl">Solution RH &amp; engagement</div><div className="ref-card__name">Armand Hurault</div><div className="ref-card__role">Directeur — interlocuteur restaurateurs &amp; partenaires</div></div>
            </div>
          </div>
          <div className="contact__form">
            <h3 className="h3">Écrivez-nous</h3>
            <p className="body">Nous revenons vers vous rapidement avec une proposition adaptée à votre besoin.</p>
            {sent ? (
              <div className="form-success"><b>Merci, votre message a été envoyé.</b><br/>Nous vous répondrons sous 48h à l'adresse indiquée.</div>
            ) : (
              <form onSubmit={(e)=>{e.preventDefault();setSent(true);}}>
                <div className="field-row">
                  <div className="field"><label>Prénom</label><input required defaultValue=""/></div>
                  <div className="field"><label>Nom</label><input required/></div>
                </div>
                <div className="field"><label>Email</label><input type="email" required placeholder="vous@exemple.fr"/></div>
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

function Footer() {
  const data = window.FESTIN_DATA;
  return (
    <footer className="footer">
      {/* CTA band — priorité aux portes d'entrée Nous contacter & S'engager */}
      <div className="footer__cta-band">
        <div className="container">
          <div className="footer__cta-grid">
            <a className="footer__cta-card" href="#/contact">
              <div className="footer__cta-icon"><i data-lucide="mail" style={{width:22,height:22}}/></div>
              <h3>Nous contacter</h3>
              <p>Une question, un projet à monter, un partenariat à imaginer ? Notre équipe vous répond sous 48 h ouvrées.</p>
              <span className="footer__cta-card__lnk">Écrire à Festin <i data-lucide="arrow-right" style={{width:16,height:16}}/></span>
            </a>
            <a className="footer__cta-card" href="#/contact">
              <div className="footer__cta-icon"><i data-lucide="handshake" style={{width:22,height:22}}/></div>
              <h3>S'engager à nos côtés</h3>
              <p>Restaurateur, partenaire, financeur, ou en parcours d'insertion : trois portes d'entrée, une même envie d'avancer ensemble.</p>
              <span className="footer__cta-card__lnk">Découvrir comment <i data-lucide="arrow-right" style={{width:16,height:16}}/></span>
            </a>
          </div>
        </div>
      </div>

      <div className="container" style={{paddingTop:64}}>
        <div className="footer__grid" style={{gridTemplateColumns:'1.4fr 1fr 1fr 1fr 1fr'}}>
          <div className="footer__brand">
            <img src={data.brand.logo} alt="Festin" className="footer__brand-logo"/>
            <p>Festin est une association qui agit depuis 2015 pour rendre la gastronomie plus inclusive : insertion, formation, plaidoyer. Basée à Marseille, présente sur 14 territoires.</p>
            <div className="footer__qualiopi">
              <img src={data.brand.qualiopi} alt="Logo Qualiopi" onError={(e)=>{e.currentTarget.style.display='none';}}/>
              <span>Organisme certifié Qualiopi<br/><small>Au titre des actions de formation</small></span>
            </div>
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
              <li><a href="#/contact">Restaurateurs</a></li>
              <li><a href="#/contact">Partenaires & financeurs</a></li>
              <li><a href="#/projets/des-etoiles-et-des-femmes">Parcours d'insertion</a></li>
              <li><a href="#/contact">Mécénat</a></li>
            </ul>
          </div>
          <div>
            <h5>Nos projets</h5>
            <ul>
              <li><a href="#/projets/des-etoiles-et-des-femmes">Des Étoiles et des Femmes</a></li>
              <li><a href="#/projets/les-beaux-mets">Les Beaux Mets</a></li>
              <li><a href="#/projets/la-table-de-cana">La Table de Cana</a></li>
              <li><a href="#/projets/restaure">Le mouvement Restaure</a></li>
              <li><a href="#/projets/tournesol">Tournesol</a></li>
            </ul>
          </div>
          <div>
            <h5>L'association</h5>
            <ul>
              <li><a href="#/about">Qui sommes-nous</a></li>
              <li><a href="#/formations">Formations</a></li>
              <li><a href={data.brand.site} target="_blank" rel="noopener">associationfestin.com</a></li>
              <li><a>Mentions légales</a></li>
              <li><a>CGV</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Festin — Le goût d'avancer ensemble · <a href={data.brand.site} target="_blank" rel="noopener">associationfestin.com</a></span>
          <span>NDA {data.contact.nda} · Siret {data.contact.siret}</span>
        </div>
      </div>
    </footer>
  );
}

// FloatingCTA — bouton flottant "Agir maintenant", sur toutes les pages
function FloatingCTA() {
  const { useState, useEffect } = React;
  const [open, setOpen] = useState(false);
  const data = window.FESTIN_DATA;
  const lesBeauxMets = data.projets.find(p => p.id === 'les-beaux-mets');
  const actions = [
    { t: "Réserver une table", d: "Les Beaux Mets — Baumettes", ic: "calendar-check", c: "#1D6B78", href: lesBeauxMets.ctaUrl, external: true },
    { t: "Se former / candidater", d: "Rejoindre une promotion", ic: "graduation-cap", c: "#E8A825", href: "#/formations" },
    { t: "Recruter via Festin", d: "Solution RH pour restaurateurs", ic: "briefcase", c: "#2E8B57", href: "#/accompagnement/professionnels" },
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
