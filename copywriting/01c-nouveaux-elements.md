# 01 ter — Nouveaux éléments utilisables sur le site

Inventaire de ce que le zip Claude Design ajoute par rapport au dépôt. Sont exclus : les documents de canaux hors site (newsletters, mailings, emails, slides AG, CODIR, partenaires) et les composants de l'ancien design system.

Emplacement : tout est dans `ressources/`. Aucun fichier du site n'a été modifié. **Réserve** : le zip d'origine n'est plus dans `ressources/` (je ne l'ai pas supprimé : ma commande n'a effacé que l'extraction). Ce qui n'a pas été copié est donc introuvable de mon côté.

## 1. Assets visuels

### 1.1 Typographie : le vrai gain
`ressources/charte/typos/` contient la famille KoHo **complète, italiques comprises** : ExtraLight, Light, Regular, Medium, SemiBold, Bold, et leurs italiques (12 fichiers) + `festin-display.ttf` (Medium).
Le site n'embarque aujourd'hui que Light, Regular, Bold et Medium, et va chercher **les italiques sur Google Fonts** (`@import` dans `_tokens.css`). Or le contraste capitales grasses / italique léger est le cœur de la charte des titres.
**Ce qu'on peut faire** : déclarer `KoHo-LightItalic`, `KoHo-Italic`, `KoHo-BoldItalic` en `@font-face` local. Le site ne dépend plus d'un service externe et l'italique est garanti hors ligne. Changement de CSS, à faire hors du chantier copywriting.

### 1.2 Portraits
| Fichier | Taille | Constat |
|---|---|---|
| `photos/equipe-et-gouvernance/bm-majan, bm-lafon, bm-ruel` | 240 × 240 | Portraits d'équipe des Beaux Mets, recadrés en médaillon rond sur fond bleu marine (issus d'une slide). |
| `ca-schatzman, ca-hermitte, ca-carmantran, ca-corcelli` | 240 × 240 | Portraits de membres du conseil d'administration, même traitement. |
| `directeurs-portrait.jpg`, `signature-portrait.jpg` | 1 080 × 1 350 | Photo de deux hommes debout dans un espace de travail, devant deux documents ouverts. **Identités à confirmer** : je ne les nomme pas d'après le nom du fichier. |
| `sources-hd-non-compressees/101_1201, 1211, 1212, 1214.png` | jusqu'à 5 184 × 3 888 | Originaux haute définition de séances photo (dont la photo ci-dessus, en 3 888 × 5 184). |

**Verdict.** Les 240 × 240 sont **trop petits** pour les cartes de l'équipe (260 px de large, donc 520 px à écran retina) et portent un cadre rond et un fond baked-in incompatibles avec un portrait vertical 3:4. Ils servent de repérage, pas de publication. Pour les 13 personnes de l'équipe, il faut toujours des originaux. Les cadres `[XX]` restent la règle tant que ce n'est pas fourni.

