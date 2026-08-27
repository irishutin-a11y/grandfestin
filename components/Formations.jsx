// Formations.jsx + Modal.jsx — formations grid and detail modal
function Formations() {
  const items = window.FESTIN_DATA.formations;
  const main = items.slice(0, 4);
  const wide = items[4];
  return (
    <section className="formations" id="formations">
      <div className="container">
        <div className="formations__head">
          <span className="eyebrow">Nos formations</span>
          <h2 className="h2">5 parcours, <em className="accent">5 publics</em></h2>
          <p className="lede" style={{marginTop:12}}>Cliquez sur une formation pour découvrir le programme, les modalités et les conditions d'accès.</p>
        </div>
        <div className="formations__grid">
          {main.map((f) => <FormationCard key={f.id} f={f}/>)}
          <FormationCard f={wide} wide/>
        </div>
      </div>
    </section>
  );
}

function FormationCard({ f, wide }) {
  return (
    <div className={"formation-card" + (wide ? " wide" : "")} onClick={() => window.openFormationModal(f.id)}>
      <div className="formation-card__img"><img src={f.img} alt={f.title}/></div>
      <div className="formation-card__body">
        <span className="eyebrow">{f.cat}</span>
        <h3>{f.title}</h3>
        <p className="formation-card__desc">{f.desc}</p>
        <div className="formation-card__chips">
          <span className="chip"><i data-lucide="clock" style={{width:12,height:12}}/> {f.duration}</span>
          <span className="chip"><i data-lucide="map-pin" style={{width:12,height:12}}/> {f.format.split('—')[0].trim()}</span>
          <span className="chip"><i data-lucide="euro" style={{width:12,height:12}}/> {f.price.split('—')[0].trim()}</span>
        </div>
        <div className="formation-card__bottom">
          <span className="lnk">Voir le détail <i data-lucide="arrow-right" style={{width:14,height:14}}/></span>
          <span className="formation-card__public">{f.publicLabel}</span>
        </div>
      </div>
    </div>
  );
}

function FormationModal({ id, onClose }) {
  const f = window.FESTIN_DATA.formations.find(x => x.id === id);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow=''; };
  }, [onClose]);
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  if (!f) return null;
  return (
    <div className="modal-scrim open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="mt">
        <div className="modal__hd">
          <button className="modal__close" onClick={onClose} aria-label="Fermer"><i data-lucide="x" style={{width:18,height:18}}/></button>
          <span className="eyebrow eyebrow--gold">{f.cat}</span>
          <h2 id="mt">{f.title}</h2>
          <p>{f.desc}</p>
        </div>
        <div className="modal__body">
          <div className="modal__info">
            <div className="info-card"><div className="info-card__lbl"><i data-lucide="clock" style={{width:14,height:14}}/> Durée</div><div className="info-card__v">{f.duration}</div></div>
            <div className="info-card"><div className="info-card__lbl"><i data-lucide="map-pin" style={{width:14,height:14}}/> Format</div><div className="info-card__v">{f.format}</div></div>
            <div className="info-card"><div className="info-card__lbl"><i data-lucide="euro" style={{width:14,height:14}}/> Tarif</div><div className="info-card__v">{f.price}</div></div>
          </div>
          <div className="modal__section">
            <h4>Objectifs pédagogiques</h4>
            <ul className="objectives">{f.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
          </div>
          <div className="modal__section">
            <h4>Programme</h4>
            <ol className="programme">{f.programme.map((p, i) => <li key={i}>{p}</li>)}</ol>
          </div>
          <div className="modal__section">
            <h4>Tarifs &amp; financement</h4>
            <div className="tariff">{f.tariff}</div>
          </div>
          <div className="access-note">
            <i data-lucide="accessibility" style={{width:18,height:18}}/>
            <div><b>Accessibilité :</b> nos formations sont accessibles aux personnes en situation de handicap. Contactez notre référente handicap pour étudier les aménagements possibles.</div>
          </div>
        </div>
        <div className="modal__ft">
          <button className="btn btn--ghost" onClick={onClose}>Fermer</button>
          <a href="#contact" className="btn btn--gold" onClick={onClose}>Demander un devis <i data-lucide="arrow-right" style={{width:16,height:16}}/></a>
        </div>
      </div>
    </div>
  );
}

window.Formations = Formations;
window.FormationCard = FormationCard;
window.FormationModal = FormationModal;
