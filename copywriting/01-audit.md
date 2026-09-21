# 01 — Audit éditorial (étape 1)

Statut : à valider. Aucun fichier du site n'a été modifié pour ce livrable.

## 0. Ce que j'ai lu, et ce que je n'ai pas eu

| Source | Statut |
|---|---|
| Édito 2025 | Lu via les 2 captures jointes (pp. 2-3). Signé sur la p. 3 : Jérôme Schatzman (président), Armand Hurault (directeur), Marine Vever (directrice adjointe). |
| Deck financeurs (13 p.) | Lu par extraction de texte. Les images et mises en page ne sont pas lues. |
| Deck AAP Égalité des chances (6 p.) | Idem. |
| **Rapport d'activité 2025** | **Non fourni.** Il n'est pas dans le dépôt ni dans Téléchargements. Le commit `6d60396` (16 sept.) lui attribue les chiffres 441 / 83 %, mais je ne peux pas le vérifier. Toutes les colonnes « Rapport » ci-dessous sont donc vides. |
| Site | `data/data.js` lu en entier. Textes en dur des composants relevés par recherche ciblée (Pages, Sections, HomeB, Nav, About). |

Composants apparemment orphelins (non rendus, à confirmer avant de leur consacrer du texte) : `Engagement`, `ImpactCumuleBande`, `ProjetAssociatif`, `InstagramFeed`. Plusieurs blocs de `Sections.jsx` (Academie, Publics, Temoignages) sont dans le même cas.

---

## A. La voix de l'édito : ce qui la rend reconnaissable

**1. Elle ouvre sur un fait daté, pas sur une promesse.** « En 2025, Festin célèbre dix années du programme Des Étoiles et des Femmes. » La conviction arrive après le fait.

**2. Un « nous » qui signe.** « Nous avons aussi célébré », « nous avons réunis », « notre premier projet », « nous faisons le pari de l'ambition ». Le mot « Festin » n'est sujet de phrase que pour les actes, jamais pour les valeurs. Le site fait l'inverse : « Festin construit un écosystème… ».

**3. Rythme : longue phrase de démonstration, puis relance sèche.** Exemple : une phrase de 40 mots sur l'excellence et la solidarité, puis « Mieux : elle en est souvent la condition de réussite. » Les phrases courtes servent à relancer, pas à décorer.

**4. Des verbes qui font quelque chose.** « Cela élève. Cela redonne confiance, structure les parcours, ouvre des perspectives. » Les sujets sont des choses du métier ou des personnes, rarement des concepts.

**5. Chaque conviction est adossée à un fait, dans la même phrase ou la suivante.**
- Les Baumettes, « plus de 12 000 clients », « 119 personnes placées sous main de justice ».
- « Les assiettes sont soignées, les chefs forment les commis à une cuisine bistronomique, quand les équipes en salle se forment au service encadrés par un maître d'hôtel professionnel. »
- « plus de 600 convives sur le Vieux-Port de Marseille début octobre ».

**6. L'exigence est la condition de réussite, pas un supplément.** « Viser haut n'exclut pas : cela élève. » Le site dit la même idée sans le fait (« Viser l'excellence n'est pas un luxe. C'est ce qui rend l'insertion durable »), et l'idée devient un slogan.

**7. Une position assumée, y compris politique.** « Dans un contexte de crise aiguë des financements publics… les associations sont des acteurs structurants… de véritables associés des pouvoirs publics. » Le texte ne cherche pas la neutralité institutionnelle.

**8. Le collectif comme méthode, avec des noms de catégories réelles.** « entreprises, fondations, chefs, restaurateurs, pouvoirs publics, institutions publiques, écosystème associatif ». Une énumération concrète, pas « des partenaires engagés ».

