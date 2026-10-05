# Retours sur `AUDIT-CIBLES.md` — ce qu'on corrige, ce qu'on ne corrige pas

> Ce document fait autorité sur l'audit. Quand il contredit `AUDIT-CIBLES.md`,
> c'est lui qui gagne. L'audit reste la référence pour les constats ;
> ce document tranche ce qu'on en fait.
>
> **Avant de commencer : lis la partie 5 et pose-moi les questions.**
> Tu attends mes réponses avant de toucher au code sur les points concernés.
> Tout le reste, tu peux l'enchaîner sans me demander.

---

## 1. Constats que je rejette — ne les corrige pas

Ces points sont signalés comme des défauts dans l'audit. Ils n'en sont pas.

1. **La Table de Cana, 89 % (2025) contre 84 % (2024).** Ce n'est pas une
   contradiction : ce sont deux années différentes. Ne remplace aucun des
   deux chiffres. En revanche, **l'année doit être visible à côté de chaque
   taux**, partout, sans exception. Applique la même logique aux Beaux Mets :
   vérifie que les deux taux correspondent bien à deux années, et si les
   indicateurs ne portent pas le même nom, harmonise l'intitulé, pas la
   valeur.

2. **« Départ devient Festin » (2022) contre « Festin naît en 1987 ».** Pas
   une contradiction non plus : Départ existe depuis 1987, et l'association a
   simplement changé de nom en 2022. Écris-le clairement une fois, sur
   « Qui sommes-nous », et garde 1987 comme date de création.

3. **Le mot « levier » dans l'édito.** La direction autorise ce mot. Ne coupe
   rien de l'édito pour cette raison. (Le point sur l'édito répété sur trois
   pages reste valable, voir §2.)

4. **La règle « pas plus de deux composants horizontaux interactifs ».**
   Cette règle est supprimée. Des Étoiles et des Femmes en a quatre, ça me va.
   Retire la règle de la charte et ne la fais plus appliquer nulle part.

5. **Le numéro de téléphone.** On n'en met pas pour l'instant. Ne crée aucun
   bloc téléphone, ne laisse pas de `[À COMPLÉTER]` à cet endroit.
   En revanche, voir §5 : j'ai besoin que tu me dises de quelles adresses
   e-mail tu as besoin pour câbler correctement tous les liens de contact.

---

## 2. Corrections à appliquer — décisions prises, tu exécutes

### 2.1 Accueil et parcours de la personne

- **Remplacer la porte « Orienter une personne » par une porte adressée à la
  personne elle-même**, du type « Apprendre un métier de cuisine ». C'est la
  cible prioritaire du site et elle n'a aujourd'hui aucune entrée.
  Le prescripteur, lui, comprend sans difficulté les informations adressées
  à la personne sur la page Insertion.
  → Voir la question 1 en §5 avant d'implémenter la suite pour le prescripteur.

- **Incarner la mission sociale sur l'accueil.** Aujourd'hui on y lit des
  chiffres et des institutions, aucun visage ni aucune parole de personne
  accompagnée. À corriger.

- **Supprimer les tarifs des formations pro de l'accueil** (« Inter 180 €
  HT/pers » et les autres). Les prix ne doivent pas apparaître là.

### 2.2 Calendrier des formations

Le calendrier affiché sur Insertion est **celui du TFP, pas celui du CAP**.
C'est l'origine de l'incohérence relevée par l'audit.

Bonne nouvelle pour la correction : **on ne distingue plus « CAP » et « TFP »
dans le discours du site, on parle de formations diplômantes.** Reprends le
calendrier et le vocabulaire dans ce sens, en veillant à ce qu'aucune durée
affichée ne contredise une autre.

### 2.3 Page Professionnels

- La bande défilante qui cite les six projets doit être **cliquable**, avec un
  lien réel vers chaque page projet, à commencer par Restaure.
- Ajouter **un lien vers Les Beaux Mets**, d'où vient Sami.
- La section « S'engager avec Festin » doit avoir un lien. Le bon lien est
  **« Devenir partenaire Festin »** ou **« Se former »** — tranche selon ce
  qui suit logiquement la section, et dis-moi lequel tu as retenu.

