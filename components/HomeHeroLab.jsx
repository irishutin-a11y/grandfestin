// HomeHeroLab.jsx — route de comparaison #/lab-accueil (branche headers-propositions, 07/10/2026).
// Trois mises en page du cartouche de l'accueil, pour régler les marges internes et la place des deux portes.
// A : l'actuel amélioré · B : le cartouche à deux étages · C : les portes à côté du cartouche.
function HomeHeroLab() {
  const H = window.FESTIN_DATA.home;
  const Porte = ({ c, cls }) => (
    <a className={'ac-porte2 ' + cls} href={c.href}>
      <span className="ac-porte2__k">{c.k}</span>
      <span className="ac-porte2__l">{c.label}{' '}<span className="arrow" aria-hidden="true">→</span></span>
    </a>
  );
  const Titre = () => (
    <>
      <h2 className="hc__t hc__t--xl"><span className="ln"><span>Le goût d'avancer</span></span><span className="ln"><span><em>ensemble.</em></span></span></h2>
      <p className="hc__tag">{H.hero.title} {H.hero.titleAccent}</p>
    </>
  );
  const Photo = () => <figure className="hc__photo"><window.Picture src={H.hero.img} alt={H.hero.imgAlt} sizes="100vw" loading="eager" /></figure>;
  // sur mobile, les portes passent sous la photo (comme sur le site) ; B les garde bord à bord
  const Mob = ({ v }) => (
    <div className={'hl__mob hl__mob--' + v}><Porte c={H.hero.ctaPrimary} cls="ac-porte2--ins" /><Porte c={H.hero.ctaSecondary} cls="ac-porte2--pro" /></div>
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
        <h1>Accueil : trois mises en page du cartouche</h1>
        <p>Même photo, même texte. Ce qui change : les marges internes et la place des deux portes.</p>
      </div></div>

      <Cadre n="A" nom="L'actuel, amélioré" principe="Une seule marge intérieure (48 px) sur les quatre côtés, un rythme régulier entre titre, phrase et portes ; les portes ont des coins accordés au cartouche.">
        <header className="hc hc--accueil hl hl--a">
          <Photo />
          <div className="hc__cart hc__cart--deep on-dark">
            <Titre />
            <div className="hl__portes"><Porte c={H.hero.ctaPrimary} cls="ac-porte2--ins" /><Porte c={H.hero.ctaSecondary} cls="ac-porte2--pro" /></div>
          </div>
        </header>
        <Mob v="a" />
      </Cadre>

      <Cadre n="B" nom="Le cartouche à deux étages" principe="En haut, le titre sur le teal profond ; en bas, les deux portes forment le pied du cartouche, bord à bord. Plus de marge à régler autour des boutons.">
        <header className="hc hc--accueil hl hl--b">
          <Photo />
          <div className="hl__bloc">
            <div className="hc__cart hc__cart--deep on-dark"><Titre /></div>
            <div className="hl__pied"><Porte c={H.hero.ctaPrimary} cls="ac-porte2--ins" /><Porte c={H.hero.ctaSecondary} cls="ac-porte2--pro" /></div>
          </div>
        </header>
        <Mob v="b" />
      </Cadre>

      <Cadre n="C" nom="Les portes à côté du cartouche" principe="Le cartouche ne porte que le titre et la phrase ; les deux portes sont deux grands boutons posés à sa droite, sur la même ligne de base. La photo respire entre les deux.">
        <header className="hc hc--accueil hl hl--c">
          <Photo />
          <div className="hl__ligne">
            <div className="hc__cart hc__cart--deep on-dark"><Titre /></div>
            <div className="hl__cote"><Porte c={H.hero.ctaPrimary} cls="ac-porte2--ins" /><Porte c={H.hero.ctaSecondary} cls="ac-porte2--pro" /></div>
          </div>
        </header>
        <Mob v="c" />
      </Cadre>
    </div>
  );
}
window.HomeHeroLab = HomeHeroLab;
