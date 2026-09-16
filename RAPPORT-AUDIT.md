# Rapport d'audit — site grandfestin.com

Branche de travail : `audit/refonte-autonome-2026-09-16`.
Commits, dans l'ordre : `Page Restaure, corrections chiffres et ajustements home` (6d60396) · `Audit — Partie 1` (43ba555) · `Rapport d'audit` (e72ec58) · `Audit — Partie 2 (début)` (628bc1e) · `Audit — Partie 3` (9897320) · `Rapport d'audit — mise à jour` (17401df) · `Audit — Partie 4` (de4ebd0) · `Audit — Partie 5 (début)` (651c31f) · `Audit — Partie 6` (70f6750) · `Audit — Partie 7` (337ae7e).

**Les 7 parties du méga-prompt ont reçu une passe réelle**, mais à des degrés de complétude différents selon ce qui était mesurable/corrigeable sans risque dans le temps disponible. Ce rapport dit précisément où chaque partie s'arrête. Ce n'est **pas** une relecture ligne à ligne de chaque mot sur chacune des ~15 pages — c'est un audit ciblé, sourcé par grep et vérification navigateur, qui a trouvé et corrigé des bugs réels (voir section 1), et qui liste honnêtement ce qui resterait à faire pour un passage exhaustif.

---

## 1. Ce que j'ai changé, chantier par chantier

### Page Restaure + chiffres (6d60396, avant le méga-prompt)
Nouvelle page `ProjetRestaure.jsx`/`projet-restaure.css`. Corrections chiffrées initiales à partir du Rapport d'activité 2025 et du Codev DEF. Centrage des titres home, suppression des CTA du hero, logo footer.

### Partie 1 — les 7 règles non négociables (43ba555)
Détaillée section 2.

