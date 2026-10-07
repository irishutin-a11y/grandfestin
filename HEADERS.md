# Trois propositions de headers (07/10/2026)

Branche `headers-propositions`, route `#/headers`. Les neuf headers sont affichés les uns sous les autres, avec leurs hauteurs relevées.

- Captures : `captures/headers-comparaison-{1440,360}.png`, et un fichier par header (`captures/headers-p{1,2,3}-{accueil,section,formation}-{1440,360}.png`).
- Aucune page du site n'est modifiée sur cette branche. Il n'y a que la route, son composant (`components/HeadersLab.jsx`) et sa feuille de styles (`styles/headers-lab.css`).
- Contenu, photos et données sont réels, lus dans `FESTIN_DATA` : l'accueil, la section L'insertion, et la fiche formation Prévention des violences, prise comme exemple pro.

## Diagnostic des headers actuels (mesuré à 1440 et 360 px, sur 11 pages)

1. **Hauteur.** Les headers des pages de section font 666 px à 1440, soit 74 % de l'écran, et 607 px à 360, soit 82 %. L'accueil prend 100 % de l'écran. Sur mobile, le premier contenu réel arrive sous le pli.
2. **Empilement.** Sur la photo s'empilent la barre flottante, le fil d'Ariane, un titre de 2 à 4 lignes en capitales à 97 px et un bouton. Le titre a la même taille sur toutes les pages, quel que soit son poids.
3. **Texte sur photo.** Un voile dégradé, jusqu'à 90 % de teal profond en bas, rattrape le contraste. Il éteint les photos et assombrit les visages.
4. **L'image décore.** Le recadrage est centré automatiquement. À 360 px, la photo devient un fond de 360 × 607 px où le sujet est coupé ou caché derrière le titre.
5. **Tout se ressemble.** 8 des 11 headers relevés suivent le même gabarit : photo, voile, titre en bas à gauche, bouton. Le code couleur ne se lit plus que dans la teinte du voile. On ne sait pas où l'on est.
6. **Alignement incohérent.** L'accueil et les fiches sont centrés, les sections sont alignées à gauche. Le centrage des fiches aplatit leur contenu.
7. **Les fiches formation n'informent pas.** Un aplat, un ruban décoratif, un titre centré. La durée, le public et le format arrivent 500 px plus bas.
8. **Débordement.** À 360 px, deux titres sortaient de l'écran (L'insertion, Prévention des violences). La cause était le script typographique, qui collait « quelqu'un à vos côtés » en un seul bloc. **Corrigé et mis en ligne le 07/10**, indépendamment de ce choix.
9. **L'accueil occupe tout l'écran** pour un slogan, un sous-titre et deux portes. La non-lucrativité et les chiffres sont sous le pli.

## Proposition 1 · L'aplat et la fenêtre

**Principe.** Le texte vit sur un aplat de la couleur du public (teal, or, teal profond, corail). La photo est une fenêtre à part, aux coins arrondis, qui déborde sur la suite de la page.

**Ce qu'elle règle**
- Défaut 3 : jamais de texte sur une photo, donc aucun voile.
- Défaut 4 : la photo est entière, cadrée comme un objet.
- Défaut 5 : la couleur de l'aplat dit le public dès le premier regard, et chaque page se reconnaît.
- Défaut 6 : tout est aligné à gauche.
- Défaut 7 : la fiche porte quatre faits (durée, format, public, porteur).

**Ce qu'elle ne règle pas**
- Défaut 1, sur mobile : la hauteur y reste celle d'aujourd'hui, parce que texte et photo s'empilent. Il faudra resserrer le titre pour gagner de la place.

| Hauteur relevée | 1440 px | 360 px |
|---|---|---|
| Accueil | 715 px | 717 px |
| Section | 621 px | 613 px |
| Formation | 626 px | 723 px |

**Coût sur les 17 pages**
- Un seul composant à réécrire, `HeroPage`, qui sert déjà à toutes les pages de section et aux pages projet.
- En plus : le header de l'accueil, celui de la page Pour le secteur (qui a son propre plein cadre) et celui des fiches formation (ajout des faits, déjà présents dans les données).
- Environ une journée de travail.

**Ce qu'elle exige de vous.** Rien de nouveau. Les photos actuelles conviennent, puisqu'elles sont montrées entières.

## Proposition 2 · Le titre d'abord, la bande dessous

**Principe.** Un header typographique sur un fond clair teinté par le public. Dessous, une bande ferme le header : photos pour l'accueil et les sections, faits pour la formation.

**Ce qu'elle règle**
- Défaut 2 : moins de couches, et rien sous le texte.
- Défaut 3 : aucun texte sur photo.
- Défaut 4 : la photo n'est plus cachée par un titre.
- Défaut 6 : alignement à gauche.
- Défaut 7 : les faits de la fiche sont dans la bande.
- Défaut 9 : à l'accueil, un triptyque montre l'écosystème (Les Beaux Mets, Des Étoiles et des Femmes, La Table de Cana Marseille).

**Ce qu'elle ne règle pas**
- Défaut 5, à moitié : les teintes claires (teal pâle, or pâle) différencient moins les pages qu'un aplat franc.
- Défaut 1, sur mobile, pour l'accueil : il est le plus haut des neuf (870 px).

