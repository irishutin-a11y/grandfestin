# Site Festin (grandfestin.com)

Site de l'association Festin (Marseille). Pas de date de sortie : le site sort quand tout est prêt. Ce fichier est lu au début de chaque session : il donne le cadre et ce qui est déjà tranché.

## Stack et lancement en local
- React 18 (local, `vendor/`) + JSX **compilé** : `components/*.jsx` → `build/*.js` par `./tools/build.sh` (moteur JavaScript de macOS ; ailleurs, repli automatique sur Node via `tools/build-node.js`, même sortie). **Après toute modification d'un .jsx, lancer `./tools/build.sh`** puis tester ; committer `build/` avec le source. Le navigateur ne charge plus Babel. Routeur : `components/App.jsx`. GSAP 3.15 + ScrollTrigger, Lenis 1.1.13 et Lucide 1.47.0, tous locaux dans `vendor/` (aucune requête externe, 05/10/2026). Règle « pas de build » levée le 24/09/2026. Après une modification de CSS ou de JS, relever les `?v=` correspondants dans `index.html`.
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
- Rythme : aplats de couleur alternés. Retenue d'animation : chaque animation sert à révéler, relier ou comparer. `prefers-reduced-motion` respecté. (La règle « deux composants horizontaux interactifs au plus par page » est **supprimée** le 05/10/2026.)
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
- **Un seul rangement : trois missions.** Former (Des Étoiles et des Femmes, Académie Festin) · Accompagner jusqu'à l'emploi (Les Beaux Mets, La Table de Cana) · Changer les cuisines (le programme Restaure). Source unique : `FESTIN_DATA.home.missions` ; `window.missionDe(id)`. Teinte des heros : voir « Retours sur l'audit (05/10/2026) ».
- **Couleur** : corps de page sur familles tonales claires (`.g-sec--white|cream|tint|gold`), avec des **touches de couleur assumées** (retours du 25/09/2026) : bandeau or des statuts sur l'accueil, chiffres 2025 en couleur sur teal profond, compteurs en aplats alternés (`window.Compteurs`) sur les pages projet, pastilles d'icônes en couleur dans le menu, frise chronologique en couleur sur l'Association, bloc sombre « Un secteur qui recrute » sur l'Académie, pastille de mission sur les cartes de « Nos projets ». Couleur propre d'un projet : pastille `--pc`, jamais en aplat.
- **Briques communes** (`components/Gabarit.jsx`, `styles/gabarit.css`) : `GHead`, `Preuves` (chiffres dans des phrases, source dessous), `Portes`, `Appel`, `Cartes`, `Presse`, `Galerie` (avec pause), `MissionsNav`, `ProjetsParMission`, `GVideo`, `GLink`, `useGReveal`. Toute suite d'étapes passe par `window.Frise` (Interactifs.jsx ; `statique` pour les suites courtes).
- **Pages projet** : un seul composant, `components/ProjetPage.jsx`, piloté par `FESTIN_DATA.projetPages[id]` (faits dans `FESTIN_DATA.projets`). Chaque page a une **nature** (`projetPages[id].nature`) : `formation` (Des Étoiles et des Femmes : « Plus d'informations », porte personne puis cuisine), `lieu` (Les Beaux Mets, La Table de Cana : réserver ou commander, recruter un ancien ; on ne candidate pas aux Beaux Mets ; `orientable` pour La Table de Cana), `programme` (Restaure : ses formations à la place du parcours). Appel final : carte or (`.g-appel`) sur fond blanc. Ordre fixe : hero · en bref · parcours · un bloc propre au plus · témoignages · portes · presse · galerie (la liste « Les autres projets de Festin » en fin de page est retirée le 05/10/2026, trop répétitive ; Restaure finit sur la bande or des projets). Ajouter un projet = une entrée de données, pas un composant.
- **Double public** (29/09/2026, maquette `maquettes/home-double-cible.html`) : le site parle aux prescripteurs, aux professionnels de la restauration, aux institutions et partenaires. Accueil : hero sobre (« Former les personnes, faire avancer les cuisines. ») avec deux boutons, « Deux publics, un même métier », frise des projets cliquable (`window.JalonsCouleur`, partagée avec l'Association), « Toutes nos formations », chiffres, citation de l'édito, portes.
- **Navigation** : une seule arborescence, `FESTIN_DATA.arbo` : **Insertion · Professionnels · Nos projets · L'association**, partagée par la pastille, le menu et le pied de page ; `FESTIN_DATA.rubriqueDe(hash)` (adresse exacte d'abord). Page `#/projets` = galerie des projets. Une seule page formations : **L'Académie Festin** (`#/academie`, `#/formations` y mène), filtres Parcours d'insertion / Formations pro. Page Insertion : bloc prescripteurs (`FESTIN_DATA.orienter`, contacts par projet en [À COMPLÉTER]) puis le parcours adressé aux personnes. Page Professionnels : former, recruter, s'engager. (L'option B de `ALLER-PLUS-LOIN.md`, cinq entrées, a été essayée puis écartée le 30/09/2026.)
- **Archétypes de mise en page (30/09/2026)** : `components/Archetypes.jsx` + `styles/archetypes.css` (préfixe `ar-`) : plein cadre, bloc encarté à accordéon, bande défilante, lignes typées, carte flottante, titre en chevauchement. **Utilisés sur la page Professionnels seulement** : le déploiement sur Insertion, Association et pages projet a été essayé puis écarté le 30/09/2026 (retour de l'utilisatrice). Sur cette page : deux sections voisines ne partagent jamais un archétype ; une signalétique = un sens (numéros réservés aux étapes dans un ordre imposé) ; un dispositif utilisé une seule fois n'en est pas un.
- Chiffres clés complets sur l'accueil et Impact seulement ; ailleurs, une phrase sourcée et un lien vers Impact.

## Retours de la direction (01/10/2026) — tranché
- **On parle de « Festin »**, pas de « l'association » (ni « groupe ») dans les titres, le menu et les étiquettes. Le portage associatif est dit **une fois**, dans le bloc « Un projet social, à but non lucratif » de la page Qui sommes-nous : toutes les activités sont des supports d'insertion, menées dans l'intérêt général, portées par une association loi 1901 agréée ESUS ; les bénéfices servent l'insertion des personnes accompagnées. Les mentions légales gardent « association ».
- **Tournesol n'est pas un projet** : c'est une formation, au même niveau que les autres. Depuis le 05/10/2026, plus de page projet : sa fiche `#/formations/tournesol` (bilan et témoignages) ; `#/projets/tournesol` y redirige. Festin compte **cinq projets**.
- **Formations pro = marque Restaure**, plus l'Académie : ni Qualiopi ni OPCO sur ces formations. L'Académie ne présente que les parcours d'insertion (`AcaCatalogue seulInsertion`).
- Formule obligatoire : **« Académie Festin, portée par Estello Formation, organisme de formation certifié Qualiopi »**.
- **Menu par besoin** : « Se former » · « Recruter et former vos équipes » · « Nos lieux et projets » (les cinq projets) · « Qui sommes-nous » (liens de la pastille visibles à partir de 1200 px ; « Soutenir Festin » à partir de 1360 px ; pas dans le menu).
- **Nos lieux** (`FESTIN_DATA.lieux`, `#/projets/lieux`) : Mourepiane (La Table de Cana Marseille), prison des Baumettes (Les Beaux Mets), Sadi Carnot (au futur, non acquis), le reste de la France (13 antennes de Des Étoiles et des Femmes).
- **« La Table de Cana Marseille »** comme nom court. Demandes par le formulaire Contact, motif présélectionné par l'adresse : `#/contact/devis-traiteur` (La Table de Cana Marseille), `#/contact/privatisation` (Les Beaux Mets).
- Impact : « Prix et labels » sans les marchés (Greta, délégations de service public retirés de la frise ; ils restent dans le résumé du rapport 2024).

## Retours du 02/10/2026 — tranché
- **« du dispositif Des Étoiles et des Femmes »**, jamais « de Des Étoiles et des Femmes ». **Pas de virgule avant « et »** (hors témoignages, mot pour mot).
- Typographie automatique (App.jsx) : espaces insécables après les petits mots (à, de, le, dans, au…) et entre un nombre et son unité, pour éviter les mots orphelins en fin de ligne.
- Accueil : titre « Le goût d'avancer ensemble » en grand, centré ; « Former les personnes, faire avancer les cuisines. » en sous-titre ; deux portes d'entrée colorées : **teal = insertion, or = professionnels** (code couleur à garder partout).
- Qui sommes-nous : titre « Près de 40 ans d'insertion par la cuisine. » ; frise propre à cette page (`about.jalons`, `type: projet|reco`) : créations en cartes teal, reconnaissances en étiquettes or.
- Impact : titre « Mesurer ce qui change, année après année. » ; « Quatre ans d'impact mesuré » ; « Nos reconnaissances ».
- Presse : logo du média dans chaque ligne d’article (`FESTIN_DATA.presseLogos`, fichiers `images/presse/<slug>.png` ; sans fichier, le nom dans le cadre). Pas de mur de logos séparé.
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

## Retours sur l'audit (05/10/2026) — tranché
Document d'autorité : `RETOURS-AUDIT.md` (il l'emporte sur `AUDIT-CIBLES.md`). Rapport : `RAPPORT-RETOURS-AUDIT.md`.
- **La personne d'abord** : la porte teal de l'accueil est « Apprendre un métier de cuisine » ; le prescripteur a un bloc court en tête d'Insertion (« Vous orientez une personne ? »). « Ils et elles racontent » sur l'accueil : témoignages déjà publiés, mot pour mot (`home.voix`).
- **Vocabulaire** : « formations diplômantes » (on ne distingue plus CAP et TFP dans le discours ; les diplômes ne sont nommés que dans le détail des fiches). « Dispositif », jamais « programme », pour Des Étoiles et des Femmes. Une seule fiche : `#/formations/des-etoiles-et-des-femmes` (`tfp` et `cap` y redirigent).
- **Chaque taux porte son année**, partout. Intitulé harmonisé : « sorties positives » (La Table de Cana 89 % en 2025, 84 % en 2024 ; Les Beaux Mets 86 % en 2025, 82 % en 2023 : deux années, pas une contradiction).
- **Histoire** : l'association naît en 1987 sous le nom de Départ et prend le nom de Festin en 2022 (dit une fois, sur Qui sommes-nous). 1987 reste la date de création.
- **Code couleur des heros** : teal = pages adressées aux personnes (Insertion, Académie, Des Étoiles et des Femmes, fiches de formation diplômante) ; or = professionnels (Restaure, fiches pro ; la page Pros garde son hero photo à accents or) ; teal profond = le reste (Qui sommes-nous, Impact, Actualités, Contact, Nos projets, Les Beaux Mets, La Table de Cana).
- **Soutenir** : bloc « S'engager avec Festin » en fin d'Impact (financer, accueillir, porter une antenne), adresse `#/impact/soutenir`. Pas de page Partenaires.
- **Adresses** : une table par usage, `FESTIN_DATA.emails` : **contact@grandfestin.com** (adresse générale) et **partenariat@grandfestin.com** (mécénat, partenariats), retour du 06/10/2026. Le formulaire présélectionne le motif par l'adresse : `#/contact/<slug>` (se-former, orienter, recruter, former, devis-traiteur, privatisation, mecenat, partenariat, presse, handicap). Pas de téléphone.
- **Pas de tarifs sur l'accueil** ni sur la page Pros ; « devis » reste autorisé ailleurs, jamais sur une formation gratuite (« Nous contacter »).
- **Page Pros** : ses archétypes restent chez elle ; trois procédés sont diffusés : micro-étiquettes (`window.ArTags`) sur les cartes de formation et de parcours, une action par carte, bande or des projets cliquable (`FESTIN_DATA.bandeProjets`) en fin de Restaure et de l'Académie.
- **Pas de partenaires nommés en exemple dans les textes** (« chez des partenaires comme… ») : on écrit « des restaurants partenaires ». Restent nommés : les témoignages (mot pour mot), les structures qui portent un projet (antennes, pilotes de Restaure, Refugee Food, la formule Estello) et l'attribution d'une citation.
- **Qui sommes-nous** : Excellence et Collectif font partie de « Un projet social, à but non lucratif » (cinq cartes, trois puis deux) ; plus de section « Ce qui guide nos choix ».
- **Photos (05/10/2026)** : en haut de l'accueil, la brigade des Beaux Mets de dos (masterclass Chloé Charles) ; la promotion en tabliers violets ouvre la galerie d'Insertion ; une photo générique de dressage (`images/photo-dressage-dessert.jpg`) sert aux formations (haut de l'Académie). Toute nouvelle image passe par `images/web/{800,1600}/` (JPEG et AVIF) et `data/images-manifest.js`. Ne remplacer une photo existante qu'avec l'accord de l'utilisatrice.
- **Densité** : un titre de portes propre à chaque page (plus de « Par où commencer ? » répété) ; l'édito n'est cité que sur Qui sommes-nous ; 83 % et 91 % seulement sur l'accueil, Impact et la page du dispositif ; un témoignage seul s'affiche sans carrousel.

## Retours V2 (06/10/2026) — tranché
Document d'autorité : `RETOURS-V2.md` (RETOURS-AUDIT reste valable). Rapport : `RAPPORT-RETOURS-V2.md`. Visuels manquants : `VISUELS-A-FOURNIR.md`.
- **Logo de l'Académie Festin** : non validé, retiré partout (pas de cadre de remplacement, la mention en texte suffit).
- **« La Table de Cana Marseille »** en entier pour le projet de Festin (titre de page : « La Table de Cana » + accent « Marseille »). Les Tables de Cana qui portent des antennes du dispositif (Montpellier, Bordeaux, Paris, Hauts-de-Seine, Seine-Saint-Denis) restent « La Table de Cana », jamais « Marseille », jamais un projet de Festin ; sous la liste des antennes, une phrase dit que les structures porteuses sont des partenaires. Les témoignages restent mot pour mot.
- **Heros** : avec une photo, bannière pleine image sur le modèle de la page Pros (`HeroPage` → `.hp--banner`, prop `imgPos`), le voile et l'étiquette gardant le code couleur ; sans photo (fiches de formation, 404) : l'aplat. Qui sommes-nous : logo Festin, pas d'appel à l'action. Nos lieux et projets : brigades du Grand Festin ; Actualités : affiche Toast ; Les Beaux Mets : convives à table.
- **Bandes or** : pas de bouton Pause visible (survol et focus arrêtent ; Pause accessible au clavier, visible au focus) ; liste fixe sur écran tactile ou < 720 px.
- **Carrousels de témoignages** : défilement automatique toutes les 8 s, suspendu au survol, au toucher et au focus, arrêté par une flèche ou par Pause, coupé en mouvement réduit ; un témoignage seul reste statique (Restaure).
- **Accueil** : plus de « Ils en ont parlé ». **Nos lieux** : lieux ouverts au public seulement (Mourepiane, Baumettes, Sadi Carnot en dernier « À venir ») ; accroche « Découvrez nos lieux ouverts au public. ».
- **Des Étoiles et des Femmes** : plus de carte des antennes. Fiche formation : titre « Des Étoiles et des Femmes » (`titreFiche`), pastilles CAP et TFP (`pastilles`).
- **Lieux ouverts au public** (`projetPages[id].table`, bloc `BlocTable` après « en bref ») : Les Beaux Mets « Venir déjeuner », La Table de Cana Marseille « Le traiteur » : photos, infos pratiques ([À COMPLÉTER] tant qu'elles manquent), deux boutons larges.
- **Pros** : « Demander une formation » sous la phrase « … avec d'autres établissements. » (prop `action` de `BlocEncarte`).
- **Galerie de Se former** : flèches précédent / suivant et compteur.
- **Espace presse** : logos des projets à télécharger (versions HD à fournir).

## Retours V3 (06/10/2026) : repositionnement, tranché
Document d'autorité : `RETOURS-V3.md` (RETOURS-AUDIT et RETOURS-V2 restent valables ailleurs). Arborescence : `ARBORESCENCES-V3.md` §10. Rapport : `RAPPORT-RETOURS-V3.md`.
- **Fond** : Festin n'est pas un organisme de formation. « Mettre la restauration au service de l'égalité des chances. » L'insertion passe par l'accompagnement ; la formation est un moyen. Devant « formation » dans un titre ou un menu, se demander s'il ne faut pas « parcours », « accompagnement » ou « insertion ».
- **Arborescence C (remplace l'option A et le menu par besoin du 01/10)** : `FESTIN_DATA.arbo` = **L'insertion** (`#/insertion` : éligibilité, prescripteurs, parcours, « La formation, un moyen » = ex-Académie) · **Nos tables** (sous-menu seul : Les Beaux Mets, La Table de Cana Marseille) · **Pour la restauration** (`#/restauration`, ex-Pros) · **Festin** (Qui sommes-nous, L'écosystème `#/projets`, Impact, Presse). Sous-menus de la pastille au survol, au focus et au clic ; « Presse » et « Soutenir Festin » dans la pastille (≥ 1360 px). Fiches de parcours : `#/parcours/<id>` ; formations pro : `#/formations/<id>`. Toutes les anciennes adresses redirigent (App.jsx). Plus de page Académie.
- **Nommage** : « groupe associatif » pour la nature juridique ; « écosystème Festin » pour l'ensemble ; « groupe Festin » interdit. Plus de « porté par une association ». Pages institutionnelles (Qui sommes-nous, presse) : « l'association Festin est actionnaire largement majoritaire de chacune de nos structures… » ; ailleurs : « nos structures appartiennent très majoritairement à l'association Festin… ». « Projets lancés », pas « créés ».
- **Accueil** : titre « Le goût d'avancer ensemble », sous-titre (tagline) « Mettre la restauration au service de l'égalité des chances. », puis « Un groupe associatif à but non lucratif : toutes nos activités sont d'intérêt général et servent l'insertion des personnes. » Bandeau sans « association ».
- **Vocabulaire** : « restaurants partenaires » (pas toujours gastronomiques) ; « femmes en recherche d'emploi » dans ce qui s'adresse aux personnes, « femmes éloignées de l'emploi » pour prescripteurs et institutions (pages projet) ; 18 ans ou plus reste un critère. Des Étoiles et des Femmes et Tournesol : « gratuit » seulement ; La Table de Cana Marseille et Les Beaux Mets : salariés. Chaque parcours accompagne jusqu'à l'emploi ; certains préparent un diplôme.
- **Éligibilité** : questionnaire dans le navigateur (rien n'est envoyé), critères du site seulement ; « Nous contacter » n'apparaît que si une formation est ouverte (ou à vérifier).
- **Qui sommes-nous** : titre « L'insertion par la cuisine depuis 40 ans » ; récit et trois marqueurs (exigence, audace/innovation, convivialité), textes validés ; « Gouvernance » (Jérôme Schatzman, président du groupe associatif ; Gaëlle de Carmantrand, secrétaire ; Hugues Bonnetain, président de La Table de Cana Marseille) ; équipe filtrable par projet, dont l'équipe de La Table de Cana Marseille (direction : Tom Louis Teboul).
- **Impact** : « Compter ce qui compte » ; rapports en 2ᵉ position ; Koreis daté une fois ; plus de tableaux dépliants. **Presse et actualités** : plus de temps forts ; espace presse en tête avec « Festin en quelques mots ». **L'écosystème** : Sadi Carnot « en développement », ouvert aux soutiens. Logo sans baseline (`images/logo-festin-teal.png`).

## Retours V4 (06/10/2026, soir) : tranché
Document : `PROPOSITIONS-V4.md` (réponses de l'utilisatrice). Remplace la barre et l'arborescence de V3.
- **En-têtes** : la grande image, le fil d'Ariane et **un seul bouton**. Plus d'étiquette (kicker), de pastille logo (sauf Qui sommes-nous, sans bouton), de paragraphe ni de second lien. Exception : les pastilles CAP et TFP de la fiche Des Étoiles et des Femmes (remises le 07/10). Le crédit photo passe en légende discrète (`.hp__credit`).
- **Accueil** : entrées option C, petite ligne en titre : « Insertion » · **Être accompagné jusqu'à l'emploi** (teal) ; « Pour le secteur » · **Recruter, former, s'engager** (or). Plus de « apprendre », plus d'étiquette ni de ligne « Vous financez… » dans l'en-tête.
- **Barre, option C** (07/10) : logo · L'insertion · Pour le secteur · Nos tables · Projets et formations · **[Menu]** · Don (`FESTIN_DATA.barre`, chaque bouton vers une page différente, pastille de couleur teal / or / corail / teal profond ; visibles à partir de 1180 px). Le bouton Menu, à côté du Don, est rendu plus visible. **Nos tables** : page `#/tables` (`TablesPage`, HomeB.jsx) qui reprend le bloc `BlocTable` des Beaux Mets puis de La Table de Cana Marseille, et Sadi Carnot « À venir » ; `#/projets/lieux` y mène.
- **Méga menu** = seul porteur de l'arborescence (`FESTIN_DATA.arbo`) : L'insertion · Pour le secteur · Projets et formations · Festin ; aucun lien n'y mène deux fois à la même page. Sadi Carnot grisé « à venir ». Le pied de page suit `arbo`.
- **Catalogue « Projets et formations »** (`#/catalogue[/projets|formations|tables|insertion|pro]`, `CataloguePage` dans HomeB.jsx, données `FESTIN_DATA.catalogue`) remplace L'écosystème : une carte par élément, filtres Tous / Nos projets / Nos formations / Nos tables / Insertion / Professionnels ; sous « Tous », une formation rattachée à un projet (`dans`) est masquée. Code couleur des cartes (filet haut, pastille, légende) : teal = insertion, or = pour le secteur, corail = nos tables, gris = à venir. L'Académie (« La formation, un moyen », `id="formation"`) et Sadi Carnot (`#developpement`) y sont ; elles quittent L'insertion. Redirections : `#/projets`, `#/projets/lieux`, `#/academie`, `#/formations`, `#/insertion/formation`.
- **Logos des en-têtes sans cadre** (07/10) : logo blanc posé sur l'image (Qui sommes-nous). **Des Étoiles et des Femmes** : le menu mène à la page projet (témoignages, etc.), qui a un bouton « Le détail de la formation » vers `#/parcours/des-etoiles-et-des-femmes` ; la fiche a pour parent la page projet dans le fil d'Ariane.
- **S'engager avec Festin** (Impact) : Financer et Accueillir en deux colonnes ; « Porter une antenne » à part, en bloc sombre (« Un engagement dans la durée », ce qu'il faut réunir, « Parlons de votre projet d'antenne »).
- **Une seule liste de reconnaissances, sur Impact.** Qui sommes-nous n'a plus de frise (`about.jalons` ne sert plus que de données).

## En-têtes « photo nue et cartouche » (07/10/2026), tranché
Proposition 3 de `HEADERS.md` (branche de comparaison `headers-propositions`, route `#/headers`), « à améliorer par la suite ».
- `HeroPage` (Sections.jsx, classes `hc-*` dans gabarit.css) : photo sans voile, pleine largeur, à hauteur fixe (`--hc-h` : 480 px section, 620 accueil, 420 formation ; 360, 400, 300 sur mobile), puis un **cartouche** de la couleur du public (teal = personnes, or = professionnels, teal profond = le reste) qui chevauche le bas de la photo (`--hc-o`). Fil d'Ariane, titre, un bouton. Sans photo : le cartouche seul.
- Trois familles : **accueil** (HomeB.jsx, cartouche teal profond + les deux portes empilées), **section** (toutes les pages intérieures, dont Pour le secteur), **formation** (`famille="formation"` : photo de la formation, faits dans le cartouche : durée, où ou format, public, coût ou porteur ; pastilles CAP/TFP). La photo n'est plus répétée dans le corps des fiches.
- Méga menu : **aucune formation listée une à une** (elles se multiplieront) ; « Toutes les formations d'insertion » → `#/catalogue/insertion`, « Toutes les formations pro » → `#/catalogue/pro`. Plus de phrase de statut en pied de menu.

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
