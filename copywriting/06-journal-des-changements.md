# 06 — Journal des changements (implémentation du 21 septembre 2026)

Tout est commité sur la branche `feature/about-page-redesign`, sans push. Aucun nouveau composant ni nouvelle page : les ajouts sont des sections dans des pages existantes (composant d'appoint `ProjetExtra` dans `Sections.jsx`, styles `.pxs*` dans `styles.css`).

## Textes (tout le site)
- Voix « La conviction » avec preuves de terrain, vouvoiement, « nous » de l'association, titres en capitales (règle globale `.h1 / .h2` dans `styles.css` et titres des cinq fiches projet).
- Retirés : « depuis 1992 », « 35 ans », « levier », « vecteur », « éloignées de l'emploi » dans les textes adressés, « Deux publics, une même conviction », « Trois convictions… », « Former autrement, certifier vraiment », « Ne pas former un métier, accompagner… ».
- Remplacés : « 35 ans » par « Plus de trente ans d'insertion par la cuisine » ; « Titre Professionnel » par « titre à finalité professionnelle » ; « Pôle emploi » par « France Travail » ; « Le Bouillon Bleu » retiré du mega menu.
- Pages retravaillées : accueil (`data.js` → `home`), About, accompagnement (insertion, professionnels), formations, Académie, Impact, Actualités, Contact, Sadi Carnot, pied de page, bouton flottant, fiches des cinq projets.

## Faits et légal
- SIRET `379 756 026 00074`, NDA `93132168513`, RNA `W133012740` ; Qualiopi rattaché à l'Académie Festin ; ESUS pour l'association (pied de page, bloc légal statique, `mentions-legales.html`). Directeur de la publication : Iris Hutin, chargée de projet Communication.
- Chiffres : 441 / 83 % / 14 (source unique `FESTIN_DATA.stats`), 1 200+ femmes, 13 brigades, 550 convives, Beaux Mets 48 et +25 %, plus de 15 000 repas d'aide alimentaire. Tournesol : 5 mois, titre à finalité professionnelle, 86 % d'insertion un an après.
- Équipe : Camille Lafon (direction du restaurant), Armand Hurault (directeur général), Marc Balthazard et Nissa Boudhabhay ajoutés. Section Gouvernance (bureau) avec avatars.

## Enrichissements
- Impact : « Ce qui a marqué l'année » (9 faits), compteur animé, résumés à jour.
- Beaux Mets : onglets « Hors les murs » et « Les masterclass » (six chefs), citation de Valentin Majan, section « La brigade ».
- La Table de Cana : solidarité alimentaire, outils d'accompagnement, deux partenaires.
- Des Étoiles et des Femmes : section « Des chefs qui forment » (12 chefs, marraine), témoignage de Najat, prochaine session.
- Tournesol : bilan de la promotion 2025-2026, trois témoignages, prochaine session, galerie Refugee Food Festival 2026 avec crédits.
- Restaure : cinq groupes de travail et leurs pilotes, gouvernance à quatre structures, Toast.
- Page restaurateurs : parcours POEI en trois étapes, Book de l'emploi envoyé sur demande.
- Actualités : section Presse (50 et 100 mots, chiffres clés, contact, logos).
- About : jalons 1993 et 2025 (Tournesol), partenaires France Travail et Yes We Camp.

## Technique
- KoHo en italique et semi-bold en local (`typos/`), plus aucune requête Google Fonts.
- Photos web-optimisées : 30 images de plus de 600 Ko ont une version 800 et 1 600 px (`images/web/`), appliquée par un `srcset` automatique dans `index.html`. Les originaux restent le repli.
- Référencement : titre et description par page, Open Graph, données structurées « NGO », `robots.txt`, `sitemap.xml`. Lien d'évitement et `main` focalisable.

## Encore en `[XX]` ou à faire
- Portraits de l'équipe (13 cartes) et de Marc Balthazard, Nissa Boudhabhay, Virginie Leconte. Les originaux 3 : 4 ne sont pas fournis.
- Témoignages d'une entreprise partenaire et d'un financeur (accueil), témoignage de Julia Sedefdjian.
- Crédits photo : seuls ceux des photos du Refugee Food Festival sont affichés. Les autres photos n'ont pas de crédit.
- Marion Binachon et Fanny Bouvier (intitulés à donner).
- Non utilisés : la photo « directeurs-portrait » (identités non confirmées) et les originaux `101_12xx`.
- Non implémenté (décision) : audit des liens de presse, adresses réelles à la place du routeur par hash, kit de communication.
- À vérifier de ton côté : le titre visé par le parcours court (« Commis de cuisine » retenu dans les textes du catalogue ; la donnée `Cuisinier` subsiste peut-être dans des pages non ouvertes), l'accord des 12 chefs pour l'affichage de leurs noms, et le SIRET affiché en pied de page.
