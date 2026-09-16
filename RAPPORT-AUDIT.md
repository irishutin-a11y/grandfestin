# Rapport d'audit — site grandfestin.com

Branche de travail : `audit/refonte-autonome-2026-09-16`.
Commits associés : `Page Restaure, corrections chiffres et ajustements home` (6d60396), `Audit — Partie 1 : les 7 règles non négociables` (43ba555).

**État d'avancement honnête, à lire avant tout le reste** : ce méga-prompt couvre 7 parties (règles non négociables, storytelling, typographie, espacements, composants, animations, accessibilité) sur l'intégralité d'un site de plus de 15 pages. La **Partie 1 est traitée dans cette passe**, avec un audit ciblé de la Partie 2 (vocabulaire commercial). Les **Parties 2 à 7 ne sont pas encore traitées** — les tenter superficiellement en une seule passe aurait produit du travail bâclé plutôt qu'un vrai audit. Je détaille en section 5 comment je propose de la suite.

---

## 1. Ce que j'ai changé

### Chantier "Page Restaure + corrections chiffres" (commit 6d60396, avant le méga-prompt)
- Nouvelle page dédiée `components/ProjetRestaure.jsx` + `styles/projet-restaure.css`, sur le modèle DEF/LBM.
- Corrections chiffrées à partir du Rapport d'activité Festin 2025 et du Codev DEF (Été 2026) : personnes accompagnées (453→441 sur la home, 72%→83% de sorties, 358→336 femmes DEF 2025, 1100+→1200+ cumulé DEF, 14→13 brigades du Grand Festin).
- Home : centrage des titres de section, suppression des CTA du hero (dupliqués plus bas), vrai logo Festin dans le footer.

### Chantier "Partie 1 — les 7 règles" (commit 43ba555)
Détaillé section 2 ci-dessous, fichier par fichier.

---

## 2. Les 7 règles — état avant/après

**1. Non-lucrativité et intérêt général dès l'accueil**
- *Avant* : non conforme. La mention n'existait que dans `legalMention` (pied de page).
- *Corrigé* : eyebrow du hero home (`data.js`, `home.hero.eyebrow`) → "Association à but non lucratif — depuis 1992". Visible au premier écran, avant même le H1.

**2. Statut ESUS à chaque évocation d'une filiale**
- *Avant/après* : **non traité, volontairement**. Zéro occurrence du terme "ESUS" trouvée dans tout le dépôt (grep sur `esus`, insensible à la casse, 0 résultat). Je n'ai trouvé aucune source dans le dépôt attestant que Festin ou l'une de ses filiales détient effectivement l'agrément ESUS. Ajouter cette mention partout sans preuve serait fabriquer une information juridique — voir section 6.

**3. Page restaurateurs : ton de partenariat**
- *Avant* : `AccompagnementProsPage` utilisait "Solution RH pour les restaurateurs", "L'offre Festin pour les restaurateurs", "Demander un devis" (×2), "une proposition adaptée à votre établissement", "votre projet RH".
- *Corrigé* : reformulé en vocabulaire d'engagement partagé ("Travailler autrement, avec les restaurateurs", "Ce que Festin construit avec les restaurateurs", "Échanger avec notre équipe"). Même traitement sur la section "Publics" de la home (`Sections.jsx`) et le rôle du contact référent (`data.js: contact.referentRole`, `Sections.jsx: ref-card__lbl`).
- **Distinction faite** : les mentions "devis"/"tarifs" du catalogue de formations (Académie) et du traiteur La Table de Cana sont **laissées telles quelles** — ce sont des activités commerciales réelles et légitimes (vente de prestations traiteur, formations facturées/financées OPCO), pas la relation de partenariat avec les restaurateurs visée par la règle.

