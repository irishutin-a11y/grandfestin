# Rapport : application de RETOURS-V2.md (06/10/2026)

Branche `claude/modest-rubin-fr5kof`, un commit par chantier, rien de poussé.

Contrôles finaux :
- 29 adresses parcourues : aucun lien mort, aucune erreur, un seul H1 par page.
- axe-core (WCAG 2.1 AA) : aucune violation, à 360 et à 1440 px.
- Aucun défilement horizontal, de 360 à 1920 px.

## 1. Ce qui est fait

- **Logo de l'Académie** : retiré partout (frise et missions de l'accueil, espace presse). Aucun cadre ne le remplace.
- **La Table de Cana Marseille** :
  - le nom complet est utilisé pour le projet de Festin (titre de la page, frise, Nos lieux, Impact, rôles, liens) ;
  - les Tables de Cana qui portent des antennes ne changent pas, pas plus que les témoignages ;
  - sous la liste des antennes, une phrase précise que les structures porteuses sont des partenaires du dispositif, et non des entités de Festin.
- **Heros** :
  - toutes les pages qui ont une photo passent en bannière pleine image, sur le modèle de la page Pros ;
  - le voile et l'étiquette gardent le code couleur (teal, or, teal profond) ;
  - les fiches de formation gardent leur aplat ;
  - Qui sommes-nous : logo Festin, sans appel à l'action ;
  - Nos lieux et projets : la photo des brigades du Grand Festin ;
  - Actualités : l'affiche Toast ;
  - l'Académie a aussi sa bannière.
- **Carrousels de témoignages** :
  - un témoignage avance toutes les 8 s ;
  - le défilement se suspend au survol, au toucher et au focus ;
  - une flèche ou le bouton Pause l'arrête pour de bon ;
  - en mouvement réduit, rien ne défile ;
  - Restaure, avec son seul témoignage, reste statique.
- **Accueil** : la section « Ils en ont parlé » est retirée.
- **Se former** : la galerie a des flèches précédent et suivant, et un compteur. Un clic arrête le défilement.
- **Pros** :
  - « Demander une formation » se place sous « … avec d'autres établissements. », dans la colonne de gauche, et mène à `#/contact/former` ;
  - bandes or : le bouton Pause n'est plus visible. Le survol arrête la bande, comme le focus clavier. Le bouton reste accessible au clavier et s'affiche quand il reçoit le focus ;
  - sur mobile, les bandes deviennent une liste fixe (réponse A à la question 1).
- **Nos lieux** :
  - les antennes sont retirées ;
  - Sadi Carnot passe en dernier, sous « À venir » ;
  - nouvelle accroche : « Découvrez nos lieux ouverts au public. » ;
  - le menu est mis à jour.
- **Des Étoiles et des Femmes** : la carte est retirée.
- **Fiche Des Étoiles et des Femmes** : le titre est maintenant seul. « Formation diplômante » reste au-dessus, et deux pastilles CAP et TFP s'affichent dessous.
- **Les Beaux Mets** :
  - nouvelle photo de hero : des convives à table ;
  - « Privatiser » devient un vrai bouton à côté de « Réserver » ;
  - nouveau bloc « Venir déjeuner aux Beaux Mets », juste après « en bref » : trois photos de plats et de la salle, des infos pratiques et deux grands boutons ;
  - la page tient donc les deux choses : « en bref » explique le projet, « Venir déjeuner » donne envie d'y manger.
