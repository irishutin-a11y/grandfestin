# Audit avant déploiement (24/09/2026)

Base : branche `claude/modest-rubin-fr5kof` (reprise-design + nouvel accueil validé). Mesures par le DOM à 1440 px, 14 pages. Référence : `DIRECTION.md` (grammaire beetogreen) et `DIRECTION-ACCUEIL.md` (validée). Cet audit ne refait pas `AUDIT-DESIGN.md` : il mesure l'écart entre chaque page et l'accueil validé.

## 1. Mesures

Part de la hauteur de page en aplat sombre ou saturé (hero compris) et cartes pleines saturées dans le corps de page.

| Page | Hauteur | Aplats sombres ou saturés | Cartes saturées |
|---|---|---|---|
| Accueil (référence) | 8 575 | hero seul | 0 |
| Le programme Restaure | 7 958 | **71 %** | 5 |
| La Table de Cana | 4 876 | **60 %** | 5 |
| Les Beaux Mets | 6 166 | 48 % | 5 |
| Contact | 2 324 | 44 % (hero) | 0 |
| Tournesol | 6 731 | 40 % | 5 |
| Académie | 5 222 | 39 % | 0 |
| Des Étoiles et des Femmes | 7 773 | 37 % | 6 |
| Association | 7 176 | 32 % | **10** |
| Actualités | 4 279 | 32 % | 1 |
| Insertion | 5 751 | 30 % | **9** |
| Impact | 7 204 | 25 % | 0 |
| Acteurs du secteur | 6 326 | 16 % | 3 |

La lourdeur vient des corps de page, pas des heros : le hero est la seule surface saturée voulue (règle 1 de `DIRECTION-ACCUEIL.md`).

## 2. Constats transverses (du plus grave au moins grave)

1. **Pages projet : 2 à 4 aplats pleins par page.** Bloc « le projet » en teal foncé (1 000 à 1 600 px), bloc « soutenir » dans la couleur du projet (corail, terracotta, bordeaux, olive, ocre), et sur Restaure deux blocs sombres de plus. Ces pages sont les plus lourdes du site alors qu'elles portent le cœur du discours.
2. **Aucune page projet ne dit à quelle mission elle appartient**, ni ne renvoie vers les projets voisins. L'accueil range tout en trois missions ; en arrivant sur un projet, ce fil disparaît. C'est la principale cause du « on se perd ».
3. **Chiffres en tuiles.** Les cinq pages projet ouvrent sur quatre tuiles colorées « gros chiffre, petite légende », le gabarit que `DIRECTION.md` écarte. Les 4 chiffres clés de Festin (441, 83 %, 14, 91 %) apparaissent sur l'accueil, l'Association, l'Insertion et deux fois sur Impact.
4. **Quatre composants pour la même idée (une suite d'étapes)** : jalons colorés épinglés (Association, Insertion), étapes à filet (Acteurs du secteur), accordéons (pages projet), frise (accueil). Le lecteur réapprend la grammaire à chaque page ; l'accordéon cache le contenu derrière des clics.
5. **Fins de page sans action.** Les cinq pages projet finissent sur un bandeau de photos (400 px) après la presse : la dernière chose vue n'est pas une porte. Plusieurs se terminent par des appels vers un site externe.
6. **Appels à l'action hétérogènes.** Chaque projet invente ses libellés et ses destinations (« Visiter le site », « Réserver une table », « Signer le manifeste », « Demander un devis », « Nous contacter »). Aucun ne répond de la même façon aux trois publics : la personne qui cherche un métier, l'acteur du secteur, le soutien.
7. **Cartes pleines en série** sur l'Association (7 jalons et 3 valeurs, chacun d'une couleur), l'Insertion (4 parcours et 6 mois colorés) et les Acteurs du secteur (3 cartes en éventail). Dix aplats colorés de suite ne hiérarchisent plus rien.
8. **Titres de section sur deux lignes forcées** (`<br />`) et casse inégale sur les pages projet ; titres qui redisent le hero (« Le programme national qui forme des femmes… » en H2 sous un H1 qui le dit déjà).

## 3. Constats par page

- **Accueil** : validé. Le bloc des preuves est long sur mobile : à resserrer.
- **Association** : bon récit ; jalons et valeurs en aplats colorés ; chiffres clés en doublon avec Impact ; logos partenaires en bandeau défilant alors qu'ils sont 7.
- **Impact** : bonne structure ; « 2025 en quatre chiffres » (teal) redit la série au-dessus.
- **Insertion** : parcours présentés dans un autre ordre que les missions ; calendrier en 6 aplats ; chiffres clés en doublon.
- **Acteurs du secteur** : éventail de 3 cartes pleines ; le reste est sain.
- **Actualités, Formations, fiche formation, Contact** : sains ; alignements mineurs.
- **Académie** : deux bandes sombres dans le corps ; « Former autrement » est une étiquette, pas une phrase.
- **Pages projet** : voir constats 1 à 6.

## 4. Décisions de refonte

1. **Un seul gabarit de page projet** (`ProjetPage`, piloté par `data.js`) : hero · mission et « en bref » en phrases · parcours en frise (composant partagé de l'accueil) · bloc propre au projet (antennes, brigade, groupes de travail, bilan…) · témoignages · trois portes (me former · le secteur · soutenir) · presse · les autres projets de la mission. Couleur du projet en accent discret seulement (arbitrage A).
2. **Frise partagée** partout où il y a une suite d'étapes : parcours des projets, calendrier de l'Insertion, POEI des Acteurs du secteur, histoire de l'Association.
3. **Cartes claires** à la place des aplats en série : fond clair, numéro et filet de la couleur de famille.
4. **Chiffres clés** : complets sur l'accueil et sur Impact seulement ; ailleurs, une phrase avec source et un lien vers Impact.
5. **Les galeries de fin de page** sont retirées ; chaque page finit par une porte, puis le bloc de fin du pied de page.
6. **Les missions** apparaissent sur chaque projet (étiquette dans le hero) et structurent les pages Insertion et Acteurs du secteur.
