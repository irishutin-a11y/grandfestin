# RAPPORT — reprise du site (24/09/2026)

Branche `reprise-design`, 20 commits atomiques depuis `main`, rien de poussé. Aperçu : config « Festin reprise » (port 4503). Direction : `DIRECTION.md`. Arbitrages appliqués : 1A 2B 3B 4B 5C 6A 7B 8B.

## Ce qui a changé, et pourquoi

**Fondations (une fois pour tout le site).** Échelle typographique unique et fluide (`--fs-label` → `--fs-display`, rapport ≥ 1,25), échelle d'espacement (`--sp-1` → `--sp-10`), courbes et durées centralisées (`--ease-*`, `--dur-*`, `FESTIN_MOTION` pour GSAP). Toutes les tailles de titres codées en dur pointent désormais vers l'échelle. KoHo en woff2 (87 → 12 ko par graisse). GSAP 3.15 en local : 45,7 ko gzippés (budget 60 ko). React en version de production (il tournait en version de développement). Focus visible global, `prefers-reduced-motion` global. Un seul interrupteur pour tous les blocs incomplets : `FESTIN_SHOW_PLACEHOLDERS`.

**Grammaire BeeToGreen.** Transition entre pages : le « trait du parcours » couvre l'écran puis se retire. Heros à couleur pleine avec le trait. Titres-phrases. Une seule étiquette par page. Sections tonales. Chiffres toujours accompagnés d'une phrase et d'une source. Parcours qui se séparent après la preuve. Bloc de fin commun à toutes les pages.

**Défauts de fond trouvés en route :**
- Le formulaire de contact affichait « message envoyé » sans rien envoyer. Il prépare maintenant le message dans la messagerie du visiteur et le dit.
- Le lien du rapport 2023 était mort ; il est remplacé par le bon fichier.
- La photo « Grand Festin 2025 » était celle d'Arles, octobre 2024 : légende corrigée.
- Trois AVIF s'affichaient vides ; ils sont réencodés.
- Le lien d'évitement « Aller au contenu » affichait la 404 ; c'est corrigé.
- Un chiffre en or sur fond clair (contraste 1,47:1) passe en or foncé.
- Les liens vers Carenews et Estello étaient morts : Carenews a sa nouvelle adresse, le lien Estello est retiré.
- Treize requêtes en 404 (photos d'antennes absentes) ne partent plus.
- Aucun bandeau défilant n'avait de bouton pause (WCAG 2.2.2) ; ils en ont un.

## Pages finies

- **Accueil** : refait entièrement.
- **Impact** : reconstruite. C'est l'impact général, avec la série 2022-2025 tirée des quatre rapports, l'effet dans la durée (étude Koreis, décembre 2023), un chiffre par projet, une seule section 2025, tous les rapports, les prix. Le budget est retiré (arbitrage 7B).
- **Actualités** : dix temps forts en carrousel, dont les faits marquants 2025 retirés d'Impact ; presse filtrable ; espace presse.
- **Association.**
- **Insertion** et **Acteurs du secteur** : avec une FAQ bâtie uniquement sur des réponses déjà publiées.
- **Contact** et **404.**
- **Formations**, **fiche formation**, **Académie** : même hero que le reste du site.
- **Pied de page** et **méga-menu.**
- **Sadi Carnot** : plus de page ni d'entrée de menu (8B).

**Les cinq pages projet sont nettoyées, pas refondues.** Elles n'ont plus d'étiquettes répétées, de `[XX]` visibles, de logos manquants affichés, de tirets cadratins ni de 404. Elles gardent leur hero photo et leur structure. Voir le point grave n° 5.

Vérifié dans le navigateur : 18 routes internes (aucun lien mort ni vide) et 26 liens externes. À 390 px, aucune page ne défile horizontalement. Interrupteur à `false` : aucune trace de maquette sur les 14 pages.

## [À COMPLÉTER] et [À TRANCHER]

- **[À TRANCHER]** Date de La Table de Cana : 1993 selon CLAUDE.md, mais « créée en 1992 » dans le rapport 2023. Le site ne donne plus d'année sur la page Impact.
- **[À TRANCHER]** Envoi réel du formulaire (Tally, Formspree ou fonction Vercel) : aujourd'hui, c'est une ouverture de la messagerie.
- **[À COMPLÉTER]** Adresse du site d'Estello Formation : estelloformation.com répond 404.
- **[À COMPLÉTER]** Date et lieu du Toast photographié (« 12 février », sans année).
- **[À COMPLÉTER]** Mettre `FESTIN_SHOW_PLACEHOLDERS = false` dans `index.html` avant la mise en ligne.
- **[À COMPLÉTER]** Fichiers HD des logos Des Étoiles et des Femmes (138 px) et La Table de Cana (147 px).

## [PHOTO MANQUANTE]

- Grand Festin, 3 octobre 2025, Vieux-Port : plan large sur les tablées, paysage.
- Exposition photo du Grand Festin 2025 : panneaux en plein air, plan large, paysage.
- Treize antennes Des Étoiles et des Femmes : une photo par ville, plan large, paysage.
- Douze portraits d'équipe sur quinze (dont Armand Hurault et Iris Hutin) : buste, vertical.
- Treize chefs du réseau, pour la sphère : portrait, carré.
- Logos partenaires : La Table de Cana (8), Tournesol (6, France Travail est déjà là), Restaure (Les Petites Cantines, La Communauté Ecotable).

## Les cinq points les plus graves qui restent

1. **Le rapport d'activité 2025 est modifiable par n'importe qui.** Il est partagé sur le Drive en « modification pour toute personne disposant du lien », et ce lien est public sur le site. À repasser en lecture seule avant la mise en ligne. Je n'ai pas touché aux droits du Drive.
2. **Le site compile son code dans le navigateur à chaque visite** (Babel standalone, environ 3 Mo). Sur mobile, le premier affichage est lent. Seul un outil de compilation le règle, ce qui change la façon de travailler des autres sessions.
3. **Le formulaire n'a pas d'envoi réel.** Un visiteur sans messagerie configurée doit copier l'adresse.
4. **Les visuels manquent sur les moments les plus forts** (Grand Festin 2025, exposition, équipe). En ligne, ces blocs disparaissent et les pages s'allègent. En chantier, ils font maquette.
5. **L'écart de grammaire entre les pages projet et le reste du site.** L'accueil, Impact et Actualités parlent la nouvelle langue visuelle ; les pages projet, l'ancienne (hero photo sans trait, sections empilées).

## Là où je ne suis pas d'accord avec vous

- **4B (garder toutes les animations).** Je retirerais le bandeau des métiers qui accélère au défilement et les photos qui s'éparpillent autour des chiffres de l'accueil. Ils décorent sans aider à lire, et le second anime des propriétés de mise en page. Je les ai gardés et corrigés, comme demandé.
- **Témoignages en bandeau défilant.** BeeToGreen et la lisibilité plaident pour une grande citation à la fois, avec des flèches. J'ai gardé le bandeau (votre demande) mais j'ai agrandi les cartes et ajouté la pause.
- **La règle « pas de build ».** Elle coûte la performance du point 2. Je la lèverais pour la mise en ligne.
- **Skills.** `css-animations` concerne les vidéos HyperFrames, pas un site : il ne s'applique pas ici. `frontend-design` n'a pas été chargé ; `impeccable` en couvrait le rôle.
