# Site Festin (grandfestin.com)

Site de l'association Festin (Marseille). Pas de date de sortie : le site sort quand tout est prêt. Ce fichier est lu au début de chaque session : il donne le cadre et ce qui est déjà tranché.

## Stack et lancement en local
- React 18 (local, `vendor/`) + JSX **compilé** : `components/*.jsx` → `build/*.js` par `./tools/build.sh` (moteur JavaScript de macOS ; ailleurs, repli automatique sur Node via `tools/build-node.js`, même sortie). **Après toute modification d'un .jsx, lancer `./tools/build.sh`** puis tester ; committer `build/` avec le source. Le navigateur ne charge plus Babel. Routeur : `components/App.jsx`. GSAP 3.15 + ScrollTrigger (local), Lenis. Règle « pas de build » levée le 24/09/2026.
- Contenus : `window.FESTIN_DATA` dans `data/data.js` (dont `.home`, `.about`, `.stats`) et quelques textes en dur dans `components/*.jsx`. Styles : `styles/_tokens.css` + un CSS par page.
- Aperçu : `.claude/launch.json`, config « Festin site » (port 4500). macOS bloque le serveur Ruby dans `~/Downloads` : il sert une **copie** dans `/tmp/Site_Festin`. Après chaque modification :
  `rsync -a --delete --exclude .git --exclude .claude --exclude ressources ./ /tmp/Site_Festin/`
- Les captures d'écran du volet navigateur se dégradent après un défilement en viewport émulé : utiliser `window.scrollTo` après `__lenis.stop()`, ou vérifier par le DOM.
- Le dépôt `ressources/` est dans `.gitignore` (lourd, hors git).

## Le site du dépôt est la source de vérité
Le design system Claude Design (zip) contient d'anciennes versions des composants : ne pas s'en servir pour reconstruire le site. Il sert de réserve d'assets et de documents.

## Charte (non négociable)
- **KoHo uniquement**, fichiers locaux dans `typos/` (italiques et semi-bold compris, aucune requête Google Fonts).
- Palette (`styles/_tokens.css`). **Tranché le 23 septembre 2026 : les couleurs principales sont celles de la charte 2022** — teal `#217078` (`--teal`), or `#FFC100` (`--gold`). On ne s'en passe pas. Les couleurs 2026 restent disponibles en **déclinaisons d'appoint** : `--teal-secondary` `#1D6B78`, `--gold-secondary` `#E8A825`. Plus corail, violet, crème, ink.
- **Règle de l'or** : `#FFC100` est illisible en texte sur fond clair (1,47:1) et excellent sur fond sombre (8,97:1). Donc : en **aplat** (bouton, pastille, bande) avec du texte encre par-dessus ; en **texte uniquement sur fond sombre** ; sur fond clair, texte et icônes passent par `--gold-ink` `#8C6A00` (4,55:1 sur crème). Le basculement est automatique via `--accent-color` / `--eyebrow-gold-color` : tout bloc sombre déclare la classe `on-dark` (ou figure dans la liste de sélecteurs de `_tokens.css`).
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
Processus en 6 étapes, validation entre chaque : 1 audit, 2 questions, 3 pistes de ton, 4 charte éditoriale, 5 arbitrage page par page, 6 réécriture. Fichiers : `01-audit.md`, `01b-audit-complement.md`, `01c-nouveaux-elements.md`, `02-questions.md`, `02-reponses.md`, `03-pistes.md`, `05-plus-values.md`, `06-journal-des-changements.md`. État : implémentation faite le 21 septembre 2026 (voir `06-journal-des-changements.md`).

Décisions de ton : « nous » de l'association (fiches projet à la 3ᵉ personne factuelle) ; **vouvoiement** partout ; le site parle du secteur, pas du financement public ; national d'abord, Marseille comme preuve (accueil, About), Marseille nommée là où c'est un fait (accompagnement) ; la baseline « Le goût d'avancer ensemble » passe **en sous-titre** du hero de l'accueil, sous le logo `images/logo-festin-blanc.png` (décision du 23/09/2026). L'accueil présente l'**écosystème** Festin (dispositifs associatifs ou non : Les Beaux Mets, Sadi Carnot…), pas seulement l'association. Intouchables : noms de dispositifs, témoignages mot pour mot, intitulés du catalogue, phrases de la direction reprises.

