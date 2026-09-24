# DIRECTION — reprise du site Festin (24/09/2026)

Référence : beetogreen.com (accueil, /solutions/employeurs, transitions), dossier `ressources/design/inspirationdesign/`. Arbitrages de la reprise : 1A 2B 3B 4B 5C 6A 7B 8B (voir RAPPORT-REPRISE.md).

## 1. Décoder : ce qui rend BeeToGreen solide et clair

**Une idée par écran.** Chaque section tient dans un viewport et porte une seule phrase-titre. Hauteurs mesurées à 1440×900 : 900, 976, 1076, 606, 543 px. Pas de section « fourre-tout ». Le visiteur scrolle d'affirmation en affirmation.

**Des titres qui sont des phrases, pas des étiquettes.** « La mobilité qui fait mieux », « Activez le vélo. Simplement. », « Le vélo devient un avantage salarié simple à activer. » Le titre dit la chose ; le paragraphe dessous la prouve. Aucune étiquette en petites capitales au-dessus de chaque section : une seule, dans le hero des pages intérieures (« Pour les entreprises »).

**Échelle typographique franche, une seule famille.** H1 110 px (graisse 800), H2 de section 56 à 96 px, H3 de carte ~32 px, texte 16 à 20 px. Rapport H1/H3 ≈ 3,4. Interlignage des titres à 1,0. La hiérarchie se lit en plissant les yeux.

**Le hero : couleur pleine, un trait, une promesse, une preuve.** Fond d'une seule couleur saturée par page (vert profond à l'accueil, orange pour les entreprises). Un trait épais et sinueux, signature de la marque, traverse le fond et encadre la photo ou la vidéo. Titre en trois lignes maximum, puis une preuve chiffrée d'une ligne, sourcée par un astérisque. Un bouton plein et un lien texte, pas deux boutons concurrents. Juste sous le hero : une ligne de confiance (« + 500 entreprises… »).

**Sections tonales.** Une section = une famille de couleur : fond pâle, titre dans la teinte foncée de la même couleur, carte saturée de cette couleur avec texte clair (rose pâle / titre framboise / carte framboise). La couleur change de section en section, jamais à l'intérieur d'une section. C'est ce qui donne à la fois de la couleur et du calme.

**Les chiffres expliquent.** Pas de mur de compteurs : chaque chiffre a une phrase et une source (« 81 % des cyclistes déclarent… »). Les chiffres arrivent après la promesse, jamais avant.

**Le « comment » en trois temps numérotés.** Onglets ou étapes 01 / 02 / 03 avec un chiffre-preuve par étape (« +3000 références », « +5000 parkings »).

**Les parcours se séparent tard.** Promesse → preuve → comment → puis seulement « Entreprises / Salarié·es », en deux blocs de même poids. Le visiteur est convaincu avant de choisir sa porte.

**Fin de page constante.** Témoignage en grand (« 01 / 03 »), FAQ en accordéon, puis un bloc de clôture qui assume le ton (« Bon voilà, on a fait le tour ! ») et renvoie vers l'action.

**Transitions entre pages.** Le même trait signature se dessine à travers l'écran (stroke-dashoffset 4049 → 0) en s'épaississant (épaisseur 2 → 800) jusqu'à couvrir la page, en ~1 s. La route change sous le trait, puis il se retire en s'amincissant. Le mouvement relie les pages : c'est la marque qui fait la transition.

**Mouvement discret dans les pages.** Apparitions courtes, pas de parallaxe sur le texte, Lenis pour le défilement.

## 2. Transposer : la même grammaire, notre matière

