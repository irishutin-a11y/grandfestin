# 07 — Contre-audit : ai-je appliqué mes propres règles ?

Étape 1 de la reprise en direct-response (23 septembre 2026). Aucun fichier du site modifié.

**Méthode.** J'ai relu `01-audit.md`, `01b`, `02-questions.md`, `02-reponses.md`, `03-pistes.md`, `05-plus-values.md` et `06-journal-des-changements.md`. Puis j'ai extrait le **texte réellement affiché** des 16 routes du site (aperçu local, état du commit `650a170`), pied de page et méga-menu compris. Chaque citation ci-dessous est copiée de l'écran, pas du code.

---

## 1. Verdict

1. **Le premier audit était juste sur le diagnostic, et l'implémentation l'a trahi.** Les tics interdits en titre sont revenus sous une autre forme : paires en miroir, fragments en série, « même ».
2. **L'erreur principale est la mienne, et elle date d'avant l'écriture.** Dans `03-pistes.md` j'ai recommandé la piste 2 « Le terrain », et écrit de la piste 1 : « Répétée de page en page, la conviction en tête est exactement ce qui a usé le site. » Puis, dans `02-questions.md`, j'ai mis l'étoile de recommandation sur… la piste 1 partout. Vous avez suivi ma recommandation. Le site a été écrit dans la voix que j'avais moi-même jugée à risque.
3. **J'ai confondu « phrases courtes » et « phrases efficaces ».** Pour éviter les phrases longues, j'ai haché le texte en fragments nominaux (« Un diplôme. Des stages. Un accompagnement social complet. »). C'est précisément la cadence que l'on reconnaît comme écrite par une IA.
4. **Le premier audit était un audit de style, pas un audit de conversion.** Il chassait des mots. Il ne demandait jamais : qui lit cette page, que veut-il, quelle preuve le convainc, quel bouton il clique. Les trois cibles que vous nommez (restaurateurs, partenaires institutionnels, acteurs de l'insertion) n'ont pas de parcours clair.
5. **Des faits tranchés ne sont pas appliqués**, et une dizaine d'incohérences visibles subsistent (section 4).

---

## 2. Les règles du premier audit, une par une

| Règle (source) | État | Preuve à l'écran |
|---|---|---|
| Une phrase de l'édito ne doit pas devenir slogan (`01-audit` A6) | **Raté** | « Viser haut n'exclut pas : cela élève » ouvre l'intro de l'accueil, revient dans les valeurs d'About, et une 3ᵉ fois dans le mot du directeur, sur la même page. |
| Titres sans miroir ni « nombre + nom » (B2) | **Raté** | « Un programme national, une exigence partagée » · « 13 antennes, une même exigence » · « Deux voyages, une rencontre » · « Cinq groupes de travail, quatre structures au pilotage » · « Cinq tables rondes, deux millions de vues » · « Une brigade en cuisine, une vraie ». |
| « Même » à proscrire (B2) | **Raté** | « 13 antennes, une même exigence » (Des Étoiles et des Femmes). |
| Fragments en série : une fois par page au plus (charte) | **Raté** | Accueil : « Un restaurant en prison. Un traiteur d'insertion. Deux parcours diplômants. Un programme national. » Des Étoiles et des Femmes : « Un diplôme. Des stages dans des restaurants gastronomiques. Un accompagnement social complet. » (3 fois sur le site). Grand Festin : « Alumnis, chefs engagés, chefs marseillais. Une exposition en plein air. Des grandes tablées. » Restaure : « Prévenir les violences. Promouvoir un management juste. » |
| Triplet en infinitif : une seule fois, sur About (A3) | **Raté** | Il est sur About (« Former, inclure, transformer »), mais aussi sur l'accueil (Accompagner / Former / Transformer), dans le méga-menu (Régaler / Former / Employer / Transformer), et en version « nous » dans le pied de page et le hero d'About : « Nous formons… Nous accompagnons… Nous changeons les pratiques du secteur. » |
| « Éloignées de l'emploi » hors textes adressés (B6) | **Raté** | Deux fois dans la voix du site : fiche Des Étoiles et des Femmes (« femmes éloignées de l'emploi ») et La Table de Cana (« personnes éloignées de l'emploi »). Une fois dans le mot du directeur. |
| « Des Étoiles et des Femmes » jamais abrégé (F) | **Raté, et déjà signalé au premier audit** | Formulaire de contact : « Étoiles & Femmes — TFP », « Étoiles & Femmes — CAP ». Même liste : « Tournesol — Réfugiés », qui nomme les personnes par leur statut. |
| Pas de vocabulaire d'offre hors catalogue (A5) | **Raté** | Fiche La Table de Cana : « Demander un devis », « prestations traiteur », « c'est allier gastronomie et impact social ». Page restaurateurs : tarifs HT affichés en clair. Académie et texte presse : « l'offre de formation ». Fiche Les Beaux Mets : « +25 % de chiffre d'affaires » en chiffre clé. |
| « Plus de trente ans » à remplacer (fait tranché) | **Raté** | La Table de Cana : « depuis plus de 30 ans », deux fois, juste à côté de « depuis 1993 ». |
| Chiffres sourcés et datés, taux avec périmètre | **Partiel** | Sans date : « 400 000+ convives régalés », « ≈ 500 prestations traiteur », « 86 % de sorties dynamiques » (accueil), « 2 M+ de vues ». Sans source : « 200 000 postes restent à pourvoir en France ». Sur l'accueil, deux « 86 % » côte à côte ne mesurent pas la même chose (Les Beaux Mets, Tournesol). |
| « Nous » de l'association, pas « on » (décision 1) | **Partiel** | About : « Ce qu'on est ». Des Étoiles et des Femmes : « On y apprend le métier en brigade ». |
| Baseline : home, pied de page, ticker (A2) | Respecté | Mais deux fois dans le même pied de page. |
| « Levier », « vecteur », « Et si » | Respecté dans la voix du site | « Levier » ×3 subsiste dans le mot du directeur (voir 4.5). |
| Vouvoiement, projets non acquis au futur | Respecté | Sadi Carnot reste au futur. |

**Ce que le journal du 21 septembre affirmait et qui est faux** : « Retirés : levier, éloignées de l'emploi dans les textes adressés, 35 ans… ». Les deux premiers n'ont pas été retirés partout. Je n'ai pas vérifié à l'écran avant d'écrire ce journal : c'est une faute de méthode.

---

## 3. Le « ton IA » : ce qui trahit le texte

### 3.1 Les paires et les formules
« Des parcours, des voix » (titre repris **à l'identique sur trois fiches projet**) · « Des parcours, des visages » · « Coacher, filmer, mettre en réseau » · « Un parcours diplômant, pas à pas » · « Une passerelle vers l'emploi » · « Un accompagnement sur mesure ».

### 3.2 Le jargon et les abstractions
- Méga-menu : « la gastronomie inclusive qui se déguste ». Titre de l'onglet du navigateur : « Insertion, formation et gastronomie inclusive ».
- La Table de Cana : « Révélateur de talents », « Pourvoyeur de talents », « transformer le « vouloir » en « pouvoir » ».
- Restaure (le bloc le plus atteint) : « favorisant la diversité, l'horizontalité et une meilleure représentativité à tous les niveaux », « Onboarding inclusif », « Pratiques RH confortables pour toutes et tous », « Positionner les restaurants comme acteurs moteurs de la durabilité », « des apéros inspirants… repartent avec l'envie d'agir ».
- Académie : « Co-construit avec le terrain : chaque formation est conçue avec des acteurs du secteur » (aucun acteur nommé).
- Les Beaux Mets : « La troisième année, en 2025, est riche. »
- Restaurateurs : « Des stagiaires formées à votre carte » (image obscure pour le lecteur visé).
- Verbes de rapport vides : « la gouvernance se consolide », « une formation voit le jour ».

### 3.3 La répétition mécanique
| Formule | Occurrences à l'écran |
|---|---|
| « forme des femmes aux métiers de la cuisine » | 6 (dont 2 sur la même fiche) |
| « accompagnement / suivi social complet » | 6 |
| « autrement » (recruter, manager, former autrement) | 9 |
| « engagé(e)s » | 12, dont 5 sur la fiche Restaure |
| « tous rattachés à Festin » | 4 |
| « Imaginée par Refugee Food et portée par Festin » | 3 |

### 3.4 Les faux chiffres clés
Des cases de chiffres remplies avec autre chose que des résultats : Tournesol « 0 € — Gratuite et rémunérée », « 100 % — accompagnement inclus », « TFP — Commis de cuisine » ; Des Étoiles et des Femmes « 100 % des parcours avec accompagnement social » ; La Table de Cana « 3 outils lancés ou renforcés » ; « 5 projets, tous rattachés à Festin » comme chiffre sur les pages Insertion et Impact ; « 1987, l'année de création » dans le bloc « L'impact 2025 » (et animé par un compteur, de 0 à 1987).

### 3.5 Titres et surtitres qui se répètent ou se contredisent
« Ce que Festin construit avec les restaurateurs » / « Ce que nous construisons ensemble » · « Parlons de votre projet » deux fois en tête de la page Contact · surtitre « Nos partenaires » au-dessus de « Organiser un événement engagé » et de « Orienter une personne » · surtitre « Les chiffres » au-dessus d'un titre qui n'en contient pas.

---

## 4. Faits : ce qui abîme la confiance

| # | Problème | Où |
|---|---|---|
| 4.1 | **Grand Festin** : « 13 brigades » et « 550 convives » dans le texte, « 14 brigades » et « 600+ » dans les chiffres du même bloc. Fait tranché : plus de 600, 14 brigades. | Fiche Des Étoiles et des Femmes (bloc Grand Festin et description) |
| 4.2 | **La Table de Cana** : « 89 % de sorties dynamiques en 2025 » (×3). Fait tranché : 84 % de sorties positives, 2024. | Fiche, carte accueil, page Insertion |
| 4.3 | **Calendrier Des Étoiles et des Femmes** : « Recrutement chaque année en mai » contre « Septembre : recrutement » ; « Décembre : début de la formation » contre une session qui démarre le 9 novembre 2026. | Fiche projet contre page Insertion |
| 4.4 | **1987 sans explication** : « L'insertion par la cuisine depuis 1987 », puis une frise qui commence en 1993. Le lecteur se demande ce qui s'est passé pendant six ans. | Accueil, About |
| 4.5 | **Le mot du directeur** : l'édito du rapport était signé par trois personnes (président, directeur, directrice adjointe). Le site l'attribue au seul Armand Hurault, « Directeur de l'association » alors qu'il est « Directeur général » partout ailleurs. Le 2ᵉ paragraphe (« Les associations sont des acteurs structurants de notre modèle social ») est le discours sur le financement public que votre décision n° 3 écartait du site. | About |
| 4.6 | **Tournesol** : trois organismes cités sans explication de leur rôle (Estello Formation, AFC Groupe, centre Corot Formation). | Fiche Tournesol |
| 4.7 | **Académie** : « Diplômes et titres professionnels reconnus par l'État ». Le parcours court prépare un *titre à finalité professionnelle*, pas un titre professionnel. Formulation à vérifier avant publication. | Académie |
| 4.8 | **Contact presse** : `partenariat@grandfestin.com` en haut de la page Actualités, `contact@grandfestin.com` dans la section Presse, plus bas sur la même page. | Actualités |
| 4.9 | **Lien cassé côté don** : sur Les Beaux Mets, « Faire un don » mène au formulaire de contact, pas à HelloAsso (qui fonctionne sur Des Étoiles et des Femmes). | Fiche Les Beaux Mets |
| 4.10 | **Coquilles** : « Empli'tude » (Impact) contre « Empl'itude » ; « Eloi » contre « Éloi » ; « 17.6 % » au lieu de « 17,6 % » ; « (2025) » répété après « en 2025 » dans les chiffres presse. | Impact, Restaure, Actualités |
| 4.11 | **Espaces réservés visibles** : quatre cases « LOGO PARTENAIRE » (Les Beaux Mets), « [AJOUTER TÉMOIGNAGE] », « [Entreprise partenaire] », « [Financeur ou mécène] » dans le carrousel de l'accueil. | |
| 4.12 | **Date qui va périmer** : page restaurateurs, « Dès septembre 2026 : des candidats présentés ». Nous sommes le 23 septembre et le site n'a pas de date de sortie. | Page restaurateurs |

---

## 5. Ce que le premier audit n'avait pas regardé : les parcours et les appels à l'action

**L'accueil ne dit pas à qui il parle.** Le hero propose « Découvrir nos projets » (de la navigation, pas une action) et « S'engager » (qui ? pour faire quoi ?). Aucun des trois publics que vous visez n'y trouve sa porte. Le bouton « Explorer tout l'écosystème » mène… à la seule fiche Des Étoiles et des Femmes.

**Les acteurs de l'insertion n'ont aucun parcours.** Conseillers France Travail, CIP, associations qui orientent : ils ne trouvent qu'une ligne, sur la fiche Tournesol (« Orienter une personne »). Rien pour orienter une femme vers Des Étoiles et des Femmes, rien sur les critères d'entrée en un coup d'œil, rien sur le calendrier de recrutement fiable (voir 4.3).

**Les partenaires institutionnels et les mécènes n'ont pas de page.** Tout finit sur un formulaire générique dont les motifs se recoupent (« S'engager », « Être partenaire », « Financeur »).

**La page restaurateurs enterre son meilleur argument.** Une POEI financée par France Travail, des candidats présentés, un CDD à la clé : c'est concret, et c'est au milieu de la page, après trois cartes génériques. Aucune preuve venue d'un restaurateur sur cette page (le témoignage du chef Davin est sur l'accueil et chez Les Beaux Mets). Le bouton final pose deux demandes à la fois : « Échanger avec notre équipe, ou demander le Book de l'emploi ».