### Partie 2 — storytelling (628bc1e)
- **Bug de fond découvert** : les chiffres "453/72%" que je pensais corrigés en Partie 1 étaient dupliqués en dur dans **6 endroits distincts** (`data.js` + `FestinPresentation`, une section home, `ImpactPage` ×2 dans `Pages.jsx`). Corrigés partout → 441/83%. Idem "1 100 femmes DEF" → 1 200 dans le composant `Academie` de la home, raté en Partie 1.
- `ImpactPage` : titre générique + date fausse ("Notre impact" / "10 ans de Festin") → "Chiffres & rapports" / "Depuis 1992, ce que nous avons transformé".
- Vérifié : `p.grandFestin` n'est affiché nulle part → pas de risque de surdimensionnement du Grand Festin.
- Non fait : relecture de chaque page pour triades décoratives et jargon restant (ex. "levier d'insertion/de transformation", répété à l'identique dans 7+ blocs de texte différents — symptôme de copie template, jamais retravaillé au-delà du constat).

### Partie 3 — typographie, défauts déjà signalés (9897320)
Les 5 défauts listés dans le méga-prompt : hiérarchie H1/H2 (vérifiée correcte mathématiquement et visuellement), débordement de "DE LA CUISINE À L'EMPLOI" (résolu par le centrage de Partie 1), collision header/eyebrow (absente sur les captures prises), veuve "transformation." (non reproduite), bande défilante tronquée aux bords (mask-image ajouté — voir réserve de vérification visuelle dans le commit). Non fait : audit typographique des 14 autres pages (tailles rendues à chaque point de rupture, longueur de ligne, graisses).

### Partie 4 — espacements (de4ebd0)
`_tokens.css` définissait déjà une échelle d'espacement base 8 (`--s-1` à `--s-10`) **jamais utilisée** : `Pages.jsx` faisait varier le padding vertical des sections entre 6 valeurs arbitraires (48/60/72/80/96px). Consolidé sur 2 paliers de cette échelle : `var(--s-9)` (96px, standard) et `var(--s-8)` (64px, compact) — 33 occurrences remplacées. Non touché : les 5 courbes `clamp()` différentes de `home-b.css` (risque de retouche fine de chaque section, pas un remplacement mécanique).

### Partie 5 — composants (651c31f)
Aucun des deux systèmes de boutons du site (`.btn`, `.btnb` — ~72 usages) n'avait d'état `:focus-visible` ; `.btnb` n'avait pas non plus de `:active`. Ajoutés aux deux, plus un état `[disabled]` réutilisable. Formulaire de contact : astérisques manquants sur 3 champs obligatoires, une formule commerciale reformulée. Zones de clic mesurées ≥44px (déjà conformes). `loading="lazy"` ajouté aux images hors premier écran qui ne l'avaient pas. Non fait : fusion des deux systèmes de boutons (risque site-wide), messages d'erreur de formulaire personnalisés, inventaire complet des composants au-delà boutons/formulaire, audit des parcours par audience.

### Partie 6 — animations (70f6750)
Les apparitions au défilement dépassaient largement 300-400ms : 800ms sur la home, 700ms sur les 3 pages projet dédiées. Ramenées à 350ms partout (valeur unique). 7 transitions de `styles.css` utilisaient le `ease` par défaut du navigateur → remplacées par `var(--ease-out)`. `styles.css` n'avait aucune règle `prefers-reduced-motion` malgré des animations en boucle infinie (logos défilants, icône qui rebondit) → ajoutée.

### Partie 7 — accessibilité/responsive (337ae7e)
Aucune page n'utilisait le landmark `<main>` → ajouté une fois dans `index.html`, couvre tout le site. **Débordement horizontal réel et mesuré à 375px sur toutes les pages** (21px, `scrollWidth` 396 vs `clientWidth` 375) : la nav fixe elle-même en héritait et débordait de l'écran. Cause : rien ne bornait `html`/`body`. Corrigé par `overflow-x:hidden` — vérifié : `scrollWidth` redescend exactement à 375px. Un `<div onClick>` (`.formation-card`) converti en `<button>` accessible au clavier — mais en vérifiant, ce composant n'est en réalité rendu nulle part sur le site actuel (voir section "constat transversal" ci-dessous).

---

## 2. Les 7 règles — état avant/après

**1. Non-lucrativité dès l'accueil** — *Avant* : seulement en mention légale de pied de page. *Corrigé* : eyebrow du hero home → "Association à but non lucratif — depuis 1992", premier écran.

**2. Statut ESUS à chaque évocation d'une filiale** — **Non traité, volontairement**. Zéro occurrence du terme "ESUS" dans tout le dépôt, aucune source attestant qui est réellement agréé. Voir section 6.

**3. Page restaurateurs : ton de partenariat** — *Avant* : "Solution RH pour les restaurateurs", "L'offre Festin", "Demander un devis" (×2), "proposition adaptée à votre établissement", "votre projet RH". *Corrigé* : reformulé en engagement partagé, sur `AccompagnementProsPage`, la section Publics de la home, le rôle du contact référent, et l'intro du formulaire de contact (trouvé en Partie 5). Distinction faite : les "devis"/"tarifs" du catalogue de formations et du traiteur La Table de Cana restent — activités commerciales légitimes, hors périmètre.

**4. Date de fondation 1992** — *Avant* : au moins 7 occurrences de "Festin ... depuis/en 2015" confondant Festin et DEF, plus "depuis 10 ans" (formulation interdite). *Corrigé* : toutes remplacées par "depuis 1992" / "née en 1992 avec La Table de Cana". Vérifié : les dates "Des Étoiles et des Femmes ... depuis 2015" (correctes, propres à ce projet) n'ont pas été touchées. Voir section 6 pour la tension avec "35 ans".

**5. Chaque projet rattaché à Festin, visible sur la page** — *Avant* : aucune des pages projet ne mentionnait "Festin" en texte visible. *Corrigé* : ajouté dans le hero de `ProjetDef.jsx`, `ProjetLBM.jsx`, `ProjetRestaure.jsx`, et du `ProjetHero` générique (couvre La Table de Cana, Tournesol, etc.).

**6. Aucun montage capitalistique** — Conforme, rien trouvé (grep exhaustif).

**7. "Des Étoiles et des Femmes" en toutes lettres** — Conforme en texte/alt/title visible. Non conforme dans des identifiants techniques invisibles à l'écran (noms de fichiers `images-def/`, classes CSS `pdef-*`) — non corrigé, voir sections 4 et 6.

Règle transverse "Écosystème Festin" — conforme, 0 occurrence de "Groupe Festin".

**Vérification finale (greps insensibles à la casse) :**
```
DEF (texte visible, alt, title)         → 0 occurrence
DEF (fichiers/dossiers/classes CSS)     → présent, non traité
Groupe Festin                           → 0 occurrence
depuis 2015 / née en 2015 (Festin)      → 0 occurrence (7 corrigées)
depuis 2015 (Des Étoiles et des Femmes) → présent, correct, non touché
ESUS                                    → 0 occurrence
investisseur / levée / actionnariat     → 0 occurrence
```

---

## 3. Constat transversal : code mort

En travaillant les Parties 5 à 7, j'ai trouvé plusieurs composants et blocs CSS **jamais montés dans l'application réelle**, restes d'itérations antérieures :
- `components/Hero.jsx` (`function Hero()`) — remplacé par `HomeB.jsx`, jamais importé dans le routeur.
- `components/Selector.jsx` (`function Selector()`) — jamais monté ; c'est `data.meganav` + `Nav.jsx` qui alimente réellement le menu.
- `components/Formations.jsx` : `Formations()` / `FormationCard` / `FormationModal` — jamais montés ; c'est `FormationCardLink` (dans `Pages.jsx`) qui est réellement utilisé partout.
- `styles.css` : un bloc entier `.nav`/`.nav__link`/`.nav__dropdown`/`.hero` (~25 règles) qui ne correspond à aucun composant actuel.

Le dernier point est le plus préoccupant : ce `.hero` mort et le vrai `.hero` de `HomeB.jsx` **partagent le même nom de classe**. La cascade fait que `home-b.css` (chargé après) gagne sur les propriétés qu'il redéclare, mais je n'ai pas vérifié qu'aucune propriété du `.hero` mort ne "fuit" par une propriété que `home-b.css` ne redéclare pas. Je recommande un chantier dédié : identifier ce qui est mort, décider de le supprimer ou de le réactiver, avant qu'un futur renommage (ex. celui de "DEF") ne le confonde avec du code vivant.

---

## 4. [À COMPLÉTER] — classé par urgence

**Urgent :**
- Statut ESUS réel de Festin et de chaque filiale — confirmez lesquelles le sont avant que j'ajoute la mention, et où.

**Important :**
- Numéros RNA/SIRET des filiales si structures juridiques distinctes.
- Confirmation de la date légale de création de l'association (1992 = date d'activité de La Table de Cana d'après votre frise "ADN Festin" ; la date de dépôt des statuts peut différer).
- Logos réels des 3 structures fondatrices de Restaure hors Festin (actuellement en placeholder).

**Secondaire :**
- Le fichier "Genèse du projet.docx" fourni en session contient une version interne explicitement marquée "pas celle à raconter" — non utilisée. Si l'histoire officielle remonte plus loin que 1992, `[À COMPLÉTER]`.

---

## 5. Ce que je n'ai pas pu corriger — et pourquoi

- **Renommage "DEF"** (fichiers, dossiers, classes CSS `pdef-*`) : chantier mécanique de grande ampleur (~10 fichiers, ~150 classes), risque de casser un chemin d'image oublié, aucun bénéfice visible pour un vrai visiteur. Décision éditoriale reportée.
- **Contraste de `--ink-soft`** (voir section 6) : correction prête mais non appliquée, conflit avec la consigne permanente de ne pas toucher les design tokens globaux.
- **Fusion `.btn`/`.btnb`**, **messages d'erreur de formulaire personnalisés**, **suppression du code mort** (section 3) : chantiers identifiés, non faits, risque de régression trop large pour cette passe.
- **Relecture exhaustive mot à mot** de chaque page pour triades décoratives/jargon résiduel, et **audit typographique complet** (tailles réellement rendues à 360/768/1024/1440/1920px) au-delà des 5 défauts déjà signalés : non fait faute de temps sur ~15 pages.

---

## 6. Les problèmes les plus graves restants

1. **Statut ESUS complètement absent alors que la règle l'exige "sans exception".** À trancher : quelles structures sont réellement agréées, je les ajoute immédiatement ensuite.
2. **`--ink-soft` échoue le contraste AA sur au moins 17 textes secondaires du site** (rôles de témoignages, descriptions du mega-menu, labels de contact — tous en 11-13.5px, donc soumis au seuil 4.5:1, mesuré à 3.59-3.88:1 selon le fond). Correction prête (`#566A6E`, testée à 5.16-5.57:1) mais non appliquée — c'est un token de `_tokens.css`, fichier protégé par votre consigne permanente. À trancher : autorisez-vous explicitement à toucher ce token précis, ou dois-je passer par 17 surcharges locales à la place ?
3. **Code mort créant un risque de collision** (section 3), en particulier le `.hero` dupliqué entre du code mort et le vrai hero de la home.
4. **Renommage "DEF"** dans les identifiants techniques : non conforme à la lettre de la règle 7, invisible à l'écran. Priorité réelle à trancher.

---

## 7. Ce sur quoi je ne suis pas d'accord

- **La règle ESUS contredit directement la règle "zéro information inventée".** Je respecte la seconde : afficher un statut juridique/fiscal faux est plus dommageable qu'une mention manquante.
- **"35 ans d'innovation sociale par la cuisine"** (appliqué sur votre demande explicite en session) contredit la règle 4 de ce même méga-prompt ("n'écris jamais un nombre d'années figé"). Appliqué quand même car instruction directe et plus récente, mais signalé : dans six mois ce sera faux et rien ne rappellera de le corriger — exactement le problème que la règle anticipe. Cohérent avec vos propres règles, la home devrait dire "depuis 1992".
- **Le renommage forcé de tout identifiant technique "DEF"** (classes CSS, fichiers) me semble disproportionné par rapport au risque réel : invisible pour tout visiteur, journaliste ou financeur. Je le placerais après un nettoyage du code mort (section 3) et après les corrections de contraste (section 6), qui ont un impact direct sur ce qu'un vrai visiteur perçoit ou peut lire.
- **Je n'ai pas touché `_tokens.css`** malgré la demande explicite de corriger les contrastes, parce que la consigne permanente du projet ("ne pas toucher les design tokens globaux") est plus ancienne, plus générale, et n'a pas été explicitement levée pour cette tâche. Si vous voulez que je corrige `--ink-soft` maintenant, dites-le clairement et je le fais dans la minute.
