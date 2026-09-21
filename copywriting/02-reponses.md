# 02 bis — Réponses enregistrées (fin de l'étape 2)

Relevé de tes réponses dans `02-questions.md`. Ce fichier sert de mémoire si la session se perd.

## Décisions de ton

| # | Décision | Conséquence pour l'écriture |
|---|---|---|
| 1 | **Option b** : le « nous » est celui de l'association Festin, sans signataires. Les pages projet gardent la voix du projet. | Pas de « la direction vous écrit ». « Nous » sur les pages institutionnelles, 3ᵉ personne factuelle (« Les Beaux Mets accueille… ») sur les fiches projet. |
| 1 bis | Ajouter Jérôme Schatzman (président) et Guillaume **Hermitte** (trésorier ; deux « t » dans le rapport) à la page équipe. | Changement de contenu de la page About, à l'étape 6. Le rapport liste aussi la secrétaire et les administrateurs : voir `01b`, section F. |
| 2 | **Option a** : vouvoiement chaleureux partout. | Aucun tutoiement, y compris pour les personnes en parcours. |
| 3 | **Option b** : le site parle du secteur (restauration, violences en cuisine, management, conditions de travail), pas du financement public. | Aucune phrase sur « la crise des financements » ni sur « les associations, associées des pouvoirs publics ». Cela reste dans les documents financeurs. |
| 4 | **Option b** sur l'accueil et About : national d'abord, Marseille comme preuve (« depuis Marseille, jusqu'à 14 territoires »). **Option c** sur les pages d'accompagnement : Marseille nommée là où c'est un fait. | Les titres généraux ne mettent pas Marseille en tête. |
| 5 | La liste d'intouchables est confirmée telle quelle : baseline, noms de dispositifs, témoignages mot pour mot, intitulés du catalogue, phrases de la direction reprises. La baseline « Le goût d'avancer ensemble » **reste le titre de la home**. | Le titre de la home ne bouge pas. Ailleurs la baseline ne réapparaît pas en titre (About, pied de page à arbitrer à l'étape 5). |

## Faits tranchés

| # | Point | Réponse |
|---|---|---|
| 1 | Chiffres 2025 | **Tranché : 441 / 83 % / 14.** Référence : version de 34 pages du rapport d'activité (`ressources/documents/rapport-activite-2025/`). Autres chiffres du même rapport : 336 femmes, 91 %, 89 %, 550 convives (le « 1 100 » contre « 1 200 » reste à trancher, voir `01b`). |
| 2 | La Table de Cana | **1993**. |
| 3 | Restaure | **« programme »** (restructuration en cours). |
| 4 | « 35 ans » sur About | Ta ligne s'arrête au rappel de la règle : **pas de décision lisible**. Voir question ci-dessous. |
| 5 | Académie Festin | **2026**. |
| 6 | Tournesol | **5 mois**, lancement en **2025**. L'actualité du site parle de « Tournesol 2026, 18 apprenants » : je lis cela comme une 2ᵉ promotion, pas comme un lancement. |
| 7 | ESUS | « Festin est agréée ESUS. » |
| 8 | Qualiopi, SIRET, NDA | « Remets les. » Voir question ci-dessous. |

## Trois points que je ne peux pas appliquer sans ta précision

1. **1993 contre 1992.** Ton brief dit « depuis 1992 (La Table de Cana Marseille) », et tu écris maintenant 1993. Deux lectures :
   - **(i)** Festin est née en 1992, La Table de Cana Marseille en 1993. Le site écrit alors « depuis 1992 » pour l'association et « depuis 1993 » pour La Table de Cana.
   - **(ii)** Tout est 1993, l'association comprise. « Depuis 1992 » disparaît du site (accueil, About, Impact, Accompagnement, ticker, frise About).
   Le deck financeurs place 1992 sur la frise de La Table de Cana, l'édito place 1993. Je n'écris aucune date d'ancienneté tant que je n'ai pas ta lecture.
   Lié : le « 35 ans » de la page About. 2026 − 1993 = 33 ans, 2026 − 1992 = 34. Faut-il garder « 35 ans », repasser à « 33 ans » (titre initial du site), ou n'écrire aucun nombre ?
2. **ESUS : quelle entité ?** La règle demande de préciser l'ESUS « chaque fois qu'une filiale est mentionnée ». Tu me dis que Festin est agréée. Or les filiales que le site cite sont **Estello Formation** (page Académie, Tournesol, équipe) et, dans le deck, La Table de Cana Marseille (SAS Goût & Sens). Sont-elles agréées ESUS elles aussi ? Je n'écris « ESUS » que pour les entités que tu me confirmes.
3. **« Remets les » : que dois-je remettre, et où ?** Je n'ai rien modifié.
   - Le pied de page (`Sections.jsx:270`) affiche **déjà** « NDA 93132168513 · Siret 924 202 831 00013 · Organisme certifié Qualiopi ». La fiche Contact (`Sections.jsx:159`) aussi.
   - Ce que le commit `fa2c340` (17 sept.) a retiré, ce sont ces trois mentions du **bloc légal statique** (`index.html`) et de `mentions-legales.html`, avec le message : « 924 202 831 00013 appartient à une autre entité, tout comme le NDA et la certification Qualiopi ». Le SIRET de l'Association Festin y est `379 756 026 00074`.
   - Ton « remets les » veut donc dire l'un de ces trois : **(a)** rétablir les trois mentions dans le bloc légal et les mentions légales (donc annuler `fa2c340`) ; **(b)** rétablir NDA et Qualiopi mais garder le SIRET `379 756 026 00074` ; **(c)** autre chose.
   - Ce sont des mentions légales, et la vérification Google for Nonprofits lit ce bloc en HTML brut. Dis-moi laquelle des trois et à quelle entité appartiennent le NDA et la certification Qualiopi : je ne la devine pas.