**4. Date de fondation : 1992, formulation "depuis 1992"**
- *Avant* : au moins 7 occurrences de "Festin ... depuis/en 2015" confondant la date de Festin avec celle de Des Étoiles et des Femmes (`Hero.jsx`, `Sections.jsx` ×2, `Pages.jsx` ×4 — About, Accompagnement Insertion, Académie), plus "depuis 10 ans" (formulation en nombre d'années, interdite par la règle).
- *Corrigé* : toutes remplacées par "depuis 1992" (ou "née en 1992 avec La Table de Cana"). **Vérifié qu'aucune n'a été confondue avec les dates propres à chaque filiale** : les mentions "Des Étoiles et des Femmes ... depuis 2015" (dans `ProjetDef.jsx` et les champs `data.js` propres au projet DEF) sont correctes et n'ont pas été touchées.
- Stat home "10 ans de Des Étoiles et des Femmes" → remplacée par "35 ans d'innovation sociale par la cuisine" (demande explicite en cours de session, formulée en langage repris de votre propre frise "ADN Festin"). Note : cette formulation utilise un nombre d'années, ce qui contredit la règle 4 elle-même — voir section 6.

**5. Chaque projet rattaché à Festin, visible sur la page**
- *Avant* : non conforme. Aucune des pages projet (DEF, LBM, Restaure, ni le gabarit générique utilisé par La Table de Cana/Tournesol) ne mentionnait "Festin" en texte visible.
- *Corrigé* : ajout de "un projet de l'association Festin" / "mouvement porté par l'association Festin" dans l'eyebrow du hero de `ProjetDef.jsx`, `ProjetLBM.jsx`, `ProjetRestaure.jsx`, et du `ProjetHero` générique (`Pages.jsx`) utilisé par tous les autres projets.

**6. Aucun montage capitalistique**
- *Avant/après* : conforme, rien trouvé. Grep sur "investisseur", "levée de fonds", "actionnariat", "capital-risque", "retour sur investissement", "ROI" : 0 occurrence dans `data.js` et tous les composants.

**7. "Des Étoiles et des Femmes" en toutes lettres, jamais "DEF"**
- *Avant* : aucune occurrence visible de "DEF" en texte, `alt` ou `title` (vérifié par grep ciblé) — cette partie était déjà conforme.
- *Restant non conforme, volontairement non traité* : le sigle "DEF" apparaît dans des **noms de fichiers/dossiers internes** (`images/images-def/`, `logo-def.png`, fichiers `DEF_*.jpg`) et dans **tous les noms de classes CSS de `styles/projet-def.css`** (préfixe `pdef-`, ~150 sélecteurs). Ni l'un ni l'autre n'est visible à l'écran par un utilisateur. Renommer l'ensemble (fichiers + références dans `data.js` + classes CSS + JSX) est un chantier mécanique de grande ampleur avec un vrai risque de casser un chemin d'image oublié — je ne l'ai pas fait dans cette passe pour ne pas introduire de régression visuelle sur la page la plus aboutie du site. Voir [À COMPLÉTER] et section 6.
- Règle transverse "Écosystème Festin" vs "Groupe Festin" : conforme, 0 occurrence de "Groupe Festin" trouvée.

**Vérification finale (greps insensibles à la casse) :**
```
DEF (texte visible, alt, title)     → 0 occurrence restante
DEF (fichiers/dossiers/classes CSS) → présent, non traité (voir ci-dessus)
Groupe Festin                       → 0 occurrence
depuis 2015 / née en 2015 (Festin)  → 0 occurrence restante (7 corrigées)
depuis 2015 (Des Étoiles et des Femmes) → présent, correct, non touché
ESUS                                → 0 occurrence (jamais ajouté, faute de source)
investisseur / levée / actionnariat → 0 occurrence
```

---

## 3. [À COMPLÉTER] — classé par urgence

**Urgent (bloque la mise en ligne du 1er octobre si la règle 2 est non négociable) :**
- Statut ESUS réel de Festin et de chaque filiale (Des Étoiles et des Femmes, Académie Festin, La Table de Cana, Les Beaux Mets, Restaure) : `[À COMPLÉTER]` — confirmez lesquelles sont effectivement agréées ESUS avant que j'ajoute la mention, et où (page de chaque filiale ? mentions légales ? les deux ?).

**Important :**
- Numéros RNA / SIRET des filiales si elles sont des structures juridiques distinctes de Festin (actuellement seul le RNA de Festin est dans `data.js: contact`) : `[À COMPLÉTER]`.
- Confirmation de la date exacte de création légale de l'association Festin (1992 est la date d'activité de La Table de Cana d'après votre propre frise "ADN Festin" montrée en session — mais la date de dépôt des statuts de l'association elle-même peut différer) : `[À COMPLÉTER]`.
- Logos réels des 3 structures fondatrices de Restaure hors Festin (Yes We Camp, Les Petites Cantines, La Communauté Ecotable) — actuellement en placeholder sur `ProjetRestaure.jsx`.

