# Site Festin (grandfestin.com)

Site de l'association Festin (Marseille). Lancement visé au **1er octobre 2026**. Ce fichier est lu au début de chaque session : il donne le cadre et ce qui est déjà tranché.

## Stack et lancement en local
- React 18 (CDN) + Babel standalone, routeur par hash, GSAP 3.12.5 + ScrollTrigger, Lenis. Pas de build, aucune dépendance à ajouter sans validation.
- Contenus : `window.FESTIN_DATA` dans `data/data.js` (dont `.home`, `.about`, `.stats`) et quelques textes en dur dans `components/*.jsx`. Styles : `styles/_tokens.css` + un CSS par page.
- Aperçu : `.claude/launch.json`, config « Festin site » (port 4500). macOS bloque le serveur Ruby dans `~/Downloads` : il sert une **copie** dans `/tmp/Site_Festin`. Après chaque modification :
  `rsync -a --delete --exclude .git --exclude .claude --exclude ressources ./ /tmp/Site_Festin/`
- Les captures d'écran du volet navigateur se dégradent après un défilement en viewport émulé : utiliser `window.scrollTo` après `__lenis.stop()`, ou vérifier par le DOM.
- Le dépôt `ressources/` est dans `.gitignore` (lourd, hors git).

## Le site du dépôt est la source de vérité
Le design system Claude Design (zip) contient d'anciennes versions des composants : ne pas s'en servir pour reconstruire le site. Il sert de réserve d'assets et de documents.

## Charte (non négociable)
- **KoHo uniquement** (dossier `typos/`, italiques via Google Fonts en attendant les fichiers locaux, voir `ressources/charte/typos/`).
- Palette du site (`styles/_tokens.css`) : teal, or, corail, violet, crème, ink. **À arbitrer** : la charte graphique 2022 et le document de restructuration donnent `#217078` / `#FFC100`, le site et le kit 2026 `#1D6B78` / `#E8A825`.
- **Titres en capitales**, avec contraste capitales grasses / italique KoHo léger sur le mot clé.
- Rythme : aplats de couleur alternés. Retenue d'animation : chaque animation sert à révéler, relier ou comparer. Deux composants horizontaux interactifs au plus par page. `prefers-reduced-motion` respecté.
- Neutraliser la fuite `h1..h3{color:var(--ink)}` de `_tokens.css` sur les blocs colorés.
- N'invente rien : portrait, photo, témoignage ou chiffre manquant → `[XX]`. Aucun visage généré, aucune photo de stock.

## Règles Festin
- « Des Étoiles et des Femmes » toujours en toutes lettres, jamais « DEF ».
- « Écosystème Festin », jamais « Groupe Festin ». Chaque projet est rattaché à Festin sur sa page.
- Caractère non lucratif et d'intérêt général lisible dès l'accueil, dans le texte.
- Statut ESUS précisé chaque fois qu'une filiale est mentionnée (entités concernées à confirmer, voir plus bas).
- Aucun investisseur, aucun montage capitalistique, aucun vocabulaire lucratif sur une page grand public. Page restaurateurs : partenariat et insertion, jamais « offre », « prestation », « client », « devis », « solution ».
- Pas de point médian. Pas de superlatif. Chiffres sourcés et datés.
- Restaure s'écrit « le programme Restaure » (restructuration en cours).
- Projets non acquis jamais au présent : « CAP vers l'Emploi », futur lieu près du Vieux-Port, Sadi Carnot.

## Chantier copywriting (dossier `copywriting/`)
Processus en 6 étapes, validation entre chaque : 1 audit, 2 questions, 3 pistes de ton, 4 charte éditoriale, 5 arbitrage page par page, 6 réécriture. **Aucun fichier du site n'est modifié avant l'étape 6**, et à l'étape 6 seulement les chaînes de texte (data.js et textes en dur). Fichiers : `01-audit.md`, `01b-audit-complement.md`, `01c-nouveaux-elements.md`, `02-questions.md`, `02-reponses.md`, `03-pistes.md`, `05-plus-values.md`, `06-journal-des-changements.md`. État : implémentation faite le 21 septembre 2026 (voir `06-journal-des-changements.md`).

Décisions de ton : « nous » de l'association (fiches projet à la 3ᵉ personne factuelle) ; **vouvoiement** partout ; le site parle du secteur, pas du financement public ; national d'abord, Marseille comme preuve (accueil, About), Marseille nommée là où c'est un fait (accompagnement) ; la baseline « Le goût d'avancer ensemble » **reste le titre de la home**. Intouchables : noms de dispositifs, témoignages mot pour mot, intitulés du catalogue, phrases de la direction reprises.

Tics à rationner (une fois par page au plus, jamais en titre, toujours suivis d'un fait) : « n'est pas X, c'est Y », « plus qu'un X », fragments en série. Bannis : « Et si… ? », adjectifs creux, « éloignées de l'emploi » dans les textes adressés aux personnes, noms abstraits (« vecteur », « levier » en série).

## Faits tranchés
- Chiffres 2025 : **441 personnes accompagnées, 83 % de sorties en emploi ou formation, 14 territoires**. Référence : `ressources/documents/rapport-activite-2025/rapport-activite-2025_v441-83_REFERENCE.pdf`. La version 453 / 72 % est une ancienne version ; les documents qui la citent (deck financeurs, kit de communication) sont à mettre à jour.
- La Table de Cana : 1993. Académie Festin : 2026. Tournesol : 5 mois, lancement en 2025.
- Équipe : Iris Hutin, chargée de projet Communication. Gouvernance à ajouter à la page équipe : Jérôme Schatzman (président), Guillaume Hermitte (trésorier).

## Points ouverts
Voir `copywriting/02-reponses.md` et `01b-audit-complement.md` : 1992 ou 1993 pour l'association et « 35 ans » ; ESUS (quelles entités) ; mentions légales (NDA, SIRET, Qualiopi) ; palette ; « 1 100 » ou « 1 200 » femmes ; portraits à fournir.

## Ressources (`ressources/`, hors git)
- `charte/` : `typos/` (KoHo complet, italiques comprises), `logos/`, `guidelines/` (charte 2022, charte communication du réseau Des Étoiles et des Femmes, kit de communication 2026).
- `documents/` : `rapport-activite-2025/`, `financeurs/`, `aap/`, `partenariats/`, `strategie/`. Les documents financeurs contiennent des vocabulaires exclus du site (structure juridique, investissement, « Groupe Festin ») : sources de faits seulement.
- `design/` : explorations liées au site. `photos/` : équipe et gouvernance, sources HD, Refugee Food Festival 2026, `a-classer/`.
- Les droits à l'image des photos ne sont pas documentés : à confirmer avant publication.

## Méthode de travail
- Vérifier la branche et `git log` avant de committer : plusieurs sessions ont travaillé en parallèle sur ce dépôt.
- Commit et push seulement sur demande.