| Mécanisme BeeToGreen | Devient chez Festin |
|---|---|
| Trait signature sinueux | **Le trait du parcours** : une ligne teal épaisse, jamais droite, qui dit qu'un parcours d'insertion n'est pas linéaire. Il traverse le hero de chaque page et fait la transition entre les pages (teal, bord or). Même tracé partout : c'est un élément d'identité, pas une décoration. |
| Hero couleur pleine par page | Hero drenché d'une couleur de charte par page : teal à l'accueil, teal-deep pour l'Association et Impact, or (texte encre) pour Insertion, teal pour Acteurs du secteur. Les pages projet gardent leur photo plein cadre (elles sont appréciées) mais reçoivent le trait. Fond clair dominant ensuite (arbitrage 1A). |
| Titre-phrase + preuve d'une ligne | Accueil : une phrase en capitales qui dit ce que fait Festin (arbitrage 2B), la baseline « Le goût d'avancer ensemble » en signature. Preuve : « 441 personnes accompagnées en 2025, 83 % en emploi ou en formation* » avec la source en note. |
| Ligne de confiance sous le hero | « Association loi 1901, d'intérêt général, agréée ESUS. Depuis 1987. » C'est notre « + 500 entreprises » : la solidité par les statuts et l'ancienneté. |
| Sections tonales | Familles : teal (fond `--teal-tint`, titre `--teal-dark`, carte `--teal`), or (fond `--gold-pale`, titre `--gold-ink`, carte `--gold` + encre), crème neutre. Une couleur d'appoint par page (corail ou violet), une seule fois. |
| Chiffres qui expliquent | Chaque chiffre = une phrase + périmètre + année + source (charte : chiffres sourcés et datés, taux avec leur périmètre). Fin du gabarit « gros chiffre / petite légende ». |
| Comment en 3 temps | Accueil : Former · Accompagner · Transformer le secteur, chacun avec un fait vérifié. Insertion : les étapes d'une promotion. Secteur : les 3 étapes POEI. |
| Parcours qui se séparent tard | Accueil : promesse → preuve → écosystème → **deux portes** « Vous cherchez un métier » / « Vous êtes du secteur » (+ « Soutenir » en troisième, plus petit) (arbitrage 3B). |
| Témoignage en grand + FAQ | Pages Insertion et Secteur : FAQ construite uniquement à partir d'informations déjà publiées (gratuité, durée, dates de session, POEI). Pas de question sans réponse vérifiée. |
| Bloc de clôture | Même bloc de fin sur chaque page : une phrase d'action et deux liens (candidater / nous écrire). Ton sobre. |
| Transitions trait | Transition de route au changement de hash : trait teal qui couvre l'écran, changement de page dessous, retrait. 1,1 s au total, GSAP core seul (attributs SVG), pas de plugin. Mouvement réduit : coupure franche. |

## 3. Écarter

- **Le ton blagueur** (« rien que ça », « c'est cool », « Make parking sexy »). Nos lecteurs incluent des personnes en parcours d'insertion et des financeurs ; la charte impose le vouvoiement, pas de superlatif. On garde la franchise et la brièveté, pas la désinvolture.
- **« Leader français », « la plus grande marketplace »** : superlatifs interdits par la charte.
- **Le simulateur CO2** : pas d'équivalent honnête. Un « simulateur d'impact » inventerait des chiffres.
- **Le loader plein écran au premier chargement** : il retarde l'affichage du contenu (LCP) pour un gain d'image ; la transition entre pages suffit à porter la signature.
- **Le mur de logos « ils nous font confiance »** tant que nous n'avons pas les logos : une carte au nom d'un partenaire fait maquette. Géré par le réglage global des blocs incomplets (arbitrage 5C).
- **La typo grasse arrondie (Parkinsans 800)** : notre charte est KoHo, capitales grasses + italique léger sur le mot clé. On garde la charte, on reprend l'échelle.
- **Les couleurs néon (vert citron)** : hors charte. Notre or joue ce rôle sur fond sombre.
- **Les onglets pour les services** : chez nous, trois étapes numérotées visibles d'un coup sont plus claires que des onglets qui cachent du contenu.

## 4. Fondations (appliquées avant les pages)

- **Échelle typographique unique**, fluide, rapport ≥ 1,25 : `--fs-display` > `--fs-h1` > `--fs-h2` > `--fs-h3` > `--fs-lede` > `--fs-body` > `--fs-small` > `--fs-label`. Toutes les classes de titre des pages (`.ab-title`, `.proj-h2`, `.pxs__title`, `.h2`…) pointent vers ces variables.
- **Échelle d'espacement unique**, fluide : `--sp-1` à `--sp-10`, et `--section` pour le rythme vertical des sections.
- **Mouvement centralisé** : `--ease-out` (expo), `--ease-in-out`, `--dur-1` à `--dur-4` en CSS ; `window.FESTIN_MOTION` pour GSAP.
- **Blocs incomplets** : un seul réglage (`window.FESTIN_SHOW_PLACEHOLDERS`). Vrai : cadres `[PHOTO MANQUANTE : …]` visibles. Faux : ces blocs disparaissent.
- **Pas de tiret cadratin dans les textes**, pas d'étiquette au-dessus de chaque titre : une étiquette par page au plus, dans le hero.
