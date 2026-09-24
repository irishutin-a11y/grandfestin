# Direction de l’accueil (24/09/2026)

Proposition de refonte de l'accueil, à valider avant de la déployer sur le reste du site. Elle part de `DIRECTION.md` (grammaire de beetogreen.com), de `RAPPORT-REPRISE.md`, de l'audit du 22/09 (`AUDIT-DESIGN.md`), du relevé du Drive (`RESSOURCES-DRIVE.md`) et des décisions de copywriting (`copywriting/`). Rien n'est inventé : chaque chiffre porte son périmètre, son année et sa source.

## 1. Ce qui ne marche pas encore (mesuré sur `reprise-design`)

- **Trop de couleurs pleines.** 10 bandes sur 8 726 px ; 5 aplats saturés (hero teal, bandeau or, chiffres teal profond, écosystème or, portes teal). L'œil ne se repose jamais.
- **Quatre façons de ranger la même chose.** L'accueil présente 3 missions (Accompagner, Former, Changer), puis 5 projets, puis 2 publics ; le menu en ajoute une quatrième (« Nos tables, Formations, Emploi, Le secteur »). Personne ne relie ces grilles entre elles : c'est ce qui fait « se perdre ».
- **Navigation cachée.** Aucun lien visible, tout passe par « Menu ». Les deux pages publiques clés (Apprendre un métier, Acteurs du secteur) n'y figurent pas en clair. Deux boutons de don coexistent (pastille et bouton flottant « Agir maintenant »).
- **Missions peu visibles.** Elles arrivent en 5e position, en texte de 13 px.
- **« Acteur de choix » absent.** TF1, France 2, M6, France Inter, Le Monde, Libération, Les Échos, El País ont parlé de Festin ; douze chefs forment avec le réseau ; l'étude Koreis mesure l'effet à 3-5 ans. Rien de cela n'est sur l'accueil.

## 2. Parti pris

**Un seul rangement, partout : trois missions.** Former · Accompagner jusqu'à l'emploi · Changer les cuisines. Les six projets sont rangés dessous (deux par mission). Le menu est rangé par public (Vous cherchez un métier / Vous êtes du secteur / L'association), et chaque lien du menu mène à une page qui dit à quelle mission elle appartient.

**Couleur : la teinte pleine est rare, donc elle compte.** Deux surfaces saturées seulement : le hero (teal) et le pied de page (teal profond). Tout le reste respire sur des fonds clairs par familles tonales (DIRECTION.md) : crème, blanc chaud, teal pâle (`--teal-tint`), or pâle (`--gold-pale`). L'or plein devient un accent (boutons, pastilles, barre de progression), jamais une bande. Le corail ne sert plus qu'au don.

**Le fil du parcours relie tout.** Le trait de la transition entre pages devient le motif de liaison : il traverse le hero, relie les trois missions (01 → 02 → 03), puis les cinq étapes de la frise. Même grammaire graphique partout : pastilles numérotées reliées par une ligne qui se trace au défilement.

**La preuve avant la porte.** Promesse → missions et projets → parcours → preuves → portes (grammaire beetogreen : « les parcours se séparent tard »).

## 3. Structure de l'accueil

| # | Bloc | Question du lecteur | Surface | Mouvement |
|---|---|---|---|---|
| 1 | Hero | Qui êtes-vous, que faites-vous ? | teal plein | titre révélé ligne par ligne, photo qui s'ouvre, trait qui se trace |
| 2 | Confiance | Puis-je vous faire confiance ? | crème | statuts, puis « Ils en ont parlé » (8 médias, liens vers les articles) en apparition décalée |
| 3 | Trois missions, six projets | Que faites-vous exactement, et avec quels projets ? | blanc chaud | le fil vertical se trace de 01 à 03 et allume chaque numéro ; cartes projet au survol |
| 4 | Une année pour changer de métier | Comment ça se passe pour une personne ? | teal pâle | frise horizontale épinglée (validée sur Des Étoiles et des Femmes), rail du suivi qui sert de barre de progression |
| 5 | L'exigence, chiffres à l'appui | Est-ce que ça marche ? | or pâle | phrases-preuves qui passent de l'estompé au net au défilement ; citation d'Armand Hurault ; chefs du réseau |
| 6 | Par où commencer ? | Et moi, je fais quoi ? | crème | trois portes : un métier / le secteur / agir avec nous (don, mécénat, réserver, commander) |
| 7 | Dans leurs mots | Qui l'a vécu ? | blanc chaud | grande citation, flèches (inchangé) |
| 8 | Pied de page | | teal profond | inchangé ; le bloc « Vous avez un projet ? » est retiré de l'accueil (les portes le remplacent) |

Deux composants horizontaux interactifs : la frise et les témoignages. Le bandeau défilant des métiers est retiré.

## 4. Navigation

- **Pastille** : logo · Se former · Recruter · L'association · Don · Menu. Les liens visibles ont un état « page courante ». Sur mobile : logo · Don · Menu.
- **Menu** : trois colonnes par public. Vous cherchez un métier (parcours, formations, Des Étoiles et des Femmes, Tournesol). Vous êtes du secteur (recruter, Académie Festin, programme Restaure, Les Beaux Mets, La Table de Cana). L'association (qui sommes-nous, impact, actualités et presse, contact). Un seul bouton de don.
- **Bouton flottant « Agir maintenant »** retiré : il doublait le don et le menu, et recouvrait le contenu.

## 5. Règles à déployer ensuite sur tout le site

1. Deux surfaces saturées par page au plus : le hero et le pied de page.
2. Sections sur familles tonales claires ; une couleur de famille par section, jamais deux.
3. Tout projet affiche sa mission (Former / Accompagner / Changer les cuisines) ; toute page d'accompagnement renvoie aux projets de sa mission.
4. Pastilles numérotées reliées par le fil pour toute suite d'étapes (même composant `Frise`).
5. Chiffres dans des phrases, avec périmètre, année et source ; pas de tuiles de chiffres.
6. Une étiquette par page, dans le hero ; titres à gauche, capitales grasses et mot clé en italique léger.
7. Mouvement : révéler, relier, comparer. Rien d'autre ne bouge. `prefers-reduced-motion` : tout est lisible sans animation.

## 6. Hors périmètre de cette proposition

Pages intérieures (déploiement après validation), envoi réel du formulaire, droits à l'image (non vérifiés, voir `RAPPORT-REPRISE.md`), photos manquantes du Grand Festin 2025.
