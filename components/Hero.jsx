// Hero.jsx — full teal banner with photo overlay; minimal centered hero (no CTAs, no stats)
function Hero() {
  const scrollDown = (e) => {
    e.preventDefault();
    const target = document.getElementById('after-hero');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <section className="hero hero--minimal">
      <div className="hero__photo" />
      <div className="hero__overlay" />
      <div className="container">
        <div className="hero__center">
          <h1 style={{color:'#fff'}}>
            La restauration comme levier d'<em className="accent accent--gold">insertion, de formation et de transformation</em>
          </h1>
          <p className="lede" style={{color:'#fff',opacity:0.9}}>
            Festin est une association qui agit depuis 2015 pour rendre la gastronomie plus inclusive : en formant des professionnels, en accompagnant des personnes éloignées de l'emploi, et en transformant les pratiques du secteur.
          </p>
        </div>
      </div>
      <a href="#after-hero" className="hero__scroll" onClick={scrollDown} aria-label="Faire défiler">
        <i data-lucide="chevron-down" style={{width:28,height:28}}/>
      </a>
    </section>
  );
}
window.Hero = Hero;
