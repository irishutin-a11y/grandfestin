// EspacePresse.jsx — « Espace presse et communication » (#/espace-presse, 15/10/2026).
// Contenu : FESTIN_DATA.espacePresse (textes validés par Festin, CONTENU-VALIDE.md).
// Ordre : en-tête · Festin en bref · projets · chiffres · paroles · vidéos · photothèque · logos · presse · contact.
(function () {
const U = (p) => (/%[0-9A-Fa-f]{2}/.test(p) ? p : encodeURI(p));
const nom = (p) => p.split('/').pop();

// Téléchargement : la plus grande version web disponible (jamais d'original HD dans le dépôt)
function versionWeb(src) {
  const rel = src.replace(/^images\//, '');
  const e = window.FESTIN_IMG && window.FESTIN_IMG[rel];
  if (!e || !e.w || !e.w.length) return src;
  return 'images/web/' + Math.max(...e.w) + '/' + rel.replace(/\.[^.]+$/, '') + '.jpg';
}

function Copier({ texte }) {
  const [ok, setOk] = React.useState(false);
  const repli = () => {
    const t = document.createElement('textarea');
    t.value = texte; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } catch (e) { /* rien : le texte reste sélectionnable à l'écran */ }
    t.remove();
  };
  const copier = () => {
    const fin = () => { setOk(true); setTimeout(() => setOk(false), 2200); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texte).then(fin, () => { repli(); fin(); });
    else { repli(); fin(); }
  };
  return (
    <>
      <button type="button" className="btnb btnb--teal ep-copy" onClick={copier}>{ok ? 'Texte copié' : 'Copier le texte'}</button>
      <span className="sr-only" aria-live="polite">{ok ? 'Texte copié' : ''}</span>
    </>
  );
}

function Titre({ id, t, em, children }) {
  return (
    <div className="ep-head">
      <h2 className="g-h2" id={id}>{t} {em && <em>{em}</em>}</h2>
      {children && <p className="g-lede">{children}</p>}
    </div>
  );
}

function EspacePressePage() {
  const D = window.FESTIN_DATA, E = D.espacePresse, mail = (D.emails || {}).presse || 'contact@grandfestin.com';
  // trois articles récents, un par projet (le plus récent de chacun)
  const derniers = (D.presse || []).slice().sort((x, y) => new Date(y.date) - new Date(x.date))
    .filter((a, i, l) => l.findIndex(b => b.dispositif === a.dispositif) === i).slice(0, 3);
  const [filtre, setFiltre] = React.useState('tous');
  const [zi, setZi] = React.useState(-1);
  const photos = E.photos.filter((p) => filtre === 'tous' || p.f === filtre);
  const zoom = zi >= 0 ? photos[zi] : null;
  const declencheur = React.useRef(null);
  const fermerRef = React.useRef(null);
  const ouvrir = (i, e) => { declencheur.current = e.currentTarget; setZi(i); };
  const fermer = () => { setZi(-1); const d = declencheur.current; if (d) setTimeout(() => d.focus(), 0); };
  const pas = (d) => setZi((i) => (i + d + photos.length) % photos.length);
  React.useEffect(() => {
    if (!zoom) return;
    if (fermerRef.current) fermerRef.current.focus();
    const k = (e) => {
      if (e.key === 'Escape') fermer();
      else if (e.key === 'ArrowRight') pas(1);
      else if (e.key === 'ArrowLeft') pas(-1);
      else if (e.key === 'Tab') {
        // le focus reste dans la fenêtre
        const f = [...document.querySelectorAll('.ep-lb button, .ep-lb a')];
        if (!f.length) return;
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    };
    window.addEventListener('keydown', k);
    if (window.__lenis) window.__lenis.stop();
    return () => { window.removeEventListener('keydown', k); if (window.__lenis) window.__lenis.start(); };
  }, [zi, filtre]);
  React.useEffect(() => setZi(-1), [filtre]);
  const credit = (c) => (c.startsWith('©') ? c : 'Photo : ' + c);
  const projet = (id) => D.projets.find((x) => x.id === id) || {};
  const texteBref = E.bref.map(([b, t]) => (b ? b + ' ' : '') + t).join('\n\n');
  const logosProjets = ['des-etoiles-et-des-femmes', 'les-beaux-mets', 'la-table-de-cana', 'restaure', 'tournesol']
    .map(projet).filter((p) => p.logo);

  return (
    <div className="gpage ep" data-screen-label="Espace presse">
      <window.HeroPage tone="deep" title="Espace presse" accent="et communication"
        img={E.hero.img} imgAlt={E.hero.alt} imgPos="50% 35%" note={E.hero.credit}
        crumb={[{ label: 'Accueil', href: '#/' }, { label: 'Espace presse et communication' }]}>
        <div className="g-herocta"><window.GLink l={{ to: 'ep-photos' }} className="btnb btnb--gold">Photos et logos à télécharger <span className="arrow" aria-hidden="true">↓</span></window.GLink></div>
      </window.HeroPage>

      {/* Festin en bref : texte validé, à copier */}
      <section className="g-sec g-sec--cream" aria-labelledby="ep-bref">
        <div className="wrap ep-bref">
          <div className="ep-carte">
            <Titre id="ep-bref" t="Festin" em="en bref" />
            <div className="ep-bref__txt">
              {E.bref.map(([b, t], i) => <p key={i}>{b && <b>{b} </b>}{t}</p>)}
            </div>
            <Copier texte={texteBref} />
          </div>
          <ul className="ep-piliers">
            {E.piliers.map(([t, d], i) => (
              <li key={t}><b>{String(i + 1).padStart(2, '0')}</b><div><h3>{t}</h3><p>{d}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Les projets : frise, puis une carte par projet */}
      <section className="g-sec g-sec--white" aria-labelledby="ep-projets">
        <div className="wrap">
          <Titre id="ep-projets" t="Cinq projets," em="un même groupe associatif." />
          <ol className="ep-frise">
            {E.frise.map((j) => (
              <li key={j.an} className={j.avenir ? 'is-avenir' : ''}><b>{j.an}</b><span>{j.t}</span>{j.note && <small>{j.note}</small>}</li>
            ))}
          </ol>
          <div className="ep-projets">
            {E.projets.map((p) => {
              const pr = projet(p.id);
              return (
                <article key={p.id} className={'ep-projet' + (p.large ? ' ep-projet--large' : '')}>
                  <div className="ep-projet__ph">
                    <window.Picture src={p.img} alt={p.alt} sizes="(max-width: 899px) 100vw, 50vw" style={p.pos ? { objectPosition: p.pos } : undefined} />
                    <span className="ep-projet__an">{p.an}</span>
                    {pr.logo && p.id !== 'academie' && <span className="ep-projet__logo"><img src={pr.logo} alt={'Logo ' + p.titre} loading="lazy" /></span>}
                  </div>
                  <div className="ep-projet__bd">
                    <span className="ep-projet__tag">{p.tag}</span>
                    <h3>{p.titre}</h3>
                    <p>{p.texte}</p>
                    <dl className="ep-kpis">{p.kpis.map(([n, l]) => <div key={l}><dt>{String(n).replace(/(\d) (?=\d)/g, '$1\u00a0')}</dt><dd>{l}</dd></div>)}</dl>
                    {pr.siteUrl && p.id !== 'academie' && (
                      <a className="lnk" href={pr.siteUrl} target="_blank" rel="noopener noreferrer">{pr.siteUrl.replace(/^https?:\/\/(www\.)?/, '')} <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chiffres à reprendre */}
      <section className="g-sec ep-chiffres on-dark" aria-labelledby="ep-chiffres">
        <div className="wrap">
          <Titre id="ep-chiffres" t="Les chiffres" em="à reprendre.">Depuis la création de chaque projet.</Titre>
          <ul className="ep-big">{E.chiffres.map(([n, l]) => <li key={l}><b>{n}</b><span>{l}</span></li>)}</ul>
          <div className="ep-annee"><span>En 2025</span>{E.annee.map(([n, l]) => <p key={l}><b>{n}</b> {l}</p>)}</div>
          <p className="g-src">Source : rapport d'activité Festin 2025. Merci de citer l'année.</p>
        </div>
      </section>

      {/* Paroles : édito et cinq citations publiées dans le rapport 2025 */}
      <section className="g-sec g-sec--cream" aria-labelledby="ep-paroles">
        <div className="wrap">
          <Titre id="ep-paroles" t="Ils et elles" em="le disent." />
          <blockquote className="ep-edito"><p>{E.edito.q}</p><cite>{E.edito.qui}</cite></blockquote>
          <div className="ep-paroles">
            {E.citations.map((c) => (
              <figure key={c.n} className={'ep-parole' + (c.pro ? ' ep-parole--pro' : '')}>
                <blockquote>{c.q}</blockquote>
                <figcaption><b>{c.n}</b>{c.r}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos : elles s'ouvrent dans un nouvel onglet */}
      <section className="g-sec g-sec--white" aria-labelledby="ep-videos">
        <div className="wrap">
          <Titre id="ep-videos" t="Les projets" em="en vidéo.">Des films à regarder ou à partager. Ils s'ouvrent dans un nouvel onglet.</Titre>
          <ul className="ep-videos">
            {E.videos.map((v) => (
              <li key={v.href}>
                <a className="ep-video" href={v.href} target="_blank" rel="noopener noreferrer">
                  <span className="ep-video__ph"><window.Picture src={v.img} alt="" sizes="(max-width: 899px) 50vw, 25vw" /><span className="ep-video__play" aria-hidden="true" /></span>
                  <span className="ep-video__t">{v.t}</span>
                  <span className="ep-video__d">{v.d}<span className="sr-only"> (nouvel onglet)</span></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Photothèque */}
      <section className="g-sec g-sec--cream" id="ep-photos" aria-labelledby="ep-photos-t">
        <div className="wrap">
          <Titre id="ep-photos-t" t="Des photos" em="à utiliser.">Cliquez pour agrandir. Chaque photo se télécharge dans sa plus grande version web.</Titre>
          <div className="apfilters" role="group" aria-label="Filtrer les photos">
            {E.filtres.map(([k, l]) => (
              <button key={k} type="button" className={'apfilter' + (filtre === k ? ' is-on' : '')} aria-pressed={filtre === k} onClick={() => setFiltre(k)}>{l}</button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">{photos.length} photos</p>
          <ul className="ep-galerie">
            {photos.map((p, i) => (
              <li key={p.src} className="ep-photo">
                <button type="button" className="ep-photo__zoom" onClick={(e) => ouvrir(i, e)} aria-label={'Agrandir : ' + p.l}>
                  <window.Picture src={p.src} alt="" sizes="(max-width: 899px) 100vw, 33vw" />
                </button>
                <div className="ep-photo__cap">
                  <p>{p.l}{p.c && <small>{credit(p.c)}</small>}</p>
                  <a href={U(versionWeb(p.src))} download={nom(versionWeb(p.src))} aria-label={'Télécharger : ' + p.l}>Télécharger</a>
                </div>
              </li>
            ))}
          </ul>
          <div className="ep-hd">
            {/* bouton HD retiré le 15/10/2026 : il ne revient que si espacePresse.hdLien est renseigné */}
            {E.hdLien && <a className="btnb btnb--teal" href={E.hdLien} target="_blank" rel="noopener noreferrer">Toutes les photos en haute définition <span className="arrow" aria-hidden="true">↗</span><span className="sr-only"> (nouvel onglet)</span></a>}
            <p className="ep-hd__credit">Merci de citer le crédit photo quand il est indiqué.</p>
          </div>
        </div>
        {zoom && (
          <div className="ep-lb" role="dialog" aria-modal="true" aria-label={zoom.l} onClick={fermer}>
            <figure onClick={(e) => e.stopPropagation()}>
              <button type="button" ref={fermerRef} className="ep-lb__close" onClick={fermer} aria-label="Fermer">✕</button>
              <img src={U(versionWeb(zoom.src))} alt={zoom.l} />
              <figcaption>
                <span>{zoom.l}{zoom.c && ' · ' + credit(zoom.c)}</span>
                <span className="ep-lb__nav">
                  <button type="button" onClick={() => pas(-1)} aria-label="Photo précédente">←</button>
                  <span aria-live="polite">{zi + 1} / {photos.length}</span>
                  <button type="button" onClick={() => pas(1)} aria-label="Photo suivante">→</button>
                  <a href={U(versionWeb(zoom.src))} download={nom(versionWeb(zoom.src))}>Télécharger</a>
                </span>
              </figcaption>
            </figure>
          </div>
        )}
      </section>

      {/* Logos : Festin en haute définition, projets en basse définition */}
      <section className="g-sec g-sec--white" id="ep-logos" aria-labelledby="ep-logos-t">
        <div className="wrap">
          <Titre id="ep-logos-t" t="Nos logos" em="à télécharger.">Merci de ne pas déformer ni recolorer les logos.</Titre>
          <ul className="ep-logos">
            {E.logos.map((l) => (
              <li key={l.src} className="ep-logo">
                <span className="ep-logo__fd" style={{ background: l.fond }}><img src={l.src} alt={'Logo ' + l.t} loading="lazy" /></span>
                <span className="ep-logo__pied"><span><b>{l.t}</b>{l.d}</span><a href={l.src} download={nom(l.src)} aria-label={'Télécharger le logo ' + l.t + ', ' + l.d}>Télécharger</a></span>
              </li>
            ))}
          </ul>
          <h3 className="ep-sous">Les logos des projets</h3>
          <ul className="ep-logos ep-logos--projets">
            {logosProjets.map((p) => (
              <li key={p.id} className="ep-logo">
                <span className="ep-logo__fd"><img src={p.logo} alt={'Logo ' + p.shortTitle} loading="lazy" /></span>
                <span className="ep-logo__pied"><b>{p.shortTitle}</b><a href={decodeURI(p.logo)} download aria-label={'Télécharger le logo ' + p.shortTitle}>Télécharger</a></span>
              </li>
            ))}
          </ul>
          <p className="g-src">Basse définition, version vectorielle sur demande.</p>
        </div>
      </section>

      {/* Presse : les trois derniers articles ; la liste complète est sur Presse et actualités */}
      <section className="g-sec g-sec--cream ep-presse" aria-labelledby="ep-presse-t">
        <div className="wrap">
          <div className="ep-presse__in">
            <h2 className="g-h2" id="ep-presse-t">Dans <em>la presse</em></h2>
            <a className="btnb btnb--teal" href="#/actualites">Voir tous les articles <span className="arrow" aria-hidden="true">→</span></a>
          </div>
          {window.ArticlePresse && (
            <ul className="aplist ep-presse__liste">
              {derniers.map((a, i) => <li key={a.href || i}><window.ArticlePresse a={a} /></li>)}
            </ul>
          )}
        </div>
      </section>

      {/* Contact : une seule adresse, aucun nom de personne */}
      <section className="g-sec g-sec--white" aria-labelledby="ep-contact">
        <div className="wrap ep-contact">
          <Titre id="ep-contact" t="Une interview, un visuel," em="un chiffre ?">Interview, reportage, visuel en haute définition : écrivez-nous, nous vous orientons vers la bonne personne.</Titre>
          <div className="ep-contact__carte on-dark">
            <h3>Contact presse et partenaires</h3>
            <a href={'mailto:' + mail}>{mail}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

window.EspacePressePage = EspacePressePage;
})();
