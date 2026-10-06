# Propositions V4 : accueil, menu, arborescence, catalogue (06/10/2026)

Réponse à vos retours du 06/10 au soir. Ce qui était sans ambiguïté est déjà fait, sur la branche (voir la fin du document). Ici, tout attend votre choix.

---

## 1. Les deux entrées de l'accueil : quatre options

Ce qu'elles respectent :
- Le mot « apprendre » disparaît.
- Le code couleur ne change pas : teal pour la personne, or pour le secteur.
- Chaque bouton porte une petite ligne au-dessus et un libellé.

| | Entrée teal (la personne) | Entrée or (le secteur) | Ce que ça dit |
|---|---|---|---|
| **A** | « Vous cherchez un emploi » · **Trouver un emploi en cuisine** | « Vous êtes du secteur » · **Recruter et former vos équipes** | Le plus direct : l'emploi d'abord, la formation devient un moyen. |
| **B** | « Vous voulez changer de vie » · **Construire votre avenir en cuisine** | « Vous dirigez une cuisine » · **Faire avancer vos équipes** | Le plus inspirant, sur le ton de « Le goût d'avancer ensemble ». Moins concret. |
| **C** | « Pour vous » · **Être accompagné jusqu'à l'emploi** | « Pour votre établissement » · **Recruter, former, s'engager** | Le plus fidèle au repositionnement (l'accompagnement, §1 de RETOURS-V3). Plus long. |
| **D** | « Vous cherchez un métier » · **Nos parcours vers l'emploi** | « Vous êtes du secteur » · **Travailler avec Festin** | Le plus sobre : deux portes vers deux pages, sans promesse. |

**Je recommande A.** C'est la formulation qu'une personne en recherche d'emploi tape, et elle ne parle pas de formation.

---

## 2. La barre et le méga menu font doublon : trois options

Aujourd'hui, la barre affiche les quatre rubriques avec leurs sous-menus. Le bouton « Menu » ouvre un panneau qui redit exactement la même chose.

| | Ce que montre la barre | Ce que fait « Menu » | Ce que ça coûte |
|---|---|---|---|
| **A** | Le logo, **deux actions** (« Vérifier mon éligibilité », « Recruter ») et le Don | Le méga menu, seul endroit de l'arborescence | Les rubriques ne se voient plus d'un coup d'œil sur ordinateur : il faut ouvrir le menu. |
| **B** | Les quatre rubriques, **sans sous-menus** | Chaque rubrique ouvre le méga menu **sur sa colonne** ; « Menu » l'ouvre en entier | Un seul système de navigation, deux portes d'entrée. Rien n'est dit deux fois. |
| **C** | Les quatre rubriques, avec sous-menus | **Plus de bouton « Menu » sur ordinateur** ; il reste sur mobile | Le méga menu disparaît sur ordinateur, alors que vous voulez le garder. |

**Je recommande B.** Vous gardez le méga menu, la barre n'en est plus qu'une entrée, et les sous-menus actuels disparaissent : il n'y a plus de « presque double menu ».

---

## 3. L'arborescence : ce qui ne va pas, et une version plus simple