### 2.4 Page Académie

- **Remettre les formations pro**, mais en montrant explicitement qu'elles
  sont **portées par Restaure**. Elles ne disparaissent pas du site, elles
  changent de rattachement visible.
- Supprimer le filtre « Formations pro (0) » et le compteur à zéro, qui sont
  la conséquence de leur retrait.
- **Tournesol est trop souvent mis en sous-titre de l'Académie.** Il ne doit
  pas être plus en avant que les autres formations. Remets-le au même niveau.

### 2.5 Tournesol

- La durée de stage est de **155 heures**. Corrige partout.
- **Tournesol n'est pas un projet, c'est une formation**, au même niveau que
  les autres. Revois son rattachement et son traitement en conséquence —
  il ne doit plus apparaître comme un projet de l'écosystème.
- Remplacer les photos de la galerie légendées « Lille » et « Lyon » : ce sont
  des photos de Des Étoiles et des Femmes, Tournesol est à Marseille.
  → Voir §6, je dois te fournir les bonnes photos.

### 2.6 Vocabulaire

**« Dispositif », pas « programme »**, pour Des Étoiles et des Femmes.
Corrige toutes les occurrences, y compris sur l'accueil et sur la page projet.

### 2.7 Accueil, frise

Remplacer l'entrée 2026 par la formulation exacte :

> « 2026, L'Académie Festin : Festin devient organisme de formation en
> partenariat avec Estello Formation, organisme certifié Qualiopi. »

Cela lève la contradiction relevée par l'audit sur « qui est l'organisme ».

### 2.8 Fiches de formation gratuites

« Demander un devis » n'est pas le bon appel à l'action sur un parcours
gratuit. Remplace par quelque chose du type **« Nous contacter »**.
Applique-le aux fiches CAP, TFP et Tournesol.

### 2.9 Navigation

**On part sur l'option A.** Tu peux l'implémenter.

### 2.10 Densité des textes

Applique les coupes du tableau de l'audit, page par page, avec ces ajouts
et précisions :

| Page | Ce qu'on coupe |
|---|---|
| Accueil | Les puces de « Par où commencer ? » qui redisent « Deux publics » ; le catalogue complet doublé de l'Académie ; l'édito |
| Des Étoiles et des Femmes | Les portes qui redisent le « en bref » ; « Tout au long du parcours » qui répète l'étape 4 |
| Les Beaux Mets | La liste des festivals ; le paragraphe « Londres et Milan » |
| Insertion | La bande « Toute l'année » qui double « Un diplôme et quelqu'un à vos côtés ». **Et supprimer la frise du parcours : elle est en trop.** |
| La Table de Cana | **Alléger les cartes du parcours.** Ne pas lister tous les partenaires dans l'étape 3, ne pas détailler tous les outils. |
| Restaure | Les portes qui redisent les tuiles (700, 35) |
| Qui sommes-nous | La non-lucrativité dite deux fois ; les 2ᵉ et 3ᵉ paragraphes de l'édito |
| Académie | Le bloc des projets en fin de page |

### 2.11 Répétitions entre pages

Toutes à régler :

- « Par où commencer ? » — titre identique sur 6 pages
- « Des femmes formées avec des chefs, dans 13 villes » — 6 fois
- « Traiteur et restauration collective en insertion, depuis 1993 » — 6 fois
- 91 % — sur 5 pages
- 83 % — sur 4 pages
- La même citation de l'édito — sur 3 pages

### 2.12 Raconter l'histoire des personnes

Le site raconte l'institution, pas les personnes. À corriger :

- Les témoignages sont dans des carrousels **à un seul élément** (Hafida,
  Oumar, Valentin Majan, un ancien de Tournesol). Un carrousel qui ne fait
  défiler qu'une chose n'est pas un carrousel.
- L'accueil n'en contient aucun.
- Les verbatims de Restaure, le texte le plus fort du site, sont enfouis dans
  la 3ᵉ section d'une page projet. Remonte-les.

### 2.13 Design

Applique **l'ensemble des points design de l'audit**, à une exception près :
la règle des deux composants horizontaux, supprimée (voir §1.4).

