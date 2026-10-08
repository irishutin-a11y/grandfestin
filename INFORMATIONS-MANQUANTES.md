# Informations manquantes pour la version finale (08/10/2026)

Relevé fait dans le code (repères `[À COMPLÉTER]`, cadres vides, données à `null`), dans `VISUELS-A-FOURNIR.md`, dans le journal `copywriting/06-journal-des-changements.md` et dans les échanges du 07/10. Formats des visuels : voir `VISUELS-A-FOURNIR.md`.

## 1. Bloquant : un trou se verrait sur le site

### Textes et chiffres
| Page | Endroit | Il manque |
|---|---|---|
| Fiche Tournesol | Chiffres et bilan (2 endroits) | L'année de la promotion du taux « 86 % d'insertion un an après » |
| Projets et formations, « La formation, un moyen » | Bloc « Un secteur qui recrute » | L'année de l'enquête Besoins en main-d'œuvre (France Travail) et la date du relevé « 500+ offres actives à Marseille » |
| La Table de Cana Marseille, Nos tables | Bloc « Le traiteur » | Types de prestations, nombre de convives possible, délai de commande, zone de livraison |
| L'insertion | Bloc prescripteurs, carte La Table de Cana Marseille | Les conditions d'entrée |
| La Table de Cana Marseille | Témoignages | La citation de Lassana, mot pour mot (sinon la carte est retirée) |
| Des Étoiles et des Femmes | Témoignages | La citation de Julia Sedefdjian (sinon la carte est retirée) |

### Portraits de l'équipe (Qui sommes-nous)
- Cadre vide : Marie Plé, Matthieu Donsimoni, Karima Hellou, Lucie Gueydon, Nissa Boudhabhay, Tom Louis Teboul.
- Petit médaillon seulement : Camille Lafon, Boris Ruel. Gouvernance sans photo : Gaëlle de Carmantrand.

### Logos en haute définition (espace presse, à télécharger)
Festin (couleur, blanc, jaune), Des Étoiles et des Femmes, Les Beaux Mets, La Table de Cana Marseille, le programme Restaure. Les fichiers actuels font environ 150 px.

### Mentions légales
- Directeur ou directrice de la publication : le site indique Iris Hutin. Pour une association, c'est en principe le représentant légal (le président). À faire valider par la direction.
- Adresse postale complète de l'hébergeur (Vercel Inc.).
- Crédits photo : le nom du ou de la photographe pour chaque photo (seules quelques photos de Caroline Dutrey et du Refugee Food Festival sont créditées).
- Droits à l'image : accords des personnes photographiées, en particulier les personnes détenues (Les Beaux Mets) et les personnes accompagnées.
- Données personnelles : une courte mention (le formulaire ouvre la messagerie, le questionnaire d'éligibilité n'envoie rien, pas de mesure d'audience).

## 2. À valider : faits contradictoires ou incertains
- Présentation « Totem » (Sadi Carnot) contre le site : 80 000 repas (La Table de Cana Marseille), « 35 ans » contre 1987, création de La Table de Cana en 1992 contre 1993, « 500 personnes formées » contre 441 personnes accompagnées en 2025, Restaure « mouvement » contre « programme ».
- Statut ESUS : quelles structures sont agréées (l'association seule, ou aussi les filiales) ?
- Andrée Rosier (Les Rosiers, Biarritz) figure parmi les chefs alors que l'antenne du Pays Basque a fermé.
- Accord des 13 chefs pour l'affichage de leur nom et de leur photo.
- Partenaires de la sphère (Qui sommes-nous) : liste à jour (l'UMIH en fait-elle partie ?) et autorisation d'afficher les logos.
- Logo de l'Académie Festin : validé ou non.

## 3. Améliore nettement une page
- Une photo par antenne de Des Étoiles et des Femmes (13), pour la liste au survol : aujourd'hui aucune.
- Douze photos de chefs pour la sphère (Julia Sedefdjian reçue).
- Photos Drive annoncées, pas encore reçues : Des Étoiles et des Femmes Marseille, remise de diplômes à Lille, Des Étoiles et des Femmes × Refugee Food Festival Lille, Refugee Food Festival Lille, Julia Sedefdjian (2), Grand Festin des 10 ans de Des Étoiles et des Femmes (3).
- Plats de la carte actuelle des Beaux Mets ; pièces traiteur de La Table de Cana Marseille.
- Logos des dix partenaires cités en texte.
- La nouvelle plaquette formation (PDF).
- Les originaux des portraits de l'équipe de La Table de Cana Marseille (ceux du site sont tirés de captures d'écran).
- Le contenu du formulaire de réservation des Beaux Mets (Airtable, bloqué par le réseau) : à copier-coller.

## 4. Complément
- Portraits de Jason, Oumar, Jean Claude et Pierre pour les témoignages, avec accord écrit (sinon les initiales restent).

## 5. Décisions à prendre avant la mise en ligne
- **Le site est déjà public** sur www.grandfestin.com et ouvert aux moteurs de recherche, avec les repères `[À COMPLÉTER]` visibles. Soit on bloque l'indexation jusqu'au lancement, soit on masque les repères (`FESTIN_SHOW_PLACEHOLDERS = false`).
- **Référencement** : les pages ont des adresses en `#/…`, que Google traite comme une seule page (le plan du site n'en déclare que deux). Passer à de vraies adresses (`/insertion`, `/restauration`…) est un chantier technique à décider.
- **Formulaire de contact** : il ouvre la messagerie de la personne, le site n'envoie rien. Le garder, ou brancher un service d'envoi ?
- **Adresses** : tout arrive sur contact@ sauf mécénat et partenariats. Faut-il des adresses dédiées (traiteur, privatisation, presse, accessibilité et handicap) ?
- **Hébergement** : l'offre gratuite de Vercel plafonne à 100 déploiements par jour (atteint le 07/10). Offre payante ou envois regroupés.