Tics à rationner (une fois par page au plus, jamais en titre, toujours suivis d'un fait) : « n'est pas X, c'est Y », « plus qu'un X », fragments en série. Bannis : « Et si… ? », adjectifs creux, « éloignées de l'emploi » dans les textes adressés aux personnes, noms abstraits (« vecteur », « levier » en série).

## Décisions de refonte (23/09/2026)
- Pages « Restaurateurs » = **acteurs du secteur** (pas que des restaurateurs) ; pas de page Partenaires. Pages Restaurateurs et Insertion refondues sur le modèle de la page Association (référence DA du site).
- Témoignages : carrousel défilant **sans dégradé**, standard sur toutes les pages projet ; cadres vides si pas assez de témoignages.
- Sphère d'images (ImgSphere) : **seulement sur Des Étoiles et des Femmes**, bloc Soutenir ; les logos partenaires quittent ce bloc. Photos des chefs à venir.
- Antennes : liste à survol (HoverImageList) avec les photos d'antenne du formulaire Drive en attendant les logos.

## Reprise du 24/09/2026 (branche `reprise-design`) — conventions à respecter
- Direction : `DIRECTION.md` (grammaire de beetogreen.com transposée). Rapport : `RAPPORT-REPRISE.md`.
- **Fondations** dans `_tokens.css` : tailles `--fs-label` → `--fs-display`, espacements `--sp-1` → `--sp-10` et `--section`, mouvement `--ease-*` / `--dur-*` (côté GSAP : `window.FESTIN_MOTION`). Aucune taille de titre en dur.
- **Blocs incomplets** : un seul interrupteur, `window.FESTIN_SHOW_PLACEHOLDERS` (index.html). `true` pendant le chantier, **`false` à la mise en ligne**. Photo manquante → `<window.PhotoMissing subject cadrage orientation ratio />` ; tout bloc de chantier porte la classe `is-placeholder`.
- **Une seule étiquette par page**, dans le hero. Pas de tiret cadratin dans les textes. Pas de filet coloré latéral, pas de verre flouté.
- Heros des pages intérieures : `window.HeroPage` (Sections.jsx) ; `PageHeader` le rend aussi. Bloc de fin commun : `FinDePage` (sauf Contact, Insertion, Acteurs du secteur).
- GSAP 3.15 et React de production sont **locaux** (`vendor/`). Polices en woff2 (sous-ensemble latin).
- Photos d'antennes : déposer `images/antennes/<ville>.jpg` **et** l'ajouter à `FESTIN_DATA.antennesPhotos`.
- Aperçu de la reprise : config « Festin reprise » (port 4503), copie servie `/tmp/Site_Festin_reprise`.

## Déploiement du 24/09/2026 — la grammaire de l'accueil sur tout le site
- Références : `DIRECTION-ACCUEIL.md` (accueil validé), `AUDIT-DEPLOIEMENT.md` (mesures et décisions), journal `copywriting/09-journal-deploiement.md`.
- **Un seul rangement : trois missions.** Former (Des Étoiles et des Femmes, Tournesol, Académie Festin) · Accompagner jusqu'à l'emploi (Les Beaux Mets, La Table de Cana) · Changer les cuisines (le programme Restaure). Source unique : `FESTIN_DATA.home.missions` ; `window.missionDe(id)`. Teinte du hero d'un projet selon sa mission : or / teal / teal profond.
- **Couleur** : corps de page sur familles tonales claires (`.g-sec--white|cream|tint|gold`), avec des **touches de couleur assumées** (retours du 25/09/2026) : bandeau or des statuts sur l'accueil, chiffres 2025 en couleur sur teal profond, compteurs en aplats alternés (`window.Compteurs`) sur les pages projet, pastilles d'icônes en couleur dans le menu, frise chronologique en couleur sur l'Association, bloc sombre « Un secteur qui recrute » sur l'Académie, pastille de mission sur les cartes de « Nos projets ». Couleur propre d'un projet : pastille `--pc`, jamais en aplat.
- **Briques communes** (`components/Gabarit.jsx`, `styles/gabarit.css`) : `GHead`, `Preuves` (chiffres dans des phrases, source dessous), `Portes`, `Appel`, `Cartes`, `Presse`, `Galerie` (avec pause), `MissionsNav`, `ProjetsParMission`, `GVideo`, `GLink`, `useGReveal`. Toute suite d'étapes passe par `window.Frise` (Interactifs.jsx ; `statique` pour les suites courtes).
- **Pages projet** : un seul composant, `components/ProjetPage.jsx`, piloté par `FESTIN_DATA.projetPages[id]` (faits dans `FESTIN_DATA.projets`). Ordre fixe : hero · en bref · parcours · un bloc propre au plus · témoignages · portes · presse · galerie · projets par mission. Ajouter un projet = une entrée de données, pas un composant.
- **Navigation** (revue du 25/09/2026) : une seule arborescence, `FESTIN_DATA.arbo` (Se former · Recruter · Nos projets · L'association), partagée par la pastille, le menu et le pied de page ; `FESTIN_DATA.rubriqueDe(hash)` allume la rubrique parente. Page `#/projets` = hub des six projets (niveau intermédiaire du fil d'Ariane). Le catalogue des formations vit dans l'Académie (`#/formations` y mène). Plus de bouton flottant. Bloc de fin du pied de page absent de l'accueil, des projets, de l'Académie, des deux pages d'accompagnement et de Contact (elles finissent par leurs portes).
- Chiffres clés complets sur l'accueil et Impact seulement ; ailleurs, une phrase sourcée et un lien vers Impact.

## Faits tranchés
- Chiffres 2025 : **441 personnes accompagnées, 83 % de sorties en emploi ou formation, 14 territoires**. Référence : `ressources/documents/rapport-activite-2025/rapport-activite-2025_v441-83_REFERENCE.pdf`. La version 453 / 72 % est une ancienne version ; les documents qui la citent (deck financeurs, kit de communication) sont à mettre à jour.
- **Association fondée en 1987** (arbitré le 23/09/2026, source LinkedIn officiel). La formule « plus de trente ans » est donc à remplacer par « depuis 1987 » ou « près de quarante ans ».
- La Table de Cana : 1993, premier projet de l'association. Académie Festin : 2026. Tournesol : 5 mois, portée par Festin depuis 2025, 86 % d'insertion un an après. « 1 200 » femmes accompagnées par Des Étoiles et des Femmes. Le parcours court de Des Étoiles et des Femmes vise le titre à finalité professionnelle de commis de cuisine.
- **Des Étoiles et des Femmes : 13 antennes** (le Pays Basque a fermé — ne plus le citer). Festin : 14 territoires d'intervention, tous dispositifs confondus.
- **Taux, toujours avec leur périmètre** : 73 % de sorties positives (Des Étoiles et des Femmes seul, 2025) · 83 % de sorties en emploi ou formation (Festin tous dispositifs, 2025) · 84 % de sorties positives (La Table de Cana, 2024). Réussite aux diplômes : 91 % (2025).
- Grand Festin du 3 octobre 2025 : **plus de 600 convives**, plus de 100 bénévoles, 14 brigades.
- Statuts : ESUS = l'association ; Qualiopi = Académie Festin ; SIRET `379 756 026 00074`, NDA `93132168513`, RNA `W133012740`.
- Équipe : Iris Hutin, chargée de projet Communication ; Armand Hurault, directeur général ; Camille Lafon, direction du restaurant Les Beaux Mets. Gouvernance affichée (bureau) : Jérôme Schatzman (président), Guillaume Hermitte (trésorier), Virginie Leconte (secrétaire).

## Points ouverts
Voir `copywriting/06-journal-des-changements.md`, section « Encore en `[XX]` » : portraits de l'équipe, témoignages entreprise et financeur, crédits photo, intitulés de Marion Binachon et Fanny Bouvier.

## Matière disponible dans le Drive
Relevé complet dans `RESSOURCES-DRIVE.md` (23/09/2026) : récits, témoignages, chiffres sourcés, base presse et photos exploitables, avec l'endroit du site où les intégrer. Validé pour intégration intégrale.

## Ressources (`ressources/`, hors git)
- `charte/` : `typos/` (KoHo complet, italiques comprises), `logos/`, `guidelines/` (charte 2022, charte communication du réseau Des Étoiles et des Femmes, kit de communication 2026).
- `documents/` : `rapport-activite-2025/`, `financeurs/`, `aap/`, `partenariats/`, `strategie/`. Les documents financeurs contiennent des vocabulaires exclus du site (structure juridique, investissement, « Groupe Festin ») : sources de faits seulement.
- `design/` : explorations liées au site. `photos/` : équipe et gouvernance, sources HD, Refugee Food Festival 2026, `a-classer/`.
- Les droits à l'image sont à confirmer ; l'association fournira les crédits (seuls ceux du Refugee Food Festival sont affichés).

## Méthode de travail
- Vérifier la branche et `git log` avant de committer : plusieurs sessions ont travaillé en parallèle sur ce dépôt.
- Commits par phase autorisés (branche courante, avec la ligne Co-Authored-By) ; pas de push sans demande.