- **La Table de Cana Marseille** : même traitement avec « Le traiteur de vos événements » (devis traiteur d'abord, commande en ligne ensuite).
- **Espace presse** : les logos des quatre projets qui en ont un sont téléchargeables.
- **Adresses** (votre message du jour) :
  - contact@grandfestin.com pour tout ;
  - partenariat@grandfestin.com pour le mécénat et les partenariats ;
  - les mentions légales et les données structurées sont à jour.
- **Documentation** : `CLAUDE.md` est à jour, les versions des fichiers sont relevées et `VISUELS-A-FOURNIR.md` est créé.

## 2. Ce qui reste ouvert

- **Infos pratiques des Beaux Mets** (horaires, prix, accès à la prison) :
  - elles sont en `[À COMPLÉTER]` ;
  - le formulaire Airtable ne s'ouvre pas d'ici, car le réseau bloque airtable.com ;
  - copiez-collez son contenu ou exportez-le en CSV.
- **Infos traiteur de La Table de Cana Marseille** (prestations, capacité, délai, livraison) : elles sont en `[À COMPLÉTER]`, comme vous l'avez demandé.
- **Drive** : la recherche de fichiers n'est pas activée sur le connecteur Google Drive de cette session, donc je n'ai pas pu y chercher les logos HD. Les logos du site font 138 à 194 px, ce qui est insuffisant pour la presse.
- **Ce qui reste du rapport précédent** :
  - année du taux de récidive de 42 % ;
  - année des chiffres France Travail ;
  - conditions d'entrée à La Table de Cana Marseille.

## 3. Ce que vous devez fournir

Tout est dans `VISUELS-A-FOURNIR.md` : un tableau avec la page, l'endroit, le sujet, le format et le cadrage.

- **Priorité 1** :
  - 8 portraits de l'équipe ;
  - 2 photos (réunion d'information, exposition photo) ;
  - les logos HD de Festin et des quatre projets.
- **Priorité 2** :
  - les plats des Beaux Mets ;
  - le buffet traiteur ;
  - Tournesol à Marseille ;
  - 13 photos d'antennes ;
  - 13 chefs pour la sphère (liste nominative, carré 1:1) ;
  - 10 logos de partenaires.
- **Priorité 3** : les portraits des personnes qui témoignent et 16 logos de médias.

## 4. Ce sur quoi je ne suis pas d'accord, ou ce qu'il faut vérifier

1. **Des bannières photo partout affaiblissent le code couleur.** Teal, or et teal profond ne se lisent plus que dans le voile et l'étiquette. Les heros se ressemblent tous, et c'est plus lourd à charger sur mobile. J'ai appliqué la décision. Si le code couleur doit rester un repère pour les personnes, il faudra l'appuyer ailleurs (bandeau sous le hero, couleur du premier bloc).
2. **L'affiche Toast en tête d'Actualités.** « Violences en cuisine : faire tomber l'impunité » donne un ton grave à la page qui présente aussi le Grand Festin et les masterclass. Une photo du Grand Festin la représenterait mieux. Elle est déjà sur Nos lieux et projets, mais vous en avez peut-être d'autres.
3. **« Découvrez nos lieux ouverts au public ».** Mourepiane est un traiteur et une cuisine collective : on n'y entre pas comme dans un restaurant. Sadi Carnot n'est pas ouvert. « Découvrez nos lieux » serait exact.
4. **Andrée Rosier (Les Rosiers, Biarritz)** figure parmi les chefs du réseau alors que l'antenne du Pays Basque a fermé. À confirmer avant de demander sa photo.
5. **Le bouton Pause caché sur les bandes or.** C'est conforme, puisque le bouton reste au clavier, s'affiche au focus, et que les bandes sont fixes sur écran tactile. Mais une personne qui navigue à la souris et ne peut pas maintenir le survol n'a pas de bouton visible. Le risque est faible, parce que la bande s'arrête dès qu'on la survole.
6. **Rien n'est poussé.** Dites « main » pour mettre en ligne.

## 5. Propositions (non implémentées, à valider)

- **Le menu du moment des Beaux Mets** dans « Venir déjeuner » (texte ou PDF) : rien ne donne plus envie de réserver qu'une carte.
- **Un bouton « Réserver » collant en bas d'écran sur mobile**, sur la page des Beaux Mets seulement : l'action principale resterait toujours à portée de pouce.
- **Une image de partage par page** (Open Graph) : un lien partagé sur LinkedIn ou WhatsApp montrerait la bonne photo et le bon titre, au lieu du logo générique.
- **Une page « Accessibilité »** (déclaration, contact de la référente handicap déjà prévu au formulaire) : elle rendrait visible l'engagement d'intérêt général auprès des institutions.
- **Les horaires et le prix moyen sur la carte « Prison des Baumettes » de Nos lieux**, dès qu'ils sont connus : la page servirait vraiment à décider d'y aller.
