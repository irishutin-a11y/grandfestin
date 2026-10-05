# Audit par cible, avant finition (05/10/2026)

État audité : `main` = `maquette-pros` au commit `15c7bc5`, servi en local (port 4500). Aucun fichier du site modifié. Production : ce rapport et les captures `captures/<page>-360.jpg` et `captures/<page>-1440.jpg` (18 pages ; les anciennes captures du même nom sont remplacées).
Mesures par le DOM (Playwright) : tailles rendues, mots, liens, débordements à 360, 768, 1024, 1440 et 1920 px, axe-core WCAG 2.1 AA à 360 et 1440 px, poids des images.

---

## 1. Ce qui existe déjà

1. `RAPPORT-AUDIT.md` (16/09) : 7 règles Festin, code mort, débordement mobile, ESUS absent.
2. `AUDIT-DESIGN.md` (22/09) : 10 améliorations (accueil épinglé, échelle, gabarit projet, images de 57 Mo, navigation).
3. `copywriting/01-audit.md`, `01b`, `01c` (21-23/09) : audit de style.
4. `copywriting/07-contre-audit.md` (23/09) : texte affiché, 12 erreurs de faits, parcours absents.
5. `AUDIT-DEPLOIEMENT.md` + `RAPPORT-DEPLOIEMENT.md` (24-25/09) : aplats, chiffres en tuiles, fins de page.
6. `RAPPORT-MAQUETTE-PROS.md` + `ALLER-PLUS-LOIN.md` (30/09) : archétypes, arborescence B (écartée).
7. `DIRECTION.md`, `DIRECTION-ACCUEIL.md`, `RAPPORT-REPRISE.md` : grammaire visuelle.
8. `CLAUDE.md` : décisions tranchées jusqu'au 02/10.
9. Aucun de ces documents ne suit une cible de bout en bout. C'est le manque que comble cet audit.

## 2. État des points déjà identifiés

