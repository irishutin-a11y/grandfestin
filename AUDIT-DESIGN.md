# AUDIT-DESIGN — grandfestin.com

Version révisée du 22 septembre 2026. Aucun fichier du site n'a été modifié : ce document est le seul fichier créé dans le dépôt. Les captures sont dans `.claude/audit-captures/` (ignoré par git).

**Cadrage corrigé.** La première version mesurait tout le site au design system et traitait comme équivalentes deux familles de pages. Or la DA de référence est celle de **la home actuelle et des 5 pages projet refontées**. Cette version s'organise donc ainsi : (1) la DA de référence est auditée pour elle-même (§2.0) ; (2) les pages qui ne suivent pas cette DA sont des pages à **aligner**, pas une seconde identité à équilibrer ; (3) le design system Claude Design fournit les fondations (palette, KoHo, tokens), pas la loi : quand la DA validée s'en écarte, je le note comme point à **documenter** dans le design system, pas comme un défaut.

Chaque constat porte une étiquette : **[DA]** défaut de la DA de référence, **[Alignement]** page hors DA à rapprocher d'elle, **[DS]** écart au design system à documenter (pas un défaut en soi), **[Transversal]** concerne tout le site.

## Périmètre, sources et limites

- **Site audité** : `http://localhost:4500/#/`. Son `index.html` est identique octet pour octet à celui du dépôt (branche `main`, `68bb185`). Ce serveur sert `/tmp/Site_Festin`, copie que j'ai resynchronisée depuis le dépôt avec le `rsync` de `CLAUDE.md` : si une autre session y avait déposé une version différente, elle a été remplacée. Le worktree `.claude/worktrees/pensive-elion-574756` (branche `claude/pensive-elion-574756`, antérieure à la page À propos, avec des modifications non commitées sur les pages Beaux Mets, Cana, Tournesol, `Sections.jsx` et `styles.css`) n'a **pas** été audité. Si la version que vous regardez est ailleurs, dites-moi laquelle.
- **Design system** : `project/README.md` lu (fondations visuelles seulement, « Content fundamentals » ignoré).
- **Inspirations** : `ressources/design/inspirationdesign/`, 9 images. Huit sont des maquettes de sites (`insp1` à `insp5`, `inspisite`, `inspisite1`, `inspisite3`). `cuisine de l'arc.jpeg` est une photographie (tablée en plein air, rue de Marseille), pas une inspiration : je la traite comme un asset. Elle montre des visages ; le droit à l'image est à confirmer (voir `CLAUDE.md`).
- **Audit précédent** : parties 3 et 4 de `RAPPORT-AUDIT.md` lues. Déjà consolidés, donc non refaits : la hiérarchie H1/H2 de la home, l'échelle d'espacement des sections de `Pages.jsx` (96/64px), le code mort de `styles.css`, la constante des reveals à 350 ms.
- **Mesures** : rendu réel mesuré par le DOM à 1280 et 390px sur les 16 routes (tailles rendues, hauteurs de section, fonds, débordements, zones tactiles) ; contrastes calculés à partir des valeurs de rendu ; recherches ciblées dans les feuilles et les composants.
- **Captures** : Chrome headless. Deux jeux.
  - `<page>-<largeur>.png` (17 pages × 390, 768, 1280, 1440) : **premier écran** seulement, car le hero en `100vh` et les révélations au scroll rendent une capture pleine page trompeuse. Les 390px sont rendus dans un iframe de 390px, parce que Chrome headless impose une largeur minimale d'environ 500px qui tronque les titres.
  - `scroll/<page>-y<N>.png` : **captures à la position de scroll N px** (50 fichiers) : accueil à 1280 (14 positions) et à 390 (7), Des Étoiles et des Femmes à 1280 (6) et à 390 (5), Beaux Mets (6), Cana, Restaure, Tournesol (4 chacune). Ce sont elles qui permettent de juger le rendu réel de la DA. Les sections épinglées sont capturées dans leur état intermédiaire réel.
- **Non vérifié** : la navigation clavier réelle (analysée dans le code, pas parcourue), les états hover en interaction (lus dans le CSS), Safari et Firefox, l'état final des photos éparpillées de l'accueil (les captures les montrent en transition).

---

## 1. Synthèse : les 10 améliorations au plus fort impact

Les cinq premières concernent la DA de référence elle-même.

| # | Amélioration | Pages | Effort | Fichiers touchés |
|---|---|---|---|---|
| 1 | **[DA] Réparer l'approche épinglée de l'accueil** : 3 cartes de 40 mots demandent environ 3 000px de scroll épinglé ; en transition, la carte sortante est rognée (« PAGNER », « ER ») et la suivante entre à 50 % d'opacité sur l'aplat or, texte terne ; vide de 150px entre le chapeau et le stepper ; étape inactive à 2,01:1. C'est le passage le plus fragile de la page la plus vue. | Accueil | M | `home-b.css` l.114-145, `HomeB.jsx` l.153-192 et son code GSAP l.60-110 |
| 2 | **[DA] Refaire le rythme de l'accueil** : 8 478px (10,6 écrans ; 14,9 sur mobile) ; aplat or de 3 347px (39 %), puis trois aplats teal de tons voisins sur 4 021px (47 %) ; bloc « impact » de 1 138px pour 4 chiffres ; cartes de l'écosystème sombres sur fond sombre. | Accueil | M | `home-b.css`, `HomeB.jsx` |
| 3 | **[DA] Accorder l'accueil et les projets sur l'échelle et la casse** : H2 en capitales de 72 à 88px sur l'accueil, H2 en casse de phrase de 38px sur les projets (sous un H1 de 128px, saut de 3,4) ; H3 de 59 contre 28px ; 5 interlettrages d'eyebrow ; texte de 10 à 13px dans les cartes (citations de témoignages à 13px). | Accueil, 5 projets | M | `_tokens.css`, `home-b.css`, `projet-*.css` |
| 4 | **[DA] Mutualiser le gabarit projet et corriger ses composants** : 5 CSS (1 507 lignes) et 5 JSX (1 829 lignes) quasi identiques (82 % de lignes communes entre Beaux Mets et Cana) ; témoignages en deux dispositifs (défilement sur Des Étoiles et des Femmes, grille de 3 cartes en 2 colonnes avec carte orpheline sur les autres) ; avatars vides en pointillés ; fin de page sans « autres projets ». | 5 projets | L | `projet-*.css`, `Projet*.jsx`, `index.html` |
| 5 | **[DA] Corriger le bloc « soutenir » et les contrastes de la DA** : blanc sur corail 3,68:1 et sur ocre 3,49:1, bouton or sur corail 1,76:1 ; texte de présentation du footer à 1,7:1 (couleur `--ink-mid` héritée sur fond teal, la même fuite que celle des titres) ; italique or sur fond clair (2,04:1, pages hors DA). | 5 projets, footer, accueil | S à M | `projet-def.css`, `projet-tournesol.css`, `styles.css` (`.footer__brand p`), `_tokens.css` |
| 6 | **[DA] Alléger le chrome fixe** : bande de fil d'Ariane (28px) + pastille + bouton flottant ; la pastille passe sur les titres en défilant, le bouton flottant recouvre du texte sur mobile et se confond avec le bandeau or de l'accueil. | 5 projets, accueil | M | `styles.css` l.697-708, `projet-*.css`, `Nav.jsx`, `Sections.jsx` |
| 7 | **[Transversal] Alléger les images** : 57 Mo chargés sur l'accueil, 55 Mo sur À propos, 43 Mo sur Des Étoiles et des Femmes ; une photo de 16 Mo ; aucun `srcset`. | Accueil, À propos, Des Étoiles et des Femmes, Académie | M | `images/`, `data/data.js`, `HomeB.jsx`, `About.jsx`, `ProjetDef.jsx`, `Pages.jsx` |
| 8 | **[Alignement] Aligner les 8 pages fonctionnelles sur la DA** : Académie, Formations (liste et fiche), Impact, Contact, Sadi Carnot, 2 Accompagnements, Actualités ont un en-tête teal à quadrillage, un H1 de 64px en casse de phrase avec italique or ; elles ne reprennent ni le hero photo, ni les capitales, ni les aplats de la DA. | 8 routes | L | `Pages.jsx` (`PageHeader` l.4-28), `styles.css` l.194 |
| 9 | **[Alignement] Corriger le mobile des pages en grille inline** : les grilles `1.3fr 1fr` avec `gap:80px` de `Pages.jsx` n'ont pas de point de rupture ; à 390px, le contenu dépasse (bord droit à 483px sur Académie) et `overflow-x:hidden` le masque. | Académie, Impact, 2 Accompagnements | S à M | `Pages.jsx` (297 `style={{`, 17 `gridTemplateColumns`) |
| 10 | **[Transversal] Compléter navigation et parcours** : aucun lien visible dans la nav ; le footer ne renvoie ni vers Impact, À propos, Actualités ni mentions légales ; « Partenaires & financeurs » mène au formulaire générique ; le financeur et le journaliste n'ont pas d'entrée ; l'icône LinkedIn pointe vers `#/contact` ; les pages projet se terminent sans lien vers les autres projets. | Toutes | M | `Nav.jsx`, `Sections.jsx` (`Footer`), `data/data.js` |

La modernisation par motifs (pastille de mot clé, cartes à étiquette, lignes colorées, chiffres à couleur propre, méga logotype) est détaillée à l'axe 9 avec l'inspiration d'origine ; elle vise d'abord les items 2, 3 et 8.

Deux constats transverses : le système de tokens existe mais n'est presque pas utilisé (tokens de police : 0 usage dans les 8 feuilles ; d'espacement : 4), et la DA validée s'écarte du design system sur une dizaine de règles, à documenter (voir §5).

---

## 2. Constats détaillés

### 2.0 Audit de la DA de référence : accueil et 5 pages projet

**Ce qui fonctionne et qu'il faut garder.** Le hero photo plein écran avec H1 en capitales et pivot en italique or clair est la signature du site (`home-1280.png`, `projet-def-1280.png`). La pastille de navigation centrée est nette et compacte. La section « Se former, ou former ses équipes » : deux cartes à photo, étiquette de public, points, lien fléché (`home-y4409.png`). Les cartes de presse des projets (`def-y3600.png`). L'accordéon accessible avec vidéo au clic (`def-y1300.png`). Les photos réelles, et l'alternance sombre/clair des projets. Le contraste du texte clair sur teal profond est bon (blanc à 82 % : 10:1).

#### L'accueil

