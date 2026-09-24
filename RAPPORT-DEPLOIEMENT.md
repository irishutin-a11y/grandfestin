# Rapport — déploiement de la direction de l'accueil (nuit du 24 au 25/09/2026)

Branche `claude/modest-rubin-fr5kof` (base : `reprise-design`), poussée. Aperçu qui suit chaque push : https://grandfestin-git-claude-modest-rubin-fr5kof-festin12.vercel.app/

Documents : `AUDIT-DEPLOIEMENT.md` (mesures, constats, décisions) · `copywriting/09-journal-deploiement.md` (textes réécrits, sections retirées et où elles sont passées) · `CLAUDE.md` (conventions pour les prochaines sessions) · `captures/` (1440 et 360 px).

## Ce qui a changé

- **Un seul rangement pour tout le site : trois missions** (Former · Accompagner jusqu'à l'emploi · Changer les cuisines), visibles sur l'accueil, l'Association, l'Académie, chaque page projet et le menu.
- **Pages projet** : un seul gabarit (au lieu de cinq fichiers recopiés), plus courtes, pensées comme des portes d'entrée vers les sites des projets. Plus aucun aplat de couleur dans le corps des pages ; la couleur du projet devient une pastille. Galeries de fin de page gardées, avec pause.
- **Insertion et Acteurs du secteur** : projets rangés par public, frises partagées, appels finaux clairs.
- **Association, Impact, Académie, Actualités** : plus de bandes sombres dans le corps de page ; chiffres clés complets sur l'accueil et Impact seulement.
- **Navigation** : trois liens visibles dans la pastille, menu rangé par public, bouton flottant retiré.

Part de la page en aplat sombre ou saturé (hors pied de page), avant → après : Restaure 71 % → hero seul ; La Table de Cana 60 % → hero seul ; Les Beaux Mets 48 % → hero seul ; Association 32 % et 10 cartes pleines → hero seul, 0 carte pleine.

## Vérifié

20 routes à 390 et 1440 px : aucune erreur JavaScript, aucun débordement horizontal, aucune ressource introuvable, aucun lien interne mort, un seul H1 par page. Audit axe-core (WCAG 2.1 AA) sur 15 routes : contrastes corrigés ; une exception volontaire (noms estompés à l'arrière de la sphère des chefs, effet de profondeur).

## Ce qui vous attend

1. **Valider sur l'aperçu**, en priorité une page projet (Des Étoiles et des Femmes) et la page Insertion.
2. **Sections retirées** : la liste est dans le journal (restaure : axes et groupes de travail ; Tournesol : bilan détaillé ; Les Beaux Mets : l'équipe). Dites-moi ce que vous voulez rétablir.
3. **Photos** : antennes (dossier du formulaire vide pour ce compte) et Grand Festin 2025 (introuvables). À déposer dans `images/` ; le site les prend sans changement de code pour les antennes (`FESTIN_DATA.antennesPhotos`).
4. **Boutons de don** : le corail est assombri (#C2421C) pour être lisible. À valider au regard de la charte.
5. **Fusion** : rien n'est fusionné dans `main` ni dans `reprise-design`.
