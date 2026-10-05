# Rapport : application de RETOURS-AUDIT.md (05/10/2026)

Branche `claude/modest-rubin-fr5kof` (partie de `maquette-pros` = `main`), un commit par chantier, rien de poussé. Contrôles finaux :
- 29 adresses parcourues, aucun lien mort, aucune ressource introuvable, un seul H1 par page ;
- axe-core (WCAG 2.1 AA) sans violation à 360 et 1440 px ;
- aucun défilement horizontal de 360 à 1920 px ;
- aucune requête externe (Lucide et Lenis sont maintenant dans `vendor/`).

Captures à jour : `captures/<page>-360.jpg` et `-1440.jpg`.

## 1. Ce qui est corrigé

**Accueil**
- La porte teal devient « Apprendre un métier de cuisine ».
- Nouvelle section « Ils et elles racontent » : quatre paroles déjà publiées, mot pour mot.
- Tarifs, catalogue et édito retirés ; la page passe de 17,8 à 13,3 écrans sur mobile.
- Frise : l'entrée 2026 est reformulée, Tournesol en est retiré.
- En bas de page, réserver et commander sont séparés du soutien.

**Vocabulaire**
- « Dispositif » partout pour Des Étoiles et des Femmes.
- « Formations diplômantes » : plus de CAP ni de TFP dans le discours.
- 155 h de stage pour Tournesol.
- Une année à côté de chaque taux.
- Intitulé « sorties positives » harmonisé (La Table de Cana, Les Beaux Mets).
- « Départ devient Festin en 2022 » dit une fois, sur Qui sommes-nous.

**Formations**
- Une seule fiche pour Des Étoiles et des Femmes ; `#/formations/tfp` et `#/formations/cap` y redirigent.
- Tournesol n'a plus de page projet : sa fiche porte son bilan et ses témoignages, et `#/projets/tournesol` y redirige.
- Académie :
  - les formations pro reviennent au catalogue, « portées par le programme Restaure » ;
  - un filtre vide n'est plus jamais affiché ;
  - Tournesol est au même rang que les autres formations ;
  - le bloc des projets en fin de page est retiré.
- Fiches gratuites : « Nous contacter » au lieu de « Demander un devis ».

**Page Pros**
- La bande des projets est cliquable.
- Ajout d'un lien vers Les Beaux Mets.
- Fin de page : « Devenir partenaire Festin ». Je l'ai préféré à « Se former », parce que la section parle de mécénat et du Grand Festin.
- Chaque action arrive sur le formulaire avec le bon motif présélectionné.

**Navigation (option A)**
- Rubriques renommées : « Se former », « Nos lieux et projets » (les cinq projets).
- Bloc prescripteur en tête d'Insertion (question 1).
- « S'engager avec Festin » en fin d'Impact, et « Soutenir Festin » dans la pastille et le menu (question 2).

**Coupes et répétitions**
- Toutes les coupes du tableau sont faites, dont la frise d'Insertion.
- Un titre de portes propre à chaque page.
- L'édito n'est plus cité qu'une fois.
- 83 % et 91 % ne restent que sur l'accueil, Impact et la page du dispositif.
- Les verbatims de Restaure sont remontés juste après « en bref ».

**Design**
- Code couleur des heros (question 6).
- H1 et H2 passent à 40 et 25 px sur mobile.
- Aucun texte sous 12 px.
- Contrastes corrigés.
- Repli « Copier le message » quand la messagerie ne s'ouvre pas.
- Titres en capitales.
- Trois procédés de la page Pros diffusés :
  - micro-étiquettes ;
  - une action par carte ;
  - bande or cliquable en fin de Restaure et de l'Académie.

**Adresses**
- Une table par usage : `FESTIN_DATA.emails`.
- Toutes les adresses sont contact@desetoilesetdesfemmes.com pour l'instant (question 3).

**Charte**
- La règle des deux composants horizontaux est retirée de `CLAUDE.md`.

**Une erreur de mon audit, corrigée ici**
- Les carrousels de témoignages ne sont pas « à un seul élément » : Des Étoiles et des Femmes en a 5, Les Beaux Mets 3, La Table de Cana 3, Tournesol 3.
- Seul Restaure n'en a qu'un. Il s'affiche maintenant sans carrousel.

## 2. Ce qui reste ouvert

- Les `[À COMPLÉTER]` visibles :
  - conditions d'entrée à La Table de Cana Marseille ;
  - année du taux de 86 % de Tournesol ;
  - année des chiffres France Travail (enquête BMO, relevé des offres) ;
  - année du taux de récidive de 42 %.
- Le calendrier : la frise d'Insertion est retirée ; le calendrier réel reste à intégrer quand vous l'aurez.
- Les photos envoyées le 05/10 : en attente de votre validation (voir la conversation).

## 3. Ce que vous devez fournir

- Les photos de Tournesol à Marseille.
- Le calendrier réel 2026-2027 des formations diplômantes.
- Les conditions d'entrée à La Table de Cana Marseille.
- La source et la date exactes du taux de 86 % de Tournesol.
- La source de « premier restaurant en prison ouvert au public en France ».
- Les adresses e-mail par usage (une ligne à changer chacune dans `FESTIN_DATA.emails`).
- Des témoignages courts de personnes accompagnées pour l'accueil, avec accord écrit.
- Les 8 portraits manquants, les logos partenaires, les photos du Grand Festin.

## 4. Ce sur quoi je ne suis pas d'accord, ou ce qu'il faut vérifier

1. **« Sorties positives » pour La Table de Cana.** Dans l'insertion par l'activité économique, « sortie dynamique » est un indicateur officiel plus large que « sortie positive ». J'ai harmonisé l'intitulé comme demandé, mais le rapport 2025 devrait dire lequel des deux mesure 89 %.
2. **Une seule adresse pour tout le site.** Le mécénat, qui allait à partenariat@grandfestin.com, et les demandes pour Les Beaux Mets et La Table de Cana arrivent maintenant dans la boîte du dispositif Des Étoiles et des Femmes. C'est acceptable en attendant, à corriger avant la mise en ligne.
3. **Le hero de la page Pros** garde sa photo plein cadre, avec des accents or : c'est l'archétype validé le 30/09. Le « or » de la question 6 y est donc moins marqué qu'ailleurs.
4. **« Porter une antenne »** (bloc S'engager) suppose que Festin accueille de nouvelles antennes : à confirmer par la direction.
5. **Rien n'est poussé** (`CLAUDE.md` : pas de push sans demande). Dites « pousse » pour obtenir l'aperçu Vercel de la branche.