| Hauteur relevée | 1440 px | 360 px |
|---|---|---|
| Accueil | 731 px | 870 px |
| Section | 718 px | 586 px |
| Formation | 595 px | 669 px |

**Coût sur les 17 pages**
- Même périmètre que la proposition 1.
- En plus, un recadrage par page pour la bande panoramique, avec le réglage `imgPos` existant.

**Ce qu'elle exige de vous**
- Des photos horizontales où le sujet tient dans une bande étroite.
- Plusieurs photos actuelles sont verticales ou ont le sujet en haut, ce qui donne des têtes coupées : il en faudrait 3 à 5 de remplacement.

## Proposition 3 · La photo nue et le cartouche

**Principe.** La photo s'affiche sans voile, en pleine largeur et à hauteur fixe. Le titre est posé dans un cartouche de la couleur du public, qui chevauche le bas de la photo.

**Ce qu'elle règle**
- Défaut 1 : c'est la plus basse sur les sections, 587 px au lieu de 666 à 1440, et 523 au lieu de 607 à 360.
- Défaut 3 : la photo garde ses vraies couleurs, et le texte est sur un aplat.
- Défaut 5 : le cartouche porte la couleur du public.
- Défauts 6 et 7 : alignement à gauche, et faits dans le cartouche de la fiche.

**Ce qu'elle ne règle pas**
- Défaut 4, en partie : la barre couvre le haut de la photo et le cartouche en couvre le bas. Le sujet doit tenir dans une bande étroite, et sur la fiche formation la photo devient presque un bandeau décoratif.

| Hauteur relevée | 1440 px | 360 px |
|---|---|---|
| Accueil | 760 px | 643 px |
| Section | 587 px | 523 px |
| Formation | 662 px | 694 px |

**Coût sur les 17 pages**
- Même périmètre de code que la proposition 1.
- En plus, un réglage de cadrage photo par photo, à vérifier à chaque largeur.

**Ce qu'elle exige de vous**
- Des photos horizontales avec le sujet dans le tiers central, sans rien d'important en haut ni en bas.
- C'est l'exigence photo la plus forte des trois.

## Mouvement et accessibilité (les trois propositions)

- **Mouvement.** Une seule entrée par header : la photo, la bande ou le cartouche se pose une fois, en 0,9 s, avec GSAP. Elle est coupée en mouvement réduit (`gsap.matchMedia`).
- **Contrastes.** Texte blanc sur teal ou teal profond, encre sur or, or clair seulement sur fond sombre. Aucun voile. Le contrôle d'accessibilité automatique (axe-core, WCAG 2.1 AA) ne relève aucune violation sur la route, à 1440 comme à 360 px.
- **Débordement.** Aucun défilement horizontal à 360 px.

## Recommandation

**La proposition 1.** C'est la seule qui règle d'un coup le texte sur photo et le « on ne sait pas où on est » sans rien demander aux photos actuelles. L'aplat de couleur suffit à identifier la page, et chaque photo est montrée entière.

Son point faible est la hauteur sur mobile. Je propose de le régler à la mise en place, en ramenant les titres des sections d'un cran.

---

# Deuxième tour (07/10/2026) : la grande photo et le cartouche dessus

Retour reçu : les headers ne sont plus impactants. Il faut une grande photo, haute, avec le cartouche posé dessus.

La route `#/headers` montre trois nouvelles propositions. Captures : `captures/headers2-{a,b,c}-{accueil,section,formation}-{1440,360}.png`.

Règles communes aux trois :
- La photo est en plein cadre, sans voile.
- Le texte est toujours sur un aplat de couleur, jamais sur l'image.
- Le code couleur reste le même : teal pour l'insertion, or pour les professionnels, teal profond pour l'accueil.

**Hauteurs à 1440 px** (avec un écran de 900 px de haut) :
- accueil : 92 % de l'écran (828 px) ;
- section : 80 % (720 px) ;
- formation : 72 % (environ 650 à 840 px, selon le contenu).

| | Principe | À 360 px | Hauteur à 360 px (accueil / section / formation) |
|---|---|---|---|
| **A · Le cartouche en coin** | Un cartouche arrondi, compact, posé en bas à gauche, comme une étiquette sur la photo. La photo se voit tout autour. | Le cartouche flotte au-dessus du bas de la photo, avec une marge de 16 px. | 810 / 702 / 846 px |
| **B · Le panneau** | Un panneau de couleur, sur toute la hauteur, couvre la partie gauche (42 %). La photo respire sur la partie droite. Le rendu est le plus éditorial. | Le panneau passe en haut, sous la barre, et la photo s'affiche dessous. | 889 / 769 / 946 px |
| **C · Le bandeau** | Un bandeau de couleur traverse le bas de l'image, de bord à bord. Le titre est à gauche ; l'action, les faits ou les portes sont à droite. La photo reste entière au-dessus. | Le bandeau reste en bas, pleine largeur. | 810 / 702 / 780 px |

**Ce que chacune exige en photos**
- **A** : un sujet au centre ou à droite, puisque le cartouche couvre le bas à gauche.
- **B** : un sujet dans les deux tiers droits.
- **C** : un sujet dans la moitié haute.

Les photos actuelles conviennent dans les trois cas, à condition de régler leur cadrage page par page avec `imgPos`.
