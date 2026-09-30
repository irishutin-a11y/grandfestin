# Aller plus loin (30/09/2026)

## 1. Design

**Ce qui devient une règle générale :**
- **Un vocabulaire fini de huit archétypes**, le même partout : plein cadre, bloc encarté à accordéon, bande défilante, lignes typées, carte flottante, titre en chevauchement, split asymétrique, grille de cartes (une par page au plus). Deux sections voisines ne partagent jamais le même. Une nouvelle mise en page qui n'entre dans aucun des huit ne se crée pas : on en remplace un.
- **Changer de fond, c'est changer de sujet.** Alterner les fonds (sombre, clair, coloré) et les largeurs (pleine, encartée, étroite). Une seule bande saturée pleine largeur par page.
- **Une signalétique = un sens.** Les numéros ne servent qu'aux étapes dans un ordre imposé. Les couleurs de ligne distinguent des options, elles ne classent pas.
- **Un dispositif utilisé une seule fois n'est pas un dispositif.** Chiffre-vedette isolé, pastille unique, frise de trois points : il devient un motif, ou il disparaît.
- **Les micro-étiquettes portent les métadonnées** (durée, public, financement, contrat, délai). Elles remplacent les phrases qui les racontaient.
- **Le secondaire passe en accordéon**, deux niveaux de titre au plus par section, une idée par section.

**Ce qui reste propre à la page Pros :** le mot « S'engager » en chevauchement (un seul grand mot de fin par page, sinon le procédé s'use), le dépliage des étapes POEI, la bande de l'écosystème telle quelle. Ailleurs, la bande sert à autre chose (statuts sur l'accueil).

**Les trois pages qui y gagneraient le plus :**
1. **Pages projet** (`ProjetPage.jsx`, cinq pages). L'ordre fixe de neuf blocs produit exactement la monotonie constatée ici, multipliée par cinq. Il faut garder l'ordre mais imposer l'alternance des archétypes dans le gabarit.
2. **Insertion.** Même confusion qu'entre options et étapes : les parcours au choix côtoient des déroulés. Les lignes typées conviennent aux parcours, et le déroulé se replie sous chaque ligne.
3. **L'Association.** C'est la page la plus longue : frise, équipe, valeurs, édito et partenaires s'enchaînent sur des fonds proches. Elle gagnerait à alterner les températures, à replier les valeurs en accordéon et à couper le texte d'au moins 30 %.

## 2. Arborescence

Aujourd'hui : **Insertion** (Orienter une personne, L'Académie Festin) · **Professionnels** (Former et recruter, Nos formations pro, Le programme Restaure) · **Nos projets** · **L'association**. S'y ajoutent Impact, Actualités, Contact et `#/formations` qui mène à l'Académie. Le problème : des pages rangées à deux endroits (l'Académie sous Insertion alors que les formations pro y sont aussi ; Restaure sous Professionnels et sous Nos projets ; « Nos formations pro » qui n'est qu'un filtre de l'Académie).

**Option A : trois entrées par public.** « Orienter une personne » · « Professionnels » · « Festin » (projets, association, impact et actualités réunis).
- Avantage : chaque visiteur se reconnaît en un clic, et le menu est le plus court possible.
- Contrepartie : les projets perdent leur entrée directe. Des Étoiles et des Femmes, le nom le plus connu, recule d'un niveau. L'entrée « Festin » devient un fourre-tout à qui il faudra une bonne page d'accueil.

**Option B : quatre entrées, zéro doublon.** On garde Insertion · Professionnels · Nos projets · L'association, mais chaque page n'a qu'une adresse dans le menu. L'Académie sort des sous-menus et devient une entrée « Formations », commune aux deux publics. Restaure reste dans Nos projets seulement. « Nos formations pro » disparaît au profit du filtre de la page Formations. Les sous-menus tombent à zéro ou une entrée.
- Avantage : peu de rupture avec l'existant, et chaque chose a une seule place.
- Contrepartie : cinq entrées au lieu de quatre, et les professionnels ont un clic de plus pour arriver aux formations pro filtrées. Le lien depuis la page Pros compense.

**Recommandation : B.** Ce qui complique la navigation aujourd'hui, ce sont les doublons plus que le nombre d'entrées. B les supprime sans cacher les projets, qui sont la preuve de ce que fait Festin. A mérite d'être reconsidérée si les mesures d'audience montrent que les visiteurs arrivent surtout par leur profil.

Rien n'est implémenté : à trancher.

## 3. Essayé puis annulé le 30/09/2026 (branche `maquette-pros`)

> **Annulé à la demande de l'utilisatrice** : on ne garde que la page Professionnels. L'arborescence, les pages projet, Insertion et Association sont revenues à leur état antérieur, à deux exceptions près, conservées : dans la frise de l'Association, les délégations de service public (2024) et la sous-traitance du Greta (2025) sont retirées. Ce qui suit décrit l'essai, pour mémoire.