### 1.3 Photos nouvelles
`photos/refugee-food-festival-2026/` : 2 photos du Refugee Food Festival Lille 2026 (restaurant L'Annexe, crédit « @monsieurhuman », 1 638 × 2 048) et 2 du festival de Lyon (crédit **Agathe Waechter**, jusqu'à 7 008 × 4 672). Utilisables pour Tournesol, Restaure ou Des Étoiles et des Femmes (le restaurant L'Annexe est celui de Hafida). **Crédits et droits à confirmer avant publication.**
`photos/a-classer/` : 7 fichiers non identifiés (dont `IMG_3583.jpeg`, 4 032 × 3 024) à regarder avec toi.

**Ce qui n'est pas nouveau.** Les 156 images identiques au dépôt (photos, totems, logos partenaires) et les photos « Restructuration », « dossier » et « export », qui sont des versions compressées des mêmes images : le site a déjà les originaux en 5 000 px et plus.

### 1.4 Logos
`ressources/charte/logos/` (21 fichiers + 6 partenaires) :
- Festin : versions teal, blanche, crème, mot seul (« festin » manuscrit) en teal, blanc et crème.
- Projets : Des Étoiles et des Femmes, Les Beaux Mets, La Table de Cana, Restaure, Tournesol, Académie Festin.
- Institutions : France Travail, Qualiopi, UMIH, Adequat, La Source, Yes We Camp.
**Nouveaux par rapport au site** : les versions crème du logo, le mot seul, et France Travail, Adequat, UMIH, Yes We Camp. Ils permettraient un bandeau « partenaires institutionnels » plus complet que les 5 logos actuels. **La liste des partenaires et leurs mentions exactes doivent être validées par Iris** (règle du kit : toute mention d'un partenaire est validée avant publication).

### 1.5 Explorations de design
`ressources/design/` : « Home interactive », « Home Festin, 3 directions », 3 maquettes de navigation, « Page 04, le projet », « Page d'attente ». Ce sont des explorations du site : à relire seulement si tu veux reprendre une idée.

## 2. Faits et citations sourcés, nouveaux pour le site

Sources : rapport d'activité (version 441 / 83 %), sauf mention.

### Les Beaux Mets
- 16 stages à l'extérieur ; 3 Cafés Emploi organisés en prison avec des entreprises ; lancement de **biscuits à emporter** (navettes et croquants) fabriqués par la brigade ; participation « hors les murs » (Street Food Festival, KoussKouss Festival, Grand Festin, Climat Libé Tour) ; **six masterclass** avec des chefs (les noms sont en lettres éparpillées dans le PDF : Laëtitia Visse, Éloi Spinnler, Elsa Leblanc, Chloé Charles, Justine Audoin, Hyacinthe Lescoët, à vérifier sur le PDF).
- **Citation de Valentin Majan** (p. 19) : « Ce n'est pas tous les jours évident. On doit apprendre à mélanger les temps de mise en place et d'accompagnement social. Même si ça fait perdre du temps de production, ça rend notre travail plus humain. » C'est la phrase la plus proche de la voix de l'édito : un fait précis, un arbitrage de métier. **À proposer comme témoignage** (statut : à faire valider par lui).
- Équipe : Camille Lafon prend la direction du restaurant (p. 19).

### La Table de Cana
- Plus de **15 000 repas d'aide alimentaire** pour les personnes hébergées en hôtel d'urgence à Marseille ; **Les Tutos du Chef** (vidéos de formation) ; **Les Vendredis de l'emploi** ; **collectif EPICES** ; deuxième **Club des Talents** ; labels LUCIE Progress (848 / 1 000) et Empl'itude ; nouveaux partenaires MediaPerformances (aide alimentaire) et Culture du Cœur. Le site a une partie de cela (LUCIE, Club des Talents, EPICES) mais pas l'aide alimentaire ni les Vendredis de l'emploi.

### Des Étoiles et des Femmes
- **Grand Festin du 3 octobre 2025** : 13 villes, 13 brigades d'alumnis, de chefs engagés et de chefs marseillais, exposition photo en plein air, grandes tablées, 550 convives, plus de 100 bénévoles.
- Partenariat avec le **Greta** (Région Sud) : Festin sous-traitant d'une partie des heures de formation ; formation Prévention des violences sexistes et sexuelles ; travaux avec **France Travail** (POEI). Programme partenaire d'Accor depuis 2015 (Présentation TFP).
- **Prochaines promotions** : Des Étoiles et des Femmes du 9 novembre 2026 au 13 avril 2027 ; Tournesol du 30 novembre 2026 au 22 avril 2027 (Présentation TFP). Utiles pour la page « candidater ».
- Charte du réseau : phrase de présentation prioritaire du réseau (« met l'excellence de la gastronomie au service de l'insertion des femmes éloignées de l'emploi », 13 villes). Source de vocabulaire, pas de texte à reprendre tel quel.

### Restaure
- Gouvernance à quatre structures (Yes We Camp, Les Petites Cantines, La Communauté Ecotable, Festin) ; **5 groupes de travail nommés** (actions transformatrices, événements fédérateurs, contre les violences en cuisine avec La Source et Éloi Spinnler, plaidoyer, formations) ; formation « Management juste » lancée ; tables rondes en podcast.

### Tournesol : le Bilan de la promotion 2025-2026 (Marseille)
- Formation du **27 novembre 2025 au 12 mai 2026** au centre Corot Formation : « **cinq mois et demi** ». 14 entrées, 12 ont suivi la formation en totalité, 11 présentés au **TFP** (9 l'ont obtenu en totalité, 2 partiellement), **11 sur 11 au DCL** (diplôme de compétence en langue). 150 heures de stage. **Sorties positives : 50 %** à un mois (bilan provisoire, à 3 mois de suivi). Le bilan est explicite : « **Titre à finalité professionnelle** », pas « titre professionnel ».
- La Présentation TFP annonce « **86 % d'insertion globale** pour la promotion marseillaise un an après » : deux chiffres différents (50 % à un mois, 86 % à un an) sur deux promotions ou deux délais. **À sourcer avant publication.**
- Le bilan parle de la « **septième promotion** » : Tournesol préexiste à 2025. La formulation « lancée en 2025 » du site est à préciser (lancement de l'édition portée par Festin ?).

### Pour la page restaurateurs (partenariat)
- **POEI** (préparation opérationnelle à l'emploi individuelle) financée par France Travail : des candidats présentés dès septembre 2026, journées d'immersion, stages de 2 semaines en janvier 2027 et 3 semaines en mars 2027, puis prise de poste en CDD de 4 mois minimum à partir d'avril 2027. C'est **un parcours concret que le site n'a pas** ; la formulation « recrutez vos talents de demain » du document est celle d'une offre, à réécrire en partenariat.
- Communauté de restaurateurs : les « Toast » (apéros inspirants entre pairs) figurent dans l'Offre restaurateurs. **Ancien document, vocabulaire à écarter**, mais le fait existe.

### Financement (page Impact)
- Budget total 2025 : **1,7 M€**. Mécénat privé 54 %, subventions publiques 17,6 %, aides aux postes 15,9 %, chiffre d'affaires 12,5 % (le site a déjà cette synthèse).

## 3. Documents à publier ou à mettre à disposition
- **Rapport d'activité 2025**, version 441 / 83 %, pour la page Impact (« Tous nos rapports »). À vérifier : la page actuelle en propose-t-elle le téléchargement ?
- **Kit de communication** : document interne, il précise lui-même qu'il est repris par des tiers. Sa publication n'est pas prévue au site ; à trancher avec Iris.

## 4. Ce que je n'ai pas gardé, et pourquoi
Newsletters UMIH, mailings Book de l'emploi et France Travail, slides AG, CODIR et Partenaires TFP, capture d'écrans de session (35 fichiers), ui_kits et anciennes copies du site, exports Canva, Framer, dossier « scratch » : ils ne servent pas le site, et les anciens composants sont remplacés par ceux du dépôt.