Cela inclut donc : le code couleur teal / or, la hiérarchie des titres sur
mobile, les textes sous 12 px, les contrastes, les états manquants, les
quatre actions de même poids en bas de l'accueil, et les deux entorses à la
règle des titres en capitales.

---

## 3. Points où j'attends ta proposition avant que tu agisses

Tu ne codes pas tant que je n'ai pas tranché. Donne-moi deux options avec
leurs contreparties, et ta recommandation.

1. **Les deux grammaires visuelles.** La page Professionnels ne ressemble à
   aucune autre page : archétypes, mot géant, bande or. Un restaurateur qui
   passe de Pros à Restaure a l'impression de changer de site. Comment on
   règle ça ? Soit on assume l'écart, soit on diffuse deux ou trois de ses
   procédés sur les autres pages. Dis-moi comment tu ferais.

2. **Les dépendances externes.** Lucide et Lenis sont chargés depuis unpkg et
   jsDelivr, alors que `CLAUDE.md` annonce des bibliothèques locales. Hors
   ligne ou si un CDN tombe, les pastilles du menu sont vides. Comment on
   règle ça, et quel est le coût de l'internalisation ?

---

## 4. Points où je n'ai pas tranché — à discuter avec moi

1. **Partenaires opérationnels et mécènes.** Ils n'ont ni page ni entrée de
   menu. Je ne sais pas ce qu'on fait :
   - un bloc sur la page Impact ?
   - une vraie page Partenaires ? Et dans ce cas, qu'est-ce qu'elle
     apporterait concrètement ?
   - ou juste un appel à l'action « Soutenir Festin » bien placé quelque part ?

   Dis-moi ce que tu recommandes, et pourquoi. C'est la question 2 du §5.

---

## 5. Les questions que tu dois me poser avant de commencer

Pose-les toutes en un seul bloc, fermées ou à choix (A / B / C) quand c'est
possible. Attends mes réponses avant de toucher aux points concernés —
mais commence par tout le reste, ne reste pas bloqué.

1. **Le prescripteur.** Si la porte de l'accueil devient « Apprendre un métier
   de cuisine », où va le prescripteur ? Options à me soumettre : tout
   adresser à la personne et ajouter une fiche prescripteur dédiée, ou garder
   un bloc prescripteur court en tête de la page Insertion, ou autre chose
   que tu proposerais. Recommande.

2. **Partenaires et mécènes** (voir §4). Quelle option, et pourquoi.

3. **Les adresses e-mail.** On ne met pas de téléphone. Liste-moi **toutes
   les adresses dont tu as besoin** pour câbler correctement les liens de
   contact du site : une ligne par usage (candidature, prescription,
   partenariat, mécénat, presse, privatisation, formations pro…). Je te les
   fournis dans la foulée.

4. Toute autre question dont la réponse changerait ce que tu construis —
   maximum quatre de plus, et seulement si elles sont bloquantes.

---

## 6. Ce que je dois te fournir

Rappelle-le-moi dans ton rapport final si je ne l'ai pas fourni.

- Les photos de Tournesol à Marseille.
- Le calendrier réel 2026-2027 des formations diplômantes.
- Les conditions d'entrée à La Table de Cana Marseille.
- La source et la date exactes du taux de 86 % de Tournesol.
- La source de « premier restaurant en prison ouvert au public en France ».
- Les adresses e-mail de la question 3.
- Des témoignages courts de personnes accompagnées pour l'accueil,
  avec accord écrit.
- Les 8 portraits manquants, les logos partenaires, les photos du Grand Festin.

---

## 7. Méthode

- Tu travailles sur une branche dédiée, commits atomiques, un par chantier.
- Tu ne réinventes rien : l'audit est fait, les décisions sont ici.
- Zéro information inventée. Tout chiffre, date ou nom non sourçable dans le
  dépôt devient `[À COMPLÉTER]` et remonte dans ton rapport.
- Chaque taux affiché porte son année.
- À la fin, un rapport court : ce que tu as corrigé, ce qui reste ouvert,
  ce que j'ai à fournir, et ce sur quoi tu n'es pas d'accord.