**9. Lexique.** excellence, solidarité, haute gastronomie, réussite, parcours, confiance, durable, à grande échelle, collectif, brigade, assiette, commis, convives. Une image, une seule : « on renverse des montagnes ! » (un point d'exclamation dans tout le texte).

**10. Les tournures de l'édito qui sont devenues les tics du site.** L'édito les utilise une fois. Ce sont elles qu'il faut rationner :
- « n'est pas qu'un slogan. C'est une méthode, une exigence, une responsabilité » (opposition + triplet).
- « Pas ponctuellement. Pas que localement. Mais à grande échelle… » (fragments en série).
- « Plus qu'un événement », « plus que des partenaires ».
- « levier » : 3 occurrences dans l'édito (« levier d'insertion », « un levier », « un levier puissant »). Le site en compte 10 (6 dans `data.js`, 4 dans les composants).

**11. Personnes accompagnées à la 3ᵉ personne, avec des faits.** L'édito ne dit jamais « bénéficiaires ». Il dit « personnes placées sous main de justice », « personnes accompagnées par nos dispositifs ».

---

## B. Le ton actuel du site, et l'écart avec l'édito

**Constat global.** Le site a la structure de l'édito (conviction, ambition) sans ses faits ni son sujet. Les phrases sont plus courtes, les sujets sont abstraits, et les tournures de l'édito y sont recyclées section après section.

### B1. Noms abstraits, sans fait derrière
- « mobilise la cuisine… comme **vecteurs de transformation** et d'insertion sociale » (About, corps de texte, `Pages.jsx` ancien / `About.jsx`).
- « La restauration comme **levier d'insertion, de formation et de transformation** » (sous-titre du hero d'accueil, `data.js:797`).
- « Faire de la cuisine un **levier d'émancipation** » (`ProjetAssociatif`, orphelin).
- « Insertion / Formation / **Transformation** » : les trois piliers de `data.js:42-58`, 3 noms abstraits en titre.

### B2. Constructions en miroir et en compte
- « **Former autrement, certifier vraiment.** » (Académie).
- « **Ne pas former un métier, accompagner** … » (Accompagnement insertion).
- Titres « nombre + nom » : « Trois façons d'avancer ensemble », « Trois leviers pour transformer les pratiques », « Trois convictions, une trajectoire » (×2 : projet associatif et About), « Deux publics, un même engagement », « Deux parcours conçus pour… », « Quatre dispositifs pour… », « 5 parcours, 2 publics », « Cinq projets qui font bouger la restauration », « Découvrez nos cinq projets ». Environ dix titres bâtis sur le même moule.
- « Même » : « Deux portes d'entrée, une même conviction » (`Sections.jsx:79`), « une même exigence pédagogique » (`Pages.jsx:306`), « un même engagement », « un même secteur ».

### B3. Baseline et triptyque usés
- « Le goût d'avancer ensemble » apparaît : baseline de marque (`data.js:5`), ticker (`data.js:39`), titre du hero d'accueil (`data.js:796`), pied de page (« © 2026 Festin — Le goût d'avancer ensemble »), titre H2 de la page About (que j'ai laissé tel quel en refonte), et « avancer collectivement » reprend l'idée dans le témoignage d'Eloi Spinnler.
- « Former, inclure, transformer » : titre du hero About, H2 de `Sections.jsx:32`.

### B4. Opposition « n'est pas X, c'est Y » sans fait
- « Viser l'excellence n'est pas un luxe. C'est ce qui rend l'insertion durable… » (valeurs About).
- « Viser l'excellence ne s'oppose pas à l'inclusion. C'est même souvent sa condition. » (`Sections.jsx:34`) : la même idée, deux fois, à deux endroits.
- « Ne jamais opposer excellence et inclusion » (projet associatif).
- « Ne pas former un métier, accompagner… »

