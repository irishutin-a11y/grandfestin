# 01 bis — Complément d'audit (nouvelles sources)

Ce complément met à jour `01-audit.md` avec le zip Claude Design et les documents qu'il contenait. Aucun fichier du site modifié.

## A. Sources ajoutées

| Source | Ce qu'elle apporte |
|---|---|
| **Rapport d'activité 2025, 3 fichiers** | 2 versions : **441 / 83 %** (34 p., `Copy of…`, la référence retenue) et **453 / 72 %** (35 p. et une version « compressed » image seule, ancienne). |
| Kit de communication Festin 2026 (Iris Hutin) | Boilerplates, éléments de langage, chiffres clés, couleurs, règles ESUS. |
| Restructuration de la communication v2 (août 2026) | Calendrier de lancement, règles éditoriales, charte, points de vigilance (base presse). |
| Charte graphique 2022 | Couleurs d'origine, « L'association Départ devient Festin » (juin 2022). |
| Charte de communication 2025-2026 du réseau Des Étoiles et des Femmes | Éléments de langage du réseau, mentions obligatoires. |
| Offre restaurateurs, communiqué de presse France Travail, Présentation TFP, Bilan Tournesol 2025-2026, Book de l'emploi, cahier des charges restaurant, Organigramme, Dossier mécènes et Deck financeurs Sadi Carnot | Faits, citations, vocabulaire. |

Ton précision : le site du dépôt est plus avancé que le design system, dont les composants sont tes anciens. Je traite donc le design system comme une réserve d'assets et de textes, pas comme une référence de structure.

## B. Chiffres : 441 / 83 % tranché, ce qui reste à aligner