| # | Point (source) | État | Preuve aujourd'hui |
|---|---|---|---|
| 1 | Non-lucrativité au premier écran (RAPPORT-AUDIT r.1) | Corrigé en partie | « Association d'intérêt général, depuis 1987 » + bandeau « loi 1901, agréée ESUS ». Les mots « à but non lucratif » n'apparaissent que sur Qui sommes-nous. |
| 2 | ESUS absent (RAPPORT-AUDIT) | Corrigé | Accueil (bandeau), Qui sommes-nous (deux fois). |
| 3 | Identifiants techniques « DEF » (RAPPORT-AUDIT) | Toujours ouvert (volontaire) | Invisible à l'écran. |
| 4 | Deux systèmes de boutons `.btn` / `.btnb` (RAPPORT-AUDIT) | Toujours ouvert | `.btn` subsiste 3 fois dans `Pages.jsx` (fiches formation). |
| 5 | Images lourdes : 57 Mo sur l'accueil (AUDIT-DESIGN #7) | Corrigé | 2,8 Mo d'images sur l'accueil, 4,3 Mo sur Des Étoiles et des Femmes. |
| 6 | Débordement mobile des grilles (AUDIT-DESIGN #9) | Corrigé | `scrollWidth` = largeur sur 15 routes × 4 largeurs. |
| 7 | Pages fonctionnelles hors DA (AUDIT-DESIGN #8) | Corrigé | `HeroPage` partout. |
| 8 | Chrome fixe chargé (AUDIT-DESIGN #6) | Corrigé | Pastille seule, bouton flottant retiré. |
| 9 | Pages projet sans « autres projets » (AUDIT-DESIGN #10) | Corrigé | Bloc par mission en fin de page. |
| 10 | Édito martelé (07, §2) | Toujours ouvert | La même citation de l'édito sur 3 pages : accueil, Nos lieux et projets, Qui sommes-nous. |
| 11 | « Levier » et « n'est pas X, c'est Y » dans l'édito (07, §4.5) | Toujours ouvert | Qui sommes-nous : « levier » ×3, « n'est pas un coût, c'est un levier », « n'est pas qu'un slogan ». Le paragraphe retiré le 30/09 est revenu avec l'annulation. |
| 12 | Grand Festin, chiffres contradictoires (07, §4.1) | Corrigé | 600+, 14 brigades partout. |
| 13 | La Table de Cana : 89 % au lieu de 84 % (07, §4.2) | **Aggravé** | Page projet : « 89 % de sorties dynamiques en 2025 ». Impact : « 84 % de sorties positives en 2024 ». Les deux chiffres sont maintenant visibles. |
| 14 | Calendrier Des Étoiles et des Femmes incohérent (07, §4.3) | Toujours ouvert | Insertion : candidature en septembre, examens en avril, emploi en mai. Le CAP dure 11 mois (fiche CAP, Insertion, Académie). |
| 15 | 1987 sans explication (07, §4.4) | **Aggravé** | Impact, rapport 2022 : « L'association Départ devient Festin ». Qui sommes-nous : « Festin naît à Marseille en 1987 ». |
| 16 | Édito signé du seul directeur (07, §4.5) | Corrigé | Trois signataires. |
| 17 | Tournesol : organismes sans rôle (07, §4.6) | Toujours ouvert | Cinq structures citées (Refugee Food, Estello, AFC Groupe, Corot Formations, Compass). Le rôle de Corot n'est pas dit. |
| 18 | Faux chiffres clés (07, §3.4) | Toujours ouvert | Les tuiles de Tournesol affichent « 5 mois », « 600 heures » et « 2 diplômes » ; celles de Des Étoiles et des Femmes, « 13 antennes ». Ce sont des caractéristiques, pas des résultats. |
| 19 | Chiffres sans date (07, §1) | Toujours ouvert | La Table de Cana : « 400 000+ convives servis ». Académie : « 500+ offres actives » et « 77 240 projets » sans année. |
| 20 | Prescripteurs sans parcours (07, §5) | Corrigé en partie | Le menu mène bien à « Orienter une personne ». Mais la page s'adresse à la personne, et le bloc prescripteurs n'existe plus (voir §4). |
| 21 | Mécènes et institutions sans page (07, §5) | Toujours ouvert | Bouton DON et adresse `mailto:` seulement. |
| 22 | Don des Beaux Mets vers le Contact (07, §4.9) | Corrigé | HelloAsso. |
| 23 | Espaces réservés visibles (07, §4.11) | Toujours ouvert (interrupteur) | 8 cadres photo sur Qui sommes-nous, 2 sur Actualités, 1 sur Des Étoiles et des Femmes, « [À COMPLÉTER : conditions d'entrée] » sur Insertion. |
| 24 | Date périmable « Dès septembre 2026 » (07, §4.12) | Corrigé | Absente. |
| 25 | Chiffres clés en tuiles (AUDIT-DEPLOIEMENT §2.3) | Réintroduit par décision du 25/09 | Quatre tuiles colorées sur les 5 pages projet (voir §11). |
| 26 | Fins de page sans action (AUDIT-DEPLOIEMENT §2.5) | Corrigé, sauf une page | Page Pros : « S'engager avec Festin » n'a aucun lien. |
| 27 | Plus de deux composants horizontaux interactifs (ALLER-PLUS-LOIN §3) | **Aggravé** | Des Étoiles et des Femmes : frise épinglée, carrousel de témoignages, sphère et galerie, soit quatre. |
| 28 | Académie de composition uniforme (ALLER-PLUS-LOIN) | Toujours ouvert | Et un défaut nouveau, voir §7. |

## 3. Verdict

**Prêt à être montré à des partenaires qui connaissent déjà Festin : oui. Prêt à être mis en ligne pour le public : non.**

1. Ce qui marche : la page Professionnels, la page Impact (quatre ans de données, étude Koreis, rapports en PDF), les fiches projet des Beaux Mets et de Restaure, la navigation (tout est à deux clics au plus) et l'accessibilité (axe sans violation à 1440 px).
2. La cible la plus fragile est la personne qui cherche une formation. C'est aussi celle pour qui la mission existe. L'accueil ne lui ouvre aucune porte : les deux portes s'adressent à « Vous accompagnez une personne » et « Vous dirigez une cuisine ». Sa démarche finit sur un formulaire `mailto:`, sans numéro de téléphone.
3. La mission sociale se lit, mais elle n'est pas incarnée. L'accueil n'a aucun visage de personne accompagnée ni aucun témoignage : on y lit des chiffres et des institutions.
4. Six contradictions de chiffres ou de faits entre les pages. Un financeur attentif les verra (voir §7).
5. Trois culs-de-sac visibles : l'Académie affiche « Formations pro (0) », la fiche du CAP gratuit propose « Demander un devis » et la section S'engager de la page Pros n'a pas de lien.
6. Partenaires opérationnels et mécènes : ni page ni entrée de menu.
7. Note moyenne des six parcours : **5,7 sur 10**.

## 4. Les six parcours

Les clics sont comptés depuis l'accueil, menu compris.

### 4.1 Une femme qui envisage la formation (mobile, 360 px) : 4 sur 10

**Chemin.** Accueil (aucune porte pour elle) → porte teal « Vous accompagnez une personne / Orienter une personne » ou Menu → « Orienter une personne » (1 à 2 clics) → Insertion : « Apprendre un métier de cuisine, gratuitement. » Elle se reconnaît enfin, au deuxième écran → « Vérifier mon éligibilité » (2 à 3 clics) → Contact.
- **Sur la page Contact** : le titre est « Parlons de votre projet », sur la photo d'un homme attablé au restaurant. Les coordonnées passent avant le formulaire. Elle doit remplir deux listes déroulantes (« Vous êtes », puis le motif), alors que l'adresse ne présélectionne rien.
- **À l'envoi** : « Préparer mon message » ouvre la messagerie du téléphone (lien `mailto:`). Si aucune messagerie n'est configurée, il ne se passe rien.
- **Autre sortie** : « Plus d'informations ↗ » mène au site de Des Étoiles et des Femmes, 3 clics, et la fait quitter le site.

**Où elle décroche.**
- Sur l'accueil : rien ne lui est adressé.
- Au Contact : pas de numéro de téléphone, et l'envoi dépend de sa messagerie.
- Au calendrier : Insertion annonce les examens en avril, alors qu'un CAP de 11 mois ne peut pas finir en avril.

**Ce qu'elle ne trouve pas.**
- La prochaine réunion d'information près de chez elle : renvoyée au site du projet.
- Un téléphone.
- Si elle sera payée : « selon votre situation » seulement.
- Les conditions d'entrée à La Table de Cana Marseille : « [À COMPLÉTER] ». De plus, la page La Table de Cana renvoie vers Insertion pour ces conditions, ce qui fait une boucle.

**Ce qu'elle lit pour rien.**
- Sur l'accueil : les cartes des formations pro, avec leurs tarifs en euros hors taxe.
- Le sigle DCL (expliqué une seule fois), « titre à finalité professionnelle », « primo-arrivantes ».
- L'accueil fait 17,8 écrans sur mobile (13 866 px).

**Ce qu'elle comprend en 10 secondes.** « C'est pour ceux qui accompagnent quelqu'un ou qui ont une cuisine. Il y a des gens en tablier sur la photo, mais ce n'est pas écrit pour moi. »

**Note : 4.** La page Insertion est juste (gratuité, suivi, critères en clair). L'entrée et la sortie, elles, la perdent.

### 4.2 Un prescripteur (conseiller France Travail, travailleur social) : 6 sur 10

**Chemin.** Accueil → porte teal « Orienter une personne » (1 clic) → Insertion → cartes « Pour qui / Le parcours / Pour entrer » → « Vérifier mon éligibilité » → Contact (2 clics), où il trouve « Je suis prescripteur » et le motif « Orienter une personne ».

**Ce qui fonctionne.** La porte est la première de l'accueil. Les critères tiennent en trois lignes par parcours : niveau de français B1, B2 ou A2, majorité, autorisation de travail. Le taux de 83 % est donné avec son périmètre.

**Où il décroche.** La page parle à la personne (« Vous cherchez un métier », « une personne de l'équipe vous aide »), pas à lui. `CLAUDE.md` prévoyait un bloc prescripteurs avec un contact par projet : il n'existe plus. Il n'a ni interlocuteur nommé, ni fiche de prescription, ni calendrier par antenne.

**Ce qu'il ne trouve pas.**
- Qui appeler à Lille ou à Toulouse.
- Le délai de réponse. Il n'est écrit que dans le sous-titre de la page Contact : « nous répondons sous 48 h ouvrées ».
- La rémunération exacte : il sait que France Travail rémunère Tournesol, mais pour Des Étoiles et des Femmes, rien.

**Ce qu'il lit pour rien.** La galerie de photos et la frise « mois par mois », qui est fausse pour le CAP.

**Ce qu'il comprend en 10 secondes.** « Une association marseillaise qui forme gratuitement aux métiers de la cuisine, avec des stages chez des chefs et un suivi. »

**Note : 6.**

### 4.3 Un restaurateur : 7 sur 10

**Chemin.** Accueil → porte or « Vous dirigez une cuisine / Former mes équipes » (1 clic) → Professionnels → « Recevoir le Book » ou « Préparer une embauche » → Contact (2 clics).

**Ce qui fonctionne.** C'est la meilleure page du site :
- 256 mots, 7,4 écrans sur mobile ;
- trois façons de recruter, avec des étiquettes (délai, contrat, financement) ;
- la POEI dépliable ;
- la preuve d'un pair (le chef Davin et Sami, logo InterContinental).

**Où il décroche.**
- Les cinq actions de la page mènent toutes au même formulaire générique, sans motif présélectionné : « Recevoir le Book » ne prépare pas une demande de Book.
- La section « S'engager avec Festin » se termine sans lien.

**Ce qu'il ne trouve pas.**
- Un lien vers la page du programme Restaure : la bande défilante cite les six projets, mais aucun n'est cliquable.
- Un lien vers Les Beaux Mets, d'où vient Sami.
- Le prix des formations, retiré de la page par décision.

**Ce qu'il lit pour rien, ou qui le trouble.**
- Les mêmes formations sont tarifées sur l'accueil (« Inter 180 € HT/pers ») et non tarifées sur sa page.
- La fiche Violences sexistes et sexuelles le fait entrer dans « L'Académie Festin » (fil d'Ariane). Or ces formations ne relèvent plus de l'Académie depuis le 01/10.
- Sur cette fiche, « Comment financer cette formation » ne propose qu'un catalogue PDF et un devis. Je n'ai pas vérifié que ce PDF ne mentionne plus Qualiopi ni l'OPCO.

**Ce qu'il comprend en 10 secondes.** « Ils forment des commis que je peux prendre en stage ou recruter, et ils font des formations contre les violences en cuisine. »

**Note : 7.**

### 4.4 Un partenaire opérationnel (structure porteuse d'antenne, centre de formation, entreprise d'accueil) : 4 sur 10

**Chemin.** Aucune entrée ne le nomme. Le chemin le plus probable : Menu → « Nos lieux » → « Voir les antennes » → Des Étoiles et des Femmes, liste des 13 antennes (3 clics). Ou Qui sommes-nous → la sphère « Ils travaillent avec nous », qui n'a pas d'appel. Ou Contact → « Je suis partenaire ou financeur », où les deux publics sont confondus.

**Où il décroche.** Sur la liste des antennes, « La Table de Cana » porte les antennes de Montpellier, Bordeaux, Paris, des Hauts-de-Seine et de la Seine-Saint-Denis. Le même site présente « La Table de Cana Marseille » comme un projet de Festin. Rien n'explique que ce sont des structures distinctes. Il ne sait plus ce qui appartient à Festin.

**Ce qu'il ne trouve pas.**
- Comment ouvrir une antenne.
- Ce qu'on attend d'un centre de formation partenaire.
- Un contact « réseau ». Mélanie Gambert, coordinatrice réseau, n'apparaît que dans l'équipe, sans moyen de la joindre.

**Ce qu'il comprend en 10 secondes.** « Un réseau national de formation des femmes, piloté depuis Marseille. »

**Note : 4.**

### 4.5 Un financeur ou un mécène : 6 sur 10

**Chemin.** Le bouton DON de la pastille est visible sur toutes les pages : 1 clic vers HelloAsso, c'est bien. Pour le mécénat :
- en bas de l'accueil, « Devenir mécène » ouvre une adresse `mailto:` (1 clic, après 17 écrans sur mobile) ;
- dans le hero, « Devenir partenaire » mène au formulaire générique.

Ce sont deux chemins pour la même démarche. Pour vérifier l'impact : Menu → Qui sommes-nous → Notre impact (2 clics).

**Ce qui fonctionne.**
- Impact est la page la plus crédible du site. On y trouve les séries 2022 à 2025, la définition de la sortie, et l'aveu que « le rapport 2025 publie le taux sans le détail des effectifs ». L'étude Koreis est datée et sourcée, avec quatre rapports en PDF.
- Le bloc « Un projet social, à but non lucratif » est clair.

**Glissement vers l'investissement ou le capital : aucun.**
- Recherche sur le texte affiché : ni « investisseur », ni « capital », ni « levée », ni « rentabilité », ni « client » dans la voix du site.
- Seules occurrences proches : « Plan d'investissement dans les compétences », nom officiel du programme ; « bénéfices », dans « les bénéfices servent à l'insertion », formule voulue.
- Une réserve : l'édito parle de « concurrence stérile » et de « mutualiser, amplifier ». C'est un registre de gestion, mais pas de capital.

**Où il décroche.** Sur les contradictions :
- La Table de Cana : 89 % (2025) sur sa page, 84 % (2024) sur Impact.
- Les Beaux Mets : « 86 % de sorties dynamiques en 2025 » sur sa page, « 82 % en 2023 » sur Impact. Ce sont deux indicateurs nommés différemment.
- La création : « Festin naît en 1987 », alors que le résumé du rapport 2022 indique « Départ devient Festin ».
- Le taux de Tournesol « un an après » a pour source le « bilan de fin de promotion 2025-2026 ». Une promotion qui finit en 2026 ne peut pas avoir de recul d'un an au 05/10/2026.

**Ce qu'il ne trouve pas.**
- Une page qui dise ce que finance un don ou un mécénat : coût d'un parcours, part de financement privé.
- La liste des financeurs actuels : la sphère mêle partenaires et financeurs, sans légende.
- La gouvernance n'est pas en cause : le bureau est affiché.

**Ce qu'il comprend en 10 secondes.** « Association d'intérêt général agréée ESUS, depuis 1987, 14 territoires : sérieux. »

**Note : 6.**

### 4.6 Un client potentiel des Beaux Mets : 7 sur 10

**Chemin.** Accueil → frise, Les Beaux Mets → « Découvrir » (1 clic) → hero, « Réserver une table ↗ » (2 clics) : il quitte le site pour celui du restaurant. Par le menu : « Nos lieux et projets » → Les Beaux Mets → Réserver (3 clics). Pour privatiser, « Privatiser le restaurant » mène au formulaire, avec le motif présélectionné (`#/contact/privatisation`). Cela fonctionne.

**Où il décroche.** Le site ne dit rien de pratique sur un restaurant situé dans une prison : adresse et accès, pièce d'identité, délai de réservation, prix moyen. Tout est renvoyé au site externe. Une ligne suffirait à rassurer avant le clic.

**Ce qu'il lit pour rien.** Le parcours d'un commis (5 étapes), le paragraphe « Une idée venue de Londres et de Milan » (« Les deux se rencontrent ensuite » : on ne sait pas qui) et quatre tuiles de chiffres.

**Ce qu'il comprend en 10 secondes.** « Un vrai restaurant dans la prison des Baumettes, où les détenus cuisinent et servent. »

**Note : 7.**

## 5. Test de la mission sociale

| Vérification | Résultat | Détail |
|---|---|---|
| Accueil, 10 secondes | **Partiel** | H1 : « Le goût d'avancer ensemble » (devise, sans information). Sous-titre : « Former les personnes, faire avancer les cuisines. » Ni « insertion » ni « emploi » au premier écran, en dehors du bandeau. On peut lire Festin comme une école de cuisine ou un cabinet de formation. Le mot « insertion » n'arrive qu'au deuxième écran. Aucune personne accompagnée ne parle sur l'accueil. |
| Non-lucrativité au premier écran | **Oui, avec réserve** | « Association d'intérêt général » (étiquette) et « Association loi 1901, d'intérêt général, agréée ESUS » (bandeau défilant). Sur mobile, le bouton Pause recouvre le bandeau. « À but non lucratif » n'est écrit que sur Qui sommes-nous. Voir aussi la tension avec la décision du 01/10 en §11. |
| Écosystème compris sur chaque page projet | **Inégal** | Tournesol : clair (« Un programme de l'Académie Festin »). La Table de Cana : clair (« premier projet de Festin », 2ᵉ section). Restaure : clair (« Quatre structures pilotent… et Festin »). Les Beaux Mets : Festin n'est nommé que dans l'historique, au 3ᵉ écran. **Des Étoiles et des Femmes** : Festin n'apparaît ni dans le hero ni dans la présentation, seulement dans la liste des antennes (« Marseille, Festin ») et dans le bloc de fin. Le visiteur venu de la presse ne sait pas qu'il est chez Festin avant le bas de la page. |

## 6. Navigation

**Diagnostic.**
- **Profondeur** : toutes les pages sont à 2 clics de l'accueil au plus, les fiches formation à 3. C'est correct.
- **Entrées** : 4, plus le bouton DON. Aucune pour « Soutenir », ni pour la presse ou les partenaires.
- **Libellés.**
  - « Se former ou orienter » mélange deux publics. Son premier lien, « Orienter une personne », ouvre une page titrée pour la personne elle-même : le libellé et la page ne se correspondent pas.
  - « Nos lieux et projets » annonce « Cinq projets » et n'en liste que trois : Restaure est rangé sous Pros, l'Académie sous Se former.
  - « Qui sommes-nous » contient Impact, Actualités et Contact. Le Contact est caché dans une rubrique d'identité.
- **Doublons.**
  - Restaure : rangé sous Pros dans le menu, mais son fil d'Ariane indique « Nos projets ».
  - Tournesol : rangé sous l'Académie, mais il allume la rubrique « Nos lieux et projets » (règle `match: #/projets`).
  - Fiches Violences et Management : rangées sous Pros, avec le fil d'Ariane « L'Académie Festin ».
- **Pages orphelines** : aucune vraie. `#/projets/lieux` n'est qu'une ancre de `#/projets`. Les fiches formation ne sont accessibles que par les cartes.
- **Culs-de-sac.**
  - Pros, section S'engager : pas de lien.
  - La Table de Cana → Insertion → « [À COMPLÉTER] » : une boucle.
  - Académie : le filtre « Formations pro (0) » est cliquable et ne montre rien.
  - Fiche CAP (gratuite) : « Demander un devis ».
  - Contact : envoi par `mailto:`.

**Trois arborescences.**

| | A. Par besoin, corrigée (4 entrées + DON) | B. Par public (5 entrées) | C. Par projet (5 marques + Festin) |
|---|---|---|---|
| Entrées | Se former · Recruter et former vos équipes · Nos lieux et projets (les 5) · Qui sommes-nous. « Orienter une personne » devient une page ou une section distincte. « Soutenir » rejoint DON dans la pastille. | Se former · Orienter · Professionnels · Soutenir · Festin (projets, lieux, histoire, impact, presse) | Des Étoiles et des Femmes · Les Beaux Mets · La Table de Cana Marseille · Restaure · Académie · Festin |
| Cible servie | Toutes, sans rupture | La personne, le prescripteur et le mécène gagnent chacun leur porte | Le visiteur qui vient de la presse ou connaît une marque |
| Contrepartie | La personne et le prescripteur restent voisins dans la même rubrique | Une cinquième entrée (une arborescence à cinq a déjà été écartée le 30/09) ; les projets reculent d'un niveau | Le visiteur doit savoir quel projet lui correspond ; contredit le menu par besoin tranché le 01/10 |

**Recommandation : A.** Elle respecte la décision du 01/10 et corrige les trois vrais défauts :
- la personne et le prescripteur sur la même page ;
- l'absence d'entrée pour soutenir ;
- un menu de projets incomplet.

B ne vaut que si les mesures d'audience montrent que les mécènes et les partenaires arrivent sans passer par l'accueil. Rien n'est implémenté.

## 7. Nouveautés seulement

### Contenu

**Erreurs ou contradictions nouvelles.**
1. **Académie** (§ Nos parcours d'insertion) : « 3 parcours d'insertion diplômants et **0 formations pro** », et le filtre « Formations pro (0) ». C'est l'effet de `seulInsertion` (décision du 01/10), avec un texte resté générique. Même page, section « Un format par public » : « des sessions de trois heures à deux jours pour les équipes en poste », alors que l'Académie n'en propose plus. Section « À chacun sa formation » : une moitié est consacrée aux formations Restaure.
2. **Fiches CAP et TFP** (§ Comment financer cette formation) : « Demander un devis » pour un parcours gratuit destiné à des femmes en insertion.
3. **Tournesol, galerie** : les légendes « Lille, restaurant L'Annexe » et « Lyon, soirée de clôture » sont des photos de Des Étoiles et des Femmes. Tournesol est à Marseille.
4. **Tournesol** : « 150 heures de stage » dans les portes, « 155 h de stage » dans le catalogue.
5. **« Programme »** désigne trois choses : Des Étoiles et des Femmes (« Le programme est né à Marseille en 2015 », sur la page projet et l'accueil), le programme Restaure, et Tournesol, « un programme de l'Académie ». Or `CLAUDE.md` impose « le dispositif Des Étoiles et des Femmes ».
6. **Accueil, frise** : « 2026, L'Académie Festin : Festin devient organisme de formation. » Ailleurs, l'Académie est « portée par Estello Formation, organisme certifié Qualiopi ». Les deux phrases se contredisent sur qui est l'organisme.
7. **Les Beaux Mets** : « le premier restaurant en prison ouvert au public en France » sans source. C'est une affirmation vérifiable par un journaliste.
8. **Insertion, étape 1** : la pastille « Gratuit pour les personnes formées » est placée sur l'étape « Candidater ». Elle ne veut rien dire à cet endroit.

**Densité de texte** (mots du contenu, réponses repliées comprises, hors menu et pied de page) et part supprimable sans perte d'information :

| Page | Mots | Écrans à 360 px | Supprimable | Où |
|---|---|---|---|---|
| Accueil | 893 | 17,8 | 30 % | Les puces de « Par où commencer ? » redisent « Deux publics » ; catalogue complet doublé de l'Académie ; édito |
| Qui sommes-nous | 670 | 13,8 | 25 % | Non-lucrativité dite deux fois (« Projet social », puis valeur « Non-lucrativité ») ; 2ᵉ et 3ᵉ paragraphes de l'édito |
| Académie | 541 | 11,4 | 35 % | Tout ce qui parle des formations pro ; bloc des projets de fin |
| Des Étoiles et des Femmes | 627 | 13,0 | 20 % | Les portes redisent « en bref » ; « Tout au long du parcours » répète l'étape 4 |
| Les Beaux Mets | 621 | 10,6 | 25 % | Liste des festivals ; Londres et Milan |
| Insertion | 629 | 10,4 | 20 % | La bande « Toute l'année » double « Un diplôme et quelqu'un à vos côtés » |
| La Table de Cana | 526 | 10,0 | 20 % | Étape 2 (trois outils en une étape) |
| Restaure | 563 | 12,2 | 15 % | Les portes redisent les tuiles (700, 35) |
| Actualités | 573 | 8,3 | 15 % | |
| Tournesol | 469 | 10,0 | 15 % | |
| Impact | 483 | 12,6 | 10 % | |
| Pros | 256 | 7,4 | 5 % | |
| Contact | 123 | 5,2 | 0 % | |

**Répétitions entre pages.**
- « Par où commencer ? » : titre identique sur 6 pages.
- « Des femmes formées avec des chefs, dans 13 villes » : 6 fois.
- « Traiteur et restauration collective en insertion, depuis 1993 » : 6 fois.
- 91 % : sur 5 pages.
- 83 % : sur 4 pages.
- La même citation de l'édito : sur 3 pages.

**Le site raconte-t-il une histoire ?** Celle de l'institution, oui : la frise de 1987 à 2026, les missions, les chiffres. Celle des personnes, non.
- Les témoignages sont relégués dans des carrousels à **un seul témoignage** : Hafida, Oumar, Valentin Majan, un ancien de Tournesol.
- L'accueil n'en contient aucun.
- Le texte le plus fort du site, les verbatims de Restaure, est enfoui dans la 3ᵉ section d'une page projet.

### Design

1. **Code couleur contredit.** Décision du 02/10 : teal = insertion, or = professionnels. Or :
   - 10 heros intérieurs sur 14 sont en or, dont celui d'Insertion ;
   - le hero de la page Pros est une photo sombre ;
   - la teinte de hero par mission (24/09) a disparu.

   Sur la planche des captures à 1440 px, les pages projet, l'Académie, Insertion, Qui sommes-nous, Impact et Actualités ont le même premier écran.
2. **Hiérarchie mesurée.**
   - À 1440 px : H1 de 74 px pour H2 de 51 px, soit un rapport de 1,45. C'est correct.
   - À 360 px : H1 de 36 px pour H2 de 28 px, soit 1,29. Sur mobile, le titre de page et les titres de section se confondent.
   - Actualités : les H3 des « moments » sont à 51 px, autant que les H2.
   - Fiches formation : H2 de 24 px en casse de phrase (« Ce que vous apprendrez »). C'est la seule entorse à « titres en capitales », avec le H2 « Les projets » de `#/projets`.
   - Page Pros et Qui sommes-nous : un H2 rendu à 13 px (« S'engager avec Festin », « Ils travaillent avec nous »).
3. **Texte sous 12 px.**
   - Micro-étiquettes à 11 px : publics des cartes formation, « Création » et « Reconnaissance », « Rapport d'activité », étiquettes de la page Pros.
   - Ce sont des informations, pas du décor : elles devraient passer à 12 px au minimum.
4. **Contraste** (axe, 360 px). Deux constats :
   - Des Étoiles et des Femmes : les noms de la sphère, en or sur teal, sont à 3,52:1 en 19 px (5 nœuds).
   - Accueil : le mot décoratif de la frise (`ab-hist__word`) est à 1,15:1. C'est un décor, mais il est lu par les lecteurs d'écran : il faut le masquer.
5. **Composants horizontaux.**
   - Des Étoiles et des Femmes en a 4 (la charte en autorise 2).
   - Les carrousels de témoignages défilent pour un seul élément : c'est un dispositif sans contenu.
6. **États manquants.**
   - Le formulaire de contact n'a pas d'état d'envoi réel (lien `mailto:`). Sur un téléphone sans messagerie configurée, rien ne se passe et rien n'est signalé.
   - Le filtre « Formations pro (0) » de l'Académie est un bouton actif qui ne renvoie aucun résultat.
7. **Boutons primaires en concurrence.** Pas de conflit dans les heros. En revanche, en bas de l'accueil, quatre actions ont le même poids (Faire un don, Devenir mécène, Réserver, Commander) : aucune ne domine.
8. **Deux grammaires.** La page Pros (archétypes, mot géant, bande or) ne ressemble à aucune autre page. C'est une décision du 30/09, mais elle est visible : un restaurateur qui passe de Pros à Restaure change de site.
9. **Dépendances externes.** Lucide (icônes du menu) et Lenis sont chargés depuis unpkg et jsDelivr (`index.html`, l. 45 et 48), alors que `CLAUDE.md` annonce des bibliothèques locales. Hors ligne, ou si un CDN tombe, les pastilles du menu sont vides (capture du menu mobile).
10. **Responsive.** Aucun défilement horizontal à 360, 768, 1024 et 1920 px. Les liens dans le texte font 19 à 22 px de haut (fil d'Ariane, « Vu dans… ») : c'est toléré par WCAG 2.5.8, mais serré au doigt.

## 8. Priorités

Un astérisque (*) signale un point qui traîne depuis un audit précédent.

| Page | Section | Problème | Gravité | Effort |
|---|---|---|---|---|
| Accueil | Hero | Aucune porte pour la personne qui cherche une formation | Bloquant | Léger |
| Contact | Formulaire | Envoi `mailto:` sans solution de repli, pas de téléphone | Bloquant | Moyen |
| Académie | Catalogue | « 0 formations pro », filtre vide, deux blocs hors sujet | Bloquant | Léger |
| Fiches CAP, TFP | Financement | « Demander un devis » pour un parcours gratuit | Bloquant | Léger |
| Insertion | Calendrier | Calendrier incompatible avec un CAP de 11 mois* | Bloquant | Léger |
| La Table de Cana / Impact | Chiffres | 89 % (2025) contre 84 % (2024)* | Important | Léger |
| Les Beaux Mets / Impact | Chiffres | 86 % de sorties dynamiques contre 82 %, deux indicateurs | Important | Léger |
| Qui sommes-nous / Impact | Histoire | 1987 contre « Départ devient Festin » (2022)* | Important | Léger |
| Insertion | Parcours | Plus de bloc prescripteurs ni de contact par projet* | Important | Moyen |
| Tournesol | Galerie | Photos de Lille et de Lyon | Important | Léger |
| Tournesol | Chiffres | 86 % « un an après » pour la promotion 2025-2026 ; 150 ou 155 h | Important | Léger |
| Des Étoiles et des Femmes | Hero, présentation | Festin absent avant la fin de la page | Important | Léger |
| Des Étoiles et des Femmes | Antennes | « La Table de Cana » porteuse ailleurs, sans explication | Important | Léger |
| Tout le site | Vocabulaire | « Programme » pour Des Étoiles et des Femmes au lieu de « dispositif » | Important | Léger |
| Pros | S'engager | Aucun lien | Important | Léger |
| Pros | Actions | Cinq actions vers un Contact sans motif présélectionné | Important | Léger |
| Fiches Violences et Management | Fil d'Ariane | « L'Académie Festin » au lieu de Restaure ou Pros | Important | Léger |
| Menu | Toutes | Aucune entrée Soutenir ; « Nos lieux et projets » liste 3 projets sur 5* | Important | Moyen |
| Tous les heros | Couleur | Code teal / or non appliqué ; 10 heros identiques | Important | Moyen |
| Qui sommes-nous | Édito | « Levier » ×3, « n'est pas un coût, c'est un levier »* | Important | Léger (décision de la direction) |
| Accueil | Corps | Aucun témoignage de personne accompagnée | Important | Léger |
| Des Étoiles et des Femmes | Corps | 4 composants horizontaux interactifs* | Confort | Moyen |
| Tournesol, Des Étoiles et des Femmes | Tuiles | Caractéristiques présentées comme résultats* | Confort | Léger |
| La Table de Cana, Académie | Chiffres | 400 000+, 500+, 77 240 sans date* | Confort | Léger |
| Mobile | Titres | H1 et H2 trop proches (36 et 28 px) | Confort | Léger |
| Tout le site | Étiquettes | Texte à 11 px | Confort | Léger |
| Des Étoiles et des Femmes | Sphère | Contraste de 3,52:1 | Confort | Léger |
| `index.html` | Scripts | Lucide et Lenis sur CDN | Confort | Léger |
| Les Beaux Mets | Hero | Pas d'informations pratiques (accès, pièce d'identité) | Confort | Léger |

## 9. Les dix choses à corriger en premier

1. **Accueil** : ajouter une troisième porte, ou réécrire la porte teal, pour « Vous cherchez une formation ». Elle mène à Insertion.
2. **Contact** : ajouter un numéro de téléphone. Prévoir un repli au lien `mailto:` (afficher l'adresse et le texte à copier si la messagerie ne s'ouvre pas), et présélectionner le motif depuis chaque bouton (`#/contact/book`, `#/contact/orienter`, etc., comme pour la privatisation).
3. **Académie** : retirer le filtre et le compteur des formations pro, et réécrire « Un format par public » et « À chacun sa formation ».
4. **Fiches CAP, TFP et Tournesol** : remplacer « Demander un devis » par « Vérifier mon éligibilité ».
5. **Insertion, calendrier** : un calendrier par parcours, ou une mention explicite « parcours de 4 à 5 mois ; le CAP dure 11 mois ».
6. **Chiffres** : un seul taux par projet, celui d'Impact, repris tel quel sur la page projet (La Table de Cana, Les Beaux Mets). Corriger la source du taux de Tournesol, et 150 contre 155 h.
7. **1987 et Départ** : une phrase sur Qui sommes-nous (« Festin s'est appelée Départ jusqu'en 2022 »), sous réserve de confirmation.
8. **Insertion** : rétablir un bloc court pour les prescripteurs (un contact par projet, le délai de réponse), au-dessus des cartes ou en tête de rubrique.
9. **Tournesol** : remplacer les photos de la galerie. **Des Étoiles et des Femmes** : une phrase « un dispositif de Festin » dans la présentation, et « programme » remplacé par « dispositif ».
10. **Pros** : un lien sur « S'engager » (DON ou mécénat), la bande des projets rendue cliquable, et le fil d'Ariane des fiches Violences et Management corrigé.

## 10. Ce que l'utilisatrice doit fournir

**Avant la mise en ligne.**
- Le bon taux de La Table de Cana (89 % en 2025 ou 84 % en 2024) et celui des Beaux Mets, avec l'intitulé de l'indicateur.
- La source et la date exactes du taux de 86 % de Tournesol, et la durée du stage (150 ou 155 h).
- Le calendrier réel 2026-2027 de chaque parcours (CAP, TFP, Tournesol).
- Un numéro de téléphone public, et un contact par projet pour les prescripteurs.
- Les conditions d'entrée à La Table de Cana Marseille.
- L'historique Départ / Festin : peut-on l'écrire ?
- La source de « premier restaurant en prison ouvert au public en France ».
- Des photos de Tournesol à Marseille.

**Avant la diffusion aux financeurs.**
- Ce que finance un don ou un mécénat (coût d'un parcours, part privée), et si l'on peut citer la réduction d'impôt.
- La liste des financeurs à afficher comme tels.
- La validation, par la direction, de la coupe de l'édito (« levier »).
- Le catalogue PDF des formations pro : confirmer qu'il ne mentionne plus Qualiopi ni l'OPCO.

**Confort.**
- Les 8 portraits manquants.
- Le logo du Monde, un logo Nice-Matin complet.
- Les logos des partenaires.
- Les photos du Grand Festin.
- La carte des antennes à valider.
- Des témoignages courts de personnes accompagnées pour l'accueil (accord écrit).

## 11. Désaccords et hypothèses

**Hypothèses.**
1. `CONTEXTE-FESTIN.md` n'existe ni sur cette branche ni sur les branches distantes. J'ai pris `CLAUDE.md` comme document de référence pour le nommage, le ton et les règles.
2. Les parcours ont été faits sur la version locale, identique à la production (`15c7bc5`). En local, Lucide et Lenis ne se chargent pas depuis les CDN. J'ai supposé qu'ils se chargent en production, d'où le classement en « confort ».
3. Les captures pleine page représentent mal les sections épinglées : les grandes zones vides des captures de l'accueil, d'Insertion et de Des Étoiles et des Femmes viennent de l'épinglage, pas d'un défaut de mise en page.
4. Les mentions légales renvoient une 404 sur le serveur local, mais `vercel.json` les réécrit en production. Je ne les ai pas comptées comme défaut.
5. Les cadres « [PHOTO MANQUANTE] » disparaîtront avec `FESTIN_SHOW_PLACEHOLDERS = false`. Ils ne sont pas comptés dans les mots.

**Désaccords.**
1. **Tuiles de chiffres** (réintroduites le 25/09). Le gabarit « gros chiffre, petite légende » avait été écarté le 24/09, et la charte des chiffres impose qu'une case ne contienne qu'un résultat. Sur Tournesol et Des Étoiles et des Femmes, les tuiles se remplissent de caractéristiques. Je recommande de les garder seulement là où il y a quatre résultats datés.
2. **« Festin », pas « l'association »** (01/10), contre « non-lucrativité lisible dès l'accueil » (règle Festin). L'accueil affiche « Association d'intérêt général » et « Association loi 1901 » au premier écran. C'est contraire à la lettre du 01/10, mais nécessaire à la règle de non-lucrativité. Je recommande de garder la mention telle quelle et de l'acter comme exception.
3. **Prix des formations pro** : affichés sur l'accueil et sur les fiches, absents de la page Pros (décision du 30/09). Le restaurateur voit les prix sur l'accueil, pas sur sa page. Il faut choisir l'un ou l'autre pour ces deux formations.
4. **Page Pros, grammaire à part.** Je comprends le refus d'étendre les archétypes. Mais la page Pros ressemble à un autre site. Soit on accepte cet écart, soit on reprend sur les autres pages au moins deux de ses procédés : les micro-étiquettes et les actions à chaque ligne. C'est la page la mieux notée de l'audit.