**A1. [DA] Approche épinglée** (`home-b.css` l.114-145, `HomeB.jsx` l.153-192 ; `home-y900.png`, `home-y1700.png`, `home-y2600.png`, `home-y3500.png`).
- Trois cartes d'environ 40 mots demandent environ 3 000px de scroll épinglé (la section `b-mission` mesure 3 254px). C'est le passage le plus coûteux de la page pour la quantité de contenu qu'il porte.
- Pendant la transition, la carte qui sort est rognée au bord gauche (le mot « ACCOMPAGNER » se lit « PAGNER ») et la suivante entre à 50 % d'opacité et à l'échelle .92 sur l'aplat or : le texte est olive terne, illisible (le libellé d'étape inactif mesure 2,01:1).
- Un vide d'environ 150px sépare le chapeau (« De la cuisine à l'emploi ») du stepper (`home-y900.png`).
- Sur mobile la section est démontée en trois cartes empilées, sans épinglage : deux expériences distinctes à maintenir.
- Le stepper et sa barre de progression sont une bonne idée (ils relient les trois étapes) ; c'est l'exécution qui coûte.

**A2. [DA] Rythme** (`home-b.css`, mesures à 1280).
- Ordre : hero (800) → bandeau or (93) → aplat or « mission » (3 254) → logos off-white (262) → teal (1 295) → teal foncé (1 588) → teal profond (1 138) → crème (1 194).
- Deux aplats or d'affilée (3 347px, 39 % de la page), puis trois aplats de teal de tons voisins d'affilée (4 021px, 47 %). La règle « aplats de couleur alternés » est respectée sur le papier, mais deux blocs de 3 000 à 4 000px de la même famille ne créent plus de rythme : entre la fin de l'approche et le footer, la seule respiration claire est la bande de logos de 262px.
- L'aplat or est saturé et occupe presque la moitié de l'accueil : c'est chaleureux, mais fatigant sur 3 000px, et il impose à tout ce qui est posé dessus (cartes à 50 %, stepper) un contraste difficile.

