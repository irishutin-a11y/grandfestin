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
- Aucun investisseur, aucun montage capitalistique, aucun vocabulaire lucratif sur une page grand public. Page restaurateurs : partenariat et insertion, jamais « offre », « prestation », « client », « solution ». « Devis » est autorisé (traiteur, formations), décision du 30/09/2026 (confirmée le même jour) ; seule la page Professionnels s'en passe, ainsi que des tarifs (maquette du 30/09).
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
- Sphère d'images (ImgSphere) : sur Des Étoiles et des Femmes (bloc Soutenir, les chefs) et, depuis le 30/09/2026, sur l'Association pour les partenaires (mode `logos` : logos fournis + partenaires cités sur les pages projet). Photos des chefs à venir.
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
- **Pages projet** : un seul composant, `components/ProjetPage.jsx`, piloté par `FESTIN_DATA.projetPages[id]` (faits dans `FESTIN_DATA.projets`). Chaque page a une **nature** (`projetPages[id].nature`) : `formation` (Des Étoiles et des Femmes, Tournesol : « Plus d'informations », porte prescripteur puis cuisine), `lieu` (Les Beaux Mets, La Table de Cana : réserver ou commander, recruter un ancien ; on ne candidate pas aux Beaux Mets ; `orientable` pour La Table de Cana), `programme` (Restaure : ses formations à la place du parcours). Appel final : carte or (`.g-appel`) sur fond blanc. Ordre fixe : hero · en bref · parcours · un bloc propre au plus · témoignages · portes · presse · galerie · projets par mission. Ajouter un projet = une entrée de données, pas un composant.
- **Double public** (29/09/2026, maquette `maquettes/home-double-cible.html`) : le site parle aux prescripteurs, aux professionnels de la restauration, aux institutions et partenaires. Accueil : hero sobre (« Former les personnes, faire avancer les cuisines. ») avec deux boutons, « Deux publics, un même métier », frise des projets cliquable (`window.JalonsCouleur`, partagée avec l'Association), « Toutes nos formations », chiffres, citation de l'édito, portes.
- **Navigation** : une seule arborescence, `FESTIN_DATA.arbo` : **Insertion · Professionnels · Nos projets · L'association**, partagée par la pastille, le menu et le pied de page ; `FESTIN_DATA.rubriqueDe(hash)` (adresse exacte d'abord). Page `#/projets` = galerie des projets. Une seule page formations : **L'Académie Festin** (`#/academie`, `#/formations` y mène), filtres Parcours d'insertion / Formations pro. Page Insertion : bloc prescripteurs (`FESTIN_DATA.orienter`, contacts par projet en [À COMPLÉTER]) puis le parcours adressé aux personnes. Page Professionnels : former, recruter, s'engager. (L'option B de `ALLER-PLUS-LOIN.md`, cinq entrées, a été essayée puis écartée le 30/09/2026.)
- **Archétypes de mise en page (30/09/2026)** : `components/Archetypes.jsx` + `styles/archetypes.css` (préfixe `ar-`) : plein cadre, bloc encarté à accordéon, bande défilante, lignes typées, carte flottante, titre en chevauchement. **Utilisés sur la page Professionnels seulement** : le déploiement sur Insertion, Association et pages projet a été essayé puis écarté le 30/09/2026 (retour de l'utilisatrice). Sur cette page : deux sections voisines ne partagent jamais un archétype ; une signalétique = un sens (numéros réservés aux étapes dans un ordre imposé) ; un dispositif utilisé une seule fois n'en est pas un.
- Chiffres clés complets sur l'accueil et Impact seulement ; ailleurs, une phrase sourcée et un lien vers Impact.

## Retours de la direction (01/10/2026) — tranché
- **On parle de « Festin »**, pas de « l'association » (ni « groupe ») dans les titres, le menu et les étiquettes. Le portage associatif est dit **une fois**, dans le bloc « Un projet social, à but non lucratif » de la page Qui sommes-nous : toutes les activités sont des supports d'insertion, menées dans l'intérêt général, portées par une association loi 1901 agréée ESUS ; les bénéfices servent l'insertion des personnes accompagnées. Les mentions légales gardent « association ».
- **Tournesol n'est pas un projet** : c'est un programme de l'Académie Festin. Il sort de « Nos projets », des missions et du menu ; sa page `#/projets/tournesol` reste, présentée comme « Un programme de l'Académie Festin » (fil d'Ariane vers l'Académie, `projetPages.tournesol.programmeDe`). Festin compte **cinq projets**.
- **Formations pro = marque Restaure**, plus l'Académie : ni Qualiopi ni OPCO sur ces formations. L'Académie ne présente que les parcours d'insertion (`AcaCatalogue seulInsertion`).
- Formule obligatoire : **« Académie Festin, portée par Estello Formation, organisme de formation certifié Qualiopi »**.
- **Menu par besoin** : « Se former ou orienter » · « Recruter et former vos équipes » · « Nos lieux et projets » · « Qui sommes-nous » (liens de la pastille visibles à partir de 1200 px).
- **Nos lieux** (`FESTIN_DATA.lieux`, `#/projets/lieux`) : Mourepiane (La Table de Cana Marseille), prison des Baumettes (Les Beaux Mets), Sadi Carnot (au futur, non acquis), le reste de la France (13 antennes de Des Étoiles et des Femmes).
- **« La Table de Cana Marseille »** comme nom court. Demandes par le formulaire Contact, motif présélectionné par l'adresse : `#/contact/devis-traiteur` (La Table de Cana Marseille), `#/contact/privatisation` (Les Beaux Mets).
- Impact : « Prix et labels » sans les marchés (Greta, délégations de service public retirés de la frise ; ils restent dans le résumé du rapport 2024).

## Retours du 02/10/2026 — tranché
- **« du dispositif Des Étoiles et des Femmes »**, jamais « de Des Étoiles et des Femmes ». **Pas de virgule avant « et »** (hors témoignages, mot pour mot).
- Typographie automatique (App.jsx) : espaces insécables après les petits mots (à, de, le, dans, au…) et entre un nombre et son unité, pour éviter les mots orphelins en fin de ligne.
- Accueil : titre « Le goût d'avancer ensemble » en grand, centré ; « Former les personnes, faire avancer les cuisines. » en sous-titre ; deux portes d'entrée colorées : **teal = insertion, or = professionnels** (code couleur à garder partout).
- Qui sommes-nous : titre « Près de 40 ans d'insertion par la cuisine. » ; frise propre à cette page (`about.jalons`, `type: projet|reco`) : créations en cartes teal, reconnaissances en étiquettes or.
- Impact : titre « Mesurer ce qui change, année après année. » ; « Quatre ans d'impact mesuré » ; « Nos reconnaissances ».
- Presse : mur des médias (`FESTIN_DATA.presseLogos`, fichiers `images/presse/<slug>.png` ; sans fichier, le nom s'affiche).
- Gratuité des parcours : astérisque « prise en charge par France Travail et nos partenaires publics ».

## Faits tranchés
- Chiffres 2025 : **441 personnes accompagnées, 83 % de sorties en emploi ou formation, 14 territoires**. Référence : `ressources/documents/rapport-activite-2025/rapport-activite-2025_v441-83_REFERENCE.pdf`. La version 453 / 72 % est une ancienne version ; les documents qui la citent (deck financeurs, kit de communication) sont à mettre à jour.
- **Association fondée en 1987** (arbitré le 23/09/2026, source LinkedIn officiel). La formule « plus de trente ans » est donc à remplacer par « depuis 1987 » ou « près de quarante ans ».
- La Table de Cana : 1993, premier projet de l'association. Académie Festin : 2026. Tournesol : 5 mois, portée par Festin depuis 2025, 86 % d'insertion un an après. « 1 200 » femmes accompagnées par Des Étoiles et des Femmes. Le parcours court de Des Étoiles et des Femmes vise le titre à finalité professionnelle de commis de cuisine.
- **Des Étoiles et des Femmes : 13 antennes** (le Pays Basque a fermé — ne plus le citer). Festin : 14 territoires d'intervention, tous dispositifs confondus.
- **Taux, toujours avec leur périmètre** : 73 % de sorties positives (Des Étoiles et des Femmes seul, 2025) · 83 % de sorties en emploi ou formation (Festin tous dispositifs, 2025) · 84 % de sorties positives (La Table de Cana, 2024). Réussite aux diplômes : 91 % (2025).
- Grand Festin du 3 octobre 2025 : **plus de 600 convives**, plus de 100 bénévoles, 14 brigades.
- Statuts : ESUS = l'association ; Qualiopi = **Académie Festin seulement** (portée par Estello Formation) ; les formations pro (violences sexistes et sexuelles, management juste & inclusif) sont **proposées par le programme Restaure**, hors Académie, sans Qualiopi ni OPCO (01/10/2026). Pas d'accompagnement RH au-delà du recrutement et des formations (ne pas l'écrire) ; SIRET `379 756 026 00074`, NDA `93132168513`, RNA `W133012740`.
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
