# Retours site — version finale

> Deuxième série de retours, après `RETOURS-AUDIT.md`. Ce document fait
> autorité sur les points qu'il traite.
>
> **Avant de commencer : lis la partie « Questions » en fin de document et
> pose-moi les tiennes en un seul bloc.** Tout ce qui est tranché ici, tu
> l'enchaînes sans attendre.

---

## 1. Global — sur tout le site

- **Supprimer le logo de l'Académie Festin partout.** Il n'est pas validé.
  On le retirera du site tant qu'il ne l'est pas. Ne le remplace pas par un
  placeholder : la mention textuelle suffit.

- **« La Table de Cana Marseille » — attention, il y a deux choses
  différentes sur le site, et il ne faut jamais les confondre :**

  1. **La Table de Cana Marseille** est le projet créé par Festin. Quand on
     parle de ce projet, on écrit toujours **« La Table de Cana Marseille »
     en entier**, jamais « La Table de Cana » seul. C'est le cas sur la frise
     de l'accueil, sur sa page projet, sur Nos lieux, sur Impact.

  2. **Les autres Tables de Cana** sont des structures distinctes, dans
     d'autres villes, qui portent certaines antennes de Des Étoiles et des
     Femmes (Montpellier, Bordeaux, Paris, Hauts-de-Seine,
     Seine-Saint-Denis). **Elles ne sont pas Marseille, et elles
     n'appartiennent pas à Festin.** Ne leur ajoute jamais « Marseille », et
     ne les présente jamais comme un projet de Festin.

  **Reprends chaque occurrence du site en vérifiant laquelle des deux est
  désignée.** Et ajoute, dans la liste des antennes de Des Étoiles et des
  Femmes, une phrase courte qui dit que les structures porteuses citées sont
  des partenaires et non des entités de Festin. C'est le point qui faisait
  décrocher le partenaire opérationnel dans l'audit.

- **Headers : tous les headers du site adoptent le modèle de la page
  Professionnels** — bannière pleine image.
  Exception : les pages formation gardent leur couleur, qui sert à
  distinguer le pro de l'insertion.

- **Carrousels de témoignages : défilement automatique**, sur tout le site.

---

## 2. Page d'accueil

- Supprimer la section **« Ils en ont parlé »**.
- Vérifier la frise : « La Table de Cana Marseille » en entier (voir §1).

---

## 3. Page « Se former »

- **Ajouter des contrôles de navigation dans la galerie** pour passer d'une
  image à l'autre. Aujourd'hui il n'y en a pas.

---

## 4. Page Professionnels

- **Déplacer le bouton « Demander une formation »** : il doit venir après le
  texte qui parle des « autres établissements ».

- **Bandes jaunes défilantes : supprimer le bouton Pause.**
  L'arrêt se fait au survol de la souris : la bande s'arrête quand le curseur
  passe dessus, et repart quand il sort.
  → Voir la question 1 : le survol n'existe pas au doigt, il faut décider ce
  qui se passe sur mobile.

---

## 5. Page « Nos lieux »

- **Sadi Carnot passe en dernier**, avec le sous-titre **« À venir »**.

- **Remplacer l'accroche** « De Marseille aux 13 villes du dispositif Des
  Étoiles et des Femmes. » par quelque chose de plus générique, du type
  **« Découvrez nos lieux ouverts au public »**.

- **Supprimer « le reste de la France »** dans le bloc Des Étoiles et des
  Femmes. Ce sont des antennes, pas des lieux ouverts au public : elles n'ont
  rien à faire sur cette page.

---

## 6. Page « Qui sommes-nous »

- **Mettre le logo Festin dans le header** et **supprimer l'appel à l'action
  du header**.
- **Bannière pleine image**, sur le modèle de la page Professionnels.

---

## 7. Page Des Étoiles et des Femmes

- **Supprimer l'image de carte** pour le moment.
- **La sphère des chefs** : fais-moi la liste précise des photos de chefs que
  je dois te fournir — un nom par ligne, avec le format et le cadrage
  attendus.

---

## 8. Page Les Beaux Mets

C'est un restaurant ouvert au public, et ça ne se voit pas assez.

- **Rendre les appels à l'action « Réserver » et « Privatiser » nettement
  plus visibles et plus engageants.**
- La page doit tenir deux choses : **expliquer le projet**, et **donner envie
  d'y manger**. Aujourd'hui elle ne fait que la première. Structure-la pour
  que les deux existent clairement.
- **Changer la photo du header.**

**Même traitement pour l'activité traiteur de La Table de Cana Marseille** :
on doit comprendre qu'on peut faire appel à eux, et avoir envie de le faire.

---

## 9. Page formation Des Étoiles et des Femmes

- **Supprimer « formation diplômante » du titre.** On garde la mention
  au-dessus du titre.
- **Ajouter en dessous deux petites pastilles : « CAP » et « TFP ».**

---

## 10. Espace presse et placeholders

- **Espace presse : ajouter tous les logos des projets.** Va les chercher
  directement dans le Drive si tu y as accès. Si tu n'as pas d'accès Drive
  dans cette session, dis-le-moi et liste ce qu'il te faut, je te les donne.

- **Fais-moi la liste complète de tous les logos et de toutes les photos que
  je dois te fournir** pour remplir l'intégralité des placeholders du site.
  Format attendu : un tableau, une ligne par visuel, avec la page, l'endroit,
  le sujet, le format et le cadrage. Je dois pouvoir aller les chercher sur
  le Drive sans rouvrir le code.

---

## 11. Questions à me poser avant de commencer

En un seul bloc, fermées ou à choix (A / B / C) quand c'est possible.

1. **Bandes défilantes sur mobile.** Le survol n'existe pas au doigt, et une
   bande qui défile sans moyen de l'arrêter pose un problème d'accessibilité
   (WCAG 2.2.2 : tout mouvement de plus de cinq secondes doit pouvoir être
   arrêté). Propose-moi une solution qui garde le bouton Pause hors de vue
   sur desktop tout en restant conforme — et dis-moi ce que tu recommandes.

2. **Carrousels à défilement automatique.** Même règle d'accessibilité. Et
   plusieurs carrousels du site ne contiennent qu'un seul témoignage : faire
   défiler automatiquement un élément unique ne produit rien. Dis-moi lesquels
   sont concernés et ce que tu proposes pour ceux-là.

3. **« Demander une formation » sur la page Professionnels.** Confirme-moi
   l'emplacement exact que tu as retenu, et vers quoi pointe le bouton.

4. Toute autre question dont la réponse changerait ce que tu construis —
   quatre maximum, et seulement si elles sont bloquantes.

---

## 12. Tes propositions

Si tu vois des améliorations que je n'ai pas demandées et qui servent
l'objectif — un site compréhensible par toutes nos cibles, où la mission
sociale est visible — propose-les. Court, une ligne chacune, avec ce que ça
change. Tu ne les implémentes pas sans mon accord.

---

## 13. Méthode

- Branche dédiée, commits atomiques, un par chantier.
- Zéro information inventée. Tout élément manquant devient `[À COMPLÉTER]`
  et remonte dans le rapport.
- Les décisions de `RETOURS-AUDIT.md` restent valables : elles ne sont pas
  annulées par ce document.
- Rapport final court : ce que tu as fait, ce qui reste ouvert, ce que je
  dois te fournir, et ce sur quoi tu n'es pas d'accord.
