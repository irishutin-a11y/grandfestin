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