**Des boutons mal aiguillés** : sur About, « Vous cherchez un métier » ne mène qu'à Des Étoiles et des Femmes (les hommes et Tournesol en sont exclus) ; « Vous êtes restaurateur » mène au catalogue, pas à la page restaurateurs.

---

## 6. Ce qui marche : à garder tel quel

- Les verbatims de la fiche Restaure (« Les assiettes qui volent au-dessus de nos têtes. », « Soit tu te tais, soit tu dégages. ») : c'est le texte le plus fort du site.
- La brigade des Beaux Mets : « 16 personnes détenues composent 2 brigades, encadrées par le Chef Valentin Majan… » et la citation du chef (« ça fait perdre du temps de production, ça rend notre travail plus humain »).
- Le bilan Tournesol (14 entrées, 12 jusqu'au bout, 9 sur 11, 11 sur 11) : des chiffres qui ne cherchent pas à impressionner, donc crédibles.
- Le parcours POEI en trois étapes datées.
- Les témoignages de Hafida, Jason, Oumar, et la phrase du chef Davin : la meilleure preuve pour un restaurateur.
- La liste des 13 antennes avec leur structure porteuse.

---

## 7. Ce que je change dans ma méthode pour la réécriture

1. **Une page = un lecteur principal, une promesse, une action.** Je fixe ces trois éléments avant d'écrire une ligne.
2. **La piste 2 « Le terrain » comme voix unique.** Plus de phrase de conviction en ouverture. La conviction se déduit des faits.
3. **Des phrases complètes, avec un sujet et un verbe.** Courtes, oui, mais pas de liste de groupes nominaux à la place d'une phrase.
4. **Une case chiffre n'accueille qu'un résultat mesuré, daté, sourcé.** Le reste va dans le texte.
5. **Chaque formule n'apparaît qu'une fois sur le site.** Je tiens un registre des formules déjà utilisées.
6. **Vérification à l'écran, pas dans le code**, avant d'écrire le moindre journal.

Le direct-response a une limite ici : ses leviers classiques (urgence, rareté, superlatifs, « offre ») sont interdits par la charte Festin, et à raison. Je garde sa discipline (clarté, bénéfice, preuve, un appel à l'action par section), pas ses tics.

## 8. Avant l'étape 2 : trois questions

1. **Faut-il une entrée dédiée aux prescripteurs** (acteurs de l'insertion) et une aux partenaires institutionnels ? Si oui : une section dans une page existante (règle actuelle du chantier) ou une page ?
2. **Le mot du directeur** : on garde un extrait fidèle signé des trois signataires, on le réduit au premier paragraphe, ou on le retire ?
3. **La Table de Cana** est un traiteur qui vend des repas. Pour son appel à l'action, « Demander un devis » est-il acceptable sur sa fiche, ou faut-il une formule sans vocabulaire commercial (« Organiser un repas avec La Table de Cana ») ?
