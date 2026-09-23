# 08 — Journal de la reprise (23 septembre 2026)

Corrections des points relevés dans `07-contre-audit.md`. Branche `copywriting-reprise`, dans une copie séparée (`../Site_Festin_copywriting`), pour ne pas croiser la session design qui travaille sur `main`. Vérifié à l'écran (aperçu port 4502) : aucune erreur de console, et aucune formule interdite dans la voix du site.

## Décisions de la session
- Pas d'entrée dédiée aux prescripteurs ni aux partenaires institutionnels pour l'instant.
- « Demander un devis » accepté sur la fiche La Table de Cana.
- Mot de la direction conservé, signé par ses trois auteurs.

## Ce qui a changé

**Faits**
- Grand Festin : 14 brigades, plus de 600 convives, plus de 100 bénévoles, partout.
- 1987 expliqué : jalon « Création de l'association » en tête de la frise, et phrase d'ouverture de « Qui nous sommes ».
- La case « 1987, l'année de création » disparaît des chiffres : elle est remplacée par « 91 % de réussite aux diplômes en 2025 (Des Étoiles et des Femmes) ».
- Recrutement de Des Étoiles et des Femmes : « à partir de septembre » (dossier de passation), au lieu de « chaque année en mai ».
- Tournesol : rôle de chaque organisme (Estello Formation porte la formation avec Festin, cours au centre Corot Formation, AFC Groupe pour la technique, France Travail rémunère). « 86 % d'insertion un an après », formule de la source.
- Académie : « CAP cuisine, titre à finalité professionnelle de commis de cuisine, DCL » au lieu de « titres professionnels reconnus par l'État ».
- Les Beaux Mets : « +25 % de chiffre d'affaires » remplacé par « 119 personnes employées depuis l'ouverture » ; « 200 000 postes » (non sourcé) remplacé par le taux de récidive (ministère de la Justice) et l'enquête Besoins en main-d'œuvre de France Travail.
- Chiffres datés : « en 2025 » ajouté aux taux de sorties et aux vues de Restaure.
- Coquilles : Empl'itude, Éloi, « 17,6 % », « (2025) » en double.

**Correction de mon contre-audit.** Le 89 % de La Table de Cana n'était pas une erreur : le rapport de référence le donne pour 2025 (p. 28). Le 84 % est le chiffre de 2024. Le site garde 89 %, avec son année.

**Mot de la direction**
- Extraits remis **mot pour mot** : le site avait réécrit une phrase (« Un levier contre la dispersion… »). Les coupes sont signalées par « […] ».
- Retrait de la phrase « Les associations sont des acteurs structurants de notre modèle social » (discours sur le financement public, écarté par la décision n° 3).
- Signature : Jérôme Schatzman, Armand Hurault, Marine Vever.

**Ton**
- Plus de « Viser haut n'exclut pas » hors du mot de la direction.
- Titres en miroir remplacés, par exemple : « Où se former, en France », « Elles racontent leur parcours », « Qui fait quoi », « Un service ouvert au public », « Sortir de prison avec un métier ».
- Fragments en série remplacés par des phrases complètes, avec sujet et verbe.
- Jargon retiré : « gastronomie inclusive », « Révélateur / Pourvoyeur de talents », « vouloir / pouvoir », « Onboarding », « apéros inspirants », « sur mesure », « passerelle », « voit le jour ».
- « Éloignées de l'emploi » retiré de la voix du site. Il ne reste que dans la citation de la direction et dans un titre de presse.
- Répétitions réduites : « forme des femmes aux métiers de la cuisine », « suivi social complet », « autrement », « engagé », « tous rattachés à Festin ».
- Cases chiffres : elles ne contiennent plus que des résultats (« 0 € », « 100 % accompagnement inclus », « TFP », « 3 outils » et « 5 projets » retirés).
- « Nous » au lieu de « on » (« Qui nous sommes »).
- Triplet « Former / Accompagner / Transformer » retiré de l'accueil et du méga-menu ; il reste en titre d'About (décision A3).

**Appels à l'action**
- About : « Vous êtes restaurateur » mène à la page restaurateurs ; « Vous cherchez un métier » mène à la page Insertion (et plus seulement à Des Étoiles et des Femmes).
- Les Beaux Mets : « Faire un don » mène à HelloAsso.
- Carte « Explorer tout l'écosystème » : devient « L'association Festin → Lire notre histoire » (About).
- Formulaire de contact : motifs sans doublon (Recruter / Se former / Mécénat ou partenariat / Presse / Orienter une personne) ; plus d'abréviation de Des Étoiles et des Femmes.
- Contacts séparés : presse → `contact@` (Iris Hutin), mécénat → `partenariat@`.
- Impact : les quatre retombées médias pointaient vers « # ». Elles pointent désormais vers de vrais articles.
- Témoignages de l'accueil : la case « [Entreprise partenaire] » est retirée ; « [Financeur] » est remplacé par Christine de Longevialle (Solidarity AccorHotels, déjà présente dans `data.js`).

## Laissé à la session design (structure en cours)
- **Pages Insertion et Restaurateurs** : non touchées, elles sont en cours de restructuration. Je les réécrirai une fois la structure posée : calendrier (novembre pour les deux promotions 2026-2027), chiffre « 5 projets », date « Dès septembre 2026 » à remplacer par « Automne 2026 », argument POEI en tête, témoignage du chef Davin, bouton unique.
- **Boutons du hero de l'accueil** : aucun n'est affiché. Les libellés sont prêts dans `data.js` (`home.hero.ctas` : « Recruter avec Festin » → page restaurateurs, « Apprendre un métier » → page Insertion).
- **Quatre cases « Logo partenaire »** sur Les Beaux Mets : à remplir ou à retirer.

## À trancher
- **Verbatims Restaure** : deux ont été adoucis par rapport aux originaux du Drive (« Soit tu fermes ta gueule », « l'appeler connard »). La page disait « repris mot pour mot » ; elle dit maintenant « certains mots ont été adoucis ». Autre option : publier les originaux.
- « 400 000+ convives régalés » (La Table de Cana) : chiffre du rapport 2025, sans période. Je l'ai gardé dans les chiffres de la fiche, pas sur l'accueil.

## Dernière passe (après la fin du design)
- Fusion du design dans la branche. Trois conflits, tous réglés en gardant la structure du design : en-tête d'About sans sous-titre, textes « en 50/100 mots » retirés d'Actualités, fond sombre des groupes de travail de Restaure (avec le titre « Qui fait quoi »).
- **Page Insertion** réécrite :
  - titre « Apprendre un métier de cuisine, gratuitement » ;
  - calendrier fusionné en « Novembre — décembre : entrée en formation », avec les dates 2026 ;
  - « 5 projets » remplacé par « 91 % de réussite aux diplômes » ;
  - bouton « Vérifier mon éligibilité ».
- **Page Restaurateurs** réécrite :
  - titre « Recruter des commis formés, avec Festin », l'argument France Travail dès l'en-tête ;
  - « Automne 2026 » à la place de « Dès septembre 2026 » ;
  - témoignage du chef Davin placé à côté du bouton, qui porte une seule demande : « Demander le Book de l'emploi » ;
  - prix masqués sur les cartes de formation (ils restent sur les fiches du catalogue, règle A5).
- Les Beaux Mets : quatre cases « Logo partenaire » vides retirées, le logo du projet reste.
- Contrôle final sur 20 pages : il ne reste aucun tic interdit dans la voix du site. Les occurrences restantes sont des citations (mot de la direction, témoignages, verbatims) ou des titres de presse, à ne pas modifier.
