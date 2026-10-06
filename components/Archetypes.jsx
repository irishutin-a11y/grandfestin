// Archetypes.jsx — vocabulaire fini de mises en page (30/09/2026, ALLER-PLUS-LOIN.md).
// Huit archétypes pour tout le site ; deux sections voisines n'en partagent
// jamais un. Styles : styles/archetypes.css (préfixe ar-).
//   1 plein cadre (.ar-hero) · 2 bloc encarté à accordéon (BlocEncarte + Accordeon)
//   3 bande défilante (BandeDefilante) · 4 lignes typées (LignesTypees)
//   5 carte flottante (CarteFlottante) · 6 titre en chevauchement (TitreChevauche)
//   7 split asymétrique (.ar-split) · 8 grille de cartes (une par page au plus)
// Règles : une signalétique = un sens (numéros réservés aux étapes dans un
// ordre imposé) ; un dispositif utilisé une seule fois n'en est pas un.
(function () {
const { useState } = React;

const Tags = ({ tags, className = '' }) => (tags && tags.length
  ? <ul className={'ar-tags ' + className}>{tags.map((t) => <li key={t[0]}><span>{t[0]}</span>{t[1]}</li>)}</ul>
  : null);

const Lnk = ({ l }) => (l
  ? <a className="ar-lnk" href={l.href} {...(/^https?:/.test(l.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {l.label} <span className="arrow" aria-hidden="true">{/^https?:/.test(l.href) ? '↗' : '→'}</span>
      {/^https?:/.test(l.href) && <span className="sr-only"> (nouvel onglet)</span>}
    </a>
  : null);

// Accordéon : le secondaire replié, un élément ouvert à la fois.
// items : [{ q, a, tags: [[étiquette, valeur]], link: { label, href } }]
function Accordeon({ id, items = [] }) {
  const [open, setOpen] = useState(-1);
  return (
    <ul className="ar-acc">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <li key={i} className={'ar-acc__it' + (on ? ' is-open' : '')}>
            <h3 className="ar-acc__q">
              <button type="button" id={id + '-q' + i} aria-expanded={on} aria-controls={id + '-a' + i} onClick={() => setOpen(on ? -1 : i)}>
                <span>{it.q}</span><span className="ar-acc__ic" aria-hidden="true" />
              </button>
            </h3>
            <div className="ar-acc__a" id={id + '-a' + i} role="region" aria-labelledby={id + '-q' + i} hidden={!on}>
              <Tags tags={it.tags} />
              {it.a && <p>{it.a}</p>}
              <Lnk l={it.link} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// Bloc encarté (fond teal, marges visibles) : titre, chapeau et étiquettes
// à gauche, contenu dense (accordéon) à droite.
function BlocEncarte({ id, title, accent, lede, tags, action, tone = 'teal', children }) {
  return (
    <div className={'ar-bloc ar-bloc--' + tone + ' on-dark g-reveal'}>
      <div className="ar-bloc__head">
        <h2 className="ar-h2" id={id}>{title} {accent && <em>{accent}</em>}</h2>
        {lede && <p className="ar-bloc__p">{lede}</p>}
        {action}
        <Tags tags={tags} className="ar-tags--row" />
      </div>
      <div className="ar-bloc__body">{children}</div>
    </div>
  );
}

// Bande défilante : respiration entre deux sections denses (aplat or).
// Arrêtable (WCAG 2.2.2) ; liste fixe en mouvement réduit.
function BandeDefilante({ items = [], label }) {
  return (
    <section className="ar-bande" aria-label={label} data-marquee>
      <ul className="ar-bande__l">
        {/* un élément = un texte, ou { label, href } pour un lien (RETOURS-AUDIT §2.3) ; seules les
            entrées de la première série sont focalisables, les copies servent à la boucle */}
        {items.concat(items, items).map((t, i) => {
          const copie = i >= items.length;
          return (
            <li key={i} aria-hidden={copie ? true : undefined}>
              {typeof t === 'string' ? t : <a href={t.href} tabIndex={copie ? -1 : undefined}>{t.label}</a>}
            </li>
          );
        })}
      </ul>
      <window.MarqueePause label={label ? label.toLowerCase() : 'le défilement'} />
    </section>
  );
}

// Lignes typées : des options au choix, jamais numérotées. Chaque ligne a sa
// teinte, ses micro-étiquettes et une action ; `etapes` se déplie sous la
// ligne (seul endroit où l'on numérote : un ordre imposé).
// items : [{ tone: teal|gold|coral|violet, title, text, tags, link, etapes: [[titre, texte]], etapesLien }]
function Ligne({ o, id }) {
  const [open, setOpen] = useState(false);
  const pid = id + '-etapes';
  return (
    <li className={'ar-ligne ar-ligne--' + (o.tone || 'teal') + ((o.links || []).length + (o.link ? 1 : 0) + (o.etapes ? 1 : 0) > 1 ? ' ar-ligne--multi' : '') + ' g-reveal'}>
      <div className="ar-ligne__main">
        <h3 className="ar-ligne__t">{o.title}</h3>
        {o.text && <p>{o.text}</p>}
      </div>
      <Tags tags={o.tags} />
      <div className="ar-ligne__act">
        <Lnk l={o.link} />
        {(o.links || []).map((l) => <Lnk key={l.href} l={l} />)}
        {o.etapes && <button type="button" className="ar-lnk ar-lnk--btn" aria-expanded={open} aria-controls={pid} onClick={() => setOpen(!open)}>
          {open ? 'Masquer les étapes' : 'Voir les ' + o.etapes.length + ' étapes'} <span className="ar-lnk__ic" aria-hidden="true" /></button>}
      </div>
      {o.etapes && (
        <div className="ar-poei" id={pid} hidden={!open}>
          <ol className="ar-etapes">
            {o.etapes.map(([t, x]) => <li key={t}><strong>{t}</strong><span>{x}</span></li>)}
          </ol>
          <Lnk l={o.etapesLien} />
        </div>
      )}
    </li>
  );
}
function LignesTypees({ id, items = [] }) {
  return <ul className="ar-lignes">{items.map((o, i) => <Ligne key={o.title} o={o} id={id + '-' + i} />)}</ul>;
}

// Carte flottante : un contenu posé sur fond sombre (témoignage, citation).
function CarteFlottante({ media, quote, who, logo, cta, label }) {
  return (
    <section className="ar-sec ar-sec--deep on-dark" aria-label={label}>
      <div className="wrap">
        <figure className="ar-carte g-reveal">
          {media && (
            <div className="ar-carte__media">
              {media}
              {/* logo de l'établissement posé dans un coin de la photo (retour du 01/10/2026) */}
              {logo && <span className="ar-carte__badge"><img src={encodeURI(logo.src)} alt={logo.alt} loading="lazy" /></span>}
            </div>
          )}
          <div className="ar-carte__txt">
            <blockquote className="ar-carte__q"><p>« {quote} »</p></blockquote>
            {who && <figcaption>{who}</figcaption>}
            {logo && !media && <img className="ar-carte__logo" src={encodeURI(logo.src)} alt={logo.alt} loading="lazy" />}
            {cta && <a className="btnb btnb--teal" href={cta.href}>{cta.label} <span className="arrow" aria-hidden="true">→</span></a>}
          </div>
        </figure>
      </div>
    </section>
  );
}

// Titre en chevauchement : un mot surdimensionné déborde sur le bloc
// précédent. Un seul par page, en fin de page.
function TitreChevauche({ id, mot, title, text, link }) {
  return (
    <section className="ar-eng" aria-labelledby={id}>
      <p className="ar-eng__mot" aria-hidden="true">{mot}</p>
      <div className="wrap ar-eng__in">
        <h2 className="ar-eng__t" id={id}>{title}</h2>
        {text && <p>{text}</p>}
        <Lnk l={link} />
      </div>
    </section>
  );
}

Object.assign(window, { ArTags: Tags, Accordeon, BlocEncarte, BandeDefilante, LignesTypees, CarteFlottante, TitreChevauche });
})();