**Arborescence : option B appliquée.** Le menu a maintenant cinq entrées : Insertion · Professionnels · Formations · Nos projets · L'association.
- Chaque page n'a qu'une place.
- « Nos formations pro » disparaît : c'est le filtre de la page Formations.
- Le programme Restaure n'est plus que dans Nos projets.
- La pastille tient de 1000 à 1440 px.
- Dans le pied de page, les trois rubriques sans sous-pages sont réunies dans une colonne.

**Les archétypes deviennent des briques communes**, dans `components/Archetypes.jsx` et `styles/archetypes.css`. La page Pros les utilise sans changement visible.

**Pages projet** (le gabarit, donc les cinq pages) :
- **Parcours** : la frise devient un bloc encarté, fond teinté entre deux marges blanches.
- **Témoignages** : ils passent sur fond sombre (carte flottante).
- **Programme Restaure** : ses formations sont présentées comme sur la page Pros (bloc teal avec accordéon) au lieu d'une deuxième grille de cartes.
- **« Les autres projets »** : ce sont maintenant des lignes typées, une par mission.
- **Numéros des missions** (01 / 02 / 03) : je les ai retirés partout. Ce sont des options, pas des étapes.

Enchaînement de Des Étoiles et des Femmes : hero · split · bloc encarté · split · carte sombre · split or · grille · bande · lignes. Deux splits ne se suivent jamais.

**Insertion : 614 → 428 mots (−30 %).**
- **Parcours** : ils sont en lignes typées (Pour qui, Pour entrer), avec « Plus d'informations », « La page du projet » et les étapes dépliables.
- **Ordre** : lignes · calendrier encarté · accompagnement · appel.
- Supprimé, à contester :
  - la FAQ entière. Ses cinq réponses redisaient les parcours, la gratuité, l'accompagnement et le calendrier, et la phrase sur les dates est passée dans le chapeau du calendrier ;
  - le chapeau « Vous cherchez pour vous-même… » ;
  - la bande « Toute l'année, un suivi individuel » de la frise, qui doublait le bloc accompagnement ;
  - la pastille « Gratuit » de la première étape ;
  - la fin de la phrase sur Les Beaux Mets (« on y réserve une table, et les restaurants peuvent y recruter un ancien commis »), qui reste sur sa page ;
  - dans l'appel, « puis nous vous invitons à une réunion d'information ».
- Raccourcis : les textes des six étapes du calendrier.
- La Table de Cana n'a pas d'étapes dépliables : son parcours n'en compte que deux, déjà dites dans la ligne.

**Association : 618 → 430 mots (−30 %).** Mesure faite sans les cadres « [PHOTO MANQUANTE] », qui disparaîtront à la mise en ligne.
- **Composition** : hero sombre · split crème · frise sombre · valeurs en bloc teal avec accordéon, sans numéros · équipe crème · édito et partenaires sur blanc.
- Supprimé, à contester :
  - **dans l'édito, le deuxième paragraphe** (« La construction collective n'est pas un coût, c'est un levier… »). C'est un extrait : aucun mot n'est changé, mais un paragraphe signé de la direction en moins. À valider par elle.
  - dans la frise, deux compléments : « Délégations de service public du ministère du Travail en Île-de-France et Hauts-de-France » (2024) et « Festin devient sous-traitant du Greta, Région Sud » (2025) ;
  - le rappel du statut dans la valeur « Non-lucrativité », déjà présent dans le bloc d'ouverture ;
  - « Aucun projet Festin ne se fait seul » (valeur Collectif) ;
  - la phrase sur le chef et le maître d'hôtel (valeur Excellence) ;
  - le nom du pôle répété sur chaque carte de l'équipe, déjà porté par l'intercalaire du pôle.
- Raccourcis :
  - l'ouverture : la date de 1993 et La Table de Cana restent dans la frise ;
  - les textes de huit jalons.

**Contrôles** :
- axe (WCAG 2.1 AA) sans violation sur toutes les pages, après correction du contraste des initiales dans les témoignages sombres ;
- aucun débordement horizontal à 360, 768, 1024, 1440 et 1920 px ;
- dépliages et accordéons vérifiés au clavier (`aria-expanded`, `hidden`).

Captures mises à jour : `captures/insertion-*.jpg`, `about-*.jpg`, `des-etoiles-et-des-femmes-*.jpg`.

**Reste à faire :**
- **Académie Festin** : elle garde encore une composition uniforme.
- **Accueil** : il n'a pas été repris, parce qu'il est validé.
- **Règle des deux composants horizontaux** : la page Des Étoiles et des Femmes a une frise épinglée, un carrousel de témoignages et une galerie, soit trois composants horizontaux interactifs. C'est un de trop selon la charte ; c'était déjà le cas avant.