**A3. [DA] Hero** (`home-1280.png`, `home-390.png`).
- **Aucun bouton au premier écran** : `HomeB.jsx` rend l'eyebrow, le H1 et le sous-titre, mais pas les CTA (la classe `.hero__cta` est stylée et `data.js` porte encore « Découvrir nos projets » et « S'engager », non rendus). La première action possible est la pastille Don ou le bouton flottant. À confirmer comme choix éditorial (la section « S'engager » a été retirée de la home).
- La photo du hero, `photo-chapeau-cuisine.jpg` (1000 × 1500px en portrait), est affichée en paysage plein écran avec 116 % de hauteur pour la parallaxe : elle est agrandie d'environ 1,3 fois à 1280px et adoucie.
- Le scrim et `.hero__prism` (mix-blend soft-light, 60 %, dégradé animé sur 14 s) donnent une dominante teal-vert aux tons de peau. La parallaxe et le dégradé animé ne révèlent rien.
- Le bandeau or sous le hero est la seule occurrence de filets noirs de 3px de la DA (`.vmarquee`) : un motif dur dans un système qui, partout ailleurs, est arrondi et adouci. Sur mobile, il passe sous le bouton flottant.

**A4. [DA] Écosystème** (`home-y5704.png`, `home-y6600.png`, `m-home-y5000.png`).
- Cartes `--teal-deep` sur fond `--teal-dark` : la séparation carte/fond est très faible, et le texte y descend à 13,5px (description) et 11px (eyebrow).
- Le logo de chaque projet est posé dans une pastille blanche de 52px de haut ; les cinq logos ont des formes et des poids très différents, la pastille les uniformise mal (le logo Restaure orange sur blanc, Tournesol jaune et noir).
- Ces cinq mêmes logos sont déjà affichés juste au-dessus, dans la bande de logos : redondance.
- La sixième carte, en pointillés sans image, laisse un grand vide dans la grille 3 × 2 ; sur mobile, les cinq cartes empilées occupent environ 1 700px.

**A5. [DA] Impact** (`home-y7292.png`).
- Quatre chiffres dans un bloc de 1 138px : le contenu occupe environ 150px de hauteur, le reste est vide ou occupé par un halo radial.
- Les photos éparpillées passent, pendant leur déplacement, sur les libellés (une photo recouvre « sorties en emploi ou formation » sous « 83 % ») ; l'état final n'a pas pu être capturé, à vérifier. Elles décorent (elles ne comparent ni ne relient rien).

**A6. [DA] Témoignages** (`home-y8430.png`).
- Bande photo de 280px, puis défilement infini de cartes en alternance carte/panneau (64 s, pause au survol seulement). Les panneaux à logo ou à texte n'apportent pas d'information.
- Composant complexe (deux types de cellules qui alternent avec `flex-direction:column-reverse`) pour un contenu de 6 à 8 citations.

**A7. [DA] Composants** : trois familles de cartes sur une même page avec des rayons différents (14px `dcard`/`ecocard`/`tcard`, 22px `appr__card`, 20px méga-panneau) ; deux styles de lien d'action (`.lnk` en capitales 14px, flèche `→` ; `.btnb`).

#### Les 5 pages projet

**P1. [DA] Chrome fixe** (`def-y700.png`, `m-def-y3000.png`).
- La bande de fil d'Ariane (28px) et la pastille (haut à 38px, bas à 92px) occupent environ 92px permanents en haut de l'écran (12 % de 800px). En défilant, la pastille passe sur les eyebrows et les titres (`def-y700.png` : « LES CHIFFRES » et le haut de la première carte de chiffres sous la pastille).
- Sur mobile la bande devient « ACCUEIL/ … » (le parent est masqué), et le séparateur est collé au mot qui le précède (« ACCUEIL/ NOS PROJETS »).

**P2. [DA] Échelle et casse** (`projet-def.css` l.36-40).
- H1 en capitales de 128px, puis H2 en **casse de phrase** (`text-transform:none`) de 38px : saut de 3,4. Sur l'accueil, les H2 sont en capitales de 72 à 88px. Passer de la home à un projet change de langage typographique.
- Le commentaire d'en-tête de chaque feuille projet annonce « H2 24px/600, corps 15px » : le rendu est 38px. Documentation périmée.
- Petit texte : citations de témoignages à 13px (`.pdef-tcard__quote`), eyebrows à 11px, libellés de chiffres à 12px à 55 à 70 % d'opacité, dates de presse.

**P3. [DA] Blocs de chiffres** (`def-y700.png`). Quatre cartes de quatre couleurs (teal, or, violet, teal foncé) sans logique de sens ; le blanc sur le violet `#9A5BA8` mesure 4,73:1 (à la limite). L'état d'attente des compteurs (« 0 ») est visible tant que le bloc n'est pas révélé. Le titre de la section est un H2 de 3 lignes suivi d'un paragraphe : le bloc se lit d'abord comme un texte, les chiffres passent en second.

**P4. [DA] « Le projet »** (`def-y1300.png`, `lbm-y1300.png`). Structure solide (accordéon, média, cartes de formations). Sur Les Beaux Mets, la colonne de gauche porte un paragraphe de 65 mots avant l'accordéon : le bloc est dense. La vidéo de Des Étoiles et des Femmes est un iframe Google Drive : dépendante des droits d'accès du fichier.

**P5. [DA] Témoignages, deux dispositifs pour un composant** (`def-y2300.png`, `lbm-y2700.png`, `tournesol-y2500.png`).
- Des Étoiles et des Femmes : défilement infini de cartes en cinq couleurs différentes, texte de 13px, dernière carte affichant « [AJOUTER TÉMOIGNAGE] » en bord de bande.
- Les Beaux Mets, Cana, Restaure, Tournesol : grille statique de 2 colonnes avec 3 cartes, donc une carte orpheline et un trou.
- Les avatars sont des cercles vides en pointillés : l'état « portrait manquant » (règle `[XX]` de `CLAUDE.md`) est visible partout et pas dessiné. Tournesol répète trois fois « ANCIEN APPRENANT » comme titre.

**P6. [DA] Bloc « soutenir »** (`def-y3000.png`, `lbm-y2700.png`, `tournesol-y2500.png`).
- Aplat saturé de la couleur du projet, paragraphe en blanc gras à 17px : lecture lourde sur corail.
- Contrastes du blanc : 3,68:1 sur corail, 3,49:1 sur ocre (échec en petit texte). Le bouton principal or sur corail ne se détache que par sa luminosité (or/corail : 1,76:1) et vibre.
- Grappe de logos en 2-3-1 : le dernier rang est orphelin ; un logo est délavé (Les Bords de Mer).
- Ce bloc est la seule chose qui distingue visuellement les 5 pages entre elles : une couleur par projet, mais aucune autre différence de structure ni de photo dominante.

**P7. [DA] Fin de page** (`def-y3600.png`, `def-y4200.png`). La page se termine sur la presse, un vide d'environ 200px, la galerie (bandeau de 400px sans légende, en défilement), puis un vide de 140px et le footer. Aucun lien vers les autres projets : on repart par le menu ou le footer.

**P8. [DA] Hero** : le médaillon du logo à cheval sur le bas du hero est un beau détail, mais le logo de La Table de Cana y est illisible (texte de 8px dans un cercle de 110px, `projet-cana-1280.png`).

**P9. [DA] Mobile** (`m-def-y3000.png`) : la pastille passe sur le contenu ; le bouton flottant recouvre le texte du bloc « soutenir » (« Le parcours est gratuit pour les f… ») ; le fondu de bord du défilement de témoignages masque la moitié de la première carte.

#### Footer (toutes pages)

**F1. [DA] Le paragraphe de présentation est presque invisible** (`def-y4200.png`). `.footer__brand p` a la couleur `#3D5E63` (`--ink-mid`) sur fond teal foncé : **1,7:1**. Cause : la règle globale `p { color: var(--ink-mid) }` de `_tokens.css` fuit sur les blocs sombres, comme celle de `h1..h3`. Or c'est ici qu'est dite la nature non lucrative de l'association. Les mentions légales du bas sont à 12px, blanc à 55 % (4,77:1 sur teal foncé, variable sur la photo floutée). Les deux icônes de réseaux sont en partie recouvertes par le bouton flottant.

---

### Lecture des axes suivants

Les axes 1 à 9 ci-dessous portent sur tout le site. Les écarts entre la DA de référence et le design system y sont étiquetés **[DS]** : ce sont des points à documenter, pas des défauts.

### Axe 1. Cohérence du système

**1.1 Valeurs codées en dur, feuille par feuille.** Comptes issus de recherches ciblées (les `#fff` et `#000` sont comptés dans « hex »).

| Feuille | Lignes | `var(--…)` | hex | `rgba()` | `font-size` en px | `font-size` en `clamp` | `border-radius` en px | Ombres non tokenisées | Transitions sans `--ease-out` ni `cubic-bezier` |
|---|---|---|---|---|---|---|---|---|---|
| `styles.css` | 723 | 220 | 48 (46 sont `#fff`) | 58 | **96** | 1 | **50** | 9 sur 20 | 13 sur 33 |
| `home-b.css` | 346 | 96 | 43 | 41 | 28 | 10 | 23 | 10 (aucun token) | **25 sur 28** |
| `about.css` | 194 | 43 | 20 | 14 | 18 | 9 | 8 | 2 (aucun token) | 5 sur 7 |
| `projet-def.css` | 333 | 107 | 29 | 25 | 26 | 3 | 2 | 3 sur 7 | 5 sur 13 |
| `projet-lbm.css` | 302 | 102 | 24 | 26 | 25 | 3 | 2 | 4 sur 8 | 5 sur 13 |
| `projet-restaure.css` | 290 | 99 | 23 | 23 | 24 | 4 | 2 | 4 sur 8 | 3 sur 11 |
| `projet-table-de-cana.css` | 295 | 101 | 23 | 25 | 25 | 3 | 2 | 3 sur 7 | 5 sur 13 |
| `projet-tournesol.css` | 287 | 102 | 23 | 25 | 24 | 3 | 3 | 3 sur 7 | 5 sur 14 |

Tokens jamais ou presque jamais utilisés : `--fs-*` (0 usage dans les 8 feuilles), `--s-*` (4 usages, tous dans `about.css` ; `Pages.jsx` en utilise via inline), `--r-*` (0 dans `styles.css`, `home-b.css`, `about.css` ; environ 10 par feuille projet), `--sh-*` (0 dans `home-b.css` et `about.css`). Les feuilles `styles.css` et `home-b.css` posent leurs propres valeurs à la place. Les 297 `style={{…}}` de `Pages.jsx` (et 26 dans `Sections.jsx`) échappent aussi à tout contrôle par les feuilles.

Autres valeurs en dur relevées : padding de section `clamp(64px,10vw,130px)` et `clamp(60px,9vw,120px)` sur les 5 projets (le système dit 96px), `.pdef-crumb2` à `28px` codé en dur (le commentaire de `projet-def.css` l.75 le dit lui-même), 15 rayons distincts (3, 5, 6, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26px) contre 8 à 14px au design system, ombres teintées brun (`rgba(40,14,4,…)`) dans les blocs « soutenir » des projets, couleurs hex d'éléments d'interface dans le JSX (FAB : `#E4572E`, `#1D6B78`, `#E8A825`, `#9A5BA8`).

**1.2 Écarts entre `_tokens.css` et le design system.** Je liste, je ne tranche pas. **[DS]** Lecture révisée : les écarts qui sont la DA validée (capitales, H1 jusqu'à 150px, `--teal-deepest`, aplats or, parallaxe, hero photo) sont à documenter dans le design system ; ceux qui sont des défauts d'exécution (ombre dorée du bouton flottant, deux hover pour l'or, trait des icônes, hex non tokenisés) sont à corriger.

| Sujet | Design system | `styles/_tokens.css` et feuilles | Écart |
|---|---|---|---|
| Teal, gold, crème, encre, tints | `#1D6B78`, `#E8A825`, `#F7F3EC`, `#0D2B30`… | mêmes valeurs | Aucun |
| Teal très foncé | absent | `--teal-deepest #06211F` (utilisé par le hero de l'accueil) | Ajout |
| Corail | absent | `#E4572E` (bouton Don, blocs « soutenir » de Des Étoiles et des Femmes, FAB, méga-panneau) ; `#C8461F` en hover, codé en dur ×3 ; défini seulement dans le scope `.pageProjetDef`, mais codé en dur dans `home-b.css` (×4), `about.css`, `Sections.jsx`, `data.js` | Ajout, non tokenisé globalement |
| Violet | absent | `#9A5BA8` (FAB, méga-panneau, `about.css`, `projet-def.css`) | Ajout |
| Couleurs de projet | absentes | terracotta `#A3543D` (Beaux Mets), olive `#5B6E1E` et `#3C4A14` (Restaure), ocre `#C1791A` (Tournesol), vin `#7A2E3A` (Cana), chacune définie dans le scope de sa page | Ajout de 5 couleurs |
| Hover de l'or | `#F5C84A` (gold-light) ; la prose du README dit aussi « or → `#D29719` » | `.btn--gold:hover` = `#D29719` codé en dur (`styles.css` l.28) ; `.btnb--gold:hover` = `--gold-light` | Deux comportements sur le même bouton |
| Usage de l'or | 4 usages (pill d'accroche, CTA hero, chiffres, italique) | aplat de section entier (`.vmarquee`, `.b-mission` sur l'accueil), fond du FAB, pastilles d'avatar, puces, 140 références `var(--gold…)` dans les feuilles | Élargi |
| Ombres | teintées teal, jamais dorées | ombre du FAB `rgba(232,168,37,.42)` : dorée (`styles.css` l.705-706) | Écart direct |
| Tailles | H1 56 à 72, H2 40, H3 28 | `--title` jusqu'à 150px, `--h2` jusqu'à 88px, `--h3` jusqu'à 26px (`_tokens.css`, bloc « home portée ») ; deux échelles dans le même fichier | Deuxième échelle non documentée |
| Graisses | 300, 400, 500, 700 | 300, 400, 600, 700 utilisés ; le 500 (`festin-display.ttf`) n'est jamais utilisé ; le 600 vient de Google Fonts (`@import`), pas du dossier `typos/` | Écart |
| Rayons | 8 à 14, boutons 6, pills 999 | 3 à 26 + 999 | Étendu |
| Icônes | Lucide, trait 1,5px | 68 `data-lucide` sans réglage de trait : rendu à 2px par défaut ; SVG maison à `strokeWidth` 2 et 2,4 (`Nav.jsx` l.104, `HomeB.jsx` l.303, `Sections.jsx` l.262) ; Lucide chargé en `@latest` non épinglé | Écart |
| Section | 96px, container 1200px, marges 32px | `.wrap` 1440px (accueil), 1280px (projets), `.container` 1200px (pages fonctionnelles), `.ab-sec` à `--s-9` sans wrap défini ; marges `clamp(20px,5vw,96px)` ou 32px fixes | Trois largeurs |
| Éléments fixes | « seulement la navigation » | pastille nav, bande fil d'Ariane fixe de 28px sur les 5 projets, bouton flottant | Écart |

**Référence couleur alternative** (`#217078` / `#FFC100`), écarts de rendu chiffrés sans choisir :

- Teal : `#217078` est un peu plus clair et plus vert que `#1D6B78`. Contraste du blanc dessus : 5,75:1 contre 6,13:1. Sur crème : 5,20:1 contre 5,54:1. Les deux passent 4,5:1.
- Or : `#FFC100` est nettement plus saturé et plus jaune que `#E8A825` (plus ambré). Contraste de l'encre dessus : 9,17:1 contre 7,16:1 (les deux passent). En texte or sur crème : 1,47:1 contre 1,89:1 (les deux échouent, l'or ne peut pas servir de couleur de texte sur clair dans aucun des deux cas). Sur `#0A2D33` : 8,97:1 contre 7,0:1.
- Conséquence de mise en œuvre : `#E8A825` est codé dans `_tokens.css` (3 tokens or), mais aussi 140 références `var(--gold…)`, plus des hex littéraux (`#E8A825`, `#D29719`, `#A6770F`, `rgba(232,168,37,…)`) dans `styles.css`, `home-b.css`, `Sections.jsx`, `data.js`. Un changement de palette ne se fait donc pas en un seul endroit tant que ces valeurs ne sont pas tokenisées (voir §4, chantier F).

**1.3 Pages qui ne ressemblent pas aux autres.**

- **La DA de référence et les pages à aligner.** Référence : accueil et 5 projets (capitales, gras, H1 de 102 à 128px, italique en `--gold-light`, hero photo pleine hauteur, pastille de nav sur photo) ; À propos suit cette DA avec sa propre échelle (H2 64px, H3 20px). À aligner : Académie, Formations, fiche, Impact, Contact, Sadi Carnot, 2 Accompagnements, Actualités (casse de phrase, H1 de 64px, italique en `--gold`, bandeau teal profond à quadrillage, sans photo). Ces pages appliquent le design system à la lettre (casse de phrase, H1 64px), pas la DA validée. Captures : `home-1280.png`, `projet-def-1280.png` (référence), `academie-1280.png`, `impact-1280.png` (à aligner).
- **Mentions légales** : page HTML autonome, hors système (voir axe 5).
- **Fiche formation** : H2 à 24px sous un H1 à 64px, alors que la liste met ses H2 à 40px (`formation-vss-1280.png`, `formations-1280.png`).
- **Sadi Carnot** : 1 845px de haut, 0 image, une carte centrée ; c'est la page la plus vide du site (`sadi-carnot-390.png`).
- **À propos** : 20 tailles de police distinctes, la page la plus fragmentée, et le seul H3 à 20px sous un H2 à 64px.

### Axe 2. Mise en page et rythme

**2.1 Longueur et densité** (hauteur totale du document, en px ; entre parenthèses, en écrans de 800px à 1280 et de 844px à 390).

| Page | 1280px | 390px |
|---|---|---|
| Accueil | 8 478 (10,6) | 12 573 (14,9) |
| À propos | 8 430 (10,5) | 9 358 (11,1) |
| Des Étoiles et des Femmes | 5 288 (6,6) | 7 070 (8,4) |
| Les Beaux Mets | 5 679 | 7 421 |
| La Table de Cana | 5 035 | 6 610 |
| Restaure | 5 185 | 6 692 |
| Tournesol | 5 003 | 6 734 |
| Académie | 4 520 | 6 894 |
| Formations (liste) | 3 831 | 5 507 |
| Formation (fiche VSS) | 3 124 | 4 743 |
| Impact | 4 125 | 5 709 |
| Accompagnement insertion | 4 079 | 6 130 |
| Accompagnement professionnels | 4 024 | 5 884 |
| Actualités | 3 877 | 6 451 |
| Contact | 2 214 | 3 630 |
| Sadi Carnot | 1 845 | 2 487 |

Sur mobile, l'accueil dépasse 14 écrans. C'est la page la plus longue, et celle où le visiteur arrive en premier.

**2.2 Rythme vertical et alternance des fonds.**

- **Accueil** (`home-b.css`, mesures à 1280) : hero image (800) → bandeau or (93) → aplat or « mission » (3 254, dont la section épinglée horizontale de l'approche) → bande logos off-white (262) → teal (1 295) → teal foncé (1 588) → teal profond (1 138) → crème (1 194). Deux aplats or d'affilée (bandeau et mission, 3 347px, 39 % de la page), puis trois aplats de teal de tons voisins d'affilée (4 021px, 47 %). L'alternance « aplats de couleur alternés » de `CLAUDE.md` est respectée sur le papier, mais deux blocs de 3 000 à 4 000px de la même famille ne créent pas de rythme. Section la plus vide : `.b-impact` a `padding:clamp(90px,14vw,190px)` et `min-height:clamp(520px,62vw,780px)`.
- **Projets** (les 5, identiques) : hero photo (624) → crème « chiffres » (603) → teal foncé « le projet » (994 à 1 314) → crème témoignages (621 à 841) → aplat de couleur de projet « soutenir » (522 à 592) → crème presse (594 à 616) → crème galerie (400). Quatre défauts : (a) la section « presse » et la galerie sont toutes deux crème et se suivent sans séparation (Des Étoiles et des Femmes, Les Beaux Mets, Restaure) ; (b) le bloc « chiffres » fait 603px sur 4 des 5 pages (608px sur la cinquième), signe du gabarit unique ; (c) le seul élément qui distingue les 5 pages est la couleur du bloc « soutenir » (corail, terracotta, olive, ocre, vin) ; (d) la galerie est un bandeau de 400px sans titre, qui clôt la page sur une image sans appel à l'action.
- **Pages à aligner** (hors DA) : bandeau teal profond (442 à 543) → alternance off-white / crème / teal selon `Pages.jsx`. Académie : 4 520px pour 5 blocs dont un de 1 633px (la grille des 5 parcours) ; Accompagnement insertion : un bloc de 1 543px.
- **Sections qui se ressemblent** : « Le projet » de chaque page projet est la même mise en page (accordéon 3 items + média) ; les cartes `dcard` de l'accueil et les cartes `public-card` d'Académie / Accompagnement sont deux versions de « deux publics, deux cartes » ; `ecocard`, `formation-card`, `sel-card` et `pillar` sont quatre cartes à image + titre + texte.

**2.3 Grille, alignements et largeurs de container.**

| Page | Largeur de contenu | Marges latérales |
|---|---|---|
| Accueil | `.wrap` 1440px | `clamp(20px,5vw,96px)` (64px à 1280) |
| Projets | `.pageProjet* .wrap` 1280px | `clamp(20px,5vw,96px)` |
| À propos | `.ab-sec` sans conteneur déclaré dans `about.css` (le contenu est posé par section) | non mesuré |
| Pages fonctionnelles | `.container` 1200px | 32px fixes |
| Mentions légales | 720px | 24px |

À 1280px, le contenu commence à 64px sur l'accueil et les projets, 72px sur les pages fonctionnelles : la colonne de texte se décale d'une page à l'autre, visible en passant de l'accueil à Académie. À 1440px, l'accueil garde un conteneur de 1440px alors que les pages fonctionnelles restent à 1200px.

### Axe 3. Typographie

**3.1 Tailles rendues à 1280px** (H1 / H2 / H3, en px ; graisse 700 partout sauf mention).

| Page | H1 | H2 | H3 | Nombre de tailles distinctes (texte visible) | Graisses |
|---|---|---|---|---|---|
| Accueil | 122 | 72 | **59** | 16 | 400, 700 |
| À propos | 102 | 64 | **20** | 20 | 300, 400, 600, 700 |
| Des Étoiles et des Femmes | 128 | 38 | 28 | 13 | 400, 600, 700 |
| Les Beaux Mets | 128 | 38 | 28 | 14 | 400, 700 |
| La Table de Cana | 128 | 38 | 28 | 14 | 400, 700 |
| Restaure | 128 | 38 (+48) | 28 | 12 | 400, 700 |
| Tournesol | 128 | 38 | 28 | 14 | 400, 700 |
| Académie | 64 | 40 | 22 / 20 | 12 | 400, 600, 700 |
| Formations | 64 | 40 | 20 | 10 | 400, 600, 700 |
| Fiche formation | 64 | **24** | (aucun) | 8 | 400, 600, 700 |
| Impact | 64 | 40 | 18 | 9 | 400, 600, 700 |
| Contact | 64 | 40 | 24 | 9 | 400, 600, 700 |
| Actualités | 64 | (aucun) | **15** | 8 | 400, 600, 700 |

Constats :

- **Hiérarchie écrasée.** Accueil : H2 72px, H3 59px (rapport 1,2, alors que le design system prévoit 40 / 28, soit 1,43). À propos : H2 64px, H3 20px (rapport 3,2, l'inverse : le H3 disparaît). Actualités : pas de H2, les titres d'article sont des H3 à 15px, sous un H1 de 64px, avec 64 éléments de texte à 11px.
- **Texte trop petit.** 10px et 11px : 23 éléments sur l'accueil, 25 sur Des Étoiles et des Femmes, 64 sur Actualités (11px). Le design system fixe 12px comme minimum (eyebrow). Concernés : étiquettes `.dcard__tag`, `.ecocard__eb`, `.tchip` (10px), `.optA-col h5` (10,5px), `.optA-pill` (9,5px).
- **Deux systèmes d'eyebrow.** `.eyebrow` : 12px, `letter-spacing` 0,14em (design system). `.eyb` (accueil) : 11 à 13px, 0,26em. `.ab-eyebrow`, `.ecocard__eb`, `.dcard__kicker` : 11 à 12px, 0,16em. Cinq interlettrages différents pour un même composant.
- **Interlettrage négatif hétérogène** : -0,01, -0,015, -0,02, -0,025, -0,03, -0,035em selon les titres.
- **Longueur de ligne.** Les corps de texte sont bornés à 34 à 52 caractères par `ch` sur l'accueil (bon). Les blocs de `Pages.jsx` (Académie, Accompagnement) n'ont pas de limite de mesure sur la colonne de 1,3fr ; à 1280px elle porte des lignes d'environ 70 caractères, à la limite haute.
- **Débordements et orphelines.** Aucun titre ne déborde à 1280 ni à 390 (H1 mesurés dans leur conteneur : `scrollWidth` égal à `width`). Orpheline avérée : « 83 % » se coupe en « 83 » puis « % » à 390px sur la page Impact (`impact-390.png`). Le titre `.b-dual__h2` est en `nowrap` jusqu'à 560px de large : il tient à 1280 (830px de large dans 1152px), mais c'est une contrainte fragile si le texte s'allonge.
- **Deux registres de titre** : la DA de référence est en capitales (H1 de l'accueil, d'À propos et des projets ; H2 de l'accueil et d'À propos) ; les H2 des projets et toutes les pages à aligner sont en casse de phrase.
- **`_tokens.css`** définit `h1 { font-size: var(--fs-h1) }` (56px) et des `.h1`, `.h2`, `.display` qui sont ensuite écrasés dans chaque feuille : les tokens typographiques ne pilotent rien de ce qui est rendu.

### Axe 4. Composants

**4.1 Inventaire.**

| Composant | Où | Implémentations | Remarque |
|---|---|---|---|
| Boutons | tout le site | `.btn` (6 variantes, `styles.css` l.23-34), `.btnb` (`home-b.css` l.19-31), pastille Don (×3), FAB | 2 systèmes principaux, non fusionnés |
| Pills / étiquettes | tout le site | `.eyebrow`, `.eyb`, `.chip`, `.tchip`, `.dcard__tag`, `.optA-pill`, `.motif-pill`, `.nav__dd-pill`, `.public-card__tag`, `*-news__tag` ×5, `.pdef-tcard__badge` | 14 classes pour 3 formes réelles |
| Cartes | tout le site | `.dcard`, `.ecocard`, `.formation-card`, `.tcard`, `.fab-card`, `*-logocard` ; CSS orphelin sans usage JSX : `.sel-card`, `.public-card`, `.pillar` | 6 familles actives, rayons 10, 12, 14, 16, 22px |
| Blocs de chiffres | accueil, projets, Impact, À propos | `.istat` (accueil), `.pdef-stats2` × 5 (un par projet), cartes blanches de `ImpactPage` (styles en ligne dans `Pages.jsx`), `.ab-stat` (À propos) | 4 mises en forme du même composant |
| Témoignages | accueil, projets | `.tmarquee` + `.tcard` (accueil, défilement 64 s), `.pdef-tmarquee` (30 s), `ProjetTemoignages` (`Pages.jsx`, reste du gabarit générique) | 3 versions |
| Carrousels / défilements | accueil, projets, À propos | `.vmarquee`, `.tmarquee`, `.ab-logos__track`, `*-gallery__track` × 5, `.pdef-tmarquee__track` | 9 défilements infinis (voir axe 7) |
| Accordéon | projets | un accordéon de 3 items par projet, JSX et CSS dupliqués | mutualisable |
| Galeries | projets | `*-gallery` × 5, hauteur fixe 400px (528px sur Tournesol) | bande sans légende |
| CTA don | nav, footer, méga-panneau, FAB, blocs « soutenir » | `.navpill__don`, `.footer__don`, `.optA-don`, `.fab-card` « Faire un don », `.*-support__cta` | 5 emplacements, 3 rayons, 3 paddings |
| Fil d'Ariane | 2 formes, 6 feuilles | `.pdef-crumb2` et ses 4 équivalents (bande fixe de 28px, 5 projets), `.breadcrumb` (`PageHeader` et À propos) | voir 5.3 |
| Formulaires | Contact | `.field` (`styles.css` l.140), `.motif-pill` (radios en pastilles) | focus : bordure seule (voir axe 8) |
| Méga-panneau nav | toutes | `.optA-*` | 3 colonnes, 980px |

**4.2 Doublons à mutualiser.**

1. **Les 5 gabarits projet.** Preuve chiffrée : après remplacement du préfixe (`plbm` → `X`, `ptdc` → `X`), 216 lignes CSS uniques sur 264 sont communes à `projet-lbm.css` et `projet-table-de-cana.css` ; 158 lignes sur 287 côté JSX. Tournesol et Restaure : 142 lignes CSS communes. Seul le nom de la classe change (`pdef-`, `plbm-`, `ptdc-`, `prst-`, `pts-`, environ 74 à 87 classes chacune) et cinq variables de couleur (`--coral`, `--terracotta`, `--olive`, `--ocre`, `--wine`). Le gabarit serait un composant `ProjetTemplate` piloté par `data.js` et une variable `--accent`.
2. **Blocs de chiffres** : quatre mises en forme (`.istat`, `.pdef-stats2`, cartes de `ImpactPage`, `.ab-stat`).
3. **Boutons** : `.btn` et `.btnb` (déjà signalé dans `RAPPORT-AUDIT.md`, non fait, risque site-wide, environ 72 usages). Il vaut mieux les fusionner avant le gabarit projet.
4. **Bouton Don** : trois classes pour un composant.
5. **Fil d'Ariane** : deux composants, dont la bande fixe recopiée dans 5 feuilles.
6. **CSS orphelin** : `.sel-card`, `.public-card`, `.pillar` sont définis (26 règles) sans aucun usage JSX trouvé.
7. **Défilement infini** : neuf implémentations CSS (`@keyframes` distincts : `prism`, `tmarq`, `ab-marquee`, `pdefTestiScroll`, `pdefGalleryScroll`, `plbmGalleryScroll`, `prstGalleryScroll`, `ptdcGalleryScroll`, `projets-marquee-scroll`) pour un même mouvement ; seule la durée change (30, 34, 40, 48, 64 s).
8. **Code mort à confirmer** : 12 composants sans aucun usage JSX trouvé (`Ticker`, `Academie`, `Publics`, `Temoignages` dans `Sections.jsx`, `ProjetsMarquee`, `Engagement`, `Journal`, `RetombeesPresse`, `PartenairesMarquee`, `ImpactCumuleBande`, `ProjetAssociatif`, `EcosystemeSection` dans `Pages.jsx`), plus le gabarit générique `ProjetPage` et ses satellites (`ProjetHero`, `ProjetTemoignages`, `ProjetPresse`, `ProjetMediaEmbed`, `CarouselMedia`, `ProjetThumb`), qui ne s'exécute que pour un identifiant de projet inconnu. Comptage par recherche des balises JSX ; à confirmer avant suppression.

**4.3 États manquants.**

- **Focus visible** : présent sur `.btn`, `.btnb`, les liens du méga-panneau et des feuilles projet. Absent sur `.field input/select/textarea` (`styles.css` l.140 : `outline:none` et seule la bordure passe au teal), sur `.fab-card`, `.formation-card`, `.sel-card`, `.public-card` (feuille `styles.css`, 3 `:focus-visible` pour 37 `:hover`), et sur les cartes `.dcard`, `.ecocard` de l'accueil (`home-b.css` : 5 `:focus-visible` pour 19 `:hover`).
- **Active** : 1 règle dans `styles.css`, 1 dans `home-b.css`, 0 dans les 6 autres feuilles.
- **Disabled** : géré sur `.btn` et `.btnb` ; aucun état désactivé pour les champs.
- **Erreur de formulaire** : aucun style `:invalid`, aucun `aria-invalid`. La seule validation est celle du navigateur. Déjà signalé dans `RAPPORT-AUDIT.md`, non fait.
- **Hover sur `.optA-list a.disabled`** : neutralisé (correct).
- **Bouton flottant** : `Escape` ferme, mais le focus ne revient pas au bouton (contrairement au méga-panneau qui restitue le focus).

### Axe 5. Navigation et parcours

**5.1 Navigation.** La navigation est une pastille centrée (logo, Don, Menu) qui ouvre un méga-panneau à 3 colonnes (thématique, projet, accès rapide). Points forts : le panneau ferme sur `Escape`, piège le focus, le restitue à la fermeture, porte `role="dialog"` et `aria-modal`. Points à corriger :

- **Aucun lien visible dans la barre.** Toute la navigation est derrière « Menu » : à la première visite, ni Impact, ni Formations, ni Contact ne sont visibles. C'est un choix de la maquette (référence Fixa) ; il coûte en découvrabilité pour les profils qui ne cherchent pas un projet précis (financeur, journaliste).
- **Zones tactiles.** Pastille (mesurée à 390px) : Don 78 × 40px, Menu 85 × 34px, logo 29 × 22px, tous sous 44px de haut. Dans le méga-panneau à 390px : 8 liens de 329 × 36px et 4 liens de 313 × 42px (`.optA-list a`, `.optA-quick a`).
- **Lien mort** : `Nav.jsx` l.35 pointe `#/sadi-carnot`, or le routeur attend `#/restaurants/sadi-carnot` (`index.html`) ; le lien est marqué `disabled`, donc invisible, mais dès qu'il sera activé il mènera à la page 404.
- **Trois éléments fixes sur les projets** : bande fil d'Ariane (28px, blanche translucide), pastille nav, bouton flottant. Sur `projet-def-1280.png`, la bande et la pastille s'empilent en haut d'écran et mangent 98px de hero.

**5.2 Bouton flottant « Agir maintenant ».** Cinq actions (don, réserver une table, se former, recruter, devenir partenaire). Doublons : le don existe déjà dans la pastille de nav et dans le footer ; « Se former » et « Recruter » sont les deux cartes de l'accueil. Problèmes visuels : ombre dorée (hors design system), sur mobile le bouton se réduit à une icône dorée qui passe sur le bandeau doré de l'accueil (`home-390.png` : l'icône se confond avec `.vmarquee`) ; il cache le bord droit du contenu sur les pages fonctionnelles (`impact-1280.png` : il recouvre la 4ᵉ carte de chiffres). Le design system dit « pas de CTA sticky » : la règle est déjà contournée.

**5.3 Fil d'Ariane.** Trois formes (voir 4.1). Sur les projets à 390px, la bande se réduit à « ACCUEIL/ … » (le parent « Nos projets » est masqué par `.pdef-crumb2__rest`), et le séparateur « / » est collé au mot qui le précède (« ACCUEIL/ NOS PROJETS », visible dans `projet-cana-1280.png`).

**5.4 Footer.** Trois colonnes de liens (Nous contacter, S'engager, Nos projets) plus un bouton Don. Absents : À propos, Notre impact, Actualités, Formations, mentions légales. « Partenaires & financeurs » et « Mécénat » pointent tous deux vers `#/contact`, comme l'icône LinkedIn (`Sections.jsx` l.265). Pas de lien vers la page de mentions légales ; le bloc légal statique de `index.html` est visible en bande crème sous le footer, avec ses styles en ligne (il est voulu tel quel pour la lecture du HTML brut, voir le commentaire de `index.html`).

**5.5 Mentions légales** (`mentions-legales.html`). Page autonome : ni nav, ni footer, ni tokens, `font-family:'KoHo'` sans aucun `@font-face` ni feuille liée, donc typographie système. Seul lien retour : « ← Retour à grandfestin.com ». Elle n'est liée depuis aucun composant React.

**5.6 Parcours depuis l'accueil.**

| Profil | Chemin | Verdict |
|---|---|---|
| **Personne qui cherche une formation** | Accueil, carte « Apprendre un métier de cuisine, gratuitement » → Accompagnement insertion → Formations → fiche | Chemin clair (4 clics). Le FAB « Se former / candidater » mène à la liste. Pas de cul-de-sac. |
| **Restaurateur** | Accueil, carte « Recruter, former et garder vos équipes » → Accompagnement professionnels → Contact | Chemin clair. Le contact est un formulaire générique : rien ne distingue un restaurateur d'un particulier hors de la case « motif ». |
| **Financeur** | aucune entrée dédiée ; Menu → « Notre impact » (2 clics), ou footer « Partenaires & financeurs » → formulaire de contact | **Cul-de-sac de fait.** L'ordre logique (chiffres, rapports, prix, budget) existe sur Impact, mais le lien du footer le contourne. Impact est absent du footer et n'a pas de CTA de sortie vers un contact « partenaire ». |
| **Journaliste** | Menu → Actualités (revue de presse) ; pas de page presse, pas de dossier, pas de visuels téléchargeables, pas de contact presse | **Cul-de-sac.** Il retombe sur le formulaire de contact générique. |
| **Sadi Carnot** | non atteignable (lien nav désactivé et faux) | Page orpheline |

### Axe 6. Images et médias

- **Poids** (somme des `Content-Length` des images de la page, mesurée sur le serveur local) : accueil 57,4 Mo (20 images), À propos 55,0 Mo (27 images), Des Étoiles et des Femmes 42,8 Mo (19), Académie 13,5 Mo (5), Les Beaux Mets 5,3 Mo (10). Les 82 fichiers d'`images/` pèsent 113 Mo au total ; 22 dépassent 1 Mo. Les plus lourds : `photo-applaudissements.jpg` 15,5 Mo (5940 × 3960 px), `photo-promo-groupe.jpg` 10,7 Mo (5166 × 3444), une photo `_DEF_ATELIERPATISSERIEF…` de 9,5 Mo, `photo-tabliers-violets.jpg` 6,2 Mo, `photo-patisserie.jpg` 5,0 Mo.
- **Pas de format ni de taille adaptés** : 0 `srcset`, 0 `<picture>`, un seul format (JPEG), aucun WebP ni AVIF (1 fichier `.webp` et 2 `.avif` dans tout `images/` ; leur usage n'a pas été vérifié).
- **Chargement différé** : bon sur les images sous le pli (21 images sur 37 en `loading="lazy"` à l'accueil ; 28 sur 35 à À propos). À corriger : sur À propos, 7 images sont chargées immédiatement (dont `photo-applaudissements.jpg`, 16 Mo, et `photo-promo-groupe.jpg`, 11 Mo) alors qu'elles sont réparties le long de la page ; sur l'accueil, les 16 logos du bandeau (répétés pour le défilement) ne sont pas différés.
- **Résolution du hero d'accueil** : `photo-chapeau-cuisine.jpg` fait 1000 × 1500px en portrait, affichée en paysage plein écran (`.hero__media` à 116 % de hauteur avec parallaxe) : agrandie environ 1,3 fois à 1280px, elle est visiblement adoucie sur `home-1280.png`.
- **Rayons et traitements** : cartes en 10, 12, 14 et 22px ; images en `object-fit:cover` partout (bon) ; overlays `--grad-teal-overlay` sur les cartes et heros projet (conforme) ; dominante teal-vert sur les heros à cause du scrim et de `.hero__prism` (mix-blend soft-light, 60 %) : les tons de peau et de cuisine tirent vers le vert sur `home-1280.png`, alors que le design system demande des tons chauds et légèrement désaturés.
- **Ratios** : `dcard` 16/10, `ecocard` 3/2, `b-impact__ph` 4/5, `qband` 24vw de haut, galeries projet 400px fixes : cinq ratios sans règle commune.
- **Cadrages** : pas de point focal (`object-position`) sur la plupart des cartes ; photos d'angle rognées et recouvertes par le sous-titre sur `about-390.png`.

### Axe 7. Motion

| Animation | Où | Durée | Courbe | Verdict |
|---|---|---|---|---|
| Fondu de révélation `.reveal` | accueil et pages | 350 ms | `cubic-bezier(.22,1,.36,1)` | Sert la lecture. Le design system dit 600 ms ; le rapport précédent l'a ramené à 350 ms volontairement |
| Titre du hero, sous-titre, CTA (GSAP) | accueil | 0,9 à 1,6 s | `power3.out`, `expo.out` | Sert l'entrée ; les 1,6 s sont longues pour la première impression |
| Parallaxe du hero (`yPercent:10`, scrub) | accueil, À propos | continue | linéaire | **Décore.** Va contre « pas de parallax » |
| `.hero__prism` (dégradé animé en boucle) | accueil | 14 s, boucle infinie | `ease-in-out` | **Décore**, sans lecture ; peut disparaître sans perte |
| Défilement `vmarquee` (bandeau or) | accueil | pilotée à la vitesse du scroll | linéaire | Décore, sauf s'il porte un contenu qu'on ne retrouve pas ailleurs |
| Défilement `tmarquee` (témoignages) | accueil | 64 s, boucle | linéaire | Contenu utile masqué ; pause au survol seulement |
| Section épinglée horizontale `#approche` | accueil | scrub 1 | linéaire | **Relie** trois étapes ; c'est le composant horizontal interactif de l'accueil (limite du système : 2 par page) |
| Photos qui s'éparpillent `b-impact__ph` | accueil | 1,1 s | `cubic-bezier(.16,1,.3,1)` | Décore ; sert l'entrée, ne compare rien |
| Fil Festin (tracé SVG) | accueil | scrub | linéaire | Relie les blocs ; effet discret |
| Section épinglée horizontale de l'histoire | À propos | scrub .6 | linéaire | **Relie** une chronologie (2 894px de section épinglée) |
| Photos dispersées du hero | À propos | scrub .5 | linéaire | Décore |
| Défilements de logos, témoignages, galeries | À propos, 5 projets | 30 à 48 s | linéaire | 4 à 5 par page sur les projets ; aucune commande de pause |
| Hover des cartes | partout | 200 à 300 ms, `translateY(-6px)` sur l'accueil, `-3px` au design system | `--ease-out` ou `ease` | Sert le retour visuel ; -6px dépasse la règle |
| Zoom d'image au hover | `dcard`, `ecocard` | 600 ms, `scale(1.06–1.07)` | `ease` par défaut | Correspond au design system (1,04) à peu près |
| `festin-bob` (rebond) | `styles.css` l.366 | 2,4 s, boucle | `ease-in-out` | **Décore** : le design system interdit les rebonds ; à confirmer si l'élément est encore monté |
| Ouverture du méga-panneau | nav | 200 ms | `ease` | Sert ; à passer sur `--ease-out` |
| Apparition des cartes du FAB | FAB | 320 ms, échelonnée | `--ease-out` | Sert |

Écarts de courbe : 63 usages de `var(--ease-out)`, 17 `cubic-bezier(.22,1,.36,1)` en dur (même valeur), 3 `cubic-bezier(.16,1,.3,1)` en dur (autre courbe), 3 `ease-in-out`, 3 `ease`. `home-b.css` : 25 transitions sur 28 sans courbe explicite.

**`prefers-reduced-motion`** : respecté sur toutes les feuilles (1 à 4 règles par feuille) et dans le JS (GSAP, Lenis, marquees). `home-b.css` coupe tout globalement (`animation:none!important`). Deux réserves : (1) les marquees infinis des 5 pages projet n'ont pas de commande de pause pour un utilisateur qui n'a pas activé la réduction de mouvement (critère WCAG 2.2.2, contenu qui défile plus de 5 secondes) ; (2) Lenis est actif sur tout le site et il modifie la vitesse et le ressenti du scroll natif (désactivé en réduction de mouvement, correct).

**Ce qui manque** : un retour d'état sur les liens (soulignement animé), une transition entre pages (le routeur par hash remonte en haut sans transition), un indicateur de progression sur les pages longues (accueil, 14 écrans sur mobile).

### Axe 8. Accessibilité et responsive

**8.1 Contrastes** (calculés depuis les valeurs de rendu ; seuils 4,5:1 texte, 3:1 grand texte et interface).

| Élément | Couleurs | Ratio | Verdict |
|---|---|---|---|
| Italique or dans les H1/H2 des pages fonctionnelles sur fond clair (`Former autrement, certifier vraiment.` sur Académie) | `#E8A825` sur `#FEFCF8` | **2,04:1** | Échec (grand texte, 3:1 requis) |
| Astérisque « obligatoire » du formulaire | `#E8A825` sur blanc | **2,09:1** | Échec |
| Texte blanc sur les blocs « soutenir » de Des Étoiles et des Femmes et du bouton Don | blanc sur `#E4572E` | **3,68:1** | Échec en petit texte, passe en grand texte |
| Idem pour Tournesol | blanc sur `#C1791A` | **3,49:1** | Échec en petit texte, passe en grand texte |
| Idem pour Les Beaux Mets, Restaure, La Table de Cana | blanc sur `#A3543D`, `#5B6E1E`, `#7A2E3A` | 5,39, 5,68, 9,21 | Passe |
| Étape inactive de l'approche (accueil) | `rgba(15,60,68,.42)` sur or | **2,01:1** | Échec |
| Texte courant `--ink-mid` sur l'aplat or de la mission | `#3D5E63` sur `#E8A825` | **3,38:1** | Échec en texte courant (l'accueil met surtout `--teal-dark`, 5,75:1 : à vérifier bloc par bloc) |
| Texte or clair sur teal (eyebrow, italique) | `#F5C84A` sur `#1D6B78` | 3,86:1 | Échec en petit texte (eyebrow 11 à 13px), passe pour l'italique du grand titre |
| Paragraphe de présentation du footer [DA] | `#3D5E63` sur teal foncé `#0F3C44` | **1,7:1** | Échec |
| Bouton principal or sur le bloc « soutenir » corail [DA] | `#E8A825` sur `#E4572E` | **1,76:1** | Échec d'interface (3:1 requis) |
| Blanc sur violet des cartes de chiffres [DA] | blanc sur `#9A5BA8` | 4,73:1 | Passe de peu |
| Teal sur crème, `--ink-soft` sur crème, teal-dark sur or | | 5,54, 5,16, 5,75 | Passent |
| Blanc à 72 %, à 55 % et à 82 % sur teal profond et teal | | 8,22, 4,77, 4,94 | Passent |

Le blanc sur l'or (2,09:1) n'est pas utilisé en texte à ma connaissance (le CTA or porte de l'encre).

**8.2 Zones tactiles de 44px.** Sous 44px : pastille de nav (voir 5.1), méga-panneau (36 et 42px), crumb de projet (48 × 17px), `pts-projet__dot` (8 × 8), boutons `.btnb` de 350 × 43px sur mobile (43px), champ radio de contact (13px de haut, mais label cliquable : à confirmer). `RAPPORT-AUDIT.md` annonçait des zones ≥44px : c'est vrai pour les boutons, faux pour la nav et le panneau.

**8.3 Navigation clavier** (lecture du code, non parcourue). Points positifs : `:focus-visible` sur les boutons et liens des feuilles projet, focus rendu au déclencheur à la fermeture du panneau, `aria-expanded`/`aria-controls` sur Menu. Le méga-panneau piège bien le focus quand il est ouvert et se ferme sur `Escape` (`Nav.jsx` l.71-79). Manques : pas de lien d'évitement (« Aller au contenu »), liens du panneau fermé encore dans l'ordre de tabulation (le panneau porte `aria-hidden` mais seulement `opacity:0` et `pointer-events:none`, sans `inert` ni `visibility:hidden`), FAB sans retour de focus, champs de formulaire sans anneau de focus.

**8.4 Débordements.** `html` et `body` ont `overflow-x:hidden` : il n'y a **aucun défilement horizontal mesuré** (`scrollWidth` = 390 sur les 16 routes). C'est un masque, pas une résolution : à 390px, du contenu sort du viewport et est coupé sur Académie (bord droit 483px), Impact (452 à 622px), Accompagnement insertion (403 à 590px), Accompagnement professionnels (417 à 496px) et À propos (tuiles à 402 à 416px). Cause de Académie : `Pages.jsx` pose un `style="display:grid;grid-template-columns:1.3fr 1fr;gap:80px"` sans point de rupture ; à 390px les colonnes mesurent 187 et 183px. Le contenu de la colonne de droite est donc serré en 183px (`academie-390.png`).

**8.5 Autres.** 21 `alt=""` dans les composants : décoratifs pour la plupart, mais à vérifier image par image (photos de personnes). `lang="fr"` présent. Un seul `<main>`. Lucide est chargé en `@latest` non épinglé (unpkg) et Babel compile le JSX dans le navigateur à chaque visite : ces deux points pèsent sur le temps de premier rendu (poids non mesuré ici).

### Axe 9. Modernité : écart avec les inspirations

État actuel de la DA de référence (voir §2.0) : hero photo plein écran (bon), bandeau et aplat or de 3 300px (lourd), cartes de deux publics, section horizontale épinglée, écosystème en cartes sombres, photos éparpillées, mur de témoignages défilants ; côté projets, un gabarit unique à aplat coloré en fin de parcours. C'est riche en mouvement ; ce qui vieillit est la **grammaire des composants** : grandes surfaces uniformes, cartes aux coins arrondis identiques, listes de cartes sans hiérarchie, chiffres sans identité. Les inspirations apportent des motifs de mise en page plus que des effets. Les motifs 1 à 8 et 12 à 13 visent la DA de référence ; les motifs 3, 9 et 10 visent aussi les pages à aligner.

| # | Motif précis | Inspiration | Où l'appliquer | Effort |
|---|---|---|---|---|
| 1 | **Mot clé en pastille** : un mot du H2 posé sur une pastille de couleur (fond pâle, coins arrondis), au lieu d'un seul italique doré. Corrige aussi le contraste (texte encre sur pastille or pâle). | `insp1` (SENSE, « ОТКРЫВАЙ НОВЫЕ ГОРИЗОНТЫ » sur pastille lilas) | H2 de l'accueil, d'Académie, d'Impact | S |
| 2 | **Carte à barre d'étiquette basse** : image plein cadre, barre blanche arrondie en bas avec le nom et un bouton circulaire flèche. | `insp1` (cartes des directions de danse) | Cartes écosystème de l'accueil (`ecocard`), cartes de formations | M |
| 3 | **Lignes colorées pour une liste** : chaque élément est une barre arrondie pleine largeur, une couleur par ligne, avec colonnes (titre, période, lieu). | `insp5` (ACPAV, « Our current projects ») | Liste des 5 formations (Durée / Public / Financement), Actualités par date | M |
| 4 | **Carte à double aplat** : moitié haute en aplat de couleur avec titre en capitales colorées, moitié basse photo. | `insp5` (ACPAV, « Latest releases ») | Les 5 projets sur l'accueil et sur `#/impact` ; réutilise les 5 couleurs de projet déjà en place | M |
| 5 | **Chiffres à couleur propre** : chaque grand chiffre dans une couleur différente, avec suffixe (« k », « + »), séparés par un filet vertical. | `insp4` (Found : 46 ha, 15k, 84k, 360) ; `insp2` (Donatia : 250K+, 12+, 2,2M) | `.istat` de l'accueil, `#/impact`, bloc chiffres des projets (441, 83 %, 14) : une couleur par chiffre, tirée des couleurs de projet | S |
| 6 | **Trois cartes inclinées** : trois cartes de couleurs distinctes, légèrement pivotées (2 à 3°), en léger chevauchement. | `insp4` (Found : Found / Living / Spaces) | Accompagner / Former / Transformer (accueil), 3 leviers de `#/accompagnement/professionnels` | M |
| 7 | **Méga logotype en pied de page** : le mot « festin » à la largeur du container, en bas du footer, en couleur or ou crème sur teal. | `insp2` (Donatia), `inspisite3` (amble, mot géant sur la photo) | Footer (une maquette existe : `footer-maquettes.html`) | S |
| 8 | **Lede géant sur aplat pâle** : un paragraphe de mission à 32 à 40px, graisse 300, sur `--gold-pale`, avec une étiquette « / L'association » à gauche. | `inspisite3` (amble, texte de tête sur aplat beurre) | Introduction de l'accueil (à la place de l'aplat or complet), page À propos | S |
| 9 | **Bande titre colorée** : le H1 posé sur une bande pleine largeur d'un aplat de couleur (une couleur par page), au-dessus d'une photo. | `inspisite` (CRAD, « School of Visual Arts and Design » sur bande lilas) | En-têtes des pages à aligner, ce qui les rapproche de la DA de référence et remplace le quadrillage teal par un traitement plus fort | M |
| 10 | **Grille numérotée à filets** : 01 / 02 / 03 dans des cases bordées, texte sous chaque numéro ; grille de chiffres 2 × 2 à filets. | `inspisite1` (The Social Club : « Explora / Apúntate / Disfruta » et grille des chiffres) | Version statique de l'approche (mobile et `prefers-reduced-motion`), `#/impact`, page des 4 dispositifs | M |
| 11 | **Portraits en grille** : grille de portraits recadrés avec nom et fonction dessous, tailles variables. | `inspisite1` (The Social Club, « La personas detrás ») | « Les visages de Festin » (À propos) ; portraits à fournir, `[XX]` d'ici là | M |
| 12 | **Bord déchiré ou ondulé sous le hero** | `insp3` (Agewise) | Bas du hero de l'accueil et des projets, transition vers la crème | S |
| 13 | **Carte de témoignage pastel avec guillemet** et navigation par flèches plutôt que défilement infini | `insp2` (Donatia), `insp3` (Agewise) | Remplacer `.tmarquee` (64 s) et `.pdef-tmarquee` par un carrousel à flèches : gain d'accessibilité (pause) et de lecture | M |
| 14 | **Photos-tuiles autour du titre** : petites photos arrondies flottant autour du titre central. | `insp1` (SENSE), `inspisite1` (The Social Club) | Déjà présent sur À propos (`about-1280.png`) ; à conserver comme unique occurrence, et corriger le chevauchement avec la pastille nav | déjà fait |
| 15 | **Hero à mot géant** : mot de marque sur la photo, pleine largeur, minuscule. | `inspisite3` (amble) | Variante possible du hero de l'accueil | M |

Points d'écart avec le design system pour ces motifs : le n° 1 (pastille) touche « or : 4 usages » ; les n° 5, 6, 9 réutilisent les couleurs de projet, non prévues au design system (voir §5) ; les n° 6 et 12 sortent de « rayons 8 à 14, pas de gimmick ». Tous les motifs sont du CSS et du JSX : **aucune nouvelle dépendance**.

À noter : `cuisine de l'arc.jpeg` (long repas dans une rue de Marseille, Refugee Food Festival) est le type d'image qui manque au site (des gens à table, de la lumière naturelle, un lieu). Elle pourrait servir de bande plein cadre entre deux sections denses ; cadrage portrait, à recadrer. Le droit à l'image est à confirmer avant tout usage.

---

## 3. Quick wins (moins d'une heure, sans décision de votre part)

Rien de tout cela ne change la palette ni la police.

**Statut au 22 septembre 2026 : les 16 quick wins sont appliqués dans le working tree, non commités.** Écarts avec ce qui était prévu :
- **N° 11** : les 7 images « non différées » d'À propos sont les tuiles du hero (elles doivent rester `eager`) ; leur poids est traité par le n° 13. Le différé a été ajouté aux logos de l'écosystème et aux panneaux de témoignages de l'accueil.
- **N° 12** : 14 `cubic-bezier(.22,1,.36,1)` remplacés par `var(--ease-out)` (`styles.css` 10, `about.css` 2, `home-b.css` 2) ; les transitions de `home-b.css` sans courbe reçoivent `transition-timing-function: var(--ease-out)`.
- **N° 13** : originaux sauvegardés dans `ressources/photos/originaux-avant-compression-2026-09-22/` ; les 4 photos passent de 39 Mo à 3,3 Mo (2400px sur le grand côté, qualité 80).
- **N° 14** : 4 feuilles concernées (Restaure n'avait pas cette ombre).
- **N° 16** : l'opacité 0,7 annoncée ne donne que 3,43:1 ; l'opacité retenue est 0,88.

1. **Épingler Lucide** : `index.html` charge `unpkg.com/lucide@latest`. Fixer une version évite qu'une mise à jour de la bibliothèque change les icônes. Même bibliothèque, aucun poids ajouté. (5 min)
2. **Sortir Google Fonts de la chaîne d'`@import`** : `index.html` → `styles.css` → `@import _tokens.css` → `@import` Google Fonts est une chaîne de trois requêtes bloquantes. Remplacer par un `<link rel="preconnect">` et un `<link rel="stylesheet">` dans `<head>`. (10 min)
3. **Lien de Sadi Carnot** : `Nav.jsx` l.35, `#/sadi-carnot` doit être `#/restaurants/sadi-carnot`. (2 min)
4. **Astérisques de formulaire** (`Sections.jsx` l.174-177) : passer de `var(--gold)` à `var(--teal)` (5,5:1). (5 min)
5. **Anneau de focus des champs** (`styles.css` l.140) : ajouter un `:focus-visible` avec `box-shadow` en teintes teal en plus de la bordure. (10 min)
6. **Ombre du FAB** (`styles.css` l.705-706) : remplacer les deux ombres dorées par `--sh-card-hover`, teintée teal, conformément au design system. (5 min)
7. **Zones tactiles de la nav** : `min-height:44px` sur `.navpill__don`, `.navpill__menu`, `.navpill__brand` et sur `.optA-list a`, `.optA-quick a`. (15 min)
8. **« 83 % » orpheline à 390px** : espace insécable entre le nombre et le signe, plus `white-space:nowrap` sur `.impact-stat__n` (ou son équivalent dans `ImpactPage`). (5 min)
9. **Espace avant la barre du fil d'Ariane** des projets : ajouter `gap` ou une marge à `.pdef-crumb2__inner` et ses 4 équivalents. (5 min)
10. **Trait des icônes** : une règle `.lucide { stroke-width: 1.5 }` (ou `[data-lucide]`) applique le trait du design system aux 68 icônes. Visuellement plus fin : à regarder avant de valider. (5 min)
11. **Chargement différé** des 7 images non différées d'À propos et des logos répétés de l'accueil (`loading="lazy"` et `decoding="async"`). (15 min)
12. **Ombres et courbes en dur** : remplacer les 17 `cubic-bezier(.22,1,.36,1)` par `var(--ease-out)` et ajouter `var(--ease-out)` aux 25 transitions de `home-b.css` sans courbe. Rendu identique ou plus fluide. (20 min)
13. **Réduire `photo-applaudissements.jpg` (16 Mo)** à 2400px de large, qualité 80 (`sips` ou équivalent, environ 400 Ko). Même nom de fichier, aucun changement de code. Faire de même pour `photo-promo-groupe.jpg` (11 Mo), `photo-tabliers-violets.jpg` (6 Mo), `photo-patisserie.jpg` (5 Mo). L'original reste dans `ressources/`. (20 min pour les 4)
14. **Ombre « brune »** des blocs « soutenir » (`rgba(40,14,4,…)`) : à aligner sur `--sh-md`. (10 min)

15. **Paragraphe du footer illisible** (`styles.css`, `.footer__brand p`) : il hérite de `--ink-mid` (1,7:1 sur teal foncé). Le passer en `var(--ink-on-dark-mid)` (8:1). **Fait.** Même correction que celle déjà faite pour les titres. (5 min)
16. **Libellés d'étape de l'approche** (`home-b.css` l.118) : remonter l'opacité du libellé inactif (`rgba(15,60,68,.42)`, 2,01:1) à 0,88 (environ 4,5:1 ; 0,7 ne donnait que 3,43:1). **Fait.** (5 min)

Hors quick win mais rapide, à faire à la suite : corriger les 17 grilles inline de `Pages.jsx` sans point de rupture (voir constat 8.4) : compter 1 à 2 h pour les 4 pages tronquées.

---

## 4. Chantiers à arbitrer

**A. Aligner les 8 pages fonctionnelles sur la DA.** Le principe est acquis (la DA de référence est celle de l'accueil et des projets) ; il reste à choisir la forme d'en-tête. Concernées : Académie, Formations (liste et fiche), Impact, Contact, Sadi Carnot, 2 Accompagnements, Actualités.
- *Option 1 : hero photo réduit (environ 60 % de la hauteur d'écran), H1 en capitales de 96 à 128px, pivot en italique or clair.* Avantages : ressemblance maximale avec les projets, une seule famille de pages. Limites : 8 photos à choisir avec droit à l'image, poids à maîtriser, effort L.
- *Option 2 : bande titre colorée sans photo* (H1 en capitales posé sur un aplat d'une couleur par page, motif 9 de l'axe 9). Avantages : aucune image requise, moderne, rapide à décliner. Limites : moins proche des heros photo, à valider visuellement à côté d'un projet.
- *Option 3 : en-tête compact* (H1 en capitales de 72 à 88px sur teal profond, une photo de 4/3 à droite). Avantages : effort S à M, pages fonctionnelles plus denses en information. Limites : plus discret que la DA.

**B. Gabarit des pages projet.**
- *Option 1 : un composant `ProjetTemplate` piloté par `data.js` et une variable `--accent`.* Avantages : supprime environ 1 500 lignes de CSS et 1 200 de JSX, une correction s'applique aux 5 pages. Limites : chantier le plus lourd (L), risque de régression visuelle sur 5 pages, `data.js` doit porter les différences de contenu.
- *Option 2 : garder les 5 fichiers, extraire un `projet-common.css`.* Avantages : gain rapide, faible risque. Limites : le JSX reste dupliqué.
- *Option 3 : conserver et différencier.* Avantages : aucun risque. Limites : les 5 pages restent trop semblables ; il faudrait quand même créer des différences réelles (un hero à photo différente, une section propre à chaque projet).

**C. Navigation principale.**
- *Option 1 : conserver la pastille + Menu seul.* Avantages : pureté visuelle, cohérent avec la référence Fixa. Limites : découvrabilité faible pour financeur et journaliste.
- *Option 2 : pastille + 3 ou 4 liens visibles au-dessus de 1024px (Projets, Formations, Impact, Contact).* Avantages : accès direct, tout en gardant la pastille. Limites : la pastille devient une barre plus large ; à dessiner.
- *Option 3 : barre classique du design system (logo, liens, bouton Contact).* Avantages : conforme au design system. Limites : abandonne un choix déjà validé (« option A »).

**D. CTA flottant et don.**
- *Option 1 : supprimer le FAB* et garder Don dans la pastille et un bloc « Agir » en fin de page. Avantages : moins de collisions, conforme au design system. Limites : perte d'un accès permanent aux 5 actions.
- *Option 2 : conserver le FAB, l'aligner sur le système* (ombre teal, couleur qui ne se confond pas avec l'or, masqué quand le pied de page est visible, retour de focus). Avantages : garde la fonction. Limites : reste une barre fixe de plus.
- *Option 3 : FAB sur mobile seulement* (barre basse à 2 actions), pastille Don sur desktop. Avantages : chaque support garde un seul chemin. Limites : deux comportements à maintenir.

**E. Échelle et casse entre l'accueil et les projets.** Aujourd'hui H2 en capitales de 72 à 88px sur l'accueil, H2 en casse de phrase de 38px sur les projets, H3 de 59 contre 28px.
- *Option 1 : H2 des projets en capitales, de 48 à 64px* (même langage que l'accueil, échelle réduite). Avantages : cohérence immédiate entre les deux pages de référence. Limites : titres longs en capitales sur des colonnes de 460px (« Un programme national, une exigence partagée » se lirait sur 3 lignes).
- *Option 2 : H2 de l'accueil en casse de phrase.* Avantages : lisibilité des titres longs, cohérence avec les projets. Limites : perd l'effet d'affiche de l'accueil, qui fait sa signature.
- *Option 3 : deux niveaux assumés et documentés* (accueil = affiche en capitales ; projets et pages internes = éditorial en casse de phrase, H1 seul en capitales). Avantages : aucun changement visuel majeur. Limites : à écrire dans le design system, le passage accueil → projet reste un changement de ton.
Dans tous les cas : fixer une taille minimale de 12px, réduire les 5 interlettrages d'eyebrow à un seul et faire lire aux tokens `--fs-*` ce qui est réellement rendu.

**F. Palette des projets et palette générale.** À ne pas décider avant l'arbitrage teal / or (question 1).
- *Option 1 : tokeniser les 5 couleurs de projet comme « couleurs de projet » du design system*, avec une variante foncée AA (corail et ocre à assombrir pour porter du texte blanc). Avantages : identité par projet, contrastes corrigés. Limites : six nouvelles couleurs dans le design system.
- *Option 2 : ne garder que teal, or et leurs tints ; différencier les projets par l'image et l'icône.* Avantages : palette minimale conforme. Limites : perd l'identification par la couleur.
- *Option 3 : statu quo tokenisé* (mêmes couleurs, mais dans `_tokens.css` avec les hover). Avantages : aucun changement visuel. Limites : le problème de contraste (corail, ocre) demande quand même une décision.

**G. Pipeline d'images.**
- *Option 1 : recompresser en place* (même noms, JPEG à 2400px) puis ajouter `srcset` aux images plein écran. Avantages : aucune dépendance, gain massif immédiat. Limites : gestion manuelle.
- *Option 2 : produire WebP en plus du JPEG* avec `<picture>`. Avantages : encore plus léger. Limites : deux fichiers par image, fichiers de sortie à versionner.
- *Option 3 : service d'images externe* (nouvelle dépendance et coût récurrent à valider ; non chiffré ici). Avantages : redimensionnement automatique. Limites : dépendance à un tiers, hors du principe « pas de build, pas de dépendance ».

**H. Longueur et rythme de l'accueil.**
- *Option 1 : resserrer.* Fusionner bandeau or et mission, remplacer un des trois aplats teal par un fond crème ou off-white. Avantages : moins de scroll, rythme lisible. Limites : retouche de 3 blocs.
- *Option 2 : garder la structure, changer les aplats* (alterner teal / crème / or pâle). Avantages : conserve le contenu. Limites : l'accueil reste à plus de 10 écrans.
- *Option 3 : découper* (accueil court + pages détaillées). Avantages : accueil plus digeste. Limites : plus de travail éditorial.

**I. Approche épinglée de l'accueil** (voir constat A1).
- *Option 1 : garder l'épinglage et le corriger.* Cartes inactives à pleine opacité (échelle .92 seule), texte jamais rogné, chapeau et stepper resserrés, durée de scroll réduite. Avantages : conserve le geste. Limites : garde le coût (environ 2 000px) et la double version mobile.
- *Option 2 : défilement horizontal sans épinglage* (`scroll-snap`, trois cartes visibles côte à côte sur desktop). Avantages : pas de captation du scroll, une seule version pour tous les supports et pour `prefers-reduced-motion`. Limites : perd l'effet de progression ; le stepper devient un simple repère.
- *Option 3 : trois cartes statiques* en grille alternée (motif 10 de l'axe 9, cases numérotées). Avantages : zéro JavaScript, le plus lisible, économise environ 2 500px sur l'accueil. Limites : l'accueil perd son moment le plus animé.


---

## 5. Évolutions du design system proposées

Le design system doit décrire la DA validée (accueil et 5 projets), et non l'inverse. Les points ci-dessous sont des évolutions du système à arbitrer, pas des contournements ; ceux qui décrivent la DA telle qu'elle est (1, 3, 4, 10) sont surtout de la documentation.

1. **Mouvement.** Le système dit « pas de parallaxe, trois mouvements seulement ». Le site a une parallaxe de hero, deux sections épinglées horizontales, neuf défilements infinis, un dégradé animé en boucle, des photos qui s'éparpillent. Proposition : remplacer la règle par un **catalogue explicite** : (1) fondu de révélation 350 ms, (2) survol -3px, (3) ouverture de panneau, (4) parallaxe de hero limitée à 10 % sur une image, (5) une section épinglée par page au plus, (6) défilement infini seulement s'il porte un contenu redondant et avec une commande de pause. Supprimer le dégradé animé du hero et le rebond `festin-bob`.
2. **Éléments fixes.** Remplacer « pas de CTA sticky » par une règle précise : une pastille de navigation, un CTA flottant au plus (chantier D), pas de bande fixe supplémentaire (le fil d'Ariane des projets passe dans le flux).
3. **Or.** Passer de « quatre usages » à : pastille d'accroche, CTA principal, chiffres, italique **sur fond sombre**, plus **un aplat or par page au maximum**. Interdire l'or en texte sur clair (2,04:1 mesuré) ; prévoir un texte d'accent sur clair en teal ou en encre.
4. **Échelle typographique** (chantier E) : documenter une échelle expressive, avec une taille minimale de 12px. Un tableau unique remplace les deux échelles de `_tokens.css`.
5. **Couleurs de projet** (chantier F) : soit les intégrer avec leurs variantes AA, soit les retirer. Ajouter au même endroit corail (Don) et teal très foncé.
6. **Rayons et ombres** : figer 4 rayons (6, 10, 14, 999) au lieu de 3 à 26px et 3 ombres au lieu de 12 valeurs ; ajouter l'ombre du bouton Don.
7. **Largeurs** : une seule largeur de contenu (1280px) et une seule marge latérale (`clamp(20px,5vw,72px)`), avec l'exception documentée de l'accueil.
8. **Icônes** : confirmer le trait à 1,5px et l'appliquer par une règle globale (voir quick win 10).
9. **Registre des titres** (chantier E) : le design system dit « casse de phrase » (partie « Content fundamentals », ignorée) ; `CLAUDE.md` et la DA validée disent « capitales ». À écrire dans la partie visuelle.
10. **Documenter la DA de référence** : hero photo plein écran avec pivot en italique or clair, pastille de navigation centrée, aplats or, blocs « soutenir » colorés par projet, cartes à 14px, section « chiffres » avec compteurs. Sans cette page, le design system reste en retard sur le site.
11. **Fuite de couleur des paragraphes** : ajouter à `_tokens.css` la même neutralisation que pour les titres (`p` et `li` héritent de la couleur du bloc sur fond sombre), ce qui supprime le cas du footer (1,7:1) à la source.

---

## 6. Questions pour vous

1. **Palette** : `#1D6B78 / #E8A825` (site, design system, kit 2026) ou `#217078 / #FFC100` (charte 2022, document de restructuration) ? Tant que ce n'est pas tranché, je ne peux pas proposer de valeurs de tokens ; le chantier F et le ton de l'or en dépendent.
2. **Casse et échelle des titres** (chantier E) : les H2 des projets doivent-ils passer en capitales comme ceux de l'accueil, ou l'accueil est-il volontairement « affiche » et les projets « éditorial » ?
3. **Approche épinglée de l'accueil** (chantier I) : la conserver en la corrigeant, la remplacer par un défilement sans épinglage, ou la rendre statique ? C'est le passage qui a le plus d'effet sur la durée de la page.
4. **Navigation et bouton flottant** (chantiers C et D) : la pastille avec « Menu » seul est-elle définitive, et garde-t-on « Agir maintenant » ? Les deux touchent le chrome fixe des projets.
5. **Financeurs et presse** : voulez-vous une page ou un bloc dédié (chiffres, rapports, contact) et un espace presse (visuels, contact) ? Aujourd'hui ces deux profils retombent sur le formulaire de contact générique. Et quelle est l'URL LinkedIn à mettre à la place du lien vers `#/contact` ?
