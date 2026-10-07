// EngagerLab.jsx — route de comparaison #/lab-engager (branche headers-propositions, 07/10/2026).
// Trois mises en page pour la fin de la page Pour le secteur (« S'engager avec Festin »), sans le mot géant.
// Contenu déjà publié sur le site uniquement. Aucune page du site n'est modifiée.
function EngagerLab() {
  const D = window.FESTIN_DATA;
  const facons = [
    { tone: 'teal', t: 'Rejoindre Restaure', p: 'Signez le manifeste, rejoignez un groupe de travail ou venez à un Toast.',
      tags: [['Déjà', '35 structures membres']], l: { label: 'Le site du programme', href: 'https://www.mouvement-restaure.com', ext: true } },
    { tone: 'gold', t: 'Le Grand Festin', p: 'Participer au prochain Grand Festin. En 2025 : plus de 600 convives, 14 brigades et plus de 100 bénévoles.',
      tags: [['Prochaine édition', 'Nous écrire']], l: { label: 'Participer', href: '#/contact/partenariat' } },
    { tone: 'coral', t: 'Devenir mécène', p: 'Soutenir un projet de Festin comme mécène.',
      tags: [['Contact', 'partenariat@grandfestin.com']], l: { label: 'Devenir mécène', href: '#/contact/mecenat' } },
  ];
  const Lien = ({ l, cls }) => (
    <a className={cls} href={l.href} {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {l.label} <span className="arrow" aria-hidden="true">{l.ext ? '↗' : '→'}</span>{l.ext && <span className="sr-only"> (nouvel onglet)</span>}
    </a>
  );
  const Cadre = ({ n, nom, principe, children }) => (
    <section className="hx-cadre" aria-label={nom}>
      <div className="hx-cadre__lbl"><b>{n} · {nom}</b><span>{principe}</span></div>
      <div className="hx-cadre__vue">{children}</div>
    </section>
  );
  React.useEffect(() => { document.documentElement.classList.add('hx-lab'); return () => document.documentElement.classList.remove('hx-lab'); }, []);
  return (
    <div className="hx-lab-page">
      <div className="hx-intro"><div className="hx-wrap">
        <h1>Fin de la page Pour le secteur : « S'engager avec Festin »</h1>
        <p>Trois mises en page, sans le mot géant. Contenu déjà publié sur le site.</p>
      </div></div>

      <Cadre n="A" nom="La carte or" principe="La brique « Appel » déjà utilisée en fin de pages projet : un titre, une phrase, une action.">
        <window.Appel id="eng-a" title="S'engager" accent="avec Festin."
          text="Soutenir un projet comme mécène, ou participer au prochain Grand Festin."
          cta={{ label: 'Devenir partenaire Festin', href: '#/contact/partenariat' }} />
      </Cadre>

      <Cadre n="B" nom="Trois façons" principe="La grille de la page Impact : trois engagements côte à côte, chacun avec son repère et une seule action.">
        <section className="g-sec g-sec--cream ar-eng-b" aria-labelledby="eng-b-t">
          <div className="wrap">
            <window.GHead id="eng-b-t" title="S'engager" accent="avec Festin." />
            <ul className="eng-b__grid">
              {facons.map((f) => (
                <li key={f.t} className={'eng-b__it eng-b__it--' + f.tone}>
                  <h3 className="eng-b__t">{f.t}</h3>
                  <p>{f.p}</p>
                  <window.ArTags tags={f.tags} />
                  <Lien l={f.l} cls="lnk eng-b__l" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Cadre>

      <Cadre n="C" nom="Photo et cartouche" principe="La grammaire des en-têtes, à l'échelle d'une section : la photo du Grand Festin, un cartouche or posé dessus.">
        <section className="eng-c" aria-labelledby="eng-c-t">
          <window.Picture className="eng-c__photo" src="images/images-def/grand-festin-2025-brigades.jpg" alt="Les brigades du Grand Festin 2025 sur les marches, près du Vieux-Port" sizes="100vw" />
          <div className="eng-c__cart">
            <h2 className="eng-c__t" id="eng-c-t">S'engager <em>avec Festin.</em></h2>
            <p>Soutenir un projet comme mécène, ou participer au prochain Grand Festin : en 2025, plus de 600 convives, 14 brigades et plus de 100 bénévoles.</p>
            <div className="eng-c__act">
              <a className="btnb btnb--teal" href="#/contact/partenariat">Devenir partenaire Festin <span className="arrow" aria-hidden="true">→</span></a>
              <a className="lnk" href="#/contact/mecenat">Devenir mécène <span className="arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
      </Cadre>
    </div>
  );
}
window.EngagerLab = EngagerLab;