**Le diagnostic, d'accord avec vous :**
- Trois liens du sous-menu « L'insertion » mènent à la même page (Nos parcours, Vérifier mon éligibilité, et avant Vous orientez une personne). C'est ce qui donne l'impression de liens qui « renvoient la même page ».
- Les pages sont longues parce que je leur ai ajouté des sections (la section Académie dans L'insertion, par exemple) au lieu de créer la page qui manquait : **un catalogue**.
- Projets et formations sont rangés à deux endroits (L'écosystème d'un côté, les fiches de l'autre). On ne voit nulle part l'offre complète de Festin.

**Proposition : un catalogue unique, « Projets et formations »** (`#/catalogue`), qui remplace L'écosystème.
- Une seule grille de cartes. Chaque carte porte son type : **Projet**, **Parcours d'insertion**, **Formation pro**, **Lieu**.
- Des filtres : **Tous** · **Insertion** (les parcours et les projets d'insertion) · **Professionnels** (les formations pro et Restaure) · **Nos tables** (Les Beaux Mets, La Table de Cana Marseille, Sadi Carnot à venir).
- Il n'y a pas de doublon : une carte par chose, un filtre par public. Une carte de projet mène à la page du projet, une carte de formation à sa fiche.

**L'arborescence qui en découle : 4 rubriques, chacune mène à une page réelle.**

| Rubrique | Page | Contenu | Ce qui part |
|---|---|---|---|
| **L'insertion** | `#/insertion` | Ce qu'est un parcours, les cartes de parcours (avec leur lieu), le bloc prescripteurs, la FAQ, le bouton flottant d'éligibilité | La section « La formation, un moyen » et « Un secteur qui recrute » : elles vont au catalogue, filtre Insertion |
| **Pour le secteur** | `#/restauration` | Recruter, former (les deux formations), s'engager | — |
| **Projets et formations** | `#/catalogue` | Le catalogue filtrable, et Sadi Carnot en développement | L'écosystème (fusionné) |
| **Festin** | `#/about` | Qui sommes-nous ; Impact et Presse restent des pages, reliées depuis Festin et la barre | — |

- **Les pages projet et les fiches restent**, mais on n'y arrive plus que par le catalogue ou les cartes. Le menu ne les liste plus une à une : c'est ce qui réduit le doublon.
- **« Nos tables » disparaît du menu** et devient le filtre « Nos tables » du catalogue. **À trancher** : vous venez de demander Sadi Carnot grisé dans « Nos tables », c'est fait sur la version actuelle. Si on garde « Nos tables » comme entrée, la rubrique « Projets et formations » perd ce filtre.
- **Redirections** : toutes les adresses actuelles restent valides. On ne crée qu'une page (le catalogue), on en fusionne une (L'écosystème).

---

## 4. Les deux frises de reconnaissances

Aujourd'hui :
- **Qui sommes-nous** a une frise qui mêle les projets lancés (cartes teal) et les reconnaissances (étiquettes or) ;
- **Impact** a sa propre liste de reconnaissances, par année.

Les mêmes prix y apparaissent, présentés autrement.

**Proposition** : une seule frise de reconnaissances, sans les projets, avec les mêmes données aux deux endroits. **À trancher** : où la mettre (question 4).

---

## 5. Ce qui est déjà fait (branche, pas encore sur `main`)

**Visuels et en-têtes**
- Logo : le fichier d'origine était coupé en bas. Je l'ai reconstruit à partir du logo complet, en trois versions sans baseline (teal, blanc, jaune). Il est en place dans le menu, le pied de page, Qui sommes-nous et l'espace presse.
- En-têtes allégés : la grande image, le fil d'Ariane et un seul bouton. Plus d'étiquette ni de second lien. La page Pour le secteur est traitée de la même façon.
- Portrait de Hugues Bonnetain recadré sur le visage.

**Accueil**
- La phrase « groupe associatif à but non lucratif » quitte l'en-tête.
- Elle ouvre maintenant le texte de « Deux publics, un même métier ». J'ai réécrit les deux colonnes, sans « apprendre ».

**Menu**
- « Vous orientez une personne ? » est retiré.
- Sadi Carnot apparaît grisé « à venir » dans Nos tables.
- La rubrique s'appelle « Pour le secteur ».
- « Former vos équipes » mène aux deux formations (management juste et inclusif, et prévention des violences).

**Pied de page** : le mot « association » n'y apparaît plus, ni dans le texte de présentation ni dans la mention légale. La page Mentions légales le garde.

**L'insertion**
- Chaque carte de parcours porte son lieu : 13 villes en France, Marseille, Marseille.
- L'éligibilité s'ouvre en fenêtre, par trois chemins : un bouton flottant, le bouton du haut et le lien du menu. La page se lit sans le formulaire.

**Contrôles** : les 29 adresses s'ouvrent sans erreur ni lien mort, et aucune règle d'accessibilité n'échoue, à 360 comme à 1440 px.