**Secondaire :**
- Le contenu du fichier "Genèse du projet.docx" (fourni en session) contient une version interne de l'historique Festin/DEF explicitement marquée "pas celle à raconter" — je ne l'ai pas utilisée. Si la version officielle de la genèse doit remonter plus loin que 1992, `[À COMPLÉTER]`.

---

## 4. Ce que je n'ai pas pu corriger — et pourquoi

- **Renommage complet de "DEF" dans les fichiers/dossiers/classes CSS** (rule 7) : chantier mécanique de grande ampleur (un dossier d'images, ~10 noms de fichiers, ~150 classes CSS + leurs usages en JSX) qui, tenté rapidement, risquait de casser des chemins d'image sur la page projet la plus travaillée du site sans bénéfice utilisateur visible (aucun de ces identifiants n'apparaît à l'écran). Décision éditoriale : à faire dans un chantier dédié, avec vérification visuelle systématique après chaque renommage.
- **Parties 2 (storytelling complet) à 7 (typographie, espacements, composants, animations, accessibilité)** : non traitées par manque de temps dans cette passe — voir section 5.
- **Mention ESUS** : non ajoutée, faute de source vérifiable (voir section 6).

---

## 5. Les trois problèmes les plus graves restants

1. **Statut ESUS complètement absent du site alors que la règle l'exige "sans exception".** Ce qui doit être tranché : quelles structures sont réellement agréées ESUS, et je les ajoute immédiatement — sans cette info je ne peux pas exécuter cette règle sans inventer.
2. **Parties 2 à 7 du méga-prompt non traitées** : le site n'a pas encore reçu la passe storytelling (triades décoratives, titres génériques, jargon), ni l'audit typographique/accessibilité complet demandé. Ce qui doit être tranché : voulez-vous que je poursuive maintenant, partie par partie, sur cette même branche (chaque partie = un commit, comme pour la Partie 1) ? C'est le chantier le plus long du méga-prompt.
3. **Renommage "DEF"** (fichiers, dossiers, classes CSS) : reste non conforme à la lettre de la règle 7, même si aucune occurrence n'est visible à l'écran. Ce qui doit être tranché : est-ce vraiment prioritaire avant le 1er octobre, sachant que c'est invisible pour tout visiteur, journaliste ou financeur qui ne lit pas le code source ?

---

## 6. Ce sur quoi je ne suis pas d'accord

- **Rule 2 (ESUS) telle qu'écrite entre en contradiction directe avec la règle 4 (zéro information inventée).** "Sans exception" et "je ne le devine pas, je le marque [À COMPLÉTER]" ne peuvent pas être satisfaites en même temps si je n'ai aucune source sur qui est réellement agréé ESUS. J'ai choisi de respecter la règle 4 (ne rien inventer) plutôt que la règle 2, parce qu'afficher un statut juridique/fiscal faux est plus dommageable pour l'association qu'une mention manquante.
- **La consigne "35 ans d'innovation sociale par la cuisine" que j'ai appliquée sur votre demande explicite en session contredit la règle 4 de ce même méga-prompt** ("n'écris jamais un nombre d'années figé... remplace par depuis 1992"). Je l'ai appliquée quand même parce qu'elle vient d'une instruction directe et plus récente que le méga-prompt, mais je le signale : dans six mois, "35 ans" sera faux et personne n'aura de raison de repenser à le corriger — exactement le problème que la règle 4 anticipe. Si vous voulez rester cohérents avec votre propre règle, la home devrait dire "depuis 1992" et non "35 ans".
- **Le renommage forcé de tout identifiant technique contenant "DEF" (classes CSS, noms de fichiers)** me semble une dépense d'effort disproportionnée par rapport au risque réel : aucun visiteur, journaliste ou financeur ne voit un nom de classe CSS ou un chemin d'image dans la barre d'adresse. Je recommande de prioriser ce chantier après les Parties 2-7 (storytelling, accessibilité), qui ont un impact direct sur ce qu'un vrai visiteur perçoit.