Décision : **441 / 83 % / 14** (Rapport d'activité, version de 34 pages). L'écart avec 453 / 72 % vient d'une **ancienne version du rapport** : les deux versions ne diffèrent que sur quatre points.

| Donnée | Version 34 p. (retenue) | Version 35 p. (ancienne) |
|---|---|---|
| Personnes accompagnées | **441** | 453 |
| Sorties en emploi ou formation | **83 %** | 72 % |
| Femmes accompagnées (Des Étoiles et des Femmes) | **336** | 358 |
| Grand Festin, villes et brigades | **13** | 14 |
| « 73 % de sorties positives » (Des Étoiles et des Femmes) | absent | présent |

**Documents qui circulent avec les anciens chiffres** (hors site, à mettre à jour de ton côté) : le kit de communication (453 / 72 %), le deck financeurs (457 / 72 %, 328 femmes, 88 % Table de Cana), l'Offre restaurateurs (203 personnes, 83 %).

**Écarts qui restent, y compris à l'intérieur de la version retenue.**

| Donnée | Valeurs | Où |
|---|---|---|
| Femmes accompagnées par Des Étoiles et des Femmes depuis 2015 | **« plus de 1 100 »** (rapport, kit) contre **« 1 200 »** (site : `data.js:98, 100`, carte accueil) | Le rapport d'audit de septembre avait changé 1 100 en 1 200 à partir du Codev DEF (été 2026). À trancher. |
| Grand Festin, convives | **plus de 600** (édito) contre **550** (rapport p. 14, site) | |
| Beaux Mets, personnes accompagnées en 2025 | **47** (rapport p. 8) contre **48** (rapport p. 17, site) | Incohérence interne du rapport. |
| Beaux Mets, chiffre d'affaires | +25,7 % (p. 8) contre +25 % (p. 17, site) | |
| Table de Cana, repas d'aide alimentaire | « plus de 15 000 » (rapport) contre « près de 18 500 » (deck) | Le site n'a pas ce chiffre. |
| Ancienneté de l'association | « 35 ans » (site), « près de 40 ans » (decks), « quatre décennies » (Offre restaurateurs), « depuis 2015 » (kit) | Voir C. |

## C. Dates d'ancienneté : quatre repères dans les sources

| Repère | Ce qui le dit |
|---|---|
| **1992** | Deck financeurs, kit (La Table de Cana « née en 1992 »), Offre restaurateurs, site (About, accueil, Impact). |
| **1993** | Rapport d'activité (édito, p. 3, Table de Cana « né en 1993 »), fiche projet Table de Cana du site, ta décision. |
| **2015** | Kit de communication : « Festin est une association… née à Marseille en 2015 autour d'un projet pionnier, Des Étoiles et des Femmes », « 10 ans d'existence de Festin ». Design system README : « founded in 2015 ». |
| **2022** | Charte graphique : « L'association Départ devient Festin » (juin 2022). |

La Table de Cana est donc datée 1992 ou 1993 selon le document, et le **nom** Festin date de 2022. Le kit fait remonter Festin à 2015 tout en appelant La Table de Cana « le premier projet de Festin, né en 1992 » : il se contredit. Question déjà posée dans `02-reponses.md` (« depuis 1992 » pour l'association ?) : elle est plus ouverte qu'avant.

## D. D'où viennent les tics : ils sont dans les documents de référence

| Tic relevé sur le site | Origine trouvée |
|---|---|
| « Viser l'excellence ne s'oppose pas à l'inclusion, c'est même souvent sa condition » | **Kit de communication, boilerplate de 250 mots (p. 7)** et README du design system (« le tour à condition de »). |
| « Former autrement, certifier vraiment » | **Citation d'Armand Hurault** dans le communiqué France Travail : « il ne suffit pas de former davantage : il faut former autrement ». Le « former autrement » est de la direction, le miroir « certifier vraiment » est un ajout du site. |
| Triplets en infinitif (« Former, inclure, transformer ») | README du design system (« la triade »), Offre restaurateurs (« Recruter autrement. Fidéliser durablement. Transformer le secteur. »), kit (« Nous formons, nous accompagnons, nous transformons »). |
| « levier » | Kit (« un levier d'insertion sociale et professionnelle »), rapport (3 fois dans l'édito). |
| Pivot italique doré | Kit : « accent italique doré réservé à un mot ou une phrase par titre, deux fois maximum par page ». |
| « Solution RH », « offre », « clients » | **Offre restaurateurs** (« La solution RH et engagement de la restauration »), source de l'ancienne page restaurateurs, déjà corrigée en septembre. Le kit lui-même interdit « client » et « offre ». |

Conséquence pour la charte éditoriale : la doctrine de marque écrite (kit) **consacre les tics**. Les écarter suppose de le dire à Iris et de mettre à jour le kit, sinon les tiers le réintroduiront.

Autres règles du kit et du document de restructuration, à intégrer : « Les chiffres, sourcés et datés, jamais un superlatif à leur place », « aucune mention d'investisseur », « pas d'écriture à point médian », « on parle de filiales, jamais d'entreprises au sens capitalistique », « la non-lucrativité et l'intérêt général se rappellent dès qu'on présente une filiale, jamais en mention finale ». Le kit dit aussi que le vocabulaire *startup, disrupt, leader, innovant, ROI* est hors de propos.

## E. Palette : trois versions

| Source | Teal | Or | Autres |
|---|---|---|---|
| Charte graphique 2022 et document de restructuration | `#217078` | `#FFC100` | crème `#F7F3EC` |
| Kit 2026 et site (`_tokens.css`) | `#1D6B78` | `#E8A825` (or foncé `#C49000`) | teal foncé `#0F3C44`, profond `#0A2D33`, crème `#F7F3EC` |
| Charte du réseau Des Étoiles et des Femmes | violet `#803c78`, jaune `#ffc700` | orange `#ff8c41`, rose `#ff5462` | DM Sans |

Le kit dit « **Deux couleurs, un papier crème** ». Le site utilise en plus un **corail `#E4572E` et un violet `#9A5BA8`** (mega menu, About, chiffres) : je n'en trouve la source dans aucun de ces documents. À toi de dire quelle palette fait foi. Je n'ai rien changé.

## F. Équipe et gouvernance : ce que le rapport (p. 32) dit et que la page équipe ne dit pas

Le rapport a un organigramme, mais son extraction de texte mélange les lignes. Les rôles ci-dessous sont sûrs quand ils viennent des pages 19 et 32 lues ensemble ; le reste est à vérifier sur le PDF.

| Sujet | Site actuel | Rapport |
|---|---|---|
| **Camille Lafon** | « Second de cuisine — Les Beaux Mets » | p. 19 : « prend la direction du restaurant » (pilotage du projet, lien avec les partenaires). **Le site se trompe.** |
| Valentin Majan | Chef de cuisine | Chef de cuisine, ancien sous-chef. Correct. |
| Boris Ruel | Second de cuisine | Second de cuisine. Correct. |
| Marie Plé, Iris Liberty | Assistante de gestion ; animation de communauté Restaure | Concordant. |
| Iris Hutin, Mattieu Donsimoni | Chargée de projet Communication ; communication (alternance) | Rapport : « en alternance » pour les deux. Ta correction est postérieure. |
| **Gouvernance** | absente | Jérôme Schatzman (président), **Guillaume Hermitte** (trésorier ; deux « t » dans le rapport, à la différence de ton message), Virginie Leconte (secrétaire), administrateurs : Olaf Burki, Richard Lepage, Léo Corcelli, Gaëlle de Carmantran, Association Yes We Camp. |
| Autres personnes citées | absentes | Marion Binachon, Nissa Boudhabhay (CIP Les Beaux Mets), Marc Balthazard (maître d'hôtel), Fanny Bouvier (CIP Tournesol, Estello). Rôle exact de chacun à confirmer. |

Le kit dit d'Armand Hurault qu'il est « directeur » ; le communiqué de presse dit « directeur général ».

## G. ESUS, Qualiopi, « Groupe Festin » : ce que disent les sources

- **ESUS** : le kit écrit « **Certaines de nos filiales** portent l'agrément ESUS » et laisse la liste **« à compléter, à confirmer avec Iris Hutin »**. Tu m'as répondu « Festin est agréée ESUS ». Les sources disent « certaines filiales ». L'organigramme cite trois SAS : **Estello, Régal, Goût & Sens**, sous une holding « Maison Festin » (groupement employeur). Lesquelles sont agréées ? Question ouverte.
- **Qualiopi** : le kit et la page Académie disent « Académie Festin, certifiée Qualiopi ». Le commit `fa2c340` disait que la certification appartenait à « une autre entité ». Pas de contradiction résolue.
- **« Groupe Festin »** : présent dans les documents internes (organigramme, offre restaurateurs, deck) mais interdit sur le site par la règle. Rien à corriger sur le site à ce jour.
- **« Mouvement » Restaure** : le rapport, le kit et le deck disent « mouvement ». Ta décision : « programme ».

## H. Calendrier : le site sort dans 10 jours

Le document de restructuration donne : **20 - 26 septembre** test mobile, vérification des liens, référencement ; **27 septembre - 1er octobre** mise en ligne, annonce LinkedIn. Deux points qui relèvent du site et pas du texte :
- La base presse a des **liens décalés** (des retombées pointent vers les mauvais articles) : le document la place à corriger « en fichier, pas en recette de liens ». Je n'ai pas vérifié le tableau `presse` de `data.js`.
- La redirection de `associationfestin.com` casse le dossier Google Workspace tant que la mention de propriété n'a pas basculé sur `grandfestin.com`.

Ce sont des risques de lancement à surveiller ; je n'y touche pas dans ce chantier.