### B5. Posture qui change d'une page à l'autre
| Posture | Où |
|---|---|
| 3ᵉ personne, « Festin » sujet | About hero (« Festin construit depuis lors… »), pages Accompagnement (« Festin accompagne les établissements… ») |
| « on » | Accueil, bloc « Notre façon de faire » (« On accompagne / On forme / On fait bouger »), About (« Ce qu'on est ») |
| « nous » | Valeurs (« Nous avançons avec des chefs… »), Contact (« Notre équipe pédagogique vous répond », « Nous revenons vers vous ») |
| Impératif / vocatif | « Découvrez nos cinq projets », « Trouvez la vôtre », « Parlons de votre projet » |
| Vouvoiement, sans exception | Partout : « votre projet », « vous êtes en parcours d'insertion ». Aucune page ne tutoie. |

### B6. Catégories administratives, y compris dans les textes adressés aux personnes
- « éloignée(s) de l'emploi » : 14 occurrences dans `data.js`, 4 dans les composants.
- Texte adressé directement : la carte « Vous êtes en parcours d'insertion » (`Pages.jsx:87-88`) dit « Femmes éloignées de l'emploi, personnes réfugiées ou primo-arrivantes : nous concevons des parcours… ». Elle nomme la personne par sa catégorie.
- « Publics éloignés de l'emploi » comme **titre** de carte (`data.js:75`).
- « Vous êtes en parcours d'insertion » comme accroche adressée à la personne (bandeau de la page Accompagnement, carte About/Engagement) : une étiquette de dispositif, pas une adresse.
- « publics » : 15 occurrences dans `data.js`, 22 dans les composants.
- « Femmes de quartiers » n'apparaît pas sur le site (bon point).

### B7. Autres tics
- Point médian : « réfugié·es » (`data.js:456`), à remplacer par un doublet.
- Tiret cadratin : 74 lignes de `data.js` en contiennent un, souvent en béquille (« Marseille, Baumettes », « — la pierre fondatrice »).
- Énumérations par trois : « Insertion, formation, transformation », « Régaler, Former, Employer, Transformer » (mega menu), « Fierté, exigence, créativité » (deck).
- Aucun « Et si… ? », « véritable », « incontournable » relevé. Tant mieux.

### B8. Ce qui marche déjà (à protéger)
- La page projet Les Beaux Mets, onglet « La brigade » : « 16 personnes détenues composent 2 brigades, encadrées par le Chef Valentin Majan et son Second Boris Ruel en cuisine, le Maître d'hôtel Marc Balthazard en salle. » C'est le texte le plus proche de l'édito.
- Les témoignages authentiques (Hafida, Idène, Avotra, Pina, Jason, Oumar).
- Le « 155 à 490 h de stage en restaurant » de la page DEF : un chiffre du métier.
- « Un parcours en deux jours pour construire un cadre de travail respectueux » (pros) : concret.

---

## C. Incohérences entre pages

| # | Sujet | Ce qu'on lit | Où |
|---|---|---|---|
| 1 | **Ancienneté de La Table de Cana** | 1992 (About, accueil, Accompagnement) contre **1993** (fiche projet : eyebrow « Depuis 1993 », tagline, description « fondé en 1993 »). L'édito dit aussi 1993. | `data.js:330-343` vs `data.js:807-810` |
| 2 | Nombre d'années figé | « 35 ans » (stats, ticker, eyebrow accueil, titre About) et « plus de 30 ans » (fiche Table de Cana) contre la règle « depuis 1992 ». À signaler : 2026 − 1992 = 34. Les decks disent « près de 40 ans ». | `data.js:30, 37, 343, 795` |
| 3 | Restaure : « mouvement » ou « programme » | Le site dit « programme » (décision de la passe d'audit), mais les URL, les titres de presse, le deck et l'édito disent « Mouvement Restaure ». Le nom du site externe reste `mouvement-restaure.com`. | 11 occurrences de « mouvement » dans `data.js` |
| 4 | Date de naissance de l'Académie | « Depuis 2025 » et « En 2025, l'association structure… » (page Académie) ; deck : « 2025 » ; frise About (ajout de cette session) : « 2026 ». | `Pages.jsx:1457, 1472` |
| 5 | Durée de Tournesol | « 6 mois » (fiche projet, `data.js:493`) contre « 5 mois — 600 h » (catalogue formations, `data.js:656`). | |
| 6 | Lancement de Tournesol | « promotion lancée en 2025 » (`data.js:498`) contre « Lancement de la promotion Tournesol 2026 » (actualité, `Pages.jsx:123`). | |
| 7 | Titre visé | « Titre Professionnel Cuisinier » (accueil) contre « Titre à finalité professionnelle » / « TFP » (catalogue). Le deck écrit « TFP commis de cuisine » pour Tournesol. | |
| 8 | Ordre des piliers | Accueil : Insertion, Formation, Transformation ; mega menu : Régaler, Former, Employer, Transformer ; About : Former, inclure, transformer. Trois ordres et trois listes. | |
| 9 | Résumé d'une même idée | La phrase « l'excellence ne s'oppose pas à l'inclusion » est écrite trois fois, différemment (B4). | |
| 10 | Destinataires du CTA « S'engager » | Accueil (`scroll: engage`) et About (bloc S'engager avec 3 profils) et bouton flottant « Agir maintenant » (5 actions) : trois parcours d'engagement qui ne se recoupent pas. | |
| 11 | Pied de page vs. mentions légales | Le pied de page affiche encore « NDA 93132168513 · Siret 924 202 831 00013 · Organisme certifié Qualiopi » (`data.js:19-20`), alors que le commit `fa2c340` a retiré NDA/Qualiopi (« autre entité ») et que le bloc légal statique et `mentions-legales.html` disent SIRET 379 756 026 00074. | À vérifier hors copywriting : c'est un fait juridique. |
| 12 | « Certifié Qualiopi » | Ticker (`data.js:38`), page Académie, page pros, catalogue : 19 occurrences (data + composants). Même point que le n° 11 : l'entité certifiée est-elle Festin ou Estello ? | |

---

## D. Carte éditoriale actuelle

| Route | Rôle | Cible | Message actuel | CTA principal |
|---|---|---|---|---|
| `#/` Accueil (HomeB) | Orienter | Tous | « Le goût d'avancer ensemble » ; « De la cuisine à l'emploi » ; 5 projets ; témoignages | Découvrir nos projets / S'engager |
| `#/about` Qui sommes-nous | Légitimer, incarner | Partenaires, financeurs, presse | « Former, inclure, transformer » ; 35 ans ; équipe ; valeurs | Contact (bloc S'engager) |
| `#/accompagnement/insertion` | Rassurer, convertir | Personnes en insertion | « Accompagnement à… » ; parcours gratuits | Nous contacter / Candidater |
| `#/accompagnement/professionnels` | Convaincre | Restaurateurs | « Travailler autrement, avec les restaurateurs » ; 3 leviers | Échanger avec notre équipe |
| `#/formations` + `#/formations/:id` | Vendre le catalogue | Pros + insertion | « Cinq parcours, deux publics » | Demander un devis / catalogue PDF |
| `#/projets/:id` (×5) | Détailler un dispositif | Mixte | Fiche : chiffres, témoignage, « vous êtes restaurateur ? » | Un CTA par projet (site externe, contact, don) |
| `#/academie` | Présenter l'organisme de formation | Pros + insertion | « Former autrement, certifier vraiment » | Voir formations / parcours |
| `#/impact` | Prouver | Financeurs | « Depuis 1992, ce que nous avons transformé » ; budget ; rapports | Télécharger les rapports |
| `#/actualites` | Presse et médias | Presse, tous | Retombées par dispositif | Liens externes |
| `#/contact` | Convertir | Tous | « Parlons de votre projet » | Envoyer le message |
| `#/restaurants/sadi-carnot` | Teaser d'un lieu futur | Tous | « Prochainement » | Nous contacter |
| Mega menu, bouton « Agir maintenant », pied de page | Transversal | Tous | 5 actions dont don et réservation | — |

**Trous que je vois.**
- Aucune page pour les **partenaires et financeurs** : mécénat et partenariat vivent dans Contact, dans le bouton flottant et dans Impact. C'est pourtant la cible de la voix de l'édito.
- Le **parcours restaurateur → partenaire** est éclaté entre `accompagnement/professionnels`, Restaure et les CTA de chaque fiche.
- **Marseille** est partout dans les faits mais jamais dans la promesse.

---

## E. Divergences de chiffres et de faits entre sources

Règle : je ne tranche pas. « — » = donnée absente de la source. La colonne « Rapport d'activité 2025 » est vide parce que le document ne m'a pas été fourni.

| Donnée | Édito | Deck financeurs | Deck AAP | Site (valeur, où) | Rapport 2025 |
|---|---|---|---|---|---|
| Personnes accompagnées en 2025 (ensemble de l'écosystème) | — | **457** (p. 3) | « + de 450 chaque année » | **441** : `data.js:27`, About, Accompagnement insertion, Impact, actualité (`Pages.jsx:1256`) | non vérifié (attendu : source du 441) |
| Sorties en emploi ou formation | — | **72 %** (p. 3) | — | **83 %** : mêmes endroits | non vérifié |
| Réussite au diplôme (DEF) | — | **96 %** « au CAP cuisine » (p. 3, p. 6) | — | **91 %** « de réussite aux diplômes » : `data.js:97`, 211, 855 | non vérifié |
| Sorties en emploi durable (DEF) | — | **71 %** (p. 6) | — | absent | non vérifié |
| Femmes accompagnées par DEF en 2025 | — | **328** (p. 6) | — | **336** : `data.js:96` | non vérifié |
| Grand Festin : convives | « **plus de 600** » | — | — | **550** : `data.js:100, 239, 242` | non vérifié (le brief parle de 550 dans le rapport) |
| Grand Festin : brigades, bénévoles | — | — | — | 13 brigades, 100 bénévoles | non vérifié |
| Table de Cana : sorties dynamiques 2025 | — | **88 %** (p. 5) | — | **89 %** : `data.js:339, 388` | non vérifié |
| Table de Cana : salariés en insertion 2025 | — | 45 | — | 45 (concordant) | non vérifié |
| Table de Cana : heures de formation, repas d'aide alimentaire | — | 2 780 h ; « près de 18 500 repas » | — | absents | non vérifié |
| Table de Cana : année de fondation | **1993** | 1992 (frise, p. 4) | — | 1992 (About, accueil) et 1993 (fiche) | non vérifié |
| Beaux Mets : clients / convives | « plus de 12 000 clients » | — | — | 12 000+ convives (concordant) | non vérifié |
| Beaux Mets : personnes employées depuis l'ouverture | **119** | — | — | 119 (concordant) | non vérifié |
| Beaux Mets : personnes accompagnées en 2025 | — | 48 ; 38 nouvelles entrées | — | 48 (concordant) | non vérifié |
| Beaux Mets : sorties dynamiques | — | — | — | 86 % : `data.js:270, 856` | non vérifié |
| Beaux Mets : chiffre d'affaires | — | +25 % | — | +25 % (concordant) | non vérifié |
| Restaure : structures, signataires, groupes de travail | — | 4 pilotage, 35, 700, 5 | — | 35, 700, 5 (concordant) | non vérifié |
| Restaure : nom | « Le Mouvement Restaure » | « Mouvement Restaure » | « Le mouvement Restaure » | « programme Restaure » | — |
| Territoires | — | 14 | — | 14 (concordant) | non vérifié |
| Chefs gastronomiques impliqués | — | **11** (p. 3) ; réseau de 12+ chefs nommés (p. 11) | « plus de 200 chefs et restaurateurs » | absent | non vérifié |
| Ancienneté de l'association | — | « depuis 40 ans » (p. 2) | « depuis près de 40 ans » | « 35 ans » et « depuis 1992 » | — |
| Tournesol : durée | — | — | — | 6 mois (projet) contre 5 mois (catalogue) | non vérifié |
| Académie Festin : naissance | — | 2025 (p. 4, p. 9) | — | 2025 (page Académie), 2026 (frise About) | — |

Exclusions du brief que je respecte (aucune donnée transposée) : slide « Structuration juridique » (p. 13), « Besoins d'investissement 1 000 000 € » (p. 10), « lieu vitrine 2026/27 » (p. 10), « Groupe Festin », « activité économique pérenne », « femmes de quartiers », « CAP vers l'Emploi ». Les données de ces slides ne sont pas dans le tableau.

Trois points qui ne sont pas du copywriting mais qui touchent la crédibilité : n° 11 et 12 du paragraphe C, et ESUS ci-dessous.

---

## F. Règles Festin : état du site aujourd'hui

| Règle | État | Preuve |
|---|---|---|
| « Des Étoiles et des Femmes » jamais abrégé | **Enfreinte** | « Étoiles & Femmes — TFP / CAP » (`data.js:76`), « Étoiles et Femmes » (rôle de Karima Hellou, About), « DEF » dans les noms de fichiers uniquement (OK). |
| « Écosystème Festin », jamais « Groupe Festin » | Respectée | 0 occurrence de « Groupe Festin ». Le mot « écosystème » est utilisé. |
| « depuis 1992 », jamais un nombre d'années figé | **Enfreinte** | « 35 ans » ×4, « plus de 30 ans » ×1, « 10 ans » ×9 (DEF, Beaux Mets, impact). Le « 35 ans » de la page About a été validé par vous pendant la refonte : la tension avec cette règle est à arbitrer. |
| Non-lucrativité lisible dès l'accueil, dans le texte | **Non respectée** | L'eyebrow du hero d'accueil dit « 35 ans d'innovation sociale par la cuisine ». La mention « association loi 1901 à but non lucratif et d'intérêt général » n'est que dans le pied de page et le bloc légal (le rapport d'audit d'origine le documente). |
| ESUS à chaque mention d'une filiale | **Non traitée** | 0 occurrence d'« ESUS ». Estello Formation est citée (page Académie, Tournesol, équipe). Je ne sais pas si Estello est agréée ESUS : je ne l'affirme pas. |
| Aucun vocabulaire lucratif sur une page grand public | Partiellement | « offre » ×6, « client » ×5, « prestations traiteur », « Demander un devis » ×2 (`Pages.jsx:402`, `data.js:373`), prix HT affichés dans le catalogue. Le catalogue de formation est un cas à part (activité commerciale légitime, arbitré lors du précédent audit). |
| Chaque projet rattaché à Festin sur sa page | À vérifier | Les fiches projet sont sous `#/projets/…` mais le titre visible est « Formation Tournesol », « Le programme Restaure » sans mention « Festin » dans le titre. Je n'ai pas contrôlé la présence du rattachement dans chaque page. |
| Page restaurateurs : partenariat, jamais offre de services | Respectée à moitié | Pas de « devis » ni de « solution » sur `accompagnement/professionnels`. Mais « Catalogue de formations », « Inter ou intra… certifiés Qualiopi. Prise en charge OPCO possible » et les tarifs HT du catalogue sont un langage d'offre. |
| Projets non acquis jamais au présent | Respectée avec réserves | « CAP vers l'Emploi » : absent du site. Sadi Carnot : marqué « Prochainement » / « Bientôt » / « en cours de développement », mais la fiche Restaure parle de « l'ouverture du lieu Sadi Carnot » (`data.js:477`). Le lieu près du Vieux-Port des decks n'est pas sur le site. |

---

## G. Ce que j'ajoute pour la suite

- Le bloc **S'engager** de la page About (refonte de cette session) réutilise les 3 profils du composant `Engagement` : leur texte fait partie du chantier.
- Les titres majuscules que j'ai écrits en refonte reprennent des formules du site (« Le goût d'avancer ensemble », « Trois convictions qui guident nos choix », « S'engager à nos côtés », « 35 ans à transformer le secteur par la cuisine »). Ils passent par l'étape 5 comme les autres.
- Signataire absent du site : **Jérôme Schatzman, président**, est signataire de l'édito mais ne figure ni dans la page équipe ni ailleurs sur le site.
